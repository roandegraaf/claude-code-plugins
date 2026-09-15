# Billboard condensed

**Reach for this when** the client's proposition is scale, legacy or craft at volume, they have real
footage or documentary photography of the work, and the brand can afford to shout. Construction,
industrial groups, trades, anything with a workforce and a history.

**Example sites:** `ul`, `biltz`

These two run the *identical* type, colour and component system at opposite ground polarity, which
is the direction's most useful lesson: polarity is a per-project decision, not a style property.

## Type

- **Condensed grotesk display at 700, uppercase, line-height locked to exactly 1.0.** Multi-line
  headlines stack as a solid block with no air between the lines.
- **Body in a condensed sans at 400**, plus a third narrow face at 500/700 carrying every uppercase
  label, eyebrow and button.
- **A hand-drawn script on two elements only** — a lowercase eyebrow above a dark section. It is the
  single warm note in an otherwise hard system, and it stops working the moment it appears a third
  time.
- **The display-to-body ratio is the loudness dial.** `ul` runs 188px against 18px, roughly 10x.
  `biltz` runs 72px against 16-18px, roughly 4x, on the same stylesheet. Set it per project.
- **A second, lighter display voice is available** for card titles: the same condensed face dropped
  to 400 with about 0.8px of positive tracking (`biltz` h3 at 32px). Use it to stop a card grid
  competing with the section heading.
- Eyebrows are uppercase at ~24px with wide tracking. Nothing is sentence case except body copy.

## Palette logic

- **One monochrome ground carries the entire page** — either near-black or white. Not a tinted
  neutral, not a brand colour.
- **Exactly one warm accent**, and it only ever does three jobs: fill a CTA, underline the active
  nav item, or sit behind a button as a pre-rendered hover face. It never covers area.
- **A warm cream is the third neutral.** It becomes a section background only on contact and utility
  pages, never on the homepage — which is what makes those pages feel like a different room.
- **Group or sub-brand identity colours stay at token scale**: a dot in the logo, a set of social
  squares, and one full-bleed bar at the very bottom of the page. They are never section fills.
- Text is pure white on dark and pure near-black on light. Muted copy is the same colour at 70% and
  50%, never a separate grey.

**Polarity is the project's call.** `ul` runs black end to end with exactly two white breathers (a
news grid and a client logo wall). `biltz` inverts it: cream and white dominate, with black plates
for the showcase and story sections. Count the breathers either way — a dark page needs one or two,
a light page needs one dark band before the footer.

## Motion character

Hard and mechanical. Nothing eases in softly.

- **Clip and mask reveals, never fades**, in stagger groups and nested groups.
- **Panel-based page transitions** — two full-viewport overlays wiping on navigation.
- **A 30s linear marquee in the footer**, gated behind `motion-safe`, with the sub-brand logo row as
  its track. `biltz` extends this to a 144-image marquee wall as the closing flourish.
- **Hover is pre-rendered, not animated.** A fill layer sized to each individual button sits in the
  DOM behind it, plus a matching square behind the arrow chip. It gives an art-directed hover rather
  than a colour transition.
- A custom cursor carrying a looping brand-name marquee is optional; `ul` uses it, `biltz` wires up
  the cursor and deliberately omits the text.

## Surface

- **0px radius everywhere.** The border-radius tally comes back completely empty on both sites.
- **No shadows.** What reads as a shadow in a computed dump is a sub-pixel ring, i.e. a hairline.
- **1px translucent hairlines** at 10-15%, plus five full-height rules dividing the page into six
  columns as a persistent background structure.
- **The button is two blocks**: an accent-filled label block with a black square arrow chip on its
  left edge, each with its own hover face.
- **Forms are transparent with underline-only borders, zero radius and no placeholder text.**
- Cards are hard-edged image tiles with the photo filling the frame and an uppercase label either
  overlaid or set directly beneath.

## Signature moves worth keeping

- A small square **photograph set inline inside the headline**, between two words, as if it were a
  glyph. Once per page, and only because uppercase condensed caps give the tile a box to sit in.
- **Statement bands** carrying a single oversized heading and nothing else.
- A **four-colour full-bleed bar** closing the page beneath the legal row.

## Not this direction

Rounded cards, sentence-case display, a light display weight, an accent used at field scale, or a
page that leans on soft neutrals. If the client needs to feel approachable rather than substantial,
look at `warm-daylight.md` instead.
