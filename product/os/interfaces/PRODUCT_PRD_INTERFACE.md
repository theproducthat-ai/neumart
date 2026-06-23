# Nuemart Product OS — Product PRD Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-prd`

---

## Purpose
Write the Product Requirements Document for a classified and grilled request. Create all Requirement Objects, Acceptance Criterion Objects, and Business Rule Objects. Link to Feature Object, screens, data entities, and user roles. Establish the formal specification that development and QA will execute against.

---

## Triggered By
- User types `/product-prd <REQUEST-ID>` or `/product-prd <FEATURE-ID>`.
- Automatically recommended by `/product-grill` when all blocking questions are resolved.
- Automatically recommended by `/product-impact` once the assessment is complete.

---

## Pre-conditions
- Request Object must exist with status `Grilled` or higher.
- For high-risk requests (schema change, payment, auth flags): Impact Assessment Object must exist.
- Discovery Session preferred. If missing for complex requests, AI notes confidence reduction.
- No unresolved blocking decisions.

---

## Inputs
- Request Object ID or Feature Object ID
- Optional: specific requirements to emphasize or expand
- Optional: reference to competing or related PRDs

---

## AI Reasoning Steps

1. **Load all upstream objects.** Read: Request Object, Discovery Session, Impact Assessment, all linked Open Question Objects (resolved), Assumption Objects, Risk Objects, Feature Object.

2. **Establish document identity.** Assign PRD ID using format `PRD-{AREA}-{MODULE}-{SLUG}-{VERSION}`. Link to parent Feature Object.

3. **Write Background section.** Summarize the product context, why this need exists now, and what triggered the request.

4. **Write Problem Statement.** Articulate the user or business problem in clear, stakeholder-friendly language. Draw from grilling outputs.

5. **Write Business Objective.** State the measurable business outcome this PRD aims to achieve.

6. **Define Users and Personas.** Identify all user roles touched by this feature. For each: role name, what they do today, what changes for them.

7. **Define In-Scope requirements.** For each functional requirement:
   - Write as a testable statement
   - Assign priority: Must Have / Should Have / Nice to Have
   - Create a Requirement Object
   - Write acceptance criteria (minimum 2 per requirement)
   - Create Acceptance Criterion Objects

8. **Define Data Requirements.** Enumerate all data entities read or written. For schema changes: specify field names, types, defaults, and validation rules.

9. **Define UX/UI Requirements.** For each affected screen: describe the expected user-facing behavior. Reference existing screen names from product hierarchy (PLP, PDP, CART, CHK, ADDR, FAV, ORDHIS).

10. **Define Business Rules.** For each rule governing behavior (e.g., minimum order, role permissions, pricing logic): create a Rule Object with a unique rule ID.

11. **Define Non-functional Requirements.** State expectations for performance, mobile responsiveness, accessibility, and error handling relevant to this feature.

12. **Write Acceptance Criteria summary.** List all acceptance criteria with their IDs and the requirement they belong to.

13. **Define Out of Scope.** Explicitly list everything that was discussed but will not be delivered. Each item should have a brief rationale and ideally a future consideration note.

14. **Write Decision Log.** Record all decisions made during grilling and evaluation that affect this PRD.

15. **Surface Open Questions (if any remain).** List any questions that could not be resolved and may affect specific requirements. Do not block PRD creation, but flag these clearly.

16. **Write Future Considerations.** Note features or enhancements that could logically follow this work.

17. **Create the PRD Object.** Write to `product/objects/prds/`.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| PRD Object | `product/objects/prds/` | Created |
| Requirement Objects | `product/objects/requirements/` | Created (one per requirement) |
| Acceptance Criterion Objects | `product/objects/acceptance-criteria/` | Created (one per criterion) |
| Rule Objects | `product/objects/rules/` | Created (one per business rule) |
| Out-of-Scope Objects | Embedded in PRD | Created |
| Decision Objects | `product/objects/decisions/` | Created (one per decision logged) |
| Feature Object | `product/objects/features/` | Updated with PRD link |

---

## Required Relationships Established

- `PRD → specifies → Feature Object`
- `PRD → sourced_from → Request Object`
- `PRD → incorporates → Discovery Session`
- `Requirement → specified_in → PRD`
- `Acceptance Criterion → validates → Requirement`
- `Rule → governs → Feature Object`
- `PRD → addresses → Open Question Objects` (resolved)
- `Feature Object → has_prd → PRD`

---

## Required Metadata Populated

On the PRD Object:
- `prd_id` — semantic ID
- `prd_version` — starts at `1.0`
- `source_request` — Request Object ID
- `linked_feature` — Feature Object ID
- `approval_status` — Draft → Pending Approval → Approved
- `approver` — Product Owner (name or role)
- `requirements_count` — total
- `must_have_count` — Must Have requirements
- `acceptance_criteria_count` — total
- `rules_count` — total
- `schema_change_required` — boolean (from Impact Assessment)
- `status` — Draft

---

## Definition of Done

- [ ] Background, Problem Statement, and Business Objective written
- [ ] All users and personas identified
- [ ] All in-scope requirements written as testable statements
- [ ] All must-have requirements have at least 2 acceptance criteria
- [ ] Data requirements specified (schema changes documented)
- [ ] All affected screens mapped with expected behaviors
- [ ] All business rules created as Rule Objects
- [ ] Non-functional requirements stated
- [ ] Out-of-scope section complete (minimum 3 items or explicit "None" with rationale)
- [ ] Decision Log populated
- [ ] PRD Object written to `product/objects/prds/`
- [ ] Feature Object updated with PRD link
- [ ] Approval status set to `Draft` awaiting product owner review

---

## Output Format

```
PRD COMPLETE
============
PRD ID:           [PRD-...]
Version:          [1.0]
Linked Feature:   [FEATURE-...]
Source Request:   [REQUEST-...]
Status:           Draft — Pending Approval

REQUIREMENTS ({n} total):
  Must Have:      {n}
  Should Have:    {n}
  Nice to Have:   {n}

ACCEPTANCE CRITERIA: {n} total
BUSINESS RULES:      {n} created
SCHEMA CHANGES:      [YES — {n} entities | NO]

OUT OF SCOPE ({n} items):
- [item 1]
- [item 2]

OPEN QUESTIONS REMAINING (if any):
- [question] — flagged in PRD Section X

DECISIONS LOGGED ({n}):
- [DECISION-...] — [brief description]

NEXT STEPS:
1. Product Owner review and approval of PRD
2. Once approved → /product-stories to break into user stories

File written: product/objects/prds/{slug}.md
```

---

## Next Action Recommendation

| Condition | Recommended Next Command |
|---|---|
| PRD Draft written | Await product owner approval, then `/product-stories` |
| Schema changes documented | Ensure dev team reviews schema section before approval |
| Complex business rules | Ensure stakeholder validates Rule Objects |
| PRD approved | `/product-stories` |

---

## Failure Conditions

- **Missing grilling:** AI flags confidence as `Reduced` and lists what should have been resolved in grilling. Proceeds with current information.
- **Conflicting requirements detected:** AI surfaces the conflict, proposes resolution options, and waits for product owner decision before finalizing.
- **Impact assessment missing for high-risk request:** AI blocks PRD creation and instructs user to run `/product-impact` first.
- **Feature Object does not exist:** AI creates it inline and continues.
