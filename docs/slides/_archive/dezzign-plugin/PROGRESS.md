# Progress — dezzign-plugin

## Slice 1 — scaffold + 11 site fingerprints (2026-09-15)

**Done**

- `dezzign/.claude-plugin/plugin.json` (v0.1.0) and a stub `dezzign/skills/dezzign/SKILL.md`
  (frontmatter + "under construction" body only).
- Marketplace entry added to `.claude-plugin/marketplace.json` with `source: ./dezzign`;
  `metadata.version` bumped 2.2.0 -> 2.3.0.
- `references/sites/_TEMPLATE.md` — 12 fixed headings: Identity · Navigation · Hero · Section order
  (homepage) · Typography · Palette · Spacing & grid · Motion · Footer · Recurring components ·
  Osmo-like elements · Other pages worth noting. Its header also carries the measurement protocol
  (pin 1440x900, resolve colours by canvas paint, palette source order), so `/dezzign learn`
  reproduces the conditions these 11 were measured under instead of only their shape.
- All **11 of 11** reference sites fingerprinted. No site was unreachable. Both risky staging
  hosts resolved to the real site and each records its plausibility check in the `Measured at:`
  bullet:
  `ul` · `callab` · `biltz` · `mrcopilot` · `trapxpress` · `gzw` · `connectyou` · `plantion` ·
  `eckeveldkleding` · `businessparksoest` · `osnabrugge`.

**How, so `learn` stays consistent with these 11**

- Every measurement was taken at a pinned **1440x900** viewport, recorded per file. Several of
  these sites drive their whole type and spacing scale off a fluid root font-size, so px values
  are viewport-relative and only comparable because the viewport was pinned.
- Colours were resolved by painting each computed value onto a 1x1 canvas and reading the pixel
  back, so `lab()`, `oklab()`, `oklch()` and `color(srgb ...)` all land as real hex instead of
  being regex-mangled. Alpha is written as `#rrggbb@0.NN`.
- One palette rule was applied everywhere, in order: theme CSS variables if the site exposes them,
  else the primary button's background for the accent, else the frequency tally. Each file says
  which source it used.
- Motion was inferred from detected libraries, `data-*` animation attributes, class names and
  three viewport screenshots (hero / mid / footer). Inferred bullets are marked `(inferred)` with
  their evidence rather than presented as observed.
- The extraction script and the brief handed to the four parallel agents live in this session's
  scratchpad, not in the repo.

**Verified, not assumed**

- Heading parity: all 11 files carry the template's 12 headings, in order. No unfilled `<...>`
  placeholders remain.
- `mrcopilot` was re-measured independently against the live DOM after the fact. Every claim
  matched exactly: Lufga, h1 72px/72px/700, h2 48px/48px/700, body 18px/32px, and the fills
  `#0138da`, `#dfff40`, `#01cae6`, `#f9fafb`, `#f3f4f6`, `#0947fe`.

**Notes for later slices**

- A genuine agency-level convention surfaced that nobody asked for and that belongs in
  `stramien.md`: `businessparksoest` and `osnabrugge` both drive the entire type and spacing scale
  from `html { font-size: var(--size-font) }` with `--size-font` computed from a clamped container
  width. Same mechanism, different tuning. `ul` exposes the same `--size-container-*` variables.
- The 11 sites already fall into rough visual families: black-stage billboard (`ul`, `biltz`,
  `eckeveldkleding`), deep-colour editorial (`callab`, `connectyou`, `osnabrugge`), warm
  institutional (`plantion`, `trapxpress`), bright campaign (`mrcopilot`, `businessparksoest`,
  `gzw`). That is a starting hypothesis for the clustering slice, not a conclusion — slice 2 should
  re-derive it from the files rather than inherit it.
- `osnabrugge.md` records "WordPress 7.1" in its stack note. Re-checked against the live site:
  the generator meta really does say WordPress 7.1 and core assets carry `ver=7.1`. Correct as
  written, not a misread.
- `osnabrugge` staging has a broken nav path: service links point at `/diensten/<slug>/`, which
  404s, while the real pages sit under `/wat-we-doen/<slug>/`. Recorded in its fingerprint. It does
  not affect the design read.

**Not done (deliberately out of slice scope)**

`references/stramien.md`, `references/styles/`, the real `/dezzign <url>` flow in SKILL.md, the
`learn` branch, and the README section.

## Slice 2 — stramien + style directions (2026-09-15)

**Done**

