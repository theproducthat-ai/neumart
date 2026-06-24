# DEVPLAN-0006 — Customer Profile QR Code for Store Identification

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0007 | `04-request-management/requests/REQ-0007.md` |
| PRD | PRD-0004 | `07-prd/approved-prds/PRD-0004.md` |
| User Stories | US-0020, US-0021, US-0022, US-0023 | `08-user-stories/stories/` |
| Impact Assessment | IMPACT-0003 | `06-assessment-and-impact/assessments/IMPACT-0003.md` |
| QA | — | *(populated after QA is run)* |
| Coding Prompt | DEVPLAN-0006-coding-prompt.md | `09-development-planning/plans/DEVPLAN-0006-coding-prompt.md` |

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

Execute `DEVPLAN-0006-coding-prompt.md` to start development. Install `react-qr-code` before beginning frontend work.

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | User Management |
| Sub-module | Profile |
| Secondary Modules | Admin Console (admin-enhanced QR scan view) |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Change |
|---|---|---|---|
| SCR-CUS-0011 | Customer Profile | `/account/profile` | New |
| SCR-CUS-0012 | QR Scan Result | `/qr/customer/[qrCodeId]` | New |
| — | Customer Header | *(component)* | Modified — "My QR Code" link added |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | Yes | PRD-0004, IMPACT-0003, REQ-0007, all 4 user stories |
| Screenshots provided | No | No mockup — layout described in PRD screen specs |
| Assumptions | — | `crypto.randomUUID()` is used for `qrCodeId` generation (available in Convex V8 runtime). User count-based approach used for `customerCode` sequential numbering. `react-qr-code` renders QR as SVG — download uses SVG serialisation to data URI. QR scan page placed at `app/qr/customer/[qrCodeId]/page.tsx` (root level — no auth group). |

---

## Objective

Add a permanent customer QR code to Nuemart. Each customer gets a unique, public-safe `qrCodeId` and human-readable `customerCode` (e.g. `CUST-000124`). The QR code lives on a new "My Customer QR Code" profile page and encodes a URL that opens a lightweight scan result page showing the customer's name and ID. Store staff can view enhanced details when signed in as admin.

---

## Current App Context

- `convex/schema.ts`: `users` table exists with fields: `tokenIdentifier`, `email`, `name`, `phone`, `role`, `createdAt`. No QR fields. One index: `by_tokenIdentifier`.
- `convex/helpers.ts`: `getOrCreateUser` creates a new user record on first sign-in. This is the correct hook point for new-user QR generation.
- `convex/users.ts`: Has `getCurrentUser`, `ensureCurrentUser`, `bootstrapAdmin`, `updateProfile`. New mutations and queries will be added here.
- `components/providers/user-sync.tsx`: Calls `ensureCurrentUser` on every sign-in. This triggers `getOrCreateUser`, which is where new-user QR generation is added.
- `components/layout/customer-header.tsx`: Renders nav icons + mobile dropdown for signed-in customer. "My QR Code" link added here.
- App directory: `app/(customer)/` is auth-gated. `app/qr/` does not exist yet — new public route placed here.
- `react-qr-code` is not yet installed.

---

## Pre-requisite

Install `react-qr-code` before frontend work:

```bash
pnpm add react-qr-code
```

---

## Implementation Order

The four phases must be executed in sequence. US-0020 (backend) must be complete before any frontend work.

```
Phase 1 — Schema + backend (US-0020)
Phase 2 — Customer profile page + QrCodeDisplay component + header link (US-0021)
Phase 3 — Public QR scan result page + public query (US-0022)
Phase 4 — Admin-enhanced scan view + admin query (US-0023)
```

---

## Files Likely Impacted

### Convex Backend

| File | Change Type | Description |
|---|---|---|
| `neumart/convex/schema.ts` | Modify | Add 4 optional fields + `by_qr_code_id` index to `users` table |
| `neumart/convex/helpers.ts` | Modify | Add QR field generation inside `getOrCreateUser` on new user insert |
| `neumart/convex/users.ts` | Modify | Add `generateQrCode` mutation, `getCustomerByQrCode` query, `getCustomerByQrCodeAdmin` query |

### Next.js Frontend

