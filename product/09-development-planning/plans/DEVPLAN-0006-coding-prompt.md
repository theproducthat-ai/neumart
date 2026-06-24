# DEVPLAN-0006 — Coding Prompt: Customer Profile QR Code for Store Identification

---

## 1. Context

You are building a **Customer Profile QR Code** feature for the Nuemart grocery platform.

**Stack:** Next.js (App Router) + Convex (backend/DB) + Clerk (auth) + Tailwind + shadcn/ui.

**What exists today:**
- `convex/schema.ts` — `users` table has: `tokenIdentifier`, `email`, `name` (optional), `phone` (optional), `role` (optional), `createdAt`. One index: `by_tokenIdentifier`.
- `convex/helpers.ts` — `getOrCreateUser` creates a new user record on first sign-in. This is called by `ensureCurrentUser` mutation (users.ts), which is called by the `UserSync` component in the customer layout.
- `convex/users.ts` — has: `getCurrentUser`, `ensureCurrentUser`, `bootstrapAdmin`, `updateProfile`.
- `components/layout/customer-header.tsx` — renders the top nav with icons for Favourites, Addresses, Orders, Cart. Also has a mobile dropdown menu. No QR link exists yet.
- `app/(customer)/` — auth-gated route group for all customer pages.
- `app/(admin)/` — admin-gated route group.
- No profile page exists. No QR-related routes exist.

**What you are building:**
Each customer gets a permanent, unique `qrCodeId` (public URL token) and `customerCode` (human-readable ID like `CUST-000124`). These are stored on the `users` table. The customer sees their QR code on a new "My Customer QR Code" profile page. When scanned, the QR opens a public page showing limited customer identity details. Admins see enhanced details on the same page.

**Reference:** REQ-0007 / PRD-0004 / DEVPLAN-0006.

---

## 2. Scope

Implement exactly the following — nothing more:

**Backend (Convex)**
- Add 4 optional fields + 1 index to `users` table in `schema.ts`
- Update `getOrCreateUser` in `helpers.ts` to auto-generate QR fields when a new user is inserted
- Add `generateQrCode` mutation to `users.ts` (idempotent — for existing users)
- Add `getCustomerByQrCode` query to `users.ts` (public — no auth, explicit field allow-list)
- Add `getCustomerByQrCodeAdmin` query to `users.ts` (admin-authenticated, returns extended fields)

**Frontend — Customer Profile (SCR-CUS-0011)**
- New page: `app/(customer)/account/profile/page.tsx`
- New component: `components/profile/QrCodeDisplay.tsx` (renders QR + download button)
- Modify: `components/layout/customer-header.tsx` — add "My QR Code" link with QrCode icon

**Frontend — QR Scan Result (SCR-CUS-0012)**
- New page: `app/qr/customer/[qrCodeId]/page.tsx` (public — root level, NOT inside any auth route group)
- Admin-enhanced view on the same page (conditional on Clerk admin role)

**Package**
- Install `react-qr-code`: run `pnpm add react-qr-code`

---

## 3. Out of Scope

Do NOT build any of the following in this session:

- Rotating or time-limited QR codes
- QR code regeneration by the customer
- Admin UI to disable a customer's QR
- WhatsApp sharing or any social share functionality
- Apple Wallet / Google Wallet integration
- Loyalty points, tiers, or membership features
- Order QR codes, delivery QR codes, or coupon QR codes
- QR scan history or analytics
- Any changes to the checkout, cart, orders, or payment flows
- Any changes to the admin product, category, order, or inventory screens
- Any new Convex tables — QR fields go on the existing `users` table only
- Any changes to Clerk metadata or the auth flow
- Any new environment variables

---

## 4. Linked IDs

| Type | ID |
|---|---|
| Request | REQ-0007 |
| PRD | PRD-0004 |
| DEVPLAN | DEVPLAN-0006 |
| User Stories | US-0020, US-0021, US-0022, US-0023 |
| Impact Assessment | IMPACT-0003 |

---

## 5. Screen IDs

