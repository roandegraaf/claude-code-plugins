# Deep ground editorial

**Reach for this when** calm has to read as expensive: a premium, specialist or heritage
proposition where the visitor is making a considered decision and the brand gains nothing by
shouting. Product marketing, specialist recruitment, established firms with a story.

**Example sites:** `callab`, `connectyou`, `osnabrugge`

## Type

**Large and light.** This is the direction's defining move and the hardest one to get right.

- **Display at 72-100px with weight 400-500**, or a single-cut serif where weight is not a variable
  at all. There is no bold on screen anywhere in this direction.
- **Line-height 1.0 on sans display**, relaxed to 1.05-1.1 on serif so ascenders and descenders do
  not collide.
- **Sentence case throughout.** Uppercase survives only in small eyebrows and meta lines.
- **Scale carries the emphasis, not weight.** `callab` sets every heading and every body element at
  400 and only steps buttons to 600 — explicitly the inverse of the heavy-display directions.
- **A second family carries the small material.** Either a mono reserved for eyebrows, dates,
  read-times and category tags (`connectyou`), or a geometric sans under a serif display
  (`osnabrugge`, where the pairing *is* the typographic idea). The mono route is the cheap way to get
  the effect without committing to a serif.
- **Negative tracking on sans display** (-1.8px at 72px, -1.2px at 48px), normal on serif.
- **A big gap in the scale with no intermediate display size** — 100px to 60px to 32px with nothing
  between 32 and 60. Accept the gap; filling it is what makes a page look templated.
- **One highlighted word or phrase** in the headline, in the accent. A final word, a date, a proper
  noun. Never two.

## Palette logic

- **One deep saturated dark carries the whole page as a room**, not as a section: a plum, a navy, a
  royal blue. It is the body background, and on the darkest of the three there is no light section
  on the homepage at all.
- **One warm bright accent** — coral, magenta, gold — at button scale and on the one highlighted
  word. It never fills a section.
- **A single warm light neutral is the real second colour.** Cream, lavender-white — not pure white.
  It carries the large light fields, the display type on the dark ground, and the card surfaces.
  Reaching for white here flattens the whole thing.
- **Muted text is a desaturated tint of the ground**, never a neutral grey. A mauve on plum, a
  lavender on navy.
- **Product and state colours stay inside the UI.** A success green, a data teal — they live in a
  dashboard mockup or a status chip and never become page chrome.
- Category or audience re-theming is available: `connectyou` swaps the whole page's accent pair per
  vakgebied, including the scrolled nav colour.

## Motion character

Unhurried and atmospheric. The page breathes rather than performs.

- **Group-level reveals only.** `callab` carries no per-element reveal attributes at all — the
  stagger is between groups, not inside them.
- **Scroll pinning for editorial pacing**: a section heading held at a fixed offset while a card
  grid scrolls past it, or a centred statement pinned at `sticky top-1/2` while images drift by.
- **Ambient backgrounds rather than kinetic ones** — an animated WebGL mesh behind the ground with a
  fixed film-grain overlay on top (`callab`), or inner-image parallax on media blocks
  (`connectyou`).
- **Per-character text reveals**: a paragraph split into character spans resting at ~22% opacity of
  the text colour and resolving to full as a wave sweeps it on scroll.
- **A marquee driven by scroll velocity rather than a keyframe** — no CSS animation, live transforms
  fed by scroll speed, so it drifts at rest and accelerates or reverses with the page.
- **Hover on two layers**: the label rendered twice over a resting accent face, so the text slides
  and the face swaps.
- **Page transitions, where used, are a veil in the brand colour** covering the full viewport.
  `callab` has one; the other two navigate normally. On catalogue-shaped pages, skip it.
- Smooth scroll on all three.

## Surface

**Depth comes from translucency, not shadow.** Hairline borders at 10-30% white or cream, panel
fills at 5-10% white. At most one real shadow on the whole site, and only to lift a product mockup
off its ground.

**Radius is this direction's one free variable, and it spans the full range.** Pick a point and say
why:

| Site | Buttons / inputs | Cards / panels | Character |
|---|---|---|---|
| `callab` | pill, 14px inputs | 40px panels, 24px mockup, 10px small cards | soft, product-led |
| `connectyou` | 12px, pill on tags | 16px cards, 24px panels | mid, geometric |
| `osnabrugge` | 4px, 0px inputs | 8px cards, **0px on every content image** | hard, editorial |

`osnabrugge`'s square photography against slightly-rounded chrome is a deliberate and consistent
split, and it is what makes a navy-and-gold site read as an architecture monograph rather than as a
SaaS page. Note its inputs are 0px while its buttons are 4px — a mismatch it holds on purpose.

## Three structures, all valid

- **Continuous ground with two or three light bands** entering on large rounded top corners rather
  than a hard edge. (`callab`)
- **No light section at all.** The page is one dark field top to bottom, broken only by a
  rounded photo band and a translucent panel. (`connectyou`)
- **Alternating full-bleed blocks**, nothing inset, nothing floating, square image corners — the
  page opens and closes dark with a long light middle. (`osnabrugge`)

## Signature moves worth keeping

- **A named person as the conversion device**: a portrait, a letter-spaced uppercase eyebrow, the
  name in the display face, the role in the muted tint, a phone CTA and a form CTA. Echoed by a
  fixed widget carrying the same face and first name.
- **An audience switcher** — a tab strip above the nav, or a mid-page tab panel — where the site
  serves two populations.
- **A certificate or accreditation grid** framed fieldset-style, instead of a client logo wall.
- **A showreel card** with a play glyph and a duration, opening a full-viewport lightbox.
- **A newsletter form as the footer's only conversion element**, with the accent submit sitting
  inside the field.

## Not this direction

Heavy display, uppercase, an accent with area, or a page whose photography has to do the selling.
If the client needs energy rather than composure, look at `flood-and-acid.md`.
