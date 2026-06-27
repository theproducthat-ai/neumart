---
object_id: "RSK-PAY-COUPON-RAZORPAY-001"
object_type: risk
version: "1.0"
created_date: "2026-06-25"
updated_date: "2026-06-25"
created_by: "AI (Product OS V2 — /product-impact)"
parent_object_id: "IMPACT-COM-CART-COUPON-001"
source_request_id: "REQ-0010"
module_id: "MOD-PAY"
related_feature_id: "FEATURE-COM-CART-COUPON"
status: "active"

risk_title: "Coupon discount not reflected in Razorpay payment amount when Phase 11 ships"
risk_category: "technical"
likelihood: 2
impact: 5
risk_score: 10
risk_level: "High"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
---

# Risk

**Risk ID:** `RSK-PAY-COUPON-RAZORPAY-001`
**Title:** Coupon discount not reflected in Razorpay payment amount when Phase 11 ships
**Category:** Technical
**Status:** Active
**Risk Score:** 10 / 25 — High
**Identified in:** IMPACT-COM-CART-COUPON-001

---

## Risk Description

Coupon MVP ships before Phase 11 (Razorpay integration). In MVP, coupons apply only to Pay Later orders. The `order.total` field correctly reflects the post-discount total; the `payments.amount` field correctly reads from `order.total`.

**Forward risk:** When Phase 11 ships and Razorpay is integrated, the Razorpay order creation call must pass `order.total` (post-discount) as the payment amount — not `subtotal` or any pre-discount value. If the Razorpay integration team reads the wrong field, customers with coupons would be charged the full pre-discount amount.

Additionally, if the coupon discount calculation logic is duplicated (not reused) in the Razorpay integration, drift between the two implementations could produce different `discountAmount` values.

---

## Likelihood: 2 / 5 (Unlikely)

The field is clearly named (`order.total`) and the existing `payments` table already uses `order.total` as its amount source. The risk is primarily one of documentation and implementation awareness, not a technical ambiguity.

---

## Impact: 5 / 5 (Severe)

Customer charged wrong amount in a live payment flow = financial error, customer trust loss, potential regulatory issue (charging more than shown price). Razorpay disputes and refund overhead.

---

## Mitigation Plan

1. **Reusable coupon calculation function:** Coupon discount computation must be written as a standalone internal helper (`computeCouponDiscount`) that is imported by `placeOrder`. When Razorpay integration ships, the same function is called to compute the payable amount — no duplication.

2. **Single source of truth for payment amount:** Razorpay order creation must always use `order.total` from the Convex `orders` table as its payment amount. This field is computed by `placeOrder` and is already net of all discounts.

3. **PRD documentation:** PRD tech design section must explicitly state: "Razorpay payment amount = `order.total`. The `subtotal` field must never be passed to Razorpay as the payment amount."

4. **Dependency object:** DEP-COM-CART-COUPON-RAZORPAY-001 records this forward dependency for the Phase 11 team.

5. **payment_change flag retained:** REQUEST-COM-CART-COUPON-001 retains `payment_change: true` as an active flag to ensure this risk is documented in the PRD and development plan.

---

## Revisit Trigger

Active until Phase 11 Razorpay integration is implemented and code review confirms `order.total` (not `subtotal`) is passed to Razorpay. Status → `mitigated` after Phase 11 QA confirms correct payment amounts with coupon-discounted orders.
