# functions.php Decomposition Reference

Reference for splitting a classic theme's functions.php into Sage 11's modular structure.

## Overview

Classic themes put everything in functions.php (or includes via require). Sage 11 decomposes this into:

| Concern | Sage 11 Location | How It's Loaded |
|---|---|---|
| Acorn bootstrap | functions.php | WordPress theme loading |
| Theme supports, menus, sidebars, image sizes | app/setup.php | Composer autoload (files) |
| Filter hooks | app/filters.php | Composer autoload (files) |
| Custom post types | app/PostTypes/ | PSR-4 autoload, registered in ThemeServiceProvider |
| Custom taxonomies | app/Taxonomies/ | PSR-4 autoload, registered in ThemeServiceProvider |
| AJAX handlers | app/Ajax/ | PSR-4 autoload, registered in ThemeServiceProvider |
| Helper functions | app/helpers.php | Composer autoload (files) |
| ACF options pages | ThemeServiceProvider::boot() | Service provider |
| View Composers | app/View/Composers/ | Registered in ThemeServiceProvider |

## functions.php → app/setup.php

### Theme Setup

```php
// Classic functions.php
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);
    add_theme_support('customize-selective-refresh-widgets');

    register_nav_menus([
        'primary' => 'Primary Menu',
        'footer'  => 'Footer Menu',
    ]);

    add_image_size('hero', 1920, 800, true);
    add_image_size('card', 400, 300, true);
});

// Sage 11 app/setup.php — same code, different file
<?php

namespace App;

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
        'footer_navigation'  => __('Footer Navigation', 'sage'),
    ]);

    add_image_size('hero', 1920, 800, true);
    add_image_size('card', 400, 300, true);
});
```

### Script/Style Enqueues → Vite

```php
// Classic functions.php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('theme-style', get_stylesheet_directory_uri() . '/dist/css/app.css', [], '1.0');
    wp_enqueue_script('theme-script', get_stylesheet_directory_uri() . '/dist/js/app.js', ['jquery'], '1.0', true);
    wp_localize_script('theme-script', 'ajax_object', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('ajax_nonce'),
    ]);
});

// Sage 11 — assets handled by @vite directive in layouts/app.blade.php
// wp_localize_script equivalent in app/setup.php:

add_action('wp_enqueue_scripts', function () {
    // Vite handles CSS/JS loading via @vite directive
    // For AJAX/localized data, use wp_add_inline_script or a global data approach:
    wp_register_script('sage-app', false);
    wp_enqueue_script('sage-app');
    wp_localize_script('sage-app', 'ajax_object', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('ajax_nonce'),
    ]);
});
```

### Widget Areas

```php
// Classic functions.php
add_action('widgets_init', function () {
    register_sidebar([
        'name'          => 'Primary Sidebar',
        'id'            => 'sidebar-primary',
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ]);
    register_sidebar([
        'name'          => 'Footer Widgets',
        'id'            => 'sidebar-footer',
        'before_widget' => '<div class="widget %1$s %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4>',
        'after_title'   => '</h4>',
    ]);
});

// Sage 11 app/setup.php — same, just in the new file
add_action('widgets_init', function () {
    register_sidebar([
        'name'          => 'Primary Sidebar',
        'id'            => 'sidebar-primary',
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ]);
    register_sidebar([
        'name'          => 'Footer Widgets',
        'id'            => 'sidebar-footer',
        'before_widget' => '<div class="widget %1$s %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4>',
        'after_title'   => '</h4>',
    ]);
});
```

## functions.php → app/filters.php

```php
// Classic functions.php — filter hooks scattered throughout
add_filter('excerpt_length', fn () => 40);
add_filter('excerpt_more', fn () => '...');
add_filter('body_class', function ($classes) {
    $layout = get_field('page_layout', 'option') ?? '';
    if ($layout) {
        $classes[] = 'layout-' . $layout;
    }
    return $classes;
});
add_filter('upload_mimes', function ($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
});

// Sage 11 app/filters.php — all filters collected here
<?php

namespace App;

add_filter('excerpt_length', fn () => 40);
add_filter('excerpt_more', fn () => '...');

add_filter('body_class', function (array $classes): array {
    $layout = get_field('page_layout', 'option') ?? '';
    if ($layout) {
        $classes[] = 'layout-' . $layout;
    }
    return $classes;
});

add_filter('upload_mimes', function (array $mimes): array {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
});
```

