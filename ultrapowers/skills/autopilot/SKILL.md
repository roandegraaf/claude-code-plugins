---
name: autopilot
description: Run the slice workflow autonomously — implement every remaining slice back-to-back without manual /clear and /implement between them. Use when the user says "/autopilot", "run the task autonomously", "auto-run the slices", or wants a task driven to completion unattended. Takes a task slug, optional max-iterations/checkpoint interval, and an optional mode — "review" pauses after every slice for approval, "unattended" refreshes context automatically at checkpoints and runs to the Definition of Done. Pauses ONLY to ask the user a question; otherwise runs to the Definition of Done. The manual /implement → /handoff loop still works unchanged.
---

# Autopilot — Autonomous Slice Loop

Drives a slice-workflow task (see `/brainstorm`) to completion on its own. Each slice runs in a **fresh subagent context** — that subagent is the autonomous equivalent of `/clear` + `/implement` + `/handoff` in one clean session. You (the orchestrator) stay thin: spawn a slice, react to its result, repeat. Sibling: **`/ultrapilot`** runs this same loop with parallel waves of independent slices — faster on wide tasks, same guardrails; this serial loop remains the conservative default.

This is the inverse of frugal: an unattended multi-slice run can spend a lot of tokens. The iteration cap and the context checkpoint bound it. Use the manual loop for tight cost control.

Because each slice runs in a subagent, the orchestrator only accumulates terse summaries — but over a long task even that adds up. All real state lives on disk (`OVERVIEW.md` / `PROGRESS.md` / `NEXT_SLIDE.md` / `status/` + the code), so the orchestrator is **stateless between slices**: it can stop any time and a fresh `/autopilot <task-slug>` resumes exactly where it left off. The context checkpoint below uses that.

## Arguments & modes

`/autopilot <slug> [max] [checkpointEvery] [review|unattended]` — `max` = per-session iteration cap (default **15**); `checkpointEvery` = slices before a context checkpoint (default **5**).

- **default** — run slices back-to-back; a checkpoint ends the session and the user re-runs after `/clear`.
- **`review`** — the middle ground between fully autonomous and the manual loop: after every slice's handoff, present a two-line summary plus `git diff --stat`, then **AskUserQuestion**: continue / adjust course (fold their note into `NEXT_SLIDE.md` before the next spawn) / stop. Checkpoints still apply.
- **`unattended`** — never end the turn at a checkpoint; refresh context via **continuation legs** (see Checkpoint) and run to the Definition of Done, the cap, or a real block. Before starting, remind the user that on a laptop the machine sleeping kills an overnight run — suggest `caffeinate -dims` (macOS) in another terminal, or a cloud session.

## Precondition — permission mode

Slice subagents are spawned with `mode: "acceptEdits"` so file edits don't block, but **shell commands keep their safety rail**. First check the project allowlist (`.claude/settings.json` / `.claude/settings.local.json` permissions): if the project's test/build commands are already covered, say nothing — don't repeat a boilerplate warning every run. Only when they are NOT covered, warn once that permission prompts can stall an unattended run and point at `/fewer-permission-prompts` or the allowlist.

## Resolve which task

`docs/slides/<task-slug>/`. Use the passed slug; else list `docs/slides/` ignoring `_archive/`: one active folder → use it; several → **AskUserQuestion** to pick. While listing, note in one line any OTHER task folder with no `PROGRESS.md` — scoped-but-never-started tasks rot silently; the user should know they exist.

## Starting mid-stream (preflight)

Autopilot can be launched at any point, including in the middle of a manual session. Before the loop, reconcile on-disk state so the fresh subagents resume correctly:

- **You were just implementing in THIS conversation (no `/clear`):** you hold the freshest knowledge of the in-flight slice. Do a **handoff now in your own context** — append the in-progress work to `PROGRESS.md` and write/refresh `NEXT_SLIDE.md` for whatever remains. This preflight is the ONLY time you write those files; once the loop starts, the workers own them.
- **Fresh orchestrator (started right after `/clear` or in a new session):** check `git status`. If there are uncommitted changes that aren't reflected in `PROGRESS.md`/`NEXT_SLIDE.md`, don't assume — let the first slice subagent reconcile from the working tree (its slice-worker instructions cover this).
- **Clean tree + fresh `NEXT_SLIDE.md`:** nothing to do — go straight to the loop.

