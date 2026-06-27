# Backend Guardrails — Nuemart

Rules for all Convex backend development.

---

## Convex Function Types

| Type | Use For | Rules |
|------|---------|-------|
| `query` | Read data from Convex DB | No side effects. Always declare args with validators. |
| `mutation` | Write data to Convex DB | Validate inputs. Return minimal data. |
| `action` | Call external APIs (Razorpay, email, etc.) | No direct DB reads — call `runQuery`/`runMutation` instead. |
| `httpAction` | Webhooks from Clerk, Razorpay | Validate webhook signature before processing. |

## Function Design Rules

- Always declare argument validators using Convex validator helpers (`v.string()`, `v.id("table")`, etc.). Never accept unvalidated input.
- Functions must be small and single-purpose. If a function exceeds 60 lines, consider splitting.
- Queries must be deterministic. No `Math.random()`, no `Date.now()` in queries.
- Mutations must be idempotent where possible. Design for retries.
- Never access the DB directly from an action — use `ctx.runQuery` and `ctx.runMutation`.

## Schema Rules

- All tables must be defined in `convex/schema.ts`.
- Add indexes for every field used in `.filter()` or `.withIndex()` queries.
- Never add a new table or modify an existing table's schema without:
  1. Creating a `data-migrations` object if existing data must be migrated.
  2. Explicit product/engineering approval.
- Avoid storing sensitive data (passwords, payment card details) in Convex. Store tokens/references only.

## Auth in Convex

- Use `ctx.auth.getUserIdentity()` to get the authenticated user's Clerk identity.
- Always check identity in mutations that modify user-owned data.
- Do not trust client-passed user IDs. Always derive identity from `ctx.auth`.

## Error Handling

- Throw `ConvexError` (from `"convex/values"`) for business logic errors (e.g., item out of stock).
- Use standard JS `Error` for unexpected internal errors.
- Never leak internal error details to the client.
- Log meaningful context with errors using `console.error` in actions (Convex captures these).

## Naming Conventions

- File names: `camelCase.ts` (e.g., `products.ts`, `orderItems.ts`).
- Exported function names: `camelCase` (e.g., `getProductById`, `createOrder`).
- Internal helpers: prefix with `_` (e.g., `_validateStock`).

## Pagination

- All list queries that can return more than 20 items must use `paginationOptsValidator`.
- Never return unbounded arrays from production queries.

## Background Jobs

- Use Convex scheduled functions for deferred or recurring work.
- Do not rely on client-side polling for time-sensitive operations.

---

## Related
- `DATABASE_GUARDRAILS.md`
- `AUTH_GUARDRAILS.md`
- `API_AND_INTEGRATION_GUARDRAILS.md`
- `SECURITY_GUARDRAILS.md`
