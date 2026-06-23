# Nuemart Product OS — Product Stories Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-stories`

---

## Purpose
Break down an approved PRD into a complete set of User Story Objects with acceptance criteria, development notes, test coverage requirements, and recommended story sequence. Stories are the primary unit of work for development and the primary target for test case generation.

---

## Triggered By
- User types `/product-stories <PRD-ID>` or `/product-stories <FEATURE-ID>`.
- Automatically recommended by `/product-prd` once the PRD is approved.
- Product owner or tech lead requests story breakdown.

---

## Pre-conditions
- PRD Object must exist with `approval_status: Approved`.
- If PRD status is `Draft` or `Pending Approval`, AI surfaces this and asks to confirm if the user wishes to proceed with unreviewed requirements.

---

## Inputs
- PRD Object ID or Feature Object ID
- Optional: development approach preferences (e.g., "mobile-first", "API first")
- Optional: team capacity context (to help with story sizing)

---

## AI Reasoning Steps

1. **Load the PRD Object.** Read all requirements, acceptance criteria, business rules, data requirements, UX requirements, non-functional requirements, and out-of-scope definitions.

2. **Identify all user roles involved.** For each role in the PRD: what is their primary interaction with this feature? Each distinct user role × primary behavior = a candidate story.

3. **Draft story candidates.** For each requirement in the PRD:
   - Write a user story in format: `As a [role], I want [goal], so that [benefit]`
   - Identify the story type: User-facing / System / Background / Admin
   - Map to the requirement that sources it

4. **Merge or split stories.** If two story candidates are too tightly coupled to be done independently, merge. If one story covers too many acceptance criteria to be a single unit of work, split.

5. **Write acceptance criteria for each story.** Pull from PRD acceptance criteria. Add edge cases and error path criteria not explicitly stated in PRD. Minimum 2 acceptance criteria per story, maximum 7.

6. **Add development notes.** For each story: note the primary file or component affected, any API or schema change required, and any dependency on another story.

7. **Assign test coverage requirements.** For each story: identify the minimum test types required (Happy Path / Error Path / Edge Case / Regression / Mobile). This pre-authorizes test case creation in `/product-qa`.

8. **Sequence the stories.** Order stories by:
   - Dependency order (upstream stories first)
   - Foundation before feature (data schema → API → UI)
   - Core user path before edge cases
   - Happy path before error path

9. **Identify story dependencies.** For any story that cannot begin until another is complete, create a dependency link.

10. **Assign story IDs.** Format: `US-{NNNN}` incrementing from last known story ID. Assign sequentially in recommended delivery order.

11. **Create all Story Objects.** Write to `product/objects/stories/`.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| User Story Objects | `product/objects/stories/` | Created (one per story) |
| Development Task Objects | `product/objects/tasks/` | Created (optional, for complex stories) |
| Acceptance Criteria links | `product/objects/acceptance-criteria/` | Updated (linked to story) |
| Test coverage requirement notes | Embedded in Story Objects | Created |
| PRD Object | `product/objects/prds/` | Updated with story links |
| Feature Object | `product/objects/features/` | Updated with story links |

---

## Required Relationships Established

- `User Story → implements → Requirement Object`
- `User Story → specified_by → PRD Object`
- `User Story → delivers → Feature Object`
- `Acceptance Criterion → validates → User Story`
- `User Story → depends_on → User Story` (where sequenced dependencies exist)
- `PRD → has_stories → User Story Objects`

---

## Required Metadata Populated

On each Story Object:
- `story_id` — US-XXXX format
- `story_type` — User-facing / System / Background / Admin
- `story_format` — "As a [role], I want [goal], so that [benefit]"
- `acceptance_criteria` — numbered list (minimum 2)
- `test_coverage_required` — list of test types
- `linked_requirement` — Requirement Object ID
- `linked_feature` — Feature Object ID
- `linked_prd` — PRD Object ID
- `dev_task_refs` — list (empty until dev plan)
- `test_case_refs` — list (empty until QA run)
- `sequence` — delivery order position
- `status` — Draft

---

## Definition of Done

- [ ] All PRD requirements have at least one story
- [ ] All stories written in standard "As a / I want / So that" format
- [ ] All stories have at least 2 acceptance criteria
- [ ] All acceptance criteria are testable (specific, measurable, unambiguous)
- [ ] Stories sequenced in recommended delivery order
- [ ] Story dependencies documented
- [ ] Test coverage requirements specified per story
- [ ] Story Objects written to `product/objects/stories/`
- [ ] PRD Object updated with story count and IDs
- [ ] Feature Object updated with story links

---

## Output Format

```
STORY BREAKDOWN COMPLETE
========================
PRD:            [PRD-...]
Feature:        [FEATURE-...]
Stories Total:  {n}

STORY SEQUENCE:
(recommended delivery order)

[1] US-XXXX — [story title]
    As a [role], I want [goal], so that [benefit]
    Type: [User-facing / System / Background / Admin]
    Source: [REQ-...]
    Acceptance Criteria:
      1. [criterion]
      2. [criterion]
    Test Coverage Required: [Happy Path, Error Path, ...]
    Dev Note: [key implementation note]
    Depends On: [US-YYYY] (or: None)

[2] US-XXXX — [story title]
    ...

...

TOTAL ACCEPTANCE CRITERIA: {n}
STORIES NEEDING SCHEMA WORK: {n}
STORIES WITH DEPENDENCIES: {n}

NEXT ACTION:
→ /product-devplan to create development plan and AI coding prompt

Files written: product/objects/stories/{slug}.md × {n}
```

---

## Next Action Recommendation

| Condition | Recommended Next Command |
|---|---|
| Stories complete | `/product-devplan` |
| Stories require architecture decision | Get decision first, then `/product-devplan` |
| Story count very high (>15) | Consider splitting into phases, then `/product-devplan` per phase |

---

## Failure Conditions

- **PRD not approved:** AI warns and asks user to confirm proceeding with unapproved PRD. Notes any risks.
- **Requirements ambiguous after grilling:** AI writes the story to the best of its ability and flags the ambiguity in a dev note for human review.
- **Story cannot be written without architectural decision:** AI creates a decision candidate and pauses that story, continuing with unblocked stories.
- **Acceptance criteria conflict between requirements:** AI surfaces the conflict and asks product owner to resolve before finalizing affected stories.
