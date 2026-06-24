# Nuemart — Module Master

Single source of truth for all modules in the Nuemart platform. Each module is summarised here; full detail lives in the module's own directory under `03-module-catalogue/`.

---

## Module Status Legend

| Status | Meaning |
|---|---|
| **Built** | Module is implemented and live in application code |
| **Partial** | Some sub-modules are built; others are pending |
| **Pending** | Scoped and planned — not yet started |
| **Candidate** | Under evaluation — no build commitment |
| **Future Candidate** | Identified for the future — no evaluation started |

---

## Module Registry

| Module | Directory | Status | Sub-modules Built | Sub-modules Pending |
|---|---|---|---|---|
| Customer Commerce | `customer-commerce/` | Built | Products, Product Detail, Search & Category Browsing, Cart, Favourites, Checkout (Pay Later), Orders | Checkout (Razorpay), Coupons (Future Candidate) |
| Admin Console | `admin-console/` | Built | Dashboard, Categories, Products, Orders, Inventory | Coupons (Future Candidate) |
| Inventory Management | `inventory-management/` | Built | Stock Control, Stock Movements | Low-stock alerting (basic filter only — no auto-alert) |
| Payment Management | `payment-management/` | Partial | Pay Later | Razorpay Payments, Payment Verification, Razorpay Webhooks (all Pending Phase 11); Refunds and Reconciliation (Future Candidate) |
| User Management | `user-management/` | Built | Authentication (Clerk), Addresses | Advanced roles (Future Candidate) |
| Reporting & Analytics | `reporting-and-analytics/` | Partial | Basic dashboard stats | Order reports, Inventory reports, Coupon reports (Future Candidate) |
| Delivery Management | `delivery-management/` | Candidate | — (none) | Delivery Lifecycle, Assignment, Status, Proof of Delivery, Exceptions, Reports |

---

## Module Summaries

---

### Customer Commerce

**Purpose:** The customer-facing storefront where grocery products are browsed, carted, and ordered.

**Current Status:** Built — full browse-to-order flow working with Pay Later. Razorpay integration is the next milestone.

**Built Sub-modules:**
- Product listing with search and category filter
- Product detail page (slug-based)
- Cart with Zustand + localStorage persistence
- Favourites (toggle, view)
- Checkout with address guard and Pay Later order placement
- Order history and order detail

**Pending:**
- Razorpay payment at checkout (Phase 11)
- Razorpay Subscription / free-delivery flow (Phase 12) — separate future phase; not a Customer Commerce sub-module today

**Future Candidates:**
- Discount coupon application at cart / checkout
- Allergen and dietary tag filtering on product listing (depends on REQ-0005 shipping and catalogue data being populated — tracked as REQ-0006 Parked)

**Related modules:** User Management (auth + addresses), Inventory Management (stock enforcement), Payment Management (checkout payment)

**Risks and dependencies:** Checkout is incomplete without Razorpay. Currently all orders are Pay Later.

---

### Admin Console

**Purpose:** The operator-facing dashboard for managing the product catalogue, orders, and inventory.

**Current Status:** Built — full CRUD for categories, products, and stock. Order management with status updates.

**Built Sub-modules:**
- Dashboard (order stats, inventory alerts, linked to inventory filter)
- Category management (create, edit, toggle active)
- Product management (create, edit, toggle active)
- Order management (list with filters, detail with status update)
- Inventory monitoring (stock status overview, stock adjustment, movement history)

**Pending:**
- Razorpay payment reference display on order detail (Phase 11)

**Future Candidates:**
- Coupon management (create, edit, usage reporting)
- Delivery assignment interface (Candidate — Delivery Module)
- Allergen info completeness indicator on product list (Missing / Added / Needs review) — depends on REQ-0005
- Admin-managed custom dietary tag master — depends on REQ-0005 fixed tag list being in use first

**Related modules:** All modules — Admin Console is the operational control plane for the platform.

**Risks and dependencies:** Admin route guard relies on Clerk `publicMetadata.role`. Must be set manually in Clerk Dashboard.

---

### Inventory Management

**Purpose:** Tracks product stock levels, records every stock change with an audit trail, and surfaces low-stock situations.

**Current Status:** Built — stock is reduced on order placement, all changes logged in stockMovements.

**Built Sub-modules:**
- Stock Control: current stock level per product; manual stock adjustments
- Stock Movements: full audit trail of every stock change with reason and note

**Pending:**
- Low-stock auto-alerting: currently the admin must filter manually. No push notification or email alert exists.
- Stock reduction to move to Razorpay webhook trigger (Phase 11)

