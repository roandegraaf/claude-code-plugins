# Roan's Claude Code Plugins

A collection of Claude Code plugins that automatically simplify and refine code for clarity, consistency, and maintainability while preserving all functionality.

## Installation

### Step 1: Add the Marketplace

First, add this plugin marketplace to Claude Code:

```bash
/plugin marketplace add https://github.com/roandegraaf/claude-code-plugins
```

### Step 2: Install a Plugin

Then install the plugin you want:

---

## Available Plugins

### 🐍 Python Simplifier

Automatically simplifies and refines Python code with PEP 8 compliance, Pythonic idioms, type hints, and more.

**Install:**
```bash
/plugin install python-simplifier@roans-cc-plugins
```

**Features:**
- **PEP 8 Compliance**: Enforces Python style guide standards including proper indentation, line length, and naming conventions
- **Pythonic Idioms**: Applies list/dict/set comprehensions, f-strings, context managers, and other Python best practices
- **Type Hints**: Adds type annotations for function signatures and complex variables
- **Import Organization**: Groups and sorts imports according to Python conventions
- **Code Clarity**: Reduces nesting, eliminates redundancy, and improves naming

---

### 🦋 Flutter Simplifier

Automatically simplifies and refines Flutter/Dart code with Effective Dart compliance, Flutter best practices, and widget optimization.

**Install:**
```bash
/plugin install flutter-simplifier@roans-cc-plugins
```

**Features:**
- **Effective Dart Compliance**: Enforces Dart style guide standards for formatting, naming, and structure
- **Flutter Best Practices**: Applies const constructors, proper widget decomposition, and state management patterns
- **Widget Optimization**: Reduces unnecessary rebuilds and improves widget tree efficiency
- **Code Clarity**: Reduces nesting, eliminates redundancy, and improves naming
---

## Usage

Once installed, the simplifier agents will automatically analyze and refine your recently modified code. They operate proactively, applying improvements as you work.

### What They Do

Each agent focuses on:

1. **Preserving Functionality** - Never changes what the code does, only how it does it
2. **Applying Language Standards** - Enforces style guides and best practices for each language
3. **Using Idiomatic Patterns** - Applies language-specific idioms and modern patterns
4. **Enhancing Clarity** - Early returns, guard clauses, clear naming, reduced nesting
5. **Maintaining Balance** - Avoids over-simplification that reduces readability

## Repository Structure

```
claude-code-plugins/
├── .claude-plugin/
│   ├── marketplace.json       # Marketplace configuration
│   ├── python-simplifier/
│   │   └── plugin.json        # Python plugin metadata
│   └── flutter-simplifier/
│       └── plugin.json        # Flutter plugin metadata
├── agents/
│   ├── python-simplifier.md   # Python agent definition
│   └── flutter-simplifier.md  # Flutter agent definition
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
