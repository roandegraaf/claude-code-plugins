# Bootstrap JS Component Detection & Replacement

## Overview

Bootstrap 4's JavaScript components (modals, dropdowns, collapse, tabs, tooltips, popovers, carousels, alerts) depend on jQuery and Bootstrap's JS library. When migrating to Tailwind, these must be replaced with CSS-only solutions, Alpine.js, or lightweight JS alternatives.

## Detection Patterns

### Script Tag / Import Detection

```bash
# CDN script tags
grep -rPn 'bootstrap\.(min\.)?js|bootstrap\.bundle\.(min\.)?js' --include='*.php' --include='*.html' --include='*.blade.php'

# npm package imports
grep -rPn "require\('bootstrap'\)|import.*from.*'bootstrap'|import.*bootstrap" --include='*.js' --include='*.ts'

# jQuery Bootstrap plugin calls
grep -rPn '\$\([^)]*\)\.(modal|tooltip|popover|dropdown|collapse|tab|carousel|alert|button)\(' --include='*.js' --include='*.php'

# package.json dependency
grep -rPn '"bootstrap":|"bootstrap-sass":' --include='package.json'
```

### Per-Component Detection

#### Modal

```bash
grep -rPn 'data-toggle="modal"|data-target="#.*[Mm]odal|\.modal\(|class="[^"]*modal' --include='*.php' --include='*.blade.php' --include='*.js' --include='*.html'
```

#### Dropdown

```bash
grep -rPn 'data-toggle="dropdown"|class="[^"]*dropdown|\.dropdown\(' --include='*.php' --include='*.blade.php' --include='*.js' --include='*.html'
```

#### Collapse / Accordion

```bash
grep -rPn 'data-toggle="collapse"|class="[^"]*collapse|\.collapse\(' --include='*.php' --include='*.blade.php' --include='*.js' --include='*.html'
```

#### Tabs / Pills

```bash
grep -rPn 'data-toggle="tab"|data-toggle="pill"|class="[^"]*nav-tabs|class="[^"]*nav-pills|\.tab\(' --include='*.php' --include='*.blade.php' --include='*.js' --include='*.html'
```

#### Tooltip

```bash
grep -rPn 'data-toggle="tooltip"|\.tooltip\(|data-placement=' --include='*.php' --include='*.blade.php' --include='*.js' --include='*.html'
```

#### Popover

```bash
grep -rPn 'data-toggle="popover"|\.popover\(|data-content=' --include='*.php' --include='*.blade.php' --include='*.js' --include='*.html'
```

#### Carousel

```bash
grep -rPn 'class="[^"]*carousel|data-ride="carousel"|\.carousel\(|carousel-item|carousel-control' --include='*.php' --include='*.blade.php' --include='*.js' --include='*.html'
```

#### Alert (Dismissible)

```bash
grep -rPn 'data-dismiss="alert"|class="[^"]*alert-dismissible|\.alert\(' --include='*.php' --include='*.blade.php' --include='*.js' --include='*.html'
```

---

## Replacement Strategies

### Modal → HTML `<dialog>` or Alpine.js

#### Option A: Native HTML `<dialog>` (Preferred -- no JS dependency)

```html
<!-- Bootstrap (before) -->
<button data-toggle="modal" data-target="#myModal">Open</button>
<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Title</h5>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">Content</div>
      <div class="modal-footer">
        <button data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Tailwind + <dialog> (after) -->
<button onclick="document.getElementById('myModal').showModal()">Open</button>
<dialog id="myModal" class="rounded-lg p-0 backdrop:bg-black/50 max-w-lg w-full">
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h5 class="text-lg font-semibold">Title</h5>
      <button onclick="this.closest('dialog').close()" class="text-gray-500 hover:text-gray-700">&times;</button>
    </div>
    <div class="mb-4">Content</div>
    <div class="flex justify-end">
      <button onclick="this.closest('dialog').close()" class="px-4 py-2 bg-gray-200 rounded">Close</button>
    </div>
  </div>
</dialog>
```

#### Option B: Alpine.js

