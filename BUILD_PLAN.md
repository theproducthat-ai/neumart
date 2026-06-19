# Neumart Grocery Platform — BUILD_PLAN

## Context
Neumart is an India-focused grocery shopping platform built on Next.js 16 + React 19 (pnpm
monorepo, `neumart/` is the main app). Clerk auth and Convex backend are already wired together.
ShadCN is configured but has no components yet. Zustand and Razorpay are not yet installed.
The goal is to implement the full MVP defined in MVP_SCOPE.md without adding anything outside it.

---

## 1. Current Project Assessment

| Layer | Status |
|---|---|
| Next.js 16 + React 19 | ✅ Ready |
| Clerk v7 auth | ✅ Configured, working |
| Convex 1.41 + Clerk JWT | ✅ Auth config only — no schema or functions |
| ShadCN (radix-nova) | ✅ Configured — no components added yet |
| Tailwind v4 | ✅ Ready |
| Zustand | ❌ Not installed |
| Razorpay | ❌ Not installed |
| Clerk JWT template | ❌ Not configured (admin auth will silently fail without this) |
| middleware.ts | ❌ Missing |
| Business logic | ❌ None |
| Convex schema | ❌ Not defined |

Root `.env.local` already holds Clerk and Convex keys.
Razorpay keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`,
`RAZORPAY_SUBSCRIPTION_PLAN_ID`) must be added before checkout work begins.

**Note on Stripe / Clerk Billing**: Not used. This app is for India. Razorpay handles
all payments and subscriptions. Clerk is used only for authentication and admin role control.

---

## 2. Required Dependencies

Install inside `neumart/neumart/` (the Next.js app):

```
zustand                    # persistent cart store
```

**Do NOT install the `razorpay` npm SDK.** Use `fetch` with HTTP Basic Auth to call the
Razorpay REST API directly from Convex actions. This works in Convex's default V8 runtime
without needing the `"use node"` directive and avoids the SDK's Node.js-only dependencies.

Also install — required by ShadCN's Form component:
```
react-hook-form zod @hookform/resolvers
```

ShadCN components to scaffold via `npx shadcn@latest add`:
```
button input form label textarea select
table badge card separator skeleton
dialog sheet dropdown-menu
sidebar avatar
sonner          # toasts
```

Add Razorpay global type declaration for the browser checkout script
(`types/razorpay.d.ts`).

---

## 2a. ShadCN Component Map

**Rule: never build a custom version of anything in this table. Use the ShadCN component directly.**

### Buttons
`<Button>` and `<Button variant="...">` — every interactive action:
- Add to cart, Remove from cart, Update quantity
- Proceed to checkout, Pay now
- Add address, Save address, Delete address
- Subscribe to membership
- All admin CRUD actions (Create, Edit, Delete, Save)

### Inputs & Forms
`<Input>` + `<Label>` — every text field.
`<Textarea>` — product description.
`<Select>` + `<SelectItem>` — category picker in product form; address selector in checkout.
`<Form>` + `<FormField>` + `<FormItem>` + `<FormControl>` + `<FormMessage>` — every form that
needs validation. ShadCN Form wraps react-hook-form + zod. Do not use uncontrolled forms or
manual `useState` per field for any form with more than one field.

Forms that use this pattern:
- Address form (`/account/addresses`)
- Category create/edit dialog
- Product create/edit dialog
- Inventory quantity edit

### Tables
`<Table>` + `<TableHeader>` + `<TableBody>` + `<TableRow>` + `<TableHead>` + `<TableCell>` —
every data list in the admin area:
- `/admin/categories` — name, slug, status, actions
- `/admin/products` — name, category, price, stock badge, actions
- `/admin/inventory` — product name, quantity, edit control
- `/admin/customers` — name, email, joined date, membership status
- `/admin/orders` — order ID, customer, total, status, razorpayOrderId
- `/admin/payments` — payment ID, order ID, amount, webhookVerified badge, status

### Dialogs
`<Dialog>` + `<DialogContent>` + `<DialogHeader>` + `<DialogTitle>` + `<DialogFooter>` —
every create/edit/delete confirmation modal:
- Create category, Edit category, Delete category (confirm)
- Create product, Edit product, Delete product (confirm)
- Add address, Edit address, Delete address (confirm)

### Sidebar
`<Sidebar>` + `<SidebarContent>` + `<SidebarMenu>` + `<SidebarMenuItem>` + `<SidebarMenuButton>`
— admin navigation (`components/layout/admin-sidebar.tsx`).
Links: Dashboard, Categories, Products, Inventory, Customers, Orders, Payments.

### Cart Drawer
`<Sheet>` + `<SheetContent>` + `<SheetHeader>` + `<SheetTitle>` — slide-out cart panel
(`components/cart/cart-drawer.tsx`). Triggered by cart icon in header.

### Toasts
`<Toaster>` from `sonner` (mounted once in `app/layout.tsx`).
`toast()` / `toast.error()` / `toast.success()` called from client components for:
- Product added to cart
- Favourite toggled
- Address saved / deleted
- Order placed successfully
- Payment verification in progress / failed

### Admin Dashboard Cards
`<Card>` + `<CardHeader>` + `<CardTitle>` + `<CardContent>` — every stat card on `/admin`:
- Total orders today
- Total revenue
- Active members
- Low-stock products count (`components/admin/stats-card.tsx`)

### Status Badges
`<Badge>` — anywhere a status needs a colour-coded pill:
- Order status: pending / confirmed / failed / cancelled
- Payment status: created / paid / failed
- webhookVerified: true / false
- Membership status: active / cancelled / expired
- Stock: In stock / Low stock / Out of stock

### Loading States
`<Skeleton>` — placeholder shapes while Convex queries load:
- Product grid cards
- Admin table rows
- Order history items

### Other
`<Avatar>` — user avatar in customer header (from Clerk `user.imageUrl`).
`<DropdownMenu>` — account menu in header (Profile, Addresses, Orders, Membership, Sign out).
`<Separator>` — dividers in checkout order summary and admin sidebar sections.

---

## 3. Folder / File Structure

```
neumart/neumart/
├── app/
│   ├── layout.tsx                          # existing — add Sonner <Toaster />
│   ├── page.tsx                            # redirect → /products
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx # existing
│   │   └── sign-up/[[...sign-up]]/page.tsx # existing
│   ├── (customer)/
│   │   ├── layout.tsx                      # header + nav + cart button
│   │   ├── products/
│   │   │   ├── page.tsx                    # listing, category filter, search
│   │   │   └── [slug]/page.tsx             # product detail
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx                    # order history
│   │   │   └── [orderId]/page.tsx          # order detail + status
│   │   ├── favourites/page.tsx
│   │   ├── account/
│   │   │   └── addresses/page.tsx          # add / edit / delete addresses
│   │   └── membership/page.tsx
│   └── (admin)/
│       ├── layout.tsx                      # sidebar + admin role gate
│       └── admin/
│           ├── page.tsx                    # dashboard overview
│           ├── categories/page.tsx
│           ├── products/page.tsx
│           ├── inventory/page.tsx
│           ├── customers/page.tsx
│           ├── orders/page.tsx
│           └── payments/page.tsx
├── components/
│   ├── ui/                                 # ShadCN output
│   ├── layout/
│   │   ├── header.tsx
│   │   └── admin-sidebar.tsx
│   ├── products/
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   └── category-filter.tsx
│   ├── cart/
│   │   ├── cart-drawer.tsx                 # slide-out Sheet
│   │   └── cart-item.tsx
│   ├── checkout/
│   │   ├── address-selector.tsx
│   │   └── razorpay-button.tsx
│   ├── orders/order-card.tsx
│   ├── admin/
│   │   ├── stats-card.tsx
│   │   ├── product-form.tsx
│   │   └── category-form.tsx
│   └── membership/membership-card.tsx
├── store/
│   └── cart-store.ts                       # Zustand + persist middleware
├── hooks/
│   └── use-cart.ts                         # thin wrapper over cart-store
├── lib/
│   ├── utils.ts                            # existing (clsx + tw-merge)
│   └── razorpay-script.ts                  # load Razorpay checkout.js dynamically
├── types/
│   └── razorpay.d.ts                       # window.Razorpay type declaration
└── middleware.ts                           # Clerk route protection

