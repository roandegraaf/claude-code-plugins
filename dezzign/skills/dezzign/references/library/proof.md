# Library — Proof and trust

Outside inspiration from Mobbin (swept 2026-09-30), translated into house rules. Not evidence from our own builds — `stramien.md` stays the source of truth; this file is the variant pool that step 5 of SKILL.md draws from to avoid the default spine.

Covers slot 4 (orientation or proof strip) and slot 9 (trust) of `### The default homepage order`: stats, results, reviews and scores, testimonials, logo walls, certificates, awards, press and comparisons. The stramien's own `### Count-up statistics` (three centred numbers counting from zero) is the default this file offers alternatives to. Proportions are read off low-res screenshots; anything marked `(estimated)` is not a measurement.

## Patterns

### The stat stack on a hairline spine
**Anatomy:** Stats run vertically, one per row, in the right half (~45% width) of the section. Each row is a very large number (display scale, light or regular weight) with a short sentence under it, not a one-word label. A single vertical hairline runs down the left edge of each stat block. The left half carries only a small eyebrow at the top ("Bedrijf", "In cijfers") and, optionally, one rounded or square photo anchored bottom-left, so the section reads as deliberately asymmetric. The label sentence can carry one highlighted word.
**Why it works:** Stacking gives every number its own beat as you scroll, and a sentence label ("jaar op rij een verdubbeling van de omzet") says far more than "klanten".
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `warm-daylight` · **Breaks:** `campaign-poster` (too composed and corporate for a campaign voice)
**House translation:** The highlighted word in the label goes in the accent. That is the page's one highlighted word, so drop any highlight in the hero if you use it here. In `warm-daylight` use a light display weight, sentence case and no uppercase mono labels. In `billboard-condensed` the numbers go heavy and condensed and the photo stays square.
**Motion pairing:** `vault/number-odometer.md` per number, fired row by row as each enters. `vault/elements-reveal-on-scroll.md` for the hairline and label.
**Sources:** [Analogue Agency](https://mobbin.com/sites/sections/53f31d8a-739c-4392-b8ac-7a5e69465f6b), [T1 Energy](https://mobbin.com/sites/sections/69570a8c-7878-4ebe-8962-d3ecc0ab866e)

### The number is the headline
**Anatomy:** No separate section heading. The proof itself is set at display size as full-width lines, e.g. "20 jaar" / "300+ medewerkers" / "2 vestigingen", each line on its own hairline-ruled row with a small paragraph (~20% width) right-aligned in the same row. A one-number variant is a single giant numeral (spanning ~40% width) with a tiny label ("Aantal prijzen") and two short text columns beside it. A score variant puts the review score in the heading itself: "Trustpilot-score 4,4 uit 5, op basis van 185.890 reviews".
**Why it works:** It turns the least-read section on a B2B homepage into a statement band. The number gets the scale the stramien otherwise reserves for `### The statement band`.
**Fits:** `billboard-condensed`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `warm-daylight` (heavy stacked display is too loud; use the stat stack instead)
**House translation:** Treat it as the page's statement band, and only once per page. On `flood-and-acid` it may sit on the brand-colour flood, because that is the direction's ground, not the accent. Keep the accent off the numerals.
**Motion pairing:** Fade each subsequent line in on scroll (the source dims lines further down), or use `vault/highlight-text-on-scroll.md` on the line text. `mwg/effect027.md` (letter by letter, masked) for the single-numeral variant.
**Sources:** [Instrument](https://mobbin.com/sites/sections/10b3f9ff-98d3-4526-b4e3-bc5efeb5724c), [Büro](https://mobbin.com/sites/sections/70c3a42f-4d7d-4142-b657-5d512360f7f5), [Wise](https://mobbin.com/sites/sections/fa463a78-06a7-4c04-84a4-b7d9edfcd07e), [Wise (Trustpilot)](https://mobbin.com/sites/sections/7dfcd207-47ec-4cf2-9988-85371589abc4)

### Results attributed to a client
**Anatomy:** A row of 3-4 columns separated by full-height vertical hairlines, often on a deep brand band. Each column: a large number, one sentence of outcome with the key phrase in bold ("80% kortere reactietijd"), and the client's logo in monochrome underneath. Variants: the logo sits above the number; the columns are cells of a hairline grid; or, when clients cannot be named, a small label above each number gives the client type instead ("Groot productiebedrijf", "Logistiek dienstverlener"). One variant adds a "Per 31 december 2025" date stamp under each figure.
**Why it works:** A number with a named client behind it is evidence. The same number without one is a claim. The anonymised-sector variant keeps the evidence feel for clients under NDA.
**Fits:** `deep-ground-editorial`, `flood-and-acid`, `billboard-condensed`, `warm-daylight` · **Breaks:** `campaign-poster` (a campaign has no clients to cite)
**House translation:** Monochrome logos only, never colour, and no accent fill on the band. Emphasis in the sentence is weight, not colour, which matters most in `warm-daylight`, where the direction already does emphasis by weight. The date stamp is worth copying whenever the numbers will go stale.
**Motion pairing:** `vault/number-odometer.md`; columns staggered with `vault/elements-reveal-on-scroll.md`.
**Sources:** [Sprout Social](https://mobbin.com/sites/sections/72dcc563-96af-4e8f-b621-11bd8b09307d), [Vercel](https://mobbin.com/sites/sections/744e39d0-da0d-4136-a1fe-84ef590a7a3a), [Front](https://mobbin.com/sites/sections/ee96f0c3-1f3e-4e6f-a2c9-3eecf1419b2f), [Stripe](https://mobbin.com/sites/sections/c3789d0b-1a41-4b55-a82f-352dbab971ec), [Sana](https://mobbin.com/sites/sections/98cbe674-6fd3-40a8-9591-f93682e893c0), [monday.com](https://mobbin.com/sites/sections/427aba6b-1e34-42f0-b478-8391dfa35463)

### Numbers attached to the photograph
**Anatomy:** Two branches.
(a) *Stat on the photo:* 3 equal rounded or square photo tiles, each showing the real work. The number and a short uppercase or bold label are set bottom-left on the photo, over a scrim that covers only that corner.
(b) *Fact table hung beneath:* one wide team or site photo, directly followed by a table attached to its bottom edge. The table has 4 cells: numbers in the top row, labels in the bottom row. Photo and table share one hairline frame. A lighter version drops the table for tiny labels ("OPGERICHT 2011", "MEDEWERKERS 48") set under a strip of photos, some cells left empty.
**Why it works:** The photo proves the number is about real people and real machines. It is the documentary-photography rule applied to the stats block.
**Fits:** (a) `billboard-condensed`, `flood-and-acid`; (b) `warm-daylight`, `deep-ground-editorial` · **Breaks:** `campaign-poster` (numbers read as corporate)
**House translation:** Scrim only under the type (pull `### Scrim only where type sits`). The frame in (b) is a 1px hairline in the text colour or the deep brand colour, never the accent. Square or rounded tiles follow the direction's image rule.
**Motion pairing:** Photo tiles with `vault/parallax-image-layers.md` at a low intensity; numbers with `vault/number-odometer.md`.
**Sources:** [Zipline](https://mobbin.com/sites/sections/baa6143d-c481-4ac3-807f-63fe9f53dfbd), [Granola](https://mobbin.com/sites/sections/6fe5dee9-b811-4e60-82f3-ad7024090784), [Rows](https://mobbin.com/sites/sections/ef0775fe-e5c9-4e69-84d8-45998572233f), [Circle](https://mobbin.com/sites/sections/e87913fa-9974-4209-9bce-9d930dec8fd4), [Aino Agency](https://mobbin.com/sites/sections/ad3a0e9f-1f7b-48cd-9c9a-6bd6a93e7723)

### The hairline logo grid
**Anatomy:** Logos sit in an open grid of equal cells that share 1px borders, like a table with no outer card. The cells are tall enough (roughly 1:0.6 to square) that each logo floats with generous air. Variants:
- A huge uppercase "KLANTEN" heading with a tiny bracketed aside ("(onze partners)") above a 4x4 grid.
- The grid fills only the right half and bleeds to the viewport edge, with the heading in the left half ("Vertrouwd door de grootste maakbedrijven").
- The grid is inset in one tinted rounded panel, with internal dividers only.
- Dashed hairlines with a small centred caption above.
**Why it works:** The grid gives weight to a small set of logos, and borders instead of cards keep it shadowless.
**Fits:** `billboard-condensed` (square cells, uppercase heading), `deep-ground-editorial` (dark ground, light logos), `warm-daylight` (tinted-panel variant) · **Breaks:** `campaign-poster` (a grid of logos contradicts "assembled by people")
**House translation:** Monochrome logos in the text colour, at one optical size. No hover lift. If you want a hover state, change the cell's ground to the tinted neutral.
**Motion pairing:** Cells revealed with a stagger (`vault/elements-reveal-on-scroll.md`); for a long list, swap rows through `vault/marquee-with-scroll-direction.md`.
**Sources:** [Vucko](https://mobbin.com/sites/sections/822f8e3a-480f-439e-ab91-f78658932dfe), [Mistral AI](https://mobbin.com/sites/sections/554e6293-59e5-44fa-b1d3-ef969faa604e), [Clay](https://mobbin.com/sites/sections/fb54fa16-9809-4bbd-87b6-8b67954b6a48), [Mora](https://mobbin.com/sites/sections/24b425d9-6222-4a13-9b4f-b669d570fa2e), [Aurora](https://mobbin.com/sites/sections/0863a939-7a31-4629-b0a2-cbde88e9fcb1), [Current](https://mobbin.com/sites/sections/7a3e44e8-1f69-44ab-8a8d-06076d2cf4e7)

### The logo field
**Anatomy:** A whole section given to logos: 5-6 columns and 5-7 rows, no borders, no cards, light logos on a dark ground (or dark on cream), one short heading or none. The density is the message.
**Why it works:** When a client really has 30+ recognisable customers, volume beats curation. The page's darkest band doubles as a breather.
**Fits:** `deep-ground-editorial`, `billboard-condensed` · **Breaks:** `warm-daylight` (dark field), `flood-and-acid` (the field competes with the colour flood)
**House translation:** Use it only with 25+ logos worth showing. Below that it looks padded, so use the hairline grid. All logos monochrome at equal optical weight.
**Motion pairing:** `mwg/effect034.md` (columns at different speeds) if the field must move; otherwise a single fade-in.
**Sources:** [Linear](https://mobbin.com/sites/sections/909bfa88-9bdd-49da-9c47-3f1523fc9bae), [Framer](https://mobbin.com/sites/sections/58de7e34-acd9-44d5-a479-4ad6bc4a9237), [Dovetail](https://mobbin.com/sites/sections/6acc01f4-086e-42ee-a2b0-a7605c75c15f), [Resend](https://mobbin.com/sites/sections/180bbd62-643f-4fdb-937c-d248473da999), [Oura Ring](https://mobbin.com/sites/sections/39662819-04ef-4e34-860e-10f8c560afe4)

### The score sentence leading into logos
**Anatomy:** One centred line of body-size text that fuses the review score and the logo strip: "Beoordeeld met een 4,7 uit 600+ reviews op Google en vertrouwd door", followed directly by a single row of monochrome logos. The key phrase in the sentence is bold. Sits right under the hero, where the stramien's orientation strip would go.
**Why it works:** It does two proof jobs in about 120px (estimated), and reads as a sentence rather than a badge dump.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `billboard-condensed` (too quiet for that register; use the hairline grid)
**House translation:** Bold, not accent, for the score phrase. Stars, if any, in the text colour. When the utility topbar already carries the rating (`### Utility topbar`), do not repeat it here.
**Motion pairing:** `vault/css-marquee.md` or `vault/marquee-with-scroll-direction.md` for the logo row. In `warm-daylight`, which bans marquees, keep the row static.
**Sources:** [VEED](https://mobbin.com/sites/sections/f7e7d1fb-dea7-4a2e-9b13-e24c2dce167f), [Sequence](https://mobbin.com/sites/sections/e4bc65e0-bfd2-4fd0-9f26-1a0df5626942), [Whereby](https://mobbin.com/sites/sections/21536116-ef16-498d-b383-002a9e15f226), [Customer.io](https://mobbin.com/sites/sections/a955e8a5-d50f-4855-ada2-0e2be7c077bd)

### The caption as the first tile
**Anatomy:** A horizontal row of equal tiles (logos, or review cards) where the first tile is not content but the caption. It holds the heading ("Vertrouwd door"), one or two lines of blurb and a small button, or it holds the aggregate score ("Uitstekend ★★★★★", "4,8 op basis van 312 reviews") on a dark or deep-brand ground. The rest of the row carries the logos or reviews on the tinted neutral, and the row can scroll horizontally.
**Why it works:** The heading becomes part of the grid instead of floating above it, and the summary score frames every review that follows.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `billboard-condensed` if the tiles are rounded (switch to square)
**House translation:** The caption tile takes the deep brand colour or the tinted neutral, never the accent. The source puts the logo tiles on flat tinted fills, which already obeys `### No elevation`.
**Motion pairing:** `vault/swiper-slider-setup.md` or `vault/draggable-infinite-slider-with-gsap.md` for the scrolling row, with the caption tile pinned outside the track.
**Sources:** [Robot.com](https://mobbin.com/sites/sections/74c843e2-1931-47c3-8e22-01f9a7b42132), [Assembly Coffee](https://mobbin.com/sites/sections/fb5efc07-bcad-4f00-84b7-0773ff772105), [Klarna](https://mobbin.com/sites/sections/1a0904da-e870-48b5-bd03-18e75cbb8de3), [Mistral AI](https://mobbin.com/sites/sections/554e6293-59e5-44fa-b1d3-ef969faa604e)

### The review score panel
**Anatomy:** Split, roughly 1:2. Left column (sticky on long lists): the aggregate score at display size ("4,6 / 5"), a word verdict ("Uitstekend"), "op basis van 181 reviews". Under that, either distribution bars (5 to 1 stars, with percentages) or category bars (Service, Levertijd, Montage, Prijs, each with its sub-score), and one outline button ("Schrijf een review" or "Alle reviews op Google"). Right column: a list of reviews separated by hairlines, each with stars, date, name, an optional bold title and 2-4 lines of text. A ledger variant replaces the review list with one row per platform (Google, Trustpilot, Kiyoh, Klantenvertellen): the platform name underlined, stars, score, "354 reviews, per 1 juni 2025", with hairline dividers under a top rule.
**Why it works:** The breakdown shows *what* people praise, which works harder than a bare 4.6. The ledger is honest about sources and dates.
**Fits:** `warm-daylight` (this is a trust device in the sense that direction means), `deep-ground-editorial` · **Breaks:** `campaign-poster`, `billboard-condensed` (data-dense and quiet)
**House translation:** Bars fill in the deep brand colour on a tinted track, not the accent. Stars in the text colour or the deep brand colour. Review cards, if any, are hairline or tinted, never shadowed. It belongs on a reviews or service page. On the homepage use only the ledger variant.
**Motion pairing:** Bars grow from zero on entry (a CSS width transition is enough); score via `vault/number-odometer.md`.
**Sources:** [Klook](https://mobbin.com/screens/dc231a95-9ff9-43f1-bde3-33d90e0b38a0), [Navan](https://mobbin.com/screens/6998a2c5-9d37-4212-bfcc-84976002f751), [Care.com](https://mobbin.com/screens/9ed54371-d437-4987-a442-c2db30b02fcc), [KÖPPEN](https://mobbin.com/sites/sections/32e27c57-1beb-458c-8409-dc03af32f610), [Webflow](https://mobbin.com/sites/sections/64cd68f9-19f3-403f-97b7-0285b6c15087)

### The portrait on an offset block
**Anatomy:** Split, 45/55 (estimated). One side: a single customer portrait, cut out or rectangular, set on or against a flat colour block. The block sits offset behind the photo (shifted down-left by ~8% of its size), or is a large arc or quarter-circle that the cut-out stands on. A name card (name, role, company) overlaps the bottom edge of the photo. Other side: the client's logo above a large pull quote at heading scale, a smaller full quote under it, then a text link ("Lees het verhaal van ...").
**Why it works:** One real person given the space of a hero makes the testimonial a portrait, not a widget. The offset block adds depth without a shadow.
**Fits:** `flood-and-acid`, `warm-daylight`, `deep-ground-editorial` · **Breaks:** `billboard-condensed` (cut-outs on arcs are too soft; use a square photo with no block)
**House translation:** The block is the tinted neutral or the deep brand colour, never the accent. The name card is a plain panel with a hairline border, not a floating shadowed chip. No brush strokes or sparkle doodles. The one exception is `campaign-poster`, whose hand-assembled look can carry them.
**Motion pairing:** The block slides in slightly after the photo (`vault/elements-reveal-on-scroll.md` with a delay); the quote with `vault/masked-text-reveal.md`.
**Sources:** [Maze](https://mobbin.com/sites/sections/1b5e23df-f8f5-44ea-9518-f3a58be7e952), [15Five](https://mobbin.com/sites/sections/56f8061b-d267-480f-b693-c261adaa1eac), [Charma](https://mobbin.com/sites/sections/13c29f0a-f120-4176-a672-b0582600b7c9), [Jasper](https://mobbin.com/sites/sections/9c641ae9-68bc-450f-b6ac-681357e59a93), [Intercom](https://mobbin.com/sites/sections/3a196a04-52f8-4b41-9325-7e6c80b9fad5)

### The quote beside its evidence
**Anatomy:** Two panels of equal height side by side, or a quote panel partly overlapping a photo. Panel 1: the quote in large type, name and role bottom-left, prev/next arrow chips. Panel 2 carries the proof behind the quote, which is one of: the client's logo large on a dark textured panel; the site or project photo; a stat tile ("KORTERE INWERKTIJD" as a small label with a huge number cropped by the tile's bottom edge); or stacked result cards on a photo. A card-carousel variant keeps the quote, portrait and "lees het verhaal" together and puts a big result number ("3x omzet") in the card's corner. Segment pills above ("Hoveniers", "Aannemers", "Installateurs") can filter which story shows.
**Why it works:** It pairs the emotional claim with the hard one in a single glance, and the segment pills let each audience find its own peer.
**Fits:** `deep-ground-editorial`, `flood-and-acid`, `warm-daylight` · **Breaks:** `campaign-poster` (too case-study)
**House translation:** The quote panel takes the deep brand colour or ink. A saturated accent-colour quote panel appears in the sources, and it is exactly the field-scale accent the house bans. The overlap (a quote panel with one concave rounded corner cutting into the photo) is the house's `### Overlap as a joining device`, not a shadow. Segment pills use the direction's pill or chip style, with the active pill in ink.
**Motion pairing:** `vault/line-reveal-testimonials.md` for the quote swap; `vault/number-odometer.md` for the stat tile.
**Sources:** [Paraform](https://mobbin.com/sites/sections/2fc531d3-b6a7-4ed7-a78d-bac654135b47), [Mews](https://mobbin.com/sites/sections/50eb4ed1-b36e-42b0-9f5e-39b4ca313de3), [Mews (overlap)](https://mobbin.com/sites/sections/26f1e7be-d719-46c3-a674-9c7ea51567df), [Unify](https://mobbin.com/sites/sections/dea36568-4439-442f-92cc-4ecb1f122f05), [Apollo](https://mobbin.com/sites/sections/45f1e4d1-c686-4b34-bd62-07cba90dd057), [Webflow](https://mobbin.com/sites/sections/49429144-9dd0-43b7-a3fe-65d13122fdf5)

### The single editorial quote
**Anatomy:** One quote, alone, centred or in a ~60% measure, at heading scale on a dark or cream ground. A small square avatar sits inline before the first word, at cap height, instead of a separate portrait. Under the quote: the client logo, a vertical hairline, then name and role in small uppercase or mono. Bottom-right, a numbered progress indicator ("01 — 02 03") if there are more quotes. A variant keeps a narrow left column for the client logo and a "Lees het verhaal" link, with the quote in the right column.
**Why it works:** It is the testimonial built as a statement band, the one thing on screen. It is the cheapest way to make a quote feel premium.
**Fits:** `deep-ground-editorial` (the natural home), `billboard-condensed`, `warm-daylight` (centred, sentence case, no mono) · **Breaks:** `flood-and-acid` if it is the only proof (that direction wants volume and energy)
**House translation:** No quote marks in the accent. If you want a glyph, use a large quote mark in the tinted neutral. The progress bar's active segment may take the accent, because it is an interaction state.
**Motion pairing:** `vault/masked-text-reveal.md` per line; the quote switch via `vault/line-reveal-testimonials.md`.
**Sources:** [Dovetail](https://mobbin.com/sites/sections/7c5815df-5425-424f-b19d-017be9854a89), [Attio](https://mobbin.com/sites/sections/2ce67fb5-10f1-49fa-8ba6-e94d7bf516aa), [Glide](https://mobbin.com/sites/sections/10afa5d6-cd05-4ea4-a582-98d57a484ac2)

### The quote wall
**Anatomy:** Many short quotes at once. Four branches:
- A 3x2 grid of text cells in a checkerboard, alternating tinted and untinted with no borders and no cards. Avatar, name and company sit at the bottom of each cell.
- A 3-column masonry of hairline-bordered cells, each with a tiny source icon (Google, LinkedIn) top-left.
- Masonry cells in which one key phrase of each quote is set in bold, with a "via <bedrijf>" footer.
- 3 rows of cards offset horizontally, fading out at both viewport edges, under a caption ("50.000 klanten en het worden er meer") and a short confident heading.
**Why it works:** Volume proves the quotes are not cherry-picked. Bolding one phrase per quote lets a skimmer read the wall in five seconds.
**Fits:** `flood-and-acid`, `warm-daylight` (checkerboard or hairline variant), `deep-ground-editorial` · **Breaks:** `billboard-condensed` (too chatty, unless reduced to the checkerboard with square cells)
**House translation:** Tint alternation uses the one tinted neutral, and emphasis is bold, not accent. Needs 9+ real quotes. With fewer, use the single editorial quote. In `warm-daylight` the marquee rows are out (that direction has no marquee), so use the static checkerboard.
**Motion pairing:** Rows via `vault/marquee-with-scroll-direction.md`, alternating direction per row, or `mwg/effect024.md` (opposite-direction marquees). Static grids via `vault/elements-reveal-on-scroll.md` stagger.
**Sources:** [Lemon Squeezy](https://mobbin.com/sites/sections/78c3beb7-f7c8-4d70-bbad-60cdee825869), [Ada](https://mobbin.com/sites/sections/a2bc57d6-3544-4563-afc3-0bfd75975114), [Clay](https://mobbin.com/sites/sections/70de8420-3d32-4e9a-90ef-b2881b615669), [Ramp](https://mobbin.com/sites/sections/01b92043-4135-45f7-a3db-ba0019599034)

### The comparison
**Anatomy:** Two branches.
(a) *Column-band table:* feature rows on hairlines. The "us" column is marked by a continuous vertical band that runs through every row, from above the header to below the last row, so it reads as one raised strip. Ticks in "our" column, muted crosses in the other. The first row is numeric ("160+ controles" against "~26").
(b) *Today versus with us, row by row:* two column headers ("Zoals het nu gaat" → arrow chip → "Met <klant>"). Each row pairs a bold short claim with a one-line explanation on both sides. The left side is muted (grey text, strike or dash icons), the right side is full strength. A variant makes "our" side a solid ink panel partly overlapping a hairline-outlined panel for "theirs".
**Why it works:** For a considered B2B purchase it answers the question the visitor is already asking, "why not the cheaper one?", without naming a competitor.
**Fits:** `flood-and-acid` (sales-driven, decision product), `deep-ground-editorial`, `warm-daylight` (branch b, gently worded) · **Breaks:** `campaign-poster`
**House translation:** The band or panel for "us" is ink or the deep brand colour, or a 2px accent *outline*. The sources' solid accent-colour column is a field-scale accent. Ticks may take the accent (they are icon-chip scale). Headings stay the direction's case, and never name the competitor.
**Motion pairing:** Rows staggered in (`vault/elements-reveal-on-scroll.md`); the band draws down with a scaleY reveal.
**Sources:** [Function](https://mobbin.com/sites/sections/dd3e214a-e4f2-4276-8702-4aa29d47a271), [Front](https://mobbin.com/sites/sections/887ca35c-b1cf-4975-82af-c178a50ff4a4), [Superpower](https://mobbin.com/sites/sections/b9886dc1-2549-419b-b5ec-762dc672004e), [Parker](https://mobbin.com/sites/sections/49212788-6530-4397-b0e3-9c6eb5e646e7), [Ploy](https://mobbin.com/sites/sections/9138eef2-4217-4b65-bdac-b9f7909c6d40), [Pitch](https://mobbin.com/sites/sections/26fcfa15-59d6-4ba6-b654-91474bcd2ed6), [Cake Equity](https://mobbin.com/sites/sections/3d116059-6b9d-418e-aa5d-6938c52efe82)

### The certificate and award ledger
**Anatomy:** A typographic table instead of a badge row. The title with a count in brackets at the far right ("Keurmerken (12)"), then full-width rows on hairlines: certificate or award | what it covers or which project | year, right-aligned. Rows can be grouped by issuing body, with the body named only on the first row of its group. The grid-form variant is text-only in 3 columns, with the year small on top, the award or certificate name large, and the issuer beneath.
**Why it works:** Dutch B2B clients carry VCA, ISO 9001, BRL, NEN and branch memberships whose badges are visually awful. The ledger shows them all, and looks better the longer the list gets.
**Fits:** `billboard-condensed`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `warm-daylight` (a ledger of certificates feels like paperwork; use the certificate cards)
**House translation:** No badges at all in this form. The count in brackets is the only flourish. Uppercase row text only in `billboard-condensed`.
**Motion pairing:** Rows revealed with a clip stagger (`vault/elements-reveal-on-scroll.md`); for a pinned title while the rows scroll, `vault/sticky-title-scroll-effect.md`.
**Sources:** [Locomotive](https://mobbin.com/sites/sections/3972031f-245c-461e-bed8-9b8845b92fd0), [basement.studio](https://mobbin.com/sites/sections/bb09f59f-11c2-4b8c-9858-b424eacabb8b), [Büro](https://mobbin.com/sites/sections/70c3a42f-4d7d-4142-b657-5d512360f7f5), [Phantom Studios](https://mobbin.com/sites/sections/7600dff9-a3b5-4dc3-a7d7-84ada6bf8fca), [Ragged Edge](https://mobbin.com/sites/sections/145b0e1c-3e0d-4565-b3d8-e82646927497), [Squarespace](https://mobbin.com/sites/sections/9e957248-b908-47fc-945e-04c4ce2df6d6), [Faire](https://mobbin.com/sites/sections/4ea14d7b-ebc2-47c4-8552-7202b0177493)

### Certificate cards that explain
**Anatomy:** A 3-up or 3x3 grid of flat tiles. Each tile has the official mark (left or centred on a tinted square), the certificate name, one sentence on what it means *for the customer* ("Veilig werken op uw locatie, jaarlijks getoetst"), and a small "MEER INFO →" link. A split variant sets a compact 3x3 grid of marks in the left half and a heading, paragraph and link in the right half.
**Why it works:** Nobody knows what BRL 9500 means. One sentence per mark turns a compliance logo into a reason to buy.
**Fits:** `warm-daylight` (a trust device, see that direction's footer badges), `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `billboard-condensed` if the tiles are rounded (make them square)
**House translation:** Tiles are the tinted neutral or hairline-bordered. One source has shadowed tiles, and the house rule removes the shadow. Official marks keep their own colours, since altering them is not allowed, but stay small inside a large neutral tile, so they never take field scale.
**Motion pairing:** Grid staggered in; no hover motion beyond a ground-colour change.
**Sources:** [Windsurf](https://mobbin.com/sites/sections/061f9977-70ff-4ac3-8fbb-68e932262551), [Dovetail](https://mobbin.com/sites/sections/3ee471e1-fbad-429e-953e-57a309b5ebfd), [Miro](https://mobbin.com/sites/sections/49ef29d7-9efd-4672-9784-cef76f57ebe1), [Grammarly](https://mobbin.com/sites/sections/5464f0de-48ee-44a0-b77e-8b49a1eb7780)

### Press as headlines
**Anatomy:** The article headline carries the proof, not the outlet logo. A 2-column grid where each item is the outlet logo in grey monochrome, a hairline under it, and the article headline in bold below. A year column on the far left groups the items by year. The row variant puts a large outlet logo left and the date, headline and "Lees artikel" link right. The dark-band variant gives each outlet logo a 3-6 word pull quote from the article.
**Why it works:** Regional press ("Omroep Brabant", "AD", the trade journal) means little as a logo, and a headline says what they actually wrote.
**Fits:** `deep-ground-editorial`, `warm-daylight`, `billboard-condensed` · **Breaks:** `campaign-poster` (use it only as a scrapbook of real clippings, which is a different pattern)
**House translation:** Monochrome logos; links in the text colour with an underline, the accent only on hover. It belongs on an about or news page; on the homepage it is at most three items.
**Motion pairing:** `vault/elements-reveal-on-scroll.md`; for a long list, `mwg/effect030.md` (image in a mask following the cursor over list items) to show the clipping on hover in `deep-ground-editorial`.
**Sources:** [Brilliant](https://mobbin.com/sites/sections/acc0f0fa-3c7a-4ebd-824a-57033d1691ef), [Webflow](https://mobbin.com/sites/sections/abb995c6-cb01-46b5-b957-05f02fed683d), [Headspace](https://mobbin.com/sites/sections/3f1e58db-d15e-4531-92c9-54995d6eebf6), [Grain](https://mobbin.com/sites/sections/b37b6944-18e6-42d1-9233-a809699a0830), [Apollo](https://mobbin.com/sites/sections/0b7fe314-2904-46cb-9638-0658fb5d50df)

## Single-sourced techniques

Flagged: each seen on one site only. Use as a technique inside a pattern above, not as a section on its own.

### Logo cells that link to the case
**Anatomy:** A hairline logo grid, 3 columns, where every cell carries a small circular arrow chip at its right edge and the whole cell links to that client's case. Tiny crosshair marks sit at the outer grid corners.
**Why it works:** It turns decoration into navigation, and the logo wall becomes the case index.
**Fits:** `deep-ground-editorial`, `billboard-condensed` · **Breaks:** none structurally
**House translation:** The arrow chip takes the accent, since it is an arrow tile (`### Button plus a detached arrow tile`).
**Motion pairing:** Arrow nudge on cell hover, CSS only.
**Sources:** [Vercel](https://mobbin.com/sites/sections/76d76107-7f3e-4d7f-83fe-05ada90d5c26) (single-sourced)

### Brick-bond logo grid
**Anatomy:** A full-bleed hairline logo grid in 4 columns whose second row is shifted half a cell, like brickwork, directly under a testimonial with a "02/06" counter and arrow chips.
**Why it works:** It breaks the spreadsheet feel of an equal grid at no cost, which suits heavy industry (the source is trucking).
**Fits:** `billboard-condensed`, `flood-and-acid` · **Breaks:** `warm-daylight`
**House translation:** Square cells, monochrome logos.
**Motion pairing:** Rows drifting opposite ways via `mwg/effect024.md`, only in the energetic directions.
**Sources:** [Aurora](https://mobbin.com/sites/sections/0863a939-7a31-4629-b0a2-cbde88e9fcb1) (single-sourced)

### Stat tiles with corner ticks
**Anatomy:** A horizontally scrolling strip of hairline stat tiles. Each tile has small tick marks at its four corners (like crop marks), a tiny mono uppercase label top-left ("NAUWKEURIGHEID OVER ALLE BETAALMETHODEN") and a large number bottom-left.
**Why it works:** The crop marks read as technical and measured, and suit engineering or data clients.
**Fits:** `deep-ground-editorial`, `billboard-condensed` · **Breaks:** `warm-daylight` (uppercase mono)
**House translation:** Ticks in the text colour at low opacity.
**Motion pairing:** `vault/draggable-marquee-directional.md` for the strip.
**Sources:** [Spade](https://mobbin.com/sites/sections/34a2151f-c9b2-4121-b790-8e85202fe9ca) (single-sourced)

### The number drawn as its own graphic
**Anatomy:** Stat tiles in which the figure is repeated as a small dot-matrix or bar illustration in the tile's free corner: a triangle of dots, three rising bars, a staircase of circles.
**Why it works:** It makes a dry number glanceable and illustrates it without stock imagery.
**Fits:** `flood-and-acid`, `deep-ground-editorial` · **Breaks:** `billboard-condensed`
**House translation:** Dots in the deep brand colour plus the tinted neutral, never the accent. Tiles tinted, not shadowed.
**Motion pairing:** Dots pop in with a stagger on entry.
**Sources:** [Aave](https://mobbin.com/sites/sections/02770c29-a1ea-4602-894f-9a59a779f0ea) (single-sourced)

### The archival founder portrait
**Anatomy:** On a deep brand ground: an old photograph of the founder in a rounded frame, centred, above a display line ("Het begon met Esra, in 1920") and a short centred paragraph.
**Why it works:** For family firms and co-ops it is the strongest "since" proof there is, stronger than any founded-in number.
**Fits:** `warm-daylight`, `billboard-condensed` · **Breaks:** `flood-and-acid`
**House translation:** Leave the archive photo ungraded (documentary rule). No illustrations around it.
**Motion pairing:** `vault/masked-text-reveal.md` on the line.
**Sources:** [Busy Bee Honey](https://mobbin.com/sites/sections/1ce4f1eb-dd59-42af-a8eb-35111a2a2323) (single-sourced)
