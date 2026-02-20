# Build Pipeline Migration: Gulp + node-sass → Tailwind CSS v4

## Current Pipeline Analysis

Typical WordPress theme Gulp pipeline:
```
assets/scss/global.scss
  → gulp-sass (node-sass)
  → autoprefixer
  → cssnano/cleanCSS
  → assets/dist/global.min.css
```

WordPress enqueues `assets/dist/global.min.css` in `functions.php`:
```php
wp_enqueue_style('theme-style', get_template_directory_uri() . '/assets/dist/global.min.css', [], $version);
```

## Strategy: Tailwind CLI Alongside Gulp

**Recommended approach:** Replace only the SCSS→CSS task in Gulp with Tailwind CLI. Keep Gulp for other tasks (JS bundling, image optimization, BrowserSync, etc.).

This minimizes disruption — the output path stays the same, WordPress enqueue doesn't change.

## Step-by-Step Migration

### 1. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/cli
```

### 2. Create CSS Entry Point

Create `assets/css/global.css`:
```css
@import "tailwindcss";

@theme {
  /* Colors — mapped from SCSS variables */
  --color-primary: #your-value;
  --color-secondary: #your-value;
  --color-light-grey: #your-value;

  /* Fonts */
  --font-family-primary: 'Your Font', sans-serif;
  --font-family-secondary: 'Your Other Font', serif;

  /* Spacing — mapped from $basic-padding variants */
  --spacing-section: 4rem;
  --spacing-section-sm: 2rem;
  --spacing-section-lg: 6rem;
  --spacing-gutter: 30px;

  /* Transitions */
  --transition-primary: all 0.3s ease;
  --transition-secondary: all 0.15s ease;

  /* Container */
  --container-max-width: 1140px;
  --container-max-width-small: 85rem;
  --container-padding: 3rem;
}

/* Custom base styles */
@layer base {
  .container {
    margin-inline: auto;
    width: 100%;
    padding-inline: var(--container-padding);
    max-width: var(--container-max-width);
  }

  .container--small {
    max-width: var(--container-max-width-small);
  }
}

/* Import remaining SCSS-compiled CSS if using hybrid approach */
/* @import "./scss-output.css"; */
```

### 3. Add Build Scripts to package.json

```json
{
  "scripts": {
    "css:build": "npx @tailwindcss/cli -i ./assets/css/global.css -o ./assets/dist/global.min.css --minify",
    "css:watch": "npx @tailwindcss/cli -i ./assets/css/global.css -o ./assets/dist/global.min.css --watch",
    "build": "npm run css:build",
    "dev": "npm run css:watch"
  }
}
```

### 4. Update Gulp (if keeping it)

#### Option A: Replace SCSS Task with Tailwind
```javascript
// gulpfile.js — remove the old SCSS task
// Before
const sass = require('gulp-sass')(require('node-sass'));

function styles() {
  return gulp.src('assets/scss/global.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('assets/dist'));
}

// After — use Tailwind CLI via exec
const { exec } = require('child_process');

function styles(cb) {
  exec('npx @tailwindcss/cli -i ./assets/css/global.css -o ./assets/dist/global.min.css --minify', (err, stdout, stderr) => {
    if (err) console.error(stderr);
    cb(err);
  });
}
```

#### Option B: Keep Gulp-sass for SCSS Components (Hybrid)
If keeping SCSS for custom component files during gradual migration:
```javascript
const sass = require('gulp-sass')(require('sass')); // Switch from node-sass to dart-sass

// Compile remaining SCSS (without Bootstrap) to a separate file
function scssComponents() {
  return gulp.src('assets/scss/components.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css')); // Output to css/ dir, imported by Tailwind entry
}

// Tailwind builds the final output
function tailwind(cb) {
  exec('npx @tailwindcss/cli -i ./assets/css/global.css -o ./assets/dist/global.min.css --minify', (err, stdout, stderr) => {
    if (err) console.error(stderr);
    cb(err);
  });
}

