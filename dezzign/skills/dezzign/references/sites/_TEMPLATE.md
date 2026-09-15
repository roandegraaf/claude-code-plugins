# <Site name>

Fingerprint template. Copy this file, keep every heading, replace every `<...>` placeholder.
Palette hex values and font families MUST be read from the live DOM (`getComputedStyle`), never
guessed. Anything not directly measurable (motion character, hover behaviour) is marked
`(inferred)` with the evidence that led to it. Drop a bullet only when the site genuinely has no such element, and say so: `- none`.

**Measurement protocol — follow it or the file is not comparable.**

These three rules are what make every fingerprint in this folder line up with every other one. A
file produced without them looks conformant and is not, so `/dezzign learn` must apply them too.

1. **Pin the viewport to 1440x900** before measuring anything, and record it in `Measured at:`.
   Several of these sites drive their whole type and spacing scale off a fluid root font-size, so
   every px value is viewport-relative and only means something at a known width.
2. **Resolve colours by painting, not by parsing.** Paint each computed value onto a 1x1 canvas and
   read the pixel back, so `lab()`, `oklab()`, `oklch()` and `color(srgb ...)` all land as real hex
   instead of being mangled by a regex written for `rgb()`. Write alpha as `#rrggbb@0.NN`.
3. **Take the palette from one source, in this order:** the site's theme CSS variables if it
   exposes them, else the primary button's background for the accent, else the frequency tally.
   Say in the Palette section which source you used. A raw tally cannot tell a brand colour from
   one stray border, so never lead with it when a better source exists.

## Identity
- URL: <https://...>
- Sector: <what the client does, 2-4 words>
- Brand feel: <one line, e.g. "clinical and calm, trust over excitement">
- Language: <nl / en / ...>
- Measured at: <viewport used for every measurement in this file, e.g. 1440x900>

## Navigation
- Structure: <items, left/center/right, dropdowns, mega menu>
- Behaviour: <sticky / static / hide-on-scroll, transparent-over-hero or solid, shrink on scroll>
- CTA in nav: <label + style, or none>
- Mobile pattern: <hamburger overlay / drawer / full-screen menu, animation>

## Hero
- Type: <full-bleed image / video / split / centered type / gradient / slider>
- Media: <photo, video, illustration, none; treatment such as overlay or duotone>
- Headline style: <size feel, weight, case, line count, highlighted words>
- Subline + CTA count: <n CTAs, primary/secondary labels>
- Extras: <trust badges, scroll cue, stats bar, form in hero>

## Section order (homepage)
Numbered, one line each, lead with the pattern name so the stramien can reference it.
1. <Pattern name> - <what it holds>
2. <...>

## Typography
- Heading family: <family as computed, fallback stack>
- Body family: <family as computed>
- Scale feel: <h1 px, body px, ratio impression>
- Weight contrast: <e.g. 700 headings vs 400 body; any 300 or 900 use>
- Case & detail: <uppercase eyebrows, letter-spacing, italic accents>

## Palette
- Brand: <#hex - role>
- Accent: <#hex - role, where it appears>
- Neutrals: <#hex text, #hex muted, #hex borders>
- Background rhythm: <order of light/dark/tinted sections down the page>
- Accent use: <sparing on CTAs only / large colour fields / gradients>

## Spacing & grid
- Container: <max-width px, gutter>
- Section padding: <vertical rhythm feel, e.g. 96-128px desktop>
- Columns: <grid used for cards/features>
- Radius & borders: <card radius px, border treatment, shadow presence>

## Motion
- Scroll reveals: <fade-up, stagger, clip reveal, none>
- Hover: <buttons, cards, links, images>
- Marquee / ticker: <yes + what, or none>
- Page transitions: <yes + character, or none>
- Cursor: <custom cursor, or none>

## Footer
- Columns: <n + what each holds>
- CTA block: <pre-footer CTA band, or none>
- Legal row: <copyright, privacy, terms, socials, credits>

## Recurring components
- Cards: <shape, image position, content>
- Testimonials: <format, slider or grid, avatars>
- Logo bar: <static grid / marquee / none>
- Forms: <where, fields, style>
- Pricing / packages: <format, or none>
- Other: <stats counters, FAQ accordion, timeline, tabs, ...>

## Osmo-like elements
Anything that maps to an Osmo Supply category, so the redesign flow knows what to reach for.
- <element> -> <Osmo category, e.g. menu / marquee / scroll animation / hover / page transition>

## Other pages worth noting
- <path> - <what makes it structurally different from the homepage>
