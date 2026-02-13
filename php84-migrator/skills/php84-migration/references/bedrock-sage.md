# Bedrock / Sage Migration Reference

## Bedrock Structure Awareness

### `config/application.php`

Bedrock uses `vlucas/phpdotenv` (v5 in modern Bedrock) and `roots/wp-config` for environment configuration.

**PHP dotenv upgrade path:**
- phpdotenv v3 (older Bedrock) uses `new Dotenv\Dotenv(...)` with `overload()`
- phpdotenv v5 (current Bedrock) uses `Dotenv\Dotenv::createUnsafeImmutable(...)`

```php
// phpdotenv v3 (pre-Bedrock 1.13) — may have implicit nullable issues
$dotenv = new Dotenv\Dotenv($root_dir);
$dotenv->overload();

// phpdotenv v5 (Bedrock 1.13+) — PHP 8.4 compatible
$dotenv = Dotenv\Dotenv::createUnsafeImmutable($root_dir);
$dotenv->load();
```

**`Config::define()` patterns:**

```php
// These are safe — string literals and env() calls
Config::define('DB_NAME', env('DB_NAME'));
Config::define('DB_USER', env('DB_USER'));

// Watch for null coalescing on env() — env() can return null
// Before
Config::define('SOME_KEY', env('SOME_KEY'));
// After — add fallback if the value is used in string context
Config::define('SOME_KEY', env('SOME_KEY') ?? '');
```

### `config/environments/*.php`

Environment-specific overrides (`development.php`, `staging.php`, `production.php`). These files use the same `Config::define()` pattern. Check each for:

- `ini_set()` calls with potentially null values
- `define()` calls that may pass null where string is expected
- Error reporting level constants that changed between PHP versions

```php
// Common in development.php — safe as-is
Config::define('WP_DEBUG', true);
Config::define('WP_DEBUG_DISPLAY', true);

// Watch for custom defines that pass env() without fallback
Config::define('CUSTOM_API_KEY', env('CUSTOM_API_KEY'));
// Fix if consumed as string downstream:
Config::define('CUSTOM_API_KEY', env('CUSTOM_API_KEY') ?? '');
```

### `web/app/mu-plugins/`

Must-use plugins load before regular plugins and cannot be deactivated. Common mu-plugins in Bedrock:

- `bedrock-autoloader.php` — Composer autoloader for mu-plugins (ships with Bedrock)
- `disallow-indexing.php` — prevents search engine indexing on non-production
- `register-theme-directory.php` — registers the Bedrock theme path

**Migration checks:**
- `bedrock-autoloader.php` uses class properties — verify no dynamic property usage
- Custom mu-plugins often lack strict typing; scan for implicit nullable params
- mu-plugins that hook into `plugins_loaded` may rely on deprecated WordPress APIs

```php
// bedrock-autoloader.php — older versions may use dynamic properties
// If upgrading Bedrock, ensure you pull the latest version of this file
// The latest bedrock-autoloader.php is PHP 8.4 compatible
```

### Composer-Managed WordPress Core

Bedrock manages WordPress via `roots/wordpress` in `composer.json`:

```json
{
  "require": {
    "php": ">=8.0",
    "roots/wordpress": "^6.4",
    "roots/wp-config": "1.0.0",
    "roots/bedrock-autoloader": "^1.0"
  },
  "config": {
    "platform": {
      "php": "8.4"
    }
  }
}
```

**Key actions:**
1. Update `"php"` constraint to `">=8.2"` or `">=8.4"`
2. Set `config.platform.php` to `"8.4"` so Composer resolves PHP 8.4-compatible packages
3. Update `roots/wordpress` to `^6.4` minimum (6.4+ has PHP 8.4 beta support, 6.5+ recommended)
4. WordPress 5.x is NOT compatible with PHP 8.4 — must upgrade to 6.4+

### Composer-Managed Plugins

Plugins installed via `wpackagist-plugin/*` must be checked individually:

```json
{
  "require": {
    "wpackagist-plugin/advanced-custom-fields-pro": "^6.0",
    "wpackagist-plugin/wp-migrate-db-pro": "^2.0"
  }
}
```

**Fix pattern:** Run `composer why-not php 8.4` to identify blocking dependencies, then check each plugin's PHP compatibility on its repository or changelog.

## Sage 10 Migration

### Acorn Framework Upgrade Path

