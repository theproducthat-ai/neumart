# Nuemart — Screen Registry

Single source of truth for all screens in the Nuemart platform. Every screen has a unique ID, a route, and a status.

---

## Rules

- **Check this file before creating any new screen.** If an existing screen covers the need, reference its Screen ID instead.
- **If an existing screen is impacted by a change**, reference the existing Screen ID in the request or PRD.
- **If a new screen is required**, generate the next Screen ID from `MASTER_REGISTRY.md`. Do not assign an ID manually.
- **Do not mark a screen as Built unless actual application code exists** for the corresponding route.
- **New screens start as Proposed.** They progress through the status lifecycle as work is planned and built.
- Screen IDs are never reused. A deprecated or rejected screen keeps its ID.

---

## Status Options

| Status | Meaning |
|---|---|
| Proposed | Idea raised — not yet committed to roadmap |
| Planned | Committed to roadmap — not yet in development |
| In Development | Active development sprint |
| Built | Code exists and is functional in the app |
| Released | Shipped to production |
| Deprecated | No longer in active use — may still exist in code |
| Rejected | Decided against building |

---

## Customer Screens

| Screen ID | Screen Name | Route | Module | Sub-module | Status | Notes |
|---|---|---|---|---|---|---|
| SCR-CUS-0001 | Product Listing | `/products` | Customer Commerce | Products | Built | Main storefront; supports search and category filter |
| SCR-CUS-0002 | Product Detail | `/products/[slug]` | Customer Commerce | Product Detail | Built | Individual product page; slug-based routing |
| SCR-CUS-0003 | Cart | `/cart` | Customer Commerce | Cart | Built | Zustand cart with localStorage persistence |
| SCR-CUS-0004 | Favourites | `/favourites` | Customer Commerce | Favourites | Built | Customer saved products list |
| SCR-CUS-0005 | Address List | `/addresses` | User Management | Addresses | Built | View, set default, delete saved addresses |
| SCR-CUS-0006 | Add New Address | `/addresses/new` | User Management | Addresses | Built | Address creation form |
| SCR-CUS-0007 | Edit Address | `/addresses/[id]/edit` | User Management | Addresses | Built | Edit an existing address by ID |
| SCR-CUS-0008 | Checkout | `/checkout` | Customer Commerce | Checkout | Built | Order summary, address guard, Pay Later placement; Razorpay to be added |
| SCR-CUS-0009 | Order History | `/orders` | Customer Commerce | Orders | Built | List of all customer orders with status |
| SCR-CUS-0010 | Order Detail | `/orders/[id]` | Customer Commerce | Orders | Built | Full detail for a single order including payment and items |
| SCR-CUS-0011 | Customer Profile | `/account/profile` | User Management | Profile | Planned | Customer QR code page — name, email, customerCode, QR display, download. PRD-0004. |
| SCR-CUS-0012 | QR Scan Result | `/qr/customer/[qrCodeId]` | User Management | Profile | Planned | Public QR scan landing page — limited public view; admin-enhanced view when signed in. PRD-0004. |

---

## Admin Screens

| Screen ID | Screen Name | Route | Module | Sub-module | Status | Notes |
|---|---|---|---|---|---|---|
| SCR-ADM-0001 | Admin Dashboard | `/admin` | Admin Console | Dashboard | Built | Overview stats: orders, inventory alerts, revenue |
| SCR-ADM-0002 | Category List | `/admin/categories` | Admin Console | Categories | Built | List all categories with active toggle |
| SCR-ADM-0003 | New Category | `/admin/categories/new` | Admin Console | Categories | Built | Create a new category |
| SCR-ADM-0004 | Edit Category | `/admin/categories/[id]/edit` | Admin Console | Categories | Built | Edit category name, slug, active status |
| SCR-ADM-0005 | Product List | `/admin/products` | Admin Console | Products | Built | List all products with active toggle |
| SCR-ADM-0006 | New Product | `/admin/products/new` | Admin Console | Products | Built | Create a new product with category, price and stock |
| SCR-ADM-0007 | Edit Product | `/admin/products/[id]/edit` | Admin Console | Products | Built | Edit product details |
| SCR-ADM-0008 | Order List | `/admin/orders` | Admin Console | Orders | Built | All orders with status and payment filters |
| SCR-ADM-0009 | Admin Order Detail | `/admin/orders/[id]` | Admin Console | Orders | Built | Order detail with status update; Razorpay reference IDs when live |
| SCR-ADM-0010 | Inventory Overview | `/admin/inventory` | Admin Console | Inventory | Built | All products with stock status; filter by low/out-of-stock |
| SCR-ADM-0011 | Inventory Detail | `/admin/inventory/[productId]` | Admin Console | Inventory | Built | Stock movement history for a single product; manual stock adjustment |

---

## Auth Screens

| Screen ID | Screen Name | Route | Module | Sub-module | Status | Notes |
|---|---|---|---|---|---|---|
| SCR-AUTH-0001 | Sign In | `/sign-in` | User Management | Authentication | Built | Clerk-managed sign-in; catch-all route `[[...sign-in]]` |
| SCR-AUTH-0002 | Sign Up | `/sign-up` | User Management | Authentication | Built | Clerk-managed sign-up; catch-all route `[[...sign-up]]` |

---

## Planned / Future Screens

| Screen ID | Screen Name | Route | Module | Sub-module | Status | Notes |
|---|---|---|---|---|---|---|
| — | Coupon Management | `/admin/coupons` | Admin Console | Coupons | Proposed | Admin CRUD for discount codes; Future Candidate |
| — | Coupon Detail | `/admin/coupons/[id]` | Admin Console | Coupons | Proposed | View usage stats for a specific coupon |
| — | Delivery Management | `/admin/delivery` | Delivery Management | Delivery Assignment | Proposed | Candidate — not built; awaiting module evaluation |
| — | Delivery Detail | `/admin/delivery/[id]` | Delivery Management | Delivery Lifecycle | Proposed | Candidate — not built |
| — | Razorpay Payment Status | `/checkout/payment` | Payment Management | Razorpay | Planned | Payment callback / status screen post-Razorpay integration |

*Generate IDs from MASTER_REGISTRY.md when these screens move from Proposed to Planned.*

---

*Last updated: 2026-06-21 — SCR-CUS-0001 to SCR-CUS-0010, SCR-ADM-0001 to SCR-ADM-0011, SCR-AUTH-0001 to SCR-AUTH-0002 assigned.*
