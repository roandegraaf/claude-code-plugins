---
name: brainstorm
description: Brainstorm a task with the user, then either implement it inline (small tasks) or scope it for the slide workflow (large tasks). Use when the user says "/brainstorm", "let's spin off a new task", "brainstorm a feature", or wants to think through a piece of work before implementing. Small one-session changes are built directly in the same session; large tasks get a per-task folder docs/slides/<task-slug>/ with OVERVIEW.md (the north star) and NEXT_SLIDE.md (the prompt to begin slice 1 in a fresh session).
---

# Brainstorm a Large Task

First step of the **slide workflow**: brainstorm → `/implement` → `/handoff` → `/implement` → … until done.

A "slide" (slice) is a chunk of work that comfortably fits in **one session** without burning context and degrading output quality. We do **not** plan all slides up front. We write a high-level overview that acts as a guardrail, then discover each next slice after the previous one ships.

## File contract — per-task folder

Every task gets its **own folder** so multiple tasks never collide:

```
docs/slides/<task-slug>/
  ├── OVERVIEW.md     (north star — you write this)
  ├── NEXT_SLIDE.md   (first slice prompt — you write this)
  └── PROGRESS.md     (created later by /handoff)
```

`<task-slug>` is a short kebab-case name derived from the task (e.g. `user-auth`, `csv-export`, `stripe-billing`). Create the folder if it doesn't exist. If a folder with that slug already exists, pick a more specific slug rather than overwriting it.

## Procedure

### 1. Brainstorm — lightly

Take the user's seed idea (their message / arguments) and have a short back-and-forth. Propose an approach, surface a couple of real tradeoffs, and confirm direction. Keep it **high level** — this is scoping, not designing the implementation.

Use the **AskUserQuestion** tool only when there is a genuine decision you can't reasonably default (scope boundary, tech choice, a fork that changes the whole shape). Batch related questions. Do **not** interrogate the user — "brainstorm a bit," then move on. If the direction is already clear, skip straight to writing.

If the idea has a visual dimension — a layout, a flow, a screen, a UI component — **automatically ask** whether to sketch it before moving on. Use the **AskUserQuestion** tool to offer the choice: one option to sketch it now with the **`visualize`** skill, one option to skip and keep brainstorming. Only invoke `visualize` if the user picks the sketch option. Never auto-launch it without that confirmation, and don't bother asking when the task has no visual angle (pure backend, refactors, config, etc.).

### 2. Gauge the size — small task or large?

Before scaffolding anything, judge whether the work needs the slide workflow at all:

- **Small** = comfortably fits one session: a focused change in a handful of files, no natural multi-slice decomposition, low risk of running out of context. Most fixes, tweaks, and single small features.
- **Large** = won't fit one session at good quality, or naturally breaks into sequential pieces.

Decide:
- **Clearly small →** take the **fast path** below. Don't create a slug, `OVERVIEW.md`, `NEXT_SLIDE.md`, or the `docs/slides/` folder — that overhead isn't worth it.
- **Clearly large →** continue with step 3 (the slide-scoping path).
- **Unsure →** ask the user with **AskUserQuestion**: "Just build it now in this session" vs "Scope it as a slide task." Respect their choice.

#### Fast path (small tasks)
1. Briefly confirm: *"This is small enough to just do now — implement it directly?"* (Implementing is harder to undo than scoping, so get a yes first.)
2. On approval, implement it in **this** session: make the change, verify (tests/build/typecheck for what you touched), and report honestly.
3. Skip all slide docs. If, partway in, it turns out bigger than expected, stop and switch to the slide path — scope an `OVERVIEW.md` + first `NEXT_SLIDE.md` for the remainder instead of pushing a bloated session.

The steps below (3–5) are the **large-task path** only.

### 3. Pick the task slug

Derive a short, descriptive kebab-case slug from the task and tell the user what you chose (e.g. "I'll call this task `user-auth`"). All this task's files live under `docs/slides/<task-slug>/`.

### 4. Write `docs/slides/<task-slug>/OVERVIEW.md`

High-level guidance only — goals and guardrails, **not** a sequenced task list (slices emerge later). Use this structure:

```markdown
# <Project / Feature name>

## Goal
What we're building and why, in 2–4 sentences.

## Scope
Bullet list of what's in scope.

## Non-goals
Explicitly what we are NOT doing (this keeps slices from sprawling).

## Key decisions & constraints
Tech choices, patterns to follow, hard constraints, things already decided.

## Building blocks
The major areas/components involved — unordered. Not a step-by-step plan.

## Definition of Done
A short, CHECKABLE checklist. Each item must be verifiable by looking at the
code or running something — not a vague aspiration. This is what lets us STOP.
- [ ] ...
- [ ] ...

## Open questions
Anything still undecided (or "None").
```

The **Definition of Done** is the most important section. Make every item concrete and checkable — `/handoff` uses it to decide when the task is complete and to stop manufacturing new slices.

### 5. Write `docs/slides/<task-slug>/NEXT_SLIDE.md`

A **self-contained** prompt to start the first slice in a fresh session. It must work whether the user pastes it into a new session or runs `/implement` (which just reads and executes it). Reference the task's own folder by its real path. Template:

```markdown
# Next slice — <task-slug>

Read `docs/slides/<task-slug>/OVERVIEW.md` first — it's the north star and guardrail.
(`docs/slides/<task-slug>/PROGRESS.md` does not exist yet; this is the first slice.)

## This slice
<One focused goal that fits in a single session.>

## Scope boundaries
- Do: <what's in this slice>
- Don't: <what to defer to later slices>

## Done when
<Concrete, checkable outcome for THIS slice.>

When finished, run `/handoff` to record progress and write the next slice.
```

Pick a first slice that establishes a foundation (scaffolding, data model, the thinnest end-to-end path) and is small enough to ship with high quality in one session.

### 6. Report

Tell the user the slug, the paths you wrote, and the exact next step:

> Task `<task-slug>` scoped. Wrote `docs/slides/<task-slug>/OVERVIEW.md` and `docs/slides/<task-slug>/NEXT_SLIDE.md`.
> **Start a fresh session**, then choose how to build it:
> - **`/implement <task-slug>`** — build the first slice, then `/handoff` and repeat manually (one slice per session, with a `/clear` in between). Best when you want to review between slices.
> - **`/autopilot <task-slug>`** — run every remaining slice back-to-back autonomously to the Definition of Done, pausing only to ask you a question. Best when you want it driven to completion unattended.
> Tip: commit `OVERVIEW.md` (and later `PROGRESS.md`) — they're the durable record. `NEXT_SLIDE.md` is transient scaffolding.
