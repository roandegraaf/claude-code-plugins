---
name: handoff
description: Record what the current slice accomplished and write the prompt for the next slice (or declare the task complete). Use when the user says "/handoff", "wrap up this slice", or after finishing an /implement session. Run in the SAME session right after /implement, while context is fresh. Optionally takes a task slug. Appends docs/slides/<task-slug>/PROGRESS.md and writes NEXT_SLIDE.md — or, if the OVERVIEW's Definition of Done is met, declares the task done and writes no new slice.
---

# Hand Off to the Next Slice

Third step of the **slide workflow** (`/brainstorm` → `/implement` → **`/handoff`** → loop). Run this in the **same session as the `/implement` that just finished** — it has the freshest knowledge of what was built. The user then starts a **fresh session** for the next `/implement`.

## Resolve which task

Each task lives in its own folder: `docs/slides/<task-slug>/`.

- If the user passed a slug (`/handoff user-auth`), use it.
- Otherwise, prefer the task you just implemented in this session. If that's unclear, list the folders in `docs/slides/`: one → use it; several → **AskUserQuestion** to pick.

All paths below are inside `docs/slides/<task-slug>/`.

## File contract

- Read `docs/slides/<task-slug>/OVERVIEW.md` — the north star and Definition of Done.
- Append `docs/slides/<task-slug>/PROGRESS.md` — the running log of shipped slices (create it if missing).
- Write `docs/slides/<task-slug>/NEXT_SLIDE.md` — the standalone prompt for the next slice (overwrite the old one) **unless the task is complete**.

## Procedure

### 1. Figure out what just shipped
Prefer the freshest signal available, in this order:
1. The work done in this session (you were here for it).
2. `git diff` / `git status` and the actual code on disk — **the source of truth.** Rely on these especially if the implement session burned its context and conversation memory is thin.
3. The task's `PROGRESS.md` for prior context.

### 2. Append to `PROGRESS.md`
Add a concise entry — enough that a fresh session can understand the state without re-reading all the code:

```markdown
## Slice: <short title>
- Shipped: <what now works / what was added or changed>
- Key decisions: <anything a future slice must respect; "none" is fine>
- Notes / leftovers: <known gaps, deferred items, follow-ups>
```

### 3. Check against the Definition of Done
Compare the current state of the code to the **Definition of Done** in `OVERVIEW.md`, item by item.

**If every item is satisfied: STOP. Do not invent more work.** Don't write a new slice — tell the user the task looks done and to run **`/complete <task-slug>`** to verify, fold anything durable into `CLAUDE.md`, and archive the docs. Resisting the urge to manufacture another slice is the whole point of this step.

### 4. Otherwise, write the next `NEXT_SLIDE.md`
Pick the **single** most valuable next slice — small enough to ship with high quality in one fresh session. Don't plan several ahead; we re-assess each time. Overwrite the file with a standalone prompt (reference the task's real folder path):

```markdown
# Next slice — <task-slug>

Read `docs/slides/<task-slug>/OVERVIEW.md` (north star) and
`docs/slides/<task-slug>/PROGRESS.md` (what's already shipped) first.

## This slice
<One focused goal that fits a single session.>

## Scope boundaries
- Do: <what's in this slice>
- Don't: <what to defer; respect the OVERVIEW Non-goals>

## Done when
<Concrete, checkable outcome for THIS slice.>

When finished, run `/handoff`.
```

If the last slice surfaced new constraints or open questions that affect the whole task, also update the relevant section of `OVERVIEW.md` (keep it high level).

### 5. Report
State the paths you touched and the next step:

> Logged this slice to `docs/slides/<task-slug>/PROGRESS.md` and wrote the next slice to `docs/slides/<task-slug>/NEXT_SLIDE.md`.
> **Start a fresh session and run `/implement <task-slug>`.**

…or, if done:

> Definition of Done for `<task-slug>` is fully met — the task is complete. No new slice written.
