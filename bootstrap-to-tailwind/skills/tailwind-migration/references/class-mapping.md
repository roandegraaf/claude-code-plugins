# Bootstrap 4 → Tailwind CSS v4 Class Mapping

Exhaustive reference for automated migration tooling. Each section includes the Bootstrap class, Tailwind equivalent, and grep detection patterns.

---

## Grid System

### Container

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `container` | `container mx-auto px-4` | Tailwind container doesn't include padding by default |
| `container-fluid` | `w-full px-4` | Full-width with padding |

### Row

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `row` | `grid grid-cols-12 gap-x-[30px]` | Matches Bootstrap's 30px gutter; use CSS Grid instead of flexbox |
| `no-gutters` | `gap-0` | Remove gutter |

### Columns

#### Base Columns (No Breakpoint)

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `col` | `col-span-full` | Equal-width column; alternatively use `flex-1` in a flex container |
| `col-auto` | `col-auto` | Auto-sizing based on content width |
| `col-1` | `col-span-1` | |
| `col-2` | `col-span-2` | |
| `col-3` | `col-span-3` | |
| `col-4` | `col-span-4` | |
| `col-5` | `col-span-5` | |
| `col-6` | `col-span-6` | |
| `col-7` | `col-span-7` | |
| `col-8` | `col-span-8` | |
| `col-9` | `col-span-9` | |
| `col-10` | `col-span-10` | |
| `col-11` | `col-span-11` | |
| `col-12` | `col-span-12` | |

#### Small Breakpoint (`sm:` — 576px+)

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `col-sm` | `sm:col-span-full` | Equal-width at sm |
| `col-sm-auto` | `sm:col-auto` | |
| `col-sm-1` | `sm:col-span-1` | |
| `col-sm-2` | `sm:col-span-2` | |
| `col-sm-3` | `sm:col-span-3` | |
| `col-sm-4` | `sm:col-span-4` | |
| `col-sm-5` | `sm:col-span-5` | |
| `col-sm-6` | `sm:col-span-6` | |
| `col-sm-7` | `sm:col-span-7` | |
| `col-sm-8` | `sm:col-span-8` | |
| `col-sm-9` | `sm:col-span-9` | |
| `col-sm-10` | `sm:col-span-10` | |
| `col-sm-11` | `sm:col-span-11` | |
| `col-sm-12` | `sm:col-span-12` | |

#### Medium Breakpoint (`md:` — 768px+)

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `col-md` | `md:col-span-full` | Equal-width at md |
| `col-md-auto` | `md:col-auto` | |
| `col-md-1` | `md:col-span-1` | |
| `col-md-2` | `md:col-span-2` | |
| `col-md-3` | `md:col-span-3` | |
| `col-md-4` | `md:col-span-4` | |
| `col-md-5` | `md:col-span-5` | |
| `col-md-6` | `md:col-span-6` | |
| `col-md-7` | `md:col-span-7` | |
| `col-md-8` | `md:col-span-8` | |
| `col-md-9` | `md:col-span-9` | |
| `col-md-10` | `md:col-span-10` | |
| `col-md-11` | `md:col-span-11` | |
| `col-md-12` | `md:col-span-12` | |

#### Large Breakpoint (`lg:` — 992px+)

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `col-lg` | `lg:col-span-full` | Equal-width at lg |
| `col-lg-auto` | `lg:col-auto` | |
| `col-lg-1` | `lg:col-span-1` | |
| `col-lg-2` | `lg:col-span-2` | |
| `col-lg-3` | `lg:col-span-3` | |
| `col-lg-4` | `lg:col-span-4` | |
| `col-lg-5` | `lg:col-span-5` | |
| `col-lg-6` | `lg:col-span-6` | |
| `col-lg-7` | `lg:col-span-7` | |
| `col-lg-8` | `lg:col-span-8` | |
| `col-lg-9` | `lg:col-span-9` | |
| `col-lg-10` | `lg:col-span-10` | |
| `col-lg-11` | `lg:col-span-11` | |
| `col-lg-12` | `lg:col-span-12` | |

#### Extra Large Breakpoint (`xl:` — 1200px+)

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `col-xl` | `xl:col-span-full` | Equal-width at xl |
| `col-xl-auto` | `xl:col-auto` | |
| `col-xl-1` | `xl:col-span-1` | |
| `col-xl-2` | `xl:col-span-2` | |
| `col-xl-3` | `xl:col-span-3` | |
| `col-xl-4` | `xl:col-span-4` | |
| `col-xl-5` | `xl:col-span-5` | |
| `col-xl-6` | `xl:col-span-6` | |
| `col-xl-7` | `xl:col-span-7` | |
| `col-xl-8` | `xl:col-span-8` | |
| `col-xl-9` | `xl:col-span-9` | |
| `col-xl-10` | `xl:col-span-10` | |
| `col-xl-11` | `xl:col-span-11` | |
| `col-xl-12` | `xl:col-span-12` | |

### Offsets

Offset maps to `col-start-{n+1}` because Bootstrap's `offset-{n}` skips `n` columns, which means the element starts at column `n+1` in CSS Grid.

#### Base Offsets (No Breakpoint)

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `offset-0` | `col-start-1` | No offset |
| `offset-1` | `col-start-2` | |
| `offset-2` | `col-start-3` | |
| `offset-3` | `col-start-4` | |
| `offset-4` | `col-start-5` | |
| `offset-5` | `col-start-6` | |
| `offset-6` | `col-start-7` | |
| `offset-7` | `col-start-8` | |
| `offset-8` | `col-start-9` | |
| `offset-9` | `col-start-10` | |
| `offset-10` | `col-start-11` | |
| `offset-11` | `col-start-12` | |