| Screen ID | Screen Name | Route | Change |
|---|---|---|---|
| SCR-CUS-0011 | Customer Profile | `/account/profile` | New |
| SCR-CUS-0012 | QR Scan Result | `/qr/customer/[qrCodeId]` | New |

---

## 6. Files Likely Impacted

**Convex backend:**
- `neumart/convex/schema.ts` — modify (add fields + index to users table)
- `neumart/convex/helpers.ts` — modify (QR generation in `getOrCreateUser`)
- `neumart/convex/users.ts` — modify (3 new functions)

**Next.js pages:**
- `neumart/app/(customer)/account/profile/page.tsx` — create
- `neumart/app/qr/customer/[qrCodeId]/page.tsx` — create

**Next.js components:**
- `neumart/components/profile/QrCodeDisplay.tsx` — create
- `neumart/components/layout/customer-header.tsx` — modify

**Package:**
- `neumart/package.json` — modified by `pnpm add react-qr-code`

---

## 7. Backend Instructions

### Step 7.1 — Install package first

```bash
cd neumart
pnpm add react-qr-code
```

### Step 7.2 — Schema changes (`convex/schema.ts`)

Add 4 optional fields to the `users` table definition, and add a second index:

```ts
users: defineTable({
  tokenIdentifier: v.string(),
  email: v.string(),
  name: v.optional(v.string()),
  phone: v.optional(v.string()),
  role: v.optional(v.string()),
  createdAt: v.number(),
  // QR Code fields (added for REQ-0007)
  customerCode: v.optional(v.string()),
  qrCodeId: v.optional(v.string()),
  qrEnabled: v.optional(v.boolean()),
  qrCreatedAt: v.optional(v.number()),
})
  .index("by_tokenIdentifier", ["tokenIdentifier"])
  .index("by_qr_code_id", ["qrCodeId"]),
```

All 4 new fields are optional. No existing fields are modified or removed.

### Step 7.3 — Update `getOrCreateUser` (`convex/helpers.ts`)

In the `ctx.db.insert("users", {...})` block (the branch where the user does NOT already exist), add QR field generation:

```ts
// Generate sequential customerCode from current user count
const allUsers = await ctx.db.query("users").collect();
const seq = String(allUsers.length + 1).padStart(6, "0");
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

Do NOT modify the `if (existing !== null) return existing;` branch. Existing users are returned unchanged — they receive their QR codes lazily via the `generateQrCode` mutation.

### Step 7.4 — Add `generateQrCode` mutation (`convex/users.ts`)

Idempotent mutation for existing users who visit the profile page without QR fields.

```ts
export const generateQrCode = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx);
    // Idempotency guard — do nothing if QR already exists
    if (user.qrCodeId && user.customerCode) return;

    const allUsers = await ctx.db.query("users").collect();
    const seq = String(allUsers.length).padStart(6, "0");
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

### Step 7.5 — Add `getCustomerByQrCode` query (`convex/users.ts`)

Public query — no auth check. Returns ONLY 3 safe fields. This endpoint is callable by anyone.

```ts
export const getCustomerByQrCode = query({
  args: { qrCodeId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_qr_code_id", (q) => q.eq("qrCodeId", args.qrCodeId))
      .unique();

    if (!user) return null;

    // SECURITY: explicit allow-list — never return email, phone, role,
    // tokenIdentifier, _id, or any other field
    return {
      name: user.name ?? null,
      customerCode: user.customerCode ?? null,
      qrEnabled: user.qrEnabled ?? true,
    };
  },
});
```

### Step 7.6 — Add `getCustomerByQrCodeAdmin` query (`convex/users.ts`)

Admin-authenticated query for the enhanced scan view.

```ts
export const getCustomerByQrCodeAdmin = query({
  args: { qrCodeId: v.string() },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_qr_code_id", (q) => q.eq("qrCodeId", args.qrCodeId))
      .unique();

    if (!user) return null;

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

## 8. Frontend Instructions (Customer)

### Step 8.1 — `QrCodeDisplay` component

Create `neumart/components/profile/QrCodeDisplay.tsx`:

```tsx
"use client";

import { useRef } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";

interface QrCodeDisplayProps {
  qrCodeId: string;
  customerCode: string;
}

