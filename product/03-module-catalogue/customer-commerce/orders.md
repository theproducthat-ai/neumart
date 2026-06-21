# Sub-module: Orders (Customer)

**Module:** Customer Commerce  
**Screens:** SCR-CUS-0009 (`/orders`) and SCR-CUS-0010 (`/orders/[id]`)  
**Status:** Built

---

## Purpose

Allows customers to view their order history and the full detail of any individual order, including items, delivery address, status, and payment information.

---

## Features Built

### Order History (`/orders`)

- Lists all orders placed by the authenticated customer.
- Displayed in reverse chronological order (most recent first).
- Each row shows: order date, item count, total, order status, and payment status.
- Clickable row navigates to the order detail page.
- Empty state shown when no orders exist.
- Loading skeleton via `loading.tsx`.

### Order Detail (`/orders/[id]`)

- Full detail for a single order.
- Sections:
  - **Order items:** product name, quantity, unit price, line total.
  - **Delivery address:** address snapshot captured at time of order (not a live link to the address record).
  - **Order summary:** subtotal, delivery fee, total.
  - **Payment status:** `pending` (Pay Later) or `paid` / `failed` (post Razorpay).
  - **Order status:** `pending` / `confirmed` / `processing` / `delivered` / `cancelled`.
  - **Razorpay reference IDs** (after Phase 11): `razorpayOrderId` and `razorpayPaymentId` displayed for customer reference.
- Loading skeleton via `loading.tsx`.

---

## Features Pending

- **Razorpay payment details:** payment ID and status will be populated after Phase 11.
- **Track delivery status:** if Delivery Management module is built, the order detail will show delivery status and assigned delivery person.

---

## Future Candidates

- **Reorder:** One-click reorder that adds all items from a previous order back to the cart.
- **Cancel order:** Customer-initiated cancellation (with business rule on when cancellation is allowed).
- **Order tracking link:** If delivery is tracked, a link to a live delivery status view.
- **Download invoice:** PDF invoice for completed orders.

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `orders.listByUser` | Fetch all orders for the current user, sorted by `createdAt` desc |
| `orders.getById` | Fetch a single order with all items, address snapshot, and payment info |

---

## Business Rules

| Rule | Detail |
|---|---|
| Customers see only their own orders | `listByUser` filters by the authenticated `userId` |
| Address is a snapshot | The delivery address on an order is captured at placement time — editing the address later does not change it |
| Order status is admin-updated | Customers cannot change their own order status |

---

*Last updated: 2026-06-21*
