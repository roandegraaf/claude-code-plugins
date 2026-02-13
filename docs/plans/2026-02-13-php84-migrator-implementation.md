# PHP 8.4 Migrator Plugin — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Claude Code workflow plugin that autonomously migrates Bedrock/Sage/ACF WordPress sites from PHP 7.4 to 8.4 using team-based agent delegation.

**Architecture:** Self-contained plugin directory (`php84-migrator/`) with a single slash command (`/php84-migrate`) that spawns an orchestrator agent. The orchestrator delegates to scanner, planner, fixer, and verifier subagents. A comprehensive skill with reference docs provides all PHP 7.4→8.4 migration knowledge.

**Tech Stack:** Claude Code plugin system (commands, skills, agents), PHP 7.4→8.4 migration patterns, Bedrock/Sage/ACF domain knowledge.

---

### Task 1: Create plugin scaffold

**Files:**
- Create: `php84-migrator/.claude-plugin/plugin.json`

**Step 1: Create plugin.json**

```json
{
  "name": "php84-migrator",
  "version": "1.0.0",
  "description": "Autonomously migrate Bedrock/Sage/ACF WordPress sites from PHP 7.4 to 8.4 with team-based agent delegation",
  "author": {
    "name": "Roan de Graaf",
    "email": "info@roandegraaf.nl"
  },
  "homepage": "https://github.com/roandegraaf/claude-code-plugins",
  "keywords": [
    "php",
    "php84",
    "migration",
    "wordpress",
    "bedrock",
    "sage",
    "acf"
  ],
  "license": "MIT"
}
```

**Step 2: Register in marketplace**

Modify: `/.claude-plugin/marketplace.json`

Add to the `plugins` array:

```json
{
  "name": "php84-migrator",
  "description": "Autonomously migrate Bedrock/Sage/ACF WordPress sites from PHP 7.4 to 8.4 with team-based agent delegation",
  "version": "1.0.0",
  "source": "./php84-migrator",
  "category": "development",
  "strict": false
}
```

**Step 3: Commit**

```bash
git add php84-migrator/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git commit -m "feat: scaffold php84-migrator plugin"
```

---

### Task 2: Create the skill — SKILL.md

**Files:**
- Create: `php84-migrator/skills/php84-migration/SKILL.md`

**Step 1: Write SKILL.md**

This is the core knowledge file. It should:
- Have frontmatter with `name: php84-migration` and a description that triggers on PHP migration tasks
- Provide a concise overview of PHP 7.4→8.4 breaking changes
- Reference the detailed docs in `references/`
- Include the ACF field type → safe default mapping table
- Include the fix pattern examples (null coalescing, implicit nullable, dynamic properties, etc.)

Structure:

```markdown
---
name: php84-migration
description: >
  PHP 7.4 to 8.4 migration knowledge for WordPress Bedrock/Sage/ACF sites.
  Triggers on: PHP migration, PHP upgrade, PHP 8 compatibility, null safety,
  deprecated functions, dynamic properties, Bedrock upgrade, Sage upgrade.
---

# PHP 7.4 → 8.4 Migration Knowledge

## Breaking Changes Summary
(Brief table linking to references/breaking-changes.md)

## ACF Field Type Defaults
(The type-aware mapping table from the design doc)

## Fix Pattern Quick Reference
(Compact examples of each fix pattern)

## Bedrock/Sage Specifics
(Link to references/bedrock-sage.md)

## Dependency Compatibility
(Link to references/dependency-matrix.md)
```

Keep SKILL.md under 120 lines — detailed content goes in references.

**Step 2: Commit**

```bash
git add php84-migrator/skills/php84-migration/SKILL.md
git commit -m "feat: add php84-migration skill with core patterns"
```

---

### Task 3: Create reference — breaking-changes.md

**Files:**
- Create: `php84-migrator/skills/php84-migration/references/breaking-changes.md`

