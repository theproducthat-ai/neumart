# IMPACT-0002 — Allergen and Ingredient Details for Each Product

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0005 | `04-request-management/requests/REQ-0005.md` |
| Grilling | — | Grilling answers captured directly in REQ-0005.md |
| Evaluation | — | Not required — existing feature enhancement |
| PRD | — | *(to be created after Go decision)* |

---

## Status

**Assessment Status:** Complete
**Owner:** Product Owner
**Date Opened:** 2026-06-23
**Date Completed:** 2026-06-23
**Last Updated:** 2026-06-23

---

## Current Blocker

None. All grilling questions resolved. All schema decisions confirmed. No external dependencies. Go recommendation is clear.

---

## Next Action

Go decision from Product Owner → create PRD-0003.

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | Customer Commerce |
| Sub-modules | Product Listing, Product Detail |
| Secondary Modules | Admin Console / Products (form fields for create and edit) |
| Screens Impacted | SCR-CUS-0001, SCR-CUS-0002, SCR-ADM-0006, SCR-ADM-0007 |
| New Screens Required | No |
| Schema Change Required | Yes — 5 new optional fields on existing `products` table |
| Payment Logic Affected | No |
| Inventory Logic Affected | No |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Impact |
|---|---|---|---|
| SCR-CUS-0001 | Product Listing | `/products` | Modified — allergen badge added to product card when allergen data present |
| SCR-CUS-0002 | Product Detail | `/products/[slug]` | Modified — new "Allergen & Ingredient Information" section added below description |
| SCR-ADM-0006 | New Product | `/admin/products/new` | Modified — 5 new optional form fields added to product creation form |
| SCR-ADM-0007 | Edit Product | `/admin/products/[id]/edit` | Modified — same 5 new fields added; existing values pre-populated for edit |

---

## Business Impact

**Rating:** Medium — Positive

Product transparency is an increasingly expected standard for grocery platforms. Customers with food allergies, dietary restrictions, or religious/lifestyle food preferences cannot make informed purchase decisions without ingredient and allergen data. The absence of this information is a trust and safety gap — not a future nice-to-have.

Concrete business outcomes:
- Reduces purchase abandonment caused by ingredient uncertainty
- Reduces customer support queries about product contents
- Differentiates Nuemart from competitors who only show basic product info
- Creates a foundation for future dietary filtering (REQ-0006, Parked) which is a direct conversion driver

No direct revenue change from this feature alone, but customer trust and confidence at the catalogue level is a retention and conversion factor.

---

## Customer Experience Impact

**Rating:** Positive

Customers gain two new interaction points:

1. **Product card (SCR-CUS-0001):** A generic allergen badge appears only when allergen data exists. "Contains allergens" (if containsAllergens is set) or "May contain allergens" (if only mayContainAllergens is set). No badge for products without data. No clutter on cards that don't need it.

2. **Product detail (SCR-CUS-0002):** A structured "Allergen & Ingredient Information" section below the product description shows: Ingredients, Contains Allergens, May Contain Traces Of, Dietary Tags, and Allergen Notes. If no data exists for a product, the section displays "Allergen information not available." — never hidden, never auto-inferred as safe.

No existing customer flow is disrupted. Both changes are purely additive to existing screens.

---

## Admin Experience Impact

**Rating:** Low overhead — Positive long-term

Admins gain 5 new optional fields on the product create/edit form:

1. Ingredients (textarea — freeform)
2. Contains Allergens (multi-select from 12-item fixed list)
3. May Contain Allergens (multi-select from 12-item fixed list)
4. Dietary Tags (multi-select from 10-item fixed list)
5. Allergen Notes (textarea — freeform)

All fields are optional. Admin can create or update a product without filling in any of these fields. This means no disruption to existing admin workflow. Allergen data can be added progressively as the team has capacity.

Operational note: the team will need to decide which products to enrich first, and in what order. This is a data entry effort, not a development risk.

---

## Operational Impact

**Rating:** Low

No new processes or SOPs required for the feature to function. The only operational ask is a data enrichment effort: filling in allergen fields for products where the information is available (supplier sheets, product packaging). This is admin data entry work, not a system or process change.

