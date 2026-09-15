# Flood and acid

**Reach for this when** the client's brand colour is strong and their photography is not, or when a
sales-driven site needs energy without heritage. New-build property, training and consultancy,
print and apparel, anything where the product is a decision rather than a purchase.

**Example sites:** `eckeveldkleding`, `mrcopilot`, `businessparksoest`

## Type

- **Heavy sentence-case sans at 600-700**, 67-88px, line-height locked to 1.0. A geometric or
  neo-grotesk face; never condensed, never uppercase display.
- **One family does display and body.** The only second face is a script accent (see below).
- **A script face on a handful of elements** — eyebrows, a price annotation, a pointing note, one
  word inside the hero headline, a strikethrough heading on a negative-framed card. Fourteen
  elements is the measured ceiling (`businessparksoest`); past that it stops being an accent.
- **Tracking is a fork inside this direction.** `eckeveldkleding` tracks negative and scaling
  (-2.2px at 88px, -2.4px at 96px) *and* positive on small headings (+0.7px at 28px) — optical
  sizing in both directions. `mrcopilot` and `businessparksoest` set `letter-spacing: normal`
  everywhere. Pick one; a half-applied tracking rule reads as an error.
- **Eyebrows are either uppercase and letter-spaced** (`businessparksoest`, in the accent colour) **or
  rounded pills** (`mrcopilot`, which has no uppercase labels anywhere). Hold one convention.
- Body runs generous: 18-22px with 1.8 leading against a 1.0 display. Very tight over very airy.

## Palette logic

- **One saturated brand colour is a field, not an accent.** It floods the hero and usually the
  footer; on `businessparksoest` it is the body background for the entire document.
- **One acid accent** — a lime or a safety yellow — appears at button scale only. It always carries
  a dark label (the brand colour or a near-black), never white, and it never becomes a background.
  The one permitted exception is a thin utility bar at the very top or bottom of the page.
- **A warm off-white is the neutral that carries the readable middle.** Not pure white, not grey.
- **Text on the light ground is near-black**, not a softened grey. Secondary copy is a tint of the
  brand colour.
- Third-party colours (a messaging-app green) are excluded from the palette even when the tally
  ranks them high.

**Raw colour tallies mislead in this direction specifically.** The accent's high frequency comes
from many small elements — chips, icons, pills — not from area. On `businessparksoest` it outscores
white on background hits while covering almost no surface. Read the named tokens or the primary
button, never the tally.

## Motion character

Colour-block motion. Things move as whole panels rather than as text.

- **Pinned card stacks are the signature.** Full-width coloured panels that pin and pile under each
  other as you scroll (`eckeveldkleding`, 810px panels at `sticky top-20`), or a service card stack
  (`mrcopilot`), or a 4,606px scroll-pinned milestone timeline with rotated photo cards flying in
  from the edges (`businessparksoest`).
- **Staggered group reveals** on 10-18 elements per page, with per-line or per-word headline splits
  where a text-splitting library is available.
- **An oversized text marquee stands in for a logo bar.** `businessparksoest` runs one in exactly
  the slot a client logo strip would take, twice on the homepage. Reach for it when the client has
  no logos worth showing.
- **Hover is a reveal, not a transition** — a card's action button un-rotates and scales in from
  zero rather than fading.
- Smooth scroll on two of three.
- **Page transitions are a per-project choice here.** `eckeveldkleding` plays a navy curtain wipe;
  the other two navigate as normal document loads. Skip it on catalogue-shaped sites.

## Surface

- **No shadows on any of the three.** Separation is done entirely with colour blocks.
- **Two radius steps with a wide gap between them**: a small hard step for buttons, inputs, chips
  and icon tiles (4-7.5px), and a large one for cards and section panels (22.5-24px). Never
  introduce a third.
- **Borders are effectively absent** — two or three bordered elements on a whole page. If something
  needs an edge, give it a different fill.
- Buttons are square-ish and chunky: 15-16px type at 600-700, 15-30px padding, the small radius.
  The split-button variant (a label block and a separate arrow block divided by a visible seam) is
  available and is the strongest version.

## Two structures, both valid

- **Bookend a long light middle with the brand colour.** Saturated hero at the top, a long warm
  off-white run through the content, a coloured or photographic footer. The only breaks in the light
  run are the pinned colour panels and a full-bleed photo band. (`eckeveldkleding`, `mrcopilot`)
- **One continuous saturated ground with inset light panels floating on it**, each carrying
  `mx-2 my-2` and the large radius so the ground frames them on all sides. Every section that is not
  a panel reads straight on the ground. Even the legal bar is an inset strip.
  (`businessparksoest`)

The second is easier to extend — a new section is just another panel — and it makes the brand colour
work harder for the same money.

## Signature moves worth keeping

- **A brand clip shape** used as image mask, icon tile, bullet, ghost outline and card silhouette.
  One `clip-path` gives a whole site a signature. Where there is no reducible mark, a **tiled outline
  pattern** on the flood does the same job.
- **Price or availability chips** — a small uppercase label over a figure, in the accent and in the
  brand colour as a pair.
- **A progress or availability meter** in the utility topbar, tying the page to real inventory.
- **Pros/cons comparison cards** — two big equal panels, one framed negatively, with plus and minus
  icon tiles.

## Not this direction

Photography carrying the page, a light display weight, an accent with any area to it, or a calm
premium register. If the client has genuinely good photography and needs to feel established rather
than energetic, look at `deep-ground-editorial.md` or `warm-daylight.md`.
