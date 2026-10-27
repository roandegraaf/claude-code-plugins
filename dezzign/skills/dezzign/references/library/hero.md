# Library — Hero

Outside inspiration from Mobbin (swept 2026-09-30), translated into house rules. Not evidence from our own builds — `stramien.md` stays the source of truth; this file is the variant pool that step 5 of SKILL.md draws from to avoid the default spine.

The stramien already owns the four hero types (video, photo with scrim, flat colour field, split),
`### One highlighted word`, `### The photo tile as a glyph`, `### A brand clip shape` and
`### Overlap as a joining device`. Everything below is either a new composition or a named variant
that says how it differs from one of those. Sweep covered industrial, logistics, agri/food,
construction, real estate, workwear/apparel, healthcare, hospitality, education, institutions,
B2B services and SaaS. All proportions are read off low-res screenshots and are estimates.

## Patterns

### Stacked headline over an inset media plate
**Anatomy:** Headline first, centred or left, on the plain ground at roughly 50-65% of the container
width, one short paragraph and one or two CTAs under it. Below, a single wide media plate (photo or
muted looping video) inset from the viewport with the page gutter on both sides, rounded to the
direction's card radius, roughly 16:9 to 2:1. The plate starts about 60-70% down the first viewport
so its top edge is visible above the fold and pulls the eye down. A caption can sit bottom-left
inside the plate ("Building the future / Our story") with a small play disc bottom-right.
Flipped variant: the plate comes first and the headline sits under it at near-container width
(media-first stack), which reads as editorial rather than commercial.
**Why it works:** The headline gets a clean, unscrimmed ground so the type can be light and long; the
photo keeps its full colour because nothing is printed on it. It is the calmest way to lead with
real photography.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `billboard-condensed` (an inset plate shrinks the scale claim its full-bleed footage makes; use it there only on inner pages, with square corners)
**House translation:** No drop shadow under the plate — Mobbin's Titan and Mews both float it on a
blurred shadow; replace with nothing, or a hairline if the photo is pale. Play disc in the ground
colour, not the accent.
**Motion pairing:** `vault/scaling-element-on-scroll-gsap-flip` or `vault/image-to-background-zoom` to let the plate grow to full-bleed as the page scrolls; `vault/media-setup-autoplay-hover-click` for the muted loop.
**Sources:** [Humble](https://mobbin.com/sites/sections/7c7c11a9-a1d7-4518-bad2-9df715dd0fb3), [Titan](https://mobbin.com/sites/sections/620ed8ea-b304-4370-b183-b5bf23203bb3), [Biograph](https://mobbin.com/sites/sections/20c4600f-d3e9-49b5-afad-b94dcb8fd0e9), [Webflow](https://mobbin.com/sites/sections/c3883fc2-c43e-4c0e-8d5a-d2d78138906b), [Figma](https://mobbin.com/sites/sections/a71454ea-a391-4201-a691-5c350b6eece1), [Loom](https://mobbin.com/sites/sections/200f981e-af2c-410f-b573-b87d03d0b40f), media-first: [MOUTHWASH Studio](https://mobbin.com/sites/sections/0e035b6e-f0ab-416e-9ade-af96d4542658), [BitcoinOS](https://mobbin.com/sites/sections/744a8baf-ae51-43ce-916d-7ac79130e96d)

### Headline over an unequal tile pair
**Anatomy:** Headline top-left in the first third of the viewport, left-aligned, no media beside it.
Under it a row of two tiles at equal height and unequal width, roughly 1:2 or 1:3. The wide tile is
a documentary photo; the narrow one is either a second smaller photo top-aligned and shorter
(T1 Energy: building left, worker in the field right), a flat brand-pattern tile (Ease: concentric
arcs in the brand tint), or a stadium-shaped panel carrying a two-line fact and a small CTA
(Fauna Robotics). The tiles can bleed off the left or right viewport edge.
**Why it works:** It breaks the symmetry of the single hero photo without a collage, and the small
tile gives the brand pattern or one fact a place to live above the fold.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `billboard-condensed` (rounded tile pairs read soft; it wants one full-bleed image)
**House translation:** The pattern tile is the tinted neutral or the deep brand colour, never the
accent. Radius from the direction's ladder; both tiles share it.
**Motion pairing:** `vault/parallax-image-layers` with the two tiles moving at slightly different speeds.
**Sources:** [T1 Energy](https://mobbin.com/sites/sections/e65538de-469a-47f1-ab76-acfe43328bb4), [Ease](https://mobbin.com/sites/sections/6695790f-7142-4e99-86a9-2632963b795d), [Fauna Robotics](https://mobbin.com/sites/sections/1f935ff6-b667-475a-8ada-27d0ddeaffaf)

### Two-tone headline
**Anatomy:** One headline, two tones of the same ink. The first clause is full-strength text colour,
the second (or the first, as a category label) drops to a muted grey or a 40-50% tint of the text
colour: "Advancing the energy shift / *from Austin, Texas*", "*Primary Care* / Multiply your clinical
capacity overnight." Same size, same weight, same family. Style variant: the second line switches to
the italic of the same serif instead of changing tone ("We build / *technology.*").
**Why it works:** It gives a long headline a reading order and a place to put the where/for-whom
without an eyebrow, and it never touches the accent.
**Differs from** `### One highlighted word`, which promotes one word; this demotes a whole clause.
**Fits:** `deep-ground-editorial`, `flood-and-acid`, `billboard-condensed` · **Breaks:** `warm-daylight` only if the muted clause gets lighter than the 300-400 display — there, step the weight up on the key phrase instead
**House translation:** The muted tone is a neutral, never a tint of the accent. On dark grounds use
the text colour at ~50% alpha, not a new grey.
**Motion pairing:** `vault/highlight-text-on-scroll` to fill the muted clause to full strength as it scrolls in.
**Sources:** [T1 Energy](https://mobbin.com/sites/sections/e65538de-469a-47f1-ab76-acfe43328bb4), [Titan](https://mobbin.com/sites/sections/620ed8ea-b304-4370-b183-b5bf23203bb3), [Amigo](https://mobbin.com/sites/sections/dcd77131-0901-4971-929e-00773c34a5f3), [V7](https://mobbin.com/sites/sections/68f525da-f2a0-426d-b75a-7fc9c0764d48), [Vercel](https://mobbin.com/sites/sections/bfdd6f6e-3296-4d9c-9041-413c0a935926), [Ramp](https://mobbin.com/sites/sections/8f409c57-8780-457d-a081-8ddf92018fad), italic variant: [Microsoft AI](https://mobbin.com/sites/sections/82da3bf2-f159-4d11-b94c-d107867ca700), [Givingli](https://mobbin.com/sites/sections/cab5ff89-d22d-49a4-9824-988f6c7b090d)

### Bottom-anchored full-width headline
**Anatomy:** Full-bleed photo or video. The headline sits on the bottom edge of the hero, set so its
longest line spans nearly the whole container (80-100% width), with the subject of the photo
standing above it or partly behind it. A one-line subline and two small pill CTAs go directly under
it, bottom-left. Two treatments: condensed uppercase at container width (Eventbrite, Zipline,
United Carriers), or a light sans set in a translucent tint of the ground so the photo shows through
the letters (Rains: "Winter Jackets" in grey over the model's jacket).
**Why it works:** The type becomes part of the photograph rather than a label on it; the top two
thirds stay free for the subject's face or the machine.
**Differs from** the stramien's video hero (`ul`), where type sits over the footage at any height;
here the baseline is pinned to the hero's bottom edge and the width is fitted.
**Fits:** `billboard-condensed`, `deep-ground-editorial` · **Breaks:** `warm-daylight` (display at this scale is too loud for a reassurance brand)
**House translation:** Scrim only the bottom band where the type sits (`### Scrim only where type
sits`). The translucent-letter treatment only on a dark or mid-tone photo; keep white or ground
colour, never the accent.
**Motion pairing:** `vault/fit-text-to-width` to lock the line to the container; `vault/masked-text-reveal` for a per-line clip entrance.
**Sources:** [Rains](https://mobbin.com/sites/sections/1a3f80c6-f077-431f-bfbb-86e112030dda), [Eventbrite](https://mobbin.com/sites/sections/2541eadd-ad2c-44c6-801b-55d54119f0e7), [Zipline](https://mobbin.com/sites/sections/3faf1b1e-c7e9-489b-bd53-552643429c38), [Waabi](https://mobbin.com/sites/sections/0345226a-541f-4607-89b7-b6e0923cb872), [Locomotive](https://mobbin.com/sites/sections/6a2f519f-af72-4525-a6ca-2ef3457bdf63)

### Headline crossing the media edge
**Anatomy:** A portrait or landscape media card sits in the middle of the hero on a plain ground. The
headline is set larger than the card is wide and runs across it — starting on the ground, crossing
the image, ending on the ground again (Superpower: "THE WORLD'S / HEALTHIEST HOODIE" over a portrait
card), or it sits above the card with its last line overlapping the card's top edge (Webflow about:
the fourth line lands on the team photo). Oryzo does the same with a product object floating behind
a giant word inside a dotted frame.
**Why it works:** One overlap makes a flat page feel layered without any shadow, and it ties the
headline to the photo so they read as one object.
**Fits:** `flood-and-acid`, `campaign-poster`, `deep-ground-editorial` · **Breaks:** `warm-daylight` (the overlap reads staged; trust brands keep type off the faces)
**House translation:** Depth by overlap only, which is already a house device. Make sure the part of
the headline over the photo stays legible — pick a photo region that is flat in tone, or set the
crossing words in the ground colour over a dark image.
**Motion pairing:** `vault/parallax-image-layers` so card and type drift at different rates.
**Sources:** [Superpower](https://mobbin.com/sites/sections/57a1e1f4-c526-4fcf-be1d-6ec3bbec1753), [Webflow](https://mobbin.com/sites/sections/7d48bf03-9f8a-4bfa-ad21-239e0dc0adb0), [Oryzo](https://mobbin.com/sites/sections/9094cd19-0b82-4e71-9490-72ac3060d2e7)

### Four-corner meta frame
**Anatomy:** The hero's corners carry small meta text in a mono or small sans, and the headline or
media owns the centre. Typical slots: top-left provenance ("Designed & assembled in …"), bottom-left
a footnote-style claim ("[1] A first-of-its-kind …"), bottom-right a short fact list
("100% biodegradable / 0% toxins"), and optionally a live local time next to the logo
("Toronto, Canada 0:23 am", "12:34 UTC+7", "5:28 AM NYC"). Farm Minerals splits the actual copy the
same way: headline top-left, second statement plus paragraph plus CTA bottom-right.
**Why it works:** The corners frame the hero like a spec sheet, which reads as precise and
manufactured — useful for makers and technical firms — and the live clock is a cheap "we are real
people somewhere" signal.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `campaign-poster` · **Breaks:** `warm-daylight` when the meta is uppercase mono; in sentence case it can carry opening hours instead of a clock
**House translation:** Meta text in the text colour at reduced opacity, never the accent. At most
three corners; the fourth belongs to the nav or the CTA.
**Motion pairing:** `vault/dynamic-current-time` for the clock; `vault/text-scramble-load-scroll-hover` on the meta lines at load.
**Sources:** [Superpower](https://mobbin.com/sites/sections/57a1e1f4-c526-4fcf-be1d-6ec3bbec1753), [Farm Minerals](https://mobbin.com/sites/sections/2bb8e438-aba5-4bcc-9d43-a89ab22765f7), [Sunday](https://mobbin.com/sites/sections/c12698b6-7d3b-49af-82f8-7ef6fc404529), [Heron AI](https://mobbin.com/sites/sections/76dab96c-c33d-4d52-944b-7d32dc2274fa), clock: [Vucko](https://mobbin.com/sites/sections/9b0c885b-5f6f-4b73-b93c-b84d830f0071), [Koto](https://mobbin.com/sites/sections/2ce48fe2-bea1-438e-a2aa-0b1af12f7996), [General Intelligence Company](https://mobbin.com/sites/sections/63fe77e8-d64b-4ccd-9d51-282750dec81c)

### Caption panel on the photo
**Anatomy:** Full-bleed photo; the headline, paragraph and CTA live inside one panel placed on the
photo rather than on a scrim. Two branches.
*Frosted:* a translucent, blurred panel (backdrop blur, ~20-40% white or dark fill, hairline border,
card radius) at roughly one third of the width, left or in a corner. Graza puts a small seasonal fact
card top-right ("Now serving olives from Jaén · harvesting season Oct-Jan"); Amigo stacks a column of
frosted feature labels on the photo with the active one fully opaque.
*Solid:* an opaque panel in the ground colour overlapping the photo's lower corner or left third,
holding the headline and one button (OpenTable, Sketch's article card breaking out of the photo's
bottom-right edge).
**Why it works:** The photo stays unscrimmed and full-colour; the panel is the one legible zone, and
the frosted version adds depth with no shadow at all.
**Differs from** `plantion`'s white nav card overlapping the hero: that is navigation; this is the
hero copy itself.
**Fits:** `warm-daylight` (solid, with the seasonal/hours fact as a trust device), `deep-ground-editorial` (frosted) · **Breaks:** `billboard-condensed` (glass reads consumer-soft against heavy uppercase)
**House translation:** Mobbin's OpenTable card carries a drop shadow — drop it; a solid panel on a
photo needs no shadow to separate. Frosted panels get a hairline, not a glow.
**Motion pairing:** `vault/opening-hours-timetable` if the panel carries live hours.
**Sources:** frosted: [General Intelligence Company](https://mobbin.com/sites/sections/63fe77e8-d64b-4ccd-9d51-282750dec81c), [Graza](https://mobbin.com/sites/sections/fabe4995-a146-4090-900e-b2a6165baf92), [Amigo](https://mobbin.com/sites/sections/dcd77131-0901-4971-929e-00773c34a5f3); solid: [OpenTable](https://mobbin.com/sites/sections/4367b2d2-ebca-41fe-a857-eaee7eac1f9d), [Sketch](https://mobbin.com/sites/sections/0aa61d33-7cfb-43eb-b005-55c4718fb1f5)

### Ruled baseline strip
**Anatomy:** The hero ends in a strip of three or four equal cells divided by 1px hairlines, docked to
the hero's bottom edge and spanning the container. Each cell holds one short USP, stat or fact with a
small icon right-aligned ("Live in 11 days", "100% refund if we miss", "SOC 2"), or a number plus
label ("357% average client value growth"). Heron AI takes it further: the headline itself sits in
the left cell of a ruled bottom bar, a paragraph in the middle cell, the CTA in the right cell, and a
ticker of short claims runs along the bottom rule.
**Why it works:** It moves the proof strip that the default spine puts in slot 4 into the hero
itself, so the fold ends on facts instead of a scroll cue.
**Fits:** `billboard-condensed`, `deep-ground-editorial`, `flood-and-acid`, `warm-daylight` (sentence case, review score in one cell) · **Breaks:** `campaign-poster` (a ruled spec strip reads corporate)
**House translation:** Hairlines only, no card backgrounds per cell (Mobbin's Jasper boxes each stat
on a shadowed card — that version is out). Numbers in the text colour; the accent at most on one
icon.
**Motion pairing:** `vault/number-odometer` on the figures; `vault/css-marquee` for the ticker line.
**Sources:** [Humble](https://mobbin.com/sites/sections/ff333f58-f578-4221-8c24-e510e2a74d67), [Heron AI](https://mobbin.com/sites/sections/76dab96c-c33d-4d52-944b-7d32dc2274fa), [TinyWins](https://mobbin.com/sites/sections/eb379572-6bc5-4f91-8ad9-ef6a2ff09f11), [Voiceflow](https://mobbin.com/sites/sections/55a5e8f2-1e4b-4641-ad6d-52e0d15e62e9), [Slack](https://mobbin.com/sites/sections/535d42a0-63e2-4735-8ac2-c5c4cedf47e7), [Shopify Plus](https://mobbin.com/sites/sections/3523b8f5-5edc-48dd-a21d-4b817e46b4b1)

### Docked jump bar on the seam
**Anatomy:** A small horizontal bar of in-page anchor links (About / Why us / Process / Team) or
sub-section tabs sits exactly on the seam between hero and the next section, half on each. It is a
white or ground-coloured pill or rounded bar, centred (MindMarket, where the next section rises with a
curved top edge behind it), a full-width sub-nav docked under the hero photo with an underline on the
active item (Eventbrite), a "(Jump to) Strategy Brand Digital …" row above an image band (Koto), or
a pill tab group bottom-centre over a product scene (Poly). Flim puts a search pill on the same spot.
**Why it works:** Inner pages with four or five long sections get a table of contents that also
visually stitches hero and body together.
**Differs from** `### Overlap as a joining device`: that overlaps content; this overlaps navigation.
**Fits:** `warm-daylight`, `flood-and-acid`, `deep-ground-editorial` · **Breaks:** `billboard-condensed` homepages (it wants the hero uninterrupted), fine on its inner pages
**House translation:** The bar is flat — ground colour plus hairline, radius from the pill end of the
ladder. Active item marked by weight or an underline, the accent only on the active dot if at all.
**Motion pairing:** `vault/lenis-scroll-to-anchor-target`; make it sticky after it leaves the seam with `vault/check-section-theme-on-scroll`.
**Sources:** [MindMarket](https://mobbin.com/sites/sections/96f32b7e-e4fa-4626-bb59-4fdcc5ad4a29), [Eventbrite](https://mobbin.com/sites/sections/2541eadd-ad2c-44c6-801b-55d54119f0e7), [Koto](https://mobbin.com/sites/sections/2ce48fe2-bea1-438e-a2aa-0b1af12f7996), [Poly](https://mobbin.com/sites/sections/954077a6-b1a9-4625-8e1f-5e0d6fc7783d), [Flim](https://mobbin.com/sites/sections/53edfd60-6dbf-435b-b50d-465e56622e72)

### Autoplaying tab hero
**Anatomy:** A row of four to six text tabs (Automate / Create / Analyze …) sits above or directly
under a centred headline; the active tab is a filled pill, the rest plain text. The media below — a
product screenshot, a photo scene — swaps per tab, and the tabs auto-advance on a timer with a small
pause button at the end of the row (Sana) or a "03 / 05" counter with arrows (Givingli). The rich
variant uses illustrated tiles as tabs, one per audience (Sellers, Founders, RevOps), with the
active tile coloured and a content panel underneath (Amplemarket), or tabs beside a person cut-out
over a panel (Intercom: Support teams / Sales teams / Marketing teams).
**Why it works:** One hero can show several products or audiences without a carousel's hidden-slide
problem — every option is labelled and visible.
**Differs from** `trapxpress`'s switcher (single-sourced in the stramien): these add autoplay with
an explicit pause, and the audience-tile variant. Six Mobbin sources firm the technique up.
**Fits:** `warm-daylight`, `flood-and-acid` · **Breaks:** `billboard-condensed` (the motion there is clip reveals and scale, not interface), `campaign-poster`
**House translation:** Active pill in the text colour or the deep brand colour, not the accent. The
pause control is required whenever it autoplays (accessibility).
**Motion pairing:** `vault/bouncy-content-tabs`.
**Sources:** [Sana](https://mobbin.com/sites/sections/7f35e77e-e242-4333-809d-49fc3156ba43), [Affinity](https://mobbin.com/sites/sections/2413e6dd-120f-418c-8355-710867916366), [Headspace](https://mobbin.com/sites/sections/7778c75a-7f4e-4f1d-91ca-13c70d1b041f), [Givingli](https://mobbin.com/sites/sections/cab5ff89-d22d-49a4-9824-988f6c7b090d), [Amplemarket](https://mobbin.com/sites/sections/85de217d-baba-4edb-8805-3d2a76f2244b), [Intercom](https://mobbin.com/sites/sections/b9f7dbfa-d550-49d2-a17a-a4d00d6c626f)

### Search-first hero
**Anatomy:** A short greeting headline ("Hi, what do you want to learn?", "Hoe kunnen we helpen?"),
centred, and directly under it one wide search field at roughly 40-55% of the container with a
button or icon inside its right end. Under the field a row of five to eight chip shortcuts to the
most common queries or categories, or a 4-up grid of hairline topic tiles (Vercel). On a vacancies
page the search sits on a brand-pattern or photo field with the page title above it (HBO Max jobs).
The hero often ends in rounded bottom corners so the results section below reads as a new ground.
**Why it works:** For a kennisbank, vacancy overview, product catalogue or dealer finder the visitor
arrives with a question; the hero answers by handing them the tool.
**Fits:** `warm-daylight` (echoes `trapxpress`'s live search overlay), `flood-and-acid` · **Breaks:** `deep-ground-editorial` and `billboard-condensed` homepages — use it on their inner pages only
**House translation:** Field styling follows `### Form field styling follows the direction's
radius`. Chips are hairline pills; none of them filled with the accent except the submit button.
Mobbin's Campsite, Square and Serus lift the field on a shadow — use a 1px border instead.
**Motion pairing:** `vault/looping-words-with-selector` or `vault/rotating-text` to cycle example queries in the placeholder.
**Sources:** [Airbnb](https://mobbin.com/sites/sections/04ec26fb-062e-4210-815d-08ef23fa0888), [Craft](https://mobbin.com/sites/sections/1509a6d6-fa2f-4b1e-ba6e-da143d4d7e06), [Vercel](https://mobbin.com/sites/sections/bfdd6f6e-3296-4d9c-9041-413c0a935926), [HBO Max](https://mobbin.com/sites/sections/cf6d2220-e176-4cdd-8fc7-69e50637802a), [Wix](https://mobbin.com/sites/sections/11a8463a-a09e-4782-ab13-4fa159da3b67), [Webflow](https://mobbin.com/sites/sections/d832d307-9c5a-4330-b728-e53c10fa450f), [MasterClass](https://mobbin.com/sites/sections/9f675c1d-72a7-4b4d-9140-ae02317bc666)

### Collage frame around a centred headline
**Anatomy:** A centred two-line headline and one CTA hold the middle third of the hero. Around them,
six to fifteen photos of mixed size and aspect are scattered to the edges, some cropped by the
viewport, none overlapping the type. Density ranges from sparse (Aurora: four small, pale photos
floating at the corners; Inkwell: circular portraits drifting) through a structured frame (OpenTable:
two rows of rounded photos above and below a colour band) to a dense wall (Readymag: a pinboard of
snapshots on a dark green field). Faire and Givingli add objects at slight rotations.
**Why it works:** It shows many real people, products or places at once without a grid, and it gives
hospitality, food and team pages warmth that one hero photo cannot.
**Fits:** `campaign-poster`, `flood-and-acid`, `warm-daylight` (hospitality, co-ops, "werken bij") · **Breaks:** `billboard-condensed`, `deep-ground-editorial` (both want one strong image, not many)
**House translation:** Photos flat on the ground — no shadows, no polaroid frames with drop shadows.
Rotation within ±6° if used (`### Rotation as a layout device`). Field colour is the ground or the
deep brand colour; only `campaign-poster` may flood it with the accent.
**Motion pairing:** `mwg/free-effect001` (Inertia: photos nudge away on hover), `mwg/effect025` (Randomize & Focus), or `mwg/effect014` (Infinite stacking images) for a scroll-built collage.
**Sources:** [Faire](https://mobbin.com/sites/sections/bb9d6f0e-3c16-49fd-b872-332a0e46261a), [OpenTable](https://mobbin.com/sites/sections/816e816c-912a-4fa9-9673-00d7200ec4c3), [Readymag](https://mobbin.com/sites/sections/fbdeae79-9c95-4a76-bba0-8efa93b731b2), [Aurora](https://mobbin.com/sites/sections/67805fd8-a745-4bd0-a9c4-f27f2b3730c7), [Inkwell](https://mobbin.com/sites/sections/d3d530a1-2a62-4ccf-8fec-ac7f8427f6e4), [Givingli](https://mobbin.com/sites/sections/cab5ff89-d22d-49a4-9824-988f6c7b090d)

### Twin-panel hero
**Anatomy:** Two rounded panels side by side on the page ground, gutter between them, equal height,
50/50 or 45/55. Left is a solid panel (dark brand colour or black) carrying eyebrow, headline,
paragraph and CTA; right is a photo panel, often with a product screen or a row of chips on it
(Mews). Audience-fork variant: both panels are CTAs for different people, each with its own
headline and button ("Start your independent journey" / "Hire top independents" — Contra). Location
variant: left panel is a white card with a place name, address and opening hours, right is a photo
with "Book a drive" (Rivian). Lemon Squeezy and Dropbox run the same split edge-to-edge without
radius.
**Why it works:** It turns the split hero into two objects on a ground, which is the house's
panel-on-ground idea applied to the fold.
**Differs from** stramien split type 4 (copy and media on one ground) and `### The audience fork`
(two buttons): here each half is its own panel.
**Fits:** `flood-and-acid`, `warm-daylight`, `deep-ground-editorial` · **Breaks:** `billboard-condensed` (rounded panels; use the edge-to-edge square variant there)
**House translation:** Panels separated by the ground, never by a shadow. The solid panel is the deep
brand colour — the accent stays on its button. Mews' notched panel corner is a brand-clip idea; only
if the client has a shape.
**Motion pairing:** `vault/auto-image-cycle-slideshow` inside the photo panel.
**Sources:** [Mews](https://mobbin.com/sites/sections/9f27c0cd-d796-4577-a68e-c253c571ea9d), [Contra](https://mobbin.com/sites/sections/0e71cc83-e290-499f-8060-cdae5f763d98), [Rivian](https://mobbin.com/sites/sections/cb7032a4-86c3-4b9a-8641-04ade2ebc1a4), [Lemon Squeezy](https://mobbin.com/sites/sections/6a4b2c41-a872-4429-ba25-94818df81435), [Dropbox](https://mobbin.com/sites/sections/12bf5fc5-8b0d-4988-969f-99b80e589e17)

### Editorial inner-page hero
**Anatomy:** No photo above the fold. A small page title at body-to-h3 size sits top-left ("Our
services", "About Webflow", "Services"), and the actual statement sits to its right starting around
the 40-45% column, set large and often muted ("Strategy. Brand. Digital. Campaign. Working together
to tackle your toughest challenges."). Optionally a (Jump to) row of section links under it, then a
letterbox image band — full container width, only ~20-30% of the viewport tall — before the first
content section. basement.studio puts a portrait image in the middle column between title and
paragraph; KOBU's hotel page is the warm version: mono location eyebrow, title, paragraph and a
"Book now ↗" text link left, one tall photo right.
Letterbox variant for quick inner pages: a short, wide photo band with the page title bottom-left
on it and nothing else (Wise).
**Why it works:** Inner pages stop being a smaller copy of the homepage hero; they read like a
chapter opening, and the letterbox keeps the first real content above the fold.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `warm-daylight` (sentence case, no mono) · **Breaks:** `campaign-poster` (too quiet)
**House translation:** Title in the display family at a small size, statement at display size in a
muted text tint — never the accent. Letterbox band square or rounded per direction.
**Motion pairing:** `vault/masked-text-reveal` on the statement; `vault/lenis-scroll-to-anchor-target` for the jump row.
**Sources:** [Koto](https://mobbin.com/sites/sections/2ce48fe2-bea1-438e-a2aa-0b1af12f7996), [basement.studio](https://mobbin.com/sites/sections/caa1a6b1-4b01-4b6a-8d30-df5454015bbf), [Webflow](https://mobbin.com/sites/sections/c3883fc2-c43e-4c0e-8d5a-d2d78138906b), [KOBU](https://mobbin.com/sites/sections/79b3c5a4-83c8-46f4-a63a-fcd4697964cd), letterbox: [Wise](https://mobbin.com/sites/sections/726c71cf-ae08-4542-b24d-18bd7191c51a), [Blue Apron](https://mobbin.com/sites/sections/6ec6fe52-1942-4fd5-94ed-b1c88c8a692b)

### Type at architectural scale
**Anatomy:** One word — the brand name, a product name or a model number — set so large it becomes a
surface. Branches: an edge-to-edge wordmark fitted to the viewport width on a plain ground (KOBU,
Koto's "seasoned"), a giant word cropped by the hero's bottom edge with a smaller two-line headline
above it (Craft Agency: "Unearthing what's next / since 2014" over "Craft"), a giant model name
centred in a triptych row with a tagline left and spec plus CTA right, all on one baseline over the
photo (Samara: "Small living, supersized." · "XL10" · "Two bedrooms, two baths, 950 sq ft"), or a
ghost numeral behind a product cut-out (Zipline's white "P1" behind the drone).
**Why it works:** It gives a hero with no strong photography a single, confident object, and a model
number or place name at this size carries a lot of brand for free.
**Fits:** `billboard-condensed`, `flood-and-acid`, `campaign-poster` · **Breaks:** `warm-daylight` (scale reads as shouting), `deep-ground-editorial` only if the weight goes heavy — a light giant word is fine there
**House translation:** Display line-height locked to 1.0. The giant word in the text colour, the
ground or a ghost tint of it — not the accent.
**Motion pairing:** `vault/fit-text-to-width`; `mwg/effect015` (Title mask effect) or `mwg/effect027` (Letter by letter) for the entrance.
**Sources:** [KOBU](https://mobbin.com/sites/sections/92720ac4-a34f-4460-854c-ba4c969c697e), [Koto](https://mobbin.com/sites/sections/c2512198-ddc8-43aa-bac7-2a47cd359aac), [Craft Agency](https://mobbin.com/sites/sections/5342aaa1-d976-4d7d-8950-faeaa9f772e4), [Samara](https://mobbin.com/sites/sections/19d48f9c-20f5-4d4e-84a8-a0abfcf2133c), [Zipline](https://mobbin.com/sites/sections/ce7e2b2b-54f9-4a13-952e-4a895a0f7c30), [Oryzo](https://mobbin.com/sites/sections/551396a6-dfb4-49f9-87dd-2afee304a3de)

### Staggered headline
**Anatomy:** The headline's lines do not share a left edge. Branches: a hanging indent, where line
two starts further right than line one ("Real fats, / real flavor." — Savor; Webflow sets the whole
headline from the ~30% column with a small label hanging at the far left), a split-flush headline
where the first half is left-aligned against the left edge and the second half right-aligned against
the right edge on the same two rows (TinyWins), and a trailing phrase pushed to the right of the last
line ("since 2014" — Craft Agency). The rest of the hero stays plain: one paragraph and CTA at the
right, or a staggered row of photos at different heights underneath (Savor).
**Why it works:** Changing the rag is a zero-asset way to make a type-only hero feel composed, and it
creates diagonal movement through the fold.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `flood-and-acid`, `warm-daylight` (hanging indent only, light weight) · **Breaks:** none outright; keep it to one headline per page
**House translation:** Pure typography, nothing to strip. The split-flush version needs at least
three words per half or it reads like a layout bug.
**Motion pairing:** `vault/masked-text-reveal` per line, staggered left-to-right.
**Sources:** [Savor](https://mobbin.com/sites/sections/586e08bf-f06e-4acf-a87a-ecbd3d249833), [Webflow](https://mobbin.com/sites/sections/c3883fc2-c43e-4c0e-8d5a-d2d78138906b), [TinyWins](https://mobbin.com/sites/sections/eb379572-6bc5-4f91-8ad9-ef6a2ff09f11), [Craft Agency](https://mobbin.com/sites/sections/5342aaa1-d976-4d7d-8950-faeaa9f772e4)

### Boxed-word highlight
**Anatomy:** One word or phrase in the headline sits inside a tight solid box, like a highlighter or
a label: text in the ground colour on a text-colour box ("YOU **LOVE**" inverted — Patch), or an
accent-coloured box behind "What's" with the rest of the headline plain (Sketch).
**Why it works:** It emphasises without a second colour of type, and it reads as marked-up by a
person — good for campaign and training sites.
**Differs from** `### One highlighted word`, which recolours the letters; here the letters keep
their colour and a box goes behind them.
**Fits:** `flood-and-acid`, `campaign-poster` · **Breaks:** `warm-daylight`, `deep-ground-editorial` (reads loud)
**House translation:** One box per page. An accent-coloured box is acceptable only because it is
word-sized — that is still punctuation, not a field.
**Motion pairing:** `vault/highlight-marker-text-reveal`.
**Sources:** [Patch](https://mobbin.com/sites/sections/07c4ed44-77b5-432c-b087-ce16f7e9931d), [Sketch](https://mobbin.com/sites/sections/0aa61d33-7cfb-43eb-b005-55c4718fb1f5)

## Single-sourced techniques

Seen on one Mobbin site only. Treat as techniques to try, not patterns.

### Inline portraits in a sentence-case headline
**Anatomy:** Circular headshots sit between the words of a two-line centred headline, each at cap height ("Start ◯ Work ◯ with / a ◯ Play ◯ Button").
**Why it works:** Puts real faces in the hero of a careers or team page without a photo block.
**Fits:** `flood-and-acid`, `warm-daylight` (careers pages) · **Breaks:** `billboard-condensed` (it already owns the square photo-tile glyph)
**House translation:** The sentence-case, circular variant of `### The photo tile as a glyph`; same one-headline-per-page limit.
**Sources:** [Loom](https://mobbin.com/sites/sections/63d0fe5d-69e0-47bc-90e2-81f364d8c4d6)

### Product hotspots with weather toggle
**Anatomy:** A product cut-out on a light ground with small square hotspot markers on its parts, a ghost model number behind it, and a two-state toggle above ("Sunny / Stormy") that swaps the scene.
**Why it works:** Lets a machine or installation explain itself in the hero.
**Fits:** `billboard-condensed`, `flood-and-acid` (industrial and installation clients) · **Breaks:** `warm-daylight`
**House translation:** Markers in the accent are fine at dot scale.
**Sources:** [Zipline](https://mobbin.com/sites/sections/ce7e2b2b-54f9-4a13-952e-4a895a0f7c30)

### Vertical utility rail
**Anatomy:** A narrow white rail down the hero's right edge with the menu icon on top, shipping info rotated 90° in the middle and cart, account and language icons at the bottom; the photo fills the rest.
**Why it works:** Keeps utility info out of the photo and off a topbar.
**Fits:** `warm-daylight` (shops), `deep-ground-editorial` · **Breaks:** `billboard-condensed`
**Sources:** [Escape Cafe](https://mobbin.com/sites/sections/458fe700-42b9-4932-83fc-4f7ceb6db9a8)

### Logo in a notch
**Anatomy:** The dark hero's top edge has a rounded tab bitten out of it where the client logo sits on the page ground, like a folder tab.
**Why it works:** Makes the hero a panel and the logo its label; nice on partner or dealer detail pages.
**Fits:** `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `billboard-condensed`
**Sources:** [Miro](https://mobbin.com/sites/sections/2f52c788-4083-48dd-adcc-84562883bfd9)

### Line-per-panel headline
**Anatomy:** Each line of a three-line headline sits in its own full-width rounded colour bar, stacked with a small gap, with tiny bracketed labels at both ends of each bar and a tab row under the stack.
**Why it works:** Turns a headline into a built object.
**Fits:** `campaign-poster` · **Breaks:** everything else (field-scale colour)
**Sources:** [Raw Materials](https://mobbin.com/sites/sections/04eee6d1-d78e-4674-b7be-e6c1823fb36a)

### Hand-drawn ring around one word
**Anatomy:** A loose single-stroke ellipse drawn around one word of the headline, with a small illustrated object breaking the photo edge beside it.
**Why it works:** A human, marker-pen version of the highlighted word.
**Fits:** `campaign-poster`, `flood-and-acid` · **Breaks:** `deep-ground-editorial`, `billboard-condensed`
**Motion pairing:** `vault/draw-path-on-scroll`.
**Sources:** [Clay](https://mobbin.com/sites/sections/a8eabf73-7dfd-4f4e-83bb-416f07de002b)

### Fanned photo deck
**Anatomy:** The hero photo is the front card of a deck; two or three cards peek out behind its right edge at slight rotations, with small circular prev/next arrows under it and an illustrated mark plus a short uppercase paragraph on the right.
**Why it works:** A carousel that shows it has more without dots.
**Fits:** `warm-daylight` (hospitality), `campaign-poster` · **Breaks:** `billboard-condensed`
**House translation:** Hairline outline on each card in the brand colour, no shadow.
**Motion pairing:** `vault/stacked-cards-slider` or `mwg/effect001` (Card stack).
**Sources:** [Monte](https://mobbin.com/sites/sections/664a16ca-816d-495d-b577-e08ce5c6f1a5)

### Offset colour plate
**Anatomy:** The hero photo sits on a solid dark rectangle offset a few percent down and right, so a hard-edged L of colour shows along two sides.
**Why it works:** Depth with a colour block, not a shadow — the house-legal version of elevation.
**Fits:** `flood-and-acid`, `billboard-condensed` (square) · **Breaks:** `deep-ground-editorial`
**Sources:** [Sprout Social](https://mobbin.com/sites/sections/d5a7b156-8997-411f-b504-85c954215542)