## The loop (orchestrator — keep yourself thin)

Track `progressCount` = number of `## Slice:` entries in `docs/slides/<task-slug>/PROGRESS.md` (0 if absent). Then repeat up to `max` times:

1. **Spawn one slice subagent** using this plugin's **`ultrapowers:slice-worker`** agent type — its definition carries the full slice protocol. Spawn it **synchronously** (`run_in_background: false`), `mode: "acceptEdits"`, named `slice-N`. The spawn prompt (template below) is the COMPLETE assignment — never follow up with a SendMessage repeating the task; SendMessage is only for delivering `needs_input` answers. If the agent type is unavailable, read `agents/slice-worker.md` in this plugin and inline its body into a default-agent prompt instead.
2. **Get its STATUS — message first, disk as truth.** The FIRST line of its final message should be `STATUS: <token>`. If the worker went idle silently, died, or returned no valid token, read `docs/slides/<slug>/status/slice-N.md` — workers write it before finishing and **disk is authoritative**. Send at most ONE nudge message; never a nagging loop.
   - **Normalize off-list tokens:** anything like "complete", "DONE", "finished", "implemented" means THIS SLICE finished — treat it as `more` unless you can verify the Definition of Done itself is met. Never finalize the task on a slice-level "done" claim alone.
   - **Trust the `VERIFIED:` evidence line** (commands + exit codes) — do not re-run builds or tests a worker already ran green. Stale IDE/language-server diagnostics (e.g. SourceKit) are not failures; exit codes are.
3. **Branch:**
   - `done` — the Definition of Done is met (open `[user-gated]` items go to the acceptance checklist). Exit the loop → **Finalize**.
   - `more` — a slice shipped and the next `NEXT_SLIDE.md` is written. Log a one-line update, then continue (in `review` mode: run the review gate first).
   - `deferred` — the slice hit a step automation can't finish (paid run, credentials, hardware, external approval). Record what the worker reported, tell the user in the one-liner, and continue if independent work remains. When nothing remains except deferred/user-gated items, the automation is done → **Finalize** (the acceptance checklist picks these up).
   - `needs_input` — take its question + options, ask the user via **AskUserQuestion**, then **continue the SAME subagent via `SendMessage`** with the answer. Only if it can't be continued, re-spawn with the answer appended. Doesn't count toward the non-progress check.
   - `blocked` — verification failed and its one retry didn't fix it. **Stop the loop**, report the details, ask the user how to proceed. **Never commit, push, deploy, or destroy autonomously** — version control belongs to the user.
   - Worker died (API/connection error, `failed` idle, crash, turn cap) with no STATUS on disk either — first check `status/slice-N.md` and `git status`: if the slice actually finished, count it and move on; don't redo shipped work. Otherwise **re-spawn once** (`slice-N-retry`) — state is on disk, a retry is safe. If the retry also fails, treat as `blocked`.
