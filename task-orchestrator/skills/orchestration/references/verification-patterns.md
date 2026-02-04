# Verification Patterns

## Table of Contents
- [Verification Levels](#verification-levels)
- [Auto-Detection Logic](#auto-detection-logic)
- [Verification Scheduling](#verification-scheduling)
- [Handling Verification Failures](#handling-verification-failures)
- [Verification State Tracking](#verification-state-tracking)
- [UI Verification Checklist](#ui-verification-checklist)

Patterns for verifying orchestration results at each stage.

## Verification Levels

### Level 1: Syntax Validation (After Each Chunk)
Ensure code is syntactically valid before proceeding.

**Python:**
```bash
python -m py_compile <file>
# Or for all files:
python -m compileall <directory> -q
```

**TypeScript/JavaScript:**
```bash
npx tsc --noEmit
# Or for syntax only:
node --check <file>
```

**Go:**
```bash
go build ./...
```

**Rust:**
```bash
cargo check
```

### Level 2: Lint Checks (After Each Batch)
Catch style issues and potential bugs.

**Python:**
```bash
ruff check <files>
# or
flake8 <files>
# or
pylint <files>
```

**TypeScript/JavaScript:**
```bash
npx eslint <files>
```

**Go:**
```bash
golangci-lint run
```

### Level 3: Type Checking (After Each Batch)
Verify type safety for typed languages.

**Python (with type hints):**
```bash
mypy <files>
# or
pyright <files>
```

**TypeScript:**
```bash
npx tsc --noEmit
```

### Level 4: Unit Tests (After Each Batch)
Run relevant tests to catch regressions.

**Strategy**: Run tests related to modified files, not full suite.

```bash
# Python - run tests for specific modules
pytest tests/test_<module>.py

# JavaScript - run tests matching pattern
npm test -- --testPathPattern="<module>"

# Go - run tests for specific package
go test ./<package>/...
```

### Level 5: Integration Tests (After All Chunks)
Run full test suite to verify overall integrity.

```bash
# Python
pytest --tb=short

# JavaScript
npm test

# Go
go test ./...

# With coverage
pytest --cov=src --cov-report=term-missing
npm test -- --coverage
```

### Level 6: UI Verification (For Frontend)
Visual verification using chrome-devtools MCP.

```yaml
# Navigate to app
mcp__chrome-devtools__navigate_page:
  url: http://localhost:3000

# Take snapshot for comparison
mcp__chrome-devtools__take_snapshot

# Check for console errors
mcp__chrome-devtools__list_console_messages:
  types: ["error", "warn"]

# Screenshot key pages
mcp__chrome-devtools__take_screenshot:
  filePath: .claude/screenshots/verification.png
```

## Auto-Detection Logic

Detect which verification to run based on project:

```python
def detect_verification_commands(project_root):
    commands = {
        'syntax': None,
        'lint': None,
        'typecheck': None,
        'test': None,
        'ui': False
    }

    # Check for Python
    if exists('pyproject.toml') or exists('setup.py') or glob('**/*.py'):
        commands['syntax'] = 'python -m compileall . -q'
        commands['test'] = detect_python_test_command()

        if exists('pyproject.toml'):
            config = read_toml('pyproject.toml')
            if 'ruff' in str(config):
                commands['lint'] = 'ruff check .'
            if 'mypy' in str(config):
                commands['typecheck'] = 'mypy .'

    # Check for Node.js
    if exists('package.json'):
        pkg = read_json('package.json')

        if 'test' in pkg.get('scripts', {}):
            commands['test'] = 'npm test'

        if 'lint' in pkg.get('scripts', {}):
            commands['lint'] = 'npm run lint'

        if 'typescript' in pkg.get('devDependencies', {}):
            commands['typecheck'] = 'npx tsc --noEmit'

        # Frontend detection
        deps = {**pkg.get('dependencies', {}), **pkg.get('devDependencies', {})}
        if any(fw in deps for fw in ['react', 'vue', 'angular', 'svelte']):
            commands['ui'] = True

    # Check for Go
    if exists('go.mod'):
        commands['syntax'] = 'go build ./...'
        commands['test'] = 'go test ./...'
        commands['lint'] = 'golangci-lint run' if which('golangci-lint') else None

    return commands

def detect_python_test_command():
    if exists('pytest.ini') or exists('pyproject.toml'):
        return 'pytest'
    elif exists('setup.py'):
        return 'python -m pytest'
    elif glob('**/test_*.py'):
        return 'python -m unittest discover'
    return None
```

## Verification Scheduling

### After Each Chunk
- Syntax check (fast, catches obvious breaks)

### After Each Batch (3-5 chunks)
- Lint check
- Type check
- Unit tests for affected modules

### After All Chunks
- Full test suite
- Integration tests
- UI verification (if frontend)
- Code review subagent

## Handling Verification Failures

### Syntax Failure
```
1. Identify the broken file from error output
2. Map file to chunk that modified it
3. Rollback that chunk via git stash
4. Retry chunk with error context added to prompt
```

### Test Failure
```
1. Parse test output for failing test(s)
2. Identify which chunk likely caused the failure
   - Check which chunk modified files in the traceback
3. Rollback suspected chunk
4. Retry with test failure details:
   - Failing test name
   - Error message
   - Relevant code from traceback
```

### Lint/Type Failure
```
1. Parse error output
2. Determine if issue is:
   - Pre-existing (skip, note in report)
   - Introduced by chunk (rollback, retry)
3. For introduced issues, add lint rules to retry prompt
```

## Verification State Tracking

Track verification results in state file:

```json
{
  "verification": {
    "test_command": "pytest",
    "runs": [
      {
        "timestamp": "2024-01-15T14:32:00Z",
        "type": "batch",
        "batch_id": 1,
        "result": "pass",
        "duration_ms": 12300,
        "tests_run": 45,
        "tests_failed": 0
      },
      {
        "timestamp": "2024-01-15T14:35:00Z",
        "type": "batch",
        "batch_id": 2,
        "result": "fail",
        "duration_ms": 11800,
        "tests_run": 45,
        "tests_failed": 2,
        "failures": [
          {
            "test": "test_helper_function",
            "error": "AssertionError: expected 5, got 4"
          }
        ]
      }
    ],
    "current_status": "passing",
    "last_full_run": "2024-01-15T14:40:00Z"
  }
}
```

## UI Verification Checklist

For frontend projects, verify:

1. **No Console Errors**
   ```yaml
   mcp__chrome-devtools__list_console_messages:
     types: ["error"]
   # Should return empty or only known/expected errors
   ```

2. **Key Elements Present**
   ```yaml
   mcp__chrome-devtools__take_snapshot
   # Check snapshot for expected elements
   ```

3. **No Visual Regressions**
   ```yaml
   mcp__chrome-devtools__take_screenshot:
     filePath: .claude/screenshots/after-<batch>.png
   # Compare with baseline if available
   ```

4. **Navigation Works**
   ```yaml
   mcp__chrome-devtools__click:
     uid: <navigation-element>
   mcp__chrome-devtools__wait_for:
     text: <expected-content>
   ```
