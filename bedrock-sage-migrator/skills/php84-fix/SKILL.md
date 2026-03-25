---
name: php84-fix
description: Fix PHP 8.4 deprecations in any WordPress site (Bedrock/Sage or classic theme)
argument-hint: [path-to-site]
disable-model-invocation: true
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet, TeamCreate, TeamDelete, SendMessage
---

# /php84-fix — PHP 8.4 Compatibility Fixer

Standalone command for fixing PHP 8.4 deprecations in any WordPress site. Use this when you already have a Bedrock/Sage site (or any WordPress site) and only need PHP 8.4 fixes — no conversion to Bedrock/Sage.

## Step 1: Parse Arguments

Extract site path from `$ARGUMENTS`.

- If provided: use the given path (resolve to absolute if relative)
- If missing: use the current working directory

Validate the path exists and detect site type:

**Check 1 — Bedrock site:**
```bash
ls <site-path>/composer.json
ls <site-path>/web/app/
```

If both exist: `SITE_TYPE=bedrock`

**Check 2 — Classic WordPress theme:**
```bash
grep -l "Theme Name:" <site-path>/style.css
```

If `style.css` exists with a `Theme Name:` header: `SITE_TYPE=classic`

**Otherwise:** Print error and stop:
- Print: "Could not detect site type. Expected either a Bedrock site (`composer.json` + `web/app/`) or a classic WordPress theme (`style.css` with Theme Name header)."
- Print: "Usage: `/php84-fix [path-to-site]`"
- Stop.

## Step 2: Detect Site Structure

### If `SITE_TYPE=bedrock`

Find the theme directory:
```bash
ls <site-path>/web/app/themes/*/style.css
```

For the detected theme:
1. Read the theme's `composer.json` — look for `roots/acorn` to identify Sage version
2. Check for `acf-json/` directory in the theme
3. Count PHP files: `find <theme-path>/app -name "*.php" | wc -l`
4. Count Blade files: `find <theme-path>/resources -name "*.blade.php" | wc -l`
5. Read the root `composer.json` for current PHP requirement

Set variables:
- `THEME_PATH` = detected theme directory
- `HAS_COMPOSER` = `true`
- `BUILD_TOOL` = detect from theme's `package.json` (`bud` or `mix` or `vite`)

Print site summary:
```
## Site Detected

**Type:** Bedrock/Sage
**Path:** <site-path>
**Theme:** <theme-name> (Sage <version>)
**Acorn:** <acorn-version>
**ACF JSON:** <found/not found>
**PHP files:** <count>
**Blade files:** <count>
**Current PHP requirement:** <version>
```

### If `SITE_TYPE=classic`

The theme IS the site path:
- `THEME_PATH` = `SITE_PATH` (same directory)

Read `style.css` to extract theme name:
```bash
grep "Theme Name:" <site-path>/style.css
```

Detect optional features:
1. Check for `acf-json/` directory
2. Check for `composer.json` → `HAS_COMPOSER` = `true` or `false`
3. Count PHP files (excluding `node_modules/` and `vendor/`):
   ```bash
   find <site-path> -name "*.php" -not -path "*/node_modules/*" -not -path "*/vendor/*" | wc -l
   ```
4. Detect build tool:
   - If `gulpfile.js` exists → `BUILD_TOOL=gulp`
   - Else if `package.json` exists with a `build` script → `BUILD_TOOL=npm`
   - Else → `BUILD_TOOL=none`
5. Auto-discover PHP directories (excluding `node_modules/`, `vendor/`):
   ```bash
   find <site-path> -name "*.php" -not -path "*/node_modules/*" -not -path "*/vendor/*" -exec dirname {} \; | sort -u
   ```

Print site summary:
```
## Site Detected

**Type:** Classic WordPress Theme
**Path:** <site-path>
**Theme:** <theme-name>
**ACF JSON:** <found/not found>
**Composer:** <found/not found>
**PHP files:** <count>
**Build tool:** <gulp/npm/none>
**PHP directories:** <list of discovered directories>
```

## Step 3: Create Git Safety Branch

Check git state:
```bash
git -C <site-path> status --porcelain
```

If dirty:
- Print: "Warning: Working tree has uncommitted changes."
- Ask user if they want to continue (changes will be included in the migration branch)

Create the migration branch:
```bash
git -C <site-path> checkout -b php84-fix-$(date +%Y%m%d)
```

Print: "Created branch `php84-fix-<date>`. Your original code is safe on the previous branch."

## Step 4: Scan (1 agent)

Spawn a scanner agent via the Task tool:

```yaml
subagent_type: general-purpose
description: "Scan codebase for PHP 8.4 issues"
prompt: |
  You are a PHP 8.4 migration scanner. Your job is to scan a WordPress codebase
  and produce a structured report of all PHP compatibility issues.

  ## Site Configuration
  - SITE_PATH: <site-path>
  - THEME_PATH: <theme-path>
  - SITE_TYPE: <bedrock|classic>
  - HAS_COMPOSER: <true|false>

  ## Instructions

  1. Read the breaking changes reference:
     `bedrock-sage-migrator/skills/bedrock-sage-conversion/references/breaking-changes.md`

  2. Glob for all PHP files:

     **If SITE_TYPE=bedrock:**
     - $SITE_PATH/web/app/themes/*/app/**/*.php
     - $SITE_PATH/web/app/themes/*/resources/**/*.blade.php
     - $SITE_PATH/web/app/themes/*/resources/posttypes/*.php
     - $SITE_PATH/web/app/themes/*/functions.php
     - $SITE_PATH/web/app/mu-plugins/**/*.php
     - $SITE_PATH/config/*.php

     **If SITE_TYPE=classic:**
     - $THEME_PATH/*.php (root-level templates)
     - $THEME_PATH/includes/**/*.php
     - $THEME_PATH/flexible-content/**/*.php
     - $THEME_PATH/flexible-post-content/**/*.php
     - $THEME_PATH/partials/**/*.php (if directory exists)
     - $THEME_PATH/template-parts/**/*.php (if directory exists)
     - $THEME_PATH/templates/**/*.php (if directory exists)
     - Auto-discover additional PHP directories

  3. Grep each detection pattern from breaking-changes.md across the codebase.

  4. If HAS_COMPOSER=true: Read composer.json for dependency versions.
     If HAS_COMPOSER=false: Skip dependency analysis.

  5. Look for acf-json/ directory and read field group definitions.

  6. Write a structured report:
     - $SITE_PATH/docs/php84-fix-report.json
     - $SITE_PATH/docs/php84-fix-report.md

  ## Report JSON structure

  {
    "scan_date": "<ISO timestamp>",
    "site_path": "<SITE_PATH>",
    "site_type": "<bedrock|classic>",
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
    "dependencies": { ... },
    "acf_fields": { ... },
    "summary": { "critical": 0, "high": 0, "medium": 0, "low": 0, "total": 0 }
  }
```

Wait for the scanner to complete. Print the scan summary.

## Step 5: Plan (1 agent)

Spawn a planner agent via the Task tool:

```yaml
subagent_type: general-purpose
description: "Plan PHP 8.4 fix tasks"
prompt: |
  You are a PHP 8.4 migration planner. Read the scan report and create an ordered task list.

  ## Site Configuration
  - SITE_PATH: <site-path>
  - THEME_PATH: <theme-path>
  - SITE_TYPE: <bedrock|classic>
  - HAS_COMPOSER: <true|false>

  ## Instructions

  1. Read the scan report: $SITE_PATH/docs/php84-fix-report.json

  2. Read the relevant reference files:
     - bedrock-sage-migrator/skills/bedrock-sage-conversion/references/acf-patterns.md
     - bedrock-sage-migrator/skills/bedrock-sage-conversion/references/dependency-matrix.md
     - If SITE_TYPE=classic: bedrock-sage-migrator/skills/bedrock-sage-conversion/references/classic-theme-analysis.md
     - If SITE_TYPE=bedrock: bedrock-sage-migrator/skills/bedrock-sage-conversion/references/breaking-changes.md

  3. Create tasks via TaskCreate, ordered by site type:

     **If SITE_TYPE=bedrock:**
     1. Dependency upgrades (root + theme composer.json) — must run first
     2. PHP code fixes — batched by file group
     3. Blade template fixes

     **If SITE_TYPE=classic:**
     1. Dependency upgrades (only if HAS_COMPOSER=true)
     2. PHP code fixes — batched by file group

  4. Each task description MUST include:
     - Specific file paths to modify
     - The exact fix patterns to apply
     - ACF field type context from the scan

  5. Set task dependencies via addBlockedBy where needed.
```

Wait for the planner to complete. Print the plan summary.

## Step 6: Fix (agent team)

Create an agent team for parallel fixing.

### Step 6a: Create the team

```yaml
TeamCreate:
  team_name: "php84-fix-<date>"
  description: "PHP 8.4 fixers for <site-path>"
```

### Step 6b: Dependency Upgrade (conditional, sequential)

**If `HAS_COMPOSER=true`:**

Spawn one teammate for the dependency upgrade task:

```yaml
Task:
  team_name: "php84-fix-<date>"
  name: "dep-upgrader"
  subagent_type: general-purpose
  description: "Upgrade composer dependencies for PHP 8.4"
  prompt: |
    You are a PHP 8.4 dependency upgrade specialist on an agent team.

    ## Site Configuration
    - SITE_PATH: <site-path>
    - THEME_PATH: <theme-path>
    - SITE_TYPE: <bedrock|classic>

    ## Workflow
    1. Check TaskList for the dependency upgrade task
    2. Claim it via TaskUpdate (set owner, status to in_progress)
    3. Read bedrock-sage-migrator/skills/bedrock-sage-conversion/references/dependency-matrix.md
    4. Update composer.json PHP requirement to ">=8.2"
    5. Set config.platform.php to "8.4"
    6. Upgrade packages per the dependency matrix
    7. Run `composer update`
    8. Mark task as completed
```

Wait for completion.

**If `HAS_COMPOSER=false`:** Skip.

### Step 6c: PHP Code Fixes (parallel teammates)

Spawn up to 5 fixer teammates:

```yaml
Task (spawn up to 5 in parallel):
  team_name: "php84-fix-<date>"
  name: "fixer-1" through "fixer-5"
  subagent_type: general-purpose
  description: "Fix PHP 8.4 issues"
  prompt: |
    You are a PHP 8.4 code fixer on an agent team.

    ## Site Configuration
    - SITE_PATH: <site-path>
    - THEME_PATH: <theme-path>
    - SITE_TYPE: <bedrock|classic>

    ## Workflow
    1. Check TaskList for pending, unblocked, unowned tasks
    2. Claim one via TaskUpdate
    3. Read task details from TaskGet
    4. Read bedrock-sage-migrator/skills/bedrock-sage-conversion/SKILL.md
    5. For each file in your task:
       - Read BEFORE editing
       - Apply ONLY documented fix patterns
       - Use ACF field type context for type-aware defaults
       - Preserve all existing functionality
    6. Run `php -l <file>` after each edit
    7. Mark task as completed
    8. Check TaskList again — claim next unblocked task if available
    9. Repeat until no more tasks, then stop

    IMPORTANT: Do NOT edit files belonging to another teammate's task.
```

Wait for all fixers to finish.

### Step 6d: Shutdown team

Send shutdown requests to all teammates. Wait for confirmations. `TeamDelete`.

Print fix summary.

## Step 7: Verify (1 agent)

Spawn a verifier agent:

```yaml
subagent_type: general-purpose
description: "Verify PHP 8.4 fix results"
prompt: |
  You are a PHP 8.4 migration verifier.

  ## Site Configuration
  - SITE_PATH: <site-path>
  - THEME_PATH: <theme-path>
  - SITE_TYPE: <bedrock|classic>
  - HAS_COMPOSER: <true|false>
  - BUILD_TOOL: <bud|mix|vite|gulp|npm|none>

  ## Verification Steps

  1. **PHP lint** — Run php -l on ALL PHP files:
     find $SITE_PATH -name "*.php" -not -path "*/node_modules/*" -not -path "*/vendor/*" -exec php -l {} \; 2>&1 | grep -v "No syntax errors"

  2. **Pattern re-scan** — Re-grep for remaining breaking patterns.

  3. **Dependency check** (conditional):
     - If HAS_COMPOSER=true: Run `composer install`, verify no errors
     - If HAS_COMPOSER=false: Skip

  4. **Frontend build** (conditional):
     - If BUILD_TOOL=vite: `npm install && npm run build`
     - If BUILD_TOOL=bud: `npm install && npm run build`
     - If BUILD_TOOL=mix: `npm install && npm run production`
     - If BUILD_TOOL=gulp: `npx gulp` or `npx gulp build`
     - If BUILD_TOOL=npm: `npm install && npm run build`
     - If BUILD_TOOL=none: Skip

  ## Report
  Print: lint results, remaining patterns, composer status, build status, manual attention items.
```

Wait for completion. Print verification results.

## Step 8: Report

Print final summary:

```
## PHP 8.4 Fix Complete

### Summary
- Site type: <bedrock|classic>
- Files scanned: X PHP, Y Blade
- Issues found: X (critical: N, high: N, medium: N, low: N)
- Issues fixed: X
- Remaining issues: X (manual attention needed)

### Phase Results
- Scan: Complete (see docs/php84-fix-report.md)
- Plan: X tasks created
- Fix: X files modified
- Verify: <results>

### Remaining Issues
(List any issues the verifier found)

### What's Next
1. **Review changes:** `git diff <original-branch>`
2. **Check the full scan report:** `docs/php84-fix-report.md`
3. **Test locally:** Switch PHP to 8.4 and verify the site works
4. **Merge when ready:** `git checkout <original-branch> && git merge php84-fix-<date>`
```
