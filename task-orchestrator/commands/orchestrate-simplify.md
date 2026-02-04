---
name: orchestrate-simplify
description: Simplify all files in a path using parallel subagent processing
argument-hint: [path] [--lang python|typescript|javascript|etc] [--chunk-size N]
allowed-tools: Task(*), Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet
---

# Orchestrated Codebase Simplification

You are orchestrating a large-scale code simplification task using parallel subagents.

## Arguments

Parse from: `$ARGUMENTS`

- **path**: Directory to simplify (default: current directory)
- **--lang**: Language filter (auto-detect if not specified)
- **--chunk-size**: Files per chunk (default: 20, max: 20)

## Critical Constraints

**NEVER use `run_in_background: true`** - All subagents run in foreground.

**Maximum 20 concurrent subagents** - Process in parallel batches.

**Preserve functionality** - All tests must pass after simplification.

## Phase 1: Analysis

### 1.1 Detect Language and Files

```bash
# Find source files (exclude node_modules, __pycache__, .git, etc.)
```

Use Glob patterns based on detected/specified language:
- Python: `**/*.py`
- TypeScript: `**/*.ts`, `**/*.tsx`
- JavaScript: `**/*.js`, `**/*.jsx`
- Go: `**/*.go`
- Rust: `**/*.rs`

### 1.2 Map Dependencies

Identify:
- Shared utilities/helpers (many imports)
- Core modules (base classes, interfaces)
- Leaf modules (few/no dependents)

**Process order**: Leaf modules first, core modules last.

### 1.3 Detect Test Command

Auto-detect based on project:
- `package.json` with test script → `npm test` or `yarn test`
- `pytest.ini` or `pyproject.toml` → `pytest`
- `go.mod` → `go test ./...`
- `Cargo.toml` → `cargo test`
- `Makefile` with test target → `make test`

### 1.4 Create Chunks

Group files by directory, respecting:
- Max files per chunk (default 20)
- Keep related files together
- Process leaf directories first

## Phase 2: State Initialization

Create `.claude/orchestrator-state.json`:

```json
{
  "task_id": "<uuid>",
  "task_type": "simplify",
  "task_description": "Simplify codebase at <path>",
  "status": "executing",
  "created_at": "<ISO timestamp>",
  "language": "<detected or specified>",
  "source_path": "<path>",
  "chunks": [
    {
      "id": "chunk-<n>",
      "description": "Simplify <directory>",
      "status": "pending",
      "files": ["<file paths>"],
      "depends_on": [],
      "subagent_type": "<language>-simplifier or code-simplifier",
      "attempts": 0,
      "max_attempts": 3,
      "stash_name": null
    }
  ],
  "progress": {
    "total_chunks": 0,
    "completed": 0,
    "failed": 0
  },
  "verification": {
    "test_command": "<detected>",
    "tests_pass": null
  }
}
```

## Phase 3: Parallel Execution

### 3.1 Batch Processing

For each batch of chunks (up to 20 parallel):

**Pre-chunk setup:**
```bash
git stash push -m "orchestrator-simplify-chunk-<id>" -- <files in chunk>
```

**Launch subagent:**

```yaml
subagent_type: python-simplifier  # or code-simplifier for other languages
description: "Simplify <directory name>"
prompt: |
  ## Task
  Simplify the following files for clarity, consistency, and maintainability.
  Preserve ALL existing functionality.

  ## Files
  <list files>

  ## Simplification Guidelines
  1. Remove dead code and unused imports
  2. Simplify complex conditionals
  3. Extract repeated patterns into helpers (within these files only)
  4. Improve variable/function names for clarity
  5. Remove unnecessary comments, keep essential ones
  6. Standardize formatting and style
  7. Simplify error handling where appropriate

  ## Constraints
  - Do NOT change public APIs or function signatures
  - Do NOT add new dependencies
  - Do NOT change behavior, only implementation
  - Keep changes minimal and focused

  ## Verification
  After changes, run: <test command>
  All tests must pass.

  ## Report
  List each file changed with a one-line summary of what was simplified.
```

### 3.2 Batch Completion

After each batch:

1. **Run tests**: `<test command>`
2. **On test failure**:
   - Identify which chunk(s) broke tests
   - Rollback failed chunks via stash
   - Mark as failed, retry if attempts remaining
3. **On success**:
   - Mark chunks complete
   - Clear stashes for completed chunks

### 3.3 Progress Tracking

Create visible tasks:
```
TaskCreate: "Orchestrate simplification of <path>"
  └── TaskCreate: "Batch 1: chunks 1-5"
  └── TaskCreate: "Batch 2: chunks 6-10"
  ...
```

## Phase 4: Verification

### 4.1 Final Test Run

```bash
<test command>
```

### 4.2 Optional Code Review

If tests pass, optionally launch code reviewer:

```yaml
subagent_type: superpowers:code-reviewer
description: "Review simplification changes"
prompt: |
  Review the simplification changes made to <path>.

  Check for:
  1. Any accidental behavior changes
  2. Removed code that was actually used
  3. Overly aggressive simplification
  4. Introduced bugs or issues

  Provide summary and any concerns.
```

## Phase 5: Completion

### Success Output

```
## Simplification Complete

**Scope**: <N> files across <M> directories
**Chunks**: <total> total, <completed> succeeded, <failed> failed

### Changes by Directory
- src/utils/: 15 files simplified
- src/models/: 12 files simplified
- src/services/: 18 files simplified
...

### Verification
- Tests: ✓ All passing
- Review: ✓ No issues found

### Summary
- Lines removed: ~<N>
- Complexity reduced in: <M> files
- No functionality changes
```

### Failure Output

```
## Simplification Incomplete

**Status**: <N> chunks failed after retries

### Failed Chunks
- chunk-5: src/core/ - Tests failed after simplification
  Error: <test output snippet>
- chunk-8: src/api/ - Syntax error introduced
  Error: <error message>

### Successful Chunks
<list of completed chunks>

### Recommended Actions
1. Review failed chunks manually
2. Run `/orchestrate-status` for detailed state
3. Fix issues and re-run with `--resume`
```

---

## Execution

**BEGIN SIMPLIFICATION FOR:** $ARGUMENTS
