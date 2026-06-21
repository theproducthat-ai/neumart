# Nuemart — Product Principles

These principles govern every product and engineering decision on Nuemart. When in doubt, return here.

---

## 1. India-First

This platform is built for India. Indian customers pay in INR using UPI, cards, net banking and wallets. All monetary values are stored in **paise** (₹1 = 100 paise). All payment infrastructure runs through **Razorpay**. Stripe and Clerk Billing are not used and must never be added.

---

## 2. Webhook-Verified Trust

Payment success is never trusted from the frontend. The Razorpay checkout `handler()` callback is UI-only. The only authoritative signal is the `payment.captured` webhook received by Convex, signature-verified using HMAC-SHA256.

> Cart clears only after `order.status === "confirmed"` is set by the webhook mutation.

---

## 3. Convex Is the Source of Truth

All order, payment, inventory, membership and user state lives in Convex only. The Next.js frontend reads from Convex in real time via `useQuery`. No state is duplicated in a separate database, Redis or localStorage beyond what is strictly UI-local (Zustand cart).

---

## 4. No userId From the Frontend

Convex functions never accept a `userId` argument from the client. Every function resolves the caller's identity internally via `ctx.auth.getUserIdentity()`. This prevents spoofed ID attacks and eliminates a class of authorization bugs.

---

## 5. Idempotency for Webhooks

Webhook handlers check `webhookVerified === true` before doing any work. If already verified, they return `200 OK` immediately without side effects. This prevents double inventory reduction and double order confirmation on Razorpay retries.

---

## 6. Scope Discipline

Build only what is in the current approved scope. Do not add delivery partner assignment, coupon systems, multi-branch support, Stripe, notifications or any feature not explicitly approved. Every new feature must go through the Request → Evaluation → PRD → Stories → Dev pipeline.

---

## 7. Admin Is the Store Owner

The admin panel has exactly one type of user: the store owner (or a trusted operator). Admin access is gated server-side by Clerk `publicMetadata.role === "admin"`. This check happens at three layers: middleware, layout, and inside every Convex admin function.

---

## 8. No Manual TypeScript Interfaces for Convex Shapes

Convex generates `Doc<"tableName">` and `Id<"tableName">` from the schema. Use them. Do not hand-roll duplicate interfaces for database shapes. This eliminates drift between schema and code.

---

## 9. Razorpay SDK Not Used

The Razorpay npm SDK is not installed. All Razorpay API calls use `fetch` with HTTP Basic Auth. This works in Convex's V8 runtime without `"use node"` and avoids Node.js-only dependency chains.

---

## 10. Stock Reduction Happens Once

Stock is reduced inside the `payment.captured` webhook mutation, after the idempotency check. Stock is never reduced on order creation. In the current Pay Later MVP, stock is reduced at order placement time (business decision: pre-allocate stock). This rule will shift when Razorpay integration is live.

---

## 11. Simplicity Over Abstraction

Three similar lines of code are better than a premature abstraction. Do not build helper layers, service classes, or utility wrappers unless a clear, repeated need exists. Prefer direct Convex query and mutation calls over middleware layers.

---

## 12. Loading States, Empty States, Error States — All Required

Every page that loads async data must handle: loading (skeleton), empty (zero items), error (toast or inline). No page can be shipped without all three. "It works when data exists" is not a complete implementation.

---

*Last updated: 2026-06-21*
