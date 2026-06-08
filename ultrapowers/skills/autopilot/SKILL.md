---
name: autopilot
description: Run the slide workflow autonomously — implement every remaining slice back-to-back without manual /clear and /implement between them. Use when the user says "/autopilot", "run the task autonomously", "auto-run the slices", or wants a task driven to completion unattended. Takes a task slug and optional max-iterations. Pauses ONLY to ask the user a question; otherwise runs to the Definition of Done. The manual /implement → /handoff loop still works unchanged.
---

# Autopilot — Autonomous Slice Loop

Drives a slide-workflow task (see `/brainstorm`) to completion on its own. Each slice runs in a **fresh subagent context** — that subagent is the autonomous equivalent of `/clear` + `/implement` + `/handoff` in one clean session. You (the orchestrator) stay thin: spawn a slice, react to its result, repeat.

This is the inverse of frugal: an unattended multi-slice run can spend a lot of tokens. The iteration cap and the context checkpoint bound it. Use the manual loop for tight cost control.

Because each slice runs in a subagent, the orchestrator only accumulates terse summaries — but over a long task even that adds up. All real state lives on disk (`OVERVIEW.md` / `PROGRESS.md` / `NEXT_SLIDE.md` + the code), so the orchestrator is **stateless between slices**: it can stop any time and a fresh `/autopilot <task-slug>` resumes exactly where it left off. The context checkpoint below uses that.

## Precondition — permission mode (state this to the user up front)
Slice subagents are spawned with `mode: "acceptEdits"` so file edits don't block. But **shell commands keep their safety rail** — if the project's test/build commands would trigger permission prompts, the run will stall on them. For a truly unattended run, the user should pre-authorize those commands (project `.claude/settings.json` allowlist, or run `/fewer-permission-prompts` first). Tell the user this before a long run.

## Resolve which task
`docs/slides/<task-slug>/`. Use the passed slug (`/autopilot <slug> [max] [checkpointEvery]`); else one active folder → use it; several → **AskUserQuestion** to pick. `max` = per-session iteration cap (default **15**); `checkpointEvery` = slices before a context checkpoint (default **5**, see below).

## Starting mid-stream (preflight)
Autopilot can be launched at any point, including in the middle of a manual session. Before the loop, reconcile on-disk state so the fresh subagents resume correctly:

- **You were just implementing in THIS conversation (no `/clear`):** you hold the freshest knowledge of the in-flight slice. Do a **handoff now in your own context** — append the in-progress work to `PROGRESS.md` and write/refresh `NEXT_SLIDE.md` for whatever remains (finishing the current slice counts as the next slice). Then start the loop. Tip for the user: for a maximally fresh orchestrator they can instead run `/handoff` then `/clear` then `/autopilot <slug>` — but only in that order, so nothing in-flight is lost before it's on disk.
- **Fresh orchestrator (started right after `/clear` or in a new session):** check `git status`. If there are uncommitted changes that aren't reflected in `PROGRESS.md`/`NEXT_SLIDE.md`, don't assume — let the first slice subagent reconcile from the working tree (its prompt already does this), and if the intent is ambiguous it will return `needs_input`.
- **Clean tree + fresh `NEXT_SLIDE.md`:** nothing to do — go straight to the loop.

## The loop (orchestrator — keep yourself thin)

Track `progressCount` = number of `## Slice:` entries in `docs/slides/<task-slug>/PROGRESS.md` (0 if absent). Then repeat up to `max` times:

1. **Spawn one slice subagent** (fresh context, `mode: "acceptEdits"`, default agent type) with the prompt below. It does implement → verify → handoff in its own clean session.
2. **Read its returned `STATUS:` line and branch:**
   - `done` — the Definition of Done is met. Exit the loop → go to **Finalize**.
   - `more` — a slice shipped and the next `NEXT_SLIDE.md` is written. Log a one-line update for the user, then continue.
   - `needs_input` — the subagent hit a real decision the docs don't cover. Take its question + options, ask the user via **AskUserQuestion**, then re-spawn the slice subagent with the answer appended (this re-spawn does NOT count toward the non-progress check). This is the only routine pause.
   - `blocked` — verification failed and its one retry didn't fix it (or an irreversible/outward action is required). **Stop the loop**, report the details, and ask the user how to proceed. Never push/deploy/destroy autonomously even in `acceptEdits`.
