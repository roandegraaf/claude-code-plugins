---
name: autopilot
description: Run the slice workflow autonomously — implement every remaining slice back-to-back without manual /clear and /implement between them. Use when the user says "/autopilot", "run the task autonomously", "auto-run the slices", or wants a task driven to completion unattended. Takes a task slug and an optional "review" mode that pauses after every slice for approval. Refreshes its own context after every slice and runs until the Definition of Done is met; stops only for a question only the user can answer or a real block. The manual /implement → /handoff loop still works unchanged.
argument-hint: "[task-slug] [review]"
---

# Autopilot — Autonomous Slice Loop

Drives a slice-workflow task (see `/brainstorm`) to completion on its own. Each slice runs in a **fresh subagent context** — that subagent is the autonomous equivalent of `/clear` + `/implement` + `/handoff` in one clean session. You (the orchestrator) stay thin: spawn a slice, react to its result, repeat.

This is the inverse of frugal: an unattended run spends tokens until the task is done. The non-progress guard is what stops a spinning run. Use the manual loop for tight cost control.

All real state lives on disk (`OVERVIEW.md` / `PROGRESS.md` / `NEXT_SLIDE.md` / `status/` + the code), so the orchestrator is **stateless between slices**: a fresh `/autopilot <task-slug>` resumes exactly where any previous run stopped. The context refresh below relies on that.

## Arguments & modes

`/autopilot <slug> [review]`. There is no iteration cap and no checkpoint stop: the run goes until the Definition of Done is met, a question only the user can answer, or a real block.

- **default** — run slices back-to-back, refreshing context after every slice, to the Definition of Done.
- **`review`** — after every slice's handoff, present a two-line summary plus `git diff --stat`, then **AskUserQuestion**: continue / adjust course (fold their note into `NEXT_SLIDE.md` before the next spawn) / stop.

Ignore anything else in the arguments (stray numbers, `unattended`).

**Flags the mod adds** (Claude Code ≥ 2.1.287, interactive session) — strip them before reading the arguments:
- **`auto-clear`** — the mod refreshes your context for you; use **Auto-clear** under Context refresh.
- **`resumed`** — you are a fresh orchestrator the mod started after a refresh. Skip the precondition reminders, the task-folder listing and the laptop note; go straight to the loop with one line: `Resuming <slug> at <next slice title>`.

On a first start (not `resumed`), remind the user once that on a laptop the machine sleeping kills a long run — suggest `caffeinate -dims` (macOS) in another terminal.

## Precondition — permission mode & git safety

Subagents **inherit this session's permission mode**; you cannot set it per spawn. So the run must START in the mode you want the workers to have: **auto mode** (`Shift+Tab`, or launch with `claude --permission-mode auto`) for an unattended run, `acceptEdits` at minimum. In `default`/manual mode every worker file edit prompts and the loop stalls on the first slice. Raise this once, and only if the session isn't already in one of those modes.

Two follow-ons, one line each, only when they apply:
- **Git.** Under auto mode the classifier will approve commits and pushes to this repo — but nothing in this workflow ever commits, pushes, or deploys on its own. Before the run, offer the hard guarantee: `"permissions": {"deny": ["Bash(git commit:*)", "Bash(git push:*)"]}` in `.claude/settings.local.json`. A boundary stated only in conversation is the soft version — compaction can drop it. Say in the same breath that those rules persist, so they should come back out when the run ends — otherwise `/complete`'s own commit suggestion is blocked too.
- **Shell commands.** Check the project allowlist (`.claude/settings.json` / `.claude/settings.local.json`): if the test/build commands are covered, say nothing. If not, warn once and point at `/fewer-permission-prompts` — auto mode falls back to prompting after 3 consecutive (or 20 total) classifier blocks, which is how an overnight run actually dies.

## Models — orchestrate on the strongest model, build on Opus

`slice-worker` declares `model: opus` in its frontmatter, so builders always run on Opus whatever the session model is. Everything that judges their work inherits the session model instead: you, the continuation legs, and `/complete`'s reviewer. Run the session on Fable and you get Fable orchestrating and verifying while Opus builds — the intended split. Don't pass `model:` on spawns; the frontmatter already does it, and `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` is the user's override if they want everything on one model.

## Resolve which task

`docs/slides/<task-slug>/`. Use the passed slug; else list `docs/slides/` ignoring `_archive/`: one active folder → use it; several → **AskUserQuestion** to pick. While listing, note in one line any OTHER task folder with no `PROGRESS.md` — scoped-but-never-started tasks rot silently; the user should know they exist.

## Starting mid-stream (preflight)

