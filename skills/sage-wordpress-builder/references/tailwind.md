# Tailwind CSS v4 Conventions

## CSS-First Configuration

Tailwind v4 uses CSS-first configuration. Define theme in `resources/css/app.css`:

```css
@import "tailwindcss";

@theme {
  /* Colors - using oklch for better color manipulation */
  --color-primary: oklch(0.3294 0.0562 194.77);
  --color-secondary: oklch(0.5 0.1 200);
  --color-accent: oklch(0.7 0.15 50);
  --color-neutral: oklch(0.4 0.02 250);
  --color-light: oklch(0.95 0.01 250);
  --color-dark: oklch(0.2 0.02 250);
  --color-white: #ffffff;

  /* Typography */
  --font-family-body: "Inter", system-ui, sans-serif;
  --font-family-heading: "Inter", system-ui, sans-serif;

  /* Container */
  --container-max-width: 1280px;
}
```

## Vite Integration

In `vite.config.js`:

```javascript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    // ... other plugins
  ],
})
```

No separate `tailwind.config.js` needed.

## Spacing Classes

### Top Padding

| ACF Value | Classes |
|-----------|---------|
| Default (null) | `pt-12 md:pt-16 lg:pt-20 xl:pt-24` |
| `pt-0` | `pt-0` |
| `pt-small` | `pt-4 md:pt-4 lg:pt-8` |
| `pt-medium` | `pt-6 md:pt-8 lg:pt-16` |
| `pt-large` | `pt-12 md:pt-28 lg:pt-40 xl:pt-48` |

### Bottom Padding

| ACF Value | Classes |
|-----------|---------|
| Default (null) | `pb-12 md:pb-16 lg:pb-20 xl:pb-24` |
| `pb-0` | `pb-0` |
| `pb-small` | `pb-4 md:pb-4 lg:pb-8` |
| `pb-medium` | `pb-6 md:pb-8 lg:pb-16` |
| `pb-large` | `pb-12 md:pb-28 lg:pb-40 xl:pb-48` |

## Background Colors

Available background classes:

- `bg-primary` - Primary brand color
- `bg-secondary` - Secondary brand color
- `bg-accent` - Accent color
- `bg-neutral` - Neutral gray
- `bg-light` - Light background
- `bg-white` - White background
- `bg-dark` - Dark background

Text colors auto-adjust based on background:

```blade
@class([
  'text-white' => in_array($background, ['bg-primary', 'bg-dark', 'bg-secondary']),
  'text-dark' => in_array($background, ['bg-light', 'bg-white']),
])
```

## Class Ordering Convention

```
layout → sizing → spacing → typography → visual → state
```

Example:
```blade
<div class="flex items-center justify-between w-full max-w-xl px-4 py-2 text-lg font-bold text-white bg-primary rounded-lg hover:bg-primary/90">
```

## Responsive Design

Mobile-first approach with breakpoints:

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large screens |

Example:
```blade
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
```

## Container

Use `.container` for max-width centered content:

```blade
<div class="container mx-auto px-4">
  {{-- Content --}}
</div>
```

## Prose for WYSIWYG Content

Use Tailwind Typography plugin for rich text:

```blade
<div class="prose lg:prose-lg xl:prose-xl">
  {!! $content !!}
</div>
```

With background color variants:

```blade
<div @class([
  'prose lg:prose-lg',
  'prose-p:text-dark prose-ul:text-dark' => in_array($background, ['bg-white', 'bg-light']),
  'prose-invert text-white' => in_array($background, ['bg-dark', 'bg-primary']),
])>
  {!! $content !!}
</div>
```

## Grid Layouts

Common grid patterns:

```blade
{{-- Two columns on desktop --}}
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">

{{-- Three columns on desktop --}}
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{{-- Sidebar layout --}}
<div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
```

## Flex Layouts

Common flex patterns:

```blade
{{-- Centered column --}}
<div class="flex flex-col items-center justify-center gap-4">

{{-- Space between row --}}
<div class="flex items-center justify-between">

{{-- Wrap with gap --}}
<div class="flex flex-wrap items-start gap-4">
```

## @class Directive

Conditional class rendering:

```blade
<div @class([
  'base-class',
  'active' => $isActive,
  'hidden' => !$isVisible,
  $dynamicClass => $dynamicClass,
])>
```

## Arbitrary Values

Tailwind v4 supports arbitrary values out of the box:

```blade
<div class="w-[350px] grid-cols-[1fr_2fr] bg-[#custom]">
```

## Dynamic Utilities

Tailwind v4 JIT supports any value:

```blade
<div class="w-17 grid-cols-15 mt-5.5">
```

## Common Utility Patterns

### Cards

```blade
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
```

### Buttons

```blade
<a class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
```

### Images

```blade
<img class="w-full h-auto object-cover rounded-lg" src="..." alt="...">
```

### Aspect Ratio

```blade
<div class="aspect-video">
  <iframe class="w-full h-full">...</iframe>
</div>
```

## CSS Custom Properties

Access theme values in custom CSS:

```css
.custom-element {
  background: var(--color-primary);
  font-family: var(--font-family-body);
}
```

## Transitions

Standard transition pattern:

```blade
<div class="transition-all duration-300 ease-out">
```

Or specific properties:

```blade
<div class="transition-colors duration-200">
<div class="transition-transform duration-300">
<div class="transition-opacity duration-150">
```

## Best Practices

1. Use semantic color names (`primary`, `secondary`) not hex values
2. Prefer utility classes over custom CSS
3. Use `@class` directive for conditional classes
4. Keep consistent units (rem-based via Tailwind)
5. Use responsive prefixes mobile-first
6. Minimize `!important` usage
7. Document complex utility combinations
