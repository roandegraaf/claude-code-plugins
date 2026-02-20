# Grid System Migration: Bootstrap 4 → Tailwind CSS v4

## Conceptual Difference

Bootstrap 4 uses a **flexbox-based** 12-column grid with rows and columns.
Tailwind v4 uses **CSS Grid** natively with `grid-cols-12`.

Key differences:

- **Bootstrap:** `.row` creates a flex container; `.col-*` uses flex-basis percentages
- **Tailwind:** parent gets `grid grid-cols-12`; children use `col-span-*`
- **Bootstrap gutters** use negative margins on `.row` + padding on columns
- **Tailwind gutters** use `gap-x-*` on the grid parent (cleaner, no negative margin hack)

---

## Container Migration

### Bootstrap Default Container

Bootstrap's `.container` has responsive max-widths at each breakpoint:

| Breakpoint | Max-width |
|---|---|
| sm (>=576px) | 540px |
| md (>=768px) | 720px |
| lg (>=992px) | 960px |
| xl (>=1200px) | 1140px |

Tailwind's `container` class can be configured via `@theme`, or use a fixed max-width.

### Custom Container Override (ISO Site Pattern)

The ISO site overrides `.container` with `padding: 0 3rem` and has a `.container--small` with `max-width: 85rem`.

Migration approach:

```css
/* In Tailwind @theme or global CSS */
@layer base {
  .container {
    @apply mx-auto w-full px-12; /* 3rem = 48px ~ px-12 */
    max-width: 1140px;
  }
  .container--small {
    max-width: 85rem;
  }
}
```

Or define in `@theme`:

```css
@import "tailwindcss";
@theme {
  --container-padding: 3rem;
  --container-max-width-small: 85rem;
}
```

---

## Row Migration

### Basic Row

```html
<!-- Bootstrap -->
<div class="row">

<!-- Tailwind -->
<div class="grid grid-cols-12 gap-x-[30px]">
```

The `gap-x-[30px]` matches Bootstrap 4's default 30px gutter (`$grid-gutter-width: 30px`).

### Row with Flex Alignment

```html
<!-- Bootstrap -->
<div class="row align-items-center">
<!-- Tailwind -->
<div class="grid grid-cols-12 gap-x-[30px] items-center">

<!-- Bootstrap -->
<div class="row justify-content-between">
<!-- Tailwind -->
<div class="grid grid-cols-12 gap-x-[30px] justify-between">

<!-- Bootstrap -->
<div class="row align-items-center justify-content-center">
<!-- Tailwind -->
<div class="grid grid-cols-12 gap-x-[30px] items-center justify-center">
```

### Row with No Gutters

```html
<!-- Bootstrap -->
<div class="row no-gutters">
<!-- Tailwind -->
<div class="grid grid-cols-12">
```

Simply omit the `gap-x-[30px]` when `no-gutters` is present.

---

## Column Migration

### Fixed Width Columns

```html
<!-- Bootstrap -->              <!-- Tailwind -->
<div class="col-1">      →     <div class="col-span-1">
<div class="col-2">      →     <div class="col-span-2">
<div class="col-3">      →     <div class="col-span-3">
<div class="col-4">      →     <div class="col-span-4">
<div class="col-5">      →     <div class="col-span-5">
<div class="col-6">      →     <div class="col-span-6">
<div class="col-7">      →     <div class="col-span-7">
<div class="col-8">      →     <div class="col-span-8">
<div class="col-9">      →     <div class="col-span-9">
<div class="col-10">     →     <div class="col-span-10">
<div class="col-11">     →     <div class="col-span-11">
<div class="col-12">     →     <div class="col-span-12">
```

### Responsive Columns

```html
<!-- Bootstrap -->
<div class="col-12 col-md-6 col-lg-4">
<!-- Tailwind -->
<div class="col-span-12 md:col-span-6 lg:col-span-4">

<!-- Bootstrap -->
<div class="col-sm-12 col-md-6 col-xl-4">
<!-- Tailwind -->
<div class="col-span-12 sm:col-span-12 md:col-span-6 xl:col-span-4">
```

