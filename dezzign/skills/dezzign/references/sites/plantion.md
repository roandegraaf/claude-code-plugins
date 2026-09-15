# Plantion

## Identity
- URL: https://www.plantion.nl
- Sector: flower and plant auction / wholesale marketplace (B2B co-operative)
- Brand feel: warm institutional green — a big, trusted co-op that still wants to feel friendly; cream paper, rounded everything, zero hard edges
- Language: nl (nl-NL), with WPML `/en/` and `/de/` variants and a flag switcher in the topbar
- Measured at: 1440x900

## Navigation
- Structure: three bands. (1) Utility topbar on cream, 48px: "Nieuws / FAQ / Agenda / Medewerkers" left, a dark-green pill "De openingstijden van vandaag" with a chevron dead centre, and right a lime "Webshop" pill with a bag icon, a white "Mijn Plantion" pill with a user icon, and an NL flag dropdown. (2) The nav proper: a floating **white rounded card** (a 1280px "island" with generous radius) that overlaps the hero photo — flower logomark + "Plantion" wordmark left, a hairline divider, then "Over Plantion / Aanvoeren / Inkopen" (each with a dropdown chevron) and "Werken bij"; right side an outlined pill "Onze extra's" (dropdown), a lime pill "Neem contact op", and a cream circular search button. (3) A **floating white pill bar fixed bottom-centre** (465x64) with three line-icon shortcuts: "Webshop", "Mijn Plantion", "Openingstijden" — present on every page
- Behaviour: `nav absolute top-12 z-[60] transition-transform duration-300`, 88px tall, white card that never goes transparent. Observed pinned to the top in both the mid-scroll and footer screenshots; the transform transition implies hide-on-scroll-down / reveal-on-scroll-up (inferred: `transition-transform duration-300` with no colour transition)
- CTA in nav: "Neem contact op" — lime `#80c41c` pill, white 18px/700 label, 16px/24px padding, fully rounded
- Mobile pattern: `div.mobile-nav fixed inset-0 w-full h-full ease-in-out duration-500` full-screen overlay; the "Onze extra's" mega menu is grouped by audience with button-driven panels — "Kwekers", "Bloemisten", "Tuincentra", "Supermarkt en groothandel", "Consumenten en bedrijven" — each unfolding its own link list, Aanvoertips / Assortiment / Alflora / Kansenkalender / Vendingmachines and ~25 more (inferred: those audience names are `button` elements inside `div.mobile-nav` and the leaf links are present in the same subtree; the menu was not opened at 1440)

## Hero
- Type: full-bleed photograph, edge to edge, with the white nav card floating on top of it
- Media: documentary photography of the actual auction hall — the clock display wall, buyers at desks with headsets, trolleys of flowers. No overlay scrim, no duotone: the photo is dark enough on its own. Subpages use the same treatment with a shallow-depth-of-field foreground plant blurring the bottom edge
- Headline style: centred white, TheSans 72px / 72px line-height, weight **400**, sentence case, 2 lines — "Hét inkoopcentrum voor de groenprofessional". On the homepage this is an `h2`; there is **no h1 on the homepage at all** (subpages do have one)
- Subline + CTA count: no subline. 2 CTAs side by side, both fully rounded pills, 18px/700, 16px/24px padding — primary "Ik wil aanvoeren" (lime `#80c41c`, white text), secondary "Ik wil inkopen" (white fill, dark-green `#01673d` text). The pair is a literal audience fork: supplier vs buyer
- Extras: no badges or scroll cue in the hero itself; the fixed bottom pill bar (Webshop / Mijn Plantion / Openingstijden) does that job

## Section order (homepage)
1. Utility topbar - links, opening-hours pill, Webshop / Mijn Plantion, language flag
2. Floating nav card - overlapping the hero photo
3. Hero photo - centred 72px headline + 2 audience-fork pill CTAs (684px)
4. Audience split "Voor kwekers" / "Voor kopers" - green-outlined rounded cards with photo and a link list (Veilinformatie, Regiobijeenkomsten, Productpromotie / Plantion Webshop, Bezorgservice) plus an "Alles voor de kwekers" pill (732px, cream)
5. Stats band "Onze veelzeggende cijfers" - 72px green heading over a counter row (718px, cream)
6. Quote / statement band - 128px padding, no image (280px)
7. Event feature - "Dé inkoop- en inspiratiedagen voor groenprofessionals" (Floréda), poster image left / eyebrow + 72px heading + body + lime pill "Meld je hier aan als bezoeker" right (762px, cream)
8. Icon quick-links "Veiling en inkoop" - 4-up white rounded cards with green line icons (360px, cream)
9. News / stay-informed "Altijd op de hoogte blijven" - 3 article cards (708px, cream)
10. Pre-footer statement - dark-green rounded panel, "Onze dienstverlening is klantgericht, de benadering hartelijk" set large in white (648px)
11. Footer - dark-green rounded-3xl block, 5 columns
12. Legal bar - back on cream, outside the green block

