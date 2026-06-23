# Nuemart Product OS — Screen Map

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

**Migration Note:** This file consolidates and extends `product/01-product-architecture/SCREEN_REGISTRY.md`. That file remains the authoritative screen registry; this map adds graph-layer relationships and feature linkage.

---

## 1. Screen Count Summary

| Category | Count | Status |
|---|---|---|
| Customer Commerce Screens (SCR-CUS) | 10 | All Built |
| Admin Console Screens (SCR-ADM) | 11 | All Built |
| Auth Screens (SCR-AUTH) | 2 | All Built |
| **Total Built Screens** | **23** | |
| Planned / Proposed Screens | 5+ | Not Built |

---

## 2. Customer Commerce Screens (SCR-CUS)

| Screen ID | Route | Screen Name | Module | Sub-module | Status | Features | Notes |
|---|---|---|---|---|---|---|---|
| SCR-CUS-0001 | /products | Product Listing Page | COM | PLP | Built | FEATURE-COM-PLP-CAROUSEL | Main storefront; search and category filter; carousel at top |
| SCR-CUS-0002 | /products/[slug] | Product Detail Page | COM | PDP | Built | — | Individual product page; slug-based routing |
| SCR-CUS-0003 | /cart | Cart | COM | CART | Built | — | Zustand cart with localStorage persistence |
| SCR-CUS-0004 | /favourites | Favourites | COM | FAV | Built | — | Customer saved products list |
| SCR-CUS-0005 | /addresses | Address List | USR | ADDR | Built | — | View, set default, delete saved addresses |
| SCR-CUS-0006 | /addresses/new | Add New Address | USR | ADDR | Built | — | Address creation form |
| SCR-CUS-0007 | /addresses/[id]/edit | Edit Address | USR | ADDR | Built | — | Edit an existing address by ID |
| SCR-CUS-0008 | /checkout | Checkout | COM | CHK | Built | — | Order summary, address guard, Pay Later placement; Razorpay to be added Phase 11 |
| SCR-CUS-0009 | /orders | Order History | COM | ORDHIS | Built | — | List of all customer orders with status |
| SCR-CUS-0010 | /orders/[id] | Order Detail | COM | ORDHIS | Built | — | Full detail for a single order including payment and items |

---

## 3. Admin Console Screens (SCR-ADM)

| Screen ID | Route | Screen Name | Module | Sub-module | Status | Features | Notes |
|---|---|---|---|---|---|---|---|
| SCR-ADM-0001 | /admin | Admin Dashboard | ADM | ADMDASH | Built | — | Overview stats: orders, inventory alerts, revenue |
| SCR-ADM-0002 | /admin/categories | Category List | ADM | ADMCAT | Built | — | List all categories with active toggle |
| SCR-ADM-0003 | /admin/categories/new | New Category | ADM | ADMCAT | Built | — | Create a new category |
| SCR-ADM-0004 | /admin/categories/[id]/edit | Edit Category | ADM | ADMCAT | Built | — | Edit category name, slug, active status |
| SCR-ADM-0005 | /admin/products | Product List | ADM | ADMPRODUCT | Built | — | List all products with active toggle |
| SCR-ADM-0006 | /admin/products/new | New Product | ADM | ADMPRODUCT | Built | — | Create a new product with category, price and stock |
| SCR-ADM-0007 | /admin/products/[id]/edit | Edit Product | ADM | ADMPRODUCT | Built | — | Edit product details |
| SCR-ADM-0008 | /admin/orders | Order List | ADM | ADMORD | Built | — | All orders with status and payment filters |
| SCR-ADM-0009 | /admin/orders/[id] | Admin Order Detail | ADM | ADMORD | Built | — | Order detail with status update; Razorpay reference IDs when live |
| SCR-ADM-0010 | /admin/inventory | Inventory Overview | ADM/INV | ADMINV | Built | — | All products with stock status; filter by low/out-of-stock |
| SCR-ADM-0011 | /admin/inventory/[productId] | Inventory Detail | ADM/INV | ADMINV | Built | — | Stock movement history for a single product; manual stock adjustment |

---

## 4. Auth Screens (SCR-AUTH)

| Screen ID | Route | Screen Name | Module | Sub-module | Status | Notes |
|---|---|---|---|---|---|---|
| SCR-AUTH-0001 | /sign-in | Sign In | USR | AUTH | Built | Clerk-managed sign-in; catch-all route [[...sign-in]] |
| SCR-AUTH-0002 | /sign-up | Sign Up | USR | AUTH | Built | Clerk-managed sign-up; catch-all route [[...sign-up]] |

---

## 5. Planned / Proposed Screens (Not Yet Built)

IDs will be assigned from the Master Registry when screens move from Proposed to Planned.

| Provisional ID | Route (proposed) | Screen Name | Module | Sub-module | Status | Linked Feature | Notes |
|---|---|---|---|---|---|---|---|
| SCR-ADM-0012 | /admin/delivery | Delivery Management List | ADM/DEL | DELASSIGN | Proposed | FEATURE-DEL-CORE-DELIVERY-MVP | List of orders and delivery task status |
| SCR-ADM-0013 | /admin/delivery/[id] | Delivery Task Detail | ADM/DEL | DELSTATUS | Proposed | FEATURE-DEL-CORE-DELIVERY-MVP | Assign delivery person, update status, record proof |
| SCR-CUS-0011 | /checkout/payment | Razorpay Payment Status | COM/PAY | PAYCHK | Planned | Phase 11 — Razorpay | Payment callback / status screen post-Razorpay integration |
| — | /admin/coupons | Coupon Management | ADM | ADMCOUPON | Proposed | Future Candidate | Admin CRUD for discount codes |
| — | /admin/coupons/[id] | Coupon Detail | ADM | ADMCOUPON | Proposed | Future Candidate | View usage stats for a specific coupon |

---

## 6. Next Screen ID Reference

| Prefix | Last Used | Next Available |
|---|---|---|
| SCR-CUS | SCR-CUS-0010 | SCR-CUS-0011 |
| SCR-ADM | SCR-ADM-0011 | SCR-ADM-0012 |
| SCR-AUTH | SCR-AUTH-0002 | SCR-AUTH-0003 |

**Rule:** Always assign Screen IDs from the Master Registry. Do not self-assign; check `OBJECT_INDEX.md` and `SCREEN_REGISTRY.md` first.

---

## 7. Screen Status Lifecycle

| Status | Meaning |
|---|---|
| Proposed | Idea raised — not yet committed to roadmap |
| Planned | Committed to roadmap — not yet in development |
| In Development | Active development sprint |
| Built | Code exists and is functional in the app |
| Released | Shipped to production |
| Deprecated | No longer in active use |
| Rejected | Decided against building |

---

*Last updated: 2026-06-22*
