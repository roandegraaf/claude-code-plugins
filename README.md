# Roan's Claude Code Plugins

A collection of Claude Code plugins including agents for code simplification and skills for WordPress development.

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

### 🌿 Sage WordPress Builder

Build WordPress websites using Roots Sage 10/11 with ACF Pro blocks, Tailwind CSS v4, Laravel Blade templating, and Vite.

**Install:**
```bash
/plugin install sage-wordpress-builder@roans-cc-plugins
```

**Features:**
- **ACF Blocks**: Complete patterns for creating ACF blocks with BaseBlock, PHP classes, and Blade templates
- **Field Groups**: Boilerplate for `group_layout` and `group_reusable_content` with standardized fields
- **Blade Components**: Section wrapper and content components (subtitle, title, text, buttons)
- **Tailwind CSS v4**: CSS-first configuration with spacing and background color conventions
- **Scroll Animations**: GSAP + Lenis patterns with `data-reveal-group` for staggered animations
- **WordPress Standards**: Escaping, naming conventions, and query patterns

**Usage:**
This skill is automatically activated when working on Sage/WordPress projects. Claude will use these conventions when you ask to create ACF blocks, Blade components, or work with the Sage/Roots ecosystem.

---

## Usage

### Agents (python-simplifier, flutter-simplifier)

Once installed, the simplifier agents will automatically analyze and refine your recently modified code. They operate proactively, applying improvements as you work.

Each agent focuses on:

1. **Preserving Functionality** - Never changes what the code does, only how it does it
2. **Applying Language Standards** - Enforces style guides and best practices for each language
3. **Using Idiomatic Patterns** - Applies language-specific idioms and modern patterns
4. **Enhancing Clarity** - Early returns, guard clauses, clear naming, reduced nesting
5. **Maintaining Balance** - Avoids over-simplification that reduces readability

### Skills (sage-wordpress-builder)

Skills provide specialized knowledge and workflows. Claude automatically uses installed skills when the task matches the skill's description - no command needed. Just ask Claude to create an ACF block or work on a Sage project, and it will apply the conventions from the skill.

## Repository Structure

```
claude-code-plugins/
├── .claude-plugin/
│   └── marketplace.json       # Marketplace configuration
├── agents/
│   ├── python-simplifier.md   # Python agent definition
│   └── flutter-simplifier.md  # Flutter agent definition
├── skills/
│   └── sage-wordpress-builder/
│       ├── SKILL.md           # Skill definition
│       └── references/        # Reference documentation
│           ├── architecture.md
│           ├── acf-blocks.md
│           ├── acf-fields.md
│           ├── blade-components.md
│           ├── animations.md
│           └── tailwind.md
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
