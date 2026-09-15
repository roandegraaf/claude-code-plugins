---
name: dezzign
description: Redesign a client's existing website the ZekerZichtbaar way. Use when the user says "/dezzign <url>", asks for a website redesign, a sitemap plus page designs for an existing site, or "/dezzign learn <url>" to fold a newly built site into the house stramien. Crawls the old site, builds the full sitemap, picks Osmo resources, designs every page on a Claude Design canvas and exports to Figma.
---

# Dezzign

Two branches. `/dezzign <url>` redesigns a client's existing site: crawl, sitemap, questions, Osmo
picks, canvas, Figma. `/dezzign learn <url>` folds a site we just built into the house stramien.

**Browser rule, no exceptions.** All browsing goes through the **Chrome DevTools MCP**
(`mcp__chrome-devtools__*`). Never `claude-in-chrome` — that is a standing global rule from the
user, not a preference. Open your own page and close it when done.

**Output is design only.** No code for the new site, and no copy rewrite beyond what the chosen
brand-handling mode implies.

---

## Reference material: read it targeted, never whole

`references/stramien.md` is ~57KB. Loading it whole burns the context you need for the design.
It carries one `###` heading per pattern precisely so you can pull one slot at a time.

Start with the slot list, then pull sections one at a time:

```bash
grep '^#' "${CLAUDE_PLUGIN_ROOT}/skills/dezzign/references/stramien.md"
```

```bash
awk -v h='### The four hero types' 'BEGIN{n=match(h,/[^#]/)-1} index($0,h)==1{f=1;print;next} f&&/^#+ /{if(match($0,/[^#]/)-1<=n) exit} f' "${CLAUDE_PLUGIN_ROOT}/skills/dezzign/references/stramien.md"
```

**The quoted heading is the only thing you change.** Copy the command whole each time — do not turn
it into a shell function, because shell state does not survive between tool calls and the next call
would fail with `command not found`. Use `${CLAUDE_PLUGIN_ROOT}`, never a relative path: when
`/dezzign` runs, the working directory is the client's repo, not this plugin.

A `###` heading pulls one pattern (`### No elevation`, 16 lines). A `##` heading pulls the whole
topic and every pattern under it (`## Hero`, 112 lines).

Below, **pull** `### Something` means exactly this command with that heading.

Which file answers which question:

| File | How to read it | What it decides |
|---|---|---|
| `styles/<direction>.md` | **in full**, ~100 lines | which branch of every split applies, plus that direction's signature moves |
| `stramien.md` | **by section**, with the command above | what a slot is, when to reach for it, which sites prove it |
| `sites/<slug>.md` | only when a pattern needs a worked example | how one site actually resolved that slot |
| `sites/_TEMPLATE.md` | in full, **`learn` branch only** | the measurement protocol and the 12 fixed headings |

Two sections are worth reading before you measure or judge anything: pull `## Known traps` (shadow
tallies lie, colour tallies lie, buttons can compute transparent, the dead shadcn block,
third-party widgets) and pull `## Where the set genuinely disagrees` (a table of every real fork).

---

## `/dezzign <url>`

### 1. Crawl the old site

Chrome DevTools MCP. Pin the viewport to **1440x900** (`resize_page`) so anything you measure is
comparable to the fingerprints. Collect: every reachable page, the nav tree, the real copy, the
logo, brand colours as computed values, and what the imagery actually is. Note what is worth
keeping and what is the reason they are redesigning.

### 2. Build the complete sitemap of the new site — mandatory

Every page of the new site, grouped, with a one-line purpose each. Not a subset, not "and similar
pages". This is a hard requirement of the flow: the sitemap is what step 3's third question and
step 5's artboard list are both built from, and it is the deliverable the client signs off on.

Old pages that should not survive get dropped explicitly, with the reason. New pages the old site
lacks get added. Read pull `### The default homepage order` for the spine 9 of 11 homepages
follow, and pull `### Forms live off the homepage` before you put a contact form anywhere.