neumart/convex/
├── schema.ts
├── auth.config.ts                          # existing
├── users.ts
├── addresses.ts
├── categories.ts
├── products.ts
├── inventory.ts
├── favourites.ts
├── orders.ts
├── orderItems.ts
├── payments.ts
├── membership.ts
└── http.ts                                 # Razorpay webhook HTTP routes (httpRouter)
```

---

## 4. Convex Schema Design

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({

  users: defineTable({
    clerkId:   v.string(),
    email:     v.string(),
    name:      v.optional(v.string()),
    phone:     v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  addresses: defineTable({
    userId:    v.id("users"),
    name:      v.string(),
    phone:     v.string(),
    line1:     v.string(),
    line2:     v.optional(v.string()),
    city:      v.string(),
    state:     v.string(),
    pincode:   v.string(),
    isDefault: v.boolean(),
  }).index("by_user", ["userId"]),

  categories: defineTable({
    name:     v.string(),
    slug:     v.string(),
    imageUrl: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_slug", ["slug"]),

  products: defineTable({
    name:        v.string(),
    slug:        v.string(),
    description: v.optional(v.string()),
    categoryId:  v.id("categories"),
    price:       v.number(),          // stored in paise
    unit:        v.string(),          // "500g", "1L", "6 pcs"
    imageUrl:    v.optional(v.string()),
    isActive:    v.boolean(),
  })
    .index("by_category", ["categoryId"])
    .index("by_slug", ["slug"])
    .searchIndex("search_by_name", { searchField: "name" }),

  inventory: defineTable({
    productId: v.id("products"),
    quantity:  v.number(),
    updatedAt: v.number(),
  }).index("by_product", ["productId"]),

  favourites: defineTable({
    userId:    v.id("users"),
    productId: v.id("products"),
  })
    .index("by_user", ["userId"])
    .index("by_user_product", ["userId", "productId"]),

  orders: defineTable({
    userId:          v.id("users"),
    addressId:       v.id("addresses"),
    status:          v.union(
                       v.literal("pending"),
                       v.literal("confirmed"),
                       v.literal("failed"),
                       v.literal("cancelled")
                     ),
    subtotal:        v.number(),  // paise
    deliveryFee:     v.number(),  // paise — 0 if member
    total:           v.number(),  // paise
    razorpayOrderId: v.optional(v.string()),
    createdAt:       v.number(),
    updatedAt:       v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_razorpay_order", ["razorpayOrderId"]),

  orderItems: defineTable({
    orderId:     v.id("orders"),
    productId:   v.id("products"),
    productName: v.string(),  // snapshot at time of order
    price:       v.number(),  // paise snapshot
    quantity:    v.number(),
  }).index("by_order", ["orderId"]),

  payments: defineTable({
    orderId:            v.id("orders"),
    userId:             v.id("users"),
    razorpayOrderId:    v.string(),
    razorpayPaymentId:  v.optional(v.string()),
    razorpaySignature:  v.optional(v.string()),
    status:             v.union(
                          v.literal("created"),
                          v.literal("paid"),
                          v.literal("failed")
                        ),
    amount:             v.number(),  // paise
    webhookVerified:    v.boolean(),
    createdAt:          v.number(),
    updatedAt:          v.number(),
  })
    .index("by_order", ["orderId"])
    .index("by_razorpay_order", ["razorpayOrderId"]),

  membership: defineTable({
    userId:                 v.id("users"),
    razorpaySubscriptionId: v.string(),
    planId:                 v.string(),
    status:                 v.union(
                              v.literal("created"),
                              v.literal("authenticated"),
                              v.literal("active"),
                              v.literal("cancelled"),
                              v.literal("expired")
                            ),
    freeShipping:           v.boolean(),
    currentPeriodStart:     v.optional(v.number()),
    currentPeriodEnd:       v.optional(v.number()),
    createdAt:              v.number(),
    updatedAt:              v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_subscription_id", ["razorpaySubscriptionId"]),
});
```

