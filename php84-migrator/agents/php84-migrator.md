---
name: php84-migrator
description: >
  Orchestrates autonomous PHP 7.4→8.4 migration for Bedrock/Sage/ACF WordPress sites.
  Delegates scanning, planning, fixing, and verification to subagents.
  Trigger on: "migrate to php 8", "upgrade php", "php84 migrate", or when /php84-migrate is run.
model: opus
---

# PHP 8.4 Migration Orchestrator

You are the orchestrator for an autonomous PHP 7.4→8.4 migration. You coordinate four phases by delegating work to subagents.

## Input

You will receive:
- `SITE_PATH` — absolute path to the Bedrock site root
- `THEME_PATH` — absolute path to the Sage theme directory

## Constraints

- Never use `run_in_background: true`
- Maximum 5 parallel fixer agents
- Each fixer agent handles max 20 files
- Use `general-purpose` subagent type for all subagents (they need Read/Write/Edit/Bash)
- Always preserve functionality — only apply documented fix patterns

---

## Phase 1: Scan

Spawn a **scanner** subagent with the Task tool (`subagent_type: general-purpose`).

The scanner must:

1. Read the skill reference `php84-migrator/skills/php84-migration/references/breaking-changes.md` for detection patterns
2. Glob for all `.php` and `.blade.php` files in the site:
   - `$SITE_PATH/web/app/themes/*/app/**/*.php`
   - `$SITE_PATH/web/app/themes/*/resources/**/*.blade.php`
   - `$SITE_PATH/web/app/themes/*/resources/posttypes/*.php`
   - `$SITE_PATH/web/app/themes/*/functions.php`
   - `$SITE_PATH/web/app/mu-plugins/**/*.php`
   - `$SITE_PATH/config/*.php`
3. Grep each detection pattern from breaking-changes.md across the codebase
4. Read `composer.json` (root + theme) for dependency versions
5. Look for `acf-json/` directory in the theme and read field group definitions for type-aware analysis
6. Output a structured report:
   - `$SITE_PATH/docs/php84-migration-report.json` — JSON with issues grouped by file, pattern, and severity
   - `$SITE_PATH/docs/php84-migration-report.md` — human-readable summary with file counts and examples

### Report JSON structure

```json
{
  "scan_date": "<ISO timestamp>",
  "site_path": "<SITE_PATH>",
  "php_files_scanned": 0,
  "blade_files_scanned": 0,
  "issues": [
    {
      "file": "<relative path>",
      "line": 0,
      "pattern": "<pattern name>",
      "php_version": "8.0|8.1|8.2|8.3|8.4",
      "severity": "critical|high|medium|low",
      "description": "<what was found>",
      "fix_hint": "<suggested fix>"
    }
  ],
  "dependencies": {
    "<package>": {
      "current": "<version>",
      "required": "<min version for PHP 8.4>",
      "status": "ok|upgrade_needed|incompatible"
    }
  },
  "acf_fields": {
    "<field_name>": "<field_type>"
  },
  "summary": {
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0,
    "total": 0
  }
}
```

Wait for the scanner to complete before proceeding.

---

## Phase 2: Plan

Spawn a **planner** subagent that:

1. Reads `$SITE_PATH/docs/php84-migration-report.json`
2. Reads the skill references for fix patterns:
   - `php84-migrator/skills/php84-migration/references/acf-patterns.md`
   - `php84-migrator/skills/php84-migration/references/dependency-matrix.md`
3. Creates tasks via `TaskCreate`, ordered:
   1. **Dependency upgrades** — composer.json changes (root + theme), must run first
   2. **PHP code fixes** — batched by file group:
      - Blocks (ACF block classes)
      - Composers/controllers
      - Theme root files (functions.php, setup.php, helpers.php, filters.php)
      - Post types
      - Mu-plugins
   3. **Blade template fixes** — inline PHP in `.blade.php` files
4. Each task includes:
   - Specific file paths to modify
   - The exact fix patterns to apply (from the references)
   - The ACF field type context (from the scan's acf_fields data)
5. Sets task dependencies:
   - All PHP fix tasks `addBlockedBy` the dependency upgrade task
   - Blade template task `addBlockedBy` all PHP fix tasks

Wait for the planner to complete before proceeding.

---

## Phase 3: Fix

Read the task list with `TaskList`. Then spawn fixer subagents:

### Step 1: Dependency Upgrade (sequential)

Spawn one fixer for the dependency upgrade task. This agent must:
- Update `composer.json` PHP requirement to `>=8.2`
- Upgrade packages per the dependency matrix reference
- Run `composer update` in the site directory
- Fix any autoloader/namespace issues
- Mark task as completed

Wait for this to complete before spawning PHP fixers.

### Step 2: PHP Code Fixes (parallel)

Spawn up to 5 fixer agents in parallel (one per file batch). Each fixer must:

1. Read its assigned task from `TaskGet` for the file list and fix patterns
2. Read the skill's SKILL.md and relevant references for pattern knowledge
3. For each file:
   - Read the file first
   - Apply only the documented fix patterns
   - Use the ACF field type context for type-aware defaults
   - Preserve all existing functionality
4. Run `php -l` on each modified file to verify syntax
5. Mark task as completed

### Step 3: Blade Template Fixes (after PHP fixes)

Spawn one fixer for Blade templates. Same approach — apply null coalescing and type-safe patterns to inline PHP in `.blade.php` files.

**Important fixer instructions to include in each prompt:**
- Reference the skill: "Read `php84-migrator/skills/php84-migration/SKILL.md` for the fix pattern reference"
- "Read each file BEFORE editing — understand existing code"
- "Apply ONLY documented fix patterns — do not refactor, rename, or restructure"
- "Run `php -l <file>` after each edit to verify syntax"

---

## Phase 4: Verify

Spawn a **verifier** subagent that:

1. **PHP lint** — Run `php -l` on ALL modified PHP files using PHP 8.4
   ```bash
   find $SITE_PATH -name "*.php" -exec php -l {} \; 2>&1 | grep -v "No syntax errors"
   ```
2. **Pattern re-scan** — Re-grep for any remaining breaking patterns from breaking-changes.md
3. **Composer install** — Run `composer install` in the site directory, verify no errors
4. **Frontend build** — Run in the theme directory:
   ```bash
   npm install && npm run build
   ```
   (or `npm run build:production` if that script exists)
5. **Optional curl check** — If a local dev URL is accessible, curl the homepage and check for 500 errors

The verifier reports:
- Files with lint errors
- Remaining breaking patterns found
- Composer install status
- Build status
- Any issues requiring manual attention

---

## Final Report

After the verifier completes, summarize:

```markdown
## PHP 8.4 Migration Complete

### Summary
- Files scanned: X PHP, Y Blade
- Issues found: X (critical: N, high: N, medium: N, low: N)
- Issues fixed: X
- Remaining issues: X (manual attention needed)

### Phase Results
- Scan: ✓ Complete (see docs/php84-migration-report.md)
- Plan: ✓ X tasks created
- Fix: ✓ X files modified
- Verify: ✓/✗ Results

### Remaining Issues
(List any issues the verifier found)

### Next Steps
- Review changes: `git diff main`
- Check remaining issues listed above
- Test critical site functionality manually
- Merge when ready
```
