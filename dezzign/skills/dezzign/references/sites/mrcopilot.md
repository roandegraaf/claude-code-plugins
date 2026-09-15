# Mr. Copilot

## Identity
- URL: https://mrcopilot.nl
- Sector: AI-implementatie & Microsoft Copilot training
- Brand feel: energetic aviation metaphor played completely straight — everything is a flight ("Stap aan boord", "Boarding call", "Ready for take-off!"), loud brand blue with an acid-lime punch, optimistic rather than corporate
- Language: nl
- Measured at: 1440x900

## Navigation
- Structure: `nav.fixed top-0` 112px tall. Logo left, 4 centred links ("Wat we doen", "Flight plan", "Inspiratie", "Trainingen"), right pair: blue CTA button + square hamburger. The hamburger is present at desktop width too and opens an overlay panel holding the remaining links ("Contact", "Over ons", "Werken bij") — a deliberately short visible menu with the rest hidden behind the burger. No dropdowns, no mega menu.
- Behaviour: fixed, full-width, transparent over the blue hero, solid `#0138da` once scrolled onto white sections (observed: transparent in the hero screenshot, solid blue band in the mid and footer screenshots). `transition-all duration-300 ease-in-out`.
- CTA in nav: "Boek je sessie" — `#0138da`→`#0947fe` fill, white 16px/600, 4px radius, 16px 24px padding
- Mobile pattern: same hamburger, overlay panel over `div.backdrop-overlay fixed inset-0 bg-black/50` (inferred: the backdrop element exists at `opacity-0 pointer-events-none`, so it fades in behind a slide/fade panel)

## Hero
- Type: full-bleed brand-blue colour field, split left type / right cut-out portrait, 852px tall
- Media: cut-out photo of the founder standing on a lighter-blue circle, no overlay; a soft cyan-to-blue radial glow bleeds in from the bottom-left corner. Under it a partner-logo marquee at 60% opacity.
- Headline style: "Laat AI landen" — Lufga 72px/700, line-height 72px (1.0), white, single line, sentence case, no highlighted words
- Subline + CTA count: 18px/400 lh 32px white paragraph, 2 CTAs — primary "Stap aan boord ✈" (lime `#dfff40`, navy `#01248e` text), secondary "Laat je inspireren ✨" (white/`#f3f4f6`, navy text). Both 18px/600, 4px radius, 16px 24px padding, trailing icon.
- Extras: rounded-full eyebrow pill "AI-implementatie" above the h1; partner-logo marquee at the bottom of the hero; circular cyan (`#01cae6`) WhatsApp float bottom-right, persists on every scroll position

## Section order (homepage)
1. Hero (blue colour field) - eyebrow pill, 72px headline, subline, 2 CTAs, partner-logo marquee
2. Service card stack - white, 2336px tall; eyebrow "Dé oplossing", h2 "Maak een vliegende start", then three 24px-radius blue cards (616px wide, 48px padding) for Inspiratie / Training / Ontwikkeling in a `cards-container` / `card-wrapper` stack
3. Numbered process - white, 2569px; "Boarding call – De aftrap van jouw AI-reis" then Destination / Cockpit check / Test flight / Fly & monitor, each an icon chip on lime plus copy, connected by a hand-drawn flight-path line
4. Stats band - white, 3 counters: "Aan boord / Medewerkers geïnspireerd", "Opstijgen / Processen verbeterd", "Hoogvliegers / Productiviteitswinst na 3 maanden"
5. Article teasers - white, h2 "Inspiratie & trends", 3 cards with image + category eyebrow ("Visie", "Klantcase")
6. Team contact band - `#f9fafb`, h2 "Wat wordt jouw bestemming? Mr Copilot laat AI landen!", 2 named people with photo, role, phone and email, plus "Stap aan boord"
7. Footer CTA block - blue, "Ready for take-off!"

## Typography
- Heading family: Lufga (self-hosted, 16 faces: weights 100–900 plus matching italics), fallback stack ends in sans-serif
- Body family: Lufga — single-family site, headings and body share one geometric sans
- Scale feel: h1 72px, h2 48px, h3 30px, body 18px / 16px. Heading line-height is locked to 1.0 (72/72, 48/48) while body runs 1.78 (18/32) — very tight display against very airy copy.
- Weight contrast: 700 on h1/h2, 800 on h3, 400 body. No light weights anywhere.
- Case & detail: sentence case throughout, `letter-spacing: normal` everywhere (no tracking adjustments at all), eyebrows are rounded-full pills rather than uppercase labels, emoji-style inline icons inside CTA labels

