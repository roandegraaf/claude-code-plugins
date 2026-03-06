---
name: orchestrate-simplify
description: Simplify all files in a path using parallel subagent processing
argument-hint: [path] [--lang python|typescript|javascript|etc] [--chunk-size N]
allowed-tools: Agent, Read, Glob, Grep, Bash(*), Write, Edit, TaskCreate, TaskUpdate, TaskList, TaskGet
---

# Orchestrated Codebase Simplification

## Hard Rules

1. **You are an orchestrator. You MUST delegate ALL work to subagents via the Agent tool.**
2. **You MUST NOT write code, edit files, or implement anything yourself.**
3. **NEVER use `run_in_background: true`** — all subagents run in foreground.
4. **Always use `general-purpose` as the subagent_type.**
5. **Maximum 20 concurrent subagents, maximum 20 files per chunk.**
6. **Launch ALL independent chunks in parallel in a SINGLE message.**

> Always uses subagent mode. Simplification is focused, independent chunk work where agents don't need to communicate.

## Arguments

Parse from: `$ARGUMENTS`

- **path**: Directory to simplify (default: current directory)
- **--lang**: Language filter (auto-detect if not specified)
- **--chunk-size**: Files per chunk (default: 20, max: 20)

## Phase 1: Analysis

### 1.1 Detect Language and Files

Use Glob patterns based on detected/specified language:
- Python: `**/*.py`
- TypeScript: `**/*.ts`, `**/*.tsx`
- JavaScript: `**/*.js`, `**/*.jsx`
- PHP: `**/*.php`
- Swift: `**/*.swift`
- Go: `**/*.go`
- Rust: `**/*.rs`

Exclude `node_modules`, `__pycache__`, `.git`, `vendor`, etc.

### 1.2 Map Dependencies

Identify:
- Shared utilities/helpers (many imports)
- Core modules (base classes, interfaces)
- Leaf modules (few/no dependents)

**Process order**: Leaf modules first, core modules last.

### 1.3 Detect Test Command

Auto-detect based on project:
- `package.json` with test script -> `npm test` or `yarn test`
- `pytest.ini` or `pyproject.toml` -> `pytest`
- `go.mod` -> `go test ./...`
- `Cargo.toml` -> `cargo test`
- `Makefile` with test target -> `make test`

### 1.4 Create Chunks

Group files by directory, respecting:
- Max files per chunk (default 20)
- Keep related files together
- Process leaf directories first

## Phase 2: Parallel Execution

### 2.1 Batch Processing

For each batch of chunks (up to 20 parallel), launch via the **Agent tool**:

```
Agent tool call:
  subagent_type: general-purpose
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

**CRITICAL: Launch ALL independent chunks in parallel in a SINGLE message.**

### 2.2 Batch Completion

After each batch:

1. **Run tests**: `<test command>`
2. **On test failure**:
   - Identify which chunk(s) broke tests
   - Rollback failed chunks via `git stash pop`
   - Mark as failed, retry once with error context
3. **On success**:
   - Mark chunks complete
   - Clear stashes for completed chunks

### 2.3 Progress Tracking

```
TaskCreate: "Orchestrate simplification of <path>"
  TaskCreate: "Batch 1: chunks 1-5"
  TaskCreate: "Batch 2: chunks 6-10"
  ...
```

## Phase 3: Verification

### 3.1 Final Test Run

```bash
<test command>
```

### 3.2 Final Build Run

```bash
<build command>
```

## Phase 4: Completion

```
## Simplification Complete

**Scope**: <N> files across <M> directories
**Chunks**: <total> total, <completed> succeeded, <failed> failed

### Changes by Directory
- src/utils/: 15 files simplified
- src/models/: 12 files simplified
...

### Verification
- Tests: <pass/fail>
- Build: <pass/fail>

### Summary
- Lines removed: ~<N>
- Complexity reduced in: <M> files
- No functionality changes
```

---

**BEGIN SIMPLIFICATION FOR:** $ARGUMENTS
