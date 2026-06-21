# Sub-module: Addresses

**Module:** User Management  
**Screens:** SCR-CUS-0005 (`/addresses`), SCR-CUS-0006 (`/addresses/new`), SCR-CUS-0007 (`/addresses/[id]/edit`)  
**Status:** Built

---

## Purpose

Allows customers to manage their delivery addresses. Addresses are stored in Convex and are required before the customer can proceed to checkout.

---

## Features Built

### Address List (`/addresses`)

- Lists all saved addresses for the authenticated customer.
- Each address shows: label, full address, phone, default badge.
- Actions: Edit, Delete, Set as Default.
- Empty state with prompt to add an address.
- Loading skeleton via `loading.tsx`.

### Add Address (`/addresses/new`)

- Form fields:
  - Label (e.g. "Home", "Office") — required
  - Line 1 (street address) — required
  - Line 2 (optional)
  - City — required
  - State — required (Indian state)
  - Pincode — required (6 digits)
  - Phone — required (contact number for delivery)
- First address added is automatically set as default.

### Edit Address (`/addresses/[id]/edit`)

- Same form as add, pre-filled with existing values.
- All fields editable.
- Submitting updates the address in Convex.

### Delete Address

- Inline delete action on the address list.
- If the deleted address is the default, the next available address becomes default (or no default if none remain).

### Set Default Address

- "Set as Default" action on the address list.
- Sets `isDefault: true` on the selected address and `isDefault: false` on all others for that user.

### Checkout Integration

- The checkout screen reads the customer's addresses via `addresses.listByUser`.
- Pre-selects the default address.
- Customer can choose a different saved address at checkout.
- The selected address is captured as a **snapshot** (`addressSnapshot`) on the order — not a live reference. Subsequent address changes do not affect past orders.

---

## Business Rules

| Rule | Detail |
|---|---|
| One default per user | Setting a new default clears the previous default |
| Address on order is a snapshot | Order delivery address is immutable after placement |
| Address required for checkout | Checkout route guards against no saved address |
| Addresses are user-scoped | A customer cannot view or edit another customer's addresses |

---

## Convex Table: `addresses`

See `DATA_ENTITY_MAP.md` for field definitions.

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `addresses.listByUser` | All addresses for the current user |
| `addresses.getById` | Single address for the edit form |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `addresses.create` | Create a new address |
| `addresses.update` | Update an existing address |
| `addresses.delete` | Delete an address |
| `addresses.setDefault` | Set one address as default, clear others |

---

*Last updated: 2026-06-21*
