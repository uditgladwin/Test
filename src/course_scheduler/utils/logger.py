import logging
import sys
from pathlib import Path
from typing import Optional
from ..config.config import get_config


_logger: Optional[logging.Logger] = None


def setup_logger(name: str = "course_scheduler") -> logging.Logger:
    global _logger
    
    if _logger is not None:
        return _logger
    
    config = get_config()
    log_level = config.get('logging.level', 'INFO')
    log_dir = config.get('logging.directory', './logs')
    log_file = config.get('logging.file_name', 'course_scheduler.log')
    
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, log_level.upper(), logging.INFO))
    
    if logger.handlers:
        logger.handlers.clear()
    
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_formatter = logging.Formatter(
        '%(levelname)s: %(message)s'
    )
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)
    
    log_path = Path(log_dir)
    log_path.mkdir(parents=True, exist_ok=True)
    file_handler = logging.FileHandler(log_path / log_file)
    file_handler.setLevel(logging.DEBUG)
    file_formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    file_handler.setFormatter(file_formatter)
    logger.addHandler(file_handler)
    
    _logger = logger
    return logger


def get_logger() -> logging.Logger:
    global _logger
    if _logger is None:
        return setup_logger()
    return _logger
