import json
from typing import Any, Dict
from dataclasses import asdict, is_dataclass
from pathlib import Path

try:
    import yaml  # type: ignore
except ImportError:  # pragma: no cover - fallback if PyYAML not present
    yaml = None

from .scenario import Scenario


class SerializationError(Exception):
    """Raised when serialization or deserialization fails."""


def _to_serializable(obj: Any) -> Any:
    if is_dataclass(obj):
        return {key: _to_serializable(value) for key, value in asdict(obj).items()}
    if isinstance(obj, list):
        return [_to_serializable(item) for item in obj]
    if isinstance(obj, dict):
        return {key: _to_serializable(value) for key, value in obj.items()}
    return obj


def scenario_to_dict(scenario: Scenario) -> Dict[str, Any]:
    return _to_serializable(scenario)


def scenario_to_json(scenario: Scenario, *, indent: int = 2) -> str:
    return json.dumps(scenario_to_dict(scenario), indent=indent)


def scenario_to_yaml(scenario: Scenario) -> str:
    data_dict = scenario_to_dict(scenario)
    if yaml is not None:
        return yaml.safe_dump(data_dict, sort_keys=False)
    # Fallback: basic manual YAML serialization
    return _dict_to_yaml(data_dict)


def scenario_from_dict(data: Dict[str, Any]) -> Scenario:
    if not isinstance(data, dict):
        raise SerializationError("Expected dictionary data to build a Scenario")
    return Scenario.from_dict(data)


def scenario_from_json(payload: str) -> Scenario:
    try:
        data = json.loads(payload)
    except json.JSONDecodeError as exc:  # pragma: no cover - delegated to CLI tests
        raise SerializationError(f"Invalid JSON: {exc}") from exc
    return scenario_from_dict(data)


def scenario_from_yaml(payload: str) -> Scenario:
    if yaml is not None:
        data = yaml.safe_load(payload)
    else:
        data = _yaml_to_dict(payload)
    if not isinstance(data, dict):
        raise SerializationError("YAML payload did not produce a dictionary")
    return scenario_from_dict(data)


def _dict_to_yaml(data: Dict[str, Any], indent: int = 0) -> str:
    lines = []
    spacing = ' ' * indent
    for key, value in data.items():
        if isinstance(value, dict):
            lines.append(f"{spacing}{key}:")
            lines.append(_dict_to_yaml(value, indent + 2))
        elif isinstance(value, list):
            lines.append(f"{spacing}{key}:")
            for item in value:
                if isinstance(item, dict):
                    lines.append(f"{spacing}  -")
                    item_yaml = _dict_to_yaml(item, indent + 4).splitlines()
                    lines.extend(item_yaml)
                else:
                    lines.append(f"{spacing}  - {item}")
        else:
            lines.append(f"{spacing}{key}: {value}")
    return '\n'.join(lines)


def _yaml_to_dict(payload: str) -> Dict[str, Any]:
    # Minimalistic YAML parser fallback for simple key/value structures.
    # Only supports dictionaries and lists of dictionaries with primitive values.
    result: Dict[str, Any] = {}
    stack = [(0, result)]
    lines = [line.rstrip() for line in payload.splitlines() if line.strip()]
    for line in lines:
        indent = len(line) - len(line.lstrip(' '))
        line_content = line.strip()
        while stack and indent < stack[-1][0]:
            stack.pop()
        current_dict = stack[-1][1]
        if line_content.startswith('- '):
            item = line_content[2:].strip()
            if not isinstance(current_dict, list):
                raise SerializationError(
                    "Fallback YAML parser does not support this structure; install PyYAML."
                )
            current_dict.append(item)
            continue
        if ':' in line_content:
            key, value = line_content.split(':', 1)
            key = key.strip()
            value = value.strip()
            if value:
                current_dict[key] = _coerce_value(value)
            else:
                new_dict: Dict[str, Any] = {}
                current_dict[key] = new_dict
                stack.append((indent + 2, new_dict))
        else:
            raise SerializationError(
                "Fallback YAML parser encountered an unsupported line: '" + line + "'"
            )
    return result


def _coerce_value(value: str) -> Any:
    if value.lower() in {'true', 'false'}:
        return value.lower() == 'true'
    try:
        return int(value)
    except ValueError:
        pass
    try:
        return float(value)
    except ValueError:
        pass
    if (value.startswith('"') and value.endswith('"')) or (
        value.startswith("'") and value.endswith("'")
    ):
        return value[1:-1]
    return value
