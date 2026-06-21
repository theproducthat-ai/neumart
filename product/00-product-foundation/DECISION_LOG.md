# Nuemart — Decision Log

This log captures significant product and engineering decisions. Each entry records what was decided, why, and what alternatives were considered. This helps future contributors understand constraints without re-litigating settled questions.

---

## DEC-001 — Razorpay is the payment provider; Stripe and Clerk Billing are excluded

**Date:** Project inception  
**Decision:** All payments and subscriptions use Razorpay. Stripe is not used. Clerk Billing is not used.  
**Reason — Razorpay chosen:** Nuemart is built for India. Razorpay natively supports UPI, net banking, wallets and cards with INR settlement and is the standard for Indian e-commerce.  
**Reason — Stripe excluded:** Stripe does not natively support UPI at the scale and cost required for India. It is not a payment provider decision for this market.  
**Reason — Clerk Billing excluded:** Clerk is used only for authentication and admin role management. Payment and subscription billing must not be routed through Clerk — that is Razorpay's domain. Mixing payment handling into the auth layer creates an unnecessary coupling.  
**Alternatives considered:** Stripe, Cashfree, PayU.  
**Status:** Permanent.

---

## DEC-002 — Store all monetary values in paise

**Date:** Phase 1  
**Decision:** All monetary amounts in schema and Convex are stored as integers in paise (₹1 = 100 paise). Display formatting is done in the UI layer via `formatCurrency()`.  
**Reason:** Floating-point arithmetic on prices causes rounding bugs. Integer paise arithmetic is exact.  
**Status:** Permanent.

---

## DEC-003 — No userId from frontend

**Date:** Phase 1  
**Decision:** No Convex query or mutation accepts a `userId` argument from the client.  
**Reason:** A client-supplied userId can be spoofed, allowing one user to read or modify another's data. All functions resolve the caller identity internally via `ctx.auth.getUserIdentity()`.  
**Status:** Permanent rule. Any PR that introduces a userId param must be rejected.

---

## DEC-004 — Zustand + localStorage for cart, not Convex

**Date:** Phase 2  
**Decision:** The shopping cart is stored in Zustand with `persist` middleware writing to `localStorage` under the key `"nuemart-cart"`. Cart state does not live in Convex.  
**Reason:** Cart interactions are frequent, synchronous and user-local. Storing cart in Convex would add round-trip latency for every quantity change and require auth for a fundamentally pre-auth action. localStorage with Zustand is simpler, faster and survives page refreshes without a backend call.  
**Trade-off:** Cart is lost if the user clears localStorage. Accepted for MVP.  
**Status:** MVP decision. A Convex-backed cart is a post-MVP consideration.

---

## DEC-005 — Pay Later instead of immediate Razorpay (MVP only)

**Date:** Phase 5  
**Decision:** The initial checkout flow places orders with `paymentMethod: "pay_later"` and `paymentStatus: "pending"`. No Razorpay call is made.  
**Reason:** Razorpay merchant account was not yet approved at the time of MVP build. The Pay Later flow allowed the full order, inventory and admin fulfilment workflow to be built and tested without payment.  
**Status:** Temporary. Razorpay integration (Phase 11) will replace this with real payment collection.

---

## DEC-006 — Razorpay API called via fetch + Basic Auth; npm SDK not installed

**Date:** Phase 1 (planned)  
**Decision:** Razorpay is the chosen payment provider. However, the `razorpay` npm package (SDK) is not installed. All Razorpay REST API calls from Convex use `fetch` with an `Authorization: Basic` header constructed via `btoa(KEY_ID + ":" + KEY_SECRET)`.  
**Reason:** The Razorpay npm SDK has Node.js-only dependencies that are incompatible with the Convex V8 runtime. Using `fetch` directly works natively in V8 without requiring `"use node"`, avoids runtime errors, and keeps the bundle lean. This decision is about the implementation approach, not about Razorpay itself.  
**Status:** Permanent (unless Convex V8 runtime gains Node.js compatibility or the Razorpay SDK is ported to a V8-compatible build).

---

## DEC-007 — Stock reduced at order placement (Pay Later MVP)

**Date:** Phase 5  
**Decision:** In the current Pay Later flow, stock is reduced when the order is placed (not after payment).  
**Reason:** Without payment verification, the only event that indicates a firm order commitment is placement. Reducing stock at placement prevents over-selling.  
**Note:** When Razorpay integration is live, the design will shift: stock will be reduced only after `payment.captured` webhook fires (with idempotency guard). See BUILD_PLAN.md §12.  
**Status:** Temporary. Will be revisited in Phase 11.