#### Small Breakpoint Offsets

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `offset-sm-0` | `sm:col-start-1` |
| `offset-sm-1` | `sm:col-start-2` |
| `offset-sm-2` | `sm:col-start-3` |
| `offset-sm-3` | `sm:col-start-4` |
| `offset-sm-4` | `sm:col-start-5` |
| `offset-sm-5` | `sm:col-start-6` |
| `offset-sm-6` | `sm:col-start-7` |
| `offset-sm-7` | `sm:col-start-8` |
| `offset-sm-8` | `sm:col-start-9` |
| `offset-sm-9` | `sm:col-start-10` |
| `offset-sm-10` | `sm:col-start-11` |
| `offset-sm-11` | `sm:col-start-12` |

#### Medium Breakpoint Offsets

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `offset-md-0` | `md:col-start-1` |
| `offset-md-1` | `md:col-start-2` |
| `offset-md-2` | `md:col-start-3` |
| `offset-md-3` | `md:col-start-4` |
| `offset-md-4` | `md:col-start-5` |
| `offset-md-5` | `md:col-start-6` |
| `offset-md-6` | `md:col-start-7` |
| `offset-md-7` | `md:col-start-8` |
| `offset-md-8` | `md:col-start-9` |
| `offset-md-9` | `md:col-start-10` |
| `offset-md-10` | `md:col-start-11` |
| `offset-md-11` | `md:col-start-12` |

#### Large Breakpoint Offsets

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `offset-lg-0` | `lg:col-start-1` |
| `offset-lg-1` | `lg:col-start-2` |
| `offset-lg-2` | `lg:col-start-3` |
| `offset-lg-3` | `lg:col-start-4` |
| `offset-lg-4` | `lg:col-start-5` |
| `offset-lg-5` | `lg:col-start-6` |
| `offset-lg-6` | `lg:col-start-7` |
| `offset-lg-7` | `lg:col-start-8` |
| `offset-lg-8` | `lg:col-start-9` |
| `offset-lg-9` | `lg:col-start-10` |
| `offset-lg-10` | `lg:col-start-11` |
| `offset-lg-11` | `lg:col-start-12` |

#### Extra Large Breakpoint Offsets

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `offset-xl-0` | `xl:col-start-1` |
| `offset-xl-1` | `xl:col-start-2` |
| `offset-xl-2` | `xl:col-start-3` |
| `offset-xl-3` | `xl:col-start-4` |
| `offset-xl-4` | `xl:col-start-5` |
| `offset-xl-5` | `xl:col-start-6` |
| `offset-xl-6` | `xl:col-start-7` |
| `offset-xl-7` | `xl:col-start-8` |
| `offset-xl-8` | `xl:col-start-9` |
| `offset-xl-9` | `xl:col-start-10` |
| `offset-xl-10` | `xl:col-start-11` |
| `offset-xl-11` | `xl:col-start-12` |

---

## Display Utilities

### Base Display

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `d-none` | `hidden` |
| `d-inline` | `inline` |
| `d-inline-block` | `inline-block` |
| `d-block` | `block` |
| `d-table` | `table` |
| `d-table-cell` | `table-cell` |
| `d-table-row` | `table-row` |
| `d-flex` | `flex` |
| `d-inline-flex` | `inline-flex` |

### Responsive Display Variants

Pattern: `d-{breakpoint}-{value}` maps to `{breakpoint}:{tailwind-value}`

#### Small Breakpoint (`sm:`)

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `d-sm-none` | `sm:hidden` |
| `d-sm-inline` | `sm:inline` |
| `d-sm-inline-block` | `sm:inline-block` |
| `d-sm-block` | `sm:block` |
| `d-sm-table` | `sm:table` |
| `d-sm-table-cell` | `sm:table-cell` |
| `d-sm-table-row` | `sm:table-row` |
| `d-sm-flex` | `sm:flex` |
| `d-sm-inline-flex` | `sm:inline-flex` |

#### Medium Breakpoint (`md:`)

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `d-md-none` | `md:hidden` |
| `d-md-inline` | `md:inline` |
| `d-md-inline-block` | `md:inline-block` |
| `d-md-block` | `md:block` |
| `d-md-table` | `md:table` |
| `d-md-table-cell` | `md:table-cell` |
| `d-md-table-row` | `md:table-row` |
| `d-md-flex` | `md:flex` |
| `d-md-inline-flex` | `md:inline-flex` |

#### Large Breakpoint (`lg:`)

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `d-lg-none` | `lg:hidden` |
| `d-lg-inline` | `lg:inline` |
| `d-lg-inline-block` | `lg:inline-block` |
| `d-lg-block` | `lg:block` |
| `d-lg-table` | `lg:table` |
| `d-lg-table-cell` | `lg:table-cell` |
| `d-lg-table-row` | `lg:table-row` |
| `d-lg-flex` | `lg:flex` |
| `d-lg-inline-flex` | `lg:inline-flex` |

#### Extra Large Breakpoint (`xl:`)

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `d-xl-none` | `xl:hidden` |
| `d-xl-inline` | `xl:inline` |
| `d-xl-inline-block` | `xl:inline-block` |
| `d-xl-block` | `xl:block` |
| `d-xl-table` | `xl:table` |
| `d-xl-table-cell` | `xl:table-cell` |
| `d-xl-table-row` | `xl:table-row` |
| `d-xl-flex` | `xl:flex` |
| `d-xl-inline-flex` | `xl:inline-flex` |

### Print Display

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `d-print-none` | `print:hidden` |
| `d-print-inline` | `print:inline` |
| `d-print-inline-block` | `print:inline-block` |
| `d-print-block` | `print:block` |
| `d-print-table` | `print:table` |
| `d-print-table-cell` | `print:table-cell` |
| `d-print-table-row` | `print:table-row` |
| `d-print-flex` | `print:flex` |
| `d-print-inline-flex` | `print:inline-flex` |

---

## Flexbox Utilities

### Direction

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `flex-row` | `flex-row` |
| `flex-column` | `flex-col` |
| `flex-row-reverse` | `flex-row-reverse` |
| `flex-column-reverse` | `flex-col-reverse` |

