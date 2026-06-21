# Nuemart — Product Hierarchy

This document defines the structural hierarchy used to decompose product work — from the top-level product down to individual test cases and releases.

---

## Hierarchy Levels

```
Product
└── Module
    └── Sub-module
        └── Feature
            └── Sub-feature
                └── User Story
                    └── Development Task
                        └── Test Case
                            └── Release
```

| Level | Definition | Example |
|---|---|---|
| **Product** | The entire Nuemart platform | Nuemart |
| **Module** | A major functional area of the product | Customer Commerce |
| **Sub-module** | A discrete capability within a module | Checkout |
| **Feature** | A user-facing behaviour within a sub-module | Apply Discount Coupon |
| **Sub-feature** | A specific variant or edge case of a feature | Single-use coupon validation |
| **User Story** | A statement of value from the user's perspective | As a customer, I want to enter a coupon code at checkout so I can get a discount |
| **Development Task** | A concrete engineering action | Add `validateCoupon` Convex query |
| **Test Case** | A verifiable assertion that confirms behaviour | Valid coupon reduces order total by the specified discount amount |
| **Release** | The production deployment that ships the feature | REL-0003 |

---

## Example 1 — Discount Coupons at Cart

```
Product:       Nuemart
Module:        Customer Commerce
Sub-module:    Checkout
Feature:       Discount Coupon Application
  Sub-feature: Enter coupon code at cart
    User Story: As a customer, I want to apply a coupon code before checkout so I receive a price reduction.
    Dev Task:   Add coupon code input component to cart page
    Dev Task:   Add validateCoupon Convex query (check code exists, active, not expired, usage limit not reached)
    Dev Task:   Apply discount to cart total in UI and pass to order creation
    Dev Task:   Write couponUsages record on successful order
    Test Case:  Valid active coupon reduces cart total correctly
    Test Case:  Expired coupon is rejected with an appropriate error message
    Test Case:  Coupon exceeding usage limit is rejected
    Test Case:  Coupon applied discount appears on order detail
    Release:    REL-XXXX (not yet assigned — feature is Future Candidate)
  Sub-feature: Auto-remove coupon if cart value drops below minimum
    User Story: As a customer, I want invalid coupons to be removed automatically so I am not surprised at checkout.
    Dev Task:   Add minimum order value check to validateCoupon
    Dev Task:   Re-validate coupon when cart quantity changes
    Test Case:  Removing an item that drops total below minimum clears the coupon
```

---

## Example 2 — Delivery Module

```
Product:       Nuemart
Module:        Delivery Management  [CANDIDATE — not built]
Sub-module:    Delivery Assignment
Feature:       Assign Delivery Person to Order
  Sub-feature: Manual assignment by admin
    User Story: As an admin, I want to assign a delivery person to an order so fulfilment is tracked against a named courier.
    Dev Task:   Create deliveryPersons Convex table
    Dev Task:   Create deliveryTasks Convex table
    Dev Task:   Add assignment UI to admin order detail
    Dev Task:   Write assignDelivery mutation
    Test Case:  Assigned delivery person appears on admin order detail
    Test Case:  Unassigned orders appear in a dedicated queue
    Release:    REL-XXXX (not yet assigned — module not started)
Sub-module:    Delivery Status
Feature:       Delivery Status Tracking
  Sub-feature: Status progression (Assigned → Picked Up → In Transit → Delivered)
    User Story: As a customer, I want to see the current delivery status of my order so I know when to expect it.
    Dev Task:   Add deliveryStatus field to deliveryTasks
    Dev Task:   Expose status to customer order detail page
    Test Case:  Status changes are reflected on customer order detail in real time
Sub-module:    Proof of Delivery
Feature:       Capture delivery confirmation
  Sub-feature: Photo or signature capture
    User Story: As an admin, I want proof that an order was delivered so I can resolve disputes.
    Dev Task:   Add proofUrl and signedAt fields to deliveryTasks
    Dev Task:   Add upload mechanism for delivery photo
    Test Case:  Delivery photo is stored and visible on admin order detail
```

---

## Example 3 — Razorpay Payment Integration

```
Product:       Nuemart
Module:        Payment Management
Sub-module:    Razorpay
Feature:       One-time Payment at Checkout
  Sub-feature: Create Razorpay order from backend
    User Story: As a customer, I want to pay for my grocery order using UPI, cards or wallets.
    Dev Task:   Add RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET to Convex env
    Dev Task:   Write createRazorpayOrder Convex action (Razorpay Orders API)
    Dev Task:   Store razorpayOrderId on Nuemart order
    Test Case:  Razorpay order is created with correct amount in paise
  Sub-feature: Razorpay Checkout on frontend
    Dev Task:   Load Razorpay checkout.js script
    Dev Task:   Open checkout modal with order ID and key
    Dev Task:   Pass payment response to webhook verification
    Test Case:  Checkout modal opens with correct amount
    Test Case:  Successful test payment closes modal and shows order confirmation
  Sub-feature: Webhook verification
    Dev Task:   Create Convex HTTP action for /razorpay-webhook
    Dev Task:   Verify HMAC-SHA256 signature using RAZORPAY_WEBHOOK_SECRET
    Dev Task:   Update order paymentStatus to "paid" on verified success
    Dev Task:   Trigger stock reduction on verified payment
    Test Case:  Valid webhook signature updates order status to paid
    Test Case:  Invalid webhook signature is rejected with 400
    Test Case:  Cart clears only after webhook-verified payment
    Release:    REL-XXXX (Pending — awaiting Razorpay merchant account approval)
  Sub-feature: Razorpay Subscription — Free Delivery (Phase 12 — separate future phase)
    User Story: As a customer, I want to subscribe to a free-delivery plan so my delivery fee is waived.
    Dev Task:   Write createRazorpaySubscription Convex action
    Dev Task:   Add subscription webhook handler (subscription.activated / cancelled / expired)
    Dev Task:   Add freeShippingEligible and subscriptionStatus fields to users schema (Phase 12 schema migration)
    Dev Task:   Apply ₹0 delivery fee at checkout when freeShippingEligible is true
    Test Case:  Active subscriber sees ₹0 delivery at checkout
    Test Case:  Expired subscription restores normal delivery fee
    Note:       This is Phase 12 scope — entirely separate from Phase 11 Razorpay payment integration
```

---

*Last updated: 2026-06-21*
