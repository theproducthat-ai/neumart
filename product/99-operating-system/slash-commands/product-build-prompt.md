# /product-build-prompt — Slash Command Definition

Create the final, safe AI coding prompt for an approved development plan.

---

## How to Use

```
/product-build-prompt DEVPLAN-0003
/product-build-prompt REQ-0003
/product-build-prompt
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `Dev Plan Complete` stage.

---

## Purpose

The AI coding prompt is the handoff document between product approval and engineering implementation. It gives a developer (or Claude Code) everything needed to implement the feature safely: context, scope, guardrails, step-by-step instructions, and a required completion format.

---

## When to Use

- After the development plan is approved (G5 gate passed)
- Only after PRD, stories, and dev plan are all complete
- Never before dev plan approval

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm DEVPLAN ID and read the approved dev plan, PRD, and stories |
| 2 | Read `AI_CODING_PROMPT_TEMPLATE.md` |
| 3 | Write the context section (what is being built, which module, why) |
| 4 | Write the in-scope section (exact list of what must be implemented) |
| 5 | Write the out-of-scope section (explicit list of forbidden changes) |
| 6 | List files likely impacted (from dev plan) |
| 7 | Write backend implementation steps (Convex) |
| 8 | Write frontend implementation steps (customer-facing) |
| 9 | Write admin implementation steps (if applicable) |
| 10 | Write schema change steps (only if approved in dev plan) |
| 11 | List data integrity rules |
| 12 | List guardrails (what the AI coder must never do) |
| 13 | List security and permission checks required |
| 14 | List verification commands (`npx tsc --noEmit`, `pnpm build`, etc.) |
| 15 | List manual test steps from user stories |
| 16 | Include required completion response format |
| 17 | Create `DEVPLAN-NNNN-coding-prompt.md` |
| 18 | Update `REQUEST_REGISTER.md` and `ACTIVE_REQUESTS.md` to `Coding Prompt Ready` |

---

## What Claude Never Asks the User

- Which files to include (from dev plan)
- Which guardrails to add (Claude derives from scope and dev plan)
- The verification commands (Claude knows the standard stack)
- The completion format (it is fixed — see template)

---

## Critical Rule

**Creating the coding prompt is NOT the same as starting to code.**

This command creates a document. It does NOT change any application code.

The coding prompt is used by the developer (or a separate Claude Code session) to implement the feature.

---

## Approval Gate

There is no additional gate at prompt creation — G5 (dev plan approval) is the gate.

After creating the prompt, Claude presents it and asks:
"Do you want me to proceed to the next step?"

The next step is: developer uses the coding prompt to implement the feature.

---

## Completion Response Format (Required in Every Prompt)

The coding prompt must instruct the developer to return:

```
## Implementation Complete

**REQ ID:** REQ-NNNN
**DEVPLAN ID:** DEVPLAN-NNNN
**Stories implemented:** US-NNNN, US-NNNN

**Files changed:**
- [list every file changed]

**Files NOT changed:**
- [list any planned files that were skipped, with reason]

**Verification:**
- [ ] `npx tsc --noEmit` — pass/fail
- [ ] `pnpm build` — pass/fail
- [ ] Manual tests completed — pass/fail

**Known issues or deviations from plan:**
- [any differences from the dev plan, or "None"]
```

---

## Guardrails

- Do NOT change application code when creating this prompt
- The prompt must explicitly list what is out of scope
- The prompt must forbid changes to `schema.ts` unless explicitly approved in dev plan
- The prompt must forbid changes to unrelated files
- The prompt must forbid adding dependencies not listed in dev plan

---

## Output Files Created

| File | Path |
|---|---|
| AI coding prompt | `product/09-development-planning/plans/DEVPLAN-NNNN-coding-prompt.md` |

---

## Registers Updated

- `product/04-request-management/REQUEST_REGISTER.md`
- `product/04-request-management/ACTIVE_REQUESTS.md`
- `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md` (if any sections are blocked)

---

*Last updated: 2026-06-21*
