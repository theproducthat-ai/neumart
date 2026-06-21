# DEVPLAN-0001 — Delivery Module MVP

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0001 | `04-request-management/requests/REQ-0001.md` |
| PRD | PRD-0001 | `07-prd/approved-prds/PRD-0001.md` |
| User Stories | US-0001 to US-0008 | `08-user-stories/stories/` |
| Coding Prompt | DEVPLAN-0001-coding-prompt | `09-development-planning/plans/DEVPLAN-0001-coding-prompt.md` |
| QA | QA-0001 | *(populated after QA)* |

---

## Status

**Dev Plan Status:** Ready for Development  
**Owner:** Engineering  
**Total Story Points:** 21  
**Date Created:** 2026-06-21  
**Last Updated:** 2026-06-21

---

## Scope Summary

Build the Delivery Module MVP for Nuemart. This is a pure addition — no existing tables are modified structurally. A new `deliveryTasks` Convex table is added, and the two existing order detail screens (customer and admin) are extended with delivery sections. The order placement mutation is modified to atomically create a delivery task on every order placed.

---

## Architecture Summary

| Layer | Location | Change Type |
|---|---|---|
| Convex schema | `neumart/convex/schema.ts` | Add `deliveryTasks` table |
| Convex backend | `neumart/convex/delivery.ts` | New file — 5 queries/mutations |
| Convex backend | `neumart/convex/orders.ts` | Modify `placeOrderWithoutPayment` — insert delivery task at step 9 |
| React component | `neumart/components/delivery/AdminDeliverySection.tsx` | New file |
| React component | `neumart/components/delivery/DeliveryStatusSection.tsx` | New file |
| Next.js page | `neumart/app/(admin)/admin/orders/[id]/page.tsx` | Extend — add AdminDeliverySection |
| Next.js page | `neumart/app/(customer)/orders/[id]/page.tsx` | Extend — add DeliveryStatusSection |

---

## Build Sequence

Follow this order strictly. Steps that can run in parallel are marked.

### Phase 1 — Schema (US-0001)

**Task 1.1** — Add `deliveryTasks` to `neumart/convex/schema.ts`

Add the table after the `payments` table. Include all 19 fields and the `by_orderId` index. After adding, run `npx convex deploy` (or `npx convex dev`) to confirm the schema deploys with no errors.

---

### Phase 2 — Backend (US-0002 first, then US-0003 / US-0008 in parallel)

**Task 2.1** — Create `neumart/convex/delivery.ts`

Write all 5 functions in this file:
1. `getDeliveryTaskByOrder` — admin query
2. `getCustomerDeliveryStatus` — customer query
3. `assignDelivery` — admin mutation
4. `updateDeliveryStatus` — admin mutation
5. `setFailedDelivery` — admin mutation
6. `cancelDelivery` — admin mutation

*(6 functions total — getDeliveryTaskByOrder serves US-0003, getCustomerDeliveryStatus serves US-0008, and the 4 mutations serve US-0004 through US-0007.)*

**Task 2.2** — Modify `neumart/convex/orders.ts` → `placeOrderWithoutPayment`

Insert delivery task creation as step 9 (after stock movements). The insert must happen inside the same mutation handler — not as a separate call. If it throws, the entire mutation fails.

---

### Phase 3 — Frontend (parallel after Phase 2)

**Task 3.1** — Create `neumart/components/delivery/AdminDeliverySection.tsx`

Client component. Receives `orderId` as prop. Uses `useQuery(api.delivery.getDeliveryTaskByOrder)` and `useMutation` for the 4 delivery mutations. Renders the full admin delivery management UI.

**Task 3.2** — Create `neumart/components/delivery/DeliveryStatusSection.tsx`

Client component. Receives `orderId` as prop. Uses `useQuery(api.delivery.getCustomerDeliveryStatus)`. Renders the read-only delivery status badge + address summary for the customer.

---

### Phase 4 — Screen Integration

**Task 4.1** — Extend `neumart/app/(admin)/admin/orders/[id]/page.tsx`

Add `<AdminDeliverySection orderId={order._id} />` after the "Update status" card in the right column. Import from `@/components/delivery/AdminDeliverySection`.

**Task 4.2** — Extend `neumart/app/(customer)/orders/[id]/page.tsx`

Add `<DeliveryStatusSection orderId={id as Id<"orders">} />` after the "Delivery address" section. Import from `@/components/delivery/DeliveryStatusSection`.

---

## File Impact Map

### Files to Create

| File | Purpose |
|---|---|
| `neumart/convex/delivery.ts` | All delivery queries and mutations |
| `neumart/components/delivery/AdminDeliverySection.tsx` | Admin delivery management UI |
| `neumart/components/delivery/DeliveryStatusSection.tsx` | Customer read-only delivery status |

### Files to Modify

| File | Change |
|---|---|
| `neumart/convex/schema.ts` | Add `deliveryTasks` table and `by_orderId` index |
| `neumart/convex/orders.ts` | Add delivery task creation to `placeOrderWithoutPayment` |
| `neumart/app/(admin)/admin/orders/[id]/page.tsx` | Add `<AdminDeliverySection>` |
| `neumart/app/(customer)/orders/[id]/page.tsx` | Add `<DeliveryStatusSection>` |

