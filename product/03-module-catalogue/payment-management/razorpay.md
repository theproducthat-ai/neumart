# Sub-module: Razorpay Payments

**Module:** Payment Management  
**Screen:** SCR-CUS-0008 (`/checkout`) — payment method  
**Status:** Pending — Phase 11

---

## Purpose

Online payment initiation for Nuemart via Razorpay — India's leading payment gateway. Covers creating a Razorpay order on the backend and launching the Razorpay Checkout SDK on the frontend. Payment trust and fulfilment logic live in the Payment Verification and Razorpay Webhooks sub-modules.

Supports UPI, credit/debit cards, net banking, and wallets.

---

## Current State

**Not yet built.** Phase 11 is blocked on Razorpay merchant account approval.

Pre-requisites:
- [ ] Razorpay merchant account approved
- [ ] `RAZORPAY_KEY_ID` available
- [ ] `RAZORPAY_KEY_SECRET` available
- [ ] `RAZORPAY_WEBHOOK_SECRET` available
- [ ] All env vars set in Convex dashboard (NOT in `.env.local`)

---

## Phase 11 — Razorpay Payments Implementation

### Step 1 — Create Razorpay Order (Backend)

- Convex action `createRazorpayOrder`:
  - Calls Razorpay Orders API with `amount` (in paise), `currency: "INR"`, `receipt` (Nuemart order number).
  - Returns `razorpayOrderId`.
- Nuemart `payments` record is updated with `gatewayOrderId`.

### Step 2 — Razorpay Checkout (Frontend)

- Load Razorpay Checkout SDK (`checkout.js`) on the checkout page.
- On "Pay Now", open the Razorpay modal with:
  - `key`: `RAZORPAY_KEY_ID`
  - `order_id`: `gatewayOrderId`
  - `amount`: order total in paise
  - `currency`: `"INR"`
  - `name`: store name
  - `description`: order summary
  - `prefill`: customer name, email, phone
- On frontend payment success: receive `razorpayPaymentId`, `razorpayOrderId`, `razorpaySignature` from the Razorpay callback.
- These are passed to the verification layer — **not trusted directly on the frontend**.

### Step 3 — Verification and Fulfilment

Payment signature verification and order fulfilment are handled by separate sub-modules:

- See `payment-verification.md` — HMAC-SHA256 signature verification
- See `razorpay-webhooks.md` — webhook event handling, order status update, stock deduction

---

## Security Rules

| Rule | Enforcement |
|---|---|
| Payment status only updated by webhook | `paymentStatus` is never set by a frontend mutation |
| Webhook signature verified server-side | HMAC-SHA256 using `RAZORPAY_WEBHOOK_SECRET` in Convex HTTP action |
| Keys stored in Convex env only | Never in `.env.local`, never committed to code |
| Test mode before production | End-to-end verified in Razorpay test mode before switching to live keys |

---

## Convex Functions Required (Phase 11)

| Function | Type | Purpose |
|---|---|---|
| `createRazorpayOrder` | Action | Call Razorpay Orders API; store `gatewayOrderId` on payments record |

---

## Out of Scope for Phase 11

- Razorpay Subscription (free delivery) — this is a separate future phase (Phase 12), not part of payment integration.
- Refunds — Future Candidate; see `refunds.md`.
- Reconciliation — Future Candidate; see `reconciliation.md`.

---

*Last updated: 2026-06-21 — Patched: removed Phase 12 Razorpay Subscriptions section; sub-module renamed to Razorpay Payments; verification and webhook content split into dedicated sub-module files.*
