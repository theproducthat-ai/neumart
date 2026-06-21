# UAT Plan — How to Run User Acceptance Testing

This document explains how to run UAT for a Nuemart feature. UAT is conducted by the product owner or business stakeholder, not by the developer or QA tester.

---

## Rule: UAT Is Conducted by the Business Owner

- UAT is NOT a repeat of QA. It is a business-level validation.
- The product owner verifies that the feature meets business intent, not just technical correctness.
- A feature that passes QA can still fail UAT if it does not match the business expectation from the PRD.

---

## When UAT Runs

| Trigger | Notes |
|---|---|
| QA Passed or Conditional Pass | UAT runs after QA is signed off |
| Product owner is available | Must not run UAT in the product owner's absence |

---

## UAT ID Format

UAT IDs are registered in MASTER_REGISTRY.md:

```
UAT-0001   First UAT run
UAT-0002   Second UAT run
```

---

## UAT Output File

```
product/12-uat/uat-runs/UAT-NNNN.md
```

See `uat-runs/UAT-template.md` for the file structure.

---

## UAT Decision Rules

| Decision | Criteria |
|---|---|
| UAT Passed | All UAT scenarios pass. Business owner signs off. No blocking defects. |
| UAT Failed | UAT scenario fails. Feature does not match PRD intent. New requirement discovered. |
| UAT Conditional Pass | Minor issue found. Business owner accepts with condition (e.g. fix typo before release). |

---

## UAT vs QA

| Aspect | QA | UAT |
|---|---|---|
| Who runs it | Developer / QA tester | Product owner / business stakeholder |
| What is tested | Technical correctness, acceptance criteria, regressions | Business intent, UX, expected outcomes |
| Pass criteria | All ACs met, no critical bugs | Feature does what the business needs |
| Environment | Local dev or staging | Staging (preferred) or production-like |

---

## After UAT

| UAT Decision | Next Step |
|---|---|
| UAT Passed | Proceed to Release Planning (13-release-management) |
| UAT Failed | Return to development. Update PRD if new requirement discovered. |
| UAT Conditional Pass | Agree list of conditions. Fix. Proceed to release. |

---

*Last updated: 2026-06-21*
