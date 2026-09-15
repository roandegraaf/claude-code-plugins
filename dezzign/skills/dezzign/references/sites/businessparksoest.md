# Businesspark Soest

## Identity
- URL: https://businessparksoest.nl
- Sector: new-build business units, commercial real estate development
- Brand feel: confident and energetic developer sales site — deep forest-teal ground with an acid-lime shout, informal Dutch ("Boost your business!", "Psst, wakker worden") over a serious investment product
- Language: nl (`lang="nl-NL"`)
- Measured at: 1440x900

Stack note: WordPress + custom theme `wp-theme-businessparksoest`, Tailwind v4 (oklch theme tokens), Alpine.js, GSAP + SplitText + Draggable, Lenis, Swiper, Gravity Forms, WP Rocket.

**Root font-size is 15px, not 16px** — `html { font-size: calc(clamp(992px, 100vw, 1800px) / (1440/15)) }`. Every px value below is the real computed value at 1440 and is therefore fractional (67.5px, 16.875px, 7.5px); that is the system, not a rounding error.

**Agency house pattern — fluid root font-size.** The entire type and spacing scale is driven by `html { font-size: var(--size-font) }`, where `--size-font: calc(<clamped container width> / (<ideal viewport> / <base unit>))`. Identical mechanism to osnabrugge, only retuned: here 15px at a 1440 ideal, clamped 992-1800px; there 16px at a 1440 ideal, clamped 1280-1920px. This is an agency-level convention, not a per-site choice, and it means every px value in these files is viewport-relative.

## Navigation
- Structure: two stacked bars. (1) A full-bleed lime **USP topbar with availability meter** — three icon+label USPs left ("81 moderne units", "Koop of huur", "Midden in 600 Ha natuur") and a thin progress bar right reading "Nog **34** units beschikbaar". (2) The main bar: a floating dark-teal rounded pill panel (1150x89px, inset from the left edge) holding the logo left and 4 centre links — "Informatie +", "Bedrijfsunits +", "Huren", "Contact" — where the `+` marks two dropdowns; a separate lime CTA button floats to the right of the panel, outside it, as its own rounded block.
- Behaviour: the wrapper is `sticky top-0 z-[1000]`, 89px tall, background transparent — the pill panel and the CTA are the only painted surfaces, so the page content scrolls visibly underneath and between them. No shrink, no hide-on-scroll, no solid-on-scroll swap.
- CTA in nav: "BEKIJK BESCHIKBARE UNITS" — lime `#eaff69` on teal `#003e3e` text, 700 weight, 15px, uppercase, radius 7.5px, padding 15px 30px.
- Mobile pattern: hamburger (not opened — measurement is desktop-only per brief)

## Hero
- Type: centered type on the dark-teal body ground, with two clipped photos floating asymmetrically left-bottom and right-top; not full-bleed, not split, not a slider. 852px tall.
- Media: two architectural renders/photos masked into a **house/pentagon clip shape** (flat sides, pointed top) — this silhouette is the brand mark and recurs as icon tiles and info cards. A third outlined pentagon in 1px white sits as a decorative ghost shape. Behind everything, 11 faint vertical `bg-white/5` rules (`.boost-line`) run the full viewport height as a background grid.
- Headline style: "Het enige bedrijvenpark naast *Paleis Soestdijk*" — Poppins 600 at 67.5px, line-height 67.5px (1.0, tight), sentence case, white, 3 lines, with the final proper noun swapped to **Story Script in lime `#eaff69`**. That script-word-inside-the-headline move is the single loudest typographic signature on the site.
- Subline + CTA count: uppercase lime eyebrow "81 MODERNE BUSINESS UNITS IN SOEST" (16.875px/700, ls 0.84375px) above the headline; 18.75px/400 white subline at lh 33.75px; 2 CTAs — primary "BEKIJK PLATTEGROND" (lime bg, teal text), secondary "HUUR NOG DIT JAAR" (white bg, teal text). Same radius and padding for both.
- Extras: handwritten Story Script annotation "34 units beschikbaar" in lime with a hand-drawn curved arrow pointing at the CTAs; the availability meter in the topbar; a fixed WhatsApp bubble bottom-right (`#25d366`, 282x60, radius 12px) with an agent's photo, name "Thom van Drie" and "Vragen? Stuur direct een app!".

## Section order (homepage)
The structural signature: **sections have no backgrounds of their own — they are inset rounded panels floating on one continuous dark-teal ground.** `bg-light` / `bg-white` panels carry `rounded-t-3xl rounded-b-3xl mx-2 my-2` (22.5px radius, 8px side inset), so the teal shows as a thin frame all the way round. Everything else is `bg-transparent` and reads straight on the teal. Vertical rhythm is a flat 90px top / 90px bottom on every section.

