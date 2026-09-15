# Acceptance — dezzign-plugin

Everything buildable is built and verified. These three items need you.

## 1. Confirm `${CLAUDE_PLUGIN_ROOT}` resolves inside an install

Every targeted read in `SKILL.md` depends on this variable. If it is empty, each reference read
silently returns nothing and the flow degrades without an error.

1. Install the plugin from this marketplace:
   ```
   /plugin marketplace update roans-cc-plugins
   /plugin install dezzign@roans-cc-plugins
   ```
2. In a fresh session in any other repo, run:
   ```
   ! echo "$CLAUDE_PLUGIN_ROOT"
   ```
   or ask Claude to run the `grep '^#' "${CLAUDE_PLUGIN_ROOT}/skills/dezzign/references/stramien.md"`
   command from `SKILL.md`.
3. Expected: a path under `~/.claude/plugins/cache/roans-cc-plugins/dezzign/<version>/` and the
   full heading list of `stramien.md` (15 `##` topics, 60 `###` patterns).

## 2. Dry run `/dezzign <url>` on one real old client site

Pick a client whose current site you intend to redesign. Then, in a session with the Chrome
DevTools MCP, the `osmo` skill, the `design` skill and the remote `figma` MCP available:

```
/dezzign https://<old-client-site>
```

Follow the skill literally, do not work around it. Done when:

- the canvas holds a sitemap artboard, at least one fully designed page and at least one
  outline (wireframe-level) page;
- a Figma file exists (step 6 runs `/figma-generate-design`);
- the batched question offered three shortlisted directions plus the two remaining ones by name.

Note for the record (a short list is enough, in the PR description or a follow-up task):

- every place the skill's instructions were ambiguous, wrong or ignored, and the fix;
- whether the brief handed to the `design` skill produced house-looking output or needed tuning;
- whether Claude Design saving is enabled for this account (refine in-canvas versus export only).

Fixes go into `dezzign/skills/dezzign/SKILL.md`. Leave `references/` alone unless the run proves
a pattern wrong.

## 3. Sign off on the stramien

Read `dezzign/skills/dezzign/references/stramien.md` (57KB, 15 topics) and the five direction
docs in `references/styles/`. Confirm they match how ZekerZichtbaar actually designs. Two
clustering calls worth a deliberate look:

- `eckeveldkleding` sits in `flood-and-acid` with `mrcopilot` and `businessparksoest`, not with
  `ul` and `biltz` in `billboard-condensed`.
- `campaign-poster` is a single-source direction built on `gzw` alone. The doc carries a
  fold-or-firm-up instruction; decide whether it stays.

Your corrections outrank the measured evidence in those files. Once you have said yes, this task
is fully complete.