---

## DEC-008 — Admin role via Clerk publicMetadata, not a separate DB table

**Date:** Phase 1  
**Decision:** Admin role is stored in Clerk `publicMetadata.role = "admin"` and surfaced via a Clerk JWT template. No separate `admins` table exists in Convex.  
**Reason:** Clerk is already the auth system. Storing role in publicMetadata avoids a sync problem and provides a single source of truth for authorization. The JWT template injects the role into every token claim, making it available in both middleware and Convex.  
**Status:** Permanent for MVP. A multi-role system would revisit this.

---

## DEC-009 — No manual TypeScript interfaces for Convex document shapes

**Date:** Phase 1  
**Decision:** `Doc<"tableName">` and `Id<"tableName">` from Convex generated types are used everywhere. No hand-rolled interfaces.  
**Reason:** Manual interfaces drift from the schema silently. Convex's generated types are always in sync with `schema.ts`.  
**Status:** Permanent rule.

---

## DEC-010 — Next.js with --webpack flag

**Date:** Phase 1  
**Decision:** The production build uses `next build --webpack` instead of the default Turbopack.  
**Reason:** Zod (used by react-hook-form + shadcn Form) has optional peers that pnpm does not symlink. This causes a module resolution failure under Turbopack. The webpack build resolves this via an alias in `next.config.ts`. See memory: feedback_zod_pnpm_webpack.md.  
**Status:** Permanent until Turbopack's module resolution for pnpm optional peers is fixed upstream.

---

## DEC-011 — useSearchParams with Suspense wrapper for client pages

**Date:** Phase 10  
**Decision:** Any client component page that calls `useSearchParams()` wraps its inner content in a `<Suspense>` boundary via a split into an inner component.  
**Reason:** Next.js App Router requires a Suspense boundary around components that call `useSearchParams()`. Without it, the page fails to build or renders incorrectly in static generation mode.  
**First applied:** `app/(admin)/admin/inventory/page.tsx` (Phase 10).  
**Status:** Standard pattern to follow for all future pages using useSearchParams.

---

## DEC-012 — Delivery task creation is atomic with order placement

**Date:** 2026-06-21  
**Decision:** The `deliveryTasks` record is created inside the same Convex mutation as order placement, not as a separate async call.  
**Reason:** A delivery task that silently fails to create would leave the admin with no delivery section to manage. Treating it as a separate call introduces a partial-failure state where an order exists but has no delivery task. Atomic creation eliminates this state entirely.  
**Status:** Permanent for MVP. If delivery task creation is ever decoupled (e.g. via a Convex action), a compensating mechanism must be defined.

---

## DEC-013 — Delivery status is fully decoupled from order status, payment status, and stock

**Date:** 2026-06-21  
**Decision:** No delivery mutation may write to `orders`, `payments`, or `products` tables. Delivery status changes have zero side effects on order status, payment status, or inventory.  
**Reason:** Coupling delivery to order/payment/stock state creates cascading risk — a failed delivery incorrectly triggering a refund, stock restock, or order cancellation. By defining hard independence rules, delivery mutations are safe to call without any risk of corrupting financial or inventory data.  
**Alternatives considered:** Auto-cancel order on failed delivery; auto-restock on delivery failure. Both rejected for MVP due to unresolved business process definition.  
**Status:** Permanent for MVP. Can be revisited when failed delivery workflows are formally specified.

---

## DEC-014 — Delivery person stored as inline strings (name + contact), not as FK to a deliveryPersons table

**Date:** 2026-06-21  
**Decision:** In the Delivery MVP, the assigned delivery person is stored on `deliveryTasks` as `assignedTo` (string) and `assignedContact` (string). No `deliveryPersons` table is created in MVP.  
**Reason:** Creating a `deliveryPersons` table in MVP would require a UI to manage delivery persons, assignment governance, and possibly a new role. The business is not ready to define that workflow. Inline strings allow the admin to assign flexibly without any setup. The schema is designed (no FK constraint) to allow future migration to a `deliveryPersons` FK model.  
**Status:** MVP decision. Will be revisited when delivery volume warrants a managed rider roster.

---

*Last updated: 2026-06-21*
