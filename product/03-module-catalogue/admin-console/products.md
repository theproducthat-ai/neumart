# Sub-module: Products (Admin)

**Module:** Admin Console  
**Screens:** SCR-ADM-0005 (`/admin/products`), SCR-ADM-0006 (`/admin/products/new`), SCR-ADM-0007 (`/admin/products/[id]/edit`)  
**Status:** Built

---

## Purpose

Admin management of the product catalogue. The admin creates, edits, and deactivates products that appear on the customer storefront.

---

## Features Built

### Product List (`/admin/products`)

- Lists all products (active and inactive).
- Columns: name, category, price, stock, active status, actions.
- Toggle active/inactive inline.
- Quick-link to edit.
- Quick-link to create new product.

### Create Product (`/admin/products/new`)

- Form fields:
  - Name (required)
  - Slug (required — auto-generated from name with override option)
  - Category (required — select from active categories)
  - Price in ₹ (stored as paise internally)
  - Initial stock quantity
  - Description (optional)
  - Image URL (optional)
  - Active toggle (default: true)
- Slug validated for uniqueness.
- Stock is written as an initial `stockMovements` record on creation.

### Edit Product (`/admin/products/[id]/edit`)

- Same form as create, pre-filled.
- **Price edits** do not retroactively change existing order items (order items snapshot price at placement time).
- **Stock is not edited via this form** — stock changes go through the Inventory sub-module only, to maintain the audit trail.

---

## Features Pending

None. Product management is complete for the MVP.

---

## Future Candidates

- **Product image upload** to cloud storage (currently image URL only)
- **Multiple images per product**
- **Product variants** (size, weight, pack size)
- **Bulk product import via CSV**
- **Product duplication** (clone a product as a starting point)

---

## Business Rules

| Rule | Detail |
|---|---|
| Slug is unique | Duplicate slugs rejected at creation and edit |
| Soft disable only | Products deactivated via `isActive: false` — never deleted |
| Price stored in paise | All prices in the database are integers in paise (₹ × 100) |
| Stock not editable via product form | Stock changes must go through Inventory → manual stock adjustment for audit trail |
| Inactive products hidden from storefront | `products.list` filters to `isActive: true` |

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `products.listAll` | All products including inactive (admin only) |
| `products.getById` | Single product for edit form |
| `categories.listActive` | Populate category selector |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `products.create` | Create product and write initial stock movement |
| `products.update` | Update product fields (excluding stock) |
| `products.toggleActive` | Toggle `isActive` |

---

*Last updated: 2026-06-21*
