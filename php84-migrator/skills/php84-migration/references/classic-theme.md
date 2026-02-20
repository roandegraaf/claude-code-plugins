# Classic WordPress Theme Migration Patterns

Reference for migrating classic (non-Bedrock) WordPress themes from PHP 7.4 to 8.4.

## Classic Theme Structure

Classic WordPress themes live directly in `wp-content/themes/<theme-name>/` (or a custom path) with this typical layout:

```
theme-root/
  style.css              ← Theme metadata (Theme Name, Version, etc.)
  functions.php          ← Entry point: hooks, includes, theme setup
  includes/              ← Custom post types, helpers, widgets, AJAX handlers
  flexible-content/      ← ACF flexible content template parts
  flexible-post-content/ ← ACF flexible content for post types
  partials/              ← Reusable template fragments
  template-parts/        ← WordPress-standard template parts
  templates/             ← Page templates
  acf-json/              ← ACF field group exports (if ACF is used)
  assets/                ← Compiled CSS/JS (or src/ for source)
  node_modules/          ← npm dependencies (skip scanning)
  vendor/                ← Composer dependencies if present (skip scanning)
  gulpfile.js            ← Gulp build config (common in older themes)
  package.json           ← npm config
  composer.json          ← Optional Composer config
  *.php                  ← Root-level template files (header, footer, single, archive, etc.)
```

### Root-Level Template Files

Classic themes place template files at the root:

| File Pattern | Purpose |
|---|---|
| `header.php`, `footer.php`, `sidebar.php` | Structural partials |
| `index.php`, `home.php`, `front-page.php` | Homepage/index templates |
| `single.php`, `single-*.php` | Single post/CPT templates |
| `archive.php`, `archive-*.php` | Archive templates |
| `taxonomy-*.php` | Taxonomy archive templates |
| `page.php`, `page-*.php` | Page templates |
| `category.php`, `tag.php` | Category/tag archives |
| `search.php`, `404.php` | Search results and not found |
| `functions.php` | Theme setup, hooks, includes |

### Key Differences from Bedrock/Sage

| Aspect | Classic Theme | Bedrock/Sage |
|---|---|---|
| PHP templates | Inline PHP in `.php` files | Blade `.blade.php` templates |
| ACF data flow | `get_field()` at point of use | `get_field()` in `with()`, passed to Blade |
| Fix location | Fix at point of use in each template | Fix at `with()` boundary |
| Composer | Optional (may not exist) | Required (manages WP + plugins) |
| Build tool | Gulp, Grunt, or plain npm | Bud (Sage 10) or Mix (Sage 9) |
| Plugin management | Manual or wp-admin | Composer via wpackagist |
| Directory structure | Flat root + includes/ | `app/` + `resources/` |

## ACF Patterns in Classic Themes

### Direct Template Pattern

In classic themes, ACF fields are accessed directly in template files — there is no `with()` boundary. Fix at point of use:

```php
// BEFORE — in a template file like flexible-content/hero.php
$title = get_field('title');
$description = get_field('description');
$image = get_field('image');
$items = get_field('items');

echo '<h1>' . strtolower($title) . '</h1>';           // TypeError if null
echo '<p>' . $description . '</p>';                     // Deprecation (concatenation is actually safe, but trim/strlen aren't)
echo wp_get_attachment_image_url($image, 'large');      // null passed to int param
foreach ($items as $item) { /* ... */ }                 // TypeError on null

// AFTER — fix at point of use
$title = get_field('title') ?? '';
$description = get_field('description') ?? '';
$image = get_field('image');
$items = get_field('items') ?: [];

echo '<h1>' . strtolower($title) . '</h1>';
echo '<p>' . $description . '</p>';
if ($image) {
    echo wp_get_attachment_image_url($image, 'large');
}
foreach ($items as $item) { /* ... */ }
```

### the_field() vs get_field()

`the_field()` echoes the value directly — it does NOT pass the value to a PHP function, so it is generally safe from null-to-non-nullable deprecations. However, `the_sub_field()` has the same safety profile.

```php
// SAFE — the_field() echoes directly, no null parameter issue
the_field('title');
the_sub_field('caption');

// UNSAFE — get_field() return value used in functions
strtolower(get_field('title'));          // Fix: strtolower(get_field('title') ?? '')
strlen(get_sub_field('caption'));        // Fix: strlen(get_sub_field('caption') ?? '')
```

