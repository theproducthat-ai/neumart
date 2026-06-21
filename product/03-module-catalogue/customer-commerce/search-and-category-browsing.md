# Sub-module: Search & Category Browsing

**Module:** Customer Commerce  
**Screen:** SCR-CUS-0001 — `/products` (search and filter are part of the product listing screen)  
**Status:** Built

---

## Purpose

Allows customers to narrow the product listing by keyword search and/or category filter. Both mechanisms work together and are applied client-side via Convex query parameters.

---

## Features Built

### Keyword Search

- Text input in the product listing header.
- Filters products by name matching the search query.
- Search is handled server-side via Convex query (not just client-side filtering) for accuracy and performance.
- Debounced input to avoid excessive query calls on each keystroke.

### Category Filter

- Category list displayed as filter chips or a sidebar (depending on viewport).
- Only active categories (`isActive: true`) are shown.
- Selecting a category filters the product grid to that category only.
- "All" option resets the filter.

### Combined Filtering

- Search and category filter can be used together.
- URL query params reflect the active filter state (enables shareable filtered views and browser back navigation).

---

## Features Pending

None. Search and category browsing are complete for the MVP.

---

## Future Candidates

- **Price range filter:** slider or min/max input
- **Sort options:** price low-to-high, high-to-low, newest
- **In-stock only filter toggle**
- **Highlighted search results** (bold matching text in product names)

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `categories.listActive` | Fetch all active categories for the filter UI |
| `products.list` | Accepts optional `categoryId` and `searchQuery` parameters |

---

*Last updated: 2026-06-21*
