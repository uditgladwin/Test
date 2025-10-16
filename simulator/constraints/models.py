"""Data models for schedule entities and time representations."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, Iterator, List, Optional, Tuple


class DayOfWeek(Enum):
    """Enumeration of the days of the week with helper methods."""

    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4
    SATURDAY = 5
    SUNDAY = 6

    @property
    def short_name(self) -> str:
        """Short name representation."""
        mapping = {
            DayOfWeek.MONDAY: "Mon",
            DayOfWeek.TUESDAY: "Tue",
            DayOfWeek.WEDNESDAY: "Wed",
            DayOfWeek.THURSDAY: "Thu",
            DayOfWeek.FRIDAY: "Fri",
            DayOfWeek.SATURDAY: "Sat",
            DayOfWeek.SUNDAY: "Sun",
        }
        return mapping[self]

    def __str__(self) -> str:
        """String representation of the day."""
        return self.short_name


DAY_ALIASES = {
    "M": DayOfWeek.MONDAY,
    "MON": DayOfWeek.MONDAY,
    "MONDAY": DayOfWeek.MONDAY,
    "T": DayOfWeek.TUESDAY,
    "TU": DayOfWeek.TUESDAY,
    "TUE": DayOfWeek.TUESDAY,
    "TUES": DayOfWeek.TUESDAY,
    "TUESDAY": DayOfWeek.TUESDAY,
    "W": DayOfWeek.WEDNESDAY,
    "WE": DayOfWeek.WEDNESDAY,
    "WED": DayOfWeek.WEDNESDAY,
    "WEDS": DayOfWeek.WEDNESDAY,
    "WEDNESDAY": DayOfWeek.WEDNESDAY,
    "R": DayOfWeek.THURSDAY,
    "H": DayOfWeek.THURSDAY,
    "TH": DayOfWeek.THURSDAY,
    "THU": DayOfWeek.THURSDAY,
    "THUR": DayOfWeek.THURSDAY,
    "THURS": DayOfWeek.THURSDAY,
    "THURSDAY": DayOfWeek.THURSDAY,
    "F": DayOfWeek.FRIDAY,
    "FR": DayOfWeek.FRIDAY,
    "FRI": DayOfWeek.FRIDAY,
    "FRIDAY": DayOfWeek.FRIDAY,
    "S": DayOfWeek.SATURDAY,
    "SA": DayOfWeek.SATURDAY,
    "SAT": DayOfWeek.SATURDAY,
    "SATURDAY": DayOfWeek.SATURDAY,
    "U": DayOfWeek.SUNDAY,
    "SU": DayOfWeek.SUNDAY,
    "SUN": DayOfWeek.SUNDAY,
    "SUNDAY": DayOfWeek.SUNDAY,
}

_MAX_DAY_TOKEN_LENGTH = max(len(token) for token in DAY_ALIASES)


def parse_day_token(token: str) -> DayOfWeek:
    """Parse a day token into a DayOfWeek."""
    token = token.strip().upper()
    if token not in DAY_ALIASES:
        raise ValueError(f"Unknown day token: {token}")
    return DAY_ALIASES[token]


def _expand_compound_day_token(token: str) -> List[DayOfWeek]:
    """Expand a compound token (e.g., "MWF") into individual days."""
    token = token.strip().upper()
    if not token:
        return []

    if token in DAY_ALIASES:
        return [DAY_ALIASES[token]]

    days: List[DayOfWeek] = []
    index = 0
    length = len(token)

    while index < length:
        matched = False
        max_len = min(_MAX_DAY_TOKEN_LENGTH, length - index)
        for chunk_len in range(max_len, 0, -1):
            chunk = token[index : index + chunk_len]
            if chunk in DAY_ALIASES:
                days.append(DAY_ALIASES[chunk])
                index += chunk_len
                matched = True
                break
        if not matched:
            raise ValueError(f"Unknown day token: {token}")

    return days


@dataclass(frozen=True)
class TimeOfDay:
    """Represents a time of day in hours and minutes."""

    hour: int
    minute: int

    def __post_init__(self) -> None:
        if not (0 <= self.hour < 24):
            raise ValueError("Hour must be between 0 and 23")
        if not (0 <= self.minute < 60):
            raise ValueError("Minute must be between 0 and 59")

    @property
    def total_minutes(self) -> int:
        """Total minutes from midnight."""
        return self.hour * 60 + self.minute

    @classmethod
    def from_string(cls, time_str: str) -> "TimeOfDay":
        """Create a TimeOfDay from a HH:MM string."""
        hour_str, minute_str = time_str.split(":")
        return cls(int(hour_str), int(minute_str))

    def __str__(self) -> str:
        return f"{self.hour:02}:{self.minute:02}"


@dataclass(frozen=True)
class TimeRange:
    """Represents a time range with start and end times."""

    start: TimeOfDay
    end: TimeOfDay

    def __post_init__(self) -> None:
        if self.end.total_minutes <= self.start.total_minutes:
            raise ValueError("End time must be after start time")

    @property
    def duration_minutes(self) -> int:
        """Duration of the time range in minutes."""
        return self.end.total_minutes - self.start.total_minutes

    def overlaps(self, other: "TimeRange") -> bool:
        """Check if two time ranges overlap."""
        latest_start = max(self.start.total_minutes, other.start.total_minutes)
        earliest_end = min(self.end.total_minutes, other.end.total_minutes)
        return latest_start < earliest_end

    def gap_after(self, other: "TimeRange") -> int:
        """Return the gap in minutes after another time range."""
        return self.start.total_minutes - other.end.total_minutes

    def contains(self, time: TimeOfDay) -> bool:
        """Check if the time range contains a specific time."""
        return self.start.total_minutes <= time.total_minutes < self.end.total_minutes

    def __str__(self) -> str:
        return f"{self.start} - {self.end}"


@dataclass(frozen=True)
class DayPattern:
    """Represents a pattern of days for recurring sessions."""

    days: Tuple[DayOfWeek, ...]
    
    def __post_init__(self) -> None:
        if not self.days:
            raise ValueError("DayPattern must have at least one day")
        object.__setattr__(self, "days", tuple(sorted(set(self.days), key=lambda d: d.value)))

    @classmethod
    def weekdays(cls) -> "DayPattern":
        """Return a DayPattern for Monday through Friday."""
        return cls(tuple(DAY_ALIASES[token] for token in ["M", "T", "W", "TH", "F"]))

    @classmethod
    def weekend(cls) -> "DayPattern":
        """Return a DayPattern for Saturday and Sunday."""
        return cls((DayOfWeek.SATURDAY, DayOfWeek.SUNDAY))

    @classmethod
    def from_string(cls, day_str: str) -> "DayPattern":
        """Parse a string into a DayPattern.

        Supports several formats:
        - Comma-separated: "Mon, Wed, Fri" or "M,W,F"
        - Space-separated: "Mon Wed Fri"
        - Hyphen-separated: "Mon-Wed-Fri"
        - Compound tokens: "MWF" or "TR"
        - Individual letters: "M W F"
        """
        day_str = day_str.strip().upper()
        if not day_str:
            raise ValueError("Empty day string")

        normalized = re.sub(r"[\s,;/\\-]+", " ", day_str)
        tokens = [token for token in normalized.split(" ") if token]
        if not tokens:
            raise ValueError(f"Unable to parse day pattern from '{day_str}'")

        days: List[DayOfWeek] = []
        for token in tokens:
            days.extend(_expand_compound_day_token(token))

        return cls(tuple(days))

    def includes(self, day: DayOfWeek) -> bool:
        """Check if the pattern includes a specific day."""
        return day in self.days

    def __iter__(self) -> Iterator[DayOfWeek]:
        return iter(self.days)

    def __len__(self) -> int:
        return len(self.days)

    def __str__(self) -> str:
        return ", ".join(day.short_name for day in self.days)


class SessionCategory(Enum):
    """Categories of sessions (lecture, lab, tutorial, etc.)."""

    LECTURE = "lecture"
    LAB = "lab"
    TUTORIAL = "tutorial"
    SEMINAR = "seminar"


@dataclass
class ScheduleEntry:
    """Represents a single schedule entry for a course session."""

    course_id: str
    section_id: str
    session_id: Optional[str]
    category: SessionCategory
    day_pattern: DayPattern
    time_range: TimeRange
    room_id: Optional[str] = None
    instructor_id: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)

    @property
    def duration_minutes(self) -> int:
        """Duration of the session."""
        return self.time_range.duration_minutes

    def iter_instances(self) -> Iterator["MeetingInstance"]:
        """Iterate over individual meeting instances for each day.

        Yields:
            MeetingInstance objects for each day in the day pattern.
        """
        for day in self.day_pattern:
            yield MeetingInstance(
                course_id=self.course_id,
                section_id=self.section_id,
                session_id=self.session_id or f"{self.course_id}:{self.section_id}:{day.name}",
                category=self.category,
                day=day,
                time_range=self.time_range,
                room_id=self.room_id,
                instructor_id=self.instructor_id,
                metadata=dict(self.metadata),
            )

    def __str__(self) -> str:
        session = self.session_id or "?"
        return (
            f"{self.course_id} ({self.section_id}) session {session}"
            f" on {self.day_pattern} at {self.time_range}"
        )


@dataclass(frozen=True)
class MeetingInstance:
    """Represents a single scheduled meeting instance on a specific day."""

    course_id: str
    section_id: str
    session_id: str
    category: SessionCategory
    day: DayOfWeek
    time_range: TimeRange
    room_id: Optional[str]
    instructor_id: Optional[str]
    metadata: Dict[str, Any] = field(default_factory=dict)

    def overlaps(self, other: "MeetingInstance") -> bool:
        """Check if two meeting instances overlap in time on the same day."""
        return self.day == other.day and self.time_range.overlaps(other.time_range)

    def __str__(self) -> str:
        return (
            f"{self.course_id} {self.section_id} ({self.category.value})"
            f" on {self.day.short_name} at {self.time_range}"
        )


@dataclass
class Schedule:
    """Represents a complete schedule containing multiple entries."""

    entries: List[ScheduleEntry] = field(default_factory=list)

    def add_entry(self, entry: ScheduleEntry) -> None:
        """Add a schedule entry."""
        self.entries.append(entry)

    def iter_meetings(self) -> Iterator[MeetingInstance]:
        """Iterate over all meeting instances in the schedule."""
        for entry in self.entries:
            yield from entry.iter_instances()

    def get_meetings_by_room(self) -> Dict[str, List[MeetingInstance]]:
        """Group meetings by room."""
        meetings: Dict[str, List[MeetingInstance]] = {}
        for instance in self.iter_meetings():
            if instance.room_id:
                meetings.setdefault(instance.room_id, []).append(instance)
        return meetings

    def get_meetings_by_instructor(self) -> Dict[str, List[MeetingInstance]]:
        """Group meetings by instructor."""
        meetings: Dict[str, List[MeetingInstance]] = {}
        for instance in self.iter_meetings():
            if instance.instructor_id:
                meetings.setdefault(instance.instructor_id, []).append(instance)
        return meetings


@dataclass(frozen=True)
class AvailabilityWindow:
    """Represents a window of availability for a resource."""

    day: DayOfWeek
    time_range: TimeRange

    def overlaps(self, other: "AvailabilityWindow") -> bool:
        """Check if two availability windows overlap."""
        return self.day == other.day and self.time_range.overlaps(other.time_range)

    def contains_meeting(self, meeting: MeetingInstance) -> bool:
        """Check if this availability window fully contains a meeting instance."""
        if self.day != meeting.day:
            return False
        return (
            self.time_range.start.total_minutes <= meeting.time_range.start.total_minutes
            and meeting.time_range.end.total_minutes <= self.time_range.end.total_minutes
        )


@dataclass
class ResourceAvailability:
    """Represents the availability model for a resource (room, instructor, etc.).

    Attributes:
        resource_id: Unique identifier for the resource.
        resource_type: Type of resource (e.g., "room", "instructor").
        available_windows: List of time windows when the resource is available.
        unavailable_windows: List of time windows when the resource is explicitly unavailable.
        capacity: Optional capacity constraint (e.g., room capacity).
        attributes: Additional attributes for the resource.
    """

    resource_id: str
    resource_type: str
    available_windows: List[AvailabilityWindow] = field(default_factory=list)
    unavailable_windows: List[AvailabilityWindow] = field(default_factory=list)
    capacity: Optional[int] = None
    attributes: Dict[str, Any] = field(default_factory=dict)

    def is_available_for_meeting(self, meeting: MeetingInstance) -> bool:
        """Check if the resource is available for a given meeting instance.

        Args:
            meeting: The meeting instance to check.

        Returns:
            True if the resource is available, False otherwise.
        """
        for unavailable in self.unavailable_windows:
            if unavailable.day == meeting.day and unavailable.time_range.overlaps(meeting.time_range):
                return False

        if not self.available_windows:
            return True

        for available in self.available_windows:
            if available.contains_meeting(meeting):
                return True

        return False

    def add_available_window(self, day: DayOfWeek, time_range: TimeRange) -> None:
        """Add an availability window."""
        self.available_windows.append(AvailabilityWindow(day, time_range))

    def add_unavailable_window(self, day: DayOfWeek, time_range: TimeRange) -> None:
        """Add an unavailability window."""
        self.unavailable_windows.append(AvailabilityWindow(day, time_range))
