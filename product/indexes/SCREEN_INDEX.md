# Screen Index

All screens in the Nuemart product, indexed by ID, name, module, and route.

---

## Customer Screens

| SCR ID | Screen Name | Module | Route | File Path | Status |
|--------|------------|--------|-------|-----------|--------|
| SCR-CUS-0003 | Cart | MOD-COM / MA-COM-CART | `/cart` | — | Active — Modified by FEATURE-COM-CART-COUPON (coupon input + discount line item) |

---

## Admin Screens

| SCR ID | Screen Name | Module | Route | File Path | Status |
|--------|------------|--------|-------|-----------|--------|
| SCR-ADM-0012 | Admin Coupon List | MOD-ADM / MA-ADM-SETTINGS | `/admin/coupons` | — | Planned — FEATURE-COM-CART-COUPON (PRD-COM-CART-COUPON-V1) |
| SCR-ADM-0013 | Admin Coupon Form (Create / Edit) | MOD-ADM / MA-ADM-SETTINGS | `/admin/coupons/new`, `/admin/coupons/[id]` | — | Planned — FEATURE-COM-CART-COUPON (PRD-COM-CART-COUPON-V1) |

---

## Auth Screens

| SCR ID | Screen Name | Route | Managed By | Status |
|--------|------------|-------|------------|--------|
| | | | | |

---

## How to Find a Screen

1. Search by name in this index.
2. Open the screen object for full details: `product/objects/screens/SCR-NNN.md`
3. For the file to edit: use `file_path` in the screen object.
4. For the Figma design: use `figma_link` in the screen object.
5. For related features: use `feature_ids` in the screen object.

## Related
- Route map: `product/indexes/ROUTE_SCREEN_MAP.md`
- Feature map: `product/indexes/SCREEN_FEATURE_MAP.md`
- Component map: `product/indexes/SCREEN_COMPONENT_MAP.md`
- Policy: `product/os/policies/SCREEN_REFERENCE_RULES.md`
