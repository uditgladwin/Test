import argparse
from pathlib import Path
from typing import Optional
from .menu import create_main_menu
from ..data.persistence import load_scenario, PersistenceError
from ..utils.logger import setup_logger, get_logger
from ..config.config import get_config


def run_interactive(initial_scenario: Optional[str] = None):
    config = get_config()
    menu = create_main_menu()
    menu.context.autosave = config.get('cli.autosave_on_exit', False)
    if initial_scenario:
        try:
            scenario = load_scenario(initial_scenario)
            menu.context.current_scenario = scenario
            print(f"Loaded scenario: {scenario.name}")
        except PersistenceError as e:
            print(f"Failed to load scenario '{initial_scenario}': {e}")
    menu.run()


def run_batch(batch_file: Path):
    logger = get_logger()
    if not batch_file.exists():
        print(f"Batch file not found: {batch_file}")
        return
    
    try:
        with open(batch_file, 'r') as file:
            commands = [line.strip() for line in file if line.strip() and not line.startswith('#')]
    except Exception as e:
        logger.error(f"Failed to read batch file: {e}")
        print(f"Failed to read batch file: {e}")
        return
    
    print("Executing batch commands:")
    for command in commands:
        print(f"  - {command}")
    print("Batch execution complete.")


def main():
    parser = argparse.ArgumentParser(
        description="Course Scheduling Simulator CLI",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        '--mode',
        choices=['interactive', 'batch'],
        default='interactive',
        help='CLI mode to run',
    )
    parser.add_argument(
        '--batch-file',
        type=Path,
        help='Path to batch commands file (for batch mode)',
    )
    parser.add_argument(
        '--scenario',
        help='Scenario file to load on startup',
    )
    parser.add_argument(
        '--log-level',
        help='Override log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)',
    )
    parser.add_argument(
        '--autosave',
        action='store_true',
        help='Automatically save the current scenario on exit',
    )
    args = parser.parse_args()
    
    config = get_config()
    if args.log_level:
        config.set('logging.level', args.log_level)
    if args.autosave:
        config.set('cli.autosave_on_exit', True)
    
    logger = setup_logger()
    logger.debug('Starting CLI application')
    
    if args.mode == 'interactive':
        run_interactive(args.scenario)
    else:
        if not args.batch_file:
            parser.error("Batch mode requires --batch-file")
        run_batch(args.batch_file)


if __name__ == '__main__':
    main()
