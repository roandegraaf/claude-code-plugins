# Recovery Patterns

## Table of Contents
- [Recovery Philosophy](#recovery-philosophy)
- [Git Stash Strategy](#git-stash-strategy)
- [Failure Types and Recovery](#failure-types-and-recovery)
- [Retry Strategy](#retry-strategy)
- [Dependency Failure Handling](#dependency-failure-handling)
- [Session Interruption Recovery](#session-interruption-recovery)
- [Catastrophic Failure Recovery](#catastrophic-failure-recovery)
- [Error Escalation](#error-escalation)

Patterns for recovering from failures during orchestration.

## Recovery Philosophy

1. **Fail fast, recover gracefully**: Detect failures early, but don't let one failure cascade
2. **Preserve progress**: Never lose completed work due to later failures
3. **Provide context**: When retrying, give the subagent information about what went wrong
4. **Know when to stop**: After max retries, escalate to human rather than loop forever

## Git Stash Strategy

### Pre-Chunk Stash

Before modifying any files in a chunk, create a stash point:

```bash
# Create named stash for this chunk
git stash push -m "orchestrator-chunk-<chunk-id>" -- <file1> <file2> ...
```

**Note**: This only stashes tracked files with changes. For new files, track separately.

### Rollback on Failure

When a chunk fails:

```bash
# Find the stash
STASH_INDEX=$(git stash list | grep "orchestrator-chunk-<chunk-id>" | cut -d: -f1)

# Apply the stash (restore original state)
git stash pop $STASH_INDEX

# If files were created (not in stash), remove them
rm <new-files-created-by-chunk>
```

### Clear on Success

When a chunk completes successfully:

```bash
# Drop the stash (no longer needed)
STASH_INDEX=$(git stash list | grep "orchestrator-chunk-<chunk-id>" | cut -d: -f1)
git stash drop $STASH_INDEX
```

### Stash Limitations

Be aware:
- Stash only covers tracked files
- New files must be tracked separately in state
- Untracked files in chunk must be deleted manually on rollback
- Stash can have conflicts if other chunks modified same files

## Failure Types and Recovery

### 1. Syntax Error

**Detection:**
```bash
python -m py_compile <file>  # Non-zero exit
node --check <file>          # Non-zero exit
```

**Recovery:**
```
1. Parse error message for line number and error type
2. Rollback chunk via stash
3. Retry with enhanced prompt:

   "Previous attempt failed with syntax error:
    File: <filename>
    Line: <line_number>
    Error: <error_message>

    Please fix this issue and ensure valid syntax."
```

### 2. Test Failure

**Detection:**
```bash
pytest <test_file>  # Non-zero exit, failure output
npm test           # Non-zero exit, failure output
```

**Recovery:**
```
1. Parse test output for:
   - Failing test name(s)
   - Assertion/error message
   - Relevant traceback
2. Identify affected chunk(s) from traceback files
3. Rollback affected chunk(s)
4. Retry with test context:

   "Previous attempt caused test failure:
    Test: <test_name>
    Error: <error_message>
    Traceback: <relevant_lines>

    Ensure your changes don't break this test.
    If the test expectations are wrong, note that but keep code compatible."
```

### 3. Type Error

**Detection:**
```bash
mypy <file>        # Non-zero exit
npx tsc --noEmit   # Non-zero exit
```

**Recovery:**
```
1. Parse type error for:
   - File and line
   - Expected vs actual type
   - Variable/function involved
2. Rollback chunk
3. Retry with type context:

   "Previous attempt had type error:
    File: <filename>:<line>
    Error: <type_error_message>

    Ensure proper type annotations and type safety."
```

### 4. Lint Error

**Detection:**
```bash
ruff check <files>  # Non-zero exit
eslint <files>      # Non-zero exit
```

**Recovery:**
```
1. Determine if lint error is:
   - Pre-existing (log and continue)
   - Introduced by this chunk (fix)
2. For introduced errors, rollback and retry with lint rules:

   "Previous attempt introduced lint violations:
    <list of violations>

    Please fix these issues:
    - <rule>: <description>"
```

### 5. Timeout

**Detection:**
Task tool doesn't return within timeout period.

**Recovery:**
```
1. Mark chunk as failed (don't retry automatically)
2. Consider:
   - Chunk too large? Split into smaller chunks
   - Task too complex? Simplify instructions
   - Infinite loop? Add constraints
3. Log for manual review
```

### 6. Subagent Error

**Detection:**
Subagent returns error or unexpected output.

**Recovery:**
```
1. Log full subagent output
2. Check for:
   - Tool permission issues
   - File not found errors
   - Resource exhaustion
3. Retry with clarified instructions or fixed environment
```

## Retry Strategy

### Exponential Backoff (Not Recommended for Orchestration)
Unlike network retries, orchestration retries don't benefit from waiting.

### Contextual Retry (Recommended)
Each retry adds more context about the failure:

```
Attempt 1: Original prompt
Attempt 2: Original + "Previous attempt failed because: <reason>"
Attempt 3: Original + "Attempts 1-2 failed. Issues: <all_issues>. Focus on: <specific_guidance>"
```

### Retry Limits

| Failure Type | Max Retries | Rationale |
|--------------|-------------|-----------|
| Syntax | 3 | Usually fixable with context |
| Test | 2 | May require human insight |
| Type | 3 | Type systems give clear errors |
| Lint | 2 | Rules are clear |
| Timeout | 1 | Likely structural issue |
| Unknown | 1 | Need investigation |

## Dependency Failure Handling

When a chunk fails that other chunks depend on:

```
Chunk 1 (no deps)     ✓ Complete
Chunk 2 (no deps)     ✗ Failed (max retries)
Chunk 3 (depends: 2)  ⊘ Blocked
Chunk 4 (depends: 2)  ⊘ Blocked
Chunk 5 (no deps)     ✓ Complete
```

**Strategy:**
1. Mark failed chunk as `max_retries_exceeded`
2. Mark dependent chunks as `blocked`
3. Continue with non-dependent chunks
4. Report blocked chunks at end with reason
5. Offer options:
   - Fix manually and resume
   - Skip blocked chunks
   - Abort entire orchestration

## Session Interruption Recovery

When orchestration is interrupted (Ctrl+C, crash, etc.):

### State Preservation
State file persists, containing:
- Which chunks completed
- Which chunks were in progress
- Stash names for rollback

### Recovery Steps

```python
def recover_from_interruption():
    state = read_state_file()

    # 1. Handle in-progress chunks (treat as failed)
    for chunk in state['chunks']:
        if chunk['status'] == 'in_progress':
            # Rollback via stash
            rollback_chunk(chunk)
            chunk['status'] = 'pending'
            chunk['attempts'] += 1

    # 2. Verify completed chunks still valid
    run_tests()

    # 3. Continue from last stable point
    resume_orchestration(state)
```

### Resume Command

```bash
/orchestrate <original-task> --resume
```

Or for presets:
```bash
/orchestrate-simplify <path> --resume
/orchestrate-implement <plan> --resume
```

## Catastrophic Failure Recovery

If everything goes wrong:

### Nuclear Option: Full Rollback

```bash
# Reset to state before orchestration
git checkout -- .
git clean -fd  # Remove untracked files

# Or if you have a commit/tag from before:
git reset --hard <commit-before-orchestration>
```

### Partial Salvage

If some chunks were good:
```bash
# Create branch with current state
git checkout -b orchestration-partial

# Reset main to before
git checkout main
git reset --hard <commit-before>

# Cherry-pick good changes
git cherry-pick <commits-from-good-chunks>
```

## Error Escalation

When to stop retrying and escalate to human:

1. Same error repeats after contextual retry
2. Error is ambiguous (could be code or test issue)
3. Multiple chunks fail in same area
4. Circular dependencies detected
5. Critical shared module fails

**Escalation Format:**
```
## Orchestration Paused - Human Review Required

### Issue
<description of what went wrong>

### Affected Chunks
- chunk-X: <files>
- chunk-Y: <files>

### Error Details
<relevant error messages>

### Options
1. Fix manually, then: /orchestrate --resume
2. Skip these chunks: /orchestrate --resume --skip=X,Y
3. Abort: /orchestrate --abort

### Context Files
- State: .claude/orchestrator-state.json
- Logs: .claude/orchestrator-logs/<timestamp>.log
```
