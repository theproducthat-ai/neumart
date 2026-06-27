---
object_id: "DECISION-ORD-AMOUNT-FIELDS-001"
legacy_id: ""
object_type: Decision

product_area_code: "ORD"
module_code: "ORD"
submodule_code: ""
feature_slug: "amount-fields"
sequence: "001"
version: "1.0"
canonical_name: "DECISION-ORD-AMOUNT-FIELDS-001"
display_name: "Order Amount Fields — Naming Convention for Coupon MVP"
file_slug: "DECISION-ORD-AMOUNT-FIELDS-001"

decision_type: "Technical"
decision_statement: "Keep existing subtotal and total fields on the orders table unchanged; add discountAmount and coupon snapshot fields alongside, without renaming or migrating existing fields."
decision_date: "2026-06-25"
decision_made_by: "Product Owner"

context: "The coupon system requires storing a discount amount on the orders table. During intake grilling for REQUEST-COM-CART-COUPON-001, the Product Owner's Q4 answer used subtotalAmount and totalAmount as field names, which conflicted with the existing Convex orders table fields subtotal and total. A technical decision was required before PRD authoring could proceed."
trigger: "Field naming conflict between Product Owner's proposed order schema (subtotalAmount, totalAmount) and existing live Convex orders table (subtotal, total). Flagged during /product-request grilling as a blocking tech design item."

alternatives_considered:
  - option: "Option A — Rename subtotal → subtotalAmount and total → totalAmount"
    description: "Standardise all money fields with the Amount suffix across the orders table. Future-facing naming convention."
    why_not_chosen: "Renaming live fields breaks existing code references and requires a Convex schema migration with data backfill on all existing order records. Adds unnecessary risk to the coupon MVP release."
  - option: "Option B — Keep subtotal and total; add new coupon fields alongside (chosen)"
    description: "Retain all existing field names unchanged. Add discountAmount and coupon snapshot fields as new optional fields on the orders table."
    why_not_chosen: "Chosen."

rationale: "The Nuemart orders table has live production data referencing subtotal and total. Renaming these fields would require a data migration and updates to every code path that reads or writes order amounts — introducing schema migration risk with no user-visible benefit to the coupon feature. Backward compatibility is the higher priority at this stage. The coupon MVP can be delivered cleanly by adding discountAmount alongside the existing fields, updating the total calculation to total = subtotal - discountAmount + deliveryFee."

implications: "Enables coupon MVP to ship without schema migration risk. Orders table retains subtotal (pre-discount merchandise total) and total (final payable after discount and delivery fee). discountAmount is stored as a new field, defaulting to 0 for non-coupon orders. Any future standardisation to the Amount suffix convention is a separate tech debt item."

trade_offs: "The orders table will have an inconsistent naming convention — subtotal and total alongside discountAmount. This is a known and accepted inconsistency. If field naming is standardised in future, a migration will be needed at that point. This decision explicitly defers that work."

linked_object: "REQUEST-COM-CART-COUPON-001"
linked_objects_secondary: []

revisit_date: ""
revisit_trigger: "If the product standardises all money fields with the Amount suffix — trigger a separate tech debt request for order amount field normalisation and migration at that time."
is_reversible: true

status: "Decided"

owner: "Product Owner"
created_by: "AI"
created_at: "2026-06-25"
updated_at: "2026-06-25"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
  confidence: "High"
---

# Decision

**Decision ID:** `DECISION-ORD-AMOUNT-FIELDS-001`
**Type:** Technical
**Status:** Decided
**Date:** 2026-06-25
**Made By:** Product Owner
**Linked Object:** REQUEST-COM-CART-COUPON-001

---

## 1. Decision Summary

Keep existing `subtotal` and `total` fields on the Convex `orders` table unchanged. Add `discountAmount` and coupon snapshot fields as new optional fields alongside. Do not rename existing fields. Do not run a schema migration.

---

## 2. The Decision

**Existing fields retained (unchanged):**

| Field | Type | Notes |
|---|---|---|
| `subtotal` | number (paise) | Cart subtotal — merchandise total before discount |
| `total` | number (paise) | Final payable amount after discount and delivery fee |
| `deliveryFee` | number (paise) | Existing field — no change |

**New fields added for coupon support:**

| Field | Type | Notes |
|---|---|---|
| `discountAmount` | number (paise, optional) | Coupon discount applied. Default `0`. |
| `couponId` | Id<"coupons"> (optional) | FK to coupons table |
| `couponCodeSnapshot` | string (optional) | Coupon code at time of order |
| `couponDiscountTypeSnapshot` | string (optional) | `"percentage"` for MVP |
| `couponDiscountValueSnapshot` | number (optional) | Percentage value at time of order |
| `couponMaxDiscountSnapshot` | number (optional) | Max discount cap at time of order (paise) |
| `couponAppliedAt` | number (optional) | Timestamp when coupon was applied |

