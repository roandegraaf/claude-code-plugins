# Sage 11 Vite Configuration

Reference for configuring and using Vite in a Sage 11 theme.

## vite.config.js — Full Configuration

### With SCSS (for migrated themes using Bootstrap/custom SCSS)

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';

export default defineConfig({
  base: '/app/themes/<theme-name>/public/build/',
  plugins: [
    laravel({
      input: [
        'resources/css/app.scss',
        'resources/js/app.js',
        'resources/css/editor.scss',
        'resources/js/editor.js',
      ],
      refresh: true,
    }),
    wordpressPlugin(),
    wordpressThemeJson({
      disableTailwindColors: true,
      disableTailwindFonts: true,
      disableTailwindFontSizes: true,
    }),
  ],
});
```

### With Tailwind CSS v4

```javascript
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';

export default defineConfig({
  base: '/app/themes/<theme-name>/public/build/',
  plugins: [
    tailwindcss(),
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.js',
        'resources/css/editor.css',
        'resources/js/editor.js',
      ],
      refresh: true,
    }),
    wordpressPlugin(),
    wordpressThemeJson({
      disableTailwindColors: false,
      disableTailwindFonts: false,
      disableTailwindFontSizes: false,
    }),
  ],
});
```

### Minimal (no Roots plugins)

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  base: '/app/themes/<theme-name>/public/build/',
  plugins: [
    laravel({
      input: [
        'resources/css/app.scss',
        'resources/js/app.js',
      ],
      refresh: true,
    }),
  ],
});
```

## Critical: The `base` Path

The `base` property MUST match the theme's URL path relative to the web root.

**Bedrock:**
```javascript
base: '/app/themes/<theme-name>/public/build/'
```

**Standard WordPress:**
```javascript
base: '/wp-content/themes/<theme-name>/public/build/'
```

**Wrong `base` path = "Vite manifest not found" fatal error on every page load.**

To derive the correct path programmatically:
```javascript
// The path from web root to theme's public/build/ directory
// For Bedrock: /app/themes/theme-name/public/build/
// This is the URL path, not filesystem path
```

## Entry Points

| File | Purpose | Required |
|---|---|---|
| resources/css/app.scss (or .css) | Primary frontend stylesheet | Yes |
| resources/js/app.js | Primary frontend JavaScript | Yes |
| resources/css/editor.scss (or .css) | Block editor styles | Optional |
| resources/js/editor.js | Block editor JS (block variants) | Optional |

## @vite Blade Directive

In `resources/views/layouts/app.blade.php`:

```blade
@vite(['resources/css/app.scss', 'resources/js/app.js'])
```

This handles:
- **Development:** Injects Vite dev server script + HMR client
- **Production:** Reads `public/build/manifest.json` for hashed filenames

## Vite Facade in PHP

For assets loaded outside Blade (e.g., editor styles in setup.php):

```php
use Illuminate\Support\Facades\Vite;

// Get URL to a built asset
$url = Vite::asset('resources/css/editor.scss');

// In block_editor_settings_all filter
add_filter('block_editor_settings_all', function ($settings) {
    $settings['styles'][] = [
        'css' => Vite::asset('resources/css/editor.css'),
    ];
    return $settings;
});
```

## HMR (Hot Module Replacement)

HMR is enabled by default with `refresh: true` in the laravel plugin config.

```bash
npm run dev    # Start dev server with HMR
npm run build  # Production build → public/build/
```

No additional configuration needed beyond correct `base` path.

## SCSS Support

Vite has native SCSS support. Just install sass:

```bash
npm install -D sass
```

Then use `.scss` extensions in entry points:

```javascript
input: ['resources/css/app.scss', 'resources/js/app.js']
```

And in the Blade directive:
```blade
@vite(['resources/css/app.scss', 'resources/js/app.js'])
```

## Static Assets

Images and fonts in `resources/images/` and `resources/fonts/` are copied as-is to `public/` during build. Reference them in SCSS:

```scss
.hero {
  background-image: url('../images/hero-bg.jpg');
}
```

Or in Blade:
```blade
<img src="{{ Vite::asset('resources/images/logo.svg') }}" alt="Logo">
```

## package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "laravel-vite-plugin": "^1.0",
    "@roots/vite-plugin": "^1.0",
    "sass": "^1.80",
    "vite": "^6.0"
  }
}
```

## Differences from Bud (Sage 10)

| Feature | Bud (Sage 10) | Vite (Sage 11) |
|---|---|---|
| Config file | bud.config.js | vite.config.js |
| Build tool | Webpack (via Bud) | Vite (ESBuild + Rollup) |
| Asset directive | @asset() | @vite() |
| Manifest location | public/manifest.json | public/build/manifest.json |
| SCSS support | Via @roots/bud-sass | Native (install sass) |
| HMR | Bud dev server | Vite dev server |
| Output dir | public/ | public/build/ |
