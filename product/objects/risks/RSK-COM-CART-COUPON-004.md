---
object_id: "RSK-COM-CART-COUPON-004"
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

risk_title: "Client/server cart discount divergence — coupon valid in UI but rejected at order placement"
risk_category: "technical"
likelihood: 3
impact: 4
risk_score: 12
risk_level: "High"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
---

# Risk

**Risk ID:** `RSK-COM-CART-COUPON-004`
**Title:** Client/server cart discount divergence — coupon valid in UI but rejected at order placement
**Category:** Technical
**Status:** Active
**Risk Score:** 12 / 25 — High
**Identified in:** IMPACT-COM-CART-COUPON-001

---

## Risk Description

Cart state is Zustand/localStorage (confirmed — SCREEN_REGISTRY + Skill Rule 33). Coupon validation is performed client-side via `validateCoupon` query when the customer applies a code. The discount is displayed in the cart UI. However, a second server-side validation happens inside `placeOrder`.

Divergence can occur between cart coupon validation and order placement validation when:

1. **Time gap**: Customer applies coupon, adds items to cart, waits, then places order. Between `validateCoupon` call and `placeOrder`:
   - Coupon's `expiresAt` passes → coupon expired server-side but UI still shows discount
   - Coupon's global `usageLimit` is exhausted by another customer → coupon still shown in UI
   - Admin deactivates the coupon (`isActive = false`) → UI still shows discount

2. **Cart manipulation**: Customer applies coupon (cart above minimum), then removes items before placing order — cart drops below `minimumOrderValue`. Coupon auto-remove should catch this (DEC-003), but if client-side logic fails to fire:
   - `placeOrder` rejects coupon → order placed at higher total than customer expected

**Customer experience impact:** Customer sees a discounted total in the cart but pays full price after order placement, with no clear error message.

---

## Likelihood: 3 / 5 (Possible)

Promotional coupons with short validity windows or high demand are more likely to trigger this divergence.

---

## Impact: 4 / 5 (Significant)

Trust and UX impact: customer is shown ₹585 in cart but charged ₹650. Even with an error message at checkout, this creates confusion. Repeated divergence damages trust in the coupon system.

---

## Mitigation Plan

1. **Server is always authoritative:** `placeOrder` always recalculates coupon validity and `discountAmount`. The client-side `validateCoupon` result is display-only. If server rejects the coupon at `placeOrder`, the mutation returns a structured error (e.g., `{ code: "COUPON_EXPIRED", message: "This coupon has expired." }`).

2. **Clear error handling at checkout:** When `placeOrder` returns a coupon error, the client must:
   - Remove the coupon from Zustand cart state
   - Display a clear, specific error message explaining why the coupon was removed
   - Recalculate and display the correct total before allowing order resubmission

3. **Structured error codes:** `placeOrder` must return typed coupon error codes:
   - `COUPON_EXPIRED` — expiry date passed
   - `COUPON_EXHAUSTED` — global usage limit reached
   - `COUPON_PER_USER_LIMIT` — per-user limit reached
   - `COUPON_INACTIVE` — admin disabled
   - `COUPON_MINIMUM_NOT_MET` — cart below minimum (secondary check)

4. **Auto-remove on cart change (DEC-003):** Client-side auto-remove when cart drops below minimum reduces the most common divergence case.

**PRD requirement:** Error handling for each structured coupon error code is a Must Have requirement in the PRD.

---

## Revisit Trigger

Resolved when PRD includes all structured error codes and their UX handling, and QA covers each divergence scenario as a test case.
