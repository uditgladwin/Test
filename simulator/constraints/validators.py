"""Constraint validators and enforcers for schedule validation."""

from itertools import combinations
from typing import Dict, List, Optional

from .base import ConstraintContext, ConstraintReport, ConstraintSeverity
from .models import (
    DayOfWeek,
    MeetingInstance,
    ResourceAvailability,
    Schedule,
    ScheduleEntry,
    SessionCategory,
)


def validate_assignments(
    schedule: Schedule,
    context: ConstraintContext,
    room_availability: Optional[Dict[str, ResourceAvailability]] = None,
    instructor_availability: Optional[Dict[str, ResourceAvailability]] = None,
) -> ConstraintReport:
    """Validate that all schedule entries have required assignments.

    This validator checks that:
    - All entries have required rooms and instructors assigned
    - Assigned resources are available during scheduled times
    - Room capacity constraints are satisfied if specified

    Args:
        schedule: The schedule to validate.
        context: Constraint context with validation rules.
        room_availability: Optional mapping of room IDs to availability models.
        instructor_availability: Optional mapping of instructor IDs to availability models.

    Returns:
        ConstraintReport containing any violations found.
    """
    report = ConstraintReport()

    for entry in schedule.entries:
        location = f"{entry.course_id} {entry.section_id}"

        if not entry.room_id:
            report.add_violation(
                constraint_name="assignment.room_required",
                severity=ConstraintSeverity.ERROR,
                message=f"Entry has no room assigned",
                location=location,
                details={"entry": str(entry)},
            )
        elif room_availability and entry.room_id in room_availability:
            room = room_availability[entry.room_id]
            for meeting in entry.iter_instances():
                if not room.is_available_for_meeting(meeting):
                    report.add_violation(
                        constraint_name="assignment.room_unavailable",
                        severity=ConstraintSeverity.ERROR,
                        message=f"Room {entry.room_id} is not available for meeting on {meeting.day.short_name}",
                        location=location,
                        details={"room_id": entry.room_id, "meeting": str(meeting)},
                    )

            expected_enrollment = entry.metadata.get("expected_enrollment")
            if (
                expected_enrollment is not None
                and room.capacity is not None
                and expected_enrollment > room.capacity
            ):
                report.add_violation(
                    constraint_name="assignment.room_capacity",
                    severity=ConstraintSeverity.ERROR,
                    message=(
                        f"Expected enrollment {expected_enrollment} exceeds room capacity {room.capacity}"
                    ),
                    location=location,
                    details={
                        "room_id": entry.room_id,
                        "expected_enrollment": expected_enrollment,
                        "capacity": room.capacity,
                    },
                )

        if not entry.instructor_id:
            report.add_violation(
                constraint_name="assignment.instructor_required",
                severity=ConstraintSeverity.ERROR,
                message=f"Entry has no instructor assigned",
                location=location,
                details={"entry": str(entry)},
            )
        elif instructor_availability and entry.instructor_id in instructor_availability:
            instructor = instructor_availability[entry.instructor_id]
            for meeting in entry.iter_instances():
                if not instructor.is_available_for_meeting(meeting):
                    report.add_violation(
                        constraint_name="assignment.instructor_unavailable",
                        severity=ConstraintSeverity.ERROR,
                        message=f"Instructor {entry.instructor_id} is not available for meeting on {meeting.day.short_name}",
                        location=location,
                        details={"instructor_id": entry.instructor_id, "meeting": str(meeting)},
                    )

    return report


def validate_room_overlaps(
    schedule: Schedule, context: ConstraintContext
) -> ConstraintReport:
    """Validate that no room has overlapping meetings.

    This is a hard constraint - rooms cannot be double-booked.

    Args:
        schedule: The schedule to validate.
        context: Constraint context with validation rules.

    Returns:
        ConstraintReport containing any violations found.
    """
    report = ConstraintReport()
    room_meetings = schedule.get_meetings_by_room()

    for room_id, meetings in room_meetings.items():
        for meeting1, meeting2 in combinations(meetings, 2):
            if meeting1.overlaps(meeting2):
                report.add_violation(
                    constraint_name="overlap.room",
                    severity=ConstraintSeverity.CRITICAL,
                    message=f"Room {room_id} has overlapping meetings",
                    location=f"room:{room_id}",
                    details={
                        "room_id": room_id,
                        "meeting1": str(meeting1),
                        "meeting2": str(meeting2),
                        "day": meeting1.day.short_name,
                    },
                )

    return report


