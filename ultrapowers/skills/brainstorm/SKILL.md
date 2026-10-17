---
name: brainstorm
description: Brainstorm a task with the user, then either implement it inline (small tasks) or scope it for the slice workflow (large tasks). Use when the user says "/brainstorm", "let's spin off a new task", "brainstorm a feature", or wants to think through a piece of work before implementing. Small one-session changes are built directly in the same session; large tasks get a per-task folder docs/slides/<task-slug>/ with OVERVIEW.md (the north star) and NEXT_SLIDE.md (the prompt to begin slice 1 in a fresh session).
---

# Brainstorm a Large Task

First step of the **slice workflow**: brainstorm → `/implement` → `/handoff` → `/implement` → … until done.

A "slice" is a chunk of work that comfortably fits in **one session** without burning context and degrading output quality. We do **not** plan all slices up front. We write a high-level overview that acts as a guardrail, then discover each next slice after the previous one ships. (The folder `docs/slides/` and file `NEXT_SLIDE.md` keep their historical names — don't rename them.)

## File contract — per-task folder

Every task gets its **own folder** so multiple tasks never collide:

```
docs/slides/<task-slug>/
  ├── OVERVIEW.md     (north star — you write this)
  ├── NEXT_SLIDE.md   (first slice prompt — you write this)
  └── PROGRESS.md     (created later by /handoff)
```

`<task-slug>` is a short kebab-case name derived from the task (e.g. `user-auth`, `csv-export`, `stripe-billing`). Create the folder if it doesn't exist. If a folder with that slug already exists — in `docs/slides/` **or** in `docs/slides/_archive/` — pick a more specific slug rather than overwriting or colliding with it.

## Procedure

### 1. Brainstorm — lightly

Take the user's seed idea (their message / arguments) and have a short back-and-forth. Propose an approach, surface a couple of real tradeoffs, and confirm direction. Keep it **high level** — this is scoping, not designing the implementation.

Look at the relevant code before asking anything factual — never ask the user for something you can verify yourself (the stack, what exists, how it's wired). Spend their attention on intent, scope and priorities.

Use the **AskUserQuestion** tool only when there is a genuine decision you can't reasonably default (scope boundary, tech choice, a fork that changes the whole shape). Batch related questions. Do **not** interrogate the user — "brainstorm a bit," then move on. If the direction is already clear, skip straight to writing.

If the idea has a visual dimension — a layout, a flow, a screen, a UI component — **automatically ask** whether to sketch it before moving on. Use the **AskUserQuestion** tool to offer the choice: one option to sketch it now with the **`visualize`** skill, one option to skip and keep brainstorming. Only invoke `visualize` if the user picks the sketch option. Never auto-launch it without that confirmation, and don't bother asking when the task has no visual angle (pure backend, refactors, config, etc.).

### 2. Gauge the size — small task or large?

Before scaffolding anything, judge whether the work needs the slice workflow at all:

- **Small** = comfortably fits one session: a focused change in a handful of files, no natural multi-slice decomposition, low risk of running out of context. Most fixes, tweaks, and single small features.
- **Large** = won't fit one session at good quality, or naturally breaks into sequential pieces.

Decide:
- **Clearly small →** take the **fast path** below. Don't create a slug, `OVERVIEW.md`, `NEXT_SLIDE.md`, or the `docs/slides/` folder — that overhead isn't worth it.
- **Clearly large →** continue with step 3 (the slice-scoping path).
- **Unsure →** ask the user with **AskUserQuestion**: "Just build it now in this session" vs "Scope it as a slice task." Respect their choice.

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

## Preconditions & external dependencies
Everything only the user can provide, discovered NOW instead of stalling an
autonomous run later: API keys, service accounts, OAuth/dashboard approvals,
paid tiers or spend approvals, hardware, third-party sign-offs. "None" is fine.

## Building blocks
The major areas/components involved — unordered. Not a step-by-step plan.

## Definition of Done
A short, CHECKABLE checklist of observable behavior. One checkbox line per
item with a short name, then an indented scenario line saying how to see it
work. This is what lets us STOP.
Tag items only a human can perform or verify (live deploy, hardware run, paid
live call, sign-off) with `[user-gated]` — automation treats those as
acceptance items for the user, not as blockers.
- [ ] Dark mode follows the OS on first load
  GIVEN a user who never picked a theme, WHEN they open the app on a dark-mode OS, THEN it renders dark
- [ ] Payments go through in production `[user-gated]`
  GIVEN the live deploy, WHEN buying the cheapest plan with a real card, THEN the order shows "Paid"

## Open questions
Anything still undecided (or "None").
```

The **Definition of Done** is the most important section. Make every item concrete and checkable — `/handoff` uses it to decide when the task is complete and to stop manufacturing new slices.

- **Behavior, not implementation.** If the code could change without anything a user or caller sees changing, it's not a DoD item ("uses a React context" is not; "the choice survives a reload" is). Implementation choices belong in Key decisions.
- **Every item gets a scenario** (`GIVEN … WHEN … THEN …` on the indented line). It's what a worker exercises live instead of trusting a green build, and what `/complete` turns into the user's acceptance steps. Cover the edge case the user cares about most, not just the happy path.
- Keep the checkbox line itself short — the run panel shows it as the next item.

If the Preconditions section is non-empty, surface it to the user as an upfront checklist during the brainstorm ("you'll need to have X, Y ready") — every credential discovered mid-run is a stall in an otherwise autonomous session.

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
Tick each box in this file as it's met — a resumed attempt picks up at the first open one.
- [ ] <concrete, checkable outcome for THIS slice, with how to verify it>
- [ ] ...

When finished, run `/handoff` to record progress and write the next slice.
```

Pick a first slice that establishes a foundation (scaffolding, data model, the thinnest end-to-end path) and is small enough to ship with high quality in one session.

### 6. Report

Tell the user the slug, the paths you wrote, and the exact next step:

> Task `<task-slug>` scoped. Wrote `docs/slides/<task-slug>/OVERVIEW.md` and `docs/slides/<task-slug>/NEXT_SLIDE.md`.
> Skim the Definition of Done before building: it holds what you said, so the useful catch is what's missing — the case you care about most should have its own scenario.
> **Start a fresh session** (`/clear`), then choose how to build it:
> - **`/implement <task-slug>`** — build the first slice, then `/handoff` and repeat manually (one slice per session, with a `/clear` in between). Maximum control.
> - **`/autopilot <task-slug>`** — run every remaining slice back-to-back autonomously to the Definition of Done, refreshing its own context after every slice and pausing only to ask you a question. Add **`review`** to approve each slice before the next starts.
> Tip: commit `OVERVIEW.md` (and later `PROGRESS.md`) — they're the durable record. `NEXT_SLIDE.md` is transient scaffolding.

If other task folders in `docs/slides/` are sitting scoped-but-unstarted (no `PROGRESS.md`), mention them in one line — they rot silently otherwise.
