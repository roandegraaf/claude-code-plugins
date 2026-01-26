# Theme Architecture

## Directory Structure

```
web/app/themes/{theme-name}/
├── app/
│   ├── Blocks/                        # ACF Block PHP classes
│   │   ├── BaseBlock.php              # Abstract base class
│   │   ├── Header.php
│   │   ├── Text.php
│   │   ├── TextImage.php
│   │   └── ...
│   ├── View/Composers/                # View composers for data
│   │   └── App.php
│   ├── Traits/                        # Reusable traits
│   │   └── AcfBlockIcon.php
│   ├── Helpers/                       # Helper utilities
│   ├── Providers/                     # Service providers
│   │   └── ThemeServiceProvider.php
│   ├── Walkers/                       # Custom WordPress walkers
│   ├── setup.php                      # Theme setup & registration
│   ├── filters.php                    # WordPress filters
│   └── helpers.php                    # Helper functions
├── resources/
│   ├── views/
│   │   ├── blocks/                    # Block Blade templates
│   │   │   ├── header.blade.php
│   │   │   ├── text.blade.php
│   │   │   └── ...
│   │   ├── components/                # Reusable Blade components
│   │   │   ├── section.blade.php      # Section wrapper
│   │   │   └── content/               # Content components
│   │   │       ├── subtitle.blade.php
│   │   │       ├── title.blade.php
│   │   │       ├── text.blade.php
│   │   │       ├── buttons.blade.php
│   │   │       └── media.blade.php
│   │   ├── layouts/                   # Layout templates
│   │   │   └── app.blade.php
│   │   ├── partials/                  # Template parts
│   │   └── sections/                  # Header, footer
│   │       ├── header.blade.php
│   │       └── footer.blade.php
│   ├── css/
│   │   ├── app.css                    # Main stylesheet
│   │   └── editor.css                 # Block editor styles
│   ├── js/
│   │   ├── app.js                     # Main JavaScript
│   │   └── editor.js                  # Block editor JavaScript
│   ├── images/                        # Image assets
│   ├── svg/                           # SVG icons
│   ├── fonts/                         # Font files
│   └── posttypes/                     # Custom post type definitions
├── config/
│   └── blade-icons.php                # Icon configuration
├── acf-json/                          # ACF field definitions (version controlled)
├── public/                            # Compiled assets output
└── vite.config.js                     # Vite build configuration
```

## Service Providers

Located in `app/Providers/`, extend `Roots\Acorn\ServiceProvider`:

```php
<?php

namespace App\Providers;

use Roots\Acorn\ServiceProvider;

class ThemeServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind services to container
        $this->app->bind('example', function () {
            return new \App\Services\Example();
        });
    }

    public function boot()
    {
        // Code runs after all services registered
        // Register Livewire components, etc.
    }
}
```

## View Composers

Located in `app/View/Composers/`, prepare data for views:

```php
<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class App extends Composer
{
    protected static $views = [
        '*',  // All views
    ];

    public function with()
    {
        return [
            'siteName' => get_bloginfo('name'),
        ];
    }
}
```

## Theme Setup (`app/setup.php`)

Register theme features:

```php
<?php

namespace App;

use function Roots\asset;

// Register navigation menus
add_action('after_setup_theme', function () {
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'av'),
        'footer_navigation' => __('Footer Navigation', 'av'),
    ]);
});

// Register stylesheets and scripts
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('av/app.js', asset('js/app.js')->uri(), ['jquery'], null, true);
    wp_enqueue_style('av/app.css', asset('css/app.css')->uri(), false, null);
}, 100);

// Define image sizes
add_action('after_setup_theme', function () {
    add_image_size('card', 400, 300, true);
    add_image_size('hero', 1920, 1080, true);
});
```

## Custom Post Types

Register in `app/setup.php` or separate files:

```php
add_action('init', function () {
    register_post_type('service', [
        'labels' => [
            'name' => __('Services', 'av'),
            'singular_name' => __('Service', 'av'),
        ],
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => ['title', 'editor', 'thumbnail'],
        'rewrite' => ['slug' => 'diensten'],
    ]);
});
```

## Vite Configuration

```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin'
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';

export default defineConfig({
  base: '/app/themes/{theme-name}/public/build/',
  esbuild: {
    jsxFactory: 'wp.element.createElement',
    jsxFragment: 'wp.element.Fragment',
  },
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
    })
  ],
  resolve: {
    alias: {
      '@scripts': '/resources/js',
      '@styles': '/resources/css',
      '@fonts': '/resources/fonts',
      '@images': '/resources/images',
    },
  },
})
```

## Asset Usage in Blade

```blade
{{-- Images --}}
<img src="@asset('images/logo.svg')" alt="Logo">

{{-- Background images --}}
<div style="background-image: url('@asset('images/hero.jpg')')">
