# Constraint Workflow Guide

This guide explains how to use the constraint checking workflows in different scenarios.

## Workflow Modes

The constraint system supports two primary modes:

### Verification Mode

Used to validate a complete schedule after construction. This mode:
- Runs all validators
- Reports all violations
- Typically used at the end of scheduling or when validating external input

```python
from simulator.constraints import default_workflow, Schedule

workflow = default_workflow()
report = workflow.run_verification(schedule)

if report.is_valid():
    print("Schedule passes all hard constraints!")
else:
    print(f"Violations found: {report.summary()}")
```

### Scheduling Mode

Used during schedule construction. This mode:
- May apply softer thresholds
- Can be configured differently than verification
- Used to guide scheduling decisions

```python
workflow = default_workflow()
report = workflow.run_scheduling(schedule)

# Use report to guide scheduling decisions
if report.has_errors():
    # Backtrack or try alternative
    pass
```

## Incremental Checking

When building a schedule incrementally, you can check only the newly added entry:

```python
schedule = Schedule()

# Add entries one at a time
schedule.add_entry(new_entry)

# Check only the new entry's impact
report = workflow.run_incremental_check(schedule, len(schedule.entries) - 1)

if report.has_errors():
    # Remove the entry and try another option
    schedule.entries.pop()
```

This is much faster than re-validating the entire schedule for each addition.

## Customizing Validators

Create a custom workflow with specific validators:

```python
from simulator.constraints import (
    ConstraintWorkflow,
    validate_room_overlaps,
    validate_faculty_overlaps,
)

# Create custom workflow with only hard constraints
workflow = ConstraintWorkflow()
workflow.register_validator(validate_room_overlaps)
workflow.register_validator(validate_faculty_overlaps)

report = workflow.run(schedule)
```

## Custom Constraint Context

Configure validation rules:

```python
from simulator.constraints import ConstraintContext, default_workflow

# Strict verification context
verification_context = ConstraintContext.for_verification(
    strict_mode=True,  # Warnings become errors
    max_gap_minutes=120,
    lab_min_duration_minutes=150,
)

# Lenient scheduling context
scheduling_context = ConstraintContext.for_scheduling(
    strict_mode=False,
    max_gap_minutes=240,  # Allow longer gaps during construction
)

# Use different contexts for different phases
verification_workflow = default_workflow(verification_context)
scheduling_workflow = default_workflow(scheduling_context)
```

## Using Resource Availability

Define when resources are available:

```python
from simulator.constraints import (
    ResourceAvailability,
    AvailabilityWindow,
    DayOfWeek,
    TimeOfDay,
    TimeRange,
)

# Create room availability
room_101 = ResourceAvailability(
    resource_id="Room101",
    resource_type="room",
    capacity=30,
)

# Define available hours
for day in DayPattern.weekdays():
    room_101.add_available_window(
        day, TimeRange(TimeOfDay(8, 0), TimeOfDay(18, 0))
    )

# Block out specific times
room_101.add_unavailable_window(
    DayOfWeek.WEDNESDAY,
    TimeRange(TimeOfDay(14, 0), TimeOfDay(16, 0))
)

# Similarly for instructors
prof_smith = ResourceAvailability(
    resource_id="Prof_Smith",
    resource_type="instructor",
)

# Add availability windows...

# Create workflow with availability data
workflow = default_workflow(
    room_availability={"Room101": room_101},
    instructor_availability={"Prof_Smith": prof_smith},
)

report = workflow.run(schedule)
```

## Interpreting Reports

The `ConstraintReport` provides several ways to examine results:

```python
report = workflow.run(schedule)

# Check validity
if report.is_valid():
    print("No critical errors")

# Get summary
print(report.summary())  # "Found 3 errors, 5 warnings"

# Filter by severity
errors = report.get_violations_by_severity(ConstraintSeverity.ERROR)
warnings = report.get_violations_by_severity(ConstraintSeverity.WARNING)

# Filter by constraint type
room_conflicts = report.get_violations_by_constraint("overlap.room")
gap_issues = report.get_violations_by_constraint("gap.excessive")

# Access penalty scores
if report.total_score is not None:
    print(f"Schedule score: {report.total_score}")
    
lunch_penalty = report.metadata.get("lunch_penalty", 0)
print(f"Lunch penalty: {lunch_penalty}")

# Examine individual violations
for violation in report.violations:
    print(f"{violation.severity.value}: {violation.message}")
    print(f"  Location: {violation.location}")
    print(f"  Details: {violation.details}")
```

## Best Practices

### For Verification Workflows

1. Use strict mode to catch all issues
2. Include all validators
3. Provide resource availability data when possible
4. Check `is_valid()` for hard constraints
5. Review warnings for quality improvements

### For Scheduling Workflows

1. Use incremental checking for efficiency
2. Configure more lenient thresholds initially
3. Tighten constraints progressively
4. Use penalty scores to compare alternatives
5. Switch to verification mode for final check

### For Performance

1. Pre-compute resource availability once
2. Use incremental checking during construction
3. Run full validation only when necessary
4. Consider custom workflows with fewer validators for preliminary checks

## Example: Two-Phase Scheduling

```python
from simulator.constraints import ConstraintContext, default_workflow

# Phase 1: Build schedule with lenient constraints
scheduling_context = ConstraintContext.for_scheduling(
    max_gap_minutes=300,
    strict_mode=False,
)
scheduling_workflow = default_workflow(scheduling_context)

schedule = Schedule()
for entry in candidate_entries:
    schedule.add_entry(entry)
    report = scheduling_workflow.run_incremental_check(
        schedule, len(schedule.entries) - 1
    )
    if report.has_errors():
        # Backtrack
        schedule.entries.pop()
        # Try alternative...

# Phase 2: Verify with strict constraints
verification_context = ConstraintContext.for_verification(
    max_gap_minutes=180,
    strict_mode=True,
)
verification_workflow = default_workflow(verification_context)

final_report = verification_workflow.run_verification(schedule)

if final_report.is_valid():
    print("Schedule successfully validated!")
else:
    print("Refinement needed:")
    for violation in final_report.violations:
        print(f"  {violation}")
```

## Integration with Schedulers

The constraint system is designed to support both types of schedulers:

### Greedy/Heuristic Schedulers

```python
def greedy_schedule(entries, workflow):
    schedule = Schedule()
    
    for entry in sorted(entries, key=lambda e: e.priority):
        schedule.add_entry(entry)
        
        report = workflow.run_incremental_check(
            schedule, len(schedule.entries) - 1
        )
        
        if report.has_errors():
            # Try alternative room/time
            schedule.entries.pop()
            entry_modified = try_alternative(entry)
            schedule.add_entry(entry_modified)
            
            report = workflow.run_incremental_check(
                schedule, len(schedule.entries) - 1
            )
            
            if report.has_errors():
                # Give up on this entry
                schedule.entries.pop()
    
    return schedule
```

### Optimization-Based Schedulers

```python
def evaluate_solution(schedule, workflow):
    """Evaluate a candidate solution."""
    report = workflow.run(schedule)
    
    if not report.is_valid():
        return float("-inf")  # Invalid solution
    
    # Use penalty scores for soft constraints
    return report.total_score or 0.0

def simulated_annealing_schedule(initial_schedule, workflow):
    current = initial_schedule
    best = current
    best_score = evaluate_solution(best, workflow)
    
    for iteration in range(max_iterations):
        candidate = perturb(current)
        score = evaluate_solution(candidate, workflow)
        
        if accept(score, best_score, temperature):
            current = candidate
            if score > best_score:
                best = candidate
                best_score = score
        
        temperature = cool(temperature)
    
    return best
```
