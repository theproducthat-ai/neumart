---
object_id: "BUG-COM-CART-QTY-OVERSTOCK-001"
legacy_id: "REQ-0010"
object_type: Bug
title: "Cart quantity can be increased beyond available stock via repeated plus button taps"
status: "Open"
priority: "high"

module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
feature_id: ""
subfeature_id: ""
component_id: ""

product_area_code: "COM"
module_code: "COM-CART"
submodule_code: "CART"
feature_slug: "QTY-OVERSTOCK"
sequence: "001"
version: "1.0"
canonical_name: "Cart quantity increases beyond available stock when user taps plus button repeatedly"
display_name: "Cart — Quantity Overstock Bug"
file_slug: "BUG-COM-CART-QTY-OVERSTOCK-001"

severity: "High"
bug_type: "Functional"

found_in_qa_run: ""
found_in_uat_run: ""
found_in_test_case: ""
found_date: "2026-06-25"
found_by: "Product Owner"

linked_story: ""
linked_feature: ""
linked_requirement: ""
linked_acceptance_criterion: ""

fix_status: Open
fix_assigned_to: ""
fix_date: ""
fix_verified_by: ""
fix_verified_date: ""
fix_commit_ref: ""
fix_notes: ""

environment: ""
device: "mobile"
browser: ""

relationships:
  found_in: ""
  blocks: ""
  linked_to_story: ""
  linked_to_feature: ""

owner: "Product Owner"
created_by: "AI"
created_at: "2026-06-25"
updated_at: "2026-06-25"

metadata:
  source_system: "Product OS"
  schema_version: "1.0"
  confidence: "High"
---

# Bug — BUG-COM-CART-QTY-OVERSTOCK-001

## 1. Bug Summary

**Bug ID:** `BUG-COM-CART-QTY-OVERSTOCK-001`
**Severity:** High
**Type:** Functional
**Status:** Open
**Module:** MOD-COM — Customer Commerce
**Area:** MA-COM-CART — Cart
**Screen:** SCR-CUS-0003 — Cart (`/cart`)
**Found Date:** 2026-06-25
**Found By:** Product Owner

---

## 2. Bug Title

**BUG-COM-CART-QTY-OVERSTOCK-001:** Cart quantity increases beyond available stock when user taps plus button repeatedly.

---

## 3. Steps to Reproduce

**Preconditions:**
- A product is in the cart with a `stockQuantity` of N (e.g., 3 units available)
- The customer is on the Cart screen (`/cart`)

**Steps:**
1. Open the cart page (`/cart`)
2. Locate a cart item where stock is limited (e.g., 3 units available)
3. Tap the plus (`+`) button on the item quantity control
4. Continue tapping the plus button repeatedly beyond the available stock quantity
5. Observe that the quantity counter increments past the stock limit (e.g., reaches 4, 5, 6…)

**Reproducibility:** Always

---

## 4. Expected Behavior

When the cart item quantity equals the available `stockQuantity` for that product, the plus (`+`) button should be disabled or produce no effect. The quantity must never exceed the product's available stock.

**References:** Standard cart validation requirement — purchase quantity must be bounded by available stock.

---

## 5. Actual Behavior

The plus (`+`) button continues to increment the cart item quantity beyond the available stock. No validation or cap is applied. A customer can set a quantity higher than what is in stock.

---

## 6. Severity Assessment

| Factor | Rating | Rationale |
|---|---|---|
| Severity | High | Core shopping flow integrity broken — customer could order more than available stock |
| User Impact | High | All customers can trigger this by tapping plus repeatedly on limited-stock items |
| Frequency | Always | Reproducible on every cart item regardless of stock level |
| Blocker? | NO | Does not block checkout from proceeding, but represents a purchase integrity risk |

**Severity Definitions:**
- **High:** Core user journey broken, significant user impact, no workaround

---

## 7. Environment Details

| Setting | Value |
|---|---|
| Environment | All (local / staging / production) |
| Device | Mobile (most likely — "taps plus button repeatedly" implies touch) |
| Browser | All |
| Screen | SCR-CUS-0003 — Cart (`/cart`) |
| Auth State | Customer logged in |
| Data State | Cart contains at least one item with limited stock |

---

## 8. Traceability

| Object Type | Object ID | Relationship |
|---|---|---|
| Screen | SCR-CUS-0003 | Bug occurs on the Cart screen |
| Module | MOD-COM | COM — Customer Commerce |
| Module Area | MA-COM-CART | Cart management |

**Architecture note:** Cart state is managed by Zustand / localStorage (not a Convex table). Stock availability is read from the existing `products` Convex table. No schema change is required for the fix.

---

## 9. Fix Details

> _(To be completed when bug is fixed and verified)_

**Fix Status:** Open
**Assigned To:** —
**Guidance:** Before incrementing cart item quantity, compare current quantity against the product's `stockQuantity`. If `currentQty >= stockQuantity`, the plus button must be disabled or the action must be a no-op. Read `stockQuantity` from the product record (already available in the `products` Convex table).

---

## 10. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | 2026-06-25 | AI (Product OS) | Bug created at intake via /product-request |
