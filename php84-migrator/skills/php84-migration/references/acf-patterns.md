# ACF Migration Patterns for PHP 8.x

Reference for fixing Advanced Custom Fields usage when migrating PHP 7.4 to 8.4 on WordPress sites (Bedrock/Sage and classic themes).

## 1. Field Type Safe Default Mapping

| ACF Field Type | Safe Default | Rationale |
|---|---|---|
| text, textarea, wysiwyg, email, url, password | `?? ''` | String context, empty string is safe |
| number, range | `?? 0` | Numeric context |
| image, file, post_object, page_link | Guard before use | Returns ID or object; null means "no value" |
| gallery, repeater, flexible_content, relationship | `?: []` | Array context, empty array for iteration |
| true_false | `?? false` | Boolean context |
| select, radio | `?? ''` | String context |
| checkbox | `?: []` | Always returns array |
| group, link | Guard before property/array access | Complex types need null checks |
| color_picker | `?? ''` | String hex value |
| date_picker, date_time_picker, time_picker | `?? ''` | String date values |
| google_map | Guard before array access | Returns array or null |
| oembed | `?? ''` | Returns embed HTML string |

**`?? ''`** (null coalescing): Use when `false` is not a valid return and you want a fallback for `null` only.

**`?: []`** (falsy coalescing): Use for array fields where both `null` and `false` should become an empty array. ACF returns `false` (not `null`) when a repeater/gallery/relationship field has no rows.

**Guard before use**: Wrap in `if ($value)` or use nullsafe operator `?->` before accessing properties, methods, or array keys.

### Prerequisite: acf-json availability

If the theme does not have an `acf-json/` directory, field types cannot be determined automatically. In this case:
- Fall back to variable name heuristics (see "From Sage block `with()` method context" below)
- Flag to the developer that manual type verification is recommended
- Default to conservative fixes: use `?? ''` for likely-string fields, `?: []` for likely-array fields, guard for ambiguous fields

## 2. Detecting ACF Field Types

### From acf-json/*.json files

ACF field groups exported as JSON live in the theme's `acf-json/` directory. Each file contains a field group with a `fields` array:

```json
{
  "key": "group_abc123",
  "title": "Hero Block",
  "fields": [
    {
      "key": "field_abc001",
      "label": "Title",
      "name": "title",
      "type": "text"
    },
    {
      "key": "field_abc002",
      "label": "Background Image",
      "name": "background_image",
      "type": "image",
      "return_format": "id"
    },
    {
      "key": "field_abc003",
      "label": "Items",
      "name": "items",
      "type": "repeater",
      "sub_fields": [
        {
          "key": "field_abc004",
          "label": "Label",
          "name": "label",
          "type": "text"
        }
      ]
    }
  ]
}
```

Key fields to extract:
- `fields[].name` — the field name used in `get_field('name')`
- `fields[].type` — maps to the safe default table above
- `fields[].return_format` — affects return type (e.g., image as `id` vs `array` vs `url`)
- `fields[].sub_fields` — nested fields in repeaters/groups/flex content

### From Sage block `with()` method context

Variable naming conventions in block classes hint at field types:

```php
public function with(): array {
    return [
        'title'      => get_field('title'),       // "title" → likely text
        'image'      => get_field('image'),        // "image" → likely image
        'items'      => get_field('items'),        // plural "items" → likely repeater/relationship
        'is_featured'=> get_field('is_featured'),  // "is_" prefix → likely true_false
        'link'       => get_field('link'),         // "link" → likely link field
        'slides'     => get_field('slides'),       // plural → likely repeater/gallery
    ];
}
```

### From Blade template usage patterns

Template code reveals expected types:

```blade
{{-- String type: used in output or string functions --}}
<h1>{!! $title !!}</h1>

{{-- Image type: passed to wp_get_attachment_image_url or checked with @if --}}
@if ($image)
  <img src="{{ wp_get_attachment_image_url($image, 'large') }}">
@endif

{{-- Array/repeater type: iterated with @foreach --}}
@foreach ($items as $item)
  <span>{{ $item['label'] }}</span>
@endforeach

{{-- Boolean type: used in @if without comparison --}}
@if ($is_featured)
  <span class="badge">Featured</span>
@endif
```

## 3. Common ACF Patterns That Break on PHP 8.x

### get_field() returning null passed to string functions