### Wrap

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `flex-wrap` | `flex-wrap` |
| `flex-nowrap` | `flex-nowrap` |
| `flex-wrap-reverse` | `flex-wrap-reverse` |

### Grow, Shrink, and Fill

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `flex-fill` | `flex-1` |
| `flex-grow-0` | `grow-0` |
| `flex-grow-1` | `grow` |
| `flex-shrink-0` | `shrink-0` |
| `flex-shrink-1` | `shrink` |

### Justify Content

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `justify-content-start` | `justify-start` |
| `justify-content-end` | `justify-end` |
| `justify-content-center` | `justify-center` |
| `justify-content-between` | `justify-between` |
| `justify-content-around` | `justify-around` |

### Align Items

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `align-items-start` | `items-start` |
| `align-items-end` | `items-end` |
| `align-items-center` | `items-center` |
| `align-items-baseline` | `items-baseline` |
| `align-items-stretch` | `items-stretch` |

### Align Self

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `align-self-start` | `self-start` |
| `align-self-end` | `self-end` |
| `align-self-center` | `self-center` |
| `align-self-baseline` | `self-baseline` |
| `align-self-stretch` | `self-stretch` |

### Align Content

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `align-content-start` | `content-start` |
| `align-content-end` | `content-end` |
| `align-content-center` | `content-center` |
| `align-content-between` | `content-between` |
| `align-content-around` | `content-around` |
| `align-content-stretch` | `content-stretch` |

### Responsive Flexbox Variants

All flexbox utilities support responsive prefixes. Pattern: `{utility}-{breakpoint}-{value}` maps to `{breakpoint}:{tailwind-value}`.

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `flex-sm-row` | `sm:flex-row` |
| `flex-sm-column` | `sm:flex-col` |
| `flex-md-row` | `md:flex-row` |
| `flex-md-column` | `md:flex-col` |
| `flex-lg-row` | `lg:flex-row` |
| `flex-lg-column` | `lg:flex-col` |
| `flex-xl-row` | `xl:flex-row` |
| `flex-xl-column` | `xl:flex-col` |
| `flex-sm-row-reverse` | `sm:flex-row-reverse` |
| `flex-md-row-reverse` | `md:flex-row-reverse` |
| `flex-lg-row-reverse` | `lg:flex-row-reverse` |
| `flex-xl-row-reverse` | `xl:flex-row-reverse` |
| `flex-sm-column-reverse` | `sm:flex-col-reverse` |
| `flex-md-column-reverse` | `md:flex-col-reverse` |
| `flex-lg-column-reverse` | `lg:flex-col-reverse` |
| `flex-xl-column-reverse` | `xl:flex-col-reverse` |
| `flex-sm-wrap` | `sm:flex-wrap` |
| `flex-md-wrap` | `md:flex-wrap` |
| `flex-lg-wrap` | `lg:flex-wrap` |
| `flex-xl-wrap` | `xl:flex-wrap` |
| `flex-sm-nowrap` | `sm:flex-nowrap` |
| `flex-md-nowrap` | `md:flex-nowrap` |
| `flex-lg-nowrap` | `lg:flex-nowrap` |
| `flex-xl-nowrap` | `xl:flex-nowrap` |
| `flex-sm-fill` | `sm:flex-1` |
| `flex-md-fill` | `md:flex-1` |
| `flex-lg-fill` | `lg:flex-1` |
| `flex-xl-fill` | `xl:flex-1` |
| `flex-sm-grow-0` | `sm:grow-0` |
| `flex-md-grow-0` | `md:grow-0` |
| `flex-lg-grow-0` | `lg:grow-0` |
| `flex-xl-grow-0` | `xl:grow-0` |
| `flex-sm-grow-1` | `sm:grow` |
| `flex-md-grow-1` | `md:grow` |
| `flex-lg-grow-1` | `lg:grow` |
| `flex-xl-grow-1` | `xl:grow` |
| `flex-sm-shrink-0` | `sm:shrink-0` |
| `flex-md-shrink-0` | `md:shrink-0` |
| `flex-lg-shrink-0` | `lg:shrink-0` |
| `flex-xl-shrink-0` | `xl:shrink-0` |
| `flex-sm-shrink-1` | `sm:shrink` |
| `flex-md-shrink-1` | `md:shrink` |
| `flex-lg-shrink-1` | `lg:shrink` |
| `flex-xl-shrink-1` | `xl:shrink` |
| `justify-content-sm-start` | `sm:justify-start` |
| `justify-content-sm-end` | `sm:justify-end` |
| `justify-content-sm-center` | `sm:justify-center` |
| `justify-content-sm-between` | `sm:justify-between` |
| `justify-content-sm-around` | `sm:justify-around` |
| `justify-content-md-start` | `md:justify-start` |
| `justify-content-md-end` | `md:justify-end` |
| `justify-content-md-center` | `md:justify-center` |
| `justify-content-md-between` | `md:justify-between` |
| `justify-content-md-around` | `md:justify-around` |
| `justify-content-lg-start` | `lg:justify-start` |
| `justify-content-lg-end` | `lg:justify-end` |
| `justify-content-lg-center` | `lg:justify-center` |
| `justify-content-lg-between` | `lg:justify-between` |
| `justify-content-lg-around` | `lg:justify-around` |
| `justify-content-xl-start` | `xl:justify-start` |
| `justify-content-xl-end` | `xl:justify-end` |
| `justify-content-xl-center` | `xl:justify-center` |
| `justify-content-xl-between` | `xl:justify-between` |
| `justify-content-xl-around` | `xl:justify-around` |
| `align-items-sm-start` | `sm:items-start` |
| `align-items-sm-end` | `sm:items-end` |
| `align-items-sm-center` | `sm:items-center` |
| `align-items-sm-baseline` | `sm:items-baseline` |
| `align-items-sm-stretch` | `sm:items-stretch` |
| `align-items-md-start` | `md:items-start` |
| `align-items-md-end` | `md:items-end` |
| `align-items-md-center` | `md:items-center` |
| `align-items-md-baseline` | `md:items-baseline` |
| `align-items-md-stretch` | `md:items-stretch` |
| `align-items-lg-start` | `lg:items-start` |
| `align-items-lg-end` | `lg:items-end` |
| `align-items-lg-center` | `lg:items-center` |
| `align-items-lg-baseline` | `lg:items-baseline` |
| `align-items-lg-stretch` | `lg:items-stretch` |
| `align-items-xl-start` | `xl:items-start` |
| `align-items-xl-end` | `xl:items-end` |
| `align-items-xl-center` | `xl:items-center` |
| `align-items-xl-baseline` | `xl:items-baseline` |
| `align-items-xl-stretch` | `xl:items-stretch` |
| `align-self-sm-start` | `sm:self-start` |
| `align-self-sm-end` | `sm:self-end` |
| `align-self-sm-center` | `sm:self-center` |
| `align-self-sm-baseline` | `sm:self-baseline` |
| `align-self-sm-stretch` | `sm:self-stretch` |
| `align-self-md-start` | `md:self-start` |
| `align-self-md-end` | `md:self-end` |
| `align-self-md-center` | `md:self-center` |
| `align-self-md-baseline` | `md:self-baseline` |
| `align-self-md-stretch` | `md:self-stretch` |
| `align-self-lg-start` | `lg:self-start` |
| `align-self-lg-end` | `lg:self-end` |
| `align-self-lg-center` | `lg:self-center` |
| `align-self-lg-baseline` | `lg:self-baseline` |
| `align-self-lg-stretch` | `lg:self-stretch` |
| `align-self-xl-start` | `xl:self-start` |
| `align-self-xl-end` | `xl:self-end` |
| `align-self-xl-center` | `xl:self-center` |
| `align-self-xl-baseline` | `xl:self-baseline` |
| `align-self-xl-stretch` | `xl:self-stretch` |
| `align-content-sm-start` | `sm:content-start` |
| `align-content-sm-end` | `sm:content-end` |
| `align-content-sm-center` | `sm:content-center` |
| `align-content-sm-between` | `sm:content-between` |
| `align-content-sm-around` | `sm:content-around` |
| `align-content-sm-stretch` | `sm:content-stretch` |
| `align-content-md-start` | `md:content-start` |
| `align-content-md-end` | `md:content-end` |
| `align-content-md-center` | `md:content-center` |
| `align-content-md-between` | `md:content-between` |
| `align-content-md-around` | `md:content-around` |
| `align-content-md-stretch` | `md:content-stretch` |
| `align-content-lg-start` | `lg:content-start` |
| `align-content-lg-end` | `lg:content-end` |
| `align-content-lg-center` | `lg:content-center` |
| `align-content-lg-between` | `lg:content-between` |
| `align-content-lg-around` | `lg:content-around` |
| `align-content-lg-stretch` | `lg:content-stretch` |
| `align-content-xl-start` | `xl:content-start` |
| `align-content-xl-end` | `xl:content-end` |
| `align-content-xl-center` | `xl:content-center` |
| `align-content-xl-between` | `xl:content-between` |
| `align-content-xl-around` | `xl:content-around` |
| `align-content-xl-stretch` | `xl:content-stretch` |

