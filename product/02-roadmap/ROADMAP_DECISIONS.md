# Nuemart — Roadmap Decisions

Records significant product decisions that affect the roadmap — what was chosen, what was ruled out, and why.

These are decisions, not tasks. The reasoning is preserved so future team members understand why the roadmap is shaped the way it is.

---

## Decision Log

---

### RD-001 — Pay Later as the MVP payment model

**Date:** 2026-06-21  
**Status:** Active

**Decision:** All orders placed during MVP (Phases 1–10) use Pay Later — payment is collected manually at or after delivery.

**Rationale:** Razorpay merchant account approval was pending at the time of MVP build. Rather than block the entire order flow, the MVP uses Pay Later so the end-to-end customer journey (browse → cart → checkout → order confirmation) could be built and tested without live payment.

**Implication:** Stock is reduced on order placement (not on payment). Once Razorpay is integrated (Phase 11), stock deduction will move to webhook-verified payment confirmation.

**What was ruled out:** Stripe (India-first policy — Razorpay is the payment provider).

---

### RD-002 — No Delivery Management module in MVP

**Date:** 2026-06-21  
**Status:** Active

**Decision:** Delivery Management is a Candidate module — it is not built and has no roadmap commitment.

**Rationale:** The store currently handles fulfillment manually. Building a delivery tracking system before the store has sufficient order volume would be premature. The feature adds significant complexity (delivery persons, assignment, status tracking, proof of delivery) for uncertain near-term value.

**What this means:** Delivery management is documented in the module catalogue and entity map for planning purposes, but **no delivery code will be written until a formal evaluation (MODULE_EVALUATION_BOARD.md) approves it**.

**Revisit trigger:** Significant manual fulfillment overhead OR a business request to offer delivery ETAs to customers.

---

### RD-003 — No Discount Coupon system in MVP

**Date:** 2026-06-21  
**Status:** Active

**Decision:** Discount Coupons are a Future Feature Candidate — not built and not committed.

**Rationale:** Coupons require new Convex entities (coupons, couponUsages), admin CRUD, cart integration, checkout validation, and usage tracking. This is non-trivial scope. The business has not yet confirmed that promotions are needed before the Razorpay integration goes live.

**What this means:** Coupons are documented in the module catalogue and data entity map for planning, but **no coupon code will be written until a business decision is made and a PRD is approved**.

**Revisit trigger:** Business confirms promotions are needed to drive customer acquisition or retention before or alongside Phase 11.

---

### RD-004 — Convex as sole source of truth; no external DB

**Date:** 2026-06-21  
**Status:** Active (Architectural)

**Decision:** All persistent state — orders, payments, inventory, users — lives in Convex only. No secondary database. Future phases (e.g. Phase 12 Razorpay Subscription) will also store their state in Convex.

**Rationale:** Convex provides real-time reactivity, serverless mutations, and ACID-like transaction guarantees for the operations we need. Splitting state across Convex and an external Postgres or similar would add unnecessary operational complexity for a single-store MVP.

**Implication:** All data modelling decisions flow through the Convex schema. Changes to schema must be backwards-compatible or handled via migration.

---

### RD-005 — Razorpay is the only payment provider

**Date:** 2026-06-21  
**Status:** Active

**Decision:** Nuemart uses Razorpay for all payment processing. No Stripe. No Clerk Billing.

**Rationale:** Nuemart is built for India. Razorpay supports UPI, cards, net banking, and wallets natively. Stripe's India support is limited and requires additional RBI compliance steps. Clerk Billing is designed for SaaS subscriptions and is not appropriate for grocery order payments.

**What this means:** Any payment feature — one-time checkout, subscription, refunds — is implemented via Razorpay APIs only.

---

### RD-006 — Webhook-only payment trust

**Date:** 2026-06-21  
**Status:** Active (Security)

**Decision:** Payment status is only trusted from Razorpay's server-to-server webhook. Frontend payment confirmation is never used to update order or payment status.

**Rationale:** Frontend payment responses can be tampered with. The only trustworthy signal of a successful payment is Razorpay's HMAC-SHA256 signed webhook event, verified server-side in Convex.

**Implication:** Cart clearing, stock deduction, and order status update all happen in the Razorpay webhook handler — not in the frontend callback.

---

*Last updated: 2026-06-21 — Initial decisions documented from MVP build context.*
