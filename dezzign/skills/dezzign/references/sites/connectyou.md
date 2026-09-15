# ConnectYou

## Identity
- URL: https://connectyou.nl
- Sector: IT/tech/finance recruitment agency
- Brand feel: confident night-mode tech brand — deep navy canvas, magenta punch, geometric brand shapes; ambitious rather than corporate
- Language: nl (nl-NL), with English pull-quotes and marquee copy ("We are ready to connect. Are you?", "Connect deeper. Reach further.")
- Measured at: 1440x900

## Navigation
- Structure: two-row. Row 1 is a white audience-switcher tab strip pinned to the very top left: "Voor sollicitanten" (active, white pill with rounded top corners) / "Voor werkgevers". Row 2 is the nav proper: logo left (CY roundel + "CONNECT YOU" wordmark, 234x40), links right — "Vakgebieden" (dropdown), a magenta count pill `181` glued to "Vacatures" (dropdown), "Ons verhaal" (dropdown), "Blogs", "Contact"
- Behaviour: `sticky top-0 z-50`, 88px tall, `bg-transparent` over the hero and `transition-colors duration-300 ease-in-out` to `bg-[var(--category-dark)]` = `#2e063f` once scrolled (observed in the mid and footer screenshots)
- CTA in nav: none as a button; the `181` magenta pill on Vacatures does the pulling work instead
- Mobile pattern: `div.mobile-nav fixed inset-0 z-40 w-full h-full ease-in-out duration-500 pointer-events-none` — full-screen overlay menu, 500ms transition (inferred: class list; not opened at 1440)

