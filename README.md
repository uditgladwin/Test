# Course Scheduling Simulator

A Python-based course scheduling simulator with an interactive CLI for managing course loads, faculty assignments, room allocations, and scheduling constraints.

## Project Structure

```
course-scheduling-simulator/
├── config/                      # Configuration files
│   └── default.yaml            # Default configuration
├── data/                        # Data storage
│   ├── scenarios/              # Saved scenario files
│   └── exports/                # Exported schedules
├── src/
│   └── course_scheduler/       # Main package
│       ├── cli/                # CLI implementation
│       │   ├── main.py        # CLI entry point
│       │   └── menu.py        # Menu-driven interface
│       ├── config/             # Configuration handling
│       │   └── config.py      # Config loader
│       ├── data/               # Data layer
│       │   ├── persistence.py # Save/load functionality
│       │   ├── validation.py  # Validation logic
│       │   └── schemas.py     # JSON schemas
│       ├── models/             # Domain models
│       │   ├── course.py      # Course model
│       │   ├── session.py     # Session model
│       │   ├── faculty.py     # Faculty model
│       │   ├── room.py        # Room model
│       │   ├── constraint.py  # Constraint model
│       │   ├── scenario.py    # Scenario container
│       │   └── serialization.py # Serialization utilities
│       └── utils/              # Utility functions
│           ├── logger.py      # Logging setup
│           └── progress.py    # Progress indicators
├── scheduler                   # Executable entry point script
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd course-scheduling-simulator
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Interactive Mode

Run the scheduler in interactive mode:

```bash
./scheduler
```

Or:

```bash
python -m course_scheduler
```

### Command-Line Options

```bash
./scheduler --help
```

Options:
- `--mode {interactive,batch}`: CLI mode to run (default: interactive)
- `--batch-file PATH`: Path to batch commands file (for batch mode)
- `--scenario FILENAME`: Scenario file to load on startup
- `--log-level LEVEL`: Override log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- `--autosave`: Automatically save the current scenario on exit

### Examples

Load a scenario on startup:
```bash
./scheduler --scenario my_scenario.json
```

Run in batch mode:
```bash
./scheduler --mode batch --batch-file commands.txt
```

Enable autosave:
```bash
./scheduler --autosave
```

## Features

### Current Features (v0.1)

- **Project Structure**: Organized package layout with clear separation of concerns
- **Core Data Models**:
  - Courses with credit hours, sessions, and constraints
  - Sessions with time slots and assignments
  - Faculty with availability and preferences
  - Rooms with capacity and features
  - Constraints (hard and soft)
- **Serialization**: JSON and YAML support for saving/loading scenarios
- **Validation**: Schema-based validation for scenarios
- **Interactive CLI**: Menu-driven interface for scenario management
- **Batch Mode**: Command file execution support
- **Logging**: Comprehensive logging to file and console
- **Progress Indicators**: Visual feedback for long-running operations

### Menu Options

- **n**: Create a new scenario
- **l**: Load an existing scenario from file
- **s**: Save the current scenario to file
- **v**: View summary of current scenario
- **c**: Manage courses in the scenario
- **f**: Manage faculty members
- **r**: Manage rooms
- **x**: Manage constraints
- **h**: Display help screen
- **q**: Quit the application

## Configuration

Configuration is managed via YAML files in the `config/` directory:

- `config/default.yaml`: Default configuration (version controlled)
- `config/local.yaml`: Local overrides (not version controlled)

Environment variables:
- `COURSE_SCHEDULER_LOG_LEVEL`: Override log level
- `COURSE_SCHEDULER_DATA_DIR`: Override data directory

## Data Models

### Course
- Unique ID, name, and code
- Credit hours (1-6)
- Required sessions per week
- Session duration in minutes
- Maximum student capacity
- Optional preferred time slots
- Optional required room type

### Session
- Unique ID linked to a course
- Day of week and time slot
- Optional room assignment
- Optional faculty assignment
- Optional student groups

### Faculty
- Unique ID and name
- Contact information
- Department
- Available time slots
- Maximum teaching hours per week
- Preferred courses

### Room
- Unique ID and name
- Capacity
- Room type (lab, lecture, studio, etc.)
- Features (projector, whiteboard, computers, etc.)

### Constraint
- Unique ID and name
- Type (hard or soft)
- Weight (for soft constraints)
- Description
- Custom parameters

## File Formats

### JSON Example

```json
{
  "name": "Fall 2024 Schedule",
  "description": "Computer Science Department",
  "courses": [
    {
      "course_id": "cs101",
      "name": "Introduction to Programming",
      "code": "CS101",
      "credits": 3,
      "required_sessions_per_week": 2,
      "session_duration_minutes": 90,
      "max_students": 30
    }
  ],
  "faculty": [],
  "rooms": [],
  "sessions": [],
  "constraints": []
}
```

### YAML Example

```yaml
name: Fall 2024 Schedule
description: Computer Science Department
courses:
  - course_id: cs101
    name: Introduction to Programming
    code: CS101
    credits: 3
    required_sessions_per_week: 2
    session_duration_minutes: 90
    max_students: 30
faculty: []
rooms: []
sessions: []
constraints: []
```

## Development

### Running Tests

```bash
pytest
```

### Code Style

This project follows PEP 8 style guidelines.

## License

[License information to be added]

## Contributing

[Contributing guidelines to be added]
