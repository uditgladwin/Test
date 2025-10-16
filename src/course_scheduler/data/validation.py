from typing import Dict, Any, List
from .schemas import SCENARIO_SCHEMA
from ..models.scenario import Scenario
from ..models.serialization import scenario_to_dict


class ValidationError(Exception):
    pass


def validate_scenario_dict(data: Dict[str, Any]) -> List[str]:
    errors: List[str] = []
    schema = SCENARIO_SCHEMA
    _validate_properties(schema, data, errors, path='')
    return errors


def _validate_properties(schema: Dict[str, Any], data: Any, errors: List[str], path: str):
    schema_type = schema.get('type')
    
    if schema_type == 'object':
        if not isinstance(data, dict):
            errors.append(f"Expected object at {path or 'root'}, got {type(data).__name__}")
            return
        required = schema.get('required', [])
        for key in required:
            if key not in data:
                errors.append(f"Missing required property '{key}' at {path or 'root'}")
        properties = schema.get('properties', {})
        for key, subschema in properties.items():
            subpath = f"{path}.{key}" if path else key
            if key in data and data[key] is not None:
                _validate_properties(subschema, data[key], errors, subpath)
            else:
                if subschema.get('type') not in ['null', ['string', 'null'], ['array', 'null'], ['object', 'null']]:
                    pass
    elif schema_type == 'array':
        if not isinstance(data, list):
            errors.append(f"Expected array at {path}, got {type(data).__name__}")
            return
        item_schema = schema.get('items', {})
        for idx, item in enumerate(data):
            subpath = f"{path}[{idx}]"
            _validate_properties(item_schema, item, errors, subpath)
    elif schema_type == 'string':
        if not isinstance(data, str):
            errors.append(f"Expected string at {path}, got {type(data).__name__}")
    elif schema_type == 'integer':
        if not isinstance(data, int):
            errors.append(f"Expected integer at {path}, got {type(data).__name__}")
        else:
            minimum = schema.get('minimum')
            maximum = schema.get('maximum')
            if minimum is not None and data < minimum:
                errors.append(f"Value at {path} is less than minimum {minimum}")
            if maximum is not None and data > maximum:
                errors.append(f"Value at {path} is greater than maximum {maximum}")
    elif schema_type == 'number':
        if not isinstance(data, (int, float)):
            errors.append(f"Expected number at {path}, got {type(data).__name__}")
        else:
            minimum = schema.get('minimum')
            if minimum is not None and data < minimum:
                errors.append(f"Value at {path} is less than minimum {minimum}")
    elif isinstance(schema_type, list) and 'string' in schema_type and data is not None:
        if not isinstance(data, str):
            errors.append(f"Expected string at {path}, got {type(data).__name__}")
    
    if isinstance(schema_type, list) and 'null' in schema_type:
        if data is None:
            return


def validate_scenario(scenario: Scenario) -> List[str]:
    data = scenario_to_dict(scenario)
    return validate_scenario_dict(data)
