# Nuemart Product OS — Decision Map

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

**Migration Note:** This file indexes decisions from `product/00-product-foundation/DECISION_LOG.md` (DEC-001 through DEC-014). That file remains the authoritative source of truth. This map adds semantic object IDs and cross-links to affected Product Objects.

---

## Decision Summary Table

| Decision ID | Legacy ID | Statement (short) | Date | Status | Risk | Linked Objects |
|---|---|---|---|---|---|---|
| DECISION-PAY-CORE-RAZORPAY-001 | DEC-001 | Razorpay is the only payment provider | Project inception | Permanent | Low | MODULE-PAY |
| DECISION-COM-DATA-PAISE-001 | DEC-002 | All monetary values stored in paise | Phase 1 | Permanent | Low | MODULE-COM, MODULE-PAY, ENTITY-COM-ORDERS, ENTITY-PAY-PAYMENTS |
| DECISION-USR-AUTH-NOUSERID-001 | DEC-003 | No userId accepted from frontend in any Convex function | Phase 1 | Permanent | High (security) | MODULE-USR, all Convex mutations |
| DECISION-COM-CART-ZUSTAND-001 | DEC-004 | Cart stored in Zustand + localStorage, not Convex | Phase 2 | MVP — revisit post-MVP | Low | FEATURE-COM-PLP-CAROUSEL (indirect), SCR-CUS-0003 |
| DECISION-PAY-MVP-PAYLATER-001 | DEC-005 | Pay Later used for MVP while Razorpay account pending | Phase 5 | Temporary — superseded in Phase 11 | Medium | MODULE-PAY, SCR-CUS-0008 |
| DECISION-PAY-RAZORPAY-FETCH-001 | DEC-006 | Razorpay API called via fetch + Basic Auth, not npm SDK | Phase 1 (planned) | Permanent | Low | MODULE-PAY |
| DECISION-INV-STOCK-ORDERPLACE-001 | DEC-007 | Stock reduced at order placement (Pay Later MVP) | Phase 5 | Temporary — shifts to webhook in Phase 11 | Medium | MODULE-INV, ENTITY-COM-ORDERS |
| DECISION-USR-ADMIN-CLERK-001 | DEC-008 | Admin role via Clerk publicMetadata, not separate DB table | Phase 1 | Permanent for MVP | Low | MODULE-USR, MODULE-ADM |
| DECISION-DEV-TYPES-CONVEX-001 | DEC-009 | No manual TypeScript interfaces for Convex document shapes | Phase 1 | Permanent | Low | All modules |
| DECISION-DEV-BUILD-WEBPACK-001 | DEC-010 | Next.js production build uses --webpack flag (not Turbopack) | Phase 1 | Permanent until upstream fix | Low | All modules |
| DECISION-COM-SEARCH-SUSPENSE-001 | DEC-011 | useSearchParams with Suspense wrapper for client pages | Phase 10 | Standard pattern | Low | MODULE-ADM (SCR-ADM-0010 first applied) |
| DECISION-DEL-TASK-ATOMIC-001 | DEC-012 | Delivery task creation is atomic with order placement | 2026-06-21 | Permanent for MVP | Medium | FEATURE-DEL-CORE-DELIVERY-MVP, ENTITY-DEL-DELIVERYTASKS, ENTITY-COM-ORDERS |
| DECISION-DEL-STATUS-DECOUPLED-001 | DEC-013 | Delivery status fully decoupled from order/payment/stock | 2026-06-21 | Permanent for MVP | High | FEATURE-DEL-CORE-DELIVERY-MVP, MODULE-DEL |
| DECISION-DEL-DATA-STRINGS-001 | DEC-014 | Delivery persons stored as inline strings, not FK references | 2026-06-21 | MVP — revisit when volume warrants | Medium | FEATURE-DEL-CORE-DELIVERY-MVP, ENTITY-DEL-DELIVERYTASKS |

---

## Decision Detail

### DECISION-PAY-CORE-RAZORPAY-001 (DEC-001)
**Statement:** All payments and subscriptions use Razorpay. Stripe and Clerk Billing are excluded.
**Reason:** Nuemart is India-first. Razorpay natively supports UPI, net banking, wallets, and cards with INR settlement.
**Alternatives considered:** Stripe, Cashfree, PayU.
**Status:** Permanent.
**Linked objects:** MODULE-PAY

---

### DECISION-COM-DATA-PAISE-001 (DEC-002)
**Statement:** All monetary amounts stored as integers in paise (100 paise = ₹1). Display formatting in UI only.
**Reason:** Floating-point arithmetic on prices causes rounding bugs. Integer paise arithmetic is exact.
**Status:** Permanent.
**Linked objects:** MODULE-COM, MODULE-PAY, ENTITY-COM-ORDERS, ENTITY-PAY-PAYMENTS

---

### DECISION-USR-AUTH-NOUSERID-001 (DEC-003)
**Statement:** No Convex query or mutation accepts a userId argument from the client.
**Reason:** Client-supplied userId can be spoofed. All functions resolve caller identity via `ctx.auth.getUserIdentity()`.
**Status:** Permanent rule. Any PR introducing a userId param must be rejected.
**Linked objects:** MODULE-USR, all Convex mutations

---

### DECISION-COM-CART-ZUSTAND-001 (DEC-004)
**Statement:** Shopping cart stored in Zustand with persist middleware writing to localStorage.
**Reason:** Cart interactions are frequent, synchronous, and user-local. Convex round-trips would add latency.
**Trade-off:** Cart is lost if localStorage is cleared. Accepted for MVP.
**Status:** MVP decision.
**Linked objects:** SCR-CUS-0003

