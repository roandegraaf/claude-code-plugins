# Roan's Claude Code Plugins

A collection of Claude Code plugins including agents for code simplification, skills for WordPress development, and workflow automation.

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

### 🔴 Laravel Simplifier

Automatically simplifies and refines Laravel PHP code with version-aware conventions (8.x-11.x), security best practices, and idiomatic patterns.

**Install:**
```bash
/plugin install laravel-simplifier@roans-cc-plugins
```

**Features:**
- **Version-Aware**: Detects Laravel version from `composer.json` and applies appropriate conventions (8.x-11.x)
- **Laravel Standards**: Enforces PSR-12 + Laravel naming conventions for controllers, models, routes, and database columns
- **Eloquent Best Practices**: Query scopes, relationships, eager loading, version-appropriate accessor/mutator syntax
- **Security**: Mass assignment protection, validation, authorization (Policies/Gates), CSRF, SQL injection prevention
- **Blade Templates**: Components over `@include`, slots, typed props (Laravel 9+)
- **Architecture Respect**: Works within existing patterns (Repository, Service, Action classes) without forcing changes
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

### :arrows_counterclockwise: Linear Workflow

Automate the Linear + Git/GitHub development workflow: pick up issues, create branches, ship PRs, merge and close the loop.

**Install:**
```bash
/plugin install linear-workflow@roans-cc-plugins
```

**Prerequisites:** Linear MCP server (`linear-server`) + GitHub MCP server (or `gh` CLI).

**Commands:**
- **`/work <issue>`** — Pick up a Linear issue, create a branch, set status to In Progress, and plan implementation
- **`/ship [msg]`** — Commit changes, push the branch, and create a PR linked to the Linear issue
- **`/my-issues`** — View your assigned Linear issues grouped by status
- **`/issue-status`** — Check sync status between Linear, Git, and GitHub PR
- **`/merge`** — Merge the PR, mark the issue as Done, and clean up the branch

**Usage:**
Run `/work ENG-123` to start working on an issue. When ready, `/ship` to create a PR. After approval, `/merge` to complete the cycle. Use `/my-issues` to browse your backlog and `/issue-status` to check where things stand.

---

### :rocket: PHP 8.4 Migrator

Autonomously migrate Bedrock/Sage/ACF WordPress sites from PHP 7.4 to PHP 8.4 with team-based agent delegation.

**Install:**
```bash
/plugin install php84-migrator@roans-cc-plugins
```

**Features:**
- **4-Phase Migration**: Automated scan → plan → fix → verify pipeline
- **Breaking Change Detection**: Finds null safety issues, dynamic properties, implicit nullable params, deprecated functions across PHP 8.0–8.4
- **ACF-Aware**: Type-aware null coalescing based on ACF field types (text → `?? ''`, repeater → `?: []`, etc.)
- **Bedrock/Sage Support**: Handles Composer dependencies, Blade templates, service providers, and Bud build pipeline
- **Dependency Matrix**: Automatically upgrades Composer packages to PHP 8.4-compatible versions
- **Team-Based**: Orchestrator delegates to parallel scanner, planner, fixer, and verifier subagents

**Usage:**
```
/php84-migrate /path/to/bedrock-site
```

---

### :art: Bootstrap to Tailwind Migrator

Autonomously migrate WordPress themes from Bootstrap 4 CSS to Tailwind CSS v4 with team-based agent delegation.

**Install:**
```bash
/plugin install bootstrap-to-tailwind@roans-cc-plugins
```

**Features:**
- **4-Phase Migration**: Automated scan → plan → fix → verify pipeline
- **Grid Migration**: Bootstrap flexbox grid (`row`/`col-md-6`) → Tailwind CSS Grid (`grid grid-cols-12`/`col-span-6`)
- **Utility Class Mapping**: Exhaustive Bootstrap 4 → Tailwind v4 class mapping (display, flex, text, spacing, sizing)
- **SCSS Conversion**: Bootstrap variables/mixins → CSS custom properties and `@theme` configuration
- **Build Pipeline**: Gulp + node-sass → Tailwind CLI (keeps same output path, no WordPress enqueue changes)
- **JS Component Detection**: Identifies Bootstrap JS usage (modals, dropdowns, collapse) and suggests CSS-only/Alpine.js replacements
- **Team-Based**: Orchestrator delegates to parallel scanner, planner, fixer, and verifier subagents

**Usage:**
```
/tailwind-migrate /path/to/wordpress-theme
```

---

### :zap: Ultrapowers

Tackle large tasks as a series of one-session "slices" so output quality never degrades from a bloated context. Brainstorm a high-level overview that acts as a guardrail, then loop implement → handoff → complete in fresh sessions — re-assessing what's left after each slice instead of planning everything up front.

**Install:**
```bash
/plugin install ultrapowers@roans-cc-plugins
```