### the_sub_field() vs get_sub_field()

Inside `have_rows()` loops:
- `the_sub_field('name')` — echoes directly, safe from null-to-non-nullable
- `get_sub_field('name')` — returns value, needs null coalescing when passed to functions

```php
if (have_rows('slides')) {
    while (have_rows('slides')) {
        the_row();
        // SAFE — echoes directly
        the_sub_field('caption');

        // NEEDS FIX — return value passed to function
        $caption = get_sub_field('caption') ?? '';
        echo strtolower($caption);
    }
}
```

## Superglobal Access Patterns

Classic themes commonly access `$_POST`, `$_GET`, `$_REQUEST` directly in AJAX handlers and form processors (typically in `includes/` files):

```php
// BEFORE — common in AJAX handler files
$action = $_POST['action'];                    // Undefined index if missing
$nonce = $_POST['nonce'];                      // Same risk
$value = isset($_GET['filter']) ? $_GET['filter'] : '';  // Verbose

// AFTER
$action = $_POST['action'] ?? '';
$nonce = $_POST['nonce'] ?? '';
$value = $_GET['filter'] ?? '';
```

Also guard `$_SERVER` access:

```php
// BEFORE
$request_uri = $_SERVER['REQUEST_URI'];
// AFTER
$request_uri = $_SERVER['REQUEST_URI'] ?? '';
```

## Dynamic Properties on WordPress Objects

WordPress core objects like `WP_Post` and `WP_Term` use `__get()` magic methods for custom field access (e.g., `$post->custom_field`). These are NOT dynamic properties — they go through `__get()` and are safe on PHP 8.2+.

However, custom classes in the theme that set undeclared properties ARE affected:

```php
// SAFE — WP_Post uses __get() magic method
$post->custom_meta_key;

// UNSAFE — custom class without property declaration (deprecated 8.2, Error in 9.0)
class ThemeHelper {
    // Missing: public $cache;
    public function init() {
        $this->cache = [];  // Dynamic property!
    }
}

// FIX — declare the property
class ThemeHelper {
    public array $cache = [];
    public function init() {
        $this->cache = [];
    }
}
```

## No-Composer Sites

When a theme has no `composer.json`:
- Skip all Composer-related steps (dependency upgrade, `composer update`, `composer install`)
- Plugin compatibility must be verified manually:
  1. Check active plugins via `wp-admin` or `wp-content/plugins/`
  2. For each plugin, check the WordPress.org page for "Tested up to" PHP version
  3. Focus on ACF Pro — version 6.0+ supports PHP 8.x; older versions may need updating
  4. Flag any plugins that haven't been updated in 12+ months as potential risks
- WordPress core: ensure the site runs WordPress 6.2+ (first version with full PHP 8.2 support)

## Build Tools

### Gulp (most common in classic themes)

```bash
# Verify Gulp works after PHP changes (PHP changes shouldn't affect Gulp, but verify assets)
npx gulp          # or: gulp (if globally installed)
npx gulp build    # production build variant
```

Gulp builds CSS/JS and is not affected by PHP version changes. Run it to verify asset pipeline still works after migration.

### npm scripts

```bash
# Check package.json for build scripts
npm run build
npm run production
```

### No build tool

Some classic themes have no build pipeline — pre-compiled assets committed directly. No build verification needed.

## Recommended Scan Order for Classic Themes

1. `functions.php` — entry point, includes, hooks
2. `includes/**/*.php` — CPTs, helpers, AJAX handlers, widgets
3. Root templates: `header.php`, `footer.php`, `sidebar.php`
4. Root templates: `index.php`, `home.php`, `front-page.php`, `404.php`, `search.php`
5. Root templates: `single*.php`, `archive*.php`, `taxonomy*.php`, `page*.php`, `category.php`, `tag.php`
6. `flexible-content/**/*.php` — ACF flexible content parts
7. `flexible-post-content/**/*.php` — ACF flexible content for CPTs
8. `partials/**/*.php`, `template-parts/**/*.php`, `templates/**/*.php`
9. Any other discovered PHP directories
