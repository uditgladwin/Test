# Course Scheduling Simulator - Constraint Modeling

This package provides shared constraint modeling utilities for course scheduling simulators.

## Overview

The `simulator.constraints` package provides reusable components for:

- **Day patterns and time representations**: Model recurring class schedules
- **Resource availability**: Define when rooms and instructors are available
- **Constraint validators**: Check schedules for conflicts and violations
- **Constraint workflows**: Orchestrate multiple validators for comprehensive checking

## Key Components

### Data Models (`models.py`)

- `DayOfWeek`: Enumeration of weekdays with parsing utilities
- `TimeOfDay`, `TimeRange`: Time representations with validation
- `DayPattern`: Patterns for recurring sessions (e.g., MWF, TR)
- `ScheduleEntry`: A scheduled course session with time and resource assignments
- `MeetingInstance`: A specific meeting occurrence on a particular day
- `Schedule`: Container for multiple schedule entries
- `AvailabilityWindow`: Time window when a resource is available
- `ResourceAvailability`: Model for room/instructor availability constraints

### Base Classes (`base.py`)

- `ConstraintSeverity`: INFO, WARNING, ERROR, CRITICAL
- `ConstraintViolation`: Represents a single constraint violation
- `ConstraintReport`: Aggregates violations with scoring
- `ConstraintContext`: Configuration for constraint validation rules

### Validators (`validators.py`)

Individual constraint checking functions:

- `validate_assignments()`: Check room and instructor assignments
- `validate_room_overlaps()`: Detect double-booked rooms
- `validate_faculty_overlaps()`: Detect instructor conflicts
- `validate_gaps()`: Check gaps between sessions
- `validate_lab_tutorial_rules()`: Enforce lab/tutorial constraints
- `evaluate_lunch_penalty()`: Score lunch period conflicts (soft constraint)

### Workflows (`workflows.py`)

- `ConstraintWorkflow`: Orchestrates multiple validators
- `default_workflow()`: Pre-configured workflow with all standard validators
- `quick_check()`: Fast validity check for a schedule
- `detailed_report()`: Comprehensive constraint analysis

## Usage Examples

### Basic Schedule Validation

```python
from simulator.constraints import (
    Schedule,
    ScheduleEntry,
    DayPattern,
    TimeRange,
    TimeOfDay,
    SessionCategory,
    default_workflow,
)

# Create a schedule
schedule = Schedule()
schedule.add_entry(ScheduleEntry(
    course_id="CS101",
    section_id="A",
    session_id="lec1",
    category=SessionCategory.LECTURE,
    day_pattern=DayPattern.from_string("MWF"),
    time_range=TimeRange(
        TimeOfDay(9, 0),
        TimeOfDay(9, 50),
    ),
    room_id="Room101",
    instructor_id="Prof_Smith",
))

# Validate the schedule
workflow = default_workflow()
report = workflow.run(schedule)

# Check results
if report.is_valid():
    print("Schedule is valid!")
else:
    print(f"Found violations: {report.summary()}")
    for violation in report.violations:
        print(f"  {violation}")
```

### Custom Constraint Context

```python
from simulator.constraints import ConstraintContext, default_workflow

# Create custom context
context = ConstraintContext(
    max_gap_minutes=120,  # Max 2-hour gap
    lunch_start_time=12*60,  # 12:00 PM
    lunch_end_time=13*60,  # 1:00 PM
    lab_min_duration_minutes=150,  # 2.5 hours minimum
    strict_mode=True,  # Treat warnings as errors
)

workflow = default_workflow(context)
report = workflow.run(schedule)
```

### Resource Availability

```python
from simulator.constraints import (
    ResourceAvailability,
    AvailabilityWindow,
    DayOfWeek,
    TimeOfDay,
    TimeRange,
    default_workflow,
)

# Define room availability
room_avail = ResourceAvailability(
    resource_id="Room101",
    resource_type="room",
    capacity=30,
)

# Room available M-F 8am-6pm
for day in [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
            DayOfWeek.THURSDAY, DayOfWeek.FRIDAY]:
    room_avail.add_available_window(
        day,
        TimeRange(TimeOfDay(8, 0), TimeOfDay(18, 0))
    )

# Check schedule against availability
workflow = default_workflow(
    room_availability={"Room101": room_avail}
)
report = workflow.run(schedule)
```

### Incremental Checking

```python
# For use during schedule construction
workflow = default_workflow()

# Check only the newly added entry
report = workflow.run_incremental_check(schedule, new_entry_index=5)
if report.has_errors():
    print("New entry causes conflicts!")
```

## Constraint Types

### Hard Constraints (CRITICAL/ERROR)

- No room overlaps (double-booking)
- No instructor overlaps (teaching two classes simultaneously)
- Required assignments (room, instructor)
- Resource availability
- Minimum session durations

### Soft Constraints (WARNING/INFO)

- Excessive gaps between sessions
- Lunch period conflicts
- Same-day lab/tutorial scheduling
- Insufficient gaps between back-to-back sessions

## Extending the System

### Adding Custom Validators

```python
from simulator.constraints import (
    ConstraintReport,
    ConstraintSeverity,
    ConstraintWorkflow,
)

def validate_custom_rule(schedule, context):
    report = ConstraintReport()
    
    for entry in schedule.entries:
        # Your custom validation logic
        if some_condition:
            report.add_violation(
                constraint_name="custom.my_rule",
                severity=ConstraintSeverity.WARNING,
                message="Custom rule violated",
                location=f"{entry.course_id}:{entry.section_id}",
            )
    
    return report

# Register with workflow
workflow = ConstraintWorkflow()
workflow.register_validator(validate_custom_rule)
```

## Testing

Run tests with:

```bash
python -m pytest tests/
```

## License

TBD
