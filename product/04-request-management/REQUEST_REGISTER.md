# Nuemart — Request Register

This is the master register for all incoming requests. Every feature request, bug report, operational change and external reference must be entered here. Nothing is worked on without an entry.

---

## Rules

- Every new request must be added here before any work begins.
- Every status change must update **Last Updated**, **Current Status** and **Next Action**.
- Any blocked request must have **Current Blocker** populated.
- Released, Parked, Rejected and Cancelled requests remain visible for traceability.
- IDs are assigned from `MASTER_REGISTRY.md` — never manually or out of sequence.

---

## Valid Statuses

`New` → `Reference Pending` → `Under Classification` → `Under Grilling` → `Under Evaluation` → `Under Impact Assessment` → `Approved for PRD` → `PRD Created` → `Stories Created` → `Development Planned` → `Build Prompt Created` → `In Development` → `Dev Blocked` → `Ready for QA` → `QA Failed` → `QA Passed` → `Ready for UAT` → `UAT Failed` → `UAT Passed` → `Ready for Release` → `Released`

Terminal: `Parked` | `Rejected` | `Cancelled`

---

## Register

| Request ID | Date Created | Last Updated | Aging Days | Title | Request Type | Primary Module | Sub-module | Current Status | Priority | Owner | Current Blocker | Next Action | Linked Evaluation | Linked PRD | Linked Stories | Linked Dev Plan | Linked Release | Notes |
|---|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| REQ-0001 | 2026-06-21 | 2026-06-21 | 1 | Delivery Module — MVP | Feature | Delivery Management | Delivery Lifecycle / Delivery Assignment | Ready for QA | P2 | Product Owner | None | QA per DEVPLAN-0001 checklist | EVAL-0001 | PRD-0001 | US-0001 to US-0008 | DEVPLAN-0001 | — | Build complete. npx convex deploy required before testing. |
| REQ-0002 | 2026-06-22 | 2026-06-23 | 1 | Image Carousel at Top of Product Listing Page | Feature | Customer Commerce | Product Listing | Ready for Release | P3 | Product Owner | None | Run `/product-release REQ-0002` | — | PRD-0002 | US-0009 to US-0014 | DEVPLAN-0002 | — | UAT-0001 Conditional Pass signed off 2026-06-23. Condition: replace placeholder images before go-live. |
| REQ-0003 | 2026-06-23 | 2026-06-23 | 0 | Product Card Price Alignment | Enhancement | Customer Commerce | Product Listing | Ready for QA | P3 | Product Owner | None | QA per DEVPLAN-0003 checklist | — | — | — | DEVPLAN-0003 | — | UI/UX: mt-auto/pt-2 removed from price wrapper in product-card.tsx. Build complete. |
| REQ-0004 | 2026-06-23 | 2026-06-23 | 0 | Favourite Icon Repositioned as Product Image Overlay | Enhancement | Customer Commerce | Product Listing | Ready for UAT | P3 | Product Owner | None | Run UAT-0002 | — | — | — | DEVPLAN-0004 | — | QA-0002 Passed 2026-06-23. Heart icon overlay confirmed. Ready for UAT sign-off. |

---

## Request Type Reference

| Type | When to use |
|---|---|
| Feature | New capability not currently in the app |
| Enhancement | Improvement to an existing feature |
| Bug | Something working incorrectly |
| Operational | Infrastructure, config, deployment change |
| Research | Investigation or spike with no guaranteed output |
| Data | Seed data, migration, data fix |
| Documentation | Docs, runbooks, spec updates |

---

## Priority Reference

| Priority | Meaning |
|---|---|
| P0 | Blocking — production down or checkout broken |
| P1 | Critical — revenue or core flow impacted |
| P2 | High — important, plan for next cycle |
| P3 | Medium — useful, plan when capacity allows |
| P4 | Low — nice to have, park if capacity is tight |

---

*Last updated: 2026-06-21*
