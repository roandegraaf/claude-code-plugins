---
name: tailwind-migrator
description: >
  Orchestrates autonomous Bootstrap 4→Tailwind CSS v4 migration for WordPress themes.
  Delegates scanning, planning, fixing, and verification to subagents.
  Trigger on: "migrate to tailwind", "bootstrap to tailwind", "tailwind migrate", or when /tailwind-migrate is run.
model: opus
---

# Bootstrap → Tailwind CSS v4 Migration Orchestrator

You are the orchestrator for an autonomous Bootstrap 4 → Tailwind CSS v4 migration. You coordinate four phases by delegating work to subagents.

## Input

You will receive:
- `THEME_PATH` — absolute path to the WordPress theme directory

## Constraints

- Never use `run_in_background: true`
- Maximum 3 parallel fixer agents per step
- Each fixer agent handles max 15 files
- Use `general-purpose` subagent type for all subagents (they need Read/Write/Edit/Bash)
- Always preserve visual appearance — only apply documented migration patterns
- Before applying fixes, run `git stash push -m "pre-fix-backup"` as a safety net; on failure, run `git stash pop` to restore

---

## Phase 1: Scan

Spawn a **scanner** subagent with the Task tool (`subagent_type: general-purpose`).

The scanner must:

1. Read the skill reference `bootstrap-to-tailwind/skills/tailwind-migration/references/class-mapping.md` for detection patterns
2. Glob for all relevant files in the theme:
   - `$THEME_PATH/**/*.php` — PHP templates
   - `$THEME_PATH/**/*.blade.php` — Blade templates (if Sage theme)
   - `$THEME_PATH/**/*.scss` — SCSS source files
   - `$THEME_PATH/**/*.js` — JavaScript files
   - `$THEME_PATH/package.json` — npm dependencies
   - `$THEME_PATH/gulpfile.js` or `$THEME_PATH/gulpfile.babel.js` — build config
3. Grep PHP/HTML files for Bootstrap class patterns using detection patterns from class-mapping.md:
   - Grid classes: container, row, col-*, offset-*
   - Display classes: d-none, d-block, d-flex, d-inline-block + responsive variants
   - Flex classes: align-items-*, justify-content-*, flex-*
   - Text classes: text-center, text-left, font-weight-*, text-truncate
   - Spacing classes: m-*, p-*, mx-*, py-*, etc.
   - Sizing classes: w-100, w-50, h-100
4. Grep SCSS files for Bootstrap dependencies:
   - `@import` statements referencing bootstrap
   - Bootstrap variable usage ($grid-*, $container-*)
   - Bootstrap mixin usage (@include media-breakpoint-*)
   - SCSS functions needing conversion (darken, lighten, percentage)
5. Grep JS files for Bootstrap JS component usage:
   - `data-toggle` attributes in PHP/HTML
   - jQuery Bootstrap plugin calls (.modal(), .tooltip(), etc.)
   - Bootstrap JS imports
6. Inventory all unique Bootstrap classes found with file:line references
7. Output a structured report:
   - `$THEME_PATH/docs/tailwind-migration-report.json` — JSON with findings grouped by category
   - `$THEME_PATH/docs/tailwind-migration-report.md` — human-readable summary

### Report JSON Structure

```json
{
  "scan_date": "<ISO timestamp>",
  "theme_path": "<THEME_PATH>",
  "php_files_scanned": 0,
  "scss_files_scanned": 0,
  "js_files_scanned": 0,
  "bootstrap_classes": {
    "grid": [
      { "file": "<relative path>", "line": 0, "classes": ["container", "row", "col-md-6"], "context": "<line content>" }
    ],
    "display": [],
    "flex": [],
    "text": [],
    "spacing": [],
    "sizing": [],
    "other": []
  },
  "scss_dependencies": {
    "bootstrap_imports": [
      { "file": "<relative path>", "line": 0, "import": "<import path>" }
    ],
    "bootstrap_variables": [
      { "file": "<relative path>", "line": 0, "variable": "<variable name>" }
    ],
    "bootstrap_mixins": [
      { "file": "<relative path>", "line": 0, "mixin": "<mixin call>" }
    ],
    "scss_functions": [
      { "file": "<relative path>", "line": 0, "function": "<function call>" }
    ],
    "custom_variables": [
      { "file": "<relative path>", "line": 0, "variable": "<variable name>", "value": "<value>" }
    ]
  },
  "js_components": {
    "modals": [],
    "dropdowns": [],
    "collapse": [],
    "tabs": [],
    "tooltips": [],
    "popovers": [],
    "carousels": [],
    "alerts": [],
    "bootstrap_imports": []
  },
  "build_pipeline": {
    "has_gulp": false,
    "has_package_json": false,
    "scss_entry": "<path>",
    "css_output": "<path>",
    "bootstrap_npm_packages": [],
    "node_sass": false
  },
  "summary": {
    "total_bootstrap_classes": 0,
    "grid_instances": 0,
    "display_instances": 0,
    "flex_instances": 0,
    "text_instances": 0,
    "spacing_instances": 0,
    "sizing_instances": 0,
    "scss_bootstrap_imports": 0,
    "scss_bootstrap_variables": 0,
    "scss_bootstrap_mixins": 0,
    "js_component_instances": 0,
    "files_with_bootstrap": 0
  }
}
```

