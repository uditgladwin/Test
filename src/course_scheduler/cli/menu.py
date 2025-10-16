from typing import Optional, Callable, Dict, Any
from ..models.scenario import Scenario
from ..data.persistence import save_scenario, load_scenario, list_scenarios, PersistenceError
from ..utils.logger import get_logger

logger = get_logger()


class MenuContext:
    def __init__(self):
        self.current_scenario: Optional[Scenario] = None
        self.running: bool = True
        self.autosave: bool = False
    
    def has_scenario(self) -> bool:
        return self.current_scenario is not None
    
    def get_scenario_name(self) -> str:
        if self.current_scenario:
            return self.current_scenario.name
        return "None"


class MenuItem:
    def __init__(self, key: str, label: str, action: Callable, requires_scenario: bool = False):
        self.key = key
        self.label = label
        self.action = action
        self.requires_scenario = requires_scenario


class Menu:
    def __init__(self, context: MenuContext):
        self.context = context
        self.items: list[MenuItem] = []
    
    def add_item(self, item: MenuItem):
        self.items.append(item)
    
    def display(self):
        print("\n" + "=" * 60)
        print("Course Scheduling Simulator - Main Menu")
        print("=" * 60)
        if self.context.has_scenario():
            print(f"Current Scenario: {self.context.get_scenario_name()}")
        else:
            print("Current Scenario: None")
        print("=" * 60)
        
        for item in self.items:
            if item.requires_scenario and not self.context.has_scenario():
                print(f"  {item.key}. {item.label} (requires loaded scenario)")
            else:
                print(f"  {item.key}. {item.label}")
        print("=" * 60)
    
    def handle_choice(self, choice: str):
        for item in self.items:
            if item.key == choice:
                if item.requires_scenario and not self.context.has_scenario():
                    print("Error: This action requires a loaded scenario.")
                    return
                item.action(self.context)
                return
        print(f"Invalid choice: {choice}")
    
    def run(self):
        while self.context.running:
            self.display()
            try:
                choice = input("\nEnter your choice: ").strip()
                if not choice:
                    continue
                self.handle_choice(choice)
            except KeyboardInterrupt:
                print("\nExiting...")
                self.context.running = False
            except Exception as e:
                logger.error(f"Error handling menu choice: {e}")
                print(f"Error: {e}")


def action_new_scenario(context: MenuContext):
    print("\n--- New Scenario ---")
    name = input("Enter scenario name: ").strip()
    if not name:
        print("Error: Scenario name cannot be empty.")
        return
    description = input("Enter scenario description (optional): ").strip()
    context.current_scenario = Scenario(
        name=name,
        description=description if description else None
    )
    print(f"Created new scenario: {name}")


def action_load_scenario(context: MenuContext):
    print("\n--- Load Scenario ---")
    scenarios = list_scenarios()
    if not scenarios:
        print("No saved scenarios found.")
        return
    
    print("Available scenarios:")
    for idx, scenario_file in enumerate(scenarios, start=1):
        print(f"  {idx}. {scenario_file}")
    
    choice = input("\nEnter number or filename to load: ").strip()
    if not choice:
        return
    
    try:
        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(scenarios):
                filename = scenarios[idx]
            else:
                print("Invalid selection.")
                return
        else:
            filename = choice
        
        scenario = load_scenario(filename)
        context.current_scenario = scenario
        print(f"Loaded scenario: {scenario.name}")
    except PersistenceError as e:
        print(f"Error loading scenario: {e}")


def action_save_scenario(context: MenuContext):
    if not context.current_scenario:
        print("Error: No scenario loaded.")
        return
    
    print("\n--- Save Scenario ---")
    filename = input(f"Enter filename [{context.current_scenario.name}]: ").strip()
    if not filename:
        filename = context.current_scenario.name
    
    format_choice = input("Enter format (json/yaml) [json]: ").strip().lower()
    if not format_choice:
        format_choice = 'json'
    
    if format_choice not in ['json', 'yaml', 'yml']:
        print("Invalid format. Using json.")
        format_choice = 'json'
    
    try:
        path = save_scenario(context.current_scenario, filename, format_choice)
        print(f"Saved scenario to: {path}")
    except PersistenceError as e:
        print(f"Error saving scenario: {e}")


def action_view_summary(context: MenuContext):
    if not context.current_scenario:
        print("Error: No scenario loaded.")
        return
    
    scenario = context.current_scenario
    print("\n--- Scenario Summary ---")
    print(f"Name: {scenario.name}")
    print(f"Description: {scenario.description or 'N/A'}")
    print(f"Courses: {len(scenario.courses)}")
    print(f"Sessions: {len(scenario.sessions)}")
    print(f"Faculty: {len(scenario.faculty)}")
    print(f"Rooms: {len(scenario.rooms)}")
    print(f"Constraints: {len(scenario.constraints)}")


def action_manage_courses(context: MenuContext):
    print("\n--- Manage Courses ---")
    print("Feature coming in next iteration.")


def action_manage_faculty(context: MenuContext):
    print("\n--- Manage Faculty ---")
    print("Feature coming in next iteration.")


def action_manage_rooms(context: MenuContext):
    print("\n--- Manage Rooms ---")
    print("Feature coming in next iteration.")


def action_manage_constraints(context: MenuContext):
    print("\n--- Manage Constraints ---")
    print("Feature coming in next iteration.")


def action_help(context: MenuContext):
    print("\n--- Help ---")
    print("Course Scheduling Simulator")
    print("\nThis application helps you create and manage course scheduling scenarios.")
    print("\nMain Menu Options:")
    print("  n - Create a new scenario")
    print("  l - Load an existing scenario from file")
    print("  s - Save the current scenario to file")
    print("  v - View summary of current scenario")
    print("  c - Manage courses in the scenario")
    print("  f - Manage faculty members")
    print("  r - Manage rooms")
    print("  x - Manage constraints")
    print("  h - Display this help screen")
    print("  q - Quit the application")
    print("\nFile Formats:")
    print("  Scenarios can be saved in JSON or YAML format.")
    print("  Default format is JSON.")
    print("\nFor more information, visit the documentation.")


def action_quit(context: MenuContext):
    if context.autosave and context.current_scenario:
        print("\nAuto-saving scenario...")
        try:
            save_scenario(context.current_scenario, context.current_scenario.name)
        except PersistenceError as e:
            print(f"Warning: Failed to auto-save: {e}")
    print("Goodbye!")
    context.running = False


def create_main_menu() -> Menu:
    from ..config.config import get_config

    config = get_config()
    context = MenuContext()
    context.autosave = config.get('cli.autosave_on_exit', False)
    menu = Menu(context)
    
    menu.add_item(MenuItem('n', 'New Scenario', action_new_scenario))
    menu.add_item(MenuItem('l', 'Load Scenario', action_load_scenario))
    menu.add_item(MenuItem('s', 'Save Scenario', action_save_scenario, requires_scenario=True))
    menu.add_item(MenuItem('v', 'View Summary', action_view_summary, requires_scenario=True))
    menu.add_item(MenuItem('c', 'Manage Courses', action_manage_courses, requires_scenario=True))
    menu.add_item(MenuItem('f', 'Manage Faculty', action_manage_faculty, requires_scenario=True))
    menu.add_item(MenuItem('r', 'Manage Rooms', action_manage_rooms, requires_scenario=True))
    menu.add_item(MenuItem('x', 'Manage Constraints', action_manage_constraints, requires_scenario=True))
    menu.add_item(MenuItem('h', 'Help', action_help))
    menu.add_item(MenuItem('q', 'Quit', action_quit))
    
    return menu
