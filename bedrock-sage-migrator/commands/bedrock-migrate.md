---
name: bedrock-migrate
description: Convert a classic WordPress theme to Bedrock/Sage 11 with full PHP 8.4 migration
argument-hint: [path-to-classic-theme]
disable-model-invocation: true
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet, TeamCreate, TeamDelete, SendMessage, Skill
---

# /bedrock-migrate — Classic Theme → Bedrock/Sage 11 Conversion

Converts a classic WordPress theme into a modern Bedrock/Sage 11 project with:
- Bedrock project scaffolding (Composer-managed WordPress)
- Sage 11 theme with Acorn 5, Blade templates, Vite build pipeline
- PHP templates converted to Blade views
- functions.php decomposed into providers, composers, filters
- Assets ported from Gulp/Webpack to Vite
- PHP 8.4 compatibility fixes applied throughout

## Step 1: Parse & Detect

Extract path from `$ARGUMENTS`.

- If provided: use the given path (resolve to absolute if relative)
- If missing: use the current working directory

### Validate Classic WordPress Theme

```bash
grep -l "Theme Name:" <site-path>/style.css
```

If no `style.css` with `Theme Name:` header: print error and stop.

### Check if Already Bedrock

```bash
ls <site-path>/composer.json && ls <site-path>/web/app/ 2>/dev/null
```

If this looks like a Bedrock site:
- Print: "This appears to already be a Bedrock site. Use `/php84-fix` instead for PHP 8.4 fixes."
- Stop.

### Set Variables

Read `style.css` to extract theme name:
```bash
grep "Theme Name:" <site-path>/style.css
```

Detect features:
1. `SITE_PATH` = the given path
2. `THEME_NAME` = extracted from style.css (slugified for directory names)
3. `HAS_COMPOSER` = check for `composer.json`
4. `BUILD_TOOL`:
   - `gulpfile.js` exists → `gulp`
   - `package.json` with `build` script → `npm`
   - else → `none`
5. `HAS_ACF` = check for `acf-json/` directory
6. Auto-discover PHP directories (excluding `node_modules/`, `vendor/`):
   ```bash
   find <site-path> -name "*.php" -not -path "*/node_modules/*" -not -path "*/vendor/*" -exec dirname {} \; | sort -u
   ```
7. Count PHP files

Print site summary:
```
## Classic Theme Detected

**Path:** <site-path>
**Theme:** <theme-name>
**ACF JSON:** <found/not found>
**Composer:** <found/not found>
**PHP files:** <count>
**Build tool:** <gulp/npm/none>
**PHP directories:** <list>
```

## Step 2: Git Safety Branch

Check git state:
```bash
git -C <site-path> status --porcelain
```

If dirty:
- Print: "Warning: Working tree has uncommitted changes."
- Ask user if they want to continue

Create the migration branch:
```bash
git -C <site-path> checkout -b bedrock-migration-$(date +%Y%m%d)
```

Print: "Created branch `bedrock-migration-<date>`. Your original code is safe on the previous branch."

## Step 3: Scan & Analyze (1 Task agent, sequential)

Spawn a scanner agent via the Task tool. **Wait for completion before proceeding.**

