---
name: orchestration
description: >
  Knowledge base for orchestrating large tasks using parallel subagent delegation with automatic
  chunking, verification, and recovery. Use when: (1) Dividing codebases into parallel work chunks,
  (2) Managing subagent delegation for simplification or implementation, (3) Implementing
  verification patterns with tests and linting, (4) Recovering from chunk failures with git stash
  rollback, (5) Tracking orchestration state and progress, (6) Handling dependency-ordered execution,
  (7) Resuming interrupted orchestrations, (8) Selecting appropriate subagent types for different tasks.
---

# Task Orchestration Skill

Orchestrate large tasks using parallel subagent delegation with automatic chunking, verification, and recovery.

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

## Agent Teams

> **Experimental**: Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` environment variable.

Agent Teams enable multiple agents to work together on complex tasks with inter-agent communication, shared task lists, and coordinated file ownership. Teams are more powerful than independent subagents but cost 3-5x more tokens.

See `references/agent-team-patterns.md` for detailed patterns.

### Decision Matrix: Teams vs Subagents

| Criteria | Subagents | Agent Teams |
|----------|-----------|-------------|
| Independent chunks | Best | Overkill |
| Cross-area coordination | Cannot | Designed for |
| Same-file edits | Safe (sequential) | Dangerous (conflicts) |
| Mechanical/repetitive | Best | Wasteful |
| 3+ distinct areas with interfaces | Awkward | Ideal |
| Token cost | 1x | 3-5x |
| Communication needed | None | Built-in |

### Quick Decision

```
Q1: Are there 4+ steps across 3+ distinct areas?
  NO  → Subagents (too few steps to justify team overhead)
  YES → Q2

Q2: Do areas need to communicate or share interfaces?
  NO  → Subagents
  YES → Q3

Q3: Can each area own separate files with zero overlap?
  NO  → Subagents (file conflict risk)
  YES → Q4

Q4: Is this a mechanical/repetitive task?
  YES → Subagents (teams add overhead with no benefit)
  NO  → Agent Teams
```

### Team Architecture

```
┌─────────────────────────────────────────────────┐
│                  Team Lead (You)                │
│         Coordinates, monitors, integrates        │
└──────────┬──────────┬──────────┬────────────────┘
           │          │          │
    ┌──────▼──┐ ┌─────▼───┐ ┌───▼─────────┐
    │Teammate │ │Teammate │ │ Teammate    │
    │   A     │ │   B     │ │    C        │
    │(area 1) │ │(area 2) │ │ (area 3)   │
    └────┬────┘ └────┬────┘ └──────┬──────┘
         │           │             │
    ┌────▼───────────▼─────────────▼──────┐
    │         Shared Task List            │
    │  (TaskCreate / TaskUpdate / TaskList)│
    └─────────────────────────────────────┘
```

Each teammate owns distinct files/directories. No two teammates may edit the same file.

### File Ownership Strategy

- **By directory**: Teammate A owns `src/frontend/`, Teammate B owns `src/backend/`
- **By file pattern**: Teammate A owns `*.component.tsx`, Teammate B owns `*.service.ts`
- **Shared file protocol**: If a shared file (e.g., types, config) needs changes, designate ONE teammate as owner or handle it in the integration phase after teammates complete

### Team Coordination Patterns

| Pattern | When | How |
|---------|------|-----|
| Parallel independent | Areas don't interact | Each teammate works independently, integrate after |
| Pipeline with handoff | Sequential dependency | Teammate A completes → Teammate B starts |
| Hub and spoke | Lead coordinates | Lead delegates, collects results, integrates |

### Team Lifecycle

```
Plan → Spawn Team → Create Tasks → Spawn Teammates →
Execute (monitor + coordinate) → Verify → Shutdown → Cleanup
```

1. **Plan**: Determine team composition, file ownership, task breakdown
2. **Spawn Team**: `Teammate spawnTeam` with descriptive name
3. **Create Tasks**: `TaskCreate` for each work item with detailed descriptions
4. **Spawn Teammates**: `Task` tool with `team_name` and `name` params
5. **Execute**: Monitor `TaskList`, handle messages, resolve issues
6. **Verify**: Run tests, type checks, UI verification after all teammates complete
7. **Shutdown**: `SendMessage shutdown_request` to each teammate, wait for responses
8. **Cleanup**: `Teammate cleanup` to remove team resources

### Shutdown Protocol

Always use graceful shutdown:
1. Send `shutdown_request` to each teammate via `SendMessage`
2. Wait for each teammate to respond (approve or reject)
3. If rejected, check reason and resolve before retrying
4. After all teammates shut down, call `Teammate cleanup`
5. **Never** force-kill teammates — they may have uncommitted work

### Error Handling in Team Mode

| Error | Response |
|-------|----------|
| Task failure | Reassign to another teammate or handle as lead |
| Unresponsive teammate | Send message, check task status, escalate if needed |
| File conflict | Stop both teammates, resolve conflict, reassign ownership |
| Integration failure | Roll back to pre-integration state, debug, retry |

### Token Cost Considerations

Agent Teams cost 3-5x more tokens than subagents because:
- Each teammate maintains its own context window
- Inter-agent messages add overhead
- Team lead must monitor and coordinate
- Only use teams when the coordination benefit justifies the cost

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
| Agent Team teammate | `general-purpose` | Always use for teammates |
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
  "execution_strategy": "subagent|team",
  "team_name": null,
  "teammates": [],
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
- Don't use Agent Teams for simplification tasks (subagents are better)
- Don't let two teammates edit the same file (file ownership is sacred)
- Don't spawn more than 5 teammates (diminishing returns, high token cost)
- Don't use Agent Teams without checking `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- Don't skip the graceful shutdown protocol for teammates

## Error Messages

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| "Chunk dependency not met" | Out of order execution | Check dependency graph |
| "Max retries exceeded" | Persistent failure | Manual intervention needed |
| "State file locked" | Concurrent modification | Wait or clear lock |
| "Subagent timeout" | Long-running task | Increase timeout or split chunk |
