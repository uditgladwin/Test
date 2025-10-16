"""Tests for constraint validators."""

from simulator.constraints import (
    ConstraintContext,
    DayPattern,
    Schedule,
    ScheduleEntry,
    SessionCategory,
    TimeOfDay,
    TimeRange,
    validate_room_overlaps,
    validate_faculty_overlaps,
    validate_lab_tutorial_rules,
)


def test_room_overlap_detection() -> None:
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

    context = ConstraintContext()
    report = validate_room_overlaps(schedule, context)

    assert not report.is_valid()
    assert len(report.violations) == 3


def test_faculty_overlap_detection() -> None:
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
            time_range=TimeRange(TimeOfDay(9, 30), TimeOfDay(10, 20)),
            room_id="Room102",
            instructor_id="Prof_Smith",
        )
    )

    context = ConstraintContext()
    report = validate_faculty_overlaps(schedule, context)

    assert not report.is_valid()
    assert len(report.violations) == 1


def test_lab_duration_validation() -> None:
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
    report = validate_lab_tutorial_rules(schedule, context)

    assert not report.is_valid()
    assert len(report.violations) == 1
    assert "lab_too_short" in report.violations[0].constraint_name