### Order

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `order-first` | `order-first` |
| `order-last` | `order-last` |
| `order-0` | `order-0` |
| `order-1` | `order-1` |
| `order-2` | `order-2` |
| `order-3` | `order-3` |
| `order-4` | `order-4` |
| `order-5` | `order-5` |
| `order-6` | `order-6` |
| `order-7` | `order-7` |
| `order-8` | `order-8` |
| `order-9` | `order-9` |
| `order-10` | `order-10` |
| `order-11` | `order-11` |
| `order-12` | `order-12` |

#### Responsive Order Variants

Pattern: `order-{breakpoint}-{value}` maps to `{breakpoint}:order-{value}`.

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `order-sm-first` | `sm:order-first` |
| `order-sm-last` | `sm:order-last` |
| `order-sm-0` through `order-sm-12` | `sm:order-{n}` |
| `order-md-first` | `md:order-first` |
| `order-md-last` | `md:order-last` |
| `order-md-0` through `order-md-12` | `md:order-{n}` |
| `order-lg-first` | `lg:order-first` |
| `order-lg-last` | `lg:order-last` |
| `order-lg-0` through `order-lg-12` | `lg:order-{n}` |
| `order-xl-first` | `xl:order-first` |
| `order-xl-last` | `xl:order-last` |
| `order-xl-0` through `order-xl-12` | `xl:order-{n}` |

---

## Text Utilities

### Text Alignment

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `text-left` | `text-left` |
| `text-center` | `text-center` |
| `text-right` | `text-right` |
| `text-justify` | `text-justify` |

#### Responsive Text Alignment

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `text-sm-left` | `sm:text-left` |
| `text-sm-center` | `sm:text-center` |
| `text-sm-right` | `sm:text-right` |
| `text-md-left` | `md:text-left` |
| `text-md-center` | `md:text-center` |
| `text-md-right` | `md:text-right` |
| `text-lg-left` | `lg:text-left` |
| `text-lg-center` | `lg:text-center` |
| `text-lg-right` | `lg:text-right` |
| `text-xl-left` | `xl:text-left` |
| `text-xl-center` | `xl:text-center` |
| `text-xl-right` | `xl:text-right` |

### Text Transform

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `text-lowercase` | `lowercase` |
| `text-uppercase` | `uppercase` |
| `text-capitalize` | `capitalize` |

### Text Wrapping and Overflow

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `text-nowrap` | `whitespace-nowrap` |
| `text-truncate` | `truncate` |
| `text-break` | `break-words` |

