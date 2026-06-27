# User Story Index

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when stories are created, estimated, or completed

---

## V1 Legacy Stories (US-0001 to US-0023)

These stories are in `product/objects/stories/`. They are read-only reference — do not add new stories to this folder.

| ID | Title | Epic / Feature | Status |
|---|---|---|---|
| US-0001 to US-0023 | _(see `objects/stories/` folder)_ | — | legacy |

---

## V2 User Stories (US-0024+)

New stories created after the V2 migration. Stored in `product/objects/user-stories/`.

| ID | Title | Epic | Feature | Sprint | Status | Points | Owner |
|---|---|---|---|---|---|---|---|
| US-0024 | Schema: coupons + couponUsages tables + orders fields | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Engineering Lead |
| US-0025 | Backend: createCoupon / updateCoupon + computeCouponDiscount | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Engineering Lead |
| US-0026 | Backend: listCoupons query + usage count aggregation | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Engineering Lead |
| US-0027 | Backend: validateCoupon query with structured error codes | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Engineering Lead |
| US-0028 | Backend: placeOrder mutation extension — coupon validation + couponUsage write | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Engineering Lead |
| US-0029 | Admin UI: Coupon List screen (SCR-ADM-0012) | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Product Lead |
| US-0030 | Admin UI: Coupon Create / Edit Form (SCR-ADM-0013) | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Product Lead |
| US-0031 | Customer UI: Cart coupon input + apply + discount line item + remove | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Product Lead |
| US-0032 | Customer UI: Auto-remove coupon on cart drop below minimum | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Product Lead |
| US-0033 | Customer UI: Checkout summary coupon discount line [Should Have] | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Product Lead |
| US-0034 | Customer UI: Order history coupon discount display [Nice to Have] | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Product Lead |
| US-0035 | Admin UI: Order detail coupon display [Nice to Have] | — | FEATURE-COM-CART-COUPON | — | in-qa | — | Product Lead |

---

## Story Status Definitions

| Status | Meaning |
|---|---|
| `backlog` | Not yet scheduled |
| `sprint-ready` | Meets DoR, ready to pull into sprint |
| `in-progress` | Engineer actively working |
| `in-review` | Code review in progress |
| `in-qa` | QA testing |
| `done` | Meets DoD, merged and shipped |
| `carried-over` | Moved to next sprint |
| `rejected` | Will not build |

---

## Story Size Reference

| Points | Size | Description |
|---|---|---|
| 1 | XS | A few hours — trivial change |
| 2 | S | Half a day — small, well-understood |
| 3 | M | 1 day — moderate, some unknowns |
| 5 | L | 2-3 days — complex or has dependencies |
| 8 | XL | 1 week — should be broken down if possible |
| 13 | XXL | > 1 week — must be broken down |

---

## Filter Views

**Unestimated stories** (not ready for sprint): status = backlog AND points = null  
**Sprint-ready stories**: status = sprint-ready  
**Carried-over stories**: status = carried-over (investigate why)

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- `product/objects/user-stories/`
- `product/objects/stories/` (V1 legacy)
- `product/engineering/DEFINITION_OF_READY.md`
