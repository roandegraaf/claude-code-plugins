---
name: autopilot
description: Run the slice workflow autonomously — implement every remaining slice back-to-back without manual /clear and /implement between them. Use when the user says "/autopilot", "run the task autonomously", "auto-run the slices", or wants a task driven to completion unattended. Takes a task slug and optional max-iterations. Pauses ONLY to ask the user a question; otherwise runs to the Definition of Done. The manual /implement → /handoff loop still works unchanged.
---

# Autopilot — Autonomous Slice Loop

Drives a slice-workflow task (see `/brainstorm`) to completion on its own. Each slice runs in a **fresh subagent context** — that subagent is the autonomous equivalent of `/clear` + `/implement` + `/handoff` in one clean session. You (the orchestrator) stay thin: spawn a slice, react to its result, repeat. Sibling: **`/ultrapilot`** runs this same loop with parallel waves of independent slices — faster on wide tasks, same guardrails; this serial loop remains the conservative default.

This is the inverse of frugal: an unattended multi-slice run can spend a lot of tokens. The iteration cap and the context checkpoint bound it. Use the manual loop for tight cost control.

Because each slice runs in a subagent, the orchestrator only accumulates terse summaries — but over a long task even that adds up. All real state lives on disk (`OVERVIEW.md` / `PROGRESS.md` / `NEXT_SLIDE.md` + the code), so the orchestrator is **stateless between slices**: it can stop any time and a fresh `/autopilot <task-slug>` resumes exactly where it left off. The context checkpoint below uses that.

## Precondition — permission mode (state this to the user up front)
Slice subagents are spawned with `mode: "acceptEdits"` so file edits don't block. But **shell commands keep their safety rail** — if the project's test/build commands would trigger permission prompts, the run will stall on them. For a truly unattended run, the user should pre-authorize those commands (project `.claude/settings.json` allowlist, or run `/fewer-permission-prompts` first). Tell the user this before a long run.

## Resolve which task
`docs/slides/<task-slug>/`. Use the passed slug (`/autopilot <slug> [max] [checkpointEvery]`); else list `docs/slides/` ignoring `_archive/`: one active folder → use it; several → **AskUserQuestion** to pick. `max` = per-session iteration cap (default **15**); `checkpointEvery` = slices before a context checkpoint (default **5**, see below).

## Starting mid-stream (preflight)
Autopilot can be launched at any point, including in the middle of a manual session. Before the loop, reconcile on-disk state so the fresh subagents resume correctly:

- **You were just implementing in THIS conversation (no `/clear`):** you hold the freshest knowledge of the in-flight slice. Do a **handoff now in your own context** — append the in-progress work to `PROGRESS.md` and write/refresh `NEXT_SLIDE.md` for whatever remains (finishing the current slice counts as the next slice). Then start the loop. Tip for the user: for a maximally fresh orchestrator they can instead run `/handoff` then `/clear` then `/autopilot <slug>` — but only in that order, so nothing in-flight is lost before it's on disk.
- **Fresh orchestrator (started right after `/clear` or in a new session):** check `git status`. If there are uncommitted changes that aren't reflected in `PROGRESS.md`/`NEXT_SLIDE.md`, don't assume — let the first slice subagent reconcile from the working tree (its slice-worker instructions already cover this), and if the intent is ambiguous it will return `needs_input`.
- **Clean tree + fresh `NEXT_SLIDE.md`:** nothing to do — go straight to the loop.

## The loop (orchestrator — keep yourself thin)

Track `progressCount` = number of `## Slice:` entries in `docs/slides/<task-slug>/PROGRESS.md` (0 if absent). Then repeat up to `max` times:

