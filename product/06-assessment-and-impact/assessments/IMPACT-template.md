# IMPACT-NNNN — [Request Title]

> Copy this template when starting an impact assessment. Replace NNNN with the linked REQ ID. Save as `IMPACT-NNNN.md`.
>
> **Auto-ID instruction:** The IMPACT ID matches the REQ ID. No separate registry entry needed. If REQ-0005 is being assessed, this file is IMPACT-0005.md.

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-NNNN | `04-request-management/requests/REQ-NNNN.md` |
| Grilling | GRILLING-NNNN | `05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md` |
| Evaluation | EVAL-NNNN | `02-roadmap/evaluations/EVAL-NNNN.md` *(if applicable)* |
| PRD | PRD-NNNN | *(populated after PRD is written)* |

---

## Status

**Assessment Status:** In Progress / Complete  
**Owner:** [Name or role]  
**Date Opened:** YYYY-MM-DD  
**Date Completed:** YYYY-MM-DD or —  
**Last Updated:** YYYY-MM-DD

---

## Current Blocker

> *(What is preventing this assessment from completing? If unblocked, write "None.")*

---

## Next Action

> *(What must happen next? e.g. "Approve Go recommendation and create PRD." Who is responsible?)*

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | |
| Sub-module | |
| Secondary Modules | |
| Screens Impacted | *(list Screen IDs)* |
| New Screens Required | Yes / No |
| Schema Change Required | Yes / No |
| Payment Logic Affected | Yes / No |
| Inventory Logic Affected | Yes / No |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Impact |
|---|---|---|---|
| SCR-xxx-NNNN | | `/route` | Modified / New / Deprecated |

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
| Missing references | — | *(what is still needed)* |
| Assumptions due to missing references | — | *(list assumptions)* |

---

## Business Impact

**Rating:** High / Medium / Low

> *(What is the business value? Does it open revenue, reduce cost, prevent churn, satisfy compliance?)*

---

## Customer Impact

**Rating:** Positive / Neutral / Negative

> *(How does the customer experience change?)*

---

## Admin Impact

**Rating:** Positive / Neutral / Negative

> *(How does the admin's workflow change?)*

---

## Operational Impact

**Rating:** High / Medium / Low

> *(Does day-to-day store operation change? New training or SOP needed?)*

---

## Technical Impact

**Rating:** High / Medium / Low

**Estimated complexity:** Days / Weeks / Months

> *(How complex is the engineering change?)*

---

## Data / Schema Impact

**Schema change required:** Yes / No  
**New tables:** *(list or "none")*  
**New fields on existing tables:** *(list or "none")*  
**New indexes:** *(list or "none")*  
**Migration/backfill required:** Yes / No  
**Notes:** *(describe)*

---

## Backend Impact

| Function | Type | Change |
|---|---|---|
| *(function name)* | Query / Mutation / Action / HTTP Action | Create / Modify / Delete |

---

## Frontend Impact

| File | Type | Change |
|---|---|---|
| *(file path)* | Page / Component / Hook / Layout | Create / Modify / Delete |

---

## Screen Impact

| Screen ID | Screen Name | Change |
|---|---|---|
| *(ID or "new")* | *(name)* | *(description of change)* |

---

## Role / Permission Impact

| Role | Change |
|---|---|
| Customer | *(new capability / no change / restricted)* |
| Admin | *(new capability / no change / restricted)* |
| *(other role)* | *(change)* |

---

## Payment Impact

**Payment logic affected:** Yes / No  
**Razorpay API call required:** Yes / No  
**Webhook change required:** Yes / No  
**payments table affected:** Yes / No  
**Notes:** *(describe)*

---

## Inventory Impact

**Stock reduction timing affected:** Yes / No  
**stockMovements audit trail affected:** Yes / No  
**Stock reservation required:** Yes / No  
**Notes:** *(describe)*

---

## Reporting Impact

> *(Does this add, change, or remove data that feeds existing reports or dashboard stats?)*

---

## Integration Impact

| Integration | Change |
|---|---|
| Razorpay | *(describe or "none")* |
| Clerk | *(describe or "none")* |
| Convex | *(describe or "none")* |
| *(other)* | *(describe)* |

---

## Security / Compliance Impact

**Authentication change:** Yes / No  
**Authorization change:** Yes / No  
**Sensitive data exposed:** Yes / No  
**Compliance implication:** Yes / No  
**Notes:** *(describe)*

---

## QA Impact

**Estimated test scenarios:** *(number)*  
**Existing regression tests affected:** Yes / No  
**Notes:** *(describe)*

---

## UAT Impact

**UAT scenarios required:** *(number)*  
**Estimated UAT duration:** *(hours / days)*  
**Notes:** *(describe)*

---

## Release Impact

**Environment variables required:** Yes / No — *(list)*  
**Schema migration required:** Yes / No  
**Deployment window needed:** Yes / No  
**Notes:** *(describe)*

---

## Rollback Complexity

**Rating:** Simple / Moderate / Complex / Very Complex

> *(Describe how a rollback would be performed if this goes wrong in production.)*

---

## Risk Score

| Dimension | Score (1–10) | Rationale |
|---|---|---|
| Technical complexity | | |
| Schema change risk | | |
| Payment integrity risk | | |
| Inventory integrity risk | | |
| User experience risk | | |
| Rollback difficulty | | |
| **Overall Risk Score** | **/10** | |

---

## Go / No-Go / Split Recommendation

**Recommendation:** Go / No-Go / Split

**Reasoning:**

> *(Why this recommendation? Reference risk score and key findings.)*

**If Split — what to include in MVP:**

- *(include)*

**If Split — what to defer:**

- *(defer)*

**Conditions / caveats:**

> *(Any conditions that must be met before proceeding?)*

---

*Last updated: YYYY-MM-DD*
