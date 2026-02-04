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

        # Output status message (will be shown to user if hook blocks)
        echo "## Orchestration In Progress"
        echo ""
        echo "**Task**: $TASK_DESC"
        echo "**Type**: $TASK_TYPE"
        echo "**Status**: $STATUS"
        echo ""
        echo "### Progress"
        echo "- Completed: $COMPLETED / $TOTAL"
        echo "- In Progress: $IN_PROGRESS"
        echo "- Failed: $FAILED"
        echo "- Pending: $PENDING"
        echo ""

        if [ "$PENDING" -gt 0 ] || [ "$IN_PROGRESS" -gt 0 ]; then
            echo "### Action Required"
            echo "Orchestration is not complete. Continue processing remaining chunks."
            echo ""
            echo "To check detailed status: /orchestrate-status --verbose"
            echo "To force exit: Update state file status to 'complete' or 'aborted'"

            # Block exit - orchestration should continue
            # Return non-zero to indicate hook wants to block
            # (Depends on how Claude Code handles hook exit codes)
            exit 1
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