```yaml
subagent_type: general-purpose
description: "Scan classic theme for conversion"
prompt: |
  You are a classic WordPress theme analyzer. Scan the theme and produce a structured
  report for conversion to Bedrock/Sage 11.

  ## Site Configuration
  - SITE_PATH: <site-path>
  - THEME_NAME: <theme-name>
  - HAS_ACF: <true|false>

  ## Instructions

  1. Read the analysis reference:
     `bedrock-sage-migrator/skills/bedrock-sage-conversion/references/classic-theme-analysis.md`

  2. Read the breaking changes reference:
     `bedrock-sage-migrator/skills/bedrock-sage-conversion/references/breaking-changes.md`

  3. Build a complete inventory of the theme:

     a. **Templates**: Glob all *.php at root level. Categorize each by WordPress template hierarchy role.

     b. **Flexible content**: Glob flexible-content/**/*.php and flexible-post-content/**/*.php

     c. **Includes**: Glob includes/**/*.php. For each file, detect:
        - register_post_type calls → custom post types
        - register_taxonomy calls → taxonomies
        - wp_ajax_ hooks → AJAX handlers
        - function definitions → helpers
        - Widget classes

     d. **functions.php**: Read and categorize every hook, include, and function:
        - add_theme_support calls → menus, sidebars, theme supports
        - wp_enqueue_style/script calls → enqueued assets
        - acf_add_options_page calls → ACF options pages
        - register_post_type calls → CPTs (if inline)
        - add_filter/add_action calls → filters and actions
        - require/include statements → included files

     e. **ACF fields**: If HAS_ACF=true, read all acf-json/*.json files.
        Build a map of field_name → field_type for type-aware conversion.

     f. **Assets**: Inventory the build pipeline:
        - SCSS files and entry point
        - JS files and entry point
        - Images, fonts, SVG sprites
        - package.json dependencies

     g. **PHP 8.4 issues**: Grep detection patterns from breaking-changes.md

  4. Create the report directory and write:
     - $SITE_PATH/docs/bedrock-migration-report.json

  ## Report JSON Structure

  {
    "theme_name": "...",
    "structure": {
      "templates": ["header.php", "footer.php", "single.php", ...],
      "flexible_content": ["hero.php", "cta.php", ...],
      "flexible_post_content": [...],
      "includes": ["post-types.php", "helpers.php", ...],
      "partials": [...],
      "page_templates": [{"file": "templates/full-width.php", "name": "Full Width"}]
    },
    "functions_php": {
      "menus": [{"location": "primary", "label": "Primary Menu"}],
      "widgets": [{"id": "sidebar-primary", "name": "Primary Sidebar"}],
      "theme_supports": ["title-tag", "post-thumbnails", ...],
      "enqueued_styles": [{"handle": "...", "src": "..."}],
      "enqueued_scripts": [{"handle": "...", "src": "...", "localize": {...}}],
      "acf_options_pages": [{"slug": "theme-settings", "title": "Theme Settings"}],
      "custom_post_types": [{"slug": "project", "label": "Projects"}],
      "custom_taxonomies": [{"slug": "project_category", "post_type": "project"}],
      "ajax_handlers": [{"action": "load_more", "callback": "handle_load_more"}],
      "image_sizes": [{"name": "hero", "width": 1920, "height": 800}],
      "filters": [{"hook": "body_class", "description": "..."}],
      "actions": [{"hook": "init", "description": "..."}],
      "includes": ["includes/post-types.php", "includes/helpers.php"]
    },
    "acf_fields": {
      "<field_name>": "<field_type>"
    },
    "assets": {
      "scss_files": [...],
      "scss_entry": "assets/scss/app.scss",
      "js_files": [...],
      "js_entry": "assets/js/app.js",
      "images": [...],
      "fonts": [...],
      "svg_sprites": [...]
    },
    "php84_issues": [
      {
        "file": "...",
        "line": 0,
        "pattern": "...",
        "severity": "critical|high|medium|low",
        "description": "...",
        "fix_hint": "..."
      }
    ],
    "build_tool": "gulp|npm|none",
    "npm_dependencies": { "bootstrap": "^5.3", ... }
  }
```

Print scan summary: template count, PHP file count, ACF fields found, PHP 8.4 issues found.

## Step 4: Scaffold Bedrock (1 Task agent, sequential)

Spawn a scaffold agent. **Wait for completion before proceeding.**

```yaml
subagent_type: general-purpose
description: "Scaffold Bedrock project"
prompt: |
  You are a Bedrock scaffolding specialist. Create a new Bedrock project for the
  classic theme conversion.

  ## Configuration
  - SITE_PATH: <site-path>
  - THEME_NAME: <theme-name>
  - BEDROCK_PATH: <site-path>-bedrock

  ## Instructions

  1. Read the scaffold reference:
     `bedrock-sage-migrator/skills/bedrock-sage-conversion/references/bedrock-scaffold.md`

  2. Create the Bedrock project:
     ```bash
     composer create-project roots/bedrock <BEDROCK_PATH>
     ```

  3. Configure `.env`:
     - Copy `.env.example` to `.env`
     - Set placeholder database values
     - Set `WP_ENV=development`
     - Set `WP_HOME` to a placeholder URL

  4. Configure `composer.json`:
     - Set PHP requirement to `>=8.2`
     - Set `config.platform.php` to `8.4`

  5. Install ACF Pro:
     - If the classic theme has `acf-json/`, ACF is in use
     - Add ACF Pro to Bedrock's `composer.json` via Roots pivot repository
     - OR copy the ACF Pro plugin directory to `web/app/plugins/`

  6. Identify other plugins the classic theme depends on:
     - Check for plugin-specific function calls in the codebase
     - Install via wpackagist where possible

  7. Copy uploads if they exist:
     ```bash
     cp -r <SITE_PATH>/uploads <BEDROCK_PATH>/web/app/uploads/ 2>/dev/null || true
     ```

  8. Print the BEDROCK_PATH for subsequent phases.
```

