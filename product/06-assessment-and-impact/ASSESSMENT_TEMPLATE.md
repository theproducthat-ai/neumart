# Assessment — How to Run an Impact Assessment

This document explains when and how to run an impact assessment for a Nuemart request. Claude runs impact assessments automatically when a request moves to "Under Impact Assessment" status.

---

## Rule: The User Does Not Drive Assessment

- The user only needs to answer questions and confirm the recommendation.
- Claude produces the impact assessment based on grilling outputs, the product hierarchy, schema, and module catalogue.
- The user reviews and approves the Go / No-Go / Split recommendation.

---

## When an Impact Assessment Runs

| Trigger | Notes |
|---|---|
| Request status moves to Under Impact Assessment | After grilling is complete and evaluation approved |
| New Module Candidate | Always — new modules have wide impact |
| Payment/Finance Impact Request | Always — risk of data inconsistency or incorrect payments |
| Inventory Impact Request | Always — risk of overselling |
| Schema change required | Always — irreversible change |
| Security or compliance implication | Always |
| Cross-module change | Always — multiple modules impacted means higher blast radius |

---

## What an Impact Assessment Produces

1. A completed impact assessment file (`assessments/IMPACT-NNNN.md`)
2. A risk score (1–10)
3. A Go / No-Go / Split recommendation
4. A list of files, tables, screens, roles, and integrations impacted
5. A rollback complexity rating
6. A clear next action

---

## Impact Assessment Output File

```
product/06-assessment-and-impact/assessments/IMPACT-NNNN.md
```
Where NNNN is the linked REQ ID number.

See `assessments/IMPACT-template.md` for the file structure.

---

## Risk Score Guide

| Score | Meaning |
|---|---|
| 1–3 | Low risk — isolated change, no schema impact, fully reversible |
| 4–6 | Medium risk — multi-screen or minor schema change; rollback possible with effort |
| 7–8 | High risk — schema migration, payment logic, cross-module change |
| 9–10 | Critical — payment integrity, data loss risk, compliance violation possible |

---

## Go / No-Go / Split Rules

| Recommendation | When |
|---|---|
| **Go** | Risk score ≤ 6, all dependencies met, clear MVP boundary, no compliance issues |
| **No-Go** | Risk score ≥ 9, or prerequisite feature not built, or serious compliance concern |
| **Split** | Feature can be de-risked by building a minimal version first and deferring high-risk parts |

---

*Last updated: 2026-06-21*
