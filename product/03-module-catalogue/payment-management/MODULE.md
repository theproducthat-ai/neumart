# Module: Payment Management

## Purpose

Manages all payment flows on the Nuemart platform — from the current Pay Later MVP model to the upcoming Razorpay online payment integration and future capabilities like refunds and reconciliation.

---

## Status

**Partial** — Pay Later is built and operational. Razorpay integration is pending merchant account approval (Phase 11).

---

## Sub-modules

| Sub-module | File | Status |
|---|---|---|
| Pay Later | `pay-later.md` | Built |
| Razorpay Payments | `razorpay.md` | Pending — Phase 11 |
| Payment Verification | `payment-verification.md` | Pending — Phase 11 |
| Razorpay Webhooks | `razorpay-webhooks.md` | Pending — Phase 11 |
| Refunds | `refunds.md` | Future Candidate |
| Reconciliation | `reconciliation.md` | Future Candidate |

---

## Built Features (Summary)

- Pay Later order placement: orders created with `paymentMethod: "pay_later"` and `paymentStatus: "pending"`
- Payments table records each order's payment with amount, method, and status
- Admin can view order payment status and manually update order status

---

## Pending Features (Phase 11)

- Razorpay order creation via Razorpay Orders API
- Razorpay Checkout SDK integration on the frontend
- Server-side HMAC-SHA256 payment signature verification
- Razorpay webhook handler for `payment.captured` and `payment.failed` events
- Stock deduction on webhook-verified payment (currently deducted at order placement)

---

## Future Candidates

- Refunds via Razorpay Refunds API (post Phase 11)
- Payment reconciliation — matching Razorpay settlements to Nuemart orders (post Phase 11)
- Razorpay Subscription for free delivery — a separate future phase (Phase 12); not part of Phase 11 scope

---

## Related Modules

| Module | Relationship |
|---|---|
| Customer Commerce | Checkout triggers payment; cart clears on verified payment |
| Inventory Management | Verified payment triggers stock deduction (Phase 11) |
| User Management | Payment linked to Convex user identity |
| Reporting & Analytics | Payment data feeds revenue reports |
| Admin Console | Payment reference IDs displayed on admin order detail |

---

## Risks and Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Razorpay merchant account not yet approved | Phase 11 cannot start | Business to track approval; Pay Later is the operational fallback |
| Env vars must be in Convex dashboard | Setting them in `.env.local` will break webhook handler | Document clearly in Phase 11 implementation guide |
| Webhook secret must be kept secure | Leaked secret allows fake payment verification | Stored only in Convex env — never committed to code |

---

*Last updated: 2026-06-21 — Patched: removed Razorpay Membership sub-module; updated hierarchy to Pay Later / Razorpay Payments / Payment Verification / Razorpay Webhooks / Refunds / Reconciliation.*
