# DEVPLAN-0005 — Allergen and Ingredient Details for Each Product

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0005 | `04-request-management/requests/REQ-0005.md` |
| PRD | PRD-0003 | `07-prd/approved-prds/PRD-0003.md` |
| User Stories | US-0015, US-0016, US-0017, US-0018, US-0019 | `08-user-stories/stories/` |
| Impact Assessment | IMPACT-0002 | `06-assessment-and-impact/assessments/IMPACT-0002.md` |
| QA | — | *(populated after QA is run)* |
| Coding Prompt | DEVPLAN-0005-coding-prompt.md | `09-development-planning/plans/DEVPLAN-0005-coding-prompt.md` |

---

## Status

**Dev Plan Status:** Ready for Development
**Owner:** Product Owner
**Date Created:** 2026-06-23
**Last Updated:** 2026-06-23

---

## Current Blocker

None.

---

## Next Action

Execute `DEVPLAN-0005-coding-prompt.md` to start development.

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | Customer Commerce |
| Sub-modules | Product Listing, Product Detail |
| Secondary Modules | Admin Console / Products |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Change |
|---|---|---|---|
| SCR-CUS-0001 | Product Listing | `/products` | Modified — allergen badge on product card |
| SCR-CUS-0002 | Product Detail | `/products/[slug]` | Modified — new Allergen & Ingredient section |
| SCR-ADM-0006 | New Product | `/admin/products/new` | Modified — 5 new optional allergen fields in shared form |
| SCR-ADM-0007 | Edit Product | `/admin/products/[id]/edit` | Modified — same 5 fields via shared form, pre-populated |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | Yes | Full spec in REQ-0005.md; grilling answers in same file |
| Screenshots provided | No | None required |
| Competitor references | No | None provided |
| Missing references | — | None |
| Assumptions | — | Admin product form is a shared component (`product-form.tsx`) — allergen fields added there once, used by both new and edit routes |

---

## Objective

Add structured allergen and ingredient fields to the Nuemart product catalogue. Admin can capture allergen data per product via the existing product form. Customers see a compact badge on the product listing card and a full allergen section on the product detail page. All fields are optional, additive, and schema-future-ready for allergen filtering (REQ-0006, Parked).

---

## Current App Context

- `convex/schema.ts`: `products` table exists with fields: `name`, `slug`, `description`, `price`, `categoryId`, `imageUrl`, `isActive`, `stock`, `createdAt`. No allergen fields exist today.
- `convex/products.ts`: Contains `createProduct` and `updateProduct` mutations. Both have explicit validators. Neither currently accepts allergen fields.
- `components/admin/product-form.tsx`: Shared form component used by both `/admin/products/new` and `/admin/products/[id]/edit`. Adding allergen fields here covers both SCR-ADM-0006 and SCR-ADM-0007 in one change.
- `components/products/product-card.tsx`: Renders the product card on the listing page (SCR-CUS-0001). Currently shows name, image, price, stock badge, favourites toggle, add-to-cart. No allergen badge exists today.
- `app/(customer)/products/[slug]/page.tsx`: Product detail page (SCR-CUS-0002). Renders product information. No allergen section exists today.
- **Must not break:** Product create/edit, product listing, product detail, cart, checkout, favourites, all admin product operations.

---

## Implementation Order

Work must be done in this sequence. Step 1 is a hard gate for all other steps.

```
Step 1 — Schema (US-0015)           ← GATE: deploy before all other steps
Step 2 — Admin form (US-0016/0017)  ← Can start after Step 1
Step 3 — Product card badge (US-0018) ← Can start after Step 1; parallel with Step 2
Step 4 — Product detail section (US-0019) ← Can start after Step 1; parallel with Steps 2 & 3
Step 5 — Deploy and smoke test       ← After all steps
```

Steps 2, 3, and 4 are independent of each other and can be done in parallel after Step 1.

---

## Files Likely Impacted

### Convex Backend

