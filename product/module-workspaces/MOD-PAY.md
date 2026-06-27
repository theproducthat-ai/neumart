# Module Workspace: Payment Management (MOD-PAY)

> This is a visibility workspace. All objects listed here are defined in `product/objects/`. Do not duplicate object content here — link to it.

**Module Object:** [product/objects/modules/MOD-PAY.md](../objects/modules/MOD-PAY.md)

---

## Module Overview
```
module_id:         MOD-PAY
module_name:       Payment Management
domain_code:       PAY
module_status:     active
description:       Handles all financial transactions — accepting payments at checkout, processing
                   refunds, and reconciling payments with the payment gateway (Razorpay).
```

## Ownership
```
business_owner:    Finance Lead / Operations Lead
product_owner:     Product Lead
engineering_owner: Engineering Lead (review required for all PAY changes)
design_owner:      Designer
```

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-PAY-GATEWAY | Gateway Integration | Razorpay connection, payment initiation, webhook handling |
| MA-PAY-REFUND | Refunds | Refund initiation, status tracking, gateway refund |
| MA-PAY-RECONCILE | Reconciliation | Payment data reconciliation, settlement reports |

---

## Security and Compliance Notice

> All PAY module changes require Engineering Lead review. Blocking flag: `payment_change`.
> PCI compliance requirements apply to all payment data handling.
> See `product/technical-framework/SECURITY_GUARDRAILS.md` and `product/engineering/NON_FUNCTIONAL_REQUIREMENTS.md`.

---

## Features

| FEAT ID | Feature Name | Status | Priority | Owner |
|---------|-------------|--------|----------|-------|
| _(none yet)_ | | | | |

## Subfeatures

| SFE ID | Subfeature Name | Parent Feature | Status |
|--------|----------------|----------------|--------|
| _(none yet)_ | | | |

---

## Active Requests

| REQ ID | Title | Type | Priority | Status |
|--------|-------|------|----------|--------|
| _(none yet)_ | | | | |

---

## PRDs

| PRD ID | Title | Status | Version | Owner |
|--------|-------|--------|---------|-------|
| _(none yet)_ | | | | |

---

## User Stories

| US ID | Title | Feature | Status | Sprint |
|-------|-------|---------|--------|--------|
| _(none yet)_ | | | | |

---

## Open Bugs

| BUG ID | Title | Severity | Status | Assigned To |
|--------|-------|----------|--------|-------------|
| _(none yet)_ | | | | |

---

## Risks

| RISK ID | Title | Severity | Status |
|---------|-------|----------|--------|
| _(none yet)_ | | | |

---

## Linked Releases

| REL ID | Release Name | Status | Date |
|--------|-------------|--------|------|
| _(none yet)_ | | | |

---

## Metrics and KPIs

| Metric/KPI ID | Name | Current Value | Target | Status |
|---------------|------|---------------|--------|--------|
| MET-0042 | Payment Success Rate | — | TBD | Tracking |
| — | Refund Rate | — | TBD | Tracking |

---

## Roadmap Items

| RMI ID | Title | Status | Target Quarter | Priority Score |
|--------|-------|--------|----------------|----------------|
| _(none yet)_ | | | | |

---

## Support Issues

| Ticket ID | Summary | Status | Linked Feature |
|-----------|---------|--------|----------------|
| _(none yet)_ | | | |

---

## Incidents

| INC ID | Title | Severity | Date | Status |
|--------|-------|----------|------|--------|
| _(none yet)_ | | | | |

---

## Decisions

| DEC ID | Title | Status | Date |
|--------|-------|--------|------|
| — | Razorpay is the payment gateway | Accepted | — |
| — | All webhooks must be signature-verified server-side | Accepted | — |
| — | Payment state must never be trusted from client signals | Accepted | — |

---

## Designs

| Design ID | Title | Type | Status | Figma Link |
|-----------|-------|------|--------|------------|
| _(none yet)_ | | | | |

---

## APIs and Data Entities

| ID | Name | Type | Status |
|----|------|------|--------|
| — | orders.paymentStatus (Convex field) | Field | Active |
| — | razorpay webhook handler | Convex action | Active |
| — | initiatePayment | Convex mutation | Active |
| — | verifyPayment | Convex action | Active |

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-COM | Checkout is the payment entry point |
| MOD-ADM | Admin-initiated refunds |

---

## Open Questions

| # | Question | Owner | Due By |
|---|----------|-------|--------|
| 1 | Is refund flow in scope for the current release cycle? | Product Lead | TBD |
| 2 | Is payment reconciliation automated or manual at launch? | Finance Lead | TBD |

---

## Active Work

| Object Type | ID | Title | Status | Owner | Due |
|-------------|-----|-------|--------|-------|-----|
| _(none yet)_ | | | | | |

---

## Deferred Work

| DEF ID | Title | Source | Target Quarter |
|--------|-------|--------|----------------|
| _(none yet)_ | | | |

---

## Future Ideas (Parking Lot)

| PLT ID | Title | Parked Date | Promote Trigger |
|--------|-------|-------------|-----------------|
| — | UPI / wallet payment methods | — | When volume justifies |
| — | Automated settlement reconciliation | — | When Finance team is on the platform |

---

## Audit
```
workspace_created:  2026-06-24
last_updated:       2026-06-24
updated_by:         AI (Product OS structural cleanup)
```