### Font Weight and Style

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `font-weight-bold` | `font-bold` |
| `font-weight-bolder` | `font-extrabold` |
| `font-weight-normal` | `font-normal` |
| `font-weight-light` | `font-light` |
| `font-weight-lighter` | `font-extralight` |
| `font-italic` | `italic` |

### Font Family

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `text-monospace` | `font-mono` |

### Text Decoration

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `text-decoration-none` | `no-underline` |

---

## Sizing Utilities

### Width

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `w-25` | `w-1/4` |
| `w-50` | `w-1/2` |
| `w-75` | `w-3/4` |
| `w-100` | `w-full` |
| `w-auto` | `w-auto` |

### Height

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `h-25` | `h-1/4` |
| `h-50` | `h-1/2` |
| `h-75` | `h-3/4` |
| `h-100` | `h-full` |
| `h-auto` | `h-auto` |

### Max / Min / Viewport

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `mw-100` | `max-w-full` |
| `mh-100` | `max-h-full` |
| `min-vw-100` | `min-w-screen` |
| `min-vh-100` | `min-h-screen` |
| `vw-100` | `w-screen` |
| `vh-100` | `h-screen` |

---

## Spacing Utilities

Bootstrap uses `{property}{sides}-{size}` with sizes 0-5 + auto. Tailwind uses `{property}{side}-{value}` with its own spacing scale.

### Value Mapping (Bootstrap size → CSS value → Tailwind value)

| Bootstrap size | CSS value | Tailwind value |
|---|---|---|
| `0` | `0` | `0` |
| `1` | `0.25rem` | `1` |
| `2` | `0.5rem` | `2` |
| `3` | `1rem` | `4` |
| `4` | `1.5rem` | `6` |
| `5` | `3rem` | `12` |
| `auto` | `auto` | `auto` |

### Property Mapping

| Bootstrap prefix | Tailwind prefix |
|---|---|
| `m-` | `m-` |
| `mt-` | `mt-` |
| `mb-` | `mb-` |
| `ml-` | `ml-` |
| `mr-` | `mr-` |
| `mx-` | `mx-` |
| `my-` | `my-` |
| `p-` | `p-` |
| `pt-` | `pt-` |
| `pb-` | `pb-` |
| `pl-` | `pl-` |
| `pr-` | `pr-` |
| `px-` | `px-` |
| `py-` | `py-` |

### Margin Examples (Full Mapping)

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `m-0` | `m-0` |
| `m-1` | `m-1` |
| `m-2` | `m-2` |
| `m-3` | `m-4` |
| `m-4` | `m-6` |
| `m-5` | `m-12` |
| `m-auto` | `m-auto` |
| `mt-0` | `mt-0` |
| `mt-1` | `mt-1` |
| `mt-2` | `mt-2` |
| `mt-3` | `mt-4` |
| `mt-4` | `mt-6` |
| `mt-5` | `mt-12` |
| `mt-auto` | `mt-auto` |
| `mb-0` | `mb-0` |
| `mb-1` | `mb-1` |
| `mb-2` | `mb-2` |
| `mb-3` | `mb-4` |
| `mb-4` | `mb-6` |
| `mb-5` | `mb-12` |
| `ml-0` | `ml-0` |
| `ml-1` | `ml-1` |
| `ml-2` | `ml-2` |
| `ml-3` | `ml-4` |
| `ml-4` | `ml-6` |
| `ml-5` | `ml-12` |
| `ml-auto` | `ml-auto` |
| `mr-0` | `mr-0` |
| `mr-1` | `mr-1` |
| `mr-2` | `mr-2` |
| `mr-3` | `mr-4` |
| `mr-4` | `mr-6` |
| `mr-5` | `mr-12` |
| `mr-auto` | `mr-auto` |
| `mx-0` | `mx-0` |
| `mx-1` | `mx-1` |
| `mx-2` | `mx-2` |
| `mx-3` | `mx-4` |
| `mx-4` | `mx-6` |
| `mx-5` | `mx-12` |
| `mx-auto` | `mx-auto` |
| `my-0` | `my-0` |
| `my-1` | `my-1` |
| `my-2` | `my-2` |
| `my-3` | `my-4` |
| `my-4` | `my-6` |
| `my-5` | `my-12` |
| `my-auto` | `my-auto` |

### Padding Examples (Full Mapping)

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `p-0` | `p-0` |
| `p-1` | `p-1` |
| `p-2` | `p-2` |
| `p-3` | `p-4` |
| `p-4` | `p-6` |
| `p-5` | `p-12` |
| `pt-0` | `pt-0` |
| `pt-1` | `pt-1` |
| `pt-2` | `pt-2` |
| `pt-3` | `pt-4` |
| `pt-4` | `pt-6` |
| `pt-5` | `pt-12` |
| `pb-0` | `pb-0` |
| `pb-1` | `pb-1` |
| `pb-2` | `pb-2` |
| `pb-3` | `pb-4` |
| `pb-4` | `pb-6` |
| `pb-5` | `pb-12` |
| `pl-0` | `pl-0` |
| `pl-1` | `pl-1` |
| `pl-2` | `pl-2` |
| `pl-3` | `pl-4` |
| `pl-4` | `pl-6` |
| `pl-5` | `pl-12` |
| `pr-0` | `pr-0` |
| `pr-1` | `pr-1` |
| `pr-2` | `pr-2` |
| `pr-3` | `pr-4` |
| `pr-4` | `pr-6` |
| `pr-5` | `pr-12` |
| `px-0` | `px-0` |
| `px-1` | `px-1` |
| `px-2` | `px-2` |
| `px-3` | `px-4` |
| `px-4` | `px-6` |
| `px-5` | `px-12` |
| `py-0` | `py-0` |
| `py-1` | `py-1` |
| `py-2` | `py-2` |
| `py-3` | `py-4` |
| `py-4` | `py-6` |
| `py-5` | `py-12` |

