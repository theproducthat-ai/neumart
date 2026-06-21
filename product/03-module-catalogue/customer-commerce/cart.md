# Sub-module: Cart

**Module:** Customer Commerce  
**Screen:** SCR-CUS-0003 — `/cart`  
**Status:** Built

---

## Purpose

Holds the customer's selected products before checkout. The cart persists across page refreshes and browser sessions via localStorage.

---

## Architecture Note

The cart is **client-side only** — managed entirely by Zustand with localStorage persistence. There is no server-side cart in Convex. This is an intentional MVP decision: it avoids cart-locking complexity and allows unauthenticated browsing.

---

## Features Built

### View Cart

- List all cart items: product name, unit price, quantity, and line total.
- Cart item count badge displayed in the header on all pages.
- Empty cart state with a prompt to browse products.

### Update Quantity

- Increment / decrement quantity per item.
- Quantity cannot exceed available stock (enforced client-side from last-known stock value; enforced server-side at order placement).
- Quantity cannot go below 1 (use remove instead).

### Remove Item

- Remove button per line item.
- Removes the item from the Zustand store and localStorage.

### Cart Summary

- Subtotal calculated from item prices × quantities.
- Delivery fee shown (₹0 for Pay Later MVP; will reflect Razorpay Subscription status after Phase 12).
- Order total = subtotal + delivery fee.

### Proceed to Checkout

- "Proceed to Checkout" button navigates to `/checkout`.
- Requires authentication — unauthenticated users are redirected to sign in.

### Cart Persistence

- Cart state is stored in localStorage under a fixed key.
- Cart is restored from localStorage on page load.
- Cart is cleared after successful order placement (currently on Pay Later confirmation; will be on Razorpay webhook after Phase 11).

---

## Features Pending

- **Cart validation against live stock at load time:** Currently cart quantities are not re-validated against Convex stock on page load. If stock changes between "add to cart" and "checkout", the discrepancy is caught at order placement — not earlier.
- **Delivery fee with Razorpay Subscription:** After Phase 12, a free-delivery subscriber's cart will show ₹0 delivery fee (checked against `freeShippingEligible` field to be added in Phase 12 schema).

---

## Future Candidates

- **Server-side cart:** Allows cart to persist across devices and browsers.
- **Save for later:** Move an item from cart to a saved list.
- **Coupon code input at cart:** Applied before proceeding to checkout (Future Candidate — see `coupons.md`).

---

## State Management

| Store | Library | Persistence |
|---|---|---|
| `useCartStore` | Zustand | localStorage via `zustand/middleware` `persist` |

| State Field | Type | Purpose |
|---|---|---|
| `items` | `CartItem[]` | Array of `{ productId, name, price, quantity, imageUrl }` |
| `addItem` | function | Add or increment a product |
| `removeItem` | function | Remove a product entirely |
| `updateQuantity` | function | Set quantity for a specific product |
| `clearCart` | function | Empty the cart (called after order placement) |
| `itemCount` | computed | Total number of items (for header badge) |
| `total` | computed | Sum of all line totals in paise |

---

*Last updated: 2026-06-21*
