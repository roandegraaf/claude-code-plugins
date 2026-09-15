# Stramien — the ZekerZichtbaar page system

What recurs across the 11 reference sites in `sites/`. Patterns, not pixels: each entry names the
pattern, says **when** to reach for it, and lists the sites it is sourced from by slug.

**How to use this file.** Do not load it whole. Every pattern is its own `###` heading, so grep for
the slot you are designing (`## Hero`, `### Nav CTA`, `### Radius ladder`) and read that section.
The redesign flow in `SKILL.md` reads these sections to choose; the style direction in
`styles/` then decides *which branch* of a split pattern applies.

**Sourcing rule.** Every pattern below names at least two sites. A trait sourced to one site is that
site's quirk and lives in its own fingerprint, not here. The single deliberate exception is flagged
in-place under `### The accent is punctuation, never a field`.

**Measurement caveat.** All px values were measured at a pinned 1440x900. Five of these sites drive
their whole scale off a fluid root font-size (see `## Fluid root font-size`), so the numbers are
viewport-relative and only comparable because the viewport was pinned.

---

## The two rules that hold across all 11

These are the load-bearing conventions. Break either one only on purpose, and say why.

### No elevation

There are no house drop shadows. Depth comes from colour blocks, panel-on-ground contrast,
translucent fills, hairline borders, overlap and rotation — never from a shadow.

Ten of eleven shadow tallies came back empty or third-party-only. What looks like a shadow in a
computed dump is almost always a sub-pixel Tailwind ring standing in for a border.

**When:** always, by default. The one measured exception is a single soft shadow lifting a product
mockup off its ground, which is an object-on-a-surface cue rather than UI elevation.

**Examples:** `plantion` ("the shadow tally is literally empty"), `gzw` ("zero box-shadows in the
entire document"), `mrcopilot`, `businessparksoest` (3 exist, all third-party), `trapxpress` (the
only one belongs to a chat widget), `ul`, `biltz`, `osnabrugge`, `eckeveldkleding`, `connectyou`.
Exception: `callab`, one shadow, on the floating hero dashboard mockup only.

### The accent is punctuation, never a field

Each site has exactly **one** accent hue, sometimes with a darker pressed twin. It fills buttons,
active states, arrow tiles, icon chips, eyebrow text and at most one highlighted word. It never
becomes a section background. The large colour fields are the brand ground, the neutrals and the
photography.

**When:** always. If the accent starts covering area, the design has lost its loudest tool.