| File | Change Type | Description |
|---|---|---|
| `neumart/app/(customer)/account/profile/page.tsx` | Create | New auth-gated customer profile page (SCR-CUS-0011) |
| `neumart/app/qr/customer/[qrCodeId]/page.tsx` | Create | New public QR scan result page (SCR-CUS-0012) |
| `neumart/components/profile/QrCodeDisplay.tsx` | Create | QR code display + download component |
| `neumart/components/layout/customer-header.tsx` | Modify | Add "My QR Code" link to desktop nav and mobile dropdown |

### Package

| File | Change Type | Description |
|---|---|---|
| `neumart/package.json` | Modify | Add `react-qr-code` dependency |

---

## Backend Changes (Convex)

### Phase 1 — Schema changes (`convex/schema.ts`)

Add to the `users` table definition:

```ts
customerCode: v.optional(v.string()),   // e.g. "CUST-000124"
qrCodeId: v.optional(v.string()),       // e.g. UUID — public URL token
qrEnabled: v.optional(v.boolean()),     // true when set; false = disabled
qrCreatedAt: v.optional(v.number()),    // Unix timestamp
```

Add index after existing `by_tokenIdentifier`:

```ts
.index("by_qr_code_id", ["qrCodeId"])
```

### Phase 1 — `getOrCreateUser` change (`convex/helpers.ts`)

In the `ctx.db.insert("users", {...})` block, add QR field generation for new users:

```ts
// Get count of existing users to derive sequential customerCode
const userCount = await ctx.db.query("users").collect();
const seq = String(userCount.length + 1).padStart(6, "0");
const customerCode = `CUST-${seq}`;
const qrCodeId = crypto.randomUUID();

const id = await ctx.db.insert("users", {
  tokenIdentifier: identity.tokenIdentifier,
  email: identity.email ?? "",
  name: identity.name,
  createdAt: Date.now(),
  customerCode,
  qrCodeId,
  qrEnabled: true,
  qrCreatedAt: Date.now(),
});
```

**Note on `customerCode` generation:** Using user count + 1 is appropriate for early-stage usage. For scale, a dedicated counter table would be more robust — this is noted as a future improvement. Collision risk for this approach is negligible at low user volumes.

**Note on `qrCodeId`:** `crypto.randomUUID()` is available in Convex's V8 runtime. It returns a 36-char UUID (e.g. `a8098c1a-f86e-11da-bd1a-00112444be1e`). This is URL-safe and has sufficient entropy for this use case.

### Phase 1 — New mutations and queries (`convex/users.ts`)

#### `generateQrCode` mutation (for existing users)

```ts
export const generateQrCode = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx);  // from helpers.ts — throws if unauth
    // Idempotency: do nothing if QR already exists
    if (user.qrCodeId && user.customerCode) return;

    const userCount = await ctx.db.query("users").collect();
    const seq = String(userCount.length).padStart(6, "0");
    const customerCode = `CUST-${seq}`;
    const qrCodeId = crypto.randomUUID();

    await ctx.db.patch(user._id, {
      customerCode,
      qrCodeId,
      qrEnabled: true,
      qrCreatedAt: Date.now(),
    });
  },
});
```

#### `getCustomerByQrCode` query (public — no auth)

```ts
export const getCustomerByQrCode = query({
  args: { qrCodeId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_qr_code_id", (q) => q.eq("qrCodeId", args.qrCodeId))
      .unique();

    if (!user) return null;

    // CRITICAL: explicit field allow-list — never return email, phone, role, tokenIdentifier, _id
    return {
      name: user.name ?? null,
      customerCode: user.customerCode ?? null,
      qrEnabled: user.qrEnabled ?? true,
    };
  },
});
```

#### `getCustomerByQrCodeAdmin` query (admin-authenticated)

