# Craft — the rules every artboard holds

Adapted from `/awwwards` (juliobsz/skills, MIT): its craft, mobile, interaction, typography and
copy rules, checked against the stramien. `## AI tells` lists where outside guidance and the
house disagree, so a later run neither "fixes" a house pattern nor treats it as mandatory.

The stramien offers a pattern per slot. This file says how finished the result has to be.

## Fixed and default

### Fixed rules

These hold on every design, whatever the concept, the direction or the stramien says:

- **Honest content.** Nothing invented: no logos, clients, awards, certifications, reviews,
  people, prices or numbers the crawl did not find (`### Honest content, marked gaps`).
- **Legible.** AA contrast everywhere, including over photography; colour is never the only
  signal (`## Contrast and legibility`).
- **Oriented.** Who, what and where-to-go in the first viewport (`### Orientation in three seconds`).
- **Usable by hand and keyboard.** The phone layout is composed, tap targets are sized, every
  interactive role has designed hover and focus states (`## Mobile at 390`, `## States`).
- **One scroll-hijacking moment per page at most**, and a designed static state for reduced
  motion (`library/motion.md` `## Restraint rules`).
- **Copy in the source site's language.**

### Everything else is a default

The stramien, the style directions and the library are defaults: what we reach for when the
assignment gives no reason to do otherwise. That includes the rules the house holds most firmly,
`### No elevation`, `### The accent is punctuation, never a field`, `### Forms live off the
homepage` and the homepage spine. Break one when the concept or the client's world asks for it,
and write the break in `brief.md` under `## Breaks` with its reason. A design that follows every
default is the stramien rendered again, and that is the convergence we are trying to avoid.

### Not a twin of an earlier build

Before drawing, compare the homepage plan against two sets: the eleven fingerprints in `sites/`,
and the last ten earlier `/dezzign` runs in the run ledger:

```bash
tail -n 10 ~/.dezzign/runs.md 2>/dev/null
```

Compare four things: the hero type, the ground sequence, the showcase pattern and the signature
moment. If three of the four match any one site or run, change at least two of them. Also look
down the ledger's direction and signature columns: if the last few runs share a direction or a
signature, prefer a different one unless the client clearly belongs there. A client should never
be able to put their new design next to another client's and find the same page.

## Every frame

### The first viewport is a poster

Crop the top 900px of the homepage artboard. On its own it must look intentional: type, space
and image composed, not a warm-up for what scrolls in later. Motion amplifies a composition; it
never rescues one. Under reduced motion and in a Figma frame, the static frame is all anyone sees.

### Orientation in three seconds

The first viewport answers three things without scrolling: who this is (logo or name), what
they do (in plain words, not a slogan), and where to go next (one primary CTA, the nav). If any
of the three needs a scroll, the hero is wrong, whatever the hero type.

### One signature, everything else quiet

Each fully designed page has one signature moment (see `concept.md`). Everything around it is
quiet and precise: house group reveals, house hovers. A page where every section performs has
no signature. The restraint budget is `library/motion.md` `## Restraint rules`.

### The genericness test

Before drawing, and again before the critic pass, ask of every page: "If a generic model got
this client's brief, would it land here?" Change every part where the answer is yes, and write
what you changed in `brief.md`. The usual suspects: a stock-photo hero, a three-icon USP row
saying "Kwaliteit, Service, Betrouwbaar", a CTA band saying "Klaar voor de volgende stap?".

### Adjacent sections differ in layout family

No two adjacent sections share a layout family: poster line, asymmetric pair, card row, index
list, gallery wall, sticky narrative, statement, facts, full-bleed media, closing composition. A
card row followed by another card row reads as a template however different the cards are.

## Mobile at 390

### Redesign, do not shrink

The homepage and at least one inner page get a dedicated 390x844 artboard. The fluid page
artboard already has to hold at phone width; the dedicated board is where the composition
changes on purpose: the display size re-tuned (not just scaled), grids to one or two columns
with deliberate offsets, the header collapsed to logo plus menu (stramien `### Mobile`), and the
hero stack aligned on purpose rather than left with the desktop's empty rows.

### Replace every hover-dependent pattern

Nothing on a phone depends on hover. A hover-image project list becomes a list with an inline
thumbnail per row. A cursor badge becomes a visible label or arrow on the card. A mouse-reactive
image set becomes a scroll- or tap-driven one. `library/motion.md` `## Restraint rules` names
every pointer effect that needs a touch plan; the 390 board shows that plan.

### Strips become swipe rows

Horizontal strips, logo bars and galleries become a native swipe row with the next item peeking
in at the edge, not a row of thumbnails shrunk until they cannot be read. Pinned horizontal
sequences get a shorter pin or a vertical stack below 768px.