| File | Change Type | Description |
|---|---|---|
| `neumart/convex/schema.ts` | Modify | Add 5 optional fields to `products` table definition |
| `neumart/convex/products.ts` | Modify | Add 5 optional fields to `createProduct` and `updateProduct` validators and insert/patch calls |

### Next.js Frontend

| File | Change Type | Description |
|---|---|---|
| `neumart/components/admin/product-form.tsx` | Modify | Add "Allergen & Ingredient" section with 5 new optional fields |
| `neumart/components/products/product-card.tsx` | Modify | Add conditional allergen badge below price/stock area |
| `neumart/app/(customer)/products/[slug]/page.tsx` | Modify | Import and render `AllergenInfoSection` below product description |
| `neumart/components/products/AllergenInfoSection.tsx` | Create | New component — renders allergen section with sub-sections and fallback |

### Schema

| File | Change | Notes |
|---|---|---|
| `neumart/convex/schema.ts` | Modify — add 5 optional fields to `products` table | Additive only. Convex handles migration on `npx convex deploy`. No manual migration script needed. |

---

## Backend Changes (Convex)

### Schema (`convex/schema.ts`)

Add the following 5 optional fields to the `products` table definition:

```ts
ingredients: v.optional(v.string()),
containsAllergens: v.optional(v.array(v.string())),
mayContainAllergens: v.optional(v.array(v.string())),
dietaryTags: v.optional(v.array(v.string())),
allergenNotes: v.optional(v.string()),
```

All fields use `v.optional`. No new indexes required (future filter queries will use `.filter()` — no index needed for MVP read).

### Modified Mutations (`convex/products.ts`)

**`createProduct` mutation:**
- Add all 5 fields to the `args` validator as `v.optional`
- Pass all 5 fields into the `ctx.db.insert("products", { ... })` call
- Fields absent from args are simply not included in the insert (Convex handles undefined args gracefully)

**`updateProduct` mutation:**
- Add all 5 fields to the `args` validator as `v.optional`
- Include all 5 fields in the `ctx.db.patch(id, { ... })` call
- This allows admin to both set and clear allergen data on edit

**No new Convex functions required.** Existing `getProduct` and list queries return all fields automatically once the schema is updated.

---

## Frontend Changes (Next.js)

### New Component: `AllergenInfoSection`

**Path:** `neumart/components/products/AllergenInfoSection.tsx`

**Props:**
```ts
interface AllergenInfoSectionProps {
  ingredients?: string
  containsAllergens?: string[]
  mayContainAllergens?: string[]
  dietaryTags?: string[]
  allergenNotes?: string
}
```

**Rendering logic:**
- Section heading "Allergen & Ingredient Information" always renders
- Check if any field has data: `hasData = ingredients || containsAllergens?.length || mayContainAllergens?.length || dietaryTags?.length || allergenNotes`
- If `!hasData`: render only "Allergen information not available."
- If `hasData`: render each sub-section only when its field is populated:
  - `ingredients` → "Ingredients" sub-section with plain text
  - `containsAllergens?.length > 0` → "Contains" sub-section with comma-separated list
  - `mayContainAllergens?.length > 0` → "May Contain Traces Of" sub-section with comma-separated list
  - `dietaryTags?.length > 0` → "Dietary Information" sub-section with tags
  - `allergenNotes` → "Notes" sub-section with plain text
- **Never render "No allergens", "Allergen-free", or any affirmative safety claim**

---

### Modified: `product-card.tsx`

Add allergen badge below the existing price/stock display.

**Badge logic (conditional, no interaction):**
```ts
const showContains = (containsAllergens?.length ?? 0) > 0
const showMayContain = !showContains && (mayContainAllergens?.length ?? 0) > 0
```

- If `showContains`: render badge: **"Contains allergens"**
- If `showMayContain`: render badge: **"May contain allergens"**
- Otherwise: render nothing
- Badge has **no onClick, no href, no tooltip**

The product card already receives the full product object — no query changes needed, the new fields will be present on the product once schema is deployed.

---

### Modified: `app/(customer)/products/[slug]/page.tsx`

