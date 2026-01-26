---
name: sage-wordpress-builder
description: >
  Build WordPress websites using Roots Sage 10/11 theme framework with ACF Pro blocks,
  Tailwind CSS v4, Laravel Blade templating, and Vite. Use this skill when building
  WordPress themes, creating ACF blocks, implementing Blade components, or working with
  the Sage/Roots ecosystem. Triggers on - (1) Creating new ACF blocks, (2) Building Blade
  view components, (3) Setting up WordPress themes with Sage, (4) Implementing Tailwind
  CSS in WordPress, (5) Working with ACF field groups and layouts, (6) Creating reusable
  section components, (7) Setting up Vite build configuration for WordPress.
---

# Sage WordPress Builder

Build WordPress websites using Roots Sage with ACF Pro, Tailwind CSS v4, Laravel Blade, and Vite.

## Tech Stack

- **WordPress 6.x** - Backend CMS
- **PHP 8.2+** - Strict typing required
- **Roots Sage 10/11** - Theme framework
- **ACF Pro** - Advanced Custom Fields with blocks
- **Tailwind CSS v4** - CSS-first configuration
- **Laravel Blade** - Templating engine
- **Vite** - Build tool with HMR
- **Alpine.js** - Lightweight JavaScript
- **GSAP + Lenis** - Scroll animations

## Directory Structure

See [references/architecture.md](references/architecture.md) for complete structure.

```
web/app/themes/{theme}/
├── app/
│   ├── Blocks/           # ACF block classes
│   ├── View/Composers/   # View composers
│   ├── Traits/           # Reusable traits
│   └── setup.php         # Theme setup
├── resources/
│   ├── views/
│   │   ├── blocks/       # Block templates
│   │   └── components/   # Blade components
│   │       └── content/  # Content components
│   ├── css/app.css       # Main styles
│   └── js/app.js         # Main JS
├── acf-json/             # ACF fields (version controlled)
└── vite.config.js
```

## Creating ACF Blocks

Every block requires 3 files. See [references/acf-blocks.md](references/acf-blocks.md).

### 1. PHP Class (`app/Blocks/{BlockName}.php`)

```php
<?php

namespace App\Blocks;

use StoutLogic\AcfBuilder\FieldsBuilder;

class BlockName extends BaseBlock
{
    public $name = 'Block Name';
    public $description = 'Block description.';
    public $category = 'formatting';
    public $mode = 'edit';
    public $view = 'blocks.block-name';

    public $supports = [
        'mode' => 'edit',
        'multiple' => true,
        'jsx' => true,
    ];

    public function with()
    {
        return array_merge(
            $this->getCommonFields(),
            [
                'custom_field' => get_field('custom_field'),
            ]
        );
    }

    public function fields()
    {
        $acfFields = new FieldsBuilder('block_name');
        return $acfFields->build();
    }
}
```

### 2. Blade Template (`resources/views/blocks/{block-name}.blade.php`)

Always wrap in `<x-section>`:

```blade
<x-section
  :id="$id"
  :pt="$pt"
  :pb="$pb"
  :background_color="$background_color"
>
  <div class="container">
    <div data-reveal-group class="flex flex-col gap-4">
      <x-content.subtitle :subtitle="$subtitle" :contentItems="$content_items" :background="$background_color" />
      <x-content.title :title="$title" :heading="$heading" :headingSize="$heading_size" :contentItems="$content_items" :background="$background_color" />
      <x-content.text :content="$content" :contentItems="$content_items" :background="$background_color" />
      <x-content.buttons :buttons="$buttons" :contentItems="$content_items" />
    </div>
  </div>
</x-section>
```

### 3. ACF Fields (`acf-json/`)

Create via WP Admin with standardized structure:
1. **Layout Tab** - Clone `group_layout`
2. **Content Tab** - Clone `group_reusable_content`
3. **Block-specific fields**

See [references/acf-fields.md](references/acf-fields.md) for field group definitions.

## ACF Field Rules

- **Never** make fields mandatory
- **Never** add placeholders or instructions
- Use **button groups** for selections
- Return image **IDs** not objects
- Use **snake_case** for field names

## Blade Components

See [references/blade-components.md](references/blade-components.md).

### Section Component

```blade
<x-section :id="$id" :pt="$pt" :pb="$pb" :background_color="$background_color">
  {{ $slot }}
</x-section>
```

Props: `id`, `pt` (pt-0/pt-small/pt-medium), `pb`, `background_color`

### Content Components

All support `contentItems` array for conditional display:

```blade
@if ($field && (!filled($contentItems) || in_array('field', $contentItems)))
  {{-- Render --}}
@endif
```

- `x-content.subtitle` - Subtitle with background-aware colors
- `x-content.title` - Heading (h1-h4) with size variants
- `x-content.text` - Prose with responsive typography
- `x-content.buttons` - Button group with color variants

## Animations

See [references/animations.md](references/animations.md).

Use `data-reveal-group` for scroll animations:

```blade
<div data-reveal-group data-stagger="100" data-distance="1.5em">
  {{-- Children animate in sequence --}}
</div>
```

## Tailwind CSS v4

See [references/tailwind.md](references/tailwind.md).

CSS-first configuration in `app.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.3294 0.0562 194.77);
  --color-secondary: oklch(0.5 0.1 200);
}
```

## WordPress Conventions

### Escaping

```php
esc_html($text);      // Plain text
esc_attr($attribute); // HTML attributes
esc_url($url);        // URLs
wp_kses($html, []);   // HTML
```

### Naming

- **Functions**: `snake_case` with `av_` prefix
- **Classes**: `PascalCase`
- **Variables**: `snake_case`
- **Files**: `kebab-case` (except PHP classes)

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
```

## Best Practices

1. Read relevant files before implementing
2. Match existing codebase patterns
3. Escape all output
4. Use content components with `contentItems`
5. Clone `group_layout` and `group_reusable_content`
6. Test builds before deployment
