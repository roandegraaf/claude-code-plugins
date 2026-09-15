---
name: osmo
description: Find and integrate Osmo Supply (osmo.supply) resources - buttons, navigation menus, sliders, marquees, scroll/text/hover animations, cursors, loaders, page transitions, galleries, forms, visual effects and CSS/JS snippets. Use when the user says "/osmo", mentions Osmo, or is building a frontend piece (a menu, a slider, a hero animation, a preloader, a hover effect) where a production-ready GSAP/CSS resource would fit. "/osmo sync" refreshes the local library.
---

# Osmo Supply resources

A local markdown library of every Osmo Vault resource lives in `~/.osmo/library`
(override with `OSMO_LIBRARY_DIR`). `INDEX.md` is the catalog; one file per resource holds
its dependencies, HTML, CSS, JavaScript, Webflow custom CSS and documentation - the same
content as the "Copy context for AI" button in the Vault.

## Sync

Run when the user says `/osmo sync`, when `INDEX.md` is missing, or when a resource the user
mentions is not in the index (Osmo adds resources regularly):

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/sync.py"            # everything (~2 min, ~360 pages)
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/sync.py" slug ...   # refresh specific resources
```

Osmo is a paid membership product. Before the first sync (no `INDEX.md` yet), ask the user once
with AskUserQuestion to confirm they have an Osmo membership; stop if they don't. Never copy the
library into a repository.

## Find a fitting resource

1. Ensure the library exists: `test -f ~/.osmo/library/INDEX.md` — if missing, run the sync (see above, with the membership check).
2. Search the index, do not read all of it. Lines look like `- vault/<slug>.md | <Title> | <keywords>`
   grouped under `## <kind>: <category>` headings. Kinds: `vault` (components and animations),
   `snippet` (small CSS/JS/HTML/Webflow utilities; their code sits inside the Documentation section),
   `button` (the 100-button pack), `tutorial` (video-only, title and URL only).
   ```bash
   grep -i 'marquee\|infinite' ~/.osmo/library/INDEX.md          # by keyword or title
   sed -n '/^## vault: Navigation/,/^## /p' ~/.osmo/library/INDEX.md   # whole category
   grep '^## ' ~/.osmo/library/INDEX.md                            # list categories
   ```
3. Shortlist 2-4 candidates and read only their frontmatter plus Documentation section to compare
   (`sed -n '1,12p;/^## Documentation/,$p' <file>`). Read the full file for the one you pick.
4. Tell the user which resource you picked and why, with its `preview` URL so they can see it live.
   If several fit equally, ask; otherwise just pick.

## Integrate

Osmo resources are production-tested. Follow their own rules:

- Keep every `data-` attribute name. The JavaScript targets the DOM through them.
- Keep the animation approach (CSS, GSAP, or both); do not port GSAP to CSS or vice versa unless asked.
- Load exactly the scripts in "Dependencies (External Scripts)" before the resource JS
  (GSAP plugins must be registered; check the version pinned there against what the project already loads).
- Adapt class names, markup and styling to the project's stack (Tailwind, React, Vue, Astro, Blade...)
  but preserve the structural nesting the JS relies on. Move `init*()` calls into the project's
  lifecycle (`DOMContentLoaded`, a framework `onMount`, or a Barba `afterEnter` hook).
- Use "Webflow Custom CSS" only when the project is a Webflow site; ignore it otherwise.
- Do not "improve" the resource logic unprompted. Wire it in, then adjust to the user's request.