## Palette
Site exposes **no theme CSS variables** — every `--` custom property in the dump is WordPress Gutenberg boilerplate (`--wp--preset--*`, `--wp-admin-*`). Palette therefore read from the primary button plus section fills, per the decision rule.
- Brand: `#0138da` - hero field, footer, `bg-primary` utility, scrolled nav
- Accent: `#dfff40` acid lime - primary CTA fill, process icon chips; always paired with `#01248e` text
- Neutrals: `#01248e` (navy, every heading on a light section), `#ffffff` body text on blue, `#9ca3af` muted, `#f9fafb` tinted section, `#f3f4f6` secondary button fill, borders effectively absent (only one `#cccccc` in the whole document)
- Background rhythm: blue hero → white → white → white → white → `#f9fafb` → blue footer. One long white middle bookended by two blue blocks.
- Accent use: sparing and disciplined — lime only on primary CTAs and small icon chips, never as a field. The colour weight is carried by the two blues (`#0138da` field, `#0947fe` nav button) and a single cyan (`#01cae6`) reserved for the WhatsApp float.

## Spacing & grid
- Container: 1232px content inside a 1280px wrapper, centred
- Section padding: 96px top and bottom on every section (`pt-8 md:pt-12 lg:pt-16 xl:pt-24 2xl:pt-32` resolves to 96px at 1440)
- Columns: 3-col 352px with 48px gap and 3-col 378px with 48px gap for cards; 2-col 608px with 16px gap for the service stack; full-width 1232px single column for the process
- Radius & borders: cards 24px (`rounded-3xl`), buttons 4px, pills and floats fully round, small chips 6–8px. **No shadows anywhere** — the box-shadow tally came back empty; separation is done with colour fills and generous whitespace.

## Motion
- Scroll reveals: fade/stagger per group — observed, not inferred: at 45% scroll the "Cockpit check" and "Test flight" cards rendered their icon and title while the body copy was still invisible, i.e. a reveal caught mid-flight (`data-reveal-group` ×13)
- Hover: buttons and cards lift/shift (inferred: `cursor-pointer` ×10 and Tailwind `transition` utilities on `card-wrapper`; no hover state was triggered directly)
- Marquee / ticker: yes — partner logos, Swiper-driven (`partner-logos-swiper` + `swiper-wrapper marquee-swiper`, 15 slides, 60% opacity) in the hero
- Page transitions: none (no Barba, Swup or view-transition script in the bundle)
- Cursor: none
- Other: animated count-up on the stats band — observed, the three numbers read a literal `0`, `0`, `0%` before their trigger fired. Nav colour swap on scroll (observed). Sticky card stack on the service section (inferred: `cards-container` wrapper with `transition` on each `card-wrapper`).

## Footer
- Columns: not a column grid — a centred CTA composition, 772px tall on `#0138da`: logo, rounded pill eyebrow "Stoelriemen vast", 48px white h2 "Ready for take-off!", one lime CTA "Stap aan boord", a full-width curved flight-path SVG with a plane glyph tracing behind it, then "Houd ons in de gate-n" with two rounded social squares (Instagram, LinkedIn)
- CTA block: yes — the whole footer is the pre-footer CTA band, there is no separate one
- Legal row: left "Cookiebeleid · Privacybeleid", right "© 2025 Copyright / Powered by DashData / Realisatie door **Zeker Zichtbaar**"

## Recurring components
- Cards: 24px-radius solid-blue panels, 616px wide, 48px padding, lime icon chip top-left, white copy, no image; article cards use a top image with a category eyebrow above the title
- Testimonials: none
- Logo bar: marquee (Swiper, 15 partner logos, inside the hero at 60% opacity)
- Forms: none on the homepage (`form` count 0); the contact form lives on `/trainingen/` and `/contact/`
- Pricing / packages: none
- Other: animated stats counters, rounded-full eyebrow pills instead of uppercase labels, hand-drawn flight-path SVG lines threading sections together, named-person contact block with photo/phone/email, floating WhatsApp bubble

## Osmo-like elements
- Partner logo marquee in hero -> marquee
- Staggered group reveals on scroll -> scroll animation
- Sticky/stacking service cards -> scroll animation
- Hamburger overlay panel with 50% black backdrop -> menu
- Count-up stats band -> counter
- Nav transparent-to-solid colour swap -> sticky nav
- Rounded-full eyebrow pills + icon-suffixed buttons -> button

## Other pages worth noting
- `/trainingen/` - inverts the homepage rhythm: blue dominates instead of white. Hero is a shorter 560px blue band with a **centred** h1 and a long centred intro paragraph and no image at all, then a `#f9fafb` 6-card product grid ("6 bestemmingen voor de juiste training"), a blue video band, a blue form section (4 inputs — the only real form in the set), a blue 3-column "Training op maat", and it closes on the same team-contact band as the homepage.
- `/inspiratie/ai-implementeren-drie-lagen/` - article detail template: blue hero with a category pill and a 72px h1 wrapping to 3 lines, no image, and a lime "← Terug naar inspiratie" back button where the CTAs normally sit; below it a white two-column body with the article left and a "Gerelateerde artikelen" hairline-separated list right.
