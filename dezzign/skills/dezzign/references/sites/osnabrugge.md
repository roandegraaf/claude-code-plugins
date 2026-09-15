# Bouwbedrijf Osnabrugge

## Identity
- URL: https://osnabrugge.staging.zekerzichtbaar.nl
- Sector: construction contractor, new-build and renovation
- Brand feel: heritage and craftsmanship worn confidently — a 1923 family builder presented like an architecture monograph. Royal-blue and gold, serif display type, full-bleed photography, formal Dutch ("u", not "je"). Calm and editorial where a developer site would shout.
- Language: nl (`lang="nl-NL"`)
- Measured at: 1440x900

Plausibility gate: passed. Title "Bouwbedrijf Osnabrugge voor al uw bouwwerkzaamheden", h1 "Sinds 1923 bouwen aan morgen", real navigation, real project content, real NAP/KVK/BTW in the footer. No basic-auth, no placeholder, no Coolify error. It is the real site on a staging host.

Stack note: WordPress 7.1 + custom theme `wp-theme-osnabrugge`, Tailwind (v3-style, compiled — no colour custom properties emitted), Lenis, Swiper, jQuery, Gravity Forms, Complianz. No GSAP global; the scroll work is a bespoke `data-marquee-*` / `data-gradient-wave-text` system.

Root font-size is 16px at 1440, but fluid: `--size-font: calc(var(--size-container) / (1440/16))` where `--size-container: clamp(1280px, 100vw, 1920px)`. Whole-number measurements throughout, unlike sibling sites on a 15px root.

**Agency house pattern — fluid root font-size.** The entire type and spacing scale is driven by `html { font-size: var(--size-font) }`, where `--size-font: calc(<clamped container width> / (<ideal viewport> / <base unit>))`. Identical mechanism to businessparksoest, only retuned: here 16px at a 1440 ideal, clamped 1280-1920px; there 15px at a 1440 ideal, clamped 992-1800px. This is an agency-level convention, not a per-site choice, and it means every px value in these files is viewport-relative.

## Navigation
- Structure: a single **floating white pill bar**, horizontally centred, 914x64px. Logo mark left, a hairline divider, then 4 links — "Over ons ⌄", "Projecten", "Voor wie ⌄", "Diensten ⌄" (three carry chevrons and open mega-menus) — then two buttons right: outlined white "Werken bij" and gold-filled "Contact". Poppins 16px/500, navy `#00247d`.
- Behaviour: `position: fixed; top: 24px; z-index: 100` — detached from the viewport edge, floating 24px down, over the hero video with no transparency phase and no shrink. It never docks or changes state on scroll. A separate full-viewport `.topnav__backdrop` (`#00237d@0.20`, z-index 99) fades in behind an open mega-menu as a scrim over 0.45s; at rest it is `opacity: 0; visibility: hidden`, so it never tints the hero (verified).
- CTA in nav: "Contact" — gold `#eabc3f` fill, navy text, 4px radius, 44px tall. Beside it the secondary "Werken bij" in white with a hairline navy border, same geometry.
- Mobile pattern: hamburger (not opened — measurement is desktop-only per brief)

## Hero
- Type: full-bleed 900px **autoplaying background video**, type anchored bottom-left, no container inset.
- Media: video of a finished new-build street, no overlay tint on the homepage; the video plays muted and loops behind the type. On inner pages the same block degrades to a still photo with a navy wash.
- Headline style: "**Sinds 1923** bouwen aan morgen" — Larken-Bold at **100px**, line-height 100px (1.0), sentence case, 3 lines, left-aligned. The date phrase "Sinds 1923" is coloured gold `#eabc3f` and split into per-character spans; the rest is white. A serif display face at 100px against Poppins body is the site's core typographic contrast.
- Subline + CTA count: no subline in the hero itself (the intro paragraph is its own section below). 2 CTAs — gold-filled "Onze filosofie", ghost/outlined white "Welke baan past bij jou?".
- Extras: a **showreel card** bottom-right — 352x198 video thumbnail with a circular white play glyph, the title "Bouwen aan morgen" and a duration "01:09"; it opens a full-viewport `.showreel__lightbox`. Plus a fixed contact widget bottom-right: a navy pill "Contact met Henk" over a white pill "Ik help je graag verder", with a square portrait and a small gold status dot.

## Section order (homepage)
The structural signature is the inverse of a panel-on-ground layout: **full-bleed alternating colour blocks**. Sections are edge-to-edge and take turns being navy `#00247d` or the lavender-white ground `#f5f4ff`, with a white footer to close. Nothing is inset, nothing floats, and image corners are square.

