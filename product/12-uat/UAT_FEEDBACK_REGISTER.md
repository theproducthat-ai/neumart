# UAT Feedback Register

Central log of all feedback, defects, and observations raised during UAT. Maintained across all UAT runs.

---

## How to Use

1. Add a row for every piece of feedback raised during any UAT session.
2. Classify each item: Defect / Enhancement / Observation / Question.
3. Defects must be resolved before release (unless accepted as known).
4. Enhancements and Observations are forwarded to the enhancement backlog.

---

## Feedback Types

| Type | Definition |
|---|---|
| Defect | Feature does not behave as specified in the PRD. Blocks UAT pass unless accepted. |
| Enhancement | Feature works correctly but business wants additional capability. Goes to backlog. |
| Observation | Business owner notes something interesting. Not blocking. |
| Question | Clarification needed on behaviour. Must be answered before UAT closes. |

---

## Active Feedback

| ID | UAT Run | Type | Title | Description | Status | Resolution |
|---|---|---|---|---|---|---|
| UFB-0001 | UAT-NNNN | Defect / Enhancement / Observation / Question | *(title)* | *(description)* | Open / Resolved / Accepted | *(resolution or "pending")* |

---

## Resolved Feedback

*(Move items here once resolved and confirmed by product owner.)*

| ID | UAT Run | Type | Title | Resolution | Resolved Date |
|---|---|---|---|---|---|
| UFB-0000 | UAT-NNNN | *(type)* | *(title)* | *(how resolved)* | YYYY-MM-DD |

---

## Enhancement Forwarded to Backlog

*(Enhancements raised during UAT that are not in scope for the current release.)*

| ID | Feature Request | Raised In | Priority | Status |
|---|---|---|---|---|
| UFB-0000 | *(description)* | UAT-NNNN | High / Medium / Low | Added to backlog / Pending |

---

*Last updated: 2026-06-21*