### Files NOT to Touch

| File | Reason |
|---|---|
| `neumart/convex/helpers.ts` | `assertAdmin` and `requireCurrentUser` are reused as-is — no changes |
| Any `orders`, `payments`, `products`, `stockMovements` tables | Independence rules — delivery never writes to these |

---

## Key Implementation Details

### Schema — `deliveryTasks`

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

### Status Transition Map (server-side)

```ts
const VALID_TRANSITIONS: Record<string, string[]> = {
  pending:           ["assigned", "cancelled"],
  assigned:          ["picked_up", "cancelled"],
  picked_up:         ["out_for_delivery", "cancelled"],
  out_for_delivery:  ["delivered", "failed", "cancelled"],
  delivered:         [],
  failed:            [],
  cancelled:         [],
};
```

### Atomic Delivery Task Creation in `placeOrderWithoutPayment`

After step 8 (stock deduction), add:

```ts
// 9. Create delivery task atomically — if this throws, the entire mutation fails
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

### Auth Patterns

**Admin auth** (for mutations): reuse `assertAdmin(ctx)` from `./helpers` — already resolves user from `ctx.auth` and checks `user.role === "admin"`.

**Customer auth in `getCustomerDeliveryStatus`**: look up user via `ctx.auth.getUserIdentity()` → `by_tokenIdentifier` index, then verify `deliveryTask.userId === user._id`. Return null if no match.

**`updatedBy` in mutations**: resolve the admin's `user._id` from `ctx.auth` after calling `assertAdmin`. Never accept `updatedBy` as a client argument.

### `getCustomerDeliveryStatus` — Safe Fields Only

Return only:
```ts
{
  status: task.status,
  address: { name, phone, line1, line2, landmark, city, state, pincode },
}
```

Never return: `assignedTo`, `assignedContact`, `failedReasonCode`, `failedReasonNotes`, `updatedBy`, `cancelledReason`.

### AdminDeliverySection — State Machine UI

Render the next-action button based on current status:

| Current Status | Primary Button | Secondary Option |
|---|---|---|
| pending | "Assign Delivery" (form: name required, contact optional) | — |
| assigned | "Mark as Picked Up" | "Cancel Delivery" |
| picked_up | "Mark as Out for Delivery" | "Cancel Delivery" |
| out_for_delivery | "Mark as Delivered" | "Mark as Failed" + "Cancel Delivery" |
| delivered | — (read-only) | — |
| failed | — (read-only, shows reason) | — |
| cancelled | — (read-only) | — |

---

## Pre-Development Checks

Before writing any code, verify:

- [ ] `assertAdmin` in `neumart/convex/helpers.ts` checks `user.role === "admin"` (confirmed: it does)
- [ ] `placeOrderWithoutPayment` is the only order placement mutation (confirmed: it is)
- [ ] `by_orderId` index name is not already taken in another table (confirmed: only `orderItems` uses it and that is fine — index names are scoped to their table)
- [ ] Convex dev server is running before testing

---

## Deployment Steps

1. `npx convex deploy` — deploy schema + all Convex functions
2. `npm run dev` — start Next.js dev server
3. Place a test order — verify `deliveryTasks` record appears in Convex Dashboard
4. Open Admin Order Detail — verify Delivery section visible
5. Walk through full lifecycle: Assign → Picked Up → Out for Delivery → Delivered
6. Open Customer Order Detail as customer — verify status updates in real time
7. Test Failed path with each reason including "Other" (notes required)
8. Test Cancel from each valid status
9. Verify no changes to order status, payment status, or stock after any delivery action
10. Run `tsc --noEmit` — zero type errors

---

## QA Handoff Checklist

After development is complete, confirm all of the following before marking QA-ready:

| # | Check |
|---|---|
| 1 | Delivery task created automatically when order placed |
| 2 | Admin order detail shows Delivery section |
| 3 | Admin can assign delivery person (name required, contact optional) |
| 4 | Status transitions: pending → assigned → picked_up → out_for_delivery → delivered |
| 5 | Each transition sets correct timestamp field |
| 6 | Failed delivery: requires reason, notes required for "Other" |
| 7 | Failed delivery: order/payment/stock all unchanged |
| 8 | Cancel works from: pending, assigned, picked_up, out_for_delivery |
| 9 | Cancel blocked from: delivered, failed |
| 10 | Customer sees delivery section on Order Detail (status + address only) |
| 11 | Customer does NOT see delivery person name, contact, or reason |
| 12 | Customer cannot read another customer's delivery task |
| 13 | Invalid status transitions rejected server-side |
| 14 | TypeScript typecheck passes — zero errors |

---

## G5 Gate

This dev plan requires Product Owner sign-off before development starts.

| Role | Decision | Date |
|---|---|---|
| Product Owner | — | — |

---

*Last updated: 2026-06-21*
