# Critic — a blind score, before and after

Adapted from `/jury` (juliobsz/skills, MIT): its blind-critic method, the Awwwards criteria and
weights, and the evidence-first rules. Rewritten for design stills: no code exists yet, so the six
developer areas and the jury calibration offset do not apply.

## Why blind

### The builder scores intent

Whoever made the design knows what it was meant to say, so they see the intent instead of the
screen. A critic that gets only screenshots scores like a visitor, a client or a jury: it sees
what is actually there. So the critic is a fresh subagent that never sees `brief.md`, the concept
card, the stramien, the artboard source, the chat, or an earlier score card.

### What the critic is for

Three things. A ranked fix list for the revision pass. A before-and-after score the client can
read. And one sentence: what the critic thinks the site's idea is. If that sentence does not match
the concept card's `Idea:`, the design is not saying it, and that is the first fix.

## Evidence

### Where evidence lives

Everything goes under `.dezzign/<slug>/` in the **working directory**: the Chrome DevTools MCP
refuses to save outside its workspace roots, so the scratchpad does not work for this. `<slug>`
is the client's host without `www.` and dots (`trapxpress-nl`).

```
.dezzign/<slug>/
  brief.md          crawl findings, sitemap, concept card, composition lines, picks (never shown to the critic)
  old/<page>/       evidence from the live old site
  new/<page>/       evidence from the new design
  scorecard-old.md  baseline card
  scorecard.md      current card for the new design (earlier ones renamed scorecard-<n>.md)
```

Never write evidence under `out/`: in a CreatorZZ workspace everything there uploads to the step.

### File names

Use the same prefixes for old and new so the critic reads both the same way:

| Prefix | What |
|---|---|
| `d-01-hero.png` | desktop 1440x900, first viewport |
| `d-full.png` | desktop 1440, full page |
| `m-01-hero.png` | phone 390x844, first viewport |
| `m-full.png` | phone 390, full page |
| `h-NN-rest.png` / `h-NN-hover.png` | one interactive element, clipped, at rest and hovered (old site), or that role's rows on the states sheet (new design) |
| `k-NN.png` | keyboard focus after NN presses of Tab (old site) |
| `states.png` | the states sheet (new design) |
| `notes.md` | measured facts: Lighthouse results, overflow, small targets, what each `h-` pair is |

`<page>` is one folder per page type: `home`, each top-level page, one detail page per collection
(one case, one vacancy, one product), and `404`. At most eight page types.

### Capturing the old site

All through the Chrome DevTools MCP, in your own page, closed afterwards.

1. **Reduced motion first.** Call `emulate` with `prefersReducedMotion: "reduce"`. Scroll-triggered
   reveals otherwise leave whole sections blank in a full-page capture. If a section is still
   blank, scroll it into view with `evaluate_script` before the capture.
2. **Desktop.** `emulate` with `viewport: "1440x900x1"` (keep `prefersReducedMotion` in the same
   call: each `emulate` call replaces the previous settings). `take_screenshot` with `filePath` for
   `d-01-hero.png`, again with `fullPage: true` for `d-full.png`.
3. **Phone.** `emulate` with `viewport: "390x844x3,mobile,touch"`, not `resize_page`: desktop
   Chrome windows often refuse to get that narrow. Capture `m-01-hero.png` and `m-full.png`. Then
   measure with `evaluate_script`: horizontal overflow (`document.documentElement.scrollWidth >
   innerWidth`) and tappable elements under 24px high or wide. Write both into `notes.md`.
4. **Hover pairs**, home only, three to six primary targets (the main CTA, a nav link, a card, the
   footer CTA): `take_snapshot` for uids, element `take_screenshot` by uid for `h-NN-rest.png`,
   `hover`, then the same element again for `h-NN-hover.png`. Name each pair in `notes.md`.
5. **Keyboard**, home only: `press_key` Tab three to five times with a `k-NN.png` after each. A
   frame where you cannot see where focus is counts as evidence.
