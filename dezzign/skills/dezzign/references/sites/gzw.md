# Gezond Zwanger Worden

## Identity
- URL: https://gzw.s1.coolify.zekerzichtbaar.nl (Coolify staging host; verified as the real site, not a placeholder — see Measured at)
- Sector: public-health campaign, preconception care (an initiative of GGD GHOR Nederland)
- Brand feel: campaign-poster energy applied to a health subject — tilted stickers, notched colour blocks and a serif headline voice that talks to the visitor rather than about the topic ("later = van mij.")
- Language: nl
- Measured at: 1440x900. Plausibility gate passed: real title "Home | Gezond Zwanger Worden", real h1, full campaign navigation and a 13,463px document — no basic-auth prompt, no 502, no Coolify placeholder.

## Navigation
- Structure: three layers. (1) A mint→white gradient `brand-strip` 56px tall (`--strook-h: 3.5rem`) with the logo left, a black "ZORGPROFESSIONALS" pill plus "Werk je als zorgverlener? Meer informatie" centre, and "Een initiatief van GGD GHOR Nederland" right. (2) A floating 144px header carrying, left, three white pill buttons — "Jouw situatie ＋", "Gezond leven" and an overflow "…" — and, right, a lime circular arrow button paired with a lime "Hulp & advies" pill. (3) A rotated mint "later = van mij." campaign sticker parked in the centre of the header. A skip link "Naar de inhoud" (`#05679c`, radius `0 0 12px 12px`) drops from the top edge on focus.
- Behaviour: `site-header sticky top-[calc(-1*var(--strook-h))] z-50 -mb-[var(--header-h)]` — transparent, negatively margined so it floats over the hero photo, and it scrolls up by exactly the height of the brand strip before sticking. Observed: on the homepage the centre sticker only appears once the strip has scrolled away; on inner pages both the strip and the sticker are visible at rest.
- CTA in nav: "Hulp & advies" — `#ecfc75` lime, black text, 8px radius, with a separate lime circular arrow button sitting to its left as a paired element
- Mobile pattern: a "Menu openen" button on lime `#ecfc75` at 8px radius (inferred: the button exists in the DOM; no mobile viewport was measured)

## Hero
- Type: full-bleed photo band, 871px tall, on a black section with 176px of bottom padding so the next section overlaps up into it
- Media: warm documentary-style photograph of two young people, darkened by a `media-scrim`. Footer note on the site declares "Deze site bevat AI-gegenereerd beeldmateriaal".
- Headline style: Yrsa 70.2px / weight 500, letter-spacing -1.404px (-2%), line-height 77.22px, white, centred, forced to 2 lines — "Gezond zwanger worden begint niet bij zwangerschap. / Het begint bij vandaag." A serif display voice against sans UI is the signature move.
- Subline + CTA count: 0 CTAs in the hero. Instead a centred question, "Waar sta jij op dit moment?", underscored with a hand-drawn white brush stroke; the actual choice is made in the three blocks that overlap up into the photo.
- Extras: a rotated mint campaign sticker "later = van mij." sits over the image above the headline; the three-way chooser overlaps the bottom edge

## Section order (homepage)
1. Photo hero - black, 871px, sticker + centred serif headline + the orienting question
2. Three-way situation chooser - `section--overlap-lg`, overlaps up into the hero; three tall angled/notched colour blocks in `#a788f0` purple, `#fbccff` pink and `#c9f0ff` babyblue, each with an icon, an uppercase eyebrow (LATER / NU NOG NIET / ACTIEVE KINDERWENS) and a 48px h2
3. Rotated card stack - `#f4f4f4`, 2669px, "Gezondheid als vertrekpunt, niet zwangerschap." with numbered photo cards rotated ±5° (`stack__card media-scrim`): 1. Later is van mij, 2. De brug, 3. Hier vind je het
4. Full-bleed photo band - 1000px with 155px padding, eyebrow LEEFSTIJL, "Kleine aanpassingen, geen grote omslag"
5. Trio link cards - white, 1330px: Partners & omgeving / Praat, vraag, deel / Preconceptie-consult
6. Laatste updates - white, 882px, three tilted photo cards, each with a white date chip and a coloured category chip (NIEUWSBRIEF, ACTUALITEIT), plus a black "Bekijk alles" pill with a circular arrow
7. Onze partners - `#f4f4f4`, 423px, six partner logos
8. Quote cards - white, 846px, "Praat, vraag, deel"; rotated cards in orange, lime and babypink carrying campaign conversation-openers under the label GESPREKSOPENERS
9. Single quote feature - white, 890px, one large quote with an image
10. Partner prompt - white, 880px, eyebrow DOE HET SAMEN, "Heb je een partner?"
11. Factor tiles - `#f4f4f4`, 1063px, "Factoren om gezond zwanger te worden" as a grid of illustrated tiles (Leefstijl, Medicatie & vaccinatie, Ziektes, Gevoelens & ervaringen, Werk & thuis, Familie & afkomst, Eerdere zwangerschap)
12. Bekijk ook eens - `#f4f4f4`, 374px, three plain arrow links
13. FAQ - `#c9f0ff` babyblue field, 1212px, accordion rows as white bars with large round white `+` toggles, closing on "Staat je vraag er niet bij? / Stel je vraag"
14. Footer - mint→white gradient brand strip

