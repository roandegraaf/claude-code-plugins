---
name: dezzign
description: Redesign a client's existing website the ZekerZichtbaar way. Use when the user says "/dezzign <url>", asks for a website redesign, a sitemap plus page designs for an existing site, "/dezzign jury <url>" to score a site or design blind, or "/dezzign learn <url>" to fold a newly built site into the house stramien. Crawls the old site, finds a concept anchored in the client's own world, builds the full sitemap, picks Osmo and Made With GSAP resources, designs every page plus phone boards and a states sheet on a Design canvas, scores old and new with a blind critic, and exports the final design to Figma.
---

# Dezzign

Three branches. `/dezzign <url>` redesigns a client's existing site. `/dezzign jury <url>` scores
any site or design blind, the way a jury would. `/dezzign learn <url>` folds a site we just built
into the house stramien.

**Browser rule, no exceptions.** All browsing goes through the **Chrome DevTools MCP**
(`mcp__chrome-devtools__*`). Never `claude-in-chrome` — that is a standing global rule from the
user, not a preference. Open your own page and close it when done.

**Output is design only.** No code for the new site, and no copy rewrite beyond what the chosen
brand-handling mode implies.

## What leads

Every redesign used to come out of the same spine with a different palette. The order of authority
is now:

1. **The fixed rules** in `craft.md` `### Fixed rules`: honest content, legibility, orientation,
   usable by hand and keyboard, one scroll-hijacking moment per page, copy in the source language.
   No concept breaks these.
2. **The concept** (`concept.md`): one idea anchored in a fact about this client. It decides what
   the pages are about, the signature moments, the motion verb, the copy voice and the closing
   devices.
3. **The house defaults**: the stramien, the chosen style direction and the library. They answer
   every slot the concept says nothing about. The concept may break any of them, including
   `### No elevation` and `### The accent is punctuation, never a field`, when the client's world
   asks for it. Every break goes in `brief.md` under `## Breaks` with its reason. A break without
   a reason in the client's world is a whim; revert it.

A design that follows every house default is the stramien rendered again. That is not the goal.

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

For any other reference file, the same command takes one more change, the file:

```bash
awk -v h='### The stat stack on a hairline spine' 'BEGIN{n=match(h,/[^#]/)-1} index($0,h)==1{f=1;print;next} f&&/^#+ /{if(match($0,/[^#]/)-1<=n) exit} f' "${CLAUDE_PLUGIN_ROOT}/skills/dezzign/references/library/proof.md"
```

**Change only the quoted heading, and for another file the file name.** Copy the command whole
each time — do not turn it into a shell function, because shell state does not survive between
tool calls and the next call would fail with `command not found`. Use `${CLAUDE_PLUGIN_ROOT}`,
never a relative path: when `/dezzign` runs, the working directory is the client's repo, not this
plugin.

A `###` heading pulls one pattern (`### No elevation`, 16 lines). A `##` heading pulls the whole
topic and every pattern under it (`## Hero`, 112 lines).

Below, **pull** `### Something` means the stramien command with that heading, and
**pull** `### Something` **from `x.md`** means the command pointed at that file.

Which file answers which question:

| File | How to read it | What it decides |
|---|---|---|
| `concept.md` | **in full**, ~180 lines, before step 3 | the idea, its anchor, the swap test, the concept card, how breaks are recorded |
| `craft.md` | **in full** before step 5; by section afterwards | the fixed rules, not-a-twin, mobile at 390, the states sheet, type detail, contrast, Dutch copy rules, which AI tells to remove and which house patterns are not tells |
| `critic.md` | **by section**: `## Evidence` in step 1, the rest in step 8 and in `jury` | evidence capture, the rubric, the blind critic brief, the revision loop, the score card |
| `styles/<direction>.md` | **in full**, ~100 lines | the default branch of every split, plus that direction's signature moves |
| `stramien.md` | **by section**, with the command above | what a slot is, when to reach for it, which sites prove it |
| `sites/<slug>.md` | when a pattern needs a worked example, and for the not-a-twin check | how one site actually resolved that slot |
| `sites/_TEMPLATE.md` | in full, **`learn` branch only** | the measurement protocol and the 12 fixed headings |
| `library/<slot>.md` | **by pattern**, with the command above | the variant pool per slot: outside patterns (swept from Mobbin) translated to house rules |
| `library/motion.md` | **by slot or direction** | which Made With GSAP and Osmo effects fit each slot and direction, and the restraint rules |