All monetary amounts are stored in **paise** (₹1 = 100 paise) to avoid float arithmetic.

**TypeScript rule for Convex types:**
Never declare manual TypeScript interfaces for Convex document shapes.
Convex generates `Doc<"tableName">` and `Id<"tableName">` from the schema automatically.
Always import and use these:
```typescript
import { Doc, Id } from "@/convex/_generated/dataModel"
type Order = Doc<"orders">
type OrderId = Id<"orders">
```

---

## 5. Customer App Flow

```
Sign up / Sign in (Clerk)
  └─→ Auto-create user row in Convex `users` on first authenticated mutation
        Convex function resolves caller internally — no userId passed from frontend

Browse products
  ├─ /products             → full product grid, search bar
  ├─ /products?category=X  → filtered by category slug
  └─ /products?search=X    → full-text search via searchIndex

Product detail /products/[slug]
  └─→ Add to cart (Zustand store → localStorage)

Cart (Zustand, persisted)
  ├─ Update quantity
  ├─ Remove item
  └─ "Proceed to Checkout" button

Checkout /checkout
  ├─ Guard: query api.addresses.listMyAddresses (no userId arg — resolved server-side)
  │    if no addresses → redirect to /account/addresses with toast
  ├─ Show address selector (radio group from Convex)
  ├─ Show order summary + delivery fee
  │    └─ Membership check runs server-side inside createRazorpayOrder action
  └─ "Pay ₹X" → Razorpay Checkout (see §7)

Order success /orders/[orderId]
  └─ Real-time Convex subscription on specific order by orderId
       confirmed → clear Zustand cart, show success UI

Order history /orders        → all orders for current user
Favourites   /favourites     → products marked favourite
Membership   /membership     → subscribe / view status
Account      /account/addresses → manage addresses
```

---

## 6. Admin App Flow

```
/admin/* — protected by middleware (Clerk public metadata role = "admin")
           Role exposed via Clerk JWT template (see §13)

/admin                   → Dashboard: stats cards (orders today, revenue, members, low stock)
/admin/categories        → Table: name, slug, status | create / edit / delete dialog
/admin/products          → Table: name, category, price, stock badge | create / edit dialog
/admin/inventory         → Table: product, current stock | inline edit quantity
/admin/customers         → Table: name, email, joined, membership status
/admin/orders            → Table: order ID, customer, total, status, razorpay IDs
/admin/payments          → Table: payment ID, order ID, amount, webhook verified, status
```

