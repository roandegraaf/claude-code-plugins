---
name: ultrapilot
description: Run the slice workflow autonomously with parallel waves — a wave-planner subagent carves mutually independent slices (disjoint file scopes, frozen contracts), parallel slice-workers build them concurrently, and an integration gate verifies after every wave. Use when the user says "/ultrapilot", "run the slices in parallel", "parallel autopilot", or wants a task driven to completion faster than /autopilot without losing quality. Takes a task slug plus optional max-parallel and an optional "review" mode that pauses after each wave's gate. Refreshes its own context after every wave and runs until the Definition of Done is met; stops only for a question only the user can answer or a real block. Coupled work degrades gracefully to single-slice waves (= /autopilot behavior).
argument-hint: "[task-slug] [maxParallel] [review]"
---

# Ultrapilot — Parallel Wave Orchestrator

Drives a slice-workflow task (see `/brainstorm`) to completion like `/autopilot`, but in **waves**: each round a planner carves up to N mutually independent slices, parallel workers build them concurrently in fresh contexts, and the wave only counts once an integration gate passes. You (the orchestrator) stay thin and stateless between waves — all real state lives on disk (`OVERVIEW.md` / `PROGRESS.md` / `wave/` / `status/` + the code), so a fresh `/ultrapilot <slug>` resumes exactly where any previous run stopped.

Three hard rules protect quality — they are the contract, not suggestions:
1. **Disjoint file scopes.** Every wave slice lists exactly what it may touch; you mechanically check the scopes for overlap before spawning. Never two agents on one file (which is also why a shared working tree is safe — no worktrees, no merges).
2. **Frozen contracts.** Shared interfaces are settled BEFORE a wave (by a solo foundation slice if needed), never negotiated during one.
3. **Integration gate.** Workers verify only their own scope; the full build/typecheck/test suite runs once per wave, after it joins, before the next wave is planned.

When work is coupled the planner returns a wave of 1 — which is exactly `/autopilot`, so quality never falls below the serial baseline. Expect widths of 2–3 on real tasks (most features have a sequential spine); this buys wall-clock time, not miracles, and token spend multiplies with width. For tight cost control use `/autopilot` or the manual loop.

Layers: you → `wave-planner` + `slice-worker`s → their read-only scouts / chunk agents. That is exactly Claude Code's default subagent nesting limit of 3 (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`): the scouts can't spawn further, and don't need to. A continuation leg pushes workers one level deeper; they can still fan out scouts.

## Arguments & modes

`/ultrapilot <slug> [maxParallel] [review]`. `maxParallel` defaults to **3** (wave-width cap — keep it modest, quality first). There is no wave cap and no checkpoint stop: the run goes until the Definition of Done is met, a question only the user can answer, or a real block.

- **default** — run waves back-to-back, refreshing context after every passed gate, to the Definition of Done.
- **`review`** — after each wave's integration gate passes, present the wave summary (slices, titles, gate result, `git diff --stat`), then **AskUserQuestion**: continue / adjust course (pass the user's note to the next planner spawn) / stop.

Ignore anything else in the arguments (extra numbers, `unattended`).

**Flags the mod adds** (Claude Code ≥ 2.1.287, interactive session) — strip them before reading the arguments:
- **`auto-clear`** — the mod refreshes your context for you; use **Auto-clear** under Context refresh.
- **`resumed`** — you are a fresh orchestrator the mod started after a refresh. Skip the precondition reminders, the task-folder listing and the laptop note; go straight to the loop with one line: `Resuming <slug>, planning wave <N>`.

On a first start (not `resumed`), remind the user once that on a laptop the machine sleeping kills a long run — suggest `caffeinate -dims` (macOS) in another terminal.

## Precondition — permission mode & git safety

Subagents **inherit this session's permission mode**; you cannot set it per spawn. The run must START in the mode you want the workers to have: **auto mode** (`Shift+Tab`, or launch with `claude --permission-mode auto`) for an unattended run, `acceptEdits` at minimum. In `default`/manual mode every worker file edit prompts — and a parallel wave stalls on prompts from several workers at once. Raise this once, and only if the session isn't already in one of those modes.