Set `BEDROCK_PATH` from the agent's output.

## Step 5: Scaffold Sage 11 (1 Task agent, sequential)

Spawn a Sage scaffold agent. **Wait for completion before proceeding.**

```yaml
subagent_type: general-purpose
description: "Scaffold Sage 11 theme"
prompt: |
  You are a Sage 11 scaffolding specialist. Create a Sage 11 theme inside the
  Bedrock project.

  ## Configuration
  - BEDROCK_PATH: <bedrock-path>
  - THEME_NAME: <theme-name>
  - SAGE_THEME_PATH: <BEDROCK_PATH>/web/app/themes/<theme-name>
  - HAS_ACF: <true|false>
  - ORIGINAL_SITE_PATH: <site-path>

  ## Instructions

  1. Read the structure reference:
     `bedrock-sage-migrator/skills/bedrock-sage-conversion/references/sage11-structure.md`

  2. Read the Vite reference:
     `bedrock-sage-migrator/skills/bedrock-sage-conversion/references/sage11-vite.md`

  3. Create the Sage 11 theme:
     ```bash
     cd <BEDROCK_PATH>/web/app/themes/
     composer create-project roots/sage <theme-name>
     cd <theme-name>
     npm install
     ```

  4. Configure `vite.config.js`:
     - Set `base` to `/app/themes/<theme-name>/public/build/`
     - Configure entry points for SCSS (not CSS, since we're porting SCSS):
       `resources/css/app.scss`, `resources/js/app.js`
     - Add editor entry points if needed
     - Disable Tailwind in wordpressThemeJson (Bootstrap will be used initially)

  5. Install SCSS support:
     ```bash
     npm install -D sass
     ```

  6. Configure `ThemeServiceProvider`:
     - Ensure it extends `Roots\Acorn\Sage\SageServiceProvider`
     - Calls `parent::register()` and `parent::boot()`

  7. Create directories for converted code:
     ```bash
     mkdir -p app/PostTypes app/Taxonomies app/Ajax app/Walkers app/Widgets
     ```

  8. Copy `acf-json/` from old theme if HAS_ACF=true:
     ```bash
     cp -r <ORIGINAL_SITE_PATH>/acf-json/ <SAGE_THEME_PATH>/acf-json/
     ```

  9. Copy `style.css` theme metadata (update for Sage 11):
     - Keep Theme Name, Author, Description, Version, Text Domain
     - Remove any actual CSS (Sage uses Vite for styles)

  10. Print the SAGE_THEME_PATH for subsequent phases.
```

Set `SAGE_THEME_PATH` from the agent's output.

## Step 6: Convert & Fix (agent team, parallel)

This is the main conversion phase. Use an agent team for parallel work.

### Step 6a: Read the scan report

Read `<SITE_PATH>/docs/bedrock-migration-report.json` to get the full inventory.

### Step 6b: Create tasks from the scan report

Use `TaskCreate` to create tasks directly. Group by type:

**Group A: Templates**

| Task | Description | Blocked By |
|------|-------------|------------|
| A1 | Convert `header.php` + `footer.php` → `layouts/app.blade.php` + `partials/header.blade.php` + `partials/footer.blade.php` | None |
| A2..AN | Each template file → corresponding Blade view (see template-mapping.md) | A1 (needs layout) |

