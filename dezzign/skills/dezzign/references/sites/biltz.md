# Biltz

## Identity
- URL: https://biltz.zekerzichtbaar.nl
- Sector: property maintenance and renovation
- Brand feel: the same black-and-orange system as its parent, but run daylight-first — warm cream and white carry most of the page, so it reads as workmanlike and resident-facing rather than monumental
- Language: nl (one English signature line, "Building a legacy", set in italic)
- Measured at: 1440x900

## Navigation
- Structure: a thin white utility bar above everything holding "INLOGGEN VOOR BEWONERS" with a padlock icon, hard right. Below it the header: logo left, 5 centred links ("Over Biltz" with chevron, "Expertises" with chevron, "Projecten", "Nieuws", "Werken bij ↗" external), right a white square search button plus the orange CTA. The Expertises dropdown lists 7 title+description pairs (Gevelonderhoud, Planmatig onderhoud, Verduurzaming, Bouwkundige brandpreventie, Renovatie, Resultaatgericht samenwerken (RGS), Planontwikkeling) plus "Bekijk alle expertises".
- Behaviour: `position: sticky`, 91px (`--header-height: 90px`), transparent over the hero with `transition-colors duration-300`, content pulled under it via `-mb-[var(--header-height)]`. Active nav item gets an orange underline (seen on /expertises/gevelonderhoud).
- CTA in nav: "NEEM CONTACT OP" — solid `#ef7900`, square, uppercase DIN 700, with a black square arrow chip on its left edge
- Mobile pattern: full-screen menu overlay (inferred: an `<h2>Menu</h2>` in DIN 16px sits in the markup and the nav parents carry chevron toggles; not opened at 1440)

## Hero
- Type: split — headline left, body copy right — over a cream plate, with a full-bleed photo filling the lower two thirds of the same section (1156px tall)
- Media: a single wide documentary photograph of a Biltz worker, no overlay, no duotone; the crop bleeds off both edges and the cream `#f1e8e0` above it acts as the type plate
- Headline style: Formula Condensed 700, 72px with 72px line-height, uppercase, `#0a0a0a`, 2 lines, left-aligned — a quarter the size of the parent site's hero at the same viewport
- Subline + CTA count: a 3-line Roboto Condensed paragraph in the right column ("Van planmatig onderhoud tot volledige renovatie…"). 0 CTAs — the hero section contains no links at all
- Extras: pale cream grid tiles in the top-right corner, faint vertical hairline columns, no scroll cue, no stats bar

## Section order (homepage)
1. Split hero - 72px headline left, paragraph right, full-bleed photo below, cream `#f1e8e0`
2. Expertise grid - "Gevelonderhoud / Planmatig onderhoud / Verduurzaming", 14 images, 8 links, WHITE, 112px padding
3. Project showcase - "Projecten in de spotlight", 2299px, 8 images, 14 svgs, BLACK
4. Full-bleed photo statement - "Samen bouwen aan duurzame impact", min-height 80vh, content bottom-aligned, white type, orange "MEER OVER DUURZAAMHEID" CTA
5. Story block - "Wij kennen de omgeving. Wij kennen de bewoner.", BLACK, script eyebrow, inline photo tile inside the headline
6. News grid - "Het laatste nieuws", 16 images, 9 links, WHITE
7. Full-bleed video statement - "Part of United Legendz", min-height 80vh, 1 looping video
8. Partner logo grid - "Trotse samenwerkingen", 28 logos, WHITE
9. Contact CTA band - "Ook samenwerken aan de toekomst? Laat het ons weten.", WHITE
10. Recruitment block - "Anders dan anders.", 16 images, BLACK
11. Image wall - 144 images running as marquee rows, WHITE
12. Footer - `#000000`, 466px, 4 columns + legal row + colour bar

## Typography
- Heading family: Formula Condensed, 31 of 33 headings; DIN for the 2 utility ones. GeistSans/GeistMono load as Next.js defaults and go unused.
- Body family: Roboto Condensed 400 (345 elements), DIN 500/700 for eyebrows, labels and buttons, Summer Loving (brush script) on 2 section eyebrows
- Scale feel: h1 72px / lh 72px, section h2 72px and 60px (both lh 1.0), card h3 32px / lh 33.6px, statement paragraph 40px, body 16-18px. Roughly 4x body at the top — a far flatter scale than United Legendz despite the identical stylesheet.
- Weight contrast: 700 on h1/h2, but card titles (h3) drop to **400** Formula Condensed with 0.8px tracking — a second, lighter display voice the parent site does not use. Body 400.
- Case & detail: uppercase on all Formula headings and buttons; DIN 700 24px uppercase eyebrows; 0.8-1px letter-spacing on the smaller display sizes; the Summer Loving script eyebrow ("Bewoners voorop") is the one lowercase, hand-drawn accent, used white on black