```ts
export const getCustomerByQrCodeAdmin = query({
  args: { qrCodeId: v.string() },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);  // from helpers.ts — throws if not admin

    const user = await ctx.db
      .query("users")
      .withIndex("by_qr_code_id", (q) => q.eq("qrCodeId", args.qrCodeId))
      .unique();

    if (!user) return null;

    // Count orders for this user
    const orders = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();

    const lastOrder = orders.sort((a, b) => b.createdAt - a.createdAt)[0];

    return {
      name: user.name ?? null,
      customerCode: user.customerCode ?? null,
      qrEnabled: user.qrEnabled ?? true,
      email: user.email ?? null,
      phone: user.phone ?? null,
      orderCount: orders.length,
      lastOrderDate: lastOrder?.createdAt ?? null,
      userId: user._id,
    };
  },
});
```

---

## Frontend Changes (Next.js)

### Phase 2 — `QrCodeDisplay` component

**Path:** `neumart/components/profile/QrCodeDisplay.tsx`

Client component. Props: `qrCodeId: string`, `customerCode: string`.

- Renders `<QRCode>` from `react-qr-code` with value `https://{host}/qr/customer/{qrCodeId}`
- The host is derived from `window.location.origin` on the client (or hardcoded as `https://neumart.com` for production)
- "Download QR" button: gets the SVG element by ref, serialises to a Blob, creates an object URL, triggers an `<a>` download

```tsx
"use client";
import QRCode from "react-qr-code";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function QrCodeDisplay({ qrCodeId, customerCode }: { qrCodeId: string; customerCode: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  function handleDownload() {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nuemart-qr-${customerCode}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const qrUrl = `${typeof window !== "undefined" ? window.location.origin : "https://neumart.com"}/qr/customer/${qrCodeId}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCode ref={svgRef} value={qrUrl} size={200} />
      <Button variant="outline" onClick={handleDownload}>Download QR</Button>
    </div>
  );
}
```

### Phase 2 — Customer Profile page

**Path:** `neumart/app/(customer)/account/profile/page.tsx`

Server component wrapper; inner content uses client-side Convex hooks.

- Fetches current user via `getCurrentUser`
- If `qrCodeId` is absent, calls `generateQrCode` mutation on mount
- Renders: page heading "My Customer QR Code", name, email, "Customer ID: {customerCode}", `<QrCodeDisplay />`
- Shows loading skeleton while generating
- `(customer)` route group auth guard handles unauthenticated redirect — no additional auth code needed

### Phase 2 — Customer header update

**Path:** `neumart/components/layout/customer-header.tsx`

Add to the desktop nav (alongside existing addresses/orders icons, visible when `isSignedIn`):

```tsx
import { QrCode } from "lucide-react";
// ...
{isSignedIn && (
  <Button variant="ghost" size="icon" asChild
    className={cn("hidden sm:inline-flex", isActive("/account/profile") && "bg-accent text-accent-foreground")}>
    <Link href="/account/profile" aria-label="My QR Code">
      <QrCode className="h-5 w-5" />
    </Link>
  </Button>
)}
```

Add to the mobile dropdown menu (alongside existing addresses/orders items):

```tsx
<DropdownMenuItem asChild>
  <Link href="/account/profile" className="flex items-center gap-2">
    <QrCode className="h-4 w-4" />
    My QR Code
  </Link>
