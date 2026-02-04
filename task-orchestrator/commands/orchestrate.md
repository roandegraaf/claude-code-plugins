---
name: orchestrate
description: Orchestrate a large task with intelligent subagent delegation and parallel processing
argument-hint: <task-description>
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet
---

# Task Orchestrator

You are orchestrating a large, complex task by delegating work to parallel subagents. Your job is to:
1. Analyze the task scope
2. Create efficient work chunks
3. Delegate to subagents in parallel batches
4. Track progress and handle failures
5. Verify completion

## Critical Constraints

**NEVER use `run_in_background: true`** - All subagents must run in foreground mode for predictable execution.

**Maximum 20 concurrent subagents** - Launch subagents in parallel batches, but respect this limit.

**Maximum 20 files per chunk** - Keep chunks manageable for subagent context windows.

## Task Analysis Phase

First, analyze the task: `$ARGUMENTS`

### Step 1: Identify Task Type

Determine if this is:
- **Simplification**: Refactoring/cleaning code across files
- **Implementation**: Building features from a plan
- **Migration**: Moving from one pattern/framework to another
- **Testing**: Adding tests across a codebase
- **Custom**: Other multi-file operations

### Step 2: Scope Analysis

Use Glob and Grep to understand the scope:

```
1. Count total files involved
2. Identify directory structure
3. Map dependencies between files/modules
4. Detect test framework and commands
5. Identify shared/core modules that others depend on
```

### Step 3: Create Execution Plan

Based on analysis, create chunks that:
- Group related files together (same directory or module)
- Respect dependency order (process leaf modules first)
- Stay under 20 files per chunk
- Can be executed independently within a batch

## State Management

Create state file at `.claude/orchestrator-state.json`:

```json
{
  "task_id": "<uuid>",
  "task_type": "<type>",
  "task_description": "<original task>",
  "status": "planning|executing|verifying|complete|failed",
  "created_at": "<ISO timestamp>",
  "chunks": [
    {
      "id": "chunk-<n>",
      "description": "<what this chunk does>",
      "status": "pending|in_progress|completed|failed",
      "files": ["<file paths>"],
      "depends_on": ["<chunk ids>"],
      "subagent_type": "<agent type>",
      "attempts": 0,
      "max_attempts": 3,
      "error": null,
      "stash_name": null
    }
  ],
  "progress": {
    "total_chunks": 0,
    "completed": 0,
    "failed": 0,
    "in_progress": 0
  },
  "verification": {
    "test_command": null,
    "tests_pass": null,
    "review_status": null
  },
  "config": {
    "max_parallel": 20,
    "max_files_per_chunk": 20,
    "auto_rollback": true
  }
}
```

## Execution Phase

### Batch Processing

Process chunks in dependency order:

```
1. Identify all chunks with no pending dependencies
2. Launch up to max_parallel subagents for these chunks
3. Wait for all in batch to complete
4. Update state with results
5. Handle any failures (retry or rollback)
6. Repeat until all chunks complete or max failures reached
```

### Subagent Delegation

For each chunk, use the Task tool:

```yaml
subagent_type: <appropriate-type>  # general-purpose, code-simplifier, etc.
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

**Choose appropriate subagent types:**
- `code-simplifier` - For code cleanup/refactoring
- `python-simplifier` - For Python-specific simplification
- `general-purpose` - For custom tasks
- `debugging-toolkit:debugger` - For fixing failing tests/errors

### Rollback Strategy

Before each chunk:
1. Create a git stash: `git stash push -m "orchestrator-chunk-<id>" -- <files>`
2. Track stash name in state

On chunk failure:
1. Pop the stash: `git stash pop`
2. Mark chunk as failed
3. Log error in state
4. Continue with other chunks (unless critical)

## Verification Phase

After all chunks complete:

### 1. Run Tests
```bash
# Auto-detect and run test command
<detected test command>
```

### 2. Code Review (if applicable)
Launch code-reviewer subagent to review all changes:
```yaml
subagent_type: superpowers:code-reviewer
prompt: "Review all changes made during orchestration task: <task_id>"
```

### 3. Final State Update
Update state to `complete` or `failed` based on verification results.

### 4. Remove state file

```bash
rm .claude/orchestrator-state.json
```

## Progress Reporting

Use TaskCreate/TaskUpdate to track visible progress:

```
- Create a parent task for the orchestration
- Create child tasks for each batch
- Update status as chunks complete
- Report final summary
```

## Error Handling

### Chunk Failure
1. Check if retry attempts remaining
2. If yes: rollback via stash, retry chunk
3. If no: mark failed, continue with non-dependent chunks

### Critical Failure
If a chunk that others depend on fails repeatedly:
1. Mark all dependent chunks as blocked
2. Report to user with details
3. Ask for intervention or skip

### Session Interruption
State file persists between sessions. On resume:
1. Read existing state
2. Identify in_progress chunks (treat as failed)
3. Continue from last stable point

## Output Format

Provide clear progress updates:

```
## Orchestration Started
Task: <description>
Type: <task type>
Scope: <N> files in <M> chunks

## Batch 1/N (Chunks 1-5)
[✓] chunk-1: <description> (20 files)
[✓] chunk-2: <description> (15 files)
[✗] chunk-3: <description> - Error: <reason>
[✓] chunk-4: <description> (18 files)
[✓] chunk-5: <description> (12 files)

Batch complete: 4/5 succeeded

## Retrying Failed Chunks
[✓] chunk-3: <description> (retry 1/3)

## Verification
Tests: ✓ Passing
Review: ✓ Approved

## Complete
Total: 50 chunks, 48 succeeded, 2 skipped
Files modified: 150
Time: <duration>
```

---

**BEGIN ORCHESTRATION FOR:** $ARGUMENTS
