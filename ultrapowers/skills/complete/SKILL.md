---
name: complete
description: Finalize a fully-implemented slice-workflow task. Use when the user says "/complete", "this task is done", "wrap up the task", or after /handoff reports the Definition of Done is met. Optionally takes a task slug. Re-verifies the OVERVIEW Definition of Done against the actual code, folds anything durable into CLAUDE.md, then archives the task's docs under docs/slides/_archive/<task-slug>/ — writing an acceptance checklist for any items only the user can verify.
---

# Complete a Task

Final step of the **slice workflow** (`/brainstorm` → `/implement` → `/handoff` → … → **`/complete`**). Run this once, when the whole task is actually finished — not after a single slice.

## Resolve which task

Each task lives in its own folder: `docs/slides/<task-slug>/`.

- If the user passed a slug (`/complete user-auth`), use it.
- Otherwise list the folders in `docs/slides/`, ignoring `_archive/`: one active task folder → use it; several → **AskUserQuestion** to pick.
- If the slug exists only in `_archive/`: **short-circuit** — the task is already completed and archived; say so and stop. Don't re-verify from scratch.

## Procedure

### 1. Re-verify the Definition of Done — don't take it on faith
First reconcile the DoD text with reality: if decisions recorded in `PROGRESS.md` legitimately changed the goal mid-task (scope cut, requirement reversed), update the affected items with a one-line note — otherwise you verify against stale intent. Then read `docs/slides/<task-slug>/OVERVIEW.md` and check **every** Definition-of-Done item against the **actual code on disk**, not against `PROGRESS.md`'s claims. A handoff can mark something done that regressed or was only half-built. Tick each item you verify to `[x]` in `OVERVIEW.md` as you go — the archived file should carry the per-item record.

Split the items:
- **Automation-verifiable and unmet: STOP.** Report exactly what's missing and tell the user to run `/implement <task-slug>` to finish it (refresh `NEXT_SLIDE.md` with the gap if helpful). Do not finalize a task that isn't done.
- **`[user-gated]` items** (live deploys, hardware runs, paid live calls, sign-offs) and items workers reported as `deferred`: these do NOT block completion — they become the **acceptance checklist** in step 4. Leave them `[ ]`.

### 2. Quality gate
- Run the project's tests / build / typecheck for what this task touched. Report results honestly — if something fails, surface it and stop here.
- **Let a fresh context grade the work.** Whoever built this task — a slice worker, an autopilot loop, or you — is the wrong judge of it: the reasoning that produced the code also rationalizes it. Resolve the review range yourself first, don't leave it to the subagent: base = the commit just before this task's first commit, or `HEAD` if nothing was committed mid-task. Then spawn ONE reviewer subagent — no `model:` override, so it inherits the session model and the judge is at least as strong as the builder; wait for its completion notification — and give it `git diff <base>` plus the working tree, the OVERVIEW's Goal, and **only the automation-verifiable Definition-of-Done items** from step 1 — `[user-gated]` and deferred items are explicitly out of its scope, or it will dutifully report the user's own acceptance work as a gap and stall the task. Instruction, verbatim: *"Report only gaps that break correctness or leave one of the listed Definition-of-Done items unmet. Cite file:line. Style preferences, hypothetical edge cases, and 'this could be more robust' are not findings. If the work is sound, say so plainly."* As soon as its verdict is in, stop it with TaskStop — a reviewer left idle sends a late closing message that pushes your final report off screen. A reviewer told to find gaps will manufacture some — that narrow brief is what keeps this from becoming defensive-code churn. Fold genuine findings into the report; if one leaves a listed item unmet, treat it as step 1's unmet branch and stop.
- **Attempt a lightweight runtime smoke** where feasible: build and boot the app / hit the main route / run the binary once. Headless-green tasks have shipped unusable UIs before; a two-minute smoke catches that.
- Aggregate the task's open flags from `PROGRESS.md` — every `Runtime-unverified:` and `Placeholder choices:` line — and surface them prominently in the report. Anything still runtime-unverified after the smoke goes onto the acceptance checklist.
- For a substantial task, suggest the user run `/code-review` (and `/security-review` if it touched auth, data handling, or external input) before committing. Don't silently skip this for big changes.