Autopilot can be launched at any point, including in the middle of a manual session. Before the loop, reconcile on-disk state so the fresh subagents resume correctly:

- **You were just implementing in THIS conversation (no `/clear`):** you hold the freshest knowledge of the in-flight slice. Do a **handoff now in your own context** — append the in-progress work to `PROGRESS.md` and write/refresh `NEXT_SLIDE.md` for whatever remains. This preflight is the ONLY time you write those files; once the loop starts, the workers own them.
- **Fresh orchestrator (started right after `/clear` or in a new session):** check `git status`. If there are uncommitted changes that aren't reflected in `PROGRESS.md`/`NEXT_SLIDE.md`, don't assume — let the first slice subagent reconcile from the working tree (its slice-worker instructions cover this).
- **Clean tree + fresh `NEXT_SLIDE.md`:** nothing to do — go straight to the loop.

## The loop (orchestrator — keep yourself thin)

Track `progressCount` = number of `## Slice:` entries in `docs/slides/<task-slug>/PROGRESS.md` (0 if absent). Then repeat until done:

1. **Spawn one slice subagent** using this plugin's **`ultrapowers:slice-worker`** agent type — its definition carries the full slice protocol. Name it `slice-N`, one at a time — this loop is serial by design. There is no foreground flag: in an interactive session the harness runs every subagent in the background, so after spawning, **end your turn and wait for the completion notification**. Never poll, and never predict or narrate a result you haven't received. The spawn prompt (template below) is the COMPLETE assignment — never follow up with a SendMessage repeating the task; SendMessage is only for delivering `needs_input` answers. If the agent type is unavailable, read `agents/slice-worker.md` in this plugin and inline its body into a default-agent prompt instead.
2. **Get its STATUS — message first, disk as truth.** The FIRST line of its final message should be `STATUS: <token>`. If the notification reports a failure (API error, cut off mid-response, turn cap — a `maxTurns` stop arrives as partial output) or the message has no valid token, read `docs/slides/<slug>/status/slice-N.md` — workers write it before finishing and **disk is authoritative**. Send at most ONE nudge (SendMessage resumes the same agent); never a nagging loop. When the plugin's mod is live, the notification arrives with an `ultrapowers: worker status file …` block: that IS the disk file, already read for you. Use it and skip both the read and the nudge.
   - **Normalize off-list tokens:** anything like "complete", "DONE", "finished", "implemented" means THIS SLICE finished — treat it as `more` unless you can verify the Definition of Done itself is met. Never finalize the task on a slice-level "done" claim alone.
   - **Trust the `VERIFIED:` evidence line** (commands + exit codes) — do not re-run builds or tests a worker already ran green. Stale IDE/language-server diagnostics (e.g. SourceKit) are not failures; exit codes are.
3. **Branch:**
   - `done` — the Definition of Done is met (open `[user-gated]` and not-verified items go to the acceptance checklist). Exit the loop → **Finalize**.
   - `more` — a slice shipped and the next `NEXT_SLIDE.md` is written. Log a one-line update, then go to **Context refresh** (in `review` mode: run the review gate first).
   - `deferred` — the slice hit a step automation can't finish (paid run, credentials, hardware, external approval). Record what the worker reported, tell the user in the one-liner, and go to **Context refresh** if independent work remains. When nothing remains except deferred/user-gated items, the automation is done → **Finalize** (the acceptance checklist picks these up).
   - `needs_input` — take its question + options, ask the user via **AskUserQuestion**, then **continue the SAME subagent via `SendMessage`** with the answer. Only if it can't be continued, re-spawn with the answer appended. Doesn't count toward the non-progress check.
   - `blocked` — verification failed and its one retry didn't fix it. **Stop the loop**, report the details, ask the user how to proceed. **Never commit, push, deploy, or destroy autonomously** — version control belongs to the user.
   - Worker failed (the notification names an API error, a cut-off, or the turn cap) with no STATUS on disk either — first check `status/slice-N.md` and `git status`: if the slice actually finished, count it and move on; don't redo shipped work. Otherwise **re-spawn once** (`slice-N-retry`) — state is on disk, a retry is safe. If the retry also fails, treat as `blocked`.
