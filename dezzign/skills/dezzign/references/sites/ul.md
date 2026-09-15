# United Legendz

## Identity
- URL: https://ul.zekerzichtbaar.nl
- Sector: construction group holding (five labels)
- Brand feel: loud and confident, a black stage with billboard type; scale and legacy over friendliness
- Language: nl (Dutch UI, English slogans: "Building a Legacy", "Meet the labels", "STAY TUNED!")
- Measured at: 1440x900

## Navigation
- Structure: logo left, 5 centred links ("Over ons" with chevron dropdown, "Onze bedrijven", "Nieuws", "Onze mensen", "Werken bij ↗" external), right cluster of a white square search button plus an orange CTA. The "Over ons" dropdown holds 7 title+description pairs (Ons verhaal / Wat we doen / Visie & missie / Historie / Onze vestigingen / Documentatie / OMDUS).
- Behaviour: `position: sticky`, 91px tall (`--header-height: 90px`), fully transparent over the hero, `transition-colors duration-300`; the page is pulled up under it with `-mb-[var(--header-height)]`. Active page gets a short orange underline under its nav item (seen on /onze-bedrijven and /contact).
- CTA in nav: "NEEM CONTACT OP" — solid `#ef7900` block, square corners, uppercase DIN 700, with a separate black square holding a white arrow glyph on its left edge.
- Mobile pattern: full-screen menu overlay (inferred: an `<h2>Menu</h2>` in DIN 19.2px exists in the markup and the nav parents carry chevron toggles; not opened at 1440)

## Hero
- Type: full-bleed video, taller than the viewport (section is 1763px on a `#0a0a0a` ground)
- Media: autoplaying looped muted 1440x900 mp4 behind the type, no visible overlay tint; the page ground itself is near-black so the video reads as a dark plate
- Headline style: Formula Condensed 700, 188px with 188px line-height (ratio 1.0), uppercase, `#fafafa`, 2 lines — and a small square photo tile is set inline *inside* the headline, between "BUILDING" and "A", as if it were a glyph
- Subline + CTA count: no subline; an uppercase eyebrow "VIJF LABELS. HONDERDEN LEGENDZ" (DIN 700, 24px, wide tracking) sits above. 2 CTAs: primary orange "ONZE FILOSOFIE", secondary white-on-black "ONZE BEDRIJVEN", both square, both with the black arrow chip on the left
- Extras: 5 full-height vertical hairlines at `#ffffff@0.12` ruling the page into columns, plus a grid of slightly-lighter black tiles that fill and clear in the top corners

## Section order (homepage)
1. Video hero - 188px headline, eyebrow, 2 CTAs, on `#0a0a0a`
2. Statement band - "Gevestigd in Amsterdam", h2 at 122px, black
3. Media band - 2 images, black, no heading
4. Services grid - "Wat we doen", 28 images, 5 links, black, swiper-driven
5. Values block - "Waar wij elke dag aan bouwen", black
6. Sustainability block - "Duurzaamheid", 6 images + 1 inline video, black, 134px bottom padding
7. News grid - "Wat er speelt bij United Legendz en onze labels", 16 images, 9 links, WHITE
8. People block - "Mensen maken hier het verschil", 7 images, 13 svgs, black, 134px top and bottom
9. Untitled image band - 2 images, black
10. Label grid - "De vijf labels", 60 images, 15 links, black
11. Client logo grid - "Zij vertrouwen op ons", 28 logos, WHITE
12. Recruitment CTA - "Word ook…", 16 images, black
13. Footer - `#0f0f0f`, label logo row + 4 columns + legal row + colour bar

## Typography
- Heading family: Formula Condensed (700), 26 of 28 headings; DIN 500/700 for the two utility headings. GeistSans/GeistMono are loaded as Next.js defaults but never used.
- Body family: Roboto Condensed 400 (413 elements), with DIN 500/700 for labels, eyebrows and buttons, and Summer Loving (a brush script) on 2 elements
- Scale feel: h1 188px, h2 122px / 114px, h3 82px, section intro 48px, body 18-19.2px. A brutal jump — display type is roughly 10x body, with line-height locked at 1.0 so the lines stack tight.
- Weight contrast: 700 on all display type vs 400 on body; DIN 700 for the uppercase labels. No light weights anywhere.
- Case & detail: uppercase on every display heading and every button; eyebrows are DIN 700 24px uppercase with wide tracking; the 48px Formula lines carry 1.2px letter-spacing, the huge ones sit at normal

## Palette
Read from the resolved theme variables. The file also carries a full shadcn default block (`--primary:#171717`, `--accent:#f5f5f5`, `--chart-1..5`, `--sidebar-*`, `--radius:.625rem`) that is byte-identical across every ZekerZichtbaar Next.js site and is not used in the rendered design — ignore it.
- Brand: `#0a0a0a` near-black page ground (`--foreground`), with `#000000` for the section plates and `#ffffff` / `#fafafa` for type
- Accent: `#ef7900` (`--orange`) — nav CTA, primary hero CTA, "ALLE NIEUWS" button, the active-nav underline, and a `bg-orange` fill layer sized to each button (277x53, 168x44) that sits behind it as a hover state
- Neutrals: text `#ffffff` / `#fafafa`, muted `#ffffff@0.70` and `#ffffff@0.50`, hairlines `#ffffff@0.12` and `#ffffff@0.10`, dark card `#262626`, footer `#0f0f0f`. `--brand-light: #f1e8e0` exists and is used on subpages, not on the homepage.
- Background rhythm: black, black, black, black, black, black, WHITE (news), black, black, black, WHITE (logos), black, black footer — a black page with exactly two white breathers
- Accent use: sparing and structural. Orange only ever fills a CTA, an active-state underline, or a hover layer; it is never a large colour field. The five-label identity colours (white, orange, lime, magenta) appear only in the logo dot, the four social squares and a full-width bar at the very bottom of the footer — lime and magenta were not measured as computed values

