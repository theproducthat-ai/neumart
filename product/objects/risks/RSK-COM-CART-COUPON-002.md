---
object_id: "RSK-COM-CART-COUPON-002"
object_type: risk
version: "1.0"
created_date: "2026-06-25"
updated_date: "2026-06-25"
created_by: "AI (Product OS V2 — /product-impact)"
parent_object_id: "IMPACT-COM-CART-COUPON-001"
source_request_id: "REQ-0010"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
status: "active"

risk_title: "Race condition — concurrent orders exhaust usage-limited coupon"
risk_category: "technical"
likelihood: 3
impact: 3
risk_score: 9
risk_level: "High"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
---

# Risk

**Risk ID:** `RSK-COM-CART-COUPON-002`
**Title:** Race condition — concurrent orders exhaust usage-limited coupon
**Category:** Technical
**Status:** Active
**Risk Score:** 9 / 25 — High
**Identified in:** IMPACT-COM-CART-COUPON-001

---

## Risk Description

When a coupon has a `usageLimit` (e.g., `usageLimit: 1` for a single-use coupon) and two customers attempt to redeem it simultaneously, both may pass the usage check before either `couponUsage` write completes. Result: the coupon is redeemed by two customers when only one redemption was intended.

**Scenario:**
1. Customer A calls `placeOrder` with coupon `WELCOME10`
2. Customer B calls `placeOrder` with coupon `WELCOME10` at the same millisecond
3. Both read `couponUsages.count = 0` against `usageLimit = 1`
4. Both pass the usage check
5. Both write `couponUsage` rows
6. Coupon is redeemed twice — one extra unauthorized discount applied

---

## Likelihood: 3 / 5 (Possible)

More likely with promotional coupons sent to a large group of customers simultaneously (e.g., WELCOME10 for all new users). Less likely for coupons with high usage limits.

---

## Impact: 3 / 5 (Moderate)

Financial loss from extra unauthorized discount. Data integrity gap. Not a complete service failure, but requires coupon report reconciliation.

---

## Mitigation Plan

**Primary mitigation (Convex OCC):**
Convex mutations run within transactions with Optimistic Concurrency Control. If two concurrent mutations attempt to write the same `couponUsage` record, one will conflict and retry. The tech design must confirm that the `placeOrder` implementation:
1. Reads the count of `couponUsages` by `couponId` within the transaction
2. Checks against `usageLimit` within the same transaction read set
3. Writes `couponUsage` within the same mutation

If the OCC conflict is detected, the second concurrent `placeOrder` will retry and re-read the updated usage count — at which point it will find the limit exhausted and reject the coupon.

**Secondary mitigation:**
- `perUserLimit` check (e.g., 1 per user) is orthogonal to `usageLimit` but provides additional protection for single-use-per-customer promotions.

**Implementation note for Dev Plan:** Tech design must explicitly document the transaction scope for coupon validation + usage write. Engineering Lead to confirm Convex OCC is sufficient for the expected concurrency level.

---

## Revisit Trigger

Resolved when tech design confirms OCC scope and QA includes concurrent-order test for usage-limited coupons.