## Hero
- Type: split — type block left, brand-shape collage right, over a navy-to-purple radial gradient wash; a full-bleed photo band starts immediately under it
- Media: no hero photo. Flat geometric brand marks: green (#00a878) and magenta (#96007a) half-discs and a violet (#8d85ff) four-petal form, stacked as a loose collage. Behind everything a `h-screen object-cover opacity-3` photo layer (effectively invisible texture)
- Headline style: "Morgen begint vandaag" — Archivo 96px / 96px line-height, weight 400, sentence case, 2 lines, white, no letter-spacing. Huge but light-weight: scale does the shouting, not weight
- Subline + CTA count: no subline. 2 CTAs — primary "ALLE VACATURES" (magenta #96007a fill, cream #e0d8c3 label, 12px radius, uppercase, trailing navy square with an arrow glyph), secondary "ONS VERHAAL" (transparent, 1px cream-tinted border, same 12px radius, trailing cream square with arrow)
- Extras: eyebrow pill "VOOR WIE VOORUIT WIL" in Martian Mono, uppercase, on a translucent white chip above the h1. Directly below the hero sits a search band ("Kies je locatie" city select) over a full-bleed photo, then a review strip "5.0 op basis van 102 beoordelingen"

## Section order (homepage)
1. Audience tab strip - "Voor sollicitanten" / "Voor werkgevers" switcher, white pills on navy
2. Sticky nav - logo + 5 items, magenta vacancy counter pill
3. Hero split - eyebrow pill, 96px headline, 2 CTAs, geometric brand-shape collage right (528px)
4. Search band over photo - rounded-xl (`mx-4 rounded-xl overflow-hidden`) full-bleed photo, overlay headline "Niet nog meer zoeken, maar beter kiezen…" + location select (792px)
5. Proof strip - "5.0 op basis van 102 beoordelingen" + category pills CONNECTYOU / FINANCE / IT / TECHNIEK (106px)
6. Marquee band - "We are ready to connect. Are you?" repeated, 128px type, 19 items (160px)
7. Vakgebieden 3-up - Finance / IT / Techniek cards with photo, vacancy count eyebrow and copy (1008px)
8. Statement + stats - "Recruitment? Wij noemen het mensenwerk." 60px statement, portrait right, then a 3-up counter row 152 / 4K / 4.9 (764px)
9. Employer slider - "Ontdek werkgevers die bij je passen", swiper of employer cards with logo, location, vacancy count (710px)
10. Statement + image - "Niet elke deur openen, maar de juiste deur" (752px)
11. Blog teasers - "Blijf op de hoogte" on a `bg-white/10 rounded-lg` panel, 3 posts with date/read-time/category meta pills + big image right (874px)
12. Footer - statement, newsletter form, 2x2 contact cards, partner logo row, legal bar

## Typography
- Heading family: Archivo (variable, 100-900, roman + italic loaded) — all h1-h4
- Body family: Archivo for everything; Martian Mono (100-800) is the second family, reserved for eyebrows, meta pills, dates, read-time and category tags in uppercase
- Scale feel: h1 96px/96px, statement h2 60px/60px, section h2 36px/40px, h3 48px/48px, marquee p 128px/128px, body 16px. Line-height is locked to 1.0 on every display size — tight, poster-like blocks
- Weight contrast: display h1 at 400, section headings and statements at 500, body 400. No bold-heavy headings at all; there is no 700+ in the type on screen
- Case & detail: sentence case for all headings; uppercase only in Martian Mono eyebrows, button labels and meta pills. Letter-spacing normal everywhere

## Palette
- Brand: `#96007a` — magenta, exposed as the theme variable `--category-light`; primary button fill, count pill, newsletter submit
- Accent: `#2e063f` — deep aubergine, `--category-dark`; the scrolled nav bar. Secondary accents from the brand-shape collage and category tags: `#00a878` green (IT), `#8d85ff` violet (Techniek), `#e0d8c3` cream (ConnectYou)
- Neutrals: text `#ffffff` (82 elements), secondary text/button labels `#e0d8c3` cream, muted `#ffffff@0.70` and `#dfd7c3@0.50`, page background `#000725` navy, panel fills `#ffffff@0.05` and `#f5ffff@0.10`, borders `#ffffff@0.20` and `#e1d7c3@0.30`
- Background rhythm: dark all the way down. Navy `#000725` base, broken only by (a) the rounded-xl photo band near the top, (b) the `bg-white/10` blog panel, (c) dark-teal `#00373e` cards on the vacancy pages. There is no light section on the homepage
- Accent use: sparing and deliberate — magenta on exactly one button per screen plus the nav counter; the larger colour fields are the flat geometric brand shapes in the hero, not backgrounds

## Spacing & grid
- Container: 1280px max-width centred (12 elements); one 1408px full-width-minus-gutter wrapper
- Section padding: 80px top and 80px bottom at 1440 (`xl:pt-20 xl:pb-20`); the ramp is 32/48/64/80 across breakpoints. Sections run 528-1008px tall, homepage total ~6760px
- Columns: 3-up for vakgebieden cards, stats and blog meta; 2-up asymmetric (text left / media right) for statement sections; 2x2 for footer contact cards
- Radius & borders: 12px on buttons and vacancy cards, 16px on content cards, 24px on larger panels, `rounded-xl` on the full-bleed photo band, pill (`1.67772e+07px`) on tags and counters. Borders are hairline 1px translucent white/cream (`#ffffff@0.20`, `#e1d7c3@0.30`), never solid. Box-shadows are essentially absent — depth comes from translucent fills, not shadow

## Motion
- Smooth scroll: Lenis is on `window` (evidence: `lenis` in libs)
- Scroll reveals: fade-up, grouped/staggered (inferred: `animate-fade-in-up` on 14 elements plus `data-reveal-group` on 15 and `data-reveal-group-nested`; confirmed indirectly by sections returning empty `innerText` until scrolled into view)
- Parallax: inner-image parallax on media blocks (inferred: `inner-parallax` class on 10 elements)
- Hover: not directly observed (no hover pass by design). Buttons carry a `group relative inline-flex` wrapper with a separate arrow tile, which is the standard arrow-slide-on-hover shape (inferred: `zz-submit-button group` markup)
- Marquee / ticker: yes — one marquee band, "We are ready to connect. Are you?" at 128px, in a 160px-tall section (observed: 19 repeated copies of the phrase in the DOM; CSS-driven rather than JS-driven is inferred from the `marquee-css`, `marquee-css__list`, `marquee-css__item` class names and the absence of a marquee library)
- Page transitions: none (no barba/taxi; navigation is a normal document load)
- Cursor: none custom (`cursor-pointer` utility only)
- Other libs: Alpine.js drives the nav/filters state, jQuery + Gravity Forms for the forms

## Footer
- Columns: asymmetric 2-column. Left: display statement "Connect deeper. Reach further." (~60px), then "Niks missen? Stay in the loop." with an inline newsletter form — one rounded 12px outlined field with placeholder "E-mailadres" and a magenta "AANMELDEN" button + cream arrow tile sitting inside the field; below it a partner logo row (Robin, Vincere, Indeed) in flat white/greyscale. Right: a 2x2 grid of outlined contact cards, each with a cream icon tile top-left and the value bottom-left — phone `+31 (0) 50 311 606 4`, `info@connectyou.nl`, `Nieuwe Ebbingestraat 53, 9712 NE Groningen`, socials (LinkedIn / Instagram)
- CTA block: no separate pre-footer CTA band — the newsletter form is the footer's conversion element
- Legal row: right-aligned single line — "Privacyverklaring", "Cookies", "© 2026 Connectyou. All rights reserved."

## Recurring components
- Cards: 12px radius, 24px padding, flat tinted fill (no shadow), hairline translucent border on the outlined variant. Vacancy card = square white logo tile left, title + category tag pill, then a Martian Mono meta row of icon+label pairs (company / Fulltime / city / salary range), arrow tile right. Employer card = logo, location, "5 vacatures", description
- Testimonials: none as quotes; social proof is a numeric strip ("5.0 op basis van 102 beoordelingen") and the 152 / 4K / 4.9 stat row
- Logo bar: two of them — a swiper-driven employer card slider mid-page (3 `swiper-slide`), and a static 3-logo partner row in the footer
- Forms: newsletter (email + submit) in the footer; a city/radius select in the hero search band; Gravity Forms powers the application forms
- Pricing / packages: none
- Commerce-adjacent pattern (the house "catalogue" layout, /vacatures/): left filter sidebar 340px wide with accordion groups — "Kies een vakgebied" (checkbox list Finance/IT/Techniek), "Locatie & Afstand" (postcode/city field + radius), "Salaris" (per-maand/per-jaar toggle switch + dual range slider €0-€10.000) — and a right results column with a full-width search field ("Zoek op functietitel of bedrijf") + square cream search button, a **Lijst / Grid** view toggle (segmented control, cream active pill, 12px radius), a result counter "24 van 178 resultaten gevonden", then stacked result cards. No cart; the arrow tile on each card is the add-to-funnel affordance
- Other: stat counters, category tag pills coloured per vakgebied, Leadinfo chat widget bottom-right (third-party, not house design)

## Osmo-like elements
- Text marquee band "We are ready to connect. Are you?" -> marquee
- Lenis smooth scrolling -> scroll animation / smooth scroll
- `animate-fade-in-up` + `data-reveal-group` staggered entrances -> scroll animation (reveal)
- `inner-parallax` image blocks -> scroll animation (parallax)
- Sticky nav that transitions transparent -> `--category-dark` on scroll -> navigation menu
- Full-screen `mobile-nav` overlay, 500ms -> menu / page overlay
- Swiper employer slider -> slider
- Button with separate arrow tile -> button / hover
- Filter sidebar with range slider and Lijst/Grid segmented toggle -> form / UI component

## Other pages worth noting
- `/vacatures/` - the catalogue page. Two-column: persistent filter sidebar left, search + view toggle + result count + stacked cards right. Cards are filled with a per-category dark colour (`#00373e` for IT) rather than the page navy, which is the only place the category theming becomes a background. No hero, no marquee — page title "Vacatures" at ~72px sits directly in the grid
- `/vakgebieden/finance/`, `/vakgebieden/it/`, `/vakgebieden/techniek/` - category landing pages that re-theme the whole page through `--category-light` / `--category-dark`, including the scrolled nav bar colour
- `/open-sollicitatie/`, `/contact/` - Gravity Forms pages
- `/blogs/` + detail pages - meta pill row (date / read time / category) is the recurring article header component
