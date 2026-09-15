> Completed 2026-09-15 (pending acceptance: 3 items, see ACCEPTANCE.md)

# Dezzign plugin

## Goal
A Claude Code plugin (`dezzign/`) that captures the ZekerZichtbaar design "stramien": the
skeleton, section patterns and style directions that recur across the websites we build. With
`/dezzign <old-site-url>` Claude crawls a client's current site, builds the full sitemap, asks a
few per-project questions, picks fitting Osmo resources and produces a redesign of every page as
a Claude Design canvas, then pushes it to Figma. `/dezzign learn <url>` adds a newly built site to
the stramien so the system keeps evolving.

## Scope
- Plugin scaffold in this marketplace repo: `dezzign/.claude-plugin/plugin.json`, marketplace entry, README section.
- Stramien reference docs derived from analysing the 11 reference sites in a real browser:
  - `references/sites/<slug>.md`: one structured fingerprint per site (nav, hero, section order, type, palette, spacing, motion, footer, CTA pattern, notable Osmo-like elements).
  - `references/stramien.md`: what recurs across all sites (page skeleton, nav/footer conventions, hero types, section rhythm, CTA and form patterns, typography and spacing rules, motion rules, imagery treatment).
  - `references/styles/<direction>.md`: 3 to 5 named style directions clustered from the fingerprints, each listing its example sites.
- `/dezzign <url>` redesign flow:
  1. Crawl the old site with the Chrome DevTools MCP (never claude-in-chrome): pages, nav, copy, logo, brand colours, imagery.
  2. Build the complete sitemap of the new site (every page, grouped, with a one-line purpose each). Mandatory.
  3. Ask per run (batched AskUserQuestion): what to keep from the old site (brand + content / content only / free reinterpretation), which style direction, which pages deserve a full design versus a structural outline.
  4. Pick Osmo resources via the `osmo` skill for hero, nav, marquee, hover, transitions where fitting; cite each pick with its preview URL.
  5. Produce the design with the built-in `design` skill (Claude Design canvas): one artboard per fully designed page, a sitemap artboard, and outline artboards (wireframe-level) for self-explanatory pages.
  6. Export to Figma via the figma MCP (`generate_figma_design`).
- `/dezzign learn <url>`: fingerprint a newly built site into `references/sites/`, then propose (not silently apply) updates to `stramien.md` and the style directions.

## Non-goals
- No code generation for the new site. Output is design only (canvas + Figma).
- No copywriting rewrite beyond what the chosen brand-handling mode implies.
- No screenshots or Osmo library content committed to the repo. Screenshots live in the scratchpad during analysis; Osmo stays in `~/.osmo/library`.
- No automated crawler script. Crawling is done through the browser MCP inside the skill flow.
- Not a generic design-system generator. It encodes the ZekerZichtbaar way, nothing else.

## Key decisions & constraints
- Same plugin layout as `osmo/`: `dezzign/.claude-plugin/plugin.json` + `dezzign/skills/dezzign/SKILL.md` + `dezzign/skills/dezzign/references/`. Skill text in English, generated design copy in the language of the source site (Dutch for these clients).
- Fingerprints use one fixed template so `learn` output and the initial 11 are comparable. Define the template once in `references/sites/_TEMPLATE.md`.
- The stramien describes patterns, not pixels: name the pattern, say when to use it, list example sites. Keep it grep-friendly (headings per pattern) so the skill can point Claude at sections instead of loading everything.
- Browser use goes through the Chrome DevTools MCP only (global rule). Analysis of the 11 sites may fan out to subagents, but each subagent must open its own page and close it afterwards.
- Osmo integration reuses the existing `osmo` skill; Dezzign only tells Claude when to reach for it and which categories fit which stramien slots.
- Design output uses the built-in `design` skill (Claude Design canvas). Figma export uses the remote `figma` MCP (`generate_figma_design`), not figma-desktop.
- Reference sites (analyse all 11):
  https://ul.zekerzichtbaar.nl, https://callab.nl, https://biltz.zekerzichtbaar.nl, https://mrcopilot.nl,
  https://www.trapxpress.nl, https://gzw.s1.coolify.zekerzichtbaar.nl, https://connectyou.nl, https://plantion.nl,
  https://www.eckeveldkleding.nl, https://businessparksoest.nl, https://osnabrugge.staging.zekerzichtbaar.nl

## Preconditions & external dependencies
- Osmo membership with a synced library (`~/.osmo/library/INDEX.md` exists today).
- Chrome DevTools MCP connected (it is).
- Figma MCP (remote `figma` server) authenticated for the export step. `figma-desktop` is not needed.
- The two staging/coolify reference URLs must be reachable without auth from this machine; if one needs a password the user provides it or that site is skipped in the fingerprints.
- Claude Design canvas (`design` skill) available in the sessions that run `/dezzign`.

## Building blocks
- Plugin scaffold, marketplace entry, README section.
- Fingerprint template and 11 site fingerprints.
- `stramien.md` and the style-direction docs (clustering step).
- The `/dezzign <url>` SKILL.md flow: crawl, sitemap, questions, osmo picks, design canvas, Figma export.
- The `/dezzign learn <url>` branch of the skill.
- An end-to-end dry run on one real old site to validate the flow and tune the brief handed to the `design` skill.

## Definition of Done
- [x] `dezzign/.claude-plugin/plugin.json` exists and the plugin is listed in `.claude-plugin/marketplace.json` (`source: ./dezzign`).
- [x] `dezzign/skills/dezzign/references/sites/` contains `_TEMPLATE.md` plus one fingerprint per reference site (11 files, or fewer with the unreachable ones named in PROGRESS.md), every fingerprint filled in from a real browser visit.
- [x] `references/stramien.md` exists and every pattern in it names at least two example sites from the fingerprints.
- [x] `references/styles/` contains 3 to 5 direction docs, each naming its example sites and its type, palette logic and motion character.
- [x] `SKILL.md` describes `/dezzign <url>` with the six numbered steps above, the per-run questions, and the mandatory full-sitemap rule.
- [x] `SKILL.md` describes `/dezzign learn <url>` and it writes a fingerprint using `_TEMPLATE.md` and proposes stramien edits without applying them.
- [x] README has a Dezzign section in the same style as the Osmo section, and the marketplace `metadata.version` is bumped.
- [ ] One dry run of `/dezzign <url>` on a real old client site produced a canvas with a sitemap artboard, at least one full page design and at least one outline page, plus a Figma file. `[user-gated]`
- [ ] The user has reviewed `stramien.md` and the style directions and signed off that they match how ZekerZichtbaar actually designs. `[user-gated]`

## Open questions
- Whether Claude Design saving is enabled for this account (affects whether the user can refine in-canvas or only export). Discovered during the dry run.
- Which real old site to use for the dry run. Ask the user when that slice starts.
