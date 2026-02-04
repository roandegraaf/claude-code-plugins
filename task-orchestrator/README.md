# Task Orchestrator Plugin

Orchestrate large, complex tasks by intelligently delegating work to parallel subagents, managing context efficiently, and iterating until completion.

## Overview

Unlike sequential task loops, this plugin uses **parallel orchestration**:

- **Subagents use isolated context windows** - only relevant info sent back
- **Parallel execution** - up to 20 subagents can work simultaneously
- **Context efficiency** - orchestrator maintains compact state, not full details
- **Smart chunking** - work divided into independent, manageable pieces
- **Automatic verification** - tests run after each batch
- **Graceful recovery** - git stash rollback on failures, retry with context

## Installation

Add to your Claude Code plugins directory:

```bash
cd ~/.claude/plugins  # or your plugins location
git clone <repo-url> task-orchestrator
```

Or copy the `task-orchestrator` folder to your plugins directory.

## Commands

### `/orchestrate <task>`

Main orchestration command for any large task.

```bash
# Orchestrate a custom task
/orchestrate "Add error handling to all API endpoints in src/api/"

# Orchestrate with specific parameters
/orchestrate "Migrate all class components to functional components"
```

**What it does:**
1. Analyzes task scope (files, dependencies)
2. Creates execution plan with chunks (max 20 files each)
3. Launches parallel subagents (up to 20 concurrent)
4. Tracks progress and handles failures
5. Verifies completion with tests and optional code review

### `/orchestrate-simplify [path]`

Specialized command for codebase simplification.

```bash
# Simplify entire src directory
/orchestrate-simplify ./src

# Simplify with language filter
/orchestrate-simplify ./src --lang python

# Custom chunk size
/orchestrate-simplify ./src --chunk-size 15
```

**Simplification includes:**
- Remove dead code and unused imports
- Simplify complex conditionals
- Improve variable/function names
- Standardize formatting
- Remove unnecessary comments

### `/orchestrate-implement <plan-file>`

Implement a multi-step plan with verification.

```bash
# Implement a feature plan
/orchestrate-implement ./docs/feature-plan.md

# With UI verification (auto-enabled for frontend)
/orchestrate-implement ./docs/feature-plan.md --verify-ui

# Skip code review
/orchestrate-implement ./docs/feature-plan.md --no-review
```

**Features:**
- Parses plan into discrete steps
- Identifies and respects dependencies
- Runs tests after each phase
- Optional UI verification via chrome-devtools MCP
- Code review at completion

### `/orchestrate-status`

Check the status of an ongoing or completed orchestration.

```bash
# Basic status
/orchestrate-status

# Detailed status
/orchestrate-status --verbose

# Specific task
/orchestrate-status --task-id <uuid>
```

## How It Works

### Chunking Strategy

Large tasks are divided into independent chunks:

| Task Type | Chunk By | Max Size | Order |
|-----------|----------|----------|-------|
| Simplify | Directory | 20 files | Leaf first |
| Implement | Plan step | 1 step | Dependency order |
| Custom | Analysis | 20 files | Dependency order |

### Parallel Execution

Chunks are processed in batches:

```
Batch 1: chunks 1-5 (parallel)
  └─ All complete ✓
  └─ Run tests ✓

Batch 2: chunks 6-10 (parallel)
  └─ chunk-7 failed ✗
  └─ Rollback chunk-7
  └─ Retry chunk-7 ✓
  └─ Run tests ✓

... continue until all complete
```

### State Management

Progress is tracked in `.claude/orchestrator-state.json`:

```json
{
  "task_id": "uuid",
  "task_type": "simplify",
  "status": "executing",
  "chunks": [...],
  "progress": {
    "total_chunks": 20,
    "completed": 15,
    "failed": 1,
    "in_progress": 4
  }
}
```

### Recovery

On failure:
1. Git stash is used to rollback the failed chunk
2. Chunk is retried with error context
3. After max retries, chunk is marked failed
4. Non-dependent chunks continue
5. Final report shows what succeeded/failed

## Configuration