---

## Technical Impact

**Rating:** Low
**Estimated complexity:** 2–4 engineering days

The change is purely additive:
- Modify one existing Convex table (`products`) with 5 optional fields
- Modify two existing mutations (`createProduct`, `updateProduct`) to accept new fields
- Existing list/get queries return all product fields automatically — no query changes needed
- Modify one product card component (badge logic — conditional, no state change)
- Add one new section component to product detail page
- Add 5 new fields to two existing admin form pages

No new tables, no new queries, no external APIs, no auth changes, no inventory or payment logic touched.

---

## Data / Schema Impact

**Schema change required:** Yes
**Table modified:** `products` (existing — not a new table)
**New tables:** None
**Type of change:** Additive — 5 new optional fields only. No existing fields modified or removed.
**Migration / backfill required:** No — all fields are optional. Existing product records are unaffected; they will simply have undefined values for the new fields.
**Deployment:** Convex handles additive schema migrations automatically via `npx convex deploy`. No manual migration script needed.

**New fields on `products` table:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `ingredients` | string | No (optional) | Freeform ingredient list. e.g. "Wheat flour, sugar, salt, edible oil" |
| `containsAllergens` | array of strings | No (optional) | Values from fixed allergen list. e.g. `["Milk", "Wheat", "Soy"]` |
| `mayContainAllergens` | array of strings | No (optional) | Values from fixed allergen list. e.g. `["Peanuts", "Tree nuts"]` |
| `dietaryTags` | array of strings | No (optional) | Values from fixed dietary tag list. e.g. `["Vegetarian", "Gluten-free"]` |
| `allergenNotes` | string | No (optional) | Freeform notes. e.g. "Manufactured in a facility that also processes nuts." |

**Fixed allergen list (12 items — stored as string values in array):**
Milk, Peanuts, Tree nuts, Wheat, Gluten, Soy, Sesame, Mustard, Egg, Fish, Shellfish, Sulphites

**Fixed dietary tag list (10 items — stored as string values in array):**
Vegetarian, Vegan, Jain-friendly, Organic, No added sugar, Low fat, Gluten-free, Dairy-free, Nut-free, Soy-free

**Future-filter readiness:** By storing allergens and dietary tags as arrays (not concatenated strings), future filter queries can use Convex's `.filter()` on array membership. No schema changes needed when REQ-0006 is reopened.

---

## Backend Impact

| Function | Type | Change |
|---|---|---|
| `convex/schema.ts` | Schema | Modify — add 5 optional fields to `products` table definition |
| `products/createProduct` | Mutation | Modify — add 5 optional fields to args validator and insert call |
| `products/updateProduct` | Mutation | Modify — add 5 optional fields to args validator and patch call |
| `products/getProduct` | Query | No change — returns all fields automatically once schema is updated |
| `products/listProducts` | Query | No change — returns all fields automatically |

**Validator pattern for new fields (Convex v.optional):**

```ts
ingredients: v.optional(v.string()),
containsAllergens: v.optional(v.array(v.string())),
mayContainAllergens: v.optional(v.array(v.string())),
dietaryTags: v.optional(v.array(v.string())),
allergenNotes: v.optional(v.string()),
```

No new Convex files required. Changes are confined to `schema.ts` and the existing products mutation file.

---

## Frontend Impact

| File | Type | Change |
|---|---|---|
| `convex/schema.ts` | Schema | Modify — add 5 optional fields to products table |
| `convex/products.ts` (or equivalent) | Mutations | Modify — `createProduct` and `updateProduct` validators and insert/patch |
| `neumart/components/products/product-card.tsx` | Component | Modify — add allergen badge: "Contains allergens" / "May contain allergens" / none |
| `neumart/app/(customer)/products/[slug]/page.tsx` | Page | Modify — add AllergenInfoSection component below product description |
| `neumart/components/products/AllergenInfoSection.tsx` | Component | Create — displays ingredients, allergens, may-contain, dietary tags, notes; shows fallback message when data absent |
| `neumart/app/(admin)/admin/products/new/page.tsx` (or form component) | Form | Modify — add 5 new optional fields with appropriate input types |
| `neumart/app/(admin)/admin/products/[id]/edit/page.tsx` (or form component) | Form | Modify — same 5 new fields pre-populated from existing product data |

