# IMPACT-0003 — Customer Profile QR Code for Store Identification

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0007 | `04-request-management/requests/REQ-0007.md` |
| Grilling | — | Grilling answers captured directly in REQ-0007.md |
| Evaluation | — | Not required — existing module feature |
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

None. All grilling questions resolved. Schema decisions confirmed. Public data exposure design is clear. No external dependencies beyond `react-qr-code`. Go recommendation is clear with one mandatory security condition.

---

## Next Action

Go decision from Product Owner → create PRD-0004.

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | User Management |
| Sub-module | Profile (new sub-module) |
| Secondary Modules | Admin Console (admin-enhanced QR scan view) |
| Screens Impacted | New SCR-CUS-0011, New SCR-CUS-0012 |
| New Screens Required | Yes — 2 new customer-facing screens |
| Schema Change Required | Yes — 4 new optional fields + 1 new index on `users` table |
| Payment Logic Affected | No |
| Inventory Logic Affected | No |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Impact |
|---|---|---|---|
| SCR-CUS-0011 | Customer Profile | `/account/profile` | New — customer views their name, customerCode, and QR code; can download QR |
| SCR-CUS-0012 | QR Scan Result | `/qr/customer/[qrCodeId]` | New — public page showing limited customer details when QR is scanned; enhanced view for admin |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | Yes | Full grilling answers provided by Product Owner in REQ-0007.md |
| Screenshots / mockups | No | No mockup provided — layout to be determined in PRD |
| Existing workflow / SOP | No | No current workflow — this is a new sub-module |
| Missing references | — | None blocking |
| Assumptions | — | `react-qr-code` package is sufficient for display and SVG-to-PNG download. No Clerk changes needed. |

---

## Business Impact

**Rating:** Medium — Positive

A customer QR code is a light-touch loyalty and identification feature that bridges Nuemart's digital platform with in-store interactions. The primary commercial value:

- Store staff can identify customers instantly without asking for name or phone number.
- Lays the groundwork for loyalty, membership, and wallet features in future phases (Phase 12+).
- Gives each customer a sense of membership identity (customerCode, QR badge).
- The `qrCodeId` architecture (public token, not raw user ID) also future-proofs Nuemart for order QR codes, delivery verification QR codes, and coupon QR codes — all using the same pattern.

No direct revenue impact from MVP alone. Indirect value: customer retention, operational efficiency at point-of-sale or delivery.

---

## Customer Experience Impact

**Rating:** Positive

Customers gain a new My Profile page with:
1. Their name, email, and customer ID (e.g. `CUST-000124`)
2. A scannable QR code representing their customer identity
3. A download button to save the QR as an image

No existing customer flow is disrupted. The profile page is a new additive screen. The account menu gains one new link.

---

## Admin Experience Impact

**Rating:** Positive — Operational gain

When an admin scans a customer QR code:
- They see the customer's name, customerCode, and membership status (public view)
- Plus email/phone (if available), order count, last order, and a link to the admin customer detail page (admin-only view)

Admin gains a fast customer lookup tool — useful for in-store support, order queries, and loyalty application. No changes to existing admin screens or workflows.

---

## Operational Impact

**Rating:** Low

No new SOPs or training required for the QR display and download. Store staff will need a brief introduction on how to use the scan result page to identify customers — but this is a behavioural onboarding, not a technical dependency.

---

## Technical Impact

**Rating:** Low to Medium
**Estimated complexity:** 3–5 engineering days

The implementation involves:
- Schema change (4 optional fields + 1 index on existing `users` table)
- QR code generation logic (2 small mutations: generate on sync + lazy generation for existing users)
- A new public Convex query (limited fields, safe for unauthenticated access)
- An admin-gated query or conditional field reveal on the scan result page
- 2 new Next.js pages
- 1 new component (`QrCodeDisplay.tsx`)
- 1 new npm package (`react-qr-code`)

No new tables. No external API calls. No payment or inventory logic. The main design care point is the public query for the scan result page — it must return only safe fields.

---

## Data / Schema Impact