1. **Full-bleed video hero** - looping background video, 100px serif headline with a gold date phrase, 2 CTAs, showreel card (900px, navy)
2. **Per-character wave-reveal intro** - one centred 24px statement paragraph, "Gewoon goed geregeld…", split into 136 character spans that fade from 22% to full navy on scroll (280px, ground; padding 56px/112px)
3. **Audience slider** - "Voor wie": 4 Swiper slides at 403x455 (Particulier / Zakelijk / Overheid & instanties / Retail, horeca & recreatie), each a square-cornered photo + 32px serif h3 + outlined tag pills, with two 44px arrow buttons (715px, ground)
4. **Sticky-heading service grid** - "Onze diensten": the heading column sticks at `top: 112px` while a 2-up grid of 4 service tiles scrolls past on the right; each tile is a square-cornered photo, a white Poppins title and a gold 44x44 arrow button (1191px, navy)
5. **Staggered project gallery** - "Projecten": large offset portrait/landscape media (video and stills) alternating left and right at different heights, each captioned with a navy bold title and outlined category tag pills (2484px, ground)
6. **Sticky centred statement + image collage** - "Duidelijk, degelijk en duurzaam": the 72px serif heading is pinned at `sticky top-1/2` while 5 square-cornered images drift past it (1168px, ground)
7. **Feature band (image/text row)** - "Uw wens staat centraal in het gehele bouwproces", the about/philosophy block with an eyebrow, prose and a CTA (1215px, navy)
8. **Scroll-driven marquee + person contact card** - "Neem contact op" repeated in a huge white serif marquee that moves with scroll velocity, and below it a named contact card: square portrait with a LinkedIn glyph, a letter-spaced uppercase eyebrow "JE VRAAG KOMT TERECHT BIJ", the name in serif, the role in muted lavender, a gold "Bel 033 277 37 38" and an outlined "Neem contact op" (669px, navy)
9. **Footer** - see Footer (1002px, white)

## Typography
- Heading family: `Larken-Bold`, a single-cut serif display face loaded as one file (`Larken-Bold normal normal`), so computed weight reads 500 everywhere — the boldness is in the cut, not the weight axis. Used for every h1/h2/h3, the marquee text, the timeline years and nothing else.
- Body family: `Poppins`, loaded 300-900. Carries all body copy, nav, buttons, labels, tags and card titles (526 of 559 sampled text elements). The pairing — high-contrast serif display over a geometric sans — is the whole typographic idea.
- Scale feel: h1 100px/lh 1.0 (72px on detail pages) · section h2 60px/lh 63px and 72px/lh 72px · h3 32px/lh 40px · lead p 24px/500/lh 37.2px · body p 20px/400/lh 30px · small 18px/500/lh 28px · nav and buttons 16px/500 · tags 14px/500 · eyebrow 14px/400. A big, confident jump from 32px to 60px+ with no intermediate display size.
- Weight contrast: the serif is single-weight; Poppins runs 400 for prose, 500 for UI and labels, 700 for card titles. No light weights in use despite 300 being loaded.
- Case & detail: one uppercase device only — the small eyebrow at 14px/400 with **2.8px letter-spacing (0.2em)** in muted lavender `#a29fca`, e.g. "JE VRAAG KOMT TERECHT BIJ". Section eyebrows elsewhere are sentence-case Poppins preceded by a small gold diamond glyph ("◆ Wat we doen", "◆ Bouwen of verbouwen?"). Everything else is sentence case with normal tracking. No italics.

## Palette
Source: **rule (b), resolved one level down.** No `--color-*` or `--brand-*` tokens exist — the theme emits only sizing custom properties (`--size-container`, `--size-font`, `--container-pad`, `--gutter`) plus Tailwind's opacity helpers. Every `.button` itself computes `background: transparent`; the gold fill lives on a child `.button__default-bg` span, the resting face of a two-layer swap button. That span is the primary button's real background and is where the accent below comes from — not from the frequency tally.

- Brand: `#00247d` — royal/navy blue. Body text colour and the fill of every dark section (16 elements); also the footer's text colour.
- Accent: `#eabc3f` — warm gold/ochre. Primary button fill, the 44x44 square arrow buttons, the "Sinds 1923" hero phrase, the diamond glyph before section eyebrows, and the filled tag pills on case-detail heroes. 11 background hits — genuinely sparing.
- Neutrals: `#f5f4ff` page ground, a very pale lavender-white (set on `<body>` as `bg-[#F5F4FF]`) · `#ffffff` footer, cards and the nav bar · `#a29fca` muted lavender for eyebrows and role labels · `#00237d@0.20` hairline borders (19 elements) · `#e5e5e5` form-input borders.
- Background rhythm: alternating full-bleed blocks — navy hero → lavender ground → lavender ground → **navy** → lavender → lavender → **navy** → **navy** → white footer. Navy takes the hero, the services block and the whole pre-footer run, so the page opens and closes dark with a long light middle. One black `#000000` section appears on /contact.
- Accent use: strictly punctuation. Gold never fills a section; it appears at button scale or smaller, plus exactly one phrase of display type in the hero. The restraint is the point — it reads as gilding on navy, not as a second brand colour.

