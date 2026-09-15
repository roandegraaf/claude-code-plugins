# TrapXpress Traprenovatie

## Identity
- URL: https://www.trapxpress.nl
- Sector: traprenovatie (stair renovation, consumer home improvement)
- Brand feel: warm interior-magazine photography with one loud magenta accent — reassuring and craft-led ("persoonlijk gerenoveerd", 12 jaar garantie), sells trust and taste rather than price
- Language: nl
- Measured at: 1440x900

## Navigation
- Structure: three stacked bars. (1) A 28px dark utility strip on `#2f1121` with three USPs ("12 jaar garantie", "Vrijblijvend advies aan huis", "Heel Nederland, geen voorrijkosten") and a right-aligned 4.4-star rating "Op basis van 232 reviews". (2) A 100px white bar: left a live showroom-status line with a green dot ("Onze showroom is geopend van 09:00 - 17:00" + hours dropdown), centre the TrapXpress wordmark with a magenta X, right the magenta CTA. (3) A centred link row with dropdown carets: "Inspiratie", "Traprenovatie", "Samen ontwerpen", "Advies aan huis", "Over ons", "Contact". Inspiratie and Traprenovatie open sub-menus listing the five style pages, the three stair types and the project filters (18 links reachable from the header).
- Behaviour: the dark USP strip scrolls away and the white bar sticks (observed — the strip is present in the hero screenshot and absent in the mid and footer screenshots). Header is `sticky top-0 bg-white z-40 border-b border-transparent transition-colors duration-200`, so the bottom hairline fades in on scroll (inferred from the transparent-border + transition-colors pairing).
- CTA in nav: "Doe de prijscheck →" — magenta `#e33289`, white text, 3.5px radius, boxed trailing arrow in a darker magenta square
- Mobile pattern: drawer/dropdown behind a dim backdrop — `div.fixed inset-0 bg-black/25 opacity-0 invisible pointer-events-none z-30` sits ready in the DOM (inferred: the backdrop exists but no mobile viewport was measured)

## Hero
- Type: full-bleed photo with a tabbed stair-type switcher — three `h1` elements live in the DOM ("Jouw open trap / dichte trap / spiltrap, persoonlijk gerenoveerd"), one active at a time, 588px tall (`aspect-[16/14] md:h-[80vh]`)
- Media: warm lifestyle interior photograph (woman and dog sitting on a renovated stair, low golden light), darkened with a left-weighted scrim so the white type holds
- Headline style: Stack Sans Text **52.5px at weight 300**, line-height 65.6px, white, wraps to 3 lines. A light-weight display face is the single most distinctive typographic choice here — headings are lighter than the UI text around them.
- Subline + CTA count: eyebrow "Van versleten naar eyecatcher" in translucent white above the h1; 1 CTA, "Open trap renoveren →" in magenta (label swaps with the active tab)
- Extras: bottom-aligned type switcher "Open trap | Dichte trap | Spiltrap", each with a small stair glyph and a full-width underline marking the active one; floating cluster bottom-right with a green WhatsApp pill ("Stuur een foto van je trap"), a dark pill ("Wij kijken vrijblijvend met je mee") and an adviser avatar with an online dot

