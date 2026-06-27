# Nuemart Product OS — Dependency Map

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** SUPERSEDED — Read-only

> **SUPERSEDED** (2026-06-24): This file is the V1 dependency map. The authoritative V2 replacements are:
> - **`product/indexes/DEPENDENCY_INDEX.md`** — cross-object dependencies (blocked object → blocking object)
> - **`product/indexes/MODULE_DEPENDENCY_MAP.md`** — module-to-module dependency matrix
>
> Do not add new entries here. This file is retained for historical reference only.

---

## Introduction

This file maps all known dependencies across features, modules, and external systems. A dependency is anything that must be available, built, approved, or completed before another item can proceed.

---

## 1. Current Feature Dependencies

| Feature | Depends On | Reason | Status |
|---|---|---|---|
| FEATURE-DEL-CORE-DELIVERY-MVP | Convex `deliveryTasks` schema migration | New table required for delivery task storage | Blocked — not yet built |
| FEATURE-DEL-CORE-DELIVERY-MVP | Order placement mutation (`placeOrder`) | Delivery task must be created atomically inside order mutation (DEC-012) | Available — but needs modification |
| FEATURE-DEL-CORE-DELIVERY-MVP | Admin Console (MODULE-ADM) | Delivery management UI lives within admin screens | Built |
| FEATURE-DEL-CORE-DELIVERY-MVP | Customer Commerce orders (MODULE-COM) | Delivery tasks sourced from placed orders | Built |
| FEATURE-COM-PLP-CAROUSEL | Hardcoded banner data in component | Current: no Convex banners table | Workaround in place |
| FEATURE-COM-PLP-CAROUSEL | SCR-CUS-0001 (Product Listing Page) | Carousel renders on this screen | Built |
| FEATURE-COM-PLP-CAROUSEL | ShadCN component library | UI base components | Built |
| FEATURE-COM-PLP-CAROUSEL | *(Future)* Convex `banners` table | Required only if admin-managed carousel is approved | Candidate — not committed |

---

## 2. Module Dependencies

*Consolidated from `product/01-product-architecture/MODULE_DEPENDENCY_MAP.md`. That file remains the authoritative source; this section summarises for graph traversal.*

### Customer Commerce (MODULE-COM) depends on:

| Module / System | Nature | Status |
|---|---|---|
| User Management (MODULE-USR) | Clerk auth required for cart, checkout, orders | Built |
| Inventory Management (MODULE-INV) | Stock levels enforced at order placement | Built |
| Payment Management (MODULE-PAY) — Pay Later | Pay Later flow at checkout | Built |
| Payment Management (MODULE-PAY) — Razorpay | Online payment at checkout | Pending — Phase 11 blocked |
| [Discount Coupons] | Coupon codes at cart/checkout | Future Candidate |

### Admin Console (MODULE-ADM) depends on:

| Module / System | Nature | Status |
|---|---|---|
| User Management (MODULE-USR) | Clerk admin role check gates all /admin/* routes | Built |
| Inventory Management (MODULE-INV) | Inventory screens live under admin | Built |
| Reporting & Analytics (MODULE-RPT) | Dashboard stats | Built (basic) |
| Payment Management (MODULE-PAY) | Razorpay IDs on order detail | Pending — Phase 11 |
| [Delivery Management (MODULE-DEL)] | Delivery assignment UI | Candidate |
| [Discount Coupons] | Admin CRUD for coupons | Future Candidate |

### Inventory Management (MODULE-INV) depends on:

| Module / System | Nature | Status |
|---|---|---|
| Customer Commerce (MODULE-COM) | Order placement triggers stock deduction | Built |
| Admin Console (MODULE-ADM) | Manual stock adjustments via admin | Built |
| Payment Management (MODULE-PAY) | Stock reduction on Razorpay webhook (Phase 11) | Pending |

### Payment Management (MODULE-PAY) depends on:

| Module / System | Nature | Status |
|---|---|---|
| User Management (MODULE-USR) | Payer identity linked to Convex user record | Built |
| Customer Commerce (MODULE-COM) | Order total and delivery fee from checkout | Built |
| Inventory Management (MODULE-INV) | Successful payment triggers stock deduction | Built (Pay Later) / Pending (Razorpay) |
| Razorpay (External) | Merchant account, Orders API, Checkout SDK, Webhooks | Blocked — awaiting account approval |

### User Management (MODULE-USR) depends on:

| Module / System | Nature | Status |
|---|---|---|
| Clerk (External) | Authentication, session management, role metadata | Built |
| Customer Commerce (MODULE-COM) | Address required as checkout prerequisite | Built |

### Reporting & Analytics (MODULE-RPT) depends on:

| Module / System | Nature | Status |
|---|---|---|
| Customer Commerce (MODULE-COM) | Order data for sales reporting | Built (basic) |
| Inventory Management (MODULE-INV) | Stock movement data | Built (basic) |
| Payment Management (MODULE-PAY) | Revenue and reconciliation data | Pending (Razorpay data) |
| [Delivery Management (MODULE-DEL)] | Delivery performance metrics | Candidate |
| [Discount Coupons] | Coupon usage reporting | Future Candidate |

### Delivery Management (MODULE-DEL) depends on:

| Module / System | Nature | Status |
|---|---|---|
| Customer Commerce (MODULE-COM) | Orders to be delivered | Candidate |
| User Management (MODULE-USR) | Delivery persons may need Clerk accounts/roles | Candidate |
| Admin Console (MODULE-ADM) | Delivery management UI within admin | Candidate |
| Reporting & Analytics (MODULE-RPT) | Delivery performance reporting | Candidate |

---

## 3. Module Dependency Diagram

```
                    +-------------------------+
                    |      User Management    |
                    |  (Clerk Auth + Addresses)|
                    +----------+--------------+
                               |
          +--------------------+--------------------+
          |                    |                    |
          v                    v                    v
+-----------------+  +-----------------+  +-----------------+
|Customer Commerce|  |  Admin Console  |  |   Payment Mgmt  |
| (Storefront)    |  | (Operations)    |  | (Pay Later/RPay)|
+--------+--------+  +--------+--------+  +--------+--------+
         |                    |                    |
         v                    v                    v
+-------------------------------------------------------+
|                  Inventory Management                 |
|         (stock levels, movements, audit trail)        |
+-----------------------+---------------------------------+
                        |
                        v
            +------------------------+
            | Reporting & Analytics  |
            |   (basic stats only)   |
            +------------------------+

- - - - - - - - CANDIDATE LAYER - - - - - - - - -

            +------------------------+
            |   Delivery Management  |  <- Candidate / Not Built
            |   (future evaluation)  |
            +------------------------+

- - - - - - FUTURE CANDIDATES - - - - - - - - - -

            +------------------------+
            |   Discount Coupons     |  <- Future Feature Candidate
            |   (cart + checkout)    |
            +------------------------+
```

---

## 4. External Dependencies

| Dependency | Module | Nature | Status |
|---|---|---|---|
| Clerk (auth.clerk.dev) | MODULE-USR | Authentication, session, role management | Active — Built |
| Convex (convex.dev) | ALL | Backend database, queries, mutations, actions | Active — Built |
| Razorpay | MODULE-PAY | Payment gateway — Orders API, Checkout SDK, Webhooks | Blocked — merchant account pending |
| ShadCN UI | MODULE-COM, MODULE-ADM | UI component library | Active — Built |
| pnpm | Build | Package manager (with webpack alias for zod — DEC-010) | Active |
| Next.js | ALL | Full-stack React framework (webpack build — DEC-010) | Active — Built |

---

## 5. Blocking Dependencies

| Blocked Item | Blocker | Blocker Type | Blocker Owner | Status |
|---|---|---|---|---|
| Phase 11 (Razorpay) | Razorpay merchant account approval | External | Razorpay/Business | Waiting — no ETA |
| FEATURE-DEL-CORE-DELIVERY-MVP development | Phase 11 completion (sequencing preference) | Internal sequencing | Product Owner | Waiting on Phase 11 |
| FEATURE-DEL-CORE-DELIVERY-MVP development | Convex schema migration for deliveryTasks | Technical | Engineering | Not started |
| Admin-managed Carousel | Product Owner commitment | Product decision | Product Owner | Candidate — not committed |
| RELEASE-COM-PLP-CAROUSEL-2026-06 | UAT sign-off | Product/UAT | Product Owner | Pending |

---

## 6. Dependency Resolution Status

| Dependency | Resolution Path | Target |
|---|---|---|
| Razorpay merchant account | Business team to submit/follow up with Razorpay | TBD |
| Delivery development sequencing | Begin after Phase 11 ships | Post-Phase 11 |
| Carousel UAT sign-off | Product Owner to review and sign off on UAT-0001 | Immediate |
| deliveryTasks schema migration | Included in DEVPLAN-0001 as first story (US-0001/STORY-DEL-CORE-DELIVERY-SCHEMA-001) | Post-Phase 11 |

---

*Last updated: 2026-06-22*
