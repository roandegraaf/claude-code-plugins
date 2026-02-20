---
name: bedrock-sage-conversion
description: >
  Classic WordPress theme to Bedrock/Sage 11 conversion + PHP 8.4 migration knowledge.
  Triggers on: Bedrock migration, Sage conversion, classic theme to Sage, PHP 8.4 migration,
  Blade conversion, Vite setup, WordPress modernization, ACF migration, theme conversion.
---

# Classic Theme → Bedrock/Sage 11 Conversion

## Overview

This skill covers the full conversion of a classic WordPress theme into a modern Bedrock/Sage 11 stack:

- **Bedrock**: Composer-managed WordPress with `.env` config, `web/app/` structure
- **Sage 11**: Acorn 5 framework, Blade templates, Vite build pipeline, View Composers
- **PHP 8.4**: All breaking changes from PHP 7.4 → 8.4 fixed during conversion

## Conversion Pipeline

| Phase | What Happens | Reference |
|---|---|---|
| 1. Analyze | Inventory classic theme structure, detect features | [classic-theme-analysis.md](references/classic-theme-analysis.md) |
| 2. Scaffold Bedrock | `composer create-project roots/bedrock` | [bedrock-scaffold.md](references/bedrock-scaffold.md) |
| 3. Scaffold Sage 11 | `composer create-project roots/sage` in Bedrock | [sage11-structure.md](references/sage11-structure.md) |
| 4. Configure Vite | Set up `vite.config.js` with entry points | [sage11-vite.md](references/sage11-vite.md) |
| 5. Convert Templates | PHP templates → Blade views | [php-to-blade.md](references/php-to-blade.md), [template-mapping.md](references/template-mapping.md) |
| 6. Decompose functions.php | Split into providers, composers, filters | [functions-decomposition.md](references/functions-decomposition.md) |
| 7. Create View Composers | ACF data → Composer boundary | [view-composers.md](references/view-composers.md) |
| 8. Port Assets | SCSS/JS from Gulp → Vite pipeline | [vite-asset-pipeline.md](references/vite-asset-pipeline.md) |
| 9. Fix PHP 8.4 | Apply breaking change fixes | [breaking-changes.md](references/breaking-changes.md), [acf-patterns.md](references/acf-patterns.md) |
| 10. Upgrade Dependencies | Ensure Composer packages support PHP 8.4 + Acorn 5 | [dependency-matrix.md](references/dependency-matrix.md) |

## PHP 8.4 Breaking Changes Summary

| PHP Version | Category | Impact | Key Change |
|---|---|---|---|
| 8.0 | Type safety | High | Union types, `match`, named arguments, nullsafe operator, stricter internal type coercion |
| 8.1 | Null handling | Critical | Passing null to non-nullable internal function params deprecated |
| 8.1 | Enums & fibers | High | Enums, fibers, readonly properties, intersection types |
| 8.2 | Dynamic props | High | Dynamic properties deprecated (Error in 9.0) |
| 8.3 | Typed constants | Medium | Typed class constants, `json_validate()`, `#[Override]` |
| 8.4 | Deprecations | High | Implicit nullable params deprecated, new deprecations |

See [references/breaking-changes.md](references/breaking-changes.md) for full details per version.

## ACF Field Type Defaults

When converting ACF field access from direct template use to View Composers, apply type-aware defaults:

| ACF Field Type | Safe Default |
|---|---|
| text, textarea, wysiwyg, email, url, password | `?? ''` |
| number, range | `?? 0` |
| image, file, post_object, page_link | Guard before use |
| gallery, repeater, flexible_content, relationship | `?: []` |
| true_false | `?? false` |
| select, radio | `?? ''` |
| checkbox | `?: []` |
| group, link | Guard before property/array access |
| color_picker | `?? ''` |

See [references/acf-patterns.md](references/acf-patterns.md) for field-specific examples.

## Sage 11 Quick Reference

### Directory Layout

```
theme/
├── app/                    # PHP: Providers, View/Composers, setup.php, filters.php
├── config/                 # Optional Acorn/Laravel config overrides
├── public/build/           # Vite output (generated)
├── resources/
│   ├── css/app.css         # Primary stylesheet entry
│   ├── js/app.js           # Primary JS entry
│   └── views/              # Blade templates
│       ├── layouts/app.blade.php
│       ├── partials/
│       └── components/
├── functions.php           # Acorn 5 bootstrap
├── vite.config.js
├── package.json
└── composer.json
```

### Acorn 5 Bootstrap (functions.php)

```php
<?php

use Roots\Acorn\Application;

add_action('after_setup_theme', function () {
    Application::configure()
        ->withProviders([
            App\Providers\ThemeServiceProvider::class,
        ])
        ->boot();
}, 0);
```

### Template → Blade Conversion Pattern

```php
// Classic: header.php + footer.php → Sage: layouts/app.blade.php
// Classic: single.php → Sage: resources/views/single.blade.php
// Classic: flexible-content/hero.php → Sage: resources/views/partials/flexible/hero.blade.php
// Classic: get_template_part('partials/card') → @include('partials.card')
```

See [references/template-mapping.md](references/template-mapping.md) for the complete mapping table.

### View Composer Pattern

```php
namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Hero extends Composer
{
    protected static $views = ['partials.flexible.hero'];

    public function with(): array
    {
        return [
            'title'   => get_field('title') ?? '',
            'image'   => get_field('image'),
            'items'   => get_field('items') ?: [],
        ];
    }
}
```

See [references/view-composers.md](references/view-composers.md) for full patterns.

## Dependency Compatibility

Verify all Composer dependencies support the target PHP version and Acorn 5.

See [references/dependency-matrix.md](references/dependency-matrix.md) for the compatibility matrix.
