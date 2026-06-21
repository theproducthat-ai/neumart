# /product-grill — Slash Command Definition

Conduct deep requirement grilling on an intake-approved request.

---

## How to Use

```
/product-grill REQ-0003
/product-grill
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `Classification Complete` stage.

---

## Purpose

Grilling extracts all requirements, rules, validations, edge cases, user flows, data needs, and acceptance criteria before PRD writing begins. It ensures scope is fully understood and agreed before any engineering investment.

---

## When to Use

- After intake is complete (REQ ID exists, status is `Classification Complete`)
- Before evaluation, impact assessment, or PRD
- Whenever a request has unclear scope or missing requirements

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm REQ ID and read the request file |
| 2 | Read `GRILLING_QUESTION_BANK.md` and select relevant questions |
| 3 | Read `SCREEN_REGISTRY.md` and `ROLE_PERMISSION_MAP.md` for context |
| 4 | Assign next GRILLING ID from `MASTER_REGISTRY.md` |
| 5 | Present all grilling questions in grouped batches (not one by one) |
| 6 | Record answers as user responds |
| 7 | Mark unanswered questions `[UNANSWERED]` |
| 8 | Create `GRILLING-NNNN.md` with all Q&A, scope summary and MVP boundary |
| 9 | Present scope summary to user and ask for sign-off (G2 gate) |
| 10 | Update `REQUEST_REGISTER.md` and `ACTIVE_REQUESTS.md` |
| 11 | Update `MASTER_REGISTRY.md` |
| 12 | Recommend next step (evaluation or direct to PRD) |

---

## What Claude Never Asks the User

- The GRILLING ID (Claude generates it)
- Which questions to ask (Claude selects from the question bank)
- The MVP boundary (Claude proposes it; user confirms)
- The next step (Claude recommends it)

---

## Question Grouping

Claude groups questions by domain to make the grilling session efficient:

1. Problem and goals
2. Users and roles
3. User flows (step by step)
4. Business rules and constraints
5. Data requirements (create, read, update, delete)
6. Validations and error handling
7. Edge cases and failure scenarios
8. Reporting and analytics
9. Permissions and access control
10. Dependencies and prerequisites
11. Screens affected and new screens needed
12. Acceptance criteria

---

## Approval Gate

After presenting the scope summary, Claude must not proceed to evaluation or PRD without explicit user sign-off (G2 gate).

After scope sign-off, Claude asks:
"Do you want me to proceed to the next step?"

---

## Incomplete Grilling

If the user cannot answer critical questions:
- Mark them `[UNANSWERED]` in the GRILLING file
- Note in `ACTIVE_REQUESTS.md` which questions remain open
- If grilling cannot complete: add to `INCOMPLETE_WORK_TRACKER.md`

---

## Output Summary Format

```
**Grilling complete:** GRILLING-NNNN
**Request:** REQ-NNNN — [Title]
**Scope boundary:** [Summary of what is in scope]
**MVP boundary:** [What is in MVP vs future]
**Unanswered questions:** [Count] — [list titles]
**Next step:** [Evaluation / Direct to PRD / Impact Assessment]
```

---

## Guardrails

- Do not write the PRD during grilling
- Do not assign Screen IDs during grilling
- Do not change application code
- Do not skip the G2 scope sign-off
- Do not invent answers — only use what the user provides

---

## Output Files Created

| File | Path |
|---|---|
| Grilling document | `product/05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md` |

---

## Registers Updated

- `product/00-product-foundation/MASTER_REGISTRY.md`
- `product/04-request-management/REQUEST_REGISTER.md`
- `product/04-request-management/ACTIVE_REQUESTS.md`
- `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md` (if applicable)

---

*Last updated: 2026-06-21*
