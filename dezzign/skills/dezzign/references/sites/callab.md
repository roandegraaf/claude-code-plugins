# Callab

## Identity
- URL: https://callab.nl
- Sector: SaaS, sales-call analysis and coaching
- Brand feel: warm and confident product marketing — a deep plum room lit by cream type, soft-cornered and unhurried rather than clinical B2B
- Language: nl (English tagline "Every conversation matters")
- Measured at: 1440x900

## Navigation
- Structure: logo left (a coral waveform mark plus the wordmark "Callab"), 4 centred links — "Hoe het werkt", "FAQ", "Updates", "Contact" — and a coral pill CTA hard right. No dropdowns, no mega menu.
- Behaviour: `position: fixed`, 89px (`--header-h: 5.5rem`), fully transparent over the plum ground at every scroll position. The nav condenses past the hero: the wordmark drops away and only the waveform mark remains (inferred: mark+wordmark in the hero capture, mark only in the mid and footer captures at the same viewport — the transition itself was not watched).
- CTA in nav: "Gratis demo aanvragen" — fully rounded coral `#f5877d` pill, plum `#3d0d35` label, 15px / weight 600, sentence case
- Mobile pattern: not determinable from this capture — the header carries no hamburger, menu overlay or drawer markup at 1440

## Hero
- Type: split — copy left, product UI mockup right — on a plum ground, exactly one viewport tall (900px)
- Media: no photography. A cream `#fffff7` dashboard mockup at 24px radius sits at an angle to the right, with two cream `#fff8d2` speech-bubble callouts floating over its corners. Behind everything: a subtle animated mesh/wave field rendered in WebGL (2 canvases, unicornStudio) plus a fixed film-grain overlay.
- Headline style: Onest 400, 72px with 75.6px line-height and **-1.8px letter-spacing**, sentence case, 3 lines, cream `#fff8d2` — with the final word "matters" set in coral `#f5877d`. No uppercase, no bold.
- Subline + CTA count: a 4-line paragraph in muted mauve `#b8a099` at 18px / 29.25px. 1 CTA: the coral pill "Ik wil een demo aanvragen".
- Extras: a WhatsApp float bubble bottom-right with a circular team photo and a rotating cream tooltip ("Klaar voor een demo?" / "Kom je er niet uit?"); a statistics-cookie consent bar with "Weigeren" / "Accepteren" on first load. No trust badges, no stats bar, no scroll cue.

## Section order (homepage)
1. Split hero - cream/coral headline and pill CTA left, dashboard mockup with speech bubbles right, plum
2. USP block - "Ontstaan uit een probleem dat wij zelf hadden", CREAM `#fff8d2`, 96px padding, rounded top corners
3. Three-step process - "Van gesprek naar coaching in drie stappen", plum
4. Audience block - "Gebouwd voor jullie werkwijze", tabbed, 12 images and 45 svgs, plum; holds the "Herkenbaar?" speech-bubble quote, the "Wat Callab je geeft" checklist and a product scorecard card inside a large rounded plum panel
5. FAQ accordion - "Nog even dit", CREAM
6. Updates grid - "Laatste updates", 2 posts, plum
7. Pre-footer CTA - "Every conversation matters." centred, with a "Demo aanvragen" pill, plum
8. Footer - plum, 1158px, 4 columns including a newsletter form

## Typography
- Heading family: Onest (variable, 100-900 loaded), 26 of 26 headings — a single family for the whole site
- Body family: Onest (844 elements); GeistMono appears once
- Scale feel: h1 72px / lh 75.6px, h2 48px / lh 48px, card sublines 16px / 26.4px, body 18px / 29.25px, product-mockup micro-copy down to 9.6px. About 4x body at the top, with generous 1.5+ leading on running text.
- Weight contrast: essentially none — **400 on every heading and every body element**; only buttons step up to 600. The type does its work through size and colour, not weight. This is the opposite of the ZekerZichtbaar construction sites, which run 700 display against 400 body.
- Case & detail: sentence case throughout, with negative tracking on display (-1.8px at 72px, -1.2px at 48px). Uppercase survives only in tiny wide-tracked eyebrows ("HERKENBAAR?", "PRODUCT", "JURIDISCH", "BLIJF OP DE HOOGTE"). Numbers use `tabular-nums` (82 elements) in the product UI.

## Palette
Read from the exposed `--brand-*` theme variables, which the whole shadcn layer aliases to (`--background: var(--brand-light)`, `--primary: var(--brand-primary)`, `--ring: var(--brand-primary)`).
- Brand: `#3d0d35` (`--brand-background`) deep plum — the page ground and the body background
- Accent: `#f5877d` (`--brand-primary`) coral — every pill CTA, the logo mark, the checkmark bullets, the highlighted headline word; `#f16271` (`--brand-primary-dark`) is its pressed/darker twin
- Neutrals: `#fff8d2` (`--brand-light`) cream for all display type and the light section bands, `#fffff7` for cards, muted `#b8a099` and `#886571` on plum, `#684c62` on cream, borders `#e2dfca` on cream and `#5e3550` on plum. `#369e4e` green and `#76c7cc` (`--success`) appear only as data/state colours inside the product mockup, not as brand chrome.
- Background rhythm: plum, CREAM, plum, plum, CREAM, plum, plum, plum footer — two cream bands break up an otherwise continuous plum page, each entering with large rounded top corners rather than a hard edge
- Accent use: sparing but high-contrast. Coral is reserved for CTAs, the logo and one highlighted word; cream is the real second colour and carries large fields

