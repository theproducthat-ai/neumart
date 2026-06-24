# DEVPLAN-0005 — Coding Prompt: Allergen and Ingredient Details for Each Product

> **CRITICAL RULE:** Read this entire prompt before writing a single line of code. Implement every step in the order listed. Do not skip steps or reorder them.

---

## Linked IDs

| Type | ID |
|---|---|
| Request | REQ-0005 |
| PRD | PRD-0003 |
| DEVPLAN | DEVPLAN-0005 |
| User Stories | US-0015, US-0016, US-0017, US-0018, US-0019 |
| Impact Assessment | IMPACT-0002 |

---

## 1. Context

You are adding allergen and ingredient information to the Nuemart grocery platform.

**What exists today:**
- `neumart/convex/schema.ts` — `products` table has fields: `name`, `slug`, `description`, `categoryId`, `price`, `unit`, `imageUrl`, `stockQuantity`, `lowStockThreshold`, `isActive`, `isFeatured`, `createdAt`, `updatedAt`, `lastStockUpdatedAt`. No allergen fields exist.
- `neumart/convex/products.ts` — mutations are named `adminCreate` and `adminUpdate`. Both use explicit zod-style validators. Neither currently accepts allergen fields.
- `neumart/components/products/product-card.tsx` — renders the product card using `Doc<"products">`. No allergen badge exists.
- `neumart/app/(customer)/products/[slug]/page.tsx` — renders product detail in a 2-column grid. No allergen section exists.
- `neumart/components/admin/product-form.tsx` — shared form for both create and edit. Uses react-hook-form + zod. No allergen fields exist.

**What you are building:**
- 5 new optional schema fields on the `products` table
- 2 Convex mutation updates to accept those fields
- A new `AllergenInfoSection` component for the product detail page
- An allergen badge on the product card (display-only, no interaction)
- A new "Allergen & Ingredient" section in the shared admin product form

---

## 2. In Scope

Implement exactly the following — nothing more:

1. Add 5 optional allergen fields to `products` table in `convex/schema.ts`
2. Add those 5 fields to `adminCreate` and `adminUpdate` validators and insert/patch calls in `convex/products.ts`
3. Create `components/products/AllergenInfoSection.tsx` — new component
4. Add `AllergenInfoSection` to `app/(customer)/products/[slug]/page.tsx` below the product grid
5. Add conditional allergen badge to `components/products/product-card.tsx` inside `CardContent`
6. Add "Allergen & Ingredient" section to `components/admin/product-form.tsx` — zod schema, form fields, submit wiring

---

## 3. Out of Scope

Do NOT do any of the following:

- Do not add allergen filtering to the product listing page — that is REQ-0006 (Parked)
- Do not add an allergen completeness indicator to the admin product list
- Do not add custom/freeform dietary tag support — fixed list only
- Do not create any new Convex queries — existing queries return all fields automatically
- Do not add new npm packages — implement the multi-select using checkboxes
- Do not modify any file not listed in Section 6
- Do not change `convex/schema.ts` beyond adding the 5 specified fields
- Do not change any existing mutation logic beyond adding the new optional fields
- Do not change authentication, route guards, or any Convex auth function
- Do not modify `products/page.tsx` (listing page) beyond the badge change in the product card component
- Do not add click handlers, tooltips, modals, or links to the allergen badge — it is display-only
- Do not show "No allergens", "Allergen-free", or any affirmative safety claim anywhere

---

## 4. Files Impacted

**Modify (existing files):**
- `neumart/convex/schema.ts`
- `neumart/convex/products.ts`
- `neumart/components/products/product-card.tsx`
- `neumart/app/(customer)/products/[slug]/page.tsx`
- `neumart/components/admin/product-form.tsx`

**Create (new files):**
- `neumart/components/products/AllergenInfoSection.tsx`

**No other files should be touched.**

---

## 5. Implementation Order

**Follow this order exactly. Step 1 is a hard gate.**