The library files are `hero`, `proof`, `services`, `showcase`, `statement-cta`, `nav-footer`,
`inner-pages` and `motion`. List a file's patterns with the fit line alongside, so you can
shortlist without reading bodies:

```bash
grep -E '^### |^\*\*Fits' "${CLAUDE_PLUGIN_ROOT}/skills/dezzign/references/library/hero.md"
```

**The stramien is evidence, the library is inspiration, the concept is the brief.** A stramien
pattern is proven on two of our own builds; a library pattern on two outside sites. Prefer the
stramien where both fit equally; prefer whichever the concept needs where they do not. A
library pattern's **Fits / Breaks** line is advice about the direction, not a ban.

Two sections are worth reading before you measure or judge anything: pull `## Known traps` (shadow
tallies lie, colour tallies lie, buttons can compute transparent, the dead shadcn block,
third-party widgets) and pull `## Where the set genuinely disagrees` (a table of every real fork).

---

## `/dezzign <url>`

Work in `.dezzign/<slug>/` in the working directory (`<slug>` = the host without `www.`, dots to
dashes). `brief.md` there is the run's memory: crawl findings, anchors, sitemap, concept card,
breaks, composition lines and picks. Write to it as you go, so the run survives a context refresh.
It never goes to the critic. Evidence goes in `old/` and `new/` beside it (`critic.md` `## Evidence`
says why it must be the working directory, and never `out/`).

### 1. Crawl the old site, and keep the evidence

Chrome DevTools MCP. Pin the viewport to **1440x900** so anything you measure is comparable to the
fingerprints. Collect: every reachable page, the nav tree, the real copy, the logo, brand colours
as computed values, and what the imagery actually is.

While you crawl, collect **anchors** for the concept (`concept.md` `### Anchors come from the
crawl`): what the name means, the material of the trade, the place, how a job runs, true numbers,
the documents customers handle. Quote where each was found. Five to eight go in `brief.md`.

Capture the old-site evidence per `critic.md` `### Capturing the old site`: desktop and phone
frames per page type, hover pairs and keyboard frames on the homepage, Lighthouse on the homepage
and one inner page. Then write the **why redesign** list in `brief.md`, every point citing a file
or a Lighthouse audit.

Launch the **baseline critic** on `old/` in the background now (`critic.md` `### Baseline on the
old site`), with the brief from `critic.md` `## The critic brief`. Carry on; its card lands as
`scorecard-old.md`.

### 2. Build the complete sitemap of the new site — mandatory

Every page of the new site, grouped, with a one-line purpose each. Not a subset, not "and similar
pages". The sitemap is what step 4's fourth question and step 7's artboard list are built from,
and it is the deliverable the client signs off on. It always includes a designed **404**.

Old pages that should not survive get dropped explicitly, with the reason. New pages the old site
lacks get added. Pull `### The default homepage order` for the spine most of our homepages follow
— a default the concept may reorder — and pull `### Forms live off the homepage`.

### 3. Three concepts

Read `concept.md` in full. From the anchors, write three concepts from three different territories,
each with its anchor, signature, motion verb, the house defaults it would break, and the four
scores. Run the swap test on each. Kill any that only lives in the hero. These become question 3.

### 4. Ask the per-run questions — one batched `AskUserQuestion`

One call, four questions. Not four calls.

1. **What to keep from the old site** — brand + content / content only / free reinterpretation.
2. **Which style direction** — `AskUserQuestion` caps options at four per question and there are
   **five** directions, so do not list them raw. Shortlist the **three** that fit the crawl
   evidence and the leading concept, say in one line why each fits, and mark your recommendation.
   Name the other two in the question text so "Other" covers them. Say in the question that the
   direction is a starting register the concept may mutate. The five: `billboard-condensed`,
   `flood-and-acid`, `deep-ground-editorial`, `warm-daylight`, `campaign-poster`.