Acorn is the micro-framework that powers Sage 10. The upgrade path:

| Acorn Version | Laravel Base | PHP Requirement | Status |
|---|---|---|---|
| 2.x (alpha) | Laravel 8 | PHP 7.3+ | NOT compatible with PHP 8.2+ |
| 3.x | Laravel 9 | PHP 8.0+ | Compatible with PHP 8.1, issues on 8.2+ |
| 4.x | Laravel 10 | PHP 8.1+ | Compatible with PHP 8.4 |

**Upgrade steps for Acorn 2.x to 4.x:**

1. Update `composer.json` in the theme directory:
```json
{
  "require": {
    "roots/acorn": "^4.0",
    "log1x/sage-directives": "^2.0"
  }
}
```

2. Update service provider registration in `app/Providers/`:
```php
// Acorn 2.x — extends Illuminate base
use Illuminate\Support\ServiceProvider;

// Acorn 4.x — extends Roots base (wraps Illuminate)
use Roots\Acorn\ServiceProvider;
```

3. Update the theme's `functions.php` bootstrap:
```php
// Acorn 2.x
\Roots\bootloader();

// Acorn 4.x
\Roots\bootloader(function () {
    \Roots\app()->boot();
});
```

### Service Provider Changes

Between Acorn 2.x and 4.x, service provider registration changed:

```php
// Acorn 2.x — config/app.php providers array
'providers' => [
    App\Providers\ThemeServiceProvider::class,
],

// Acorn 4.x — app/Providers/ThemeServiceProvider.php auto-discovered
// Or explicitly registered in config/app.php under 'providers'
// The boot() method signature must match the parent:
class ThemeServiceProvider extends ServiceProvider
{
    public function boot(): void  // Return type required in 4.x
    {
        // ...
    }
}
```

### View Composer Patterns

View Composers bind data to Blade views. Common breaking changes:

```php
// Before — Acorn 2.x style, may use dynamic properties
class PageHeader extends Composer
{
    protected static $views = ['partials.page-header'];

    public function with()
    {
        return [
            'title' => $this->title(),
        ];
    }

    public function title()
    {
        // get_field() can return null — passing to string functions breaks on 8.0+
        return strtoupper(get_field('custom_title'));
    }
}

// After — PHP 8.4 safe
class PageHeader extends Composer
{
    protected static $views = ['partials.page-header'];

    public function with(): array
    {
        return [
            'title' => $this->title(),
        ];
    }

    public function title(): string
    {
        return strtoupper(get_field('custom_title') ?? '');
    }
}
```

### Blade Template Compilation

Blade templates compile to PHP cached in `storage/framework/views/`. On PHP 8.4:

- Compiled templates inherit PHP 8.4 strictness
- `@php` blocks must follow PHP 8.4 rules
- Echoing null values with `{{ }}` is safe (Blade escapes and handles null)
- Unescaped `{!! !!}` with null values outputs empty string (safe)
- Blade directives that call functions with null args will trigger deprecations

```blade
{{-- Safe — Blade handles null --}}
{{ $title }}

{{-- Unsafe if $items is null — array_map needs array --}}
@foreach(array_map('strtoupper', $items) as $item)
    {{ $item }}
@endforeach

{{-- Fix --}}
@foreach(array_map('strtoupper', $items ?: []) as $item)
    {{ $item }}
@endforeach
```

### `app/setup.php`

Theme setup file — registers theme support, assets, menus:

```php
// Common patterns to check:

// 1. add_theme_support calls — generally safe, but watch custom implementations
add_theme_support('post-thumbnails');

// 2. wp_enqueue_* — asset() helper may return null on missing assets
// Before
bundle('app')->enqueue();
// This is safe in Sage 10 / Acorn 4.x — but verify bundle() isn't returning null

// 3. Navigation menus — register_nav_menus is safe
register_nav_menus([
    'primary_navigation' => __('Primary Navigation', 'sage'),
]);
```

### `app/filters.php`

WordPress filter hooks — common migration issues:

