---
name: ship
description: Commit changes, push branch, and create a PR linked to the Linear issue
argument-hint: "[commit message]"
allowed-tools: Bash(*), Read, Glob, Grep, mcp__linear-server__get_issue, mcp__linear-server__update_issue, mcp__github__create_pull_request, mcp__github__list_pull_requests
---

# /ship — Commit, Push, and Create PR

## Step 1: Parse Branch and Identifier

Get the current branch via `git branch --show-current` (Bash).

Extract the Linear identifier by matching `[A-Z]+-\d+` from the branch name.

If no identifier found:
- Print: "Current branch doesn't contain a Linear identifier. Expected format: `feature/ENG-123-description`."
- Stop.

## Step 2: Fetch Issue

Call `mcp__linear-server__get_issue` with the identifier.

Extract: identifier, title, description, url, labels/type.

If not found → "Issue `<identifier>` not found on Linear." Stop.

## Step 3: Commit Changes

Run `git status --porcelain` (Bash).

If there are uncommitted changes:
1. Stage relevant files with `git add` (prefer specific files over `git add -A`)
2. Determine commit message:
   - If `$ARGUMENTS` is provided → use it as the description
   - Otherwise → auto-generate a short summary from the staged diff
3. Commit as: `<IDENTIFIER>: <message>`

If no uncommitted changes → continue (there may be unpushed commits).

## Step 4: Push Branch

Run `git push -u origin <branch>` (Bash).

If push fails:
- Print: "Push failed. You may need to run `git pull --rebase origin <branch>` first."
- Stop.

## Step 5: Check for Existing PR

Call `mcp__github__list_pull_requests` with `owner`, `repo`, `head: "<owner>:<branch>"`, `state: "open"`.

If a PR already exists:
- Print: "PR already exists: <pr-url>"
- Stop.

## Step 6: Detect Default Branch

Run `git remote show origin` (Bash) and parse the default branch (usually `main` or `master`).

## Step 7: Create Pull Request

Select the PR template from `references/pr-templates.md` based on issue labels/type:
- Labels contain `bug` or `fix` → Bug Fix template
- Labels contain `chore`, `refactor`, `maintenance` → Chore / Refactor template
- Otherwise → Standard Feature template

Fill in the template with issue details (identifier, title, description, url).

Call `mcp__github__create_pull_request` with:
- `owner`, `repo`
- `title`: `<IDENTIFIER>: <issue title>`
- `body`: filled template
- `head`: current branch
- `base`: default branch

## Step 8: Link PR to Linear

Call `mcp__linear-server__update_issue` to attach the PR URL to the issue. Pass the PR URL and title (e.g., "GitHub PR #42") as a link attachment.

If this fails → warn but continue (the GitHub integration may handle this automatically).

## Step 9: Do NOT Update Status

The GitHub↔Linear integration automatically sets the issue to "In Review" when a PR is opened. Do not manually update the Linear status here.

## Step 10: Display Summary

Print:

```
## Shipped <IDENTIFIER>: <title>

**PR:** <pr-url>
**Branch:** <branch> → <base>
**Commits:** <count> commit(s) pushed
**Linear:** <linear-url>

Next: reviewers approve → `/merge` to complete
```
