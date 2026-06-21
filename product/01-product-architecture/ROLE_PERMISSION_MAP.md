# Nuemart — Role & Permission Map

Defines who can do what across the Nuemart platform. Roles are split into **Current** (enforced today) and **Future / Candidate** (not yet implemented).

---

## Role Status Legend

| Status | Meaning |
|---|---|
| **Current** | Role exists and is enforced in application code |
| **Future Candidate** | Role is anticipated for a planned feature — not yet built |
| **Candidate** | Under consideration — no commitment to build |

---

## Current Roles

### Customer *(Current)*

**Who:** Any authenticated Clerk user without an admin role.

**How assigned:** Default — any user who signs up via Clerk.

**Capabilities:**

| Area | Permission | Notes |
|---|---|---|
| Products | Browse product listing | Includes search and category filter |
| Products | View product detail | |
| Cart | Add / update / remove items | Zustand + localStorage; no server-side cart |
| Favourites | Toggle product as favourite | Stored in Convex per user |
| Favourites | View own favourites | |
| Addresses | View own addresses | |
| Addresses | Add new address | |
| Addresses | Edit own address | |
| Addresses | Delete own address | |
| Addresses | Set default address | |
| Checkout | Place order | Requires at least one saved address |
| Orders | View own order history | Cannot view other users' orders |
| Orders | View own order detail | |
| Payment | Pay Later (current MVP) | Razorpay one-time payment — Pending (Phase 11) |
| Razorpay Subscription (Phase 12) | Subscribe to free-delivery plan | Future — Phase 12; not part of Phase 11 payment integration |

**Cannot:**
- Access any `/admin/*` route.
- View other customers' data.
- Modify product catalogue, categories, or inventory.
- Update order status.

---

### Admin *(Current)*

**Who:** A Clerk user with `publicMetadata.role === "admin"`.

**How assigned:** Manually via Clerk Dashboard — set `publicMetadata.role = "admin"` on the user record.

**Capabilities:**

| Area | Permission | Notes |
|---|---|---|
| Dashboard | View order and inventory stats | `/admin` |
| Categories | Create category | |
| Categories | Edit category | |
| Categories | Toggle category active/inactive | |
| Categories | View all categories | |
| Products | Create product | |
| Products | Edit product | |
| Products | Toggle product active/inactive | |
| Products | View all products | |
| Inventory | View all product stock levels | |
| Inventory | Make manual stock adjustment | With audit trail in stockMovements |
| Inventory | View stock movement history per product | |
| Orders | View all orders | All customers |
| Orders | Filter orders by status and payment | |
| Orders | Update order status | e.g. pending → confirmed → delivered |
| Orders | View Razorpay payment reference IDs | After Razorpay integration |
| Users | View customer list | Basic — no customer edit |

**Cannot (currently):**
- Delete products or categories (soft disable via isActive only).
- Process Razorpay refunds (pending implementation).
- Assign delivery persons (Delivery Module not built).
- Issue or manage coupons (future feature).

---

## Future / Candidate Roles

These roles are not yet implemented. They are documented for planning purposes only.

---

### Super Admin *(Future Candidate)*

**Rationale:** As the platform grows to multi-branch or multi-store, a super admin would have cross-store visibility and system configuration access beyond a single store's admin.

**Anticipated additional capabilities vs. Admin:**
- Manage admin users and assign roles.
- View platform-wide analytics.
- Configure store settings (business name, delivery zones, fee structure).
- Manage subscription plans and pricing.

---

### Inventory Manager *(Future Candidate)*

**Rationale:** A dedicated stock team member who can manage inventory without accessing order or financial data.

**Anticipated capabilities (subset of Admin):**
- View product stock levels.
- Make manual stock adjustments.
- View stock movement history.
- Receive low-stock alerts.

**Cannot:** View orders, manage products, access payment information.

---

### Delivery Manager *(Candidate — Delivery Module)*

**Rationale:** Manages the delivery operation. Can see all orders with delivery tasks and assign delivery persons.

**Anticipated capabilities:**
- View all orders with delivery task status.
- Assign delivery persons to orders.
- Mark deliveries as picked up, in transit, delivered.
- View delivery exceptions and escalate.
- View proof of delivery.

**Depends on:** Delivery Management module (Candidate — not built).

---

### Delivery Person *(Candidate — Delivery Module)*

**Rationale:** Field operator who updates delivery status and captures proof of delivery.

**Anticipated capabilities:**
- View own assigned deliveries.
- Update delivery status (picked up, in transit, delivered, failed).
- Upload proof of delivery (photo / signature).
- Log delivery exceptions.

**Cannot:** View order financials, customer payment information, or other delivery persons' tasks.

**Depends on:** Delivery Management module (Candidate — not built). Likely requires a separate mobile-friendly interface.

---

### Support User *(Future Candidate)*

**Rationale:** A customer support team member who can look up orders and customer details for issue resolution, without admin write access.

**Anticipated capabilities:**
- View all customer orders (read-only).
- View customer address and contact details.
- Annotate orders with support notes.

**Cannot:** Modify orders, adjust inventory, process refunds directly.

---

## Permission Summary Matrix

| Permission | Customer | Admin | Inventory Manager | Delivery Manager | Delivery Person | Support User |
|---|---|---|---|---|---|---|
| Browse products | ✅ | ✅ | ✅ | — | — | ✅ |
| Place order | ✅ | — | — | — | — | — |
| Manage own addresses | ✅ | — | — | — | — | — |
| Manage categories | — | ✅ | — | — | — | — |
| Manage products | — | ✅ | — | — | — | — |
| Manage inventory | — | ✅ | ✅ (Candidate) | — | — | — |
| View all orders | — | ✅ | — | ✅ (Candidate) | — | ✅ (Candidate) |
| Update order status | — | ✅ | — | — | — | — |
| Assign delivery | — | — | — | ✅ (Candidate) | — | — |
| Update delivery status | — | — | — | — | ✅ (Candidate) | — |
| Upload proof of delivery | — | — | — | — | ✅ (Candidate) | — |
| Manage coupons | — | ✅ (Future) | — | — | — | — |
| Process refunds | — | ✅ (Future) | — | — | — | — |
| View analytics | — | ✅ | — | — | — | — |
| Manage admin users | — | — | — | — | — | — |

*Candidate and Future cells are aspirational. Build only when formally scoped via PRD.*

---

## Role Assignment Mechanism

| Role | Mechanism |
|---|---|
| Customer | Clerk default — any authenticated user |
| Admin | Clerk `publicMetadata.role = "admin"` — manually assigned via Clerk Dashboard |
| Future roles | To be determined — likely Clerk organisations or a custom roles table in Convex |

---

*Last updated: 2026-06-21*