// Run SCSS first, then Tailwind
exports.styles = gulp.series(scssComponents, tailwind);
```

### 5. Configure Content Scanning

Tailwind v4 auto-detects content files in most cases. If using a non-standard structure, you may need to configure source paths via the CSS entry:

```css
@import "tailwindcss";

/* Tailwind v4 automatically scans files in the project.
   If your PHP templates are outside the project root, add: */
@source "../path/to/templates";
```

For WordPress themes, Tailwind should scan `.php` files in the theme directory automatically.

### 6. Watch Task Update

```javascript
function watch() {
  // Watch PHP templates for Tailwind class changes
  gulp.watch(['**/*.php', 'assets/css/**/*.css'], styles);
  // Keep other watches (JS, images, etc.)
  gulp.watch('assets/js/**/*.js', scripts);
}
```

Or use Tailwind's built-in watch alongside Gulp:
```json
{
  "scripts": {
    "dev": "concurrently \"npx @tailwindcss/cli -i ./assets/css/global.css -o ./assets/dist/global.min.css --watch\" \"gulp watch:js\""
  }
}
```

## Alternative: PostCSS Plugin Approach

Instead of Tailwind CLI, use Tailwind as a PostCSS plugin (more flexible, integrates into existing PostCSS pipelines):

```bash
npm install tailwindcss @tailwindcss/postcss postcss postcss-cli
```

Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

Gulp integration:
```javascript
const postcss = require('gulp-postcss');

function styles() {
  return gulp.src('assets/css/global.css')
    .pipe(postcss())
    .pipe(cleanCSS())
    .pipe(rename('global.min.css'))
    .pipe(gulp.dest('assets/dist'));
}
```

## Dependency Cleanup

### Remove Bootstrap SCSS Sources
```bash
rm -rf assets/scss/bootstrap/
```

### Remove npm Dependencies
```bash
npm uninstall bootstrap bootstrap-sass node-sass gulp-sass
```

If switching from node-sass to dart-sass (for hybrid approach):
```bash
npm uninstall node-sass
npm install sass  # dart-sass
```

### Clean Up SCSS Imports
Remove all `@import 'bootstrap/...'` lines from SCSS files (see scss-migration.md).

### Update .gitignore
If Bootstrap SCSS was tracked:
```
# Remove from gitignore if it was there
# assets/scss/bootstrap/
```

## WordPress Enqueue (No Change Needed)

The key advantage of keeping the same output path (`assets/dist/global.min.css`):
- No changes needed to `functions.php` or theme enqueue
- No changes to any caching or CDN configuration
- The file just gets rebuilt differently

```php
// This stays exactly the same
wp_enqueue_style('theme-style', get_template_directory_uri() . '/assets/dist/global.min.css', [], $version);
```

## Verification

After migration, verify:

1. **Build succeeds:**
```bash
npx @tailwindcss/cli -i ./assets/css/global.css -o ./assets/dist/global.min.css
```

2. **Output file exists and has content:**
```bash
ls -la assets/dist/global.min.css
wc -c assets/dist/global.min.css
```

3. **Tailwind classes are included:**
```bash
# Check that common utilities are in the output
grep -c 'grid-cols-12\|col-span-\|hidden\|flex\|items-center' assets/dist/global.min.css
```

4. **No Bootstrap remnants in output:**
```bash
# Should return no results
grep -c 'bootstrap\|\.row\b.*flex-wrap\|\.col-.*flex' assets/dist/global.min.css
```

## Migration Checklist

- [ ] Install `tailwindcss` and `@tailwindcss/cli`
- [ ] Create `assets/css/global.css` with `@import "tailwindcss"` and `@theme`
- [ ] Map SCSS variables to CSS custom properties in `@theme`
- [ ] Add `css:build` and `css:watch` scripts to `package.json`
- [ ] Update or replace Gulp SCSS task
- [ ] Delete `assets/scss/bootstrap/` directory
- [ ] Remove Bootstrap from npm dependencies
- [ ] Switch from `node-sass` to `sass` (dart-sass) if keeping SCSS
- [ ] Verify build produces output at same path
- [ ] Verify WordPress enqueue still works
- [ ] Test all pages visually
