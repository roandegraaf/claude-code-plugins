---
name: tailwind-migration
description: >
  Bootstrap 4 to Tailwind CSS v4 migration knowledge for WordPress themes.
  Triggers on: Tailwind migration, Bootstrap migration, CSS migration, grid migration,
  Bootstrap to Tailwind, utility class migration, SCSS to Tailwind.
---

# Bootstrap 4 to Tailwind CSS v4 Migration

## Migration Categories Summary

| Category | Complexity | Key Change |
|---|---|---|
| Grid system | High | Flexbox rows/cols → CSS Grid `grid-cols-12` / `col-span-*` |
| Display utilities | Low | `d-none/block/flex` → `hidden/block/flex` + responsive prefixes |
| Flex utilities | Low | `align-items-center` → `items-center`, `justify-content-*` → `justify-*` |
| Text utilities | Low | Mostly identical; `text-truncate` → `truncate`, `font-weight-bold` → `font-bold` |
| Spacing utilities | Medium | Different scale: Bootstrap `m-3` (1rem) → Tailwind `m-4` |
| Sizing utilities | Low | `w-100` → `w-full`, `h-100` → `h-full` |
| SCSS variables | Medium | `$color-primary` → `var(--color-primary)` via @theme |
| SCSS mixins | Medium | `@include media-breakpoint-up(md)` → `@media (min-width: 768px)` |
| SCSS functions | Medium | `darken()` → `color-mix()`, SCSS math → `calc()` |
| Build pipeline | Medium | Gulp + node-sass → Tailwind CLI (keep Gulp for JS/images) |
| JS components | High | Bootstrap JS → HTML `<dialog>`, `<details>`, Alpine.js, or CSS-only |

## Tailwind v4 CSS-First Config

Tailwind v4 uses CSS-first configuration — no `tailwind.config.js` needed:

```css
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-primary: #your-value;
  --color-secondary: #your-value;

  /* Custom fonts */
  --font-family-primary: 'Your Font', sans-serif;
  --font-family-secondary: 'Your Other Font', serif;

  /* Custom spacing */
  --spacing-section: 4rem;
  --spacing-gutter: 30px;

  /* Container */
  --container-max-width: 1140px;
  --container-padding: 3rem;
}
```

## Quick Reference: Class Mappings

### Grid
| Bootstrap 4 | Tailwind v4 |
|---|---|
| `container` | `container mx-auto px-4` (or custom) |
| `row` | `grid grid-cols-12 gap-x-[30px]` |
| `col-{n}` | `col-span-{n}` |
| `col-md-{n}` | `md:col-span-{n}` |
| `offset-md-{n}` | `md:col-start-{n+1}` |
| `no-gutters` | (remove `gap-x-*` from parent) |

### Display
| Bootstrap 4 | Tailwind v4 |
|---|---|
| `d-none` | `hidden` |
| `d-block` | `block` |
| `d-flex` | `flex` |
| `d-inline-block` | `inline-block` |
| `d-md-none` | `md:hidden` |
| `d-md-block` | `md:block` |

### Flex
| Bootstrap 4 | Tailwind v4 |
|---|---|
| `align-items-center` | `items-center` |
| `justify-content-between` | `justify-between` |
| `flex-column` | `flex-col` |
| `flex-wrap` | `flex-wrap` |

### Text
| Bootstrap 4 | Tailwind v4 |
|---|---|
| `text-center` | `text-center` |
| `text-truncate` | `truncate` |
| `font-weight-bold` | `font-bold` |
| `text-uppercase` | `uppercase` |

### Sizing
| Bootstrap 4 | Tailwind v4 |
|---|---|
| `w-100` | `w-full` |
| `w-50` | `w-1/2` |
| `h-100` | `h-full` |

### Spacing (Scale Differs!)
| Bootstrap size | Value | Tailwind equivalent |
|---|---|---|
| `{m\|p}-0` | 0 | `{m\|p}-0` |
| `{m\|p}-1` | 0.25rem | `{m\|p}-1` |
| `{m\|p}-2` | 0.5rem | `{m\|p}-2` |
| `{m\|p}-3` | 1rem | `{m\|p}-4` |
| `{m\|p}-4` | 1.5rem | `{m\|p}-6` |
| `{m\|p}-5` | 3rem | `{m\|p}-12` |

## Breakpoint Mixin → Media Query

| Bootstrap Mixin | Media Query |
|---|---|
| `@include media-breakpoint-up(sm)` | `@media (min-width: 576px)` |
| `@include media-breakpoint-up(md)` | `@media (min-width: 768px)` |
| `@include media-breakpoint-up(lg)` | `@media (min-width: 992px)` |
| `@include media-breakpoint-up(xl)` | `@media (min-width: 1200px)` |
| `@include media-breakpoint-down(sm)` | `@media (max-width: 767.98px)` |
| `@include media-breakpoint-down(md)` | `@media (max-width: 991.98px)` |
| `@include media-breakpoint-down(lg)` | `@media (max-width: 1199.98px)` |

## Detailed References

- [references/class-mapping.md](references/class-mapping.md) — Exhaustive Bootstrap → Tailwind class mapping with detection grep patterns
- [references/grid-migration.md](references/grid-migration.md) — Grid system deep dive with real before/after examples
- [references/scss-migration.md](references/scss-migration.md) — SCSS variable, mixin, and function conversion patterns
- [references/js-components.md](references/js-components.md) — Bootstrap JS component detection and replacement strategies
- [references/build-pipeline.md](references/build-pipeline.md) — Gulp + node-sass → Tailwind CLI migration
