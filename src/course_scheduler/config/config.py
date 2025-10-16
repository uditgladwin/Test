import os
from pathlib import Path
from typing import Optional, Dict, Any

try:
    import yaml  # type: ignore
except ImportError:  # pragma: no cover - fallback if PyYAML not present
    yaml = None


class Config:
    _instance: Optional['Config'] = None
    _config_data: Dict[str, Any] = {}
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Config, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._config_data:
            self.load_config()
    
    def load_config(self):
        project_root = Path(__file__).parent.parent.parent.parent
        config_dir = project_root / 'config'
        
        default_config_path = config_dir / 'default.yaml'
        local_config_path = config_dir / 'local.yaml'
        
        config_data: Dict[str, Any] = {}
        
        if default_config_path.exists():
            with open(default_config_path, 'r') as f:
                if yaml is not None:
                    config_data = yaml.safe_load(f) or {}
                else:
                    config_data = self._parse_simple_yaml(f.read())
        
        if local_config_path.exists():
            with open(local_config_path, 'r') as f:
                if yaml is not None:
                    local_data = yaml.safe_load(f) or {}
                else:
                    local_data = self._parse_simple_yaml(f.read())
                self._deep_merge(config_data, local_data)
        
        config_data = self._apply_env_overrides(config_data)
        self._config_data = config_data
    
    def _parse_simple_yaml(self, content: str) -> Dict[str, Any]:
        result: Dict[str, Any] = {}
        current_dict = result
        stack = [(0, result)]
        
        for line in content.splitlines():
            if not line.strip() or line.strip().startswith('#'):
                continue
            
            indent = len(line) - len(line.lstrip(' '))
            line = line.strip()
            
            while stack and indent <= stack[-1][0]:
                stack.pop()
            
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip()
                
                current_dict = stack[-1][1] if stack else result
                
                if value:
                    current_dict[key] = self._coerce_value(value)
                else:
                    new_dict: Dict[str, Any] = {}
                    current_dict[key] = new_dict
                    stack.append((indent, new_dict))
        
        return result
    
    def _coerce_value(self, value: str) -> Any:
        if value.lower() in {'true', 'false'}:
            return value.lower() == 'true'
        if value.lower() in {'null', 'none', '~'}:
            return None
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
    
    def _deep_merge(self, base: Dict[str, Any], override: Dict[str, Any]):
        for key, value in override.items():
            if key in base and isinstance(base[key], dict) and isinstance(value, dict):
                self._deep_merge(base[key], value)
            else:
                base[key] = value
    
    def _apply_env_overrides(self, config: Dict[str, Any]) -> Dict[str, Any]:
        if 'COURSE_SCHEDULER_LOG_LEVEL' in os.environ:
            if 'logging' not in config:
                config['logging'] = {}
            config['logging']['level'] = os.environ['COURSE_SCHEDULER_LOG_LEVEL']
        
        if 'COURSE_SCHEDULER_DATA_DIR' in os.environ:
            if 'data' not in config:
                config['data'] = {}
            config['data']['base_dir'] = os.environ['COURSE_SCHEDULER_DATA_DIR']
        
        return config
    
    def get(self, key: str, default: Any = None) -> Any:
        keys = key.split('.')
        value = self._config_data
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        return value
    
    def set(self, key: str, value: Any):
        keys = key.split('.')
        config = self._config_data
        for k in keys[:-1]:
            if k not in config:
                config[k] = {}
            config = config[k]
        config[keys[-1]] = value
    
    def get_all(self) -> Dict[str, Any]:
        return self._config_data.copy()


def get_config() -> Config:
    return Config()
