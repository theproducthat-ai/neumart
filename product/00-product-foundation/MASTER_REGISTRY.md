# Nuemart — Master ID Registry

This file is the single source of truth for all tracked object IDs across the Product OS. Every ID type has exactly one sequence. IDs are never reused.

---

## ID Registry

| Type | Purpose | Last Used ID | Next ID | Notes |
|---|---|---|---|---|
| REQ | Feature / change / bug requests | 0002 | 0003 | All incoming requests |
| EVAL | Evaluation documents | 0001 | 0002 | One per request under evaluation |
| PRD | Product requirement documents | 0002 | 0003 | One per approved feature |
| US | User stories | 0014 | 0015 | Multiple per PRD |
| DEVPLAN | Development plans | 0002 | 0003 | One per PRD or story set |
| QA | QA test records | 0001 | 0002 | One per release or feature |
| UAT | UAT sign-off records | 0001 | 0002 | One per release |
| REL | Release records | 0000 | 0001 | One per production release |
| SCR-CUS | Customer-facing screen registry | 0010 | 0011 | Storefront screens — 0001 to 0010 assigned in Phase 2 Product OS setup |
| SCR-ADM | Admin screen registry | 0011 | 0012 | Admin panel screens — 0001 to 0011 assigned in Phase 2 Product OS setup |
| SCR-INV | Inventory screen registry | 0000 | 0001 | Stock / inventory screens — not yet used (inventory screens are under SCR-ADM) |
| SCR-ORD | Order screen registry | 0000 | 0001 | Order flow screens (customer + admin) — not yet used (order screens are under SCR-CUS and SCR-ADM) |
| SCR-PAY | Payment screen registry | 0000 | 0001 | Checkout and payment screens — not yet used (checkout is SCR-CUS-0008) |
| SCR-DEL | Delivery screen registry | 0000 | 0001 | Delivery tracking screens (post-MVP) |
| SCR-AUTH | Authentication screen registry | 0002 | 0003 | Sign-in, sign-up screens — 0001 to 0002 assigned in Phase 2 Product OS setup |

---

## Rules

1. **Always check this file before generating any new ID.** Read the current Next ID, use it, then update Last Used ID and Next ID in this table.
2. **Never ask the user to manually provide an ID.** The system generates all IDs from this registry.
3. **Update this file immediately after creating any tracked object.** Do not batch updates.
4. **If a duplicate or ambiguity is found, stop and ask before proceeding.** Never silently overwrite.
5. **IDs are never recycled.** A deleted or cancelled request keeps its ID. The sequence only moves forward.
6. **Format is TYPE-NNNN.** Example: `REQ-0001`, `EVAL-0003`, `SCR-CUS-0002`.
7. **Zero-padding is always 4 digits.** `REQ-0001` not `REQ-1`.

---

## Format Reference

```
REQ-0001       First feature request
EVAL-0001      First evaluation
PRD-0001       First product requirement document
US-0001        First user story
DEVPLAN-0001   First development plan
QA-0001        First QA record
UAT-0001       First UAT sign-off
REL-0001       First release record
SCR-CUS-0001   First customer screen
SCR-ADM-0001   First admin screen
SCR-INV-0001   First inventory screen
SCR-ORD-0001   First order screen
SCR-PAY-0001   First payment screen
SCR-DEL-0001   First delivery screen
SCR-AUTH-0001  First auth screen
```

---

*Last updated: 2026-06-21 — Phase 2 Product OS setup: SCR-CUS-0001 to SCR-CUS-0010, SCR-ADM-0001 to SCR-ADM-0011, SCR-AUTH-0001 to SCR-AUTH-0002 assigned. See SCREEN_REGISTRY.md in 01-product-architecture for full details.*
