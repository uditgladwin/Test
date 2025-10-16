from typing import Optional, List
from dataclasses import dataclass


@dataclass
class Course:
    course_id: str
    name: str
    code: str
    credits: int
    required_sessions_per_week: int
    session_duration_minutes: int
    max_students: int
    preferred_time_slots: Optional[List[str]] = None
    required_room_type: Optional[str] = None
    
    def validate(self) -> List[str]:
        errors = []
        if not self.course_id:
            errors.append("course_id cannot be empty")
        if not self.name:
            errors.append("name cannot be empty")
        if not self.code:
            errors.append("code cannot be empty")
        if self.credits < 1 or self.credits > 6:
            errors.append("credits must be between 1 and 6")
        if self.required_sessions_per_week < 1 or self.required_sessions_per_week > 7:
            errors.append("required_sessions_per_week must be between 1 and 7")
        if self.session_duration_minutes < 30:
            errors.append("session_duration_minutes must be at least 30")
        if self.max_students < 1:
            errors.append("max_students must be at least 1")
        return errors
    
    def to_dict(self):
        return {
            'course_id': self.course_id,
            'name': self.name,
            'code': self.code,
            'credits': self.credits,
            'required_sessions_per_week': self.required_sessions_per_week,
            'session_duration_minutes': self.session_duration_minutes,
            'max_students': self.max_students,
            'preferred_time_slots': self.preferred_time_slots,
            'required_room_type': self.required_room_type,
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)
