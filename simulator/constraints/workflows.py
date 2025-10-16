"""Constraint checking workflows for schedule validation and enforcement."""

from typing import Callable, Dict, List, Optional

from .base import (
    ConstraintContext,
    ConstraintReport,
    ConstraintSeverity,
    ConstraintViolation,
)
from .models import ResourceAvailability, Schedule, ScheduleEntry
from .validators import (
    evaluate_lunch_penalty,
    validate_assignments,
    validate_faculty_overlaps,
    validate_gaps,
    validate_lab_tutorial_rules,
    validate_room_overlaps,
)


ValidatorFunction = Callable[[Schedule, ConstraintContext], ConstraintReport]


class ConstraintWorkflow:
    """Workflow for orchestrating multiple constraint validations.

    The workflow allows registering multiple validators and running them
    in sequence, aggregating their results into a single report.

    Attributes:
        context: The constraint context to use for all validations.
        validators: List of validator functions to run.
        room_availability: Optional room availability data.
        instructor_availability: Optional instructor availability data.
    """

    def __init__(
        self,
        context: Optional[ConstraintContext] = None,
        room_availability: Optional[Dict[str, ResourceAvailability]] = None,
        instructor_availability: Optional[Dict[str, ResourceAvailability]] = None,
    ) -> None:
        """Initialize the workflow.

        Args:
            context: The constraint context. If None, uses default context.
            room_availability: Optional room availability models.
            instructor_availability: Optional instructor availability models.
        """
        self.context = context or ConstraintContext()
        self.validators: List[ValidatorFunction] = []
        self.room_availability = room_availability
        self.instructor_availability = instructor_availability

    def register_validator(self, validator: ValidatorFunction) -> None:
        """Register a validator function to be run during validation.

        Args:
            validator: A function that takes a Schedule and ConstraintContext
                      and returns a ConstraintReport.
        """
        self.validators.append(validator)

    def run(self, schedule: Schedule) -> ConstraintReport:
        """Run all registered validators on a schedule.

        Args:
            schedule: The schedule to validate.

        Returns:
            Aggregated ConstraintReport containing all violations from all validators.
        """
        aggregate_report = ConstraintReport()
        aggregate_report.metadata["workflow_mode"] = self.context.mode
        aggregate_report.metadata["validator_count"] = len(self.validators)

        for validator in self.validators:
            if validator == validate_assignments:
                report = validate_assignments(
                    schedule,
                    self.context,
                    self.room_availability,
                    self.instructor_availability,
                )
            else:
                report = validator(schedule, self.context)

            aggregate_report.violations.extend(report.violations)

            if report.total_score is not None:
                if aggregate_report.total_score is None:
                    aggregate_report.total_score = 0.0
                aggregate_report.total_score += report.total_score

            for key, value in report.metadata.items():
                aggregate_report.metadata[key] = value

        return aggregate_report

    def run_verification(self, schedule: Schedule) -> ConstraintReport:
        """Run the workflow in verification mode.

        This checks all hard constraints and reports violations but does not
        attempt to fix them.

        Args:
            schedule: The schedule to verify.

        Returns:
            ConstraintReport with all violations found.
        """
        verification_context = self.context.clone(mode="verification")
        old_context = self.context
        self.context = verification_context

        report = self.run(schedule)
        report.metadata["workflow_type"] = "verification"

        self.context = old_context
        return report

    def run_scheduling(self, schedule: Schedule) -> ConstraintReport:
        """Run the workflow in scheduling mode.

        Scheduling mode is typically used during construction of a schedule.
        It may include softer constraints or more lenient thresholds.

        Args:
            schedule: The schedule to evaluate while scheduling.

        Returns:
            ConstraintReport with violations relevant to scheduling decisions.
        """
        scheduling_context = self.context.clone(mode="scheduling")
        old_context = self.context
        self.context = scheduling_context

        report = self.run(schedule)
        report.metadata["workflow_type"] = "scheduling"

        self.context = old_context
        return report

    def run_incremental_check(
        self, schedule: Schedule, new_entry_index: int
    ) -> ConstraintReport:
        """Run an incremental check focusing on a newly added entry.

        This is useful during scheduling to quickly check if a new entry
        violates constraints without re-validating the entire schedule.

        Args:
            schedule: The complete schedule including the new entry.
            new_entry_index: Index of the newly added entry to focus on.

        Returns:
            ConstraintReport focusing on violations involving the new entry.
        """
        report = ConstraintReport()
        report.metadata["workflow_type"] = "incremental"
        report.metadata["new_entry_index"] = new_entry_index

        if new_entry_index >= len(schedule.entries):
            report.add_violation(
                constraint_name="workflow.invalid_index",
                severity=ConstraintSeverity.ERROR,
                message=f"Invalid new_entry_index {new_entry_index} for schedule with {len(schedule.entries)} entries",
            )
            return report

        full_report = self.run(schedule)

        new_entry = schedule.entries[new_entry_index]
        for violation in full_report.violations:
            if self._violation_involves_entry(violation, new_entry):
                report.violations.append(violation)

        if full_report.total_score is not None:
            report.total_score = full_report.total_score

        return report

    def _violation_involves_entry(
        self, violation: ConstraintViolation, entry: ScheduleEntry
    ) -> bool:
        """Check if a violation involves a specific entry."""
        entry_key = f"{entry.course_id}:{entry.section_id}"

        if violation.location and entry_key in violation.location:
            return True

        details = violation.details
        if "course_id" in details and details["course_id"] == entry.course_id:
            if "section_id" in details and details["section_id"] == entry.section_id:
                return True

        return False


