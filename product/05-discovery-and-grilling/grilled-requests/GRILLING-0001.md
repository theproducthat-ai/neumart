# GRILLING-0001 — Delivery Module

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0001 | `04-request-management/requests/REQ-0001.md` |
| Evaluation | EVAL-0001 | *(to be created — evaluation required before PRD)* |
| PRD | PRD-0001 | *(populated after PRD is written)* |

---

## Status

**Grilling Status:** Complete  
**Owner:** Product Owner  
**Date Opened:** 2026-06-21  
**Date Completed:** 2026-06-21  
**Last Updated:** 2026-06-21

---

## Current Blocker

None. Reference material is missing but not blocking — grilling can proceed with documented assumptions. No external service dependencies in MVP scope.

---

## Next Action

Proceed to module evaluation (EVAL-0001). This is a New Module Candidate — evaluation required before PRD. Product Owner to confirm evaluation proceeds.

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | Delivery Management |
| Sub-module | Delivery Lifecycle (MVP); Delivery Assignment (MVP) |
| Secondary Modules | Customer Commerce / Orders (delivery status visible on order detail); Admin Console / Orders (delivery assignment in admin order detail) |
| Classification | New Module Candidate |
| Classification Confidence | High (scope confirmed in grilling) |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Impact Type |
|---|---|---|---|
| SCR-CUS-0010 | Order Detail | `/orders/[id]` | Modified — add delivery status section |
| SCR-ADM-0009 | Admin Order Detail | `/admin/orders/[id]` | Modified — add delivery assignment section and status update |
| — | Admin Delivery List | `/admin/delivery` (proposed) | New — may be deferred if delivery section embedded in order detail |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | No | None provided |
| Screenshots provided | No | None provided |
| Existing workflow / SOP | No | No existing delivery SOP. Manual process today with no system tracking. |
| Excel / report / reference file | No | None provided |
| Email / stakeholder notes | No | None provided |
| Competitor references | No | Named for future reference only: BigBasket, Blinkit, Zepto, Swiggy Instamart, Amazon Fresh |
| Missing references | — | Delivery SOP, WhatsApp workflow, manual dispatch sheet, store delivery process |
| Assumptions due to missing references | — | 1. Grocery delivery context assumed. 2. Industry-standard delivery status flow used (Pending → Assigned → Picked Up → Out for Delivery → Delivered / Failed / Cancelled). 3. No automated notifications needed in MVP. 4. No ETA or time-window tracking in MVP. |

---

## Problem Clarity

**Problem in one sentence:**

After placing an order, neither the customer nor the admin has any system visibility into whether the order is being prepared, assigned to a delivery person, out for delivery, or delivered.

**Who experiences this problem:**

Both — Customer (no delivery status visibility) and Admin (no delivery management tool).

**Frequency:**

Daily — every order placed requires delivery. This gap affects every fulfilled order.

**Cost of not solving:**

Operational friction: admin tracks delivery manually with no system record. Customer experience gap: customers have no post-order visibility, leading to support contacts and trust issues. No audit trail for failed deliveries or disputes.

**Current workaround:**

No system workaround. Admin tracks delivery via phone calls, WhatsApp, or verbal communication. Customer has no visibility at all — they may call the store to ask about their order.

---

## User Roles

| Role | How they interact with this feature |
|---|---|
| Customer | Views delivery status on their Order Detail page (SCR-CUS-0010). Read-only. |
| Admin | Creates delivery task for an order, assigns a delivery person (name + contact), updates delivery status, captures failed delivery reason. |
| Delivery Person | Not a system actor in MVP. Admin acts on their behalf. Future phase: delivery person logs in via a mobile interface to update status. |

---

## Current Flow

1. Customer places an order.
2. Admin sees order in admin order list.
3. Admin calls or messages a delivery person via phone/WhatsApp to arrange delivery.
4. Delivery person picks up and delivers — no system record.
5. Admin manually updates order status (e.g. to "Delivered") with no delivery-specific data.
6. Customer has no visibility into what happened.

---

## Proposed Future Flow (MVP)

**Happy path — Admin side:**

1. Admin opens an order in Admin Order Detail (SCR-ADM-0009).
2. Admin sees a Delivery section with status "Pending".
3. Admin enters delivery person name and contact number.
4. Admin clicks Assign — delivery task status updates to "Assigned".
5. Admin updates status to "Picked Up" when delivery person collects the order.
6. Admin updates status to "Out for Delivery" when delivery is en route.
7. Admin updates status to "Delivered" on confirmation.

