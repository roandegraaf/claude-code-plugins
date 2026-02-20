# PHP Template → Blade Conversion Patterns

Reference for converting classic WordPress PHP templates to Sage 11 Blade views.

## Basic Syntax Conversion

### Echo / Output

```php
// Classic PHP
<?php echo $title; ?>
<?php echo esc_html($title); ?>
<?= $title ?>
<?= esc_html($title) ?>

// Blade — escaped (equivalent to esc_html)
{{ $title }}

// Blade — unescaped (for trusted HTML like the_content, wp_nav_menu)
{!! $title !!}
```

**Rule:** Use `{{ }}` by default (auto-escapes). Use `{!! !!}` only for HTML that must render (content, menus, widget output).

### Conditionals

```php
// Classic PHP
<?php if ($condition) : ?>
    <p>Content</p>
<?php elseif ($other) : ?>
    <p>Other</p>
<?php else : ?>
    <p>Default</p>
<?php endif; ?>

// Blade
@if ($condition)
    <p>Content</p>
@elseif ($other)
    <p>Other</p>
@else
    <p>Default</p>
@endif
```

### Loops

```php
// Classic PHP — WordPress Loop
<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
        <h2><?php the_title(); ?></h2>
    <?php endwhile; ?>
<?php else : ?>
    <p>No posts found.</p>
<?php endif; ?>

// Blade
@if (have_posts())
    @while (have_posts()) @php(the_post())
        <h2>{{ get_the_title() }}</h2>
    @endwhile
@else
    <p>No posts found.</p>
@endif
```

### foreach

```php
// Classic PHP
<?php foreach ($items as $item) : ?>
    <div><?php echo $item['label']; ?></div>
<?php endforeach; ?>

// Blade
@foreach ($items as $item)
    <div>{{ $item['label'] ?? '' }}</div>
@endforeach

// Blade with empty check
@forelse ($items as $item)
    <div>{{ $item['label'] ?? '' }}</div>
@empty
    <p>No items found.</p>
@endforelse
```

## WordPress-Specific Conversions

### get_header() / get_footer() → Layout System

```php
// Classic: each template calls get_header() and get_footer()
<?php get_header(); ?>
<main>
    <h1><?php the_title(); ?></h1>
    <?php the_content(); ?>
</main>
<?php get_footer(); ?>

// Sage: templates extend a layout instead
// resources/views/layouts/app.blade.php contains header + footer
// resources/views/page.blade.php:
@extends('layouts.app')

@section('content')
    <article @php(post_class())>
        <h1>{{ get_the_title() }}</h1>
        <div>{!! get_the_content() !!}</div>
    </article>
@endsection
```

### get_template_part() → @include

```php
// Classic PHP
<?php get_template_part('partials/card'); ?>
<?php get_template_part('partials/card', 'featured'); ?>
<?php get_template_part('flexible-content/hero'); ?>

// Blade
@include('partials.card')
@include('partials.card-featured')
@include('partials.flexible.hero')
```

### get_template_part() with variables (WP 5.5+)

```php
// Classic PHP (WP 5.5+)
<?php get_template_part('partials/card', null, ['title' => $title, 'image' => $image]); ?>

// In partials/card.php:
<?php echo $args['title']; ?>

// Blade — pass data via @include
@include('partials.card', ['title' => $title, 'image' => $image])

// In partials/card.blade.php:
{{ $title }}
```

### the_field() / the_sub_field() → Blade Output

```php
// Classic PHP — the_field echoes directly
<?php the_field('title'); ?>
<?php the_field('description'); ?>

// Blade — use View Composer to pass data, then echo
{{ $title }}
{!! $description !!}

// Or if accessing ACF directly in Blade (simpler but less clean):
{{ get_field('title') ?? '' }}
{!! get_field('description') ?? '' !!}
```

### ACF have_rows() Loop

```php
// Classic PHP
<?php if (have_rows('slides')) : ?>
    <?php while (have_rows('slides')) : the_row(); ?>
        <div class="slide">
            <h3><?php the_sub_field('title'); ?></h3>
            <?php $image = get_sub_field('image'); ?>
            <?php if ($image) : ?>
                <img src="<?php echo wp_get_attachment_image_url($image, 'large'); ?>">
            <?php endif; ?>
        </div>
    <?php endwhile; ?>
<?php endif; ?>

// Blade — with View Composer providing $slides as array
@foreach ($slides as $slide)
    <div class="slide">
        <h3>{{ $slide['title'] ?? '' }}</h3>
        @if ($slide['image'])
            <img src="{{ wp_get_attachment_image_url($slide['image'], 'large') }}">
        @endif
    </div>
@endforeach
```