3. **Non-progress guard:** after a `more`, re-count `## Slice:` entries. If the count did **not** increase (or the same slice title repeats), the handoff is spinning — **stop and ask the user**; don't keep looping.
4. **Between slices, stream a one-liner** (`log`-style) so the user can watch: `Slice N done: <title> → next: <next title>`.
5. **Context checkpoint (after each `more`):** if your own context is getting heavy, stop cleanly and hand back for a refresh — the next `/autopilot <slug>` resumes from disk. Trigger a checkpoint when **either**: the harness shows context usage at/above ~30% (any context-low or auto-compact warning), **or** you've completed `checkpointEvery` slices this session (default **5** — a proxy, since you can't read an exact %). On checkpoint, go to **Checkpoint** below instead of continuing.

If the cap is hit before `done`: stop and report what's left (point at `NEXT_SLIDE.md`).

## Checkpoint (context refresh)
The orchestrator holds nothing that isn't already on disk, so refreshing is safe and lossless. When a checkpoint triggers:
1. Make sure the in-flight slice fully finished its handoff (`PROGRESS.md` appended, `NEXT_SLIDE.md` written). Never checkpoint mid-slice.
2. Stop the loop and tell the user, in two lines:
   > Checkpoint — context is filling up. I've completed N slices; M look remaining (next: `<title>`). Nothing is lost; it's all in `docs/slides/<slug>/`.
   > **Run `/clear`, then `/autopilot <slug>` to continue** — or stop here and resume anytime.
3. End your turn. Do not continue until the user re-runs it in a fresh session.

`checkpointEvery` can be overridden (e.g. `/autopilot user-auth 15 8`). Keep it conservative — better to checkpoint early than to let orchestrator quality degrade.

### Slice-subagent prompt (reuse each iteration)
> You are implementing ONE slice of an autonomous task in a fresh session. Task folder: `docs/slides/<task-slug>/`.
> 1. Read `OVERVIEW.md` (north star + Definition of Done), `PROGRESS.md` (what shipped), and `NEXT_SLIDE.md` (this slice). Then check the working-tree state (`git status`/`git diff`) — a previous attempt may have left partial work; resume cleanly, don't redo it.
> 2. First, compare the code to the Definition of Done. If every item is already met, do nothing and end with `STATUS: done`.
> 3. Otherwise build ONLY this slice, staying inside its scope and the OVERVIEW's Non-goals. If you hit a genuine decision the docs don't settle, or need an irreversible/outward action (push, deploy, delete, spend), STOP before deep work and end with `STATUS: needs_input` followed by the question and 2–4 concrete options.
> 4. Verify (tests/build/typecheck for what you touched). If it fails, fix and retry once. If still failing, end with `STATUS: blocked` and the error.
> 5. On success, do the handoff in this same session: append a `## Slice:` entry to `PROGRESS.md`, and either write the next `NEXT_SLIDE.md` (end with `STATUS: more`) or, if the Definition of Done is now fully met, end with `STATUS: done`.
> Keep your final message terse: the `STATUS:` line + 1–3 sentences of what shipped (or the question/error). Do not paste code or logs.

## Finalize
When a slice returns `done`, run the **`complete`** skill for the task (`/complete <task-slug>`): it re-verifies the Definition of Done against the code, folds anything durable into `CLAUDE.md`, and archives the docs. It will suggest a commit — do **not** auto-commit; leave that to the user.

## Report
Give the user a short recap: slices run, where it stopped (done / cap / blocked / question answered), CLAUDE.md changes, archive path, and the suggested commit. Note they can interrupt at any time (Esc) and resume later with `/implement` or another `/autopilot`.
