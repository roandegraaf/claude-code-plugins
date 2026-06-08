---
name: complete
description: Finalize a fully-implemented slide-workflow task. Use when the user says "/complete", "this task is done", "wrap up the task", or after /handoff reports the Definition of Done is met. Optionally takes a task slug. Re-verifies the OVERVIEW Definition of Done against the actual code, folds anything durable into CLAUDE.md, then archives the task's docs under docs/slides/_archive/<task-slug>/.
---

# Complete a Task

Final step of the **slide workflow** (`/brainstorm` → `/implement` → `/handoff` → … → **`/complete`**). Run this once, when the whole task is actually finished — not after a single slice.

## Resolve which task

Each task lives in its own folder: `docs/slides/<task-slug>/`.

- If the user passed a slug (`/complete user-auth`), use it.
- Otherwise: one active task folder → use it; several → **AskUserQuestion** to pick.

## Procedure

### 1. Re-verify the Definition of Done — don't take it on faith
Read `docs/slides/<task-slug>/OVERVIEW.md` and check **every** Definition-of-Done item against the **actual code on disk**, not against `PROGRESS.md`'s claims. A handoff can mark something done that regressed or was only half-built.

**If any item is unmet: STOP.** Report exactly what's missing and tell the user to run `/implement <task-slug>` to finish it (refresh `NEXT_SLIDE.md` with the gap if helpful). Do not finalize a task that isn't done.

### 2. Quality gate
- Run the project's tests / build / typecheck for what this task touched. Report results honestly — if something fails, surface it and stop here.
- For a substantial task, suggest the user run `/code-review` (and `/security-review` if it touched auth, data handling, or external input) before committing. Don't silently skip this for big changes.

### 3. Update project docs (CLAUDE.md)
Decide whether this task introduced anything a future session genuinely needs and can't trivially infer from the code:
- New commands (build/test/run/deploy), new top-level directories or modules, a new architectural pattern or convention, a non-obvious gotcha or constraint.

If so and a `CLAUDE.md` exists, update the **relevant section** concisely — additive edits, no duplication of what's obvious from code. If there are nested/area-specific `CLAUDE.md` files, update the closest one.

If no `CLAUDE.md` exists and the task clearly warrants one, suggest running `/init` rather than creating it unprompted. If nothing durable changed, say so and skip — don't manufacture doc churn.

### 4. Clean up the slide docs
- Delete the transient `docs/slides/<task-slug>/NEXT_SLIDE.md`.
- Archive the rest: move `docs/slides/<task-slug>/` → `docs/slides/_archive/<task-slug>/`, preserving `OVERVIEW.md` and `PROGRESS.md` as the historical record. Add a one-line "Completed" marker at the top of the archived `OVERVIEW.md`.
- If the user would rather delete the folder outright (no archive), do that instead — but only when they've said so. Default is archive.

This keeps `docs/slides/` showing only active tasks.

### 5. Report & suggest a commit
Summarize what you verified, any CLAUDE.md changes, and where the docs were archived. Then suggest a commit (don't commit unless the user asks):

> Task `<task-slug>` complete. Verified all Definition-of-Done items, updated `CLAUDE.md` (<what>), and archived docs to `docs/slides/_archive/<task-slug>/`.
> Suggested next step: review and commit. Want me to commit it?