## Palette
Read from the resolved theme variables. The same unused shadcn default block (`--primary:#171717`, `--accent:#f5f5f5`, `--chart-1..5`, `--radius:.625rem`) is present and byte-identical to the other ZekerZichtbaar sites — it is not the brand layer.
- Brand: `#ffffff` as the dominant ground (381 elements), `#000000` for the plated sections, `#f1e8e0` (`--brand-light`) as the warm cream used for the hero and for secondary bands
- Accent: `#ef7900` (`--orange`) on 19 elements — nav CTA, "MEER OVER DUURZAAMHEID", every button fill; `--green: #92b50c` is defined and belongs to the label colour set rather than the page chrome
- Neutrals: text `#000000` and `#0a0a0a` on light, `#ffffff` on dark, muted `#ffffff@0.70` and `#ffffff@0.50`, borders `#ffffff@0.15`, `#000000@0.10`, `#e5e5e5`, scrim `#000000@0.20`
- Background rhythm: cream, WHITE, black, photo, black, WHITE, video, WHITE, WHITE, black, WHITE, black footer — an alternating light-dominant page. This is the exact inversion of United Legendz, which is black-dominant with two white breathers.
- Accent use: sparing, CTA-only. Orange never fills a section; the large colour fields are cream, white and black, and the photography carries the warmth

## Spacing & grid
- Container: 1440px (`--size-container-ideal: 1440`, clamped `992px…1920px`)
- Section padding: 112px top/bottom as the emphasis step (`pt-16 md:pt-28`), 64px and 56px as the smaller steps. Same Tailwind classes as United Legendz, but a different root font scale resolves them to 112/64 here versus 134.4/76.8 there — record both, do not reconcile.
- Columns: 3-up card rows for expertises and news; a 6-column hairline rule runs behind the page; the closing image wall is a multi-row marquee
- Radius & borders: 0px everywhere — the border-radius tally is empty. 1px hairlines at `#ffffff@0.15` / `#000000@0.10`. No drop shadows; the 336-element entry is a 0.75px white ring.

## Motion
- Scroll reveals: clip/mask reveals in stagger groups, including nested groups (inferred: `data-reveal` ×11, `data-reveal-group` ×15, `data-reveal-group-nested` ×4)
- Hover: buttons fill from an orange layer pre-rendered behind them at the exact button size (inferred: `index-module__NsCNMG__bg bg-orange` at 168x44, 276x44, 472x44, plus 36x36 `iconHover` squares behind the arrow chips)
- Marquee / ticker: yes — the closing 144-image wall scrolls as marquee rows (inferred: `data-marquee-direction`), and the footer carries the same marquee module as the parent site
- Page transitions: yes, panel-based (inferred: `index-module__MgYB8a__transition` and `__panels`, two 900px full-viewport overlays)
- Cursor: a custom cursor is wired up (inferred: `data-cursor` ×2) but, unlike United Legendz, there is no `data-cursor-marquee-text` anywhere — the brand-name cursor marquee is not used here

## Footer
- Columns: 4 — "STAY TUNED!" with copy and four colour-coded social squares (white Instagram, orange Facebook, lime LinkedIn, magenta YouTube), then OVER BILTZ, ONS WERK, OVERIG, with a "PART OF UNITED LEGENDZ" lockup set hard right
- CTA block: yes — "Ook samenwerken aan de toekomst? Laat het ons weten." (511px, white) is the pre-footer band, with the recruitment block and image wall after it
- Legal row: Cookies · Disclaimer · Privacybeleid · © 2026 United Legendz left, "Realisatie door Zeker Zichtbaar" hard right, closed by a full-bleed four-colour bar (white / orange / lime / magenta)

## Recurring components
- Cards: zero-radius image cards, photo on top filling the tile, uppercase 32px Formula Condensed 400 title beneath; project cards run full-bleed with the title overlaid
- Testimonials: none
- Logo bar: yes, static grid — "Trotse samenwerkingen", 28 partner logos on white
- Forms: none on the homepage. /contact carries name / email / phone (type=number) / company / message — transparent, zero radius, underline-only borders
- Pricing / packages: none
- Other: FAQ accordions on the expertise and contact pages, full-bleed photo and video statement bands pinned to `min-h-[80vh]` with bottom-aligned copy, inline photo tiles used as glyphs inside headlines, a hand-script eyebrow above black sections, and a 144-image marquee wall as the closing flourish

## Osmo-like elements
- Marquee image wall (`data-marquee-direction`) and footer logo marquee -> marquee
- `data-reveal` / `-group` / `-group-nested` clip reveals -> scroll animation
- Panel-based route transition (`__transition` + `__panels`) -> page transition
- Button hover fill layer + arrow-chip hover square -> hover
- Custom cursor (`data-cursor`) -> cursor
- Swiper rows for the expertise and project carousels -> slider
- Filling grid-tile field in the hero corner (`data-animated-grid-col` ×12) -> scroll animation / visual effect
- Dropdown menu with title+description pairs, plus the resident-login utility bar -> menu
- FAQ accordion -> accordion

## Other pages worth noting
- /expertises/gevelonderhoud - swaps the split hero for a full-bleed photo with a dark scrim and a *centred* eyebrow ("GEVELONDERHOUD IN DE PRAKTIJK") over a centred 72px headline, with the intro paragraph left-aligned underneath. Then a cream process section, a white "duidelijk voor bewoners" block, a 1739px black "Uitgelicht werk" showcase, a white FAQ accordion and a black closing CTA. 7237px total — service pages are as long as the homepage.
- /contact - the shortest page on the site at 2877px and the only one with no hero image: a cream "Contact met Biltz" block with the form, a cream "Facturatie" block, and a white FAQ. Fields are transparent with underline-only borders and zero radius, matching the parent site's form styling exactly.