For each template task, include in the description:
- Source file path
- Target Blade view path
- Conversion patterns from `php-to-blade.md`
- ACF fields used (from scan report's `acf_fields` map)

**Group B: functions.php Decomposition**

| Task | Description | Blocked By |
|------|-------------|------------|
| B1 | Theme setup → `app/setup.php` (menus, sidebars, theme supports, image sizes) | None |
| B2 | ACF options pages → `ThemeServiceProvider::boot()` | B1 |
| B3 | Custom post types → `app/PostTypes/*.php` classes | B1 |
| B4 | Custom taxonomies → `app/Taxonomies/*.php` classes | B1 |
| B5 | AJAX handlers → `app/Ajax/*.php` classes | B1 |
| B6 | Filter hooks → `app/filters.php` | B1 |
| B7 | Helper functions → `app/helpers.php` | B1 |
| B8 | Create View Composers for all ACF data | All A tasks (needs templates to know what data is needed) |

For each task, include the exact code from functions.php that should move there.

**Group C: PHP 8.4 Fixes**

| Task | Description | Blocked By |
|------|-------------|------------|
| C1 | Fix PHP 8.4 issues in `app/` PHP files | All A + B tasks |
| C2 | Fix PHP 8.4 issues in Blade templates | All A + B tasks |

Include the specific issues from `php84_issues` in the scan report.

### Step 6c: Create the team

```yaml
TeamCreate:
  team_name: "bedrock-convert-<date>"
  description: "Bedrock/Sage conversion for <theme-name>"
```

### Step 6d: Spawn teammates

Spawn 5 teammates in parallel:

| Name | Role | Reference Files |
|------|------|-----------------|
| `converter-1` | Template converter + functions decomposition | `php-to-blade.md`, `template-mapping.md`, `functions-decomposition.md` |
| `converter-2` | Template converter + functions decomposition | `php-to-blade.md`, `template-mapping.md`, `functions-decomposition.md` |
| `converter-3` | Template converter + View Composers | `php-to-blade.md`, `view-composers.md`, `template-mapping.md` |
| `php-fixer-1` | PHP 8.4 fixer (waits for A+B tasks) | `breaking-changes.md`, `acf-patterns.md` |
| `php-fixer-2` | PHP 8.4 fixer (waits for A+B tasks) | `breaking-changes.md`, `acf-patterns.md` |

Each teammate prompt:

```yaml
subagent_type: general-purpose
prompt: |
  You are a [converter/PHP fixer] on a Bedrock/Sage conversion team.

  ## Configuration
  - ORIGINAL_SITE_PATH: <site-path>
  - SAGE_THEME_PATH: <sage-theme-path>
  - BEDROCK_PATH: <bedrock-path>

  ## References
  Read these before starting:
  - bedrock-sage-migrator/skills/bedrock-sage-conversion/SKILL.md
  - bedrock-sage-migrator/skills/bedrock-sage-conversion/references/<relevant-refs>.md

  ## Workflow
  1. Check TaskList for pending, unblocked, unowned tasks
  2. Claim one via TaskUpdate (set owner to your name, status to in_progress)
  3. Read task details from TaskGet
  4. For converter tasks:
     - Read the source file from ORIGINAL_SITE_PATH
     - Create the target file in SAGE_THEME_PATH following the reference patterns
     - Run `php -l <file>` on any PHP files created
  5. For PHP fixer tasks:
     - Read the file BEFORE editing
     - Apply ONLY documented fix patterns
     - Preserve all existing functionality
     - Run `php -l <file>` after each edit
  6. Mark task as completed via TaskUpdate
  7. Check TaskList again — claim next unblocked task
  8. Repeat until no more tasks, then stop

  IMPORTANT:
  - Do NOT edit files belonging to another teammate's task
  - Write files to SAGE_THEME_PATH, not ORIGINAL_SITE_PATH
  - Follow the exact patterns from the reference files
```

### Step 6e: Wait and monitor

Wait for all teammates to finish. They will go idle when no more tasks are available.

### Step 6f: Shutdown team

Send shutdown requests to all teammates. Wait for confirmations. `TeamDelete`.

Print conversion summary.

## Step 7: Assets Pipeline (1 Task agent, sequential)

Spawn an assets agent. **Wait for completion before proceeding.**

```yaml
subagent_type: general-purpose
description: "Port assets to Vite pipeline"
prompt: |
  You are an asset migration specialist. Port the classic theme's assets into
  the Sage 11 Vite pipeline.

  ## Configuration
  - ORIGINAL_SITE_PATH: <site-path>
  - SAGE_THEME_PATH: <sage-theme-path>
  - SCAN_REPORT: <site-path>/docs/bedrock-migration-report.json

  ## Instructions

  1. Read the asset pipeline reference:
     `bedrock-sage-migrator/skills/bedrock-sage-conversion/references/vite-asset-pipeline.md`

  2. Read the scan report for asset inventory.

  3. Copy SCSS files:
     - From scan report's `assets.scss_files` paths
     - To `<SAGE_THEME_PATH>/resources/css/`
     - Preserve directory structure within the scss folder

  4. Fix SCSS import paths:
     - Remove `~` prefixes (Vite resolves node_modules without them)
     - Adjust relative paths for the new directory structure

  5. Copy JS files:
     - From scan report's `assets.js_files` paths
     - To `<SAGE_THEME_PATH>/resources/js/`

  6. Copy images:
     - To `<SAGE_THEME_PATH>/resources/images/`
     - Include SVG sprites

  7. Copy fonts:
     - To `<SAGE_THEME_PATH>/resources/fonts/`

  8. Update `vite.config.js` entry points to match the actual SCSS/JS entry files.

  9. Install npm dependencies from the classic theme that are still needed:
     - Bootstrap (if used)
     - jQuery (if used)
     - Slider libraries, animation libraries, etc.
     - Skip Gulp plugins and build tools

  10. Update `@vite` directive in `layouts/app.blade.php` to reference correct entry points.

  11. Do NOT convert Bootstrap to Tailwind — that's handled by a separate plugin.

  12. Verify: Run `npm run build` in SAGE_THEME_PATH.
```

## Step 8: Verify (1 Task agent, sequential)

Spawn a verifier agent. **Wait for completion before proceeding.**

```yaml
subagent_type: general-purpose
description: "Verify Bedrock/Sage conversion"
prompt: |
  You are a Bedrock/Sage conversion verifier. Check that everything was
  converted correctly.

  ## Configuration
  - ORIGINAL_SITE_PATH: <site-path>
  - BEDROCK_PATH: <bedrock-path>
  - SAGE_THEME_PATH: <sage-theme-path>

  ## Verification Steps

  1. **PHP lint** — Run php -l on ALL PHP files in the Bedrock project:
     ```bash
     find <BEDROCK_PATH>/web/app/themes/ -name "*.php" -exec php -l {} \; 2>&1 | grep -v "No syntax errors"
     find <SAGE_THEME_PATH>/app/ -name "*.php" -exec php -l {} \; 2>&1 | grep -v "No syntax errors"
     ```

  2. **Composer install** — Verify Bedrock dependencies:
     ```bash
     cd <BEDROCK_PATH> && composer install
     ```

  3. **Theme Composer install** — Verify theme dependencies:
     ```bash
     cd <SAGE_THEME_PATH> && composer install
     ```

  4. **npm build** — Verify Vite builds successfully:
     ```bash
     cd <SAGE_THEME_PATH> && npm install && npm run build
     ```

  5. **Template coverage** — Read the scan report and verify every original template
     has a corresponding Blade view:
     - For each file in `structure.templates`: check Blade view exists
     - For each file in `structure.flexible_content`: check partial exists
     - For each file in `structure.flexible_post_content`: check partial exists

  6. **PHP 8.4 re-scan** — Grep for any remaining PHP 8.4 breaking patterns
     in the new theme files.

  7. **View Composer check** — Verify that ACF flexible content layouts have
     matching View Composers.

  ## Report

  Print results for each check:
  - PHP lint: pass/fail (list errors)
  - Composer: pass/fail
  - npm build: pass/fail
  - Template coverage: X/Y templates converted (list missing)
  - PHP 8.4 patterns: X remaining (list)
  - View Composers: X/Y layouts covered (list missing)
```

Print verification results.

## Step 9: Optional CSS Migration

If the scan report shows Bootstrap in `npm_dependencies`:

Print:
```
## Bootstrap Detected

This theme uses Bootstrap. You can convert it to Tailwind CSS using the
bootstrap-to-tailwind plugin.

Run: `/bootstrap-to-tailwind:tailwind-migrate <SAGE_THEME_PATH>`
```

Ask user: "Would you like to run the Bootstrap → Tailwind conversion now?"

If yes: invoke via `Skill` tool:
```yaml
Skill:
  skill: "bootstrap-to-tailwind:tailwind-migrate"
  args: "<SAGE_THEME_PATH>"
```

If no: skip.

## Step 10: Final Report

Print the final summary:

```
## Bedrock/Sage 11 Conversion Complete

### New Project
- **Bedrock:** <BEDROCK_PATH>
- **Sage Theme:** <SAGE_THEME_PATH>

### Conversion Summary
- Templates converted: X
- Flexible content layouts converted: X
- View Composers created: X
- Post types migrated: X
- Taxonomies migrated: X
- AJAX handlers migrated: X
- PHP 8.4 issues fixed: X
- SCSS files ported: X
- JS files ported: X

### Verification
- PHP lint: <pass/fail>
- Composer install: <pass/fail>
- npm build: <pass/fail>
- Template coverage: X/Y
- PHP 8.4 clean: <yes/no>

### Remaining Issues
(List any items that need manual attention)

### What's Next
1. **Configure .env**: Set database credentials in `<BEDROCK_PATH>/.env`
2. **Import database**: Export from old site, import, run search-replace
3. **Test locally**: Point web server to `<BEDROCK_PATH>/web/`
4. **Review changes**: Compare original theme with new Sage theme
5. **Review the scan report**: `<SITE_PATH>/docs/bedrock-migration-report.json`
6. **Optional**: Run `/bootstrap-to-tailwind:tailwind-migrate` for CSS conversion
```