## Typography
- Heading family: Yrsa — a self-hosted variable serif (300–700, roman + italic) with a matching `Yrsa Fallback` face
- Body family: generalSans — self-hosted variable sans (200–700) with a `generalSans Fallback`
- Scale feel: h1 70.2px (90.72px on inner page heroes), h2 48px, h3 33.6px, Yrsa lead 24.48px, body 14px. Headings run at line-height 1.0–1.1 (48/48, 33.6/37); body sits at 20px on 14px. A deliberately large jump from a small 14px UI text to a 70px display.
- Weight contrast: Yrsa 700 on h2/h3 with a single step down to 500 on the largest hero h1 (ordinary optical compensation at 70px, not a light display system); generalSans 400 body, 500 on eyebrows and pill labels
- Case & detail: every Yrsa heading carries roughly -2% negative tracking (-1.404px at 70px, -0.96px at 48px, -0.673px at 33.6px); eyebrows are uppercase generalSans 14px/500 with +2% positive tracking (0.28px) — tightened serif against opened-out sans is the whole typographic system. Meta lines use the same uppercase sans ("4 JUNI 2026 · ± 1 MIN LEZEN").

## Palette
Site exposes a full set of **theme CSS variables**, so per the decision rule these are the palette — read directly, not tallied.
- Brand: `--gzw-blauw #05679c` (mapped to `--primary` and `--ring`; the footer icon buttons and the skip link), `--gzw-turquoise #76d2b5` (`--secondary`; the brand strip gradient), `--gzw-oranje #ea650d`, `--gzw-zwart #000`, `--gzw-wit #fff`, `--gzw-grijs #f4f4f4` (`--background`)
- Accent: `--campagne-energie #ecfc75` acid lime (mapped to `--accent`) — every CTA pill and arrow button. The rest of the campaign set is used as whole fields: `--campagne-babyblauw #c9f0ff`, `--campagne-babyroze #fbccff`, `--campagne-groei #a788f0`.
- Neutrals: text is pure `#000000` (117 elements — no softened grey anywhere), `--border` and `--input` are also `--gzw-zwart`, hairlines at `#000000@0.10`, surfaces `#ffffff` and `#f4f4f4`. `--destructive #c50514`.
- Background rhythm: black photo hero → white overlap → `#f4f4f4` → photo band → white ×5 → `#f4f4f4` ×2 → `#c9f0ff` → mint gradient footer. Roughly a third of the page is a non-white colour field.
- Accent use: large colour fields, not sparing highlights — the situation blocks, the quote cards and the whole FAQ band each take a campaign colour edge to edge. Lime is reserved for interaction (buttons, arrows) so it stays legible as "this is clickable".

## Spacing & grid
- Container: `--inhoud-max: 97.5rem` (1560px) declared; measured content width is 1376px inside the 1440px shell. Layout tokens are named in Dutch: `--balk-boven 2rem`, `--strook-h 3.5rem`, `--header-h calc(2rem + 3.5rem)`, `--onderbalk-h 4.5rem`, `--section-space 4rem`, `--overlap-sm 2rem`, `--overlap-lg 4rem`.
- Section padding: 96px top and bottom as the standard beat; full-bleed photo bands go to 155–176px; the hero's 176px bottom padding exists purely so the chooser can overlap into it
- Columns: 3-col 442.7px gap 24px and 3-col 458.7px for cards, 4-col 326px gap 24px for the factor tiles, and an asymmetric 405.9px / 795.3px split for the feature blocks
- Radius & borders: 999px pills dominate (45 elements), then 8px on cards and buttons, 4px on the small nav pills, and directional `8px 8px 0 0` / `0 0 8px 8px` on tabs and the skip link. Borders are hard 1px black or `oklab(0 0 0 / 0.1)`. **Zero box-shadows in the entire document** — depth is created by rotation, overlap, notched shapes and colour, never by elevation.

