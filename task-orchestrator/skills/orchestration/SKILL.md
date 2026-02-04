---
name: orchestration
description: Knowledge base for task orchestration with subagent delegation
---

# Task Orchestration Skill

This skill provides knowledge for orchestrating large tasks using parallel subagent delegation.

## Core Principles

### 1. Divide and Conquer
Large tasks should be broken into independent chunks that can be processed in parallel. Each chunk should:
- Be self-contained (minimal dependencies on other chunks)
- Have clear success criteria
- Be recoverable on failure (via git stash)

### 2. Context Efficiency
Subagents have isolated context windows. The orchestrator should:
- Send only relevant information to each subagent
- Collect concise summaries from subagent results
- Maintain compact state, not full execution details

### 3. Graceful Degradation
Failures in one chunk should not block the entire orchestration:
- Retry failed chunks up to max attempts
- Continue with non-dependent chunks
- Report partial completion with clear next steps

## Chunking Strategies

See `references/chunking-strategies.md` for detailed patterns.

### Quick Reference

| Task Type | Chunk By | Order | Max Size |
|-----------|----------|-------|----------|
| Simplify | Directory | Leaf first | 20 files |
| Implement | Plan step | Dependency order | 1 step |
| Test | Test file | Any | 10 files |
| Migrate | Module | Leaf first | 15 files |

## Verification Patterns

See `references/verification-patterns.md` for detailed patterns.

### Quick Reference

| Check | When | Command |
|-------|------|---------|
| Unit tests | After each batch | `pytest`, `npm test` |
| Type check | After TypeScript changes | `tsc --noEmit` |
| Lint | After any code change | `eslint`, `ruff` |
| UI snapshot | After frontend changes | chrome-devtools MCP |
| Integration | After all chunks | Full test suite |

## Recovery Patterns

See `references/recovery-patterns.md` for detailed patterns.

### Quick Reference

| Failure | Recovery |
|---------|----------|
| Test failure | Rollback chunk, retry with test output context |
| Syntax error | Rollback chunk, retry with error message |
| Timeout | Mark failed, continue with others |
| Dependency fail | Block dependent chunks, report |

## Subagent Selection

Choose the right subagent type for each chunk:

| Task | Subagent Type | Notes |
|------|---------------|-------|
| Python simplification | `python-simplifier` | Python-specific patterns |
| General simplification | `code-simplifier` | Any language |
| Feature implementation | `general-purpose` | Flexible, follows instructions |
| Bug fixing | `debugging-toolkit:debugger` | Root cause analysis |
| Code review | `superpowers:code-reviewer` | Quality verification |
| Test writing | `codebase-cleanup:test-automator` | Test patterns |

## State Management

The orchestrator maintains state in `.claude/orchestrator-state.json`:

```json
{
  "task_id": "unique identifier",
  "task_type": "simplify|implement|custom",
  "status": "planning|executing|verifying|complete|failed",
  "chunks": [...],
  "progress": {...},
  "verification": {...}
}
```

### Status Transitions

```
planning -> executing -> verifying -> complete
    |           |            |
    v           v            v
  failed      failed       failed
```

### Chunk Lifecycle

```
pending -> in_progress -> completed
              |
              v
           failed -> (retry) -> in_progress
              |
              v
           max_retries -> blocked_dependents
```

## Best Practices

### DO
- Always create state file before starting
- Use git stash for rollback capability
- Run tests after each batch, not just at the end
- Provide clear error context when retrying
- Track progress visibly via TaskCreate/TaskUpdate

### DON'T
- Never use `run_in_background: true` for subagents
- Don't exceed 20 parallel subagents
- Don't skip verification steps
- Don't modify state file while subagents are running
- Don't assume previous chunk results - always verify

## Error Messages

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| "Chunk dependency not met" | Out of order execution | Check dependency graph |
| "Max retries exceeded" | Persistent failure | Manual intervention needed |
| "State file locked" | Concurrent modification | Wait or clear lock |
| "Subagent timeout" | Long-running task | Increase timeout or split chunk |