6. **Lighthouse**, home and one inner page: `lighthouse_audit` with `device: "mobile"` and
   `outputDirPath` under `old/<page>/lighthouse/`. It covers accessibility, SEO and best practices,
   not performance. Copy the scores and the failing audits into `notes.md`. Performance is
   optional: `performance_start_trace` on the homepage under the phone emulation, and the LCP and
   CLS it reports.

The same evidence doubles as step 1's "why redesign" list: every finding there cites a file.

### Capturing the new design

The Design canvas forbids screenshotting an artboard unless the user asked. Running `/dezzign`
is that ask: the critic pass is part of the flow the user started. Say so in one line when you
start capturing.

Verified on a test canvas (2026-10-23). The DevTools browser runs its own Chrome profile and
signing in to claude.ai is refused in an automated browser, so the canvas must be **shared**.

1. **Ask the user to share the canvas.** A private canvas shows "Sign in to view this page". Ask
   once: "set the canvas to *anyone with the link* in its Share menu". You cannot change sharing
   yourself; only the Share menu can. A shared canvas renders read-only without a login.
2. **Collect each artboard's direct address.** Open the canvas URL in a new DevTools page at
   `viewport: "1440x900x1"` (at phone width the overview is too small to click). Wait for an
   artboard heading with `wait_for`, then `take_snapshot`: each artboard has a button named
   `Open artboard <title> full window`. Click it and read `location.href`: it ends in
   `#play-<id>`. Back to the canvas (`Back to canvas`) and repeat for every artboard you capture.
   From then on, navigate straight to `<canvas url>#play-<id>`. Never capture the canvas overview:
   it shows artboard titles and sticky notes, which would hand the critic the intent.
3. **In the full-window view, screenshot the artboard element, not the page.** The artboard is an
   iframe named after its title (`Iframe "Home 1440"` in the snapshot); `take_screenshot` with its
   `uid` and `filePath` gives the artboard alone, without the canvas toolbar. Re-run `take_snapshot`
   after every `emulate`: the uids change.
4. **Hide the sign-in toast** before each capture. A viewer gets a fixed "Sign in to see this
   artifact's data" toast that overlays the bottom of a page artboard. Hide only that element;
   hiding broader containers blanks the canvas:
   ```js
   () => { const f = [...document.querySelectorAll('body *')].filter(e => ['fixed','sticky'].includes(getComputedStyle(e).position) && /Sign in to see this artifact/.test(e.textContent || '') && !e.querySelector('iframe')); f.filter(e => !f.some(o => o !== e && e.contains(o))).forEach(e => e.style.setProperty('display', 'none', 'important')); }
   ```
   Switching between desktop and mobile emulation reloads the page, so run it again after each
   switch, once `wait_for` has found the artboard's text.
5. **Page artboards** (`expand: "fill"`) fill the window, so the viewport sets their size:
   - `d-01-hero.png`: `viewport: "1440x900x1"`.
   - `d-full.png`: `viewport: "1440x<h+100>x1"`, `<h>` being the artboard's height in
     `canvas.json` (verified to 3000px tall in one capture).
   - `m-01-hero.png` and `m-full.png`: the same at `"390x844x3,mobile,touch"` and a tall phone
     viewport. The page's height at 390 is not recorded anywhere: start at about 2.5 times the
     desktop height, and if the capture ends in a long run of empty ground below the footer,
     recapture shorter. This is the fluid page at phone width; it shows real overflow when a
     display line does not fit.
   - The canvas paints the window below a page's end; write "empty space below the footer is
     capture padding, not design" in `new/notes.md` so the critic does not score it.
6. **Fixed-size boards** (the dedicated 390 boards, the states sheet, the 404 if fixed) open in
   *Fit* mode, which shrinks them when the window is too small. Use a desktop viewport larger than
   the board at 2x (`"1440x<h+250>x2"`): the element screenshot then comes out at the board's
   native size. A dedicated 390 board replaces the fluid page for that page's `m-` files.
7. **The states sheet** as `states.png`. The artboard's own elements appear in the snapshot inside
   its iframe; where a row's container has a uid, screenshot it as `h-NN-rest.png` /
   `h-NN-hover.png` by role. Otherwise the critic reads `states.png` alone.