---

## Screen Impact

| Screen ID | Screen Name | Change |
|---|---|---|
| SCR-CUS-0001 | Product Listing | Add allergen badge to product card. Badge logic: if `containsAllergens?.length > 0` → "Contains allergens"; else if `mayContainAllergens?.length > 0` → "May contain allergens"; else no badge. |
| SCR-CUS-0002 | Product Detail | Add AllergenInfoSection below product description. Section always renders — shows data if present, shows "Allergen information not available." if not. |
| SCR-ADM-0006 | New Product | Add 5 optional fields: Ingredients (textarea), Contains Allergens (multi-select), May Contain Allergens (multi-select), Dietary Tags (multi-select), Allergen Notes (textarea). |
| SCR-ADM-0007 | Edit Product | Same 5 fields as New Product, pre-populated with existing product data. |

---

## Role / Permission Impact

| Role | Change |
|---|---|
| Customer | New read access — can view allergen and ingredient data on product card and product detail. No new write access. |
| Admin | New write access — can create/update allergen fields on product create and edit forms. No new read gates needed. |

No new roles. No Clerk metadata changes. No route guard changes. Admin allergen fields are gated behind the existing `/admin/*` route guard, which already enforces `role === "admin"` server-side.

---

## Payment Impact

**Payment logic affected:** No
**Razorpay API call required:** No
**Webhook change required:** No
**payments table affected:** No
**Notes:** Allergen data is entirely decoupled from payment. No payment-related code is touched.

---

## Inventory Impact

**Stock reduction timing affected:** No
**stockMovements affected:** No
**Stock reservation required:** No
**Notes:** Allergen data is catalogue metadata only. No inventory-related code is touched.

---

## Reporting Impact

No impact on existing dashboard stats. Allergen data is not a reportable metric in MVP. Future enhancement (noted in MODULE_MASTER.md Admin Console Future Candidates): admin completeness indicator (products with/without allergen data) — not in scope for this request.

---

## Integration Impact

| Integration | Change |
|---|---|
| Razorpay | None |
| Clerk | None |
| Convex | Schema modification (5 optional fields on products table); mutation modifications (createProduct, updateProduct) |

---

## Security / Compliance Impact

**Authentication change:** No
**Authorization change:** No
**Sensitive data exposed:** No — allergen and ingredient data is public product information. There is no PII or financial data involved.
**Compliance implication:** Positive. In India, displaying allergen information is increasingly expected under FSSAI (Food Safety and Standards Authority of India) labelling guidelines. Capturing this data in a structured format supports future compliance if formal allergen labelling requirements are introduced.

**Note:** The app must never auto-infer allergen safety. If `containsAllergens` is empty or absent, the UI must show "Allergen information not available." — not "No allergens" or "Allergen-free." This protects Nuemart from liability in cases where allergen data simply hasn't been entered yet.

---

## QA Impact

**Estimated test scenarios:** 14
**Existing regression tests affected:** Yes — admin product create/edit flows must be regression-tested to confirm no existing fields are disrupted.

**Key test scenarios:**

1. Admin creates product with all allergen fields populated — all data saved and returned correctly
2. Admin creates product with no allergen fields — product saves; allergen fields are undefined, not null/empty
3. Admin edits existing product, adds allergen data — data saved correctly; previously set product fields unchanged
4. Admin edits existing product, clears allergen data — fields saved as undefined
5. Product card with `containsAllergens` set → badge shows "Contains allergens"
6. Product card with only `mayContainAllergens` set → badge shows "May contain allergens"
7. Product card with both set → badge shows "Contains allergens" only
8. Product card with no allergen data → no badge visible
9. Product detail with full allergen data → all sections displayed correctly
10. Product detail with partial allergen data → only populated sections shown; absent sections not rendered
11. Product detail with no allergen data → section renders with "Allergen information not available." message only
12. Product detail: "No allergens" or "Allergen-free" text never auto-inferred or displayed for products without data
13. Admin multi-select for containsAllergens: all 12 allergen values selectable; multiple values save correctly as array
14. Admin multi-select for dietaryTags: all 10 tag values selectable; multiple values save correctly as array