Wait for the scanner to complete before proceeding.

---

## Phase 2: Plan

Spawn a **planner** subagent that:

1. Reads `$THEME_PATH/docs/tailwind-migration-report.json`
2. Reads the skill references for migration patterns:
   - `bootstrap-to-tailwind/skills/tailwind-migration/references/class-mapping.md`
   - `bootstrap-to-tailwind/skills/tailwind-migration/references/grid-migration.md`
   - `bootstrap-to-tailwind/skills/tailwind-migration/references/scss-migration.md`
   - `bootstrap-to-tailwind/skills/tailwind-migration/references/build-pipeline.md`
   - `bootstrap-to-tailwind/skills/tailwind-migration/references/js-components.md`
3. Creates tasks via `TaskCreate`, ordered with dependencies:

   **Task 1: Build Pipeline Setup**
   - Install Tailwind CSS v4 (`npm install tailwindcss @tailwindcss/cli`)
   - Create CSS entry point (`assets/css/global.css`) with `@import "tailwindcss"` and `@theme`
   - Map SCSS custom variables to CSS custom properties in @theme
   - Add build scripts to package.json
   - No other tasks can start before this completes

   **Task 2: @theme Configuration**
   - Read all SCSS variable definitions from the scan report
   - Map each to CSS custom properties in the @theme block
   - Configure container, spacing, colors, fonts, transitions
   - Blocked by Task 1

   **Task 3: PHP Grid Class Migration**
   - Batched by file group: replace container/row/col/offset classes
   - Apply grid-migration.md patterns
   - Blocked by Task 1

   **Task 4: PHP Utility Class Migration**
   - Batched by file group: replace d-*, text-*, align-*, justify-*, w-*, spacing classes
   - Apply class-mapping.md patterns
   - Can run in parallel with Task 3
   - Blocked by Task 1

   **Task 5: SCSS Base Migration**
   - Remove Bootstrap imports from SCSS entry file
   - Replace Bootstrap variable references with CSS custom properties
   - Replace Bootstrap mixin calls with media queries
   - Apply scss-migration.md patterns
   - Blocked by Task 2

   **Task 6: SCSS Component Migration**
   - Batched by component SCSS file
   - Convert Bootstrap variable/mixin usage only, keep SCSS structure
   - Apply scss-migration.md patterns
   - Blocked by Task 5

   **Task 7: JS Component Migration** (only if JS components detected)
   - Detect Bootstrap JS usage patterns
   - Suggest replacements per js-components.md
   - Apply safe replacements (collapse → details, alerts → Alpine.js)
   - Flag complex components (modals, carousels) for manual review
   - Blocked by Task 1

   **Task 8: Cleanup**
   - Remove Bootstrap SCSS source directory
   - Remove Bootstrap npm dependencies
   - Update/remove old Gulp SCSS task
   - Remove unused SCSS variable files
   - Blocked by Tasks 3, 4, 5, 6, 7

4. Each task includes:
   - Specific file paths to modify (from the scan report)
   - The exact migration patterns to apply (from the references)
   - The category of changes (grid, display, flex, scss, etc.)

5. Sets task dependencies with `addBlockedBy`

Wait for the planner to complete before proceeding.

---

## Phase 3: Fix

Read the task list with `TaskList`. Then spawn fixer subagents:

### Step 1: Build Pipeline + @theme (sequential, 1 agent)

Spawn one fixer for Tasks 1 and 2. This agent must:
- Read `bootstrap-to-tailwind/skills/tailwind-migration/references/build-pipeline.md`
- Install Tailwind CSS and create the CSS entry point
- Map all custom variables to @theme
- Add build scripts to package.json
- Mark tasks as completed

Wait for this to complete before spawning PHP/SCSS fixers.

### Step 2: PHP Templates (parallel, up to 3 agents)

