---
name: orchestrate-implement
description: Implement a multi-step plan with verification, iteration, and optional agent team coordination
argument-hint: <plan-file.md> [--verify-ui] [--no-review] [--team] [--no-team]
allowed-tools: Agent, Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet, mcp__chrome-devtools__*, TeamCreate, TeamDelete, SendMessage(*)
---

# Orchestrated Plan Implementation

## Hard Rules

1. **You are an orchestrator. You MUST delegate ALL work to subagents via the Agent tool.**
2. **You MUST NOT write code, edit files, or implement anything yourself.**
3. **NEVER use `run_in_background: true`** — all subagents run in foreground.
4. **Always use `general-purpose` as the subagent_type.**
5. **Launch ALL independent steps in parallel in a SINGLE message.**

## Arguments

Parse from: `$ARGUMENTS`

- **plan-file**: Path to markdown file containing the implementation plan
- **--verify-ui**: Enable UI verification via chrome-devtools MCP (auto-enabled for frontend projects)
- **--no-review**: Skip code review after completion
- **--team**: Force team mode
- **--no-team**: Force subagent mode (default)

## Phase 1: Plan Parsing

### 1.1 Read Plan File

Read the plan file and extract implementation steps. Look for:
- Numbered lists (`1.`, `2.`, etc.)
- Headers with implementation details (`## Step 1`, `### Phase 1`)
- Checkboxes (`- [ ]` tasks)
- Code blocks with file paths

### 1.2 Identify Dependencies

Analyze each step for:
- **Explicit dependencies**: "After step 2...", "Requires X to be complete"
- **Implicit dependencies**: File creation before file modification
- **Parallel opportunities**: Independent steps that can run together

### 1.3 Detect Project Type

Check for frontend markers (`package.json` with React/Vue/Angular, `*.tsx`, `*.jsx`).
Auto-enable `--verify-ui` for frontend projects.

### 1.4 Detect Test Command

Auto-detect: `npm test`, `pytest`, `go test ./...`, `cargo test`, `make test`, etc.

## Phase 2: Execution Mode

- `--team` flag → Team Mode (Phase 3B)
- `--no-team` flag or no flag → Subagent Mode (Phase 3A)

## Phase 3A: Subagent Mode (default)

### Group Steps into Phases

- **Phase 1**: All steps with no dependencies (run in parallel)
- **Phase 2**: Steps depending only on Phase 1 steps (run in parallel)
- **Phase N**: Steps depending on Phase N-1 steps

### Execute Each Phase

For each phase, launch ALL independent steps in parallel using the **Agent tool**:

```
# Launch ALL independent steps in a SINGLE message:

Agent tool call 1:
  subagent_type: general-purpose
  description: "Implement <step-1 summary>"
  prompt: |
    ## Implementation Task
    <step-1 description from plan>

    ## Plan Context
    <relevant section from plan file>

    ## Files to Create/Modify
    <identified files>

    ## Requirements
    1. Follow the plan exactly
    2. Write clean, maintainable code
    3. Add appropriate error handling

    ## Testing
    After implementation, run: <test command>

    ## Completion
    Report: files created/modified, key decisions, any deviations from plan

Agent tool call 2 (IN SAME MESSAGE):
  subagent_type: general-purpose
  description: "Implement <step-2 summary>"
  prompt: |
    <same structure for step 2>
```

### Phase Verification

After each phase completes:

1. **Run tests**: `<test command>`
2. **UI verification** (if `--verify-ui`):
   ```
   mcp__chrome-devtools__navigate_page → take_snapshot → take_screenshot
   ```
3. **On failure**: Identify which step(s) broke, rollback via `git stash pop`, retry once with error context

### Progress Tracking

```
TaskCreate: "Implement <plan summary>"
  TaskCreate: "Phase 1: <description>"
  TaskCreate: "Phase 2: <description>"
  ...
```

Update task status as each subagent completes.

## Phase 3B: Team Mode (--team flag)

### 1. Create Team

```
TeamCreate:
  team_name: "implement-<short-id>"
  description: "Implement: <plan summary>"
```

### 2. Map File Ownership

1. Extract all files each plan step will create or modify
2. Map files to proposed teammate ownership
3. **Verify zero overlap** — no file may be owned by two teammates
4. If overlap cannot be resolved, fall back to subagent mode

### 3. Create Shared Tasks

Use `TaskCreate` for each step. Set owners and dependencies via `TaskUpdate`.

### 4. Spawn Teammates (max 5)

For each teammate, use the **Agent tool** with `team_name`:

```
Agent tool call:
  subagent_type: general-purpose
  team_name: "implement-<short-id>"
  name: "<teammate-name>"
  description: "<role> for plan implementation"
  prompt: |
    ## Your Role
    You are the <role> implementing part of a plan.

    ## Plan Context
    <relevant sections of the full plan>

    ## File Ownership
    You own and may ONLY modify:
    <ownership list>

    ## Your Tasks
    Check TaskList for tasks assigned to you.
    Work through them in dependency order:
    1. TaskUpdate to mark as in_progress
    2. Implement following the plan
    3. Run tests: <test command>
    4. TaskUpdate to mark as completed

    ## Interface Contracts
    <API contracts, shared types, expected inputs/outputs>

    ## Communication
    - SendMessage to teammates if you need information
    - Report blockers to team lead immediately
```

### 5. Monitor, Verify, Shutdown

- Monitor `TaskList` for progress
- Handle messages and resolve blockers
- After completion: run tests, fix integration issues
- `SendMessage shutdown_request` to each teammate, then `TeamDelete`

## Phase 4: Final Verification

After all phases/teammates complete:

1. **Full test suite**: `<test command>`
2. **UI walkthrough** (if frontend): Navigate key flows, capture screenshots
3. **Code review** (unless `--no-review`): Launch a `general-purpose` subagent to review all changes against the plan

## Phase 5: Completion

```
## Implementation Complete

**Plan**: <plan-file>
**Steps**: <N> total, <N> completed
**Phases**: <M> phases executed
**Mode**: <subagent|team>

### Implementation Summary
[phase-by-phase results]

### Verification Results
- Tests: <pass/fail>
- UI: <verified/skipped>
- Review: <approved/skipped>

### Files Changed
<list with brief descriptions>

### Notes
<any important decisions or deviations>
```

---

**BEGIN IMPLEMENTATION FOR:** $ARGUMENTS
