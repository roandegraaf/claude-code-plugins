---
name: implement
description: Run in a fresh session to build the current slice of a slide-workflow task. Use when the user says "/implement", "implement the next slice", or "continue the task". Optionally takes a task slug. Reads docs/slides/<task-slug>/OVERVIEW.md, PROGRESS.md, and NEXT_SLIDE.md, then builds ONLY the slice described in NEXT_SLIDE.md. Ends by telling the user to run /handoff.
---

# Implement the Current Slice

Second step of the **slide workflow** (`/brainstorm` → **`/implement`** → `/handoff` → …). Run this in a **fresh session** so the slice gets full, high-quality context.

A "slice" is one session's worth of work. Your job is to build exactly the slice in `NEXT_SLIDE.md` — no more. The OVERVIEW is the guardrail that keeps you from sprawling.

## Resolve which task

Each task lives in its own folder: `docs/slides/<task-slug>/`.

- If the user passed a slug (`/implement user-auth`), use `docs/slides/user-auth/`.
- Otherwise list the folders in `docs/slides/`:
  - Exactly one task folder → use it.
  - Several → **AskUserQuestion** to let the user pick which task.
  - None → tell the user to run `/brainstorm` first, then stop.

Once resolved, all paths below are inside `docs/slides/<task-slug>/`.

## File contract (read first, in this order)

1. `docs/slides/<task-slug>/OVERVIEW.md` — the north star (goals, scope, non-goals, Definition of Done).
2. `docs/slides/<task-slug>/PROGRESS.md` — what previous slices already shipped (may not exist on the first slice).
3. `docs/slides/<task-slug>/NEXT_SLIDE.md` — the prompt for THIS slice.

If `NEXT_SLIDE.md` is missing for the task, stop and tell the user to run `/handoff` (mid-task) or `/brainstorm` (new task).

## Procedure

### 1. Load state
Read the three files above. Since this is a fresh session, those files plus the existing code are your **only** source of truth — read them before touching anything.

### 2. Orient
Explore just the parts of the codebase this slice touches. Don't review the whole repo.

### 3. Build the slice — and only the slice
- Stay inside the slice's scope boundaries. Respect the OVERVIEW's **Non-goals**.
- Follow the key decisions / patterns recorded in OVERVIEW.
- If you discover the slice is too big to finish well in one session, **stop and narrow it**: ship the coherent part, and note the remainder so `/handoff` can carve it into the next slice. Protecting output quality matters more than finishing the whole slice.
- If you hit a real decision the docs don't cover, use **AskUserQuestion** rather than guessing.

### 4. Verify
Run the relevant tests / build / typecheck for what you changed. Report results honestly — if something fails, say so with the output.

### 5. Hand off
Do **not** roll straight into the next slice. End by telling the user:

> Slice complete. Run **`/handoff <task-slug>`** (in this same session, while the context is fresh) to record progress and write the next slice.
