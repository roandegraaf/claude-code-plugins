---
name: ultrapilot
description: Run the slice workflow autonomously with parallel waves — a wave-planner subagent carves mutually independent slices (disjoint file scopes, frozen contracts), parallel slice-workers build them concurrently, and an integration gate verifies after every wave. Use when the user says "/ultrapilot", "run the slices in parallel", "parallel autopilot", or wants a task driven to completion faster than /autopilot without losing quality. Takes a task slug plus optional max-parallel, max-waves, and checkpoint interval. Coupled work degrades gracefully to single-slice waves (= /autopilot behavior).
---

# Ultrapilot — Parallel Wave Orchestrator

Drives a slice-workflow task (see `/brainstorm`) to completion like `/autopilot`, but in **waves**: each round a planner carves up to N mutually independent slices, parallel workers build them concurrently in fresh contexts, and the wave only counts once an integration gate passes. You (the orchestrator) stay thin and stateless between waves — all real state lives on disk (`OVERVIEW.md` / `PROGRESS.md` / `wave/` + the code), so a fresh `/ultrapilot <slug>` resumes exactly where any previous run stopped.

Three hard rules protect quality — they are the contract, not suggestions:
1. **Disjoint file scopes.** Every wave slice lists exactly what it may touch; you mechanically check the scopes for overlap before spawning. Never two agents on one file (which is also why a shared working tree is safe — no worktrees, no merges).
2. **Frozen contracts.** Shared interfaces are settled BEFORE a wave (by a solo foundation slice if needed), never negotiated during one.
3. **Integration gate.** Workers verify only their own scope; the full build/typecheck/test suite runs once per wave, after it joins, before the next wave is planned.

When work is coupled the planner returns a wave of 1 — which is exactly `/autopilot`, so quality never falls below the serial baseline. Expect widths of 2–3 on real tasks (most features have a sequential spine); this buys wall-clock time, not miracles, and token spend multiplies with width. For tight cost control use `/autopilot` or the manual loop.