**Schema change required:** Yes
**Table modified:** `users` (existing — not a new table)
**New tables:** None
**Type of change:** Additive — 4 new optional fields + 1 new index. No existing fields modified or removed.
**Migration / backfill required:** No — all fields are optional. Existing user records are unaffected. QR fields are generated lazily on first profile visit (mutation triggered client-side).
**Deployment:** Convex handles additive schema migrations automatically via `npx convex deploy`.

**New fields on `users` table:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `customerCode` | `v.optional(v.string())` | No | Human-readable customer ID. e.g. `CUST-000124`. Generated once, never changes. |
| `qrCodeId` | `v.optional(v.string())` | No | Unique public-safe token for QR URL. e.g. `nq_8F3K92LPA`. Generated once per user. Used as the URL key for the scan result page. |
| `qrEnabled` | `v.optional(v.boolean())` | No | Defaults to `true` when generated. Allows QR to be disabled per user without deleting the record. |
| `qrCreatedAt` | `v.optional(v.number())` | No | Unix timestamp of QR generation. Audit trail. |

**New index on `users` table:**

```ts
.index("by_qr_code_id", ["qrCodeId"])
```

Required for efficient public lookup of customer by `qrCodeId` on the scan result page. Without this index, every QR scan triggers a full table scan.

**QR code generation strategy:**

- New users: `qrCodeId` and `customerCode` generated inside the existing UserSync mutation (Clerk webhook → Convex), so every new user gets codes automatically.
- Existing users (no `qrCodeId` yet): a `generateQrCode` mutation is called client-side on first visit to `/account/profile`. The mutation is idempotent — if codes already exist, it returns without modifying.

---

## Backend Impact

| Function | Type | Change |
|---|---|---|
| `convex/schema.ts` | Schema | Modify — add 4 optional fields and `by_qr_code_id` index to `users` table |
| `convex/users.ts` — `syncUser` mutation | Mutation | Modify — auto-generate `customerCode` and `qrCodeId` for new users on first sync |
| `convex/users.ts` — `generateQrCode` | Mutation | Create — idempotent mutation for existing users who visit profile page without codes |
| `convex/users.ts` — `getCustomerByQrCode` | Query | Create — public query (no auth required). Looks up user by `qrCodeId`. Returns **only**: `name`, `customerCode`, `qrEnabled`. Does NOT return: email, phone, role, tokenIdentifier, addresses, orders. |
| `convex/users.ts` — `getCustomerByQrCodeAdmin` | Query | Create — authenticated admin-only query. Returns additional fields: `email`, `phone`, plus caller must supply order count separately. Or: single query with ctx.auth check. |

**Design note on the public query:** `getCustomerByQrCode` must never return `email`, `phone`, `role`, `tokenIdentifier`, or any Convex internal ID. It is a public, unauthenticated endpoint accessible to anyone with a valid `qrCodeId`. Field selection must be explicit — do not return the whole document.

---

## Frontend Impact

| File | Type | Change |
|---|---|---|
| `neumart/app/(customer)/account/profile/page.tsx` | Page | Create — new customer profile page (SCR-CUS-0011). Shows name, email, customerCode, QR code. Triggers `generateQrCode` mutation if codes not yet set. |
| `neumart/app/(public)/qr/customer/[qrCodeId]/page.tsx` | Page | Create — new public QR scan result page (SCR-CUS-0012). Public view: name + customerCode. Admin-enhanced view: + email/phone/order count/admin link. |
| `neumart/components/profile/QrCodeDisplay.tsx` | Component | Create — renders QR via `react-qr-code`. Includes download-as-image button (SVG export). |
| Header / account menu component | Component | Modify — add "My Profile" link to customer account dropdown or nav. |
| `package.json` | Config | Modify — add `react-qr-code` dependency. |

---

## Screen Impact

| Screen ID | Screen Name | Change |
|---|---|---|
| SCR-CUS-0011 | Customer Profile | New — `/account/profile`. Authenticated. Shows customer name, email, customerCode, QR code (via QrCodeDisplay), download button. |
| SCR-CUS-0012 | QR Scan Result | New — `/qr/customer/[qrCodeId]`. Public (no auth required). Shows: name, customerCode, membership status. Admin-enhanced: email/phone, order count, admin link. Error states: invalid QR, disabled QR, not found. |

