# Nuemart — Data Entity Map

All data entities in the Nuemart platform. Entities are split into **Current** (exist in Convex schema today) and **Future / Candidate** (not yet built, but documented for planning).

---

## Entity Status Legend

| Status | Meaning |
|---|---|
| **Current** | Table exists in Convex schema and is actively used |
| **Future Candidate** | Identified as needed for a planned or candidate feature — not yet in schema |
| **Candidate** | Under evaluation — no commitment to build |

---

## Current Entities

### users

| Field | Type | Notes |
|---|---|---|
| `tokenIdentifier` | string | Clerk token identifier — primary external reference |
| `email` | string | Customer email |
| `name` | string (optional) | Display name |
| `phone` | string (optional) | Customer phone number |
| `role` | string (optional) | `"admin"` when set; absent for regular customers |
| `createdAt` | number | Unix timestamp |

**Relationships:** One user → many addresses, many orders, many favourites.

---

### categories

| Field | Type | Notes |
|---|---|---|
| `name` | string | Display name |
| `slug` | string | URL-safe unique identifier |
| `isActive` | boolean | Controls visibility on storefront |
| `createdAt` | number | Unix timestamp |

**Relationships:** One category → many products.

---

### products

| Field | Type | Notes |
|---|---|---|
| `name` | string | Product display name |
| `slug` | string | URL-safe unique identifier |
| `description` | string (optional) | Product description |
| `price` | number | Price in paise (Indian Rupees × 100) |
| `categoryId` | Id<"categories"> | Foreign key to categories |
| `imageUrl` | string (optional) | Product image |
| `isActive` | boolean | Controls storefront visibility |
| `stock` | number | Current available stock count |
| `createdAt` | number | Unix timestamp |

**Relationships:** One product → many orderItems, many favourites, many stockMovements. One product → one category.

---

### favourites

| Field | Type | Notes |
|---|---|---|
| `userId` | Id<"users"> | Owner of the favourite |
| `productId` | Id<"products"> | The favourited product |
| `createdAt` | number | Unix timestamp |

**Relationships:** Many-to-many between users and products via this join table.

---

### addresses

| Field | Type | Notes |
|---|---|---|
| `userId` | Id<"users"> | Owner of the address |
| `label` | string | e.g. "Home", "Office" |
| `line1` | string | Street address line 1 |
| `line2` | string (optional) | Street address line 2 |
| `city` | string | City |
| `state` | string | Indian state |
| `pincode` | string | 6-digit Indian pincode |
| `phone` | string | Contact phone number |
| `isDefault` | boolean | True if this is the user's default address |
| `createdAt` | number | Unix timestamp |

**Relationships:** One address → many orders (as snapshot at time of order).

---

### orders

| Field | Type | Notes |
|---|---|---|
| `userId` | Id<"users"> | The customer who placed the order |
| `addressSnapshot` | object | Delivery address captured at order time (not a live FK) |
| `status` | string | `"pending"` / `"confirmed"` / `"processing"` / `"delivered"` / `"cancelled"` |
| `paymentMethod` | string | `"pay_later"` / `"razorpay"` |
| `paymentStatus` | string | `"pending"` / `"paid"` / `"failed"` / `"refunded"` |
| `subtotal` | number | Order subtotal in paise |
| `deliveryFee` | number | Delivery fee in paise (₹0 for members) |
| `total` | number | Final total in paise |
| `razorpayOrderId` | string (optional) | Razorpay order ID from Orders API |
| `razorpayPaymentId` | string (optional) | Razorpay payment ID from webhook |
| `notes` | string (optional) | Customer or admin notes |
| `createdAt` | number | Unix timestamp |

**Relationships:** One order → many orderItems, one or more payments.

---

### orderItems

| Field | Type | Notes |
|---|---|---|
| `orderId` | Id<"orders"> | Parent order |
| `productId` | Id<"products"> | The product ordered |
| `productName` | string | Snapshot of product name at order time |
| `unitPrice` | number | Snapshot of price at order time (paise) |
| `quantity` | number | Quantity ordered |
| `subtotal` | number | unitPrice × quantity in paise |

**Relationships:** Many orderItems → one order, one product.

---

### payments

| Field | Type | Notes |
|---|---|---|
| `orderId` | Id<"orders"> | Associated order |
| `userId` | Id<"users"> | The paying user |
| `amount` | number | Payment amount in paise |
| `currency` | string | Always `"INR"` |
| `method` | string | `"pay_later"` / `"razorpay"` |
| `status` | string | `"pending"` / `"paid"` / `"failed"` |
| `razorpayOrderId` | string (optional) | Razorpay order reference |
| `razorpayPaymentId` | string (optional) | Razorpay payment reference |
| `webhookVerifiedAt` | number (optional) | Timestamp of webhook signature verification |
| `createdAt` | number | Unix timestamp |

**Relationships:** One payment → one order.

---

### stockMovements

