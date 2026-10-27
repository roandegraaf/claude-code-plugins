# Library — Statement, CTA and people

Outside inspiration from Mobbin (swept 2026-09-30), translated into house rules. Not evidence from our own builds — `stramien.md` stays the source of truth; this file is the variant pool that step 5 of SKILL.md draws from to avoid the default spine.

Covers statement and manifesto bands, big quotes, founder letters, pre-footer asks, contact-person and
team sections, vacancy teasers and newsletter placement. The stramien already owns the centred
`### The statement band`, `### The pre-footer CTA band`, `### The named human`, `### Floating contact
affordance` and `### The audience fork`. Every pattern below is a variant of one of those, or a slot
the stramien does not cover yet, and it says which.

Sizes are proportions of the 1440 frame read off low-res previews. Anything written as a number is
`(estimated)`.

## Patterns

### Staircase statement
**Anatomy:** A statement set in three to five short lines, each line starting at a different x
position, so the block steps across the width instead of centring: line 1 indented about 25%, line 2
flush right, line 3 flush left, and so on. Display size is large enough that no line holds more than
two or three words. The body copy (one or two short paragraphs) and a single button sit *inside the
empty gutters* the stepping leaves, top-left and bottom-left, at body size. There is a tiny uppercase
or sentence-case label top-left with a hairline beside it. Optional: one small image set into the gap
between two words, at cap height, as if it were a word.
**Why it works:** It turns a paragraph-length claim into a composition. The gutters stop the huge type
from feeling like wasted space, because the supporting copy lives there.
**Fits:** `billboard-condensed` (uppercase, heavy, stepping reads as a poster), `deep-ground-editorial`
(light serif or a condensed light sans in a muted tone, italic on the last word), `campaign-poster` ·
**Breaks:** `warm-daylight` if set in uppercase or heavy; keep it sentence case at 300-400 or skip it.
**House translation:** Differs from `### The statement band` by being left-weighted and stepped rather
than one centred line. No shadow on the inset image; give it the direction's radius (square for
`billboard-condensed`). The display colour may be a muted tone of the ink (Instrument sets it grey);
it must not be the accent. At most one word may take the accent, per `### One highlighted word`.
**Motion pairing:** `vault/masked-text-reveal.md` per line, or `mwg/effect015.md` (Title mask effect)
so each line slides in its own mask on scroll.
**Sources:** [Studio Freight](https://mobbin.com/sites/sections/37214c10-d891-48bc-a46e-6050033671b4), [Instrument](https://mobbin.com/sites/sections/11dd2d6f-244e-4283-aaba-a7867f36b4e1), [Ada](https://mobbin.com/sites/sections/3eb52aa7-420a-4211-ba9b-5793316410d6) (pill-shaped portrait inset in the heading)

### Corner-anchored statement over a full-bleed photo
**Anatomy:** One full-bleed photograph or video, near-viewport height. The statement is broken in two:
the first half sits top-left, the second half bottom-right, both at display size, so the eye travels
diagonally across the image. A short paragraph (two or three lines) sits bottom-left under the first
half or beside the second, at body size. Tiny mono or uppercase labels in the two remaining corners
(section name, "Onze belofte", a place name). Variant: the headline top-left and a framed inset
video window centred in the photo, with a bold lead-in plus small paragraph and an outline pill
bottom-right.
**Why it works:** It keeps the middle of the photo clear, so the subject survives, while the type
still reads as one sentence.
**Fits:** `billboard-condensed`, `deep-ground-editorial`, `warm-daylight` (sentence case, light
weight, documentary photo) · **Breaks:** `flood-and-acid` when the photography is weak — this
pattern is only as good as the image.
**House translation:** Scrim only behind the two corners that carry type, per `### Scrim only where
type sits`, never a full-image dim. The inset video window takes the direction's card radius and a
hairline border, no shadow.
**Motion pairing:** `vault/parallax-image-layers.md` on the photo; the two halves enter with
`vault/masked-text-reveal.md`, second half delayed.
**Sources:** [Daylight](https://mobbin.com/sites/sections/4db3eb21-9348-4652-9e4e-e286971f8091), [Palmer Dinnerware](https://mobbin.com/sites/sections/e9312808-a66f-436a-b9d1-236d13309a79), [Robot.com](https://mobbin.com/sites/sections/5bbc90c2-05e6-4626-a10c-3da9e38830ce)

### Two-tone sentence
**Anatomy:** One heading-size sentence in which the opening clause is set in full ink and the rest
continues in a muted tone of the same colour: "Onze waarden. **Gebouwd op vakmanschap. Gedreven door
samenwerking.**" with the second part muted. Left-aligned, spanning about half to two thirds of the
width. Below it sits whatever the section carries: three image tiles with a label and a short
paragraph each (values), job rows (careers), or a single text link (CTA).
**Why it works:** It gives a heading and its subheading in one line of type, so the section loses a
level of hierarchy and reads faster.
**Fits:** every direction; it is a type treatment, not a layout · **Breaks:** nothing structurally;
it fails only when both tones are too close to tell apart.
**House translation:** The muted tone is the ink at reduced opacity or a grey from the palette, never
the accent. On `warm-daylight` use weight instead of colour (400 then 300) to match that direction's
"emphasis by weight" rule.
**Motion pairing:** `vault/highlight-text-on-scroll.md` fills the muted words to ink as they scroll
into view; `mwg/effect022.md` (Progressive sentences) when there are several sentences.
**Sources:** [Koto](https://mobbin.com/sites/sections/0fffb256-b589-4688-9c15-161997c51b54), [Linear](https://mobbin.com/sites/sections/b94b791e-21d7-46d0-95e8-cd3ec25fc5ee), [Samara](https://mobbin.com/sites/sections/c6c00a9a-496b-419e-9ba1-5c2ac1b207e3), [Robot.com](https://mobbin.com/sites/sections/5cb091f5-bea8-4b17-93f5-bb4c7124cf87), [V7](https://mobbin.com/sites/sections/51484d32-1b54-41b0-87e1-7010eca1a93e)

### Quiet statement
**Anatomy:** A near-empty section, at least viewport height, holding one short paragraph (three to
five lines) at body or lead size, centred, in a narrow column of about a third of the width. It may
be set in a muted tone. Under it sits one text link with an arrow ("Werk met ons →"), no button.
Nothing else: no image, no eyebrow.
**Why it works:** After dense blocks, the whitespace itself is the statement. It reads as confidence.
**Fits:** `deep-ground-editorial`, `warm-daylight` · **Breaks:** `billboard-condensed` and
`flood-and-acid`, whose register needs volume; there it looks like a missing section.
**House translation:** The inverse of `### The statement band`: same job, opposite scale. Use it at
most once per page, and never directly after a hero that is itself mostly empty.
**Motion pairing:** `mwg/effect005.md` (Word by word) or `vault/elements-reveal-on-scroll.md`; keep
it slow.
**Sources:** [Studio Freight](https://mobbin.com/sites/sections/dc852911-8e4d-4d21-87fb-9a3e577e2612), [Creative Intelligence Company](https://mobbin.com/sites/sections/b71642f4-52fc-4591-8f3b-7f5b8880eb4e), [Analogue Agency](https://mobbin.com/sites/sections/792ff771-4d5e-4047-b72a-2448779738b2)

### Values ledger
**Anatomy:** Two columns. The left column (about 40%) holds a small eyebrow, a heading, and
optionally an artefact: a cover-like tile of the company's own manifesto or brochure with one or two
photos stepping down in size beside it, then a hairline and an outline pill ("Download ons DNA
(PDF)"). The right column holds five or so rows split by hairlines. Each row: a bold title at card
size, one line of body, and an index ("/ 01") pinned to the right edge. Expandable variant: the rows
are the titles alone at heading size with a "(+)" marker right; the open row shows "(×)", a small
square image and a paragraph indented under its title.
**Why it works:** Values are usually a 3-up icon grid nobody reads. As a ledger they read as
commitments, and the index gives them weight.
**Fits:** `deep-ground-editorial`, `warm-daylight`, `billboard-condensed` (uppercase titles, square
image) · **Breaks:** `campaign-poster`, whose voice is too loose for a numbered list.
**House translation:** Hairlines only, no card behind the rows. The index is set in the muted tone or
a mono face, not the accent. The expandable variant reuses the FAQ accordion
(`### FAQ accordion`), so the open/close motion should match the page's FAQ.
**Motion pairing:** `vault/accordion-css-animation.md` for the expandable variant;
`vault/elements-reveal-on-scroll.md` staggered per row otherwise.
**Sources:** [Mews](https://mobbin.com/sites/sections/0e5b994c-eb04-49a5-b9f7-ac55b9e3041c), [Raw Materials](https://mobbin.com/sites/sections/af2710b0-a6f7-4e17-996e-5c39314d5c6a), [Studio Freight](https://mobbin.com/sites/sections/6426caf8-d7d6-418c-96f6-aa0ea53b2646)

### The founder's letter
**Anatomy:** A letter written in the first person by the owner, signed. Two layouts. Split: a short
addressee or heading in the left third ("Aan iedereen die bouwt", "Een woord van Jan"), the letter
in the right half. It opens with one paragraph at lead size, continues at body size, and uses a bold
one-line paragraph as a turn in the middle. Centred: a single narrow column with the heading above,
and a display-size pull quote breaking the letter halfway. Both end in a scanned or script
signature, the name in bold, the role muted. Optional: the founders' photo beside the signature, a
portrait set inline as a pill inside the heading ("een brief van [foto] onze directeur"), or the
letter on a panel over a tinted or textured ground.
**Why it works:** Dutch SMB clients are very often family businesses, and the owner is the brand. A
signed letter makes that concrete in a way no "Over ons" block does.
**Fits:** `warm-daylight`, `deep-ground-editorial`, `campaign-poster` (the letter as the campaign's
voice) · **Breaks:** `billboard-condensed` if the letter runs long; keep it to five paragraphs or
move it to the About page.
**House translation:** On a homepage, cap it at three paragraphs and link to the full letter. The
panel variant is panel-on-ground (`### The panel-on-ground alternative`), with no shadow under the
panel. The signature is dark ink, not the accent. It pairs with `### The named human`: the letter
can end with the owner's direct phone number.
**Motion pairing:** `mwg/effect036.md` (Stacking images on hover) on two or three words in the
letter, which fan out real photos of the place or the people. It is subtle enough for
`warm-daylight`.
**Sources:** [Zellerfeld](https://mobbin.com/sites/sections/09a9a70b-70f6-49d9-8966-d5524e46f120), [incident.io](https://mobbin.com/sites/sections/67e11461-af20-4b7e-8e9a-8f0cdc669a8d), [Handshake](https://mobbin.com/sites/sections/f123062a-5102-4688-980b-50bdcb2ad27e), [Daylight](https://mobbin.com/sites/sections/faa94669-0d5d-4ab3-a7ea-8f3c641105a9), [Ada](https://mobbin.com/sites/sections/3eb52aa7-420a-4211-ba9b-5793316410d6), [Graza](https://mobbin.com/sites/sections/c0551959-279d-4c6f-ad77-0998844fd5c3), [KÖPPEN](https://mobbin.com/sites/sections/81d6349f-9811-4b17-9b2d-327dbabfa4fa)

### Colour panel beside a photo panel
**Anatomy:** Two equal-height panels side by side, split 50/50 or 45/55, each with the direction's
card radius and a small gap between them. The left panel is a flat colour field holding a small
label or name in a muted tone at the top and a display-size sentence (a mission line, a founder's
bio, a quote) anchored to the bottom-left. The right panel is a photograph that fills it completely.
**Why it works:** The colour panel makes the statement feel like an object, and the photo panel
proves it. It is also the easiest shadowless way to give a quote or a bio real presence.
**Fits:** `warm-daylight` (tinted neutral or the deep brand colour), `flood-and-acid` (the brand
colour), `deep-ground-editorial` · **Breaks:** none structurally.
**House translation:** The colour panel is the deep brand colour or the tinted neutral, **never the
accent**, per `### The accent is punctuation, never a field`. Only `campaign-poster` may flood it
with the campaign colour.
**Motion pairing:** `vault/parallax-image-layers.md` inside the photo panel.
**Sources:** [Kalstore](https://mobbin.com/sites/sections/5e1e6047-eef1-417c-b42b-c7ab44205e35), [sweetgreen](https://mobbin.com/sites/sections/1e44b0a4-1609-4ecc-baf0-7296db75c194), [Unify](https://mobbin.com/sites/sections/dea36568-4439-442f-92cc-4ecb1f122f05), [Clay](https://mobbin.com/sites/sections/99af00ec-4d06-4cc0-9abd-8fd3ca2b5064)

### Provenance ledger
**Anatomy:** A full-bleed landscape photograph carrying a short statement ("Alleen het beste van het
land"). Directly under it, still inside the same section, sit hairline rows listing where the work
comes from or happens: name of the grower, site or project | region | country or season | arrow.
Card variant: instead of rows, one translucent card with a hairline border floats in a top corner of
the photo, holding a small photo, a live-sounding eyebrow ("• Nu in het veld"), the place, a dashed
rule and a season or date range.
**Why it works:** It swaps a vague origin claim for specific names and places, which is the proof a
horticulture, agri or food client actually has.
**Fits:** `warm-daylight` (`plantion`-type clients), `deep-ground-editorial`,
`billboard-condensed` (projects, sites, yards) · **Breaks:** `flood-and-acid` without photography.
**House translation:** The card uses a translucent fill and a hairline border, which is the house way
of giving depth without a shadow. The live dot is a functional green, not the accent, per the
`warm-daylight` rule on functional colour.
**Motion pairing:** `mwg/effect030.md` (Images on hover) on the rows, so hovering a grower shows
their photo; `vault/directional-list-hover.md` as the lighter alternative.
**Sources:** [Escape Cafe](https://mobbin.com/sites/sections/458fe700-42b9-4932-83fc-4f7ceb6db9a8), [Graza](https://mobbin.com/sites/sections/fabe4995-a146-4090-900e-b2a6165baf92)

### Photo constellation around the ask
**Anatomy:** A centred block (small eyebrow, heading, one line, one button) with four to six
photographs scattered around it at different sizes and heights, some bleeding off the section edges.
There is no grid; the photos sit roughly on the diagonals so the centre stays clear. They are
workplace, team or site photos, not stock. Collage variant: copy on the left and, on the right, one
large team photo with three or four smaller snapshots overlapping its lower edge. One of those tiles
can be a certificate or award ("Top Werkgever", "Erkend Leerbedrijf").
**Why it works:** It shows a real workplace without making the visitor scroll through a gallery. It
works for vacancies, "werken bij" and the about page.
**Fits:** `warm-daylight`, `flood-and-acid` (the photos float on the brand field), `campaign-poster`
(`gzw`'s "assembled by people" feel) · **Breaks:** `billboard-condensed`, which wants photos full-bleed
and square, not scattered.
**House translation:** No shadows on the scattered photos; they separate from the ground by contrast
and overlap only. On `flood-and-acid` the field is the brand colour, not the accent. A small rotation
on one or two photos is allowed, per `### Rotation as a layout device`.
**Motion pairing:** `vault/global-parallax-setup.md` with a different speed per photo; or
`vault/draggable-stickers.md` for a playful campaign page.
**Sources:** [Tines](https://mobbin.com/sites/sections/cb78af06-910b-40c4-91a6-f8a7f49bbc9d), [Fresha](https://mobbin.com/sites/sections/c365a139-a222-4be8-a30d-26a2abbbf4b7), [Aurora](https://mobbin.com/sites/sections/67805fd8-a745-4bd0-a9c4-f27f2b3730c7), [Fiasco](https://mobbin.com/sites/sections/024b7dff-586a-4eb2-b863-e462f3b7f4fa), [Grain](https://mobbin.com/sites/sections/16b9a427-dffe-44a1-981b-5b9f2372fd95), [ElevenLabs](https://mobbin.com/sites/sections/d35402d4-5416-4c58-907c-1eae8c4b924b)

### Cut-out portrait on a brand shape
**Anatomy:** A photo of a real person, cut out from its background, stands on a large flat brand
shape: a quarter circle, an arch, a blob or two overlapping circles, cropped by the section edge. The
shape fills about 40% of the width. Next to it: a client logo or eyebrow, a quote or claim at heading
size, the person's name and role, and one outline button or text link. Variants: two colleagues
standing on the bottom edge of a dark rounded panel, each with a small name-and-role caption beside
them (for a careers teaser), or a name card overlapping the bottom edge of the shape.
**Why it works:** The cut-out makes a person the most present thing on the page, and the shape
carries brand colour without needing a coloured section.
**Fits:** `flood-and-acid` (`mrcopilot` already does the founder on a circle), `warm-daylight`,
`campaign-poster` · **Breaks:** `deep-ground-editorial` and `billboard-condensed`, where a
playful shape undercuts the register.
**House translation:** The shape is the brand colour or a tint of it. The accent may be at most one
small secondary circle. The overlapping name card is a flat panel with a hairline border and no
shadow. A photo with a person already set against a clean background works; do not fake a cut-out
from a busy photo.
**Motion pairing:** `vault/parallax-image-layers.md`, with the person and the shape on separate
layers.
**Sources:** [Maze](https://mobbin.com/sites/sections/1b5e23df-f8f5-44ea-9518-f3a58be7e952), [Intercom](https://mobbin.com/sites/sections/3a196a04-52f8-4b41-9325-7e6c80b9fad5), [Charma](https://mobbin.com/sites/sections/13c29f0a-f120-4176-a672-b0582600b7c9), [Jasper](https://mobbin.com/sites/sections/3e64d97d-e697-4560-ae54-e2b3914b126d), [Headspace](https://mobbin.com/sites/sections/ed4b8a3f-c5dd-4989-a388-1104e7307453)

### Client logo beside the quote
**Anatomy:** A testimonial with no portrait card. The left column (about a quarter) holds only the
client's wordmark, large, and at its bottom a "Lees het verhaal →" link. The right column holds the
quote at heading size, often in a serif, then a small avatar with the name and role. The columns
are split by white space or a vertical hairline. It works on light or dark grounds.
**Why it works:** For B2B, the client's name is the proof, so it leads, and the link turns a quote
into a route to the case.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `warm-daylight` · **Breaks:** none.
**House translation:** The quote marks may take the accent; nothing else does. The avatar is round or
square per `### Square versus rounded images`.
**Motion pairing:** `vault/line-reveal-testimonials.md` when there are several, cycling in place.
**Sources:** [Attio](https://mobbin.com/sites/sections/2ce67fb5-10f1-49fa-8ba6-e94d7bf516aa), [Frontify](https://mobbin.com/sites/sections/5b94ffca-63af-41b2-a5f5-4c510c51bff0), [GitBook](https://mobbin.com/sites/sections/4674147f-3b5d-43c2-afd0-62b352a19939)

### Quote switcher with client tabs
**Anatomy:** One centred quote at heading size with an avatar, name and role under it. Below that sits
a row of three to five tabs, each labelled with a client's name, with a hairline between them; the
active tab has a tinted fill and a progress underline that runs while it autoplays. The simpler
version drops the tabs for a pair of prev/next circle arrows bottom-right on a dark band.
**Why it works:** It shows several clients in the space of one, and the tab labels are a logo bar in
their own right.
**Fits:** `deep-ground-editorial`, `warm-daylight`, `billboard-condensed` · **Breaks:** none.
**House translation:** The progress underline is the only accent. The tabs are hairline-divided cells,
not raised buttons. It is related to the `trapxpress` hero switcher (single-sourced in the stramien),
applied to proof instead of products.
**Motion pairing:** `vault/tab-system-with-autoplay-option.md` for the tabs;
`vault/centered-looping-slider.md` for the arrow version.
**Sources:** [Monologue](https://mobbin.com/sites/sections/1df3a5f3-ac54-40ec-8700-cd8a26e622d1), [Shopify](https://mobbin.com/sites/sections/f0a7aaa3-874e-4f29-a8f9-ef88f4f331b9)

### The business-card lockup
**Anatomy:** A typographic version of the named human. A thin band framed by hairlines above and
below. The left column holds a tiny label in parentheses ("(Nieuwe projecten)"). The right column
holds three lines at heading size, stacked: the person's name, their role, and their email address
underlined as a link. The phone number can be a fourth line. The portrait variant puts a plain
label/value list (Telefoon / E-mail / LinkedIn) top-left and a large black-and-white portrait filling
the right half.
**Why it works:** The contact details become the design. No card, no form, no button: the thing the
visitor needs is the largest thing on screen.
**Fits:** `deep-ground-editorial`, `billboard-condensed` · **Breaks:** `warm-daylight`, which
wants the warmer photo-and-avatar version in `### The named human`.
**House translation:** A variant of `### The named human` that drops the card. Several lockups can
stack with hairlines between them (sales, service, vacancies), one per person.
**Motion pairing:** `vault/text-scramble-load-scroll-hover.md` on the email line on hover, sparingly.
**Sources:** [Vucko](https://mobbin.com/sites/sections/36788c35-ccf2-4dbc-9d78-c50f957db84a), [Waka Waka](https://mobbin.com/sites/sections/b56359af-6400-4c8c-9788-8438596cf4a2)

### Location cards with local detail
**Anatomy:** One column per office, showroom or site, two to four across. Each column holds a
photograph of the actual building, the city or site name at card-heading size, then a stack of small
details: live local time or today's opening hours in a muted tone, email and phone, the street
address, a "Route plannen" link, and optionally one sentence about the building. The compact variant
drops the photos: a heading with a two-button audience fork above ("Ik zoek werk" / "Ik zoek een
partner"), a hairline, a small "Locaties" label, then the columns. It can also add GPS coordinates as
a detail.
**Why it works:** A photo of the door and today's hours answer "can I just drive over?", which a
contact form never does.
**Fits:** `warm-daylight` (it extends that direction's opening-hours and showroom trust devices),
`deep-ground-editorial`, `billboard-condensed` · **Breaks:** none.
**House translation:** No card behind each column; the photo takes the direction's radius. Open/closed
status is a functional-colour dot, not the accent.
**Motion pairing:** none needed; `vault/elements-reveal-on-scroll.md` staggered per column.
**Sources:** [Pentagram](https://mobbin.com/sites/sections/1046fdf6-61e6-4987-be32-89316b8e2515), [Craft Agency](https://mobbin.com/sites/sections/093daad4-fbb6-402b-8d80-9c3b63a2c30e), [Büro](https://mobbin.com/sites/sections/ce206186-f0b6-45e1-862f-a1bcbcfc5c0c)

### One-line ask with an inline button
**Anatomy:** A pre-footer band whose whole content is one sentence set on a single line across the
full width, at heading size, with a small button placed inline at the end of the line, as if it were
the sentence's last word. Optionally one word is muted, and a tiny label bleeds in from the left edge.
The band shares its ground colour with the footer below, so the ask and the footer read as one
closing block. Text-link variant: two lines (ink, then muted) and a coloured "Neem contact op →" link
instead of a button.
**Why it works:** It is shorter than the standard centred band and much more direct: one sentence,
one action, no subheading.
**Fits:** `deep-ground-editorial`, `billboard-condensed`, `warm-daylight` (text-link variant) ·
**Breaks:** none.
**House translation:** A variant of `### The pre-footer CTA band`. The ground is the deep brand colour
or the footer colour, **not the accent**. Robot.com runs it on a yellow field, which is only
allowed in `campaign-poster`. The inline button can be the direction's button with a detached
arrow tile (`### Button plus a detached arrow tile`).
**Motion pairing:** `vault/marquee-with-scroll-direction.md` if the sentence is longer than the
line: let it run as a slow marquee with the button fixed at the right edge.
**Sources:** [Trawelt](https://mobbin.com/sites/sections/9f8e1e05-7d5b-4c47-b9ad-e03629f89a67), [Robot.com](https://mobbin.com/sites/sections/5cb091f5-bea8-4b17-93f5-bb4c7124cf87), [Samara](https://mobbin.com/sites/sections/c6c00a9a-496b-419e-9ba1-5c2ac1b207e3)

### Two-door pre-footer
**Anatomy:** The pre-footer band split into two equal doors for two different audiences, side by
side. Each door has a small label (an eyebrow, or a radio-dot "Voor bedrijven" / "Voor
vakmensen"), a heading, one line of body, and one button. The doors are divided by a vertical
hairline, or set as two panels of different tone (one dark, one light). The left door usually has
the filled button and the right door the outline one. Grid variant: a hairline-framed block with a
header cell, the two door cells, and a thin tinted strip along the bottom ("We zoeken collega's"
plus a "Vacatures" button).
**Why it works:** Most B2B sites have two asks — customers and candidates, or buyers and suppliers —
and cramming both into one centred band blurs both.
**Fits:** every direction; `billboard-condensed` with uppercase eyebrows and a square arrow tile as
the second button · **Breaks:** none.
**House translation:** It carries `### The audience fork` into the page's closing band, where the
stramien only has it in the hero. The panels take the direction's radius and no shadow. The accent
goes on one button only.
**Motion pairing:** a two-layer hover fill on each door (see `### Two-layer hover buttons` in the
stramien, Osmo `button/` pack).
**Sources:** [Mixpanel](https://mobbin.com/sites/sections/33377ae5-6e82-47e5-8724-fefd40d3113e), [V7](https://mobbin.com/sites/sections/51484d32-1b54-41b0-87e1-7010eca1a93e), [Zipline](https://mobbin.com/sites/sections/5a597053-0953-4b03-9372-14b89eb05825), [Cartesia](https://mobbin.com/sites/sections/845583df-8b51-4beb-96aa-36cdea4ed8d9), [Contra](https://mobbin.com/sites/sections/0e71cc83-e290-499f-8060-cdae5f763d98)

### Team as a directory
**Anatomy:** The left third holds a heading and one short paragraph, pinned (`sticky`) while the
right two thirds scroll. The right side is a list in two or three columns. Each row: a small square
or rounded thumbnail, the name in bold, the role muted beneath, and one or two tiny glyphs
(LinkedIn, phone). It closes with a single text link ("We zoeken nog 3 collega's →").
**Why it works:** A team of 20-60 people shown as big portrait cards takes five screens. As a
directory it takes one and still shows every face.
**Fits:** `deep-ground-editorial`, `warm-daylight`, `billboard-condensed` (square thumbnails,
uppercase roles) · **Breaks:** none; below about eight people, use portrait cards instead.
**House translation:** Hairlines between rows are optional; no cards. Put the named human
(`### The named human`) first in the list, or pull that person out above it.
**Motion pairing:** `mwg/effect030.md` (Images on hover) so hovering a row shows a larger portrait
following the cursor on the Y axis.
**Sources:** [Granola](https://mobbin.com/sites/sections/5897c1c1-3b7f-493f-88b8-e986a8e01755), [Height](https://mobbin.com/sites/sections/c317bfca-01f4-4e4a-ade4-0109d694b919), [Coda](https://mobbin.com/sites/sections/0cf16016-8e4e-4dbb-ad6e-d5dc42e842f4)

### Portrait cards that open into a bio
**Anatomy:** Three or four tall portrait cards in a row, each with a small "+" in the top-right
corner, a role chip and a name with an arrow beneath. Clicking the card or "Bio+" opens the bio in
place, or in a side panel. Above the row sits a sub-index (01 Mensen / 02 Ambities / 03 Werkwijze)
with a "(1/4)" counter and a statement at heading size.
**Why it works:** The page stays a row of faces, while visitors who care can read who each person is.
**Fits:** `billboard-condensed` (uppercase statement, square cards), `flood-and-acid`,
`deep-ground-editorial` · **Breaks:** `warm-daylight` if the cards crop people into blobs or
arches; keep them documentary.
**House translation:** No shadow on the open state; it is a panel with a hairline or a colour step.
Blob and arch crops only where the direction's brand clip shape allows
(`### A brand clip shape`).
**Motion pairing:** `mwg/effect025.md` (Randomize & Focus) for a playful row; `mwg/effect043.md`
(Soloing images) to fan the cards in as the section enters.
**Sources:** [OFF+BRAND](https://mobbin.com/sites/sections/f6a9b056-e9be-4ab5-80ea-9eae42fbd179), [Coda](https://mobbin.com/sites/sections/0cf16016-8e4e-4dbb-ad6e-d5dc42e842f4), [Passionfroot](https://mobbin.com/sites/sections/7142e4ef-7096-4260-aecc-0ea06c1763e3)

### Vacancy rows with an open-application row
**Anatomy:** A heading at display size ("Open vacatures", or a two-tone sentence), then full-width
rows split by hairlines. Each row: job title | department | location | hours or type | "Solliciteer"
or an arrow, right-aligned. Grouped variant: a small department heading or an outline chip above each
group. The list always ends (or starts) with an open-application row ("Open sollicitatie — Staat je
functie er niet tussen?"). On the homepage the teaser shows three rows and a "Alle vacatures (7) →"
link; a thin strip under a team or CTA section ("We zoeken collega's →") can replace it entirely.
**Why it works:** It reads like a list of real openings rather than a recruitment ad. The open row
means the section never looks empty when there are only one or two vacancies.
**Fits:** every direction · **Breaks:** none.
**House translation:** Hairlines only; Typeform wraps each row in a shadowed card, which we do not.
The vacancy count may be a small accent badge — the one accent in the section.
**Motion pairing:** `vault/directional-list-hover.md` on the rows; `mwg/effect030.md` (Images on
hover) to show a photo of the actual workplace per role.
**Sources:** [Runway](https://mobbin.com/sites/sections/dd4d0105-576e-4b9a-8439-64da46dcfc7d), [TIDAL](https://mobbin.com/sites/sections/32e4fd11-2982-428d-a836-dddaeb0ecaf0), [Attio](https://mobbin.com/sites/sections/5a8ac02a-d6d7-45c3-89e5-8e30e7cd79eb), [Linear](https://mobbin.com/sites/sections/b94b791e-21d7-46d0-95e8-cd3ec25fc5ee), [Mailchimp](https://mobbin.com/sites/sections/322c80f9-985c-4b85-9f40-3fc6d04e439a), [Monarch](https://mobbin.com/sites/sections/b5b12ea8-dcbf-4c68-998a-0400aed376d2), [Cartesia](https://mobbin.com/sites/sections/845583df-8b51-4beb-96aa-36cdea4ed8d9)

### Newsletter folded into the footer
**Anatomy:** No separate newsletter band. The newsletter becomes the top edge or one column of the
footer: a one- or two-line pitch at lead size (often serif) and a single field. The field is either
underline-only with an arrow at its right end, or a pill-shaped field with the button joined to it.
The top-edge variant runs it over a short strip of motion-blurred photo that opens the footer.
**Why it works:** It stops the newsletter from competing with the real ask in the pre-footer band.
**Fits:** every direction · **Breaks:** none.
**House translation:** This is how `### Forms live off the homepage` survives a client who insists on
a newsletter: one field in the footer is not a homepage form section. For stricter cases, replace the
field with a "Schrijf je in →" link to a dedicated page. The field follows
`### Form field styling follows the direction's radius`.
**Motion pairing:** none.
**Sources:** [Tempo](https://mobbin.com/sites/sections/36e2e633-d9ee-42eb-b383-1e200ef41526), [The Leap](https://mobbin.com/sites/sections/5a5e734d-0b06-4545-8131-5e421c4560be), [Parker AI](https://mobbin.com/sites/sections/1b48e50a-07c1-4660-b610-7eedeb85718e), [Descript](https://mobbin.com/sites/sections/a0b71ced-3937-4905-843c-ec1e786a61c8)

## Single-sourced techniques

Each of these was seen on one Mobbin site only. Treat them as techniques to try, not patterns.

### Offset-start portrait grid
**Anatomy:** An eight-column portrait grid whose first row starts at column five, so the first row
holds only four portraits in the right half. The top-left space holds a label and a one-line
description ("Mensen — Iedereen, en hun moeder"). Every portrait is the same size, with the name in
bold and the role and city muted.
**Why it works:** The empty quadrant makes a uniform grid look placed rather than generated.
**Fits:** `deep-ground-editorial`, `billboard-condensed` · **Breaks:** none.
**House translation:** Uniform tiles, no card, no shadow.
**Sources:** [Mother Design](https://mobbin.com/sites/sections/ef9a104a-185e-4bb6-ad68-03ab36f29420)

### Honest availability line with a face cluster
**Anatomy:** On the contact page, a mosaic of about twelve small portraits of mixed sizes sits
top-right, beside a heading and one plain sentence about response time that changes with the clock
("We zijn nu gesloten. Je hoort binnen 24 uur van ons.").
**Why it works:** It sets an expectation rather than promising instant contact, which builds trust.
**Fits:** `warm-daylight` · **Breaks:** none.
**House translation:** It pairs with the opening-hours status pill in `warm-daylight`.
**Sources:** [Dovetail](https://mobbin.com/sites/sections/9f8b5502-cee7-4eb1-8aff-9dcd26e9e308)

### Poster quote card
**Anatomy:** A black-framed card: a photo in the upper part, and under it the quote in white on black,
the name small, and a small glyph in the corner. The card sits over a larger, faded photo of the same
person.
**Why it works:** It turns a testimonial into a printed object.
**Fits:** `billboard-condensed`, `deep-ground-editorial` · **Breaks:** `warm-daylight`.
**House translation:** The frame is a thick solid border, not a shadow.
**Sources:** [Metalab](https://mobbin.com/sites/sections/91130669-7c3f-4682-a522-c2c757bffa11)

### Vacancy count as a superscript
**Anatomy:** An almost empty section with two centred lines, "Kom bij ons team / Bekijk vacatures",
and a small filled circle carrying the count ("3") set as a superscript on the second line.
**Why it works:** The count carries the urgency, so the copy can stay short.
**Fits:** `deep-ground-editorial` · **Breaks:** none.
**House translation:** The circle is the accent: the section's one accent.
**Sources:** [Analogue Agency](https://mobbin.com/sites/sections/792ff771-4d5e-4047-b72a-2448779738b2)

### First-name tag on the photo
**Anatomy:** Square portraits in a hairline frame, each with the person's first name on a small
coloured tag placed on the photo itself, like a label sticker, at a slightly different spot on each.
**Why it works:** It is a small human touch that makes a standard grid feel informal.
**Fits:** `campaign-poster`, `flood-and-acid` · **Breaks:** `deep-ground-editorial`.
**House translation:** Rotate the tags a few degrees at most; use the palette's neutrals and the brand
colour, with the accent on no more than one tag.
**Sources:** [Equals](https://mobbin.com/sites/sections/455ea198-c649-4e11-8192-70d2c315f90c)