- Import `AllergenInfoSection` from `components/products/AllergenInfoSection`
- Render `<AllergenInfoSection>` below the product description section, passing all 5 allergen fields from the product object as props
- The product detail page already fetches the full product via Convex — the new fields will be available automatically after the schema change

---

### Modified: `components/admin/product-form.tsx`

Add a new "Allergen & Ingredient" section at the bottom of the form, below all existing fields.

**Fields to add:**

| Field | Input Type | Label | Placeholder |
|---|---|---|---|
| `ingredients` | `<Textarea>` | Ingredients | e.g. Wheat flour, sugar, salt, edible vegetable oil |
| `containsAllergens` | Multi-select (fixed list) | Contains Allergens | Select allergens... |
| `mayContainAllergens` | Multi-select (fixed list) | May Contain Allergens | Select allergens... |
| `dietaryTags` | Multi-select (fixed list) | Dietary Tags | Select tags... |
| `allergenNotes` | `<Textarea>` | Allergen Notes | e.g. Manufactured in a facility that also processes nuts |

**Fixed allergen list (12 values):**
`["Milk", "Peanuts", "Tree nuts", "Wheat", "Gluten", "Soy", "Sesame", "Mustard", "Egg", "Fish", "Shellfish", "Sulphites"]`

**Fixed dietary tag list (10 values):**
`["Vegetarian", "Vegan", "Jain-friendly", "Organic", "No added sugar", "Low fat", "Gluten-free", "Dairy-free", "Nut-free", "Soy-free"]`

The multi-select for `containsAllergens`, `mayContainAllergens`, and `dietaryTags` must render these as a selectable list (checkboxes, combobox, or similar). No freetext input is permitted on these fields.

For the edit form: the product form already receives the full product object as a prop or loads it via query — the new allergen fields will be present after schema deploy and should be read into the form's default values for pre-population.

---

## Schema Changes

| Table | Change | Field | Type | Notes |
|---|---|---|---|---|
| `products` | Add field | `ingredients` | `v.optional(v.string())` | Freeform ingredient list |
| `products` | Add field | `containsAllergens` | `v.optional(v.array(v.string()))` | Fixed allergen list values |
| `products` | Add field | `mayContainAllergens` | `v.optional(v.array(v.string()))` | Fixed allergen list values |
| `products` | Add field | `dietaryTags` | `v.optional(v.array(v.string()))` | Fixed dietary tag list values |
| `products` | Add field | `allergenNotes` | `v.optional(v.string())` | Freeform notes |

**Migration:** Run `npx convex deploy` after schema change. Convex handles additive migrations automatically. No manual script required. Existing products are unaffected.

---

## Screen Impact

| Screen ID | Screen Name | Change |
|---|---|---|
| SCR-CUS-0001 | Product Listing | `product-card.tsx` gets conditional allergen badge |
| SCR-CUS-0002 | Product Detail | `AllergenInfoSection` component added below description |
| SCR-ADM-0006 | New Product | `product-form.tsx` gets allergen section at the bottom |
| SCR-ADM-0007 | Edit Product | Same `product-form.tsx` change — fields pre-populated on edit |

---

## Testing Plan

### Manual Test Scenarios