**Step 1: Write breaking-changes.md**

Comprehensive reference of all PHP breaking changes from 7.4 through 8.4, organized by version. For each change include:

- What changed
- Error type (TypeError, Deprecated, Removed, Fatal)
- Detection pattern (grep regex)
- Fix pattern (before → after code)

Cover at minimum:

**PHP 8.0:**
- Named arguments (informational, not breaking)
- `match` expression (informational)
- Nullsafe operator `?->` (informational — new tool)
- String functions reject null (`strlen`, `strpos`, `substr`, `str_contains`, `str_replace`, `strtolower`, `strtoupper`, `trim`, `ltrim`, `rtrim`, `explode`, `implode`, `sprintf`, `str_pad`, `str_repeat`, `str_word_count`, `str_split`, `nl2br`, `ucfirst`, `lcfirst`, `ucwords`, `wordwrap`, `number_format`, `htmlspecialchars`, `htmlentities`, `strip_tags`, `preg_match`, `preg_replace`, `preg_split`)
- `array_key_exists` no longer works on objects
- `\` required for `assert()`
- `create_function()` removed
- Stricter type coercion for internal functions

**PHP 8.1:**
- Enum keyword (reserved)
- Fibers (informational)
- `readonly` properties (informational)
- Implicit float→int conversions deprecated
- `$GLOBALS` restrictions
- `mysqli_*` → OOP migration
- `null` to non-nullable internal function parameter → TypeError

**PHP 8.2:**
- Dynamic properties deprecated (→ error in 9.0, but already causes issues with strict settings)
- `readonly` classes
- `utf8_encode()`/`utf8_decode()` removed
- `${var}` string interpolation deprecated
- `strtolower()`/`strtoupper()` locale-sensitive behavior deprecated
- Partially supported callable deprecated
- `#[SensitiveParameter]` (informational)
- `null`/`false`/`true` as standalone types

**PHP 8.3:**
- `json_validate()` (informational)
- Typed class constants (informational)
- `#[Override]` attribute (informational)
- `unserialize()` emits deprecation for incomplete classes
- `array_sum()`/`array_product()` behavior change with non-numeric values

**PHP 8.4:**
- Implicit nullable parameter declarations deprecated (`function foo(string $bar = null)` → `function foo(?string $bar = null)`)
- New property hooks (informational)
- `new` without parentheses (informational)
- Deprecated `E_STRICT` constant
- `exit()`/`die()` behavior changes
- `round()` behavior changes with `PHP_ROUND_*` modes
- `strtolower()`/`strtoupper()` no longer locale-sensitive
- Various internal function signature changes

For each, include the grep detection pattern. Example:

```markdown
### Implicit Nullable Parameters (PHP 8.4)

**Impact:** Deprecated → will be removed in PHP 9.0
**Detection:** `grep -rn 'function\s+\w+\s*([^)]*\b(string|int|float|bool|array|object|callable|iterable)\s+\$\w+\s*=\s*null' --include='*.php'`
**Fix:**
\```php
// Before
function foo(string $bar = null) {}
// After
function foo(?string $bar = null) {}
\```
```

**Step 2: Commit**

```bash
git add php84-migrator/skills/php84-migration/references/breaking-changes.md
git commit -m "feat: add comprehensive PHP 7.4→8.4 breaking changes reference"
```

---

### Task 4: Create reference — acf-patterns.md

**Files:**
- Create: `php84-migrator/skills/php84-migration/references/acf-patterns.md`

**Step 1: Write acf-patterns.md**

Cover all ACF-specific migration patterns:

1. **Field type → safe default mapping** (the full table from design doc)
2. **How to detect ACF field types:**
   - From `acf-json/*.json` files (field groups exported as JSON)
   - From `with()` method context analysis (variable naming conventions)
   - From Blade template usage patterns
