# Module: Admin Console

## Purpose

The operator-facing control panel for managing the entire Nuemart platform — product catalogue, categories, inventory, orders, and future operational capabilities.

---

## Status

**Built** — Full CRUD for categories, products, inventory, and orders. Dashboard overview is live. Razorpay payment detail on orders is pending Phase 11.

---

## Sub-modules

| Sub-module | File | Status |
|---|---|---|
| Dashboard | `dashboard.md` | Built |
| Categories | `categories.md` | Built |
| Products | `products.md` | Built |
| Orders | `orders.md` | Built |
| Inventory | `inventory.md` | Built |
| Coupons | `coupons.md` | Future Candidate — not built |

---

## Access Control

All `/admin/*` routes are protected by a server-side Clerk role check in the admin layout:

- `publicMetadata.role === "admin"` is required.
- The check runs on the server — not just client-side.
- Users who fail the role check are redirected (not shown a 403 in the admin UI).
- Admin role is assigned manually via Clerk Dashboard.

---

## Built Features (Summary)

- Dashboard with order stats and inventory alerts
- Category CRUD: create, edit, toggle active
- Product CRUD: create, edit, toggle active
- Inventory overview: stock status per product with filter (all / low / out-of-stock)
- Manual stock adjustment with audit trail
- Stock movement history per product
- Orders list with status and payment filters
- Order detail with status update

---

## Pending Features

- Razorpay order ID and payment ID display on order detail (Phase 11)
- Razorpay Subscription / free-delivery status per customer (Phase 12 — separate future phase)

---

## Future Candidates

- Coupon management (create, edit, disable, view usage)
- Delivery assignment interface (depends on Delivery Management module)
- Customer list with order history
- Bulk stock import / export
- Admin notifications for new orders or low stock

---

## Related Modules

| Module | Relationship |
|---|---|
| User Management | Admin role is managed via Clerk — admin console depends on Clerk auth |
| Inventory Management | Inventory screens live in admin console |
| Customer Commerce | Admin manages the catalogue that the storefront displays |
| Payment Management | Razorpay payment info surfaces on admin order detail |
| Reporting & Analytics | Dashboard stats are the entry point to reporting |

---

## Risks and Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Admin role is manually assigned | An admin cannot grant themselves access via the app | Document the Clerk Dashboard role assignment process |
| Razorpay info not yet on order detail | Admin cannot see payment reference IDs until Phase 11 | Pay Later model does not require this |

---

*Last updated: 2026-06-21*
