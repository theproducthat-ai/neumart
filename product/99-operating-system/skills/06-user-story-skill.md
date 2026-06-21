# Skill 06 — User Story Writing

## Skill Name
User Story Writing

## Purpose
Break an approved PRD into discrete, testable user stories with acceptance criteria, business rules, validations, dependencies, and test cases. Each story must be independently deliverable and traceable to the PRD and request.

## When to Use
- After PRD is approved (G4 gate passed)
- When invoked via `/product-stories`
- Never before PRD approval. Never without a PRD.

## Inputs Expected
- PRD ID (e.g. `PRD-0003`)
- Approved PRD document
- REQ ID for traceability

## Files to Read First
1. `product/07-prd/approved-prds/PRD-NNNN.md` — approved PRD
2. `product/08-user-stories/USER_STORY_TEMPLATE.md`
3. `product/08-user-stories/ACCEPTANCE_CRITERIA_TEMPLATE.md`
4. `product/08-user-stories/stories/US-template.md`
5. `product/01-product-architecture/SCREEN_REGISTRY.md`
6. `product/01-product-architecture/ROLE_PERMISSION_MAP.md`
7. `product/00-product-foundation/MASTER_REGISTRY.md`

## Auto-ID Rules
- User story documents use ID: `US-NNNN`
- Read `MASTER_REGISTRY.md` to get the next US ID
- Format: `US-NNNN` (4-digit zero-padded)
- Assign sequential IDs for each story in the batch (US-0010, US-0011, US-0012, etc.)
- One file per story. Multiple stories per PRD is expected.
- Link PRD ID and REQ ID in every story header

## Reference Material Handling
- Reference material is not re-collected at this stage
- All requirements come from the approved PRD
- Do not add requirements not in the PRD to user stories

## Natural-Language Classification Rules
Not applicable. Stories are derived from the PRD, not classified.

## Module Hierarchy Mapping
- Each story must state Module, Sub-module, Feature
- Use exact names from the approved PRD (which was already aligned to `MODULE_MASTER.md`)

## Screen ID Handling
- Every story that involves a user-facing screen must reference the Screen ID from `SCREEN_REGISTRY.md`
- Screen IDs were assigned during PRD — use those, do not assign new ones here
- If a story requires a screen that has no ID yet, flag this as a gap before proceeding

## Request Status Handling
- Update status to `User Stories In Progress` when story writing begins
- Update to `User Stories Complete` when all stories are written
- Gate: do not begin development plan until user reviews stories (part of G4/G5 gate flow)

## Incomplete Request Tracking
- If the PRD has `[TBD]` sections that affect a story, mark that story `[BLOCKED — Pending PRD Clarification]`
- Update `INCOMPLETE_WORK_TRACKER.md` with the specific blocking question
- Do not write empty or placeholder stories

## Output Files to Create
| File | Path | Note |
|---|---|---|
| User story | `product/08-user-stories/stories/US-NNNN.md` | One file per story |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | US row: Last Used ID, Next ID (update after each batch) |
| `REQUEST_REGISTER.md` | Update status, add US IDs |
| `ACTIVE_REQUESTS.md` | Update stage, next step, list US IDs |
| `INCOMPLETE_WORK_TRACKER.md` | Add if any story is blocked or incomplete |

## Stop Condition
Stop after presenting all stories for review. Do not begin development planning until the user reviews the stories.

Ask: "Do you want me to proceed to the next step?"

## Guardrails
- Do not change application code
- Do not write development plans or coding prompts during story writing
- Do not invent requirements not in the approved PRD
- Do not write mega-stories — break large features into small, independently testable stories
- Do not skip acceptance criteria for any story
- Do not skip test cases for any story
- Do not write a story that references a screen with no Screen ID

## Definition of Done
- [ ] PRD reviewed and all functional requirements mapped to stories
- [ ] Stories written in `As a [role], I want [action], so that [value]` format
- [ ] Every story has: Acceptance Criteria, Business Rules, Validations, Dependencies, Test Cases
- [ ] Every story references its Screen ID (if applicable)
- [ ] Every story links back to PRD ID and REQ ID
- [ ] All `US-NNNN.md` files created in `product/08-user-stories/stories/`
- [ ] `MASTER_REGISTRY.md` updated
- [ ] `REQUEST_REGISTER.md` status updated to `User Stories Complete`
- [ ] `ACTIVE_REQUESTS.md` updated with US IDs

---

## User Story Required Sections

| Section | Content |
|---|---|
| Header | US ID, PRD ID, REQ ID, title, role, date, status |
| Story statement | As a [role], I want [action], so that [value] |
| Screen | Screen ID and screen name |
| Priority | Must-have / Should-have / Nice-to-have |
| Acceptance criteria | Numbered list of testable conditions (Given/When/Then format preferred) |
| Business rules | Specific rules that apply to this story |
| Validation rules | Field validations, error messages, edge case handling |
| Permissions | Who can perform this action |
| Dependencies | Other stories or features this story depends on |
| Out of scope | What this story explicitly does NOT handle |
| Test cases | Minimum 3: happy path, edge case, error case |
| Definition of Done | Checklist for the developer to verify completion |

---

## Story Sizing Guidelines

| Story Type | Description |
|---|---|
| Atomic story | Single user action with clear outcome (preferred) |
| Feature story | Multi-step flow for one role — split if more than 5 steps |
| Infrastructure story | Backend-only change with no UI (valid as a story) |
| Data story | Schema change, migration, seed data (must have its own story) |

---

*Last updated: 2026-06-21*