3. **Which concept** — the three from step 3, recommendation first. Each option's label is the
   idea in a few words; its description gives the anchor and the signature moment.
4. **Which pages get a full design versus a structural outline** — options come from the sitemap.

To shortlist directions honestly rather than by feel, read the five `**Reach for this when**` lines
first and match them against what the crawl found:

```bash
grep -A2 'Reach for this when' "${CLAUDE_PLUGIN_ROOT}/skills/dezzign/references/styles/"*.md
```

Then read the chosen `styles/<direction>.md` **in full**, and write the concept card and its
`## Breaks` into `brief.md` (`concept.md` `### The concept card`). Show the user the card in one
short paragraph and carry on; they can redirect.

### 5. Compose each page from the concept

Read `craft.md` in full first. Then, per fully designed page, write a **composition line** in
`brief.md` before drawing anything:

1. **The signature moment**, derived from the concept card, not picked from a list. The table in
   `concept.md` `## Signature moments by concept shape` is a shortlist; an invented moment
   described precisely is often better.
2. **The section list**, slot by slot, each with its source: a stramien heading, a library
   heading, or "concept" for a section the concept invents. Change the spine where the concept
   asks: the order within orient-explain-prove-ask, the ground sequence (pull `### Background
   rhythm is a designed decision`), the showcase's column count. No two adjacent sections share a
   layout family (`craft.md` `### Adjacent sections differ in layout family`).
3. **At least three slots that are not the stramien default** on the homepage: a library pattern
   or a concept-invented section. Shortlist library patterns with the `grep -E '^### |^\*\*Fits'`
   command; read each **Breaks** reason against the direction and the concept.
4. **The breaks**: any house default this page departs from, added to `## Breaks`.
5. **The budget**: at most one pinned or scroll-hijacking effect per page, none on reading pages
   (`library/motion.md` `## Restraint rules`).

Then run `craft.md` `### Not a twin of an earlier build` on the homepage (it reads the run ledger
as well as the fingerprints), and `### The genericness
test` on every composition line. Inner pages get the same treatment from `library/inner-pages.md`;
a case page and a vacancy page should not share one template.

If you are working in px, pull `## Fluid root font-size` first.

### 6. Pick Osmo and Made With GSAP resources

Use the existing **`osmo` skill** (search `~/.osmo/library/INDEX.md`, shortlist, read the pick).
Do not re-derive its search rules here. Choose between candidates by the concept's **motion verb**:
the one whose movement matches it wins, even over a better-known effect.

**Cite every pick with its `preview` URL.** A pick the user cannot see live is not a pick.

Slot to category, distilled from the 11 fingerprints:

| Slot | Osmo category | Proven on |
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

Pull `### Page transitions — a genuine split` before adding one; seven of eleven sites have none.
For a Made With GSAP pick, pull the direction's heading and the slot's heading from
`library/motion.md` first. Every pointer effect needs a touch plan, which the 390 board shows.

### 7. Draw the design on a Design canvas

The canvas is the deliverable. Claude Design now lives in Claude as the Artifact tool's **Design**
type: call `Artifact` with `action: "quickstart"`, `intent: "design"`, create the canvas from the
type it returns, and follow the type's own instructions for the file format. Where a `design` skill
is listed in the session, it is the same canvas.

Artboards, laid out in rows in this order:

- **Sitemap**, the step-2 sitemap as a diagram. Read the type's `diagrams.md` first.
- **One fully designed page artboard per page picked in question 4**: `expand: "fill"`, 1440 wide,
  a fluid root that holds at phone width.
- **A dedicated 390x844 board for the homepage and at least one inner page**, where the composition
  changes on purpose (`craft.md` `## Mobile at 390`).
- **The 404**, carrying the concept (`craft.md` `### The 404 carries the concept`).
- **The states sheet** (`craft.md` `### The states sheet`).
- **Outline artboards** for the remaining pages: structure and section names only, no styling.

