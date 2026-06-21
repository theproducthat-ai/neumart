# DEVPLAN-0001 — Coding Prompt

**Use this prompt to instruct Claude to implement the Delivery Module MVP.**  
Copy everything from the horizontal rule below to the end of this file into a new Claude Code session.

---

---

You are implementing the **Delivery Module MVP** for Nuemart, a grocery ordering platform built on Next.js + Convex + Clerk. The platform has a complete browse-to-order flow. You are adding a delivery tracking layer on top of it.

Read this prompt fully before writing a single line of code.

---

## What you are building

A delivery tracking layer consisting of:

1. A new `deliveryTasks` Convex table (new `convex/schema.ts` entry)
2. A new `convex/delivery.ts` file with 6 Convex functions
3. A modification to `convex/orders.ts` — `placeOrderWithoutPayment` must atomically create a delivery task
4. A new admin component: `components/delivery/AdminDeliverySection.tsx`
5. A new customer component: `components/delivery/DeliveryStatusSection.tsx`
6. Two modified pages: admin order detail and customer order detail

---

## Repository structure you must know

All source code is inside `neumart/` (relative to the repo root). So:
- Convex functions: `neumart/convex/`
- Next.js app: `neumart/app/`
- Components: `neumart/components/`
- Lib utilities: `neumart/lib/`

---

## Step 1 — Read these files first

Before writing any code, read these files:

1. `neumart/convex/schema.ts` — to understand all existing tables
2. `neumart/convex/helpers.ts` — to understand `assertAdmin`, `requireCurrentUser`, `getOrCreateUser`
3. `neumart/convex/orders.ts` — to understand `placeOrderWithoutPayment` (you will modify it)
4. `neumart/app/(admin)/admin/orders/[id]/page.tsx` — to understand the admin order detail page structure
5. `neumart/app/(customer)/orders/[id]/page.tsx` — to understand the customer order detail page structure

---

## Step 2 — Schema change

Modify `neumart/convex/schema.ts`. Add the `deliveryTasks` table after the `payments` table definition. Do not modify any existing table.

```ts
deliveryTasks: defineTable({
  orderId: v.id("orders"),
  userId: v.id("users"),
  addressId: v.id("addresses"),
  status: v.union(
    v.literal("pending"),
    v.literal("assigned"),
    v.literal("picked_up"),
    v.literal("out_for_delivery"),
    v.literal("delivered"),
    v.literal("failed"),
    v.literal("cancelled")
  ),
  assignedTo: v.optional(v.string()),
  assignedContact: v.optional(v.string()),
  assignedAt: v.optional(v.number()),
  pickedUpAt: v.optional(v.number()),
  outForDeliveryAt: v.optional(v.number()),
  deliveredAt: v.optional(v.number()),
  failedAt: v.optional(v.number()),
  failedReasonCode: v.optional(v.union(
    v.literal("customer_unavailable"),
    v.literal("wrong_address"),
    v.literal("customer_refused"),
    v.literal("delivery_person_unavailable"),
    v.literal("order_damaged"),
    v.literal("payment_issue"),
    v.literal("unable_to_contact"),
    v.literal("other")
  )),
  failedReasonNotes: v.optional(v.string()),
  cancelledAt: v.optional(v.number()),
  cancelledReason: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
  updatedBy: v.id("users"),
}).index("by_orderId", ["orderId"]),
```

---

## Step 3 — Create `neumart/convex/delivery.ts`

Create this file from scratch. It must export exactly these 6 functions.

### 3.1 — `getDeliveryTaskByOrder` (admin query)

```
export const getDeliveryTaskByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    await assertAdmin(ctx);
    const task = await ctx.db
      .query("deliveryTasks")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .unique();
    return task;
  },
});
```

### 3.2 — `getCustomerDeliveryStatus` (customer query)

Returns only safe fields. Never returns delivery person name, contact, reason codes, or notes.

```
export const getCustomerDeliveryStatus = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) return null;

    const task = await ctx.db
      .query("deliveryTasks")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .unique();
    if (!task || task.userId !== user._id) return null;

    const address = await ctx.db.get(task.addressId);

    return {
      status: task.status,
      address,
    };
  },
});
```

### 3.3 — `assignDelivery` (admin mutation)

Transitions status from "pending" to "assigned". Validates: current status must be "pending", `assignedTo` is required.

```
Args: { deliveryTaskId: v.id("deliveryTasks"), assignedTo: v.string(), assignedContact: v.optional(v.string()) }

- Call assertAdmin(ctx) first
- Look up user via ctx.auth for updatedBy
- Fetch task; throw ConvexError if not found
- Validate task.status === "pending" — else throw ConvexError("Cannot assign: delivery is already [status].")
- Validate assignedTo.trim() is non-empty — else throw ConvexError("Delivery person name is required to assign.")
- Patch: status = "assigned", assignedTo, assignedContact, assignedAt = now, updatedAt = now, updatedBy = user._id
- Never touch orders, payments, products
```

