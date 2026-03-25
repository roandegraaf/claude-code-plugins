---
name: orchestrate-status
description: Check the status of an ongoing or completed orchestration
argument-hint: [--verbose]
allowed-tools: Read, Glob, Bash, TaskList
---

# Orchestration Status

Check the status of orchestration tasks using the shared task list.

## Arguments

Parse from: `$ARGUMENTS`

- **--verbose**: Show detailed task information

## Status Check

### 1. Read Task List

Use `TaskList` to get all orchestration tasks and their status.

If no tasks found:
```
No active orchestration found.

To start a new orchestration:
- /orchestrate <task-description>
- /orchestrate-simplify <path>
- /orchestrate-implement <plan-file>
```

### 2. Display Status

## Standard Output

```
## Orchestration Status

**Type**: <simplify|implement|custom>
**Status**: <executing|verifying|complete|failed>

### Progress
- Completed: <N>
- In Progress: <N>
- Failed: <N>
- Pending: <N>

### Current Activity
<list of in-progress tasks>

### Recent Failures
<list of failed tasks with error details>
```

## Verbose Output (--verbose)

```
## Orchestration Status (Verbose)

### All Tasks

| ID | Status | Description | Owner |
|----|--------|-------------|-------|
| 1 | complete | <description> | - |
| 2 | in_progress | <description> | - |
| 3 | pending | <description> | - |

### Verification
- Test Command: <detected>
- Last Run: <pass/fail>
```

## Team Mode Status

If tasks have owners assigned (indicating team mode):

```
### Agent Team Status

#### Teammates
| Name | Status | Tasks Done | Tasks Left |
|------|--------|------------|------------|
| frontend-dev | active | 3 | 1 |
| backend-dev | active | 2 | 2 |

Team mode active. Options:
- Send message to teammate: Use SendMessage tool
- Shutdown team: SendMessage shutdown_request to each teammate, then TeamDelete
```

## Suggested Actions

Based on status:

- **Executing**: "Orchestration in progress. Monitor with `/orchestrate-status --verbose`"
- **Failed**: "Failed tasks found. Fix issues and re-run, or skip failed tasks."
- **Complete**: "All tasks complete. Review changes with `git diff`."

---

**CHECK STATUS FOR:** $ARGUMENTS