- `references/stramien.md` — 64 pattern sections grouped under 11 topic containers (page skeleton,
  navigation, hero, section rhythm, CTA and form patterns, typography, spacing/grid/surface, motion,
  imagery, footer), plus three standalone sections: the fluid root font-size mechanism, a table
  indexing every genuine split, and a "Known traps" list. One heading per pattern so the skill can
  grep for a slot instead of loading the file.
- `references/styles/` — 5 direction docs. Every one of the 11 sites lands in exactly one:
  `billboard-condensed` (ul, biltz) · `flood-and-acid` (eckeveldkleding, mrcopilot,
  businessparksoest) · `deep-ground-editorial` (callab, connectyou, osnabrugge) · `warm-daylight`
  (trapxpress, plantion) · `campaign-poster` (gzw).

**The two findings that outrank everything else in the file**

- **No elevation.** Ten of eleven shadow tallies are empty or third-party-only; the eleventh
  (`callab`) has exactly one, lifting a product mockup. What looks like a shadow in a computed dump
  is almost always a sub-pixel Tailwind ring, i.e. a hairline. Depth is colour, overlap, translucency
  and rotation.
- **The accent is punctuation, never a field.** Ten fingerprints state this near-verbatim in their own Palette section. `gzw` is
  the one exception, and it still proves the rule: it runs campaign colours at field scale while
  holding its acid lime back for buttons and arrows only, so "clickable" stays legible.

**How the clustering was derived, and where it overrules slice 1**

Re-derived from the files on four axes together (surface strategy, display weight, accent
discipline, radius ladder), not inherited. It confirms slice 1's hypothesis in three places and
breaks it in one:

- **`eckeveldkleding` leaves the "black-stage billboard" family.** It is 6px radius (not 0),
  sentence-case Neue Haas (not uppercase condensed), a cobalt flood with an off-white middle (not a
  monochrome ground). It shares a near-exact profile with `mrcopilot` and `businessparksoest`
  instead: saturated brand colour as a *field*, one acid accent strictly at button scale, a small
  hard button radius against a 22-24px card radius, and zero shadows on all three.
- That leaves `billboard-condensed` as a two-site direction, which is correct and is itself the
  useful finding: `ul` and `biltz` run the *identical* system at opposite ground polarity. Polarity
  is a per-project decision, not a style property. That is written up as its own pattern.
- `deep-ground-editorial` (callab, connectyou, osnabrugge) and `warm-daylight` (trapxpress,
  plantion) match slice 1's grouping.

**`campaign-poster` is single-source and the doc says so in its second heading.** `gzw` is the only
site with that posture. Per the stramien's own honesty rule a one-source pattern is a quirk, so the
doc is marked provisional, names its nearest relatives (`businessparksoest` for rotation and script
annotation, `eckeveldkleding` for the hand-drawn marker and tiled pattern) and carries an explicit
instruction: if `/dezzign learn` adds a second campaign site, firm it up; if a year passes without
one, fold the usable parts into `flood-and-acid` and delete the file.

**Verified, not assumed**

A script parsed `stramien.md` into sections and counted distinct backticked slugs per section:
**64 real pattern sections, 0 failing the two-or-more-sites rule.** The 4 thinnest sit at exactly
two (rotation, photo-tile-as-glyph, footer-as-composition, inset footer) and each is genuinely
sourced to two. A first pass flagged 11 `##` headings as failures; those are topic containers with
no prose of their own and were confirmed as false positives. The same script confirmed all 11 sites
appear in exactly one direction doc, and that no `<...>` placeholders remain anywhere.

**Notes for later slices**

- The fluid root font-size convention from slice 1 is folded in as its own top-level section, with
  the consequence spelled out: the same Tailwind class resolves to a different px value per site
  (90px at a 15px root, 96px at 16px), so the redesign flow must never compare raw px across
  fingerprints without checking the root. `trapxpress`'s fixed 14px root is called out separately as
  a related-but-different case.
- `stramien.md` ends with a `## Style directions` index mapping each direction doc to its sites.
  If a direction is ever added, renamed or deleted, that index and the five docs' cross-links need
  updating together.
- Two things the `/dezzign` flow should read as hard rules rather than suggestions, because they are
  the most violated-by-default: forms do not go on the homepage (8 of 11 carry none — the homepage
  routes to a dedicated conversion page), and the named human with a photo, phone and email
  outperforms a form link as the conversion device (6 of 11 build a section around it).
- No fingerprint looked wrong. Nothing in `sites/` was edited.

**Post-review fixes (same slice)**