## Custom Post Types → app/PostTypes/

```php
// Classic: includes/post-types.php or functions.php
add_action('init', function () {
    register_post_type('project', [
        'label'       => 'Projects',
        'public'      => true,
        'has_archive' => true,
        'menu_icon'   => 'dashicons-portfolio',
        'supports'    => ['title', 'editor', 'thumbnail'],
        'rewrite'     => ['slug' => 'projects'],
    ]);
    register_post_type('team_member', [
        'label'       => 'Team Members',
        'public'      => true,
        'has_archive' => false,
        'menu_icon'   => 'dashicons-groups',
        'supports'    => ['title', 'thumbnail'],
        'rewrite'     => ['slug' => 'team'],
    ]);
});

// Sage 11: app/PostTypes/Project.php
<?php

namespace App\PostTypes;

class Project
{
    public static function register(): void
    {
        register_post_type('project', [
            'label'       => 'Projects',
            'public'      => true,
            'has_archive' => true,
            'menu_icon'   => 'dashicons-portfolio',
            'supports'    => ['title', 'editor', 'thumbnail'],
            'rewrite'     => ['slug' => 'projects'],
        ]);
    }
}

// Sage 11: app/PostTypes/TeamMember.php
<?php

namespace App\PostTypes;

class TeamMember
{
    public static function register(): void
    {
        register_post_type('team_member', [
            'label'       => 'Team Members',
            'public'      => true,
            'has_archive' => false,
            'menu_icon'   => 'dashicons-groups',
            'supports'    => ['title', 'thumbnail'],
            'rewrite'     => ['slug' => 'team'],
        ]);
    }
}

// Register in ThemeServiceProvider::boot()
public function boot(): void
{
    parent::boot();

    add_action('init', function () {
        \App\PostTypes\Project::register();
        \App\PostTypes\TeamMember::register();
    });
}
```

## Custom Taxonomies → app/Taxonomies/

```php
// Classic: includes/taxonomies.php
add_action('init', function () {
    register_taxonomy('project_category', 'project', [
        'label'        => 'Project Categories',
        'hierarchical' => true,
        'rewrite'      => ['slug' => 'project-category'],
    ]);
});

// Sage 11: app/Taxonomies/ProjectCategory.php
<?php

namespace App\Taxonomies;

class ProjectCategory
{
    public static function register(): void
    {
        register_taxonomy('project_category', 'project', [
            'label'        => 'Project Categories',
            'hierarchical' => true,
            'rewrite'      => ['slug' => 'project-category'],
        ]);
    }
}

// Register in ThemeServiceProvider::boot()
add_action('init', function () {
    \App\Taxonomies\ProjectCategory::register();
});
```

## AJAX Handlers → app/Ajax/

```php
// Classic: includes/ajax-handlers.php
add_action('wp_ajax_load_more_posts', 'handle_load_more');
add_action('wp_ajax_nopriv_load_more_posts', 'handle_load_more');
function handle_load_more() {
    check_ajax_referer('ajax_nonce', 'nonce');
    $page = intval($_POST['page'] ?? 1);
    $query = new WP_Query([
        'post_type'      => 'post',
        'paged'          => $page,
        'posts_per_page' => 6,
    ]);
    ob_start();
    while ($query->have_posts()) {
        $query->the_post();
        get_template_part('partials/card');
    }
    wp_reset_postdata();
    wp_send_json_success(['html' => ob_get_clean(), 'hasMore' => $page < $query->max_num_pages]);
}

// Sage 11: app/Ajax/LoadMorePosts.php
<?php

namespace App\Ajax;

use Illuminate\Support\Facades\Blade;

class LoadMorePosts
{
    public static function register(): void
    {
        add_action('wp_ajax_load_more_posts', [static::class, 'handle']);
        add_action('wp_ajax_nopriv_load_more_posts', [static::class, 'handle']);
    }

    public static function handle(): void
    {
        check_ajax_referer('ajax_nonce', 'nonce');

        $page = intval($_POST['page'] ?? 1);
        $query = new \WP_Query([
            'post_type'      => 'post',
            'paged'          => $page,
            'posts_per_page' => 6,
        ]);

        $html = '';
        while ($query->have_posts()) {
            $query->the_post();
            $html .= Blade::render('partials.card');
        }
        wp_reset_postdata();

        wp_send_json_success([
            'html'    => $html,
            'hasMore' => $page < $query->max_num_pages,
        ]);
    }
}

// Register in ThemeServiceProvider::boot()
\App\Ajax\LoadMorePosts::register();
```