```html
<div x-data="{ open: false }">
  <button @click="open = true">Open</button>
  <div x-show="open" x-transition class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black/50" @click="open = false"></div>
    <div class="relative bg-white rounded-lg p-6 max-w-lg w-full z-10">
      <h5 class="text-lg font-semibold mb-4">Title</h5>
      <div class="mb-4">Content</div>
      <button @click="open = false" class="px-4 py-2 bg-gray-200 rounded">Close</button>
    </div>
  </div>
</div>
```

### Dropdown → CSS `:focus-within` or Alpine.js

#### Option A: CSS-only with `:focus-within`

```html
<!-- Tailwind + CSS-only (after) -->
<div class="relative group">
  <button class="px-4 py-2" tabindex="0">Dropdown</button>
  <div class="absolute hidden group-focus-within:block bg-white shadow-lg rounded mt-1 min-w-[10rem] z-10">
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Action 1</a>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Action 2</a>
  </div>
</div>
```

#### Option B: Alpine.js

```html
<div x-data="{ open: false }" class="relative">
  <button @click="open = !open" @click.outside="open = false" class="px-4 py-2">Dropdown</button>
  <div x-show="open" x-transition class="absolute bg-white shadow-lg rounded mt-1 min-w-[10rem] z-10">
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Action 1</a>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Action 2</a>
  </div>
</div>
```

### Collapse / Accordion → HTML `<details>/<summary>`

#### Option A: Native HTML (Preferred)

```html
<!-- Bootstrap (before) -->
<button data-toggle="collapse" data-target="#content1">Toggle</button>
<div class="collapse" id="content1">
  <div class="card card-body">Content here</div>
</div>

<!-- HTML5 (after) -->
<details class="border rounded">
  <summary class="px-4 py-3 cursor-pointer font-medium hover:bg-gray-50">Toggle</summary>
  <div class="px-4 py-3 border-t">Content here</div>
</details>
```

#### Accordion (exclusive open)

```html
<!-- HTML5 exclusive accordion using name attribute -->
<details name="accordion" class="border rounded mb-2">
  <summary class="px-4 py-3 cursor-pointer">Section 1</summary>
  <div class="px-4 py-3 border-t">Content 1</div>
</details>
<details name="accordion" class="border rounded mb-2">
  <summary class="px-4 py-3 cursor-pointer">Section 2</summary>
  <div class="px-4 py-3 border-t">Content 2</div>
</details>
```

#### Option B: Alpine.js (for animation)

```html
<div x-data="{ open: false }">
  <button @click="open = !open" class="w-full text-left px-4 py-3">
    Toggle
    <span x-text="open ? '−' : '+'" class="float-right"></span>
  </button>
  <div x-show="open" x-collapse class="px-4 py-3">Content here</div>
</div>
```

### Tabs → CSS Radio Buttons or Alpine.js

#### Option A: CSS-only with Radio Buttons

```html
<div class="tabs">
  <input type="radio" name="tabs" id="tab1" checked class="hidden peer/tab1">
  <input type="radio" name="tabs" id="tab2" class="hidden peer/tab2">

  <nav class="flex border-b">
    <label for="tab1" class="px-4 py-2 cursor-pointer border-b-2 border-transparent peer-checked/tab1:border-blue-500">Tab 1</label>
    <label for="tab2" class="px-4 py-2 cursor-pointer border-b-2 border-transparent peer-checked/tab2:border-blue-500">Tab 2</label>
  </nav>

  <div class="hidden peer-checked/tab1:block p-4">Tab 1 content</div>
  <div class="hidden peer-checked/tab2:block p-4">Tab 2 content</div>
</div>
```

#### Option B: Alpine.js (Recommended for complex tabs)

```html
<div x-data="{ tab: 'tab1' }">
  <nav class="flex border-b">
    <button @click="tab = 'tab1'" :class="tab === 'tab1' ? 'border-blue-500' : 'border-transparent'" class="px-4 py-2 border-b-2">Tab 1</button>
    <button @click="tab = 'tab2'" :class="tab === 'tab2' ? 'border-blue-500' : 'border-transparent'" class="px-4 py-2 border-b-2">Tab 2</button>
  </nav>
  <div x-show="tab === 'tab1'" class="p-4">Tab 1 content</div>
  <div x-show="tab === 'tab2'" class="p-4">Tab 2 content</div>
</div>
```