All admin Convex functions verify the caller is admin by reading the JWT claim
`metadata.role` from `ctx.auth.getUserIdentity()` (requires Clerk JWT template — see §13).

---

## 7. Razorpay Checkout Flow (one-time payment)

```
1. Customer clicks "Pay ₹X" on /checkout

2. Store Convex orderId in component state (set when action returns — needed to watch status)

3. Frontend calls Convex action `api.orders.createRazorpayOrder` with:
   { cartItems: CartItem[], addressId: Id<"addresses"> }
   (No userId — action resolves caller identity internally)

4. Convex action (V8 runtime — no "use node" required, uses fetch):
   a. const identity = await ctx.auth.getUserIdentity()
      if (!identity) throw new ConvexError("Unauthenticated")
   b. Resolve Convex user from identity.subject (clerkId)
   c. Validate addressId belongs to this user
   d. Check inventory — each item must have sufficient stock
   e. Query membership for delivery fee (0 if active, else 4000 paise = ₹40)
   f. Create `orders` row: status="pending"
   g. Insert `orderItems` rows (price + name snapshot from Convex product record)
   h. POST to Razorpay Orders API via fetch + Basic Auth:
      URL: https://api.razorpay.com/v1/orders
      Headers: Authorization: "Basic " + btoa(KEY_ID + ":" + KEY_SECRET)
      Body: { amount: totalInPaise, currency: "INR", receipt: orderId.toString() }
   i. Patch orders row with razorpayOrderId returned by Razorpay
   j. Create `payments` row: status="created", webhookVerified=false
   k. Return { convexOrderId, razorpayOrderId, amount, keyId }

5. Frontend saves convexOrderId in local state

6. Frontend loads checkout.js (razorpay-script.ts) then opens:
   new window.Razorpay({
     key: keyId,
     amount, currency: "INR",
     order_id: razorpayOrderId,
     name: "Neumart",
     prefill: { name, email, contact: user.phone ?? "" },
     handler: onPaymentSuccess
   }).open()

7. handler(response) is called (Razorpay-side confirmed):
   - Show "Verifying payment…" spinner
   - DO NOT clear cart here
   - useQuery(api.orders.getOrder, { orderId: convexOrderId }) is already active

8. Razorpay fires webhook → Convex HTTP route (§8)

9. Convex real-time subscription detects order.status === "confirmed"
   → clearCart() → redirect to /orders/[convexOrderId]
```

---

## 8. Razorpay Webhook Flow

```
Webhook endpoint: POST https://<CONVEX_SITE_URL>/razorpay/webhook
Registered in Razorpay dashboard with events: payment.captured, payment.failed

convex/http.ts setup:
  import { httpRouter } from "convex/server"
  const http = httpRouter()
  http.route({ path: "/razorpay/webhook", method: "POST", handler: handlePaymentWebhook })
  http.route({ path: "/razorpay/subscription-webhook", method: "POST", handler: handleSubscriptionWebhook })
  export default http

Handler logic for /razorpay/webhook:

1. Read raw request body as text (required for signature verification — parse after)

2. Verify HMAC-SHA256 signature using Web Crypto API:
   const encoder = new TextEncoder()
   const keyData = encoder.encode(WEBHOOK_SECRET)
   const msgData = encoder.encode(rawBody)
   const cryptoKey = await crypto.subtle.importKey(
     "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
   )
   const sigBytes = await crypto.subtle.sign("HMAC", cryptoKey, msgData)
   const expected = Array.from(new Uint8Array(sigBytes))
     .map(b => b.toString(16).padStart(2, "0")).join("")
   const received = request.headers.get("x-razorpay-signature") ?? ""
   if (expected !== received) return new Response("Invalid signature", { status: 400 })

3. Parse JSON body → { event, payload }

4. IDEMPOTENCY CHECK FIRST — before any mutation:
   Find payment row by payload.payment.entity.order_id (= razorpayOrderId)
   if (payment.webhookVerified === true) return new Response("ok", { status: 200 })
   (Razorpay retries on non-2xx — always return 200 after a valid signature)

5. Call internal Convex mutation based on event:

   "payment.captured":
     a. Find payment by razorpayOrderId
     b. Update payments: status="paid", webhookVerified=true,
                         razorpayPaymentId, razorpaySignature, updatedAt
     c. Update orders: status="confirmed", updatedAt
     d. Fetch all orderItems for this order
     e. For each orderItem:
          inv = db.query("inventory").withIndex("by_product", productId).first()
          newQty = Math.max(0, inv.quantity - item.quantity)
          db.patch(inv._id, { quantity: newQty, updatedAt: Date.now() })
     ← Stock reduction happens HERE, not before. Idempotency guard prevents double-reduction.

   "payment.failed":
     a. Find payment by razorpayOrderId
     b. Update payments: status="failed", updatedAt
     c. Update orders: status="failed", updatedAt

6. Return new Response("ok", { status: 200 })
```