**Happy path — Customer side:**

1. Customer opens Order Detail (SCR-CUS-0010).
2. Customer sees a Delivery Status section showing current status (e.g. "Out for Delivery").
3. Status updates in real time as admin updates it.

**Failure paths:**

- If delivery fails: Admin updates status to "Failed", enters a failed delivery reason (e.g. "Customer not available", "Wrong address", "Refused delivery"). Reason stored on the delivery task.
- If admin cancels delivery: Admin updates status to "Cancelled".
- If admin has not yet assigned: status shows "Pending" to both admin and customer.

---

## Business Rules

| # | Rule |
|---|---|
| BR-1 | Delivery status is independent of order status. Updating delivery status does NOT change order status. |
| BR-2 | Delivery updates do NOT affect stock. No inventory change on any delivery status update. |
| BR-3 | Delivery updates do NOT affect payment status. Payment state is unchanged by delivery events. |
| BR-4 | Admin is the only actor who can assign or update a delivery task in MVP. |
| BR-5 | Each order has at most one delivery task. |
| BR-6 | A delivery task is created automatically when an order is successfully placed. Default status = Pending. |
| BR-7 | Delivery task creation must not change stock beyond existing order placement stock deduction. |
| BR-8 | Delivery task creation must not change payment status. |
| BR-9 | A failed delivery reason (from fixed dropdown) is required when status is set to "Failed". |
| BR-10 | If the failed reason selected is "Other", notes are mandatory. Notes are optional for all other reasons. |
| BR-11 | Failed delivery does NOT automatically cancel the order, change payment status, or restock inventory. |
| BR-12 | Delivery person assignment is by name and contact number only in MVP. No user account or login required for delivery person in MVP. |
| BR-13 | Valid delivery status transitions: Pending → Assigned → Picked Up → Out for Delivery → Delivered OR Failed OR Cancelled. |
| BR-14 | Delivery module schema must support all three business models (admin-managed, own staff, third-party) in data design. No MVP assumption should prevent future model expansion. |
| BR-15 | Customer sees delivery status and delivery address only. Customer does NOT see delivery person name, phone, internal notes, or admin-only failed reason text. |

---

## Data Fields

**New Convex table: `deliveryTasks`**

| Field | Type | Required | Notes |
|---|---|---|---|
| `orderId` | Id\<"orders"\> | Yes | One delivery task per order |
| `userId` | Id\<"users"\> | Yes | Customer who placed the order |
| `addressId` | Id\<"addresses"\> | Yes | Delivery address at time of order |
| `status` | string (enum) | Yes | Pending / Assigned / Picked Up / Out for Delivery / Delivered / Failed / Cancelled |
| `assignedTo` | string | No | Delivery person name |
| `assignedContact` | string | No | Delivery person phone number |
| `assignedAt` | number (timestamp) | No | When assignment was made |
| `pickedUpAt` | number (timestamp) | No | When order was picked up |
| `outForDeliveryAt` | number (timestamp) | No | When out for delivery |
| `deliveredAt` | number (timestamp) | No | When delivered |
| `failedAt` | number (timestamp) | No | When failure recorded |
| `failedReasonCode` | string (enum) | No | Required when status = Failed. One of: customer_unavailable / wrong_address / customer_refused / delivery_person_unavailable / order_damaged / payment_issue / unable_to_contact / other |
| `failedReasonNotes` | string | No | Required when failedReasonCode = other. Optional for all other codes. |
| `cancelledAt` | number (timestamp) | No | When cancelled |
| `cancelledReason` | string | No | Optional cancellation note |
| `createdAt` | number (timestamp) | Yes | Task creation time — set automatically at order placement |
| `updatedAt` | number (timestamp) | Yes | Last status change time |
| `updatedBy` | Id\<"users"\> | Yes | Admin who last updated |

**Existing tables affected:**

- `orders` — read by delivery module to link delivery task; no new fields on `orders` required (delivery status lives in `deliveryTasks`)

---

## Validations

| Field | Validation Rule | Error Message |
|---|---|---|
| `status` | Must be one of 7 valid enum values | Invalid delivery status |
| `failedReasonCode` | Required when status = "Failed" | Please select a failed delivery reason |
| `failedReasonNotes` | Required when failedReasonCode = "other" | Please add notes when selecting "Other" as the reason |
| `assignedTo` | Required when status = "Assigned" | Delivery person name is required before assigning |
| `assignedContact` | Optional but recommended when status = "Assigned" | — |
| Status transitions | Must follow valid progression (see BR-13) | Cannot set delivery to "[status]" from current status "[current]" |
| Delivery task | Only one delivery task per order allowed | A delivery task already exists for this order |

