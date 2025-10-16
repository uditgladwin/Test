from typing import List, Optional
from dataclasses import dataclass, field
from .course import Course
from .session import Session
from .faculty import Faculty
from .room import Room
from .constraint import Constraint


@dataclass
class Scenario:
    name: str
    description: Optional[str] = None
    courses: List[Course] = field(default_factory=list)
    sessions: List[Session] = field(default_factory=list)
    faculty: List[Faculty] = field(default_factory=list)
    rooms: List[Room] = field(default_factory=list)
    constraints: List[Constraint] = field(default_factory=list)
    
    def validate(self) -> List[str]:
        errors = []
        if not self.name:
            errors.append("Scenario name cannot be empty")
        for item in self.courses:
            errors.extend(item.validate())
        for item in self.sessions:
            errors.extend(item.validate())
        for item in self.faculty:
            errors.extend(item.validate())
        for item in self.rooms:
            errors.extend(item.validate())
        for item in self.constraints:
            errors.extend(item.validate())
        return errors
    
    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'courses': [course.to_dict() for course in self.courses],
            'sessions': [session.to_dict() for session in self.sessions],
            'faculty': [faculty.to_dict() for faculty in self.faculty],
            'rooms': [room.to_dict() for room in self.rooms],
            'constraints': [constraint.to_dict() for constraint in self.constraints],
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            name=data['name'],
            description=data.get('description'),
            courses=[Course.from_dict(item) for item in data.get('courses', [])],
            sessions=[Session.from_dict(item) for item in data.get('sessions', [])],
            faculty=[Faculty.from_dict(item) for item in data.get('faculty', [])],
            rooms=[Room.from_dict(item) for item in data.get('rooms', [])],
            constraints=[Constraint.from_dict(item) for item in data.get('constraints', [])],
        )