### 3.4 — `updateDeliveryStatus` (admin mutation)

Handles: assigned → picked_up, picked_up → out_for_delivery, out_for_delivery → delivered.

```
Args: { deliveryTaskId: v.id("deliveryTasks"), newStatus: v.union(v.literal("picked_up"), v.literal("out_for_delivery"), v.literal("delivered")) }

Transition map (server-enforced):
  assigned → picked_up
  picked_up → out_for_delivery
  out_for_delivery → delivered

- Call assertAdmin(ctx) first
- Resolve updatedBy from ctx.auth
- Fetch task; throw ConvexError if not found
- Validate transition: if VALID_TRANSITIONS[task.status] does not include newStatus, throw ConvexError("Cannot set delivery to '[newStatus]' from current status '[task.status]'.")
- Determine which timestamp to set: picked_up → pickedUpAt, out_for_delivery → outForDeliveryAt, delivered → deliveredAt
- Patch: status = newStatus, [timestampField] = now, updatedAt = now, updatedBy = user._id
- Never touch orders, payments, products
```

### 3.5 — `setFailedDelivery` (admin mutation)

Transitions status from "out_for_delivery" to "failed" with a required reason.

```
Args: {
  deliveryTaskId: v.id("deliveryTasks"),
  failedReasonCode: v.union(
    v.literal("customer_unavailable"), v.literal("wrong_address"),
    v.literal("customer_refused"), v.literal("delivery_person_unavailable"),
    v.literal("order_damaged"), v.literal("payment_issue"),
    v.literal("unable_to_contact"), v.literal("other")
  ),
  failedReasonNotes: v.optional(v.string()),
}

- Call assertAdmin(ctx) first
- Resolve updatedBy from ctx.auth
- Fetch task; throw ConvexError if not found
- Validate task.status === "out_for_delivery" — else throw ConvexError("Cannot set delivery to 'failed' from current status '[task.status]'.")
- Validate: if failedReasonCode === "other" and (!failedReasonNotes || !failedReasonNotes.trim()), throw ConvexError("Please add notes when selecting Other.")
- Patch: status = "failed", failedReasonCode, failedReasonNotes, failedAt = now, updatedAt = now, updatedBy = user._id
- Never touch orders, payments, products
```

### 3.6 — `cancelDelivery` (admin mutation)

Transitions any non-terminal status to "cancelled". Terminal statuses (delivered, failed) cannot be cancelled.

```
Args: { deliveryTaskId: v.id("deliveryTasks"), cancelledReason: v.optional(v.string()) }

- Call assertAdmin(ctx) first
- Resolve updatedBy from ctx.auth
- Fetch task; throw ConvexError if not found
- If task.status === "delivered" or task.status === "failed":
  throw ConvexError("Cannot cancel a delivery that is already " + task.status + ".")
- Patch: status = "cancelled", cancelledAt = now, cancelledReason, updatedAt = now, updatedBy = user._id
- Never touch orders, payments, products
```

#### Imports for `delivery.ts`

```ts
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./helpers";
```

---

## Step 4 — Modify `neumart/convex/orders.ts`

In `placeOrderWithoutPayment`, after step 8 (the stock deduction block), add a step 9:

```ts
// 9. Create delivery task — atomic with order placement
await ctx.db.insert("deliveryTasks", {
  orderId,
  userId: user._id,
  addressId,
  status: "pending",
  createdAt: now,
  updatedAt: now,
  updatedBy: user._id,
});
```

Do not change anything else in `orders.ts`.

---

## Step 5 — Create `neumart/components/delivery/AdminDeliverySection.tsx`

This is a `"use client"` component. Prop: `orderId: Id<"orders">`.

It renders the full delivery management UI for admins. Use `useQuery(api.delivery.getDeliveryTaskByOrder, { orderId })` to get the delivery task. Use `useMutation` for each of the 4 mutations.

**State machine — what to render per status:**

| Status | Render |
|---|---|
| `undefined` (loading) | Skeleton |
| `null` (no task) | "Delivery information not available." (edge case — should not happen post-deploy) |
| `pending` | Assign form: `assignedTo` input (required, label "Delivery person name"), `assignedContact` input (optional, label "Contact number"), "Assign Delivery" button |
| `assigned` | Status badge "Assigned", assigned person + contact (if any), assignedAt timestamp. "Mark as Picked Up" button. "Cancel Delivery" link. |
| `picked_up` | Status badge, pickedUpAt. "Mark as Out for Delivery" button. "Cancel Delivery" link. |
| `out_for_delivery` | Status badge, outForDeliveryAt. "Mark as Delivered" button. "Mark as Failed" button (opens inline form). "Cancel Delivery" link. |
| `delivered` | Status badge "Delivered", deliveredAt. Read-only. No action buttons. |
| `failed` | Status badge "Delivery Failed", failedAt, failedReasonCode label, failedReasonNotes (if any). Read-only. |
| `cancelled` | Status badge "Cancelled", cancelledAt, cancelledReason (if any). Read-only. |

