# Classic Theme → Sage 11 Template Mapping

Complete mapping of classic WordPress theme files to their Sage 11 equivalents.

## Layout Files

| Classic File | Sage 11 Location | Notes |
|---|---|---|
| header.php | resources/views/layouts/app.blade.php (top half) | Combined into base layout |
| footer.php | resources/views/layouts/app.blade.php (bottom half) | Combined into base layout |
| sidebar.php | resources/views/partials/sidebar.blade.php | Becomes an @include partial |

### Layout Conversion

Classic themes split the HTML document across header.php + footer.php. In Sage, these merge into a single layout file:

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html {!! get_language_attributes() !!}>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php(wp_head())
</head>
<body @php(body_class())>
    @php(wp_body_open())

    @include('partials.header')

    <main>
        @yield('content')
    </main>

    @include('partials.footer')

    @php(wp_footer())
</body>
</html>
```

The content from header.php (navigation, logo, etc.) goes into partials/header.blade.php.
The content from footer.php (footer widgets, copyright, etc.) goes into partials/footer.blade.php.

## Template Hierarchy Files

| Classic File | Sage 11 View | View Name (dot notation) |
|---|---|---|
| index.php | resources/views/index.blade.php | index |
| home.php | resources/views/home.blade.php | home |
| front-page.php | resources/views/front-page.blade.php | front-page |
| single.php | resources/views/single.blade.php | single |
| single-{cpt}.php | resources/views/single-{cpt}.blade.php | single-{cpt} |
| page.php | resources/views/page.blade.php | page |
| archive.php | resources/views/archive.blade.php | archive |
| archive-{cpt}.php | resources/views/archive-{cpt}.blade.php | archive-{cpt} |
| taxonomy-{tax}.php | resources/views/taxonomy-{tax}.blade.php | taxonomy-{tax} |
| category.php | resources/views/category.blade.php | category |
| tag.php | resources/views/tag.blade.php | tag |
| search.php | resources/views/search.blade.php | search |
| 404.php | resources/views/404.blade.php | 404 |
| author.php | resources/views/author.blade.php | author |
| date.php | resources/views/date.blade.php | date |

All template views use `@extends('layouts.app')` and `@section('content')`.

## Page Templates

| Classic File | Sage 11 View | Registration |
|---|---|---|
| templates/full-width.php | resources/views/template-full-width.blade.php | `Template Name:` comment in Blade |
| page-contact.php | resources/views/page-contact.blade.php | Auto-resolved by slug |
| page-about.php | resources/views/page-about.blade.php | Auto-resolved by slug |

Page templates in Sage use Blade comments for registration:

```blade
{{--
  Template Name: Full Width
--}}

@extends('layouts.app')

@section('content')
    @while (have_posts()) @php(the_post())
        {!! get_the_content() !!}
    @endwhile
@endsection
```

## Partial / Include Files

| Classic File | Sage 11 View | Include Syntax |
|---|---|---|
| partials/*.php | resources/views/partials/*.blade.php | @include('partials.name') |
| template-parts/*.php | resources/views/partials/*.blade.php | @include('partials.name') |

## ACF Flexible Content

| Classic File | Sage 11 View | Include Syntax |
|---|---|---|
| flexible-content/*.php | resources/views/partials/flexible/*.blade.php | @includeIf('partials.flexible.layout-name') |
| flexible-post-content/*.php | resources/views/partials/flexible-post/*.blade.php | @includeIf('partials.flexible-post.layout-name') |

### Flexible Content Loader

```php
// Classic: typically in page.php or a template
<?php if (have_rows('content_blocks')) : ?>
    <?php while (have_rows('content_blocks')) : the_row(); ?>
        <?php get_template_part('flexible-content/' . get_row_layout()); ?>
    <?php endwhile; ?>
<?php endif; ?>

// Sage: in a Blade view
@if (have_rows('content_blocks'))
    @while (have_rows('content_blocks')) @php(the_row())
        @includeIf('partials.flexible.' . get_row_layout())
    @endwhile
@endif
```

## Includes Directory → app/ Classes

| Classic File | Sage 11 Location | Pattern |
|---|---|---|
| includes/post-types.php | app/PostTypes/*.php | Class per CPT |
| includes/taxonomies.php | app/Taxonomies/*.php | Class per taxonomy |
| includes/ajax-handlers.php | app/Ajax/*.php | Class per handler group |
| includes/helpers.php | app/helpers.php | Autoloaded via Composer |
| includes/widgets/*.php | app/Widgets/*.php | Class per widget |
| includes/shortcodes.php | app/Shortcodes/*.php | Class per shortcode |
| includes/walkers/*.php | app/Walkers/*.php | Class per walker |

## ACF JSON

| Classic Location | Sage 11 Location |
|---|---|
| acf-json/ | acf-json/ (same, at theme root) |

Copy directly — no path changes needed. ACF looks for `acf-json/` relative to the theme root.

## Assets

| Classic Location | Sage 11 Location |
|---|---|
| assets/scss/ or src/scss/ | resources/css/ |
| assets/js/ or src/js/ | resources/js/ |
| assets/images/ or images/ | resources/images/ |
| assets/fonts/ or fonts/ | resources/fonts/ |
| assets/svg/ or svg/ | resources/images/ (or resources/svg/) |
| dist/ or build/ | public/build/ (generated by Vite) |

## functions.php → Multiple Files

| Classic functions.php Section | Sage 11 Location |
|---|---|
| Theme setup (add_theme_support) | app/setup.php |
| Menu registration | app/setup.php |
| Widget areas | app/setup.php |
| Script/style enqueues | app/setup.php (via @vite) |
| Filter hooks | app/filters.php |
| CPT registration | app/PostTypes/ |
| Taxonomy registration | app/Taxonomies/ |
| AJAX handlers | app/Ajax/ |
| Helper functions | app/helpers.php |
| ACF options pages | ThemeServiceProvider::boot() |
| Custom image sizes | app/setup.php |
| View Composers (new) | app/View/Composers/ |
