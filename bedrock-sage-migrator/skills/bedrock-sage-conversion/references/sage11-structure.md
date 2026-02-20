# Sage 11 / Acorn 5 Theme Structure

Reference for creating and understanding a Sage 11 theme within Bedrock.

## Create Sage Theme

```bash
cd <bedrock-path>/web/app/themes/
composer create-project roots/sage <theme-name>
cd <theme-name>
npm install
```

## Directory Layout

```
<theme-name>/
├── app/
│   ├── Providers/
│   │   └── ThemeServiceProvider.php   # Main service provider
│   ├── View/
│   │   └── Composers/                # View Composer classes
│   │       └── App.php               # Default app-wide composer
│   ├── setup.php                     # Theme setup, menus, sidebars, enqueues
│   └── filters.php                   # WordPress filter hooks
├── config/                           # Optional Acorn config overrides
├── public/
│   └── build/                        # Vite output (generated, gitignored)
│       └── manifest.json
├── resources/
│   ├── css/
│   │   ├── app.css                   # Primary stylesheet entry
│   │   └── editor.css                # Block editor styles
│   ├── js/
│   │   ├── app.js                    # Primary JS entry
│   │   └── editor.js                 # Block editor JS
│   ├── images/                       # Static images (copied to public/)
│   ├── fonts/                        # Custom fonts (copied to public/)
│   └── views/
│       ├── layouts/
│       │   └── app.blade.php         # Base layout
│       ├── partials/
│       │   ├── header.blade.php
│       │   ├── footer.blade.php
│       │   ├── sidebar.blade.php
│       │   └── flexible/             # ACF flexible content partials
│       ├── components/               # Blade components
│       ├── 404.blade.php
│       ├── index.blade.php
│       ├── page.blade.php
│       ├── search.blade.php
│       ├── single.blade.php
│       └── ...
├── storage/                          # Cache, logs (generated)
├── functions.php                     # Acorn 5 bootstrap
├── index.php                         # WordPress fallback (required, don't edit)
├── style.css                         # Theme metadata only (no actual CSS)
├── screenshot.png
├── vite.config.js
├── package.json
├── composer.json
└── tailwind.config.js                # Only if using Tailwind
```

## Acorn 5 Bootstrap (functions.php)

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

**IMPORTANT:** The old `\Roots\bootloader()` from Acorn 4 is deprecated. Always use `Application::configure()`.

## ThemeServiceProvider

```php
<?php

namespace App\Providers;

use Roots\Acorn\Sage\SageServiceProvider;

class ThemeServiceProvider extends SageServiceProvider
{
    public function register(): void
    {
        parent::register();

        // Bind services to the container
    }

    public function boot(): void
    {
        parent::boot();

        // Register view composers
        // Register Blade directives
        // Add WordPress hooks
    }
}
```

**MUST call `parent::register()` and `parent::boot()`** — failure causes "Target class [sage.view] does not exist" errors.

## app/setup.php — Theme Configuration

```php
<?php

namespace App;

use Illuminate\Support\Facades\Vite;

// Theme supports
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', [
        'caption', 'comment-form', 'comment-list', 'gallery', 'search-form',
    ]);

    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
        'footer_navigation'  => __('Footer Navigation', 'sage'),
    ]);

    add_image_size('hero', 1920, 800, true);
});

// Editor styles via Vite
add_filter('block_editor_settings_all', function ($settings) {
    $settings['styles'][] = [
        'css' => Vite::asset('resources/css/editor.css'),
    ];
    return $settings;
});

// Widget areas
add_action('widgets_init', function () {
    register_sidebar([
        'name'          => 'Primary Sidebar',
        'id'            => 'sidebar-primary',
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ]);
});
```

## app/filters.php — WordPress Filters

```php
<?php

namespace App;

// Excerpt length
add_filter('excerpt_length', fn () => 40);

// Body class
add_filter('body_class', function (array $classes): array {
    if (is_single() || is_page() && !is_front_page()) {
        $classes[] = basename(get_permalink());
    }
    return $classes;
});
```

## composer.json (theme)

```json
{
  "name": "roots/sage",
  "type": "wordpress-theme",
  "require": {
    "php": ">=8.2",
    "roots/acorn": "^5.0"
  },
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    },
    "files": [
      "app/setup.php",
      "app/filters.php"
    ]
  }
}
```

## Custom Directories for Migration

When converting a classic theme, create these additional directories:

```
app/
├── PostTypes/          # Custom post type registration classes
├── Taxonomies/         # Custom taxonomy registration classes
├── Ajax/               # AJAX handler classes
└── helpers.php         # Utility functions (loaded via Composer autoload files)
```

Add to composer.json autoload:
```json
{
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    },
    "files": [
      "app/setup.php",
      "app/filters.php",
      "app/helpers.php"
    ]
  }
}
```

## Template Resolution

Sage overrides WordPress template hierarchy to use Blade views in `resources/views/`:

| WordPress looks for | Sage resolves to |
|---|---|
| page.php | resources/views/page.blade.php |
| single.php | resources/views/single.blade.php |
| single-{post_type}.php | resources/views/single-{post_type}.blade.php |
| archive.php | resources/views/archive.blade.php |
| archive-{post_type}.php | resources/views/archive-{post_type}.blade.php |
| taxonomy-{taxonomy}.php | resources/views/taxonomy-{taxonomy}.blade.php |
| front-page.php | resources/views/front-page.blade.php |
| home.php | resources/views/home.blade.php |
| search.php | resources/views/search.blade.php |
| 404.php | resources/views/404.blade.php |
| index.php | resources/views/index.blade.php |
