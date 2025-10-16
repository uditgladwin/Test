import json
from pathlib import Path
from typing import Optional

try:
    import yaml  # type: ignore
except ImportError:  # pragma: no cover - fallback if PyYAML not present
    yaml = None

from ..models.scenario import Scenario
from ..models.serialization import (
    scenario_from_json,
    scenario_from_yaml,
    scenario_to_json,
    scenario_to_yaml,
)
from ..config.config import get_config
from ..utils.logger import get_logger


logger = get_logger()


class PersistenceError(Exception):
    pass


def save_scenario(scenario: Scenario, filename: str, format: str = 'json') -> Path:
    config = get_config()
    scenarios_dir = Path(config.get('data.scenarios_dir', './data/scenarios'))
    scenarios_dir.mkdir(parents=True, exist_ok=True)
    
    if not filename.endswith(f'.{format}'):
        filename = f"{filename}.{format}"
    
    file_path = scenarios_dir / filename
    
    try:
        if format == 'json':
            content = scenario_to_json(scenario)
        elif format in ['yaml', 'yml']:
            content = scenario_to_yaml(scenario)
        else:
            raise PersistenceError(f"Unsupported format: {format}")
        
        with open(file_path, 'w') as f:
            f.write(content)
        
        logger.info(f"Saved scenario to {file_path}")
        return file_path
    except Exception as e:
        logger.error(f"Failed to save scenario to {file_path}: {e}")
        raise PersistenceError(f"Failed to save scenario: {e}") from e


def load_scenario(filename: str, format: Optional[str] = None) -> Scenario:
    config = get_config()
    scenarios_dir = Path(config.get('data.scenarios_dir', './data/scenarios'))
    
    if format is None:
        if filename.endswith('.json'):
            format = 'json'
        elif filename.endswith('.yaml') or filename.endswith('.yml'):
            format = 'yaml'
        else:
            format = config.get('cli.default_format', 'json')
            filename = f"{filename}.{format}"
    else:
        if not filename.endswith(f'.{format}'):
            filename = f"{filename}.{format}"
    
    file_path = scenarios_dir / filename
    
    if not file_path.exists():
        raise PersistenceError(f"Scenario file not found: {file_path}")
    
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        if format == 'json':
            scenario = scenario_from_json(content)
        elif format in ['yaml', 'yml']:
            scenario = scenario_from_yaml(content)
        else:
            raise PersistenceError(f"Unsupported format: {format}")
        
        logger.info(f"Loaded scenario from {file_path}")
        return scenario
    except Exception as e:
        logger.error(f"Failed to load scenario from {file_path}: {e}")
        raise PersistenceError(f"Failed to load scenario: {e}") from e


def list_scenarios() -> list:
    config = get_config()
    scenarios_dir = Path(config.get('data.scenarios_dir', './data/scenarios'))
    
    if not scenarios_dir.exists():
        return []
    
    scenarios = []
    for file_path in scenarios_dir.iterdir():
        if file_path.is_file() and file_path.suffix in ['.json', '.yaml', '.yml']:
            scenarios.append(file_path.name)
    
    return sorted(scenarios)
