# Library — Services, process and audience

Outside inspiration from Mobbin (swept 2026-09-30), translated into house rules. Not evidence from our own builds — `stramien.md` stays the source of truth; this file is the variant pool that step 5 of SKILL.md draws from to avoid the default spine.

Covers the "capability blocks" slot of the spine and everything that explains *what the client does and
how*: service overviews, capability indexes, process and steps, audience forks, sector pickers,
packages and comparisons. The default in the stramien is a 2-up or 3-up card row (`### Column counts`);
every pattern below is an alternative to that row. Existing stramien patterns this file does **not**
repeat: `### The audience fork` (hero CTA pair, tab strip above the nav, situation chooser),
`### Scroll pinning` (pinned card stacks), `### Carousels`, `### FAQ accordion`.

Swept across agencies, SaaS, logistics (United Carriers), manufacturing and energy (Atlas, T1 Energy,
Humble), agri (Farm Minerals), workplace and furniture (YLLW), healthcare (Hims, Headspace, Ease),
hospitality (Mews, KOBU) and retail. Mobbin screenshots are low-res; proportions are read off them,
never measured.

## Patterns

### Typographic service index
**Anatomy:** No cards, no icons. A narrow label column on the left (~20-25% width) holds a small
section label ("Wat we doen", optionally a mono index like `003/`) and, at most, one short intro
sentence. The right ~65% holds every service as one stacked line of large type, one per row, tight
leading (~1.1), display-ish size (roughly half the hero display). Eight to fifteen lines is normal.
Each line links to its service page. Hover state: the hovered line goes full-contrast while the rest
drop to ~40% opacity, or a small photo appears beside/behind the hovered word.
**Why it works:** A long list of services reads as depth and confidence instead of a wall of cards;
it is the cheapest section on the page to build and the one with the most typographic presence.
**Fits:** `deep-ground-editorial` (light weight, sentence case), `billboard-condensed` (uppercase
condensed, the list becomes a billboard) · **Breaks:** `warm-daylight` only if the hover image pop is
kept — there, keep hover to a colour step and drop the image.
**House translation:** No hover background fill; the only colour change is ground-text to dim-text,
plus the accent on the arrow or the index number. The list sits on the ground, not in a panel.
**Motion pairing:** `mwg/effect030` (Images on hover — image in a mask tracking the cursor's Y along
the list), or `vault/directional-list-hover.md` for a fill that enters from the pointer side.
**Sources:** [Anima](https://mobbin.com/sites/sections/883db2f4-aced-412d-8c52-de2012b6e6db),
[Mother Design](https://mobbin.com/sites/sections/83653e9e-1c8a-4dbb-b9e2-103d731e662f),
[Fiverr](https://mobbin.com/sites/sections/60532ebb-2d77-42c7-960d-50b6ba257b81),
[OFF+BRAND](https://mobbin.com/sites/sections/dd3b3bfe-d63e-47e7-b692-64cde2a3f494)

### Scroll-scrubbed service list with one media window
**Anatomy:** Three columns inside one tall section: a small italic or mono label on the left, one
media window in the centre (~30% width, landscape), the service list on the right in medium type.
As the visitor scrolls, the active service steps down the list (full contrast, the rest at ~20%
opacity) and the centre media swaps to that service's image or clip. The section pins for the
length of the list.
**Why it works:** Turns eight services into one continuous story without eight blocks of layout, and
gives each service its own picture without a grid.
**Fits:** `deep-ground-editorial`, `billboard-condensed` · **Breaks:** `warm-daylight` (pinning and
scrubbing are more motion than that register allows).
**House translation:** Media window takes the direction's image radius (square for billboard). The
active item may carry the accent as a small leading dot or index; the text itself stays ground-text.
**Motion pairing:** `vault/sticky-features.md` (sticky media, scrolling text triggers), `mwg/effect038`
(Dynamic list scrolling — a flick-book image that changes with scroll progress).
**Sources:** [Fiasco](https://mobbin.com/sites/sections/6fbcef4f-e8df-4aa5-a71a-abe9504f619e),
[Frontify](https://mobbin.com/sites/sections/0668b510-388a-40ee-ade2-e79d47cbf7dd)

### Capability ledger in columns
**Anatomy:** Services grouped under three or four discipline headings, each group a column of
sub-services. Row separators are hairlines; the group heading sits above its column, often with a
small numbered chip (`01`) at the right end of the heading line. Variants: each column in its own
outlined rounded box (Raw Materials); columns with a single vertical hairline on the left edge
(Analogue); a label column plus a group-name column plus the item list (Locomotive). The whole block
sits under one very large section title.
**Why it works:** Answers "do you also do X?" at a glance for a client with many sub-services, and
looks like a specification sheet rather than marketing.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `warm-daylight` (sentence case, outlined
rounded boxes — `plantion`'s outline card logic) · **Breaks:** `campaign-poster` (it is a catalogue).
**House translation:** Boxes are outlined, never elevated. The numbered chip is outline-only or takes
the accent as its fill — one chip per column, so accent stays punctuation. A flood-coloured section
behind it (Locomotive's red) is the brand ground, never the accent.
**Sources:** [Raw Materials](https://mobbin.com/sites/sections/67c9761c-a201-45f1-910a-ca8faa50cb33),
[Analogue Agency](https://mobbin.com/sites/sections/7063e124-d7b5-4fe4-9797-b318a5be20d1),
[Locomotive](https://mobbin.com/sites/sections/0789240f-37f9-4452-b1f9-2e29b8a7ff6e),
[Aino Agency](https://mobbin.com/sites/sections/9bd5d780-e303-4640-b68f-d0a9f9dc2862)

### Giant-numeral service chapters
**Anatomy:** One chapter per service, stacked vertically, separated by a full-width hairline. In each
chapter: a very large numeral (`1`, or `01`) on the far left, roughly the height of four lines of the
statement beside it; a small bracketed or plain label (the service name) in a narrow second column;
then, from the centre to the right edge, a one-sentence statement in large type, a small landscape
media tile under it, a short paragraph, and a 2-3 column grey list of sub-services. Trawelt's process
variant crops the numerals between hairlines so each numeral is cut off by the next row.
**Why it works:** Gives each service the weight of its own page section while the numeral provides a
rhythm that survives four or five repetitions.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `flood-and-acid` (heavy numerals on the
brand flood) · **Breaks:** `warm-daylight` (the numeral is a poster move; use a small circled number).
**House translation:** Numeral in ground-text or a tint of it, never the accent — at that size it
would be a field. Media tile follows the radius ladder.
**Motion pairing:** `mwg/effect015` (Title mask effect) on the numerals as they enter; `vault/sticky-steps-basic.md`
if the numeral should stay pinned while the chapter scrolls.
**Sources:** [Vucko](https://mobbin.com/sites/sections/72f31890-b4dd-46f4-b6f6-11ce33361d24),
[Büro](https://mobbin.com/sites/sections/76e383bf-2bdf-422d-992b-14495ff32fe5),
[Trawelt](https://mobbin.com/sites/sections/629aae31-4a94-46df-a97f-3180a6ae22e0)

### Hairline service ledger
**Anatomy:** Full-width rows separated by hairlines, each row a fixed column pattern: a short
descriptor or glyph in the leftmost narrow column ("Flexibele kantooroplossingen"), the service name
large in the second column (condensed caps, or a large serif), a paragraph and a text link in the
third, and optionally a small media thumb or a `+` at the far right. Rows can open accordion-style to
reveal detail. The process variant puts an accent-coloured numeral in the first column and the body
text in the last (Craft Agency).
**Why it works:** Reads like a table of contents for the company; scales from four rows to twelve
without changing layout; the descriptor column carries the benefit while the name carries the brand.
**Fits:** `billboard-condensed` (condensed caps names, as YLLW), `deep-ground-editorial` (serif names,
dark ground, as Phantom and Koto), `warm-daylight` (sentence case, `+` accordion) · **Breaks:** none
outright; on `campaign-poster` prefer a situation chooser.
**House translation:** Hairlines only, no row fills. Accent limited to the numeral or the `+` toggle.
**Motion pairing:** `vault/accordion-css-animation.md` for the open state; stagger the rows with the
house group reveal.
**Sources:** [YLLW](https://mobbin.com/sites/sections/7045dd6d-5f65-4b32-87c5-03cc49e9d2d8),
[Phantom Studios](https://mobbin.com/sites/sections/3cf723db-92c1-4601-b820-379757d44107),
[Craft Agency](https://mobbin.com/sites/sections/698886b8-377c-40e9-97e1-767a59eb9f28),
[Koto](https://mobbin.com/sites/sections/968754c4-c525-4315-a823-07721be58b1b)

### Link rows that pop a photo on hover
**Anatomy:** Two columns of hairline-separated rows, each a service or sector name in medium type with
a small chevron at the far right of its row. On hover the row picks up a pill-shaped light fill and a
small photo (slightly rotated, ~1.5 rows tall) appears overlapping the row just left of the chevron.
The section sits in a rounded-top panel that overlaps the section above (MindMarket).
**Why it works:** A dense navigational list that still shows the visitor a real image of each item,
without paying for a photo grid.
**Fits:** `warm-daylight` (the list is pure navigation; keep the photo, drop the rotation),
`flood-and-acid`, `deep-ground-editorial` · **Breaks:** `billboard-condensed` if the pill fill is kept
— use a square hover field instead.
**House translation:** The hover fill is a lighter neutral of the ground, not the accent. The rotated
photo is the one place rotation appears in the section (`### Rotation as a layout device`).
**Motion pairing:** `vault/stacking-image-trail.md` for a trail variant; `mwg/effect030` for the
masked image that follows the cursor down the list.
**Sources:** [MindMarket — sectors](https://mobbin.com/sites/sections/97ddd86e-d36f-426a-81b3-d1d138dc8bdc),
[MindMarket — methods](https://mobbin.com/sites/sections/33d8d60d-8c8d-4907-8294-4692622909f4),
[Fiverr](https://mobbin.com/sites/sections/60532ebb-2d77-42c7-960d-50b6ba257b81)

### Service accordion beside a photo
**Anatomy:** Split section, ~45/55. One side is a single large photo (rounded or square per the
direction) of the actual work — a factory floor, a consultation room. The other side holds an
eyebrow, a heading and a numbered accordion of four to six services or process stages (`01 Stringing`,
`02 Placement`...). The first item is open by default and shows one or two lines of body text or a
short bullet list. Optionally the photo swaps when a different item opens. T1 Energy sets each item
as its own light rounded pill-card with a mono uppercase label; Headspace and Trawelt use plain
hairline rows.
**Why it works:** Keeps six services on one screen, gives the photography its full size, and lets the
visitor pull detail instead of reading it all.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** none; on
`billboard-condensed` use square photo and caps labels.
**House translation:** Pill-cards are panel-on-ground (a light card on a tinted ground), not shadowed.
Mono uppercase labels are banned in `warm-daylight` — use sentence case there.
**Motion pairing:** `vault/accordion-css-animation.md`; `vault/expanding-feature-pills.md` if the items
should read as pills that expand.
**Sources:** [T1 Energy](https://mobbin.com/sites/sections/7720cba3-16ac-4a04-8f81-1f9153811bb9),
[Headspace](https://mobbin.com/sites/sections/f333d7bc-b54f-40f9-97a3-302020286372),
[Trawelt](https://mobbin.com/sites/sections/4f9e148a-c050-401f-a9f4-0503c6627c79),
[Faire](https://mobbin.com/sites/sections/548d5e30-91fa-45f5-8ad2-8d7d6e6ce745)

### Vertical tab rail with a swapping panel
**Anatomy:** A narrow rail on the left (~20% width) lists four to seven services or audiences as
stacked tabs; the active one is filled (dark pill with a chevron, or a filled block) or marked by a
dot. Tabs can be grouped under small uppercase group labels (Zendesk: SERVICE / SALES). The right
~75% is one large tinted rounded panel whose content — heading, one CTA, an illustration or photo —
swaps with the tab.
**Why it works:** The same space serves every audience or product line; far less scroll than stacking
them, and the rail doubles as a table of contents.
**Fits:** `warm-daylight` (the stramien already credits `trapxpress`'s tabbed hero; this is its
mid-page cousin), `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `billboard-condensed` only
in its rounded form; square the panel and it fits.
**House translation:** Active tab fill is the brand dark, or the accent on a small tab only — never a
wide accent block. The panel is a tinted neutral, not the accent.
**Motion pairing:** `vault/tab-system-with-autoplay-option.md` (autoplay makes it work as an ambient
showcase), `vault/bouncy-content-tabs.md`.
**Sources:** [Anchor](https://mobbin.com/sites/sections/682fde40-6191-44c4-a246-c75ad9d9c2f2),
[Zendesk](https://mobbin.com/sites/sections/32e0fcd1-98f5-4ba8-aaa3-51bb16db405d),
[Frontify](https://mobbin.com/sites/sections/0668b510-388a-40ee-ade2-e79d47cbf7dd)

### Sticky stage list with scrolling detail
**Anatomy:** Left column pinned: a vertical list of stages or services (uppercase small labels
separated by hairlines, or a stepper with square nodes on a thin line). The active stage is marked by
an accent dot, a short underline, or by being the only expanded item with a line of body under it;
the rest are dimmed labels. The right column scrolls: for each stage an eyebrow, a heading, then
alternating hairline rows of photo and text with a pill "Meer weten" link. Scroll position drives the
active state.
**Why it works:** A customer journey (booking → arrival → stay) or a service lifecycle becomes
navigable and always shows where the visitor is in it.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** none; this is
interface motion, not decoration.
**House translation:** Accent only on the active marker. Photos in the right column take the
direction's image radius.
**Motion pairing:** `vault/onepage-progress-navigation.md`, `vault/step-by-step-timeline.md`,
`vault/section-anchor-dock.md`.
**Sources:** [Mews](https://mobbin.com/sites/sections/564ea9d2-fa20-4b99-b184-e2166e00d4b5),
[Dovetail](https://mobbin.com/sites/sections/0c8a622e-7ba8-4695-8e33-c1a6138dda78),
[Frontify](https://mobbin.com/sites/sections/0668b510-388a-40ee-ade2-e79d47cbf7dd)

### Spine timeline with alternating media
**Anatomy:** A vertical line runs down the centre (or down the left third) of the section with a dot
or numbered node per step. Steps alternate sides: step title large on one side of the spine with two
short paragraphs, a photo or product render on the opposite side, then the next step flips. The line
can fill as the visitor scrolls (Ada's dotted line becomes solid). Seed's compact variant keeps the
spine on the left with pill labels ("Dag 1", "Week 4") and bullets, and a photo collage to the right.
**Why it works:** Makes a customer's actual route through the company concrete — intake, site visit,
proposal, delivery — which is exactly what installation, construction and care clients need to sell.
**Fits:** `warm-daylight` (Samara's light sentence-case variant is almost a warm-daylight page),
`deep-ground-editorial`, `flood-and-acid` · **Breaks:** `billboard-condensed` if the spine is thin and
delicate; thicken it and square the nodes.
**House translation:** Line and nodes in ground-text; the accent only on the current node when it
fills with scroll. No card behind each step — the spine is the structure.
**Motion pairing:** `vault/step-by-step-timeline.md` (progress along the steps); the fill is a single
ScrollTrigger scrub on the line's height.
**Sources:** [Samara](https://mobbin.com/sites/sections/001f0854-a5f2-42e5-b54f-349fdf95799a),
[Ada](https://mobbin.com/sites/sections/1cab397d-d972-4422-b896-34ed3741cef1),
[Seed](https://mobbin.com/sites/sections/0a635ee3-8326-4ebe-bd7f-89a3230a8d2e),
[Cloudflare](https://mobbin.com/sites/sections/f1f040e3-0b50-4750-a3f5-f19454dfc4fe)

### Expanding panels
**Anatomy:** A row of four or five tall panels filling the container. One panel is open — roughly
half the row's width — showing a full photo, a label, a stat or a one-line claim and a link. The
others are narrow slivers showing a dimmed crop of their photo and their label (Square), or a number
at the top and a line of rotated vertical text (Robot.com, used for process steps). Hover or click
opens a panel; the others compress.
**Why it works:** Five sectors or steps in one screen height, each with a real photograph, and a
built-in interaction that invites exploring.
**Fits:** `billboard-condensed` (square panels, caps labels), `flood-and-acid`, `deep-ground-editorial`
· **Breaks:** `warm-daylight` only in the rotated-text variant (reads gimmicky); the photo variant is
fine with sentence-case labels.
**House translation:** Scrim only behind the open panel's type (`### Scrim only where type sits`).
Collapsed panels dim with a ground-coloured overlay, not a blur. No shadows between panels — a gap of
the direction's gutter.
**Motion pairing:** `vault/cascading-slider.md` (grow/flex carousel); `mwg/effect035` (Smooth
thumbnails — the row-expansion logic, rotated 90°).
**Sources:** [Square](https://mobbin.com/sites/sections/fbd8d166-72c5-4f4b-8838-b690309c6aee),
[Robot.com](https://mobbin.com/sites/sections/edad3071-c6c4-4851-8e30-a4cdd746d129)

### Sector ledger
**Anatomy:** An intro band — a stacked two-tone headline ("WIJ KENNEN / UW SECTOR", first line in a
mid grey, second in full ground-text) with a paragraph to the right — followed by one full-width row
per sector on a dark ground, separated by hairlines. Each row has three zones: left, the sector number
(`01`) and a short claim in medium type plus an outline pill CTA; centre, the sector name as a caps
heading, two short paragraphs and a "Waarom wij" label over three bullets; right, a landscape photo
from that sector.
**Why it works:** For a B2B client whose customers self-identify by industry, every row is a
mini-landing page, and the visitor finds their own row by scanning names.
**Fits:** `billboard-condensed`, `deep-ground-editorial` · **Breaks:** `warm-daylight` (caps and a
dark ground are both out; use sentence case on the cream ground and it becomes a hairline ledger).
**House translation:** Pill CTA is outline in ground-text; accent reserved for its hover. Photos
square for billboard, rounded otherwise.
**Sources:** [United Carriers](https://mobbin.com/sites/sections/552c7526-87f8-44ba-af88-ae3bab81ae5d),
[Mews](https://mobbin.com/sites/sections/564ea9d2-fa20-4b99-b184-e2166e00d4b5)

### Sector photo rail
**Anatomy:** A section heading with prev/next arrow buttons on the right of the heading line, then a
horizontal rail of tall photo cards (~4 visible, the last cut by the viewport edge). Each card is a
single photograph with the sector or service name overlaid top-left in white — condensed caps with a
one-line sub (YLLW) or plain sentence case (Cohere, Slash). A progress bar under the rail replaces
dots (Cohere).
**Why it works:** Lets photography carry the section while the label gives instant orientation; the
cut-off last card signals "there's more" without a button.
**Fits:** `billboard-condensed`, `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` ·
**Breaks:** none.
**House translation:** Top-left labels need a scrim weighted to the top-left corner only. Arrow buttons
follow `### Button plus a detached arrow tile`; square outline tiles on billboard.
**Motion pairing:** Swiper per `### Carousels`; `vault/draggable-infinite-slider-with-gsap.md` if it
should drag with inertia.
**Sources:** [Cohere](https://mobbin.com/sites/sections/67216acf-375e-430d-b218-a463f7a2613d),
[Slash](https://mobbin.com/sites/sections/be15de50-350a-4226-b2ce-0d02cbef1b4a),
[YLLW](https://mobbin.com/sites/sections/4992ac8d-926b-404b-8042-8f1ff17fd7a4),
[Square — community](https://mobbin.com/sites/sections/d2ad9c26-9acf-4f2a-b735-fe3652bff0f7)

### Persona cards with a first-person title
**Anatomy:** Two to four cards side by side, one per audience. Each card: a media band on top (an
angled parallelogram of colour with an object, an illustration, or a circular portrait), then a small
uppercase category label, a first-person title ("Ik ben installateur", "Voor werkgevers"), two lines of
body, and a text link with a long arrow at the bottom right. Pitch frames each card's lower half with
an L-shaped hairline bracket instead of a box; Dropbox closes each card with a full-width button bar.
**Why it works:** A mid-page version of the audience fork — the stramien's variant lives in the hero
or above the nav; this one catches visitors who scrolled past it and routes them to their own page.
**Fits:** `flood-and-acid` (colour-band media), `campaign-poster` (each card in a field colour),
`warm-daylight` (circular staff or customer portraits) · **Breaks:** `deep-ground-editorial` only if the
media band is loud; use a photo.
**House translation:** No card elevation — a tinted panel on ground, or the bracket hairline. The
colour bands are brand or campaign colours; the accent stays on the links.
**Sources:** [Pitch](https://mobbin.com/sites/sections/f22c553d-dd17-4c35-97b4-5c02d04905e4),
[Dropbox](https://mobbin.com/sites/sections/74c66f16-858f-4a2e-88ee-aed2c5e18d01),
[Linktree](https://mobbin.com/sites/sections/2e4c40b8-7bf9-42ba-9d84-474dc0493871),
[Pangram](https://mobbin.com/sites/sections/a2519938-663e-4944-907b-28244ab4330c)

### Us-versus-the-usual table
**Anatomy:** A statement heading ("Geen standaard adviesbureau"), then a two-column comparison: the
left column headed by the usual alternative, the right by the client. Rows are hairline-separated;
each row pairs a pain on the left (dimmed text, a cross or slash icon) with the answer on the right
(full text, a check). Ploy's rows carry a bold claim plus a grey detail line, with a circled arrow
sitting on the divider between the two column headers. Function stretches the client's column into a
tall tinted pillar that extends above and below the table.
**Why it works:** Most of these clients are replacing "the way it's always been done"; the table says
it without naming a competitor, and it is scannable in five seconds.
**Fits:** `deep-ground-editorial`, `flood-and-acid`, `warm-daylight` · **Breaks:** `campaign-poster`
(it is a sales argument, not a message).
**House translation:** The client's column is marked by a hairline outline (Front) or a tinted
neutral / brand-dark pillar — never an accent field (Cake Equity's purple half is the counter-example).
Checks may take the accent; crosses stay grey.
**Motion pairing:** `vault/comparison-table-basic.md`.
**Sources:** [Front](https://mobbin.com/sites/sections/887ca35c-b1cf-4975-82af-c178a50ff4a4),
[Ploy](https://mobbin.com/sites/sections/9138eef2-4217-4b65-bdac-b9f7909c6d40),
[Parker](https://mobbin.com/sites/sections/49212788-6530-4397-b0e3-9c6eb5e646e7),
[MindMarket](https://mobbin.com/sites/sections/753bc368-0401-48d4-b4e5-2efece65adca),
[Function](https://mobbin.com/sites/sections/dd3e214a-e4f2-4276-8702-4aa29d47a271),
[Vizcom](https://mobbin.com/sites/sections/8e366fff-c7d7-4507-8825-41521a460209)

### Joined package columns
**Anatomy:** Three packages as three columns inside **one** frame, divided by vertical hairlines rather
than three separate cards. Each column: a small tag chip, the package name, one line of who it is for,
the price or "Op aanvraag", one CTA, then an "Alles van X, plus:" label over a check list. The
recommended column is marked by one of: a tinted neutral fill (OpenTable), a heavier top rule with a
"Meest gekozen" chip set into the rule (Webflow), or being the only column with a filled CTA. The frame
can overlap up into a colour band above it (OpenTable).
**Why it works:** Joined columns read as one decision rather than three competing adverts, and they
work for service packages (onderhoudscontract Basis / Plus / Totaal) as well as software.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `campaign-poster`.
**House translation:** No raised middle card (Programa's lifted card is a shadow — replace with the
tint or the top rule). The accent goes on the recommended CTA only; the other CTAs are outline.
**Motion pairing:** `vault/comparison-table-basic.md` for the "vergelijk alles" table under it.
**Sources:** [OpenTable](https://mobbin.com/sites/sections/0c81e36a-14f6-471d-9ce7-8930b284a9f2),
[Webflow](https://mobbin.com/sites/sections/86a4762c-79ce-4fe5-8aa7-8bdbba561302),
[Reducto](https://mobbin.com/sites/sections/8e791458-ee2a-4cba-90eb-6a76b6a6e557),
[Programa](https://mobbin.com/sites/sections/c52aacab-b4a5-46a8-b8c0-b8e5834a8d8b)

### Product breaking out of its panel
**Anatomy:** Three product or service cards in a row, each a solid panel in the brand colour. A
cut-out packshot or object sits on top of each panel and breaks out above its top edge by roughly a
third of its own height. Panels are staggered — each one steps a little lower than the previous —
and carry a square arrow tile in the top-right corner, the name in medium type bottom-left and one
small uppercase description line. Hims' vertical variant lets the object break out of the bottom of
tall cream cards in a two-column masonry; A24 drops the panels and overlaps a big caps label across
the cut-out object itself.
**Why it works:** Depth without a shadow: the object overlapping the panel edge is the house's own
"overlap as a joining device", applied to products. It makes a manufacturer's range feel physical.
**Fits:** `flood-and-acid` (`mrcopilot`'s cut-out founder is the same move), `warm-daylight` (cream
panels, sentence case) · **Breaks:** `deep-ground-editorial` if the panels are saturated; use a
tinted dark panel.
**House translation:** Panels are brand colour or a tint, never the accent. The only permitted soft
shadow in the house is the object-on-surface cue under a product (see `### No elevation`); prefer none.
**Sources:** [Farm Minerals](https://mobbin.com/sites/sections/8000e65f-fa00-4225-ae66-f35575dab264),
[Hims](https://mobbin.com/sites/sections/f708d94d-46d2-4e9a-9ad2-6cd479aef4da),
[A24](https://mobbin.com/sites/sections/78544dae-80de-402c-9893-661a0d1e7d17)

### Visible construction grid
**Anatomy:** The layout grid is drawn: faint hairlines at every column and row boundary run across the
section (or the whole page), and the content snaps to those cells. Services sit as text-only entries in
cells — a title and three lines of body — with the section heading occupying the top-left cell and an
illustration or photo taking one cell. Patch pushes it into a blueprint: hairline-boxed frames, a
condensed caps title split across two boxed lines, a step number in a boxed corner cell. Teak uses the
cells for icon-plus-mono-label features.
**Why it works:** Signals engineering and precision, which suits technical B2B clients, and replaces
cards with structure — a shadowless house's natural alternative to a card grid.
**Fits:** `billboard-condensed` (Patch, Atlas), `deep-ground-editorial` (Tines, very faint lines) ·
**Breaks:** `warm-daylight` (reads technical, not reassuring).
**House translation:** Lines at the lowest contrast that still reads (a tint of ground-text at ~8-12%).
The accent may mark one cell's number or icon, nothing larger.
**Sources:** [Tines](https://mobbin.com/sites/sections/039b059f-3966-4374-866f-b79df8e2d103),
[Patch](https://mobbin.com/sites/sections/fcf332b6-2658-4af3-859c-286a46081b75),
[Atlas](https://mobbin.com/sites/sections/f4bb0189-fdb7-4075-a704-8f2f7b91f926),
[Teak](https://mobbin.com/sites/sections/f63fc609-d425-4ec5-8d59-3baec25c5387)

### Heading as the first tile
**Anatomy:** A 3- or 4-column grid of service tiles where the section heading is not above the grid
but occupies the first cell of it ("Wat wij voor u doen" in the top-left cell, tiles fill the rest).
Tiles: small icon chip, title, two lines of body, a small caps arrow link. The last row can be offset
so the grid ends ragged.
**Why it works:** Removes the header-then-grid rhythm every card row has, so the most repeated section
on the page looks composed rather than templated. Costs nothing.
**Fits:** `warm-daylight`, `flood-and-acid`, `deep-ground-editorial` · **Breaks:** none.
**House translation:** Tiles are tinted panels on ground or hairline cells, no elevation. Icon chips may
take the accent (`### The accent is punctuation` lists icon chips explicitly).
**Sources:** [Mews](https://mobbin.com/sites/sections/6bdd2475-b351-4fce-9ca2-b0679212bd24),
[Tines](https://mobbin.com/sites/sections/039b059f-3966-4374-866f-b79df8e2d103)

## Single-sourced techniques

One site each — techniques to borrow on purpose, not house patterns.

### Scroll-driven vehicle strip (single-sourced)
**Anatomy:** Three columns. Left: a stacked two-tone caps headline ("BETROUWBAAR / BIJ ELKE MIJLPAAL")
with a tiny mono meta line above and a paragraph at the bottom. Centre: a narrow dark vertical strip
drawn as a road with lane markings; a top-down truck moves down it as the visitor scrolls. Right: the
services appear one by one as the truck passes their height — a small pixel icon, a caps title, two
lines of body, a hairline.
**Why it works:** A logistics or transport client gets a signature moment built from its own subject,
and it doubles as the services list.
**Fits:** `billboard-condensed`, `flood-and-acid` · **Breaks:** `warm-daylight`.
**House translation:** The road is ground-dark, not accent. The truck is a cut-out, no shadow.
**Motion pairing:** One ScrollTrigger scrub on the vehicle's `y`, with the service entries using the
house staggered reveal keyed to the same trigger.
**Sources:** [United Carriers](https://mobbin.com/sites/sections/6cea58d8-5ea8-49c5-ae93-06982757c0a1)

### Process on a rotating dial (single-sourced)
**Anatomy:** The steps sit around a large circle whose centre is off the left edge of the viewport, so
only an arc shows. The active step sits at the arc's midpoint, lit, with a numbered circle node and a
horizontal tick joining it to the arc; the other steps fan away along the arc, rotated with it and
fading. Scrolling rotates the dial to the next step. A product frame sits on the right.
**Why it works:** Makes a five- to seven-step process feel like one mechanism.
**Fits:** `deep-ground-editorial` · **Breaks:** `warm-daylight`, `campaign-poster`.
**Motion pairing:** `mwg/effect007` (Rounded trajectory — images on the edge of a large rotating
division) is the same geometry.
**Sources:** [Titan Intake](https://mobbin.com/sites/sections/997ccdfd-8e26-4f3b-ba9e-423d72ed08c1)

### Services orbiting a central photo (single-sourced)
**Anatomy:** One tall oval (stadium) photo in the centre; four numbered service tiles arranged around
it, two left and two right, each a stadium or rounded-rectangle shape in a different muted tint, the
inner edges tucking behind the oval. Small "Wat we doen" label top-left.
**Why it works:** Four services in one composed figure rather than a row; the shapes echo each other.
**Fits:** `warm-daylight`, `flood-and-acid` · **Breaks:** `billboard-condensed` (all curves).
**House translation:** Tints are neutrals or brand tints, not the accent.
**Sources:** [AngelList](https://mobbin.com/sites/sections/399c6a4e-63b9-4fed-9d07-bf6e44a4bb77)

### Audience corners (single-sourced)
**Anatomy:** Four audience names set large and bold in the four corners of a wide section, each on its
own highlighter-colour block that hugs the text (irregular, stepped edges following the line breaks),
each with a black arrow on its last line. A small centred question sits in the middle ("Voor wie
zoekt u?").
**Why it works:** An audience fork that feels human and assembled — a direct fit for a situation chooser.
**Fits:** `campaign-poster` only (field-scale colour is its licence).
**Sources:** [Ditto](https://mobbin.com/sites/sections/d7d6419e-1e6f-490f-a59b-56dfc94a6d0c)

### Stacked audience accordion (single-sourced)
**Anatomy:** Left: a pill eyebrow ("Voor wie?") and a heading. Right: three stacked rows, each an
audience name in heavy condensed caps (ENTERPRISE / AGENCIES / STARTUPS) with a one-line tagline to its
right and small dot markers at the corners. One row is open — tinted, taller, with four bullets and a
primary plus a text CTA.
**Why it works:** The audience fork as a mid-page component with depth per audience.
**Fits:** `billboard-condensed`, `flood-and-acid` · **Breaks:** `warm-daylight` (caps).
**House translation:** The open row's tint is a brand tint, not the accent.
**Motion pairing:** `vault/expanding-feature-pills.md`.
**Sources:** [Ploy](https://mobbin.com/sites/sections/2c493008-c3a6-42fc-b5a9-ed736484cb85)

### Service chapter over a full-bleed photo (single-sourced)
**Anatomy:** Each service gets a full-bleed documentary photo; the right ~35% carries, straight over the
photo, a circled number, the service title, a paragraph, three hairline sub-service rows with `+`
toggles, a sentence prompt and two small buttons.
**Why it works:** Every service reads as a place with people in it, and the sub-services stay one click
away.
**Fits:** `warm-daylight`, `billboard-condensed` · **Breaks:** `flood-and-acid` if the photos are weak.
**House translation:** Scrim weighted to the right-hand text column only.
**Sources:** [YLLW](https://mobbin.com/sites/sections/c838e6c7-2e50-40c5-8b29-f61445fd5bc0)

### Flip cards (single-sourced)
**Anatomy:** Three tall tan cards, each an illustration with the service name in a serif at the bottom
left and a circular outlined "Omdraaien" button at the bottom right; clicking turns the card to show a
paragraph on the same tan ground.
**Why it works:** Keeps a playful brand's service row image-first while still holding the explanation.
**Fits:** `warm-daylight`, `flood-and-acid` · **Breaks:** `billboard-condensed`, `deep-ground-editorial`.
**Sources:** [sweetgreen](https://mobbin.com/sites/sections/c3a9aa67-90f8-46a3-a809-c88f96762bdc)

### Long-tail marquee under category tiles (single-sourced)
**Anatomy:** Five photo tiles for the main categories, each with its label and a small arrow over the
bottom-left of the photo; directly beneath, a single-line text marquee lists every remaining category
in medium type.
**Why it works:** Shows the big five with pictures and proves the breadth with the rest, in two rows.
**Fits:** `flood-and-acid`, `billboard-condensed`, `deep-ground-editorial` · **Breaks:** `warm-daylight`
(no marquee in that direction).
**Motion pairing:** Osmo marquee per `### Marquee`; `mwg/effect013` (Infinite scrolling movement — speeds
with scroll direction).
**Sources:** [Square](https://mobbin.com/sites/sections/d2ad9c26-9acf-4f2a-b735-fe3652bff0f7)