8. **If the user will not share the canvas**, nothing can render it, the Figma export included
   (it captures the same page). Run the critic on the artboard source files instead and mark
   every card "source-read, not visual"; it is a weaker score and the card must say so. Only when
   frames already exist in Figma from an earlier export can the remote figma server's
   `get_screenshot` (`maxDimension` 2880, the PNG downloaded with the curl it returns) stand in.

## The rubric

### Weights

The Awwwards jury criteria and weights, which are public (awwwards.com/about-evaluation): Design
40%, Usability 30%, Creativity 20%, Content 10%. Weighted overall = 0.4 Design + 0.3 Usability +
0.2 Creativity + 0.1 Content. The bar is not an award; it is a yardstick the client can read.
No jury estimate: `/jury`'s offset was measured on live award sites, not on design stills or on
SME client sites. These scores are not affiliated with Awwwards.

### Judged for this business, not for an award

The critic gets one neutral line about the business: what it is and what visitors must do on the
site ("a fencing company for farms; visitors request a quote or call"). It never gets the concept.
It scores fit to that audience: restraint that suits a cautious buyer is craft, not timidity, and
spectacle that slows a visitor down costs points. A plumber's site that would win a design award
but loses the phone call has failed.

### Scale anchors

Start every category at 6 and make the evidence earn every point above it. The scale is strict on
purpose: on stills, this kind of critic gave recent Sites of the Day around 6.5 for Design and 5
to 5.5 for Usability. A 7 here is a good site.

**Design (40%)**
- 6: clean and consistent, but could be any template; safe type; uniform spacing.
- 7: a clear typographic system, an intentional palette, good hierarchy; one or two memorable compositions.
- 8: every frame composed; type and image used with intent for this audience; rhythm varied on purpose; the details designed (states, focus, captions, footer, 404).
- 9: nothing to add or remove; a visual language you would recognise from a crop.

**Usability (30%)**
- 6: works, but orientation takes a scroll, the nav is unclear on some page, the phone layout is squished, or text over images fails contrast.
- 7: clear nav, phone layout works, contrast holds, one obvious next step per page.
- 8: who, what and where-to-go in the first viewport on every page; the phone layout composed for the hand; tap targets sized; every primary target has a designed hover and focus state that is more than a colour swap (`h-` pairs).
- 9: all of 8, with no friction anywhere and feedback designed for every state.

**Creativity (20%)**
- 6: known patterns, competently assembled.
- 7: one idea specific to this client, partly carried through.
- 8: the idea drives layout, imagery and the signature moment, and it reaches the footer and inner pages.
- 9: an idea a competitor could not use, executed so it becomes the client's.

**Content (10%)**
- 6: generic or placeholder-feeling copy, stock imagery.
- 7: specific copy, honest imagery, a clear story.
- 8: copy with voice and substance; cases or services explain the problem, the approach and the result.

A marked `[INVULLEN: ...]` placeholder counts as a gap, not as invented content. Note it; do not
let it pull Design or Usability down.

### Old-site extras

On the old site only, the critic also reads `notes.md` (Lighthouse, overflow, small targets) and
the `k-` frames. They count toward Usability. The new design has no build to measure, so its
Usability is judged from the artboards alone.

## The critic brief

Hand this to a fresh subagent, with the business line and the paths filled in, and nothing else.
Never the concept card, `brief.md`, the stramien, the source, your own opinion, or an earlier
card. Use the same business line for the old site and the new design.