Two follow-ons, one line each, only when they apply:
- **Git.** Under auto mode the classifier will approve commits and pushes to this repo — but nothing in this workflow ever commits, pushes, or deploys on its own. Before the run, offer the hard guarantee: `"permissions": {"deny": ["Bash(git commit:*)", "Bash(git push:*)"]}` in `.claude/settings.local.json`. A boundary stated only in conversation is the soft version — compaction can drop it. Say in the same breath that those rules persist, so they should come back out when the run ends — otherwise `/complete`'s own commit suggestion is blocked too.
- **Shell commands.** Check the project allowlist (`.claude/settings.json` / `.claude/settings.local.json`): if the test/build commands are covered, say nothing. If not, warn once and point at `/fewer-permission-prompts` — auto mode falls back to prompting after 3 consecutive (or 20 total) classifier blocks, and a wide wave burns through that budget fastest.

## Models — orchestrate on the strongest model, build on Opus

`slice-worker` and `wave-planner` declare `model: opus` in their frontmatter, so builders and planners always run on Opus whatever the session model is. Everything that judges their work inherits the session model instead: you, the continuation legs, `/complete`'s reviewer, and the integration-gate verifier below. Run the session on Fable and you get Fable orchestrating and verifying while Opus builds — the intended split. Don't pass `model:` on spawns; the frontmatter already does it, and `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` is the user's override if they want everything on one model.

## Resolve which task

`docs/slides/<task-slug>/`. Use the passed slug; else list `docs/slides/` ignoring `_archive/`: one active folder → use it; several → **AskUserQuestion** to pick. While listing, note in one line any OTHER task folder with no `PROGRESS.md` — scoped-but-never-started tasks rot silently.

## Preflight

- **You were just implementing in THIS conversation (no `/clear`):** you hold the freshest knowledge of the in-flight work. Do a handoff now in your own context — append it to `PROGRESS.md` — before starting the loop. This preflight is the only time you write those files outside the wave-join bookkeeping below.
- **Fresh orchestrator:** don't reconcile the working tree yourself — the wave-planner's instructions cover folding unlogged `git status`/`git diff` work into `PROGRESS.md`.
- **Stale `wave/` folder** (a previous run stopped mid-wave): leave it — the planner reads it for intent and supersedes it. Never assume those slices shipped; the planner verifies against the code.

## The loop (orchestrator — keep yourself thin)

Track `progressCount` = number of `## Slice:` entries in `PROGRESS.md` (0 if absent). Repeat until done:

1. **Plan the wave.** Spawn one **`ultrapowers:wave-planner`** subagent named `plan-<N>`, then end your turn and wait for its completion notification (there is no foreground flag — the harness runs every subagent in the background). Prompt template below — it is the complete assignment; SendMessage only ever delivers `needs_input` answers. Get its STATUS from the first line of its final message; if the notification reports a failure or the message has no valid token, read `docs/slides/<slug>/status/plan-<N>.md` — **disk is authoritative**; one nudge max (SendMessage resumes it). Branch:
   - `done` — Definition of Done is met (open `[user-gated]` items go to the acceptance checklist) → **Finalize**.
   - `wave` — slice files are in `wave/`, manifest returned → continue.
   - `needs_input` — relay via **AskUserQuestion**, then **SendMessage** the answer to the same planner; wait for its revised STATUS. Only if it can't be continued, re-spawn once with the question and answer appended.
   - Died with nothing on disk → re-spawn once (`plan-<N>-retry`); if that also fails, stop and report.
