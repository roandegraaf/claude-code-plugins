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

### 1. Always Delegate

The orchestrator MUST NOT do work itself. All implementation work is delegated to subagents via the **Agent tool**. The orchestrator only:
- Analyzes scope and creates chunk plans
- Launches subagents via the Agent tool
- Tracks progress via TaskCreate/TaskUpdate
- Runs verification (tests) between batches
- Reports results

### 2. Divide and Conquer

Large tasks should be broken into independent chunks that can be processed in parallel. Each chunk should:
- Be self-contained (minimal dependencies on other chunks)
- Have clear success criteria
- Be recoverable on failure (via git stash)

### 3. Context Efficiency

Subagents have isolated context windows. The orchestrator should:
- Send only relevant information to each subagent
- Collect concise summaries from subagent results
- Keep prompts focused on the specific chunk's work

### 4. Graceful Degradation

Failures in one chunk should not block the entire orchestration:
- Retry failed chunks once with error context
- Continue with non-dependent chunks
- Report partial completion with clear next steps

## Tool Reference

### Subagent Delegation

Use the **Agent tool** (not "Task tool") to launch subagents:
- `subagent_type`: Always use `general-purpose`
- `description`: 3-5 word summary
- `prompt`: Detailed instructions for the chunk
- For team mode: add `team_name` and `name` parameters

### Team Management

| Action | Tool | Example |
|--------|------|---------|
| Create team | `TeamCreate` | `team_name: "my-team"` |
| Delete team | `TeamDelete` | After all teammates shut down |
| Create task | `TaskCreate` | Subject + description |
| Update task | `TaskUpdate` | Status, owner, blockedBy |
| List tasks | `TaskList` | Check progress |
| Send message | `SendMessage` | Coordinate with teammates |

### Subagent Types

Always use `general-purpose` for orchestrated work. Language-specific simplifier agents exist as separate plugins (e.g., `python-simplifier`) but are not subagent types — they are standalone agents.

## Decision Guide: Teams vs Subagents

**Default to subagents.** Only use teams when the user explicitly passes `--team`.

Teams are beneficial when:
- 3+ distinct areas need separate, creative work
- Each area owns separate files (zero overlap)
- Cross-area coordination or interface contracts are needed

Subagents are better when:
- Work is mechanical/repetitive (simplification, migrations)
- Steps are sequential or touch the same files
- Fewer than 4 steps total
- No inter-agent communication needed

### Quick Decision Tree

```
Q1: Did user pass --team?
  NO  -> Subagents
  YES -> Q2

Q2: Can each area own separate files with zero overlap?
  NO  -> Subagents (file conflict risk)
  YES -> Agent Teams
```

## Team Architecture

```
Team Lead (You / Orchestrator)
├── Teammate A (area 1) ─── owns src/frontend/
├── Teammate B (area 2) ─── owns src/backend/
└── Teammate C (area 3) ─── owns src/shared/
         │
    Shared Task List
    (TaskCreate / TaskUpdate / TaskList)
```

### Team Lifecycle

1. **Plan**: Determine team composition, file ownership, task breakdown
2. **Create team**: `TeamCreate` with descriptive name
3. **Create tasks**: `TaskCreate` for each work item
4. **Spawn teammates**: Agent tool with `team_name` and `name` params
5. **Execute**: Monitor `TaskList`, handle messages, resolve blockers
6. **Verify**: Run tests after all teammates complete
7. **Shutdown**: `SendMessage shutdown_request` to each teammate
8. **Cleanup**: `TeamDelete` to remove team resources

### Shutdown Protocol

Always use graceful shutdown:
1. Send `shutdown_request` to each teammate via `SendMessage`
2. Wait for each teammate to respond
3. After all teammates shut down, call `TeamDelete`
4. Never force-kill teammates — they may have uncommitted work

### Team Composition Patterns

| Pattern | Teammates | When |
|---------|-----------|------|
| Full-stack | `frontend-dev`, `backend-dev`, `test-writer` | Frontend + backend features |
| Module | `module-X-dev`, `module-Y-dev`, `integrator` | Independent modules |
| Layer | `data-dev`, `logic-dev`, `presentation-dev` | Architectural layers |

Maximum 5 teammates per team.

## Chunking Strategies

See `references/chunking-strategies.md` for detailed patterns.

| Task Type | Chunk By | Order | Max Size |
|-----------|----------|-------|----------|
| Simplify | Directory | Leaf first | 20 files |
| Implement | Plan step | Dependency order | 1 step |
| Test | Test file | Any | 10 files |
| Migrate | Module | Leaf first | 15 files |

## Verification Patterns

See `references/verification-patterns.md` for detailed patterns.

| Check | When | Command |
|-------|------|---------|
| Unit tests | After each batch | `pytest`, `npm test` |
| Type check | After TypeScript changes | `tsc --noEmit` |
| Lint | After any code change | `eslint`, `ruff` |
| UI snapshot | After frontend changes | chrome-devtools MCP |
| Integration | After all chunks | Full test suite |

## Recovery Patterns

See `references/recovery-patterns.md` for detailed patterns.

### Git Stash Rollback

Before each chunk:
```bash
git stash push -m "orchestrator-chunk-<id>" -- <files>
```

On chunk failure:
1. Pop the stash: `git stash pop`
2. Mark chunk as failed
3. Continue with non-dependent chunks

### Failure Recovery

| Failure | Recovery |
|---------|----------|
| Test failure | Rollback chunk, retry once with test output context |
| Syntax error | Rollback chunk, retry once with error message |
| Timeout | Mark failed, continue with others |
| Dependency fail | Block dependent chunks, report to user |

## Best Practices

### DO
- Delegate ALL work to subagents via the Agent tool
- Use git stash for rollback capability
- Run tests after each batch
- Provide clear error context when retrying
- Track progress via TaskCreate/TaskUpdate
- Launch all independent chunks in parallel in a single message

### DON'T
- Never write code or edit files yourself (you are the orchestrator)
- Never use `run_in_background: true`
- Don't exceed 20 parallel subagents
- Don't skip verification steps
- Don't let two teammates edit the same file
- Don't spawn more than 5 teammates