## Spacing & grid
- Container: `--container-w: clamp(1280px, 100vw, 1920px)` with `--container-pad: 2.5rem` (40px), giving a 1360px inner content width at 1440. Prose columns narrow to ~1133px and the timeline/article measure is narrower still. Full-bleed media ignores the container entirely.
- Section padding: 80px and 96px are the workhorses, with 112px, 128px and 144px on the more editorial blocks. Looser and more variable than a single fixed rhythm — the vertical spacing is tuned per section rather than tokenised.
- Columns: 2-up dominates — the services grid, the audience slider (4 slides, ~3 visible at 403px), the split feature bands. The project gallery deliberately breaks the grid with offset, unequal-height media. The footer is 4 columns. The history timeline is a single centred column.
- Radius & borders: **4px** is the house radius (55 elements — buttons, tag pills, arrow buttons), 8px on a few cards and archive photos, 9999px on circular icon buttons, and **0px on every content image**. Square photography against slightly-rounded UI is a deliberate and consistent split. Borders are real and load-bearing: 1px hairlines in `#00237d@0.20` outline tag pills, arrow buttons and the footer's certificate frame. **No drop shadows** — the only box-shadows are 1px inset rings standing in for borders.

## Motion
- Per-character text reveal: the intro paragraph carries `data-gradient-wave-text` and is split into `.gradient-wave-word > .gradient-wave-char` divs, each resting at `rgba(0,36,125,0.22)` with `transition: all` and resolving to full navy — a colour wave that sweeps the sentence character by character on scroll. 136 characters on the homepage (observed: the split DOM and the 22% resting colour).
- Marquee / ticker: yes, and **scroll-velocity driven rather than keyframed**. `.contact-marquee` has `animation: none` while `.contact-marquee__scroll` and `.contact-marquee__collection` carry independent live transforms (`matrix(1,0,0,1,144,0)` and `matrix(1,0,0,1,-16.03,0)`), fed by `data-marquee-speed`, `data-marquee-scroll-speed`, `data-marquee-direction` and `data-marquee-duplicate` — so it drifts at rest and accelerates or reverses with scroll (observed: two live transforms with no CSS animation running).
- Cursor: **custom cursor marquee.** A fixed `.cursor-marquee` card holds two duplicate `.cursor-marquee__text-span` elements; 23 elements carry `data-cursor-marquee-text` with values "Meer weten", "Bekijk dienst", "Bekijk case". Hovering a card turns the pointer into a looping text badge (observed: the element, its duplicate-span structure and the three text values).
- Scroll pinning: two sticky treatments — the services heading at `top: 112px` and the "Duidelijk, degelijk en duurzaam" statement at `sticky top-1/2`, both holding while adjacent media scrolls past (observed: computed `position: sticky` with those offsets).
- Hover: buttons are a **two-layer text swap** — every `.button` renders its label twice inside `.button__inner` over a `.button__default-bg` gold face, so the label slides and the face swaps on hover (observed: duplicated label text "Contact Contact", "Onze filosofie Onze filosofie", and a `--default` / paired face on the gold arrow buttons). The exact transition was not hovered.
- Smooth scroll: Lenis (inferred: the global is present; easing character not observed).
- Page transitions: none (no barba or transition library in `scripts`).
- Sliders: Swiper on the audience carousel, with square 44px prev/next arrow buttons that get a `swiper-button-disabled` state rather than looping.

## Footer
- Columns: 4, on white with navy text, opening with a centred logo + "OSNABRUGGE" wordmark lockup. (1) "Over Osnabrugge" — Over ons, Certificaten, Onze historie. (2) "Onze diensten" — the four service pages. (3) "Sociale media" — Facebook, Instagram, Linked-In as text links. (4) "Contact" — full NAP block (Holleweg 1, 3925 LW Scherpenzeel (gld)), phone, email, then **KVK: 09082060** and **BTW: NL8023.26.031.B01** with bold labels.
- CTA block: none in the footer itself — the pre-footer job is done by the preceding navy "Neem contact op" marquee + person contact card. Inner pages instead close on a "Klaar voor een samenwerking?" band.
- Legal row: below a **certificate logo bar** — VCA**, Bouwend Nederland, Woningborg and ISO 9001:2015 inside a 1px hairline frame whose top border is broken by a centred "Onze certificaten" label, fieldset-style. Then "Privacybeleid" and "Cookiebeleid" left, "Realisatie door Zeker Zichtbaar" right. No copyright line.