### 3. Update project docs (CLAUDE.md)
Decide whether this task introduced anything a future session genuinely needs and can't trivially infer from the code:
- New commands (build/test/run/deploy), new top-level directories or modules, a new architectural pattern or convention, a non-obvious gotcha or constraint.

If so and a `CLAUDE.md` exists, update the **relevant section** concisely — additive edits, no duplication of what's obvious from code. Test every line you're about to add: *would removing it cause a future session to make a mistake?* If not, don't add it. A bloated `CLAUDE.md` gets ignored wholesale, which costs far more than the line you left out. If there are nested/area-specific `CLAUDE.md` files, update the closest one.

If no `CLAUDE.md` exists and the task clearly warrants one, suggest running `/init` rather than creating it unprompted. If nothing durable changed, say so and skip — don't manufacture doc churn.

### 4. Your turn — what only the user can check (only when user-gated/deferred items remain)
If step 1 or 2 left open `[user-gated]`, deferred, or runtime-unverified items, write them as one short numbered list, exactly in this shape:

```
## Your turn (3)

1. **Run the migrations** — `pnpm db:migrate` on production
   → finishes without errors; `/admin/health` shows schema 42
2. **Log in on a real iPhone** — open https://staging.example.com/login, sign in with Face ID
   → lands on Today, no QR code
3. **Live payment (costs €0.50)** — buy the cheapest plan with a real card
   → order shows "Paid" in /admin/orders within a minute
```

Rules: one item per thing to do, in the order to do them (deploys and migrations before the checks that need them). Each item is two lines: a bold short name plus the exact action (command in backticks, full URL, or the physical step), then `→` and what "working" looks like. Mention cost only for paid runs. No intro, no explanations, no "why", no sub-bullets — if an item needs more than two lines, split it.

The fence above only shows the shape: print the block as plain markdown, never inside a code fence (a fenced copy shows literal `**` and `##`). Save the same block as `docs/slides/<task-slug>/ACCEPTANCE.md` (it archives with the task as the record), and print it in your report (step 6).

### 5. Clean up the slice docs
- Delete the transient `docs/slides/<task-slug>/NEXT_SLIDE.md` and, if present, the transient `status/` folder (leftover autopilot scaffolding).
- Archive the rest: move `docs/slides/<task-slug>/` → `docs/slides/_archive/<task-slug>/`, preserving `OVERVIEW.md`, `PROGRESS.md`, and any `ACCEPTANCE.md` as the historical record. If `_archive/<task-slug>/` already exists from an earlier task, archive to `_archive/<task-slug>-2/` (increment as needed) instead of merging into it. Add a one-line marker at the top of the archived `OVERVIEW.md`: "Completed" — or "Completed (pending acceptance: N items, see ACCEPTANCE.md)".
- If the user would rather delete the folder outright (no archive), do that instead — but only when they've said so. Default is archive.

This keeps `docs/slides/` showing only active tasks — a task blocked on human acceptance archives WITH its checklist instead of lingering in limbo.

### 6. Report & suggest a commit
Keep it short — the user reads this in a terminal. In this order, nothing else:

1. One line: `<task-slug> is done and archived to docs/slides/_archive/<task-slug>/. Nothing is committed.`
2. At most four bullets, one line each: checks run and their result, reviewer verdict, `CLAUDE.md` changes (or none), placeholder/runtime-unverified flags worth knowing. Skip any bullet with nothing to say.
3. One line suggesting the commit (don't commit unless the user asks), plus `/code-review` for a substantial change.
4. The **Your turn** block from step 4, verbatim, as the very last thing — so it is what stays on screen. Omit it when nothing is left for the user.