Default settings (can be overridden):

| Setting | Default | Description |
|---------|---------|-------------|
| `max_parallel` | 20 | Maximum concurrent subagents |
| `max_files_per_chunk` | 20 | Files per chunk |
| `max_attempts` | 3 | Retries per chunk |
| `auto_rollback` | true | Use git stash for rollback |

## Examples

### Example 1: Simplify a Python Codebase

```bash
/orchestrate-simplify ./myproject --lang python
```

Output:
```
## Simplification Started
Scope: 150 files in 8 chunks

## Batch 1/2 (Chunks 1-5)
[✓] chunk-1: src/utils/ (15 files)
[✓] chunk-2: src/models/ (18 files)
[✓] chunk-3: src/views/ (20 files)
[✓] chunk-4: src/api/ (17 files)
[✓] chunk-5: src/services/ (20 files)

Tests: ✓ Passing

## Batch 2/2 (Chunks 6-8)
[✓] chunk-6: src/core/ (20 files)
[✓] chunk-7: src/helpers/ (15 files)
[✓] chunk-8: src/integrations/ (25 files)

Tests: ✓ Passing

## Complete
Total: 8 chunks, 8 succeeded
Files modified: 150
```

### Example 2: Implement a Feature Plan

Given `feature-plan.md`:
```markdown
# User Authentication Feature

## Step 1: Create User Model
- Add User model with email, password hash
- Create migration

## Step 2: Add Auth Routes
- POST /auth/login
- POST /auth/register
- POST /auth/logout

## Step 3: Add JWT Middleware
- Verify token on protected routes
- Refresh token logic
```

```bash
/orchestrate-implement ./feature-plan.md
```

Output:
```
## Implementation Started
Plan: feature-plan.md
Steps: 3 total

## Phase 1 (Step 1 - no dependencies)
[✓] step-1: Create User Model

Tests: ✓ Passing

## Phase 2 (Steps 2-3 - depend on 1)
[✓] step-2: Add Auth Routes
[✓] step-3: Add JWT Middleware

Tests: ✓ Passing
Review: ✓ Approved

## Complete
All 3 steps implemented successfully
```

### Example 3: Custom Orchestration

```bash
/orchestrate "Add comprehensive error handling to all database operations in src/db/"
```

The orchestrator will:
1. Find all files in `src/db/`
2. Identify database operations (queries, transactions)
3. Create chunks by file/module
4. Launch subagents to add error handling
5. Verify with tests
6. Report results

## Troubleshooting

### Orchestration Won't Stop

The stop hook prevents exit while orchestration is active. To force exit:
1. Update `.claude/orchestrator-state.json`, set `status` to `"aborted"`
2. Or delete the state file

### Chunk Keeps Failing

Check the state file for error details:
```bash
cat .claude/orchestrator-state.json | jq '.chunks[] | select(.status == "failed")'
```

Options:
- Fix manually and resume: `/orchestrate --resume`
- Skip failed chunks: Update state file, mark as `skipped`

### Tests Failing After Simplification

The simplification preserved behavior but tests may be flaky or have issues:
1. Check test output in state file
2. Review the specific test that failed
3. Either fix test or rollback affected chunk

## Architecture

```
task-orchestrator/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest
├── commands/
│   ├── orchestrate.md        # Main command
│   ├── orchestrate-simplify.md
│   ├── orchestrate-implement.md
│   └── orchestrate-status.md
├── hooks/
│   ├── hooks.json            # Stop hook config
│   └── scripts/
│       └── orchestrator-stop.sh
├── skills/
│   └── orchestration/
│       ├── SKILL.md          # Orchestration knowledge
│       └── references/
│           ├── chunking-strategies.md
│           ├── verification-patterns.md
│           └── recovery-patterns.md
├── state/                    # Runtime state files
└── README.md
```

## Contributing

Contributions welcome! Key areas:
- Additional preset commands (e.g., `/orchestrate-test`, `/orchestrate-migrate`)
- Improved chunking strategies
- Better failure recovery patterns
- UI verification improvements

## License

MIT