**Failed delivery form** (shown when admin clicks "Mark as Failed"):
- Dropdown with 8 options (use `Select` from `@/components/ui/select`)
- Notes textarea: shown and required only when "Other" is selected
- "Confirm Failed Delivery" button; "Cancel" to dismiss the form without submitting
- All validation displayed inline before calling the mutation

**Cancel confirmation:**
- When admin clicks "Cancel Delivery", show a small inline confirmation area (not a modal) with optional reason input and "Confirm Cancel" / "Dismiss" buttons.
- On confirm, call `cancelDelivery` mutation.

**Error handling:**
- Wrap every mutation call in try/catch
- Show `toast.error(err instanceof Error ? err.message : "Something went wrong")` on failure
- Show `toast.success("...")` on success with an appropriate message per action

**Imports to use:**
```ts
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck } from "lucide-react";
import { formatDateTime } from "@/lib/format";
```

---

## Step 6 — Create `neumart/components/delivery/DeliveryStatusSection.tsx`

This is a `"use client"` component. Prop: `orderId: Id<"orders">`.

Uses `useQuery(api.delivery.getCustomerDeliveryStatus, { orderId })`.

**Customer-facing status labels:**

| status | Label |
|---|---|
| pending | Pending |
| assigned | Delivery Assigned |
| picked_up | Picked Up |
| out_for_delivery | Out for Delivery |
| delivered | Delivered |
| failed | Delivery Failed |
| cancelled | Delivery Cancelled |

Render:
1. Section heading with a Truck icon: "Delivery"
2. A `Badge` styled per status (use `variant="outline"` for delivered, `variant="destructive"` for failed/cancelled, `variant="secondary"` for in-progress states, `variant="default"` for pending/assigned)
3. The delivery address (same format as existing address display in the page — name, phone, line1, line2 optional, landmark optional, city/state/pincode)
4. If `status === "failed"`: show only "Delivery Failed" badge — no reason text
5. If `status === "cancelled"`: show only "Delivery Cancelled" badge — no reason text
6. If `result === undefined`: show a `Skeleton`
7. If `result === null`: show nothing (return null)

Do NOT render: delivery person name, delivery person contact, failed reason code, failed reason notes, `updatedBy`, `cancelledReason`.

---

## Step 7 — Modify admin order detail page

File: `neumart/app/(admin)/admin/orders/[id]/page.tsx`

1. Import `AdminDeliverySection` from `@/components/delivery/AdminDeliverySection`
2. In the right column (the `<div className="space-y-4">` that contains the Customer, Delivery address, Payment, and Update status cards), add `<AdminDeliverySection orderId={order._id} />` **after** the "Update status" card.

No other changes to this file.

---

## Step 8 — Modify customer order detail page

File: `neumart/app/(customer)/orders/[id]/page.tsx`

1. Import `DeliveryStatusSection` from `@/components/delivery/DeliveryStatusSection`
2. Import `Id` from `@/convex/_generated/dataModel` if not already imported (it is already imported)
3. In `OrderDetailContent`, add `<DeliveryStatusSection orderId={id as Id<"orders">} />` **after** the existing "Delivery address" section (the last rendered block).

No other changes to this file.

---

## Hard rules — do not violate these

1. **Never write to `orders`, `payments`, `products`, or `stockMovements` tables from any delivery mutation.** Not even a `ctx.db.patch`. Any delivery mutation that touches these tables is wrong.
2. **Never accept `userId` or `updatedBy` as a client argument.** Always resolve from `ctx.auth`.
3. **Status transitions are enforced server-side.** The UI shows only valid next-state buttons, but the mutation also validates the transition independently.
4. **`failedReasonCode` is required when calling `setFailedDelivery`.** `failedReasonNotes` is required only when code = "other".
5. **`assignedTo` is required to call `assignDelivery`.** An empty string must be rejected.
6. **The delivery task insert in `placeOrderWithoutPayment` must be synchronous (awaited) inside the same mutation handler.** Not a background job, not fire-and-forget.

---

## Completion report

When implementation is complete, run `tsc --noEmit` from the `neumart/` directory and confirm zero type errors. Then report:

1. Files created (list with paths)
2. Files modified (list with paths and what changed)
3. Result of `tsc --noEmit`
4. Any deviations from this prompt and why

---
