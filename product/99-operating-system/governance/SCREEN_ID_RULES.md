# Screen ID Rules

Defines how Screen IDs are assigned in Nuemart. Claude assigns Screen IDs. The user never needs to look up or suggest Screen IDs.

---

## Screen ID Format

```
SCR-[PREFIX]-NNNN
```

Where:
- `SCR` = Screen
- `[PREFIX]` = audience area (see table below)
- `NNNN` = 4-digit sequential number, zero-padded

---

## Prefix Reference

| Prefix | Audience | Route Pattern | Registry Key |
|---|---|---|---|
| CUS | Customer-facing | `/` `/product/*` `/cart` `/checkout/*` `/orders/*` `/profile/*` | SCR-CUS |
| ADM | Admin-facing | `/admin/*` | SCR-ADM |
| AUTH | Authentication | `/sign-in` `/sign-up` | SCR-AUTH |

---

## Existing Screen IDs (as of Phase 2)

### Customer Screens (SCR-CUS)

| Screen ID | Screen Name | Route |
|---|---|---|
| SCR-CUS-0001 | Home / Product Listing | `/` |
| SCR-CUS-0002 | Product Detail | `/product/[slug]` |
| SCR-CUS-0003 | Cart | `/cart` |
| SCR-CUS-0004 | Checkout — Address | `/checkout/address` |
| SCR-CUS-0005 | Checkout — Payment | `/checkout/payment` |
| SCR-CUS-0006 | Order Confirmation | `/checkout/confirmation` |
| SCR-CUS-0007 | Order History | `/orders` |
| SCR-CUS-0008 | Order Detail | `/orders/[id]` |
| SCR-CUS-0009 | Profile | `/profile` |
| SCR-CUS-0010 | Address Management | `/profile/addresses` |

**Next CUS ID: SCR-CUS-0011**

### Admin Screens (SCR-ADM)

| Screen ID | Screen Name | Route |
|---|---|---|
| SCR-ADM-0001 | Admin Dashboard | `/admin` |
| SCR-ADM-0002 | Product List | `/admin/products` |
| SCR-ADM-0003 | Add Product | `/admin/products/new` |
| SCR-ADM-0004 | Edit Product | `/admin/products/[id]/edit` |
| SCR-ADM-0005 | Category Management | `/admin/categories` |
| SCR-ADM-0006 | Order List | `/admin/orders` |
| SCR-ADM-0007 | Order Detail | `/admin/orders/[id]` |
| SCR-ADM-0008 | Customer List | `/admin/customers` |
| SCR-ADM-0009 | Customer Detail | `/admin/customers/[id]` |
| SCR-ADM-0010 | Inventory Management | `/admin/inventory` |
| SCR-ADM-0011 | Analytics / Reports | `/admin/analytics` |

**Next ADM ID: SCR-ADM-0012**

### Auth Screens (SCR-AUTH)

| Screen ID | Screen Name | Route |
|---|---|---|
| SCR-AUTH-0001 | Sign In | `/sign-in` |
| SCR-AUTH-0002 | Sign Up | `/sign-up` |

**Next AUTH ID: SCR-AUTH-0003**

---

## When to Assign a New Screen ID

| Situation | Action |
|---|---|
| New Next.js page created under `/app` | Assign new Screen ID from registry |
| Existing screen is renamed | Do NOT change Screen ID — update the name column in SCREEN_REGISTRY.md only |
| Existing screen is deprecated | Mark as deprecated in SCREEN_REGISTRY.md; do not reuse the ID |
| Component added to existing screen | No new Screen ID needed — components are not screens |
| Modal or drawer added to existing screen | No new Screen ID needed |

---

## How Claude Assigns a New Screen ID

1. Read `01-product-architecture/SCREEN_REGISTRY.md` to find the current max ID for the relevant prefix.
2. Assign the next sequential ID.
3. Add the new screen to SCREEN_REGISTRY.md.
4. Update MASTER_REGISTRY.md (Last Used and Next for the relevant SCR prefix).

---

## Screen Registry File

The canonical list of all screens is:

```
product/01-product-architecture/SCREEN_REGISTRY.md
```

Any new screen must be added there before development begins.

---

*Last updated: 2026-06-21*
