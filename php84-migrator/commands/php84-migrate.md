---
name: php84-migrate
description: Autonomously migrate a WordPress site from PHP 7.4 to PHP 8.4 (supports Bedrock/Sage and classic themes)
argument-hint: [path-to-site]
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet
---

# /php84-migrate — Autonomous PHP 8.4 Migration

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
- Print: "Usage: `/php84-migrate [path-to-site]`"
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
- `BUILD_TOOL` = `bud` (Sage 10) or `mix` (Sage 9) — detect from theme's `package.json`

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
git -C <site-path> checkout -b php84-migration-$(date +%Y%m%d)
```

Print: "Created migration branch `php84-migration-<date>`. Your original code is safe on the previous branch."

## Step 4: Run the Orchestrator

Invoke the `php84-migrator` agent via the Task tool:

```yaml
subagent_type: general-purpose
description: "Orchestrate PHP 8.4 migration"
prompt: |
  You are the PHP 8.4 migration orchestrator. Follow the instructions in
  `php84-migrator/agents/php84-migrator.md` exactly.

  Read that file first, then execute all four phases.

  Site configuration:
  - SITE_PATH: <site-path>
  - THEME_PATH: <theme-path>
  - SITE_TYPE: <bedrock|classic>
  - HAS_COMPOSER: <true|false>
  - BUILD_TOOL: <bud|mix|gulp|npm|none>

  The migration skill and references are at:
  - php84-migrator/skills/php84-migration/SKILL.md
  - php84-migrator/skills/php84-migration/references/breaking-changes.md
  - php84-migrator/skills/php84-migration/references/acf-patterns.md
  - php84-migrator/skills/php84-migration/references/dependency-matrix.md
  - php84-migrator/skills/php84-migration/references/bedrock-sage.md (if SITE_TYPE=bedrock)
  - php84-migrator/skills/php84-migration/references/classic-theme.md (if SITE_TYPE=classic)
```

Wait for the orchestrator to complete.

## Step 5: Report

When the orchestrator completes, print the final summary:

```
## Migration Complete

The PHP 8.4 migration has finished. Here's what happened:

<orchestrator's final report>

### What's Next

1. **Review changes:** `git diff main` (or your original branch)
2. **Check the full scan report:** `docs/php84-migration-report.md`
3. **Test locally:** Switch PHP to 8.4 via Herd and verify the site works
4. **Merge when ready:** `git checkout main && git merge php84-migration-<date>`
```

If the orchestrator reported remaining issues, highlight them prominently.