### Carousel → Existing Library or CSS Scroll-Snap

Note: The ISO site already uses Flickity for carousels. If a site uses Bootstrap's carousel, here are alternatives:

#### Option A: CSS Scroll-Snap (Simple carousels)

```html
<div class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth">
  <div class="snap-center shrink-0 w-full">Slide 1</div>
  <div class="snap-center shrink-0 w-full">Slide 2</div>
  <div class="snap-center shrink-0 w-full">Slide 3</div>
</div>
```

#### Option B: Swiper.js (Full-featured)

```html
<!-- Requires swiper npm package -->
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>
</div>
```

### Tooltip → CSS-only or Tippy.js

#### Option A: CSS-only

```html
<span class="relative group cursor-help">
  Hover me
  <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    Tooltip text
  </span>
</span>
```

#### Option B: Tippy.js (For complex tooltips)

```html
<button data-tippy-content="Tooltip text">Hover me</button>
<script>tippy('[data-tippy-content]')</script>
```

### Popover → Tippy.js or Alpine.js

```html
<!-- Alpine.js -->
<div x-data="{ open: false }" class="relative inline-block">
  <button @click="open = !open" @click.outside="open = false">Click me</button>
  <div x-show="open" x-transition class="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border min-w-[200px]">
    <h6 class="font-semibold mb-2">Popover Title</h6>
    <p>Popover content goes here.</p>
  </div>
</div>
```

### Alert (Dismissible) → Alpine.js

```html
<!-- Bootstrap (before) -->
<div class="alert alert-warning alert-dismissible fade show">
  Warning message
  <button type="button" class="close" data-dismiss="alert">&times;</button>
</div>

<!-- Tailwind + Alpine.js (after) -->
<div x-data="{ show: true }" x-show="show" x-transition class="flex items-center justify-between p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded">
  <span>Warning message</span>
  <button @click="show = false" class="ml-4 text-yellow-600 hover:text-yellow-800">&times;</button>
</div>
```

---

## Bootstrap JS Removal Checklist

After replacing all JS components:

### 1. Remove CDN Script Tags

```bash
# Find and remove
grep -rPn 'cdn.*bootstrap|bootstrap.*cdn|bootstrap\.(min\.)?js|bootstrap\.bundle' --include='*.php' --include='*.html'
```

### 2. Remove npm Packages

```bash
npm uninstall bootstrap jquery popper.js @popperjs/core
```

### 3. Remove jQuery Plugin Initializations

```bash
# Find all Bootstrap jQuery calls
grep -rPn '\$\([^)]*\)\.(modal|tooltip|popover|dropdown|collapse|tab|carousel|alert|button)\(' --include='*.js'
grep -rPn "jQuery\([^)]*\)\.(modal|tooltip|popover|dropdown|collapse|tab)" --include='*.js'
```

### 4. Remove Bootstrap CSS Classes (handled by class migration)

Bootstrap JS components come with CSS classes (`.modal`, `.dropdown-menu`, `.collapse`, etc.) that should be removed as part of the overall CSS class migration.

### 5. Check for jQuery Dependency

If jQuery was only used for Bootstrap JS components:

```bash
# Check if jQuery is used elsewhere
grep -rPn '\$\(|jQuery\(' --include='*.js' | grep -v 'bootstrap\|modal\|tooltip\|popover\|dropdown\|collapse\|tab\|carousel\|alert'
```

If no other jQuery usage, remove jQuery entirely.

---

## Migration Priority

| Component | Frequency | Difficulty | Recommended Approach |
|---|---|---|---|
| Collapse | Common | Low | `<details>/<summary>` |
| Alert | Common | Low | Alpine.js `x-show` |
| Modal | Medium | Medium | HTML `<dialog>` |
| Dropdown | Medium | Medium | Alpine.js or CSS |
| Tabs | Less common | Medium | Alpine.js |
| Carousel | Less common | High | Keep existing library (Flickity/Swiper) |
| Tooltip | Less common | Low | CSS-only or Tippy.js |
| Popover | Rare | Medium | Alpine.js or Tippy.js |
