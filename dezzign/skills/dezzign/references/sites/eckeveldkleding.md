# Eckeveld

## Identity
- URL: https://www.eckeveldkleding.nl
- Sector: corporate / work / promotional clothing, printed and embroidered in-house
- Brand feel: loud and graphic — cobalt blue flood, safety-vest yellow, heavy tight-tracked grotesk at 88-96px. Reads like a signwriter's brand rather than a clothing shop; confident, industrial, a bit punk
- Language: nl (nl-NL)
- Measured at: 1440x900

## Navigation
- Structure: two bands. (1) Navy `#112457` utility topbar, 36px: five stars + "4.9 Op basis van 45 reviews" left; "Downloads", "Veelgestelde vragen" and "Mijn account" with a yellow bag icon right. (2) The nav proper, sitting directly on the blue hero with no bar of its own: three **white pill buttons** left — "Personaliseren +", "Projecten", "Wat we doen +" (the `+` marks a dropdown) — then a navy circular `=` hamburger for the full menu; the wordmark **ECKEVELD®** with the tagline "KLEDING IN BEDRIJF" is centred; right is the yellow split CTA "Neem contact op"
- Behaviour: not sticky. The nav scrolls away with the hero (no fixed or sticky header in the DOM; the only fixed elements are the barba transition panel and third-party widgets)
- CTA in nav: "Neem contact op" — the house **split button**: a yellow `#ffec49` label block and a separate yellow arrow (↗) block, divided by a dashed seam, both square-cornered, near-black `#1b211d` text at 700
- Mobile pattern: the `=` circular button opens the full menu; not exercised at 1440

## Hero
- Type: flat colour flood, centred type, no photo. Full-bleed `bg-primary` cobalt `#2a59d9`, 1638px tall (nearly two viewports)
- Media: no photograph. The blue field is tiled with a **large outline-garment pattern** — t-shirts, caps, boots, trousers, vests drawn in a slightly darker blue line, repeating across the whole section. Behind the headline runs a hand-drawn dark-blue marker swoosh/underline (the `lumios-marker` face is loaded for exactly this kind of hand-lettered accent)
- Headline style: "Kleding in bedrijf. Van werkkleding tot promotiekleding." — Neue Haas Grotesk Display Pro 88px / 88px line-height, weight **700**, letter-spacing **-2.2px**, sentence case, 3 centred lines, white. Very tight, very heavy: the exact opposite of the light 400-weight display the other two sites use
- Subline + CTA count: one centred subline at 20px / 36px, weight 500, four short lines. 1 CTA — the yellow split button "Wat we doen" + arrow block
- Extras: the star-rating strip lives in the topbar rather than the hero; no scroll cue, no stats bar, no form

## Section order (homepage)
1. Navy utility topbar - star rating + Downloads / Veelgestelde vragen / Mijn account
2. Nav row on the blue - white pill links, centred wordmark, yellow split CTA
3. Hero - cobalt flood with tiled garment-outline pattern, 88px headline with marker swoosh, subline, one yellow CTA (1638px)
4. Intro + team - "Wij kleden het bedrijf achter jouw merk" at 96px, "Onze specialisten +6" overlapping avatar stack, photo cluster (871px, off-white)
5. **Cards-stack** - full-width rounded coloured panels that pin and stack as you scroll: "Borduren" on cobalt, "Bedrukken" on navy, each with an uppercase chip eyebrow, an 88px white heading, a kicker line and a rounded image tile with a circular icon badge (2004px total)
6. Service explainer - "Ontdek de mogelijkheden van bedrijfskleding bedrukken bij Eckeveld", image left / long body right (870px)
7. Full-bleed photo band - workshop photography, edge to edge (720px)
8. Projects - "Een greep uit de projecten die wij recent op maat verzorgden", 20 images, client cards + "Alle projecten" CTA (1146px)
9. FAQ accordion - "Veelgestelde vragen" + an "Offerte aanvragen" CTA (1161px)
10. Statement band - "De bedrijfskleding maakt de professional" (704px)
11. Instagram feed - "Let's get social" + "Volg op Instagram" (955px)
12. Footer - full-bleed photo, contact block, opening-hours card, oversized wordmark