### Adapt the signature, never drop it

The signature moment exists on the 390 board in an adapted form: a shorter pin, a vertical stack,
a tap-through. Dropping it without a replacement leaves the phone version, which most visitors
see, without the one thing the site is remembered by.

### Tap targets and the phone viewport

Primary actions at least 44px tall, everything tappable at least 24px. The phone menu overlay is
drawn as its own state on the 390 board or the states sheet. A floating contact button
(stramien `### Floating contact affordance`) must not cover the primary CTA or the cookie bar.

## States

### One treatment per role

Pick one hover treatment per role and reuse it everywhere that role appears. Two or three
treatments for the whole site is typical; drawing every effect on the menu (magnetic button,
letter roll, pointer fill, cursor badge) is the generic answer.

| Role | Treatment family | House source |
|---|---|---|
| Primary buttons and CTAs | a fill that floods or inverts, a label roll, an arrow that travels | stramien `### Two-layer hover buttons`, `### Button plus a detached arrow tile` |
| Cards, project tiles, work images | a scale inside a clipped frame, a media reveal, a cursor badge on whole-tile targets | stramien `### Custom cursor with looping text` |
| Nav links | an underline that draws, a marker that slides, a label roll | stramien `## Navigation` |
| Inline links in body copy | underlined at rest, the underline rises or thickens | none needed |
| Utility links (legal, cookie, social) | a colour or underline change is enough | none needed |
| Arrows and icons | a 4-6px nudge along their direction | stramien `### Button plus a detached arrow tile` |

### Primary targets move, utility links change colour

A CTA, a nav link or a project link whose only hover is a text-colour swap reads as dead. A
full fill or inversion of the whole button is a treatment; a colour change on the label is not.
Utility links are the exception: nobody spends motion on a privacy link.

### Focus is designed, not default

Every interactive element has a visible focus state in the system's own style: a ring in the ink
or accent colour, offset from the element, never the browser default and never removed. Inline
links keep an underline at rest so they are recognisable without colour.

### The states sheet

One artboard per run, `States.dc.html`, at 1440 wide. It draws every interactive role used on the
site in rest, hover, focus-visible, active and disabled where it applies: primary and secondary
button, the arrow tile, a nav link with the current page marked, a card, an inline link, a form
field (empty, filled, error, focus) from the contact page, the accordion open and closed, the
mobile menu open. Name each row by role, not by component. This is what a developer builds the
interactions from; without it the hover treatment exists only in your head.

## Typographic detail

### Optical alignment of display type

Large display lines carry visible side-bearing: at 80px and up, pull the line left (roughly
-0.04 to -0.06em) so the stem of the first letter aligns with the text column below. Opening
quotes in a pull quote hang outside the column.

### Tracking follows the direction

Tracking is a genuine house split (stramien `### Tracking — two branches`): negative and scaling
with size in some directions, normal in most. Follow the direction doc. Uppercase labels go
positive in both camps.

### Numbers, quotes and spaces

Tabular figures for counters, years, prices and tables. Real typographic quotes and apostrophes
(‘ ’ “ ”, and the Dutch apostrophe in "auto’s", "foto’s"), never straight ones. A non-breaking
space between a number and its unit or currency ("€ 1.250", "24 uur", "15 km"). Dutch number
formatting: a full stop for thousands, a comma for decimals.

### No widows in display lines

A display line never ends on one short word alone. Rebreak by hand at 1440 and again at 390;
the two boards break differently, and that is fine.

### Measure and body size

Body copy 16-18px with 1.45-1.6 leading, at a measure of 45-70 characters. Small UI text (nav,
meta, captions) may go to 12-14px if it passes AA. Labels carry real information, never
decoration.

## Contrast and legibility

### AA everywhere, including over photos

Body text 4.5:1, large text (24px and up, or 19px bold) 3:1, including grey meta labels and text
over photography. A scrim goes only where type sits (stramien `### Scrim only where type sits`),
weighted to one side, and the contrast is checked against the brightest part of the image under
the type, not the average.

### Fixed UI over imagery

A header that floats over a full-bleed photo must stay legible on the photo's lightest area: a
solid bar, a scrim strip, or a header that switches colour per section. Draw the scrolled state
too if the header changes.

### Colour is never the only signal

Required fields, errors, the active nav item and status pills differ in shape, weight or an icon
as well as hue. Colours that must be told apart also differ in lightness.

## Details that separate good from finished

### The 404 carries the concept

The sitemap always includes a designed 404 artboard: the concept's voice, the house nav and
footer, and a way back (home plus the two most-visited pages). It is cheap, and it is the
detail reviewers and clients notice.