**Commands:**
- **`/brainstorm <idea>`** — Think through a task. Small ones are built inline; large ones get a high-level `OVERVIEW.md` (north star + checkable Definition of Done) and a first `NEXT_SLIDE.md`
- **`/implement [slug]`** — In a fresh session, build only the current slice from `NEXT_SLIDE.md`, guarded by the overview
- **`/handoff [slug]`** — Log progress, then write the next slice — or route to `/complete` when the Definition of Done is met
- **`/complete [slug]`** — Re-verify against the code, fold anything durable into `CLAUDE.md`, and archive the task docs
- **`/autopilot [slug]`** — Run the whole loop autonomously via fresh per-slice subagents; pauses only to ask you a question, and checkpoints itself before its context fills up
- **`/visualize <idea>`** — Spin up a token-frugal HTML mockup on a local server during a brainstorm, with optional click-to-pick options

**Usage:**
Run `/brainstorm add a billing dashboard` to scope it, then `/implement` → `/handoff` in fresh sessions until done, finishing with `/complete`. Or hand the whole thing to `/autopilot <slug>` and let it run unattended. State lives in `docs/slides/<slug>/`, so you can stop and resume anytime.

---

## Usage

### Agents (python-simplifier, flutter-simplifier, swift-simplifier, php-wordpress-simplifier, laravel-simplifier)

Once installed, the simplifier agents will automatically analyze and refine your recently modified code. They operate proactively, applying improvements as you work.

Each agent focuses on:

1. **Preserving Functionality** - Never changes what the code does, only how it does it
2. **Applying Language Standards** - Enforces style guides and best practices for each language
3. **Using Idiomatic Patterns** - Applies language-specific idioms and modern patterns
4. **Enhancing Clarity** - Early returns, guard clauses, clear naming, reduced nesting
5. **Maintaining Balance** - Avoids over-simplification that reduces readability

### Skills (sage-wordpress-builder)

Skills provide specialized knowledge and workflows. Claude automatically uses installed skills when the task matches the skill's description - no command needed. Just ask Claude to create an ACF block or work on a Sage project, and it will apply the conventions from the skill.

### Workflow Plugins (linear-workflow)

Workflow plugins provide slash commands that automate multi-step development processes. Run `/work`, `/ship`, `/merge`, `/my-issues`, and `/issue-status` to drive the full Linear + Git/GitHub cycle without leaving Claude Code.

### Migration Plugins (php84-migrator, bootstrap-to-tailwind)

Migration plugins provide autonomous, multi-phase migration pipelines. Run `/php84-migrate` or `/tailwind-migrate` with a path to your site/theme, and the orchestrator handles scanning, planning, fixing, and verification using parallel subagents.

## Repository Structure

```
claude-code-plugins/
├── .claude-plugin/
│   └── marketplace.json       # Marketplace configuration
├── agents/
│   ├── python-simplifier.md          # Python agent definition
│   ├── flutter-simplifier.md         # Flutter agent definition
│   ├── swift-simplifier.md           # Swift agent definition
│   ├── php-wordpress-simplifier.md   # PHP WordPress agent definition
│   └── laravel-simplifier.md         # Laravel agent definition
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
├── linear-workflow/
│   ├── .claude-plugin/
│   │   └── plugin.json           # Plugin metadata
│   ├── commands/
│   │   ├── work.md               # /work <issue>
│   │   ├── ship.md               # /ship [msg]
│   │   ├── my-issues.md          # /my-issues
│   │   ├── issue-status.md       # /issue-status
│   │   └── merge.md              # /merge
│   └── skills/
│       └── linear-workflow/
│           ├── SKILL.md           # Workflow conventions
│           └── references/
│               ├── branch-naming.md
│               └── pr-templates.md
├── php84-migrator/
│   ├── agents/
│   │   └── php84-migrator.md     # 4-phase orchestrator
│   ├── commands/
│   │   └── php84-migrate.md      # /php84-migrate [path]
│   └── skills/
│       └── php84-migration/
│           ├── SKILL.md
│           └── references/
│               ├── breaking-changes.md
│               ├── acf-patterns.md
│               ├── bedrock-sage.md
│               └── dependency-matrix.md
├── bootstrap-to-tailwind/
│   ├── agents/
│   │   └── tailwind-migrator.md  # 4-phase orchestrator
│   ├── commands/
│   │   └── tailwind-migrate.md   # /tailwind-migrate [path]
│   └── skills/
│       └── tailwind-migration/
│           ├── SKILL.md
│           └── references/
│               ├── class-mapping.md
│               ├── grid-migration.md
│               ├── scss-migration.md
│               ├── js-components.md
│               └── build-pipeline.md
├── ultrapowers/
│   ├── .claude-plugin/
│   │   └── plugin.json           # Plugin metadata
│   └── skills/
│       ├── brainstorm/SKILL.md   # /brainstorm <idea>
│       ├── implement/SKILL.md    # /implement [slug]
│       ├── handoff/SKILL.md      # /handoff [slug]
│       ├── complete/SKILL.md     # /complete [slug]
│       ├── autopilot/SKILL.md    # /autopilot [slug]
│       └── visualize/SKILL.md    # /visualize <idea>
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