---

### DECISION-PAY-MVP-PAYLATER-001 (DEC-005)
**Statement:** Initial checkout uses Pay Later (`paymentMethod: "pay_later"`, `paymentStatus: "pending"`).
**Reason:** Razorpay merchant account not yet approved at MVP build time.
**Status:** Temporary. Phase 11 replaces with Razorpay.
**Linked objects:** MODULE-PAY, SCR-CUS-0008

---

### DECISION-PAY-RAZORPAY-FETCH-001 (DEC-006)
**Statement:** Razorpay REST API called via fetch + Basic Auth. npm SDK not installed.
**Reason:** Razorpay npm SDK has Node.js-only dependencies incompatible with Convex V8 runtime.
**Status:** Permanent until upstream resolution.
**Linked objects:** MODULE-PAY

---

### DECISION-INV-STOCK-ORDERPLACE-001 (DEC-007)
**Statement:** In Pay Later flow, stock is reduced at order placement, not after payment.
**Reason:** Without payment verification, order placement is the only firm commitment event.
**Status:** Temporary. Shifts to webhook-only in Phase 11.
**Linked objects:** MODULE-INV, ENTITY-COM-ORDERS

---

### DECISION-USR-ADMIN-CLERK-001 (DEC-008)
**Statement:** Admin role stored in Clerk `publicMetadata.role = "admin"`. No separate admins table in Convex.
**Reason:** Avoids sync problem; Clerk is already the auth system. JWT template injects role into tokens.
**Status:** Permanent for MVP.
**Linked objects:** MODULE-USR, MODULE-ADM

---

### DECISION-DEV-TYPES-CONVEX-001 (DEC-009)
**Statement:** Use `Doc<"tableName">` and `Id<"tableName">` from Convex generated types everywhere. No hand-rolled interfaces.
**Reason:** Manual interfaces drift silently from schema. Convex generated types are always in sync.
**Status:** Permanent rule.
**Linked objects:** All modules

---

### DECISION-DEV-BUILD-WEBPACK-001 (DEC-010)
**Statement:** Production build uses `next build --webpack` instead of default Turbopack.
**Reason:** Zod (used by react-hook-form + shadcn Form) has optional peers that pnpm does not symlink. Turbopack fails; webpack resolves via alias in next.config.ts.
**Status:** Permanent until Turbopack pnpm optional peer resolution is fixed upstream.
**Linked objects:** All modules

---

### DECISION-COM-SEARCH-SUSPENSE-001 (DEC-011)
**Statement:** Any client component page that calls `useSearchParams()` wraps inner content in a `<Suspense>` boundary.
**Reason:** Next.js App Router requires Suspense around `useSearchParams()` components.
**First applied:** SCR-ADM-0010 (`app/(admin)/admin/inventory/page.tsx`)
**Status:** Standard pattern for all future pages using useSearchParams.
**Linked objects:** MODULE-ADM, SCR-ADM-0010

---

### DECISION-DEL-TASK-ATOMIC-001 (DEC-012)
**Statement:** The `deliveryTasks` record is created inside the same Convex mutation as order placement.
**Reason:** Separate call risks partial-failure state (order exists but no delivery task). Atomic creation eliminates this state.
**Status:** Permanent for MVP.
**Linked objects:** FEATURE-DEL-CORE-DELIVERY-MVP, ENTITY-DEL-DELIVERYTASKS, ENTITY-COM-ORDERS

---

### DECISION-DEL-STATUS-DECOUPLED-001 (DEC-013)
**Statement:** No delivery mutation may write to orders, payments, or products tables. Delivery status changes have zero side effects on order status, payment status, or inventory.
**Reason:** Coupling delivery to order/payment/stock creates cascading risk of incorrect refunds, restocks, or cancellations.
**Alternatives rejected:** Auto-cancel order on failed delivery; auto-restock on delivery failure.
**Status:** Permanent for MVP.
**Linked objects:** FEATURE-DEL-CORE-DELIVERY-MVP, MODULE-DEL

---

### DECISION-DEL-DATA-STRINGS-001 (DEC-014)
**Statement:** Assigned delivery person stored on `deliveryTasks` as `assignedTo` (string) and `assignedContact` (string). No `deliveryPersons` table in MVP.
**Reason:** Creating a `deliveryPersons` table requires UI, assignment governance, and a new role. Business not ready. Inline strings allow flexible assignment without setup.
**Status:** MVP decision. Revisit when delivery volume warrants a managed rider roster.
**Linked objects:** FEATURE-DEL-CORE-DELIVERY-MVP, ENTITY-DEL-DELIVERYTASKS

---

## Decision Classification by Type

| Type | Decisions |
|---|---|
| Technology Choice | DEC-001 (Razorpay), DEC-004 (Zustand), DEC-006 (fetch vs SDK), DEC-010 (webpack) |
| Security Rule | DEC-003 (no userId from frontend), DEC-008 (admin role via Clerk) |
| Data Modeling | DEC-002 (paise), DEC-009 (Convex types), DEC-014 (delivery strings) |
| Architecture Pattern | DEC-011 (Suspense), DEC-012 (atomic delivery task), DEC-013 (delivery decoupling) |
| MVP Workaround (Temporary) | DEC-005 (Pay Later), DEC-007 (stock at placement) |

---

*Last updated: 2026-06-22*