Note: Bootstrap's mobile-first approach means `col-12` applies at all sizes. In Tailwind, `col-span-12` also applies at all sizes unless overridden by a responsive prefix.

### Auto-width Column (`col`)

Bootstrap's `.col` (no number) creates an equal-width flex column. There is no direct CSS Grid equivalent.

**Options:**

1. **If all siblings are `.col`:** convert parent to `flex` layout instead of grid:
   ```html
   <!-- Bootstrap -->
   <div class="row">
     <div class="col">Column A</div>
     <div class="col">Column B</div>
     <div class="col">Column C</div>
   </div>

   <!-- Tailwind -->
   <div class="flex gap-x-[30px]">
     <div class="flex-1">Column A</div>
     <div class="flex-1">Column B</div>
     <div class="flex-1">Column C</div>
   </div>
   ```

2. **If mixed with numbered cols:** assign an explicit span based on remaining space:
   ```html
   <!-- Bootstrap -->
   <div class="row">
     <div class="col-4">Sidebar</div>
     <div class="col">Main content</div>
   </div>

   <!-- Tailwind (col takes remaining 8 of 12) -->
   <div class="grid grid-cols-12 gap-x-[30px]">
     <div class="col-span-4">Sidebar</div>
     <div class="col-span-8">Main content</div>
   </div>
   ```

### Auto-sizing Column (`col-auto`)

```html
<!-- Bootstrap -->
<div class="col-auto">
<!-- Tailwind — use flex approach -->
<div class="w-auto">
```

This requires the parent row to use `flex` instead of `grid`, because `col-auto` sizes to content width.

---

## Offset Migration

Bootstrap offsets translate to Tailwind's `col-start-*`.

**Formula:** `offset-{bp}-{n}` → `{bp}:col-start-{n+1}`

The `+1` is because CSS Grid columns are 1-indexed: an offset of 3 means skip 3 columns, so start at column 4.

```html
<!-- Bootstrap -->
<div class="col-md-6 offset-md-3">
<!-- Tailwind: offset-3 means start at column 4 (3+1) -->
<div class="md:col-span-6 md:col-start-4">

<!-- Bootstrap -->
<div class="col-md-8 offset-md-2">
<!-- Tailwind: offset-2 means start at column 3 (2+1) -->
<div class="md:col-span-8 md:col-start-3">

<!-- Bootstrap -->
<div class="col-lg-4 offset-lg-1">
<!-- Tailwind: offset-1 means start at column 2 (1+1) -->
<div class="lg:col-span-4 lg:col-start-2">
```

### Common Centering Pattern

Centering a column via offset is a frequent pattern:

```html
<!-- Bootstrap: center 8-col content (offset = (12-8)/2 = 2) -->
<div class="col-md-8 offset-md-2">

<!-- Tailwind -->
<div class="md:col-span-8 md:col-start-3">

<!-- Bootstrap: center 6-col content (offset = (12-6)/2 = 3) -->
<div class="col-md-6 offset-md-3">

<!-- Tailwind -->
<div class="md:col-span-6 md:col-start-4">

<!-- Bootstrap: center 10-col content (offset = (12-10)/2 = 1) -->
<div class="col-md-10 offset-md-1">

<!-- Tailwind -->
<div class="md:col-span-10 md:col-start-2">
```

---

## Real ISO Site Examples

### Navbar Two-Column Layout

```php
<!-- Bootstrap (current) -->
<div class="container">
  <div class="row align-items-center">
    <div class="col-md-3">
      <?php // logo ?>
    </div>
    <div class="col-md-9">
      <?php // navigation ?>
    </div>
  </div>
</div>

<!-- Tailwind (migrated) -->
<div class="container">
  <div class="grid grid-cols-12 gap-x-[30px] items-center">
    <div class="md:col-span-3">
      <?php // logo ?>
    </div>
    <div class="md:col-span-9">
      <?php // navigation ?>
    </div>
  </div>
</div>
```

### Text Next to Image (ACF Flexible Content)