A review pass caught three things the first verification script did not check, all now fixed and
re-verified:

- **Ten pattern sections were descriptive only**, with no "when to use this" guidance — the slice
  brief asks for it and the `/dezzign` flow depends on it. Column counts, form-field styling, case,
  borders, smooth scroll, carousels, scrim, square-vs-rounded images, the legal row and the closing
  devices each gained a `**When:**` line. **All 61 pattern sections now carry when-guidance**; the
  four index sections are exempt by design.
- **One heading cross-reference pointed at the wrong level** (`### Fluid root font-size` for what is
  a `##`). A grep-based skill matching on level would have missed it. All heading cross-references
  across the six files now resolve.
- **The accent-rule count disagreed between documents** — nine here, ten in `stramien.md`. Re-checked
  against all 11 Palette sections: **ten** is correct (`ul`, `biltz`, `eckeveldkleding`, `callab`,
  `connectyou`, `osnabrugge`, `mrcopilot`, `trapxpress`, `plantion`, `businessparksoest`), with
  `gzw` the exception. Reconciled in all three files. Note the unrelated "nine of eleven" counts for
  the legal row and "9 of 11" for the homepage spine are different facts and are correct as written.

**Final verification (scripted, all green)**

61 pattern sections · 0 failing the two-or-more-sites rule · 0 missing when-guidance · 5 direction
docs each carrying a Reach-for-this-when line plus Type, Palette logic and Motion character
sections · all 11 sites in exactly one direction · 0 broken heading cross-references · 0 leftover
`<...>` placeholders.

**Not done (deliberately out of slice scope)**

The real `/dezzign <url>` flow in `SKILL.md`, the `learn` branch, and the README section.

## Slice 3 — the real SKILL.md (both branches) + README section (2026-09-15)

**Done**

- `dezzign/skills/dezzign/SKILL.md` — stub body replaced, frontmatter untouched. 202 lines / 11.6KB.
  Covers `/dezzign <url>` as the six numbered steps and `/dezzign learn <url>` as measure → write
  fingerprint → propose.
- `README.md` — `### :triangular_ruler: Dezzign` inserted after Osmo and before `## Usage`, in the
  Osmo section's exact shape (paragraph, prerequisites line, install block, command bullets,
  getting-started line). `dezzign/` added to the Repository Structure tree.

**The size budget nobody wrote down, and what it forced**

`SKILL.md` loads in full every time the skill triggers, so it has its own budget on top of the 55KB
reference budget. 11.6KB against 57KB of references is the ratio to hold: a paragraph that
paraphrases `stramien.md` is a regression, not a convenience. Every pattern is a pointer, and the
only prose restating the references is the four hard rules in step 5 and the three-line measurement
protocol in the `learn` branch — both deliberate, both named below.

**The targeted-read mechanism, and the two bugs it had**

The skill ships one self-contained command and uses it everywhere instead of naming files to read:

```bash
awk -v h='### The four hero types' 'BEGIN{n=match(h,/[^#]/)-1} index($0,h)==1{f=1;print;next} f&&/^#+ /{if(match($0,/[^#]/)-1<=n) exit} f' "${CLAUDE_PLUGIN_ROOT}/skills/dezzign/references/stramien.md"
```

The fifteen call sites in the prose read **pull** `### Heading`, which points at that command and
stays greppable for verification. Three things about it are load-bearing, and two of them were bugs
first:

- **`${CLAUDE_PLUGIN_ROOT}`, not a relative path.** At runtime the cwd is the *client's* repo, not
  the plugin. A relative `references/stramien.md` fails silently. This matches the only precedent in
  the repo, `osmo/skills/osmo/SKILL.md`'s `sync.py` invocation.
- **It was a shell function, `sec '<heading>'`, and that could never have worked.** Shell state does
  not survive between Bash tool calls — only the working directory does. The definition sat in the
  reference section and the calls happen in steps 2 and 5, many tool calls later, so every one would
  have hit `sec: command not found`, and the obvious recovery is `cat stramien.md` — precisely the
  55KB blowup the design exists to prevent. The first verification missed it because the test
  defined and called `sec` inside a single Bash invocation. It is now a stateless one-liner, verified
  by running it in a fresh shell with nothing predefined.
- **The awk stopped at the next heading of any level**, so `## Hero` returned 2 lines (the container
  heading and a blank) instead of the topic. The exit now compares `#` depth against the requested
  heading's depth, so `## Hero` yields all 112 lines of the Hero topic while `### No elevation`
  yields just its 16.