## Spacing & grid
- Container: 1440px (`--size-container-ideal: 1440`, clamped `992px…1920px`); an inner 922px measure for running text
- Section padding: 76.8px top/bottom as the default step (`pt-10 md:pt-16`), 134.4px for the emphasis sections (`pt-16 md:pt-28`), 38.4px as a half step
- Columns: the page is ruled into 6 columns by 5 full-height hairlines; card rows (services, labels) are swiper tracks rather than static grids
- Radius & borders: 0px everywhere — the border-radius tally came back completely empty. Borders are 1px hairlines at `#ffffff@0.10` / `#000000@0.10`. No drop shadows; the 392-element "shadow" in the dump is a 0.75px Tailwind ring, i.e. another hairline.

## Motion
- Scroll reveals: clip/mask reveals, not fades — directly observed, the mid-page and /contact screenshots each caught images and grid tiles frozen part-way through their mask. Staggered in groups (inferred: `data-reveal` ×6 and `data-reveal-group` ×16).
- Hover: buttons fill from an orange layer already present in the DOM behind them (inferred: `index-module__NsCNMG__bg bg-orange` elements sized exactly to each button, plus a matching 43x43 `iconHover` square behind each arrow chip)
- Marquee / ticker: yes — the footer runs a marquee with a named animation, `motion-safe:[animation:footer-marquee_30s_linear_infinite]`, so 30s linear and disabled under reduced-motion. The label logo row is its track.
- Page transitions: yes, panel-based (inferred: `index-module__MgYB8a__transition` and `__panels`, two 900px full-viewport overlay elements)
- Cursor: custom cursor carrying a marquee of the brand name (inferred: `data-cursor` ×3, `data-cursor-marquee-text` ×15, and a `.cursor-marquee__card` holding `.cursor-marquee__text-span` plus an `.is--duplicate` twin — the standard duplicate-span loop)

## Footer
- Columns: a full-width row of the five label logos (Biltz, Fixzed, IJbouw, Mouton, TBK) above 4 columns — "STAY TUNED!" with a line of copy and four colour-coded social squares (white Instagram, orange Facebook, lime LinkedIn, magenta YouTube), then OVER ONS, ONZE BEDRIJVEN, OVERIG
- CTA block: yes — the recruitment section "Word ook…" (1143px, black, 16 images) acts as the pre-footer band
- Legal row: Cookies · Disclaimer · Privacybeleid · © 2026 United Legendz on the left, "Realisatie door Zeker Zichtbaar" hard right, with a four-colour full-bleed bar (white / orange / lime / magenta) closing the page

## Recurring components
- Cards: hard-edged image cards, zero radius, photo filling the tile with an uppercase Formula label either overlaid on it or sitting directly beneath at 82px
- Testimonials: none observed. A "Legendz aan het woord … SHUFFLE" block exists in the page text and appears to be a shuffling quote module, but it never rendered into any of the three viewport captures (inferred, unverified)
- Logo bar: yes, static grid — "Zij vertrouwen op ons", 28 client logos on a white section; separately, the five label logos run as a marquee in the footer
- Forms: none on the homepage. /contact carries name / email / phone / company / question — transparent background, zero radius, underline-only borders, no placeholder text
- Pricing / packages: none
- Other: statement bands with a single oversized h2, a news grid, inline photo tiles used as glyphs inside headlines, and swiper carousels for the services and label rows

## Osmo-like elements
- Brand-name cursor marquee (`.cursor-marquee__text-span.is--duplicate`) -> cursor
- Footer logo marquee, 30s linear -> marquee
- `data-reveal` / `data-reveal-group` clip reveals -> scroll animation
- Panel-based route transition (`__transition` + `__panels`) -> page transition
- Filling grid-tile field in the hero corners (`data-animated-grid-col` ×12) -> scroll animation / visual effect
- Button hover fill layer + arrow-chip hover square -> hover
- Swiper rows for services and labels -> slider
- Dropdown menu with title+description pairs -> menu

## Other pages worth noting
- /onze-bedrijven - drops the video hero for a full-bleed photo with a dark scrim and a *centred* eyebrow + centred 114px headline. Below it the page runs black end to end (a 2651px label section, a 2291px "Uitgelichte projecten" section) with no white breather at all — the opposite rhythm to the homepage.
- /contact - same centred photo hero, then a black form section ("Stuur ons een bericht"), two `#f1e8e0` cream bands ("Zo vind je ons", "Facturatiegegevens"), a black "Direct contact met onze bedrijven" block and a white FAQ accordion. This is the only place the cream `--brand-light` becomes a section background, and the only place forms appear.
