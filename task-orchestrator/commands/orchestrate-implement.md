---
name: orchestrate-implement
description: Implement a multi-step plan with verification, iteration, and optional agent team coordination
argument-hint: <plan-file.md> [--verify-ui] [--no-review] [--team] [--no-team]
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet, mcp__chrome-devtools__*, Teammate(*), SendMessage(*)
---

# Orchestrated Plan Implementation

Specialized `/orchestrate` command for implementing multi-step plans. Inherits core orchestration behavior (chunking, state management, verification) from `/orchestrate`.

Implement multi-step plans using parallel subagents where possible, with verification after each phase.

## Arguments

Parse from: `$ARGUMENTS`

- **plan-file**: Path to markdown file containing the implementation plan
- **--verify-ui**: Enable UI verification via chrome-devtools MCP (auto-enabled for frontend projects)
- **--no-review**: Skip code review after completion
- **--team**: Force agent team mode (requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`)
- **--no-team**: Force subagent mode (override auto-detection)

## Critical Constraints

**NEVER use `run_in_background: true`** - All subagents run in foreground.

**Respect dependencies** - Steps that depend on others must wait.

**Verify after each phase** - Tests and optional UI checks between phases.

## Phase 1: Plan Parsing

### 1.1 Read Plan File

```
Read: <plan-file>
```

### 1.2 Extract Steps

Parse the plan for implementation steps. Look for:
- Numbered lists (`1.`, `2.`, etc.)
- Headers with implementation details (`## Step 1`, `### Phase 1`)
- Checkboxes (`- [ ]` tasks)
- Code blocks with file paths

### 1.3 Identify Dependencies

Analyze each step for:
- **Explicit dependencies**: "After step 2...", "Requires X to be complete"
- **Implicit dependencies**: File creation before file modification
- **Parallel opportunities**: Independent steps that can run together

### 1.4 Detect Project Type

Check for:
- Frontend: `package.json` with React/Vue/Angular, `*.tsx`, `*.jsx`
- Backend API: Express, FastAPI, Django patterns
- Full-stack: Both frontend and backend markers
- CLI tool: Main entry point, argument parsing

Auto-enable `--verify-ui` for frontend projects.

## Phase 1.5: Execution Strategy Decision

Determine whether to use subagents or Agent Teams for this plan.

### Check Environment

```bash
echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS
```

If not set to `1` or `--no-team` flag is present, always use subagent mode. Skip to Phase 2.

### Auto-Detection Logic

**Prefer Agent Teams when:**
- Plan has frontend + backend steps (full-stack work)
- 3+ independent phases that can run in parallel
- Separate components/modules with distinct file ownership
- `--team` flag is present

**Prefer Subagents when:**
- Sequential plan where steps depend on each other
- Multiple steps edit the same files
- Refactoring or simplification tasks
- `--no-team` flag is present
- Fewer than 4 total steps

### Team Role Assignment

Based on plan analysis, assign roles:

| Plan Type | Teammates |
|-----------|-----------|
| Full-stack | `frontend-dev`, `backend-dev`, `test-writer` |
| Multi-module | `module-X-dev`, `module-Y-dev`, `integrator` |
| Multi-layer | `data-dev`, `logic-dev`, `presentation-dev` |
| Multi-component | `component-X-dev`, `component-Y-dev`, ... |

### File Ownership Mapping

1. Extract all files each plan step will create or modify
2. Map files to proposed teammate ownership
3. **Verify zero overlap** — no file may be owned by two teammates
4. If overlap detected:
   - Try reassigning steps to eliminate overlap
   - If overlap cannot be resolved, fall back to subagent mode
5. Document ownership boundaries clearly

Record the decision:
```json
{
  "execution_strategy": "team|subagent",
  "team_name": "orchestrator-<task_id>",
  "teammates": [
    {
      "name": "frontend-dev",
      "role": "Frontend development",
      "area": "src/components/, src/pages/",
      "status": "pending"
    }
  ]
}
```

## Phase 2: State Initialization

**MANDATORY: Create `.claude/orchestrator-state.json` BEFORE executing any steps.**

First, ensure the directory exists:
```bash
mkdir -p .claude
```

Then create the state file with this structure:

```json
{
  "task_id": "<uuid>",
  "task_type": "implement",
  "plan_file": "<path to plan file>",
  "project_type": "<frontend|backend|fullstack|cli>",
  "status": "executing",
  "created_at": "<ISO timestamp>",
  "verify_ui": false,
  "execution_strategy": "subagent",
  "team_name": null,
  "teammates": [],
  "phases": [
    {
      "id": "phase-1",
      "description": "<phase description>",
      "status": "pending",
      "steps": [
        {
          "id": "step-1",
          "description": "<step description>",
          "status": "pending",
          "files": ["<file paths>"],
          "depends_on": [],
          "attempts": 0,
          "max_attempts": 3
        }
      ]
    }
  ],
  "progress": {
    "total_steps": 0,
    "completed": 0,
    "failed": 0,
    "in_progress": 0
  },
  "verification": {
    "test_command": "<detected test command>",
    "tests_pass": null
  }
}
```

## Phase 3A: Phased Execution (Subagent Mode)

> Use this when `execution_strategy` is `"subagent"` (the default).

### 3.1 Phase Processing

Group steps into phases based on dependencies:
- **Phase 1**: All steps with no dependencies (run in parallel using task agents where possible)
- **Phase 2**: Steps depending only on Phase 1 steps (run in parallel using task agents where possible)
- **Phase N**: Steps depending on Phase N-1 steps (run in parallel using task agents where possible)

### 3.2 Parallel Batch Processing

**CRITICAL: You MUST use the Task tool to launch subagents in parallel.** For each phase:

1. Identify all independent steps in the phase
2. **Launch up to 20 subagents IN PARALLEL using multiple Task tool calls in a SINGLE message**
3. Wait for all subagents in the batch to complete
4. Update state with results
5. Run phase verification
6. Proceed to next phase

**Pre-step setup (for each step):**
```bash
git stash push -m "orchestrator-implement-step-<id>" -- <files to be modified>
```

### 3.3 Step Execution via Subagents

For EACH step, use the Task tool. **Launch all independent steps in parallel within a single message:**

```yaml
# EXAMPLE: If Phase 1 has 3 independent steps, send ONE message with THREE Task tool calls:

# Task 1:
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
  4. Include inline comments for complex logic
  5. Ensure TypeScript types are correct (if applicable)

  ## Testing
  After implementation, run: <test command>

  ## Completion
  Report:
  - Files created/modified
  - Key implementation decisions
  - Any deviations from plan (with justification)

# Task 2 (IN SAME MESSAGE):
subagent_type: general-purpose
description: "Implement <step-2 summary>"
prompt: |
  <same structure for step 2>

# Task 3 (IN SAME MESSAGE):
subagent_type: general-purpose
description: "Implement <step-3 summary>"
prompt: |
  <same structure for step 3>
```

**Subagent type:** Always use `general-purpose` for implementation tasks. It has access to all necessary tools for code implementation.

### 3.4 Progress Tracking

Create visible tasks to track progress:

```
TaskCreate: "Implement <plan summary>"
  └── TaskCreate: "Phase 1: <phase description>"
  └── TaskCreate: "Phase 2: <phase description>"
  ...
```

Update task status as each subagent completes.

### 3.5 Phase Verification

After each phase completes:

**Run Tests:**
```bash
<test command>
```

**UI Verification (if enabled):**

```yaml
# Start dev server if needed
Bash: npm run dev &

# Take snapshot of key pages
mcp__chrome-devtools__navigate_page: url=http://localhost:3000
mcp__chrome-devtools__take_snapshot
mcp__chrome-devtools__take_screenshot: filePath=.claude/screenshots/phase-<n>.png
```

Check for:
- No console errors
- Key elements present
- Expected visual state

**On Failure:**
1. Identify which step(s) caused failure
2. Rollback via stash if configured
3. Retry with more context about the failure
4. If retry fails, pause and report

## Phase 3B: Team Execution (Agent Team Mode)

> Use this when `execution_strategy` is `"team"`. Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.

### 3B.1 Team Setup

```yaml
Teammate:
  operation: spawnTeam
  team_name: "orchestrator-<task_id>"
  description: "Implement: <plan summary>"
```

### 3B.2 Convert Plan Steps to Shared Tasks

For each step in the plan, create a shared task:

```yaml
TaskCreate:
  subject: "<step description>"
  description: |
    ## Plan Step
    <full step content from plan>

    ## Files to Create/Modify
    <files within this teammate's ownership>

    ## Interface Contracts
    <any APIs, types, or integration points with other areas>

    ## Success Criteria
    <what defines completion>
  activeForm: "Implementing <step summary>"
```

Set up dependencies and assign owners:
```yaml
TaskUpdate:
  taskId: "<id>"
  owner: "<teammate-name>"
  addBlockedBy: ["<blocking-task-ids>"]
```

### 3B.3 Spawn Teammates

For each teammate defined in Phase 1.5:

```yaml
Task:
  subagent_type: general-purpose
  team_name: "orchestrator-<task_id>"
  name: "<teammate-name>"
  description: "<role> for plan implementation"
  prompt: |
    ## Your Role
    You are the <role> implementing part of a plan.

    ## Plan Context
    <relevant sections of the full plan>

    ## File Ownership
    You own and may ONLY modify these files/directories:
    <ownership list>

    Do NOT modify files outside your ownership.

    ## Your Tasks
    Check TaskList for tasks assigned to you (owner: "<your-name>").
    Work through them in dependency order:
    1. Use TaskUpdate to mark task as in_progress before starting
    2. Implement the task following the plan
    3. Run tests if applicable: <test command>
    4. Use TaskUpdate to mark task as completed when done

    ## Interface Contracts
    <detailed API contracts, shared types, expected inputs/outputs>

    ## Communication
    - If you need information from another area, SendMessage to the relevant teammate
    - Report blockers to the team lead immediately
    - Do not modify files outside your ownership — ask the owner instead
```

### 3B.4 Monitor and Coordinate

As team lead:
1. Watch for incoming messages from teammates
2. Track progress via `TaskList`
3. Handle integration points:
   - When teammate A completes an API that teammate B depends on, notify B
   - Resolve any interface mismatches
4. Handle blockers:
   - If a teammate is stuck, provide guidance or reassign
   - If file ownership conflicts arise, resolve immediately

### 3B.5 Phase Verification

Between phases (if using phased distribution):

**Run Tests:**
```bash
<test command>
```

**Type Check (if applicable):**
```bash
tsc --noEmit  # TypeScript
```

**UI Verification (if enabled):**
```yaml
mcp__chrome-devtools__navigate_page: url=<dev server URL>
mcp__chrome-devtools__take_snapshot
mcp__chrome-devtools__take_screenshot: filePath=.claude/screenshots/phase-<n>.png
```

### 3B.6 Graceful Shutdown

After all phases are complete:

```yaml
# For each teammate:
SendMessage:
  type: shutdown_request
  recipient: "<teammate-name>"
  content: "All tasks complete. Thank you for your work."

# Wait for all shutdown responses (approve)

# Clean up:
Teammate:
  operation: cleanup
```

Update state: clear teammates array, set team_name to null.

## Phase 4: Integration Verification

After all phases complete:

### 4.1 Full Test Suite

```bash
<test command> --coverage  # if available
```

### 4.2 UI Walkthrough (if frontend)

```yaml
# Navigate through key user flows
mcp__chrome-devtools__navigate_page: url=http://localhost:3000

# Test implemented features
<click through UI elements related to plan>

# Capture final state
mcp__chrome-devtools__take_screenshot: filePath=.claude/screenshots/final.png
```

### 4.3 Code Review

Unless `--no-review` specified:

```yaml
subagent_type: superpowers:code-reviewer
description: "Review implementation"
prompt: |
  Review the implementation of: <plan summary>

  ## Plan
  <full plan content>

  ## Files Changed
  <list of all modified files>

  ## Check For
  1. Plan compliance - does implementation match spec?
  2. Code quality - clean, maintainable, well-structured?
  3. Security - any vulnerabilities introduced?
  4. Performance - any obvious bottlenecks?
  5. Missing pieces - anything from plan not implemented?

  Provide detailed feedback with specific file:line references.
```

## Phase 5: Completion

### Success Output

```
## Implementation Complete

**Plan**: <plan-file>
**Steps**: <N> total, <N> completed
**Phases**: <M> phases executed

### Implementation Summary

#### Phase 1: <description>
- ✓ Step 1: <description>
- ✓ Step 2: <description>
- ✓ Step 3: <description>

#### Phase 2: <description>
- ✓ Step 4: <description>
- ✓ Step 5: <description>

### Verification Results
- Tests: ✓ All passing (<N> tests)
- UI: ✓ Verified (see screenshots in .claude/screenshots/)
- Review: ✓ Approved

### Files Changed
<list with brief descriptions>

### Notes
<any important implementation decisions or deviations>
```

### remove state file

```bash
rm .claude/orchestrator-state.json
```

### Partial Completion Output

```
## Implementation Incomplete

**Status**: <N> of <M> steps completed

### Completed Steps
<list>

### Failed Steps
- Step 5: <description>
  Error: <details>
  Attempted: <N> times

### Blocked Steps
- Step 6: Blocked by Step 5
- Step 7: Blocked by Step 5

### Recommended Actions
1. Review error in Step 5
2. Fix manually or adjust plan
3. Run `/orchestrate-implement <plan-file> --resume`
```

---

## Execution

**BEGIN IMPLEMENTATION FOR:** $ARGUMENTS
