# Sub-module: Coupon Reports

**Module:** Reporting & Analytics  
**Status:** Future Candidate — depends on Coupons module

---

## Purpose

Provides the store operator with visibility into how discount coupons are performing — usage rates, discount totals, and the impact on order revenue.

---

## Current State

**Not applicable.** The Coupons module does not exist yet. Coupon Reports can only be built after the Coupons module is live and `couponUsages` data exists.

---

## Intended Future Behaviour

### Coupon Usage Summary

- Total times each coupon has been used
- Total discount amount applied across all uses
- Usage rate: uses / usage limit (as a percentage)

### Coupon Performance

- Which coupons drove the most orders?
- Which coupons are unused (zero redemptions)?
- Average order value with vs. without a coupon applied

### Time-based Analysis

- Coupon redemptions per day / week (to understand promotion timing)
- Expiring coupons with low usage (alert admin to extend or promote)

### Revenue Impact

- Total revenue with coupon discount applied vs. gross revenue
- Net revenue after discounts

### Per-coupon Detail

- List of all orders where a specific coupon was applied
- Customer-level usage (to identify if any customer has used a per-user limit)

---

## Pre-requisites to Build

1. Coupons module built and live (`coupons` and `couponUsages` Convex tables exist).
2. Sufficient coupon usage data to make reports meaningful.
3. Formal PRD approved.

---

*Last updated: 2026-06-21*
