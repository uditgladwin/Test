# API Reference

## Core Data Models

### Time Representations

#### `TimeOfDay`

Immutable representation of a time of day.

**Attributes:**
- `hour: int` - Hour (0-23)
- `minute: int` - Minute (0-59)

**Properties:**
- `total_minutes: int` - Minutes from midnight

**Methods:**
- `from_string(time_str: str) -> TimeOfDay` - Parse from "HH:MM" format

#### `TimeRange`

Immutable time range with start and end times.

**Attributes:**
- `start: TimeOfDay` - Start time
- `end: TimeOfDay` - End time

**Properties:**
- `duration_minutes: int` - Duration in minutes

**Methods:**
- `overlaps(other: TimeRange) -> bool` - Check for overlap
- `gap_after(other: TimeRange) -> int` - Gap in minutes after another range
- `contains(time: TimeOfDay) -> bool` - Check if contains a time

### Day Patterns

#### `DayOfWeek`

Enum of weekdays (MONDAY through SUNDAY).

**Properties:**
- `short_name: str` - Abbreviated name (Mon, Tue, etc.)

#### `DayPattern`

Immutable pattern of days for recurring sessions.

**Attributes:**
- `days: Tuple[DayOfWeek, ...]` - Tuple of days (sorted, unique)

**Class Methods:**
- `from_string(day_str: str) -> DayPattern` - Parse from various formats
- `weekdays() -> DayPattern` - Monday through Friday
- `weekend() -> DayPattern` - Saturday and Sunday

**Methods:**
- `includes(day: DayOfWeek) -> bool` - Check if includes a day

**Supported String Formats:**
- Compound: "MWF", "TR"
- Comma-separated: "Mon,Wed,Fri"
- Space-separated: "Mon Wed Fri"
- Hyphen-separated: "Mon-Wed-Fri"

### Schedule Entities

#### `SessionCategory`

Enum of session types: LECTURE, LAB, TUTORIAL, SEMINAR

#### `ScheduleEntry`

A scheduled course session.

**Attributes:**
- `course_id: str` - Course identifier
- `section_id: str` - Section identifier
- `session_id: Optional[str]` - Session identifier
- `category: SessionCategory` - Type of session
- `day_pattern: DayPattern` - Days the session meets
- `time_range: TimeRange` - Time when session meets
- `room_id: Optional[str]` - Assigned room
- `instructor_id: Optional[str]` - Assigned instructor
- `metadata: Dict[str, Any]` - Additional metadata

**Properties:**
- `duration_minutes: int` - Session duration

**Methods:**
- `iter_instances() -> Iterator[MeetingInstance]` - Expand to individual meetings

#### `MeetingInstance`

A specific meeting occurrence on a single day.

**Attributes:**
- `course_id: str`
- `section_id: str`
- `session_id: str`
- `category: SessionCategory`
- `day: DayOfWeek` - Specific day
- `time_range: TimeRange`
- `room_id: Optional[str]`
- `instructor_id: Optional[str]`
- `metadata: Dict[str, Any]`

**Methods:**
- `overlaps(other: MeetingInstance) -> bool` - Check for overlap

#### `Schedule`

Container for multiple schedule entries.

**Attributes:**
- `entries: List[ScheduleEntry]`

**Methods:**
- `add_entry(entry: ScheduleEntry) -> None`
- `iter_meetings() -> Iterator[MeetingInstance]` - All individual meetings
- `get_meetings_by_room() -> Dict[str, List[MeetingInstance]]`
- `get_meetings_by_instructor() -> Dict[str, List[MeetingInstance]]`

### Resource Availability

#### `AvailabilityWindow`

Time window when a resource is available.

**Attributes:**
- `day: DayOfWeek`
- `time_range: TimeRange`

**Methods:**
- `overlaps(other: AvailabilityWindow) -> bool`
- `contains_meeting(meeting: MeetingInstance) -> bool`

#### `ResourceAvailability`

Availability model for a resource.

**Attributes:**
- `resource_id: str`
- `resource_type: str` - e.g., "room", "instructor"
- `available_windows: List[AvailabilityWindow]`
- `unavailable_windows: List[AvailabilityWindow]`
- `capacity: Optional[int]` - e.g., room capacity
- `attributes: Dict[str, Any]`

**Methods:**
- `is_available_for_meeting(meeting: MeetingInstance) -> bool`
- `add_available_window(day: DayOfWeek, time_range: TimeRange) -> None`
- `add_unavailable_window(day: DayOfWeek, time_range: TimeRange) -> None`

## Constraint System

### Base Classes

#### `ConstraintSeverity`

Enum: INFO, WARNING, ERROR, CRITICAL

#### `ConstraintViolation`

Represents a single constraint violation.

**Attributes:**
- `constraint_name: str`
- `severity: ConstraintSeverity`
- `message: str`
- `details: Dict[str, Any]`
- `location: Optional[str]`

#### `ConstraintReport`

Aggregates violations from validation.

**Attributes:**
- `violations: List[ConstraintViolation]`
- `total_score: Optional[float]`
- `metadata: Dict[str, Any]`

**Methods:**
- `add_violation(...) -> None` - Add a violation
- `has_errors() -> bool` - Check for ERROR/CRITICAL violations
- `has_warnings() -> bool` - Check for WARNING violations
- `is_valid() -> bool` - Check if valid (no errors)
- `get_violations_by_severity(severity) -> List[ConstraintViolation]`
- `get_violations_by_constraint(name) -> List[ConstraintViolation]`
- `summary() -> str` - Human-readable summary