1. **Spawn one slice subagent** using this plugin's **`ultrapowers:slice-worker`** agent type — its definition carries the full slice protocol (implement → verify → handoff → `STATUS:` line), so the spawn prompt stays short (template below). Spawn it **synchronously** (`run_in_background: false`) — the loop branches on its result, so you must wait for it. Pass `mode: "acceptEdits"` (plugin agents can't set a permission mode themselves) and a name (`slice-1`, `slice-2`, …) so it stays addressable. If that agent type is unavailable, read `agents/slice-worker.md` in this plugin and inline its body into a default-agent prompt instead.
2. **Read its returned `STATUS:` line and branch:**
   - `done` — the Definition of Done is met. Exit the loop → go to **Finalize**.
   - `more` — a slice shipped and the next `NEXT_SLIDE.md` is written. Log a one-line update for the user, then continue.
   - `needs_input` — the subagent hit a real decision the docs don't cover. Take its question + options, ask the user via **AskUserQuestion**, then **continue the SAME subagent via `SendMessage` (by its name) with the answer** — its context and orientation stay intact. Only if it can't be continued, re-spawn with the answer appended. Neither counts toward the non-progress check. This is the only routine pause.
   - `blocked` — verification failed and its one retry didn't fix it (or an irreversible/outward action is required). **Stop the loop**, report the details, and ask the user how to proceed. **Never commit, push, deploy, or destroy autonomously** even in `acceptEdits` — autonomous commits invite conflicts; version control belongs to the user.
   - No `STATUS:` line, or the subagent died (API error, crash, turn cap) — **re-spawn it once** with the same prompt (name it `slice-N-retry`): all real state is on disk and its slice-worker instructions reconcile partial work from the working tree, so a retry is safe and loses nothing. If the retry also fails, treat as `blocked`: stop and report rather than guessing.
3. **Non-progress guard:** after a `more`, re-count `## Slice:` entries. If the count did **not** increase (or the same slice title repeats), the handoff is spinning — **stop and ask the user**; don't keep looping.
4. **Between slices, stream a one-liner** (`log`-style) so the user can watch: `Slice N done: <title> → next: <next title>`.
5. **Context checkpoint (after each `more`):** if your own context is getting heavy, stop cleanly and hand back for a refresh — the next `/autopilot <slug>` resumes from disk. Trigger a checkpoint when **either**: context usage reaches **~30% used** (deliberately early — orchestrator quality degrades past that; do NOT wait for the harness's context-low or auto-compact warnings, which fire far too late), **or** you've completed `checkpointEvery` slices this session (default **5** — a proxy, since you can't always read an exact %). On checkpoint, go to **Checkpoint** below instead of continuing.

If the cap is hit before `done`: stop and report what's left (point at `NEXT_SLIDE.md`).

## Notify the user when you stop or pause
Autopilot runs unattended, so the user may be away at exactly the moments that matter. Whenever the run pauses or ends — `needs_input` (send just before AskUserQuestion), `blocked`, a checkpoint, the iteration cap, or `done` — send a one-line push via the **PushNotification** tool if it's available (it may need loading via ToolSearch first): `autopilot <slug>: <state> — <one short clause>`. If the tool isn't available, skip this silently; never let notification failures interrupt the run.

## Checkpoint (context refresh)
The orchestrator holds nothing that isn't already on disk, so refreshing is safe and lossless. When a checkpoint triggers:
1. Make sure the in-flight slice fully finished its handoff (`PROGRESS.md` appended, `NEXT_SLIDE.md` written). Never checkpoint mid-slice.
2. Stop the loop and tell the user, in two lines:
   > Checkpoint — context is filling up. I've completed N slices; M look remaining (next: `<title>`). Nothing is lost; it's all in `docs/slides/<slug>/`.
   > **Run `/clear`, then `/autopilot <slug>` to continue** — or stop here and resume anytime.
3. End your turn. Do not continue until the user re-runs it in a fresh session.

`checkpointEvery` can be overridden (e.g. `/autopilot user-auth 15 8`). Keep it conservative — better to checkpoint early than to let orchestrator quality degrade.

### Spawn prompt (reuse each iteration)
> Task folder: `docs/slides/<task-slug>/`. Implement the current slice following your slice-worker instructions.

Append nothing else on a normal iteration. When continuing after `needs_input`, deliver the user's answer via **SendMessage** to the same agent; only if a fresh spawn is unavoidable, append the question and the user's answer to this prompt.

## Finalize
When a slice returns `done`, run the **`complete`** skill for the task (`/complete <task-slug>`): it re-verifies the Definition of Done against the code, folds anything durable into `CLAUDE.md`, and archives the docs. It will suggest a commit — do **not** auto-commit; leave that to the user.

## Report
Give the user a short recap: slices run, where it stopped (done / cap / blocked / question answered), CLAUDE.md changes, archive path, and the suggested commit. Note they can interrupt at any time (Esc) and resume later with `/implement` or another `/autopilot`.