```
Step 1 — Schema + mutations (convex/schema.ts + convex/products.ts)
Step 2 — AllergenInfoSection component (new file)
Step 3 — Product detail page (add AllergenInfoSection)
Step 4 — Product card badge
Step 5 — Admin product form
Step 6 — Verify
```

---

## 6. Backend Instructions (Convex)

### Step 1A — Modify `neumart/convex/schema.ts`

Locate the `products` table definition (starts around line 45). It currently ends with:

```ts
    lastStockUpdatedAt: v.optional(v.number()),
  })
    .index("by_categoryId", ["categoryId"])
```

Add the 5 new optional fields **before** the closing `})`, after `lastStockUpdatedAt`:

```ts
    lastStockUpdatedAt: v.optional(v.number()),
    ingredients: v.optional(v.string()),
    containsAllergens: v.optional(v.array(v.string())),
    mayContainAllergens: v.optional(v.array(v.string())),
    dietaryTags: v.optional(v.array(v.string())),
    allergenNotes: v.optional(v.string()),
  })
    .index("by_categoryId", ["categoryId"])
```

Do not change the indexes or the search index.

---

### Step 1B — Modify `neumart/convex/products.ts`

**`adminCreate` mutation** — add the 5 fields to `args` after `isFeatured`:

```ts
    isFeatured: v.optional(v.boolean()),
    ingredients: v.optional(v.string()),
    containsAllergens: v.optional(v.array(v.string())),
    mayContainAllergens: v.optional(v.array(v.string())),
    dietaryTags: v.optional(v.array(v.string())),
    allergenNotes: v.optional(v.string()),
```

The `handler` uses `{ ...args, createdAt: now, updatedAt: now }` for the insert — the spread already includes the new fields, so **no change to the insert call is needed**.

**`adminUpdate` mutation** — add the same 5 fields to `args` after `isFeatured`:

```ts
    isFeatured: v.optional(v.boolean()),
    ingredients: v.optional(v.string()),
    containsAllergens: v.optional(v.array(v.string())),
    mayContainAllergens: v.optional(v.array(v.string())),
    dietaryTags: v.optional(v.array(v.string())),
    allergenNotes: v.optional(v.string()),
```

The `handler` uses `{ ...fields, updatedAt: Date.now() }` for the patch — the spread already includes the new fields, so **no change to the patch call is needed**.

Do not change any queries, the `adminDelete` mutation, or any other functions.

---

## 7. Frontend Instructions — Customer-facing

### Step 2 — Create `neumart/components/products/AllergenInfoSection.tsx`

Create this file from scratch:

```tsx
interface AllergenInfoSectionProps {
  ingredients?: string;
  containsAllergens?: string[];
  mayContainAllergens?: string[];
  dietaryTags?: string[];
  allergenNotes?: string;
}

export function AllergenInfoSection({
  ingredients,
  containsAllergens,
  mayContainAllergens,
  dietaryTags,
  allergenNotes,
}: AllergenInfoSectionProps) {
  const hasData =
    !!ingredients ||
    (containsAllergens?.length ?? 0) > 0 ||
    (mayContainAllergens?.length ?? 0) > 0 ||
    (dietaryTags?.length ?? 0) > 0 ||
    !!allergenNotes;

  return (
    <div className="mt-8 rounded-lg border bg-muted/30 p-5 text-sm">
      <h2 className="mb-3 font-semibold text-base">Allergen & Ingredient Information</h2>

      {!hasData ? (
        <p className="text-muted-foreground">Allergen information not available.</p>
      ) : (
        <div className="space-y-3">
          {ingredients && (
            <div>
              <p className="font-medium mb-0.5">Ingredients</p>
              <p className="text-muted-foreground">{ingredients}</p>
            </div>
          )}

          {(containsAllergens?.length ?? 0) > 0 && (
            <div>
              <p className="font-medium mb-0.5">Contains</p>
              <p className="text-muted-foreground">{containsAllergens!.join(", ")}</p>
            </div>
          )}

          {(mayContainAllergens?.length ?? 0) > 0 && (
            <div>
              <p className="font-medium mb-0.5">May Contain Traces Of</p>
              <p className="text-muted-foreground">{mayContainAllergens!.join(", ")}</p>
            </div>
          )}

          {(dietaryTags?.length ?? 0) > 0 && (
            <div>
              <p className="font-medium mb-0.5">Dietary Information</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {dietaryTags!.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-background border px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {allergenNotes && (
            <div>
              <p className="font-medium mb-0.5">Notes</p>
              <p className="text-muted-foreground">{allergenNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

**Rules:**
- Never render "No allergens", "Allergen-free", or any affirmative safety claim
- The heading "Allergen & Ingredient Information" always renders — section is never hidden entirely
- Only render sub-sections when their data is present and non-empty
- Empty arrays (`[]`) are treated same as absent — sub-section does not render

---

### Step 3 — Modify `neumart/app/(customer)/products/[slug]/page.tsx`

Add one import at the top (after the existing imports):

```tsx
import { AllergenInfoSection } from "@/components/products/AllergenInfoSection";
```

Locate the closing `</div>` of the outer container (the last `</div>` in the return, currently around line 213). Add `<AllergenInfoSection>` **after** the 2-column grid `</div>` and **before** the closing container `</div>`:

```tsx
      {/* Allergen & Ingredient Information */}
      <AllergenInfoSection
        ingredients={product.ingredients}
        containsAllergens={product.containsAllergens}
        mayContainAllergens={product.mayContainAllergens}
        dietaryTags={product.dietaryTags}
        allergenNotes={product.allergenNotes}
      />
    </div>  {/* closes container */}
```

The section should appear below the 2-column product grid (below both the image and the details column), spanning full width.

Do not change any existing logic in the file — the product query, loading state, not-found state, cart handlers, or favourites handler.

---

### Step 4 — Modify `neumart/components/products/product-card.tsx`

No import changes needed — `Badge` is already imported.

Locate the `CardContent` block (around line 113–126). It currently renders name, unit, price, and `StockBadge`:

```tsx
<CardContent className="flex flex-1 flex-col gap-1 p-3">
  <Link href={...}>
    <h3 ...>{product.name}</h3>
  </Link>
  <p className="text-xs text-muted-foreground">{product.unit}</p>
  <div className="flex items-center justify-between gap-1">
    <p className="text-base font-bold tracking-tight">
      {formatCurrency(product.price)}
    </p>
    <StockBadge qty={product.stockQuantity} />
  </div>
</CardContent>
```

Add the allergen badge **after** the price/stock row div, still inside `CardContent`:

```tsx
<CardContent className="flex flex-1 flex-col gap-1 p-3">
  <Link href={`/products/${product.slug}`}>
    <h3 className="line-clamp-2 text-sm font-semibold leading-snug hover:underline">
      {product.name}
    </h3>
  </Link>
  <p className="text-xs text-muted-foreground">{product.unit}</p>
  <div className="flex items-center justify-between gap-1">
    <p className="text-base font-bold tracking-tight">
      {formatCurrency(product.price)}
    </p>
    <StockBadge qty={product.stockQuantity} />
  </div>
  {/* Allergen badge — display only, no interaction */}
  {(product.containsAllergens?.length ?? 0) > 0 ? (
    <Badge variant="outline" className="w-fit text-xs font-normal text-amber-700 border-amber-300 dark:text-amber-400 dark:border-amber-700">
      Contains allergens
    </Badge>
  ) : (product.mayContainAllergens?.length ?? 0) > 0 ? (
    <Badge variant="outline" className="w-fit text-xs font-normal text-muted-foreground">
      May contain allergens
    </Badge>
  ) : null}
