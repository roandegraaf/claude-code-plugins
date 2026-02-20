# SCSS Migration: Bootstrap SCSS → Tailwind CSS v4

## Strategy Overview

**Hybrid approach:** Keep SCSS for custom component styles initially. Remove Bootstrap imports, convert Bootstrap variables/mixins to CSS custom properties and modern CSS. Tailwind v4 handles utility classes; SCSS handles custom component styling.

Long-term: SCSS files can gradually be converted to plain CSS (Tailwind v4 supports native CSS nesting).

## Variable Migration

### Bootstrap Variables → CSS Custom Properties in @theme

```css
/* Tailwind v4 CSS entry point (assets/css/global.css) */
@import "tailwindcss";

@theme {
  /* Grid (replacing Bootstrap $grid-gutter-width) */
  --spacing-gutter: 30px;

  /* Colors (replacing $color-primary, $color-secondary, etc.) */
  --color-primary: #your-primary;
  --color-secondary: #your-secondary;
  --color-light-grey: #your-light-grey;

  /* Fonts (replacing $font-primary, $font-secondary) */
  --font-family-primary: 'Your Font', sans-serif;
  --font-family-secondary: 'Your Other Font', serif;

  /* Transitions (replacing $transition-primary, $transition-secondary) */
  --transition-primary: all 0.3s ease;
  --transition-secondary: all 0.15s ease;

  /* Spacing (replacing $basic-padding variants) */
  --spacing-section: 4rem;
  --spacing-section-sm: 2rem;
  --spacing-section-lg: 6rem;
}
```

### In SCSS files: Replace SCSS Variables with CSS Custom Properties

```scss
// Before
.component {
  color: $color-primary;
  font-family: $font-primary;
  padding: $basic-padding;
  transition: $transition-primary;
}

// After
.component {
  color: var(--color-primary);
  font-family: var(--font-family-primary);
  padding: var(--spacing-section);
  transition: var(--transition-primary);
}
```

### Bootstrap Grid Variables
```scss
// Before
$grid-columns: 12;
$grid-gutter-width: 30px;
$container-max-widths: (sm: 540px, md: 720px, lg: 960px, xl: 1140px);

// After — these are handled by Tailwind's grid system, no SCSS variables needed
// The gutter is set via gap-x-[30px] in HTML classes
// Container max-widths are configured in @theme or via Tailwind's container config
```

## Mixin Migration

### media-breakpoint-up (most common)

```scss
// Before
@include media-breakpoint-up(sm) { ... }
@include media-breakpoint-up(md) { ... }
@include media-breakpoint-up(lg) { ... }
@include media-breakpoint-up(xl) { ... }

// After
@media (min-width: 576px) { ... }
@media (min-width: 768px) { ... }
@media (min-width: 992px) { ... }
@media (min-width: 1200px) { ... }
```

### media-breakpoint-down

```scss
// Before
@include media-breakpoint-down(xs) { ... }
@include media-breakpoint-down(sm) { ... }
@include media-breakpoint-down(md) { ... }
@include media-breakpoint-down(lg) { ... }

// After (Bootstrap uses max-width of the NEXT breakpoint minus 0.02px)
@media (max-width: 575.98px) { ... }
@media (max-width: 767.98px) { ... }
@media (max-width: 991.98px) { ... }
@media (max-width: 1199.98px) { ... }
```

### media-breakpoint-between

```scss
// Before
@include media-breakpoint-between(md, lg) { ... }

// After
@media (min-width: 768px) and (max-width: 991.98px) { ... }
```

### media-breakpoint-only

```scss
// Before
@include media-breakpoint-only(md) { ... }

// After
@media (min-width: 768px) and (max-width: 991.98px) { ... }
```

### Complete Breakpoint Reference Table

| Mixin | Breakpoint | Resulting Media Query |
|---|---|---|
| `media-breakpoint-up(sm)` | sm | `@media (min-width: 576px)` |
| `media-breakpoint-up(md)` | md | `@media (min-width: 768px)` |
| `media-breakpoint-up(lg)` | lg | `@media (min-width: 992px)` |
| `media-breakpoint-up(xl)` | xl | `@media (min-width: 1200px)` |
| `media-breakpoint-down(xs)` | xs | `@media (max-width: 575.98px)` |
| `media-breakpoint-down(sm)` | sm | `@media (max-width: 767.98px)` |
| `media-breakpoint-down(md)` | md | `@media (max-width: 991.98px)` |
| `media-breakpoint-down(lg)` | lg | `@media (max-width: 1199.98px)` |
| `media-breakpoint-down(xl)` | xl | No max (effectively always) |

### make-col Mixin
```scss
// Before
@include make-col(6);
@include make-col(8, 12);

// After — replace with explicit width or grid
width: 50%; // 6/12
width: 66.666%; // 8/12
// Or use Tailwind utility classes in the HTML instead
```

## Function Migration

### darken() / lighten()
```scss
// Before
color: darken($color-primary, 10%);
background: lighten($color-secondary, 20%);

// After — CSS color-mix()
color: color-mix(in srgb, var(--color-primary), black 10%);
background: color-mix(in srgb, var(--color-secondary), white 20%);
```

