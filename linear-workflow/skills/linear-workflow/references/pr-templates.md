# PR Body Templates

Use these templates when creating pull requests via `mcp__github__create_pull_request`.

## Standard Feature PR

```markdown
## Summary

Resolves [<IDENTIFIER>](<linear-url>)

<1-3 sentence description of what this PR does and why>

## Changes

- <bullet list of key changes>

## Test Plan

- [ ] <how to verify this works>

---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Bug Fix PR

```markdown
## Summary

Fixes [<IDENTIFIER>](<linear-url>)

**Problem:** <what was broken>
**Cause:** <root cause>
**Fix:** <what this PR does>

## Changes

- <bullet list of key changes>

## Test Plan

- [ ] <reproduction steps that now pass>
- [ ] <regression checks>

---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Chore / Refactor PR

```markdown
## Summary

Resolves [<IDENTIFIER>](<linear-url>)

<what this PR cleans up or improves, and why>

## Changes

- <bullet list of key changes>

## Notes

- <any migration steps, breaking changes, or follow-ups>

---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Template Selection

| Issue label/type contains | Template |
|--------------------------|----------|
| `bug`, `fix` | Bug Fix |
| `chore`, `refactor`, `maintenance` | Chore / Refactor |
| Everything else | Standard Feature |
