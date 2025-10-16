"""Shared constraint modeling utilities for the scheduling simulator."""

from .base import (
    ConstraintContext,
    ConstraintReport,
    ConstraintSeverity,
    ConstraintViolation,
)
from .models import (
    DayOfWeek,
    DayPattern,
    MeetingInstance,
    Schedule,
    ScheduleEntry,
    SessionCategory,
    TimeOfDay,
    TimeRange,
    AvailabilityWindow,
    ResourceAvailability,
)
from .validators import (
    validate_assignments,
    validate_faculty_overlaps,
    validate_gaps,
    validate_lab_tutorial_rules,
    validate_room_overlaps,
    evaluate_lunch_penalty,
)
from .workflows import ConstraintWorkflow, default_workflow, detailed_report, quick_check

__all__ = [
    "ConstraintContext",
    "ConstraintReport",
    "ConstraintSeverity",
    "ConstraintViolation",
    "DayOfWeek",
    "DayPattern",
    "MeetingInstance",
    "Schedule",
    "ScheduleEntry",
    "SessionCategory",
    "TimeOfDay",
    "TimeRange",
    "AvailabilityWindow",
    "ResourceAvailability",
    "validate_assignments",
    "validate_faculty_overlaps",
    "validate_gaps",
    "validate_lab_tutorial_rules",
    "validate_room_overlaps",
    "evaluate_lunch_penalty",
    "ConstraintWorkflow",
    "default_workflow",
    "detailed_report",
    "quick_check",
]