## Typography
- Heading family: Neue Haas Grotesk Display Pro (Adobe Fonts / Typekit) — 400 and 700, roman and italic
- Body family: the same Display Pro face carries the body too; `neue-haas-grotesk-text` is loaded as the text-optimised companion, plus **lumios-marker** for the hand-drawn accent
- Scale feel: h1 88px/88px, big section h2 96px/100.8px, card/eyebrow h3 28px/35px, lead paragraph 30px/48.75px, body 20-22px with a generous 36px line-height. Sizes come from a fluid system — `--size-container: clamp(1280px, 100vw, 1440px)` and `--size-font: calc(--size-container / --size-unit …)` — so every value above is the 1440 instance
- Weight contrast: 700 for every heading, 400-500 for body. There is no light weight anywhere; the contrast is carried by size and tracking, not by weight
- Case & detail: sentence case headings with **negative tracking that scales with size** (-2.2px at 88px, -2.4px at 96px) and *positive* tracking on the small headings (+0.7px at 28px) — a deliberate optical-sizing rule. Eyebrows are uppercase, letter-spaced, set in small white chips ("DUURZAAM EN REPRESENTATIEF", "FLEXIBEL EN VEELKLEURIG")

## Palette
- Brand: `#2a59d9` — cobalt blue, the Tailwind `bg-primary` token; hero flood, cards-stack panel, client chips, link colour (`--cmplz_hyperlink_color` is configured to the same `#2a59d9`)
- Accent: `#ffec49` — safety yellow, taken from the primary button fill (also `--cmplz_button_accept_background_color: #ffec49`); every CTA on the site and the bag icon in the topbar. A second, very slightly duller yellow `#f4e13c` (20 elements) does the same job in blocks — effectively one accent in two tints
- Neutrals: page background `#f5f3ed` warm off-white (the `bg-light` token), cards `#ffffff`, text `#1b211d` near-black and `#191818`, secondary text `#364153` slate, dividers `#e5e5e5`, deep navy `#112457` for the topbar, the second cards-stack panel and the page-transition curtain
- Background rhythm: **one dark bookend, one long light middle.** Cobalt hero (1638px) -> off-white `#f5f3ed` for everything from section 4 to section 11 -> photographic footer. The only breaks in the off-white run are the cards-stack panels (cobalt, then navy) and the full-bleed photo band
- Accent use: strictly on buttons — yellow never appears as a background field. The large colour fields are blue and navy. Yellow on blue with near-black text is the whole identity in one image

## Spacing & grid
- Container: 1280px, declared as `--size-container-min: 1280px` / `--size-container-max: 1440px` with a `clamp()` between them — so the layout is fluid between those two widths rather than jumping at a breakpoint
- Section padding: 96px top and bottom (`xl:pt-24 xl:pb-24`) on the standard off-white sections, 80px inside the cards-stack, 112px and 256px on two outliers. Homepage total ~11150px — by far the tallest of the three
- Columns: 2-up (text / media) for most content, 2-up card grid on `/projecten/`, 3-up icon badges, full-width for the cards-stack and the photo bands
- Radius & borders: 6px is the single most common radius (40 elements) — small and hard, which is why the buttons read as square — then pill (38) for chips and icon badges, 8px (20), 4px (15), 12px (11), 24px (9) on the big cards and image tiles. Borders are essentially absent (only two border colours on the whole page) and the shadow tally is empty apart from a transparent Tailwind ring. Separation is done entirely with colour blocks

## Motion
- Smooth scroll: Lenis (evidence: `lenis` on `window`)
- Scroll reveals: grouped fade-ins (inferred: `data-reveal-group` on 10 elements)
- Pinned card stack: `cards-stack__item sticky top-20 lg:top-[5vh]` on 810px-tall panels — each service card pins under the previous one and they pile up as you scroll (observed: two panels overlapping in the mid-scroll screenshot)
- Parallax: one `data-parallax` element
- Hover: **custom cursor with marquee text.** `data-cursor-marquee-text="Meer informatie"` sits on the three service cards and `data-cursor-marquee-text="Bekijk medewerkers"` on the team block, with `data-cursor-marquee-text-target` and `data-cursor-marquee-status` driving it — i.e. hovering a card replaces the cursor with a looping text label (inferred from the attributes; not hover-tested)
- Marquee / ticker: only inside the cursor; no page-level marquee band
- Page transitions: yes — `div.barba-transition` fixed full-viewport with a `barba-transition__panel` filled `#112457`, so navigation plays a navy curtain wipe (inferred from the DOM structure; a normal load shows the panel parked)
- Cursor: custom, see above — the clearest custom-cursor implementation of the three sites
- Other: Alpine.js for menus and the FAQ accordion; project slider with bullets (`project-slider__bullet`) and an image slider with thumbnails (`img-slider__thumb`, `slider-thumb__img`, `img-slider__thumb-overlay`)

