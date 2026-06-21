# Grilling Session — How to Run Discovery

This document explains how to conduct a grilling session for any Nuemart request. Claude runs grilling sessions automatically when a request moves to "Under Grilling" status.

---

## Rule: The User Does Not Drive Grilling

- The user only needs to answer questions.
- Claude selects the relevant questions from GRILLING_QUESTION_BANK.md based on the request classification.
- Claude does not ask all questions — only those relevant to the classification and risk level.
- The output of grilling is a completed GRILLING-NNNN.md file in `grilled-requests/`.

---

## When Grilling Runs

| Trigger | Who Initiates |
|---|---|
| `/product-request` on a complex or vague request | Claude, automatically |
| Classification is Medium or Low confidence | Claude, before proceeding |
| New Module Candidate | Claude, always |
| Payment/Finance or Inventory Impact classification | Claude, always |
| Security or compliance implications identified | Claude, always |
| Request is insufficiently scoped for PRD | Claude, at PRD stage |

---

## What a Grilling Session Produces

1. A completed grilling document (`grilled-requests/GRILLING-NNNN.md`)
2. A refined scope statement
3. An updated or confirmed classification
4. A list of open questions still pending
5. A suggested MVP boundary
6. A recommended next Product OS step

---

## Questions Claude Must Always Ask (Minimum Grilling)

For any request regardless of classification:

1. Can you describe the problem in one sentence from the user's perspective?
2. Who specifically experiences this problem — customer, admin, or both?
3. What is the happy path (the normal successful flow from start to finish)?
4. What should happen when something goes wrong?
5. Do you have any reference document, screenshot, SOP, email or competitor example?

---

## Questions Claude Adds Based on Classification

| Classification | Additional question areas |
|---|---|
| New Module Candidate | Sections 3, 4, 5, 6, 11, 12, 14 from question bank |
| Existing Module Feature | Sections 4, 5, 6, 7, 12 |
| Existing Feature Enhancement | Sections 4, 5, 7, 8, 12 |
| Bug | Sections 3, 8 — reproduce steps, expected vs. actual behaviour |
| Integration Request | Sections 4, 5, 6, 11, 15 |
| Payment/Finance Impact | Section 15 always |
| Inventory Impact | Section 16 always |
| Roadmap Evaluation Item | Sections 1, 14 only — this is not yet a grilling; it is an evaluation |

---

## Reference Material Rules During Grilling

Claude must ask for reference material at grilling stage. See REFERENCE_MATERIAL_RULES.md.

Claude must record:
- What was provided
- What is missing
- What assumptions were made due to missing material

If critical reference material is missing and the request cannot be safely scoped without it, Claude must mark the request as "Reference Pending" and note what is needed before grilling can complete.

---

## Grilling Output File

A completed grilling session produces a file at:
```
product/05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md
```
Where NNNN is the same number as the linked REQ ID.

See `grilled-requests/GRILLING-template.md` for the file structure.

---

*Last updated: 2026-06-21*