1. **Hero, centered type + clipped floating photos** - headline, lime eyebrow, 2 CTAs, script annotation (852px, on ground)
2. **Product carousel (Swiper)** - "Claim de plek die wat op gaat leveren", unit types with m² eyebrows and price chips, 8 images (869px, on ground)
3. **News/update carousel (Swiper)** - "Laat je inspireren (of boosten) door onze updates", 9 article cards (807px, on ground)
4. **Scroll-pinned progress timeline** - "Bouwvoortgang", 4606px tall; rotated photo cards with gradient-overlaid captions fly in from the sides as you scroll, milestone by milestone, ending in a centred "BEKIJK ALLE BOUWUPDATES" CTA (on ground)
5. **Partner split (image/text row)** - "Weten of je het pand kunt bekostigen?", financing partner, lime script eyebrow left of a clipped photo (675px, on ground)
6. **Light panel, value block** - "Dit is waarom Businesspark Soest jouw business boost" (675px, `#eeeee5` rounded panel)
7. **Live webcam video grid** - "Volg de bouw live", 6 `<video>` cards in a white rounded panel (551px, `#ffffff`)
8. **Marquee CTA band** - "Boost your business!" repeated in a horizontally scrolling text marquee at `text-7xl` (67.5px) and up, two lanes, over the ground (870px)
9. **Brochure form panel** - "Nog aan het oriënteren?", Gravity Form in a white rounded panel (705px, `#ffffff`)
10. **Pros/cons two-column comparison cards** - "Wij geven jou 6 goede redenen…"; two big rounded cards side by side, left `#eeeee5` headed "Niets voor jou" in Story Script **with a strikethrough**, right `#ffffff` headed "Perfect voor jou"; each holds a stack of white pill rows with a teal house-shaped icon tile carrying a `−` (left) or lime `+` (right) (1031px, on ground)
11. **FAQ accordion panel** - "Veelgestelde vragen over Businesspark Soest", 7 items in a `#eeeee5` rounded panel (941px)
12. **Marquee CTA band (reprise)** - "Boost your business!" again, shorter (425px, on ground)
13. **Contact/makelaar band** - "Vragen over het project of financiering?", agent portraits + direct phone/mail links (632px, on ground)
14. **Pre-footer social CTA band** - "Wil je op de hoogte blijven…?" / script eyebrow "Volg ons op Instagram", huge near-black 67.5px headline on a `#eeeee5` rounded panel, lime CTA, two rounded render photos flanking it and a ghost pentagon outline (826px)
15. **Footer link columns** - see Footer (521px, on ground)
16. **Lime legal bar** - `bg-yellow` strip, `rounded-t-xl`, inset `mx-2` (49px)

## Typography
- Heading family: `Poppins`, fallback `sans-serif` (token `--font-body: "Poppins", sans-serif`). No separate heading family — Poppins does everything.
- Body family: `Poppins` (718 of 732 sampled text elements). The only second face is `Story Script` (`--font-script: "Story Script", cursive`), used purely as an accent — 14 elements — for eyebrows, footer column kickers, price annotations and one word inside the hero headline. `Montserrat 100` is loaded but not used anywhere visible.
- Scale feel: h1 67.5px/600/lh 1.0 · section h2 56.25px/600/lh 1.0 · card h2 28.125px/700/lh 33.75px · h3 22.5px/500-600/lh 30-33.75px · lead p 18.75px/400/lh 33.75px (1.8) · article prose 16.875px/lh 30px in a 720px column · buttons and inputs 15px. Roughly a 1.2 ratio in the small sizes with a hard jump to display at h2/h1 — big headlines, generous 1.8 body leading.
- Weight contrast: 600 on the big display headings, 700 on card headings/eyebrows/buttons, 400 on body. No 300, no 900. Poppins is loaded at 100-900 in both styles but the design only ever uses 400/500/600/700.
- Case & detail: uppercase lime eyebrows at 16.875px/700 with 0.84375px letter-spacing, and uppercase 700 on every button; breadcrumbs uppercase; everything else sentence case with normal tracking. Story Script supplies the italic/handwritten accent — never italics of Poppins.

## Palette
Source: **rule (a) — the theme exposes named CSS variables.** They live in Tailwind v4's `@layer theme` block (which the generic `cssVars` walk misses, since a `CSSLayerBlockRule` has no `selectorText`), declared in oklch; hex below is the resolved computed value.

