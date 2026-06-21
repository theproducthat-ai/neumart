# /product-evaluate — Slash Command Definition

Run roadmap or module evaluation for a request after grilling is complete.

---

## How to Use

```
/product-evaluate REQ-0003
/product-evaluate
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `Grilling Complete` stage.

---

## Purpose

Evaluates whether a request should be a new module, an extension of an existing module, a roadmap candidate, split into multiple requests, parked, or rejected. Creates an EVAL document and updates the roadmap evaluation board.

---

## When to Use

- After grilling is complete and the user has signed off on scope (G2 gate)
- For complex requests that span multiple modules
- For requests classified as: New Module Candidate, New Sub-module, Cross-module Feature, Integration Request, or Roadmap Evaluation Item
- Before impact assessment or PRD writing for complex requests

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm REQ ID and read the request file and grilling document |
| 2 | Read `MODULE_MASTER.md`, `PRODUCT_ROADMAP.md`, `NOW_NEXT_LATER.md` |
| 3 | Read `MODULE_EVALUATION_BOARD.md` to check for existing evaluations |
| 4 | Assess where the request fits in the module hierarchy |
| 5 | Assign next EVAL ID from `MASTER_REGISTRY.md` |
| 6 | Create `EVAL-NNNN.md` |
| 7 | Present recommendation: Fits Existing / New Sub-module / New Module / Split / Roadmap / Park / Reject |
| 8 | Update `MODULE_EVALUATION_BOARD.md` |
| 9 | Update `REQUEST_REGISTER.md` and `ACTIVE_REQUESTS.md` |
| 10 | Update `MASTER_REGISTRY.md` |
| 11 | Wait for user approval before proceeding |

---

## What Claude Never Asks the User

- The EVAL ID (Claude generates it)
- The module hierarchy position (Claude reads `MODULE_MASTER.md`)
- Whether a module exists (Claude checks)
- The next step (Claude recommends it)

---

## Approval Gate

Claude must NOT proceed to impact assessment or PRD without user confirming the evaluation recommendation (G3 gate).

After presenting the recommendation, Claude asks:
"Do you want me to proceed to the next step?"

---

## Output Summary Format

```
**Evaluation complete:** EVAL-NNNN
**Request:** REQ-NNNN — [Title]
**Recommendation:** [New Module / Fits Existing / Split / Roadmap / Reject]
**Reason:** [One to three sentences]
**Next step:** [Impact Assessment / Direct to PRD / Roadmap parking / Reject with explanation]
```

---

## Guardrails

- Do not write a PRD during evaluation
- Do not change application code
- Do not create a new module in the module catalogue without user approval
- Do not reject a request without a clear explanation

---

## Output Files Created

| File | Path |
|---|---|
| Evaluation document | `product/02-roadmap/evaluations/EVAL-NNNN.md` |

---

## Registers Updated

- `product/00-product-foundation/MASTER_REGISTRY.md`
- `product/02-roadmap/MODULE_EVALUATION_BOARD.md`
- `product/04-request-management/REQUEST_REGISTER.md`
- `product/04-request-management/ACTIVE_REQUESTS.md`

---

*Last updated: 2026-06-21*
