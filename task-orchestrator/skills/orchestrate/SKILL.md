---
name: orchestrate
description: Orchestrate a large task with intelligent subagent delegation, agent team coordination, and parallel processing
argument-hint: <task-description> [--team] [--no-team]
allowed-tools: Agent, Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet, TeamCreate, TeamDelete, SendMessage(*)
---

# Task Orchestrator

## Hard Rules

1. **You are an orchestrator. You MUST delegate ALL work to subagents via the Agent tool.**
2. **You MUST NOT write code, edit files, or implement anything yourself.**
3. **NEVER use `run_in_background: true`** — all subagents run in foreground.
4. **Always use `general-purpose` as the subagent_type.**
5. **Maximum 20 parallel subagents, maximum 20 files per chunk.**
6. **Launch ALL independent chunks in parallel in a SINGLE message.**

## Step 1: Parse Task and Flags

Parse from `$ARGUMENTS`:

- `--team` flag present → use **Team Mode** (Step 3B)
- `--no-team` flag present or no flag → use **Subagent Mode** (Step 3A)

## Step 2: Analyze Scope

Use Glob and Grep to understand the work:

1. Count total files involved
2. Identify directory structure and modules
3. Map dependencies between files/modules
4. Detect test framework and test command
5. Identify shared/core modules that others depend on

Create a chunk plan:
- Group related files together (same directory or module)
- Respect dependency order (process leaf modules first)
- Stay under 20 files per chunk
- Ensure chunks can be executed independently within a batch

For chunking strategies and recovery patterns, invoke the `task-orchestrator:orchestration` skill.

## Step 3A: Subagent Mode (default)

For each chunk, use the **Agent tool**:

```
Agent tool call:
  subagent_type: general-purpose
  description: "<3-5 word summary>"
  prompt: |
    ## Task
    <specific instructions for this chunk>

    ## Files to Process
    <list of files>

    ## Constraints
    - Only modify the listed files
    - Preserve all existing functionality
    - Run tests if available: <test command>
    - Report any issues encountered

    ## Completion Criteria
    <what defines success for this chunk>
```

### Parallel Execution

**CRITICAL: Launch ALL independent chunks in parallel using multiple Agent tool calls in a SINGLE message.**

1. Identify all chunks with no pending dependencies
2. Launch up to 20 subagents for these chunks using the Agent tool — all in one message
3. Wait for all in batch to complete
4. Track progress with TaskCreate/TaskUpdate
5. Run tests after each batch
6. Handle failures: retry once with error context, then skip
7. Repeat until all chunks complete

### Rollback Strategy

Before each chunk:
```bash
git stash push -m "orchestrator-chunk-<id>" -- <files>
```

On chunk failure: `git stash pop`, mark failed, continue with non-dependent chunks.

## Step 3B: Team Mode (--team flag)

### 1. Create Team

```
TeamCreate:
  team_name: "orchestrator-<short-task-id>"
  description: "<task description>"
```

### 2. Create Shared Task List

Use `TaskCreate` for each work item with:
- What to implement
- Which files to create/modify (within ownership boundaries)
- Interface contracts with other teammates
- Success criteria

Assign owners and dependencies via `TaskUpdate`:
```
TaskUpdate:
  taskId: "<task_id>"
  owner: "<teammate_name>"
  addBlockedBy: ["<blocking_task_id>"]
```

### 3. Spawn Teammates (max 5)

For each teammate, use the **Agent tool** with `team_name`:

```
Agent tool call:
  subagent_type: general-purpose
  team_name: "orchestrator-<short-task-id>"
  name: "<teammate-name>"
  description: "<3-5 word role summary>"
  prompt: |
    ## Your Role
    You are <role description> on a team.

    ## File Ownership
    You own and may ONLY modify:
    <list of files/directories>

    Do NOT modify any files outside your ownership.

    ## Your Tasks
    Check TaskList for tasks assigned to you (owner: "<your-name>").
    Work through them in order, marking each as in_progress then completed.

    ## Interface Contracts
    <any API contracts, type definitions, or integration points>

    ## Communication
    - Send messages to teammates via SendMessage if you need information
    - Report blockers to the team lead immediately
    - Mark tasks completed via TaskUpdate when done
```

**Critical rule: No two teammates may edit the same file.**

### 4. Monitor and Coordinate

As team lead:
- Monitor `TaskList` for progress and blocked tasks
- Handle incoming messages from teammates
- Resolve conflicts or blockers
- After all teammates complete: run tests, fix integration issues

### 5. Shutdown

```
SendMessage:
  type: shutdown_request
  recipient: "<teammate-name>"
  content: "All tasks complete. Shutting down."

# After all teammates confirm:
TeamDelete
```

## Step 4: Verify and Report

After all work completes:

1. Run detected test command
2. Print summary:

```
## Orchestration Complete

Task: <description>
Scope: <N> files in <M> chunks
Mode: <subagent|team>

### Results
[list of chunks/tasks with status]

### Verification
Tests: <pass/fail>

### Files Changed
<list>
```

---

**BEGIN ORCHESTRATION FOR:** $ARGUMENTS
