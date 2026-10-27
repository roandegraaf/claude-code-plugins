# Library — Inner pages

Outside inspiration from Mobbin (swept 2026-09-30), translated into house rules. Not evidence from our own builds — `stramien.md` stays the source of truth; this file is the variant pool that step 5 of SKILL.md draws from to avoid the default spine.

Scope: whole inner-page compositions and their load-bearing sections — case/project detail, service
detail, about/story, careers, vacancy list and detail, contact, location, article, product/range, 404,
long-read legal. Homepage heroes, proof strips, showcases, statement bands, CTA bands, nav and footer
live in their own library files.

Two stramien facts frame every pattern here: pull `### Homepage length` (a detail page is often
*longer* than the homepage, so it deserves a real composition) and pull `### Forms live off the
homepage` (the contact page is where the form finally lives, and it is often the shortest page with
no hero). Proportions below are read off low-res screenshots; anything that looks like a number is
`(estimated)`.

## Patterns

### Case detail — the facts rail
**Anatomy:** Below a short page header, a two-column body at roughly 1:2. The narrow column is a
ledger of project facts — label left, value right, one hairline between every row (Klant / Sector /
Locatie / Jaar / Omvang / Onze rol). Under the ledger sits one short question and one CTA
("Ook zo'n project?" + button). The wide column carries the lead photo first, then the narrative.
The rail is `sticky` so the facts stay in view while the story scrolls; it releases at the end of the
body. A variant puts the rail on the right with the logo-in-a-panel above it.
**Why it works:** B2B visitors skim for "is this like my situation?" before they read. The ledger
answers that in five rows and turns every case page into a comparison sheet.
**Fits:** deep-ground-editorial, warm-daylight, flood-and-acid · **Breaks:** campaign-poster — a
campaign has no project facts to tabulate.
**House translation:** Hairlines only, no card behind the rail (Tailscale's side panel sits on a
tinted card; drop it or make it a panel-on-ground tint, never a shadow). Labels take the direction's
eyebrow treatment — uppercase tracked for billboard/editorial, sentence case for warm-daylight. The
rail CTA is the page's only accent before the pre-footer band.
**Motion pairing:** `vault/elements-reveal-on-scroll` for the ledger rows as one stagger group.
**Sources:** [Harvest](https://mobbin.com/sites/sections/3507e53f-1e47-4ede-879f-6d440c6b8125), [Tailscale](https://mobbin.com/sites/sections/84f94fa1-216c-40e9-aa21-d4b6e8039f5b), [Nite Riot](https://mobbin.com/sites/sections/d8c6801c-2eaa-48ed-b55b-5c74d0042347)

### Case detail — title on the bleed, facts strip beneath
**Anatomy:** The case opens on one full-bleed documentary photo, ~80-90% of the viewport tall
(estimated), with the project name centred on it in the display face — often uppercase condensed.
No eyebrow, no CTA on the photo. Directly beneath, a band splits into a narrow left block of three to
four fact lines in small type (Categorie / Opgeleverd / Locatie) and a wide right block with the
intro paragraph set large (roughly 2x body). The band can sit on the direction's tinted neutral.
A split variant halves the viewport: photo left, title crossing the seam, credits grid right.
**Why it works:** The project is the hero; the site's own chrome gets out of the way. The fact strip
does the orientation job the stramien's proof strip does on a homepage.
**Fits:** billboard-condensed, deep-ground-editorial · **Breaks:** warm-daylight — uppercase
condensed display is banned there; use the facts rail instead.
**House translation:** Scrim only under the title, per pull `### Scrim only where type sits`. The
title crossing the split seam (Nite Riot) changes colour at the seam — build it as two clipped copies,
not a blend mode, so it survives Figma export.
**Motion pairing:** `vault/masked-text-reveal` on the title; `vault/image-to-background-zoom` if the
photo should grow from a card into the bleed on scroll.
**Sources:** [YLLW](https://mobbin.com/sites/sections/7c3edb84-022f-4919-a1db-88f42afdc7ce), [Nite Riot](https://mobbin.com/sites/sections/d8c6801c-2eaa-48ed-b55b-5c74d0042347), [AI in Design Report 2026](https://mobbin.com/sites/sections/2df021cc-6734-4975-9eb8-e9f874fff0b9)

### Case detail — outcome row, then one pull quote
**Anatomy:** Mid-page, after the narrative: a row of three or four outcomes between two full-width
hairlines. Each is a large numeral (display size, or one step below) over a one-line label, with
either a thin vertical rule between columns or a short rule at each column's left edge. Directly
after, a single client quote set big (roughly h3), a short accent mark or glyph above it, the name
and role in small type beneath. Nothing else in either band.
**Why it works:** Proof arrives as a pair — hard number, then human voice — exactly where the reader
asks "and did it work?".
**Fits:** all five · **Breaks:** none structurally; campaign-poster swaps numbers for a sentence.
**House translation:** Numerals stay in the text colour, not the accent — Jasper colours each
numeral differently, which is three accents. The quote mark may take the accent (it is punctuation).
No tinted card behind the stats; if the row needs separation, use the one tinted neutral as a band.
**Motion pairing:** pull `### Count-up statistics` for the numerals.
**Sources:** [Jasper](https://mobbin.com/sites/sections/69d12cd5-407c-4fa3-a4d8-a765cadeb9b0), [Apollo](https://mobbin.com/sites/sections/b39ddd0b-b22d-4bd0-a546-50edecafa38a), [Fiasco](https://mobbin.com/sites/sections/8dd5c506-3f96-4672-9c2b-438f36e91439), [Airtable](https://mobbin.com/sites/sections/344abfae-cce3-4d44-a0df-abd993682545)

### Case closer — "Volgende project"
**Anatomy:** The last section before the footer is a near-empty, near-full-viewport field. A tiny
eyebrow ("Volgende project" / "Next up") sits left of centre; the next project's title and one-line
subtitle sit centred and large, the subtitle in a muted tint. A thumbnail panel of the next project
anchors the lower-right corner. Bottom-left carries the ask ("Iets vergelijkbaars in gedachten?" +
a quiet button) and a "Alle projecten" link above the thumbnail. On scroll the title fills in letter
by letter from muted to full colour.
**Why it works:** It replaces the dead end of a case page with a forward pull, and it doubles as the
pre-footer ask without looking like one.
**Fits:** deep-ground-editorial, billboard-condensed, flood-and-acid · **Breaks:** warm-daylight
(ambient scroll theatre is off-register there; use a plain two-card "meer projecten" row).
**House translation:** When this closer is used, skip the standard pull `### The pre-footer CTA band`
on case pages — two asks back-to-back is one too many.
**Motion pairing:** `mwg/effect046` (letter by letter, pinned) or `mwg/effect015` (title mask) for
the fill-in; `vault/scroll-to-next-page` if the whole field should advance into the next case.
**Sources:** [Koto](https://mobbin.com/sites/sections/10dc8f2a-0856-4dc6-ba1a-8afe85c48738), [Analogue Agency](https://mobbin.com/sites/sections/e2bd83ec-24ff-4bb6-8f6e-d1a915e2cd03)

### Project index — the typographic ledger
**Anatomy:** The projects overview drops the card grid. Header: a small "Alle projecten" label with
the count as a superscript, and one intro paragraph offset to the right half. Below, a plain
three-column list — project name / sector / plaats — one row per project, no images, no dividers or
hairline-only dividers. A louder branch stacks the project names alone at display size, left-aligned,
each with its year as a small superscript. Hovering a row reveals that project's image following the
cursor or in a fixed window.
**Why it works:** With 30+ references a grid becomes wallpaper; a ledger reads as scale and lets the
visitor scan by sector or town — the thing a regional B2B buyer actually filters on.
**Fits:** billboard-condensed (the stacked display branch), deep-ground-editorial (the three-column
branch) · **Breaks:** warm-daylight — photography is that direction's whole argument; keep the grid.
**House translation:** Provide a grid/list toggle when the client's photography is strong. Hover
image uses the direction's image radius (square for billboard).
**Motion pairing:** `mwg/effect030` (images on hover in a Y-following mask), or
`vault/image-preview-cursor-follower`; `vault/directional-list-hover` for the row fill.
**Sources:** [Locomotive](https://mobbin.com/sites/sections/280c1a2d-41d4-4495-a4bd-816763c93ad3), [A24](https://mobbin.com/sites/sections/b645a881-adf5-43f3-a86c-758cd54f0b72)

### Service detail — numbered chapters
**Anatomy:** The body of a service page is a run of chapters, one per sub-service or deliverable.
Each chapter is a full-width row on a 12-column grid: a very large numeral (display size or bigger)
in columns 1-3, a small parenthesised label ("(Montage)") in columns 4-5, and in columns 6-12 a
heading, one media block and a paragraph. A hairline closes each chapter. A lighter branch drops the
numeral and runs heading + body left, a small image right, hairline between rows.
**Why it works:** It turns a wall of service copy into a table of contents you can see, and it gives
long service pages (the stramien measured 7,000px+) a rhythm without inventing new section types.
**Fits:** billboard-condensed, deep-ground-editorial, flood-and-acid · **Breaks:** campaign-poster.
**House translation:** Numerals in the text colour or the tinted neutral, never the accent. Keep the
label sentence case in warm-daylight (a 2px outlined card per chapter is the warm-daylight branch).
**Motion pairing:** `vault/sticky-section-tabs-css` if chapters should stack as pinned panels;
otherwise pull `### Staggered group reveals`.
**Sources:** [Vucko](https://mobbin.com/sites/sections/72f31890-b4dd-46f4-b6f6-11ce33361d24), [Anima](https://mobbin.com/sites/sections/fb48321e-47e3-4800-9680-e9e5c9af9270), [Browserbase](https://mobbin.com/sites/sections/014ae926-19ff-458d-b8a7-3c57a811702c)

### Long read — the sticky index rail
**Anatomy:** For privacy, voorwaarden, a kennisbank page or any service page over ~5 screens: a
narrow left rail (~20-25% width) holding the section list, sticky, with the active item marked; the
content column to its right at reading measure. Two rail treatments: a hairline-separated list with
an arrow on the active row, or a thin vertical rule with the active item's segment thickened. A
variant floats the list on the right as "Op deze pagina" and numbers the section headings in the
body with small circled numerals on a vertical line.
**Why it works:** Legal and FAQ-heavy pages are where clients' old sites look most neglected; this
makes the dullest page on the site look designed for almost no effort.
**Fits:** all five · **Breaks:** none.
**House translation:** Active marker is the accent (arrow or rule segment) — the only colour on the
page. No bordered callout boxes (Miro, Dub); use the tinted neutral as a flat panel if a notice is
needed.
**Motion pairing:** `vault/onepage-progress-navigation` or `vault/section-anchor-dock` for the
active state; `vault/scroll-progress-bar` on the header.
**Sources:** [Mistral AI](https://mobbin.com/sites/sections/d5310632-7c5b-4580-80a9-465115a25a80), [Dub](https://mobbin.com/sites/sections/825205b6-8aa3-4195-893d-0c348638a02e), [Intercom](https://mobbin.com/sites/sections/9d751164-5282-43ef-8f89-ec642922c329), [Sketch](https://mobbin.com/sites/sections/7a317ea6-733c-4812-ac32-2880256708b5)

### About — the section-anchor sub-bar
**Anatomy:** Directly under the main header on "Over ons" and its children, a second, lighter bar of
anchor links: Missie / Waarden / Team / Geschiedenis / Werken bij / Contact. Left-aligned under the
logo, small type, active item underlined. It either scrolls within one long about page or links to
the sibling pages, with a large section counter ("05") and a short rule at the left of each section
heading.
**Why it works:** Dutch SMB about-sections sprawl over four to six thin pages; the bar merges them
into one composed page without losing the addresses, and the mega menu gets one fewer column.
**Fits:** warm-daylight, deep-ground-editorial, flood-and-acid · **Breaks:** billboard-condensed only
if the header is transparent over a video hero — then drop the bar to the first section instead.
**House translation:** No second background colour for the bar; a hairline beneath it is enough.
**Motion pairing:** `vault/section-anchor-dock` (the active state follows scroll).
**Sources:** [Sprout Social](https://mobbin.com/sites/sections/225d6a61-5b7f-41c9-a392-f131f8a0ed86), [Upwork](https://mobbin.com/sites/sections/2a425ad7-71a9-4b76-adc1-533f25e7b08f), [PayPal](https://mobbin.com/sites/sections/c16eba56-58b0-4d8e-b401-48967ed44051)

### About — history as a ledger with a sticky year index
**Anatomy:** A centred section title ("Geschiedenis"), then a split: a sticky left column holds the
decade or year index as a row of small links (1960 1970 1980 ... or a vertical list with the current
year in full colour, others muted); the right column holds the entries, each topped by a hairline,
with a small date left, a title right, a line of copy and an archive photo under it. A louder branch
stacks the years themselves at display size in the left column, each aligned to its one-line
milestone on the right.
**Why it works:** Heritage is the proposition for half our client list (family firms, co-ops, 50-year
installers) and the old sites bury it in one paragraph. The ledger makes it browsable.
**Fits:** billboard-condensed (display-year branch), deep-ground-editorial, warm-daylight ·
**Breaks:** campaign-poster.
**House translation:** Archive photos go in square or the direction's small radius, black-and-white
allowed. Muted years are a tint of the text colour, not the accent. No dots-on-a-centre-line timeline
with icons in coloured circles (Apollo, Wise) — that is the generic version this replaces.
**Motion pairing:** `vault/step-by-step-timeline` for the progress state; `mwg/effect038` if the
entries should run horizontally and flick through photos.
**Sources:** [SIGMA](https://mobbin.com/sites/sections/9ee7fe6f-d330-4312-9225-f861f80ce572), [Handshake](https://mobbin.com/sites/sections/ec153601-7b86-4380-946e-655696b65bbd), [Sprout Social](https://mobbin.com/sites/sections/225d6a61-5b7f-41c9-a392-f131f8a0ed86), [Mews](https://mobbin.com/sites/sections/8b7d9d81-339d-4b24-a381-476d6d1b347f)

### About — history on a horizontal rail
**Anatomy:** Heading left, a short intro paragraph right. Below, a single hairline runs the full
container width with year pills sitting on it at regular intervals; under each pill, a milestone
sentence (first clause bold, the rest muted) and a photo tile. The rail overflows the container to
the right and scrolls sideways by drag or by two small arrow buttons bottom-left. A static branch
shows four years as tabs on the hairline, each with a thin vertical rule dropping into its text.
**Why it works:** Keeps a long history to one screen of height, which suits about pages that also
need team, values and certificates.
**Fits:** warm-daylight, flood-and-acid, deep-ground-editorial · **Breaks:** billboard-condensed
prefers the vertical ledger's scale.
**House translation:** Pills use the direction's pill or small radius; in warm-daylight the pills are
the deep brand colour, not the accent. Photo tiles rounded or square per the direction.
**Motion pairing:** pull `### Carousels` (Swiper, as the stramien records); `vault/draggable-marquee-directional`
only if it should drift on its own.
**Sources:** [Square](https://mobbin.com/sites/sections/8e6bad2f-9ca6-4ebb-ba19-a2f9f734ff14), [Harvest](https://mobbin.com/sites/sections/c2ddfc3b-73f5-485c-8ad1-f34247b70bce)

### About — headline set into the group photo
**Anatomy:** The about page opens with a small eyebrow and a three-to-four-line statement in the
display face, left-aligned, taking ~60-70% of the width (estimated). A wide group photo of the whole
team starts before the headline ends: the last one or two lines of the headline sit over the top
edge of the photo. A quieter branch centres the statement above the photo with a small caption line
under it ("Team op de heidag, 2025").
**Why it works:** It says "these people" before it says "this company", which is the named-human
principle applied to the whole team, and the overlap joins two sections into one gesture.
**Fits:** deep-ground-editorial, warm-daylight, flood-and-acid · **Breaks:** billboard-condensed
(an uppercase condensed headline over faces reads aggressive — let the photo go full bleed instead).
**House translation:** The overlapped lines need contrast where they land: start the photo on a
calm strip (sky, wall) or add a scrim only under those lines. This is pull `### Overlap as a joining
device` at page scale. Caption in the direction's meta style.
**Motion pairing:** `vault/global-parallax-setup` on the photo so the overlap shifts slightly on scroll.
**Sources:** [Webflow](https://mobbin.com/sites/sections/7d48bf03-9f8a-4bfa-ad21-239e0dc0adb0), [Büro](https://mobbin.com/sites/sections/42aaad97-8c45-41d3-be1e-c4b9b9654332), [Resend](https://mobbin.com/sites/sections/bba6377d-4b63-44d8-9884-a23cb2eefb06)

### Careers — scattered photo field
**Anatomy:** The "Werken bij" landing opens with a centred eyebrow, a short heading and one button
("Bekijk vacatures"). Around and below it, five to twenty candid team photos are placed freely —
different sizes, some bleeding off the viewport edge, some at slight rotations — on the plain
ground. The sparse branch pins four photos to the corners of the heading block; the dense branch
lays a collage under the heading that runs off both sides.
**Why it works:** Recruitment pages compete on "what is it like to work there", and a scatter of real
moments answers that faster than a benefits grid. It also breaks the careers page away from the
company site's grid.
**Fits:** campaign-poster, flood-and-acid, warm-daylight (sparse branch, no rotation) ·
**Breaks:** billboard-condensed and deep-ground-editorial (too loose; use the group-photo pattern).
**House translation:** Rotation only where the direction allows it (pull `### Rotation as a layout
device`). No shadows under the photos — Grain and Sana use them; overlap and rotation carry the depth.
Real employees only; stock breaks the whole premise.
**Motion pairing:** `mwg/effect033` (random gallery) or `mwg/effect014` (stacking images) for the
entrance; `vault/draggable-stickers` if visitors may push photos around.
**Sources:** [Tines](https://mobbin.com/sites/sections/cb78af06-910b-40c4-91a6-f8a7f49bbc9d), [Sana](https://mobbin.com/sites/sections/dc761b25-06c2-4a62-8dcb-991f3f7b95ee), [Kajabi](https://mobbin.com/sites/sections/81f9034c-867c-4ad6-a6d8-15bbaf691e13)

### Vacancy list — the grouped ledger
**Anatomy:** A plain heading ("Vacatures") with an optional filter row: pill chips per afdeling or
two plain dropdowns (Locatie / Afdeling). The list is grouped under department subheadings, each
with its count in a small chip. Each vacancy is one hairline row: title left (underlined or
arrow-trailed), location with a small glyph in the middle, dienstverband (fulltime / 32 uur) right,
or location chips right-aligned. No cards, no descriptions.
**Why it works:** Our clients typically carry two to twelve vacancies; a ledger shows them all above
the fold and scales down gracefully to one.
**Fits:** all five · **Breaks:** none.
**House translation:** Under five vacancies, drop the filters and the grouping — one list. Active
filter chip fills with the deep brand colour or the accent; inactive chips are hairline outlines, not
tinted fills. Radius per the direction. Always end the list with an open-application row ("Open
sollicitatie") — it is the most common last row on Dutch sites and missing from every Mobbin sample.
**Motion pairing:** `vault/basic-filter-setup` for the chips; `vault/directional-list-hover` for rows.
**Sources:** [Tailscale](https://mobbin.com/sites/sections/e4112960-8c98-4240-b0d7-6817baf6c558), [Front](https://mobbin.com/sites/sections/68dd4cc4-1798-49db-917b-efde6fcb1a00), [Tines](https://mobbin.com/sites/sections/930c8997-584e-424d-9ee6-645f7232ebe3), [ElevenLabs](https://mobbin.com/sites/sections/6d7e207f-502b-4e2e-8225-008d3782dbbb)

### Vacancy detail — sticky facts panel with the recruiter
**Anatomy:** Two columns at roughly 2:1. Left: title, a meta line (afdeling · locatie · uren), then
the vacancy text in labelled blocks (Wat ga je doen / Wat vragen we / Wat bieden we). Right, sticky:
a panel with the facts as label-over-value pairs (Dienstverband, Uren, Salaris, Locatie, Reageren
voor), the apply button full-width at the bottom, and under the panel the named recruiter — photo,
name, role, phone. A compact branch puts the same facts as a two-column spec table directly under
the title instead of in a rail.
**Why it works:** The facts that decide whether someone applies (salary, hours, location) never
scroll away, and the recruiter is the named-human device doing its conversion job on the page where
it matters most.
**Fits:** all five · **Breaks:** none.
**House translation:** The panel is a panel-on-ground tint or a hairline outline, never a floating
card with a shadow (Remote, Dribbble). Salary shown as a range; if the client refuses, keep the row
and write "Marktconform" rather than drop it. Link the recruiter to pull `### The named human`.
**Motion pairing:** `vault/live-form-validation-advanced` for the application form on its own page.
**Sources:** [Remote](https://mobbin.com/screens/4d5fe158-f5c2-47d4-82b3-9946b03060ef), [Dribbble](https://mobbin.com/screens/da43ef96-6751-427b-aecb-e66885bea3d0), [Wellfound](https://mobbin.com/screens/291188b5-cd73-4b42-a7ca-37fdf82134a3), [Deputy](https://mobbin.com/screens/e8bc2875-5765-4470-be81-2266cd3cb9ba)

### Contact — the routed directory
**Anatomy:** Two columns. Left: not a single address but a routing table — one row per reason to get
in touch (Algemeen / Offerte / Service & storing / Pers / Werken bij), each row with the named
person's small round photo, their name and a direct email or phone, trailed by an arrow. Below the
table, the visiting address and hours in two short blocks. Right: the form in a flat panel, with a
"waar gaat het over?" select that mirrors the routing rows. A table-only branch drops the photos:
label left, email right, hairline between rows.
**Why it works:** A B2B contact page is a switchboard; routing the visitor before the form halves
the "which inbox?" friction and puts five named humans on the page instead of one form.
**Fits:** deep-ground-editorial, warm-daylight, flood-and-acid · **Breaks:** campaign-poster (a
campaign has one ask, not a switchboard).
**House translation:** The form panel is the direction's panel colour on the ground — Fiasco's dark
card on a dark page is exactly panel-on-ground, no shadow needed. Submit button is the accent; it
is the page's only accent fill.
**Motion pairing:** `vault/live-form-validation-advanced`.
**Sources:** [Fiasco](https://mobbin.com/sites/sections/95a27e82-73ff-4704-b843-682d1281753b), [In Common With](https://mobbin.com/sites/sections/dd7619d6-0abf-4c9a-843e-e4cb41a86415)

### Contact — the one-word masthead and the underline form
**Anatomy:** The page's only hero is the word itself — "CONTACT" or "Neem contact op" — set in the
display face across the full container width, fitted edge to edge. A hairline under it. Below: a
narrow left column with one sentence of intro at the top and address / phone / socials anchored to
the bottom; a wide right column with the form. Fields are underline-only (a single bottom hairline,
label as placeholder or small label above), two per row where they pair (Voornaam / Achternaam),
full-width for message; the submit is a solid rectangle or pill.
**Why it works:** It matches the stramien's finding that the conversion page is short and heroless,
and turns that into a statement instead of an apology.
**Fits:** billboard-condensed (uppercase condensed word), deep-ground-editorial (sentence-case,
light weight, right-aligned branch) · **Breaks:** warm-daylight (no uppercase; use a photo-half
panel or the routed directory).
**House translation:** Underline fields follow pull `### Form field styling follows the direction's
radius` — radius 0 is the point. Focus state thickens the underline to 2px in the accent.
**Motion pairing:** `vault/fit-text-to-width` for the masthead; `vault/masked-text-reveal` for its entrance.
**Sources:** [YLLW](https://mobbin.com/sites/sections/a45b58fa-4ac0-49f8-957e-47be93d4f4e1), [Trawelt](https://mobbin.com/sites/sections/e471ecd9-0f95-42a4-b93f-a2a9ae0c991b), [Savor](https://mobbin.com/sites/sections/ae1f5fe6-9420-45e4-b097-64ae2aa8c06e), [Farm Minerals](https://mobbin.com/sites/sections/8c7ea173-d413-4620-b92b-a6ec2707844e)

### Contact — photo half, form half
**Anatomy:** One panel filling most of the viewport, split 50/50: a documentary photo (the building,
the workshop, the fleet) on one half, the form on the other with its heading and one line of copy
on top. The panel sits inset on the ground with the direction's card radius, or runs edge to edge.
A tall branch lets the photo stop at the form's midpoint so the long form column continues alone.
**Why it works:** It is the stramien's "one two-column panel filling the viewport" demo page
(`callab`) with the photography doing the reassurance the form cannot.
**Fits:** warm-daylight, deep-ground-editorial, flood-and-acid · **Breaks:** billboard-condensed
only when there is no photo worth a half-screen.
**House translation:** The panel-in-a-coloured-frame (Melius) is fine only in the tinted neutral;
never an accent-coloured frame. Fields take the tinted-fill or hairline treatment per direction.
**Motion pairing:** `vault/live-form-validation-basic`.
**Sources:** [Melius](https://mobbin.com/sites/sections/6365c06c-9c38-42b6-9e19-ebb4c797f9d2), [Lightship](https://mobbin.com/sites/sections/0791334e-985a-4902-b866-3be56684576c)

### Location — the building ledger
**Anatomy:** For clients with more than one site (vestiging, fabriek, showroom). A small section
label sits alone in the left half; the right half is a ledger: each location is a hairline-topped
row with its name left and address / phone right, followed by a large photo of the actual building.
A two-up branch sets each city as a column: a tall photo composite, the city name, the live local
time or today's hours under it in a muted tint, then email, phone, address and "Route" link in small
columns.
**Why it works:** "Where are you, and is that a real place?" is a trust question for industrial and
logistics clients; the building photo answers it better than an embedded map.
**Fits:** deep-ground-editorial, billboard-condensed, warm-daylight · **Breaks:** campaign-poster.
**House translation:** Use the map only as a secondary link ("Route plannen"), not as the visual —
the two embedded Google maps on SIGMA are the version to avoid. Photos square for billboard, rounded
per the direction elsewhere.
**Motion pairing:** `vault/dynamic-current-time` (live time or "nu open"), `vault/store-locator-mapbox`
if there are more than five locations.
**Sources:** [SIGMA](https://mobbin.com/sites/sections/03e3ab14-2a8d-4e95-b5ff-f74401045797), [Pentagram](https://mobbin.com/sites/sections/1046fdf6-61e6-4987-be32-89316b8e2515), [HubSpot](https://mobbin.com/sites/sections/12eeff5f-2ca9-4f60-bb02-3c71004f0c7e)

### Location — hours first
**Anatomy:** For a showroom, shop, garden centre or service desk: a split band. The narrow side
carries the location name at heading size, the address in the accent or the deep brand colour, and
the opening hours as a compact block in small uppercase or mono type (MA-VR 07:30-17:00 / ZA
08:00-12:00); under it two small outlined buttons (Route / Download brochure). The wide side is a
photo carousel of the place with a "01 — 03" counter and arrows. A three-column branch sets Contact /
Openingstijden / Vind ons side by side on a coloured band, holiday hours included.
**Why it works:** For walk-in businesses the hours are the first question; putting them in the
first viewport of the location page removes the most common phone call.
**Fits:** warm-daylight (its trust devices already name an hours table), flood-and-acid ·
**Breaks:** billboard-condensed (the dense small type fights a 10x display ratio).
**House translation:** Today's row highlighted and a live open/closed dot, per the warm-daylight
doc. In warm-daylight the hours are sentence case, not uppercase. An office-hours chip ("Vandaag open
tot 17:00" with a green dot) can repeat in the contact-page header.
**Motion pairing:** `vault/opening-hours-timetable`.
**Sources:** [Little Amps Coffee](https://mobbin.com/sites/sections/74a3a0da-d93a-419b-a675-1a641b46a4eb), [Monte](https://mobbin.com/sites/sections/6ecba422-fe26-482b-8225-8e24ec959d84), [Complex Law](https://mobbin.com/sites/sections/cbb89da9-0000-4c53-883f-bd5d51762ca9)

### Article — the three-rail reading layout
**Anatomy:** Breadcrumb, title at h1 (not display) left-aligned, author avatar with name and date on
one line, then the cover image. Body in three rails: a narrow sticky left rail with "Inhoud" (the
article's h2 list) and reading time; the centre column at reading measure; a narrow right rail with
share icons, the author card, tags and two "Meer zoals dit" titles as plain text links. Pull quotes
break out to the centre column's full width in a larger, lighter or italic cut.
**Why it works:** News and kennisbank articles are where SEO-driven clients put their effort, and the
rails give a thin article the presence of a publication without adding content.
**Fits:** all five · **Breaks:** none; campaign-poster keeps only the centre column.
**House translation:** No ad-style promo card in the rail (Homerun, Better Stack) — if the client
wants one, it is the pre-footer band's job. Pull quote in the text colour; only the quote mark may
take the accent.
**Motion pairing:** `vault/display-read-time`, `vault/scroll-progress-bar`, `vault/section-anchor-dock`
for the active TOC item.
**Sources:** [Homerun](https://mobbin.com/sites/sections/c4abee34-ab95-48ad-b0f5-3c0e6397a852), [Better Stack](https://mobbin.com/sites/sections/e7e957c6-5a4a-4cd8-831b-7f0a65f19d87), [Attio](https://mobbin.com/sites/sections/7866659c-1438-4186-8ec4-500d137ba8b1), [Dollar Shave Club](https://mobbin.com/sites/sections/4b58de13-db8f-4324-9d31-ff91113d1bd3), [Intercom](https://mobbin.com/sites/sections/1ba59810-9e2e-4e9c-9e4e-32c73871da66)

### Product detail — split media, inquiry column, spec ledger
**Anatomy:** For a B2B product (machine, garment line, stair model, plant variety): the first
viewport splits 50/50. One half is the product or in-situ photo, sticky, with thumbnails or a
counter. The other half: a two-part breadcrumb as small labels on a hairline, the product name,
then a stack of hairline rows for the choices (Uitvoering / Kleur / Maat) and two plain arrow links
— "Offerte aanvragen" and "Download productblad". Further down, a specs section: a hairline table
of label/value rows in the wide column (Afmetingen / Gewicht / Materiaal / Certificering) and a
narrow column of outlined download rows, each trailed by a ↓ (Productblad, Montagehandleiding, 2D
tekening, 3D model). Grouped specs can sit under small section tabs.
**Why it works:** B2B product pages are downloads and a quote request, not a cart. The ledger and
download column put the installer's and the buyer's two jobs side by side.
**Fits:** deep-ground-editorial, warm-daylight, billboard-condensed · **Breaks:** campaign-poster.
**House translation:** Replace every "Add to cart" with the quote request in the accent. Download
rows are hairline outlines at the direction's small radius, not tinted buttons.
**Motion pairing:** `vault/lightbox-setup` for the gallery; `vault/sticky-section-tabs-css` for
grouped spec tabs.
**Sources:** [In Common With](https://mobbin.com/sites/sections/6c5ddd6d-bd8e-4cbf-9616-8016064f2bdc), [Waka Waka](https://mobbin.com/sites/sections/80eda5fd-8de8-4efa-b459-6d7f2c251e7f), [Fauna Robotics](https://mobbin.com/sites/sections/30698000-885e-4983-af51-e8a1fa72a043), [Rains](https://mobbin.com/sites/sections/720fa829-c805-4cef-9ca7-b38ff75ccb5b)

### Range overview — catalogue grid with a mood tile
**Anatomy:** Header: a big page title and, instead of a filter sidebar, the facets as short plain
text lists laid across the top in columns (Productlijn / Toepassing / Materiaal), each option with
its count. Or a full-width segmented tab row with hairline dividers, the active segment filled. The
grid below is three or four products per row in hairline-divided cells with the product cut out on
the ground, name and a one-line spec under each. Once per two or three rows, one cell (or a
full-width row) breaks the rhythm with an in-use mood photograph.
**Why it works:** A range page is usually the flattest page of a manufacturer's site; the mood tile
reintroduces the brand every few rows without leaving the catalogue.
**Fits:** deep-ground-editorial, warm-daylight, billboard-condensed · **Breaks:** campaign-poster.
**House translation:** No badges or sale stickers in the accent; one "Nieuw" label maximum.
Active segment fills with the deep brand colour, not the accent, unless it is the page's only
interactive colour.
**Motion pairing:** `vault/multi-filter-setup-multi-match` for facets; `vault/live-search-list-js`
for a big range.
**Sources:** [SIGMA](https://mobbin.com/sites/sections/ca08c563-e78d-4eec-9b62-faf7dc7c952e), [Face Formula](https://mobbin.com/sites/sections/2c42876f-e42f-49dc-ba18-b6acc4bdf204), [Graza](https://mobbin.com/sites/sections/f86d7f5d-fd2c-4cc5-b199-0e86d955d470)

### 404 — the ghost numeral
**Anatomy:** One viewport, nothing else. "404" at a size that nearly fills the container, set in a
tint only a step off the ground (or blurred), with the real message — "Deze pagina bestaat niet
(meer)" — centred over it at heading size and one button home beneath. A light-serif branch sets the
numeral in a thin display cut in pale grey, the message small under it.
**Why it works:** It costs nothing, stays on-brand in every direction, and old client sites
almost always ship the CMS default.
**Fits:** all five · **Breaks:** none.
**House translation:** Add two or three plain links under the button (Diensten / Projecten /
Contact) — every Mobbin sample offers only "home", which is a dead end for a B2B visitor.
**Motion pairing:** `vault/404-error-minigame` only for flood-and-acid or campaign-poster clients
with a playful brand.
**Sources:** [Parker](https://mobbin.com/sites/sections/53f87743-4b27-4791-9452-952e138a6976), [Speakeasy](https://mobbin.com/sites/sections/211e62b3-c07c-428b-a7c2-519d44bb197e), [Amplemarket](https://mobbin.com/sites/sections/8f329a59-b4b1-481c-a592-0b0d8f98444d)

## Single-sourced techniques

Seen on one site only. Use as a technique, name it as such, and do not present it as a house pattern.

### Product detail — hotspot anatomy (single-sourced)
**Anatomy:** A large product photo on a dark panel with small "+" hotspots on the parts that
matter; a panel in the lower-left corner, cut into the photo panel's edge, lists the same features
as rows with a "+" chip each. Hovering a row lights its hotspot and vice versa.
**Why it works:** Explains a machine or a garment's details without a spec table.
**Fits:** deep-ground-editorial, billboard-condensed · **Breaks:** warm-daylight.
**House translation:** "+" chips in the accent are fine (punctuation); the notch where the list panel
cuts into the photo is the depth device, no shadow.
**Motion pairing:** `vault/expanding-feature-pills`.
**Sources:** [Zoox](https://mobbin.com/sites/sections/b19088d0-02be-42d6-846e-ae75a755fbb2)

### 404 — the text ribbon (single-sourced)
**Anatomy:** Message and button left; from the right edge a thick brand-coloured ribbon loops across
the viewport with "404 •" repeated along its path.
**Why it works:** A kinetic, branded 404 for a brand that already has a curve or ribbon motif.
**Fits:** flood-and-acid, campaign-poster · **Breaks:** billboard-condensed, deep-ground-editorial.
**House translation:** The ribbon is a brand shape, so it may take the flood colour in flood-and-acid;
never the accent.
**Motion pairing:** `mwg/effect032` (sentence along an SVG path) or `vault/follow-svg-path-on-scroll`.
**Sources:** [MindMarket](https://mobbin.com/sites/sections/c0077bf4-a1c5-4e95-b74d-d9e0be69a1d6)

### Article — interview poster cover (single-sourced)
**Anatomy:** For an interview or "in gesprek met" series: the cover is a flat colour poster, the
interviewee's name set across it at display size in two lines, a black-and-white portrait cut in
between the lines, the series name and volume number in the top corners and a one-line quote along
the bottom edge.
**Why it works:** Turns a recurring blog format into a recognisable series.
**Fits:** campaign-poster, flood-and-acid · **Breaks:** warm-daylight, deep-ground-editorial.
**House translation:** The poster colour is a brand or campaign colour, not the accent.
**Motion pairing:** `vault/masked-text-reveal`.
**Sources:** [Intercom](https://mobbin.com/sites/sections/63faa1de-53d7-46f1-80e6-7ef18aeba0b6)

### Inner page header — stacked tinted blocks (single-sourced)
**Anatomy:** The left half of the header is two stacked flat blocks in two neighbouring neutrals —
the top one holds eyebrow and title, the bottom one the subline; the right half is a full-height
portrait photo.
**Why it works:** A calm, shadowless way to give sub-pages a header with some architecture.
**Fits:** warm-daylight, deep-ground-editorial · **Breaks:** billboard-condensed.
**House translation:** Both blocks must be neutrals from the palette (the ground and the one tinted
neutral), never the accent.
**Sources:** [Dropbox](https://mobbin.com/sites/sections/0731074c-704d-4f80-9d00-7a0bcf4329b7)