**Examples — ten of eleven, all stating it near-verbatim in their own Palette section:** `biltz`
("orange never fills a section"), `osnabrugge` ("strictly punctuation, gold
never fills a section"), `plantion`, `mrcopilot`, `trapxpress`, `eckeveldkleding`, `connectyou`,
`ul`, `callab`, `businessparksoest` (lime as a field only in a 56px topbar and a 49px legal bar).

**The exception, and why it still proves the rule:** `gzw` runs whole campaign colours as full-bleed
fields — the situation chooser, the quote cards, the FAQ band. But its acid lime `#ecfc75` is
*still* reserved for buttons and arrows only, so the interaction colour stays legible as "this is
clickable". Reach for field-scale colour only on campaign work, and keep one hue out of it for
interaction.

---

## Fluid root font-size

The agency-level mechanism behind every number in these files. The whole type and spacing scale
hangs off `html { font-size: var(--size-font) }`, where `--size-font` is a clamped container width
divided by an ideal-viewport ratio:

```
--size-container: clamp(<min>, 100vw, <max>);
--size-font: calc(var(--size-container) / (1440 / <base unit>));
html { font-size: var(--size-font) }
```

Consequences you must design around:

- Every Tailwind step (`pt-24`, `text-7xl`, `rounded-3xl`) resolves to a **different px value per
  site**, because the base unit differs. `pt-24` is 90px at a 15px root and 96px at 16px.
- Nothing jumps at a breakpoint between the clamp bounds; the page scales continuously.
- Fractional px values (67.5, 16.875, 7.5) are the system working, not a rounding error.
- The same stylesheet on two sites can produce a different rhythm purely from a different base
  unit, so **record both and do not reconcile them.**

**When:** default for new builds. It is what makes these layouts hold between roughly 1000px and
1900px without breakpoint work.

**Examples:** `businessparksoest` (15px at a 1440 ideal, clamped 992-1800), `osnabrugge` (16px at a
1440 ideal, clamped 1280-1920), `eckeveldkleding` (clamped 1280-1440), `ul` and `biltz` (both expose
`--size-container-ideal: 1440` clamped 992-1920, and the same Tailwind classes resolve to
134.4/76.8px on `ul` against 112/64px on `biltz`).

**Related, but not the same:** `trapxpress` runs a fixed **14px** root, so every rem authoring
number lands at 0.875x — 52.5px display, 12.25px body, 3.5px radius. Its 56px section beat reads
like 64px would elsewhere. A non-16 root is a legitimate choice; just note it, because raw px
comparison against the other files will otherwise mislead.

---

## Page skeleton

### The default homepage order

Not a template to fill mechanically, but the spine that 9 of 11 homepages follow:

1. Optional utility topbar
2. Header (transparent over the hero, or floating detached)
3. Hero
4. Orientation or proof strip — USPs, review score, audience chooser, search band
5. Capability blocks — what we do, 2-up or 3-up
6. Showcase — projects, cases, units, labels
7. Statement band — one oversized line, often with no image
8. News / updates / inspiration teasers
9. Trust — logo grid, certificate bar, counters or reviews
10. Pre-footer CTA band
11. Footer
12. Legal row

**When:** as a starting order for any B2B or considered-purchase client. Reorder freely, but keep
the shape: **orient, then explain, then prove, then ask.** The ask comes last and it comes twice
(once in the nav, once in the pre-footer band).

**Examples:** `biltz`, `plantion`, `trapxpress`, `mrcopilot`, `connectyou`, `businessparksoest`,
`ul`, `osnabrugge`, `eckeveldkleding`.

### Homepage length

11 to 16 sections is the house range, running roughly 5,600px (`plantion`) to 13,500px (`gzw`).
Service and product detail pages are routinely **as long as or longer than the homepage** — `biltz`
service pages hit 7,237px, `businessparksoest` unit pages 8,223px, an `osnabrugge` case detail
17,665px.

**When:** budget for it. A "simple inner page" is not a house concept; the detail page is where the
real content lives and it deserves its own design, not a wireframe.

**Examples:** `biltz`, `businessparksoest`, `osnabrugge`, `eckeveldkleding` (~11,150px homepage).

### Background rhythm is a designed decision

Every fingerprint records its section-by-section background sequence, because it is composed rather
than incidental. Three strategies:

- **Dark-dominant with light breathers** — `ul` (black page, exactly two white sections),
  `connectyou` (navy all the way down, no light section at all).
- **Light-dominant with dark punctuation** — `biltz` (the exact inversion of `ul` on the identical
  stylesheet), `trapxpress` (white throughout, one tinted section and one dark band before the
  footer), `plantion` (cream top to bottom), `mrcopilot` (one long white middle bookended by blue).
- **Alternating full-bleed blocks** — `osnabrugge` (navy / lavender / navy, nothing inset),
  `eckeveldkleding` (one dark bookend, one long light middle).

**When:** decide the polarity before anything else, and count the breathers. A dark page needs one
or two light sections to stop it reading as a single slab; a light page needs one dark band, usually
immediately before the footer, to land the ask.

**Key insight:** `ul` and `biltz` run the *same* type, colour and component system at opposite
polarity. Ground polarity is a per-project choice, independent of the style direction.

### The panel-on-ground alternative

Instead of sections owning their backgrounds, one continuous ground runs the whole document and
light sections are inset rounded panels floating on it, with the ground showing as a frame on all
sides (`mx-2 my-2`, `rounded-3xl`).

**When:** you want a single unbroken brand colour to carry the page but still need light, readable
content blocks. It is also the easiest rhythm to extend — a new section is just another panel.

**Examples:** `businessparksoest` (every light panel is inset 8px on the teal ground; even the legal
bar is an inset lime strip), `plantion` (the footer is `mx-2 rounded-3xl` so the cream frames it;
white cards float on cream throughout), `callab` (cream bands enter with large rounded top corners
rather than a hard edge).

---

## Navigation

### Utility topbar

A thin strip above the header proper carrying non-navigational service or trust information:
opening hours, a review score, a login, a language switcher, an availability meter, a campaign
attribution.

**When:** the client has a standing fact a visitor checks *before* they browse — are you open, can I
log in, what do you score, how many are left. Skip it when there is no such fact; filled with
ordinary links it just steals a band and duplicates the nav.

**Examples:** `trapxpress` (28px strip: three USPs + a 4.4 rating over 232 reviews),
`businessparksoest` (lime strip: three USPs + a "nog 34 units beschikbaar" progress meter),
`eckeveldkleding` (navy 36px: stars + rating left, Downloads / FAQ / Mijn account right),
`plantion` (48px cream: news/FAQ/agenda, an opening-hours pill dead centre, Webshop + account +
language flags right), `biltz` (resident login), `gzw` (mint brand strip carrying the initiator).

### Header behaviour — two branches

**Branch A: sticky, transparent over the hero, solid on scroll.** The header sits transparent on top
of the hero with the page pulled up under it, then transitions its background in over 200-300ms once
it leaves the hero.

*Reach for A when* the hero is a full-bleed photo or video that should read edge to edge and
top to bottom.

*Examples:* `ul` and `biltz` (91px, `-mb-[var(--header-height)]`, `transition-colors duration-300`),
`connectyou` (88px, transparent to `--category-dark` on scroll), `mrcopilot` (112px, transparent to
solid blue), `trapxpress` (the dark USP strip scrolls away while the white bar sticks).

**Branch B: floating and detached.** A pill bar or rounded white card, inset from the viewport edges
and often centred, that never docks and never changes state. The page scrolls visibly underneath
and around it.

*Reach for B when* the design leans on panel-on-ground or inset-rounded surfaces, or when you want
the nav to read as an object rather than a chrome bar. It is the newer of the two and now the
majority move.

*Examples:* `osnabrugge` (914x64 white pill, `fixed top: 24px`, never docks or shrinks), `plantion`
(a 1280px white rounded card overlapping the hero photo), `businessparksoest` (a dark-teal rounded
pill panel with the CTA floating outside it as its own block, on a transparent sticky wrapper),
`gzw` (a floating 144px header of white pills that scrolls up by exactly the brand-strip height
before sticking), `eckeveldkleding` (white pill links sitting directly on the hero with no bar at
all — and the only site in the set that is not sticky in any form).

### Nav CTA

A single filled accent button, hard right, sentence or uppercase per direction. It is the same
component as the hero's primary CTA.

**When:** always, with one alternative below. Give it the accent colour and nothing else in the nav.

**Examples:** `ul` and `biltz` ("NEEM CONTACT OP", solid orange), `plantion` ("Neem contact op",
lime pill), `osnabrugge` ("Contact", gold, 4px radius, beside an outlined white secondary),
`businessparksoest` ("BEKIJK BESCHIKBARE UNITS", lime on teal), `trapxpress` ("Doe de prijscheck"),
`callab` ("Gratis demo aanvragen", coral pill), `mrcopilot`, `eckeveldkleding`, `gzw`.

**The alternative:** `connectyou` carries no nav button at all and puts a live magenta count pill
(`181`) on the "Vacatures" item instead. Reach for a live number over a button when the inventory
*is* the proposition — vacancies, units, stock.

### Button plus a detached arrow tile

The house button is two blocks, not one: a label block and a separate square or circular arrow
element beside it, in a contrasting fill, sometimes divided by a visible seam.

**When:** the default primary-button treatment. It survives at any size and gives a hover target
that is independent of the label.

**Examples:** `ul` and `biltz` (orange label block with a black square arrow chip on its left edge,
each with its own pre-rendered hover square), `eckeveldkleding` (a yellow label block and a yellow
arrow block split by a dashed seam), `gzw` (a lime pill paired with a separate lime circular arrow
button), `osnabrugge` (a standalone 44x44 gold square arrow button as the site-wide "go deeper"
affordance), `connectyou` (a trailing navy square holding the arrow glyph), `trapxpress` (a boxed
trailing arrow in a darker magenta square).

### Dropdown and mega menu

Nav items with chevrons open panels of **title + one-line description** pairs, not bare link lists.
Larger sites group the panel by audience rather than by topic.

**When:** as soon as a section has more than four children, or when the child pages need a sentence
to be distinguishable from each other.

**Examples:** `ul` ("Over ons" opens 7 title+description pairs), `biltz` ("Expertises" opens 7 plus
a "Bekijk alle expertises"), `plantion` ("Onze extra's" grouped by audience — Kwekers / Bloemisten /
Tuincentra / Supermarkt en groothandel / Consumenten, ~30 leaf pages behind one menu),
`osnabrugge` (three mega-menus behind a full-viewport scrim that fades in over 0.45s),
`trapxpress` (18 links reachable from the header), `connectyou`, `eckeveldkleding`.

### Mobile

A full-screen overlay menu, typically 500ms, is the house pattern. Drawers and dropdowns are the
minority.

**When:** default. Note that `mrcopilot` runs the hamburger *at desktop width too*, keeping only
four links visible and hiding Contact / Over ons / Werken bij behind it — a deliberate way to keep a
short nav on a site with more pages than it wants to show.

**Examples:** `connectyou` and `plantion` (both `div.mobile-nav fixed inset-0 … duration-500`),
`ul`, `biltz`, `eckeveldkleding`, `mrcopilot`.

---

## Hero

### The four hero types

**1. Full-bleed autoplaying background video.** Muted, looping, type anchored over it, no overlay
tint when the footage is dark enough on its own.
*Reach for it when* the client has real footage of the work and the brand claim is about scale or
craft. It is the most expensive option and the least recoverable if the footage is weak.
*Examples:* `ul` (1763px tall, type at 188px over it), `osnabrugge` (900px, type bottom-left, with
a showreel card bottom-right).

**2. Full-bleed photograph with a scrim.** One documentary image, darkened only as much as the type
needs, type centred or bottom-left.
*Reach for it when* the subject is a place or a person and the photography is strong. On inner
pages this is what the video hero degrades to.
*Examples:* `plantion` (the actual auction hall, no scrim at all because the photo is dark enough),
`trapxpress` (left-weighted scrim so white type holds), `gzw` (871px, `media-scrim`), plus the
inner-page heroes of `ul`, `biltz` and `osnabrugge`.

**3. Flat saturated colour field.** No photograph. The brand colour floods the section; the interest
comes from a pattern, a cut-out, geometric shapes or clipped media floating on it.
*Reach for it when* the client has no usable photography, or when the brand colour itself is the
strongest asset.
*Examples:* `eckeveldkleding` (cobalt flood tiled with a large outline-garment pattern, 1638px),
`mrcopilot` (brand blue with a cut-out founder standing on a lighter circle), `businessparksoest`
(type centred on the teal ground with two pentagon-clipped photos floating asymmetrically),
`connectyou` (navy-to-purple radial wash behind a flat geometric brand-shape collage).

**4. Split — copy one side, media the other.** The media is a product mockup, a shape collage, a
portrait or a documentary photo bleeding off the edge.
*Reach for it when* there is a product to show, or when the headline needs a paragraph beside it
rather than under it.
*Examples:* `callab` (copy left, an angled dashboard mockup with floating speech bubbles right),
`biltz` (headline left, paragraph right, full-bleed photo filling the lower two thirds of the same
section), `connectyou`, `mrcopilot`.

**The switcher variant.** `trapxpress` puts three `h1` elements in the DOM (open / dichte / spiltrap)
with a bottom-aligned tab switcher and an animated active underline, swapping the CTA label with the
tab. Reach for it when the visitor self-selects into one of a small fixed set of products — but note
it is single-sourced, so treat it as a technique rather than a house pattern.

### Headline scale

**67-100px is the house range at 1440.** Measured: 100 (`osnabrugge`), 96 (`connectyou`), 88
(`eckeveldkleding`), 72 (`callab`, `mrcopilot`, `biltz`, `plantion`), 70.2 (`gzw`), 67.5
(`businessparksoest`), 52.5 (`trapxpress`). `ul` sits far outside at 188px.

**When:** start at 72px and move within the range. Go to 88-100px when the headline is short and
the page has no other display element competing. Drop to ~52px only when the display weight is very
light, as on `trapxpress`, where a big light face would go transparent.

**The outlier is instructive:** `ul` runs 188px against 18px body — roughly a 10x ratio — and
`biltz`, on the *same stylesheet*, runs 72px against 16-18px, roughly 4x. Same system, quarter the
scale. Display size is a loudness dial, not a style-direction property.

### Display line-height locked to 1.0

Eight of eleven set display line-height exactly equal to the font size, so multi-line headlines
stack as tight blocks.

**When:** default for sans display. Relax it for serif display and for light weights, where tight
leading makes the ascenders and descenders collide.

**Examples at 1.0:** `ul` (188/188), `connectyou` (96/96), `eckeveldkleding` (88/88), `biltz`,
`mrcopilot`, `plantion` (all 72/72), `osnabrugge` (100/100), `businessparksoest` (67.5/67.5).
**Examples relaxed:** `callab` 1.05, `gzw` 1.1 (serif), `trapxpress` 1.25 (300-weight display).

### Hero CTA count

**Two is the default**, as a primary/secondary pair (see `### The two-CTA pair`). One when the page
has a single job. Zero when the section *below* the hero is the chooser.

**Examples — two:** `ul`, `mrcopilot`, `connectyou`, `plantion`, `businessparksoest`, `osnabrugge`.
**One:** `callab`, `eckeveldkleding`, `trapxpress`.
**Zero:** `biltz` (the hero section contains no links at all), `gzw` (the hero asks "Waar sta jij op
dit moment?" and the three-way situation chooser below it overlaps up into the photo to answer it).

### Eyebrow above the headline — three branches

**Uppercase letter-spaced label.** A small sans line, tracked open, sometimes in a second family.
*Reach for it when* the direction already uses uppercase elsewhere; it pairs with heavy display.
*Examples:* `ul` and `biltz` (DIN 700 at 24px, wide tracking), `osnabrugge` (14px/400 at 0.2em in
muted lavender), `gzw` (generalSans 14px/500 at +2%), `businessparksoest` (lime 16.875px/700),
`eckeveldkleding` (uppercase text inside small white chips), `callab` (tiny and wide-tracked).

**Pill or chip.** The eyebrow becomes a rounded container rather than tracked type.
*Reach for it when* the direction is soft-cornered and uppercase would fight it.
*Examples:* `mrcopilot` (rounded-full pills instead of uppercase labels anywhere), `connectyou`
(a Martian Mono uppercase label inside a translucent white chip — both branches at once).

**None, or sentence case.** *Reach for it when* the site has no uppercase at all.
*Examples:* `trapxpress` (a sentence-case translucent white line), `plantion` (lime sentence-case
text preceded by a small flower glyph).

**Glyph-led eyebrows** are worth stealing: a small brand mark before the label. `osnabrugge` uses a
gold diamond, `plantion` a flower.

### One highlighted word

A single word or phrase inside the headline changes colour, weight or face. Not two, not a
sentence — one.

**When:** the headline contains a proper noun, a date or the one word the whole proposition turns
on. It is the cheapest way to make a plain headline feel designed.

**Examples:** `callab` ("Every conversation **matters**" — the last word in coral), `osnabrugge`
("**Sinds 1923** bouwen aan morgen" — gold, split into per-character spans for the scroll reveal),
`businessparksoest` ("naast **Paleis Soestdijk**" — swapped to a lime script face).
Weight-based variant: `trapxpress` ("In **5 treden** naar een nieuwe trap").

---

## Section rhythm

### Vertical beat

**80-96px top and bottom is the house beat**, applied flat across nearly every section rather than
tuned per block. The emphasis step is 112-144px, reserved for statement bands and full-bleed media.

**When:** pick one beat and one emphasis step, then hold them. Only `osnabrugge` genuinely tunes
per section (80 / 96 / 112 / 128 / 144) and it reads as editorial rather than sloppy because the
content varies that much.

**Examples at the beat:** `eckeveldkleding`, `callab`, `mrcopilot`, `gzw` (all 96px), `connectyou`
(80px), `businessparksoest` (a flat 90px measured identically across 14 sections), `ul` (76.8px).
**Tighter:** `trapxpress` (56px, but at a 14px root, so it reads like 64px), `plantion` (40px on
standard cream sections, jumping to 128px on the two statement bands).
**Emphasis:** `ul` 134.4px, `biltz` 112px, `callab` 136px, `plantion` 128px, `gzw` 155-176px.

### Column counts

2-up dominates for content (text / media splits), 3-up for card rows, 4-up for icon quick-links and
tiles. 5-up appears only for small chips.

**When:** default to 2-up for anything with a media half, 3-up for card rows. Go to 4-up only when
the items are icon-and-label short; a 4-up row of cards carrying body copy does not survive at 1440.

**Examples:** `osnabrugge` and `businessparksoest` (2-up dominant), `biltz`, `mrcopilot`,
`connectyou`, `plantion` (3-up card rows), `gzw` (4-col factor tiles), `plantion` (4-up icon
quick-links), `trapxpress` (5-col style chips at 196px).

### The statement band

One oversized heading, alone, on its own section. No image, no card, often no CTA. It exists to
reset the eye between two dense blocks.

**When:** roughly once or twice per homepage, and always somewhere in the second half. It is the
cheapest section to build and the one that most reliably makes a long page feel composed.

**Examples:** `ul` ("Gevestigd in Amsterdam" at 122px), `callab` (a 280px band, 128px padding, no
image), `plantion` (a dark-green rounded pre-footer panel carrying one sentence in large white
type), `eckeveldkleding` ("De bedrijfskleding maakt de professional", 704px), `osnabrugge`
("Duidelijk, degelijk en duurzaam" pinned at `sticky top-1/2` while images drift past),
`businessparksoest`.

### Overlap as a joining device

A section overlaps up into the one above it, usually by sitting in the previous section's oversized
bottom padding.

**When:** you want the hero to hand off to a chooser or a card row without a visible seam. It also
lets a hero photo run taller than it otherwise could.

**Examples:** `gzw` (the hero carries 176px of bottom padding purely so the three-way chooser can
overlap into it; `--overlap-sm` / `--overlap-lg` are named layout tokens), `plantion` (the white nav
card overlaps the hero photo; the pre-footer green panel overlaps the footer), `callab` (cream bands
enter with large rounded top corners).

---

## CTA and form patterns

### The two-CTA pair

Primary is accent-filled, secondary is white or outlined, and both share **identical geometry** —
same radius, same padding, same type size. The difference is fill only.

**When:** default for the hero. Do not differentiate them by size or shape; a secondary that is
smaller reads as an afterthought.

**Examples:** `mrcopilot` (lime `#dfff40` with navy text / white `#f3f4f6` with navy text, both
18px/600, 4px radius, 16px 24px padding), `businessparksoest` (lime on teal / white on teal, same
radius and padding), `osnabrugge` (gold filled / ghost outlined white, both 44px tall, 4px radius),
`connectyou` (magenta fill with a navy arrow tile / transparent with a 1px cream border and a cream
arrow tile, both 12px radius), `ul`, `plantion`.

### The audience fork

The two CTAs address different **people** rather than different levels of commitment, or an explicit
chooser appears before any content does.

**When:** the client genuinely serves two or more audiences who need different pages. It replaces
a navigation problem with a design element, and it is the single most distinctive conversion pattern
in this set.

**Examples:** `plantion` ("Ik wil aanvoeren" / "Ik wil inkopen" side by side in the hero — supplier
versus buyer; the mega menu is grouped the same way), `connectyou` (a white tab strip pinned *above*
the nav: "Voor sollicitanten" / "Voor werkgevers"), `gzw` (a three-way situation chooser in angled
colour blocks — LATER / NU NOG NIET / ACTIEVE KINDERWENS — overlapping up into the hero), `callab`
(a mid-page audience tab switcher with six panels).

### The named human

A real person with a photograph, a name and a direct phone number and email, used as the conversion
device instead of a generic form link.

**When:** any service business where the next step is a conversation. It outperforms a form link in
this set by a wide margin — six of eleven sites build a whole section around it.

**Examples:** `osnabrugge` (a portrait with a LinkedIn glyph, an uppercase eyebrow "JE VRAAG KOMT
TERECHT BIJ", the name in serif, the role in muted lavender, a gold phone CTA — the site calls it
its signature trust device), `mrcopilot` (two named people with photo, role, phone and email),
`trapxpress` (a dark band with six overlapping circular adviser portraits), `businessparksoest`
(agent portraits with direct phone and mail links).

**The overlapping circular avatar stack** is the compact version of the same idea — a row of
partly-overlapping round portraits with a "+6" counter.
*Examples:* `eckeveldkleding` ("Onze specialisten +6"), `trapxpress` (six advisers), `plantion`
(three staff, pinned to the right of the breadcrumb bar under a "Heb je vragen?" prompt).

### Floating contact affordance

A persistent widget bottom-right, house-designed rather than a third-party bubble, and usually
carrying a face.

**When:** consumer-facing or considered-purchase work. Give it a person, a first name and a
specific sentence; a bare green circle is the weakest version.

**Examples:** `businessparksoest` (a 282x60 pill with an agent photo, the name "Thom van Drie" and
"Vragen? Stuur direct een app!"), `osnabrugge` (a navy "Contact met Henk" pill over a white "Ik help
je graag verder" pill, with a square portrait and a small gold status dot), `trapxpress` (a green
WhatsApp pill "Stuur een foto van je trap", a dark pill and an adviser avatar with an online dot),
`callab` (a circular team photo with a rotating cream tooltip), `mrcopilot` (a plain cyan circle —
the weakest of the five).

**Do not count third-party widgets** as house design: the Leadinfo chat on `connectyou` and the
Cookiebot dialog on `trapxpress` are not part of the system.

### Forms live off the homepage

Eight of eleven homepages carry **no form at all**. The homepage routes to a dedicated conversion
page — a contact page, a quote request, a price calculator, a demo request.

**When:** default. A homepage form is a decision to make, not an assumption.

**Examples with no homepage form:** `ul`, `biltz`, `eckeveldkleding`, `mrcopilot` (form count
literally zero), `trapxpress`, `plantion`, `gzw`, `osnabrugge` (Gravity Forms on `/contact` only).
**Exceptions:** `callab` and `connectyou` both put a single-field newsletter in the footer;
`businessparksoest` puts a brochure request form on the homepage in a white panel.

**The dedicated conversion page is often the shortest page on the site and the only one with no
hero** — `callab`'s demo page is one two-column panel filling the viewport, `biltz`'s contact page
is the shortest page at 2,877px with no hero image, `trapxpress`'s price calculator is the
structural outlier of its site.

### Form field styling follows the direction's radius

Fields are not a separate design decision; they inherit the direction.

**When:** always. Styling fields separately is the fastest way to make a form look bolted on. Take
the button's radius or one step below it, and match the fill to the surface the form sits on.

**Examples:** `ul` and `biltz` (transparent fill, zero radius, underline-only borders, no
placeholder text), `osnabrugge` (0px radius with a 1px `#e5e5e5` border and a white fill — and a
deliberate mismatch, since its buttons are 4px), `callab` (14px radius, translucent cream fill at 5%
over plum, coral pill submit), `connectyou` (12px outlined), `businessparksoest` (7.5px, white fill,
1px white border, label above field, 2-column field grid).

---

## Typography

### One family or two

**One family, doing everything** is the majority. **Two families** means a display face against a
separate UI/body face, and it is what produces the strongest typographic identities in the set.

**One family:** `callab` (Onest for all 26 headings and 844 body elements), `mrcopilot` (Lufga),
`trapxpress` (Stack Sans Text, one `@font-face`, everything), `plantion` (TheSans), `Poppins` on
`businessparksoest` (718 of 732 elements), `eckeveldkleding` (Neue Haas Grotesk Display with its
text-optimised companion).

**Two families:** `osnabrugge` (Larken serif display against Poppins — "the pairing is the whole
typographic idea"), `gzw` (Yrsa serif against generalSans), `ul` and `biltz` (Formula Condensed
display, Roboto Condensed body, DIN for labels and buttons — three, really), `connectyou` (Archivo
everywhere with Martian Mono reserved for eyebrows, dates, read-times and category tags).

**When:** reach for two when the client needs a voice rather than just a look — heritage, editorial,
campaign. A mono second face for meta information (`connectyou`) is the cheapest way to get the
effect without committing to a serif.

### The script accent face

A third, hand-drawn or script face, loaded and used on **fewer than 20 elements** — eyebrows, one
word in a headline, a pointing annotation, an underline behind the display type.

**When:** the brand has any warmth or informality to signal. It is the agency's most consistent
small move and it costs one extra webfont.

**Examples:** `businessparksoest` (Story Script on 14 elements: footer column kickers, price
annotations with hand-drawn arrows, one word inside the hero headline, and a strikethrough heading
on the "Niets voor jou" card), `ul` and `biltz` (Summer Loving on 2 elements each, as a lowercase
hand-drawn eyebrow above black sections), `eckeveldkleding` (`lumios-marker` behind the headline as
a marker swoosh), `gzw` (a hand-drawn white brush stroke under the orienting question).

### Weight strategy — two branches

**Heavy display against light body.** 600-800 on headings, 400 on body. The contrast is weight.
*Reach for it when* the brand is loud, industrial, trade-facing or campaign-driven.
*Examples:* `ul` and `biltz` (700 on all display, 400 body, no light weights anywhere),
`eckeveldkleding` (700 on every heading, no light weight exists in the design), `mrcopilot` (700 on
h1/h2, 800 on h3), `gzw` (700 on h2/h3), `businessparksoest` (600 display, 700 on cards and
buttons).

**Light display, carried by size.** 300-500 on headings, sometimes *lighter than the UI text around
them*. The contrast is scale and colour, not weight.
*Reach for it when* the brand is calm, premium, institutional or product-led. It is harder to get
right and reads as more expensive when it works.
*Examples:* `callab` (400 on every heading and every body element; only buttons step to 600 —
explicitly the opposite of the construction sites), `connectyou` (h1 at 400, statements at 500,
nothing above 500 on screen), `plantion` (display at 400, card headings at 700), `trapxpress`
(display and section headings at **300**, card titles at 500 — headings lighter than the UI),
`osnabrugge` (a single-cut serif, so weight is not a variable at all).

### Tracking — two branches

**Negative tracking that scales with size.** The bigger the type, the tighter it sets.
*Reach for it when* the display face is a large sans set in sentence case; it is what stops 88px
type looking loose.
*Examples:* `eckeveldkleding` (-2.2px at 88px, -2.4px at 96px, and *positive* +0.7px at 28px — a
deliberate optical-sizing rule in both directions), `callab` (-1.8px at 72px, -1.2px at 48px),
`gzw` (roughly -2% on every Yrsa heading).

**Normal tracking.** The majority: `ul` (normal at the huge sizes, +1.2px only at 48px), `biltz`,
`connectyou`, `mrcopilot` (`letter-spacing: normal` everywhere, no adjustments at all),
`trapxpress`, `plantion` (no tweaks anywhere), `businessparksoest`, `osnabrugge`.

**Uppercase eyebrows go the other way** in both camps: +2% or 0.2em positive tracking. `gzw` states
the system outright — tightened serif against opened-out sans.

### Case

Sentence case for headings is the strong majority. Uppercase display belongs to one direction only.

**Uppercase display and buttons:** `ul` and `biltz` (every display heading and every button),
`connectyou` (button labels only), `businessparksoest` (every button, plus breadcrumbs).
**No uppercase anywhere:** `trapxpress`, `plantion`.
**Everyone else:** sentence-case headings with uppercase surviving only in small eyebrows and meta
lines.

**When:** reserve uppercase *display* for the condensed-billboard direction — everywhere else it
fights negative tracking and soft radii. Uppercase on buttons is a separate, smaller decision and is
safe in any direction that already uses uppercase eyebrows.

### Scale gaps

Most sites jump straight from display to a small heading with **no intermediate size** — 72px to
30px on `plantion`, 100px to 60px to 32px on `osnabrugge` with nothing between 32 and 60, 70px
display to 14px body on `gzw`.

**When:** accept the gap. It is what makes the display size read as display. Filling the ladder with
even steps is what makes a page look like a template.

---

## Spacing, grid and surface

### Container

1200-1440px for content, with a narrower measure for running prose.

**Measured:** 1440 (`ul`, `biltz`), 1376 (`callab`, `gzw`), 1360 (`osnabrugge`), 1280 (`connectyou`,
`plantion`, `eckeveldkleding`), 1232 (`mrcopilot`), 1200 (`businessparksoest`), 1064 (`trapxpress`,
at a 14px root).

**Prose measure narrows further:** 922px (`ul`), ~1133px (`osnabrugge`), 720px (`businessparksoest`
article columns), ~1020px (`gzw` articles, against 1376px everywhere else on the site).

**When:** set the content container once, then give running text its own narrower measure. Full-bleed
media ignores the container entirely.

### Radius ladder

Radius is not one number. Each direction picks two steps: a **small step for buttons, inputs and
chips**, and a **large step for cards and panels**. The distance between them is the signature.

- **0px both steps** — `ul`, `biltz` (border-radius tallies came back completely empty).
- **Small UI, square images** — `osnabrugge` (4px on 55 elements: buttons, tag pills, arrow buttons;
  **0px on every content image**; the split is deliberate and consistent).
- **Small button, large card** — `mrcopilot` (4px buttons, 24px cards), `eckeveldkleding` (6px
  buttons, 24px image tiles), `businessparksoest` (7.5px buttons and inputs, 22.5px section panels),
  `gzw` (8px cards and buttons, 4px nav pills, plus directional `8px 8px 0 0` on tabs),
  `trapxpress` (3.5px buttons, 7px standard, 10.5px panels, 14px style chips).
- **Pill-dominant** — `callab` (fully-round on 127 elements, 40px panels, 24px mockup, 14px inputs,
  10px small cards), `plantion` (fully-round is the single most common radius, then 24px and 16px on
  cards, `rounded-3xl` on the footer), `connectyou` (12px buttons, 16px cards, 24px panels, pill on
  tags and counters).

**When:** pick the two steps from the style direction and never introduce a third for one component.

### Borders

Hairlines at 1px, almost always translucent (`#ffffff@0.10-0.20`, `#000000@0.10`) rather than solid,
used where a shadow would otherwise go. Two sites make borders genuinely load-bearing; three have
almost none at all.

**When:** reach for a border only where a shadow would otherwise go — a card edge on a light ground,
a tag pill, an input. Full-height structural rules are a different job and belong to the direction
rather than to any component.

**Load-bearing:** `plantion` (the house card is a **2px dark-green outline on white with a large
radius** — outline instead of elevation), `osnabrugge` (1px hairlines outline tag pills, arrow
buttons and the fieldset-style certificate frame).
**Structural rules rather than card edges:** `ul` (five full-height hairlines at `#ffffff@0.12` rule
the page into six columns), `biltz` (the same six-column rule behind the page),
`businessparksoest` (11 faint `bg-white/5` vertical rules running the full viewport height).
**Effectively absent:** `eckeveldkleding` (two border colours on the whole page),
`businessparksoest` (3 bordered elements site-wide), `mrcopilot` (one `#cccccc` in the document).

---

## Motion

### Smooth scroll

Lenis is the house smooth-scroll library, present on seven of eleven.

**When:** default on new builds. It changes the feel of every scroll-pinned and scroll-velocity
effect below, so decide it before designing those, not after.

**Examples:** `eckeveldkleding`, `callab`, `connectyou`, `plantion`, `gzw`, `businessparksoest`,
`osnabrugge`.

### Staggered group reveals

The single most universal motion pattern: content is hidden until its group scrolls into view, then
enters staggered. Driven by `data-reveal-group` on 7 to 18 elements per page.

**When:** always, and always in **groups**, never per element across a whole page. Two sites go
further with `data-reveal-group-nested` for a reveal inside a reveal.

**Examples:** `businessparksoest` (18), `connectyou` (15, plus nested), `trapxpress` (15, GSAP-driven
— sections returned empty `innerText` until scrolled to), `biltz` (11 + 15 + 4 nested), `callab`
(11, group-level only, no per-element reveals at all), `mrcopilot` (13, caught mid-flight: icon and
title rendered while the body copy was still invisible), `plantion` (12, with
`data-animation-delay`), `gzw` (7), `ul` (6 + 16), `eckeveldkleding` (10).

**The exception:** `osnabrugge` runs no `data-reveal` system at all and uses a bespoke per-character
colour wave instead (see below).

### Reveal character — clip versus fade

**Clip/mask reveals** are the harder-edged variant: `ul` and `biltz` (images and grid tiles were
caught frozen part-way through their mask).
**Fade-up** is the softer one: `connectyou` (`animate-fade-in-up` on 14 elements), `plantion`
(`animate-fade-in-up` with per-element delays), `eckeveldkleding`, `mrcopilot`.

**When:** clip for hard-edged directions (0px radius, uppercase display), fade for soft ones.

### Marquee

Seven of eleven run one. Three distinct jobs:

- **Logo marquee** — `ul` (the five label logos as the footer's track, `30s linear infinite`,
  disabled under `motion-safe`), `mrcopilot` (15 partner logos at 60% opacity, Swiper-driven, inside
  the hero), `biltz` (the same footer module as its parent).
- **Oversized text band** — `connectyou` ("We are ready to connect. Are you?" at 128px in a 160px
  section, 19 repeats, pure CSS), `businessparksoest` ("Boost your business!" at 67.5px in two
  lanes, a CSS keyframe held `paused` and started on scroll-in, and reprised later in the page),
  `callab` (a `.marquee` band on an inner page only).
- **Image wall** — `biltz` (144 images running as marquee rows as the closing flourish).

**When:** a text marquee is the house substitute for a logo bar when the client has no logos worth
showing — `businessparksoest` puts one exactly where a logo strip would go.

**The advanced variant:** `osnabrugge` drives its marquee by **scroll velocity rather than a
keyframe** — `animation: none` with live independent transforms fed by `data-marquee-speed` and
`data-marquee-scroll-speed`, so it drifts at rest and accelerates or reverses with the scroll.

### Custom cursor with looping text

The pointer becomes a small card carrying a looping text label on hover — "Meer weten", "Bekijk
case", "Meer informatie". Implemented as a `.cursor-marquee` card holding two duplicate text spans,
with `data-cursor-marquee-text` on each hoverable element.

**When:** card grids and project galleries where the click target is a whole tile and a button would
clutter it. Do not use it on a site that also needs precise pointing.

**Examples:** `osnabrugge` (23 elements, three label values), `ul` (15 elements, carrying the brand
name), `eckeveldkleding` ("Meer informatie" on service cards, "Bekijk medewerkers" on the team
block). `biltz` wires up a custom cursor but deliberately omits the marquee text.

### Page transitions — a genuine split

**Four sites play a full-viewport panel or veil on navigation:** `ul` and `biltz` (two 900px overlay
panels), `eckeveldkleding` (a barba-style navy `#112457` curtain wipe), `callab` (a plum veil in the
brand colour).
**Seven have none and navigate as a normal document load:** `connectyou`, `mrcopilot`, `trapxpress`,
`plantion`, `gzw`, `osnabrugge`, `businessparksoest`.

**When:** reach for one on portfolio-shaped sites where the visitor moves between showcase pages and
the transition hides the load. Skip it on content or catalogue sites, where it taxes every click
including the ones the visitor wants to make quickly. Note that the three most recent and most
catalogue-like builds in this set all skip it.

### Scroll pinning

A heading, a statement or a card pins while adjacent content scrolls past it.

**When:** a section has one idea and several pieces of evidence. It buys length without adding
sections.

**Examples:** `eckeveldkleding` (`cards-stack__item sticky top-20`, 810px service panels that pile
up under each other), `osnabrugge` (the services heading pinned at `top: 112px`, and a centred
statement at `sticky top-1/2` while five images drift past), `businessparksoest` (a 4,606px
scroll-pinned construction timeline where rotated photo cards fly in from the edges, milestone by
milestone), `mrcopilot` (a sticky card stack on the service section).

### Two-layer hover buttons

The hover state is **already in the DOM**, pre-rendered behind the label at the exact button size,
and revealed rather than animated in.

**When:** it gives a hover you can art-direct instead of a colour transition. `ul` and `biltz` size
a fill layer to each individual button (168x44, 276x44, 472x44) plus a matching square behind each
arrow chip; `osnabrugge` renders every label **twice** inside `.button__inner` over a
`.button__default-bg` face so the label slides and the face swaps.

**Examples:** `ul`, `biltz`, `osnabrugge`.

### Rotation as a layout device

Cards, stickers, chips and photos set a few degrees off axis.

**When:** campaign and consumer work where the page should feel assembled by hand. It is also the
cheapest way to get depth on a site with no shadows.

**Examples:** `gzw` (photo cards at -5° / +5° / +5°, quote cards at -6.8° / +6.4° / -4.8° / +2.4°,
plus rotated campaign stickers and category chips that read as stuck-on tape),
`businessparksoest` (rotated timeline photo cards, and a lime card button that un-rotates and scales
up on hover via `scale-0 rotate-9 group-hover:rotate-0 group-hover:scale-100`).

### Carousels

Swiper is the house slider on nine of eleven. Pagination style varies — dots (`trapxpress`), dashes
(`businessparksoest`), disabled-state arrows rather than looping (`osnabrugge`), or no visible
controls at all where the row is really a marquee.

**When:** a row has more peer-level items than fit — projects, units, vacancies, sub-brands. Do not
use one to hold content the visitor needs to *compare*; the catalogue pages in this set reach for a
filter sidebar and a grid for that, never a slider.

**Examples:** `ul` and `biltz` (services and label rows), `eckeveldkleding`, `connectyou` (employer
slider), `plantion` (`cta-slider`), `osnabrugge` (audience carousel), `businessparksoest` (unit and
news carousels), `mrcopilot` (`marquee-swiper`), `trapxpress`.

### Count-up statistics

A row of three numbers that animate from zero on scroll-in.

**When:** the client has three numbers worth stating. Three is the count in all three cases.

**Examples:** `mrcopilot` (observed reading a literal `0`, `0`, `0%` before the trigger fired),
`connectyou` (152 / 4K / 4.9), `plantion` ("Onze veelzeggende cijfers").

### FAQ accordion

Near-universal, and almost always the last content section before the footer or pre-footer band.

**When:** default. It doubles as the SEO surface and as the last objection-handler before the ask.
`gzw` and `businessparksoest` both wrap it in a full colour panel rather than leaving it on the page
ground.

**Examples:** `biltz`, `eckeveldkleding`, `callab`, `trapxpress`, `gzw`, `businessparksoest`,
`plantion`, `ul` (on `/contact`).

---

## Imagery

### Documentary photography of the real thing

Real workers, the real hall, real interiors. No duotone, no colour grading into the brand palette,
no stock gloss.

**When:** default, and it is the single biggest determinant of whether the design lands. Budget a
shoot. When the client has nothing usable, do not fake it — switch to a flat colour-field hero
(hero type 3) and carry the page on colour and shape instead.

**Examples:** `plantion` (the actual auction hall — the clock wall, buyers at desks with headsets,
trolleys of flowers; explicitly "no overlay scrim, no duotone"), `biltz` (one wide documentary
photograph of a worker, "no overlay, no duotone", bleeding off both edges), `trapxpress` (warm
lifestyle interiors, a woman and a dog on a renovated stair in low golden light), `osnabrugge`
(architecture-monograph framing), `eckeveldkleding` (workshop photography and, on project pages,
client logos appearing only as printed garments — on-message for a printing company).

### Scrim only where type sits

The photograph is darkened only as much as the type needs, and not at all when it is already dark
enough.

**When:** check whether the photo needs a scrim at all before adding one. Several of these sites
carry none because the image or the page ground is already dark, and a reflexive full-image dim is
what makes photography-led pages look stock.

**Examples — scrimmed:** `trapxpress` (a *left-weighted* scrim, so only the type side darkens),
`gzw` (`media-scrim`), the inner-page heroes of `ul`, `biltz` and `osnabrugge` (a dark scrim or navy
wash where the homepage video carries none).
**Examples — unscrimmed:** `plantion` (the photo is dark enough on its own), `ul` and `osnabrugge`
homepages (the page ground is near-black, so the video reads as a dark plate).

### Square versus rounded images

A direction-level decision, and one worth making explicitly rather than inheriting from the card
component.

**When:** decide it once at direction level and apply it to every content image; let UI chrome differ
if you want that contrast, as `osnabrugge` does. The failure mode is inheriting the radius from
whatever card the image happens to sit in, which reads as inconsistency rather than as a choice.

**Square:** `ul`, `biltz` (0px on everything), `osnabrugge` (**0px on every content image against
4px on UI** — square photography against slightly-rounded chrome, stated as deliberate).
**Rounded:** `eckeveldkleding` (24px image tiles with a circular icon badge overlaid),
`businessparksoest` (rounded panels plus a pentagon clip mask), `connectyou` (`rounded-xl` on the
full-bleed photo band), `plantion` (photos inset into rounded outlined cards), `mrcopilot`, `gzw`,
`trapxpress`, `callab`.

### The photo tile as a glyph

A small square photograph set *inline inside* a headline, between two words, as if it were a
character.

**When:** one headline per page, maximum. It only works with uppercase condensed display where the
cap height gives the tile a box to sit in.

**Examples:** `ul` (between "BUILDING" and "A" in the 188px hero headline), `biltz` (inside the
"Wij kennen de omgeving" story-block headline).

### A brand clip shape

One silhouette, derived from the brand, used as an image mask, an icon tile, a bullet, a ghost
outline and a card shape.

**When:** the client's mark reduces to a simple geometric form. It gives a whole site a signature
for the cost of one clip-path.

**Examples:** `businessparksoest` (a house/pentagon shape used as image mask, icon tile, breadcrumb
bullet, decorative 1px ghost outline, and as the shape of the white info card overlapping the unit
detail hero), `gzw` (angled and notched full-height colour blocks, plus a speech-bubble-shaped
content panel on inner pages).

**The flat-pattern alternative:** where there is no shape, a tiled line pattern does the same job —
`eckeveldkleding` tiles the cobalt hero with large outline drawings of t-shirts, caps, boots and
vests in a slightly darker blue.

---

## Footer

### Column count

Four link columns is the default. Five for a site with two distinct audiences, three for a small
site, two when one half is a statement.

**Examples:** `ul`, `biltz`, `callab`, `trapxpress`, `osnabrugge` (4), `plantion` (5 — Plantion /
Aanvoeren / Inkopen / Socials / Contact), `businessparksoest` (3, with the first splitting into two
sub-columns), `connectyou` (asymmetric 2: a display statement and a newsletter left, a 2x2 grid of
outlined contact cards right), `gzw` (2 wide).

### The footer as a composition

Two sites abandon the link grid entirely and make the footer a designed scene.

**When:** the site is small enough that the link columns would be padding, and there is one thing
you want the visitor to do.

**Examples:** `mrcopilot` (a 772px centred CTA composition on brand blue: logo, pill eyebrow, a 48px
"Ready for take-off!", one lime CTA, and a full-width curved flight-path SVG with a plane glyph
tracing behind it), `eckeveldkleding` (a full-bleed photograph of a branded van carrying the address
and a CTA left, a white rounded opening-hours card right, and the wordmark set enormous in white
bleeding off both edges beneath it).

### The pre-footer CTA band

A band immediately above the footer carrying one heading and one button. Ten of eleven have one, in
some form.

**When:** always. It is the second of the two asks (the first being the nav CTA) and it is where a
long page finally converts.

**Examples:** `biltz` ("Ook samenwerken aan de toekomst? Laat het ons weten."), `callab` (a centred
"Every conversation matters." at 48px cream with a demo pill), `plantion` (a darker-green rounded
panel overlapping the footer), `businessparksoest` (a social CTA band on an `#eeeee5` panel, plus a
separate contact/makelaar band above it), `trapxpress` (a `#2f1121` adviser band with six overlapping
portraits), `osnabrugge` (a scroll-velocity marquee plus a named person contact card), `ul` (the
recruitment block). `gzw` folds it into the FAQ band; `mrcopilot` makes the whole footer the band.

### Legal row

Legal links and copyright left, **"Realisatie door Zeker Zichtbaar" hard right**. Nine of eleven.

**When:** always, with the agency credit where these nine put it. Confirm it on campaign or
client-owned work, where it is sometimes dropped.

**Examples:** `ul`, `biltz`, `callab`, `trapxpress`, `plantion`, `eckeveldkleding`, `osnabrugge`,
`businessparksoest`, `mrcopilot`.
**Exceptions:** `connectyou` (right-aligned legal only) and `gzw` (no agency credit at all — a
client-owned public-health campaign).

### The inset footer

The footer is inset from the viewport edges so the page ground frames it on all sides.

**When:** it is the natural closing move for a panel-on-ground layout; a full-bleed footer breaks
the frame that the rest of the page has established.

**Examples:** `plantion` (`mx-2 rounded-3xl` dark green, with a faint darker contour pattern and a
decorative starburst top-right, and the legal bar *outside* the green block on cream),
`businessparksoest` (a 49px lime legal bar, `rounded-t-xl`, inset `mx-2`).

### Closing devices worth stealing

**When:** pick at most one. These are closing flourishes; two in the same footer cancel out.

- A **full-bleed colour bar** closing the page below the legal row — `ul` and `biltz` both end on a
  four-colour white/orange/lime/magenta strip carrying the group's label identities.
- A **certificate or accreditation grid** instead of a client logo wall — `osnabrugge` frames VCA,
  Bouwend Nederland, Woningborg and ISO 9001 in a 1px hairline fieldset whose top border is broken
  by a centred "Onze certificaten" label.
- A **newsletter form as the footer's only conversion element** — `callab` and `connectyou`, both a
  single email field with the accent-coloured submit sitting inside the field.

---

## Where the set genuinely disagrees

An index of the splits above, for quick reference. Each is a real fork, not an average:

| Decision | Branch A | Branch B |
|---|---|---|
| Ground polarity | dark-dominant (`ul`, `connectyou`) | light-dominant (`biltz`, `plantion`, `trapxpress`) |
| Header | sticky, transparent to solid (`ul`, `connectyou`, `mrcopilot`) | floating detached pill or card (`osnabrugge`, `plantion`, `businessparksoest`, `gzw`) |
| Display weight | heavy 600-800 (`ul`, `eckeveldkleding`, `mrcopilot`) | light 300-500 (`callab`, `trapxpress`, `plantion`, `connectyou`) |
| Tracking | negative, scaling with size (`eckeveldkleding`, `callab`, `gzw`) | normal (the other eight) |
| Case | uppercase display (`ul`, `biltz`) | sentence case (everyone else) |
| Images | square (`ul`, `biltz`, `osnabrugge`) | rounded (the other eight) |
| Reveal | clip/mask (`ul`, `biltz`) | fade-up (`connectyou`, `plantion`, `mrcopilot`) |
| Page transition | panel or veil (`ul`, `biltz`, `eckeveldkleding`, `callab`) | none (the other seven) |
| Accent | punctuation only (ten sites) | field-scale campaign colour (`gzw` alone) |
| Eyebrow | uppercase tracked label (`ul`, `osnabrugge`, `gzw`) | pill or chip (`mrcopilot`, `connectyou`) |

---

## Known traps

Things that will mislead you when reading a fingerprint or measuring a new site.

- **The unused shadcn block.** Every ZekerZichtbaar Next.js site carries a byte-identical default
  shadcn variable block (`--primary:#171717`, `--accent:#f5f5f5`, `--chart-1..5`, `--radius:.625rem`).
  On `ul` and `biltz` it is dead code and has nothing to do with the rendered design. On `callab` the
  same layer is **aliased to real `--brand-*` tokens** and is therefore live. Check which before
  trusting it.
- **Shadow tallies lie.** A 392-element "box-shadow" count on `ul` is a 0.75px Tailwind ring, i.e. a
  hairline border. Read the value, not the count.
- **Colour frequency tallies lie.** On `businessparksoest` the accent lime outscores white on raw
  background hits (60 vs 59) purely because it appears on many tiny elements. The tally would have
  called it the brand colour. Use the named tokens or the primary button, per the protocol in
  `sites/_TEMPLATE.md`.
- **Buttons can compute as transparent.** On `osnabrugge` every `.button` computes
  `background: transparent`; the gold fill lives on a `.button__default-bg` child span. Resolve one
  level down before concluding a site has no accent.
- **`plantion` has no `h1` on its homepage at all** — the 72px hero line is an `h2`. Do not copy
  that; it is a defect, not a pattern.
- **`osnabrugge` staging has a broken nav path** — service links point at `/diensten/<slug>/`, which
  404s, while the real pages sit under `/wat-we-doen/<slug>/`. It does not affect the design read.
- **Third-party widgets are not house design.** Leadinfo on `connectyou`, Cookiebot on `trapxpress`,
  the WhatsApp bubble's own green on `businessparksoest`, and every `--wp--preset--*` variable on the
  WordPress builds. Exclude them from palette, radius and shadow reads alike.

---

## Style directions

The clustering of these 11 sites into named directions lives in `styles/`. Read the relevant
direction alongside this file: the stramien says what the slot is, the direction says which branch
of each split applies.

- `styles/billboard-condensed.md` — `ul`, `biltz`
- `styles/flood-and-acid.md` — `eckeveldkleding`, `mrcopilot`, `businessparksoest`
- `styles/deep-ground-editorial.md` — `callab`, `connectyou`, `osnabrugge`
- `styles/warm-daylight.md` — `trapxpress`, `plantion`
- `styles/campaign-poster.md` — `gzw`