</CardContent>
```

**Rules:**
- No `onClick`, no `href`, no tooltip — badge is strictly non-interactive
- `containsAllergens` takes precedence over `mayContainAllergens` — show only one badge
- If neither has data: render nothing (no badge, no empty slot)

---

## 8. Frontend Instructions — Admin

### Step 5 — Modify `neumart/components/admin/product-form.tsx`

This file uses react-hook-form + zod. Make three changes: extend the zod schema, extend the default values, and add the form section.

#### 5A — Extend the zod schema

The zod `schema` currently ends with `isFeatured: z.boolean()`. Add 5 new optional fields after it:

```ts
  isFeatured: z.boolean(),
  ingredients: z.string().optional(),
  containsAllergens: z.array(z.string()).optional(),
  mayContainAllergens: z.array(z.string()).optional(),
  dietaryTags: z.array(z.string()).optional(),
  allergenNotes: z.string().optional(),
```

#### 5B — Extend the default values

In `useForm`, the `defaultValues` object currently ends with `isFeatured: false`. Add defaults for the 5 new fields:

```ts
      isFeatured: false,
      ingredients: "",
      containsAllergens: [],
      mayContainAllergens: [],
      dietaryTags: [],
      allergenNotes: "",
      ...defaultValues,
```

#### 5C — Wire allergen fields to mutations

In the `onSubmit` handler, pass the 5 new fields to both `adminCreate` and `adminUpdate`. Follow the same pattern already used for other optional fields — convert empty string/empty array to `undefined`:

For `adminCreate` and `adminUpdate`, add after `isFeatured`:

```ts
          ingredients: values.ingredients?.trim() || undefined,
          containsAllergens: values.containsAllergens?.length ? values.containsAllergens : undefined,
          mayContainAllergens: values.mayContainAllergens?.length ? values.mayContainAllergens : undefined,
          dietaryTags: values.dietaryTags?.length ? values.dietaryTags : undefined,
          allergenNotes: values.allergenNotes?.trim() || undefined,
```

#### 5D — Add the "Allergen & Ingredient" form section

Add the following section to the form **after the `isFeatured` checkbox block** and **before the submit button row**. Define the two fixed lists as constants at the top of the component function (before `return`):

```ts
  const ALLERGEN_OPTIONS = [
    "Milk", "Peanuts", "Tree nuts", "Wheat", "Gluten",
    "Soy", "Sesame", "Mustard", "Egg", "Fish", "Shellfish", "Sulphites",
  ];

  const DIETARY_TAG_OPTIONS = [
    "Vegetarian", "Vegan", "Jain-friendly", "Organic",
    "No added sugar", "Low fat", "Gluten-free", "Dairy-free", "Nut-free", "Soy-free",
  ];