```php
// 1. Excerpt length filter — safe, returns int
add_filter('excerpt_length', fn () => 40);

// 2. Body class filter — array_merge with potentially null get_field
// Before
add_filter('body_class', function (array $classes) {
    $custom = get_field('body_classes', 'option');
    return array_merge($classes, explode(' ', $custom));
});

// After — guard null from get_field
add_filter('body_class', function (array $classes): array {
    $custom = get_field('body_classes', 'option');
    if (!$custom) {
        return $classes;
    }
    return array_merge($classes, explode(' ', $custom));
});

// 3. Template include filter — string function on potential null
// Before
add_filter('template_include', function ($template) {
    if (strpos($template, 'search') !== false) { ... }
});

// After
add_filter('template_include', function ($template) {
    if (str_contains($template ?? '', 'search')) { ... }
});
```

### `app/helpers.php`

Utility functions commonly defined in Sage themes:

```php
// Common patterns to fix:

// 1. String utilities wrapping WordPress functions
// Before
function get_page_title() {
    return trim(strip_tags(wp_title('', false)));
}
// After — wp_title can return empty string, but strip_tags on null is deprecated
function get_page_title(): string {
    return trim(strip_tags(wp_title('', false) ?? ''));
}

// 2. ACF wrapper helpers
// Before
function get_option_field($name) {
    return get_field($name, 'option');
}
// After — add return type, callers must handle null
function get_option_field(string $name): mixed {
    return get_field($name, 'option');
}
```

### `resources/posttypes/*.php`

Custom post type and taxonomy registration files:

```php
// Common pattern — generally safe, but check for:
// 1. Dynamic property assignment on WP_Post objects (Error in 8.4)
// 2. Null values in label arrays

// Before
register_post_type('project', [
    'label' => get_field('project_label', 'option'),  // null if not set
    'labels' => [
        'name' => get_field('project_plural', 'option'),
    ],
]);

// After
register_post_type('project', [
    'label' => get_field('project_label', 'option') ?? 'Projects',
    'labels' => [
        'name' => get_field('project_plural', 'option') ?? 'Projects',
    ],
]);
```

## Typical File Scan Order

```
1. composer.json (root + theme)
2. config/application.php
3. web/app/mu-plugins/*.php
4. web/app/themes/*/app/**/*.php
5. web/app/themes/*/resources/**/*.blade.php
6. web/app/themes/*/resources/posttypes/*.php
7. web/app/themes/*/functions.php
```

**Rationale:**
- `composer.json` first to identify dependency constraints and blocking packages
- `config/` second to fix environment bootstrap before scanning application code
- `mu-plugins/` third because they load earliest in WordPress
- Theme `app/` PHP files are the main application logic
- Blade templates fifth — compiled PHP inherits all 8.4 strictness
- Post type registrations sixth — often contain ACF field calls with null risk
- `functions.php` last — in Sage 10 this is mainly the Acorn bootstrap

## Known Compatibility Issues

### Acorn 2.x Alpha + PHP 8.2+

Acorn 2.x alpha is built on Laravel 8 components that use dynamic properties extensively. PHP 8.2 deprecated dynamic properties and PHP 8.4 throws `Error` on them.

**Symptoms:** Fatal errors on theme boot, `Cannot create dynamic property` errors in Illuminate classes.

**Fix:** Upgrade to Acorn 4.x. There is no patch for Acorn 2.x — it is end-of-life.

```json
// composer.json (theme)
{
  "require": {
    "roots/acorn": "^4.0"
  }
}
```

### ACF Gutenblocks 0.4.x

The `itinerisltd/acf-gutenblocks` package v0.4.x may use deprecated PHP features:
- Dynamic property assignment on block objects
- Implicit nullable parameters in constructor signatures

**Fix:** Update to the latest release or fork and patch. Check `AbstractBlock` class for dynamic properties.

### WordPress 5.x + PHP 8.4

WordPress 5.x core is NOT compatible with PHP 8.4. Key issues:
- Dynamic properties throughout `WP_Query`, `WP_Post`, `WP_User`
- Deprecated `utf8_encode()`/`utf8_decode()` usage (removed in 8.4-dev)
- Implicit nullable parameters in core functions

**Fix:** Upgrade to WordPress 6.4+ (via `roots/wordpress` in `composer.json`):
```json
{
  "require": {
    "roots/wordpress": "^6.5"
  }
}
```

### Laravel Mix (Build Tool)

Laravel Mix (used in older Sage 10 setups before Bud) runs in Node.js and is not affected by PHP version changes. No PHP migration action needed, but note:
- If upgrading Sage to use Bud instead of Mix, that is a separate frontend build migration
- The PHP migration and build tool migration can be done independently
