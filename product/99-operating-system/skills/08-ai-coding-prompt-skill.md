# Skill 08 — AI Coding Prompt

## Skill Name
AI Coding Prompt

## Purpose
Create a complete, safe, and tightly scoped AI coding prompt that a developer (or Claude Code) can use to implement an approved feature. The prompt must include context, implementation steps, guardrails, and a structured completion format. It must not allow scope creep, unrelated changes, or unsafe operations.

## When to Use
- After the development plan is approved (G5 gate passed)
- When invoked via `/product-build-prompt`
- Only after PRD, user stories, and dev plan are all complete and approved
- Never before dev plan approval. Never without full product traceability.

## Inputs Expected
- DEVPLAN ID (e.g. `DEVPLAN-0003`)
- PRD ID for reference
- US IDs for reference
- REQ ID for traceability

## Files to Read First
1. `product/09-development-planning/plans/DEVPLAN-NNNN.md`
2. `product/07-prd/approved-prds/PRD-NNNN.md`
3. `product/08-user-stories/stories/US-NNNN.md` (all stories)
4. `product/09-development-planning/AI_CODING_PROMPT_TEMPLATE.md`
5. `product/01-product-architecture/DATA_ENTITY_MAP.md`
6. `product/01-product-architecture/ROUTE_MAP.md`
7. `product/01-product-architecture/SCREEN_REGISTRY.md`
8. `product/00-product-foundation/MASTER_REGISTRY.md`

## Auto-ID Rules
- Coding prompt documents use the same DEVPLAN ID with suffix: `DEVPLAN-NNNN-coding-prompt.md`
- No separate ID series — the coding prompt is a companion to the DEVPLAN
- Store in `product/09-development-planning/plans/`

## Reference Material Handling
- Use PRD and dev plan as the source of truth
- Do not add product requirements not in the approved PRD
- Include a References section in the coding prompt listing all linked IDs

## Natural-Language Classification Rules
Not applicable. Coding prompt is derived from approved product documents.

## Module Hierarchy Mapping
- State the exact module, sub-module, and feature in the prompt context section
- Helps the AI coder understand what part of the system is being changed

## Screen ID Handling
- Reference Screen IDs from user stories in the coding prompt
- The AI coder must know which screens are in scope and which are not

## Request Status Handling
- Update status to `Coding Prompt Ready` when prompt is created
- The status should only move to `In Development` when a developer picks up the prompt
- Gate: coding prompt creation requires G5 approval (dev plan approved)

## Incomplete Request Tracking
- If dev plan has unresolved sections, the coding prompt must flag those as `[BLOCKED — Do Not Implement]`
- Do not create a coding prompt for a partial dev plan
- Update `INCOMPLETE_WORK_TRACKER.md` if prompt cannot be completed

## Output Files to Create
| File | Path |
|---|---|
| AI coding prompt | `product/09-development-planning/plans/DEVPLAN-NNNN-coding-prompt.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `REQUEST_REGISTER.md` | Update status to `Coding Prompt Ready` |
| `ACTIVE_REQUESTS.md` | Update stage to `Coding Prompt Ready`, add link |
| `INCOMPLETE_WORK_TRACKER.md` | Add if prompt has blocked sections |

## Stop Condition
Stop after creating the coding prompt. The prompt is a document for a developer to use — it is not an instruction for Claude to start coding.

Do NOT change application code when creating the coding prompt.

Ask: "Do you want me to proceed to the next step?"

## Guardrails
- Do NOT change application code at this stage
- Do NOT start implementing any feature when writing the coding prompt
- The coding prompt must explicitly state what is OUT OF SCOPE
- The coding prompt must include guardrails: what the AI coder must NOT do
- The coding prompt must include a structured completion format that the developer fills out
- The coding prompt must forbid changes to unrelated files
- The coding prompt must forbid changes to schema.ts unless explicitly approved in the dev plan
- The coding prompt must forbid dependency additions unless explicitly listed

## Definition of Done
- [ ] Coding prompt context section complete (what is being built, why, which module)
- [ ] In-scope section complete (exactly what must be implemented)
- [ ] Out-of-scope section complete (explicitly forbidden changes)
- [ ] Files likely impacted listed (from dev plan)
- [ ] Backend implementation steps listed
- [ ] Frontend implementation steps listed
- [ ] Admin implementation steps listed (if applicable)
- [ ] Data integrity rules listed
- [ ] Security guardrails listed
- [ ] Verification commands listed (build, lint, type check)
- [ ] Manual test steps listed
- [ ] Completion response format defined (developer must fill out)
- [ ] `DEVPLAN-NNNN-coding-prompt.md` created
- [ ] `REQUEST_REGISTER.md` status updated to `Coding Prompt Ready`
- [ ] `ACTIVE_REQUESTS.md` updated

---

## Coding Prompt Required Sections

| Section | Content |
|---|---|
| Header | DEVPLAN ID, PRD ID, US IDs, REQ ID, date, status |
| Context | What is being built, which module, why it exists |
| In scope | Exact list of what must be implemented |
| Out of scope | Explicit list of what must NOT be changed |
| Files likely impacted | File paths from dev plan |
| Backend instructions | Step-by-step Convex implementation |
| Frontend instructions — Customer | Customer-facing implementation steps |
| Frontend instructions — Admin | Admin-facing implementation steps |
| Schema instructions | Any schema.ts changes (only if dev plan approved them) |
| Data integrity rules | Invariants that must not be broken |
| Guardrails | What the AI coder must never do |
| Security rules | Auth checks, permission checks, input validation |
| Verification commands | `npx tsc --noEmit`, `pnpm build`, `npx convex dev` |
| Manual tests | Step-by-step test cases from user stories |
| Completion format | Structured response the developer must return when done |

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

*Last updated: 2026-06-21*
