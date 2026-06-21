# /product-stories — Slash Command Definition

Break an approved PRD into discrete, testable user stories.

---

## How to Use

```
/product-stories PRD-0003
/product-stories REQ-0003
/product-stories
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `PRD Approved` stage.

---

## Purpose

User stories translate the approved PRD into independently deliverable, testable units with acceptance criteria, business rules, validations, dependencies, and test cases. Every story traces back to a PRD and a REQ.

---

## When to Use

- After PRD is approved (G4 gate passed)
- Before development plan or coding prompt
- Never without an approved PRD

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm PRD ID and read the approved PRD and all linked upstream documents |
| 2 | Read `USER_STORY_TEMPLATE.md`, `ACCEPTANCE_CRITERIA_TEMPLATE.md`, `US-template.md` |
| 3 | Read `SCREEN_REGISTRY.md` and `ROLE_PERMISSION_MAP.md` |
| 4 | Identify the complete list of stories needed to cover all PRD requirements |
| 5 | Assign sequential US IDs from `MASTER_REGISTRY.md` |
| 6 | Write one `US-NNNN.md` file per story |
| 7 | Ensure every story references its Screen ID, PRD ID, and REQ ID |
| 8 | Update `MASTER_REGISTRY.md` |
| 9 | Update `REQUEST_REGISTER.md` and `ACTIVE_REQUESTS.md` with all US IDs |
| 10 | Present all stories for review |
| 11 | Recommend next step (development planning) |

---

## What Claude Never Asks the User

- US IDs (Claude generates sequentially)
- Screen IDs (already in PRD and Screen Registry)
- Which requirements need stories (Claude derives from PRD)
- The next step (Claude recommends it)

---

## Story Format

Every story uses the format:

```
As a [role], I want [action], so that [value].
```

And includes:
- Acceptance criteria (Given/When/Then preferred)
- Business rules specific to this story
- Validation rules
- Permission rules
- Dependencies on other stories
- Out of scope for this story
- Test cases (minimum: happy path, edge case, error case)
- Definition of Done checklist

---

## Story Sizing

| Type | Rule |
|---|---|
| Atomic story | Single user action with a clear outcome — preferred |
| Multi-step flow | Break into separate stories if more than 5 steps per role |
| Infrastructure story | Backend-only change — valid as a story |
| Schema story | Schema change or migration — must be its own story |

---

## Approval Gate

There is no hard gate after stories — the user reviews them and proceeds to dev planning when satisfied.

After presenting stories, Claude asks:
"Do you want me to proceed to the next step?"

---

## Guardrails

- Do not change application code
- Do not write development plans during story writing
- Do not invent requirements not in the approved PRD
- Do not write stories without acceptance criteria
- Do not write a story that references a screen with no Screen ID
- Do not skip test cases for any story

---

## Output Files Created

| File | Path |
|---|---|
| User story (one per story) | `product/08-user-stories/stories/US-NNNN.md` |

---

## Registers Updated

- `product/00-product-foundation/MASTER_REGISTRY.md`
- `product/04-request-management/REQUEST_REGISTER.md`
- `product/04-request-management/ACTIVE_REQUESTS.md`
- `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md` (if any story is blocked)

---

*Last updated: 2026-06-21*