## Footer
- Columns: not a link-column footer at all. A full-bleed photograph (a branded blue van on a country road) carries two blocks: left, the address "Industrielaan 42, 3925 BE, Scherpenzeel GLD", two phone numbers and the email as underlined white links, then a yellow split CTA "Neem contact op"; right, a **white rounded card holding the opening-hours table** — "Openingstijden" with a status pill ("• Gesloten"), then Maandag-Zondag with times, today's row highlighted in grey
- CTA block: no separate pre-footer band; the "Offerte aanvragen" CTA in the FAQ section and the footer's "Neem contact op" carry it
- Legal row: a thin line over the photo — "Copyright 2026 Eckeveld", "Privacybeleid", "Cookies" left; "Realisatie Zeker Zichtbaar" right. Below it the wordmark **ECKEVELD** is set enormous in white, bleeding off both edges

## Recurring components
- Cards: 24px-radius image tile with a small circular white icon badge overlaid top-left; on `/projecten/` the card adds a cobalt client-name chip over the image and a row of circular garment-type icon badges (trousers / jacket / shoe) under the excerpt. Cards-stack panels are the large variant: full-width, coloured, rounded, pinned
- Testimonials: no quote cards; proof is the star-rating strip in the topbar ("4.9 Op basis van 45 reviews") and the project grid
- Logo bar: none — client logos appear only as printed garments inside the project photography, which is on-message for a printing company
- Forms: no inline form on the homepage; `/offerte-aanvragen/` is the quote form, reCAPTCHA is loaded
- Pricing / packages: none
- Commerce-adjacent pattern (this is a **service site, not a shop** — no product grid, no cart, no prices): the closest house pattern is `/projecten/` — a floating **white pill segmented filter bar** ("Alles" / "Promotiekleding" / "Werkkleding", active state is a white pill inside the bar) overlapping the bottom of the banner photo, driving a 2-column card grid via a `?categorie=` query param. The only account affordance is "Mijn account" with a bag icon in the topbar, which points at an external ordering portal rather than an on-site basket
- Other: FAQ accordion, overlapping circular avatar stack with a "+6" counter for the team, Instagram feed grid, opening-hours table with a live open/closed status pill, an oversized bleeding wordmark as a footer device

## Osmo-like elements
- Custom cursor with looping marquee text on card hover -> cursor
- `cards-stack` pinned/stacking full-width panels -> scroll animation (sticky stack)
- Barba-style navy curtain page transition -> page transition
- Lenis smooth scrolling -> scroll animation / smooth scroll
- `data-reveal-group` fade-ins -> scroll animation (reveal)
- Split button (label block + separate arrow block, dashed seam) -> button
- White pill nav items with `+` dropdown markers -> menu
- Segmented pill filter bar on the project index -> UI component / tabs
- Project slider with bullets and thumbnail image slider -> slider
- Tiled outline-garment background pattern -> visual effect / background
- Oversized bleeding footer wordmark -> text effect
- `lumios-marker` hand-drawn underline behind the headline -> text effect

## Other pages worth noting
- `/projecten/` - the index/catalogue template: photo banner with the h1 "Een greep uit onze projecten", a floating white segmented pill filter bar overlapping the banner, then a 2-column project card grid. `?categorie=` drives filtering
- `/projecten/<slug>/` - case detail pages (jubileum kledinglijn, binnen- en buitendienst, monteurs, gemeente Scherpenzeel, chauffeurs/garage/kantoor) — the richest content type on the site
- `/bedrukken/`, `/borduren/`, `/personaliseren/` - technique pages, the expanded version of the cards-stack panels
- `/diensten/werkkleding/`, `/diensten/promotiekleding/`, `/diensten/schoenen-overige/` - the three product categories, treated as *service* pages rather than shop categories
- `/offerte-aanvragen/`, `/downloads/`, `/veelgestelde-vragen/`, `/medewerkers/` - conversion and support pages; `/downloads/` and `/veelgestelde-vragen/` are promoted into the utility topbar, which is a B2B tell
