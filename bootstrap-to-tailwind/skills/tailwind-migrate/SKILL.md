---
name: tailwind-migrate
description: Autonomously migrate a WordPress theme from Bootstrap 4 CSS to Tailwind CSS v4
argument-hint: [path-to-theme]
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet
---

# /tailwind-migrate — Autonomous Bootstrap → Tailwind CSS v4 Migration

## Step 1: Parse Arguments

Extract theme path from `$ARGUMENTS`.

- If provided: use the given path (resolve to absolute if relative)
- If missing: use the current working directory

Validate the path is a WordPress theme:
```bash
ls <theme-path>/style.css
```

And has assets to migrate (check for at least one):
```bash
ls <theme-path>/assets/
ls <theme-path>/package.json
```

If `style.css` is missing:
- Print: "This does not appear to be a WordPress theme. Expected `style.css` in the theme directory."
- Print: "Usage: `/tailwind-migrate [path-to-theme]`"
- Stop.

## Step 2: Detect Theme

Analyze the theme structure:

1. Read `package.json` — look for `bootstrap`, `bootstrap-sass`, or `bootstrap-4` in dependencies/devDependencies
2. Find SCSS entry point: look for `assets/scss/global.scss`, `assets/scss/main.scss`, `assets/scss/style.scss`, or `assets/sass/` directory
3. Count files:
   - PHP files: `find <theme-path> -name "*.php" | wc -l`
   - SCSS files: `find <theme-path> -name "*.scss" | wc -l`
   - JS files: `find <theme-path> -name "*.js" -not -path "*/node_modules/*" | wc -l`
4. Detect build pipeline: check for `gulpfile.js`, `webpack.config.js`, `vite.config.js`
5. Detect Bootstrap version: grep SCSS source files for version comments (`v4.0.0`, `v4.1`, etc.) or check package.json version
6. Check for existing Tailwind: grep for `tailwindcss` in package.json

Print theme summary:
```
## Theme Detected

**Path:** <theme-path>
**Theme Name:** <from style.css>
**Bootstrap:** <version> (via <npm/scss-source>)
**SCSS Entry:** <path>
**Build Pipeline:** <Gulp/Webpack/Vite/None>
**PHP files:** <count>
**SCSS files:** <count>
**JS files:** <count>
**Existing Tailwind:** <yes/no>
```

If existing Tailwind is detected:
- Print: "Warning: This theme already has Tailwind CSS installed. Proceeding may cause conflicts."
- Ask user if they want to continue.

## Step 3: Create Git Safety Branch

Check git state:
```bash
git -C <theme-path> status --porcelain
```

If dirty:
- Print: "Warning: Working tree has uncommitted changes."
- Ask user if they want to continue (changes will be included in the migration branch)

Create the migration branch:
```bash
git -C <theme-path> checkout -b tailwind-migration-$(date +%Y%m%d)
```

Print: "Created migration branch `tailwind-migration-<date>`. Your original code is safe on the previous branch."

## Step 4: Run the Orchestrator

Invoke the `tailwind-migrator` agent via the Task tool:

```yaml
subagent_type: general-purpose
description: "Orchestrate Bootstrap→Tailwind migration"
prompt: |
  You are the Bootstrap → Tailwind CSS v4 migration orchestrator. Follow the instructions in
  `bootstrap-to-tailwind/agents/tailwind-migrator.md` exactly.

  Read that file first, then execute all four phases.

  Theme configuration:
  - THEME_PATH: <theme-path>

  The migration skill and references are at:
  - bootstrap-to-tailwind/skills/tailwind-migration/SKILL.md
  - bootstrap-to-tailwind/skills/tailwind-migration/references/class-mapping.md
  - bootstrap-to-tailwind/skills/tailwind-migration/references/grid-migration.md
  - bootstrap-to-tailwind/skills/tailwind-migration/references/scss-migration.md
  - bootstrap-to-tailwind/skills/tailwind-migration/references/js-components.md
  - bootstrap-to-tailwind/skills/tailwind-migration/references/build-pipeline.md
```

Wait for the orchestrator to complete.

## Step 5: Report

When the orchestrator completes, print the final summary:

```
## Migration Complete

The Bootstrap → Tailwind CSS v4 migration has finished. Here's what happened:

<orchestrator's final report>

### What's Next

1. **Review changes:** `git diff main` (or your original branch)
2. **Check the full scan report:** `docs/tailwind-migration-report.md`
3. **Build CSS:** `npx @tailwindcss/cli -i ./assets/css/global.css -o ./assets/dist/global.min.css`
4. **Test visually:** Open every page type in the browser and compare with the original
5. **Check manual review items:** Look for any flagged dynamic classes or JS components
6. **Merge when ready:** `git checkout main && git merge tailwind-migration-<date>`
```

If the orchestrator reported remaining issues, highlight them prominently.