## Typography
- Heading family: TheSans (LucasFonts) — the entire site, no second family. 14 faces loaded, 100/200/300/400/600/700/800/900 plus italics
- Body family: TheSans
- Scale feel: display h2 72px/72px, section h3 30px/36px, card/eyebrow h3 18px/28px, body 16px/24px and 18px, fine print 12px/16px. Display line-height is locked to 1.0; body runs a loose ~1.5. Big jump from 72px straight down to 30px — there is no intermediate display size
- Weight contrast: display headings at **400** (light for their size, humanist and calm), card headings at 700, eyebrows at 600, body at 400. Buttons are 700
- Case & detail: sentence case throughout; no uppercase anywhere, no letter-spacing tweaks. Eyebrows are lime green with a small flower glyph in front ("Meteen aan de slag", "Floréda")

## Palette
- Brand: `#01673d` — dark forest green; body copy colour (69 elements), footer fill, pre-footer panel, secondary button text
- Accent: `#80c41c` — lime, taken from the primary button's background because no brand custom properties surfaced in the dump (only WordPress `--wp--preset--*` defaults); primary button fill, eyebrow text, the "Webshop" topbar pill, icon highlights. `#005934` appears as a darker green for the inset panel inside the footer
- Neutrals: page background `#faf3e6` warm cream (18 elements), cards `#ffffff` (27), white text on green `#ffffff`, muted `#ffffff@0.70` and `#000000@0.70`, borders `#00693c@0.20` and `#000000@0.15`
- Background rhythm: cream from top to bottom. Every content section is `bg-body` cream with white cards floating on it; the only dark moments are the hero photo, the pre-footer green statement panel and the green footer. Light-dominant, inverse of ConnectYou
- Accent use: sparing — lime is only ever a button fill, an eyebrow or an icon; it is never a background field. The large colour field is the dark green footer/pre-footer

## Spacing & grid
- Container: 1280px max-width centred (12 elements), with a 1424px edge wrapper for the full-bleed blocks
- Section padding: 40px top / 40px bottom on the standard cream sections (`lg:pt-10 lg:pb-10` — tight by modern standards), jumping to 128px (`xl:pt-32`) on the two statement bands and 192/224px on the largest. Homepage total ~5640px
- Columns: 2-up for the audience split and the event feature, 4-up for the icon quick-links, 3-up for news cards, 5 columns in the footer
- Radius & borders: pills everywhere — fully-rounded is the single most common radius (40 elements), then 24px (15) and 16px (9) on cards, `rounded-3xl` on the footer and pre-footer panels, `0px 0px 12px 12px` on dropdown panels. The house card treatment is a **2px dark-green outline on white with a large radius**, not a shadow — the shadow tally is literally empty on the whole page. The footer sits `mx-2` inset from the viewport edges so the cream shows on all sides

## Motion
- Smooth scroll: Lenis (evidence: `lenis` on `window`)
- Scroll reveals: fade-up with a per-element delay (inferred: `animate-fade-in-up` on 11 elements, `data-reveal-group` on 12, `data-animation-delay` on 11)
- Hover: not directly observed. Pill buttons and the outlined cards are the obvious hover targets (inferred: `cursor-pointer` on 19 elements)
- Marquee / ticker: none
- Page transitions: none (normal document loads)
- Cursor: none custom
- Other: Alpine.js for menu/dropdown state, **Livewire** for the search overlay — the search button opens a panel with "Zoeken", the prompt "Wat kan ik voor je vinden?" and a "Populaire zoekopdrachten:" list, i.e. a server-driven live search rather than a plain results page (inferred: Livewire loaded, and the `h2` "Zoeken" plus the `p` samples "Wat kan ik voor je vinden?" / "Populaire zoekopdrachten:" are already in the DOM at load; the button was not clicked). One `cta-slider` swiper (3 slides)