### 3. Ask the per-run questions — one batched `AskUserQuestion`

One call, three questions. Not three calls.

1. **What to keep from the old site** — brand + content / content only / free reinterpretation.
2. **Which style direction** — `AskUserQuestion` caps options at four per question and there are
   **five** directions, so do not list them raw. Shortlist the **three** that fit the crawl
   evidence, say in one line why each fits this client, and mark your recommendation. The free-text
   "Other" escape covers the remaining two; name them in the question text so the user knows they
   exist. The five: `billboard-condensed`, `flood-and-acid`, `deep-ground-editorial`,
   `warm-daylight`, `campaign-poster`.
3. **Which pages get a full design versus a structural outline** — options come from the sitemap
   built in step 2, so this question cannot be written before that step is done.

To shortlist honestly rather than by feel, read the five `**Reach for this when**` lines first —
one grep, five lines — and match them against what the crawl actually found:

```bash
grep -A2 'Reach for this when' "${CLAUDE_PLUGIN_ROOT}/skills/dezzign/references/styles/"*.md
```

Then read the chosen `styles/<direction>.md` **in full**. It decides every split the stramien
leaves open.

### 4. Pick Osmo resources

Use the existing **`osmo` skill** (search `~/.osmo/library/INDEX.md`, shortlist, read the pick).
Do not re-derive its search rules here. Osmo is already in the house stack: `callab` ships
`osmo.b-cdn.net/resource-media/noise.avif` as its grain layer.

**Cite every pick with its `preview` URL.** A pick the user cannot see live is not a pick.

Slot to category, distilled from the 11 fingerprints so you do not have to open them:

| Stramien slot | Osmo category | Proven on |
|---|---|---|
| Header, dropdown, mega menu, mobile overlay | navigation / menu | `ul`, `biltz`, `plantion`, `osnabrugge`, `businessparksoest` |
| Logo bar or oversized statement band | marquee | `ul`, `biltz`, `connectyou`, `osnabrugge`, `businessparksoest` |
| Section entrances | scroll animation (reveal, stagger) | all 11 |
| Headline entrance | text animation (per line or word split) | `businessparksoest`, `osnabrugge` |
| Buttons and detached arrow tiles | button / hover (two-layer fill) | `ul`, `biltz`, `osnabrugge`, `eckeveldkleding`, `gzw` |
| Pinned card stacks, parallax, scroll timelines | scroll animation (pin, sticky stack) | `eckeveldkleding`, `mrcopilot`, `businessparksoest` |
| Showcase and audience carousels | slider | 8 of 11, all Swiper |
| Route change | page transition (panel or veil) | `ul`, `biltz`, `eckeveldkleding`, `callab` |
| Pointer | cursor (looping text badge) | `ul`, `biltz`, `eckeveldkleding`, `osnabrugge` |
| FAQ | accordion | `biltz`, `callab`, `gzw`, `trapxpress`, `businessparksoest` |
| Whole-page scroll feel | smooth scroll (Lenis) | 6 of 11 |
| Grain, mesh, tiled pattern grounds | visual effect | `callab`, `eckeveldkleding`, `businessparksoest`, `gzw` |

Only pick where the direction actually calls for it. pull `### Page transitions — a genuine split`
before you add one; seven of eleven sites have none.

### 5. Produce the design — the `design` skill

Invoke the built-in **`design`** skill (Claude Design canvas). Artboards:

- **one sitemap artboard**, the step-2 sitemap as a diagram;
- **one fully designed artboard per page** the user picked in question 3;
- **wireframe-level outline artboards** for the rest. Structure and section names only, no styling.

Copy goes in **the language of the source site** (Dutch for these clients). The skill text is
English; the design is not.

Work slot by slot, pulling the stramien section for each: pull `## Page skeleton`,
pull `### The four hero types`, pull `### Headline scale`, pull `### Vertical beat`,
pull `### Radius ladder`, pull `### The pre-footer CTA band`. The direction doc you read in
step 3 says which branch each one takes.

