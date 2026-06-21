# AI Coding Prompt Template

This template defines how to write AI coding prompts for Nuemart development tasks. Every DEVPLAN produces a corresponding `DEVPLAN-NNNN-coding-prompt.md` file. Claude writes this file from the dev plan.

---

## Rule: Coding Prompts Are Derived from Dev Plans

- Claude writes the coding prompt from the DEVPLAN file.
- The user does not need to write prompt content.
- The prompt file is saved at: `product/09-development-planning/plans/DEVPLAN-NNNN-coding-prompt.md`

---

## Coding Prompt File Structure

Every coding prompt must include the following sections in order:

```
1. Context
2. Scope
3. Out of Scope
4. Linked IDs
5. Screen IDs
6. Files Likely Impacted
7. Backend Instructions
8. Frontend Instructions (Customer)
9. Frontend Instructions (Admin)
10. Data Integrity Rules
11. Guardrails
12. Verification Commands
13. Manual Test Checklist
14. Completion Response Format
```

---

## Section Definitions

### 1. Context

Provide the full background so the developer or AI assistant has no ambiguity:
- What product area does this cover?
- What is the current state of the app in this area?
- What was decided in the PRD and impact assessment?
- Reference PRD ID, linked REQ ID, and DEVPLAN ID.

### 2. Scope

A bulleted list of exactly what must be built. Every item must be unambiguous.

### 3. Out of Scope

A bulleted list of things that must NOT be built in this session, even if they seem related. Prevents scope creep and unintended changes.

### 4. Linked IDs

| Type | ID |
|---|---|
| Request | REQ-NNNN |
| PRD | PRD-NNNN |
| DEVPLAN | DEVPLAN-NNNN |
| User Stories | US-NNNN, US-NNNN |

### 5. Screen IDs

| Screen ID | Screen Name | Route | Change |
|---|---|---|---|
| SCR-xxx-NNNN | *(name)* | `/route` | Modified / New |

### 6. Files Likely Impacted

List every file expected to change, grouped by:
- Convex backend (`neumart/convex/`)
- Next.js pages (`neumart/app/`)
- Next.js components (`neumart/components/`)
- Schema (`neumart/convex/schema.ts`)
- Other

### 7. Backend Instructions

Step-by-step instructions for Convex backend changes:
- New mutations: name, inputs, outputs, logic, error handling
- New queries: name, filters, sort order, return shape
- Schema changes: table name, field name, type, whether indexed
- HTTP actions: route, method, HMAC verification if payment webhook

### 8. Frontend Instructions (Customer)

Step-by-step instructions for customer-facing UI:
- Which page or component to create or modify
- What data to fetch (which Convex query)
- What mutations to call on which user action
- Loading state behaviour
- Empty state behaviour
- Error state behaviour
- Responsive layout expectations (mobile-first)

### 9. Frontend Instructions (Admin)

Step-by-step instructions for admin-facing UI:
- Which admin page or component to create or modify
- What data to fetch
- What mutations to call
- Role guard: must check `publicMetadata.role === "admin"` via Clerk
- Table, list, or form layout expectations

### 10. Data Integrity Rules

Critical rules that must never be violated:
- Stock must only be deducted after payment confirmation (if payment-related)
- Payments table must be written before redirecting customer
- Audit trail records must always be created for stock movements
- Idempotency: what happens if the same action is triggered twice
- No orphan records: if parent create fails, child must not be written

### 11. Guardrails

Things the developer must NOT do in this session:
- Do not modify unrelated files
- Do not add new environment variables without listing them in release plan
- Do not remove existing API routes
- Do not alter schema fields that other features depend on
- Do not change authentication logic
- Do not hardcode values that should come from env vars or database

### 12. Verification Commands

```bash
# TypeScript check
npx tsc --noEmit

# Convex dev (must run without errors)
npx convex dev

# Build check
pnpm build

# Lint
pnpm lint
```

### 13. Manual Test Checklist

A numbered list of manual test steps the developer must complete before marking development done:

- [ ] 1. [Test step — happy path]
- [ ] 2. [Test step — error case]
- [ ] 3. [Test step — admin action]
- [ ] 4. [Test step — customer action]
- [ ] 5. [Test step — edge case]

---

## Completion Response Format

When development is complete, the developer or AI must respond with exactly these 9 items:

```
## Completion Report

1. **Files changed:** [list every file modified or created]
2. **Convex functions written or modified:** [list function names and types]
3. **Schema changes:** [list tables and fields changed, or "none"]
4. **New environment variables required:** [list, or "none"]
5. **Acceptance criteria verified:** [list each AC with ✅ or ❌ and short note]
6. **Regression check performed:** [describe what was checked and outcome]
7. **Verification commands run:** [list commands and their pass/fail status]
8. **Manual test checklist completed:** [list items with ✅ or ❌]
9. **Blockers or notes for QA:** [anything QA should know, or "none"]
```

This format is mandatory. A development session is not complete without it.

---

## Coding Prompt File Naming

```
DEVPLAN-NNNN-coding-prompt.md
```

Saved in the same directory as the DEVPLAN file:
```
product/09-development-planning/plans/DEVPLAN-NNNN-coding-prompt.md
```

---

*Last updated: 2026-06-21*