### Negative Margins

Bootstrap `m{side}-n{size}` maps to `-m{side}-{tailwind-value}`.

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `mt-n1` | `-mt-1` |
| `mt-n2` | `-mt-2` |
| `mt-n3` | `-mt-4` |
| `mt-n4` | `-mt-6` |
| `mt-n5` | `-mt-12` |
| `mb-n1` | `-mb-1` |
| `mb-n2` | `-mb-2` |
| `mb-n3` | `-mb-4` |
| `mb-n4` | `-mb-6` |
| `mb-n5` | `-mb-12` |
| `ml-n1` | `-ml-1` |
| `ml-n2` | `-ml-2` |
| `ml-n3` | `-ml-4` |
| `ml-n4` | `-ml-6` |
| `ml-n5` | `-ml-12` |
| `mr-n1` | `-mr-1` |
| `mr-n2` | `-mr-2` |
| `mr-n3` | `-mr-4` |
| `mr-n4` | `-mr-6` |
| `mr-n5` | `-mr-12` |
| `mx-n1` | `-mx-1` |
| `mx-n2` | `-mx-2` |
| `mx-n3` | `-mx-4` |
| `mx-n4` | `-mx-6` |
| `mx-n5` | `-mx-12` |
| `my-n1` | `-my-1` |
| `my-n2` | `-my-2` |
| `my-n3` | `-my-4` |
| `my-n4` | `-my-6` |
| `my-n5` | `-my-12` |
| `m-n1` | `-m-1` |
| `m-n2` | `-m-2` |
| `m-n3` | `-m-4` |
| `m-n4` | `-m-6` |
| `m-n5` | `-m-12` |

### Responsive Spacing Variants

Pattern: `{property}{side}-{breakpoint}-{size}` maps to `{breakpoint}:{tailwind-property}{side}-{tailwind-value}`.

Examples:

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `m-sm-0` | `sm:m-0` |
| `m-sm-3` | `sm:m-4` |
| `p-md-4` | `md:p-6` |
| `mt-lg-5` | `lg:mt-12` |
| `px-xl-3` | `xl:px-4` |
| `mb-sm-auto` | `sm:mb-auto` |
| `mx-md-auto` | `md:mx-auto` |

The same value mapping table applies to responsive variants. Replace the size number using the conversion: 0→0, 1→1, 2→2, 3→4, 4→6, 5→12.

---

## Visibility

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `visible` | `visible` |
| `invisible` | `invisible` |
| `sr-only` | `sr-only` |
| `sr-only-focusable` | `not-sr-only` (apply on `focus:`) |

> **Note:** For `sr-only-focusable`, use `sr-only focus:not-sr-only` to show the element when focused.

---

## Position

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `position-static` | `static` |
| `position-relative` | `relative` |
| `position-absolute` | `absolute` |
| `position-fixed` | `fixed` |
| `position-sticky` | `sticky` |
| `fixed-top` | `fixed top-0 inset-x-0` |
| `fixed-bottom` | `fixed bottom-0 inset-x-0` |
| `sticky-top` | `sticky top-0` |

---

## Float

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `float-left` | `float-left` |
| `float-right` | `float-right` |
| `float-none` | `float-none` |
| `clearfix` | `after:clear-both after:table after:content-['']` |

### Responsive Float Variants

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `float-sm-left` | `sm:float-left` |
| `float-sm-right` | `sm:float-right` |
| `float-sm-none` | `sm:float-none` |
| `float-md-left` | `md:float-left` |
| `float-md-right` | `md:float-right` |
| `float-md-none` | `md:float-none` |
| `float-lg-left` | `lg:float-left` |
| `float-lg-right` | `lg:float-right` |
| `float-lg-none` | `lg:float-none` |
| `float-xl-left` | `xl:float-left` |
| `float-xl-right` | `xl:float-right` |
| `float-xl-none` | `xl:float-none` |

---

## Border

### Border Addition

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `border` | `border` |
| `border-top` | `border-t` |
| `border-right` | `border-r` |
| `border-bottom` | `border-b` |
| `border-left` | `border-l` |

### Border Removal

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `border-0` | `border-0` |
| `border-top-0` | `border-t-0` |
| `border-right-0` | `border-r-0` |
| `border-bottom-0` | `border-b-0` |
| `border-left-0` | `border-l-0` |

### Border Radius

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `rounded` | `rounded` |
| `rounded-top` | `rounded-t` |
| `rounded-right` | `rounded-r` |
| `rounded-bottom` | `rounded-b` |
| `rounded-left` | `rounded-l` |
| `rounded-circle` | `rounded-full` |
| `rounded-pill` | `rounded-full` |
| `rounded-0` | `rounded-none` |
| `rounded-sm` | `rounded-sm` |
| `rounded-lg` | `rounded-lg` |

### Border Color

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `border-primary` | `border-[var(--color-primary)]` | Requires @theme definition |
| `border-secondary` | `border-[var(--color-secondary)]` | Requires @theme definition |
| `border-success` | `border-[var(--color-success)]` | Requires @theme definition |
| `border-danger` | `border-[var(--color-danger)]` | Requires @theme definition |
| `border-warning` | `border-[var(--color-warning)]` | Requires @theme definition |
| `border-info` | `border-[var(--color-info)]` | Requires @theme definition |
| `border-light` | `border-gray-200` | Approximate |
| `border-dark` | `border-gray-800` | Approximate |
| `border-white` | `border-white` | Direct |

---

## Color Utilities

> **Important:** Bootstrap's contextual colors (primary, secondary, success, danger, warning, info, light, dark) need to be mapped via `@theme` custom properties in your Tailwind CSS configuration. These cannot be auto-mapped 1:1 without defining the color values.

