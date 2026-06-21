# IMPACT-0001 — Delivery Module MVP

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0001 | `04-request-management/requests/REQ-0001.md` |
| Grilling | GRILLING-0001 | `05-discovery-and-grilling/grilled-requests/GRILLING-0001.md` |
| Evaluation | EVAL-0001 | `02-roadmap/evaluations/EVAL-0001.md` |
| PRD | PRD-0001 | *(to be created after Go decision)* |

---

## Status

**Assessment Status:** Complete  
**Owner:** Product Owner  
**Date Opened:** 2026-06-21  
**Date Completed:** 2026-06-21  
**Last Updated:** 2026-06-21

---

## Current Blocker

None. All open questions resolved. No external dependencies in MVP scope. Go recommendation is clear.

---

## Next Action

Go decision from Product Owner → create PRD-0001.

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | Delivery Management |
| Sub-module | Delivery Lifecycle, Delivery Assignment |
| Secondary Modules | Customer Commerce / Orders (delivery status read on SCR-CUS-0010); Admin Console / Orders (delivery management embedded in SCR-ADM-0009) |
| Screens Impacted | SCR-CUS-0010, SCR-ADM-0009 |
| New Screens Required | No (delivery management embedded in existing admin order detail) |
| Schema Change Required | Yes — new `deliveryTasks` table |
| Payment Logic Affected | No |
| Inventory Logic Affected | No |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Impact |
|---|---|---|---|
| SCR-CUS-0010 | Customer Order Detail | `/orders/[id]` | Modified — add read-only Delivery Status section |
| SCR-ADM-0009 | Admin Order Detail | `/admin/orders/[id]` | Modified — add Delivery section: assign, status update, failed reason |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | No | None provided |
| Screenshots provided | No | None provided |
| Existing workflow / SOP | No | No delivery SOP exists |
| Excel / report / reference file | No | None |
| Email / stakeholder notes | No | None |
| Competitor references | No | Named for future reference: BigBasket, Blinkit, Zepto |
| Missing references | — | Delivery SOP, dispatch sheet |
| Assumptions due to missing references | — | Industry-standard delivery status flow used. Admin-managed model assumed for MVP. |

---

## Business Impact

**Rating:** Medium

Delivery tracking closes the most visible post-order gap: the customer currently receives no delivery visibility, and the admin has no system audit trail. Impact is operational (removes manual WhatsApp/phone tracking), experiential (customer trust), and foundational (enables all future delivery capabilities). No direct revenue impact — this is a cost and trust play, not a revenue enabler.

---

## Customer Impact

**Rating:** Positive

Customer gains a delivery status section on their Order Detail page. They can see: Pending → Assigned → Picked Up → Out for Delivery → Delivered / Failed / Cancelled. Customer does not see delivery person name or internal admin notes. No existing customer flow is broken — this is purely additive to SCR-CUS-0010.

---

## Admin Impact

**Rating:** Positive

Admin gains a structured delivery section in the Admin Order Detail page. They can create/view the delivery task, assign a delivery person (name + contact), update delivery status, and log failed delivery reasons. This replaces manual WhatsApp coordination and provides a full audit trail per order. No existing admin functionality is removed or changed.

---

## Operational Impact

**Rating:** Low

Operational change: admin must now log delivery status in the system rather than tracking via WhatsApp/phone alone. This is a new behaviour but a small change — the admin is already on the Admin Order Detail page when managing orders. No new training materials needed beyond a brief orientation to the delivery section. No new SOPs required for MVP.

---

## Technical Impact

**Rating:** Low  
**Estimated complexity:** Days (estimated 3–5 engineering days for MVP)

One new Convex table (`deliveryTasks`). One new mutation in the order placement flow. Four to six new Convex queries and mutations for delivery task management. Two existing screens modified with new UI sections. No external API integration. No new authentication or role changes. Clean, contained scope.

---

## Data / Schema Impact

