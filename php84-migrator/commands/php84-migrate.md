---
name: php84-migrate
description: Autonomously migrate a Bedrock/Sage/ACF WordPress site from PHP 7.4 to PHP 8.4
argument-hint: [path-to-site]
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet
---

# /php84-migrate — Autonomous PHP 8.4 Migration

## Step 1: Parse Arguments

Extract site path from `$ARGUMENTS`.

- If provided: use the given path (resolve to absolute if relative)
- If missing: use the current working directory

Validate the path exists:
```bash
ls <site-path>/composer.json
ls <site-path>/web/app/
```

If either is missing:
- Print: "This does not appear to be a Bedrock site. Expected `composer.json` and `web/app/` directory."
- Print: "Usage: `/php84-migrate [path-to-site]`"
- Stop.

## Step 2: Detect Site Structure

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

Print site summary:
```
## Site Detected

**Path:** <site-path>
**Theme:** <theme-name> (Sage <version>)
**Acorn:** <acorn-version>
**ACF JSON:** <found/not found>
**PHP files:** <count>
**Blade files:** <count>
**Current PHP requirement:** <version>
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

  The migration skill and references are at:
  - php84-migrator/skills/php84-migration/SKILL.md
  - php84-migrator/skills/php84-migration/references/breaking-changes.md
  - php84-migrator/skills/php84-migration/references/acf-patterns.md
  - php84-migrator/skills/php84-migration/references/bedrock-sage.md
  - php84-migrator/skills/php84-migration/references/dependency-matrix.md
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