4. **Non-progress guard:** after a `more`, re-count `## Slice:` entries. If the count did **not** increase (or the same slice title repeats), the handoff is spinning — **stop and ask the user**; don't keep looping.
5. **Between slices, stream a one-liner** so the user can watch: `Slice N done: <title> → next: <next title>` (include any deferred/placeholder flags the worker raised).
6. **Honor runtime pause requests.** If the user says "pause" or "pause after slice N" mid-run, finish the in-flight slice through its handoff, then stop cleanly with resume instructions. Never abandon a slice mid-flight, and never ignore a pause.
**Only four things end a turn mid-run:** waiting on a spawned worker's notification, a context refresh, a question for the user, or `done`. Never end a turn on a stated intention ("I'll spawn slice 4 next") — spawn it. Never stop to ask "shall I continue?" — continuing is the default; only a decision that is genuinely the user's (a product choice, credentials, a destructive step) is a question.

**Stay at the project root:** never `cd` in your own shell; address task files as `docs/slides/<slug>/…`. A `cd` sticks for the rest of the session.

**Single-writer rule:** while the loop runs, the worker owns `PROGRESS.md` and `NEXT_SLIDE.md`. Never write them yourself between a spawn and its STATUS — concurrent handoff writes corrupt them (duplicate `## Slice:` sections are the telltale symptom).

## Notify the user when you stop or pause

Autopilot runs unattended, so the user may be away at exactly the moments that matter. Whenever the run pauses or ends — `needs_input` (send just before AskUserQuestion), `blocked`, or `done` — send a one-line push via the **PushNotification** tool if it's available (it may need loading via ToolSearch first): `autopilot <slug>: <state> — <one short clause>`. If the tool isn't available, skip this silently.

## Context refresh (after every slice)

Every finished slice (`more`, or `deferred` with work left) ends with a refresh, so you never orchestrate on a full context. It is lossless: everything you need is on disk. Never refresh mid-slice — the slice's handoff must be on disk first.

1. **Teardown:** make sure no spawned agents are left running — stop leftovers with TaskStop. Orphaned workers otherwise linger and send late notifications.
2. **Auto-clear (when `auto-clear` was in your arguments):** write the marker as your LAST action — `echo refresh > docs/slides/<slug>/status/refresh` — then say one line (`Slice N done: <title> → refreshing, next: <next title>`) and end your turn. The mod stops any leftover agents, runs `/clear`, and starts a fresh `/autopilot` with the same arguments. Do nothing else after writing the marker. Write it ONLY at this point — never on `needs_input`, `blocked`, `done`, or a pause, because the marker is what tells the mod the run should go on.
3. **No mod (`auto-clear` absent: `-p`, SDK, cloud, or you are a leg):** skip the marker and spawn the next slice right away. Once your context reaches ~30% (unless you are a leg), hand the rest of the run to a **continuation leg**: a `general-purpose` subagent named `leg-K` — no `model:`, it inherits yours — then end your turn and wait for its notification. Prompt:

> Invoke the `ultrapowers:autopilot` skill (via the Skill tool; if unavailable, read this plugin's `skills/autopilot/SKILL.md` and follow it) for task `<slug>` and act as its orchestrator with two overrides: (1) never spawn continuation legs yourself — after 5 slices, wrap up and return; (2) you cannot reach the user, so on `needs_input`, `blocked`, or any user decision, end immediately and return `STATUS: <state>` plus the question/details as your final message. Return a terse summary: slices completed, final state, next slice title.

   Branch on the leg's return: `done` → **Finalize**; returned after its 5 slices → spawn the next leg; `needs_input` → ask the user, then start a fresh leg with the answer appended to its prompt; `blocked` → stop and report. A leg's workers sit one nesting level deeper than yours (default limit 3, `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`); they can still fan out scouts.

Teardown (step 1) also applies on every stop or pause.

### Spawn prompt (reuse each iteration)

> You are `slice-N`. Task folder: `docs/slides/<task-slug>/`. Implement the current slice following your slice-worker instructions.

Append nothing else on a normal iteration. When continuing after `needs_input`, deliver the user's answer via **SendMessage** to the same agent; only if a fresh spawn is unavoidable, append the question and the user's answer to this prompt.

## Finalize

When the run reaches `done` (including "only deferred/user-gated/not-verified items remain"): tear down first (stop every spawned agent with TaskStop, so no late notification lands after the report), delete the transient `docs/slides/<slug>/status/` folder, then run the **`complete`** skill (`/complete <task-slug>`). It re-verifies the Definition of Done against the code, folds anything durable into `CLAUDE.md`, writes the acceptance checklist for any open user-gated items, and archives the docs. It will suggest a commit — do **not** auto-commit; leave that to the user.

## Report

On `done`, `/complete`'s report IS your report — don't add a second recap around it, and keep its **Your turn** block as the last thing on screen. On `blocked` or a pause: two or three lines — where it stopped, why, and how to resume (`/autopilot <slug>`, or `/implement`).
