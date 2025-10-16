from typing import Dict, Any

SCENARIO_SCHEMA: Dict[str, Any] = {
    "type": "object",
    "required": ["name"],
    "properties": {
        "name": {"type": "string"},
        "description": {"type": ["string", "null"]},
        "courses": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "course_id",
                    "name",
                    "code",
                    "credits",
                    "required_sessions_per_week",
                    "session_duration_minutes",
                    "max_students",
                ],
                "properties": {
                    "course_id": {"type": "string"},
                    "name": {"type": "string"},
                    "code": {"type": "string"},
                    "credits": {"type": "integer", "minimum": 1, "maximum": 6},
                    "required_sessions_per_week": {
                        "type": "integer",
                        "minimum": 1,
                        "maximum": 7,
                    },
                    "session_duration_minutes": {
                        "type": "integer",
                        "minimum": 30,
                    },
                    "max_students": {"type": "integer", "minimum": 1},
                    "preferred_time_slots": {
                        "type": ["array", "null"],
                        "items": {"type": "string"},
                    },
                    "required_room_type": {"type": ["string", "null"]},
                },
            },
        },
        "sessions": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "session_id",
                    "course_id",
                    "day_of_week",
                    "start_time",
                    "end_time",
                ],
                "properties": {
                    "session_id": {"type": "string"},
                    "course_id": {"type": "string"},
                    "day_of_week": {"type": "string"},
                    "start_time": {"type": "string"},
                    "end_time": {"type": "string"},
                    "room_id": {"type": ["string", "null"]},
                    "faculty_id": {"type": ["string", "null"]},
                    "student_groups": {
                        "type": ["array", "null"],
                        "items": {"type": "string"},
                    },
                },
            },
        },
        "faculty": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["faculty_id", "name"],
                "properties": {
                    "faculty_id": {"type": "string"},
                    "name": {"type": "string"},
                    "email": {"type": ["string", "null"]},
                    "department": {"type": ["string", "null"]},
                    "available_time_slots": {
                        "type": ["array", "null"],
                        "items": {"type": "string"},
                    },
                    "max_teaching_hours_per_week": {
                        "type": "integer",
                        "minimum": 1,
                        "maximum": 168,
                        "default": 40,
                    },
                    "preferred_courses": {
                        "type": ["array", "null"],
                        "items": {"type": "string"},
                    },
                },
            },
        },
        "rooms": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["room_id", "name", "capacity"],
                "properties": {
                    "room_id": {"type": "string"},
                    "name": {"type": "string"},
                    "capacity": {"type": "integer", "minimum": 1},
                    "room_type": {"type": ["string", "null"]},
                    "features": {
                        "type": ["array", "null"],
                        "items": {"type": "string"},
                    },
                },
            },
        },
        "constraints": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["constraint_id", "name", "constraint_type"],
                "properties": {
                    "constraint_id": {"type": "string"},
                    "name": {"type": "string"},
                    "constraint_type": {"type": "string", "enum": ["hard", "soft"]},
                    "description": {"type": ["string", "null"]},
                    "weight": {"type": "number", "minimum": 0},
                    "parameters": {"type": ["object", "null"]},
                },
            },
        },
    },
}