### Text Colors

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `text-primary` | `text-[var(--color-primary)]` | Requires @theme definition |
| `text-secondary` | `text-[var(--color-secondary)]` | Requires @theme definition |
| `text-success` | `text-[var(--color-success)]` | Requires @theme definition |
| `text-danger` | `text-[var(--color-danger)]` | Requires @theme definition |
| `text-warning` | `text-[var(--color-warning)]` | Requires @theme definition |
| `text-info` | `text-[var(--color-info)]` | Requires @theme definition |
| `text-light` | `text-gray-200` | Approximate |
| `text-dark` | `text-gray-900` | Approximate |
| `text-body` | `text-gray-900` | Approximate (Bootstrap default body color) |
| `text-muted` | `text-gray-500` | Approximate |
| `text-white` | `text-white` | Direct |
| `text-black-50` | `text-black/50` | Tailwind opacity modifier |
| `text-white-50` | `text-white/50` | Tailwind opacity modifier |

### Background Colors

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `bg-primary` | `bg-[var(--color-primary)]` | Requires @theme definition |
| `bg-secondary` | `bg-[var(--color-secondary)]` | Requires @theme definition |
| `bg-success` | `bg-[var(--color-success)]` | Requires @theme definition |
| `bg-danger` | `bg-[var(--color-danger)]` | Requires @theme definition |
| `bg-warning` | `bg-[var(--color-warning)]` | Requires @theme definition |
| `bg-info` | `bg-[var(--color-info)]` | Requires @theme definition |
| `bg-light` | `bg-gray-100` | Approximate |
| `bg-dark` | `bg-gray-900` | Approximate |
| `bg-white` | `bg-white` | Direct |
| `bg-transparent` | `bg-transparent` | Direct |

### Recommended @theme Configuration

```css
@theme {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
}
```

---

## Overflow

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `overflow-auto` | `overflow-auto` |
| `overflow-hidden` | `overflow-hidden` |

---

## Shadow

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `shadow-none` | `shadow-none` |
| `shadow-sm` | `shadow-sm` |
| `shadow` | `shadow` |
| `shadow-lg` | `shadow-lg` |

---

## Vertical Alignment

| Bootstrap 4 | Tailwind v4 |
|---|---|
| `align-baseline` | `align-baseline` |
| `align-top` | `align-top` |
| `align-middle` | `align-middle` |
| `align-bottom` | `align-bottom` |
| `align-text-top` | `align-text-top` |
| `align-text-bottom` | `align-text-bottom` |

---

## Embed / Aspect Ratio

| Bootstrap 4 | Tailwind v4 | Notes |
|---|---|---|
| `embed-responsive embed-responsive-21by9` | `aspect-video` | Approximate; use `aspect-[21/9]` for exact |
| `embed-responsive embed-responsive-16by9` | `aspect-video` | Direct match |
| `embed-responsive embed-responsive-4by3` | `aspect-[4/3]` | Arbitrary value |
| `embed-responsive embed-responsive-1by1` | `aspect-square` | Direct match |

---

## JS Component Classes (Detection Only)

These classes indicate Bootstrap JS component usage. They cannot be simple class-swapped — they require structural changes.

### Data Attribute Triggers

| Bootstrap Pattern | Detection | Suggested Replacement |
|---|---|---|
| `data-toggle="modal"` | grep for `data-toggle="modal"` | CSS `<dialog>` element or Alpine.js |
| `data-toggle="dropdown"` | grep for `data-toggle="dropdown"` | CSS `:focus-within` or Alpine.js |
| `data-toggle="collapse"` | grep for `data-toggle="collapse"` | HTML `<details>/<summary>` or Alpine.js |
| `data-toggle="tab"` | grep for `data-toggle="tab"` | CSS radio button hack or Alpine.js |
| `data-toggle="tooltip"` | grep for `data-toggle="tooltip"` | CSS `::after` + `:hover` or Floating UI |
| `data-toggle="popover"` | grep for `data-toggle="popover"` | Tippy.js, Floating UI, or CSS |
| `data-dismiss="alert"` | grep for `data-dismiss` | Alpine.js `x-show` |
| `data-dismiss="modal"` | grep for `data-dismiss="modal"` | `<dialog>` `.close()` method |

### Component Classes

| Bootstrap Pattern | Detection | Suggested Replacement |
|---|---|---|
| `class="carousel"` | grep for `carousel` class | Flickity, Swiper, or CSS scroll-snap |
| `class="modal"` | grep for `modal` class | Native `<dialog>` element |
| `class="dropdown"` | grep for `dropdown` class | CSS `:focus-within` or Alpine.js |
| `class="collapse"` | grep for `collapse` class | `<details>/<summary>` element |
| `class="nav-tabs"` | grep for `nav-tabs` class | CSS radio button pattern |
| `class="toast"` | grep for `toast` class | Custom notification component |

### jQuery Plugin Calls

| Bootstrap Pattern | Detection | Suggested Replacement |
|---|---|---|
| `$().modal(` | grep for `.modal(` | JS replacement needed |
| `$().tooltip(` | grep for `.tooltip(` | Floating UI |
| `$().popover(` | grep for `.popover(` | Floating UI |
| `$().collapse(` | grep for `.collapse(` | JS replacement needed |
| `$().dropdown(` | grep for `.dropdown(` | JS replacement needed |
| `$().tab(` | grep for `.tab(` | JS replacement needed |
| `$().carousel(` | grep for `.carousel(` | Swiper.js or similar |
| `$().alert(` | grep for `.alert(` | JS replacement needed |

---

## Detection Grep Patterns

Ready-to-use grep commands for finding Bootstrap classes in PHP/HTML files.

### Grid

```bash
grep -rPn 'class="[^"]*\b(container|container-fluid|row|no-gutters|col(-[a-z]{2})?(-\d{1,2})?|offset(-[a-z]{2})?-\d{1,2})\b' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Display

```bash
grep -rPn 'class="[^"]*\bd-(none|inline|inline-block|block|table|table-cell|table-row|flex|inline-flex|sm-|md-|lg-|xl-|print-)' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Flex

