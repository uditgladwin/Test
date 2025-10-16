"""Basic usage examples for the constraint modeling system."""

import os
import sys

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from simulator.constraints import (
    ConstraintContext,
    DayOfWeek,
    DayPattern,
    ResourceAvailability,
    Schedule,
    ScheduleEntry,
    SessionCategory,
    TimeOfDay,
    TimeRange,
    default_workflow,
    quick_check,
)


def example_simple_validation():
    """Example of simple schedule validation."""
    print("=== Example 1: Simple Schedule Validation ===\n")

    schedule = Schedule()

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS101",
            section_id="A",
            session_id="lec1",
            category=SessionCategory.LECTURE,
            day_pattern=DayPattern.from_string("MWF"),
            time_range=TimeRange(TimeOfDay(9, 0), TimeOfDay(9, 50)),
            room_id="Room101",
            instructor_id="Prof_Smith",
        )
    )

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS102",
            section_id="A",
            session_id="lec1",
            category=SessionCategory.LECTURE,
            day_pattern=DayPattern.from_string("MWF"),
            time_range=TimeRange(TimeOfDay(10, 0), TimeOfDay(10, 50)),
            room_id="Room102",
            instructor_id="Prof_Jones",
        )
    )

    is_valid = quick_check(schedule)
    print(f"Schedule valid: {is_valid}\n")


def example_overlapping_rooms():
    """Example with room overlap conflict."""
    print("=== Example 2: Room Overlap Detection ===\n")

    schedule = Schedule()

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS101",
            section_id="A",
            session_id="lec1",
            category=SessionCategory.LECTURE,
            day_pattern=DayPattern.from_string("MWF"),
            time_range=TimeRange(TimeOfDay(9, 0), TimeOfDay(9, 50)),
            room_id="Room101",
            instructor_id="Prof_Smith",
        )
    )

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS102",
            section_id="A",
            session_id="lec1",
            category=SessionCategory.LECTURE,
            day_pattern=DayPattern.from_string("MWF"),
            time_range=TimeRange(TimeOfDay(9, 30), TimeOfDay(10, 20)),
            room_id="Room101",
            instructor_id="Prof_Jones",
        )
    )

    workflow = default_workflow()
    report = workflow.run(schedule)

    print(f"Valid: {report.is_valid()}")
    print(f"Summary: {report.summary()}\n")

    if not report.is_valid():
        print("Violations:")
        for violation in report.violations:
            print(f"  - {violation}")
    print()


def example_resource_availability():
    """Example using resource availability constraints."""
    print("=== Example 3: Resource Availability ===\n")

    schedule = Schedule()

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS101",
            section_id="A",
            session_id="lec1",
            category=SessionCategory.LECTURE,
            day_pattern=DayPattern.from_string("MWF"),
            time_range=TimeRange(TimeOfDay(8, 0), TimeOfDay(8, 50)),
            room_id="Room101",
            instructor_id="Prof_Smith",
        )
    )

    room_avail = ResourceAvailability(
        resource_id="Room101",
        resource_type="room",
        capacity=30,
    )

    for day in [
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
    ]:
        room_avail.add_available_window(
            day, TimeRange(TimeOfDay(9, 0), TimeOfDay(18, 0))
        )

    workflow = default_workflow(room_availability={"Room101": room_avail})
    report = workflow.run(schedule)

    print(f"Valid: {report.is_valid()}")
    print(f"Summary: {report.summary()}\n")

    if not report.is_valid():
        print("Violations:")
        for violation in report.violations:
            print(f"  - {violation}")
    print()


def example_lab_constraints():
    """Example with lab duration constraints."""
    print("=== Example 4: Lab Duration Constraints ===\n")

    schedule = Schedule()

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS101",
            section_id="A",
            session_id="lab1",
            category=SessionCategory.LAB,
            day_pattern=DayPattern.from_string("T"),
            time_range=TimeRange(TimeOfDay(14, 0), TimeOfDay(15, 0)),
            room_id="Lab101",
            instructor_id="TA_Alice",
        )
    )

    context = ConstraintContext(lab_min_duration_minutes=120)

    workflow = default_workflow(context)
    report = workflow.run(schedule)

    print(f"Valid: {report.is_valid()}")
    print(f"Summary: {report.summary()}\n")

    if not report.is_valid():
        print("Violations:")
        for violation in report.violations:
            print(f"  - {violation}")
    print()


def example_lunch_penalty():
    """Example evaluating lunch period conflicts."""
    print("=== Example 5: Lunch Period Penalty ===\n")

    schedule = Schedule()

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS101",
            section_id="A",
            session_id="lec1",
            category=SessionCategory.LECTURE,
            day_pattern=DayPattern.from_string("MWF"),
            time_range=TimeRange(TimeOfDay(12, 0), TimeOfDay(12, 50)),
            room_id="Room101",
            instructor_id="Prof_Smith",
        )
    )

    workflow = default_workflow()
    report = workflow.run(schedule)

    print(f"Valid: {report.is_valid()}")
    print(f"Total score: {report.total_score}")
    print(f"Lunch penalty: {report.metadata.get('lunch_penalty', 0)}\n")

    info_violations = [
        v for v in report.violations if v.constraint_name.startswith("lunch.")
    ]
    if info_violations:
        print("Lunch conflicts:")
        for violation in info_violations:
            print(f"  - {violation}")
    print()


def example_gaps():
    """Example with gap constraints."""
    print("=== Example 6: Gap Constraints ===\n")

    schedule = Schedule()

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS101",
            section_id="A",
            session_id="lec1",
            category=SessionCategory.LECTURE,
            day_pattern=DayPattern.from_string("M"),
            time_range=TimeRange(TimeOfDay(9, 0), TimeOfDay(9, 50)),
            room_id="Room101",
            instructor_id="Prof_Smith",
        )
    )

    schedule.add_entry(
        ScheduleEntry(
            course_id="CS102",
            section_id="A",
            session_id="lec1",
            category=SessionCategory.LECTURE,
            day_pattern=DayPattern.from_string("M"),
            time_range=TimeRange(TimeOfDay(14, 0), TimeOfDay(14, 50)),
            room_id="Room102",
            instructor_id="Prof_Smith",
        )
    )

    context = ConstraintContext(max_gap_minutes=180)

    workflow = default_workflow(context)
    report = workflow.run(schedule)

    print(f"Valid: {report.is_valid()}")
    print(f"Summary: {report.summary()}\n")

    gap_violations = [v for v in report.violations if "gap" in v.constraint_name]
    if gap_violations:
        print("Gap violations:")
        for violation in gap_violations:
            print(f"  - {violation}")
    print()


def main():
    """Run all examples."""
    example_simple_validation()
    example_overlapping_rooms()
    example_resource_availability()
    example_lab_constraints()
    example_lunch_penalty()
    example_gaps()


if __name__ == "__main__":
    main()
