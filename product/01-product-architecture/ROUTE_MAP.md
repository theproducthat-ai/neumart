# Nuemart — Route Map

All current application routes mapped to their Screen ID, module, and status. This is the navigation contract for the platform.

---

## Rules

- Every route must have a corresponding Screen ID in `SCREEN_REGISTRY.md`.
- New routes require a new Screen ID — generate from `MASTER_REGISTRY.md`.
- Do not add routes to this file unless they exist in application code or have been formally planned.

---

## Customer Routes

| Route | Screen ID | Module | Purpose | Status |
|---|---|---|---|---|
| `/` | — | — | Root redirect — navigates to `/products` | Built |
| `/products` | SCR-CUS-0001 | Customer Commerce | Main product listing; search and category filter | Built |
| `/products/[slug]` | SCR-CUS-0002 | Customer Commerce | Product detail page by slug | Built |
| `/cart` | SCR-CUS-0003 | Customer Commerce | View and manage cart items | Built |
| `/favourites` | SCR-CUS-0004 | Customer Commerce | View saved favourite products | Built |
| `/addresses` | SCR-CUS-0005 | User Management | List saved delivery addresses | Built |
| `/addresses/new` | SCR-CUS-0006 | User Management | Add a new delivery address | Built |
| `/addresses/[id]/edit` | SCR-CUS-0007 | User Management | Edit an existing address | Built |
| `/checkout` | SCR-CUS-0008 | Customer Commerce | Checkout flow — address guard + order placement | Built |
| `/orders` | SCR-CUS-0009 | Customer Commerce | Customer order history | Built |
| `/orders/[id]` | SCR-CUS-0010 | Customer Commerce | Single order detail — items, status, payment | Built |
| `/sign-in/[[...sign-in]]` | SCR-AUTH-0001 | User Management | Clerk sign-in (catch-all route) | Built |
| `/sign-up/[[...sign-up]]` | SCR-AUTH-0002 | User Management | Clerk sign-up (catch-all route) | Built |

---

## Admin Routes

| Route | Screen ID | Module | Purpose | Status |
|---|---|---|---|---|
| `/admin` | SCR-ADM-0001 | Admin Console | Dashboard — order stats, inventory summary | Built |
| `/admin/categories` | SCR-ADM-0002 | Admin Console | Category management list | Built |
| `/admin/categories/new` | SCR-ADM-0003 | Admin Console | Create a new category | Built |
| `/admin/categories/[id]/edit` | SCR-ADM-0004 | Admin Console | Edit an existing category | Built |
| `/admin/products` | SCR-ADM-0005 | Admin Console | Product management list | Built |
| `/admin/products/new` | SCR-ADM-0006 | Admin Console | Create a new product | Built |
| `/admin/products/[id]/edit` | SCR-ADM-0007 | Admin Console | Edit an existing product | Built |
| `/admin/orders` | SCR-ADM-0008 | Admin Console | Order management list with filters | Built |
| `/admin/orders/[id]` | SCR-ADM-0009 | Admin Console | Order detail — status update, payment info | Built |
| `/admin/inventory` | SCR-ADM-0010 | Admin Console | Inventory overview — all products with stock | Built |
| `/admin/inventory/[productId]` | SCR-ADM-0011 | Admin Console | Stock movement history + manual adjustment | Built |

---

## Route Guards

| Guard | Applied To | Mechanism |
|---|---|---|
| Authentication required | All customer routes except `/sign-in`, `/sign-up` | Clerk `auth()` + middleware |
| Admin role required | All `/admin/*` routes | Server-side Clerk public metadata `role === "admin"` check in admin layout |

---

## Planned Future Routes

| Route | Module | Purpose | Status |
|---|---|---|---|
| `/admin/coupons` | Admin Console | Coupon management | Proposed |
| `/admin/coupons/new` | Admin Console | Create a new coupon | Proposed |
| `/admin/coupons/[id]/edit` | Admin Console | Edit a coupon | Proposed |
| `/admin/delivery` | Delivery Management | Delivery queue and assignment | Proposed — Candidate module |
| `/admin/delivery/[id]` | Delivery Management | Delivery task detail | Proposed — Candidate module |
| `/checkout/payment` | Payment Management | Razorpay payment status callback | Planned (Phase 11) |

*Assign Screen IDs when these routes move to Planned.*

---

## Route Naming Conventions

- Customer routes: no prefix (e.g. `/products`, `/cart`)
- Admin routes: `/admin` prefix (e.g. `/admin/products`)
- Dynamic segments: Next.js App Router convention `[param]` (e.g. `[id]`, `[slug]`, `[productId]`)
- Auth routes: Clerk catch-all convention `[[...sign-in]]`

---

*Last updated: 2026-06-21*