```bash
grep -rPn 'class="[^"]*\b(flex-(row|column|wrap|nowrap|fill|grow|shrink)|justify-content-|align-items-|align-self-|align-content-|order-(first|last|\d))' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Text

```bash
grep -rPn 'class="[^"]*\b(text-(left|center|right|justify|nowrap|truncate|break|lowercase|uppercase|capitalize|monospace|decoration-none)|font-weight-|font-italic)' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Spacing

```bash
grep -rPn 'class="[^"]*\b[mp][tbrlxy]?-([0-5]|auto|n[1-5])' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Responsive Spacing

```bash
grep -rPn 'class="[^"]*\b[mp][tbrlxy]?-(sm|md|lg|xl)-([0-5]|auto|n[1-5])' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Sizing

```bash
grep -rPn 'class="[^"]*\b(([wh]-(25|50|75|100|auto))|m[wh]-100|min-v[wh]-100|v[wh]-100)\b' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Colors

```bash
grep -rPn 'class="[^"]*\b(text|bg|border)-(primary|secondary|success|danger|warning|info|light|dark|white|muted|body|transparent)\b' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Position

```bash
grep -rPn 'class="[^"]*\b(position-(static|relative|absolute|fixed|sticky)|fixed-top|fixed-bottom|sticky-top)\b' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Visibility

```bash
grep -rPn 'class="[^"]*\b(visible|invisible|sr-only|sr-only-focusable)\b' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Border

```bash
grep -rPn 'class="[^"]*\b(border(-top|-right|-bottom|-left|-0)?|rounded(-top|-right|-bottom|-left|-circle|-pill|-0|-sm|-lg)?)\b' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Float

```bash
grep -rPn 'class="[^"]*\b(float-(left|right|none)|clearfix)\b' --include='*.php' --include='*.blade.php' --include='*.html'
```

### Shadow

```bash
grep -rPn 'class="[^"]*\bshadow(-none|-sm|-lg)?\b' --include='*.php' --include='*.blade.php' --include='*.html'
```

### JS Components

```bash
grep -rPn 'data-toggle=|data-dismiss=|\.modal\(|\.tooltip\(|\.popover\(|\.collapse\(|\.dropdown\(|\.tab\(|\.carousel\(|\.alert\(' --include='*.php' --include='*.blade.php' --include='*.html' --include='*.js'
```

### All Bootstrap Classes (Broad Sweep)

```bash
grep -rPn 'class="[^"]*\b(container|row|col-|offset-|d-|flex-|justify-content-|align-items-|align-self-|align-content-|order-|text-|font-|[mp][tbrlxy]?-[0-5]|[wh]-(25|50|75|100)|border|rounded|shadow|float-|position-|fixed-|sticky-|visible|invisible|sr-only|clearfix|no-gutters)' --include='*.php' --include='*.blade.php' --include='*.html'
```

---

## Edge Cases

### Dynamic PHP Class Strings

These patterns cannot be auto-migrated and must be flagged for manual review:

```php
// Variable-based column sizes
$class = 'col-md-' . $columns;
echo '<div class="col-' . $size . '-6">';

// Interpolated breakpoints
$classes = "d-{$breakpoint}-none";

// Conditional class building
$class = $isWide ? 'col-md-8' : 'col-md-6';

// Array-based class lists (Laravel/Blade)
@class(['col-md-6' => $condition, 'd-flex' => true])
```

**Detection pattern:**
```bash
grep -rPn "(col-|d-|[mp][tbrlxy]?-).*\\$|class.*\\.\\s*.*col|class.*\\.\\s*.*d-|\\$.*col-|\\$.*d-" --include='*.php' --include='*.blade.php'
```

### Mixed Bootstrap + BEM Classes

```html
<div class="col-md-6 card__wrapper d-flex align-items-center">
```

Only replace Bootstrap utility classes. Preserve BEM, custom, and third-party classes. Each class within the `class` attribute string should be evaluated and mapped individually.

**Strategy:** Split the class string on whitespace, check each token against the mapping tables, replace matches, leave non-matches untouched, rejoin with spaces.

### `col` Without Number

Bootstrap `col` (equal-width column) has no direct Tailwind CSS Grid equivalent. Two approaches:

1. **Grid approach:** Use `col-span-full` for full-width, or calculate the span based on sibling count.
2. **Flexbox approach:** Convert the parent `row` from `grid` to `flex` and use `flex-1` on the child. This more closely matches Bootstrap's behavior.

**Recommendation:** Flag for manual review when `col` (without a number) is detected, as the correct replacement depends on the sibling count.

### Responsive Class Consolidation

When a Bootstrap element has multiple responsive display classes, they map directly to Tailwind responsive prefixes:

```html
<!-- Bootstrap -->
<div class="d-none d-md-block d-xl-none">

<!-- Tailwind -->
<div class="hidden md:block xl:hidden">
```

Each responsive class is independently mapped. The order in the class string does not matter for functionality, but convention is mobile-first (smallest breakpoint first).

### Conflicting Responsive Classes

Watch for Bootstrap patterns where a base class is overridden at a breakpoint:

```html
<!-- Bootstrap: hidden by default, block at md, flex at lg -->
<div class="d-none d-md-block d-lg-flex">

<!-- Tailwind -->
<div class="hidden md:block lg:flex">
```

### Print Utilities

```html
<!-- Bootstrap -->
<div class="d-print-none">

<!-- Tailwind -->
<div class="print:hidden">
```

### Spacing with Responsive Breakpoints and Negative Values

```html
<!-- Bootstrap: negative margin at md breakpoint -->
<div class="mt-md-n3">

<!-- Tailwind: responsive negative margin -->
<div class="md:-mt-4">
```

Note the Tailwind convention places the negative sign before the property, not the value: `md:-mt-4` (not `md:mt--4`).
