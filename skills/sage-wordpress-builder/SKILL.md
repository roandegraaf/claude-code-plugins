---
name: sage-wordpress-builder
description: >
  Build WordPress websites using Roots Sage 10/11 theme framework with ACF Pro blocks,
  Tailwind CSS v4, Laravel Blade templating, and Vite. Triggers on: (1) Creating new ACF blocks,
  (2) Building Blade view components, (3) Setting up WordPress themes with Sage,
  (4) Implementing Tailwind CSS in WordPress, (5) Working with ACF field groups and layouts,
  (6) Creating reusable section components, (7) Setting up Vite build configuration for WordPress,
  (8) Implementing scroll animations with GSAP/Lenis, (9) Creating custom post types,
  (10) Working with View Composers in Sage.
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

Key directories: `app/Blocks/` (PHP classes), `resources/views/blocks/` (Blade templates), `resources/views/components/` (reusable components), `acf-json/` (field definitions).

## Creating ACF Blocks

Every block requires 3 files. See [references/acf-blocks.md](references/acf-blocks.md) for complete patterns.

1. **PHP Class** (`app/Blocks/{BlockName}.php`) - Extends `BaseBlock`, uses `getCommonFields()` in `with()` method
2. **Blade Template** (`resources/views/blocks/{block-name}.blade.php`) - Always wrap in `<x-section>`
3. **ACF Fields** (`acf-json/`) - Clone `group_layout` and `group_reusable_content`

See [references/acf-fields.md](references/acf-fields.md) for field group definitions.

## ACF Field Rules

- **Never** make fields mandatory
- **Never** add placeholders or instructions
- Use **button groups** for selections
- Return image **IDs** not objects
- Use **snake_case** for field names

## Blade Components

See [references/blade-components.md](references/blade-components.md) for complete component reference.

### Section Component

Wraps all blocks: `<x-section :id="$id" :pt="$pt" :pb="$pb" :background_color="$background_color">`

Props: `id`, `pt` (pt-0/pt-small/pt-medium), `pb`, `background_color`

### Content Components

All support `contentItems` array for conditional display. Available: `x-content.subtitle`, `x-content.title`, `x-content.text`, `x-content.buttons`, `x-content.media`

## Animations

See [references/animations.md](references/animations.md).

Use `data-reveal-group` for scroll animations:

```blade
<div data-reveal-group data-stagger="100" data-distance="1.5em">
  {{-- Children animate in sequence --}}
</div>
```

## Tailwind CSS v4

See [references/tailwind.md](references/tailwind.md) for CSS-first configuration patterns.

Configure via `@theme` in `app.css`. Use oklch colors, responsive spacing classes, and `@class` directive for conditional classes.

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