3. **Common ACF patterns that break on PHP 8.x:**
   - `get_field()` → null → passed to `strlen()`, string concatenation
   - `get_sub_field()` in repeater loops
   - `get_field('image')` → null → passed to `wp_get_attachment_image_url()`
   - `have_rows()` / `the_row()` patterns (generally safe but check sub_field usage)
   - `get_field_object()` patterns
4. **Fix examples for each ACF block pattern:**
   - Block `with()` method fixes
   - Blade template `@php` block fixes
   - Composer/controller fixes
5. **ACF Gutenblocks specific:**
   - `AbstractBladeBlock` → null handling in constructor
   - `TEMPLATEPATH` constant usage
   - `ReflectionClass` usage (safe on 8.4)

Include before/after code examples for each pattern, derived from the actual cobee2022 codebase patterns discovered during exploration.

**Step 2: Commit**

```bash
git add php84-migrator/skills/php84-migration/references/acf-patterns.md
git commit -m "feat: add ACF-specific PHP 8.4 migration patterns reference"
```

---

### Task 5: Create reference — bedrock-sage.md

**Files:**
- Create: `php84-migrator/skills/php84-migration/references/bedrock-sage.md`

**Step 1: Write bedrock-sage.md**

Cover Bedrock and Sage framework-specific migration concerns:

1. **Bedrock structure awareness:**
   - `config/application.php` — PHP dotenv usage, `Config::define()` patterns
   - `config/environments/*.php` — environment-specific config
   - `web/app/mu-plugins/` — mu-plugin compatibility
   - Composer-managed WordPress core (`roots/wordpress`)
   - Composer-managed plugins (`wpackagist-plugin/*`)

2. **Sage 10 migration:**
   - Acorn framework version upgrade path (2.x alpha → 4.x stable)
   - Service provider changes between Acorn versions
   - View Composer patterns and potential breaking changes
   - Blade template compilation with PHP 8.4
   - `app/setup.php` — theme support, asset registration
   - `app/filters.php` — WordPress filter patterns
   - `app/helpers.php` — utility function patterns
   - `resources/posttypes/` — custom post type registration

3. **Typical file scan order for a Bedrock/Sage site:**
   ```
   1. composer.json (root + theme)
   2. config/application.php
   3. web/app/mu-plugins/*.php
   4. web/app/themes/*/app/**/*.php
   5. web/app/themes/*/resources/**/*.blade.php
   6. web/app/themes/*/resources/posttypes/*.php
   7. web/app/themes/*/functions.php
   ```

4. **Known compatibility issues:**
   - Acorn 2.x alpha is NOT compatible with PHP 8.2+
   - ACF Gutenblocks 0.4.x may need updating for PHP 8.4
   - WordPress 5.x is NOT compatible with PHP 8.4
   - Laravel Mix build tool (not affected by PHP version but note for completeness)

**Step 2: Commit**

```bash
git add php84-migrator/skills/php84-migration/references/bedrock-sage.md
git commit -m "feat: add Bedrock/Sage specific migration reference"
```

---

### Task 6: Create reference — dependency-matrix.md

**Files:**
- Create: `php84-migrator/skills/php84-migration/references/dependency-matrix.md`

**Step 1: Write dependency-matrix.md**

A compatibility matrix for common Bedrock/Sage ecosystem packages:

| Package | Typical Old Version | Min for PHP 8.4 | Recommended | Notes |
|---------|-------------------|-----------------|-------------|-------|
| `roots/wordpress` | 5.9 | 6.4 | 6.7+ | Check available wpackagist versions |
| `roots/acorn` | 2.0.0-alpha | 4.0+ | Latest 4.x | Major breaking changes from 2.x→4.x |
| `roots/bedrock-autoloader` | 1.0 | 1.0 | Latest | Generally compatible |
| `roots/wp-config` | 1.0.0 | 1.0.0 | Latest | Generally compatible |
| `roots/wp-password-bcrypt` | 1.0.0 | 1.0.0 | Latest | Generally compatible |
| `vlucas/phpdotenv` | ^5.2 | ^5.2 | ^5.6 | Already PHP 8.x compatible |
| `oscarotero/env` | ^2.1 | ^2.1 | ^2.1 | Check compatibility |
| `itinerisltd/acf-gutenblocks` | 0.4.0 | Check | Latest or fork | May need replacement |
| `wpackagist-plugin/wordpress-seo` | dev-trunk | Latest | Latest | Yoast regularly updates |
| `wpackagist-plugin/amazon-s3-and-cloudfront` | 2.5.5 | Latest | Latest | Check PHP 8.4 support |
| `league/csv` | ^9.6 | ^9.6 | ^9.x | Already compatible |

Include:
- How to check a composer package's PHP requirement: read its `composer.json`
- How to find the latest compatible version: `composer show <package> --available`
- Acorn 2.x → 4.x migration guide highlights (namespace changes, service provider patterns, config changes)
- Warning about `dev-trunk` wpackagist pinning (common in old Bedrock sites)

**Step 2: Commit**

```bash
git add php84-migrator/skills/php84-migration/references/dependency-matrix.md
git commit -m "feat: add dependency compatibility matrix reference"
```

---

### Task 7: Create the orchestrator agent

**Files:**
- Create: `php84-migrator/agents/php84-migrator.md`

**Step 1: Write the agent definition**

```markdown
---
name: php84-migrator
description: >
  Orchestrates autonomous PHP 7.4→8.4 migration for Bedrock/Sage/ACF WordPress sites.
  Delegates scanning, planning, fixing, and verification to subagents.
  Trigger on: "migrate to php 8", "upgrade php", "php84 migrate", or when /php84-migrate is run.
model: opus
---
```

The agent body should define the orchestrator's behavior:

1. **Input:** Accept a site path (defaults to current working directory)
2. **Phase 1 — Scan:** Spawn a scanner subagent (Task tool, `subagent_type: general-purpose`) with instructions to:
   - Read the skill's `references/breaking-changes.md` for detection patterns
   - Glob for all `.php` and `.blade.php` files in the site
   - Grep each detection pattern across the codebase
   - Read `composer.json` (root + theme) for dependency versions
   - Look for `acf-json/` directory and read field group definitions for type-aware analysis
   - Output a structured report as JSON to `docs/php84-migration-report.json` in the site directory
   - Also write a human-readable `docs/php84-migration-report.md`
3. **Phase 2 — Plan:** Spawn a planner subagent that:
   - Reads the migration report JSON
   - Creates tasks via TaskCreate, ordered:
     1. Dependency upgrades (composer.json changes)
     2. PHP code fixes batched by file group (blocks, composers, theme root, posttypes)
     3. Blade template fixes
   - Each task includes the specific files and the exact fix patterns to apply
