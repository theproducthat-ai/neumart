# Sub-module: Favourites

**Module:** Customer Commerce  
**Screen:** SCR-CUS-0004 — `/favourites`  
**Status:** Built

---

## Purpose

Allows customers to save products they like for easy future reference. Favourites are stored server-side in Convex and persist across devices.

---

## Features Built

### Toggle Favourite

- Heart icon on product cards (product listing and product detail).
- Clicking toggles the favourite state for the authenticated user.
- Filled heart = favourited; empty heart = not favourited.
- Requires authentication — unauthenticated users are prompted to sign in.
- State is immediately reflected in the UI (Convex real-time reactivity).

### View Favourites List

- Dedicated page at `/favourites`.
- Displays all products the customer has favourited, in the same card layout as the product listing.
- Add to cart and remove favourite available directly from the list.
- Empty state shown when no favourites exist.

---

## Features Pending

None. Favourites are complete for the MVP.

---

## Future Candidates

- **Sort favourites** by date added or alphabetically.
- **Share favourites list** (public URL).
- **Notification when a favourited product restocks** (depends on notification system).

---

## Convex Table

**`favourites`**

| Field | Type | Notes |
|---|---|---|
| `userId` | Id<"users"> | The authenticated customer |
| `productId` | Id<"products"> | The product they favourited |
| `createdAt` | number | When it was added |

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `favourites.listByUser` | Fetch all favourited products for the current user |
| `favourites.isFavourited` | Check favourite status for a specific product (used on product detail) |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `favourites.toggle` | Add if not favourited; remove if already favourited |

---

*Last updated: 2026-06-21*