---

## 9. Razorpay Subscription / Membership Flow

```
Subscription webhook: POST https://<CONVEX_SITE_URL>/razorpay/subscription-webhook
(same httpRouter in http.ts — same HMAC signature verification approach)

Subscribe flow:
1. Customer on /membership clicks "Subscribe — Free Delivery"
2. Action first checks: is there already an active membership?
   If yes → throw ConvexError("Already an active membership")
   If cancelled/expired → update existing row (do not insert duplicate)
3. Frontend calls Convex action `api.membership.createSubscription`
   (no userId arg — resolved internally)
4. Action POSTs to Razorpay Subscriptions API via fetch + Basic Auth:
   POST https://api.razorpay.com/v1/subscriptions
   { plan_id: PLAN_ID, total_count: 12, customer_notify: 1 }
5. Upserts `membership` row: status="created", freeShipping=false
6. Returns { subscriptionId }
7. Frontend opens Razorpay Checkout with subscription_id (not order_id)

Webhook events → convex mutations:

"subscription.activated":
  membership.status="active", freeShipping=true,
  currentPeriodStart, currentPeriodEnd set from webhook payload

"subscription.charged":
  update currentPeriodStart / currentPeriodEnd (renewal — keep active)

"subscription.cancelled":
  membership.status="cancelled", freeShipping=false

"subscription.expired" / "subscription.completed":
  membership.status=<event status>, freeShipping=false

Delivery fee logic (inside createRazorpayOrder action — server-side only):
  const mem = await ctx.db.query("membership")
    .withIndex("by_user", q => q.eq("userId", user._id))
    .filter(q => q.eq(q.field("status"), "active"))
    .first()
  const deliveryFee = mem?.freeShipping === true ? 0 : 4000  // paise
```

---

## 10. Address / Onboarding Flow

```
PATTERN: Convex functions NEVER accept userId from the frontend.
They resolve the caller's identity internally via ctx.auth.getUserIdentity().
This prevents spoofed userId attacks and eliminates the need for frontend to know Convex IDs.

getOrCreateUser pattern (called in every authenticated mutation before any other work):
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new ConvexError("Unauthenticated")
  let user = await ctx.db.query("users")
    .withIndex("by_clerk_id", q => q.eq("clerkId", identity.subject)).first()
  if (!user) {
    const id = await ctx.db.insert("users", {
      clerkId: identity.subject,
      email: identity.email ?? "",
      name: identity.name,
      createdAt: Date.now(),
    })
    user = await ctx.db.get(id)
  }
  return user

Address functions (convex/addresses.ts) — no userId param accepted from frontend:
  - listMyAddresses()        → resolves caller internally
  - addAddress(fields)       → resolves caller internally
  - updateAddress(id, fields)→ verifies ownership internally before patching
  - deleteAddress(id)        → verifies ownership internally before deleting
  - setDefaultAddress(id)    → clears old default, sets new one

Checkout gate (in /checkout page — client side):
  const addresses = useQuery(api.addresses.listMyAddresses)
  // no arguments — Convex resolves the caller from the auth token
  if (addresses !== undefined && addresses.length === 0) {
    router.push("/account/addresses")
    toast("Please add a delivery address to continue.")
  }

Server-side guard (inside createRazorpayOrder action):
  Validate that the provided addressId is in the caller's address list.
  If not → throw ConvexError("Invalid address")
```

---

## 11. Cart Persistence Flow

```typescript
// store/cart-store.ts
// CartItem uses plain string for productId — Convex Id<"products"> is a string at runtime.
// When passing productId to Convex mutations, cast: item.productId as Id<"products">
interface CartItem {
  productId: string   // plain string for localStorage serialization; cast to Id<"products"> when calling Convex
  name:      string
  price:     number   // paise
  quantity:  number
  unit:      string
  imageUrl?: string
}

interface CartStore {
  items:          CartItem[]
  addItem:        (item: CartItem) => void
  updateQuantity: (productId: string, qty: number) => void
  removeItem:     (productId: string) => void
  clearCart:      () => void
}

// Uses Zustand `persist` middleware with localStorage key "neumart-cart"
// addItem: if productId already in items, increment quantity instead of duplicating
```

Cart clear contract:
- `clearCart()` is called ONLY when the Convex real-time query on the specific orderId
  returns `order.status === "confirmed"` (set by the webhook mutation).
- The component must capture the Convex `orderId` returned from `createRazorpayOrder`
  into local state BEFORE opening the Razorpay modal.