## Section order (homepage)
1. Tabbed photo hero - three stair types, one CTA, bottom switcher
2. USP strip - white, 153px, three icon + title + one-line rows on light tiles (Persoonlijk advies aan huis / Vakmanschap tot in detail / Begeleiding van A tot Z)
3. Type chooser - white, 729px, "Welk type trap past bij jouw huis?" with three tall photo cards, title overlaid on the image
4. Split story - white, 720px, "Traprenovatie met de aandacht die jouw huis verdient", image one side / copy the other (a dark-background variant of the same block exists for narrow viewports)
5. Style picker - `#f2f2f2`, 389px, "Kies jouw stijl" as five 14px-radius white chips with material thumbnails (Betonlook, Houtlook, Leatherlook, Staallook, Steenlook)
6. Project slider - white, 693px, "Trappen die ons trots maken"; wide photo cards with an inset rounded thumbnail, project title, place, stair type and a customer quote, dot pagination underneath
7. Process accordion - white, 742px, "In 5 treden naar een nieuwe trap"; collapsible steps on a grey panel left, photo right
8. Reviews - white, 510px, "Zij gingen je voor met een unieke trap", 4.4 / 5.0 with named reviewers and relative dates
9. Price teaser - white, 672px, "Wat kost jouw traprenovatie?" with "Bereken je indicatie"
10. Content teasers - white, 530px, "Inspiratie & tips voor jouw trap", two category cards (Looks & trends, Praktische tips) with article counts
11. Adviser CTA band - `#2f1121`, 287px, "Heb je vragen of wil je persoonlijk geholpen worden?" with six overlapping circular adviser portraits and a magenta "Persoonlijk advies →"
12. Google review strip - white, logo + stars + "Wij scoren gemiddeld een 4.4 bij onze klanten op basis van 232 Google reviews"
13. Footer - white, 4 columns

## Typography
- Heading family: Stack Sans Text — a single self-hosted variable face (one `@font-face`, weight range 200–700) used for absolutely everything
- Body family: Stack Sans Text (identical; `sans-serif` only shows up inside the Cookiebot dialog)
- Scale feel: h1 52.5px, h2 31.5px, h3 28px (cards) / 15.75px (footer), body 12.25px, UI labels 14px. **The root font-size is 14px, not 16px** — every value is 0.875× what the rem authoring implies (52.5px = 3.75rem, 12.25px = 0.875rem, 3.5px radius = 0.25rem). Read the px numbers as measured at 1440, but note the shrunk root when comparing this site to the others: body copy really is a small 12.25px on screen.
- Weight contrast: inverted from the norm — display headings are **300**, section headings 300, card titles 500, body 300, UI labels 500/600. Nothing above 700 anywhere.
- Case & detail: sentence case throughout, `letter-spacing: normal` on headings, no uppercase eyebrows at all (the hero eyebrow is sentence-case translucent white). Emphasis is done by weight inside a heading instead — "In **5 treden** naar een nieuwe trap" bolds the number mid-sentence.

## Palette
Site exposes **no theme CSS variables** — everything in the dump is WordPress Gutenberg boilerplate (`--wp--preset--*`, `--wp-admin-*`). Palette therefore read from the primary button plus section fills, per the decision rule.
- Brand: `#2f1121` deep aubergine - USP strip, adviser CTA band, and the colour of essentially all body copy
- Accent: `#e33289` magenta - every primary CTA, the logo's X, active tab labels, list arrows, the selected-state radio in the price checker. `#a02063` is the darker companion (hover / arrow box), not a second brand colour.
- Neutrals: `#2f1121` text, `#2f1121@0.60` and `#2f1120@0.40` muted, `#f2f2f2` tinted sections and card fills, `#ffffff` base, borders `#2f1121` (1px outlines) and `#000000@0.05` / `#000000@0.10` hairlines. `#2ac870` green is functional only — the "Geopend" status dot and the WhatsApp pill.
- Background rhythm: dark strip → white header → photo hero → white → white → white → `#f2f2f2` → white ×5 → dark `#2f1121` band → white footer. Overwhelmingly white, with exactly one tinted section mid-page and one dark band immediately before the footer.
- Accent use: strictly on CTAs, active states and arrows. The magenta never becomes a field; the colour a visitor actually sees is photography.

## Spacing & grid
- Container: 1064px content inside a 1120px wrapper, centred
- Section padding: 56px top and bottom as the standard beat (`pt-12 lg:pt-16 2xl:pt-20` at the 14px root), 21px on the compact USP strip, 70px / 84px / 168px on the outliers. Tight compared to a 16px-root site — 56px reads like 64px would elsewhere.
- Columns: 3-col 340.7px gap 21px (type cards), 5-col 196px gap 21px (style chips), 4-col 250.25px gap 21px, 12-col 63px gap 28px base grid
- Radius & borders: 7px standard, 3.5px on buttons, 10.5px on larger panels, 14px on the style chips, fully round on avatars and the floating widgets. **Essentially shadowless** — the only real box-shadow in the document belongs to the third-party chat widget; separation comes from `#f2f2f2` fills and `#000000@0.05` hairlines.

