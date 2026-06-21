# Sub-module: Product Detail

**Module:** Customer Commerce  
**Screen:** SCR-CUS-0002 — `/products/[slug]`  
**Status:** Built

---

## Purpose

Displays full information for a single product, including description, price, stock status, and the ability to add to cart.

---

## Features Built

### Product Information

- Product name, price (formatted in ₹ from paise), category, and description.
- Product image (if set) or a placeholder.
- Stock status: shown as in-stock / low stock / out of stock based on the `stock` field.
- Out-of-stock products disable the "Add to Cart" button.

### Add to Cart

- Quantity selector (increment / decrement) before adding.
- "Add to Cart" adds the product with the selected quantity to the Zustand cart.
- Quantity is capped at available stock.

### Favourites Toggle

- Heart icon to add/remove from favourites.
- Requires authentication.

### Slug-based Routing

- Route: `/products/[slug]`
- Product is fetched from Convex by slug — not by internal ID — to produce human-readable, shareable URLs.

---

## Features Pending

None. Product detail is complete for the MVP.

---

## Future Candidates

- **Product image gallery** (multiple images per product)
- **Customer reviews and ratings**
- **Related products** (same category)
- **Share product link**

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `products.getBySlug` | Fetch a single product by its URL slug |
| `favourites.isFavourited` | Check if the current user has favourited this product |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `favourites.toggle` | Add or remove from favourites |

---

*Last updated: 2026-06-21*
