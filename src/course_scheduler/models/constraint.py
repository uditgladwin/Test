from typing import Optional, List, Dict, Any
from dataclasses import dataclass


@dataclass
class Constraint:
    constraint_id: str
    name: str
    constraint_type: str
    description: Optional[str] = None
    weight: float = 1.0
    parameters: Optional[Dict[str, Any]] = None
    
    def validate(self) -> List[str]:
        errors = []
        if not self.constraint_id:
            errors.append("constraint_id cannot be empty")
        if not self.name:
            errors.append("name cannot be empty")
        if self.constraint_type not in ['hard', 'soft']:
            errors.append("constraint_type must be 'hard' or 'soft'")
        if self.weight < 0:
            errors.append("weight must be non-negative")
        return errors
    
    def to_dict(self):
        return {
            'constraint_id': self.constraint_id,
            'name': self.name,
            'constraint_type': self.constraint_type,
            'description': self.description,
            'weight': self.weight,
            'parameters': self.parameters,
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)
