---
name: orchestrate-status
description: Check the status of an ongoing or completed orchestration
argument-hint: [--verbose] [--task-id <id>]
allowed-tools: Read, Glob, Bash, TaskList
---

# Orchestration Status

Check the status of orchestration tasks.

## Arguments

Parse from: `$ARGUMENTS`

- **--verbose**: Show detailed chunk information
- **--task-id**: Check specific task (default: most recent)

## Status Check

### 1. Find State File

```
Read: .claude/orchestrator-state.json
```

If no state file exists:
```
No active orchestration found.

To start a new orchestration:
- /orchestrate <task-description>
- /orchestrate-simplify <path>
- /orchestrate-implement <plan-file>
```

### 2. Parse and Display Status

## Standard Output

```
## Orchestration Status

**Task ID**: <id>
**Type**: <simplify|implement|custom>
**Status**: <planning|executing|verifying|complete|failed>
**Started**: <timestamp>

### Progress
█████████░░░░░░░░░░░ 45% (9/20 chunks)

- Completed: 9
- In Progress: 2
- Failed: 1
- Pending: 8

### Current Activity
- chunk-10: Simplifying src/services/ (in progress)
- chunk-11: Simplifying src/api/ (in progress)

### Recent Failures
- chunk-7: src/utils/helpers.py
  Error: Test failure - test_helper_function
  Attempts: 2/3
  Status: Retrying

### Verification
- Test Command: pytest
- Last Run: ✓ Passing (45 tests)
```

## Verbose Output (--verbose)

```
## Orchestration Status (Verbose)

**Task ID**: <id>
**Type**: <type>
**Description**: <original task>
**Status**: <status>
**Started**: <timestamp>

### Configuration
- Max Parallel: 20
- Max Files/Chunk: 20
- Auto Rollback: Yes

### All Chunks

| ID | Status | Files | Directory | Attempts | Error |
|----|--------|-------|-----------|----------|-------|
| chunk-1 | ✓ complete | 15 | src/models/ | 1 | - |
| chunk-2 | ✓ complete | 18 | src/views/ | 1 | - |
| chunk-3 | ✓ complete | 12 | src/utils/ | 2 | Retry successful |
| chunk-4 | ⚠ failed | 20 | src/core/ | 3 | Max retries exceeded |
| chunk-5 | ◐ in_progress | 14 | src/api/ | 1 | - |
| chunk-6 | ○ pending | 16 | src/services/ | 0 | - |
| chunk-7 | ⊘ blocked | 10 | src/integrations/ | 0 | Blocked by chunk-4 |

### Dependency Graph
chunk-1 ─┬─> chunk-5 ──> chunk-7
chunk-2 ─┤
chunk-3 ─┘
chunk-4 ────────────────> chunk-7 (blocked)

### Stash Status
- orchestrator-chunk-5: Active (src/api/*)
- orchestrator-chunk-6: Active (src/services/*)

### Test History
| Time | Result | Duration | Failures |
|------|--------|----------|----------|
| 14:32 | ✓ Pass | 12.3s | 0 |
| 14:28 | ✗ Fail | 11.8s | 2 |
| 14:25 | ✓ Pass | 12.1s | 0 |

### Verification Status
- Tests: ✓ Passing
- Review: Pending
- UI Check: N/A
```

## Actions

Based on status, suggest next actions:

### If Executing
```
Orchestration in progress. Monitor with:
  /orchestrate-status --verbose

To pause (not implemented yet):
  Ctrl+C to interrupt
```

### If Failed
```
Orchestration has failures.

Failed chunks:
- chunk-4: <error details>

Options:
1. Fix issues manually, then: /orchestrate --resume
2. Skip failed chunks: /orchestrate --resume --skip-failed
3. Abort and rollback: /orchestrate --abort
```

### If Complete
```
Orchestration complete!

Summary:
- Total chunks: 20
- Succeeded: 19
- Skipped: 1

All changes verified. Consider:
1. Review changes: git diff HEAD~1
2. Commit: git commit -m "Orchestrated: <task>"
3. Clean up state: rm .claude/orchestrator-state.json
```

---

**CHECK STATUS FOR:** $ARGUMENTS
