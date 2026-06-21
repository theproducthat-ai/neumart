# Sub-module: Orders (Admin)

**Module:** Admin Console  
**Screens:** SCR-ADM-0008 (`/admin/orders`), SCR-ADM-0009 (`/admin/orders/[id]`)  
**Status:** Built

---

## Purpose

Provides the admin with full visibility into all customer orders and the ability to update order status through the fulfilment lifecycle.

---

## Features Built

### Order List (`/admin/orders`)

- Lists all orders across all customers.
- Columns: order ID, customer name, date, total, order status, payment status, actions.
- Filter by order status (pending, confirmed, processing, delivered, cancelled).
- Filter by payment status (pending, paid, failed).
- Clickable row navigates to order detail.

### Order Detail (`/admin/orders/[id]`)

- Full order information:
  - Customer name and email
  - Delivery address snapshot
  - Order items: product name, quantity, unit price, line total
  - Order summary: subtotal, delivery fee, total
  - Payment status and method (`pay_later` today)
  - Razorpay order ID and payment ID (shown when Phase 11 is live)
- **Order status update:** Admin can move the order through status stages.
- Status transitions allowed:

```
pending → confirmed → processing → delivered
any status → cancelled
```

---

## Features Pending

- **Razorpay payment reference IDs** on order detail: `razorpayOrderId` and `razorpayPaymentId` (Phase 11)
- **Payment status display** for Razorpay payments (paid / failed) (Phase 11)

---

## Future Candidates

- **Bulk status update** (e.g. mark multiple orders as confirmed at once)
- **Admin notes on order** (internal notes not visible to customer)
- **Order cancellation reason** (logged reason when admin cancels)
- **Refund trigger** from order detail (depends on Payment Management refunds)
- **Delivery assignment from order detail** (depends on Delivery Management module)
- **Customer contact link** (click to send an email or WhatsApp message)

---

## Business Rules

| Rule | Detail |
|---|---|
| Admin sees all orders | Not filtered by user — admin has full visibility |
| Status update is manual | Admin moves order status — there is no automated fulfilment pipeline yet |
| Payment status is trusted from Razorpay webhook | Admin cannot manually override `paymentStatus` to `"paid"` |
| Address on order is a snapshot | Editing the address after order placement does not change the order's address |

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `orders.listAll` | All orders with optional status / payment filters (admin only) |
| `orders.getById` | Full order detail with items, address, payment info |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `orders.updateStatus` | Update `status` field on an order (admin only, guarded by `assertAdmin`) |

---

*Last updated: 2026-06-21*
