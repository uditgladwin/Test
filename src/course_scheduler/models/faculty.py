from typing import Optional, List
from dataclasses import dataclass


@dataclass
class Faculty:
    faculty_id: str
    name: str
    email: Optional[str] = None
    department: Optional[str] = None
    available_time_slots: Optional[List[str]] = None
    max_teaching_hours_per_week: int = 40
    preferred_courses: Optional[List[str]] = None
    
    def validate(self) -> List[str]:
        errors = []
        if not self.faculty_id:
            errors.append("faculty_id cannot be empty")
        if not self.name:
            errors.append("name cannot be empty")
        if self.max_teaching_hours_per_week < 1 or self.max_teaching_hours_per_week > 168:
            errors.append("max_teaching_hours_per_week must be between 1 and 168")
        return errors
    
    def to_dict(self):
        return {
            'faculty_id': self.faculty_id,
            'name': self.name,
            'email': self.email,
            'department': self.department,
            'available_time_slots': self.available_time_slots,
            'max_teaching_hours_per_week': self.max_teaching_hours_per_week,
            'preferred_courses': self.preferred_courses,
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)
