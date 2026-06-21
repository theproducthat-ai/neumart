# Sub-module: Products (Customer)

**Module:** Customer Commerce  
**Screen:** SCR-CUS-0001 — `/products`  
**Status:** Built

---

## Purpose

The main product listing page. Customers land here to browse available grocery products, filter by category, and search by keyword.

---

## Features Built

### Product Grid

- Displays all active products (`isActive: true`) from the Convex `products` table.
- Products are shown as cards: image (if available), name, price (in ₹ formatted from paise), category badge, and stock status.
- Out-of-stock products are visually indicated and cannot be added to cart.

### Add to Cart

- "Add to Cart" button on each product card.
- Adds the product to the Zustand cart store; persisted to localStorage.
- Cart item count badge updates immediately in the header.

### Favourites Toggle

- Heart icon on each product card.
- Toggling writes to / removes from the Convex `favourites` table for the authenticated user.
- Requires authentication — unauthenticated users are prompted to sign in.

### Loading State

- `loading.tsx` provides a skeleton loading state while products are fetched.

---

## Features Pending

- **Free Delivery badge (Phase 12):** Once Razorpay Subscription is built, active free-delivery subscribers could see a "Free Delivery" indicator on the storefront.

---

## Future Candidates

- **Recently viewed:** Track last N products viewed per session.
- **Product recommendations:** Simple "More from this category" section.

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `products.list` | List all active products; optionally filtered by `categoryId` and `searchQuery` |
| `favourites.listByUser` | Check which products are favourited by the current user |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `favourites.toggle` | Add or remove a product from favourites |

---

## UI Components

- Product card (custom)
- Add to cart button
- Favourite heart toggle
- Stock status badge
- Category badge

---

*Last updated: 2026-06-21*