```php
<!-- Bootstrap (current) -->
<div class="row align-items-center">
  <div class="col-md-6 <?php echo $image_position === 'right' ? 'order-md-2' : ''; ?>">
    <img src="<?php echo $image['url']; ?>" class="w-100">
  </div>
  <div class="col-md-6">
    <div class="content-block">
      <?php echo $text; ?>
    </div>
  </div>
</div>

<!-- Tailwind (migrated) -->
<div class="grid grid-cols-12 gap-x-[30px] items-center">
  <div class="col-span-12 md:col-span-6 <?php echo $image_position === 'right' ? 'md:order-2' : ''; ?>">
    <img src="<?php echo $image['url']; ?>" class="w-full">
  </div>
  <div class="col-span-12 md:col-span-6">
    <div class="content-block">
      <?php echo $text; ?>
    </div>
  </div>
</div>
```

### Footer Multi-Column

```php
<!-- Bootstrap (current) -->
<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-4">
      <?php // footer col 1 ?>
    </div>
    <div class="col-sm-12 col-md-4">
      <?php // footer col 2 ?>
    </div>
    <div class="col-sm-12 col-md-4">
      <?php // footer col 3 ?>
    </div>
  </div>
</div>

<!-- Tailwind (migrated) -->
<div class="container">
  <div class="grid grid-cols-12 gap-x-[30px]">
    <div class="col-span-12 md:col-span-4">
      <?php // footer col 1 ?>
    </div>
    <div class="col-span-12 md:col-span-4">
      <?php // footer col 2 ?>
    </div>
    <div class="col-span-12 md:col-span-4">
      <?php // footer col 3 ?>
    </div>
  </div>
</div>
```

### CTA with Offset

```php
<!-- Bootstrap (current) -->
<div class="container">
  <div class="row">
    <div class="col-md-8 offset-md-2 text-center">
      <h2><?php echo $heading; ?></h2>
      <a href="<?php echo $link['url']; ?>" class="btn"><?php echo $link['title']; ?></a>
    </div>
  </div>
</div>

<!-- Tailwind (migrated) -->
<div class="container">
  <div class="grid grid-cols-12 gap-x-[30px]">
    <div class="col-span-12 md:col-span-8 md:col-start-3 text-center">
      <h2><?php echo $heading; ?></h2>
      <a href="<?php echo $link['url']; ?>" class="btn"><?php echo $link['title']; ?></a>
    </div>
  </div>
</div>
```

### Hidden/Visible Responsive Pattern

```php
<!-- Bootstrap (current) -->
<div class="col-md-6 d-none d-md-block">
  <?php // desktop only content ?>
</div>

<!-- Tailwind (migrated) -->
<div class="col-span-12 md:col-span-6 hidden md:block">
  <?php // desktop only content ?>
</div>
```

---

## Breakpoint Mapping

| Bootstrap 4 | Prefix | Min-width | Tailwind v4 |
|---|---|---|---|
| (default) | none | 0 | (default) |
| sm | `col-sm-` | 576px | `sm:` |
| md | `col-md-` | 768px | `md:` |
| lg | `col-lg-` | 992px | `lg:` |
| xl | `col-xl-` | 1200px | `xl:` |

Note: Bootstrap 4 does not have `xxl`. Tailwind's `2xl:` (1536px) has no Bootstrap 4 equivalent.

---

## Quick Reference: Class Mapping Table

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `row` | `grid grid-cols-12 gap-x-[30px]` | Row becomes grid parent |
| `row no-gutters` | `grid grid-cols-12` | Omit gap |
| `col-{n}` | `col-span-{n}` | Direct mapping |
| `col-{bp}-{n}` | `{bp}:col-span-{n}` | Responsive column |
| `col` | `flex-1` (on flex parent) | No grid equivalent; flag for review |
| `col-auto` | `w-auto` (on flex parent) | No grid equivalent |
| `offset-{n}` | `col-start-{n+1}` | 1-indexed in CSS Grid |
| `offset-{bp}-{n}` | `{bp}:col-start-{n+1}` | Responsive offset |
| `align-items-center` | `items-center` | Works on both flex and grid |
| `align-items-start` | `items-start` | |
| `align-items-end` | `items-end` | |
| `justify-content-center` | `justify-center` | |
| `justify-content-between` | `justify-between` | |
| `justify-content-end` | `justify-end` | |
| `order-{bp}-{n}` | `{bp}:order-{n}` | |
| `d-none` | `hidden` | |
| `d-{bp}-block` | `{bp}:block` | |
| `d-{bp}-flex` | `{bp}:flex` | |
| `d-{bp}-none` | `{bp}:hidden` | |
| `w-100` | `w-full` | |