```
You are reviewing a website design you have never seen, the way an Awwwards juror would, from
evidence only. Use only the files below: do not open any URL, search the web, or read anything
else about the client.

Business: <one neutral line: what the business is and what visitors must do on the site>
Rubric:   <absolute path to references/critic.md>, the "The rubric" section only
Evidence: <absolute path to .dezzign/<slug>/old or new>. One folder per page type.
          d- desktop 1440, m- phone 390, h-NN-rest / h-NN-hover one interactive element at rest
          and hovered, k-NN keyboard focus, states.png every interactive state, notes.md
          measured facts where present.

1. Open every image. Before scoring, write in one sentence what you think the site's idea is.
   If you cannot tell, say so: that is a Creativity finding, not a guess to make.
2. Score Design, Usability, Creativity and Content from 1 to 10, for the business and visitors
   named above. Cite a file for every score. No evidence, no points. Start each at 6 and make
   the evidence earn every point above it.
3. Weighted overall = 0.4 Design + 0.3 Usability + 0.2 Creativity + 0.1 Content.
4. List the fixes that would raise a score, most points first. Each names the file, what is
   wrong and what to change ("home/m-01-hero.png: the headline wraps to six lines at 390; cut it
   to two lines and drop the size to 44px"), never generic ("improve the typography").
5. Judge interaction from the h- pairs and states.png: a primary button, nav link or card whose
   hover only changes text colour costs Design and Usability points; a fill that floods or
   inverts the whole element is a real treatment.
6. Leave out what stills cannot show (how motion feels). Do not assume it is good.

Reply with: the one-sentence idea, a score table with evidence, the weighted overall, and the
ranked fix list. Do not propose a new concept; judge the one on screen.
```

## Running it

### Baseline on the old site

Right after step 1's evidence is captured, launch the critic on `old/` in the background and carry
on with the sitemap. Its card becomes `scorecard-old.md`. It gives the client a number for "why
redesign", and the new design a floor it must clear in every category.

### The pre-flight is yours, not the critic's

The critic judges the screen like a visitor; it does not know the house, and must not. Before
launching it on the new design, check these yourself and fix any miss first:

- every fixed rule in `craft.md` `### Fixed rules` holds
- every house default the design departs from is listed in `brief.md` `## Breaks` with a reason
  in the client's world, and every unlisted departure is either given a reason or reverted
- `craft.md` `### Not a twin of an earlier build` passes
- the concept reaches the footer, one inner page and the 404 (`concept.md`)
- the 390 boards exist and replace every hover pattern, the states sheet exists, every
  placeholder is marked, no sentence repeats, one action has one name, no filler from the list

A departure from the house is not a miss. A departure without a reason is.

### The revision loop

The targets are relative to this client's old site, not absolute numbers: an absolute 8 on this
strict scale is rare even for award winners, so a fixed bar would only burn both revisions every
run. The new design passes when:

- every category is at least a full point above the old site's (or at 7 and up where the old site
  was already strong)
- the critic's one-sentence idea matches the concept card (`Match: yes`)
- none of the top three fixes on the list is cheap: a fix that costs one artboard edit and gains a
  point gets made

1. Capture `new/`, launch a fresh critic, write `scorecard.md`.
2. If a target is missed, treat the fix list as the work: revise those artboards on the canvas,
   recapture only the changed boards, rename the card to `scorecard-1.md`, and launch a **new**
   critic. Never show it the earlier card: it would anchor on the old numbers.
3. A second revision only if a category is still under target after the first. Then stop and
   report what is still under target and why, rather than looping.

Do not argue a score up. Dispute one only by pointing at a file the critic misread, and say so on
the card. A Content score held down by marked placeholders is reported, not chased: the client
fills those. A fix that would make the design louder than its audience wants (more motion, more
spectacle on a reading page) is weighed against the concept and the business line, not applied by
reflex.

### The score card

```markdown
# <client>: design score
Blind critic, from <n> page types on <date>. Not affiliated with Awwwards; the criteria and
weights are theirs and public.

**The idea, as the critic read it:** one sentence
**The idea, as intended:** the concept card's Idea line   **Match:** yes | partly | no

| | Old site | New design | Evidence (new) |
|---|---|---|---|
| Design (40%) | 6.0 | 8.0 | file and what it shows |
| Usability (30%) | | | |
| Creativity (20%) | | | |
| Content (10%) | | | |
| **Overall** | | | |

## Fixes still open, most points first
1. [Usability] home/m-01-hero.png: what is wrong, and what to change

## Old site, measured
Lighthouse accessibility, SEO and best-practices scores, the top failing audits, overflow at
390, small targets, and LCP and CLS if a trace ran.
```
