---
name: work
description: Pick up a Linear issue — create branch, set status to In Progress, plan implementation
argument-hint: <issue-identifier>
allowed-tools: Bash(*), Read, Glob, Grep, Write, Edit, mcp__linear-server__get_issue, mcp__linear-server__get_user, mcp__linear-server__list_teams, mcp__linear-server__get_team, mcp__linear-server__list_issues, mcp__linear-server__list_issue_statuses, mcp__linear-server__update_issue, mcp__github__get_me, TaskCreate, TaskUpdate, TaskList, TaskGet, EnterPlanMode
---

# /work — Pick Up a Linear Issue

## Step 1: Parse Identifier

Extract the issue identifier from `$ARGUMENTS`. It must match `[A-Z]+-\d+`.

If missing or invalid:
- Print: "Usage: `/work <identifier>` (e.g., `/work ENG-123`). Run `/my-issues` to see your backlog."
- Stop.

## Step 2: Fetch Issue

Call `mcp__linear-server__get_issue` with `includeRelations: true`.

Extract: identifier, title, description, state, assignee, team (id + name), children, url, labels.

If not found → "Issue `<identifier>` not found. Check the identifier and try again." Stop.

## Step 3: Parse Repo

Run `git remote get-url origin` via Bash. Parse `owner/repo` from the URL (supports both HTTPS and SSH formats).

## Step 4: Find "In Progress" Status

Call `mcp__linear-server__list_issue_statuses` with the issue's team ID. Find the status whose name matches "In Progress" (case-insensitive). Store the status ID.

## Step 5: Check Git State

Run `git status --porcelain` via Bash. If output is non-empty:
- Print: "Working tree has uncommitted changes. Commit or stash them first."
- Stop.

## Step 6: Generate Branch Name

Apply branch naming conventions from `references/branch-naming.md`:

1. Choose prefix based on issue labels/type: `fix/` for bugs, `chore/` for maintenance, `refactor/` for refactors, `feature/` for everything else
2. Slugify the title: lowercase, replace non-alphanumeric with hyphens, collapse consecutive hyphens, trim, truncate to 50 chars at word boundary
3. Format: `<prefix>/<IDENTIFIER>-<slug>`

## Step 7: Create or Switch Branch

Check if branch already exists (`git branch --list <branch>`).

- **Exists locally:** Ask user if they want to switch to it. If yes → `git checkout <branch>`.
- **Does not exist:** Run `git checkout main && git pull && git checkout -b <branch>`.

## Step 8: Update Linear Status

Call `mcp__linear-server__update_issue` to set the issue state to "In Progress" using the status ID from Step 4.

If the update fails → warn but continue (non-fatal).

## Step 9: Assign If Unassigned

If the issue has no assignee, call `mcp__linear-server__update_issue` to assign it to the current user. Use `mcp__linear-server__get_user` or `mcp__github__get_me` to get the user identity if needed.

## Step 10: Handle Sub-Issues

If the issue has children from the `includeRelations` response:

1. Call `TaskCreate` for each child issue with the identifier in the subject (e.g., "ENG-124: Implement auth middleware")
2. Set descriptions from child issue titles/descriptions
3. Use `TaskUpdate` to set blocking dependencies where child issues depend on each other

## Step 11: Display Summary

Print a formatted summary:

```
## Working on <IDENTIFIER>: <title>

**Status:** In Progress
**Branch:** <branch-name>
**Team:** <team-name>
**URL:** <linear-url>

<issue description, truncated if very long>
```

If sub-issues exist, list them with their task IDs.

## Step 12: Plan Implementation

Enter plan mode with `EnterPlanMode`. Explore the codebase to understand the relevant areas, then create an implementation plan for the issue. Execute the plan after approval.