- If user closes the browser after payment but before webhook fires, the cart remains
  in localStorage. On return they can see a pending order in /orders.

---

## 12. Inventory Reduction Logic

```
Inventory table: one row per product (productId, quantity)

NEVER reduce on order creation.
REDUCE only inside the `payment.captured` webhook mutation, and only after the
idempotency check confirms webhookVerified is still false.

for each orderItem belonging to the confirmed order:
  inv = db.query("inventory").withIndex("by_product", q => q.eq("productId", item.productId)).first()
  if (inv) {
    newQty = Math.max(0, inv.quantity - item.quantity)
    db.patch(inv._id, { quantity: newQty, updatedAt: Date.now() })
  }

Admin view shows current live quantity from Convex.
Admin can manually adjust inventory at /admin/inventory.
Low-stock alert on admin dashboard: products where quantity < 10.
```

---

## 13. Admin Route Protection

### Step 0 — Configure Clerk JWT Template (MUST do before writing any admin code)

In the Clerk dashboard → JWT Templates → create or edit the "convex" template.
Add the following claim so `publicMetadata.role` is included in every JWT:
```json
{
  "metadata": "{{user.public_metadata}}"
}
```
Without this, `sessionClaims?.metadata` is always `undefined` in both middleware and
Convex. Admin routes will silently redirect everyone — including real admins — to `/`.

---

### Middleware

```typescript
// neumart/neumart/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isAdminRoute  = createRouteMatcher(["/admin(.*)"])
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  if (isAdminRoute(req)) {
    if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url))
    const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role
    if (role !== "admin") return NextResponse.redirect(new URL("/", req.url))
  }

  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }
})

export const config = { matcher: ["/((?!_next|.*\\..*).*)"] }
```

The `(sessionClaims?.metadata as { role?: string } | undefined)?.role` cast is intentional —
Clerk's TypeScript types for `sessionClaims.metadata` are `unknown`. This is a safe narrowing cast.

### Defense-in-depth: Admin Layout

```typescript
// app/(admin)/layout.tsx
const { user } = useUser()
const role = user?.publicMetadata?.role as string | undefined
if (role !== "admin") return <p>Not authorized.</p>
```

### Admin Convex Function Guard

Every admin Convex query/mutation must verify role from the JWT claim:
```typescript
const identity = await ctx.auth.getUserIdentity()
if (!identity) throw new ConvexError("Unauthenticated")
// identity.metadata?.role comes from the JWT template configured above
if ((identity as any).metadata?.role !== "admin") {
  throw new ConvexError("Forbidden")
}
```

---

## 14. Testing Checklist

### Auth
- [ ] Sign up with email, verify user created in Convex `users`
- [ ] Sign in, sign out
- [ ] Protected routes redirect to /sign-in when unauthenticated

### Addresses
- [ ] Add address — all fields required, ownership enforced server-side
- [ ] Edit address — cannot edit another user's address
- [ ] Delete address
- [ ] Set default address

### Products & Browse
- [ ] Products list page shows all active products
- [ ] Category filter narrows results
- [ ] Search returns relevant products
- [ ] Product detail page shows correct data + stock status

### Cart
- [ ] Add product to cart
- [ ] Add same product again → quantity increments (no duplicate row)
- [ ] Increase / decrease quantity
- [ ] Remove item
- [ ] Cart persists after page refresh (localStorage)
- [ ] Cart badge updates in header

### Favourites
- [ ] Toggle favourite on product card
- [ ] Favourites page shows all marked products
- [ ] Unfavourite removes from list

### Checkout (Razorpay test mode)
- [ ] Checkout page blocked if no address → redirect with toast
- [ ] Delivery fee shows ₹40 for non-member
- [ ] Convex orderId is stored in local state before modal opens
- [ ] Razorpay modal opens with correct amount in paise
- [ ] Successful test payment → spinner shown, cart NOT yet cleared
- [ ] Webhook fires → payment.webhookVerified becomes true
- [ ] Order.status becomes "confirmed" via real-time subscription
- [ ] Cart clears only after confirmed status
- [ ] Redirect to /orders/[orderId]
- [ ] Duplicate webhook → idempotency guard prevents double inventory reduction

### Inventory
- [ ] Stock does NOT reduce on order creation (stays same after createRazorpayOrder)
- [ ] Stock reduces after payment.captured webhook fires
- [ ] Admin /inventory shows updated count
- [ ] Duplicate webhook does not reduce stock twice

### Membership
- [ ] /membership shows "No active plan" for new user
- [ ] Subscribe when already active → blocked with error
- [ ] Subscribe opens Razorpay subscription checkout
- [ ] subscription.activated webhook → freeShipping=true, status=active in Convex
- [ ] Delivery fee shows ₹0 for active member at checkout
- [ ] subscription.cancelled webhook → freeShipping=false
- [ ] Re-subscribe after cancellation → updates existing row, does not create duplicate

