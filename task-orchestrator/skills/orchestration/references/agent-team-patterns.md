# Agent Team Patterns

## Table of Contents
- [Team Composition Patterns](#team-composition-patterns)
- [Task Distribution Strategies](#task-distribution-strategies)
- [Communication Protocols](#communication-protocols)
- [File Ownership Enforcement](#file-ownership-enforcement)
- [Integration Patterns](#integration-patterns)
- [Failure Recovery](#failure-recovery)

Detailed patterns for coordinating agent teams on complex multi-area tasks.

## Team Composition Patterns

### Full-Stack Team

**Best for**: Features spanning frontend and backend with API contracts.

```
Team Lead (orchestrator)
├── frontend-dev    → owns src/components/, src/pages/, src/styles/
├── backend-dev     → owns src/api/, src/services/, src/models/
└── test-writer     → owns tests/ (spawned after implementation)
```

Typical size: 2-3 teammates.

### Module Team

**Best for**: Multi-module changes where each module is independent.

```
Team Lead (orchestrator)
├── module-a-dev    → owns src/module-a/
├── module-b-dev    → owns src/module-b/
├── module-c-dev    → owns src/module-c/
└── integrator      → owns src/shared/, wires modules together (spawned after modules complete)
```

Typical size: 3-5 teammates.

### Layer Team

**Best for**: Changes across architectural layers (data, business, presentation).

```
Team Lead (orchestrator)
├── data-layer-dev      → owns src/db/, src/repositories/
├── business-logic-dev  → owns src/services/, src/domain/
└── presentation-dev    → owns src/controllers/, src/views/
```

Typical size: 2-3 teammates.

### Specialist Team

**Best for**: Tasks requiring different expertise domains.

```
Team Lead (orchestrator)
├── api-dev         → owns API routes and middleware
├── auth-dev        → owns authentication and authorization
└── infra-dev       → owns configuration, deployment, CI/CD
```

Typical size: 2-4 teammates.

## Task Distribution Strategies

### Static Assignment

Assign all tasks upfront based on file ownership.

```
1. Analyze plan for all work items
2. Map each item to a file/directory owner
3. Create all tasks via TaskCreate
4. Assign owners via TaskUpdate
5. Spawn teammates — they find their tasks immediately
```

**Pros**: Clear ownership, no coordination overhead during execution.
**Cons**: Inflexible if scope changes mid-execution.

### Dynamic Claiming

Create tasks without owners, let teammates claim available work.

```
1. Create all tasks via TaskCreate (no owner set)
2. Spawn teammates with instructions to check TaskList
3. Teammates claim unblocked, unowned tasks via TaskUpdate
4. Lead monitors for conflicts or imbalance
```

**Pros**: Self-balancing, handles variable task sizes well.
**Cons**: Risk of claiming conflicts, needs clear file ownership rules.

### Phased Distribution

Distribute tasks in phases, with verification between phases.

```
Phase 1: Foundation tasks → assign to specialists
  ↓ verify
Phase 2: Feature tasks → assign based on Phase 1 results
  ↓ verify
Phase 3: Integration tasks → assign to integrator
  ↓ verify
```

**Pros**: Each phase validates before the next begins.
**Cons**: Slower than fully parallel execution.

## Communication Protocols

### Interface Contract

Teammates agree on interfaces before implementation.

```
1. Lead defines interface contracts in task descriptions
2. Teammate A implements provider side of contract
3. Teammate B implements consumer side of contract
4. Lead verifies contract compliance during integration
```

Example contract in task description:
```
## Interface Contract
Your API endpoint must:
- POST /api/items → accepts { name: string, quantity: number }
- Returns { id: string, created_at: string }
- Status 201 on success, 400 on validation error
```

### Request-Response

Teammates send messages when they need information.

```
Teammate A → SendMessage to Teammate B:
  "What format does your UserService.getUser() return?"

Teammate B → SendMessage to Teammate A:
  "Returns { id, name, email, role } — see src/services/user.ts:15"
```

Use sparingly — each message costs tokens and context.

### Broadcast

Lead sends information to all teammates at once.

```
Lead → SendMessage broadcast:
  "Shared types updated in src/types/index.ts. Pull latest before continuing."
```

**Only use for critical updates that affect all teammates.**

## File Ownership Enforcement

### Pre-Flight Check

Before spawning teammates, verify zero file overlap:

```
1. Extract all files each teammate will modify
2. Check for intersections between any two teammates
3. If overlap found:
   a. Reassign overlapping files to one teammate
   b. Or fall back to subagent mode
4. Document ownership in each teammate's prompt
```

### Runtime Detection

If a teammate reports needing to modify a file outside their ownership:

```
1. Teammate sends message to lead: "Need to modify shared/types.ts"
2. Lead checks if another teammate owns that file
3. Options:
   a. Ask current owner to make the change
   b. Transfer ownership for that file
   c. Queue the change for integration phase
```

### Shared File Protocol

For files that genuinely need multi-teammate input (types, config):

```
1. Designate ONE teammate as the shared file owner
2. Other teammates document their needs:
   "I need these types added to shared/types.ts:
    - interface OrderItem { ... }
    - type OrderStatus = 'pending' | 'shipped' | 'delivered'"
3. Owner incorporates all requests
4. OR: Handle all shared file changes in integration phase after teammates complete
```

## Integration Patterns

### Merge Point

All teammates complete independently, then lead integrates.

```
1. All teammates finish their areas
2. Lead verifies each area passes its own tests
3. Lead wires areas together (imports, routing, config)
4. Lead runs full integration tests
5. Lead fixes any integration issues
```

**Best for**: Module teams, loosely coupled areas.

### Incremental Integration

Integrate as each teammate completes.

```
1. Teammate A completes → lead integrates A's work
2. Teammate B completes → lead integrates B's work (with A already integrated)
3. Run tests after each integration step
```

**Best for**: Pipeline patterns, sequential dependencies.

### Contract Testing

Verify interfaces match before full integration.

```
1. Each teammate writes interface tests for their contracts
2. Lead runs contract tests: "Does A's output match B's expected input?"
3. Fix mismatches before proceeding to full integration
4. Run full integration suite
```

**Best for**: API-heavy systems, microservice-style architectures.

## Failure Recovery

### Teammate Task Failure

```
1. Teammate reports task failure via message or TaskUpdate
2. Lead evaluates:
   a. Retry: Send message with error context, teammate retries
   b. Reassign: Create new task for a different teammate
   c. Escalate: Lead handles the task directly
3. Check if failure blocks other teammates
4. Notify blocked teammates if needed
```

### Unresponsive Teammate

```
1. Check teammate's task status via TaskList
2. Send a direct message asking for status
3. If no response after reasonable time:
   a. Check if teammate's tasks are making progress
   b. Consider spawning a replacement teammate
   c. Reassign uncompleted tasks
```

### File Conflict Detection

```
1. Two teammates modified the same file (should never happen with proper ownership)
2. Immediately:
   a. Stop both teammates (SendMessage to pause)
   b. Check git status for conflicts
   c. Determine which change to keep
   d. Reassign file ownership to prevent recurrence
   e. Resume teammates
```

### Full Team Failure

If multiple teammates fail or the task proves too complex for team mode:

```
1. Shut down all teammates gracefully
2. Teammate cleanup
3. Fall back to subagent mode
4. Re-execute using standard orchestration
5. Document the failure for future reference
```
