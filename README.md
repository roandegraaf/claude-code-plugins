# Python Simplifier

A Claude Code plugin that automatically simplifies and refines Python code for clarity, consistency, and maintainability while preserving all functionality.

## Features

- **PEP 8 Compliance**: Enforces Python style guide standards including proper indentation, line length, and naming conventions
- **Pythonic Idioms**: Applies list/dict/set comprehensions, f-strings, context managers, and other Python best practices
- **Type Hints**: Adds type annotations for function signatures and complex variables
- **Import Organization**: Groups and sorts imports according to Python conventions
- **Code Clarity**: Reduces nesting, eliminates redundancy, and improves naming

## Installation

Install directly from this marketplace:

```bash
/plugin install python-simplifier@roandegraaf/python-simplifier
```

Or browse for the plugin in `/plugin > Discover`

## Usage

Once installed, the Python Simplifier agent will automatically analyze and refine your recently modified Python code. It operates proactively, applying improvements as you work.

### What It Does

The agent focuses on:

1. **Preserving Functionality** - Never changes what the code does, only how it does it
2. **Applying Python Standards** - PEP 8, PEP 484 (type hints), PEP 257 (docstrings)
3. **Using Pythonic Idioms** - Comprehensions, `enumerate()`, `zip()`, f-strings, `pathlib.Path`
4. **Enhancing Clarity** - Early returns, guard clauses, clear naming, reduced nesting
5. **Maintaining Balance** - Avoids over-simplification that reduces readability

### Example

**Before:**
```python
def get_items(data):
    result = []
    for i in range(len(data)):
        item = data[i]
        if item['active'] == True:
            result.append(item['name'])
    return result
```

**After:**
```python
def get_items(data: list[dict]) -> list[str]:
    """Extract names of active items from data."""
    return [item['name'] for item in data if item['active']]
```

## Configuration

The agent uses the Opus model for high-quality code analysis. This can be configured in the agent definition.

## Plugin Structure

```
python-simplifier/
├── .claude-plugin/
│   ├── plugin.json        # Plugin metadata
│   └── marketplace.json   # Marketplace configuration
├── agents/
│   └── python-simplifier.md  # Agent definition
├── README.md
└── LICENSE
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

**Roan de Graaf**  
Email: info@roandegraaf.com