#### `ConstraintContext`

Configuration for constraint validation.

**Attributes:**
- `mode: str` - "verification" or "scheduling"
- `max_gap_minutes: int` - Default: 180
- `min_gap_minutes: int` - Default: 0
- `lunch_start_time: int` - Minutes from midnight, default: 720 (12:00 PM)
- `lunch_end_time: int` - Minutes from midnight, default: 780 (1:00 PM)
- `lunch_penalty_weight: float` - Default: 1.0
- `lab_min_duration_minutes: int` - Default: 120
- `tutorial_min_duration_minutes: int` - Default: 50
- `allow_same_day_lab_tutorial: bool` - Default: False
- `strict_mode: bool` - Default: False
- `custom_rules: Dict[str, Any]`

**Methods:**
- `clone(**overrides) -> ConstraintContext`
- `for_verification(**overrides) -> ConstraintContext` - Preconfigured for verification
- `for_scheduling(**overrides) -> ConstraintContext` - Preconfigured for scheduling

### Validators

All validators take `(schedule: Schedule, context: ConstraintContext)` and return `ConstraintReport`.

#### `validate_assignments(...)`

Check that entries have required assignments and resources are available.

**Additional Parameters:**
- `room_availability: Optional[Dict[str, ResourceAvailability]]`
- `instructor_availability: Optional[Dict[str, ResourceAvailability]]`

**Checks:**
- Room assignment required
- Instructor assignment required
- Room availability
- Instructor availability
- Room capacity

#### `validate_room_overlaps(...)`

Detect double-booked rooms (CRITICAL constraint).

#### `validate_faculty_overlaps(...)`

Detect instructor conflicts (CRITICAL constraint).

#### `validate_gaps(...)`

Check gaps between sessions.

**Violations:**
- `gap.excessive` - Gap exceeds maximum (WARNING or ERROR if strict)
- `gap.insufficient` - Gap less than minimum (WARNING or ERROR if negative/strict)

#### `validate_lab_tutorial_rules(...)`

Enforce lab and tutorial constraints.

**Checks:**
- Lab minimum duration
- Tutorial minimum duration
- Same-day lab/tutorial conflicts (if disallowed)

#### `evaluate_lunch_penalty(...)`

Calculate penalty for lunch period conflicts (soft constraint).

**Returns:**
- INFO violations for overlaps
- Negative total_score based on overlap minutes
- `lunch_penalty` in metadata

### Workflows

#### `ConstraintWorkflow`

Orchestrates multiple validators.

**Constructor:**
```python
ConstraintWorkflow(
    context: Optional[ConstraintContext] = None,
    room_availability: Optional[Dict[str, ResourceAvailability]] = None,
    instructor_availability: Optional[Dict[str, ResourceAvailability]] = None,
)
```

**Methods:**
- `register_validator(validator: ValidatorFunction) -> None`
- `run(schedule: Schedule) -> ConstraintReport` - Run all validators
- `run_verification(schedule: Schedule) -> ConstraintReport` - Verification mode
- `run_scheduling(schedule: Schedule) -> ConstraintReport` - Scheduling mode
- `run_incremental_check(schedule: Schedule, new_entry_index: int) -> ConstraintReport`

#### Functions

##### `default_workflow(...)`

Create workflow with all standard validators.

```python
default_workflow(
    context: Optional[ConstraintContext] = None,
    room_availability: Optional[Dict[str, ResourceAvailability]] = None,
    instructor_availability: Optional[Dict[str, ResourceAvailability]] = None,
) -> ConstraintWorkflow
```

##### `quick_check(...)`

Fast validity check.

```python
quick_check(
    schedule: Schedule,
    context: Optional[ConstraintContext] = None
) -> bool
```

##### `detailed_report(...)`

Comprehensive analysis.

```python
detailed_report(
    schedule: Schedule,
    context: Optional[ConstraintContext] = None,
    room_availability: Optional[Dict[str, ResourceAvailability]] = None,
    instructor_availability: Optional[Dict[str, ResourceAvailability]] = None,
) -> ConstraintReport
```

## Usage Patterns

### Basic Validation

```python
from simulator.constraints import Schedule, quick_check

if quick_check(schedule):
    print("Valid!")
```

### Custom Workflow

```python
from simulator.constraints import (
    ConstraintContext,
    ConstraintWorkflow,
    validate_room_overlaps,
    validate_faculty_overlaps,
)

context = ConstraintContext(strict_mode=True)
workflow = ConstraintWorkflow(context)
workflow.register_validator(validate_room_overlaps)
workflow.register_validator(validate_faculty_overlaps)

report = workflow.run(schedule)
```

### Incremental Checking

```python
workflow = default_workflow()

for entry in entries:
    schedule.add_entry(entry)
    report = workflow.run_incremental_check(
        schedule, len(schedule.entries) - 1
    )
    if report.has_errors():
        schedule.entries.pop()
```

### Two-Phase Scheduling

```python
# Phase 1: Build with lenient constraints
scheduling_context = ConstraintContext.for_scheduling(max_gap_minutes=300)
scheduling_workflow = default_workflow(scheduling_context)

# ... build schedule ...

# Phase 2: Verify with strict constraints
verification_context = ConstraintContext.for_verification(
    strict_mode=True,
    max_gap_minutes=180
)
verification_workflow = default_workflow(verification_context)
final_report = verification_workflow.run_verification(schedule)
```
