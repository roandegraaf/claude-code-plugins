---
name: linear-workflow
description: >
  Conventions and procedures for the Linear + Git/GitHub development workflow. Use when:
  working with Linear issues, creating Git branches from issues, formatting commits with
  issue identifiers, managing Linear issue status transitions, naming branches, creating
  pull requests linked to Linear issues, merging PRs and closing the loop, viewing assigned
  issues, or checking issue/PR sync status.
---

# Linear Workflow

## Workflow Sequence

```
/work <issue> → /ship [msg] → /merge
```

1. **`/work`** — Pick up a Linear issue, create branch, set status, plan implementation
2. **`/ship`** — Commit, push, create PR linked to Linear
3. **`/merge`** — Merge PR, mark done, clean up branch

Supporting commands:
- **`/my-issues`** — View your assigned backlog
- **`/issue-status`** — Check sync between Linear, Git, and GitHub

## Conventions

### Branch Naming

Format: `<prefix>/<IDENTIFIER>-<slug>`

| Prefix | When |
|--------|------|
| `feature/` | New functionality (default) |
| `fix/` | Bug fixes |
| `chore/` | Maintenance tasks |
| `refactor/` | Code restructuring |

See `references/branch-naming.md` for slugification rules.

### Commit Format

```
<IDENTIFIER>: <description>
```

Example: `ENG-123: Add OAuth2 login flow`

### Identifier Pattern

```regex
[A-Z]+-\d+
```

Extract from branch name, argument, or issue response.

## Status Management

| Event | Linear Status | Who Updates | Command |
|-------|--------------|-------------|---------|
| Start work | In Progress | Plugin (manual) | `/work` |
| PR opened | In Review | GitHub integration (auto) | `/ship` — no manual update |
| PR merged | Done | GitHub integration + safety net | `/merge` |

Only `/work` and `/merge` write status to Linear. The GitHub↔Linear integration handles "In Review" automatically when a PR is opened.

## Team Detection

1. Parse `owner/repo` from `git remote get-url origin`
2. Issue carries its team in the `get_issue` response (`team.id`, `team.name`)
3. For `/my-issues` without issue context: call `list_teams` — if single team, use it; if multiple, ask the user or use `--team` flag

## Sub-Issue Handling

When an issue has children (via `get_issue` with `includeRelations`):

1. Create a `TaskCreate` entry for each child, including the identifier in the subject
2. Set blocking dependencies via `TaskUpdate` based on child relationships
3. Track progress through the task list during implementation

## MCP Tool Quick Reference

| Operation | Tool | Key Parameters |
|-----------|------|---------------|
| Fetch issue | `mcp__linear-server__get_issue` | `issueId`, `includeRelations: true` |
| Update status | `mcp__linear-server__update_issue` | `issueId`, `stateId` |
| List statuses | `mcp__linear-server__list_issue_statuses` | `teamId` |
| My issues | `mcp__linear-server__list_issues` | `assignedToMe: true`, `teamId` |
| Get teams | `mcp__linear-server__list_teams` | — |
| Get user | `mcp__linear-server__get_user` | — |
| Create PR | `mcp__github__create_pull_request` | `owner`, `repo`, `title`, `body`, `head`, `base` |
| List PRs | `mcp__github__list_pull_requests` | `owner`, `repo`, `head` |
| Read PR | `mcp__github__pull_request_read` | `owner`, `repo`, `pullNumber` |
| Merge PR | `mcp__github__merge_pull_request` | `owner`, `repo`, `pullNumber`, `merge_method` |

## Error Patterns

| Error | Likely Cause | Response |
|-------|-------------|----------|
| Issue not found | Wrong identifier format | Check format matches `[A-Z]+-\d+` |
| No team found | User not a member | Verify Linear workspace access |
| Branch already exists | Previous work started | Offer to switch to existing branch |
| Push rejected | Branch behind remote | Suggest `git pull --rebase` |
| PR already exists | `/ship` ran before | Show existing PR URL |
| Merge conflicts | Diverged branches | Abort merge, suggest manual resolution |
| Status update fails | Workflow restrictions | Continue — non-fatal, log warning |