**Four rules to hold while generating, because these are the ones that get violated by default:**

- **No drop shadows.** Ten of eleven sites have none at all. Depth is colour blocks, panel-on-ground
  contrast, translucent fills, hairline borders, overlap and rotation. What looks like a shadow in a
  computed dump is a sub-pixel ring, i.e. a hairline. (pull `### No elevation`)
- **The accent never becomes a background field.** One accent hue, on buttons, active states, arrow
  tiles, icon chips, eyebrows and at most one highlighted word. Ten of eleven state this in their own
  Palette section. `gzw` is the documented exception and still holds its lime back for interaction.
  (pull `### The accent is punctuation, never a field`)
- **No form on the homepage.** Eight of eleven carry none; the homepage routes to a dedicated
  conversion page. (pull `### Forms live off the homepage`)
- **The named human beats a form link** as the conversion device: a real person, photo, phone,
  email. Six of eleven build a section around it. (pull `### The named human`)

If you are working in px, read pull `## Fluid root font-size` first. Five of these sites drive
their whole scale off a clamped root, so the same Tailwind step resolves differently per site and
raw px is not comparable across fingerprints.

### 6. Export to Figma

Remote **`figma`** MCP server, not `figma-desktop`. Use the server's own
**`/figma-generate-design`** skill, which drives `generate_figma_design` — calling the tool bare
skips its required setup. Hand it the finished canvas artboards.

Finish by listing: the sitemap, which pages got a full design, which got an outline, every Osmo
pick with its preview URL, and the Figma file URL.

---

## `/dezzign learn <url>`

Fingerprint a site we just built, then **propose** stramien updates. Never apply them silently.

### 1. Measure it under the protocol

Read `references/sites/_TEMPLATE.md` **in full** first. Its header carries the measurement protocol,
and a fingerprint produced without it looks conformant while not being comparable to the existing
eleven:

1. **Pin the viewport to 1440x900** before measuring anything, and record it in `Measured at:`.
2. **Resolve colours by painting, not parsing** — paint each computed value onto a 1x1 canvas and
   read the pixel back, so `lab()`, `oklab()`, `oklch()` and `color(srgb ...)` land as real hex.
   Alpha is written `#rrggbb@0.NN`.
3. **Take the palette from one source, in this order:** theme CSS variables, else the primary
   button's background for the accent, else the frequency tally. Say which source you used.

Read pull `## Known traps` before you trust any tally. Anything not directly measurable is marked
`(inferred)` with its evidence.

### 2. Write the fingerprint

Copy `_TEMPLATE.md` to `references/sites/<slug>.md`. Keep all 12 headings in their order, replace
every `<...>` placeholder, and write `- none` where the site genuinely has no such element rather
than dropping a bullet.

### 3. Propose, do not apply

Present every change as a diff-shaped proposal and get an explicit yes before writing.

- **The sourcing rule gates everything.** A trait seen on this site alone is that site's quirk and
  stays in its fingerprint. It only enters `stramien.md` if an existing site shows it too — then say
  which, because every pattern there names at least two sites.
- **Place it in a direction.** Compare against the four axes the clustering used: surface strategy,
  display weight, accent discipline, radius ladder. It should land in exactly one of the five. A
  site that fits none is not a new direction on its own; a new direction needs a second site.
- **`campaign-poster` carries its own standing instruction.** It is single-sourced and provisional.
  If this site is a second campaign site, propose firming it up. If a year has passed without one,
  propose folding its usable parts into `flood-and-acid` and deleting the file.
- **A direction added, renamed or removed moves three things together:** the `## Style directions`
  index at the end of `stramien.md`, the cross-links in the five direction docs, and the file
  itself. Propose all three in one go or the index goes stale.
- **Never edit an existing fingerprint** to make it agree with the new one. The eleven are evidence.
  If one looks wrong, say so in the proposal and leave it alone.