### One image treatment

One aspect-ratio family, one radius rule from the direction's ladder, one reveal, one hover across
the whole site. Documentary photography of the real thing (stramien `### Documentary photography of
the real thing`); where the client has none, a marked placeholder, never stock.

### The footer is the last composition

The footer is designed like a section, not left as link columns: stramien `### The footer as a
composition` and `### Closing devices worth stealing`. The concept's closing device lives here.

### Favicon and share image

Optional: one small artboard with the favicon at 32px and 180px and a 1200x630 share image
composed from the hero, not cropped from it. Add it when the client has no recognisable mark.

## Copy

### Mode decides how much copy you write

- **Brand + content:** keep their copy. Fix only labels, buttons and microcopy, and mark it.
- **Content only:** keep the substance, tighten the wording, rewrite headlines that fail the
  orientation rule.
- **Free reinterpretation:** write the copy, in the language of the source site.

The rules below apply to every line you write, in every mode.

### Specific nouns over adjectives

Say what they do, for whom, and what is different, in under twenty words for the hero line.
"Hekwerk en poorten voor boerenerven en bedrijventerreinen, gelast in Geldermalsen" beats
"Kwaliteit en vakmanschap sinds 1971".

### Dutch filler to cut

Cut on sight: naadloos, ontzorgen, oplossingsgericht, passie voor, uw partner in, één
aanspreekpunt (unless it is the actual offer), kwaliteit staat bij ons voorop, klantgericht,
innovatief, toekomstbestendig, next level, maatwerk (unless you say what is made to measure),
"wij gaan voor", "samen bouwen aan", "klaar voor de volgende stap?". Also the English set:
elevate, seamless, unleash, cutting-edge.

### No em dashes in visible copy

Em dashes read as generated. Use a full stop, a comma, a colon or parentheses. An en dash is
fine for ranges ("ma–vr", "08:00–17:00").

### Never repeat a sentence

No sentence appears twice across sections or pages. The hero line is not also the about heading,
and the pre-footer band does not restate the hero.

### Device-neutral microcopy

No "klik hier", no "hover over een project" on a phone board. Labels say what they lead to:
"Bekijk het project", "Bel Joost", "Offerte aanvragen".

### One action, one name

If the primary CTA is "Offerte aanvragen", it is "Offerte aanvragen" in the header, the hero,
the pre-footer band and the footer. A visitor who meets three names thinks there are three
actions.

### Honest content, marked gaps

Never invent logos, client names, awards, certifications, review scores, team members, prices or
numbers. Use what the crawl found. Where the design needs content the client has not provided,
draw a visible placeholder in a distinct style on the artboard: `[INVULLEN: klantcase met foto
en resultaat]`. Every placeholder goes in the final message as a list for the client.

## AI tells

### Tells to remove

These are defaults of generated design, not of our house. Remove them unless the concept genuinely
calls for one, and then say why in `brief.md`:

- a purple-to-blue gradient glow, or any gradient wash as a background
- glassmorphism on everything
- a centred hero over a blurred blob or abstract 3D shape
- a coloured left-border card
- emoji as icons
- decorative 01 / 02 / 03 numbering when the content is not a real sequence
- an arrow appended to every text link (the house arrow is a detached tile on buttons, not a
  suffix on prose links)
- Inter, Fraunces, Instrument Serif or Playfair picked by reflex rather than from the brand
- "A · B · C" meta strings and "WORD — fragment" labels as decoration
- a stock photo of people in a meeting room

### House patterns that are not tells

Outside guidance, including `/awwwards`, lists these as tells. In our set they are proven
patterns, so they are allowed. Allowed is not required: reach for one because the page needs it,
not because the house has it.

| Outside guidance says | The house says | Source |
|---|---|---|
| no eyebrow above every heading | eyebrows are a three-branch house slot | stramien `### Eyebrow above the headline — three branches` |
| avoid acid green on black | that is a named direction | `styles/flood-and-acid.md` |
| avoid warm cream plus one strong accent | that is a named direction | `styles/warm-daylight.md` |
| avoid three equal cards | 3-up is the house default for card rows | stramien `### Column counts` |
| one accented word is a lazy idea | a house pattern, used once per headline | stramien `### One highlighted word` |
| display type must track negative | most house sites run normal tracking | stramien `### Tracking — two branches` |
| never replace the cursor | the looping text badge is a house pattern; it augments the native pointer on whole-tile targets | stramien `### Custom cursor with looping text` |

The test is the same either way: a pattern is fine when it carries real information and is
executed with care, and a tell when it is there because it is always there.