4. **Phase 3 — Fix:** Read the task list, then spawn fixer subagents in parallel:
   - One for dependency upgrades (runs first, blocks others)
   - Then parallel agents for each PHP file batch
   - Each fixer subagent receives the skill knowledge (reference the skill's SKILL.md in the prompt)
   - Each fixer must read files before editing, apply only the documented fix patterns, preserve functionality
5. **Phase 4 — Verify:** Spawn a verifier subagent that:
   - Runs `php -l` on all PHP files (using PHP 8.4 via Herd)
   - Re-greps for any remaining breaking patterns
   - Runs `composer install` in the site directory
   - Runs `npm install && npm run build` (or `build:production`) in the theme directory
   - Optionally curls the site homepage to check for 500 errors
   - Reports results
6. **Final report:** Summarize all phases, list any remaining issues

Key constraints to include in the agent:
- Never use `run_in_background: true`
- Maximum 5 parallel fixer agents
- Each fixer agent handles max 20 files
- Always `git stash push` before fixing, `git stash pop` on failure
- Use `general-purpose` subagent type for all subagents (they need Read/Write/Edit/Bash)

**Step 2: Commit**

```bash
git add php84-migrator/agents/php84-migrator.md
git commit -m "feat: add orchestrator agent for PHP 8.4 migration"
```

---

### Task 8: Create the slash command

**Files:**
- Create: `php84-migrator/commands/php84-migrate.md`

**Step 1: Write the command definition**

Follow the pattern from `linear-workflow/commands/work.md`:

```markdown
---
name: php84-migrate
description: Autonomously migrate a Bedrock/Sage/ACF WordPress site from PHP 7.4 to PHP 8.4
argument-hint: [path-to-site]
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet
---
```

Command body:

**Step 1: Parse Arguments**
- Extract site path from `$ARGUMENTS`
- If missing, use current working directory
- Validate: check for `composer.json` and `web/app/` (Bedrock structure indicators)
- If not a Bedrock site, print error and stop

**Step 2: Detect Site Structure**
- Find theme directory: glob `web/app/themes/*/style.css`
- Identify Sage version from theme's `composer.json` (look for `roots/acorn`)
- Check for `acf-json/` directory in theme
- Count PHP files and Blade files
- Print site summary

**Step 3: Create Git Safety Branch**
- Run `git status --porcelain` — if dirty, warn and ask to continue
- Create branch: `git checkout -b php84-migration-$(date +%Y%m%d)` from current branch
- Print: "Created migration branch. Original code is safe."

**Step 4: Run the Orchestrator**
- Invoke the `php84-migrator` agent via the Task tool with `subagent_type: general-purpose`
- Pass the site path and theme path as context
- The agent handles all 4 phases (scan → plan → fix → verify)

**Step 5: Report**
- When agent completes, print final summary
- Point to `docs/php84-migration-report.md` for the full scan report
- Suggest: "Review changes with `git diff main`, then merge when ready"

**Step 2: Commit**

```bash
git add php84-migrator/commands/php84-migrate.md
git commit -m "feat: add /php84-migrate slash command"
```

---

### Task 9: Test with cobee2022 site

**Files:**
- No files to create — this is a validation task

**Step 1: Install the plugin locally**

Verify the plugin can be loaded by Claude Code. Check that:
- `/php84-migrate` appears as an available command
- The skill `php84-migration` is loaded
- The agent `php84-migrator` is registered

**Step 2: Dry-run scan phase**

Manually test the scanner's grep patterns against `/Users/roandegraaf/Sites/cobee2022`:
- Run each detection regex from `breaking-changes.md` against the cobee2022 codebase
- Verify patterns detect the known issues (26 block files with get_field, 4 archive composers with $_GET, etc.)
- Check for false positives

**Step 3: Verify fix patterns**

Pick 2-3 representative files from cobee2022 and manually verify the fix patterns produce correct PHP 8.4 code:
- A block file (e.g., `HeaderBlock.php`)
- An archive composer (e.g., `ArchiveNews.php`)
- `functions.php`

**Step 4: Document findings**

If any patterns are missing or incorrect, update the relevant reference docs and commit.

**Step 5: Commit any fixes**

```bash
git add -A && git commit -m "fix: refine migration patterns based on cobee2022 testing"
```

---

### Task 10: Final review and cleanup

**Files:**
- Modify: `/.claude-plugin/marketplace.json` (verify entry)

**Step 1: Review all files**

Read through every file in `php84-migrator/` and verify:
- Consistent formatting and style with other plugins in the repo
- No typos or broken references between files
- All reference links in SKILL.md point to existing files
- Agent correctly references the skill knowledge

**Step 2: Verify marketplace entry**

Ensure the marketplace.json entry correctly points to `./php84-migrator` and lists the plugin.

**Step 3: Final commit**

```bash
git add -A && git commit -m "chore: final review and cleanup of php84-migrator plugin"
```
