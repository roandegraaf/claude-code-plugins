---
name: my-issues
description: View your assigned Linear issues grouped by status
argument-hint: "[--team <name>] [--status <status>]"
allowed-tools: Bash(*), Read, mcp__linear-server__list_issues, mcp__linear-server__list_teams, mcp__linear-server__get_user
---

# /my-issues — View Your Backlog

## Step 1: Parse Flags

Extract optional flags from `$ARGUMENTS`:
- `--team <name>` — filter by team name
- `--status <status>` — filter by status (e.g., "In Progress", "Todo")

## Step 2: Detect Team

If `--team` was provided → use that team name.

Otherwise, auto-detect:
1. Call `mcp__linear-server__list_teams`
2. If single team → use it
3. If multiple teams → try matching from `git remote get-url origin` repo name; if no match, list teams and ask the user

## Step 3: Fetch Issues

Call `mcp__linear-server__list_issues` with:
- `assignedToMe: true`
- `teamId` from detected team
- Optional status filter if `--status` was provided

## Step 4: Group and Sort

Group issues by status. Within each group, sort by priority (Urgent → High → Medium → Low → No priority).

## Step 5: Display

Print a formatted list:

```
## My Issues — <team-name>

### In Progress
1. **ENG-123** Add user authentication ⬆ High
2. **ENG-124** Fix session timeout ⬆ Urgent

### Todo
3. **ENG-130** Update API documentation — Medium
4. **ENG-131** Add rate limiting — Low

### Backlog
5. **ENG-140** Explore caching strategy — No priority

---
Run `/work <identifier>` to pick up an issue.
```

If no issues found → "No issues assigned to you on **<team-name>**."