</DropdownMenuItem>
```

### Phase 3 — Public QR Scan Result page

**Path:** `neumart/app/qr/customer/[qrCodeId]/page.tsx`

Placed at the root app level — NOT inside `(customer)` or `(admin)` route group. No auth guard.

- Server component (or client component with `useQuery`)
- Fetches `getCustomerByQrCode` with the URL `qrCodeId` param
- If result is `null` → renders "QR code not found."
- If `qrEnabled === false` → renders "This QR code has been disabled." (no customer data)
- Otherwise → renders public view: "Nuemart Customer" label, customer name, "Customer ID: {customerCode}"

### Phase 4 — Admin-enhanced scan view

The same `app/qr/customer/[qrCodeId]/page.tsx` is extended with a client component that:
- Calls `getCustomerByQrCodeAdmin` (authenticated Convex query)
- If the viewer is admin and the query succeeds, renders additional fields below the public view:
  - Email (if set)
  - Phone (if set)
  - Order count
  - Last order date
  - "View in Admin" link → `/admin/orders`
- If the viewer is not admin or not signed in, the admin section is not rendered (query throws, caught silently)

**Implementation pattern:** Use two separate `useQuery` calls on the page. Public data always renders. Admin data renders only if the admin query returns a non-null result (it returns null for non-admins due to the `assertAdmin` guard throwing).

Actually: Convex queries that throw on the server will surface as an error in `useQuery`. A better pattern: check Clerk's `useUser()` on the client to gate whether to even call `getCustomerByQrCodeAdmin`. Only call it if `user.publicMetadata.role === "admin"`. This avoids an unnecessary 401 error in non-admin sessions.

---

## Schema Changes

| Table | Change | Field | Type | Notes |
|---|---|---|---|---|
| `users` | Add field | `customerCode` | `v.optional(v.string())` | e.g. `CUST-000124`. Generated on user creation. |
| `users` | Add field | `qrCodeId` | `v.optional(v.string())` | UUID token. Generated on user creation. |
| `users` | Add field | `qrEnabled` | `v.optional(v.boolean())` | `true` when generated. |
| `users` | Add field | `qrCreatedAt` | `v.optional(v.number())` | Unix timestamp. |
| `users` | Add index | `by_qr_code_id` | `["qrCodeId"]` | Required for efficient public lookup. |

---

## Screen Impact

| Screen ID | Screen Name | Change |
|---|---|---|
| SCR-CUS-0011 | Customer Profile | New page at `/account/profile` |
| SCR-CUS-0012 | QR Scan Result | New public page at `/qr/customer/[qrCodeId]` |
| — | Customer Header | "My QR Code" link + QrCode icon added |

---

## Testing Plan

### Manual Test Scenarios

| # | Scenario | Steps | Expected Result |
|---|---|---|---|
| 1 | New user gets QR auto-generated | 1. Create a new Clerk test account. 2. Sign in. 3. Navigate to `/account/profile`. | Profile page shows name, email, customerCode (CUST-NNNNNN), and a rendered QR code. |
| 2 | Existing user — first profile visit | 1. Use a user with no `qrCodeId`. 2. Navigate to `/account/profile`. | Loading state shown briefly, then QR code appears. |
| 3 | QR is idempotent | 1. Visit profile page. Note qrCodeId. 2. Visit again. | Same QR code shown — no regeneration. |
| 4 | QR encodes correct URL | 1. Load profile page. 2. Scan QR with phone. | Browser opens `/qr/customer/{qrCodeId}` for that user. |
| 5 | Download QR | 1. Load profile page. 2. Click "Download QR". | SVG file saved to device. |
| 6 | Auth guard | 1. Sign out. 2. Visit `/account/profile`. | Redirected to sign-in. |
| 7 | "My QR Code" nav link | 1. Sign in. 2. Check desktop nav and mobile dropdown. | "My QR Code" link present in both. |
| 8 | Public scan page — valid QR | 1. Get a test user's qrCodeId. 2. Open `/qr/customer/{qrCodeId}` while signed out. | Shows "Nuemart Customer", name, "Customer ID: CUST-NNNNNN". No email or phone visible. |
| 9 | Public scan page — invalid QR | 1. Open `/qr/customer/invalid-code`. | Shows "QR code not found." |
| 10 | Public scan page — disabled QR | 1. Patch `qrEnabled: false` on test user via Convex dashboard. 2. Open their QR URL. | Shows "This QR code has been disabled." — no customer data. |
| 11 | Admin enhanced view | 1. Sign in as admin. 2. Open a valid QR scan URL. | Enhanced view shows email, phone (if set), order count, last order, "View in Admin" link. |
| 12 | Non-admin sees public view only | 1. Sign in as regular customer. 2. Open any QR scan URL. | Public view only — no enhanced fields. |
| 13 | Network response check | 1. Open browser devtools → Network. 2. Load a public scan page. 3. Inspect the Convex `getCustomerByQrCode` response. | Response contains only `name`, `customerCode`, `qrEnabled`. No email/phone/role/_id. |

### Regression Areas to Check

- [ ] Existing user sign-in flow — `ensureCurrentUser` / `getOrCreateUser` must still work correctly for users who already have records
- [ ] Admin sign-in and route guard — `bootstrapAdmin` and admin layout must not be affected by schema changes
- [ ] Product listing, cart, checkout, orders — no impact expected; confirm pages load without error
- [ ] Addresses flow — no impact expected; confirm
- [ ] `pnpm build` passes with no TypeScript errors after schema addition

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `getCustomerByQrCode` accidentally returns sensitive fields | Low | High | Explicit field allow-list in query handler. QA test case 13 specifically checks network response. |
| `customerCode` collision on concurrent sign-ups | Very Low | Low | User count approach is safe at low volumes. Two simultaneous signups at exactly the same user count could produce a duplicate `customerCode` — acceptable risk for early stage; add uniqueness check if needed at scale. |
| `react-qr-code` SSR hydration mismatch | Low | Medium | `QrCodeDisplay` is a `"use client"` component — no SSR rendering of the QR SVG. |
| `crypto.randomUUID()` not available in Convex runtime | Very Low | High | Confirmed available in Convex V8 runtime. If unavailable, fall back to `Math.random()`-based UUID generation. |
| `getOrCreateUser` change breaks existing user creation | Low | High | Change is purely additive — new fields only added during insert. Existing users returned unchanged. Test case 1 and regression area 1 cover this. |

---

## Rollback Plan

1. Revert `convex/schema.ts` — remove the 4 new optional fields and `by_qr_code_id` index from the `users` table definition.
2. Revert `convex/helpers.ts` — remove QR field generation from `getOrCreateUser`.
3. Revert `convex/users.ts` — remove `generateQrCode`, `getCustomerByQrCode`, `getCustomerByQrCodeAdmin`.
4. Delete `neumart/app/(customer)/account/profile/page.tsx` and its directory.
5. Delete `neumart/app/qr/` directory and all contents.
6. Delete `neumart/components/profile/QrCodeDisplay.tsx`.
7. Revert `neumart/components/layout/customer-header.tsx` — remove "My QR Code" link and `QrCode` import.
8. Run `pnpm remove react-qr-code` to remove the package.
9. Run `npx convex deploy` — Convex removes the schema fields. Any `customerCode`/`qrCodeId` data already written to existing users will be lost. All fields are optional so no existing records are corrupted and no other tables are affected.

**Risk of rollback:** Low. No payment, inventory, or order data is touched by this feature.

---

## Definition of Done

- [ ] All 4 user stories (US-0020, US-0021, US-0022, US-0023) acceptance criteria verified manually
- [ ] `react-qr-code` installed — `pnpm add react-qr-code`
- [ ] Schema deployed — `npx convex deploy` runs without error
- [ ] New user sign-up auto-generates `customerCode` and `qrCodeId`
- [ ] Existing user profile visit triggers lazy `generateQrCode` if fields absent
- [ ] Profile page (`/account/profile`) renders correctly — name, email, customerCode, QR code
- [ ] QR download saves SVG file to device
- [ ] "My QR Code" link present in desktop nav and mobile dropdown
- [ ] Public scan page (`/qr/customer/[qrCodeId]`) loads without auth
- [ ] Public scan page shows "Nuemart Customer", name, Customer ID only — no sensitive data in network response
- [ ] Error states: "QR code not found." and "This QR code has been disabled." work correctly
- [ ] Admin-enhanced view shows additional fields only when signed in as admin
- [ ] `npx tsc --noEmit` — no TypeScript errors
- [ ] `pnpm build` — app builds without error
- [ ] Regression check complete — existing flows unaffected
- [ ] Ready for QA

---

## QA Checklist (for QA sign-off)

| # | Check | Pass / Fail |
|---|---|---|
| QA-1 | New user QR auto-generation | — |
| QA-2 | Existing user lazy generation | — |
| QA-3 | QR idempotency | — |
| QA-4 | QR scans to correct URL | — |
| QA-5 | Download QR works | — |
| QA-6 | Auth guard on profile page | — |
| QA-7 | Nav link visible | — |
| QA-8 | Public scan page — valid QR | — |
| QA-9 | Public scan page — invalid QR | — |
| QA-10 | Public scan page — disabled QR | — |
| QA-11 | Admin enhanced view | — |
| QA-12 | Non-admin public view only | — |
| QA-13 | Network response — no sensitive fields | — |
| QA-14 | TypeScript clean | — |
| QA-15 | Build clean | — |

---

*Last updated: 2026-06-23*