**Screen Registry note:** SCR-CUS-0011 and SCR-CUS-0012 must be registered in `SCREEN_REGISTRY.md` after Go decision.

---

## Role / Permission Impact

| Role | Change |
|---|---|
| Customer | New capability — can view and download their own QR code on `/account/profile`. No new write access beyond generating their own QR code. |
| Admin | New capability — sees enhanced customer detail on the QR scan result page (`/qr/customer/[qrCodeId]`) when logged in as admin. No new admin screens required in MVP. |
| Unauthenticated / Public | New read access — can view the QR scan result page with limited public fields (name, customerCode). This is intentional and scoped. |

No new Clerk metadata changes. No new route guards required beyond what already exists. `/account/profile` sits within the `(customer)` route group, which is already auth-gated.

---

## Payment Impact

**Payment logic affected:** No
**Razorpay API call required:** No
**Webhook change required:** No
**payments table affected:** No
**Notes:** QR code is entirely decoupled from payment. No payment-related code is touched.

---

## Inventory Impact

**Stock reduction timing affected:** No
**stockMovements audit trail affected:** No
**Stock reservation required:** No
**Notes:** QR code is entirely decoupled from inventory.

---

## Reporting Impact

No impact on existing dashboard stats. `customerCode` is a useful future data point for customer-level reporting (e.g. orders per customer, loyalty tier) but no reporting is in scope for this MVP.

---

## Integration Impact

| Integration | Change |
|---|---|
| Razorpay | None |
| Clerk | None — no Clerk metadata changes. `qrCodeId` and `customerCode` live in Convex only. |
| Convex | Schema modification (4 fields + 1 index on users table); 1 mutation modified (syncUser); 2 mutations created; 1–2 queries created. |
| react-qr-code | New npm dependency — client-side QR rendering only. No server-side calls. |

---

## Security / Compliance Impact

**Authentication change:** No
**Authorization change:** Yes — new public query `getCustomerByQrCode` is intentionally unauthenticated
**Sensitive data exposed:** Controlled — see critical note below
**Compliance implication:** Low — no PII beyond name and customerCode on public view

**Critical security condition:**

The `getCustomerByQrCode` query must enforce strict field selection. It must return **only**:
- `name`
- `customerCode`
- `qrEnabled`

It must **never** return:
- `email`
- `phone`
- `role`
- `tokenIdentifier`
- Convex `_id`
- Any address or order data

If the QR is disabled (`qrEnabled === false`), the scan result page must return a "QR disabled" state without revealing any customer data.

The `qrCodeId` is a public token by design — it is safe to include in a URL. However, it must be generated with sufficient entropy (minimum 10 random characters, e.g. nanoid with default alphabet) to prevent enumeration attacks.

---

## QA Impact

**Estimated test scenarios:** 12
**Existing regression tests affected:** Yes — UserSync mutation must be regression-tested to confirm existing user creation flow is unaffected.

**Key test scenarios:**

1. New user signs up → `customerCode` and `qrCodeId` auto-generated in UserSync
2. Existing user visits `/account/profile` for the first time → `generateQrCode` mutation fires; codes generated and displayed
3. Existing user visits `/account/profile` again → `generateQrCode` is idempotent; same codes returned, no duplication
4. QR code renders correctly on profile page via `react-qr-code`
5. Download QR button exports correct image
6. Valid QR scanned → scan result page shows name and customerCode only (public view)
7. Valid QR scanned by admin → scan result page shows enhanced view (email, phone if available, order count, admin link)
8. Invalid `qrCodeId` → "QR code not found" error state
9. `qrEnabled = false` → "QR code has been disabled" error state; no customer data shown
10. Public scan result page does NOT expose email, phone, role, Convex `_id`, or tokenIdentifier
11. `/account/profile` route is auth-gated — unauthenticated user redirected to sign-in
12. `by_qr_code_id` index query resolves correctly on the public endpoint

---

## UAT Impact

**UAT scenarios required:** 4
**Estimated UAT duration:** 20–30 minutes

**Key UAT scenarios:**