## Motion
- Scroll reveals: staggered per group — observed indirectly but unambiguously: before scrolling reached them, sections 3–6 and 8–11 returned empty `innerText` while their DOM was fully populated, i.e. content held hidden until its trigger fired (`data-reveal-group` ×15, GSAP loaded on `window`)
- Hover: colour and arrow transitions on buttons, cards and list rows (inferred: `cursor-pointer` ×30 plus Tailwind `transition-colors duration-200` utilities; no hover was triggered directly)
- Marquee / ticker: none
- Page transitions: none (no Barba / Swup / view-transition script)
- Cursor: none
- Other, all observed: the dark USP strip hides on scroll while the white header sticks; the hero is a tabbed switcher with an animated underline on the active stair type; the project row is a slider with dot pagination; "In 5 treden" is an accordion with `+` toggles.

## Footer
- Columns: 4 — (1) a rounded showroom photo card with "Bezoek onze showroom in Zwolle" and a circular magenta arrow, (2) "Openingstijden" as a day/hours table with a green "Geopend" pill and today's row highlighted on `#f2f2f2`, (3) "Traprenovatie" link list with stair glyphs and magenta arrows (Open trap / Dichte trap / Spiltrap), (4) "Contact" with the full NAW block, phone, email and two trust badges ("Zeker van je aankoop", "CBW-erkend")
- CTA block: yes — the `#2f1121` adviser band with the six overlapping portraits sits directly above the Google review strip and the footer
- Legal row: left "© 2026 - TrapXpress Traprenovatie | Privacybeleid | Regio's | Cookies", right "Realisatie door **Zeker Zichtbaar**"

## Recurring components
- Cards: 7px–14px radius, photo-led, title overlaid on the image for type/project cards and set below it for article cards; project cards carry an inset rounded thumbnail of the material in the corner
- Testimonials: real ones — a Google-branded 4.4 / 5.0 over 232 reviews, named reviewers with relative dates, plus short customer quotes inside the project slider cards
- Logo bar: none (trust is carried by badges and the review score instead)
- Forms: none on the homepage; the whole form surface lives on `/prijzen/` (24 controls) and `/contact/`
- Pricing / packages: no price table — a 3-step price *calculator* on `/prijzen/`, teased from the homepage
- Other: icon + title + one-line USP rows, round style chips, accordion, overlapping circular adviser avatars, trust badges, live showroom-open status with a green dot, a persistent WhatsApp / adviser widget cluster bottom-right

## Osmo-like elements
- Tabbed hero with animated active underline -> slider
- Project card slider with dot pagination -> slider
- "In 5 treden" step accordion -> accordion
- Group scroll reveals (GSAP) -> scroll animation
- Dropdown nav with style/type sub-menus -> menu
- Hide-on-scroll USP strip over a sticky header -> sticky nav
- Round style chips with material thumbnails -> hover
- Overlapping circular avatar row -> hover

## Other pages worth noting
- `/prijzen/` - the structural outlier of the site and the one page with no hero photo. A 3-step price calculator sits in a single large white card floating on `#f2f2f2`: a numbered stepper ("1 Je trap — 2 Wensen — 3 Je prijs"), image-radio cards for stair type with a magenta "Gekozen" badge, a range slider with a magenta "13 treden" tooltip, material choice and a details form — 24 form controls in total. Below the tool the page drops into a long alternating white / `#f2f2f2` SEO stack of prose sections and a FAQ. Breadcrumb above the fold.
- `/inspiratie/project/leatherlook-traprenovatie-in-den-bosch/` - case detail template: a full-bleed project photo occupies the top ~630px with the breadcrumb and a small white type pill ("Dichte trap") over it and a 52.5px white h1, no eyebrow and no CTA. Straight underneath, a three-item spec checklist row ("Kras- en slijtvast HPL · Geïntegreerde verlichting · Anti-slip") separated by hairlines, then a two-column photo grid of the project.