def default_workflow(
    context: Optional[ConstraintContext] = None,
    room_availability: Optional[Dict[str, ResourceAvailability]] = None,
    instructor_availability: Optional[Dict[str, ResourceAvailability]] = None,
) -> ConstraintWorkflow:
    """Create a default workflow with all standard validators registered.

    The default workflow includes:
    - Assignment validation (rooms and instructors)
    - Room overlap validation
    - Faculty overlap validation
    - Gap validation
    - Lab/tutorial rule validation
    - Lunch penalty evaluation

    Args:
        context: Optional constraint context. If None, uses default.
        room_availability: Optional room availability models.
        instructor_availability: Optional instructor availability models.

    Returns:
        ConstraintWorkflow with all standard validators registered.
    """
    workflow = ConstraintWorkflow(context, room_availability, instructor_availability)

    workflow.register_validator(validate_assignments)
    workflow.register_validator(validate_room_overlaps)
    workflow.register_validator(validate_faculty_overlaps)
    workflow.register_validator(validate_gaps)
    workflow.register_validator(validate_lab_tutorial_rules)
    workflow.register_validator(evaluate_lunch_penalty)

    return workflow


def quick_check(schedule: Schedule, context: Optional[ConstraintContext] = None) -> bool:
    """Perform a quick validity check on a schedule.

    This is a convenience function for checking if a schedule has any
    critical errors or violations of hard constraints.

    Args:
        schedule: The schedule to check.
        context: Optional constraint context.

    Returns:
        True if the schedule is valid (no critical errors), False otherwise.
    """
    workflow = default_workflow(context)
    report = workflow.run(schedule)
    return report.is_valid()


def detailed_report(
    schedule: Schedule,
    context: Optional[ConstraintContext] = None,
    room_availability: Optional[Dict[str, ResourceAvailability]] = None,
    instructor_availability: Optional[Dict[str, ResourceAvailability]] = None,
) -> ConstraintReport:
    """Generate a detailed constraint report for a schedule.

    This runs all validators and returns a comprehensive report including
    penalty scores and metadata.

    Args:
        schedule: The schedule to analyze.
        context: Optional constraint context.
        room_availability: Optional room availability models.
        instructor_availability: Optional instructor availability models.

    Returns:
        Detailed ConstraintReport with all violations and scores.
    """
    workflow = default_workflow(context, room_availability, instructor_availability)
    return workflow.run(schedule)