```

Then add this section to the JSX (after the toggles block, before the button row):

```tsx
        {/* Allergen & Ingredient section */}
        <div className="space-y-4 rounded-lg border p-4">
          <p className="text-sm font-semibold">Allergen &amp; Ingredient Information</p>
          <p className="text-xs text-muted-foreground -mt-2">All fields are optional. Leave blank if information is not available.</p>

          {/* Ingredients */}
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. Wheat flour, sugar, salt, edible vegetable oil"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contains Allergens */}
          <FormField
            control={form.control}
            name="containsAllergens"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contains Allergens</FormLabel>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {ALLERGEN_OPTIONS.map((allergen) => (
                    <label key={allergen} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border"
                        checked={field.value?.includes(allergen) ?? false}
                        onChange={(e) => {
                          const current = field.value ?? [];
                          field.onChange(
                            e.target.checked
                              ? [...current, allergen]
                              : current.filter((v) => v !== allergen)
                          );
                        }}
                      />
                      {allergen}
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* May Contain Allergens */}
          <FormField
            control={form.control}
            name="mayContainAllergens"
            render={({ field }) => (
              <FormItem>
                <FormLabel>May Contain Allergens</FormLabel>
                <FormDescription>Cross-contamination warnings from shared facility or equipment.</FormDescription>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {ALLERGEN_OPTIONS.map((allergen) => (
                    <label key={allergen} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border"
                        checked={field.value?.includes(allergen) ?? false}
                        onChange={(e) => {
                          const current = field.value ?? [];
                          field.onChange(
                            e.target.checked
                              ? [...current, allergen]
                              : current.filter((v) => v !== allergen)
                          );
                        }}
                      />
                      {allergen}
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dietary Tags */}
          <FormField
            control={form.control}
            name="dietaryTags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Tags</FormLabel>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {DIETARY_TAG_OPTIONS.map((tag) => (
                    <label key={tag} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border"
                        checked={field.value?.includes(tag) ?? false}
                        onChange={(e) => {
                          const current = field.value ?? [];
                          field.onChange(
                            e.target.checked
                              ? [...current, tag]
                              : current.filter((v) => v !== tag)
                          );
                        }}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Allergen Notes */}
          <FormField
            control={form.control}
            name="allergenNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allergen Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. Manufactured in a facility that also processes nuts"
                    rows={2}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
```

**Important for edit mode:** The `ProductForm` component receives `defaultValues` as a prop. The parent edit page must pass the allergen fields from the loaded product into `defaultValues`. Check how the edit page (`app/(admin)/admin/products/[id]/edit/page.tsx`) loads the product and passes `defaultValues` to `ProductForm` — add the 5 allergen fields to that prop so they pre-populate on edit. Read that file before making changes.

---

## 9. Data Integrity Rules

| Rule | Requirement |
|---|---|
| No affirmative safety claim | Never render "No allergens", "Allergen-free", or any equivalent — only "Allergen information not available." when data is absent |
| Empty array normalisation | Convert `[]` to `undefined` before calling `adminCreate`/`adminUpdate` — do not persist empty arrays |
| Badge precedence | `containsAllergens` takes precedence on the product card — if both are set, show "Contains allergens" only |
| Section always renders | `AllergenInfoSection` heading always renders on the product detail page — never hidden entirely |
| Fixed list only | No freetext for `containsAllergens`, `mayContainAllergens`, or `dietaryTags` — values must only come from the defined constant arrays |
| Optional fields do not break existing products | All 5 fields are `v.optional` — existing products with no allergen data must load and render without error |

---

## 10. Guardrails

**The developer must NOT do any of the following:**

- Add allergen filtering to the product listing page (`/products`) — that is REQ-0006, Parked
- Add any new Convex queries or HTTP actions
- Modify any existing Convex query (`getActiveProducts`, `getBySlug`, `getProductsByCategory`, etc.)
- Add any new npm packages
- Change the existing form submit flow for non-allergen fields
- Add a tooltip, modal, link, or any interaction to the allergen badge on the product card
- Render "No allergens" or any affirmative safety text under any condition
- Modify `convex/schema.ts` indexes or search indexes
- Change any authentication or route guard logic
- Leave `console.log` or debug statements in the code
- Add the allergen fields to the product listing page (`products/page.tsx`) directly — they are read from the product object in the card component, which receives `Doc<"products">` and automatically has the new fields after schema deploy

---

## 11. Verification Commands

Run all of these after completing all steps. All must pass with zero errors before submitting the completion report.

```bash
# In neumart/ directory:

# TypeScript check — must report 0 errors
pnpm typecheck

# Production build — must complete without errors
pnpm build

# Lint
pnpm lint

# Convex — deploy schema change to get the new fields
npx convex deploy
```

---

## 12. Manual Test Checklist

Complete every item before submitting the completion report.

**Schema and backend:**
- [ ] 1. `npx convex deploy` runs without errors after schema change
- [ ] 2. An existing product can be fetched — all existing fields intact, new fields absent (undefined)

**Admin — Create product:**
- [ ] 3. Navigate to `/admin/products/new` — "Allergen & Ingredient Information" section visible at the bottom of the form
- [ ] 4. Create a product with all allergen fields filled in (Ingredients text, checkboxes selected for Contains/May Contain/Dietary Tags, Notes text) — product saves successfully
- [ ] 5. Create a product with all allergen fields blank — product saves without error
- [ ] 6. Contains Allergens checkboxes: all 12 options visible; multiple can be selected; no freetext input exists
- [ ] 7. Dietary Tags checkboxes: all 10 options visible; multiple can be selected

**Admin — Edit product:**
- [ ] 8. Open edit form for a product with allergen data — all 5 allergen fields pre-populated correctly
- [ ] 9. Open edit form for a product with no allergen data — all allergen fields blank; form loads without error
- [ ] 10. Edit allergen data and save — changes reflected on customer-facing pages
- [ ] 11. Clear all allergen fields on a product that had data; save — customer detail page shows fallback message

**Product card badge (SCR-CUS-0001):**
- [ ] 12. Product with `containsAllergens` set → "Contains allergens" badge visible on card
- [ ] 13. Product with only `mayContainAllergens` set → "May contain allergens" badge visible
- [ ] 14. Product with both `containsAllergens` and `mayContainAllergens` → "Contains allergens" badge only (not two badges)
- [ ] 15. Product with no allergen data → no badge on card, no empty slot
- [ ] 16. Click/tap the allergen badge → nothing happens (no navigation, no modal)
- [ ] 17. Product with only `dietaryTags` (no contains/may contain) → no allergen badge on card

**Product detail section (SCR-CUS-0002):**
- [ ] 18. Product with all 5 allergen fields set → all 5 sub-sections visible with correct values
- [ ] 19. Product with no allergen data → section heading renders + "Allergen information not available." only
- [ ] 20. Product with only `ingredients` set → only "Ingredients" sub-section visible; no Contains/May Contain/Dietary/Notes headers
- [ ] 21. Product with only `dietaryTags` → only "Dietary Information" sub-section with tag chips; no other sub-sections
- [ ] 22. "No allergens" or "Allergen-free" text does not appear anywhere on the page for any product

**Regression:**
- [ ] 23. Product listing page loads and all existing products render correctly
- [ ] 24. Add to cart from product card still works
- [ ] 25. Product detail add-to-cart and favourites still work
- [ ] 26. Admin product create and edit for existing fields still work (name, price, stock, category, etc.)
- [ ] 27. `pnpm typecheck` passes with 0 errors
- [ ] 28. `pnpm build` completes with 0 errors

---

## 13. Completion Response Format

When development is complete, respond with exactly this format:

```
## Implementation Complete

**REQ ID:** REQ-0005
**DEVPLAN ID:** DEVPLAN-0005
**Stories implemented:** US-0015, US-0016, US-0017, US-0018, US-0019

**Files changed:**
- [list every file modified or created — full relative paths from repo root]

**Files NOT changed (from plan):**
- [any planned files skipped, with reason — or "None"]

**Schema changes:**
- products table: ingredients (optional string), containsAllergens (optional string[]),
  mayContainAllergens (optional string[]), dietaryTags (optional string[]),
  allergenNotes (optional string) — all added as v.optional fields

**New Convex functions:** None

**Acceptance criteria verified:**
- US-0015 AC-1: [✅/❌] — [note]
- US-0015 AC-2: [✅/❌] — [note]
- US-0015 AC-3: [✅/❌] — [note]
- US-0015 AC-4: [✅/❌] — [note]
- US-0016 AC-1 through AC-6: [✅/❌ per criterion]
- US-0017 AC-1 through AC-5: [✅/❌ per criterion]
- US-0018 AC-1 through AC-6: [✅/❌ per criterion]
- US-0019 AC-1 through AC-7: [✅/❌ per criterion]

**Verification commands run:**
- `pnpm typecheck`: [pass/fail]
- `pnpm build`: [pass/fail]
- `pnpm lint`: [pass/fail]
- `npx convex deploy`: [pass/fail]

**Manual test checklist:** [items 1–28 — ✅ or ❌ per item]

**Blockers or deviations from plan:** [anything QA should know, or "None"]
```

---

*Last updated: 2026-06-23*
