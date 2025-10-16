"""Base classes and types for constraint modeling."""

from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional


class ConstraintSeverity(Enum):
    """Severity level of a constraint violation."""
    
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"


@dataclass
class ConstraintViolation:
    """Represents a single constraint violation.
    
    Attributes:
        constraint_name: Name of the constraint that was violated.
        severity: Severity level of the violation.
        message: Human-readable description of the violation.
        details: Additional context about the violation (e.g., involved entities).
        location: Optional location identifier (e.g., time slot, room, course).
    """
    
    constraint_name: str
    severity: ConstraintSeverity
    message: str
    details: Dict[str, Any] = field(default_factory=dict)
    location: Optional[str] = None
    
    def __str__(self) -> str:
        """String representation of the violation."""
        location_str = f" at {self.location}" if self.location else ""
        return f"[{self.severity.value.upper()}] {self.constraint_name}{location_str}: {self.message}"


@dataclass
class ConstraintReport:
    """Report containing all constraint violations found during validation.
    
    Attributes:
        violations: List of all violations found.
        total_score: Optional numeric score representing overall constraint satisfaction.
        metadata: Additional metadata about the validation process.
    """
    
    violations: List[ConstraintViolation] = field(default_factory=list)
    total_score: Optional[float] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    def add_violation(
        self,
        constraint_name: str,
        severity: ConstraintSeverity,
        message: str,
        details: Optional[Dict[str, Any]] = None,
        location: Optional[str] = None,
    ) -> None:
        """Add a violation to the report.
        
        Args:
            constraint_name: Name of the violated constraint.
            severity: Severity level.
            message: Description of the violation.
            details: Additional context.
            location: Location identifier.
        """
        violation = ConstraintViolation(
            constraint_name=constraint_name,
            severity=severity,
            message=message,
            details=details or {},
            location=location,
        )
        self.violations.append(violation)
    
    def has_errors(self) -> bool:
        """Check if the report contains any errors or critical violations.
        
        Returns:
            True if there are ERROR or CRITICAL violations.
        """
        return any(
            v.severity in (ConstraintSeverity.ERROR, ConstraintSeverity.CRITICAL)
            for v in self.violations
        )
    
    def has_warnings(self) -> bool:
        """Check if the report contains any warnings.
        
        Returns:
            True if there are WARNING violations.
        """
        return any(v.severity == ConstraintSeverity.WARNING for v in self.violations)
    
    def is_valid(self) -> bool:
        """Check if the schedule is valid (no errors or critical violations).
        
        Returns:
            True if there are no ERROR or CRITICAL violations.
        """
        return not self.has_errors()
    
    def get_violations_by_severity(
        self, severity: ConstraintSeverity
    ) -> List[ConstraintViolation]:
        """Get all violations of a specific severity.
        
        Args:
            severity: The severity level to filter by.
            
        Returns:
            List of violations matching the severity.
        """
        return [v for v in self.violations if v.severity == severity]
    
    def get_violations_by_constraint(self, constraint_name: str) -> List[ConstraintViolation]:
        """Get all violations for a specific constraint.
        
        Args:
            constraint_name: Name of the constraint to filter by.
            
        Returns:
            List of violations for the specified constraint.
        """
        return [v for v in self.violations if v.constraint_name == constraint_name]
    
    def summary(self) -> str:
        """Generate a human-readable summary of the report.
        
        Returns:
            Summary string with violation counts by severity.
        """
        counts = {
            "critical": len(self.get_violations_by_severity(ConstraintSeverity.CRITICAL)),
            "error": len(self.get_violations_by_severity(ConstraintSeverity.ERROR)),
            "warning": len(self.get_violations_by_severity(ConstraintSeverity.WARNING)),
            "info": len(self.get_violations_by_severity(ConstraintSeverity.INFO)),
        }
        
        parts = []
        if counts["critical"]:
            parts.append(f"{counts['critical']} critical")
        if counts["error"]:
            parts.append(f"{counts['error']} errors")
        if counts["warning"]:
            parts.append(f"{counts['warning']} warnings")
        if counts["info"]:
            parts.append(f"{counts['info']} info")
        
        if not parts:
            return "No violations found"
        
        return f"Found {', '.join(parts)}"


@dataclass
class ConstraintContext:
    """Context information for constraint validation.
    
    This class holds configuration and context needed for constraint validation,
    such as institution-specific rules, time windows, and preferences.
    
    Attributes:
        mode: Operation mode (e.g., "verification" or "scheduling").
        max_gap_minutes: Maximum allowed gap between sessions (in minutes).
        min_gap_minutes: Minimum required gap between sessions (in minutes).
        lunch_start_time: Start of lunch period in minutes from midnight.
        lunch_end_time: End of lunch period in minutes from midnight.
        lunch_penalty_weight: Weight for lunch overlap penalty calculation.
        lab_min_duration_minutes: Minimum duration for lab sessions.
        tutorial_min_duration_minutes: Minimum duration for tutorial sessions.
        allow_same_day_lab_tutorial: Whether lab and tutorial can be on same day.
        strict_mode: If True, treat warnings as errors.
        custom_rules: Additional custom rules as key-value pairs.
    """

    mode: str = "verification"
    max_gap_minutes: int = 180
    min_gap_minutes: int = 0
    lunch_start_time: int = 720
    lunch_end_time: int = 780
    lunch_penalty_weight: float = 1.0
    lab_min_duration_minutes: int = 120
    tutorial_min_duration_minutes: int = 50
    allow_same_day_lab_tutorial: bool = False
    strict_mode: bool = False
    custom_rules: Dict[str, Any] = field(default_factory=dict)

    def clone(self, **overrides: Any) -> "ConstraintContext":
        """Create a copy of the context with optional overrides."""
        data = {
            "mode": self.mode,
            "max_gap_minutes": self.max_gap_minutes,
            "min_gap_minutes": self.min_gap_minutes,
            "lunch_start_time": self.lunch_start_time,
            "lunch_end_time": self.lunch_end_time,
            "lunch_penalty_weight": self.lunch_penalty_weight,
            "lab_min_duration_minutes": self.lab_min_duration_minutes,
            "tutorial_min_duration_minutes": self.tutorial_min_duration_minutes,
            "allow_same_day_lab_tutorial": self.allow_same_day_lab_tutorial,
            "strict_mode": self.strict_mode,
            "custom_rules": dict(self.custom_rules),
        }
        data.update(overrides)
        return ConstraintContext(**data)

    @classmethod
    def for_verification(cls, **overrides: Any) -> "ConstraintContext":
        """Create a context preconfigured for verification workflows."""
        return cls(**{"mode": "verification", **overrides})

    @classmethod
    def for_scheduling(cls, **overrides: Any) -> "ConstraintContext":
        """Create a context preconfigured for scheduling workflows."""
        return cls(**{"mode": "scheduling", **overrides})
