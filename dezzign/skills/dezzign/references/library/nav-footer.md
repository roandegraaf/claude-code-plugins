# Library — Navigation and footer

Outside inspiration from Mobbin (swept 2026-09-30), translated into house rules. Not evidence from our own builds — `stramien.md` stays the source of truth; this file is the variant pool that step 5 of SKILL.md draws from to avoid the default spine.

What the stramien already fixes for this slot, and this file does not repeat: the utility topbar, the two header behaviours (transparent-to-solid, floating detached pill), the accent nav CTA, the button with a detached arrow tile, title-plus-description mega menus, the full-screen mobile overlay as the default, four footer columns, the footer as a composition, the pre-footer CTA band, the legal row with "Realisatie door Zeker Zichtbaar", the inset footer and the three closing devices. Everything below is either a new shape or a variant that says how it differs.

Values are proportions read off low-resolution screenshots. Anything given as a number is `(estimated)`; measure again before it goes into a fingerprint.

## Patterns

### Split nav objects

**Anatomy:** The header breaks into two or three separate floating objects rather than one bar. Typical split: a wide card on the left holding the logo and the main links, and a small card on the right holding login, language and the CTA. The objects are inset from the viewport edge, share a top line and a radius, and keep a clear gap of ground between them (roughly 2-5% of the viewport width `(estimated)`). A three-part variant puts the links in a centred tinted pill, with the logo bare on the left and the CTA bare on the right. `MindMarket` adds a round menu button as the last item of the link card.
**Why it works:** The CTA gets its own object and is no longer the last item in a list, so it reads as a destination rather than a link. The ground showing between the objects keeps the hero visible behind the nav.
**Fits:** `deep-ground-editorial`, `warm-daylight`, `flood-and-acid` · **Breaks:** `billboard-condensed` (rounded floating cards fight its square, full-bleed chrome)
**House translation:** No shadow under the cards. Separate them from the hero by fill alone (white on photo, or a translucent dark fill with a hairline ring on dark grounds). The CTA card is the only place the accent appears. This formalises what `businessparksoest` already does with its CTA floating outside the teal pill; it is now a two-source move from outside as well.
**Motion pairing:** `vault/detect-scrolling-direction.md` to hide the link card on scroll-down and keep the CTA card pinned.
**Sources:** [Butter](https://mobbin.com/sites/sections/27482a00-3ca5-4d95-ad84-b2b06e581f00), [Frontify](https://mobbin.com/sites/sections/62984214-7e41-43f6-b3fe-4ada5446fc18), [MindMarket](https://mobbin.com/sites/sections/27e89820-52c7-4f54-9c8c-fd56dc60e428), [Maxima Therapy](https://mobbin.com/sites/sections/fc167e3e-e2f2-4340-bfcf-52cc593edfbb), [AngelList](https://mobbin.com/sites/sections/df6f47be-606e-488d-b2c9-a3fe010d35b9)

### A face on the CTA

**Anatomy:** The nav or footer CTA carries a small circular portrait (one face, or two or three overlapping) inside the button, placed where the arrow tile would normally sit. The label stays short ("Get a quote", "Book demo").
**Why it works:** It puts the named human, the house conversion device, into the smallest possible space. The visitor sees who answers before clicking.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `flood-and-acid` · **Breaks:** `campaign-poster` (campaign sites have no single adviser to show)
**House translation:** The face replaces the detached arrow tile. It does not sit alongside it, because two affordances in one button cancel out. Use the real adviser from the site's named-human section, never stock. Keep the button fill as the accent.
**Sources:** [MindMarket](https://mobbin.com/sites/sections/96f32b7e-e4fa-4626-bb59-4fdcc5ad4a29), [Mora](https://mobbin.com/sites/sections/6549fe95-9dc6-4b76-adf2-638cd1d0c4a2)

### Centre-docked compact pill

**Anatomy:** One small pill, horizontally centred at the top, much narrower than the container (roughly a quarter to a third of the viewport `(estimated)`). It holds three roles in a fixed order: menu trigger | wordmark | one action (cart, contact or CTA). The zones are divided by hairline rules or by gaps. The rest of the top edge is empty, so the hero runs untouched to both corners. `Fourmula AI` puts a live scroll-progress readout ("0%") inside the pill.
**Why it works:** The nav becomes a small object in the middle of the composition instead of chrome across it. Heavy imagery and edge-to-edge type get the corners back.
**Fits:** `deep-ground-editorial`, `flood-and-acid`, `campaign-poster` · **Breaks:** `warm-daylight` (the utility topbar is near-mandatory there and needs a full-width bar), any site with more than about five top-level items
**House translation:** Menu, wordmark and action only. Everything else goes into the full-screen overlay behind the menu trigger, as `mrcopilot` already does at desktop width. Use a solid or translucent fill with a hairline ring, never a shadow. The action is the only accent in the pill.
**Motion pairing:** `vault/centered-scaling-navigation-bar.md` (the pill scales open into the menu).
**Sources:** [VanMoof](https://mobbin.com/sites/sections/a2eb514d-563f-4fb9-aaff-8f235f43d666), [Analogue Agency](https://mobbin.com/sites/sections/2897fc9c-97a9-48e6-9b96-ea02583b012d), [Kalstore](https://mobbin.com/sites/sections/c4684ec0-3a9d-4eaa-9b5c-96f52e9d6e15), [Fourmula AI](https://mobbin.com/sites/sections/3332ff1d-967c-4f6a-99fa-f9a4734c181b)

### Centred mark, split sides

**Anatomy:** The logo or mark sits dead centre. The links split into two groups either side of it, or reduce to a single word on each side ("MENU" left, one action right, as on `A24` and `Monte`). With split links, the left side holds the navigational links and the right side holds utility (search, log in, contact). The bar is transparent over the hero.
**Why it works:** The symmetry reads as established and editorial, like a magazine masthead. The single-word version is the calmest header possible that still offers an action.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `warm-daylight` (sentence case only) · **Breaks:** `flood-and-acid` when the logo is long (a centred wordmark crowds the links)
**House translation:** Keep the nav CTA hard right as the stramien requires. It takes the right-hand single-word slot, filled with the accent. On `billboard-condensed` the words go uppercase and tracked; on `warm-daylight` they stay sentence case.
**Motion pairing:** `vault/check-section-theme-on-scroll.md` (the transparent bar flips colour as dark and light sections pass under it).
**Sources:** [A24](https://mobbin.com/sites/sections/6273675b-53ef-400e-a5b4-77ff67a08a33), [Monte](https://mobbin.com/sites/sections/2f083c6a-8cf1-40af-823b-bee1ce8f419a), [Hex](https://mobbin.com/sites/sections/13d9a28c-126f-4364-acaa-7cdb47e77a7b), [Yellowbird](https://mobbin.com/sites/sections/40234df9-9e87-4b29-ae2f-aea3ff95bb50), [Zellerfeld](https://mobbin.com/sites/sections/301cf56f-08e8-4ab4-b44b-43d80ffd3e35)

### Hairline-ruled frame

**Anatomy:** The chrome is drawn with rules instead of fills. In the header, a full-width band has a hairline above and below, and the links sit spread across it at a larger size than usual. In the footer, the whole block is a grid of cells ruled on every side (four columns by two or three rows is typical), with a small label in each cell's top-left corner and content below it. The vertical rules often run on past the footer, through the image or wordmark beneath. Mono or small uppercase labels are common, sometimes with a `▸` marker.
**Why it works:** It looks engineered, like a specification sheet or a technical drawing, without adding a single fill colour. It suits clients whose product is precise.
**Fits:** `billboard-condensed`, `deep-ground-editorial` · **Breaks:** `warm-daylight` (the tracked uppercase labels are banned there, and the result reads cold), `campaign-poster`
**House translation:** 1px hairlines in the text colour at low opacity. This is the house's own "hairline, not shadow" depth move applied to structure. Cells stay square-cornered, so pair it with square images (`ul`, `biltz`, `osnabrugge`). No accent in the grid except the one CTA cell.
**Sources:** [SOTF footer](https://mobbin.com/sites/sections/c6e14a19-78bb-4396-9a3d-387d3f996980), [SOTF header](https://mobbin.com/sites/sections/c2b03cf7-6f55-431f-8876-0f56beecba25), [Yellowbird](https://mobbin.com/sites/sections/40234df9-9e87-4b29-ae2f-aea3ff95bb50), [Corgi](https://mobbin.com/sites/sections/63e60bfc-1a20-41d0-a3b3-2da8a43a3723), [Mother Design](https://mobbin.com/sites/sections/23a43fc2-e616-4b49-945c-4a0dd97df268), [Retool](https://mobbin.com/sites/sections/fa5c03c7-be13-4344-b36f-16b5edddc2a0)

### Docked tab on the nav

**Anatomy:** A small secondary element attached flush to the nav's top or bottom edge, sharing its width or centred on it. It carries one timely item: "Directions to the office >", or a thumbnail plus "GET TICKETS →". It reads as part of the nav object, not as a separate banner.
**Why it works:** It does the job of a utility topbar for a single fact without spending a whole strip across the page. It can be switched off per page.
**Fits:** `warm-daylight`, `flood-and-acid`, `campaign-poster` · **Breaks:** `billboard-condensed` (it has a real topbar or nothing)
**House translation:** Use it for one fact the visitor acts on: a showroom visit, a live vacancy, an open day, "nog 34 units beschikbaar". This is the tab-sized version of the `businessparksoest` availability meter. Fill it with the accent only if the nav CTA is not already accent. Otherwise use the tinted neutral.
**Sources:** [TravelPerk](https://mobbin.com/sites/sections/a170a1a3-2b57-40cf-aa68-bb257b17a561), [NEON](https://mobbin.com/sites/sections/6de8d598-38b0-4d5a-a228-5fc2e4f41930)

### Bottom-docked nav bar

**Anatomy:** The whole navigation moves to a floating bar centred at the bottom of the viewport. It holds a wordmark or "Open menu", one or two links, and a filled CTA on its right end. `Büro` also shows the current page as a chip inside the bar. The top edge of the page is left completely empty.
**Why it works:** It sits under the thumb on phones and keeps the whole hero clear on desktop. It differs from the `plantion` pill: there the bottom bar is extra shortcuts beside a normal header, while here it *is* the header.
**Fits:** `flood-and-acid`, `deep-ground-editorial`, `campaign-poster` · **Breaks:** `warm-daylight` (the utility topbar and trust facts need the top), sites with a mega menu
**House translation:** The CTA inside the bar is the page's accent. Give the bar a solid fill with a hairline ring and no shadow. The menu trigger opens the full-screen overlay upward.
**Motion pairing:** `vault/expanding-bottom-navigation.md`, `vault/apple-dock-navigation-bar.md`.
**Sources:** [Superpower](https://mobbin.com/sites/sections/29f16f47-5d3f-43b7-a885-bee6eb9b2ead), [Büro](https://mobbin.com/sites/sections/96246ad7-c31d-4134-b867-1c73db9fcb78)

### In-page anchor sub-nav

**Anatomy:** On a long inner page (a service, product or project), a short stacked list of the page's own sections sits in the top-left, small and quiet. A dot or bullet marks the section in view. A single "→ go deeper" link sits on the opposite side. `mymind` instead colour-codes each link with a small coloured dot inside its floating nav pill. `Runway` sets the list at a large size under an "Index" label beside the intro paragraph.
**Why it works:** Long service pages get a table of contents without a sidebar, and the current-section dot shows the visitor where they are.
**Fits:** `deep-ground-editorial`, `warm-daylight`, `billboard-condensed` · **Breaks:** nothing structurally; skip it on pages with fewer than four sections
**House translation:** The active dot is one of the accent's permitted punctuation spots. Links in sentence case except on `billboard-condensed`. Pair it with Lenis smooth scroll, which six of the eleven sites already run.
**Motion pairing:** `vault/onepage-progress-navigation.md`, `vault/section-anchor-dock.md`.
**Sources:** [In Common With](https://mobbin.com/sites/sections/081509cf-757c-4c5a-bc9d-2375404f50f4), [mymind](https://mobbin.com/sites/sections/5fca8ab9-a26a-4b1b-82f9-b41324acb0d0), [Runway](https://mobbin.com/sites/sections/754769a3-efe7-48cb-98bb-547e66bfdfee)

### Mega menu led by display-size links

**Anatomy:** A full-width panel drops from the bar (`Hers` rounds only its bottom corners). The first column holds three to six top-level destinations set at display size, many times the size of the rest. The middle columns hold small group labels over ordinary-size links. The last column holds one feature card: an image, a title, one line and an arrow. Variant: the lead column acts as a switch, and hovering an item swaps the right pane to a grid of photo tiles with labels (`Etsy`, `ZARA`). `lululemon` closes the panel with a hairline and a row of quick filters plus "Shop all" at the far right.
**Why it works:** It keeps the stramien's audience grouping but adds hierarchy the flat title-plus-description panel lacks. The big links answer "where do I go" and the small ones answer "exactly which page".
**Fits:** `warm-daylight` (the `plantion` audience menu is the obvious candidate), `deep-ground-editorial`, `billboard-condensed` · **Breaks:** `campaign-poster` (too few pages to justify it)
**House translation:** The feature card sits on panel-on-ground contrast (tinted neutral card on a white panel) with no shadow. Its radius follows the direction's card radius. The page-dimming scrim behind the panel (`osnabrugge`, 0.45s) stays. Photo tiles use documentary photography of the real product, never lifestyle stock.
**Motion pairing:** `vault/mega-navigation-directional-hover.md`, `vault/multilevel-navigation.md`; `mwg/effect030.md` (Images on hover) for the image-pane variant.
**Sources:** [Hers](https://mobbin.com/screens/39a7b0cf-7909-478c-b837-e6131c5b364b), [lululemon](https://mobbin.com/screens/597d7d8b-9199-47c2-b625-a8860c91f447), [ZARA](https://mobbin.com/screens/fab9fd81-4397-423b-a03a-0c5c778c92fa), [Selfridges](https://mobbin.com/screens/85dbd6d2-e22e-47e1-b61a-1c1ef517dcfe), [Etsy](https://mobbin.com/screens/1209feda-a09d-4603-84cb-699183307c8c)

### Full-screen menu as a numbered ledger

**Anatomy:** The overlay splits: one side is a single large image in a clipped rounded panel, the other side is the link list. Each link is a full-width row ruled by hairlines above and below: a small index number (01-08) on the left, the label in heavy display type, an arrow on the far right. Rows are grouped under small bracketed labels ("[ Product ]", "[ Company ]"). The hovered row takes a slightly lighter fill. Socials sit as small square chips in the bottom corner. The text-only variant (`Open`) drops the image, sets four or five links huge with trailing arrows, and puts an underline newsletter field, an app badge and a single row of small secondary links evenly spread along the bottom edge.
**Why it works:** The stramien prescribes the full-screen overlay but not its inside. This gives it an interior that reads as designed rather than a centred list of links.
**Fits:** `billboard-condensed` (heavy uppercase rows), `deep-ground-editorial` (the light, text-only `Open` variant), `flood-and-acid` · **Breaks:** `warm-daylight` (the index numbers and uppercase feel mechanical there; use the lighter variant in sentence case if needed)
**House translation:** The hover fill is a tint of the ground, not the accent. The accent appears only on the CTA inside the overlay. On `billboard-condensed` the image panel is square-cornered.
**Motion pairing:** `vault/bold-full-screen-navigation.md`, `vault/side-navigation-with-wipe-effect.md`; the rows stagger in like the house group reveals.
**Sources:** [BitcoinOS](https://mobbin.com/sites/sections/c1dc63b8-957a-4567-970b-bd3a21232beb), [Open](https://mobbin.com/screens/c59ad58b-6c05-4fae-a3ec-18897e0fbae1), [ZARA](https://mobbin.com/screens/fab9fd81-4397-423b-a03a-0c5c778c92fa)

### Wordmark as the floor

**Anatomy:** The footer ends on the company wordmark set edge to edge across the full container width, often with the mark beside it. The link columns and meta text sit small *above* it. Four variants:
- **Full.** The wordmark sits whole and dominant (`MOUTHWASH`, `Structured`, `Zellerfeld`, `Wispr Flow`, `Retool`, `Opacity`, `Busy Bee Honey`).
- **Cropped.** The page's bottom edge cuts the wordmark partway (`BAGGU`, `Legora`).
- **Ghost.** The wordmark is set tone-on-tone at low contrast *behind* the footer grid or an inset footer panel (`Hims`, `Melius`, `SOTF`).
- **On top.** The wordmark opens the footer and the details sit below a hairline (`Mother Design`, `basement.studio`).

`Busy Bee Honey` runs one row of small, evenly spread uppercase links directly above the wordmark, which is the whole sitemap in one line.
**Why it works:** It is the cheapest closing flourish that still feels designed, and it works for clients with a strong logotype and no photography. Of the eleven house sites only `eckeveldkleding` does it; outside, it is everywhere.
**Fits:** `billboard-condensed`, `flood-and-acid`, `deep-ground-editorial` (ghost variant), `campaign-poster` · **Breaks:** `warm-daylight` when the logo is not a wordmark, and in any case keep it modest there
**House translation:** Pick one variant. It counts as the footer's one closing device from `### Closing devices worth stealing`, so do not pair it with the four-colour bar. The wordmark takes the text colour or the ghost tone, never the accent. The legal row with the agency credit stays below it, or above it in the cropped variant.
**Motion pairing:** `vault/footer-parallax-effect.md` (the footer slides up from under the page); `mwg/effect027.md` or `mwg/effect015.md` to build the wordmark letter by letter as it enters.
**Sources:** [MOUTHWASH Studio](https://mobbin.com/sites/sections/082f5fac-4648-4314-aa7d-a06fe0235b77), [Structured](https://mobbin.com/sites/sections/cf954a98-4f2e-41d3-b2a1-168e4ba0108d), [Zellerfeld](https://mobbin.com/sites/sections/18df6730-6569-49da-9c23-3bee32fbe638), [Wispr Flow](https://mobbin.com/sites/sections/d2b17651-2709-4db5-99f2-d14af9dd09b2), [BAGGU](https://mobbin.com/sites/sections/ddfad441-10db-4949-9baa-299e7e0edeee), [Legora](https://mobbin.com/sites/sections/74f66481-04ab-4abc-bf99-7878c607e1f6), [Hims](https://mobbin.com/sites/sections/7915399d-37f7-4214-a680-68b43afcd99e), [Melius](https://mobbin.com/sites/sections/541b0fd6-f736-44ee-a608-acb0e0a99ce5), [Busy Bee Honey](https://mobbin.com/sites/sections/0ee4aeb4-6372-49cc-af53-91b6a2f67ee7), [Mother Design](https://mobbin.com/sites/sections/23a43fc2-e616-4b49-945c-4a0dd97df268)

### Display-size footer links

**Anatomy:** Few links (four to eight per column, two to four columns) set at heading size instead of body size, stacked tightly. Small grey group labels sit above each column. `Retool` separates the columns with vertical hairlines. `basement.studio` stacks one column of large links in the centre and adds a superscript item count to some ("Showcase ²⁵").
**Why it works:** On a small site, four columns of 14px links are padding. Large links make the footer a second, calmer navigation.
**Fits:** `deep-ground-editorial` (light weight), `billboard-condensed` (uppercase), `warm-daylight` (sentence case, weight stepped up) · **Breaks:** large sites with 30 or more footer links
**House translation:** Sits between the stramien's "two columns when one half is a statement" and "the footer as a composition". Use it when the sitemap has twelve or fewer destinations. Hover is an underline or a colour change, not the accent.
**Motion pairing:** `vault/underline-link-animation.md`.
**Sources:** [Samara](https://mobbin.com/sites/sections/20212988-f6cd-4353-8e0a-67b6bb69e7da), [Retool](https://mobbin.com/sites/sections/6d33f45a-109f-414f-9112-4d461cc0f51f), [Hims investors](https://mobbin.com/sites/sections/9e01d28c-44a8-4ad2-a03a-5895b7fb7a57), [basement.studio](https://mobbin.com/sites/sections/f7f82a0b-b7c8-4e02-af47-68f629c5fa0c), [Mammoth Brands](https://mobbin.com/sites/sections/526eb747-eba7-47e6-851e-903150f3861f), [Opacity](https://mobbin.com/sites/sections/ea8ab734-447d-4422-a34d-82f98a6d61a8)

### Contact ledger

**Anatomy:** Contact is laid out as a ledger rather than link columns: rows split by hairlines, a label column on the left (Phone / Email / Recruitment / Press) and the value in a column to its right, or right-aligned. `Feather` draws a single vertical rule down the left edge of the block. `Waka Waka` splits the section 50/50, with three label/value rows top-left and a large black-and-white portrait bleeding off the right and bottom edges. `Koto` adds a small office photo with a mono caption ("SAY HELLO nyc@…") in the bottom-left.
**Why it works:** It reads as a list of direct lines to people, not a sitemap, and it gives the named human a footer-scale home.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `warm-daylight` · **Breaks:** `campaign-poster`
**House translation:** Put the real adviser's name in the label column and their direct number and email as the values. The portrait follows the direction's image rule: square on `billboard-condensed`, rounded elsewhere. No accent except the phone link's hover.
**Sources:** [Waka Waka](https://mobbin.com/sites/sections/b56359af-6400-4c8c-9788-8438596cf4a2), [Feather](https://mobbin.com/sites/sections/98f85e8c-3dcf-4f11-a37a-24e43a29ee0c), [Koto](https://mobbin.com/sites/sections/2d796987-2aad-48a2-b619-8757026054d6), [Contractbook](https://mobbin.com/sites/sections/14b9eca1-a041-49c5-95c2-685e70a03d91)

### Service-facts footer

**Anatomy:** The footer's top row is three equal, centred columns of operational facts under display-size headings: **Contact** (phone, email) / **Opening hours** (weekdays, weekends, *and* the holiday exceptions listed out) / **Find us** (address plus a plain "I need a real map →" link). A brand illustration or line drawing sits centred below, and the legal row closes. The B2B variant (`United Carriers`, `Contractbook`) puts head office, hotline, office hours and "Direction on Google" as labelled blocks, and gives each support channel its own hours line.
**Why it works:** It answers the three questions a returning visitor actually scrolls down for, and listing the holiday hours signals that someone maintains the site.
**Fits:** `warm-daylight` (this is its trust-device logic moved into the footer), `flood-and-acid` · **Breaks:** `deep-ground-editorial` (too chatty), `billboard-condensed` only if the client has no public location
**House translation:** Mark today's row in the hours column and add the open/closed pill that `warm-daylight` already asks for. The pill's green stays functional, not decorative. Display headings follow the direction's case: sentence case on `warm-daylight`.
**Motion pairing:** `vault/opening-hours-timetable.md` (live open/closed state).
**Sources:** [Monte](https://mobbin.com/sites/sections/6ecba422-fe26-482b-8225-8e24ec959d84), [United Carriers](https://mobbin.com/sites/sections/59327bcc-6028-4dbc-9beb-3ba7cc935191), [Contractbook](https://mobbin.com/sites/sections/14b9eca1-a041-49c5-95c2-685e70a03d91), [OpenTable](https://mobbin.com/sites/sections/8fe7fadd-1c8b-4a4a-b171-4e7470e0f640)

### Two-tone closing statement

**Anatomy:** The footer opens with a two-line statement at section-heading size. The first line is in the text colour; the second line is the same size in a muted grey ("On Demand Factory OS, / Delivered Overnight." · "Contact / Press and careers" · "Unlock AI-native analytics / Upgrade your insight"). `Humble` ends it with a single accent-coloured full stop. A CTA pair may sit on the right.
**Why it works:** It gives the footer a voice without a separate pre-footer band, and the grey second line creates hierarchy from one size and one family.
**Fits:** `deep-ground-editorial`, `flood-and-acid`, `warm-daylight` · **Breaks:** `billboard-condensed` (its statements are single, heavy and uppercase)
**House translation:** The accent full stop counts as the page's one highlighted word, so do not also highlight a word elsewhere in the footer. This is a lighter alternative to `### The pre-footer CTA band` on pages that already carry a named-human section.
**Sources:** [Humble](https://mobbin.com/sites/sections/07a09417-ce3c-4b74-a687-f11191cf3d0c), [Koto](https://mobbin.com/sites/sections/2d796987-2aad-48a2-b619-8757026054d6), [Mora](https://mobbin.com/sites/sections/6549fe95-9dc6-4b76-adf2-638cd1d0c4a2), [Calendly](https://mobbin.com/sites/sections/b78f17db-eeb0-4276-bbfa-31d7c0812601)

### Illustrated horizon

**Anatomy:** The bottom band of the footer is a scene running the full width: a line-drawn street of houses, lamp posts and birds (`Swap`), faint pencil sketches (`Opennote`), a painted landscape (`Corgi`), a photographic landscape rising out of the dark footer (`Legend`), pixel art (`Overmind`). The links sit above it on the plain ground. The scene has no text and ends at the page edge.
**Why it works:** The page lands on a place rather than on a legal row. For a grower, a farm or a business park, the client's own landscape is the natural last image.
**Fits:** `warm-daylight`, `campaign-poster`, `flood-and-acid` · **Breaks:** `billboard-condensed` and `deep-ground-editorial` unless the image is documentary photography
**House translation:** Use the client's real subject: the greenhouse roofline, the business park skyline, the fleet. Draw it in one line colour, or use a documentary photo fading into the footer ground. No scrim, except where type actually sits over it. It is the footer's one closing device.
**Motion pairing:** `vault/footer-parallax-effect.md`.
**Sources:** [Swap](https://mobbin.com/sites/sections/0cc6183c-2921-48ea-bfe9-d7c3d60bfed4), [Corgi](https://mobbin.com/sites/sections/63e60bfc-1a20-41d0-a3b3-2da8a43a3723), [Legend](https://mobbin.com/sites/sections/010b6e4d-1e73-4698-9e32-e4396c7d9357), [Opennote](https://mobbin.com/sites/sections/3dbc7c17-d1c9-4490-a394-33c61e52f471), [Overmind](https://mobbin.com/sites/sections/58672ff3-1506-487c-bb14-31bbbb7083cd)

### Live facts in the frame

**Anatomy:** Small, real-time facts placed in the page chrome: each office's local time and weather glyph beside its address (`Mother Design`: "New York ☁ 09 09 (GMT-4)"), a time readout in the header's top-right corner (`Koto`), "OPEN TODAY TIL 1:30PM" and the local temperature flanking the hero at mid-height (`Monte`), or a status pill with a green dot ("All services are online", `Hashnode`).
**Why it works:** A live value proves the site is current and the business is running. It is the stramien utility-topbar logic ("a standing fact a visitor checks") made live and moved into the frame.
**Fits:** `warm-daylight` (open-now), `deep-ground-editorial` (local time), `campaign-poster` · **Breaks:** nothing, but use one live fact per page, not three
**House translation:** Only facts the client can actually keep true: opening hours, "vandaag open tot 17:00", the number of units or vacancies. Green stays a functional status colour. Small type, sentence case except on `billboard-condensed`.
**Motion pairing:** `vault/dynamic-current-time.md`, `vault/opening-hours-timetable.md`.
**Sources:** [Mother Design](https://mobbin.com/sites/sections/23a43fc2-e616-4b49-945c-4a0dd97df268), [Koto](https://mobbin.com/sites/sections/39e37f57-918a-4504-907d-903229af27dc), [Monte](https://mobbin.com/sites/sections/2f083c6a-8cf1-40af-823b-bee1ce8f419a), [Hashnode](https://mobbin.com/sites/sections/85f1fb39-38cb-4717-805c-40c3e93c7eed)

### Certification row by the legal line

**Anatomy:** A short row of round or outlined badges (ISO 27001, SOC 2, GDPR, B Corp, LegitScript) sits by the legal row or under the logo, sometimes behind a small "COMPLIANT" label with a "+2" overflow chip. The lightest version is one outlined pill ("SOC 2 Certified") inline in the legal row.
**Why it works:** Accreditation is seen at the moment of trust (the footer check before calling) without taking a section.
**Fits:** all five; it is the small-footprint sibling of the `osnabrugge` hairline certificate fieldset · **Breaks:** nothing
**House translation:** For Dutch B2B clients the relevant marks are VCA, ISO 9001, Bouwend Nederland, Techniek Nederland, Keurmerk, Erkend Leerbedrijf. Render them monochrome in the footer text colour so a row of third-party logos does not introduce stray colours. Use the fieldset (stramien) when there are four or more to show, and this row when there are one to three.
**Sources:** [GitBook](https://mobbin.com/sites/sections/07fce9d9-6342-4764-bc82-944ac417688a), [Vanta](https://mobbin.com/sites/sections/15f32198-9410-4592-add8-a95d08db61ef), [Giga](https://mobbin.com/sites/sections/c5908fa0-2fc1-41dc-9669-9c55b0909a9f), [Paraform](https://mobbin.com/sites/sections/f1894b7d-f3ce-48a9-973b-e08e0404cdfc), [Fiasco](https://mobbin.com/sites/sections/af0c1930-9ed3-4ed4-9af0-dfbc96b3a625)

## Single-sourced techniques

One Mobbin site each. Use them as techniques, not patterns, and say so if one lands in a design.

### Audience switch in the topbar

**Anatomy:** The utility topbar carries two tabs, "For shoppers | For business", with the active one in bold. Switching swaps the entire nav below it.
**Why it works:** The stramien audience fork moves into the chrome, so the whole site bends to the visitor's role.
**Fits:** `warm-daylight` (`plantion`'s growers and buyers) · **Breaks:** single-audience sites
**House translation:** Sentence case. Mark the active tab with weight and an accent underline, not a fill.
**Sources:** [Klarna](https://mobbin.com/sites/sections/b955d30d-fd93-4b0d-99df-857e6aa81c91)

### Bento footer

**Anatomy:** The footer is a set of dark rounded tiles on a lighter ground with small, even gaps: a tall logo tile on the left, a newsletter tile (two underline fields and an arrow), a four-column links tile, and a full-width legal tile with "BACK TO TOP". The one CTA ("BOOK A CALL") is the only accent.
**Why it works:** It extends the panel-on-ground layout into the footer, one step beyond the single inset footer.
**Fits:** `flood-and-acid`, `deep-ground-editorial` · **Breaks:** `billboard-condensed`
**House translation:** The tile radius comes from the direction's card step. No shadows; the gaps show the ground.
**Sources:** [Patch](https://mobbin.com/sites/sections/57ed624f-1b3b-4f75-924c-933644ff77e2)

### Wordmark spread across the header

**Anatomy:** In the open menu, the letters of a short wordmark ("O p e n") are spaced out across the whole top bar, one letter per column.
**Why it works:** The logo becomes the layout grid.
**Fits:** `deep-ground-editorial`, `campaign-poster` · **Breaks:** long names
**House translation:** Only for logos of five letters or fewer.
**Sources:** [Open](https://mobbin.com/screens/a1869a59-77fb-4ff5-8149-527f1fb06747)

### Logo in a notch of the hero panel

**Anatomy:** The inset hero panel has a concave cut-out in its top-left corner. The logo sits in the notch on the page ground, with a small link chip beside it. The CTA sits in a matching notch top-right.
**Why it works:** Nav and hero become one shape. The result is distinctive and completely shadowless.
**Fits:** `deep-ground-editorial`, `flood-and-acid` · **Breaks:** full-bleed hero directions
**House translation:** It needs a reliable inverse corner radius. Check it in the build before promising it.
**Sources:** [Garden](https://mobbin.com/sites/sections/6a54d993-ed1c-4cef-bbe8-072534e7997c)

### Industries marquee and office map in the footer

**Anatomy:** A small "INDUSTRIES | SERVICES" tab switch sits above a marquee of sector names in large grey type. Below it: a head-office block with a "Direction on Google" link, a dotted world map with office dots, a black-and-white photo of the depot, and a dot-matrix wordmark filling the bottom.
**Why it works:** A logistics footer that shows reach (sectors, countries) instead of listing it.
**Fits:** `billboard-condensed` · **Breaks:** `warm-daylight` (no marquee)
**House translation:** For a Dutch logistics client, use a dotted map of the Benelux or Europe and the marquee from `### Marquee`.
**Motion pairing:** `vault/marquee-with-scroll-direction.md`.
**Sources:** [United Carriers](https://mobbin.com/sites/sections/59327bcc-6028-4dbc-9beb-3ba7cc935191)

### Hand-drawn annotations on footer facts

**Anatomy:** Loose hand-drawn ovals circle the location and contact blocks in a grid of letter-spaced labels. The script wordmark sits centred, and two dark pill buttons flank the legal lines.
**Why it works:** It adds a human mark on otherwise tabular info.
**Fits:** `campaign-poster` (it matches that direction's "assembled by people" register) · **Breaks:** everything corporate
**House translation:** Draw the ovals in the text colour, never the accent.
**Motion pairing:** `vault/draw-random-underline.md`.
**Sources:** [Touchy Coffee](https://mobbin.com/sites/sections/1262461a-ee8b-472e-9cf1-001b0de70548)
