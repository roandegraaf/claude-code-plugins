# Campaign poster

**Reach for this when** the client is a message rather than a company: a public-information or
awareness campaign where the visitor self-selects into a situation, the tone has to be human rather
than institutional, and the page should look assembled by people rather than shipped by a firm.

**Example sites:** `gzw`

## Sourcing caveat — read this first

**This direction is derived from one site.** The stramien's own honesty rule is that a pattern with
a single source is that site's quirk, so treat this as provisional: a coherent posture that has been
observed once, not a proven house direction.

Its nearest relatives, and what each borrows without committing to the whole posture:

- `businessparksoest` — rotation as a layout device, a script-face annotation with a hand-drawn
  arrow, informal second-person voice. But its accent stays strictly punctuation and its ground is
  one continuous saturated brand colour, so it sits in `flood-and-acid.md`.
- `eckeveldkleding` — a hand-drawn marker accent behind the headline and a tiled pattern flooding
  the hero. But its display is a heavy grotesk and its palette is a two-colour brand system, so it
  also sits in `flood-and-acid.md`.

**If `/dezzign learn` adds a second campaign site**, firm this up with the second example and revise
the palette rule below against it. If a year passes with no second example, fold the usable parts
(rotation, the interaction-colour carve-out) into `flood-and-acid.md` and delete this file.

## Type

- **A serif display against a sans UI**, tightened against opened-out. This is the same pairing
  logic as `osnabrugge` in `deep-ground-editorial.md`, applied at campaign volume instead of
  editorial calm.
- **Serif headings at 48-90px with roughly -2% tracking** and line-height 1.0-1.1. Weight 700 with a
  single step down to 500 on the very largest hero size — ordinary optical compensation, not a light
  display system.
- **Sans eyebrows at 14px, uppercase, with +2% positive tracking.** Tightened serif against
  opened-out sans is the whole typographic idea; state it that way and hold both halves.
- **The body sits small** (14px) against a 70px display, so the jump is enormous and deliberate.
  Meta lines reuse the uppercase sans.
- **The headline talks to the visitor in the second person**, about them rather than about the
  topic. That voice is as much a part of the direction as the type.
- Inner-page heroes may run *larger* than the homepage hero. Campaign pages are allowed to compete
  with each other.

## Palette logic

**This is the one direction where the accent rule inverts** — read `stramien.md`'s
`### The accent is punctuation, never a field` before applying it.

- **A campaign palette of three or four unmixed colours** — a purple, a pink, a baby blue — used at
  **field scale**: whole sections, notched full-height blocks, quote cards, the FAQ band. Roughly a
  third of the page is a non-white colour field.
- **What keeps it legible is one colour held back entirely for interaction.** Every button and every
  arrow takes the acid accent, and nothing else does. A visitor learns in one screen that this
  colour means "clickable" and the campaign fields never confuse it. **If you take one thing from
  this direction, take this carve-out.**
- **Text is pure black with no softened greys anywhere.** Borders and inputs are black too. The
  campaign colours do all the tonal work.
- **Surfaces are white and one light grey.** Nothing tinted toward the campaign hues.
- **A brand-institutional colour survives in the chrome only** — the header strip, the footer icon
  buttons, a skip link — and stays out of the campaign fields. That is where the commissioning body
  lives; the campaign lives everywhere else.

## Motion character

Assembled by hand. Rotation is the primary device and it replaces shadow entirely.

- **Rotation as layout**: photo cards at ±5°, quote cards from -6.8° to +6.4°, category chips and
  stickers set off axis so they read as tape stuck on rather than as UI badges.
- **Named easing tokens declare the intent** — a spring curve and a bounce curve that overshoots
  past 1. A curve that overshoots only exists to be used on something; if you adopt this direction,
  spend it on the press and hover states.
- **Group reveals**, smooth scroll, and a custom track slider.
- **No page transition, no custom cursor, no marquee.**
- **Zero shadows.** Depth comes from rotation, overlap and notched shapes.

## Surface

- **Pills dominate**, then 8px on cards and buttons, 4px on small nav pills, with directional radii
  on tabs and the skip link (`8px 8px 0 0`).
- **Borders are hard 1px black**, not translucent hairlines.
- **Angled and notched full-height colour blocks** are the structural signature — a block whose
  edges are cut rather than straight, filled edge to edge with a campaign colour.
- A **speech-bubble-shaped content panel** carries navigation prompts on inner pages.
- Cards are photo-led at 8px, almost always rotated a few degrees, with rotated date and category
  chips over them.

## Structure

- **The hero asks the orienting question and carries no CTA at all.** A centred serif headline, a
  question underlined with a hand-drawn brush stroke, a rotated campaign sticker over the image.
- **The answer is a chooser that overlaps up into the hero photo**, sitting in the hero's oversized
  bottom padding. Three tall angled colour blocks, each with an icon, an uppercase eyebrow and a
  heading. The visitor self-selects before they read anything.
- Named layout tokens for the overlap and the strip heights are worth copying; this rhythm is
  fiddly to reproduce from magic numbers.
- **The FAQ band takes a full campaign colour** and carries the closing CTA inside it, so there is no
  separate pre-footer band.
- **The footer is a two-column band on a gradient** with an organic wave shape cut through it.

## Two things to check before shipping

- **A campaign site is often client-owned rather than agency-credited.** `gzw` carries no
  "Realisatie door Zeker Zichtbaar" line, unlike nine of the other ten sites. Confirm the legal row
  with the client rather than assuming the house default.
- **Disclose generated imagery.** `gzw` carries a footer line declaring that the site contains
  AI-generated image material. If any imagery is generated, say so in the footer.

## Not this direction

A company site, a catalogue, or anything where the visitor arrives knowing what they want. The
field-scale colour and the rotation both read as noise when the job is to help someone compare
options. For a company with campaign energy, use `flood-and-acid.md` and keep the accent discipline.