**Schema change required:** Yes  
**New tables:** `deliveryTasks`  
**New fields on existing tables:** None — delivery status lives entirely in `deliveryTasks`, not in `orders`  
**New indexes:** Yes — `by_orderId` on `deliveryTasks` (to look up delivery task for a given order efficiently)  
**Migration/backfill required:** No — new table only; existing orders will not have delivery tasks (admin may create retroactively if needed, but not required)

**`deliveryTasks` schema:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `orderId` | Id\<"orders"\> | Yes | One delivery task per order. Index on this field. |
| `userId` | Id\<"users"\> | Yes | Customer who placed the order |
| `addressId` | Id\<"addresses"\> | Yes | Delivery address at time of order |
| `status` | string | Yes | Enum: pending / assigned / picked_up / out_for_delivery / delivered / failed / cancelled |
| `assignedTo` | string | No | Delivery person name |
| `assignedContact` | string | No | Delivery person phone number |
| `assignedAt` | number | No | Timestamp |
| `pickedUpAt` | number | No | Timestamp |
| `outForDeliveryAt` | number | No | Timestamp |
| `deliveredAt` | number | No | Timestamp |
| `failedAt` | number | No | Timestamp |
| `failedReasonCode` | string | No | Enum: customer_unavailable / wrong_address / customer_refused / delivery_person_unavailable / order_damaged / payment_issue / unable_to_contact / other |
| `failedReasonNotes` | string | No | Required when failedReasonCode = "other" |
| `cancelledAt` | number | No | Timestamp |
| `cancelledReason` | string | No | Optional |
| `createdAt` | number | Yes | Set at order placement |
| `updatedAt` | number | Yes | Updated on every status change |
| `updatedBy` | Id\<"users"\> | Yes | Admin who last updated |

**Note on DATA_ENTITY_MAP.md:** The existing candidate `deliveryTasks` schema in DATA_ENTITY_MAP.md uses a `deliveryPersonId` foreign key to a `deliveryPersons` table. The MVP schema replaces this with inline `assignedTo` (name) and `assignedContact` (phone) string fields — no `deliveryPersons` table is needed in MVP. DATA_ENTITY_MAP.md must be updated after PRD is approved to reflect the actual MVP schema.

---

## Backend Impact

| Function | Type | Change |
|---|---|---|
| `orders/placeOrder` (or equivalent) | Mutation | Modify — add delivery task creation at the end of order placement |
| `delivery/createDeliveryTask` | Mutation | Create — creates `deliveryTasks` record (called internally from `placeOrder`) |
| `delivery/getDeliveryTaskByOrder` | Query | Create — fetches delivery task for a given orderId |
| `delivery/assignDelivery` | Mutation | Create — admin assigns delivery person name + contact; transitions status to "assigned" |
| `delivery/updateDeliveryStatus` | Mutation | Create — admin updates status through lifecycle; validates transition rules |
| `delivery/setFailedDelivery` | Mutation | Create — admin sets status to "failed" with reason code + optional notes |
| `delivery/cancelDelivery` | Mutation | Create — admin cancels delivery task with optional reason |

**Key constraint:** `delivery/createDeliveryTask` must be called within the same Convex mutation as order placement, or the order placement mutation must guarantee delivery task creation as part of the same atomic operation. Silent failure is not acceptable (see GRILLING-0001 caveats).

---

## Frontend Impact

| File | Type | Change |
|---|---|---|
| `app/(customer)/orders/[id]/page.tsx` | Page | Modify — add DeliveryStatusSection component |
| `components/delivery/DeliveryStatusSection.tsx` | Component | Create — read-only delivery status display for customer |
| `app/(admin)/admin/orders/[id]/page.tsx` | Page | Modify — add AdminDeliverySection component |
| `components/delivery/AdminDeliverySection.tsx` | Component | Create — admin delivery assignment + status update UI |
| `components/delivery/DeliveryStatusBadge.tsx` | Component | Create — reusable status badge for 7 delivery states |
| `components/delivery/FailedDeliveryForm.tsx` | Component | Create — failed reason dropdown + optional notes input |
| `convex/delivery.ts` | Convex module | Create — all delivery queries and mutations |
| `convex/schema.ts` | Schema | Modify — add `deliveryTasks` table definition |

