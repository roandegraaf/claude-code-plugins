#!/bin/bash

# Orchestrator Stop Hook
# This script runs when Claude attempts to stop/exit
# It checks if there's an active orchestration that needs to continue

STATE_FILE=".claude/orchestrator-state.json"

# Check if state file exists
if [ ! -f "$STATE_FILE" ]; then
    # No active orchestration, allow normal exit
    exit 0
fi

# Read state
STATE=$(cat "$STATE_FILE")
STATUS=$(echo "$STATE" | jq -r '.status // "unknown"')
EXECUTION_STRATEGY=$(echo "$STATE" | jq -r '.execution_strategy // "subagent"')
TEAM_NAME=$(echo "$STATE" | jq -r '.team_name // ""')

# Check if agent team mode is active
if [ "$EXECUTION_STRATEGY" = "team" ] && [ -n "$TEAM_NAME" ]; then
    echo "## Agent Team Active" >&2
    echo "" >&2
    echo "**Team**: $TEAM_NAME" >&2
    echo "**Strategy**: Agent Team mode" >&2
    echo "" >&2
    echo "### Action Required" >&2
    echo "You must shut down all teammates before stopping the orchestration." >&2
    echo "Use \`SendMessage shutdown_request\` to each teammate first." >&2
    echo "Then use \`Teammate cleanup\` to remove team resources." >&2
    echo "" >&2

    # Block exit - teammates must be shut down first
    exit 2
fi

# Check orchestration status
case "$STATUS" in
    "planning"|"executing"|"verifying")
        # Orchestration is in progress
        TOTAL=$(echo "$STATE" | jq -r '.progress.total_chunks // 0')
        COMPLETED=$(echo "$STATE" | jq -r '.progress.completed // 0')
        FAILED=$(echo "$STATE" | jq -r '.progress.failed // 0')
        IN_PROGRESS=$(echo "$STATE" | jq -r '.progress.in_progress // 0')
        PENDING=$((TOTAL - COMPLETED - FAILED - IN_PROGRESS))

        TASK_TYPE=$(echo "$STATE" | jq -r '.task_type // "unknown"')
        TASK_DESC=$(echo "$STATE" | jq -r '.task_description // "Unknown task"')

        # Output status message to stderr (shown to user when hook blocks)
        echo "## Orchestration In Progress" >&2
        echo "" >&2
        echo "**Task**: $TASK_DESC" >&2
        echo "**Type**: $TASK_TYPE" >&2
        echo "**Status**: $STATUS" >&2
        echo "" >&2
        echo "### Progress" >&2
        echo "- Completed: $COMPLETED / $TOTAL" >&2
        echo "- In Progress: $IN_PROGRESS" >&2
        echo "- Failed: $FAILED" >&2
        echo "- Pending: $PENDING" >&2
        echo "" >&2

        if [ "$PENDING" -gt 0 ] || [ "$IN_PROGRESS" -gt 0 ]; then
            echo "### Action Required" >&2
            echo "Orchestration is not complete. Continue processing remaining chunks." >&2
            echo "" >&2
            echo "To check detailed status: /orchestrate-status --verbose" >&2
            echo "To force exit: Update state file status to 'complete' or 'aborted'" >&2

            # Block exit - orchestration should continue
            # Exit code 2 = blocking hook in Claude Code
            exit 2
        fi
        ;;

    "complete")
        # Orchestration finished successfully
        echo "Orchestration completed successfully."
        exit 0
        ;;

    "failed"|"aborted")
        # Orchestration ended with issues
        echo "Orchestration ended with status: $STATUS"
        echo "Review .claude/orchestrator-state.json for details."
        exit 0
        ;;

    *)
        # Unknown status, allow exit
        exit 0
        ;;
esac
