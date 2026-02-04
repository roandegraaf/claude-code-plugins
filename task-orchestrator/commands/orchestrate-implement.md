---
name: orchestrate-implement
description: Implement a multi-step plan with verification and iteration
argument-hint: <plan-file.md> [--verify-ui] [--no-review]
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet, mcp__chrome-devtools__*
---

# Orchestrated Plan Implementation

Specialized `/orchestrate` command for implementing multi-step plans. Inherits core orchestration behavior (chunking, state management, verification) from `/orchestrate`.

Implement multi-step plans using parallel subagents where possible, with verification after each phase.

## Arguments

Parse from: `$ARGUMENTS`

- **plan-file**: Path to markdown file containing the implementation plan
- **--verify-ui**: Enable UI verification via chrome-devtools MCP (auto-enabled for frontend projects)
- **--no-review**: Skip code review after completion

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

## Phase 2: State Initialization

Create `.claude/orchestrator-state.json` following the schema in `/orchestrate` with:
- `task_type`: `"implement"`
- `plan_file`: path to the plan file
- `project_type`: detected project type
- `verify_ui`: whether UI verification is enabled
- `phases`: array grouping steps by dependency level

## Phase 3: Phased Execution

### 3.1 Phase Processing

Group steps into phases based on dependencies:
- **Phase 1**: All steps with no dependencies (run in parallel)
- **Phase 2**: Steps depending only on Phase 1 steps
- **Phase N**: Steps depending on Phase N-1 steps

### 3.2 Step Execution

For each step, launch a subagent:

```yaml
subagent_type: general-purpose  # or specialized based on step type
description: "Implement <step summary>"
prompt: |
  ## Implementation Task
  <step description from plan>

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

  If tests exist for this feature, ensure they pass.
  If no tests exist, note what should be tested.

  ## Completion
  Report:
  - Files created/modified
  - Key implementation decisions
  - Any deviations from plan (with justification)
  - Suggested tests if none exist
```

### 3.3 Phase Verification

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