---

## Screen Impact

| Screen ID | Screen Name | Change |
|---|---|---|
| SCR-CUS-0010 | Customer Order Detail | Add DeliveryStatusSection below order status. Shows current delivery status label + delivery address. Read-only. |
| SCR-ADM-0009 | Admin Order Detail | Add AdminDeliverySection. Shows delivery task status. Allows admin to assign, update status, and log failed reason. |

---

## Role / Permission Impact

| Role | Change |
|---|---|
| Customer | New read capability — can view delivery status on their own order detail. No write access. |
| Admin | New write capability — can create delivery task (automatic), assign delivery person, update status, log failed reason. |
| Delivery Person | No change in MVP — role not implemented. Future candidate. |

**Authorization rules to enforce server-side:**
- `getDeliveryTaskByOrder`: customer may only query delivery task linked to their own order (`userId` must match).
- `assignDelivery`, `updateDeliveryStatus`, `setFailedDelivery`, `cancelDelivery`: admin role required. Enforce via Clerk `publicMetadata.role === "admin"` check in each mutation.

---

## Payment Impact

**Payment logic affected:** No  
**Razorpay API call required:** No  
**Webhook change required:** No  
**payments table affected:** No  
**Notes:** Delivery status changes are fully decoupled from payment. No payment-related code is touched in MVP.

---

## Inventory Impact

**Stock reduction timing affected:** No  
**stockMovements audit trail affected:** No  
**Stock reservation required:** No  
**Notes:** Delivery updates do not affect stock in any way. No inventory-related code is touched in MVP.

---

## Reporting Impact

No impact on existing dashboard stats in MVP. The Admin Dashboard (SCR-ADM-0001) currently shows order count stats and low-stock indicators — these are unchanged. Future: delivery metrics (delivered %, failed %, average delivery time) can be added to the dashboard once the `deliveryTasks` table has sufficient data. No new dashboard stats in MVP.

---

## Integration Impact

| Integration | Change |
|---|---|
| Razorpay | None |
| Clerk | None — no new roles. Admin role check reused as-is. |
| Convex | New `deliveryTasks` table in schema. New queries and mutations in `convex/delivery.ts`. Modification to order placement mutation. |

---

## Security / Compliance Impact

**Authentication change:** No  
**Authorization change:** Yes — two new access patterns must be enforced server-side  
**Sensitive data exposed:** Low risk  
**Compliance implication:** No  

**Authorization details:**
1. Customers must only see delivery tasks for their own orders. The `getDeliveryTaskByOrder` query must verify `deliveryTask.userId === authenticatedUserId`. Never fetch by orderId alone without verifying ownership.
2. All write mutations (assign, update status, failed reason, cancel) must verify `role === "admin"` server-side. Not client-gated only.

**PII note:** `assignedTo` (delivery person name) and `assignedContact` (phone number) are stored on `deliveryTasks`. This data is not exposed to customers in MVP. Admin-only. No additional compliance implications in MVP.

---

## QA Impact

**Estimated test scenarios:** 18  
**Existing regression tests affected:** Yes — order placement flow must be tested to confirm delivery task is created correctly

**Key test scenarios:**
1. Order placed → delivery task auto-created with status = Pending
2. Order placed → delivery task linked to correct orderId, userId, addressId
3. Admin assigns delivery person → status = Assigned, name + contact saved
4. Admin updates status through full happy path lifecycle
5. Admin attempts invalid status transition → rejected with error
6. Admin sets status = Failed with no reason → blocked
7. Admin sets status = Failed with reason = "other" and no notes → blocked
8. Admin sets status = Failed with reason + notes → saved correctly
9. Customer views order detail → delivery status section visible
10. Customer views order detail → delivery person name NOT visible
11. Customer cannot access another customer's delivery task
12. Admin sets status = Failed → order status unchanged
13. Admin sets status = Failed → stock unchanged
14. Admin sets status = Failed → payment status unchanged
15. Admin sets status = Delivered → timestamps saved correctly
16. Admin cancels delivery → status = Cancelled, order status unchanged
17. Order placed, delivery task creation fails → error surfaced (not silent)
18. Admin views order without delivery task → delivery section shows appropriate empty state