4. **Non-progress guard:** after a `more`, re-count `## Slice:` entries. If the count did **not** increase (or the same slice title repeats), the handoff is spinning — **stop and ask the user**; don't keep looping.
5. **Between slices, stream a one-liner** so the user can watch: `Slice N done: <title> → next: <next title>` (include any deferred/placeholder flags the worker raised).
6. **Honor runtime pause requests.** If the user says "pause" or "pause after slice N" mid-run, finish the in-flight slice through its handoff, then stop cleanly with resume instructions. Never abandon a slice mid-flight, and never ignore a pause.
7. **Context checkpoint (after each `more`):** trigger when **either** your context reaches **~30% used** (deliberately early — orchestrator quality degrades past that; do NOT wait for the harness's context-low or auto-compact warnings, which fire far too late), **or** you've completed `checkpointEvery` slices this session. Go to **Checkpoint**.

**Single-writer rule:** while the loop runs, the worker owns `PROGRESS.md` and `NEXT_SLIDE.md`. Never write them yourself between a spawn and its STATUS — concurrent handoff writes corrupt them (duplicate `## Slice:` sections are the telltale symptom).

If the cap is hit before `done`: stop and report what's left (point at `NEXT_SLIDE.md`).

## Notify the user when you stop or pause

Autopilot runs unattended, so the user may be away at exactly the moments that matter. Whenever the run pauses or ends — `needs_input` (send just before AskUserQuestion), `blocked`, a checkpoint, the iteration cap, or `done` — send a one-line push via the **PushNotification** tool if it's available (it may need loading via ToolSearch first): `autopilot <slug>: <state> — <one short clause>`. If the tool isn't available, skip this silently.

## Checkpoint (context refresh)

The orchestrator holds nothing that isn't already on disk, so refreshing is safe and lossless. Never checkpoint mid-slice — make sure the in-flight slice fully finished its handoff first.

**Default mode:** stop the loop and tell the user, in two lines:
> Checkpoint — context is filling up. I've completed N slices; M look remaining (next: `<title>`). Nothing is lost; it's all in `docs/slides/<slug>/`.
> **Run `/clear`, then `/autopilot <slug>` to continue** — or stop here and resume anytime.

Then end your turn. **If the user replies "continue" in-session instead: do NOT silently comply.** Explain in one line that continuing hot forfeits the context refresh and degrades quality, then offer: (a) continue via a fresh continuation leg (recommended — same mechanism as unattended mode), (b) stop for a true `/clear` restart, (c) continue in-session anyway — their call, on the record.

**Unattended mode:** don't end the turn. Spawn ONE **continuation leg**: a `general-purpose` subagent, synchronous, `mode: "acceptEdits"`, named `leg-K`, prompted:

> Invoke the `ultrapowers:autopilot` skill (via the Skill tool; if unavailable, read this plugin's `skills/autopilot/SKILL.md` and follow it) for task `<slug>` with max=`<checkpointEvery>`, default mode, and act as its orchestrator with two overrides: (1) never checkpoint-continue or spawn continuation legs yourself — your `max` IS your session budget; when you hit it or a checkpoint would fire, wrap up and return; (2) you cannot reach the user, so on `needs_input`, `blocked`, or any user decision, end immediately and return `STATUS: <state>` plus the question/details as your final message. Return a terse summary: slices completed, final state, next slice title.

Branch on the leg's return: `done` → **Finalize**; hit its budget → spawn the next leg (total slices across all legs stay bounded by `max`, tracked via `progressCount`); `needs_input` → ask the user, then start a fresh leg with the answer appended to its prompt; `blocked` → stop and report. Each leg is a fresh context and returns only a summary, so your own context stays thin — this honors the 30% rule without a human at the boundary.

**Teardown (every stop, pause, or checkpoint):** make sure no spawned agents are left running — stop leftovers with TaskStop. Orphaned workers otherwise linger for hours and have to be reaped by hand in later sessions.

### Spawn prompt (reuse each iteration)

> You are `slice-N`. Task folder: `docs/slides/<task-slug>/`. Implement the current slice following your slice-worker instructions.

Append nothing else on a normal iteration. When continuing after `needs_input`, deliver the user's answer via **SendMessage** to the same agent; only if a fresh spawn is unavoidable, append the question and the user's answer to this prompt.

## Finalize

When the run reaches `done` (including "only deferred/user-gated items remain"): delete the transient `docs/slides/<slug>/status/` folder, then run the **`complete`** skill (`/complete <task-slug>`). It re-verifies the Definition of Done against the code, folds anything durable into `CLAUDE.md`, writes the acceptance checklist for any open user-gated items, and archives the docs. It will suggest a commit — do **not** auto-commit; leave that to the user.

If during the run the remaining slices repeatedly looked mutually independent (disjoint file scopes), mention once in the report that `/ultrapilot <slug>` could have run them in parallel — useful for next time.

## Report

Give the user a short recap: slices run, where it stopped (done / cap / blocked / question answered), deferred items awaiting them, CLAUDE.md changes, archive path, and the suggested commit. Note they can interrupt at any time (Esc) and resume later with `/implement` or another `/autopilot`.