---

## Edge Cases

| Edge Case | Expected Behaviour |
|---|---|
| Admin tries to update delivery status out of sequence | Server-side validation rejects invalid transition. Error shown: "Cannot set delivery to [X] from current status [Y]." |
| Admin tries to mark as Failed without selecting a reason | Form validation blocks submission. failedReasonCode is required. |
| Admin selects "Other" as failed reason without adding notes | Form validation blocks submission. failedReasonNotes is required when code = "other". |
| Customer views order where delivery is Failed | Status shown as "Delivery Failed" with no reason details shown to customer. Admin-only reason is hidden from customer view. |
| Customer views order where delivery is Cancelled | Status shown as "Delivery Cancelled" with no further detail in MVP. |
| Admin assigns same delivery person name to multiple orders | Allowed in MVP — no concurrency, capacity, or uniqueness tracking. |
| Order is cancelled before delivery task is assigned | Delivery task remains Pending. Admin should manually set delivery status to Cancelled for completeness. No automatic cancellation in MVP. |
| Delivery task is marked Failed — what happens to order? | Nothing. Failed delivery does NOT change order status, payment status, or stock. Admin handles follow-up manually. |
| Order placed but delivery task creation fails | This is a critical failure. The Convex mutation that creates the delivery task should be part of the same order placement transaction, or a compensating action must be triggered. Must not silently fail. |

---

## Reporting and Visibility

- [x] Admin needs a summary view: Delivery status visible on Admin Order Detail (SCR-ADM-0009). No separate delivery report in MVP.
- [x] Customer needs status visibility: Delivery status section on Customer Order Detail (SCR-CUS-0010).
- [x] Audit trail required: All status changes timestamped on `deliveryTasks`. `updatedBy` field records which admin made each change.
- [ ] Dashboard stat affected: Not in MVP — delivery stats (delivered %, failed %) deferred to future reporting.
- [ ] Export needed: Not in MVP.

---

## Permissions

| Action | Allowed Roles |
|---|---|
| Create delivery task | Admin only |
| Assign delivery person | Admin only |
| Update delivery status | Admin only |
| View delivery status | Customer (own order only), Admin (all orders) |
| View failed delivery reason | Admin only in MVP |
| Cancel delivery task | Admin only |

---

## Dependencies

| Dependency | Status | Blocks This? |
|---|---|---|
| Delivery person role and login | Not built — Future Candidate | No — MVP uses admin-managed model only |
| Third-party delivery API | Not built — Future Candidate | No — not in MVP scope |
| Razorpay integration | Pending (Phase 11) | No — delivery updates do not touch payment |
| Automated customer notifications (SMS/WhatsApp/email) | Not built — Future Candidate | No — not in MVP scope |

---

## Screens Impacted

| Screen ID | Screen Name | Change Required |
|---|---|---|
| SCR-CUS-0010 | Customer Order Detail | Add delivery status section — shows current delivery status to customer. Read-only. |
| SCR-ADM-0009 | Admin Order Detail | Add delivery section — assign delivery person, update status, capture failed reason. |
| — (proposed) | Admin Delivery List | Optional new screen `/admin/delivery` — may be deferred if delivery management is embedded entirely in order detail. To be decided at PRD stage. |

---

## Acceptance Criteria

- [ ] Given an order is successfully placed, then a delivery task is automatically created with status = "Pending", linked to orderId, userId, and addressId.
- [ ] Given a delivery task is created, when admin opens Admin Order Detail, then a Delivery section is visible showing current status "Pending".
- [ ] Given a delivery task is in "Pending" status, when admin enters a delivery person name and clicks Assign, then status updates to "Assigned" and name/contact are saved.
- [ ] Given a delivery task exists, when admin updates the status, then the new status is saved with a timestamp and the updatedBy admin's user ID.
- [ ] Given a delivery task is "Assigned" or later, when customer opens Order Detail, then a Delivery Status section displays the current status and delivery address. Delivery person name is NOT shown.
- [ ] Given admin sets status to "Failed", when no reason is selected from the dropdown, then the form is blocked and "Please select a failed delivery reason" is shown.
- [ ] Given admin sets "Failed" reason as "Other" with no notes, then the form is blocked and notes are required.
- [ ] Given admin sets "Failed" reason with a valid reason, when saved, then reason is stored on the delivery task and visible to admin on order detail. Customer sees "Delivery Failed" with no reason text.
- [ ] Given delivery status is set to "Failed", then order status is unchanged, stock levels are unchanged, and payment status is unchanged.
- [ ] Given any delivery status update, then order status is unchanged, stock levels are unchanged, and payment status is unchanged.
- [ ] Given delivery task creation fails at order placement, then the failure is surfaced — the system does not silently skip delivery task creation.

