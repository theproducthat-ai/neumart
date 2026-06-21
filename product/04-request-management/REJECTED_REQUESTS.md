# Nuemart — Rejected Requests

Requests that have been formally rejected. A rejected request will not be built as described. It may be reopened only if the underlying business or technical context changes significantly.

---

## Rules

- Rejection requires a documented reason. "Not now" is Parked, not Rejected.
- Every rejection must have a Decision Owner — the person or role that made the call.
- Can Reopen? should be answered honestly. If the answer is "never under any circumstance", say so.
- Rejected requests are never deleted. They remain for traceability and to prevent the same idea from being re-raised without reference to the previous decision.

---

## Rejected Register

| Request ID | Title | Reason Rejected | Rejected Date | Decision Owner | Can Reopen? | Notes |
|---|---|---|---|---|---|---|
| — | No rejected requests | — | — | — | — | Product OS initialized 2026-06-21 |

---

## Permanently Rejected: Technical and Architectural Decisions

The following technical approaches are permanently rejected by product principle. They do not need a formal REQ entry because the underlying decision is already settled and documented in the Decision Log. Any request proposing one of these approaches should reference the linked decision before re-evaluation.

| Approach | Reason Rejected | Source Decision |
|---|---|---|
| Stripe as payment provider for India | Razorpay is the chosen payment provider. Stripe does not natively support UPI at the required scale and cost for India. | DEC-001 / PRODUCT_PRINCIPLES.md §1 |
| Clerk Billing for payment or subscription processing | Payment and subscription billing must go through Razorpay, not Clerk. Clerk is used only for authentication and role management. | DEC-001 / PRODUCT_PRINCIPLES.md §1 |
| userId passed from frontend to Convex | Spoofable — any user could impersonate another. User identity must be resolved server-side via `ctx.auth.getUserIdentity()`. | DEC-003 / PRODUCT_PRINCIPLES.md §4 |
| Manual TypeScript interfaces for Convex document shapes | Interfaces drift silently from schema. Use `Doc<"tableName">` and `Id<"tableName">` from Convex generated types instead. | DEC-009 / PRODUCT_PRINCIPLES.md §8 |
| Razorpay npm SDK (`npm install razorpay`) | The SDK has Node.js-only dependencies incompatible with the Convex V8 runtime. Razorpay itself is the chosen payment provider — only the npm SDK is rejected. Use `fetch` + Basic Auth instead. | DEC-006 / PRODUCT_PRINCIPLES.md §9 |

---

## Future Roadmap Candidates (Not Rejected)

The following areas are outside the current MVP scope but are valid candidates for future evaluation. They are not rejected — they have not been evaluated yet. When the time is right, raise a REQ and take them through the standard evaluation pipeline.

| Area | Description | Earliest Consideration |
|---|---|---|
| Delivery Management | Assign delivery personnel, track delivery status, notify customers | After Razorpay integration is live and order volume justifies it |
| Discount Coupons | Coupon codes, percentage or flat discounts, minimum order rules | After core payment flow is stable |
| Multi-branch / Multi-site | Support multiple store locations or white-label instances | After single-store MVP is validated in production |
| Customer Notifications | SMS or email notifications for order status changes | After order volume grows; evaluate Twilio / AWS SES |

---

*Last updated: 2026-06-21*