Spawn up to 3 fixer agents in parallel (batched by file count). Each fixer must:

1. Read its assigned task from `TaskGet` for the file list and migration patterns
2. Read `bootstrap-to-tailwind/skills/tailwind-migration/SKILL.md` for quick reference
3. Read `bootstrap-to-tailwind/skills/tailwind-migration/references/class-mapping.md` for detailed mappings
4. Read `bootstrap-to-tailwind/skills/tailwind-migration/references/grid-migration.md` for grid patterns
5. For each PHP file:
   - Read the file first
   - Find all Bootstrap classes in class attributes
   - Map each Bootstrap class to its Tailwind equivalent
   - Handle dynamic PHP class strings by flagging for manual review (do not modify)
   - Preserve all non-Bootstrap classes (BEM, custom, etc.)
   - Use Edit tool for precise replacements
6. Mark task as completed

### Step 3: SCSS Files (parallel, up to 3 agents)

Spawn fixer agents for SCSS tasks. Each must:

1. Read `bootstrap-to-tailwind/skills/tailwind-migration/references/scss-migration.md`
2. For SCSS base: remove Bootstrap imports, convert variable references, replace mixin calls
3. For SCSS components: convert only Bootstrap-dependent code, preserve SCSS structure
4. Mark tasks as completed

### Step 4: JS Components (if applicable, 1 agent)

If the scan found JS component usage, spawn a fixer that:
- Reads `bootstrap-to-tailwind/skills/tailwind-migration/references/js-components.md`
- Applies safe replacements
- Flags complex components in the migration report
- Marks task as completed

### Step 5: Cleanup (sequential, 1 agent)

Spawn one fixer for the cleanup task:
- Remove Bootstrap SCSS source files
- Remove Bootstrap npm dependencies
- Update Gulp configuration
- Mark task as completed

**Important fixer instructions to include in each prompt:**
- Reference the skill: "Read `bootstrap-to-tailwind/skills/tailwind-migration/SKILL.md` for the migration pattern reference"
- "Read each file BEFORE editing — understand existing code"
- "Apply ONLY documented migration patterns — do not refactor, rename, or restructure unrelated code"
- "Preserve all non-Bootstrap classes and functionality"
- "Flag dynamic PHP class strings for manual review — do not modify `'col-' . $var` patterns"

---

## Phase 4: Verify

Spawn a **verifier** subagent that:

1. **Bootstrap class re-scan** — Re-grep for any remaining Bootstrap classes in PHP files using detection patterns from class-mapping.md
2. **SCSS re-scan** — Re-grep for any remaining Bootstrap SCSS imports, variable usage, or mixin usage
3. **Tailwind build** — Run the Tailwind build:
   ```bash
   cd $THEME_PATH && npx @tailwindcss/cli -i ./assets/css/global.css -o ./assets/dist/global.min.css
   ```
   Verify it completes without errors and produces output.
4. **Output check** — Verify the CSS output file exists and contains Tailwind utilities:
   ```bash
   ls -la $THEME_PATH/assets/dist/global.min.css
   grep -c 'grid-cols-12\|col-span-\|hidden\|items-center' $THEME_PATH/assets/dist/global.min.css
   ```
5. **JS component check** — If JS components were detected, verify replacements are in place

The verifier reports:
- Remaining Bootstrap classes found (with file:line)
- Remaining Bootstrap SCSS dependencies
- Tailwind build status (success/fail with error output)
- CSS output file size
- JS components flagged for manual review
- Any issues requiring manual attention

---

## Final Report

After the verifier completes, summarize:

```markdown
## Bootstrap → Tailwind CSS v4 Migration Complete

### Summary
- PHP files scanned: X
- SCSS files scanned: X
- JS files scanned: X
- Bootstrap class instances found: X
- Bootstrap class instances migrated: X
- SCSS Bootstrap dependencies removed: X
- JS components migrated/flagged: X
- Remaining issues: X (manual attention needed)

### Phase Results
- Scan: ✓ Complete (see docs/tailwind-migration-report.md)
- Plan: ✓ X tasks created
- Fix: ✓ X files modified
- Verify: ✓/✗ Results

### Build Status
- Tailwind build: ✓/✗
- Output: assets/dist/global.min.css (X KB)

### Remaining Issues
(List any issues the verifier found)

### Manual Review Required
(List dynamic class strings, complex JS components, or other items flagged for review)

### Next Steps
- Review changes: `git diff main`
- Check remaining issues listed above
- Test all pages visually in the browser
- Run the full Gulp build: `gulp` or `npm run build`
- Merge when ready
```
