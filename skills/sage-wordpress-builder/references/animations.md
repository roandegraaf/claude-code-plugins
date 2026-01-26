# Scroll Animations

## Dependencies

```bash
npm install gsap lenis
```

```json
{
  "dependencies": {
    "gsap": "^3.12.0",
    "lenis": "^1.0.0"
  }
}
```

## GSAP + Lenis Setup

In `resources/js/app.js`:

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Make GSAP globally available
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

// Connect Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Initialize animations on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});
```

## Reveal Animation Function

```javascript
function initScrollAnimations() {
  const revealGroups = document.querySelectorAll('[data-reveal-group]');

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  revealGroups.forEach((group) => {
    const children = group.children;
    const stagger = (group.dataset.stagger || 150) / 1000;
    const distance = group.dataset.distance || '2em';
    const start = group.dataset.start || 'top 90%';

    // Set initial state
    gsap.set(children, {
      y: distance,
      autoAlpha: 0,
    });

    // Create scroll trigger
    ScrollTrigger.create({
      trigger: group,
      start: start,
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          autoAlpha: 1,
          stagger: stagger,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
      once: true,
    });
  });
}
```

## Blade Usage

### Basic Reveal Group

```blade
<div data-reveal-group class="flex flex-col gap-4">
  <h2>Title</h2>
  <p>Content</p>
  <a href="#">Button</a>
</div>
```

Children animate in sequence with default settings.

### Custom Stagger Timing

```blade
<div data-reveal-group data-stagger="200" class="grid grid-cols-3 gap-6">
  @foreach($items as $item)
    <div class="card">{{ $item->title }}</div>
  @endforeach
</div>
```

### Custom Animation Distance

```blade
<div data-reveal-group data-distance="3em">
  {{-- Content animates from 3em below --}}
</div>
```

### Custom Scroll Trigger Start

```blade
<div data-reveal-group data-start="top 80%">
  {{-- Animation triggers when top of element reaches 80% of viewport --}}
</div>
```

## Data Attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `data-reveal-group` | - | Required. Container for animated children |
| `data-stagger` | `150` | Delay between children in ms |
| `data-distance` | `2em` | Initial Y offset |
| `data-start` | `top 90%` | ScrollTrigger start position |

## Block Template Example

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
      <x-content.title :title="$title" :heading="$heading" :contentItems="$content_items" :background="$background_color" />
      <x-content.text :content="$content" :contentItems="$content_items" :background="$background_color" />
      <x-content.buttons :buttons="$buttons" :contentItems="$content_items" />
    </div>
  </div>
</x-section>
```

## Grid Animation Example

```blade
<div data-reveal-group data-stagger="100" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  @foreach($posts as $post)
    <article class="card">
      <h3>{{ $post->post_title }}</h3>
      <p>{{ $post->post_excerpt }}</p>
    </article>
  @endforeach
</div>
```

## Alternative: Individual Element Animations

For more control over individual elements:

```javascript
function initElementAnimations() {
  const elements = document.querySelectorAll('[data-reveal]');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  elements.forEach((el) => {
    const direction = el.dataset.reveal || 'up';
    const delay = (el.dataset.delay || 0) / 1000;

    const from = {
      up: { y: '2em' },
      down: { y: '-2em' },
      left: { x: '2em' },
      right: { x: '-2em' },
    };

    gsap.set(el, {
      ...from[direction],
      autoAlpha: 0,
    });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          delay: delay,
          ease: 'power2.out',
        });
      },
      once: true,
    });
  });
}
```

Usage:

```blade
<h2 data-reveal="up">Animate from below</h2>
<p data-reveal="left" data-delay="200">Animate from left with delay</p>
```

## Performance Tips

1. Use `will-change: transform, opacity` sparingly
2. Prefer `transform` and `opacity` over other properties
3. Use `autoAlpha` instead of separate `opacity` + `visibility`
4. Keep animation durations under 1s for responsiveness
5. Always check `prefers-reduced-motion`