`get_field()` returns `null` when a field has no value (or the post doesn't exist). As of PHP 8.1, passing `null` to internal string functions like `strlen()`, `strtolower()`, `trim()`, `str_replace()`, etc. emits a deprecation notice. These will become TypeErrors in PHP 9.0. Note: string concatenation with the `.` operator does NOT emit deprecation for null — it silently converts null to empty string.

```php
// BEFORE (deprecation notice on PHP 8.1+, will be TypeError in 9.0)
$title = get_field('title');
echo strlen($title);                    // Deprecated: null to non-nullable param
echo strtolower($title);                // Deprecated: null to non-nullable param
echo 'Prefix: ' . $title;              // No deprecation — concatenation handles null silently
echo trim($title);                      // Deprecated: null to non-nullable param

// AFTER
$title = get_field('title') ?? '';
echo strlen($title);
echo strtolower($title);
echo 'Prefix: ' . $title;
echo trim($title);
```

### get_sub_field() in repeater loops

Inside `have_rows()` / `the_row()` loops, `get_sub_field()` can still return `null` if the sub field is empty:

```php
// BEFORE
if (have_rows('slides')) {
    while (have_rows('slides')) {
        the_row();
        $caption = get_sub_field('caption');
        echo strtolower($caption);              // TypeError if null
        $image_id = get_sub_field('image');
        echo wp_get_attachment_image_url($image_id, 'large'); // null passed as int param
    }
}

// AFTER
if (have_rows('slides')) {
    while (have_rows('slides')) {
        the_row();
        $caption = get_sub_field('caption') ?? '';
        echo strtolower($caption);

        $image_id = get_sub_field('image');
        if ($image_id) {
            echo wp_get_attachment_image_url($image_id, 'large');
        }
    }
}
```

### get_field('image') passed to wp_get_attachment functions

Image fields return an attachment ID, array, or URL depending on `return_format`. When empty, they return `null` or `false`.

```php
// BEFORE
$image_id = get_field('hero_image');
$url = wp_get_attachment_image_url($image_id, 'full'); // null/false as first arg

// AFTER — guard before use
$image_id = get_field('hero_image');
$url = $image_id ? wp_get_attachment_image_url($image_id, 'full') : '';
```

When the image field returns an array:

```php
// BEFORE
$image = get_field('hero_image'); // return_format = array
echo $image['url'];              // TypeError: trying to access key on null
echo $image['alt'];

// AFTER
$image = get_field('hero_image');
if ($image) {
    echo $image['url'];
    echo $image['alt'];
}
```

### have_rows() / the_row() patterns

The `have_rows()` / `the_row()` loop structure is generally safe because `have_rows()` returns `false` when there are no rows. The risk is in sub-field access inside the loop:

```php
// Safe pattern — have_rows() prevents the loop body from executing
if (have_rows('items')) {
    while (have_rows('items')) {
        the_row();
        // DANGER: sub_field access can still return null
        $label = get_sub_field('label');         // might be null
        echo strlen($label);                     // breaks on 8.0+
    }
}

// Fix the sub_field access, not the loop structure
if (have_rows('items')) {
    while (have_rows('items')) {
        the_row();
        $label = get_sub_field('label') ?? '';
        echo strlen($label);
    }
}
```

### get_field_object() patterns

`get_field_object()` returns an array with field metadata or `false` if the field doesn't exist. Code that accesses array keys without checking is at risk:

```php
// BEFORE
$field_obj = get_field_object('color');
echo $field_obj['choices'][$field_obj['value']]; // multiple failure points

// AFTER
$field_obj = get_field_object('color');
if ($field_obj && isset($field_obj['value'], $field_obj['choices'][$field_obj['value']])) {
    echo $field_obj['choices'][$field_obj['value']];
}
```

### Two-Hop Null Flow (Most Common Pattern in Sage)

The dominant source of PHP 8.4 breakage in Sage sites is a two-hop flow:

1. `get_field()` in a block's `with()` method returns `null`
2. The null value is passed to a Blade template as a variable
3. The Blade template uses the variable in a string function or foreach

This pattern cannot be detected by grep alone — it requires cross-file analysis:

```
Block PHP (with() method)          Blade Template
─────────────────────────         ─────────────────────────
'title' => get_field('title')  →  {{ strtolower($title) }}     // TypeError!
'items' => get_field('items')  →  @foreach($items as $item)    // TypeError!
'name'  => get_field('name')   →  Prefix: {{ $name }}          // Deprecation
```

**Detection strategy:**
1. Find all `get_field()` calls in block `with()` methods
2. For each, determine the field type (from acf-json or heuristics)
3. Apply null coalescing at the `with()` boundary — this is the safest fix point because it protects all downstream Blade usage

**Fix at the source (with() method), not at each Blade usage:**
```php
// Fix HERE — one place protects all Blade template usage
public function with(): array {
    return [
        'title' => get_field('title') ?? '',     // protects strtolower($title) in Blade
        'items' => get_field('items') ?: [],      // protects @foreach($items) in Blade
    ];
}
```

## 4. Sage Block Fix Patterns

### Block with() method fixes

The `with()` method is where most ACF data enters Sage blocks. Apply defaults at this boundary:

```php
// BEFORE
public function with(): array
{
    return [
        'title'       => get_field('title'),
        'description' => get_field('description'),
        'image'       => get_field('image'),
        'items'       => get_field('items'),
        'is_active'   => get_field('is_active'),
        'link'        => get_field('link'),
        'count'       => get_field('count'),
        'bg_color'    => get_field('bg_color'),
        'embed'       => get_field('embed'),
        'date'        => get_field('event_date'),
    ];
}

// AFTER
public function with(): array
{
    return [
        'title'       => get_field('title') ?? '',
        'description' => get_field('description') ?? '',
        'image'       => get_field('image'),              // guard in template
        'items'       => get_field('items') ?: [],
        'is_active'   => get_field('is_active') ?? false,
        'link'        => get_field('link'),                // guard in template
        'count'       => get_field('count') ?? 0,
        'bg_color'    => get_field('bg_color') ?? '',
        'embed'       => get_field('embed') ?? '',
        'date'        => get_field('event_date') ?? '',
    ];
}
```

Fields like `image` and `link` return complex types (ID/array/object). Apply guards in the Blade template instead of coalescing to a wrong type.

### Blade template @php block fixes

```blade
{{-- BEFORE --}}
@php
  $url = wp_get_attachment_image_url($image, 'large');
  $full_name = $first_name . ' ' . $last_name;
  $class = 'item-' . strtolower($type);
@endphp

{{-- AFTER --}}
@php
  $url = $image ? wp_get_attachment_image_url($image, 'large') : '';
  $full_name = ($first_name ?? '') . ' ' . ($last_name ?? '');
  $class = 'item-' . strtolower($type ?? '');
@endphp
```

### Blade template output with guards

```blade
{{-- Image field: guard before use --}}
@if ($image)
  <img src="{{ wp_get_attachment_image_url($image, 'large') }}"
       alt="{{ get_field('image')['alt'] ?? '' }}">
@endif

{{-- Link field: guard before array access --}}
@if ($link)
  <a href="{{ $link['url'] }}" target="{{ $link['target'] ?? '_self' }}">
    {{ $link['title'] ?? '' }}
  </a>
@endif

{{-- Repeater: already safe if ?: [] was applied in with() --}}
@foreach ($items as $item)
  <div>{{ $item['label'] ?? '' }}</div>
@endforeach

{{-- Group field: guard before access --}}
@if ($address)
  <p>{{ $address['street'] ?? '' }}, {{ $address['city'] ?? '' }}</p>
@endif
```

### Composer/controller fixes (Sage 9)

In Sage 9, controllers use a different pattern. The same rules apply:

```php
// app/Controllers/App.php or similar

// BEFORE
public function heroTitle()
{
    return get_field('hero_title', 'option');
}

public function teamMembers()
{
    return get_field('team_members', 'option');
}

// AFTER
public function heroTitle()
{
    return get_field('hero_title', 'option') ?? '';
}

public function teamMembers()
{
    return get_field('team_members', 'option') ?: [];
}
```

## 5. Classic Theme Direct Template Pattern

In classic (non-Sage) themes, ACF fields are accessed directly in template files. There is no `with()` boundary to fix at — apply null coalescing at point of use in each template file.

### Flexible Content Template Parts

Classic themes commonly use `flexible-content/` directories with ACF flexible content layouts. Each layout file is included via `get_template_part()` or a custom loader:

```php
// flexible-content/hero.php — BEFORE
$title = get_field('title');
$subtitle = get_field('subtitle');
$bg_image = get_field('background_image');
$cta = get_field('cta_link');
$features = get_field('features');
?>
<section class="hero">
    <h1><?php echo strtolower($title); ?></h1>
    <p><?php echo $subtitle; ?></p>
    <?php echo wp_get_attachment_image($bg_image, 'full'); ?>
    <a href="<?php echo $cta['url']; ?>"><?php echo $cta['title']; ?></a>
    <?php foreach ($features as $feature) : ?>
        <div><?php echo $feature['label']; ?></div>
    <?php endforeach; ?>
</section>

// flexible-content/hero.php — AFTER
$title = get_field('title') ?? '';
$subtitle = get_field('subtitle') ?? '';
$bg_image = get_field('background_image');
$cta = get_field('cta_link');
$features = get_field('features') ?: [];
?>
<section class="hero">
    <h1><?php echo strtolower($title); ?></h1>
    <p><?php echo $subtitle; ?></p>
    <?php if ($bg_image) : ?>
        <?php echo wp_get_attachment_image($bg_image, 'full'); ?>
    <?php endif; ?>
    <?php if ($cta) : ?>
        <a href="<?php echo $cta['url']; ?>"><?php echo $cta['title'] ?? ''; ?></a>
    <?php endif; ?>
    <?php foreach ($features as $feature) : ?>
        <div><?php echo $feature['label'] ?? ''; ?></div>
    <?php endforeach; ?>
</section>
```

### Sub-field Access in have_rows() Loops

Classic themes often use `have_rows()` with `the_sub_field()` and `get_sub_field()`:

```php
// BEFORE
if (have_rows('slides')) :
    while (have_rows('slides')) : the_row();
        $image = get_sub_field('image');
        $caption = get_sub_field('caption');
        ?>
        <div class="slide">
            <?php echo wp_get_attachment_image($image, 'large'); ?>
            <p><?php echo strtolower($caption); ?></p>
        </div>
    <?php endwhile;
endif;

// AFTER
if (have_rows('slides')) :
    while (have_rows('slides')) : the_row();
        $image = get_sub_field('image');
        $caption = get_sub_field('caption') ?? '';
        ?>
        <div class="slide">
            <?php if ($image) : ?>
                <?php echo wp_get_attachment_image($image, 'large'); ?>
            <?php endif; ?>
            <p><?php echo strtolower($caption); ?></p>
        </div>
    <?php endwhile;
endif;
```

### functions.php Pattern

Classic theme `functions.php` files often retrieve options and pass them to filters/actions:

```php
// BEFORE
$logo_id = get_field('site_logo', 'option');
$phone = get_field('phone_number', 'option');
$address = get_field('address', 'option');
add_filter('body_class', function($classes) {
    $layout = get_field('layout', 'option');
    $classes[] = 'layout-' . strtolower($layout);  // TypeError if null
    return $classes;
});

// AFTER
$logo_id = get_field('site_logo', 'option');  // guard before use
$phone = get_field('phone_number', 'option') ?? '';
$address = get_field('address', 'option') ?? '';
add_filter('body_class', function($classes) {
    $layout = get_field('layout', 'option') ?? '';
    $classes[] = 'layout-' . strtolower($layout);
    return $classes;
});
```

## 6. ACF Gutenblocks Specific

### AbstractBladeBlock null handling in constructor

Third-party ACF Gutenblocks packages (e.g., `twindigital/acf-gutenblocks`) extend `AbstractBladeBlock`. The constructor receives block settings that may contain null values on PHP 8.4:

```php
// Common issue: null values in block registration array
// AbstractBladeBlock constructor accesses properties like:
$this->name        = $settings['name'];         // safe if always set
$this->description = $settings['description'];   // could be null
$this->category    = $settings['category'];      // could be null

// Fix: ensure your block class provides all settings
class HeroBlock extends AbstractBladeBlock
{
    public function __construct()
    {
        parent::__construct([
            'name'        => 'hero',
            'title'       => 'Hero',
            'description' => '',      // explicit empty string, not omitted
            'category'    => 'common', // always provide
            'icon'        => 'cover-image',
            'keywords'    => [],       // explicit empty array
        ]);
    }
}
```

### TEMPLATEPATH constant usage

Some ACF Gutenblocks implementations reference `TEMPLATEPATH` for locating Blade views. This constant was deprecated in WordPress and may behave differently in Bedrock setups:

```php
// BEFORE — may resolve incorrectly in Bedrock
$template_path = TEMPLATEPATH . '/views/blocks/' . $this->name . '.blade.php';

// AFTER — use get_template_directory() or Sage's view resolution
$template_path = get_template_directory() . '/views/blocks/' . $this->name . '.blade.php';

// Best: use Sage's built-in view finder if available
$view = 'blocks.' . $this->name;
```

### ReflectionClass usage

Some ACF Gutenblocks packages use `ReflectionClass` to auto-discover block classes or resolve file paths:

```php
$reflection = new \ReflectionClass($this);
$directory  = dirname($reflection->getFileName());
```

This pattern is safe on PHP 8.4. `ReflectionClass` has no breaking changes across 8.0-8.4 for these common use cases. No migration action needed for `ReflectionClass` itself, but verify that any dynamically-discovered properties accessed via reflection are properly declared (dynamic properties throw `Error` on 8.4).