export function QrCodeDisplay({ qrCodeId, customerCode }: QrCodeDisplayProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const qrUrl = `${typeof window !== "undefined" ? window.location.origin : "https://neumart.com"}/qr/customer/${qrCodeId}`;

  function handleDownload() {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nuemart-qr-${customerCode}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-lg border bg-white p-4">
        <QRCode
          ref={svgRef}
          value={qrUrl}
          size={200}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      </div>
      <Button variant="outline" size="sm" onClick={handleDownload}>
        Download QR
      </Button>
    </div>
  );
}
```

### Step 8.2 — Customer Profile page (SCR-CUS-0011)

Create `neumart/app/(customer)/account/profile/page.tsx`:

- This page is inside the `(customer)` route group, so it is automatically auth-gated — no additional auth code needed.
- Use `useQuery(api.users.getCurrentUser)` to get the current user.
- If `qrCodeId` is absent on the user record, call `useMutation(api.users.generateQrCode)` in a `useEffect` on mount.
- Show a loading skeleton while the user record is loading.
- Show a "Generating your QR code..." message (with a spinner or subtle text) while `generateQrCode` is in-flight.
- Once `qrCodeId` is available, render `<QrCodeDisplay>`.

**Page content layout (top to bottom):**
1. Page heading: `"My Customer QR Code"` (h1 or equivalent)
2. Customer name
3. Customer email
4. Customer ID row: label `"Customer ID"` + value `customerCode` (e.g. `CUST-000124`)
5. `<QrCodeDisplay qrCodeId={user.qrCodeId} customerCode={user.customerCode} />`

Use a centered card layout consistent with the rest of the app (max-w-sm or max-w-md, mx-auto, padding). Mobile-first.

### Step 8.3 — "My QR Code" link in customer header

Modify `neumart/components/layout/customer-header.tsx`:

1. Add `QrCode` to the lucide-react imports:
   ```tsx
   import { Heart, MapPin, ShoppingCart, Search, ClipboardList, Menu, Store, QrCode } from "lucide-react";
   ```

2. Add desktop nav icon (alongside the existing addresses/orders icons, visible only when `isSignedIn`):
   ```tsx
   {isSignedIn && (
     <Button
       variant="ghost"
       size="icon"
       asChild
       className={cn(
         "hidden sm:inline-flex",
         isActive("/account/profile") && "bg-accent text-accent-foreground"
       )}
     >
       <Link href="/account/profile" aria-label="My QR Code">
         <QrCode className="h-5 w-5" />
       </Link>
     </Button>
   )}
   ```

3. Add mobile dropdown item (inside the `{isSignedIn && (...)}` block in the mobile dropdown, alongside addresses/orders):
   ```tsx
   <DropdownMenuItem asChild>
     <Link href="/account/profile" className="flex items-center gap-2">
       <QrCode className="h-4 w-4" />
       My QR Code
     </Link>
   </DropdownMenuItem>
   ```

---

## 9. Frontend Instructions (Admin — QR Scan View)

### Step 9.1 — Public QR Scan Result page (SCR-CUS-0012)

Create `neumart/app/qr/customer/[qrCodeId]/page.tsx`.

**Critical:** Place this at the ROOT of the `app/` directory — NOT inside `(customer)` or `(admin)`. It must be publicly accessible without any authentication.

This page has two layers rendered on the same screen:

**Layer 1 — Public data (always rendered)**

Use `useQuery(api.users.getCustomerByQrCode, { qrCodeId })` where `qrCodeId` comes from `params.qrCodeId`.

- If loading: show a skeleton/loading state
- If result is `null`: render error card → `"QR code not found."`
- If `result.qrEnabled === false`: render error card → `"This QR code has been disabled."` — show NO customer data
- Otherwise render:
  - Label: `"Nuemart Customer"` (prominent, badge-style or heading)
  - Customer name
  - `"Customer ID: {customerCode}"`

**Layer 2 — Admin-enhanced data (conditional)**

Use `useUser()` from Clerk to check if `user?.publicMetadata?.role === "admin"`.

- Only call `useQuery(api.users.getCustomerByQrCodeAdmin, { qrCodeId })` if the Clerk user has admin role.
- If admin data is returned, render below the public section:
  - Email (if not null)
  - Phone (if not null)
  - `"Orders: {orderCount}"`
  - `"Last order: {formatted date}"` (if `lastOrderDate` is not null — format as human-readable date)
  - Link button: `"View in Admin"` → href `/admin/orders`
- If not admin, render nothing for this layer.

**Important:** The admin query (`getCustomerByQrCodeAdmin`) will throw a `ConvexError("Forbidden")` if called by a non-admin. Gate the call client-side using the Clerk role check to avoid the error. Do not call the admin query unless you have confirmed the Clerk admin role first.

**Page layout:** Centered card, max-w-sm, mobile-first. Consistent with the rest of the app. Include a small Nuemart logo or app name at the top so the page is recognisable when scanned.

---

## 10. Data Integrity Rules

1. **`getCustomerByQrCode` must NEVER return any field other than `name`, `customerCode`, and `qrEnabled`.** This is a hard security rule. Do not add fields to this query's return value. Do not use `return user` — always use an explicit object literal.

2. **`generateQrCode` is idempotent.** If `user.qrCodeId && user.customerCode` both already exist, the mutation must return immediately without writing anything. A second call must never overwrite existing values.

3. **`qrEnabled: false` blocks all data.** When `qrEnabled` is `false`, the scan result page must show the disabled message and nothing else — not the name, not the customerCode, not any field. This applies to both the public view and the admin view.

4. **QR fields on the `users` table are write-once.** Once `qrCodeId` and `customerCode` are set, they must never be changed by any function in this implementation. No mutation in this feature overwrites existing QR field values.

5. **`qrCodeId` must never equal the Convex `_id` or Clerk `tokenIdentifier`.** It is a separate generated token. `crypto.randomUUID()` satisfies this by design.

---

## 11. Guardrails

**You must NOT:**

- Modify `convex/schema.ts` beyond the 4 new optional fields and 1 index on the `users` table
- Modify any existing Convex function other than `getOrCreateUser` in `helpers.ts`
- Modify any existing Next.js page other than `customer-header.tsx`
- Add the QR scan result page inside the `(customer)` or `(admin)` route group — it must be at the root `app/` level
- Return `email`, `phone`, `role`, `tokenIdentifier`, `_id`, or any other field from `getCustomerByQrCode`
- Call `getCustomerByQrCodeAdmin` without first confirming the Clerk admin role client-side
- Add any new environment variables
- Modify `convex/orders.ts`, `convex/products.ts`, `convex/payments.ts`, `convex/inventory.ts`, or any other Convex file
- Add any feature not listed in the Scope section
- Hardcode `https://neumart.com` as the QR URL base in the server-rendered layer — use `window.location.origin` client-side
- Skip the idempotency check in `generateQrCode`
- Change the existing `by_tokenIdentifier` index or any existing index

