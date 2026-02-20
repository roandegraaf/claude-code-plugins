# View Composers Reference

Reference for creating View Composers in Sage 11 to pass data from PHP to Blade templates.

## What Are View Composers?

View Composers are classes that bind data to specific Blade views. They replace the pattern of calling `get_field()` directly in templates, creating a clean boundary between data fetching and presentation.

## Composer Class Structure

```php
<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Hero extends Composer
{
    /**
     * Views this composer serves (dot notation, relative to resources/views/)
     */
    protected static $views = [
        'partials.flexible.hero',
    ];

    /**
     * Data to pass to the view
     */
    public function with(): array
    {
        return [
            'title'       => get_field('title') ?? '',
            'subtitle'    => get_field('subtitle') ?? '',
            'description' => get_field('description') ?? '',
            'image'       => get_field('background_image'),
            'cta'         => get_field('cta_link'),
            'features'    => get_field('features') ?: [],
            'is_dark'     => get_field('dark_mode') ?? false,
        ];
    }
}
```

## Registration in ThemeServiceProvider

```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Roots\Acorn\Sage\SageServiceProvider;

class ThemeServiceProvider extends SageServiceProvider
{
    public function register(): void
    {
        parent::register();
    }

    public function boot(): void
    {
        parent::boot();

        // Register View Composers
        View::composer(
            \App\View\Composers\Hero::views(),
            \App\View\Composers\Hero::class
        );

        View::composer(
            \App\View\Composers\Header::views(),
            \App\View\Composers\Header::class
        );

        // Register all composers from a directory (bulk registration)
        collect(glob(app_path('View/Composers/*.php')))
            ->map(fn ($file) => 'App\\View\\Composers\\' . basename($file, '.php'))
            ->filter(fn ($class) => class_exists($class) && is_subclass_of($class, \Roots\Acorn\View\Composer::class))
            ->each(fn ($class) => View::composer($class::views(), $class));
    }
}
```

## ACF Data in Composers — Type-Safe Defaults

Apply null coalescing at the Composer boundary to protect all downstream Blade usage:

```php
public function with(): array
{
    return [
        // String fields: ?? ''
        'title'       => get_field('title') ?? '',
        'description' => get_field('description') ?? '',
        'email'       => get_field('email') ?? '',
        'color'       => get_field('bg_color') ?? '',

        // Numeric fields: ?? 0
        'count'       => get_field('count') ?? 0,
        'price'       => get_field('price') ?? 0,

        // Boolean fields: ?? false
        'is_featured' => get_field('is_featured') ?? false,
        'show_cta'    => get_field('show_cta') ?? false,

        // Array/repeater fields: ?: []
        'items'       => get_field('items') ?: [],
        'slides'      => get_field('slides') ?: [],
        'gallery'     => get_field('gallery') ?: [],
        'related'     => get_field('related_posts') ?: [],

        // Complex fields: pass as-is, guard in template
        'image'       => get_field('image'),
        'link'        => get_field('cta_link'),
        'file'        => get_field('download_file'),
        'map'         => get_field('location_map'),
    ];
}
```

## Converting Classic Templates to Composers

### Before: Classic theme direct access

```php
// flexible-content/hero.php
$title = get_field('title');
$subtitle = get_field('subtitle');
$bg_image = get_field('background_image');
$cta = get_field('cta_link');
$features = get_field('features');
?>
<section class="hero">
    <h1><?php echo strtolower($title); ?></h1>
    <p><?php echo $subtitle; ?></p>
    <?php if ($bg_image) : ?>
        <?php echo wp_get_attachment_image($bg_image, 'full'); ?>
    <?php endif; ?>
    <?php if ($cta) : ?>
        <a href="<?php echo $cta['url']; ?>"><?php echo $cta['title']; ?></a>
    <?php endif; ?>
    <?php foreach ($features ?: [] as $feature) : ?>
        <div><?php echo $feature['label']; ?></div>
    <?php endforeach; ?>
</section>
```

### After: Composer + Blade view

**Composer** (`app/View/Composers/Hero.php`):
```php
<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Hero extends Composer
{
    protected static $views = ['partials.flexible.hero'];

    public function with(): array
    {
        return [
            'title'    => get_field('title') ?? '',
            'subtitle' => get_field('subtitle') ?? '',
            'image'    => get_field('background_image'),
            'cta'      => get_field('cta_link'),
            'features' => get_field('features') ?: [],
        ];
    }
}
```

**Blade view** (`resources/views/partials/flexible/hero.blade.php`):
```blade
<section class="hero">
    <h1>{{ strtolower($title) }}</h1>
    <p>{{ $subtitle }}</p>

    @if ($image)
        {!! wp_get_attachment_image($image, 'full') !!}
    @endif

    @if ($cta)
        <a href="{{ $cta['url'] }}">{{ $cta['title'] ?? '' }}</a>
    @endif

    @foreach ($features as $feature)
        <div>{{ $feature['label'] ?? '' }}</div>
    @endforeach
</section>
```

## Composer for Options Pages

```php
<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Header extends Composer
{
    protected static $views = ['partials.header'];

    public function with(): array
    {
        return [
            'logo'         => get_field('site_logo', 'option'),
            'phone'        => get_field('phone_number', 'option') ?? '',
            'email'        => get_field('email_address', 'option') ?? '',
            'social_links' => get_field('social_links', 'option') ?: [],
            'cta_button'   => get_field('header_cta', 'option'),
        ];
    }
}
```

## Composer for Archive Pages

```php
<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Archive extends Composer
{
    protected static $views = ['archive', 'archive-*'];

    public function with(): array
    {
        return [
            'title' => get_the_archive_title(),
            'description' => get_the_archive_description(),
        ];
    }
}
```

## Composer for Post Data

```php
<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Post extends Composer
{
    protected static $views = ['single', 'single-*', 'partials.post-card'];

    public function with(): array
    {
        return [
            'title'     => get_the_title(),
            'content'   => apply_filters('the_content', get_the_content()),
            'excerpt'   => get_the_excerpt(),
            'date'      => get_the_date(),
            'author'    => get_the_author(),
            'thumbnail' => get_post_thumbnail_id(),
            'permalink' => get_permalink(),
            'categories'=> get_the_category() ?: [],
        ];
    }
}
```

## When to Use Composers vs Direct Access

**Use a Composer when:**
- A view needs ACF field data
- Data requires transformation or computation
- The same data is used across multiple views (share via Composer)
- You want PHP 8.4 null-safety at a single boundary

**Direct access in Blade is acceptable when:**
- Simple WordPress functions: `{{ get_the_title() }}`, `{{ get_permalink() }}`
- One-off display logic: `@if (is_front_page())`
- WordPress template tags: `@php(the_content())`

## Flexible Content with Composers

Each ACF flexible content layout gets its own Composer. The flexible content loader in Blade dynamically includes the right view, and the matching Composer provides the data:

```blade
{{-- In page.blade.php or similar --}}
@if (have_rows('content_blocks'))
    @while (have_rows('content_blocks')) @php(the_row())
        @includeIf('partials.flexible.' . get_row_layout())
    @endwhile
@endif
```

Each `partials.flexible.*` view has a matching Composer that calls `get_sub_field()` (inside the `have_rows` loop context).

**Important:** Inside a flexible content Composer's `with()` method, you are already within the `the_row()` context, so use `get_sub_field()` instead of `get_field()`:

```php
class HeroLayout extends Composer
{
    protected static $views = ['partials.flexible.hero'];

    public function with(): array
    {
        return [
            'title' => get_sub_field('title') ?? '',
            'image' => get_sub_field('image'),
        ];
    }
}
```
