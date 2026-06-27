# AI Coding Guardrails — Nuemart

Rules for AI assistants (Claude Code, Copilot, Cursor, etc.) when writing or suggesting code for this project. These override any default AI behaviour.

---

## Before Proposing Any Implementation

The AI must check the following before generating code:

1. **Tech stack** — confirm the proposed solution uses the approved stack (`TECH_STACK.md`). Do not introduce new libraries or frameworks.
2. **Architecture principles** — confirm the approach follows `ARCHITECTURE_PRINCIPLES.md`. Do not propose a separate API server, use Redux, or bypass Convex.
3. **Relevant guardrails** — read the applicable guardrail file before proposing:
   - Frontend work → `FRONTEND_GUARDRAILS.md`
   - Backend/Convex work → `BACKEND_GUARDRAILS.md`
   - Database changes → `DATABASE_GUARDRAILS.md`
   - Auth changes → `AUTH_GUARDRAILS.md`
   - Payment/API integration → `API_AND_INTEGRATION_GUARDRAILS.md`
   - Security-sensitive changes → `SECURITY_GUARDRAILS.md`

---

## Code Generation Rules

- Do not add new `npm`/`pnpm` packages without flagging it explicitly and getting confirmation.
- Do not modify `convex/schema.ts` without flagging it as a schema change requiring approval.
- Do not add `any` types. Use proper TypeScript types.
- Do not add `// TODO` or `// FIXME` comments — capture these as product objects instead.
- Do not add commented-out code.
- Do not generate boilerplate that is not required by the task.
- Do not introduce abstractions beyond what the task requires.
- Do not add error handling for scenarios that cannot happen (trust Convex validators, TypeScript, Clerk).

## When Asked to Add a Feature

1. Check if the feature has a REQ or FEA object. If not, suggest creating one first.
2. Check if a PRD exists. If not, note that design/scope may not be defined.
3. Identify affected files before writing code.
4. Propose the minimal implementation that satisfies the requirement.
5. Flag any performance, security, or cost concerns before implementing.

## When Asked to Fix a Bug

1. Reproduce the bug in code before proposing a fix.
2. Identify the root cause. Do not patch symptoms.
3. Check if the bug has a BUG object. If not, suggest creating one.
4. Fix only the bug. Do not refactor surrounding code.

## When Asked to Modify the Database

State explicitly:
- Which tables are affected.
- Whether existing data needs migration.
- Whether indexes need updating.
- Whether approval is required per `DATABASE_GUARDRAILS.md`.

Then wait for confirmation before writing schema changes.

## When Asked to Add an Integration

Check `API_AND_INTEGRATION_GUARDRAILS.md` and state:
- Where the integration call will live (must be Convex action).
- How secrets will be stored.
- How errors will be handled.
- Whether an API contract object is needed.

## Disallowed Without Explicit Approval

- Adding a new pnpm dependency.
- Modifying `convex/schema.ts`.
- Adding a new Next.js API route (non-webhook).
- Changing Clerk configuration.
- Adding inline `eslint-disable` or `ts-ignore`.
- Removing a TypeScript strict mode setting.

---

## Related
- `TECH_STACK.md`
- `ARCHITECTURE_PRINCIPLES.md`
- `CODING_STANDARDS.md`
- All other guardrail files in `product/technical-framework/`
