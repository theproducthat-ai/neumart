# Nuemart Product OS — Product DevPlan Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-devplan`

---

## Purpose
Create a sequenced development plan for a feature, including phased task breakdown, implementation risks, rollback considerations, and a production-ready AI coding prompt. The dev plan is the handoff document between product specification and engineering execution.

---

## Triggered By
- User types `/product-devplan <FEATURE-ID>` or `/product-devplan <PRD-ID>`.
- Automatically recommended by `/product-stories` once stories are complete.

---

## Pre-conditions
- User Story Objects must exist with status `Approved` or `Draft-Confirmed`.
- PRD Object must be in `Approved` status (or explicitly waived by product owner).
- If stories are in `Draft` status, AI warns and asks for confirmation before proceeding.

---

## Inputs
- Feature Object ID or PRD Object ID
- Optional: preferred implementation approach, technology constraints
- Optional: phase breakdown preference (e.g., "split schema and UI into separate phases")
- Optional: estimated available developer hours

---

## AI Reasoning Steps

1. **Load all stories and requirements.** Read all User Story Objects, the PRD, the Impact Assessment (if exists), and any Dependency Objects.

2. **Identify task types.** Classify each story into implementation task categories:
   - Schema / Data Model tasks (Convex schema changes)
   - Backend tasks (Convex queries, mutations, actions)
   - API tasks (Next.js route handlers, server actions)
   - UI / Component tasks (React components, ShadCN integration)
   - Integration tasks (Clerk, Razorpay, third-party)
   - Configuration tasks (environment variables, feature flags)
   - Test setup tasks (test utilities, mocks)

3. **Apply implementation ordering.** Sequence tasks using the rule: Schema → Backend → API → UI → Integration → Polish. Within each layer, sequence by dependency. Never sequence a UI task before its backend API exists.

4. **Group tasks into phases.** Define logical development phases (e.g., Phase 1: Data layer; Phase 2: Core functionality; Phase 3: UI; Phase 4: Integration; Phase 5: Polish & Edge Cases).

5. **Write task descriptions.** For each task:
   - What file(s) are affected
   - What the task creates, modifies, or deletes
   - Which story it satisfies
   - What the acceptance condition is for "task done"
   - Dependencies (what must be done before this)

6. **Identify implementation risks.** For each phase: what could go wrong? What assumptions are being made? What external factors could delay this phase?

7. **Define rollback plan.** For each phase with schema changes or integration changes: define a rollback procedure. What would be done if this phase needs to be reverted?

8. **Write the AI Coding Prompt.** This is a self-contained, production-quality prompt that a developer or AI coding assistant can use to implement the feature. It must include:
   - Context: what the feature is and why it exists
   - Tech stack specifics: Next.js App Router, Convex, Clerk, ShadCN UI
   - Task list: sequenced implementation steps
   - File references: where to make changes
   - Acceptance conditions: how to know each step is done
   - Gotchas and constraints: what NOT to do, known edge cases
   - Testing instructions: how to verify locally

9. **Create the Development Plan Object.** Write to `product/objects/tasks/`.

10. **Create the AI Coding Prompt Object.** Write to `product/objects/prompts/`.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| Development Plan Object | `product/objects/tasks/` | Created |
| Task Objects | `product/objects/tasks/` | Created (one per task) |
| AI Coding Prompt Object | `product/objects/prompts/` | Created |
| Risk notes | Embedded in Development Plan | Created |
| Rollback considerations | Embedded in Development Plan | Created |
| User Story Objects | `product/objects/stories/` | Updated with task links |

---

## Required Relationships Established

- `Development Plan → implements → Feature Object`
- `Development Plan → derived_from → PRD Object`
- `Task → satisfies → User Story`
- `AI Coding Prompt → generated_for → Development Plan`
- `Development Plan → has_rollback → Rollback Plan notes`

---

## Required Metadata Populated

On the Development Plan Object:
- `plan_id` — semantic ID
- `linked_feature` — Feature Object ID
- `linked_prd` — PRD Object ID
- `phases_count` — number of phases
- `tasks_total` — total task count
- `stories_covered` — list of US-XXXX IDs
- `schema_changes_in_plan` — boolean
- `estimated_complexity` — S / M / L / XL
- `rollback_plan_exists` — boolean
- `ai_prompt_id` — AI Coding Prompt Object ID

On the AI Coding Prompt Object:
- `prompt_id` — semantic ID
- `linked_plan` — Development Plan Object ID
- `tech_stack` — explicit list
- `prompt_version` — 1.0

---

## Definition of Done

- [ ] All user stories have at least one task in the plan
- [ ] Tasks sequenced with layer ordering respected (Schema → Backend → API → UI → Integration)
- [ ] Phases clearly defined with phase goals stated
- [ ] Implementation risks documented per phase
- [ ] Rollback plan exists for any schema or integration phase
- [ ] AI Coding Prompt Object written with full context and task list
- [ ] Development Plan Object written to `product/objects/tasks/`
- [ ] AI Coding Prompt Object written to `product/objects/prompts/`
- [ ] All User Story Objects updated with task links

---

## Output Format

```
DEVELOPMENT PLAN COMPLETE
=========================
Plan ID:          [DEVPLAN-...]
Feature:          [FEATURE-...]
PRD:              [PRD-...]
Phases:           {n}
Tasks Total:      {n}
Stories Covered:  {n}
Schema Changes:   [YES / NO]
AI Prompt:        [PROMPT-...]

PHASE BREAKDOWN:

PHASE 1 — [Phase Name]
Goal: [what this phase delivers]
Tasks:
  [T-001] [task description] — satisfies [US-XXXX]
  [T-002] [task description] — satisfies [US-XXXX]
Risk: [risk note for this phase]
Rollback: [rollback procedure if applicable]

PHASE 2 — [Phase Name]
...

IMPLEMENTATION RISKS:
1. [risk] — Mitigation: [mitigation approach]
2. [risk] — Mitigation: [mitigation approach]

ROLLBACK SUMMARY:
- If Phase 1 must revert: [procedure]
- If Phase 3 must revert: [procedure]

AI CODING PROMPT:
→ See: product/objects/prompts/{slug}.md
   (Self-contained prompt ready for AI-assisted development)

NEXT ACTION:
→ Developer implements per plan, then /product-qa for test plan and QA run

Files written:
- product/objects/tasks/{slug}.md
- product/objects/prompts/{slug}.md
```

---

## Next Action Recommendation

| Condition | Recommended Next Command |
|---|---|
| Dev plan complete | Begin development using AI Coding Prompt |
| After development complete | `/product-qa` |
| Blocking technical decision identified | Resolve decision, update plan, then develop |

---

## Failure Conditions

- **Stories not found or in Draft status:** AI warns and requests confirmation to proceed.
- **Schema change in plan but no migration approach identified:** AI flags this as a blocking risk and notes it must be resolved before Phase 1 begins.
- **Dependency on another in-flight feature:** AI surfaces the dependency as a blocker and recommends coordination with the other feature's dev plan.
- **Story requirements conflict with known technical constraints:** AI surfaces the conflict, proposes resolution, and flags for product owner review before finalizing plan.
