from typing import Optional, List
from dataclasses import dataclass


@dataclass
class Session:
    session_id: str
    course_id: str
    day_of_week: str
    start_time: str
    end_time: str
    room_id: Optional[str] = None
    faculty_id: Optional[str] = None
    student_groups: Optional[List[str]] = None
    
    def validate(self) -> List[str]:
        errors = []
        if not self.session_id:
            errors.append("session_id cannot be empty")
        if not self.course_id:
            errors.append("course_id cannot be empty")
        if not self.day_of_week:
            errors.append("day_of_week cannot be empty")
        if not self.start_time or not self.end_time:
            errors.append("start_time and end_time must be provided")
        return errors
    
    def to_dict(self):
        return {
            'session_id': self.session_id,
            'course_id': self.course_id,
            'day_of_week': self.day_of_week,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'room_id': self.room_id,
            'faculty_id': self.faculty_id,
            'student_groups': self.student_groups,
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)
