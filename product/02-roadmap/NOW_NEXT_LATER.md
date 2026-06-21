# Nuemart — Now / Next / Later

A lightweight prioritisation view of current and upcoming work. Updated whenever priorities shift.

---

## Now

*What is being actively worked on or is the immediate next action.*

| Item | Owner | Notes |
|---|---|---|
| Product OS Setup (Phase 2) | Product | Architecture docs, module catalogue, screen registry, roadmap, data entity map |
| Razorpay merchant account approval | Business | Pre-requisite for Phase 11 — currently awaiting approval |

---

## Next

*Committed work — will start as soon as Now items are done and pre-requisites are met.*

| Item | Pre-requisite | Notes |
|---|---|---|
| Razorpay Payment Integration (Phase 11) | Merchant account approval + env vars | One-time checkout via Razorpay Orders API + Checkout SDK + webhook verification |
| Razorpay Subscription — Free Delivery (Phase 12) | Phase 11 complete | Free-delivery subscription via Razorpay Subscriptions; ₹0 delivery fee for subscribers |
| Discount Coupons | Business decision: needed before Razorpay goes live? | If promotions are needed to drive first orders, coupons could be built before or alongside Phase 11 |
| Delivery Module Evaluation | Now items complete | Formal evaluation in MODULE_EVALUATION_BOARD.md — is delivery tracking needed at this stage? |

---

## Later

*Identified as important but not yet committed. Will enter Now/Next after evaluation.*

| Item | Type | Notes |
|---|---|---|
| Refunds | Future Candidate | Depends on Razorpay integration; requires business process for refund policy |
| Customer Notifications (SMS/Email) | Future Candidate | Order confirmation, dispatch notification; provider TBD (e.g. Twilio, MSG91) |
| Reporting Dashboards | Future Candidate | Beyond basic admin stats; revenue trends, category performance, customer analytics |
| Delivery Assignment | Candidate (Delivery Module) | Assign delivery persons, track delivery status; must pass module evaluation first |
| Advanced Analytics | Future Candidate | Requires sufficient order volume to be meaningful |
| Multi-branch / Multi-site Scalability | Future Candidate | Major architectural decision; not in scope for current single-store MVP |

---

## Parked

*Work that was raised but has been explicitly paused or deprioritised. Not rejected — just not in focus.*

| Item | Parked Reason | Revisit Trigger |
|---|---|---|
| Proof of Delivery | Requires Delivery Module to be built first | Delivery Module passes evaluation |
| Coupon Reporting | Requires Coupons module to be built first | Coupons feature is approved and shipped |
| Delivery Exception Management | Requires Delivery Module | Delivery Module passes evaluation |
| Admin Mobile App | Current admin web experience is sufficient | Significant order volume + admin workflow pain |

---

## Prioritisation Rules

1. **Razorpay is the highest priority feature.** It is the gate for real revenue.
2. **Candidate items cannot enter Now without a completed module evaluation.**
3. **Future Candidates cannot enter Next without a formal PRD.**
4. **Parked items can be revived** by the product owner — move them to Later or Next with a note here.
5. **Do not add items to Now unless they will start within the next two weeks.**

---

*Last updated: 2026-06-21*
