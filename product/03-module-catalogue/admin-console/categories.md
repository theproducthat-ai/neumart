# Sub-module: Categories (Admin)

**Module:** Admin Console  
**Screens:** SCR-ADM-0002 (`/admin/categories`), SCR-ADM-0003 (`/admin/categories/new`), SCR-ADM-0004 (`/admin/categories/[id]/edit`)  
**Status:** Built

---

## Purpose

Admin management of the product category catalogue. Categories group products on the storefront and are used for category-based filtering.

---

## Features Built

### Category List (`/admin/categories`)

- Lists all categories (active and inactive).
- Columns: name, slug, active status, product count, actions.
- Toggle active/inactive status inline.
- Quick-link to edit.
- Quick-link to create new category.

### Create Category (`/admin/categories/new`)

- Form: name (required), slug (required — auto-generated from name with override option).
- Slug is validated for uniqueness before saving.
- `isActive` defaults to true on creation.

### Edit Category (`/admin/categories/[id]/edit`)

- Same form as create, pre-filled with existing values.
- Slug can be edited (with a warning that existing product URLs using this category will be affected if category is part of the product URL — currently it is not, as products use their own slug).
- Active toggle available here as well.

---

## Features Pending

None. Category management is complete for the MVP.

---

## Future Candidates

- **Category image / icon** for richer storefront category display
- **Category ordering / sorting** for controlling display order on storefront
- **Sub-categories** — nested category hierarchy (significant schema and UI change)
- **Category-level discounts** (depends on Coupons module)

---

## Business Rules

| Rule | Detail |
|---|---|
| Slug is unique | Duplicate slugs are rejected at creation and edit |
| Soft disable only | Categories are deactivated via `isActive: false` — never deleted |
| Inactive categories hidden from storefront | `categories.listActive` filters to `isActive: true` |
| Products not auto-deactivated | Setting a category to inactive does not deactivate its products |

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `categories.listAll` | Fetch all categories including inactive (admin only) |
| `categories.getById` | Fetch a single category for the edit form |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `categories.create` | Create a new category |
| `categories.update` | Update an existing category |
| `categories.toggleActive` | Toggle `isActive` for a category |

---

*Last updated: 2026-06-21*