2. **Check the scopes yourself — mechanically.** The planner proposes; you dispose. Compare the manifest's file scopes pairwise: if any two could match the same file (when in doubt, they can), keep the lower-numbered slice and drop the other — delete its `wave/` file and log the drop in one line; the next planning round rediscovers that work with clean scopes. Also drop any slice whose scope reaches into `docs/slides/` (except `status/`) or outside the repo. Whatever survives is the wave; width 1 is fine.
3. **Spawn the wave — ALL workers in ONE message**, one **`ultrapowers:slice-worker`** Agent call per slice file, named `w<N>s<K>` — then end your turn. Spawn prompt template below — it invokes the worker's WAVE MODE rules and is the complete assignment. If the plugin agent types are unavailable, read this plugin's `agents/*.md` and inline their bodies into default-agent prompts instead.
4. **React to each completion notification as it arrives.** Spawning returns immediately; the harness re-invokes you as each worker finishes — don't poll, and NEVER assume or fabricate a pending worker's result. If a worker's notification carries no STATUS (failed, cut off, turn cap), read `docs/slides/<slug>/status/w<N>s<K>.md` before nudging (one nudge max — disk is authoritative). When the plugin's mod is live, the notification arrives with an `ultrapowers: worker status file …` block: that IS the disk file, already read for you, for planners and workers alike. Use it and skip the read and the nudge. Trust each worker's `VERIFIED:` line; don't re-run its targeted checks.
   - `shipped` — append its returned `## Slice:` entry to `PROGRESS.md` yourself (workers never write it in wave mode; you are the only writer, so entries stay serial). Stream a one-liner: `w<N>s<K> shipped: <title>`.
   - `deferred` — the slice hit a step automation can't finish (paid run, credentials, hardware, approval). Append its entry with the deferral noted, tell the user in the one-liner, and let siblings finish; deferred items flow to the acceptance checklist at Finalize.
   - `needs_input` — relay via **AskUserQuestion**, then **SendMessage** the answer to that worker; it resumes in the background while its siblings keep running. Only if it can't be continued, re-spawn it once with the question and answer appended.
   - `blocked` — note it, let running siblings finish (their work is independent and still valid), spawn nothing new; after the join, report and stop. **Never commit, push, deploy, or destroy autonomously.**
   - Died (API/connection error, `failed` idle) with nothing on disk — re-spawn once with the same slice file (`w<N>s<K>-retry`); but first check its status file and `git status` within its scope: if the work actually finished, log it and don't redo it. Second failure → treat as `blocked`.
5. **Join + integration gate.** When every wave worker is terminal: if any ended `blocked`, stop and report. Otherwise spawn ONE fresh `general-purpose` verifier subagent — no `model:`, so it inherits yours and the strongest model in the run does the judging; on Fable that is Fable checking Opus's work — then end your turn and wait for its notification. Prompt: *"Run the project's full verification — build, typecheck, complete test suite (find the commands in CLAUDE.md / package config). Fix nothing. Report pass/fail with failing output, tersely."*
   - **Pass** → delete `wave/`, update the `## Current state` header at the top of `PROGRESS.md` from this wave's Key decisions (you are the sole writer in wave mode), log `Wave <N> ✓ (<width> slices): <titles>`, then go to **Context refresh** (in `review` mode: run the review gate first).
   - **Fail** → have the verifier (or a re-run) execute just the failing portion once **in isolation** first: a failure that passes alone and on re-run is an inter-suite flake — log it in `PROGRESS.md` as flaky, don't spawn a fix worker, and treat the gate as passed with a flake warning. A real failure → write `wave/fix.md` yourself using the planner's slice template: File scope = the union of this wave's scopes, This slice = make the integration gate pass, the verifier's failing output pasted under Done when, Verify = exactly the commands that failed. Then spawn one fix-it `slice-worker` in wave mode on it (named `w<N>fix`) and re-run the verifier once. Still failing → stop and report as blocked with the output. Failures here usually live in the seams between slices — catching them is exactly what this gate is for.
6. **Non-progress guard.** Re-count `## Slice:` entries; if the count didn't grow this wave, or the planner re-proposes slice titles that already shipped, the loop is spinning — stop and ask the user.
7. **Honor runtime pause requests** ("pause", "pause after this wave"): finish the in-flight wave through its gate, then stop cleanly with resume instructions.
8. **Only four things end a turn mid-run:** waiting on spawned agents' notifications, a context refresh, a question for the user, or `done`. Never end a turn on a stated intention ("I'll plan wave 3 next") — do it. Never stop to ask "shall I continue?" — continuing is the default; only a decision that is genuinely the user's (a product choice, credentials, a destructive step) is a question.

## Notify the user when you stop or pause