def validate_faculty_overlaps(
    schedule: Schedule, context: ConstraintContext
) -> ConstraintReport:
    """Validate that no instructor has overlapping meetings.

    This is a hard constraint - instructors cannot teach two sessions simultaneously.

    Args:
        schedule: The schedule to validate.
        context: Constraint context with validation rules.

    Returns:
        ConstraintReport containing any violations found.
    """
    report = ConstraintReport()
    instructor_meetings = schedule.get_meetings_by_instructor()

    for instructor_id, meetings in instructor_meetings.items():
        for meeting1, meeting2 in combinations(meetings, 2):
            if meeting1.overlaps(meeting2):
                report.add_violation(
                    constraint_name="overlap.instructor",
                    severity=ConstraintSeverity.CRITICAL,
                    message=f"Instructor {instructor_id} has overlapping meetings",
                    location=f"instructor:{instructor_id}",
                    details={
                        "instructor_id": instructor_id,
                        "meeting1": str(meeting1),
                        "meeting2": str(meeting2),
                        "day": meeting1.day.short_name,
                    },
                )

    return report


def validate_gaps(schedule: Schedule, context: ConstraintContext) -> ConstraintReport:
    """Validate gaps between sessions for instructors and students.

    Checks for:
    - Gaps exceeding maximum allowed time
    - Back-to-back sessions (gap less than minimum)

    Args:
        schedule: The schedule to validate.
        context: Constraint context with validation rules.

    Returns:
        ConstraintReport containing any violations found.
    """
    report = ConstraintReport()
    instructor_meetings = schedule.get_meetings_by_instructor()

    for instructor_id, meetings in instructor_meetings.items():
        meetings_by_day: Dict[DayOfWeek, List[MeetingInstance]] = {}
        for meeting in meetings:
            meetings_by_day.setdefault(meeting.day, []).append(meeting)

        for day, day_meetings in meetings_by_day.items():
            sorted_meetings = sorted(
                day_meetings, key=lambda m: m.time_range.start.total_minutes
            )

            for i in range(len(sorted_meetings) - 1):
                current = sorted_meetings[i]
                next_meeting = sorted_meetings[i + 1]
                gap = next_meeting.time_range.gap_after(current.time_range)

                if gap > context.max_gap_minutes:
                    severity = (
                        ConstraintSeverity.ERROR
                        if context.strict_mode
                        else ConstraintSeverity.WARNING
                    )
                    report.add_violation(
                        constraint_name="gap.excessive",
                        severity=severity,
                        message=f"Gap of {gap} minutes exceeds maximum of {context.max_gap_minutes} minutes",
                        location=f"instructor:{instructor_id}:{day.short_name}",
                        details={
                            "instructor_id": instructor_id,
                            "day": day.short_name,
                            "gap_minutes": gap,
                            "max_gap_minutes": context.max_gap_minutes,
                            "meeting1": str(current),
                            "meeting2": str(next_meeting),
                        },
                    )

                if gap < context.min_gap_minutes:
                    severity = (
                        ConstraintSeverity.ERROR
                        if gap < 0 or context.strict_mode
                        else ConstraintSeverity.WARNING
                    )
                    report.add_violation(
                        constraint_name="gap.insufficient",
                        severity=severity,
                        message=f"Gap of {gap} minutes is less than minimum of {context.min_gap_minutes} minutes",
                        location=f"instructor:{instructor_id}:{day.short_name}",
                        details={
                            "instructor_id": instructor_id,
                            "day": day.short_name,
                            "gap_minutes": gap,
                            "min_gap_minutes": context.min_gap_minutes,
                            "meeting1": str(current),
                            "meeting2": str(next_meeting),
                        },
                    )

    return report