---

## 12. Verification Commands

Run these from the `neumart/` directory after completing all phases. All must pass before marking development done.

```bash
# Deploy schema changes to Convex
npx convex deploy

# TypeScript check — must show 0 errors
npx tsc --noEmit

# Lint check
pnpm lint

# Production build check
pnpm build
```

If `npx tsc --noEmit` reports errors in the new files, fix them before proceeding. Do not suppress errors with `// @ts-ignore`.

---

## 13. Manual Test Checklist

Complete all of the following before submitting the completion report:

- [ ] **T1 — New user auto-generation:** Create a new test Clerk account. Sign in. Navigate to `/account/profile`. Confirm `customerCode` (e.g. `CUST-000001`) and QR code are displayed. Check the Convex dashboard — `qrCodeId`, `customerCode`, `qrEnabled`, `qrCreatedAt` are all set on the user record.

- [ ] **T2 — Existing user lazy generation:** Find (or manually clear) a user with no `qrCodeId`. Navigate to `/account/profile`. Confirm loading state appears, then QR code is generated and displayed within 2 seconds.

- [ ] **T3 — Idempotency:** Visit `/account/profile`. Note the `qrCodeId`. Navigate away and return. Confirm the same QR code is shown — no new generation.

- [ ] **T4 — QR encodes correct URL:** On the profile page, use a phone to scan the QR code. Confirm the browser opens `/qr/customer/{correct qrCodeId}`.

