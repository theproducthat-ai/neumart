# Request Template — How to Raise a New Request

Use `/product-request` to submit any request. Claude handles classification, ID assignment, module mapping, and file creation automatically.

**The user never needs to:**
- Choose a request type
- Specify a module or sub-module
- Look up a REQ ID
- Fill in this template manually

This template is Claude's reference for what to populate in each REQ file. The user only provides a natural-language description.

---

## When Claude Creates a REQ File

Claude creates a REQ file at `product/04-request-management/requests/REQ-NNNN.md` after:
1. The user submits a description via `/product-request`
2. Claude classifies the request (confidence ≥ Medium)
3. Claude reads the next REQ ID from MASTER_REGISTRY.md

---

## REQ File Structure (Claude's Reference)

```markdown
# REQ-NNNN — [Title inferred from user description]

**Date Raised:** YYYY-MM-DD  
**Raised By:** [User name or role]  
**Classification:** [From REQUEST_CLASSIFICATION_MATRIX.md — Claude assigns]  
**Classification Confidence:** High / Medium / Low  
**Secondary Flags:** Payment/Finance Impact | Inventory Impact | Schema Change | Security (if applicable)  
**Primary Module:** [Claude derives from MODULE_MASTER.md]  
**Sub-module:** [Claude derives from MODULE_MASTER.md]  
**Priority:** P0 | P1 | P2 | P3 | P4 [Claude suggests based on classification]  
**Owner:** [Name or role]  
**Current Status:** Under Classification

---

## Request Description

[User's natural language description, lightly cleaned up.]

---

## Why This Matters

[Inferred from description, or captured during grilling.]

---

## Who Is Affected

Customer / Admin / Both / System

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | Yes / No / Partial | |
| Screenshots provided | Yes / No | |
| Existing workflow / SOP | Yes / No | |
| Excel / report / reference file | Yes / No | |
| Email / stakeholder notes | Yes / No | |
| Competitor references | Yes / No | |
| Missing references | — | |
| Assumptions due to missing references | — | |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Impact |
|---|---|---|---|
| [Claude derives from SCREEN_REGISTRY.md] | | | |

---

## Acceptance Criteria

[Populated during PRD stage. Leave blank at intake.]

---

## Out of Scope

[Populated during grilling and PRD stage.]

---

## Open Questions

[Populated during grilling.]

---

## Linked Documents

| Type | ID | File |
|---|---|---|
| Grilling | GRILLING-NNNN | `05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md` |
| Evaluation | — | — |
| Impact Assessment | — | — |
| PRD | — | — |
| User Stories | — | — |
| Dev Plan | — | — |
| QA | — | — |
| UAT | — | — |
| Release | — | — |

---

## Status History

| Date | Status | Notes |
|---|---|---|
| YYYY-MM-DD | Under Classification | Request received via /product-request |
```

---

## After Creating a REQ File

1. Update `MASTER_REGISTRY.md` — Last Used ID and Next ID for REQ.
2. Add row to `REQUEST_REGISTER.md` with status `Under Classification`.
3. Proceed to grilling (Skill 01 → Skill 02 per SESSION_FLOW_RULES.md).

---

*Last updated: 2026-06-21*
