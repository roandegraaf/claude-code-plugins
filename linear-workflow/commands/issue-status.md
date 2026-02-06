---
name: issue-status
description: Check the sync status between a Linear issue, Git branch, and GitHub PR
argument-hint: "[issue-identifier]"
allowed-tools: Bash(*), Read, mcp__linear-server__get_issue, mcp__github__list_pull_requests, mcp__github__pull_request_read
---

# /issue-status — Sync Check

## Step 1: Get Identifier

If `$ARGUMENTS` contains an identifier matching `[A-Z]+-\d+` → use it.

Otherwise, parse from the current branch name (`git branch --show-current`).

If neither yields an identifier:
- Print: "Usage: `/issue-status [identifier]` or run from a branch with a Linear identifier."
- Stop.

## Step 2: Fetch Linear Issue

Call `mcp__linear-server__get_issue` with the identifier.

Extract: identifier, title, state, assignee, priority, url.

If not found → "Issue `<identifier>` not found on Linear." Stop.

## Step 3: Check Git State

Run via Bash:
- `git branch --show-current` — current branch
- `git log origin/main..HEAD --oneline` — commits ahead of main (if on a feature branch)

## Step 4: Check GitHub PR

Parse `owner/repo` from `git remote get-url origin`.

Call `mcp__github__list_pull_requests` with `head: "<owner>:<branch>"` for both `state: "open"` and `state: "closed"`.

If a PR exists, call `mcp__github__pull_request_read` with method `get` and `get_status` to get:
- PR state (open/closed/merged)
- CI check status
- Review status (approved/changes requested/pending)

## Step 5: Display Combined View

```
## <IDENTIFIER>: <title>

### Linear
- **Status:** <state>
- **Assignee:** <name>
- **Priority:** <priority>
- **URL:** <linear-url>

### Git
- **Branch:** <branch>
- **Commits ahead:** <n>

### GitHub PR
- **PR:** #<number> (<state>)
- **Checks:** <passing/failing/pending>
- **Reviews:** <approved/changes requested/pending>
- **URL:** <pr-url>
```

If no PR exists → show "No PR found" under GitHub section.

## Step 6: Suggest Next Action

Based on the current state, suggest the logical next step:

| State | Suggestion |
|-------|-----------|
| No branch / on main | Run `/work <identifier>` to start |
| Branch exists, no PR | Run `/ship` to create a PR |
| PR open, checks passing, approved | Run `/merge` to complete |
| PR open, checks failing | Fix failing checks |
| PR open, changes requested | Address review feedback |
| PR merged | Already complete |
