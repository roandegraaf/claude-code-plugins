---
name: merge
description: Merge a pull request, mark the Linear issue as Done, and clean up the branch
argument-hint: "[--squash|--rebase|--merge]"
allowed-tools: Bash(*), Read, mcp__linear-server__get_issue, mcp__linear-server__update_issue, mcp__linear-server__list_issue_statuses, mcp__github__list_pull_requests, mcp__github__pull_request_read, mcp__github__merge_pull_request, AskUserQuestion
---

# /merge — Merge PR and Close the Loop

## Step 1: Parse Merge Method

Extract merge method from `$ARGUMENTS`:
- `--squash` → `squash` (default if no flag)
- `--rebase` → `rebase`
- `--merge` → `merge`

## Step 2: Find PR

Get the current branch via `git branch --show-current` (Bash).

Parse `owner/repo` from `git remote get-url origin`.

Call `mcp__github__list_pull_requests` with `head: "<owner>:<branch>"`, `state: "open"`.

If no open PR found:
- Print: "No open PR found for branch `<branch>`. Run `/ship` first."
- Stop.

## Step 3: Get PR Details

Call `mcp__github__pull_request_read` with method `get` to get PR number, title, base branch.

Call `mcp__github__pull_request_read` with method `get_status` to get:
- CI check status (passing/failing/pending)
- Review status (approved/changes requested/pending)

## Step 4: Fetch Linear Issue

Extract the identifier (`[A-Z]+-\d+`) from the branch name.

Call `mcp__linear-server__get_issue` → state, team ID.

## Step 5: Confirm with User

Use `AskUserQuestion` to show the merge summary and ask for confirmation:

**Question:** "Merge PR #<number> into <base>?"

Show in the question context:
- PR: #<number> — <title>
- Base: <base branch>
- Method: <squash/rebase/merge>
- Checks: <status>
- Reviews: <status>

**Options:**
- "Yes, merge" — proceed
- "No, cancel" — abort

If checks are failing, include a warning in the description.

If the user cancels → "No changes made." Stop.

## Step 6: Merge

Call `mcp__github__merge_pull_request` with:
- `owner`, `repo`
- `pullNumber`
- `merge_method`: the chosen method

If merge fails (conflicts, branch protection) → print the error and stop.

## Step 7: Update Linear Status (Safety Net)

Call `mcp__linear-server__list_issue_statuses` with the team ID from the issue. Find the "Done" status.

Call `mcp__linear-server__update_issue` to set the issue state to "Done".

This is a safety net — the GitHub integration usually handles this, but we set it explicitly to ensure the loop is closed. If the update fails → warn but continue.

## Step 8: Clean Up Branch

Run via Bash:
```
git checkout development && git pull && git branch -d <branch>
```

If branch deletion fails (e.g., unmerged commits warning) → warn but continue.

## Step 9: Display Summary

```
## Merged <IDENTIFIER>: <title>

**PR:** #<number> merged into <base> via <method>
**Linear:** <identifier> → Done
**Branch:** <branch> deleted

✓ Workflow complete.
```