---

## UAT Impact

**UAT scenarios required:** 5  
**Estimated UAT duration:** 1–2 hours

**Key UAT scenarios:**
1. Place a test order → confirm delivery section appears on both customer and admin order detail
2. Admin: assign delivery person → customer sees status update
3. Admin: walk delivery through full lifecycle to Delivered
4. Admin: mark delivery as Failed, select reason, confirm customer sees "Delivery Failed" only
5. Confirm order status, stock, and payment status are all unchanged after delivery status updates

---

## Release Impact

**Environment variables required:** No  
**Schema migration required:** Yes — new `deliveryTasks` table (Convex handles schema migration automatically via `npx convex deploy`)  
**Deployment window needed:** No — additive-only change. No existing table modified. No data backfill.  
**Notes:** Order placement mutation change must be tested in development before deployment. Convex schema push will auto-create the new table. No manual migration script needed.

---

## Rollback Complexity

**Rating:** Simple

**Rollback plan:**
1. Revert `convex/schema.ts` to remove `deliveryTasks` table definition.
2. Revert `convex/delivery.ts` (delete the file).
3. Revert the `placeOrder` mutation to remove delivery task creation call.
4. Revert frontend changes to SCR-CUS-0010 and SCR-ADM-0009 (remove delivery sections).
5. Run `npx convex deploy` — Convex will drop the `deliveryTasks` table (if empty) or leave it harmlessly if data exists.

**Risk:** Since `deliveryTasks` is a new table with no foreign key constraints touching existing tables (it references `orders` one-way), rollback does not affect any existing data. The `orders`, `payments`, `stockMovements`, and `users` tables are all untouched.

---

## Risk Score

| Dimension | Score (1–10) | Rationale |
|---|---|---|
| Technical complexity | 2 | One new table, six new functions, two screen modifications. Clean, contained. |
| Schema change risk | 2 | Additive-only. New table. No existing table modified. Convex handles migration automatically. |
| Payment integrity risk | 1 | No payment logic touched. Delivery is fully decoupled from payment. |
| Inventory integrity risk | 1 | No inventory logic touched. Delivery updates do not affect stock. |
| User experience risk | 2 | Purely additive to existing screens. No existing functionality removed or changed. |
| Rollback difficulty | 2 | Simple revert. New table only. No cascading changes to existing schema. |
| **Overall Risk Score** | **1.7 / 10** | Very low risk. This is a contained, additive module with no payment, stock, or integration dependencies. |

---

## Go / No-Go / Split Recommendation

**Recommendation:** Go

**Reasoning:** Overall risk score is 1.7/10 — the lowest possible for a schema change. The MVP is purely additive: one new Convex table, six new functions, two existing screens extended. No payment logic, no inventory logic, no external APIs, no new authentication roles are involved. Three explicit independence rules (no order status change, no payment change, no stock change) eliminate the three highest-risk cross-cutting concerns. Authorization requirements are clear and straightforward (server-side ownership check for customers; admin role check for all writes). The rollback plan is simple. No blockers exist.

**Conditions / caveats before PRD:**
1. Delivery task creation must be atomic with order placement — implemented as part of the same Convex mutation, not as a separate fire-and-forget call.
2. Status transition validation must be enforced in the Convex mutation (`updateDeliveryStatus`), not only in the frontend.
3. Customer authorization check in `getDeliveryTaskByOrder` must verify `deliveryTask.userId === ctx.user._id` server-side.
4. `failedReasonCode` should be defined as a Convex schema union/literal type, not a raw string, to enforce valid values at the schema level.
5. DATA_ENTITY_MAP.md must be updated after PRD approval to reflect the actual MVP `deliveryTasks` schema (replacing the candidate schema's `deliveryPersonId` FK with inline name/contact fields).

---

*Last updated: 2026-06-21*
