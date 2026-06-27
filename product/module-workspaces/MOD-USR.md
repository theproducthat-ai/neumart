# Module Workspace: User Management (MOD-USR)

> This is a visibility workspace. All objects listed here are defined in `product/objects/`. Do not duplicate object content here — link to it.

**Module Object:** [product/objects/modules/MOD-USR.md](../objects/modules/MOD-USR.md)

---

## Module Overview
```
module_id:         MOD-USR
module_name:       User Management
domain_code:       USR
module_status:     active
description:       Handles identity, authentication, authorisation, and user profiles across all
                   Neumart user types — customers, admins, and delivery partners. Powered by Clerk.
```

## Ownership
```
business_owner:    Operations Lead
product_owner:     Product Lead
engineering_owner: Engineering Lead (security review required for all USR changes)
design_owner:      Designer
```

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-USR-AUTH | Authentication | Sign in, sign up, session management (Clerk) |
| MA-USR-PROFILE | Profile | Customer profile, preferences, notification settings |
| MA-USR-ADDRESS | Address Book | Saved delivery addresses, set default |
| MA-USR-ROLES | Role Management | Role assignment, permission scoping (admin, delivery, customer) |

---

## Security Notice

> USR module changes require Engineering Lead review.
> Role changes: blocking flag `role_change`.
> Auth changes: blocking flag `security_change`.
> Authentication is powered by **Clerk**. User identity changes must be tested against Clerk's API.

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
| REQ-0007 | Customer QR profile | Feature | — | Released |

---

## PRDs

| PRD ID | Title | Status | Version | Owner |
|--------|-------|--------|---------|-------|
| _(none yet formalized)_ | | | | |

---

## User Stories

| US ID | Title | Feature | Status | Sprint |
|-------|-------|---------|--------|--------|
| _(none yet in V2 format)_ | | | | |

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
| — | User registration rate | — | TBD | Tracking |
| — | Auth success rate | — | TBD | Tracking |
| — | Session error rate | — | TBD | Tracking |

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
| — | Clerk is the authentication provider | Accepted | — |
| — | userId must never be passed from frontend | Accepted | — |
| — | All role checks enforced server-side in Convex | Accepted | — |

---

## Designs

| Design ID | Title | Type | Status | Figma Link |
|-----------|-------|------|--------|------------|
| _(none yet)_ | | | | |

---

## APIs and Data Entities

| ID | Name | Type | Status |
|----|------|------|--------|
| — | Clerk user identity | External (Clerk) | Active |
| — | getUserIdentity() | Convex server-side auth | Active |
| — | users (Convex) | Table | Active |

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| All modules | Every module requires user identity and auth checks |

---

## Open Questions

| # | Question | Owner | Due By |
|---|----------|-------|--------|
| 1 | Are delivery partner profiles stored in Clerk or Convex? | Engineering Lead | TBD |
| 2 | Is multi-factor authentication required for admin users? | Operations Lead | TBD |

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
| — | Social login (Google/Apple) | — | Customer demand |
| — | Admin 2FA enforcement | — | Security policy update |

---

## Audit
```
workspace_created:  2026-06-24
last_updated:       2026-06-24
updated_by:         AI (Product OS structural cleanup)
```