### Admin
- [ ] /admin blocked for non-admin Clerk users → redirected to /
- [ ] /admin accessible for user with role="admin" in Clerk publicMetadata
- [ ] Clerk JWT template is configured — sessionClaims.metadata.role is not undefined
- [ ] Admin Convex functions throw Forbidden for non-admin callers
- [ ] Dashboard shows order count, revenue, member count, low-stock count
- [ ] Create category → appears in customer browse
- [ ] Create product with price (in paise) + inventory
- [ ] Edit / delete product
- [ ] Update inventory quantity
- [ ] Orders list shows all orders with razorpayOrderId
- [ ] Payments list shows webhookVerified=true after webhook fires
- [ ] Customers list shows membership status

### Orders
- [ ] /orders shows history for signed-in user only
- [ ] /orders/[id] shows items, total, address, status, razorpay payment reference

---

## 15. Phase-wise Implementation Sequence

### Phase 1 — Foundation
1. **Configure Clerk JWT template** in Clerk dashboard to include `"metadata": "{{user.public_metadata}}"`
2. Install npm packages in `neumart/neumart/` (do NOT install razorpay npm package):
   ```
   pnpm add zustand react-hook-form zod @hookform/resolvers
   ```
3. Run `npx shadcn@latest add` for all required components (see §2a for full list)
4. Define `convex/schema.ts`
5. Create `neumart/neumart/middleware.ts`
6. Create `convex/users.ts` with `getOrCreateUser` helper (used internally by all other functions)
7. Set Razorpay environment variables — two separate destinations:

   **Convex dashboard** (Settings → Environment Variables) — read by Convex actions and HTTP handlers.
   `.env.local` does NOT reach Convex; these must be set here or via CLI:
   ```
   npx convex env set RAZORPAY_KEY_ID=rzp_test_xxx
   npx convex env set RAZORPAY_KEY_SECRET=xxx
   npx convex env set RAZORPAY_WEBHOOK_SECRET=xxx
   npx convex env set RAZORPAY_SUBSCRIPTION_PLAN_ID=plan_xxx
   ```
   In Convex functions, access via `process.env.RAZORPAY_KEY_SECRET` etc.

   **neumart/.env.local** — read by Next.js only. No Razorpay secrets are needed here
   because `keyId` is returned to the frontend by the Convex action at runtime.
   (The existing Clerk + Convex keys already in .env.local stay as-is.)
8. Create `neumart/neumart/types/razorpay.d.ts`

**Git commit:** `feat: install deps, convex schema, middleware, user sync`

### Phase 2 — Admin: Categories, Products, Inventory
1. `convex/categories.ts` — list, listActive, create, update, delete (admin guarded)
2. `convex/products.ts` — list, listByCategory, search, getBySlug, create, update, delete
3. `convex/inventory.ts` — getByProduct, setQuantity, adminLowStock
4. Admin layout + sidebar (`components/layout/admin-sidebar.tsx`)
5. `/admin/categories` page + create/edit dialog
6. `/admin/products` page + create/edit dialog
7. `/admin/inventory` page + inline quantity edit

**Git commit:** `feat: admin categories, products and inventory management`

### Phase 3 — Customer: Browse, Search, Favourites
1. `convex/favourites.ts` — toggleFavourite, listMyFavourites (caller resolved internally)
2. Customer layout with header + category nav
3. `/products` page — grid, category chips, search bar
4. `/products/[slug]` page — detail + add-to-cart
5. `/favourites` page
6. `components/products/product-card.tsx` with favourite heart toggle

**Git commit:** `feat: customer product browse, search and favourites`

### Phase 4 — Cart (Zustand)
1. `store/cart-store.ts` with Zustand + persist (localStorage key: "neumart-cart")
2. `hooks/use-cart.ts`
3. Cart drawer (`components/cart/cart-drawer.tsx`) — ShadCN Sheet
4. Cart item component with +/- quantity controls
5. `/cart` page
6. Header cart icon with item count badge

**Git commit:** `feat: zustand cart with localStorage persistence`

### Phase 5 — Addresses & Checkout Gate
1. `convex/addresses.ts` — listMyAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress
   (all resolve caller internally — no userId param from frontend)
2. `/account/addresses` page + address form dialog
3. `components/checkout/address-selector.tsx`
4. Checkout gate in `/checkout` page: query listMyAddresses → redirect if empty

**Git commit:** `feat: address management and checkout gate`

### Phase 6 — Razorpay One-Time Checkout
1. `convex/orders.ts` — createRazorpayOrder action (fetch + Basic Auth), getOrder query
2. `convex/orderItems.ts` — listByOrder query
3. `convex/payments.ts` — getByOrder query
4. `convex/http.ts`:
   - Set up `httpRouter()` and export as default
   - Register POST /razorpay/webhook → handlePaymentWebhook
   - Register POST /razorpay/subscription-webhook → handleSubscriptionWebhook
   - Implement HMAC-SHA256 verification with Web Crypto API
   - Implement idempotency check (skip if webhookVerified already true)
   - Implement inventory reduction on payment.captured