## Recurring components
- Cards: square-cornered photo on top, navy serif or Poppins-bold title below, optional outlined tag pills. No fill, no border, no shadow — the card is just stacked content on the ground. The contact card is the exception: a solid white block with generous padding on navy.
- Testimonials: none.
- Logo bar: yes — a static **certificate/accreditation grid** in the footer (4 marks, hairline frame with an inset legend). Not a marquee, not a client-logo wall.
- Forms: Gravity Forms on /contact only (the homepage has none). Square inputs — **0px radius**, 1px `#e5e5e5` border, white fill, 16px 20px padding, 14px text, including a `<select>`. Submit is the same two-layer `.button--secondary` as the rest of the site. Note the deliberate mismatch: inputs are square while buttons are 4px.
- Pricing / packages: none.
- Other:
  - **Person contact card** — portrait + LinkedIn glyph, letter-spaced uppercase eyebrow, name in serif, role in muted lavender, a phone CTA and a form CTA. The site's signature trust device, echoed by the fixed "Contact met Henk" widget.
  - **Gold diamond eyebrow glyph** — a small gold rhombus preceding section labels.
  - **Tag pills, two variants** — outlined navy hairline on light grounds (project and audience cards), gold-filled on case-detail heroes.
  - **Square gold arrow button** — 44x44, 4px radius, with a face-swap hover; the standard "go deeper" affordance.
  - **Showreel card + lightbox** — thumbnail with play glyph and duration, opening a full-viewport video overlay.
  - Vertical history timeline (giant serif years), staggered project gallery, sticky section headings, mega-menu with a full-viewport scrim.

## Osmo-like elements
- Floating centred pill nav with chevron mega-menus and a backdrop scrim -> menu
- Scroll-velocity "Neem contact op" serif marquee (`data-marquee-*`) -> marquee
- Custom cursor that becomes a looping text badge (`data-cursor-marquee-text`) -> cursor
- Per-character colour-wave paragraph reveal (`data-gradient-wave-text`) -> text animation
- Sticky section heading with content scrolling past -> scroll animation
- Sticky centred statement with drifting image collage -> scroll animation
- Two-layer text-swap buttons (`.button__inner` + `.button__default-bg`) -> button / hover
- Gold arrow buttons with face swap -> hover
- Audience carousel with disabled-state arrows (Swiper) -> slider
- Showreel video lightbox -> lightbox / modal
- Lenis smooth scroll -> scroll (smooth scrolling)
- Staggered offset project gallery -> gallery

## Other pages worth noting
- `/projecten/luxe-villa-ede/` - case detail. 792px full-bleed photo hero under a navy wash, **gold-filled** tag pills ("Particulier", "Nieuwbouw") above a 72px serif white h1, and a "Terug naar alle projecten" back link with a white circular icon button. Then a 312px intro, then a **13,196px photo essay** — 38 square-cornered images in one continuous scroll section — then "Bekijk ook eens" related projects on white and a "Klaar voor een samenwerking?" CTA band. 17,665px total; by far the longest page measured.
- `/contact/` - uses a `home-header--compact` hero variant: 720px full-bleed photo (no video) with the gold diamond eyebrow "Bouwen of verbouwen?" and the serif h1 bottom-left, and a **stepped notch cut into the bottom-left corner** where the lavender ground intrudes into the image. Then a 3-up contact-info card row, a white "Stel je vraag" Gravity Form section with two iframes (map + recaptcha), and a **black `#000000` 660px section** ("Gewoon goed geregeld") — the only pure-black block found on the site.
- `/over-ons/onze-historie/` - a 5,024px **centred vertical timeline**, single column, no sticky: for each milestone an 8px-rounded archive photo (black and white), then the year set enormous in navy Larken-Bold, then a Poppins-bold subheading and a narrow centred prose column. 61 timeline elements. Structurally unlike anything else on the site and the clearest expression of the heritage positioning.
- Staging caveat: the nav's service links point at `/diensten/<slug>/`, which **404s** ("Pagina niet gevonden") — the live service pages appear to sit under `/wat-we-doen/<slug>/`. The 404 template itself is styled and branded. Worth knowing that this staging build has a broken nav path, though it does not affect the design fingerprint.