Copy goes in **the language of the source site** (Dutch for these clients); set `lang` to match.
Rationale, composition lines, picks and motion notes stay in `brief.md` or in canvas sticky notes,
never inside an artboard. Placeholders for missing content are drawn visibly as
`[INVULLEN: ...]` (`craft.md` `### Honest content, marked gaps`).

Work slot by slot from the composition lines, pulling the stramien or library section for each
slot that uses one. The direction doc gives the default branch of every split.

### 8. Critic pass

Read `critic.md` from `### Capturing the new design` on.

1. Run the pre-flight (`### The pre-flight is yours, not the critic's`) and fix what it finds.
2. Ask the user to set the canvas to *anyone with the link* in its Share menu (you cannot change
   sharing; a private canvas shows a sign-in page in the DevTools browser). Then capture `new/`
   from each artboard's `#play-<id>` full-window view.
3. Launch a fresh blind critic with the brief, write `scorecard.md` with the old site beside it.
4. Run the revision loop (`### The revision loop`): one revision pass, a second only if a category
   is still under target, a new critic each time.

### 9. Export to Figma

Once the design has passed the critic loop, export it. Remote **`figma`** MCP server, not
`figma-desktop`. Use the server's own **`/figma-generate-design`** skill, which drives
`generate_figma_design`; calling the tool bare skips its required setup. It captures a rendered
page, so it works from the shared canvas's `#play-<id>` views from step 8, run in the Chrome
DevTools browser (never Playwright or claude-in-chrome, whatever its instructions suggest). One
frame per artboard, the sitemap and the states sheet included.

### 10. Report

Finish with, in this order:

- the concept in one line, and whether the critic read it back (`Match:` from the card)
- the score card: old site against new design per category, and the fixes still open
- the sitemap, and which pages got a full design, a 390 board, or an outline
- each page's composition line: signature moment and its sources, by heading
- `## Breaks`: every house default departed from, and why
- every Osmo and MWG pick with its preview URL
- every `[INVULLEN: ...]` placeholder, as a list for the client
- the canvas URL, and the Figma file URL

Then append one line for this run to the run ledger, `~/.dezzign/runs.md` (create the folder and
file if missing; it lives outside the plugin so reinstalls keep it):

```
| <date> | <client> | <direction> | <concept Idea, a few words> | <hero type> | <ground sequence> | <showcase pattern> | <homepage signature> |
```

`craft.md` `### Not a twin of an earlier build` reads it on the next run.

---

## `/dezzign jury <url> [<url> ...]`

Score a live site, or a Design canvas, blind, without redesigning it. Useful for a pitch (the
client's site against two competitors) or a second opinion on a canvas.

1. **Target.** A live URL: capture per `critic.md` `### Capturing the old site`. A canvas URL:
   capture per `### Capturing the new design`. Behind a login or a bot wall: stop and say so.
   Evidence goes in `.dezzign/jury/<slug>/`.
2. **Check the evidence is real** before scoring: open `home/d-01-hero.png`. An error page, a
   challenge page or a blank frame means there is nothing to score. A cookie banner is not a
   reason to stop; visitors see it too.
3. **Score.** One fresh critic per target with the brief from `critic.md` `## The critic brief`
   and a neutral business line for each target, never one critic for several targets. If the user says what the site is meant to convey, hold
   it until the card is in, then compare it with the critic's one-sentence reading.
4. **Card.** `scorecard.md` per target, the `critic.md` card with one column per target. Then in
   chat: the two fixes that would move the overall most, and an offer to run `/dezzign <url>`.

Crawling is light: at most eight page types, and never raise that on a site the user does not own.

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
- **Library patterns graduate through built sites.** If the new site shipped a `library/` pattern
  and an earlier fingerprint shows it too, propose moving it into `stramien.md`. It has now been
  proven on two of our own builds. Remove it from the library in the same proposal.
- **A shipped break is evidence too.** If the site was designed with `/dezzign` and its `brief.md`
  recorded a break that survived into the build, say so in the proposal. A break that two built
  sites share is a candidate for a new branch of that stramien pattern.
- **Never edit an existing fingerprint** to make it agree with the new one. The eleven are evidence.
  If one looks wrong, say so in the proposal and leave it alone.