**Confirmed calculation rule:**

```
total = subtotal - discountAmount + deliveryFee
```

- `subtotal` = pre-discount merchandise total
- `discountAmount` = `0` when no coupon is applied
- `total` = final payable amount (used for payment, display, and reconciliation)

---

## 3. Context

The coupon system (REQUEST-COM-CART-COUPON-001) requires storing a discount amount on the `orders` table. During intake grilling, the Product Owner's Q4 schema answer used `subtotalAmount` and `totalAmount` as field names. This conflicted with the existing Convex `orders` table which uses `subtotal` and `total` as live field names with production data.

**Trigger:** Field naming conflict between proposed schema vocabulary and existing live schema. Flagged as a blocking tech design item before PRD authoring.

---

## 4. Alternatives Considered

| Option | Description | Why Not Chosen |
|---|---|---|
| Option A — Rename existing fields | Rename `subtotal` → `subtotalAmount` and `total` → `totalAmount` across the orders table. | Requires Convex schema migration, data backfill on all existing order records, and updates to every code path that reads/writes order amounts. Adds migration risk to a coupon MVP that should be low-risk to deploy. |
| **Option B — Add new fields alongside (chosen)** | Keep `subtotal` and `total` unchanged. Add `discountAmount` and coupon snapshot fields as new optional fields. | **Chosen.** Zero migration risk. All existing order queries and mutations remain valid. Coupon fields are additive. |

---

## 5. Rationale

The `orders` table has live production data. Every existing admin screen, order history view, and order mutation references `subtotal` and `total` by name. Renaming them would require a Convex schema migration with data backfill, code changes across the order placement mutation, admin order views, checkout summary, and order history — all for a naming convention change with no user-visible benefit.

The coupon MVP goal is to add discount capability with minimum blast radius. Adding `discountAmount` alongside existing fields achieves this cleanly. The total calculation (`total = subtotal - discountAmount + deliveryFee`) is clear and consistent with the existing model.

---

## 6. Implications

**What this enables:**
- Coupon MVP deploys without any migration on the `orders` table
- All existing order queries and admin views continue to work unchanged
- `discountAmount` is readable alongside `total` for reconciliation and display
- Non-coupon orders have `discountAmount = 0` (or field absent) — backward compatible

**What this forecloses or makes harder:**
- The `orders` table will have an inconsistent naming convention (`subtotal` vs `discountAmount`) until a future normalisation effort
- Any future rename requires a migration that would have been cheaper to do now

---

## 7. Trade-offs Accepted

The `orders` table will permanently carry mixed naming conventions (`subtotal`, `total`, `deliveryFee` alongside `discountAmount`, `couponId`, etc.) until an explicit normalisation effort. This inconsistency is known and accepted. Future Amount-suffix normalisation is deferred to a separate tech debt request.

---

## 8. Reversibility

**Is this decision reversible?** YES — moderate cost

**Reversal cost:** Reversing would mean renaming `subtotal` → `subtotalAmount` and `total` → `totalAmount` at a later date. This requires a Convex schema migration with data backfill, code updates across all order-related queries and mutations, and QA regression. Cost increases as the number of order records grows.

---

## 9. Revisit

**Revisit date:** Not scheduled

**Revisit trigger:** If the product standardises all Convex money fields with the `Amount` suffix — create a separate tech debt REQUEST for `orders` amount field normalisation and migration at that time. Do not bundle with any feature work.

---

## 10. Impact on Other Objects

| Object ID | Object Type | How This Decision Affects It |
|---|---|---|
| REQUEST-COM-CART-COUPON-001 | Request | Resolves the blocking schema conflict; PRD authoring can now proceed |
| `orders` (Convex table) | Schema | New optional fields added: discountAmount, couponId, coupon snapshot fields |
| PRD-COM-CART-COUPON-V1 (to create) | PRD | Schema spec in PRD must use the confirmed field names from this decision |
| DEVPLAN-COM-CART-COUPON-V1 (to create) | Dev Plan | Convex schema migration spec must add new fields only — no renames |

---

## 11. AI Reasoning Notes

**Generated in:** `/product-request` continuation — post-grilling, pre-PRD
**AI reasoning:** Field naming conflict was surfaced during intake grilling as a blocking tech design item (flagged in REQUEST-COM-CART-COUPON-001 v1.1). The conflict met the threshold for a formal Decision object: it affects schema design, has meaningful alternatives with different cost profiles, and the rationale needs to be preserved for the PRD author and engineering team.

---

## 12. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | 2026-06-25 | Product Owner + AI | Decision created — Option B confirmed |