Layers (3 deep — well inside Claude Code's depth-5 nesting limit): you → `wave-planner` + `slice-worker`s → their read-only scouts / chunk agents.

## Precondition — permission mode (state this to the user up front)
Subagents are spawned with `mode: "acceptEdits"` so file edits don't block, but **shell commands keep their safety rail** — and a parallel run can stall on prompts from several workers at once. For a truly unattended run the user should pre-authorize the project's test/build commands (project `.claude/settings.json` allowlist, or run `/fewer-permission-prompts` first). Tell the user this before a long run.

## Resolve which task
`docs/slides/<task-slug>/`. Use the passed slug (`/ultrapilot <slug> [maxParallel] [maxWaves] [checkpointEvery]`); else list `docs/slides/` ignoring `_archive/`: one active folder → use it; several → **AskUserQuestion** to pick. Defaults: `maxParallel` **3** (wave-width cap — keep it modest, quality first), `maxWaves` **10** (per-session cap), `checkpointEvery` **3** (waves before a context checkpoint).

## Preflight
- **You were just implementing in THIS conversation (no `/clear`):** you hold the freshest knowledge of the in-flight work. Do a handoff now in your own context — append it to `PROGRESS.md` — before starting the loop.
- **Fresh orchestrator:** don't reconcile the working tree yourself — the wave-planner's instructions cover folding unlogged `git status`/`git diff` work into `PROGRESS.md`.
- **Stale `wave/` folder** (a previous run stopped mid-wave): leave it — the planner reads it for intent and supersedes it. Never assume those slices shipped; the planner verifies against the code.

## The loop (orchestrator — keep yourself thin)

Track `progressCount` = number of `## Slice:` entries in `PROGRESS.md` (0 if absent). Repeat up to `maxWaves` times:

1. **Plan the wave.** Spawn one **`ultrapowers:wave-planner`** subagent synchronously (`run_in_background: false` — you branch on its result), `mode: "acceptEdits"`, named `plan-<N>`. Prompt template below. Branch on its STATUS:
   - `done` — Definition of Done is met → **Finalize**.
   - `wave` — slice files are in `wave/`, manifest returned → continue.
   - `needs_input` — relay via **AskUserQuestion**, then **SendMessage** the answer to the same planner; it resumes in the background, so its revised STATUS arrives as a completion notification — wait for it. Only if it can't be continued, re-spawn once with the question and answer appended to the prompt.
   - Died / no STATUS → re-spawn once (`plan-<N>-retry`); if that also fails, stop and report.
2. **Check the scopes yourself — mechanically.** The planner proposes; you dispose. Compare the manifest's file scopes pairwise: if any two could match the same file (when in doubt, they can), keep the lower-numbered slice and drop the other — delete its `wave/` file and log the drop in one line; the next planning round rediscovers that work with clean scopes. Also drop any slice whose scope reaches into `docs/slides/` or outside the repo. Whatever survives is the wave; width 1 is fine.
3. **Spawn the wave — ALL workers in ONE message**, one **`ultrapowers:slice-worker`** Agent call per slice file, in the background (the default), `mode: "acceptEdits"`, named `w<N>s<K>`. Spawn prompt template below — it invokes the worker's WAVE MODE rules. If the plugin agent types are unavailable, read this plugin's `agents/*.md` and inline their bodies into default-agent prompts instead.
4. **React to each completion notification as it arrives.** Spawning returns immediately; the harness re-invokes you as each worker finishes — don't poll, and NEVER assume or fabricate a pending worker's result:
   - `shipped` — append its returned `## Slice:` entry to `PROGRESS.md` yourself (workers never write it in wave mode; you are the only writer, so entries stay serial). Stream a one-liner: `w<N>s<K> shipped: <title>`.
   - `needs_input` — relay via **AskUserQuestion**, then **SendMessage** the answer to that worker; it resumes in the background while its siblings keep running. Only if it can't be continued, re-spawn it once with the question and answer appended to its spawn prompt. Doesn't count toward the non-progress check.
   - `blocked` — note it, let running siblings finish (their work is independent and still valid), spawn nothing new; after the join, report and stop. **Never commit, push, deploy, or destroy autonomously** — version control belongs to the user.
   - Died / no STATUS — re-spawn once with the same slice file (`w<N>s<K>-retry`): all state is on disk and wave-mode workers reconcile partial work inside their own scope, so a retry is safe. Second failure → treat as `blocked`.
5. **Join + integration gate.** When every wave worker is terminal: if any ended `blocked`, stop and report. Otherwise spawn ONE fresh verifier subagent synchronously: *"Run the project's full verification — build, typecheck, complete test suite (find the commands in CLAUDE.md / package config). Fix nothing. Report pass/fail with failing output, tersely."*
   - **Pass** → delete `wave/`, log `Wave <N> ✓ (<width> slices): <titles>`, continue.
   - **Fail** → write `wave/fix.md` yourself using the planner's slice template: File scope = the union of this wave's scopes, This slice = make the integration gate pass, the verifier's failing output pasted under Done when, Verify = exactly the commands that failed. Then spawn one fix-it `slice-worker` in wave mode on it (named `w<N>fix`) and re-run the verifier once. Still failing → stop and report as blocked with the output. Failures here usually live in the seams between slices — catching them is exactly what this gate is for.
6. **Non-progress guard.** Re-count `## Slice:` entries; if the count didn't grow this wave, or the planner re-proposes slice titles that already shipped, the loop is spinning — stop and ask the user.
7. **Context checkpoint** — only between waves, after a passed gate, never mid-wave: at ~**30% context used** (deliberately early — orchestrator quality degrades past that; don't wait for the harness's context warnings, they fire far too late) or after `checkpointEvery` waves this session → go to **Checkpoint**.

If `maxWaves` is hit before `done`: do the same `NEXT_SLIDE.md` promotion as a checkpoint (step 2 there), then stop and report what's left (point at `PROGRESS.md`).

## Notify the user when you stop or pause
Ultrapilot runs unattended, so the user may be away at exactly the moments that matter. On `needs_input` (send just before AskUserQuestion), `blocked`, a checkpoint, the wave cap, or `done`, send a one-line push via the **PushNotification** tool if available (may need loading via ToolSearch): `ultrapilot <slug>: <state> — <one short clause>`. If unavailable, skip silently; never let notification failures interrupt the run.

## Checkpoint (context refresh)
Everything is on disk, so refreshing is lossless:
1. Only checkpoint after a passed integration gate — never with workers in flight.
2. Keep the workflow interoperable: if planned-but-unrun `wave/` slice files exist, promote the first to `NEXT_SLIDE.md`, stripping the wave-only parts (sibling notes, the targeted-only Verify caveat) so it reads as a normal solo slice, and delete the rest of `wave/`. The user can then continue with `/ultrapilot`, `/autopilot`, or a manual `/implement` — all stay compatible.
3. Tell the user in two lines — waves/slices completed, what looks next, nothing is lost (it's all in `docs/slides/<slug>/`) — then: **Run `/clear`, then `/ultrapilot <slug>` to continue.** End your turn.

## Spawn prompts (reuse each iteration)

Planner:
> Task folder: `docs/slides/<task-slug>/`. maxParallel: <n>. Plan the next wave following your wave-planner instructions.

Worker (one per slice file):
> WAVE MODE. Task folder: `docs/slides/<task-slug>/`. Your slice file: `docs/slides/<task-slug>/wave/<k>-<name>.md`. Implement ONLY that slice following your slice-worker instructions' wave-mode rules — hard file scope, targeted verify only, no PROGRESS/NEXT_SLIDE writes, `## Slice:` entry + STATUS in your final message.

Append nothing else on a normal iteration; deliver `needs_input` answers via **SendMessage** to the same agent.

## Finalize
When the planner returns `done`: delete any leftover `wave/` folder and stale `NEXT_SLIDE.md`, then run the **`complete`** skill (`/complete <task-slug>`). It re-verifies the Definition of Done against the code, folds anything durable into `CLAUDE.md`, and archives the docs. It will suggest a commit — do **not** auto-commit.

## Report
Short recap: waves run and their widths, slices shipped, integration-gate results, where it stopped (done / cap / blocked / checkpoint), and how to resume (`/ultrapilot <slug>` — or `/autopilot` / `/implement`, which remain fully compatible).