| Field | Type | Notes |
|---|---|---|
| `productId` | Id<"products"> | The product affected |
| `delta` | number | Change in stock (positive = increase, negative = decrease) |
| `reason` | string | `"order"` / `"manual_adjustment"` / `"restock"` / `"correction"` |
| `orderId` | Id<"orders"> (optional) | If reason is "order", reference to the triggering order |
| `note` | string (optional) | Admin note for manual adjustments |
| `performedBy` | string (optional) | Clerk user ID of the admin who made the change |
| `createdAt` | number | Unix timestamp |

**Relationships:** Many stockMovements → one product.

---

## Future / Candidate Entities

These entities are **not in the schema today**. They are documented here for awareness and planning. Do not build against these until a formal PRD exists.

> **Phase 12 note:** When Razorpay Subscription (free delivery) is built in Phase 12, additional fields will be needed on the `users` table: `freeShippingEligible` (boolean) and `subscriptionStatus` (string). These are not in the current schema and must be added via a schema migration at that time.

---

### coupons *(Future Candidate)*

| Field | Type | Notes |
|---|---|---|
| `code` | string | Unique coupon code (e.g. `SAVE20`) |
| `discountType` | string | `"percentage"` / `"fixed"` |
| `discountValue` | number | Percentage or fixed amount in paise |
| `minimumOrderValue` | number (optional) | Minimum cart value to apply coupon |
| `usageLimit` | number (optional) | Maximum total uses across all customers |
| `perUserLimit` | number (optional) | Maximum uses per individual customer |
| `expiresAt` | number (optional) | Expiry timestamp |
| `isActive` | boolean | Controls whether the coupon is redeemable |
| `createdAt` | number | Unix timestamp |

**Status:** Future Candidate — pending module evaluation and PRD.

---

### couponUsages *(Future Candidate)*

| Field | Type | Notes |
|---|---|---|
| `couponId` | Id<"coupons"> | The coupon used |
| `userId` | Id<"users"> | The user who used it |
| `orderId` | Id<"orders"> | The order it was applied to |
| `discountApplied` | number | Actual discount amount in paise |
| `usedAt` | number | Unix timestamp |

**Status:** Future Candidate — depends on `coupons` entity.

---

### deliveryPersons *(Candidate — Delivery Module)*

| Field | Type | Notes |
|---|---|---|
| `name` | string | Delivery person's name |
| `phone` | string | Contact number |
| `isActive` | boolean | Whether currently available for assignment |
| `createdAt` | number | Unix timestamp |

**Status:** Candidate — Delivery Management module not built.

---

### deliveryTasks *(Candidate — Delivery Module)*

| Field | Type | Notes |
|---|---|---|
| `orderId` | Id<"orders"> | The order to be delivered |
| `deliveryPersonId` | Id<"deliveryPersons"> (optional) | Assigned delivery person |
| `status` | string | `"unassigned"` / `"assigned"` / `"picked_up"` / `"in_transit"` / `"delivered"` / `"failed"` |
| `proofUrl` | string (optional) | URL of delivery proof photo |
| `notes` | string (optional) | Delivery notes or exception details |
| `assignedAt` | number (optional) | Timestamp of assignment |
| `deliveredAt` | number (optional) | Timestamp of delivery confirmation |
| `createdAt` | number | Unix timestamp |

**Status:** Candidate — Delivery Management module not built.

---

### refunds *(Future Candidate)*

| Field | Type | Notes |
|---|---|---|
| `orderId` | Id<"orders"> | The order being refunded |
| `paymentId` | Id<"payments"> | The original payment |
| `amount` | number | Refund amount in paise |
| `reason` | string | Admin-entered reason |
| `razorpayRefundId` | string (optional) | Razorpay refund reference |
| `status` | string | `"pending"` / `"processed"` / `"failed"` |
| `processedAt` | number (optional) | Timestamp |
| `createdAt` | number | Unix timestamp |

**Status:** Future Candidate — depends on Razorpay integration.

---

### notifications *(Future Candidate)*

| Field | Type | Notes |
|---|---|---|
| `userId` | Id<"users"> | Recipient |
| `type` | string | `"order_confirmed"` / `"order_shipped"` / `"payment_failed"` / etc. |
| `channel` | string | `"sms"` / `"email"` / `"push"` |
| `payload` | object | Channel-specific message data |
| `sentAt` | number (optional) | Delivery timestamp |
| `status` | string | `"queued"` / `"sent"` / `"failed"` |
| `createdAt` | number | Unix timestamp |

**Status:** Future Candidate — no notification system planned in MVP.

---

## Entity Relationship Summary

```
users
  ├── addresses (1:N)
  ├── orders (1:N)
  │     ├── orderItems (1:N) → products
  │     ├── payments (1:1)
  │     └── [deliveryTasks] (1:1) — Candidate
  ├── favourites (N:M via favourites table) → products
  └── [couponUsages] (1:N) — Future Candidate

products
  ├── categories (N:1)
  ├── stockMovements (1:N)
  ├── orderItems (1:N)
  └── favourites (1:N)

[coupons] (Future Candidate)
  └── [couponUsages] (1:N)

[deliveryPersons] (Candidate)
  └── [deliveryTasks] (1:N)
```

---

*Last updated: 2026-06-21*