### ACF Flexible Content

```php
// Classic PHP — flexible content loader
<?php if (have_rows('content_blocks')) : ?>
    <?php while (have_rows('content_blocks')) : the_row(); ?>
        <?php get_template_part('flexible-content/' . get_row_layout()); ?>
    <?php endwhile; ?>
<?php endif; ?>

// Blade — dynamic include based on layout name
@if (have_rows('content_blocks'))
    @while (have_rows('content_blocks')) @php(the_row())
        @includeIf('partials.flexible.' . get_row_layout())
    @endwhile
@endif
```

### wp_nav_menu()

```php
// Classic PHP
<?php wp_nav_menu(['theme_location' => 'primary_navigation', 'container' => false]); ?>

// Blade — unescaped because it outputs HTML
{!! wp_nav_menu(['theme_location' => 'primary_navigation', 'container' => false, 'echo' => false]) !!}
```

Note: `echo => false` makes wp_nav_menu return the HTML instead of echoing it.

### dynamic_sidebar()

```php
// Classic PHP
<?php dynamic_sidebar('sidebar-primary'); ?>

// Blade
@php(dynamic_sidebar('sidebar-primary'))
```

### Inline PHP Blocks

```php
// Classic PHP — complex logic block
<?php
$query = new WP_Query(['post_type' => 'project', 'posts_per_page' => 6]);
$total = $query->found_posts;
$classes = ['grid'];
if ($total > 3) {
    $classes[] = 'grid-cols-3';
}
?>

// Blade
@php
    $query = new WP_Query(['post_type' => 'project', 'posts_per_page' => 6]);
    $total = $query->found_posts;
    $classes = ['grid'];
    if ($total > 3) {
        $classes[] = 'grid-cols-3';
    }
@endphp
```

**Better approach:** Move complex logic to a View Composer and pass only the needed data to the template.

## WordPress Functions in Blade

### Functions that echo (use @php())

```blade
@php(the_post_thumbnail('large'))
@php(wp_head())
@php(wp_footer())
@php(wp_body_open())
@php(body_class())
@php(post_class())
@php(language_attributes())
@php(the_content())
@php(the_excerpt())
```

### Functions that return (use {{ }} or {!! !!})

```blade
{{ get_the_title() }}
{{ get_the_date() }}
{{ get_the_author() }}
{{ get_permalink() }}
{{ get_post_type() }}
{{ home_url('/') }}
{{ get_bloginfo('name') }}
{!! get_the_content() !!}
{!! get_the_excerpt() !!}
{!! get_search_form(false) !!}
{!! wp_get_attachment_image($id, 'large') !!}
```

### Functions with HTML output (use {!! !!})

```blade
{!! get_language_attributes() !!}
{!! wp_nav_menu(['theme_location' => 'primary', 'echo' => false]) !!}
{!! paginate_links() !!}
{!! get_the_post_navigation() !!}
```

## Complete Template Conversion Example

### Classic: single.php

```php
<?php get_header(); ?>
<main>
    <?php while (have_posts()) : the_post(); ?>
        <article <?php post_class(); ?>>
            <h1><?php the_title(); ?></h1>
            <div class="meta">
                <time><?php echo get_the_date(); ?></time>
                <span><?php echo get_the_author(); ?></span>
            </div>
            <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('large'); ?>
            <?php endif; ?>
            <div class="content">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; ?>
</main>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
```

### Sage: resources/views/single.blade.php

```blade
@extends('layouts.app')

@section('content')
    @while (have_posts()) @php(the_post())
        <article @php(post_class())>
            <h1>{{ get_the_title() }}</h1>
            <div class="meta">
                <time>{{ get_the_date() }}</time>
                <span>{{ get_the_author() }}</span>
            </div>
            @if (has_post_thumbnail())
                {!! get_the_post_thumbnail(null, 'large') !!}
            @endif
            <div class="content">
                {!! get_the_content() !!}
            </div>
        </article>
    @endwhile
@endsection

@section('sidebar')
    @include('partials.sidebar')
@endsection
```