5. `lib/razorpay-script.ts` — dynamically load checkout.js
6. `components/checkout/razorpay-button.tsx`
7. `/checkout` page:
   - List addresses, show order summary, compute delivery fee display
   - Store convexOrderId in local state after action returns
   - Open Razorpay modal
   - useQuery on getOrder(convexOrderId) for real-time status
   - clearCart() + redirect when status === "confirmed"

**Git commit:** `feat: razorpay checkout, payment webhook, inventory reduction`

### Phase 7 — Orders (Customer + Admin)
1. `convex/orders.ts` — listMyOrders query (caller resolved internally)
2. `/orders` page — customer order history
3. `/orders/[orderId]` page — items, total, address snapshot, status, payment ref
4. `/admin/orders` page — all orders with razorpay IDs
5. `/admin/payments` page — all payments with webhookVerified status

**Git commit:** `feat: order history and admin orders/payments views`

### Phase 8 — Membership / Razorpay Subscriptions
1. `convex/membership.ts`:
   - createSubscription action (fetch + Basic Auth, upsert row, check for duplicate active)
   - getMyMembership query (caller resolved internally)
2. Subscription webhook handler in `convex/http.ts`
3. Delivery fee check already wired in Phase 6 createRazorpayOrder action
4. `/membership` page — show status card + subscribe button
5. `/admin` stats — add member count (Phase 9 will build the full dashboard)

**Git commit:** `feat: razorpay subscriptions and membership management`

### Phase 9 — Admin Dashboard + Customers
1. `convex/orders.ts` — adminStats query (total count, total revenue) (admin guarded)
2. `convex/inventory.ts` — lowStockProducts query already from Phase 2
3. `convex/users.ts` — listAllUsers query (admin guarded)
4. `/admin` dashboard — stats cards: orders, revenue, members, low-stock count
5. `/admin/customers` — user list with membership status column

**Git commit:** `feat: admin dashboard overview and customer list`

### Phase 10 — Polish & Hardening
1. Loading skeletons on product grid and order list
2. Empty states: no products, no orders, empty cart, no favourites
3. Error handling: checkout page catches action errors, shows toast
4. Toast notifications via Sonner: add-to-cart, favourite toggled, address saved
5. Out-of-stock badge on product cards (quantity === 0 from inventory query)
6. End-to-end test run against Razorpay test mode using test card numbers
7. Verify duplicate webhook scenario does not double-reduce inventory
8. Verify admin routes blocked correctly for non-admin users

**Git commit:** `feat: loading states, empty states, toasts, e2e hardening`

---

## 16. Git Commit Checkpoints

| Phase | Commit message |
|---|---|
| Phase 1 | `feat: install deps, convex schema, middleware, user sync` |
| Phase 2 | `feat: admin categories, products and inventory management` |
| Phase 3 | `feat: customer product browse, search and favourites` |
| Phase 4 | `feat: zustand cart with localStorage persistence` |
| Phase 5 | `feat: address management and checkout gate` |
| Phase 6 | `feat: razorpay checkout, payment webhook, inventory reduction` |
| Phase 7 | `feat: order history and admin orders/payments views` |
| Phase 8 | `feat: razorpay subscriptions and membership` |
| Phase 9 | `feat: admin dashboard overview and customer list` |
| Phase 10 | `feat: loading states, empty states, toasts, e2e hardening` |

---

## Key Invariants (Do Not Break)

1. **Monetary values**: Always store and compute in paise. Convert to ₹ only for display.
2. **Stock reduction**: Only inside `payment.captured` webhook mutation, after idempotency check.
3. **Cart clear**: Only when Convex real-time subscription reports `order.status === "confirmed"`.
4. **Webhook trust**: Frontend `handler()` is UI-only. All state changes are driven by webhooks.
5. **Admin gate**: Clerk JWT template must expose `metadata.role`. Middleware + layout + Convex all check it.
6. **Address required**: Checkout page client-gate + server-side validation inside createRazorpayOrder.
7. **Razorpay only**: No Stripe, no Clerk Billing.
8. **Convex as source of truth**: Orders, payments, inventory, membership all live in Convex only.
9. **No userId from frontend**: All Convex functions resolve caller identity internally via getUserIdentity().
10. **No manual Convex types**: Use `Doc<"table">` and `Id<"table">` from generated dataModel, not hand-rolled interfaces.
11. **Idempotency**: Webhook handler skips all work if payment.webhookVerified is already true.
12. **No razorpay npm SDK**: Use fetch + Basic Auth. Works in Convex V8 runtime without "use node".
