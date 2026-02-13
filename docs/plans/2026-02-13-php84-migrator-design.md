# PHP 8.4 Migrator Plugin — Design Document

## Purpose

A Claude Code workflow plugin that autonomously migrates Bedrock/Sage/ACF WordPress sites from PHP 7.4 to 8.4 using team-based agent delegation.

## Target Stack

- **CMS:** WordPress (Bedrock structure)
- **Theme:** Roots Sage 10 (Blade templates, Acorn framework)
- **Fields:** Advanced Custom Fields with ACF Gutenblocks
- **PHP:** 7.4 → 8.4

## Command

```
/php84-migrate [path-to-site]
```

Single entry point. Orchestrator delegates all work to subagents.

## Architecture

```
Orchestrator (main agent — stays lightweight)
├── Phase 1: Scanner agent → migration report
├── Phase 2: Planner agent → task list from report
├── Phase 3: Fixer agents (parallel)
│   ├── dependency-upgrader → composer.json, WP version, Acorn
│   ├── php-fixer-batch-1 → blocks (ACF null safety)
│   ├── php-fixer-batch-2 → composers/controllers
│   └── php-fixer-batch-N → remaining PHP files
├── Phase 4: Verifier agent → lint, test, build, check
└── Final report to user
```

Each subagent receives the skill knowledge so it knows exact patterns.

## Plugin Structure

```
php84-migrator/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   └── php84-migrate.md
├── skills/
│   └── php84-migration/
│       ├── SKILL.md
│       └── references/
│           ├── breaking-changes.md
│           ├── bedrock-sage.md
│           ├── acf-patterns.md
│           └── dependency-matrix.md
└── agents/
    └── php84-migrator.md
```

## Phase 1: Scanner

Analyzes the codebase and produces a structured report.

### PHP Patterns Detected

| Pattern | Impact | Detection |
|---------|--------|-----------|
| Null to string functions (strlen, substr, strpos, etc.) | TypeError 8.1+ | get_field() results in string ops |
| Implicit nullable params (`string $x = null`) | Deprecated 8.4 | Grep typed params with `= null` |
| Dynamic properties | Error 8.4 | Class analysis |
| $_GET/$_POST without null coalescing | TypeError | Superglobal access patterns |
| array_* functions with nullable input | TypeError 8.1+ | array_map/filter with nullable sources |
| utf8_encode()/utf8_decode() | Removed 8.2 | Direct grep |
| ${var} string interpolation | Deprecated 8.2 | Grep `"${` |
| Blade template inline PHP | Same as above | Scan .blade.php files |

### Dependency Check

| Dependency | Check |
|-----------|-------|
| WordPress core | Minimum 6.4 for PHP 8.4 |
| Roots Acorn | Alpha → stable 4.x |
| ACF Gutenblocks | PHP 8.4 compatibility |
| All composer deps | php requirement field |

### Output

- `docs/php84-migration-report.json` — structured data for planner
- `docs/php84-migration-report.md` — human-readable summary

## Phase 2: Planner

Reads the scan report and creates an ordered task list:

1. Dependency upgrades (must come first)
2. PHP code fixes grouped by file batch
3. Blade template fixes
4. Verification tasks

Creates tasks via TaskCreate for the fix agents.

## Phase 3: Fixers

### Fix Patterns

**Null-safe ACF fields (type-aware):**

| ACF Field Type | Safe Default |
|---|---|
| text, textarea, wysiwyg, email, url, password | `?? ''` |
| number, range | `?? 0` or `?? null` (context-dependent) |
| image, file, post_object, page_link | Leave nullable, guard before use |
| gallery, repeater, flexible_content, relationship | `?: []` |
| true_false | `?? false` |
| select, radio | `?? ''` |
| checkbox | `?: []` |
| group, link | Guard before property/array access |
| color_picker | `?? ''` |

Field types detected from `acf-json/` exports or `with()` method context.

**Null-safe string functions:**
```php
strlen($var)       → strlen($var ?? '')
strpos($var, 'x')  → strpos($var ?? '', 'x')
strtolower($var)   → strtolower($var ?? '')
```

**Implicit nullable parameters:**
```php
function foo(string $bar = null)  → function foo(?string $bar = null)
```

**Dynamic properties:**
```php
// Add explicit property declarations or #[AllowDynamicProperties]
```

**Superglobal access:**
```php
isset($_GET['x']) ? $_GET['x'] : default  → $_GET['x'] ?? default
```

**Array functions:**
```php
array_map($fn, get_posts($args))  → array_map($fn, get_posts($args) ?: [])
```

### Dependency Upgrades

1. Update composer.json PHP requirement to `>=8.2`
2. Upgrade WordPress to latest 6.x
3. Upgrade Roots Acorn to latest stable
4. Check/upgrade ACF Gutenblocks
5. Run composer update
6. Fix autoloader/namespace issues

### Parallel Execution

Fix agents run in parallel, batched by file group:
- Blocks batch (26 files)
- Composers/controllers batch
- Theme root files (functions.php, setup.php, helpers.php, etc.)
- Blade templates batch
- Dependency upgrade (sequential — runs first)

## Phase 4: Verifier

1. **PHP lint** — `php -l` on all PHP files using PHP 8.4
2. **Pattern re-scan** — Re-run scanner patterns, confirm zero issues
3. **Composer install** — Verify dependency resolution
4. **Deprecation check** — `php -d error_reporting=E_ALL` on entry files
5. **Frontend build** — `npm install && npm run build` (or build:production)
6. **Curl check** — Hit homepage via Herd, check for 500 errors (optional)

Reports remaining issues that need manual attention.

## Environment

- **Local dev:** Laravel Herd (easy PHP version switching)
- **PHP target:** 8.4
- **Build tools:** Laravel Mix / Webpack (existing), npm

## Success Criteria

- All PHP files pass `php -l` with PHP 8.4
- Zero deprecated/removed function usage detected
- `composer install` succeeds
- Frontend assets build successfully
- Site loads without 500 errors on PHP 8.4