## ACF Options Pages → ThemeServiceProvider

```php
// Classic: functions.php or includes/acf-options.php
if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title' => 'Theme Settings',
        'menu_title' => 'Theme Settings',
        'menu_slug'  => 'theme-settings',
        'capability' => 'edit_posts',
    ]);
    acf_add_options_sub_page([
        'page_title'  => 'Header Settings',
        'menu_title'  => 'Header',
        'parent_slug' => 'theme-settings',
    ]);
    acf_add_options_sub_page([
        'page_title'  => 'Footer Settings',
        'menu_title'  => 'Footer',
        'parent_slug' => 'theme-settings',
    ]);
}

// Sage 11: ThemeServiceProvider::boot()
public function boot(): void
{
    parent::boot();

    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Theme Settings',
            'menu_title' => 'Theme Settings',
            'menu_slug'  => 'theme-settings',
            'capability' => 'edit_posts',
        ]);
        acf_add_options_sub_page([
            'page_title'  => 'Header Settings',
            'menu_title'  => 'Header',
            'parent_slug' => 'theme-settings',
        ]);
        acf_add_options_sub_page([
            'page_title'  => 'Footer Settings',
            'menu_title'  => 'Footer',
            'parent_slug' => 'theme-settings',
        ]);
    }
}
```

## Helper Functions → app/helpers.php

```php
// Classic: includes/helpers.php or scattered in functions.php
function get_phone_number() {
    return get_field('phone_number', 'option') ?? '';
}
function get_site_logo_url() {
    $logo_id = get_field('site_logo', 'option');
    return $logo_id ? wp_get_attachment_image_url($logo_id, 'full') : '';
}
function format_price($amount) {
    return '€' . number_format($amount ?? 0, 2, ',', '.');
}

// Sage 11: app/helpers.php (loaded via Composer autoload files)
<?php

namespace App;

function get_phone_number(): string
{
    return get_field('phone_number', 'option') ?? '';
}

function get_site_logo_url(): string
{
    $logo_id = get_field('site_logo', 'option');
    return $logo_id ? wp_get_attachment_image_url($logo_id, 'full') : '';
}

function format_price(float $amount): string
{
    return '€' . number_format($amount, 2, ',', '.');
}
```

Note: Helper functions are namespaced under `App\`. Call them as `\App\get_phone_number()` in Blade or add `use function App\get_phone_number;` at the top.

## Decomposition Checklist

For each functions.php (or included file), categorize every hook/function:

- [ ] `add_theme_support()` calls → app/setup.php
- [ ] `register_nav_menus()` → app/setup.php
- [ ] `register_sidebar()` → app/setup.php
- [ ] `add_image_size()` → app/setup.php
- [ ] `wp_enqueue_style/script()` → @vite directive + app/setup.php for localize
- [ ] `add_filter()` calls → app/filters.php
- [ ] `register_post_type()` → app/PostTypes/ class
- [ ] `register_taxonomy()` → app/Taxonomies/ class
- [ ] `wp_ajax_*` handlers → app/Ajax/ class
- [ ] `acf_add_options_page()` → ThemeServiceProvider::boot()
- [ ] Helper/utility functions → app/helpers.php
- [ ] Widget classes → app/Widgets/ class
- [ ] Shortcode handlers → app/Shortcodes/ class
- [ ] Custom Walker classes → app/Walkers/ class
- [ ] `require`/`include` statements → Remove (Composer autoload handles it)
