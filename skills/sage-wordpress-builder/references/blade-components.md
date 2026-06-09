# Blade Components

## Table of Contents
- [Blade Conventions](#blade-conventions)
- [Section Component](#section-component)
- [Content Components](#content-components)
- [Subtitle Component](#subtitle-component)
- [Title Component](#title-component)
- [Text Component](#text-component)
- [Buttons Component](#buttons-component)
- [Button Component](#button-component)
- [Media Component](#media-component)
- [Usage in Blocks](#usage-in-blocks)
- [Blade Directives](#blade-directives)

## Blade Conventions

### 1. Output with `{!! !!}`

Render controller/field data with `{!! $value !!}`. Sanitizing and escaping are done in the PHP controller (the block's `with()` method), so the view outputs already-clean values raw. `{{ }}` double-escapes values the controller prepared and breaks HTML/WYSIWYG output.

```blade
{{-- Do --}}
<span>{!! $label !!}</span>

{{-- Don't — double-escapes controller-prepared output --}}
<span>{{ $label }}</span>
```

### 2. Image size via `$size`

When rendering an image, pass the size through the `$size` variable (our default). Don't hardcode size strings.

```blade
{{-- Do --}}
{!! wp_get_attachment_image($image, $size, false, ['class' => 'w-full h-auto']) !!}

{{-- Don't --}}
{!! wp_get_attachment_image($image, 'large', false, ['class' => 'w-full h-auto']) !!}
```

### 3. Never style the container

The container is a component — adding classes/CSS to it conflicts. Place a `<div>` directly inside the container and apply layout and CSS there.

```blade
{{-- Do --}}
<div class="container">
  <div class="grid grid-cols-2 gap-8">
    {{-- content --}}
  </div>
</div>

{{-- Don't — styling the container conflicts with the component --}}
<div class="container grid grid-cols-2 gap-8">
  {{-- content --}}
</div>
```

### 4. No inline PHP in Blade

No `@php` blocks or inline logic in templates. Do all data prep — mapping, filtering, defaults, escaping/sanitizing — in the PHP controller (`with()`) and pass finished values to the view. Templates only render.

```php
// Do — prepare in the controller
public function with()
{
    return array_merge($this->getCommonFields(), [
        'size'    => 'large',
        'buttons' => collect(get_field('buttons') ?? [])
            ->filter(fn ($btn) => !empty($btn['link']))
            ->all(),
    ]);
}
```

```blade
{{-- Don't — logic in the template --}}
@php
  $buttons = collect($buttons)->filter(fn ($b) => !empty($b['link']));
@endphp
```

## Section Component

Wraps all block content with consistent spacing and background:

```blade
@props([
  'id' => null,
  'pt' => null,
  'pb' => null,
  'class' => '',
  'background_color' => null,
])

<section
  {{ $id ? "id=$id" : '' }}
  @class([
    'pt-12 md:pt-16 lg:pt-20 xl:pt-24' => $pt == null,
    'pt-0' => $pt === 'pt-0',
    'pt-4 md:pt-4 lg:pt-8' => $pt === 'pt-small',
    'pt-6 md:pt-8 lg:pt-16' => $pt === 'pt-medium',

    'pb-12 md:pb-16 lg:pb-20 xl:pb-24' => $pb == null,
    'pb-0' => $pb === 'pb-0',
    'pb-4 md:pb-4 lg:pb-8' => $pb === 'pb-small',
    'pb-6 md:pb-8 lg:pb-16' => $pb === 'pb-medium',

    $background_color => $background_color,

    $class => $class,
    'relative overflow-clip',
  ])
>
  <div class="relative z-10">
    {{ $slot }}
  </div>
</section>
```

### Section Props

| Prop | Type | Options | Default |
|------|------|---------|---------|
| `id` | string | Any valid ID | `null` |
| `pt` | string | `pt-0`, `pt-small`, `pt-medium` | Default spacing |
| `pb` | string | `pb-0`, `pb-small`, `pb-medium` | Default spacing |
| `background_color` | string | `bg-primary`, `bg-secondary`, `bg-accent`, `bg-neutral`, `bg-light`, `bg-white` | `null` |
| `class` | string | Additional classes | `''` |

### Section Usage

```blade
<x-section
  :id="$id"
  :pt="$pt"
  :pb="$pb"
  :background_color="$background_color"
>
  <div class="container">
    {{-- Block content --}}
  </div>
</x-section>
```

## Content Components

All content components support `contentItems` array for conditional display. If the array is empty or not filled, content renders. If filled, content only renders when the item is in the array.

### Conditional Display Pattern

```blade
@if ($field && (!filled($contentItems) || in_array('field', $contentItems)))
  {{-- Render content --}}
@endif
```

---

## Subtitle Component

`resources/views/components/content/subtitle.blade.php`

```blade
@props([
  'subtitle',
  'contentItems' => [],
  'background' => '',
  'class' => '',
])

@if ($subtitle && (!filled($contentItems) || in_array('subtitle', $contentItems)))
  <p
    @class([
      'text-lg uppercase tracking-wider font-bold',
      'text-white' => in_array($background, ['bg-primary', 'bg-dark', 'image', null]),
      'text-primary' => in_array($background, ['bg-light', 'bg-white']),
      $class,
    ])
  >
    {!! $subtitle !!}
  </p>
@endif
```

### Subtitle Props

| Prop | Type | Notes |
|------|------|-------|
| `subtitle` | string | Subtitle text |
| `contentItems` | array | Content toggle array |
| `background` | string | Background color class |
| `class` | string | Additional classes |

---

## Title Component

`resources/views/components/content/title.blade.php`

```blade
@props([
  'title',
  'heading' => 'h2',
  'headingSize' => null,
  'class' => '',
  'background' => '',
  'contentItems' => [],
])

@if ($title && (!filled($contentItems) || in_array('title', $contentItems)))
  <{{ $heading }}
    @class([
      $class,
      'text-white' => in_array($background, ['bg-primary', 'bg-dark', 'image', null]),
      'text-dark' => in_array($background, ['bg-light', 'bg-white']),
      'title-small' => $headingSize === 'small',
      'title-large' => $headingSize === 'big',
    ])
  >
    {!! $title !!}
  </{{ $heading }}>
@endif
```

### Title Props

| Prop | Type | Options | Default |
|------|------|---------|---------|
| `title` | string | Title text | - |
| `heading` | string | `h1`, `h2`, `h3`, `h4` | `h2` |
| `headingSize` | string | `small`, `normal`, `big` | `null` |
| `background` | string | Background class | `''` |
| `contentItems` | array | Content toggle | `[]` |
| `class` | string | Additional classes | `''` |

---

## Text Component

`resources/views/components/content/text.blade.php`

```blade
@props([
  'class' => '',
  'content',
  'background' => '',
  'contentItems' => [],
])

@if ($content && (!filled($contentItems) || in_array('content', $contentItems)))
  <div
    @class([
      $class,
      'prose lg:prose-lg xl:prose-xl',
      'prose prose-p:text-dark prose-ul:text-dark prose-strong:text-dark' => in_array($background, ['bg-white', 'bg-light']),
      'prose prose-invert text-white prose-p:text-white prose-ul:text-white' => in_array($background, ['bg-dark', 'bg-primary', 'image', null]),
    ])
  >
    {!! $content !!}
  </div>
@endif
```

### Text Props

| Prop | Type | Notes |
|------|------|-------|
| `content` | string | WYSIWYG content |
| `background` | string | For text color selection |
| `contentItems` | array | Content toggle |
| `class` | string | Additional classes |

---

## Buttons Component

`resources/views/components/content/buttons.blade.php`

Buttons are filtered (drop entries without a link) in the controller, so the component receives a ready array and contains no inline PHP:

```php
// Controller — with()
'buttons' => collect(get_field('buttons') ?? [])
    ->filter(fn ($btn) => !empty($btn['link']))
    ->all(),
```

```blade
@props([
  'buttons' => [],
  'contentItems' => [],
  'class' => '',
  'background' => '',
])

@if (filled($buttons) && (!filled($contentItems) || in_array('buttons', $contentItems)))
  <div class="flex flex-wrap items-start gap-4 {{ $class }}">
    @foreach ($buttons as $button)
      <x-content.button
        :href="$button['link']['url']"
        :variant="$button['color'] ?? 'primary'"
        :target="$button['link']['target'] ?? null"
      >
        {!! $button['link']['title'] !!}
      </x-content.button>
    @endforeach
  </div>
@endif
```

### Buttons Props

| Prop | Type | Notes |
|------|------|-------|
| `buttons` | array | Pre-filtered array from the controller (no empty links) |
| `contentItems` | array | Content toggle |
| `class` | string | Additional classes |
| `background` | string | For styling context |

---

## Button Component

`resources/views/components/content/button.blade.php`

```blade
@props([
  'href' => '#',
  'variant' => 'primary',
  'target' => null,
])

<a
  href="{{ $href }}"
  @if($target) target="{{ $target }}" @endif
  @class([
    'inline-flex items-center px-6 py-3 font-medium rounded-lg transition-colors',
    'bg-primary text-white hover:bg-primary/90' => $variant === 'primary',
    'bg-secondary text-white hover:bg-secondary/90' => $variant === 'secondary',
    'bg-white text-dark hover:bg-gray-100' => $variant === 'white',
    'bg-transparent border-2 border-current' => $variant === 'outline',
  ])
>
  {{ $slot }}
</a>
```

---

## Media Component

`resources/views/components/content/media.blade.php`

```blade
@props([
  'media_type' => 'image',
  'image' => null,
  'size' => 'large',
  'video_type' => null,
  'video_url' => null,
  'video_file' => null,
  'placeholder' => null,
  'class' => '',
])

<div class="{{ $class }}">
  @if ($media_type === 'image' && $image)
    {!! wp_get_attachment_image($image, $size, false, ['class' => 'w-full h-auto']) !!}
  @elseif ($media_type === 'video')
    @if ($video_type === 'file' && $video_file)
      <video class="w-full" controls poster="{{ $placeholder ? wp_get_attachment_image_url($placeholder, 'large') : '' }}">
        <source src="{{ wp_get_attachment_url($video_file) }}" type="video/mp4">
      </video>
    @elseif ($video_url)
      <div class="aspect-video">
        <iframe
          src="{{ $video_url }}"
          class="w-full h-full"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    @endif
  @endif
</div>
```

---

## Usage in Blocks

Standard block template structure:

```blade
<x-section
  :id="$id"
  :pt="$pt"
  :pb="$pb"
  :background_color="$background_color"
>
  <div class="container">
    <div data-reveal-group class="flex flex-col gap-4">
      <x-content.subtitle
        :subtitle="$subtitle"
        :contentItems="$content_items"
        :background="$background_color"
      />

      <x-content.title
        :title="$title"
        :heading="$heading"
        :headingSize="$heading_size"
        :contentItems="$content_items"
        :background="$background_color"
        class="max-w-3xl"
      />

      <x-content.text
        :content="$content"
        :contentItems="$content_items"
        :background="$background_color"
        class="max-w-2xl"
      />

      <x-content.buttons
        :buttons="$buttons"
        :contentItems="$content_items"
        class="mt-4"
      />
    </div>
  </div>
</x-section>
```

## Blade Directives

### @class Directive

Conditional class rendering:

```blade
<div @class([
  'base-class',
  'conditional-class' => $condition,
  $dynamicClass => $dynamicClass,
])>
```

### @asset Directive

Load compiled assets:

```blade
<img src="@asset('images/logo.svg')" alt="Logo">
```

### @include Directive

Include partials:

```blade
@include('partials.header')
@include('components.card', ['title' => $post->post_title])
```