| # | Scenario | Steps | Expected Result |
|---|---|---|---|
| 1 | Schema deploys cleanly | Run `npx convex deploy` | No errors; existing products still load |
| 2 | Admin creates product with all allergen fields filled | Navigate to `/admin/products/new`; fill all allergen fields; submit | Product created; allergen data saved |
| 3 | Admin creates product with no allergen fields | Fill required fields only; submit | Product created; no error; allergen fields absent |
| 4 | Admin edits product to add allergen data | Open existing product edit; add allergen data; save | Data persisted; customer-facing pages updated |
| 5 | Admin edits product to clear allergen data | Open product with allergen data; clear all fields; save | Allergen fields absent; detail page shows fallback |
| 6 | Product card badge — contains allergens | View listing for product with `containsAllergens` set | "Contains allergens" badge visible |
| 7 | Product card badge — may contain only | View listing for product with only `mayContainAllergens` set | "May contain allergens" badge visible |
| 8 | Product card badge — both set | View listing for product with both fields set | "Contains allergens" badge only |
| 9 | Product card badge — no allergen data | View listing for product with no allergen data | No badge |
| 10 | Product detail — full allergen data | Open product detail for enriched product | All populated sub-sections visible |
| 11 | Product detail — no allergen data | Open product detail for unenriched product | Section heading + "Allergen information not available." |
| 12 | Product detail — partial data | Open product with only `dietaryTags` set | Only "Dietary Information" sub-section visible |
| 13 | Badge is not clickable | Click allergen badge on product card | Nothing happens |
| 14 | "No allergens" never shown | Check all products without data | No affirmative safety claim rendered anywhere |

### Regression Areas to Check

- [ ] Product listing loads and renders all existing products correctly
- [ ] Add to cart still works from product card
- [ ] Product detail page loads without errors for all existing products
- [ ] Admin product create form submits without errors (existing fields unaffected)
- [ ] Admin product edit form pre-populates all existing fields correctly
- [ ] Favourites toggle on product card still works
- [ ] Out-of-stock badge on product card still renders
- [ ] `pnpm build` passes with no TypeScript errors

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `product-form.tsx` has a rigid form schema (e.g. zod) that rejects new optional fields | Low | Medium | Add all 5 fields as `.optional()` to the zod schema; default values should be `undefined` |
| Multi-select component not available in current UI library — custom implementation needed | Low | Medium | Use existing shadcn/ui `Combobox` or `Command` component with multi-select pattern; or use checkboxes for the fixed list |
| Empty array `[]` treated differently from `undefined` in form state | Medium | Low | Normalise on submit: convert empty array to `undefined` before calling mutation; validate in test case TC-5 |
| TypeScript errors from optional array fields if accessed without optional chaining | Low | Low | Always use `?.length` and `?.join()` patterns when reading the new fields |

---

## Rollback Plan

If deployment fails or a regression is detected post-release:

1. Revert `neumart/convex/schema.ts` — remove the 5 new optional fields from the `products` table
2. Revert `neumart/convex/products.ts` — remove the 5 new fields from `createProduct` and `updateProduct` validators and insert/patch calls
3. Revert `neumart/components/products/product-card.tsx` — remove allergen badge logic
4. Revert `neumart/app/(customer)/products/[slug]/page.tsx` — remove `AllergenInfoSection` import and render
5. Delete `neumart/components/products/AllergenInfoSection.tsx`
6. Revert `neumart/components/admin/product-form.tsx` — remove allergen section
7. Run `npx convex deploy` — Convex removes the schema fields; any allergen data entered is lost (acceptable — all fields were optional)

**Risk of rollback:** None to existing data. All new fields are optional. Existing products, orders, payments, and stock are entirely unaffected.

---

## Definition of Done

- [ ] US-0015: `convex/schema.ts` updated; `createProduct` and `updateProduct` validators updated; `npx convex deploy` passes
- [ ] US-0016: Allergen section visible on `/admin/products/new`; all 5 fields functional; saves with and without data
- [ ] US-0017: Allergen fields pre-populated on `/admin/products/[id]/edit`; update and clear both work
- [ ] US-0018: Allergen badge renders correctly on product card for all 4 states (contains / may-contain / both / none)
- [ ] US-0019: `AllergenInfoSection` renders correctly for enriched, partial, and empty products; fallback message correct; no affirmative safety claim ever shown
- [ ] `npx tsc --noEmit` passes with no TypeScript errors
- [ ] `npx convex dev` runs without errors
- [ ] `pnpm build` passes
- [ ] All 14 manual test scenarios pass
- [ ] All regression areas checked — no broken existing features
- [ ] Both mobile (375px) and desktop (1280px) layouts verified
- [ ] Ready for QA

---

*Last updated: 2026-06-23*
