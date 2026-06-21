# Nuemart — Module Evaluation Board

Tracks formal evaluations of modules, capabilities, and significant features before they are committed to the roadmap.

**An evaluation must complete before any module moves from Candidate → Planned.**

---

## How to Use This Board

1. When a module or significant capability is raised as a candidate, create an evaluation entry here.
2. Assign the next EVAL ID from `MASTER_REGISTRY.md`.
3. Create a detailed evaluation document in `evaluations/EVAL-XXXX.md`.
4. Complete the evaluation: score Business Value, Complexity, and Risk (1–5 each).
5. Record the Recommendation and Next Action.
6. Update PRODUCT_ROADMAP.md and NOW_NEXT_LATER.md based on the outcome.

---

## Scoring Guide

| Score | Business Value | Complexity | Risk |
|---|---|---|---|
| 1 | Minimal impact | Trivial — hours | Negligible |
| 2 | Nice to have | Small — days | Low |
| 3 | Meaningful uplift | Moderate — weeks | Moderate |
| 4 | Significant revenue or retention impact | Large — months | High |
| 5 | Critical to business model | Very large — quarters | Very high |

---

## Evaluation Board

| Evaluation ID | Module / Capability | Request ID | Status | Business Value | Complexity | Risk | Recommendation | Next Action |
|---|---|---|---|---|---|---|---|---|
| EVAL-0001 | Delivery Management — MVP | REQ-0001 | Closed — Approved | 3 | 2 | 2 | **Build MVP Now** (Option A) | IMPACT-0001 complete. Go recommendation. Awaiting PRD-0001. |
| — | Discount Coupons at Cart | — | Pending Evaluation | — | — | — | Not yet evaluated | Business to confirm: is this needed before or after Razorpay goes live? |
| — | Customer Notifications (SMS/Email) | — | Pending Evaluation | — | — | — | Not yet evaluated | Evaluate after first real orders are placed |
| — | Refunds via Razorpay | — | Pending Evaluation | — | — | — | Not yet evaluated | Evaluate after Phase 11 (Razorpay one-time payment) is complete |
| — | Multi-branch / Multi-site | — | Pending Evaluation | — | — | — | Not yet evaluated | Evaluate only after achieving meaningful single-store order volume |

---

## Completed Evaluations

*No evaluations completed yet. The first evaluation will be assigned EVAL-0001.*

---

## Rules

1. Do not build a Candidate module without a completed evaluation entry.
2. An evaluation must have a Recommendation before it can close.
3. If a module is Rejected, record the reason in ROADMAP_DECISIONS.md.
4. If a module is Approved, create a formal PRD and update PRODUCT_ROADMAP.md.
5. Evaluations are never deleted — mark them Closed with the outcome.

---

*Last updated: 2026-06-21 — Board created. No evaluations started yet.*