def validate_lab_tutorial_rules(
    schedule: Schedule, context: ConstraintContext
) -> ConstraintReport:
    """Validate lab and tutorial specific constraints.

    Checks:
    - Labs meet minimum duration requirements
    - Tutorials meet minimum duration requirements
    - Labs and tutorials for same course don't overlap inappropriately
    - Same-day lab/tutorial rules (if configured)

    Args:
        schedule: The schedule to validate.
        context: Constraint context with validation rules.

    Returns:
        ConstraintReport containing any violations found.
    """
    report = ConstraintReport()

    course_entries: Dict[str, List[ScheduleEntry]] = {}
    for entry in schedule.entries:
        key = f"{entry.course_id}:{entry.section_id}"
        course_entries.setdefault(key, []).append(entry)

    for entry in schedule.entries:
        if entry.category == SessionCategory.LAB:
            if entry.duration_minutes < context.lab_min_duration_minutes:
                report.add_violation(
                    constraint_name="duration.lab_too_short",
                    severity=ConstraintSeverity.ERROR,
                    message=f"Lab duration {entry.duration_minutes} minutes is less than minimum {context.lab_min_duration_minutes} minutes",
                    location=f"{entry.course_id}:{entry.section_id}",
                    details={
                        "entry": str(entry),
                        "duration_minutes": entry.duration_minutes,
                        "min_duration_minutes": context.lab_min_duration_minutes,
                    },
                )

        elif entry.category == SessionCategory.TUTORIAL:
            if entry.duration_minutes < context.tutorial_min_duration_minutes:
                report.add_violation(
                    constraint_name="duration.tutorial_too_short",
                    severity=ConstraintSeverity.ERROR,
                    message=f"Tutorial duration {entry.duration_minutes} minutes is less than minimum {context.tutorial_min_duration_minutes} minutes",
                    location=f"{entry.course_id}:{entry.section_id}",
                    details={
                        "entry": str(entry),
                        "duration_minutes": entry.duration_minutes,
                        "min_duration_minutes": context.tutorial_min_duration_minutes,
                    },
                )

    if not context.allow_same_day_lab_tutorial:
        for key, entries in course_entries.items():
            lab_entries = [e for e in entries if e.category == SessionCategory.LAB]
            tutorial_entries = [e for e in entries if e.category == SessionCategory.TUTORIAL]

            for lab_entry in lab_entries:
                for tutorial_entry in tutorial_entries:
                    shared_days = set(lab_entry.day_pattern.days) & set(
                        tutorial_entry.day_pattern.days
                    )
                    if shared_days:
                        report.add_violation(
                            constraint_name="lab_tutorial.same_day_conflict",
                            severity=ConstraintSeverity.WARNING,
                            message=f"Lab and tutorial scheduled on same day(s): {', '.join(d.short_name for d in shared_days)}",
                            location=key,
                            details={
                                "course_section": key,
                                "shared_days": [d.short_name for d in shared_days],
                                "lab_entry": str(lab_entry),
                                "tutorial_entry": str(tutorial_entry),
                            },
                        )

    return report


def evaluate_lunch_penalty(
    schedule: Schedule, context: ConstraintContext
) -> ConstraintReport:
    """Evaluate penalty for sessions scheduled during lunch hours.

    This is typically a soft constraint - sessions can be scheduled during lunch,
    but it's undesirable and accumulates a penalty score.

    Args:
        schedule: The schedule to evaluate.
        context: Constraint context with validation rules including lunch time window.

    Returns:
        ConstraintReport with penalty score and INFO-level violations for lunch overlaps.
    """
    report = ConstraintReport()
    total_penalty = 0.0

    for meeting in schedule.iter_meetings():
        lunch_start = context.lunch_start_time
        lunch_end = context.lunch_end_time
        meeting_start = meeting.time_range.start.total_minutes
        meeting_end = meeting.time_range.end.total_minutes

        overlap_start = max(meeting_start, lunch_start)
        overlap_end = min(meeting_end, lunch_end)
        overlap_minutes = max(0, overlap_end - overlap_start)

        if overlap_minutes > 0:
            penalty = overlap_minutes * context.lunch_penalty_weight
            total_penalty += penalty

            report.add_violation(
                constraint_name="lunch.overlap",
                severity=ConstraintSeverity.INFO,
                message=f"Meeting overlaps with lunch period by {overlap_minutes} minutes (penalty: {penalty:.2f})",
                location=f"{meeting.course_id}:{meeting.section_id}:{meeting.day.short_name}",
                details={
                    "meeting": str(meeting),
                    "overlap_minutes": overlap_minutes,
                    "penalty": penalty,
                },
            )

    report.total_score = -total_penalty
    report.metadata["lunch_penalty"] = total_penalty

    return report
