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

### 🍎 Swift Simplifier

Automatically simplifies and refines Swift 6 code with API Design Guidelines compliance, concurrency safety preservation, and idiomatic patterns.

**Install:**
```bash
/plugin install swift-simplifier@roans-cc-plugins
```

**Features:**
- **Swift API Design Guidelines**: Enforces Apple's naming conventions (noun phrases, imperative verbs, fluent usage)
- **Concurrency Safety**: Preserves all Swift 6 concurrency annotations (`Sendable`, actors, `async`/`await`, `@MainActor`)
- **Swift Best Practices**: Applies guard statements, optional chaining, collection APIs, protocol-oriented design
- **Type Safety**: Maintains generics, property wrappers, and memory modifiers
- **Code Clarity**: Reduces nesting, eliminates redundancy, and improves naming

---

### 🐘 PHP WordPress Simplifier

Automatically simplifies and refines PHP WordPress plugin code with WPCS compliance, security best practices, and modern PHP patterns.

**Install:**
```bash
/plugin install php-wordpress-simplifier@roans-cc-plugins
```

**Features:**
- **WordPress Coding Standards**: Enforces WPCS including naming conventions, Yoda conditions, proper spacing, and i18n
- **Security Best Practices**: Ensures proper sanitization, escaping, nonce verification, and capability checks
- **Modern PHP**: Applies PHP 7.4+ features like type declarations, null coalescing, and arrow functions
- **Plugin Architecture**: Follows proper WordPress plugin structure with OOP and namespaces
- **Performance**: Implements caching with transients and object cache, optimizes database queries
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

### Agents (python-simplifier, flutter-simplifier, swift-simplifier, php-wordpress-simplifier)

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
│   ├── python-simplifier.md          # Python agent definition
│   ├── flutter-simplifier.md         # Flutter agent definition
│   ├── swift-simplifier.md           # Swift agent definition
│   └── php-wordpress-simplifier.md   # PHP WordPress agent definition
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