## Footer
- Columns: 5 — "Plantion" (Over Plantion, Coöperatie, Duurzaamheid, Nieuws, Werken bij), "Aanvoeren" (Aanvoeren via Plantion, Aanvoerder worden, Tarieven aanvoerders, De veilingklok, Veelgestelde vragen aanvoerders), "Inkopen" (Inkopen via Plantion, Inkoper worden, Tarieven inkopers, Bezorgservice, Veelgestelde vragen inkopen), "Socials" (Instagram, Facebook, LinkedIn, Vimeo, Pinterest), "Contact" (Wellensiekstraat 4, 6718 XZ Ede + phone and email with small line icons). The whole block is `bg-secondary #01673d`, `mx-2 rounded-3xl`, carries a faint darker contour-line pattern and a decorative white starburst/flower mark top-right
- CTA block: yes — the pre-footer is a darker green rounded panel that overlaps the footer, holding the statement "Onze dienstverlening is klantgericht, de benadering hartelijk" in large white type
- Legal row: outside the green block, on cream — "Copyright © 2026 Plantion", "Privacybeleid", "Cookiebeleid", "Algemene voorwaarden" left; "Realisatie door Zeker Zichtbaar" right

## Recurring components
- Cards: two variants. (a) outlined — white fill, ~2px dark-green border, ~24px radius, photo inset at the top, heading + link list + pill CTA; (b) plain white rounded card with a green line icon, used for the 4-up quick-links. No shadows on either
- Testimonials: none; social proof is the "Onze veelzeggende cijfers" counter band
- Logo bar: none as a standalone strip (partner marks appear inside the event poster image)
- Forms: no inline form on the homepage; the search overlay is the only interactive input. Contact runs through "Neem contact op"
- Pricing / packages: none on the homepage, but `/tarieven-aanvoerders/` and `/tarieven-inkopers/` are first-class nav destinations
- Commerce pattern: **the shop is not on this domain.** "Webshop" points at `shop.plantion.nl` and "Mijn Plantion" at `mijnplantion.plantion.nl`, both separate applications. What the marketing site contributes is the *entry* pattern: a lime Webshop pill in the topbar, the same Webshop item in the fixed bottom pill bar, and a "Plantion Webshop" link inside the buyer card. So there is no product grid, no filters and no cart in the house design — commerce is handed off
- Other: breadcrumb bar on subpages (home icon + lime chevron), a "Heb je vragen of wil je iemand spreken?" prompt with three overlapping circular staff avatars pinned to the right of that bar, opening-hours pill in the topbar, counter stats, FAQ pages

## Osmo-like elements
- Floating white nav card overlapping the hero photo -> navigation menu
- Fixed bottom-centre pill shortcut bar -> navigation / sticky UI
- Audience-grouped mega menu ("Onze extra's" -> Kwekers / Bloemisten / Tuincentra / …) -> menu
- Full-screen `mobile-nav` overlay, 500ms -> menu
- Lenis smooth scrolling -> scroll animation / smooth scroll
- `animate-fade-in-up` + `data-animation-delay` staggered reveals -> scroll animation (reveal)
- Livewire search overlay with popular-query suggestions -> form / overlay
- Overlapping circular avatar stack ("Heb je vragen…") -> hover / component
- `cta-slider` swiper -> slider

## Other pages worth noting
- `/bloemen-en-planten-inkopen-bij-plantion/` - the service-page template: full-bleed photo banner with a single centred white word ("Inkopen") at ~72px, then a cream breadcrumb bar (home icon + lime chevron + page name) with the staff-avatar contact prompt right-aligned, then a lime eyebrow with flower glyph + a large dark-green h1. Body sections are narrower and text-led; no hero CTAs
- `/onze-extras/<audience>/<topic>/` - a deep third-level content tree (kwekers, bloemisten, tuincentra, supermarkt en groothandel, consumenten) — roughly 30 leaf pages hanging off one mega-menu
- `/tarieven-aanvoerders/`, `/tarieven-inkopers/` - tariff pages, the closest thing to pricing tables
- `/openingstijden/`, `/agenda/`, `/nieuws/`, `/faq/`, `/medewerkers/` - operational pages (hours, calendar, staff directory) that are given top-level utility placement, which is unusual and very B2B
- `shop.plantion.nl`, `mijnplantion.plantion.nl` - separate applications, outside this fingerprint
