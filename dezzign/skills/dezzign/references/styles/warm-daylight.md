# Warm daylight

**Reach for this when** the visitor needs reassurance more than excitement: a trusted service
business, a co-operative, an institution, consumer home improvement — anywhere the decision is
personal, the photography is good, and the brand's job is to feel safe to call.

**Example sites:** `trapxpress`, `plantion`

## Type

- **Light display on a warm light ground.** 52-72px at weight 300-400 — on `trapxpress`, the display
  is genuinely *lighter* than the UI text around it (300 against 500/600 labels).
- **Sentence case, normal tracking, and no uppercase anywhere on the site.** Not in eyebrows, not in
  buttons, not in meta lines. This is the only direction that bans it outright, and it is most of
  what makes these pages feel unpushy.
- **One family does everything** — a humanist or neo-grotesk sans with a wide weight range.
- **Emphasis inside a heading is done by stepping the weight up on one phrase**, not by colour:
  "In **5 treden** naar een nieuwe trap".
- **Eyebrows are sentence case**, often preceded by a small brand glyph (a flower, a mark) in the
  accent colour, or dropped entirely in favour of a translucent line over the hero photo.
- **Body at 16-18px with ~1.5 leading**, and a hard gap from display straight down to a 28-30px
  section heading with nothing between. Card titles step up to 700 to hold their own against a 400
  display.

**Watch the root.** `trapxpress` runs a fixed 14px root, so its display lands at 52.5px and its body
at 12.25px — genuinely small on screen. If you inherit that, check readability at 1440 before
committing; a 15 or 16px root is the safer default.

## Palette logic

- **The ground is a warm light neutral — cream or white, never a cool grey — and it runs top to
  bottom.** Every content section sits on it; white cards float on the cream.
- **Colour enters through the photography.** The palette's job is to stay out of the way of it.
- **One saturated accent** — a magenta, a lime — fills CTAs, active states, arrows, eyebrow text and
  icon highlights, and nothing else. It never becomes a background field. A darker companion of the
  same hue handles hover and arrow blocks; it is not a second brand colour.
- **One deep brand colour does double duty**: it is the body text colour *and* the fill of the one
  or two dark blocks in the page — typically the pre-footer band and the footer.
- **One tinted neutral** (a light grey, a second cream) marks the occasional section change. One is
  enough; `trapxpress` uses exactly one tinted section on a whole homepage.
- **Functional colours stay functional.** A green is a "we're open" dot and a messaging-app pill,
  never decoration.

## Motion character

Quiet. The moving parts are interface, not decoration.

- **Fade-up reveals with per-element delays**, held until the group's trigger fires. Content stays
  genuinely hidden until then, so budget for a visible entrance rather than a subtle one.
- **Smooth scroll**, hover transitions on colour and arrows, and nothing else ambient.
- **No page transitions, no custom cursor, no marquee.** All three are absent from both sites, and
  their absence is what keeps the register calm.
- The interactive components are the motion: an accordion, a slider with dot pagination, a tabbed
  hero with an animated active underline, a live search overlay with suggested queries, a hide-on-
  scroll utility strip above a sticky bar.

## Surface

- **Soft and shadowless.** Zero box-shadows on either site.
- **Pills dominate** the radius tally; cards take 7-24px.
- **Two card treatments**, both valid:
  - Photo-led, with the title overlaid on the image for type and project cards and set beneath it
    for article cards. An inset rounded thumbnail in the corner is a nice detail for showing a
    material or finish.
  - **A white card with a ~2px brand-coloured outline and a large radius** — outline instead of
    elevation. This is `plantion`'s house card and it is the cleanest shadowless card in the set.
- Buttons are fully-rounded pills at 700 with generous padding, or a small 3.5px radius with a boxed
  trailing arrow in the darker accent.

## Trust devices are the real signature

They are components, not copy, and they are what separate this direction from a generic light site.
Reach for several:

- **An opening-hours table with a live open/closed status pill** and today's row highlighted.
- **A review score with its count**, placed in the utility topbar where it is seen before anything
  else ("4.4 op basis van 232 reviews").
- **Overlapping circular staff avatars** under a "have a question?" prompt, pinned beside the
  breadcrumb or in a dedicated dark band.
- **A named adviser in a floating widget** with a photo, an online dot and a specific sentence.
- **Trust badges** in the footer contact column.
- **A showroom or location card** with a photo and a circular accent arrow.

## Structure

- **A utility topbar is near-mandatory here.** It is where the hours, the rating, the login, the
  language switcher and the shop link live. If the client has none of those, question whether this
  is the right direction.
- **The nav is either a floating white rounded card overlapping the hero photo, or a sticky white
  bar** under a thin dark strip that scrolls away.
- **A fixed bottom-centre pill bar** of two or three shortcuts is available for sites with recurring
  utility destinations (`plantion`).
- **The hero is a full-bleed documentary photograph.** No duotone, no grading into the palette, and
  a scrim only where the type actually sits — weight it to one side rather than dimming the whole
  image.
- **Audience-fork CTAs** work well here: two hero buttons addressing different people rather than
  different commitment levels ("Ik wil aanvoeren" / "Ik wil inkopen"), with the mega menu grouped
  the same way.
- **The dark pre-footer band** is the page's one raised voice. Put the adviser, the statement or the
  ask there.

## Not this direction

A dark page, heavy or condensed display, uppercase anything, or an accent used at field scale. If
the client's photography is weak, this direction has nothing to fall back on — switch to
`flood-and-acid.md` and let colour carry the page instead.