- Brand: `#003e3e` (`--color-primary`, oklch(32.94% .0562 194.77)) — deep forest teal. This is the **body background**, not a section colour: the entire document sits on it.
- Brand dark: `#002f2f` (`--color-primary-dark`) — a darker teal used for the nav pill panel and for one inverted section panel on the unit detail pages.
- Accent: `#eaff69` (`--color-yellow`, oklch(95.65% .1738 116.51)) — acid lime. Primary CTA fill, all script-font eyebrows, the USP topbar, price chips, tag pills, the footer legal bar, `+` icons, the availability meter.
- Neutrals: `#ffffff` (`--color-white`) body text on teal and secondary button fill · `#eeeee5` (`--color-light`) warm off-white panel ground · `#231f20` (`--color-dark`) near-black, used for headlines that sit on the light panels · `#003f3f@0.70` muted teal for secondary copy on light · borders effectively absent (only 3 bordered elements site-wide, all white).
- Background rhythm: one continuous `#003e3e` ground from top to bottom, interrupted by inset rounded panels in `#eeeee5` and `#ffffff` at roughly every third section (6, 7, 9, 11, 14), plus the lime topbar at the very top and the lime legal bar at the very bottom. Dark → light → dark → light, with dark always winning the count.
- Accent use: sparing but loud — lime is never a large field except the 56px topbar and the 49px legal bar. Its high raw frequency in the colour tally (60 background hits, beating white's 59) comes from many small elements: buttons, chips, pills, icons. It is an accent, not a background; the tally alone would have read it wrong, which is why the button rule and the named tokens were used instead.
- Excluded: `#25d366` / `#00c950@0.90` in the dump is the third-party WhatsApp widget bubble, not brand colour.

## Spacing & grid
- Container: 1200px max-width is the dominant content container (17 elements); a wider 1425px band is used for the full-bleed-ish rounded panels, which are the viewport minus an 8px (`mx-2`) inset on each side. Gutters come from the fluid `--size-container: clamp(992px, 100vw, 1800px)` system.
- Section padding: a flat **90px top / 90px bottom** on essentially every section (`pt-24 pb-24` at a 15px root = 90px; 14 sections measured identically). Some panels override to 0 on one side where they butt against a neighbour.
- Columns: mostly 2-up. Product/news carousels run 3 cards visible with a 4:3 image box at 413x310px. The pros/cons block is a strict 2-column of equal cards. The "6 redenen" icon rows are single-column stacks inside those cards. Footer is 3 columns, with the first splitting into 2 sub-columns of links.
- Radius & borders: the Tailwind radius scale at a 15px root — 7.5px (`rounded-lg`, buttons, inputs, small cards, icon tiles), 11.25px (`rounded-xl`), 15px (`rounded-2xl`), 22.5px (`rounded-3xl`, the big section panels), and full-round pills. **No shadows** — 3 box-shadows exist on the entire homepage and all are third-party. **No borders** — separation comes from the panel-on-ground contrast, not from lines. Flat, high-contrast, edge-defined by colour.

## Motion
- Scroll reveals: fade/translate reveals in staggered groups (inferred: 18 elements carry `data-reveal-group`, GSAP + `ScrollTrigger` present). Headline text is split and revealed per line/word (inferred: `SplitText.min.js` is loaded).
- Scroll-pinned timeline: the 4606px "Bouwvoortgang" section is scroll-driven — photo cards are rotated a few degrees and translate in from the left/right edge as the section scrubs (observed: caught mid-flight in the 45%-scroll screenshot, a rotated card half off-canvas with the rest of the section still empty).
- Marquee / ticker: yes — two "Boost your business!" text marquees at `text-7xl` (67.5px) and up. Observed computed animation `30.2933s linear infinite paused marquee-translateX`, i.e. a CSS-keyframe translate marquee held in `paused` state and started on scroll-in. A second `marquee-header` variant exists (`data-marquee-header`, 12 `.marquee-header__item`).
- Hover: unit cards reveal a lime action button that un-rotates and scales up (observed in the class list: `scale-0 rotate-9 group-hover:rotate-0 group-hover:scale-100` on a lime 7.5px-radius button inside each unit card). Other hovers not directly observed.
- Smooth scroll: Lenis (inferred: `lenis` class on `<html>` and the global is present; the easing character was not observed).
- Page transitions: none (no barba, no transition library in `scripts`).
- Cursor: none — default cursor, only `cursor-pointer` utility classes.
- Sliders: Swiper on the unit carousel and the news carousel, with dash-style pagination bullets rather than dots (observed on the unit detail hero).

## Footer
- Columns: 3. (1) "Op zoek naar extra informatie?" — site links split over two sub-columns (Bedrijfsunits, Omgeving, Veelgestelde vragen, Nieuws, Claim bedrijfsunit). (2) "Units" — the six unit-type detail pages. (3) "Social media" — Instagram and LinkedIn glyphs only. Each column heading is a two-line lockup: a lime Story Script kicker ("Wij nemen je mee", "Boost your business", "Stay tuned") above a white Poppins 600 heading.
- CTA block: yes — a **pre-footer social CTA band** immediately above it ("Wil je op de hoogte blijven van de laatste ontwikkelingen omtrent Businesspark Soest?" with a lime "VOLG ONS OP INSTAGRAM" button) on a `#eeeee5` rounded panel, plus the separate contact/makelaar band above that.
- Legal row: a 49px full-width **lime bar, `rounded-t-xl`, inset `mx-2`**, teal text — "Privacybeleid" and "Cookies" left, "Realisatie door Zeker Zichtbaar" right. No copyright line.

## Recurring components
- Cards: rounded 7.5-15px, no border, no shadow, flat fill (`#ffffff` or `#eeeee5`) on the teal ground; image on top in a fixed 4:3 box (413x310), text below. Photo cards in the timeline are rotated a few degrees with a dark gradient overlay and white text over the image itself.
- Testimonials: none.
- Logo bar: none — its slot in the layout is taken by the **text marquee CTA band** instead.
- Forms: Gravity Forms, twice on the homepage (brochure request) and once on /contact. White fill, 1px white border (so borderless on light panels, a subtle edge on teal), 7.5px radius, 11.25px 15px padding, 15px text; label above field; 2-column field grid; consent checkbox; submit is a solid teal `#003e3e` button with white uppercase text, same radius and padding as the lime CTAs.
- Pricing / packages: yes, as **price chips** — a lime chip "KOOP VANAF €260.000 v.o.n." beside a dark-teal chip "HUUR VANAF €1.650 p/m excl. btw", both with a small uppercase label above the figure. Per unit type, on the carousel cards and the detail hero.
- Other:
  - **Availability meter** — thin progress bar + "Nog 34 units beschikbaar" in the topbar; repeated as a white rounded pill "Nog 2 beschikbaar, 3 te huur →" on detail pages.
  - **Pros/cons comparison cards** — the "Niets voor jou" / "Perfect voor jou" two-column block with `−`/`+` house-shaped icon tiles.
  - **House/pentagon clip shape** — used as image mask, icon tile, breadcrumb bullet, ghost outline and as the shape of the overlapping white info card on detail heroes.
  - **Script-font annotations** — Story Script in lime with hand-drawn arrows, used as a pointer/aside device.
  - FAQ accordion (7 items), live webcam video grid (6 `<video>`), scroll-pinned milestone timeline, floating WhatsApp contact bubble, breadcrumbs on every subpage.

## Osmo-like elements
- Sticky floating pill nav with `+` dropdowns and a detached CTA block -> menu
- "Boost your business!" oversized text marquee, two bands -> marquee
- Unit and news carousels with dash pagination (Swiper) -> slider
- Scroll-pinned construction timeline, rotated cards flying in -> scroll animation
- SplitText per-line headline reveals -> text animation
- `data-reveal-group` staggered fade-ups -> scroll animation
- Unit-card hover button (rotate + scale in) -> hover
- Lenis smooth scroll -> scroll (smooth scrolling)
- FAQ accordion -> accordion
- House/pentagon clip-path image masks -> clip/shape reveal
- Full-height `bg-white/5` vertical background rules -> background/grid effect
- Floating WhatsApp contact bubble -> sticky CTA

## Other pages worth noting
- `/bedrijfsunits/hoekunits-type-i/` - product detail. Breadcrumb bar under the nav, then a **hero image slider** (Swiper, 4 slides, dash pagination) inset as a rounded panel rather than full-bleed, with the h1 and the lime/teal price chips overlaid bottom-left, an availability pill top-right, and a **white house/pentagon-shaped info card overlapping the slider's right edge** carrying a benefit headline in Poppins + Story Script and its own lime CTA. Below: a 2165px spec/FAQ block, an inverted `bg-primary-dark` gallery panel ("Ontdek de eindeloze mogelijkheden"), and a 2705px `bg-light` panel holding a **per-unit availability table** ("Kies jouw Hoekunits type I"). 8223px total.
- `/contact/` - short 428px **image-banner hero** (rounded, inset 8px, aerial render) with a centred white headline overlaid — no lime eyebrow, no CTAs; then a split section with copy and phone numbers left, the Gravity Form right on the teal ground; then an FAQ panel, a marquee CTA band, and a team/agent photo row. Reuses the homepage's tail sections verbatim.
- `/nieuws/goed-nieuws-de-bouw-loopt-op-schema/` - article detail. No image hero: breadcrumb, then an uppercase "5 MINUTEN LEESTIJD" read-time eyebrow, a **left-aligned** 67.5px h1 (the only left-aligned h1 on the site) with **lime tag pills** ("BOUWUPDATE", "WERKPLEK & NATUUR") floated right at the headline's baseline, then a full-width rounded hero image, then a 720px prose column at 16.875px/30px. Closes with the same "Laat je inspireren…" news carousel as the homepage.