On `needs_input` (send just before AskUserQuestion), `blocked`, or `done`, send a one-line push via the **PushNotification** tool if available (may need loading via ToolSearch): `ultrapilot <slug>: <state> — <one short clause>`. If unavailable, skip silently.

## Context refresh (after every passed gate)

Every wave that passes its integration gate ends with a refresh, so you never orchestrate on a full context. It is lossless: everything is on disk. Never refresh with workers in flight.

1. **Teardown:** make sure no spawned agents are left running — stop leftovers with TaskStop. Orphaned workers otherwise linger and send late notifications.
2. **Auto-clear (when `auto-clear` was in your arguments):** write the marker as your LAST action — `echo refresh > docs/slides/<slug>/status/refresh` — then say one line (`Wave <N> ✓ → refreshing`) and end your turn. The mod stops any leftover agents, runs `/clear`, and starts a fresh `/ultrapilot` with the same arguments. Do nothing else after writing the marker. Write it ONLY at this point — never on `needs_input`, `blocked`, `done`, or a pause, because the marker is what tells the mod the run should go on.
3. **No mod (`auto-clear` absent: `-p`, SDK, cloud, or you are a leg):** skip the marker and plan the next wave right away. Once your context reaches ~30% (unless you are a leg), hand the rest of the run to a **continuation leg**: a `general-purpose` subagent named `leg-K` — no `model:`, it inherits yours — then end your turn and wait for its notification. Prompt:
   > Invoke the `ultrapowers:ultrapilot` skill (via the Skill tool; if unavailable, read this plugin's `skills/ultrapilot/SKILL.md` and follow it) for task `<slug>` with maxParallel=`<maxParallel>` and act as its orchestrator with two overrides: (1) never spawn legs yourself — after 3 waves, wrap up (including the NEXT_SLIDE promotion below) and return; (2) you cannot reach the user, so on `needs_input`, `blocked`, or any user decision, end immediately and return `STATUS: <state>` plus the question/details. Return a terse summary: waves/slices completed, final state.
   Branch on the leg's return: `done` → **Finalize**; returned after its 3 waves → spawn the next leg; `needs_input` → ask the user, then a fresh leg with the answer appended; `blocked` → stop and report.

**On any stop or pause** (and when a leg wraps up): tear down as in step 1, and keep the workflow interoperable — if planned-but-unrun `wave/` slice files exist, promote the first to `NEXT_SLIDE.md`, stripping the wave-only parts (sibling notes, the targeted-only Verify caveat) so it reads as a normal solo slice, and delete the rest of `wave/`. The user can then continue with `/ultrapilot`, `/autopilot`, or a manual `/implement`.

## Spawn prompts (reuse each iteration)

Planner:
> You are `plan-<N>`. Task folder: `docs/slides/<task-slug>/`. maxParallel: <n>. Plan the next wave following your wave-planner instructions.

Worker (one per slice file):
> WAVE MODE. You are `w<N>s<K>`. Task folder: `docs/slides/<task-slug>/`. Your slice file: `docs/slides/<task-slug>/wave/<k>-<name>.md`. Implement ONLY that slice following your slice-worker instructions' wave-mode rules — hard file scope, targeted verify only, no PROGRESS/NEXT_SLIDE writes, `## Slice:` entry + STATUS in your final message and status file.

Append nothing else on a normal iteration; deliver `needs_input` answers via **SendMessage** to the same agent.

## Finalize

When the planner returns `done`: tear down first (stop every spawned agent with TaskStop, so no late notification lands after the report), delete any leftover `wave/` folder, stale `NEXT_SLIDE.md`, and the transient `status/` folder, then run the **`complete`** skill (`/complete <task-slug>`). It re-verifies the Definition of Done against the code, folds anything durable into `CLAUDE.md`, writes the acceptance checklist for open user-gated/deferred items, and archives the docs. It will suggest a commit — do **not** auto-commit.

## Report

On `done`, `/complete`'s report IS your report — add at most one line on waves run and any flakes logged, and keep its **Your turn** block as the last thing on screen. On `blocked` or a pause: two or three lines — where it stopped, why, and how to resume (`/ultrapilot <slug>`, or `/autopilot` / `/implement`).
