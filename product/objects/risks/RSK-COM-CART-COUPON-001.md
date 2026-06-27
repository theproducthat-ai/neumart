---
object_id: "RSK-COM-CART-COUPON-001"
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

risk_title: "placeOrder mutation regression — coupon extension breaks core order placement"
risk_category: "technical"
likelihood: 3
impact: 5
risk_score: 15
risk_level: "Critical"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
---

# Risk

**Risk ID:** `RSK-COM-CART-COUPON-001`
**Title:** placeOrder mutation regression — coupon extension breaks core order placement
**Category:** Technical
**Status:** Active
**Risk Score:** 15 / 25 — Critical
**Identified in:** IMPACT-COM-CART-COUPON-001

---

## Risk Description

The `placeOrder` Convex mutation is the most critical write path in the Nuemart application. Every order placed by every customer passes through this function. The coupon system requires extending `placeOrder` to: (a) accept an optional `couponCode` argument, (b) validate the coupon server-side, (c) calculate `discountAmount`, (d) write a `couponUsage` row, and (e) set `order.total = subtotal - discountAmount + deliveryFee`.

Any regression in this mutation — whether from the coupon logic or from inadvertent changes to the existing order placement flow — causes order placement to fail for all customers, not just coupon users.

---

## Why Critical

- `placeOrder` serves 100% of customer order flow
- Incorrect `total` calculation creates financial discrepancy (customer charged wrong amount)
- Failed `couponUsage` write creates data integrity gap (coupon usage not tracked)
- Convex mutation errors surface as unhandled exceptions in the customer cart → orders may silently fail or succeed with incorrect data

---

## Likelihood: 3 / 5 (Possible)

Mutation extensions are moderately risky. The existing `placeOrder` logic is non-trivial (stock decrement, payment record creation, orderItems writes). Adding coupon logic increases cyclomatic complexity.

---

## Impact: 5 / 5 (Severe)

Complete order placement failure affects revenue and customer trust immediately.

---

## Mitigation Plan

1. **Keep coupon logic in a separate internal helper function** (`computeCouponDiscount`) called from within `placeOrder` — do not inline coupon logic into the existing mutation body.
2. **Coupon code argument is optional** — when absent, `discountAmount = 0` and all existing order placement behavior is unchanged. Non-coupon order path must be provably identical post-change.
3. **Wrap `couponUsage` write and `order` write in the same Convex mutation transaction** — Convex mutations are transactional; if coupon usage write fails, the order should not be written.
4. **Full regression test of non-coupon order placement** must be included in the QA test plan (RSK-COM-CART-COUPON-001 is explicitly in the regression test scope).
5. **Dev team review required** — Engineering Lead must review the modified `placeOrder` implementation before merge.

---

## Revisit Trigger

Resolved when QA-COM-CART-COUPON passes with non-coupon order placement regression tests confirmed green.