---

## Open Questions

All open questions resolved on 2026-06-21.

| # | Question | Answer | Resolved |
|---|---|---|---|
| 1 | Should a delivery task be created automatically when an order is placed, or manually by admin? | **Automatically on successful order placement.** Default status = Pending. Links to orderId, userId, addressId. Future exception: if pickup/self-collection is added, depends on fulfilment type. | 2026-06-21 |
| 2 | Should admin have a standalone `/admin/delivery` list view, or is embedding in order detail sufficient? | **Embed in Admin Order Detail (SCR-ADM-0009) for MVP.** No standalone `/admin/delivery` screen in MVP. Future phase when delivery volume increases or bulk/rider management is needed. | 2026-06-21 |
| 3 | Should the customer see the delivery person's name, or status only? | **Status only in MVP.** Customer sees: delivery status, delivery address, basic progress label, failed status if applicable. Customer does NOT see delivery person name, phone, internal notes, or admin-only failed reason detail. | 2026-06-21 |
| 4 | Should "Failed" reason be a free-text field or a fixed dropdown? | **Fixed dropdown + optional notes.** Options: Customer unavailable / Wrong address / Customer refused delivery / Delivery person unavailable / Order damaged / Payment issue / Unable to contact customer / Other. If reason = Other, notes are mandatory. Notes optional for all other reasons. | 2026-06-21 |

---

## Suggested MVP Boundary

**Include in Delivery MVP:**

- `deliveryTasks` Convex table with fields: orderId, userId, addressId, status (7 states), assignedTo, assignedContact, timestamps per state, failedReasonCode (enum), failedReasonNotes, updatedBy
- Automatic delivery task creation (status = Pending) as part of order placement mutation
- Admin: assign delivery person (name + contact) to a task — embedded in SCR-ADM-0009
- Admin: update delivery status through 7-state lifecycle — embedded in SCR-ADM-0009
- Admin: capture failed delivery reason (fixed dropdown, 8 options) + optional notes (mandatory if "Other")
- Customer: view delivery status and delivery address on SCR-CUS-0010 — status label only, no delivery person name
- Failed delivery: does NOT change order status, payment status, or stock

**Defer to later iteration:**

- Standalone admin delivery list screen `/admin/delivery` — evaluate after MVP ships
- Delivery person login and mobile self-service status updates
- Automated customer notifications (SMS, WhatsApp, email)
- OTP / photo / signature proof of delivery
- Third-party delivery partner API integration
- Live map tracking
- Delivery fee calculation
- Delivery SLA monitoring and reporting
- Delivery route optimisation
- Failed delivery retry / reassignment / cancellation workflows
- Pickup / self-collection fulfilment type (determines whether delivery task is created)

---

## Status After Grilling

- [x] Grilling complete — proceed to Evaluation
- [ ] Grilling complete — proceed directly to PRD
- [ ] Grilling incomplete — blocked on open questions
- [ ] Grilling complete — request should be Parked
- [ ] Grilling complete — request should be Rejected

---

## Grilling Summary

The Delivery Module is fully grilled and scoped. This is a New Module Candidate with no existing code. All four open questions have been resolved: delivery tasks are created automatically at order placement; delivery management is embedded in Admin Order Detail (no standalone screen in MVP); the customer sees delivery status only (not delivery person name); and failed delivery reasons use a fixed 8-option dropdown with mandatory notes when "Other" is selected. The schema design (deliveryTasks with orderId, userId, addressId, 7-state lifecycle, failedReasonCode enum) is confirmed. Three firm independence rules are in place: delivery updates do not affect order status, payment status, or stock. No external service integrations are required. Grilling is complete. All open questions are resolved. No blockers remain. The recommended next step is module evaluation (EVAL-0001), required for all New Module Candidates before PRD is written.

---

*Last updated: 2026-06-21*