## Motion
- Scroll reveals: present, group-staggered (inferred: `data-reveal-group` ×7 plus one `data-gsap` attribute; no reveal was caught mid-flight in the screenshots)
- Hover: press/hover micro-interactions with an overshoot (inferred: the stylesheet declares named easing tokens `--spring: cubic-bezier(.59,1,.88,1.01)`, `--bounce: cubic-bezier(.34,2.27,.64,1)` and `--press: cubic-bezier(.4,0,.2,1)` — a bounce curve that overshoots past 1 only exists to be used on something)
- Marquee / ticker: none
- Page transitions: none observed
- Cursor: none
- Other, measured directly from computed transforms: the `stack__card` photo cards are rotated -5° / +5° / +5°, the `quote-card` set runs -6.8° (orange), +6.4° (lime), -4.8° and +2.4° (babypink), and the campaign stickers and category chips are rotated too. Smooth scrolling via Lenis (inferred: `lenis` on `window`, no direct observation of the easing feel). A custom track slider exists (`slider` / `slider__spoor`).

## Footer
- Columns: 2 wide — "Handige links" split over two link columns (Jouw situatie, Gezond leven, Samen voorbereiden, Laatste updates, Veelgestelde vragen, Privacyverklaring, Cookiebeleid) and "Contact" as four round `#05679c` icon buttons with labels (Mail ons, 0318 123 456, Instagram, LinkedIn). The whole band sits on a mint→white gradient with a large organic wave shape cut through it and the full logo lock-up bottom right.
- CTA block: yes, but folded into the FAQ band above the footer — "WIJ HELPEN JE GRAAG / Staat je vraag er niet bij? / Stel je vraag" on the `#c9f0ff` field
- Legal row: a hairline rule, then "later = van mij 2026" left and "Deze site bevat AI-gegenereerd beeldmateriaal" centre. **No agency credit** — unlike the other two sites in this batch there is no "Realisatie door Zeker Zichtbaar".

## Recurring components
- Cards: 8px radius, photo-led, and almost always rotated a few degrees; category and date chips are rotated rectangles that read as stuck-on tape rather than UI badges
- Testimonials: none. The rotated quote cards are campaign conversation-openers explicitly labelled GESPREKSOPENERS ("Wie denk jij dat er meer invloed heeft op een gezonde start…"), not client or patient quotes.
- Logo bar: static grid — six partner logos on `#f4f4f4`, no marquee
- Forms: none on the homepage; interaction is routed to "Doe de zelfcheck" and "Stel je vraag"
- Pricing / packages: none
- Other: angled/notched full-height colour blocks, rotated sticker labels, illustrated factor tiles, FAQ accordion with round `+` toggles, a speech-bubble-shaped content panel on inner pages, breadcrumbs on every inner page, uppercase eyebrows above nearly every heading

## Osmo-like elements
- Rotated sticker / tape labels on chips, categories and the campaign mark -> hover
- Angled, notched full-bleed colour blocks -> visual effect
- Rotated stacked photo cards (±5°) -> scroll animation
- Lenis smooth scroll with `--spring` / `--bounce` easing tokens -> scroll animation
- FAQ accordion with round `+` toggles -> accordion
- `slider__spoor` custom track slider -> slider
- Lime pill CTA paired with a separate circular arrow button -> button
- Sticky header that scrolls up by exactly the brand-strip height -> menu

## Other pages worth noting
- `/jouw-situatie` - a router page, not a content page: a single 683px section on `#f4f4f4` and a 1468px document in total. Breadcrumb, a giant left-aligned Yrsa h1 at **90.72px** (larger than the homepage hero), a two-line lead, and — instead of cards — a babyblue **speech-bubble shaped panel** on the right holding "Navigeer snel naar:" with three black circular-arrow links. Worth noting that the header's active pill turns mint here.
- `/updates/nieuwsbrief-q1-2026` - article detail template with no hero image band at all: content starts on the page background, a black circular "← Terug naar updates" button, a rotated mint NIEUWSBRIEF sticker, a left-aligned Yrsa h1 over three lines, a hairline rule, then an uppercase generalSans meta line "4 JUNI 2026 · ± 1 MIN LEZEN" before the lead image. Measure is ~1020px, noticeably narrower than the 1376px used everywhere else.
