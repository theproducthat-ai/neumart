# /product-request — Slash Command Definition

Activates the Nuemart Product OS request intake and lifecycle management session.

---

## How to Use

The user types:
```
/product-request
```
followed by (or in the same message) a natural language description of what they want.

Or in two steps:
1. `/product-request`
2. (Claude asks for the description)
3. User describes the request

---

## What This Command Does (20-Step Workflow)

When `/product-request` is invoked, Claude runs the following workflow. Claude does every step — the user only provides the description and answers grilling questions.

| Step | Claude's Action |
|---|---|
| 1 | Reads the user's natural language description |
| 2 | Classifies the request (see REQUEST_CLASSIFICATION_MATRIX.md) |
| 3 | Identifies the primary module and sub-module |
| 4 | Checks for blocking conditions (vague, missing info, prerequisite not met) |
| 5 | Gets the next REQ ID from MASTER_REGISTRY.md |
| 6 | Creates `04-request-management/requests/REQ-NNNN.md` |
| 7 | Updates MASTER_REGISTRY.md |
| 8 | Responds with: classification, module, REQ ID, next step |
| 9 | Selects relevant grilling questions from GRILLING_QUESTION_BANK.md |
| 10 | Asks grilling questions (one batch, not one by one) |
| 11 | Creates `05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md` |
| 12 | Presents scope summary and MVP boundary; user signs off (G2 gate) |
| 13 | If complex: creates EVAL, presents for G3 approval. Else: skips to step 14. |
| 14 | If high-risk: creates IMPACT-NNNN.md, presents Go/No-Go. Else: skips. |
| 15 | Writes `07-prd/approved-prds/PRD-NNNN.md` |
| 16 | User reviews and approves PRD (G4 gate) |
| 17 | Writes user stories in `08-user-stories/stories/` |
| 18 | Writes DEVPLAN and coding prompt in `09-development-planning/plans/` (G5 gate) |
| 19 | Developer runs coding prompt; submits 9-item completion report |
| 20 | QA → UAT → Release follows standard gates |

---

## What Claude Never Asks the User

In a `/product-request` session, Claude must never ask the user to:

- Name the classification type
- Specify the module or sub-module
- Provide a REQ ID
- Provide a screen ID
- Name the next Product OS step
- Choose which template to use
- Choose which skill to invoke

---

## Command Variants

| Variant | What It Does |
|---|---|
| `/product-request` | Start a new request from scratch |
| `/product-request REQ-NNNN` | Continue or resume an existing request by ID |
| `/product-request status` | Show the status of all open requests |

---

## Prerequisite Files Claude Reads at Session Start

Before handling any request, Claude reads:
1. `00-product-foundation/MASTER_REGISTRY.md` — to get next IDs
2. `03-module-catalogue/MODULE_MASTER.md` — to identify modules
3. `04-request-management/REQUEST_STATUS_RULES.md` — to check lifecycle rules
4. `99-operating-system/governance/CLASSIFICATION_RULES.md` — to classify correctly
5. `99-operating-system/governance/INCOMPLETE_REQUEST_RULES.md` — to check if request is complete

---

## Output Files Created by This Command

| File | When Created |
|---|---|
| `04-request-management/requests/REQ-NNNN.md` | Step 6 |
| `05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md` | Step 11 |
| `02-roadmap/evaluations/EVAL-NNNN.md` | Step 13 (if needed) |
| `06-assessment-and-impact/assessments/IMPACT-NNNN.md` | Step 14 (if needed) |
| `07-prd/approved-prds/PRD-NNNN.md` | Step 15 |
| `08-user-stories/stories/US-NNNN.md` | Step 17 |
| `09-development-planning/plans/DEVPLAN-NNNN.md` | Step 18 |
| `09-development-planning/plans/DEVPLAN-NNNN-coding-prompt.md` | Step 18 |

---

## Related Governance Files

- `99-operating-system/governance/CLASSIFICATION_RULES.md`
- `99-operating-system/governance/REQUEST_CLASSIFICATION_MATRIX.md`
- `99-operating-system/governance/REQUEST_SCENARIO_PLAYBOOK.md`
- `99-operating-system/governance/SESSION_FLOW_RULES.md`
- `99-operating-system/governance/INCOMPLETE_REQUEST_RULES.md`
- `99-operating-system/governance/APPROVAL_GATES.md`
- `99-operating-system/governance/REFERENCE_MATERIAL_RULES.md`
- `99-operating-system/governance/ID_GENERATION_RULES.md`
- `99-operating-system/governance/SCREEN_ID_RULES.md`

---

## Same-Session Continuation Rule

After any Product OS step completes within a `/product-request` session, Claude asks:
"Do you want me to proceed to the next step?"

If the user replies `yes`, `continue`, `proceed`, or `next` — Claude continues the active request automatically without asking for the Request ID again.

The user only needs `/product-resume` when returning in a new session or switching between requests.

---

## Classification Example

If the user says: "Build a Delivery Module for Nuemart"

Claude does NOT blindly assume it is a full module. Claude responds:

```
Initial classification: New Module Candidate. Confidence: Medium to High.
```

Then asks questions to validate:
- Is this only delivery status on existing orders?
- Is rider assignment required?
- Is customer tracking required?
- Is proof of delivery required?
- Is this required for MVP or future roadmap?
- Are there reference documents?

Based on answers, Claude classifies as:
- New Module Candidate
- Extension of Orders/Fulfilment
- Sub-feature under Orders
- Roadmap Evaluation Item

---

*Last updated: 2026-06-21*
