# Branch Naming Convention

## Format

```
<prefix>/<identifier>-<slug>
```

## Prefixes

| Type | Prefix |
|------|--------|
| New feature | `feature/` |
| Bug fix | `fix/` |
| Chore/maintenance | `chore/` |
| Refactor | `refactor/` |

Default to `feature/` when the issue type is unclear.

## Identifier

The Linear issue identifier exactly as-is: `[A-Z]+-\d+` (e.g., `ENG-123`, `DES-45`).

## Slug

Derive from the issue title:

1. Lowercase the title
2. Replace non-alphanumeric characters with hyphens
3. Collapse consecutive hyphens
4. Trim leading/trailing hyphens
5. Truncate to 50 characters (at word boundary)

## Examples

| Issue | Title | Branch |
|-------|-------|--------|
| ENG-123 | Add user authentication | `feature/ENG-123-add-user-authentication` |
| ENG-456 | Fix login crash on iOS | `fix/ENG-456-fix-login-crash-on-ios` |
| DES-78 | Update color tokens | `chore/DES-78-update-color-tokens` |
| ENG-90 | Refactor API client | `refactor/ENG-90-refactor-api-client` |
