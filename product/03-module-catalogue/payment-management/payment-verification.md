# Sub-module: Payment Verification

**Module:** Payment Management  
**Status:** Pending — Phase 11

---

## Purpose

Ensures that payment success is only trusted from Razorpay's server-to-server signal — never from the customer's browser. Provides the cryptographic verification layer between the Razorpay Checkout frontend response and the order fulfilment logic in the webhook handler.

---

## Why Verification Is Separate from Payment Initiation

Razorpay returns a payment response to the frontend on checkout completion. This response includes `razorpayPaymentId`, `razorpayOrderId`, and `razorpaySignature`. These values **cannot be trusted directly** — a malicious actor could fabricate a successful payment response.

Payment verification uses HMAC-SHA256 to cryptographically confirm the response came from Razorpay before any order or stock update is triggered.

---

## Verification Mechanism

### HMAC-SHA256 Signature Check

Razorpay signs its payment response with the webhook secret. The verification formula is:

```
expected_signature = HMAC-SHA256(
  key    = RAZORPAY_WEBHOOK_SECRET,
  data   = razorpayOrderId + "|" + razorpayPaymentId
)
```

If `expected_signature === razorpaySignature` received from Razorpay, the payment is genuine.

This verification runs **server-side only** — inside a Convex HTTP action. The secret key never leaves the Convex environment.

---

## Where Verification Runs

Verification is performed inside the Razorpay webhook handler (`/razorpay-webhook` Convex HTTP action). It is the first thing the webhook handler does before any state mutation.

See `razorpay-webhooks.md` for the full webhook handler logic.

---

## What Happens on Verification Result

| Result | Action |
|---|---|
| Signature valid | Proceed to update order and stock state |
| Signature invalid | Return HTTP 400, log the attempt, take no further action |
| Missing fields | Return HTTP 400 |

---

## Security Rules

| Rule | Detail |
|---|---|
| Secret stored in Convex env only | `RAZORPAY_WEBHOOK_SECRET` is never in `.env.local` or committed to code |
| Verification is server-side | No client-side verification; browser-provided payment IDs are not acted upon directly |
| Failed verifications are logged | For audit and security monitoring |
| Order status never updated without verification | `paymentStatus: "paid"` is only set after a verified webhook event |

---

## Convex Functions Required (Phase 11)

| Function | Type | Purpose |
|---|---|---|
| `/razorpay-webhook` HTTP Action | Includes verification step | HMAC check runs before any mutation |

---

*Last updated: 2026-06-21*
