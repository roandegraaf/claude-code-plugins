---
name: osmo
description: Find and integrate Osmo Supply (osmo.supply) and Made With GSAP (madewithgsap.com) resources - buttons, navigation menus, sliders, marquees, scroll/text/hover/drag animations, cursors, loaders, page transitions, galleries, forms, visual effects and CSS/JS snippets. Use when the user says "/osmo", mentions Osmo, Made With GSAP or MWG, or is building a frontend piece (a menu, a slider, a hero animation, a preloader, a hover effect) where a production-ready GSAP/CSS resource would fit. "/osmo sync" refreshes the local library.
---

# Osmo Supply resources

A local markdown library of every Osmo Vault resource lives in `~/.osmo/library`
(override with `OSMO_LIBRARY_DIR`). `INDEX.md` is the catalog; one file per resource holds
its dependencies, HTML, CSS, JavaScript, Webflow custom CSS and documentation - the same
content as the "Copy context for AI" button in the Vault.

The same library also holds Made With GSAP effects: `mwg/<slug>.md` files with their own
`INDEX-mwg.md`. Each has dependencies (derived from the JS), the tutorial's final HTML, CSS and
JavaScript, and the full step-by-step tutorial as Documentation.

## Sync

Run when the user says `/osmo sync`, when `INDEX.md` is missing, or when a resource the user
mentions is not in the index (Osmo adds resources regularly):

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/sync.py"            # everything (~2 min, ~360 pages)
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/sync.py" slug ...   # refresh specific resources
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/sync_mwg.py"                 # Made With GSAP (~10 s)
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/sync_mwg.py" effect012 ...   # refresh specific effects
```

`/osmo sync` runs both. The MWG sync logs in with `MWG_EMAIL` and `MWG_PASSWORD` from the
environment. If they are unset, skip it, tell the user to export them in their shell profile, and
never ask for the password in chat. Effects the membership does not include are reported as
`locked` and skipped. That is expected, not an error.

Osmo is a paid membership product. Before the first sync (no `INDEX.md` yet), ask the user once
with AskUserQuestion to confirm they have an Osmo membership; stop if they don't. Never copy the
library into a repository.

## Find a fitting resource

1. Ensure the library exists: `test -f ~/.osmo/library/INDEX.md` — if missing, run the sync (see above, with the membership check).
   `INDEX-mwg.md` missing just means MWG was never synced; run `sync_mwg.py` if the credentials are set.
2. Search both indexes, do not read them in full. Lines look like `- vault/<slug>.md | <Title> | <keywords>`
   grouped under `## <kind>: <category>` headings. Kinds: `vault` (components and animations),
   `snippet` (small CSS/JS/HTML/Webflow utilities; their code sits inside the Documentation section),
   `button` (the 100-button pack), `tutorial` (video-only, title and URL only).
   `INDEX-mwg.md` lines look like `- mwg/<slug>.md | <Title> | <interaction tags> | <description>`;
   tags are Scroll, Mouse Move, Drag, Click, Infinite, so search the description words too.
   ```bash
   grep -i 'marquee\|infinite' ~/.osmo/library/INDEX*.md         # by keyword or title, both sources
   sed -n '/^## vault: Navigation/,/^## /p' ~/.osmo/library/INDEX.md   # whole category
   grep '^## ' ~/.osmo/library/INDEX.md                            # list categories
   ```
3. Shortlist 2-4 candidates and read only their frontmatter plus Documentation section to compare
   (`sed -n '1,12p;/^## Documentation/,$p' <file>`). Read the full file for the one you pick.
   For `mwg/` files the frontmatter alone is enough (`sed -n '1,12p'`); their Documentation is the long tutorial.
4. Tell the user which resource you picked and why, with its `preview` URL so they can see it live.
   If several fit equally, ask; otherwise just pick.

## Integrate

Osmo and MWG resources are production-tested. Follow their own rules:

- Keep every `data-` attribute name. The JavaScript targets the DOM through them.
- Keep the animation approach (CSS, GSAP, or both); do not port GSAP to CSS or vice versa unless asked.
- Load exactly the scripts in "Dependencies (External Scripts)" before the resource JS
  (GSAP plugins must be registered; check the version pinned there against what the project already loads).
- Adapt class names, markup and styling to the project's stack (Tailwind, React, Vue, Astro, Blade...)
  but preserve the structural nesting the JS relies on. Move `init*()` calls into the project's
  lifecycle (`DOMContentLoaded`, a framework `onMount`, or a Barba `afterEnter` hook).
- Use "Webflow Custom CSS" only when the project is a Webflow site; ignore it otherwise.
- MWG effects are scoped under a `.mwg_effectNNN` root class and load no scripts themselves: load what
  "Dependencies" lists. Their `assets/medias/*` image paths are placeholders; swap in project images.
  Their demo CSS often sets `100vh` sections, `overflow: hidden` on body or a Lenis instance;
  drop what conflicts with the page it lands on (the Documentation explains each piece).
- Do not "improve" the resource logic unprompted. Wire it in, then adjust to the user's request.