---

## UAT Impact

**UAT scenarios required:** 4
**Estimated UAT duration:** 30–45 minutes

**Key UAT scenarios:**

1. Admin adds allergen data to an existing product → verify customer sees correct badge on listing and full section on detail
2. Admin creates a new product with no allergen data → verify customer sees "Allergen information not available." and no badge
3. Admin sets only `mayContainAllergens` (no `containsAllergens`) → verify "May contain allergens" badge on card
4. Admin sets both `containsAllergens` and `mayContainAllergens` → verify "Contains allergens" badge on card (not both badges)

---

## Release Impact

**Environment variables required:** No
**Schema migration required:** Yes — 5 optional fields added to `products` table (Convex handles automatically via `npx convex deploy`)
**Deployment window needed:** No — additive-only schema change. No existing table modified structurally. No data backfill.
**Post-release data task:** Admin team to progressively enrich product allergen data. No system action required — this is manual data entry.

---

## Rollback Plan

**Rollback complexity:** Simple

1. Revert `convex/schema.ts` — remove the 5 new optional fields from the `products` table definition.
2. Revert `convex/products.ts` — remove the new optional fields from `createProduct` and `updateProduct` validators and insert/patch calls.
3. Revert `product-card.tsx` — remove allergen badge logic.
4. Revert product detail page — remove `AllergenInfoSection` import and rendering.
5. Delete `AllergenInfoSection.tsx` component.
6. Revert admin product create and edit forms — remove the 5 new fields.
7. Run `npx convex deploy` — Convex will remove the schema fields. Any allergen data already entered will be lost. Since all fields are optional, existing product records are not corrupted.

**Risk of rollback:** Low. Since all new fields are optional, no existing product record depends on them. A rollback cannot corrupt order, payment, inventory, or user data.

---

## Risk Score

| Dimension | Score (1–10) | Rationale |
|---|---|---|
| Technical complexity | 2 | Five optional fields on one existing table. Two mutation changes. Two screen modifications. One new component. No new tables, no new queries, no external APIs. |
| Schema change risk | 2 | Additive-only modification to existing table. All fields optional. Existing records unaffected. Convex handles migration automatically. |
| Payment integrity risk | 1 | No payment logic touched whatsoever. |
| Inventory integrity risk | 1 | No inventory logic touched whatsoever. |
| Customer experience risk | 2 | Additive changes to existing screens. No existing functionality removed or modified. Fallback message rule prevents false-safety messaging. |
| Rollback difficulty | 2 | Simple revert. Optional fields only. No cascading effects on existing data. |
| **Overall Risk Score** | **1.7 / 10** | Very low risk. Contained, additive, no cross-cutting dependencies. |

---

## Go / No-Go / Split Recommendation

**Recommendation: Go**

**Reasoning:** This is a low-risk, high-clarity additive enhancement. The schema change is the only technical risk factor — and at 1.7/10, it is the lowest risk category of schema change possible: optional fields on an existing table, no backfill, Convex-managed migration, clean rollback. No payment logic, no inventory logic, no external APIs, no auth changes, no new roles. The MVP scope is tightly defined (grilling complete, all questions answered) with a clear out-of-scope boundary (filtering is parked as REQ-0006).

**Conditions before PRD:**

1. The UI must **never** render "No allergens", "Allergen-free", or any affirmative safety claim unless admin has explicitly set that data. Only "Allergen information not available." is permitted as a fallback.
2. `containsAllergens` and `mayContainAllergens` must be defined as `v.optional(v.array(v.string()))` in the Convex schema — not as a single concatenated string — to preserve future filter-readiness for REQ-0006.
3. The allergen badge on the product card must be **display-only** with no click interaction in MVP (no tooltip, no modal, no link). Full detail is on the product detail page.
4. The admin form multi-select for allergens and dietary tags must render the fixed list values only — no free-text input allowed.

---

*Last updated: 2026-06-23*
