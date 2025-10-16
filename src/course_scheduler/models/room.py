from typing import Optional, List
from dataclasses import dataclass


@dataclass
class Room:
    room_id: str
    name: str
    capacity: int
    room_type: Optional[str] = None
    features: Optional[List[str]] = None
    
    def validate(self) -> List[str]:
        errors = []
        if not self.room_id:
            errors.append("room_id cannot be empty")
        if not self.name:
            errors.append("name cannot be empty")
        if self.capacity < 1:
            errors.append("capacity must be at least 1")
        return errors
    
    def to_dict(self):
        return {
            'room_id': self.room_id,
            'name': self.name,
            'capacity': self.capacity,
            'room_type': self.room_type,
            'features': self.features,
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)
