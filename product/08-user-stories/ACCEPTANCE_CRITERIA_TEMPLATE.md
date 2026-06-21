# Acceptance Criteria — Writing Guide

This document explains how to write acceptance criteria for Nuemart user stories. All acceptance criteria must follow the Given / When / Then (GWT) format.

---

## Format

```
Given [the context or precondition]
When [the action the user or system takes]
Then [the expected observable outcome]
```

---

## Rules

1. Each criterion tests exactly one thing.
2. The "Then" statement must be observable — something the user or tester can see or measure.
3. Avoid vague terms: "quickly", "easily", "correctly". Use specific outcomes.
4. Write negative criteria too: what should NOT happen in an error case.
5. Cover the happy path AND the error paths.

---

## Example — Coupon Application

```
Given the cart total is ₹450 and a valid coupon code "SAVE10" exists with minimum order ₹400
When the customer enters "SAVE10" and clicks Apply
Then the discount of ₹45 is shown below the coupon field and the cart total updates to ₹405

Given the cart total is ₹300 and a valid coupon code "SAVE10" exists with minimum order ₹400
When the customer enters "SAVE10" and clicks Apply
Then an inline error message "Minimum order ₹400 required for this coupon" is shown and the cart total is unchanged

Given a coupon code "EXPIRED50" that expired yesterday
When the customer enters "EXPIRED50" and clicks Apply
Then an inline error "This coupon is no longer valid" is shown and the cart total is unchanged
```

---

## Example — Admin Stock Update

```
Given the admin is on the Product Edit screen for "Basmati Rice 5kg" with current stock 20
When the admin enters 15 in the stock field and clicks Save
Then the product stock shows 15 and a new stockMovements record is written with reason "manual_adjustment" and delta -5

Given the admin enters "-5" in the stock field
When the admin clicks Save
Then a validation error "Stock quantity cannot be negative" is shown and no stock change is saved
```

---

## Example — Checkout (Pay Later)

```
Given the customer has 3 items in cart, a valid delivery address selected, and payment method "Pay Later"
When the customer clicks "Place Order"
Then an order is created in Convex with status "confirmed", paymentStatus "pending", paymentMethod "pay_later", and the cart is cleared

Given the customer has 3 items in cart but item "Fresh Milk 1L" has 0 stock remaining
When the customer clicks "Place Order"
Then the order is rejected with a message "Fresh Milk 1L is out of stock" and the cart is not cleared
```

---

## Criteria Completeness Checklist

Before finalising acceptance criteria for a story, verify:

- [ ] Happy path covered
- [ ] Empty / null state covered (no data)
- [ ] Error state covered (validation failure, API error)
- [ ] Permission edge case covered (wrong role tries to access)
- [ ] Loading state behaviour defined (if async)
- [ ] Concurrent action considered (two users act at same time)

---

*Last updated: 2026-06-21*