1. Register a new customer → navigate to `/account/profile` → verify name, customerCode, and QR code are shown correctly
2. Download the QR code → scan it with a phone → verify it opens the correct scan result page
3. Scan result page (unauthenticated) → verify only name and customerCode are visible; no email, phone, or sensitive data
4. Scan result page (admin logged in) → verify enhanced details are shown

---

## Release Impact

**Environment variables required:** No
**Schema migration required:** Yes — 4 optional fields + 1 index added to `users` table (Convex handles automatically via `npx convex deploy`)
**Deployment window needed:** No — additive-only schema change. No existing user records modified. No data backfill required.
**New npm package:** `react-qr-code` — install before build.
**Post-release data task:** None required. QR codes are generated lazily per user. No admin action needed at release.

---

## Rollback Plan

**Rollback complexity:** Simple

1. Revert `convex/schema.ts` — remove 4 new fields and `by_qr_code_id` index from `users` table.
2. Revert `convex/users.ts` — remove `generateQrCode` mutation, remove QR field generation from `syncUser`, remove `getCustomerByQrCode` and `getCustomerByQrCodeAdmin` queries.
3. Delete `neumart/app/(customer)/account/profile/page.tsx`.
4. Delete `neumart/app/(public)/qr/customer/[qrCodeId]/page.tsx`.
5. Delete `neumart/components/profile/QrCodeDisplay.tsx`.
6. Revert header/nav — remove "My Profile" link.
7. Run `npx convex deploy` — removes schema fields. Any `customerCode` and `qrCodeId` data already written to existing user records will be lost. Since all fields are optional, no existing user record is corrupted, and no order, payment, or inventory data is affected.

**Risk of rollback:** Low. QR fields are optional on the users table. A rollback cannot corrupt order, payment, inventory, or auth data.

---

## Risk Score

| Dimension | Score (1–10) | Rationale |
|---|---|---|
| Technical complexity | 3 | 4 optional fields on existing table. 2 new pages. 1 new component. 2 new queries. Moderate but contained. |
| Schema change risk | 2 | Additive-only. Optional fields. No backfill. Convex-managed migration. |
| Payment integrity risk | 1 | Not touched whatsoever. |
| Inventory integrity risk | 1 | Not touched whatsoever. |
| Security / data exposure risk | 4 | The public `getCustomerByQrCode` query is the primary risk point. Must enforce strict field selection — if misconfigured, it could expose email or phone. Mitigated by explicit field allow-list in query implementation and QA test case 10. |
| User experience risk | 2 | Two new additive screens. No existing flow disrupted. |
| Rollback difficulty | 2 | Optional fields only. No cascading effects. Clean revert. |
| **Overall Risk Score** | **2.1 / 10** | Low risk. The only non-trivial concern is the public query field selection, which is fully preventable by design rule. |

---

## Go / No-Go / Split Recommendation

**Recommendation: Go**

**Reasoning:** Risk score of 2.1/10. The schema change is additive-only with optional fields and no backfill. No payment, inventory, Razorpay, or Clerk changes required. The two new screens are independent of all existing flows. The only meaningful risk is the public `getCustomerByQrCode` query, and that risk is fully addressed by a mandatory field allow-list rule in the PRD.

**One mandatory PRD condition:**

The `getCustomerByQrCode` Convex query must use an **explicit field allow-list** — it may only return `name`, `customerCode`, and `qrEnabled`. It must never return `email`, `phone`, `role`, `tokenIdentifier`, or any Convex internal ID. This must be enforced in the query implementation, not relied on at the page layer.

**What is included in MVP:**
- 4 new optional fields on users table + `by_qr_code_id` index
- Auto-generation of `customerCode` and `qrCodeId` in UserSync (new users)
- Lazy `generateQrCode` mutation for existing users (triggered on first profile visit)
- Customer Profile page (`/account/profile`) — auth-gated
- QR Scan Result page (`/qr/customer/[qrCodeId]`) — public, limited fields
- Admin-enhanced scan result view (conditional on admin role)
- QR download as image
- `react-qr-code` package

**What is deferred (not MVP):**
- Rotating / time-limited QR codes
- WhatsApp sharing
- Apple / Google Wallet integration
- Print member card
- Order QR / delivery QR / coupon QR
- QR scan history / analytics
- Loyalty points display on scan result

---

*Last updated: 2026-06-23*
