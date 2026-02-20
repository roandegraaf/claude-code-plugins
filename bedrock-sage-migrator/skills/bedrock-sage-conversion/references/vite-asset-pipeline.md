# Vite Asset Pipeline Migration

Reference for porting assets from a classic theme's build tool (Gulp/Webpack) to Sage 11's Vite pipeline.

## Overview

Classic themes typically use Gulp or Webpack to compile SCSS → CSS and bundle JS. Sage 11 uses Vite with `laravel-vite-plugin`. This reference covers porting assets without converting Bootstrap to Tailwind (that's a separate step).

## Directory Mapping

| Classic Source | Sage 11 Destination |
|---|---|
| assets/scss/ or src/scss/ | resources/css/ |
| assets/js/ or src/js/ | resources/js/ |
| assets/images/ or images/ | resources/images/ |
| assets/fonts/ or fonts/ | resources/fonts/ |
| assets/svg/ | resources/images/ (or resources/svg/) |

## Step 1: Copy SCSS Files

```bash
# Copy SCSS source files
cp -r <classic-theme>/assets/scss/* <sage-theme>/resources/css/

# If the classic theme uses a different source dir:
cp -r <classic-theme>/src/scss/* <sage-theme>/resources/css/
```

### Rename Entry Point

The classic theme's SCSS entry (often `app.scss`, `style.scss`, or `main.scss`) should be renamed to match the Vite config:

```bash
# If entry point is style.scss, rename to app.scss
mv <sage-theme>/resources/css/style.scss <sage-theme>/resources/css/app.scss
```

Or update `vite.config.js` to point to the existing filename.

### Fix Import Paths

SCSS @import/@use paths may need updating due to the directory change:

```scss
// Classic: assets/scss/app.scss
@import 'variables';
@import 'mixins';
@import 'base/typography';
@import 'components/header';
@import '~bootstrap/scss/bootstrap';  // node_modules reference

// Sage 11: resources/css/app.scss — same relative imports work IF structure is preserved
@import 'variables';
@import 'mixins';
@import 'base/typography';
@import 'components/header';

// Bootstrap: node_modules import stays the same with Vite
@import 'bootstrap/scss/bootstrap';  // Vite resolves node_modules without ~
```

**Key difference:** Vite resolves bare module names from `node_modules` without the `~` prefix that Webpack/Gulp required. Remove `~` prefixes:

```scss
// Before (Webpack/Gulp)
@import '~bootstrap/scss/bootstrap';
@import '~@fortawesome/fontawesome-free/scss/fontawesome';

// After (Vite)
@import 'bootstrap/scss/bootstrap';
@import '@fortawesome/fontawesome-free/scss/fontawesome';
```

## Step 2: Copy JavaScript Files

```bash
cp -r <classic-theme>/assets/js/* <sage-theme>/resources/js/
```

### Modernize Entry Point

Classic themes often use jQuery-heavy, IIFE-wrapped JavaScript. For initial migration, keep it working:

```javascript
// Classic: assets/js/app.js (typical jQuery pattern)
(function($) {
    $(document).ready(function() {
        // ... all the theme JS
    });
})(jQuery);

// Sage 11: resources/js/app.js — import the classic code
import './legacy-app.js';  // Rename old app.js to legacy-app.js

// Or if using ES modules:
import $ from 'jquery';
// ... rest of code
```

If the classic theme has multiple JS files concatenated by Gulp:

```javascript
// Sage 11: resources/js/app.js — import each file
import './modules/navigation.js';
import './modules/sliders.js';
import './modules/forms.js';
import './modules/ajax-handlers.js';
```

### jQuery Compatibility

If the classic theme uses jQuery heavily, ensure it's available:

```bash
npm install jquery
```

```javascript
// resources/js/app.js
import $ from 'jquery';
window.jQuery = window.$ = $;

// Import classic JS modules
import './modules/navigation.js';
```

Or use WordPress's bundled jQuery (not recommended for Vite but works for migration):

```javascript
// resources/js/app.js
const $ = window.jQuery;
```

## Step 3: Copy Images

```bash
cp -r <classic-theme>/assets/images/* <sage-theme>/resources/images/
# Also copy any root-level images
cp <classic-theme>/*.{png,jpg,svg,ico} <sage-theme>/resources/images/ 2>/dev/null
```

### SVG Sprites

If the classic theme uses an SVG sprite file:

```bash
cp <classic-theme>/assets/svg/sprite.svg <sage-theme>/resources/images/sprite.svg
```

Reference in Blade:
```blade
<svg><use href="{{ Vite::asset('resources/images/sprite.svg') }}#icon-name"></use></svg>
```

Or inline the SVG sprite in the layout.

## Step 4: Copy Fonts

```bash
cp -r <classic-theme>/assets/fonts/* <sage-theme>/resources/fonts/
```

Update font-face declarations in SCSS:

```scss
// Classic
@font-face {
    font-family: 'CustomFont';
    src: url('../fonts/CustomFont.woff2') format('woff2');
}

// Sage 11 — same relative path works if fonts are in resources/fonts/
@font-face {
    font-family: 'CustomFont';
    src: url('../fonts/CustomFont.woff2') format('woff2');
}
```

## Step 5: Configure vite.config.js

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';

export default defineConfig({
  base: '/app/themes/<theme-name>/public/build/',
  plugins: [
    laravel({
      input: [
        'resources/css/app.scss',    // SCSS entry point
        'resources/js/app.js',       // JS entry point
        'resources/css/editor.scss', // Optional: editor styles
        'resources/js/editor.js',    // Optional: editor JS
      ],
      refresh: true,
    }),
    wordpressPlugin(),
    wordpressThemeJson({
      disableTailwindColors: true,    // Not using Tailwind yet
      disableTailwindFonts: true,
      disableTailwindFontSizes: true,
    }),
  ],
});
```

## Step 6: Install Dependencies

```bash
cd <sage-theme>

# Install Vite and plugins
npm install

# Install SCSS support
npm install -D sass

# Install Bootstrap (if the classic theme uses it)
npm install bootstrap

# Install other JS dependencies from classic theme's package.json
# Review each dependency — some Gulp plugins are not needed with Vite
```

### Dependencies to Skip

These Gulp-specific packages are NOT needed with Vite:

- gulp, gulp-* (all gulp plugins)
- browser-sync (Vite has built-in HMR)
- del, vinyl-* (Gulp streaming)
- gulp-sass, gulp-postcss (Vite handles this natively)
- gulp-concat, gulp-uglify (Vite bundles and minifies)
- gulp-imagemin (use separate image optimization if needed)
- gulp-sourcemaps (Vite generates sourcemaps automatically)
- webpack, webpack-* (if migrating from Webpack)
- laravel-mix (if migrating from Mix)

### Dependencies to Keep/Install

- bootstrap (if used)
- jquery (if used)
- @popperjs/core (if Bootstrap JS is used)
- slick-carousel, swiper, etc. (slider libraries)
- gsap, anime.js (animation libraries)
- Any other runtime JS libraries

## Step 7: Remove Old Build Config

After verifying Vite works, remove:

```bash
# Old Gulp config
rm gulpfile.js
rm gulpfile.babel.js

# Old Webpack config
rm webpack.config.js
rm webpack.mix.js

# Old build output
rm -rf dist/
rm -rf build/
```

## Step 8: Update Blade Layout

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html {!! get_language_attributes() !!}>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite(['resources/css/app.scss', 'resources/js/app.js'])
    @php(wp_head())
</head>
```

## Verification

```bash
# Build production assets
npm run build

# Check manifest was generated
cat public/build/manifest.json

# Start dev server
npm run dev
```

## Common Issues

### "Vite manifest not found"
- Wrong `base` path in vite.config.js
- Forgot to run `npm run build`
- Manifest at wrong location

### SCSS compilation errors
- Missing `~` prefix removal (Vite doesn't use `~` for node_modules)
- Missing `sass` npm package
- Import path changes due to directory restructuring

### jQuery not defined
- jQuery not imported or not set on window
- Scripts loading before jQuery is available
- Use `import $ from 'jquery'` at top of entry file

### Images not loading
- Wrong relative paths in SCSS after directory move
- Images not copied to resources/images/
- Use `Vite::asset()` for dynamic image references
