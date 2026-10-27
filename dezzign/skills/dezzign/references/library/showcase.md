# Library — Showcase

Outside inspiration from Mobbin (swept 2026-09-30), translated into house rules. Not evidence from our own builds — `stramien.md` stays the source of truth; this file is the variant pool that step 5 of SKILL.md draws from to avoid the default spine.

Scope: the showcase slot of the homepage spine (projects, cases, ranges, units) plus its siblings — news, events, vacancy teasers and the index/overview pages they link to. The house default is "a Swiper row of rounded photo cards" (pull `### Carousels`). Everything below is a way out of that default. Pull `### Square versus rounded images` first: every pattern here inherits the direction's image radius, never its own.

## Patterns

### Big-type project index with image swap
**Anatomy:** No cards. Project names stacked as a left-aligned list at near-display size (each line roughly a third to half the container width), tight leading, one line per project. A tiny mono or small-caps year or sector sits as a superscript right after each name. Hovering a name reveals its image: either a full-bleed still behind the whole list (the list sits bottom-left over it, non-hovered names drop to ~40% opacity) or a small image pinned to the left and right edges of the section. A centred variant stacks names down the middle with the first name small on the left and the location small on the right of each line.
**Why it works:** Turns a portfolio of mixed-quality photos into a typographic statement; the one image shown at a time is always the best-cropped one.
**Fits:** billboard-condensed, deep-ground-editorial · **Breaks:** warm-daylight (the hover image is a cursor-driven reveal and the list reads as a statement, not reassurance)
**House translation:** No shadow on the revealed image. Hover state is opacity and colour only, the accent may mark the active name's superscript. billboard-condensed sets the names uppercase condensed; deep-ground-editorial keeps them sentence case at light weight. Needs a touch fallback: on mobile show a thumbnail inline beside each name.
**Motion pairing:** `vault/big-typo-scroll-preview-infinite`, `vault/image-preview-cursor-follower`, `mwg/effect030` (image in a mask tracking the cursor's Y along a list)
**Sources:** [A24](https://mobbin.com/sites/sections/b645a881-adf5-43f3-a86c-758cd54f0b72), [A24](https://mobbin.com/sites/sections/6273675b-53ef-400e-a5b4-77ff67a08a33), [Freshman](https://mobbin.com/sites/sections/3641b988-b26c-471d-a177-c5fc2254b123), [Nite Riot](https://mobbin.com/sites/sections/1aa05a05-6920-4f35-a581-3dcf42634162)

### Tabular project index
**Anatomy:** A plain three- or four-column table: project or client name / sector / place / (year or arrow). Body-size text, no images, rows separated by hairlines or just by leading. A count sits as a superscript on the section label ("Alle projecten ⁴³"). A short intro paragraph sits in the right half above the table, the label in the left. Row hover shifts the row a few px or fills it with the tinted neutral; an arrow at the far right edge is the only affordance.
**Why it works:** Shows breadth (43 projects, 12 sectors) in one screen without making any single weak photo carry the page. Reads as confident and archival.
**Fits:** billboard-condensed, deep-ground-editorial, warm-daylight · **Breaks:** flood-and-acid (it needs colour carrying the page; a text table has none)
**House translation:** Hairline borders only, no zebra striping with contrast. warm-daylight keeps it sentence case and uses it for dealers, locations or producers rather than a portfolio. Put the tabular index on the overview page and a 5-6 row excerpt on the homepage with a text link to the rest.
**Motion pairing:** `vault/directional-list-hover` (fill enters from the side the pointer came from)
**Sources:** [Locomotive](https://mobbin.com/sites/sections/280c1a2d-41d4-4495-a4bd-816763c93ad3), [basement.studio](https://mobbin.com/sites/sections/bb09f59f-11c2-4b8c-9858-b424eacabb8b), [Escape Cafe](https://mobbin.com/sites/sections/4cfcdd41-236b-4d68-9ec5-89f546055b61), [MindMarket](https://mobbin.com/sites/sections/97ddd86e-d36f-426a-81b3-d1d138dc8bdc)

### Filter as the headline
**Anatomy:** The category filter is the section heading. Categories set as one run of display-size words, comma-separated or space-separated, wrapping to two lines: the active one in full ink, the rest in a pale tint of the ink. Clicking a word makes it the active one and filters the grid below. A variant builds a sentence with inline dropdowns: "Wij bouwen [trappen ▾] voor [particulieren ▾]".
**Why it works:** Removes a whole UI row (heading + chip bar) and makes the range of what the client does legible at a glance.
**Fits:** billboard-condensed, flood-and-acid, campaign-poster · **Breaks:** warm-daylight when set uppercase; fine in sentence case at light weight
**House translation:** Active state is ink versus tint, not accent fill — the accent stays off field scale. Keep the inactive tint at readable contrast for the hover state. Under 7 categories, or it stops reading as a sentence.
**Motion pairing:** `vault/basic-filter-setup`, `vault/multi-filter-setup-multi-match`, `vault/layout-grid-flip` (grid reflows with FLIP when the filter changes)
**Sources:** [MOUTHWASH Studio](https://mobbin.com/sites/sections/9c2b6408-fce2-44db-9c0b-3def5bddba12), [BitcoinOS](https://mobbin.com/sites/sections/9f8a47e9-de3c-4469-9fff-09b24b009d1e), [Pentagram](https://mobbin.com/sites/sections/21fcb0a7-5769-483c-aa47-9841911d884c)

### Quiet counted filter with a view toggle
**Anatomy:** The opposite register of the one above. Filters sit as small text: either a segmented pill row with a superscript count on each option ("Alle ¹⁷ · Nieuwbouw ⁴ · Renovatie ⁶"), or two short vertical text lists in the header area ("Dienst: …", "Sector: …") with the active item in ink and the rest grey. Beside it, a text or pill toggle for the grid's view: "Grid / Lijst" or "Grid view | Horizontal scroll". A category sidebar with counts per group is the catalogue-scale version.
**Why it works:** Filtering without chrome; the counts tell the visitor how deep each category goes before they click.
**Fits:** all five (the pill form in flood-and-acid and warm-daylight, the text-list form in billboard-condensed and deep-ground-editorial) · **Breaks:** none
**House translation:** Pills follow the direction's radius and use a hairline outline, active pill filled with ink not accent. Counts are data from the client's CMS, not decoration — omit them if the numbers are embarrassingly small (1-2 per category).
**Motion pairing:** `vault/layout-grid-flip` (view toggle), `vault/basic-filter-setup`, `vault/live-search-list-js`
**Sources:** [Unseen Studio](https://mobbin.com/sites/sections/79d328bc-800b-4830-9de1-7ef8fd2dd00f), [MOUTHWASH Studio](https://mobbin.com/sites/sections/5ed7b943-1b00-4ccf-bfe3-50897107642b), [Studio Freight](https://mobbin.com/sites/sections/45b0cd5e-88eb-42cd-9af2-1be563f63041), [David](https://mobbin.com/sites/sections/97861b6d-985e-448c-9c60-6db7feba6c00), [United Carriers](https://mobbin.com/sites/sections/4841bee1-c825-4fe9-ac67-c00e1ef3edff)

### Staggered-height card row
**Anatomy:** A row of 3-5 portrait cards bleeding off the right edge, but each card's top edge is offset from the last — stepping down (or up and down) by roughly 10-15% of card height — so the row reads as a skyline instead of a shelf. The section heading and one button sit top-left above the shortest card. On the two-column variant, the right column is offset half a card lower than the left.
**Why it works:** The same carousel content with a rhythm; the eye moves across instead of scanning a flat line.
**Fits:** flood-and-acid, campaign-poster, deep-ground-editorial · **Breaks:** billboard-condensed only if you need a hard grid; square cards still work
**House translation:** Offsets are layout, not elevation: no shadows to fake depth. Title labels go inside the card bottom-left with a small "+" or arrow tile bottom-right in the accent.
**Motion pairing:** `mwg/effect018` (cards rise, linger and exit in a wave), `vault/overlapping-slider`, `vault/draggable-infinite-slider-with-gsap`
**Sources:** [COLLINS](https://mobbin.com/sites/sections/2c677c3e-5781-4917-91e3-d2f1d4060492), [OFF+BRAND](https://mobbin.com/sites/sections/f890a5d7-f914-4f60-8ec2-a15350081db4), [Farm Minerals](https://mobbin.com/sites/sections/8000e65f-fa00-4225-ae66-f35575dab264)

### Cut-out objects on the bare ground
**Anatomy:** Products photographed as cut-outs (packshots, garments, a stair segment, a machine) placed directly on the section ground with no tile, card or border. Evenly spaced in a row of 3-5, all at the same visual height, generous air around each. Under each: an uppercase tracked or small sentence-case name, one short line, a text link. A tiny centred label above ("Drie productlijnen"). The range variant lines up a dozen small full-body figures or products in a single row across the page like a catalogue line-up.
**Why it works:** Makes a B2B product range look curated rather than catalogued, and survives mediocre product photography once the background is removed.
**Fits:** deep-ground-editorial, warm-daylight, billboard-condensed · **Breaks:** flood-and-acid if the ground is the flood colour and the cut-outs clash; test contrast
**House translation:** No drop shadow under the cut-out — a contact shadow baked into the photo is fine, a CSS shadow is not. warm-daylight drops the uppercase. Requires the client to supply or allow cut-out photography; flag it in the sitemap notes.
**Motion pairing:** `mwg/effect008` (infinite auto-moving row with drag), `vault/draggable-marquee-directional`
**Sources:** [SIGMA](https://mobbin.com/sites/sections/c18bb82d-1622-4e93-8bbb-2986150a1fec), [Busy Bee Honey](https://mobbin.com/sites/sections/6be73b33-2f79-4115-a4fa-607046b3e641), [A24](https://mobbin.com/sites/sections/f0a3c2c4-6fac-4813-b1dd-048ebaf3d30e), [Becane](https://mobbin.com/sites/sections/78842f2e-5d9c-44ed-997f-97265346135c)

### Range card with a spec line and swatches
**Anatomy:** A product or model card with a fixed internal order: photo on a light tinted panel → name at card-title size → one mono or small-caps spec line with bullet separators ("Eiken • 13 treden • 90 cm") → optional row of 4-6 small colour or finish swatch dots → price or "vanaf" line → one full-width outlined button or a text link. Status tags ("Nieuw", "Uitverkocht") sit small in a corner of the photo. The one-model variant centres a single product on a panel with its neighbours cropped at both edges and the swatches below.
**Why it works:** B2B and home-improvement visitors compare on specs; putting them in a single scannable line beats a paragraph.
**Fits:** warm-daylight, flood-and-acid, billboard-condensed · **Breaks:** campaign-poster (a catalogue, which its "Not this direction" excludes)
**House translation:** Card is a hairline outline (or `plantion`'s 2px brand outline) instead of a shadow. Swatch dots are the one place real product colours appear; the accent stays on the button. warm-daylight: sentence-case spec line, no mono.
**Motion pairing:** `vault/swiper-slider-setup` (the row), `vault/cascading-slider`
**Sources:** [David](https://mobbin.com/sites/sections/18f7bbce-63f4-449c-9fd3-d3bcc1693a8f), [Samara](https://mobbin.com/sites/sections/74dc9f5f-ef02-4462-ab38-613c1df48af9), [Shupatto](https://mobbin.com/sites/sections/bfb22eca-a772-4cdf-bdaa-dfe0bdee0f56), [Graza](https://mobbin.com/sites/sections/e1617357-c934-4edb-a549-dde7bf356c30)

### The ruled shelf
**Anatomy:** Each row of the showcase opens with a full-width hairline and a tiny label on or just under it at the left ("Recent opgeleverd", "Onze catalogus"), sometimes with its filter chips inline to the right of the label. The row's content (cards, objects, a carousel) hangs below the rule. In the two-column version the label and its hairline occupy a narrow left column and the content fills the right three quarters. A page with several shelves reads like a well-kept archive.
**Why it works:** A stack of carousels stops looking repetitive when each is visibly filed under its own rule; it replaces the section heading with something quieter.
**Fits:** deep-ground-editorial, billboard-condensed, warm-daylight · **Breaks:** campaign-poster (too orderly)
**House translation:** The hairline is the house border (pull `### Borders`). Labels follow the direction's case rule. Use it for a second and third showcase row on the same page, not for the first.
**Motion pairing:** stramien's line-reveal: draw the rule left to right on enter, then stagger the row (pull `### Staggered group reveals`)
**Sources:** [A24](https://mobbin.com/sites/sections/f0a3c2c4-6fac-4813-b1dd-048ebaf3d30e), [Instrument](https://mobbin.com/sites/sections/2d0befd1-15d8-45b8-85c4-0898a4b266d8), [In Common With](https://mobbin.com/sites/sections/07c2b97f-3827-4887-b5dc-03e14b017fdb)

### Gutterless category mosaic
**Anatomy:** Category or audience tiles set edge to edge with no gutter (or a 1-2px seam): two wide tiles on the first row, three on the second, full container or full bleed. Each tile is one photograph with the category name set white, left-aligned, at the vertical middle or bottom-left, plus a small arrow. A variant runs five equal portrait tiles in one row and follows them with a text marquee of the remaining categories that did not get a photo.
**Why it works:** Photography-led navigation into the range; the missing gutters make five photos read as one image.
**Fits:** warm-daylight, billboard-condensed, flood-and-acid · **Breaks:** deep-ground-editorial when the photos are busy; it needs calmer crops there
**House translation:** Scrim only behind the label (pull `### Scrim only where type sits`). Square tiles for billboard-condensed, rounded outer corners only (the mosaic's four outer corners, not every tile) for the rounded directions.
**Motion pairing:** `vault/collage-focus-card-on-hover` (hovered tile grows, siblings recede), `mwg/effect035` (hovered row expands while its neighbour shrinks)
**Sources:** [Rains](https://mobbin.com/sites/sections/5a58cd39-a8f8-4bcc-aba3-4f33fe421743), [Square](https://mobbin.com/sites/sections/d2ad9c26-9acf-4f2a-b735-fe3652bff0f7), [Jasper](https://mobbin.com/sites/sections/e16d6504-7ee9-448c-a243-fb3f24238cfc), [Cohere](https://mobbin.com/sites/sections/67216acf-375e-430d-b218-a463f7a2613d)

### One lead story, the rest as text
**Anatomy:** News or cases split unequally. One lead item takes about two thirds of the width with a large photo (title, category and date overlaid bottom-left, or set on a tinted text panel beside the photo). The remaining 3-4 items stack in the last third as text-only entries in hairline boxes or rows: category label, title, byline and date. No thumbnails in the stack. A numbered variant drops images entirely and puts a huge outlined or ghost-tint index number (00, 01, 02) above each title, with the lead item at double width.
**Why it works:** News sections usually fail on weak stock thumbnails; this shows one good image and lets the rest be headlines.
**Fits:** deep-ground-editorial, billboard-condensed, warm-daylight · **Breaks:** none; flood-and-acid should put the lead on a colour panel instead of a photo
**House translation:** Hairline boxes, never shadowed cards. The ghost numbers are a tint of the ink, not the accent. billboard-condensed can set the lead title heavy uppercase condensed on a grey panel with a small dark label chip ("Uitgelicht").
**Motion pairing:** `mwg/effect037` (images revealed through a scroll-driven gradient mask) on the lead only
**Sources:** [FARFETCH](https://mobbin.com/sites/sections/bb0c9b72-80a7-4680-9496-386752a3b302), [Apple](https://mobbin.com/sites/sections/dfca67a3-ecd3-4204-b091-74b9370f04da), [Greptile](https://mobbin.com/sites/sections/519bc7d5-f7fe-419c-a0f9-d1bced6695bc), [United Carriers](https://mobbin.com/sites/sections/4841bee1-c825-4fe9-ac67-c00e1ef3edff)

### Dated rows for news and events
**Anatomy:** Full-width rows instead of cards. A narrow left column holds the date (and for events the time and a small city chip in ink), the wide middle holds the title at card-title size plus one line of excerpt or address, and an optional image or "Lees" pill sits at the right. Rows are separated by hairlines. Columns can also run vertically: three news items side by side separated by vertical hairlines, date above title, small "Lees meer" below. For events, a thin coloured bar left of the date can code the event type (open dag / webinar / beurs).
**Why it works:** The date is the most important fact about news and events, and this is the only layout that puts it first. It works with no imagery at all.
**Fits:** all five · **Breaks:** none
**House translation:** City chips and type bars use functional or tinted neutrals, not the accent (the accent is spent on the register button). warm-daylight: sentence-case dates ("12 maart"), no mono.
**Motion pairing:** `vault/events-calendar-date-picker` when there are many events, otherwise stagger the rows (pull `### Staggered group reveals`)
**Sources:** [Grok](https://mobbin.com/sites/sections/9e26365a-08a8-43c0-a8d8-837d5dce0f17), [Hims](https://mobbin.com/sites/sections/95308873-d6d2-4f0f-94f2-4ce9756fe584), [Sana](https://mobbin.com/sites/sections/199ca363-50b6-46bd-bca0-129c0ed49114), [Airtable](https://mobbin.com/sites/sections/be52f1cf-3d85-4bc0-9d3d-f0bd75b48ba0), [Linktree](https://mobbin.com/sites/sections/153ab762-0665-40f3-ad7f-e53f51e17181)

### Then versus now
**Anatomy:** A before/after pair for a renovation, a transition or a customer outcome. Either a drag-splitter over one photo (old stair / new stair), or two equal panels side by side: left on the tinted neutral labelled "Voorheen" with a quote or photo, right on a slightly darker or brand-tinted panel labelled "Nu" with the result and a link. A text version runs as a two-column table: left column "Uw situatie nu", right column "Met ons", matching rows, a small arrow chip sitting on the centre divider.
**Why it works:** The most persuasive showcase for renovation, workwear, installation and consultancy clients is the difference, not the result.
**Fits:** warm-daylight, flood-and-acid, deep-ground-editorial · **Breaks:** billboard-condensed only in the table form; the photo splitter suits it fine
**House translation:** The "after" panel may take the brand's deep colour, not the accent. No shadow on the splitter handle; a hairline circle with arrows in the accent.
**Motion pairing:** `vault/before-after-split-slider`
**Sources:** [Deel](https://mobbin.com/sites/sections/f7839be1-9379-468c-9b5d-8db428723ae3), [Ploy](https://mobbin.com/sites/sections/9138eef2-4217-4b65-bdac-b9f7909c6d40)

### One-at-a-time stage
**Anatomy:** A carousel that shows one item fully, centred and large, rather than a row. Neighbours appear either as cropped slivers at both edges, or as small thumbnail cards on either side with a title and "Vorige" / "Volgende" label. The active item's name sits in a pill between two round arrow buttons, or a thumbnail strip sits bottom-right with the active thumb at full opacity and the rest dimmed. Progress can be a thin segmented scrubber under the stage instead of dots.
**Why it works:** For a small range (3-8 models, units, projects) every item gets hero treatment and the visitor always knows where they are.
**Fits:** flood-and-acid, warm-daylight, deep-ground-editorial · **Breaks:** none
**House translation:** Arrow buttons are the house arrow tile (pull `### Button plus a detached arrow tile`). The name pill can be the accent — it is interaction, which is allowed.
**Motion pairing:** `vault/parallax-image-gallery-with-thumbnails`, `vault/centered-looping-slider`, `vault/layered-image-slider`
**Sources:** [Samara](https://mobbin.com/sites/sections/74dc9f5f-ef02-4462-ab38-613c1df48af9), [Mistral AI](https://mobbin.com/sites/sections/fc0d02b9-2df2-4539-8819-51c2d1e0bf64), [MANA Yerba Maté](https://mobbin.com/sites/sections/77d177cd-7bbb-47d8-806d-2f41eb382780), [Atlas](https://mobbin.com/sites/sections/2f379c3d-dfcb-4eb2-8a2f-d01cc298f5f5), [Cohere](https://mobbin.com/sites/sections/67216acf-375e-430d-b218-a463f7a2613d)

### Full-bleed case slideshow with a tab strip
**Anatomy:** A section-height, full-bleed photo slideshow of cases or services. The item name sits centred in display type; a strip of all item names runs along the top of the section as small tabs (active tab filled); a paragraph and two buttons sit bottom-right; square arrow buttons bottom-left. The next item's name can peek at the right edge or run rotated up the left edge. A half-bleed variant keeps a cream text column on the left (issue title, numbered list) and runs the slideshow on the right half with caption and dots at its bottom.
**Why it works:** Puts the showcase at hero scale mid-page, a reset after a dense capability block, and lets the client's best photos sell.
**Fits:** billboard-condensed, warm-daylight, deep-ground-editorial · **Breaks:** flood-and-acid (it needs strong photography, which that direction assumes is missing)
**House translation:** Scrim weighted to where the type sits. Tabs in the direction's case; billboard-condensed sets the centred name uppercase condensed. Autoplay only with a visible pause affordance.
**Motion pairing:** `vault/auto-image-cycle-slideshow`, `mwg/effect031` (sections pin and recede as the next arrives) for a scroll-driven version
**Sources:** [YLLW](https://mobbin.com/sites/sections/20db4fde-5843-481a-9907-f12cd851e211), [Pentagram](https://mobbin.com/sites/sections/21fcb0a7-5769-483c-aa47-9841911d884c), [Faculty Department](https://mobbin.com/sites/sections/59838174-70f1-4a04-9985-8541f4e69473)

### The three-part caption row
**Anatomy:** Under (or above) a large case image, the caption is split across the full image width into three aligned parts: name left, discipline or type centre, sector or place right in grey. The "facts first" variant puts a hairline and three tiny-label-over-value columns (Opdrachtgever / Jaar / Rol) directly above a full-width image, under a sentence-length headline. Listings add a mono location under the name and a "vanaf" price right-aligned. Tags ("Nieuw", "Uitgelicht") sit as small outlined labels top-left inside the photo.
**Why it works:** Gives a single featured case the gravity of an editorial spread; the caption does the work a card body normally does, so the image can go edge to edge.
**Fits:** billboard-condensed, deep-ground-editorial, warm-daylight · **Breaks:** none
**House translation:** Hairline rule, no card. The outlined tag is a hairline pill in white or ink, not an accent chip. Use for one featured case on the homepage, or every item on a 2-up project overview.
**Motion pairing:** stramien's clip reveal on the image (pull `### Reveal character — clip versus fade`)
**Sources:** [Büro](https://mobbin.com/sites/sections/2c741505-173b-4cfa-a885-ca4429184887), [MOUTHWASH Studio](https://mobbin.com/sites/sections/d02fbdd0-57c7-42b6-864f-232c1f30af1e), [KOBU](https://mobbin.com/sites/sections/4226456d-e845-483a-ad1b-305a93fe7d36), [Readymag](https://mobbin.com/sites/sections/18bf1b78-4281-4c65-b79c-443af2b345ec), [YLLW](https://mobbin.com/sites/sections/7c3edb84-022f-4919-a1db-88f42afdc7ce)

### The result on the case card
**Anatomy:** Each case card leads with its outcome. A small uppercase or small-caps metric sits top-left over the photo ("30% minder uitval", "12 weken sneller") and the card's title below is phrased as a question or a how ("Hoe Eckeveld 400 medewerkers kleedde"). Denser version: a hairline card with client logo, two lines of context, a large stat number with its label, and "Lees het verhaal →". A tonal variant sits the stat or quote on a darker panel of the same hue inside a pastel card, like a book standing in a box.
**Why it works:** Turns a gallery into proof without needing a separate stats section; the number is the hook that earns the click.
**Fits:** flood-and-acid, campaign-poster, deep-ground-editorial · **Breaks:** warm-daylight in the uppercase form; use sentence case there
**House translation:** Same-hue tonal panels are allowed; an accent-coloured card background is not (the accent is punctuation). No shadows on the hairline cards. Numbers must come from the client — never invent a metric in the design.
**Motion pairing:** stramien's count-up (pull `### Count-up statistics`) on the stat only
**Sources:** [Contra](https://mobbin.com/sites/sections/005afd6c-c2e6-4b81-8b19-b0453d4871df), [Webflow](https://mobbin.com/sites/sections/3502f1dd-e1b0-4ae9-bd67-7ec2228ffca7), [Tines](https://mobbin.com/sites/sections/d7394009-61e7-4170-8a9f-a34aaca78a25), [Deel](https://mobbin.com/sites/sections/a2bba4b3-ae3b-4e01-8127-c95108094fe2)

### Scattered grid with air
**Anatomy:** Photos of deliberately different sizes and aspect ratios placed on an irregular grid with large empty cells between them — one large image in the lower left, small ones stepping up the right, lots of ground showing. Captions are tiny, inside the photo bottom-left or directly beneath. The dense version is a field of small thumbnails of varying aspect in an evenly spaced grid on white, each thumbnail a different shape.
**Why it works:** Editorial rhythm for a client with a lot of good photography; reads as a lookbook instead of a product grid.
**Fits:** deep-ground-editorial, billboard-condensed · **Breaks:** warm-daylight (feels unstructured where reassurance is the job), campaign-poster (competes with its rotation device)
**House translation:** Square or direction-radius images, no borders, no shadows. Keep it to one section; a whole page of scatter loses the grid.
**Motion pairing:** `mwg/effect034` (columns scrolling at different speeds), `vault/global-parallax-setup`, `vault/masonry-grid`
**Sources:** [Rains](https://mobbin.com/sites/sections/c77c3bef-14d0-4802-8a89-479fc3465904), [MOUTHWASH Studio](https://mobbin.com/sites/sections/9c2b6408-fce2-44db-9c0b-3def5bddba12), [Aino Agency](https://mobbin.com/sites/sections/a5c384c1-a04c-4c45-b077-25f5f5d646d9), [Koto](https://mobbin.com/sites/sections/d820c5ae-eeff-4b27-bf9b-4f78df222c89)

### The filmstrip archive
**Anatomy:** A single line of small thumbnails running the full width (or bleeding both edges), each with a catalogue code or two-line uppercase name beneath ("A014 Sokken", "Project 134"). Dotted or solid hairlines above and below make it a strip. Corner meta frames the section: a range bottom-left ("Klanten — 2013/2026"), a "(Scroll)" hint bottom-right. It can run along the bottom edge of a hero as a ticker of recent cases.
**Why it works:** Shows volume and history in a quarter of the height a card row needs; a good closer for a homepage showcase that already had a featured case above it.
**Fits:** billboard-condensed, deep-ground-editorial · **Breaks:** warm-daylight (codes and uppercase), flood-and-acid (too quiet)
**House translation:** Thumbnails square or direction-radius, no card. The codes are real project numbers or years, never invented.
**Motion pairing:** `vault/marquee-with-scroll-direction`, `mwg/effect019` (infinite row that stretches with scroll velocity)
**Sources:** [MOUTHWASH Studio](https://mobbin.com/sites/sections/672f92e4-3ef9-49c3-b9f5-dc2b4ade1c02), [Freshman](https://mobbin.com/sites/sections/1a15a6d9-be03-4761-9a3a-30ec06495846), [Vucko](https://mobbin.com/sites/sections/ceab4ab4-d046-4356-bde4-32acd9781fa8), [Aino Agency](https://mobbin.com/sites/sections/6e82f83c-f6fb-410d-ad9c-cdd19a453bb8)

### Vacancies grouped by department
**Anatomy:** For recruitment-heavy clients, a homepage or overview teaser of open roles. Department name large on the left, spanning its roles; each role a hairline row with title, location and hours (or "Fulltime") right-aligned and an arrow at the far right. Alternatives: department as a small outlined chip above each role with a one-line description; department pill tabs with a count badge. Ends with an "Open sollicitatie" row.
**Why it works:** Scannable by the one question job seekers have (is there something for me, where), and it looks full even with three roles.
**Fits:** warm-daylight, deep-ground-editorial, flood-and-acid · **Breaks:** none
**House translation:** Hairline rows, no cards. Department heading may take the brand's deep colour; the accent is on the arrow tile or the hover state only.
**Motion pairing:** `vault/directional-list-hover`
**Sources:** [Upwork](https://mobbin.com/sites/sections/cf9adcf9-daec-42d3-b942-1fd3152db0a4), [Tines](https://mobbin.com/sites/sections/930c8997-584e-424d-9ee6-645f7232ebe3), [Tailscale](https://mobbin.com/sites/sections/e4112960-8c98-4240-b0d7-6817baf6c558), [Attio](https://mobbin.com/sites/sections/0bd60664-08fc-46e4-8866-42c7c576156f), [Linear](https://mobbin.com/sites/sections/b94b791e-21d7-46d0-95e8-cd3ec25fc5ee)

## Single-sourced techniques

Seen on one Mobbin site only. Worth a try as a signature moment, but not a pattern yet.

### Title straddling a split
**Anatomy:** 50/50 section: photo left, light panel right. The client or project name sits centred in giant uppercase across the seam, so the letters change colour where they cross from photo to panel. A small credits table (uppercase labels, values in columns) fills the lower right; a "01 // 11" counter sits bottom-right.
**Why it works:** A featured case becomes a poster with no extra elements.
**Fits:** billboard-condensed · **Breaks:** warm-daylight, deep-ground-editorial (both avoid uppercase display)
**House translation:** Two-colour type via `mix-blend-mode: difference` or two clipped copies; no shadow on the type to fake contrast.
**Motion pairing:** `mwg/effect015` (duplicate word revealed through a mask)
**Sources:** [Nite Riot](https://mobbin.com/sites/sections/d8c6801c-2eaa-48ed-b55b-5c74d0042347)

### Packshot breaking out of its panel
**Anatomy:** Product panels in a flat brand-tinted colour, stepped down in height left to right. Each packshot sits on its panel but its top third rises above the panel's top edge. The arrow tile sits in the panel's top-right, the name and a small uppercase description in its lower half.
**Why it works:** Overlap as depth (pull `### Overlap as a joining device`) applied to a product range; flat colour and zero shadow still read as three-dimensional.
**Fits:** flood-and-acid, warm-daylight · **Breaks:** billboard-condensed
**House translation:** Panel colour is a tint of the brand, not the accent. The overlap is the depth device; no shadow under the packshot.
**Motion pairing:** `vault/global-parallax-setup` (packshot drifts slightly faster than its panel)
**Sources:** [Farm Minerals](https://mobbin.com/sites/sections/8000e65f-fa00-4225-ae66-f35575dab264)

### Images on an arc
**Anatomy:** Seven or so rounded photos placed along a shallow arc across the section, each rotated to follow the curve, the centre one upright and slightly larger; one caption line centred below.
**Why it works:** A gallery that reads as a single gesture; good for an about or "our region" showcase.
**Fits:** campaign-poster, flood-and-acid · **Breaks:** billboard-condensed, warm-daylight
**House translation:** Pull `### Rotation as a layout device` first; no shadows on the rotated photos.
**Motion pairing:** `mwg/effect007` (images follow a rounded trajectory on scroll), `mwg/effect043` (cards fan out along a curve)
**Sources:** [Inkwell](https://mobbin.com/sites/sections/8babaa20-2df7-425f-9cd7-df0762bd94e0)

### Stacked locations with team chips
**Anatomy:** Office or showroom locations as a stack of giant serif city names, centred. The active city is in full ink with small accent pills naming the people who work there overlapping its letters; the others are pale. Address, phone and email appear in a small box beneath the active city.
**Why it works:** Combines the location list with the named human (pull `### The named human`).
**Fits:** deep-ground-editorial, warm-daylight (sentence case) · **Breaks:** billboard-condensed
**House translation:** The address box is a hairline panel on the ground, not a shadowed card. Name pills in the accent are allowed: they are small and interactive.
**Motion pairing:** `vault/directional-list-hover`
**Sources:** [Craft Agency](https://mobbin.com/sites/sections/b9f10246-c8f9-47a1-9b5b-777dd981534e)

### Location accordion with an autoplaying photo
**Anatomy:** A list of locations on the left; the open item shows its address and a link to its roles, with a thin progress bar across its top that fills over a few seconds before the next location opens. A large photo on the right swaps with the open item.
**Why it works:** A calm autoplay for multi-site clients (dealers, branches, business park units) that still works as a manual accordion.
**Fits:** warm-daylight, deep-ground-editorial · **Breaks:** billboard-condensed
**House translation:** The progress bar is a hairline in the accent. Pause autoplay on hover and under `prefers-reduced-motion`.
**Motion pairing:** `vault/sticky-features`
**Sources:** [Airtable](https://mobbin.com/sites/sections/b345f2cf-a38e-4edd-938c-e69509668ce9)