**Future Candidates:**
- Restock requests or supplier integration
- Low-stock threshold configuration per product

**Related modules:** Customer Commerce (stock checked at order placement), Admin Console (stock management UI), Payment Management (stock deduction will be webhook-triggered post Phase 11)

**Risks and dependencies:** Currently stock is reduced on order placement (Pay Later model). Once Razorpay is integrated, stock must only be deducted on webhook-verified payment. This is a logic change in Phase 11.

---

### Payment Management

**Purpose:** Handles all payment flows — current Pay Later model and upcoming Razorpay integration.

**Current Status:** Pay Later built. Razorpay pending merchant account approval.

**Built Sub-modules:**
- Pay Later: orders placed with `paymentMethod: "pay_later"` and `paymentStatus: "pending"`. Admin updates order status manually.

**Pending (Phase 11):**
- Razorpay Payments: Razorpay Orders API + Checkout SDK integration
- Payment Verification: HMAC-SHA256 signature verification server-side
- Razorpay Webhooks: webhook handler for `payment.captured` and `payment.failed` events

**Future Candidates:**
- Refunds via Razorpay Refunds API (post Phase 11)
- Payment reconciliation reporting — match Razorpay settlements to Nuemart orders (post Phase 11)
- Razorpay Subscription for free delivery — separate future phase (Phase 12); outside Payment Management sub-module scope

**Related modules:** Customer Commerce (checkout triggers payment), Inventory Management (payment triggers stock deduction in Phase 11), Reporting & Analytics (payment data for revenue reports)

**Risks and dependencies:** Blocked on Razorpay merchant account approval. All env vars must be set in Convex dashboard — not in `.env.local`.

---

### User Management

**Purpose:** Handles customer authentication, identity, and delivery address management.

**Current Status:** Built — Clerk handles authentication. Convex stores addresses.

**Built Sub-modules:**
- Authentication: Clerk sign-in, sign-up, session management. Admin role via Clerk `publicMetadata.role`
- Addresses: customer address CRUD — add, edit, delete, set default

**Future Candidates:**
- Additional roles (Inventory Manager, Delivery Manager, Delivery Person, Support User) — documented in ROLE_PERMISSION_MAP.md but not built
- Profile management (name, phone, preferences)

**Related modules:** All modules — authentication gates access to every feature. Addresses gate checkout.

**Risks and dependencies:** Admin role is assigned manually via Clerk Dashboard. There is no in-app role management UI.

---

### Reporting & Analytics

**Purpose:** Provides the operator with visibility into orders, inventory, and business performance.

**Current Status:** Basic dashboard stats only — order counts, inventory low-stock indicators. No dedicated reporting screens.

**Built Sub-modules:**
- Dashboard stats: order summary (total, pending, confirmed, delivered), stock alerts (low stock, out-of-stock counts)

**Future Candidates:**
- Order reports: revenue by day/week/month, orders by status, top products
- Inventory reports: stock movement history export, restock frequency
- Coupon reports: coupon usage, discount total, redemption rate (depends on Coupons module)
- Delivery reports: delivery success rate, average time (depends on Delivery module)

**Related modules:** Admin Console (reporting surfaces live in admin), Customer Commerce (order data source), Inventory Management (stock data source), Payment Management (revenue data)

**Risks and dependencies:** Full reporting is blocked until there is sufficient order volume to make reports meaningful. Coupon and delivery reports depend on those modules being built first.

---

### Delivery Management *(Candidate — Not Built)*

**Purpose:** Manages the last-mile delivery lifecycle — assigning delivery persons to orders, tracking delivery status, capturing proof of delivery, and handling exceptions.

**Current Status:** Candidate — not built. Fulfilment is currently manual.

**Built Sub-modules:** None.

**Planned Sub-modules (pending evaluation):**
- Delivery Lifecycle: status progression from order-ready to delivered
- Delivery Assignment: assign delivery persons to orders
- Delivery Status: real-time status visible to customer and admin
- Proof of Delivery: photo or signature capture
- Delivery Exceptions: failed delivery, customer not available, damage
- Delivery Reports: success rate, average delivery time

**Future Candidates:**
- Route optimisation
- Automated assignment based on zone
- Customer ETA notifications

**Related modules:** Customer Commerce (orders to deliver), Admin Console (assignment UI), User Management (delivery person accounts), Reporting & Analytics (delivery metrics)

**Risks and dependencies:** This module requires new Convex entities (deliveryPersons, deliveryTasks), new admin screens, and possibly a mobile interface for delivery persons. Must pass MODULE_EVALUATION_BOARD.md evaluation before any work begins.

---

*Last updated: 2026-06-21*