**The three step-specific decisions worth knowing**

- **Step 3's style question does not fit.** `AskUserQuestion` caps options at four per question and
  there are five directions. Rather than silently dropping one, the skill shortlists the **three**
  that fit the crawl evidence with a one-line reason each, marks a recommendation, and names the
  remaining two in the question text so the free-text "Other" escape reaches them. To keep the
  shortlist evidence-based rather than a vibe, the skill first greps the five `**Reach for this
  when**` lines — one command, fifteen lines — and matches them against the crawl. The third
  question's options are dynamic — they come from the step-2 sitemap, so the skill states that the
  question cannot be written before the sitemap exists.
- **Step 4 inlines a slot → Osmo category table** (12 rows) distilled from the 11 fingerprints'
  `## Osmo-like elements` sections. Without it the flow would open 11 files to answer "what do we
  usually reach for here". It also records that `callab` already ships a literal Osmo asset
  (`osmo.b-cdn.net/resource-media/noise.avif`), so Osmo is house stack, not an add-on.
- **Step 6 points at the figma server's own `/figma-generate-design` skill**, not at
  `generate_figma_design` bare. The server declares that skill as the entry point for translating a
  layout into Figma; calling the tool directly skips its setup.

**The four inline rules, and why they are inline rather than pointers**

They sit in step 5, where the generating model violates them, not in a preamble. Two come from
slice 2's headline findings and two from its "notes for later slices": **no drop shadows** (10 of 11),
**the accent never becomes a background field** (10 of 11, `gzw` the documented exception), **no form
on the homepage** (8 of 11 route to a dedicated conversion page), and **the named human outperforms a
form link** (6 of 11). Each still carries its `sec '...'` pointer for the full section.

**The `learn` branch carries three things a generic "fingerprint and propose" would lose**

- `_TEMPLATE.md` is the one file read **in full**, and its three-rule protocol is restated inline
  (pin 1440x900, resolve colours by 1x1 canvas paint, palette source order). A fingerprint written
  without it looks conformant and is not comparable to the eleven.
- **The sourcing rule gates every proposal:** a trait on the new site alone stays in its fingerprint
  and only enters `stramien.md` if an existing site shows it too.
- **A direction added, renamed or deleted moves three things together** — the `## Style directions`
  index in `stramien.md`, the five docs' cross-links, and the file itself. `campaign-poster`'s own
  standing instruction (firm up on a second campaign site, else fold into `flood-and-acid`) is
  honoured explicitly rather than left for the reader to find.

**Verified, not assumed**

A script extracted every `sec '<heading>'` reference and every backticked reference path from the
finished `SKILL.md` and resolved each against the real files: **15 distinct heading references, all
present in `stramien.md` at the exact `#` depth cited; 4 file paths, all existing; 5 direction docs,
all existing and all named in `SKILL.md`.** The depth check matters because slice 2 shipped exactly
this bug (`###` cited for a `##`) and a grep-based skill matching on level would miss silently.

The extraction command was then run **in a clean shell with nothing predefined**, which is the only
way the shell-function bug shows up: `### The four hero types` returns 39 lines, `## Hero` returns
112, and the em-dash heading `### Page transitions — a genuine split` survives quoting intact.
Confirmed no `^#` lines sit inside fenced code blocks in `stramien.md`, which would otherwise
truncate a section early, and that all 5 direction docs carry the `Reach for this when` line the
step-3 grep depends on.

`marketplace.json` untouched: still `metadata.version` 2.3.0, per the slice brief. Nothing in
`references/` was edited — mtimes still read 12:04-12:13 from slice 2 against 12:20 for `SKILL.md`.

**Judgement calls**

- **README heading marker.** Every plugin section in the README carries a leading marker; the four
  most recent use GitHub shortcodes (`:zap:`, `:sparkles:`) rather than literal emoji characters.
  Dezzign follows that with `:triangular_ruler:` — a shortcode is source text, so this matches the
  file without putting an emoji character in the repo.
- **No internal anchor link to the Osmo section.** The README has no existing `](#...)` link, and
  the anchor GitHub generates from a shortcode heading is a guess. The prerequisites line names Osmo
  in words instead.

**Nothing in `references/` looked wrong.** No fingerprint, no stramien section and no direction doc
needed a correction while writing against them.

**Not done (deliberately out of slice scope)**

The two remaining Definition-of-Done items are both user-gated: the end-to-end dry run on a real old
client site, and the user's sign-off that the stramien and style directions match how ZekerZichtbaar
actually designs.