### SCSS Math → CSS calc()
```scss
// Before
padding: $basic-padding / 2;
margin-top: $basic-padding * 1.5;
width: 100% / 3;
$half-gutter: $grid-gutter-width / 2;

// After
padding: calc(var(--spacing-section) / 2);
margin-top: calc(var(--spacing-section) * 1.5);
width: calc(100% / 3);
/* half-gutter: use calc(var(--spacing-gutter) / 2) inline or define new var */
```

### percentage()
```scss
// Before
width: percentage(1/3);

// After
width: calc(100% / 3);
// Or simply: width: 33.333%;
```

## SCSS Nesting → CSS Nesting

Tailwind v4 supports native CSS nesting. SCSS nesting can be kept as-is in SCSS files, or converted to CSS nesting if moving to plain CSS:

```scss
// SCSS nesting (works in both SCSS and modern CSS)
.card {
  padding: 1rem;

  &__title {
    font-size: 1.5rem;
  }

  &:hover {
    background: #f0f0f0;
  }

  .card__image {
    width: 100%;
  }
}
```

Note: BEM `&__` nesting does NOT work in native CSS nesting. If converting to plain CSS, BEM selectors must be written without `&`:
```css
.card { padding: 1rem; }
.card__title { font-size: 1.5rem; }
.card:hover { background: #f0f0f0; }
.card .card__image { width: 100%; }
```

## @for Loops → Expanded CSS

```scss
// Before (mobile menu animation delays)
@for $i from 1 through 8 {
  .menu-item:nth-child(#{$i}) {
    transition-delay: #{$i * 0.05}s;
  }
}

// After — expand to plain CSS
.menu-item:nth-child(1) { transition-delay: 0.05s; }
.menu-item:nth-child(2) { transition-delay: 0.1s; }
.menu-item:nth-child(3) { transition-delay: 0.15s; }
.menu-item:nth-child(4) { transition-delay: 0.2s; }
.menu-item:nth-child(5) { transition-delay: 0.25s; }
.menu-item:nth-child(6) { transition-delay: 0.3s; }
.menu-item:nth-child(7) { transition-delay: 0.35s; }
.menu-item:nth-child(8) { transition-delay: 0.4s; }
```

## @each / @map → Expanded CSS

```scss
// Before
$colors: (primary: $color-primary, secondary: $color-secondary);
@each $name, $color in $colors {
  .text-#{$name} { color: $color; }
  .bg-#{$name} { background-color: $color; }
}

// After — Tailwind handles these via utility classes
// Use text-[var(--color-primary)] and bg-[var(--color-primary)] in HTML
// Or define in @theme and use text-primary / bg-primary
```

## Custom Spacing Classes Migration

The ISO site uses minified spacing shorthand classes like `.ptn`, `.mts`, `.pal`:

```scss
// Pattern: {property}{direction}{size}
// p=padding, m=margin
// t=top, b=bottom, l=left, r=right, a=all, h=horizontal, v=vertical
// n=none, xs=extra-small, s=small, m=medium, l=large, xl=extra-large

// Before (in SCSS)
.ptn { padding-top: 0; }
.mts { margin-top: 0.5rem; }
.pal { padding: 2rem; }
.pvl { padding-top: 2rem; padding-bottom: 2rem; }

// After — replace with Tailwind utilities in HTML
// .ptn → pt-0
// .mts → mt-2
// .pal → p-8
// .pvl → py-8
```

Keep these classes in a compatibility layer initially, then migrate PHP templates to use Tailwind classes directly.

## Bootstrap Import Removal

### Before (global.scss)
```scss
// Bootstrap imports
@import 'bootstrap/functions';
@import 'bootstrap/variables';
@import 'bootstrap/mixins';
@import 'bootstrap/grid';
@import 'bootstrap/utilities/display';
@import 'bootstrap/utilities/flex';

// Custom variables
@import 'variables';

// Components
@import 'components/header';
@import 'components/footer';
// ... 14 more components
@import 'responsive';
```

### After (global.scss — hybrid)
```scss
// Bootstrap imports REMOVED — grid/display/flex now handled by Tailwind utilities

// Custom variables — now using CSS custom properties from @theme
// Only import if still needed for SCSS-specific features
@import 'variables'; // Updated to use var(--*) where possible

// Components (keep SCSS, but Bootstrap deps removed)
@import 'components/header';
@import 'components/footer';
// ... 14 more components

// Responsive (Bootstrap mixins replaced with @media queries)
@import 'responsive';
```

## Detection Patterns

### Bootstrap SCSS Imports
```bash
grep -rPn "@import.*bootstrap" --include='*.scss'
```

### Bootstrap Variable Usage
```bash
grep -rPn '\$grid-(columns|gutter-width|breakpoints)|(\$container-max-widths)' --include='*.scss'
```

### Bootstrap Mixin Usage
```bash
grep -rPn '@include\s+media-breakpoint-|@include\s+make-col|@include\s+make-row|@include\s+make-container' --include='*.scss'
```

### SCSS Function Usage (needs conversion)
```bash
grep -rPn 'darken\(|lighten\(|saturate\(|desaturate\(|percentage\(' --include='*.scss'
```

### SCSS Variable Definitions
```bash
grep -rPn '^\$[a-z]' --include='*.scss'
```

### SCSS Math Operations
```bash
grep -rPn '\$[a-z-]+\s*[*/+-]\s*' --include='*.scss'
```