## Spacing & grid
- Container: 1376px
- Section padding: 96px top/bottom on the cream bands, 136px on the hero top, 28-48px as the smaller steps
- Columns: 2-up split layouts dominate (copy / product visual, benefits / form); the process and updates blocks run 3-up and 2-up card rows
- Radius & borders: soft everywhere. Pills at `1.67772e+07px` (effectively infinite) on 127 elements, 40px on panels, 24px on the hero mockup, 14px on inputs, 10px on small cards, 50% on avatars, 8px on chips. 1px borders in cream-tinted translucents. One real drop shadow — `lab(0 0 0 / 0.45) 0px 16px 40px -12px` — lifting the hero mockup.

## Motion
- Scroll reveals: staggered group reveals (inferred: `data-reveal-group` ×11; no per-element `data-reveal`, so the stagger is group-level only)
- Hover: not determinable from this capture — no hover-state layers are pre-rendered in the DOM the way the construction sites do it
- Marquee / ticker: yes on /hoe-het-werkt — a `.marquee` section, "Je begint niet blanco", 238px tall (inferred from the section class; the homepage has none)
- Page transitions: yes, a veil that covers the viewport in brand plum (inferred: `.page-transition.page-transition--reveal` wrapping a 900px `.page-transition__veil` at `#3d0d35`)
- Cursor: none
- Ambient: an animated WebGL field behind the plum ground — observed as the faint mesh/wave texture in the hero and footer captures (`unicornStudio.umd.js`, 2 canvases) — plus a fixed film-grain overlay, `.grain`, tiling `osmo.b-cdn.net/resource-media/noise.avif`. Lenis smooth scroll is loaded (inferred: `lenis` global).

## Footer
- Columns: 4 — brand (waveform logo, "Callcoaching op jouw methodiek. Gebouwd in Nederland, data in de EU.", info@callab.nl), PRODUCT, JURIDISCH (6 legal links including Verwerkersovereenkomst and Subverwerkers), and BLIJF OP DE HOOGTE with an email input and a coral pill submit
- CTA block: yes — a centred pre-footer band, "Every conversation matters." at 48px cream with "Probeer de demo-omgeving direct, of praat eerst met sales." and a "Demo aanvragen" pill
- Legal row: "© 2026 Callab — ZekerZichtbaar B.V. · Holleweg 16F, 3925 LW Scherpenzeel · KvK 88152081 · btw NL864519886B01" left, "Gebouwd in Nederland" and "Cookie-instellingen" right

## Recurring components
- Cards: cream `#fffff7` panels at 10-24px radius with 1px cream-tinted borders, mostly holding product UI rather than marketing copy — score tiles, a donut ring, sparklines, progress bars, ranked lists
- Testimonials: speech bubbles — cream `#fff8d2` rounded quote balloons with a circular avatar beside them, placed inline in the flow rather than in a slider or grid
- Logo bar: none
- Forms: newsletter (single email input) in the footer; a full demo form on /demo-aanvragen with name, business email, company, a "hoeveel mensen bellen" select, VoIP provider and a free-text goal field — 14px radius, translucent cream fill at 5% over plum, coral pill submit
- Pricing / packages: none
- Other: FAQ accordion ("Nog even dit"), an audience tab switcher (`audience-tabs__button` / `__panel` / `__bar`, 6 panels), a numbered 3-step process block, and the persistent WhatsApp float with rotating tooltip

## Osmo-like elements
- `.grain` overlay loading `osmo.b-cdn.net/resource-media/noise.avif` -> visual effect (a literal Osmo Supply asset, already in use)
- Plum veil route transition (`.page-transition__veil`) -> page transition
- `data-reveal-group` staggered reveals -> scroll animation
- `.marquee` band on /hoe-het-werkt -> marquee
- Audience tab switcher (`audience-tabs__*`) -> tabs
- FAQ accordion -> accordion
- WebGL ambient mesh behind the page (unicornStudio) -> visual effect
- WhatsApp float with rotating tooltip -> floating CTA / hover

## Other pages worth noting
- /hoe-het-werkt - drops the product mockup entirely. A centred cream 60px headline over an empty plum field, then a comparison block ("Zo gaat het nu vaak nog, en waar Callab het omdraait"), the 3-step process, an integrations block ("Werkt met elke telefonie-stack die SIP spreekt"), a marquee band and a cream USP closer. 5344px.
- /demo-aanvragen - no hero and no header band at all: a single two-column rounded panel fills the viewport, benefits checklist left and the 6-field form right, with the cream FAQ below it. 2969px total, the shortest page on the site, and the only one built around a form.