---

## Migration Algorithm

For automated migration, process each element in this order:

1. **Find `row` classes** -- replace with `grid grid-cols-12 gap-x-[30px]`
2. **Carry over alignment** -- map `align-items-*` to `items-*`, `justify-content-*` to `justify-*`
3. **Handle `no-gutters`** -- remove `gap-x-[30px]` from parent (just use `grid grid-cols-12`)
4. **Find child `col-*` classes** -- map each to `col-span-*` with responsive prefixes
5. **Find `offset-*` classes** -- map to `col-start-{n+1}` with responsive prefixes
6. **Handle `col` (no number)** -- flag for manual review or convert parent to flex
7. **Handle `col-auto`** -- flag for manual review or convert parent to flex
8. **Handle `w-100` inside columns** -- replace with `w-full`
9. **Handle display utilities** -- map `d-none` to `hidden`, `d-{bp}-block` to `{bp}:block`, etc.
10. **Handle order utilities** -- map `order-{bp}-{n}` to `{bp}:order-{n}`

### Regex Patterns for Automated Search

```
# Find rows
class="[^"]*\brow\b[^"]*"

# Find columns (numbered)
\bcol-(sm|md|lg|xl)?-?(\d{1,2})\b

# Find offsets
\boffset-(sm|md|lg|xl)?-?(\d{1,2})\b

# Find auto columns (flag for manual review)
\bcol\b(?!-)
\bcol-auto\b

# Find no-gutters
\bno-gutters\b

# Find display utilities
\bd-(none|block|flex|inline|inline-block)\b
\bd-(sm|md|lg|xl)-(none|block|flex|inline|inline-block)\b
```

---

## Edge Cases and Gotchas

### Nested Grids
Bootstrap allows nesting `.row` inside `.col-*`. This works the same in Tailwind -- a `col-span-*` child can itself be a `grid grid-cols-12` parent:

```html
<!-- Bootstrap -->
<div class="row">
  <div class="col-md-8">
    <div class="row">
      <div class="col-md-6">Nested A</div>
      <div class="col-md-6">Nested B</div>
    </div>
  </div>
  <div class="col-md-4">Sidebar</div>
</div>

<!-- Tailwind -->
<div class="grid grid-cols-12 gap-x-[30px]">
  <div class="md:col-span-8">
    <div class="grid grid-cols-12 gap-x-[30px]">
      <div class="md:col-span-6">Nested A</div>
      <div class="md:col-span-6">Nested B</div>
    </div>
  </div>
  <div class="md:col-span-4">Sidebar</div>
</div>
```

Note: In Bootstrap, nested `.row` columns are relative to the parent column's width (since flex-basis is percentage-based). In CSS Grid with `grid-cols-12`, the nested grid creates its own 12-column context, so the behavior is equivalent.

### Columns Without a Row Parent
Sometimes Bootstrap columns appear without a `.row` wrapper. Ensure you add the `grid grid-cols-12` parent when migrating.

### Multiple Rows of Content in a Single Grid
In CSS Grid, children automatically wrap to new rows when they exceed the 12-column total. This matches Bootstrap's flex-wrap behavior on `.row`:

```html
<!-- Both Bootstrap and Tailwind handle this the same way -->
<div class="grid grid-cols-12 gap-x-[30px]">
  <div class="col-span-6">A (row 1)</div>
  <div class="col-span-6">B (row 1)</div>
  <div class="col-span-4">C (row 2)</div>
  <div class="col-span-4">D (row 2)</div>
  <div class="col-span-4">E (row 2)</div>
</div>
```

### Gap Vertical Spacing
Bootstrap rows have no vertical gutter by default. If you need vertical spacing between wrapped rows in a single grid, add `gap-y-*`:

```html
<div class="grid grid-cols-12 gap-x-[30px] gap-y-8">
```