- [ ] **T5 — Download QR:** Click "Download QR". Confirm an SVG file is saved to the device.

- [ ] **T6 — Auth guard on profile page:** Sign out. Navigate to `/account/profile`. Confirm redirect to sign-in page.

- [ ] **T7 — "My QR Code" nav link:** Sign in. Check desktop nav — confirm QrCode icon is visible and links to `/account/profile`. Check mobile dropdown — confirm "My QR Code" item is present.

- [ ] **T8 — Public scan page — valid QR:** Open `/qr/customer/{valid qrCodeId}` in an incognito/signed-out browser. Confirm "Nuemart Customer" label, customer name, and "Customer ID: CUST-NNNNNN" are shown. Confirm no email or phone is visible.

- [ ] **T9 — Network response check:** In browser devtools → Network tab, find the Convex WebSocket message for `getCustomerByQrCode`. Confirm the response contains ONLY `name`, `customerCode`, and `qrEnabled`. No `email`, `phone`, `role`, `tokenIdentifier`, or `_id`.

- [ ] **T10 — Invalid QR:** Open `/qr/customer/this-does-not-exist`. Confirm "QR code not found." is displayed.

- [ ] **T11 — Disabled QR:** In Convex dashboard, patch a test user's `qrEnabled` to `false`. Open their QR scan URL. Confirm "This QR code has been disabled." is shown. No name or customer ID visible.

- [ ] **T12 — Admin enhanced view:** Sign in as admin. Open a valid QR scan URL. Confirm enhanced section shows email, phone (if set), order count, last order date, and "View in Admin" link.

- [ ] **T13 — Non-admin sees public view only:** Sign in as a regular customer (non-admin). Open any QR scan URL. Confirm only the public section is shown — no enhanced fields.

- [ ] **T14 — Regression — existing customer flows:** Navigate through products, cart, checkout, orders, addresses. Confirm no errors or regressions.

- [ ] **T15 — TypeScript and build clean:** `npx tsc --noEmit` = 0 errors. `pnpm build` = success.

---

## 14. Completion Response Format

When development is complete, respond with exactly this structure:

```
## Completion Report

1. **Files changed:** [list every file modified or created, with full relative paths from repo root]

2. **Convex functions written or modified:**
   - [function name] ([mutation/query]) — [created/modified]
   - ...

3. **Schema changes:**
   - users table: added customerCode (v.optional(v.string()))
   - users table: added qrCodeId (v.optional(v.string()))
   - users table: added qrEnabled (v.optional(v.boolean()))
   - users table: added qrCreatedAt (v.optional(v.number()))
   - users table: added index by_qr_code_id on ["qrCodeId"]

4. **New environment variables required:** none

5. **Acceptance criteria verified:**
   - AC from US-0020: [✅/❌] [short note]
   - AC from US-0021: [✅/❌] [short note]
   - AC from US-0022: [✅/❌] [short note]
   - AC from US-0023: [✅/❌] [short note]

6. **Regression check performed:** [describe what was tested and outcome]

7. **Verification commands run:**
   - npx convex deploy: [pass/fail]
   - npx tsc --noEmit: [pass/fail — N errors]
   - pnpm lint: [pass/fail]
   - pnpm build: [pass/fail]

8. **Manual test checklist completed:**
   - T1: [✅/❌]
   - T2: [✅/❌]
   - T3: [✅/❌]
   - T4: [✅/❌]
   - T5: [✅/❌]
   - T6: [✅/❌]
   - T7: [✅/❌]
   - T8: [✅/❌]
   - T9: [✅/❌]
   - T10: [✅/❌]
   - T11: [✅/❌]
   - T12: [✅/❌]
   - T13: [✅/❌]
   - T14: [✅/❌]
   - T15: [✅/❌]

9. **Blockers or notes for QA:** [anything QA should know, or "none"]
```

---

*Last updated: 2026-06-23*
