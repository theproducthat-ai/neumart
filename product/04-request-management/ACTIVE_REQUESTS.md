# Nuemart — Active Requests

This file is a live view of all non-final requests from `REQUEST_REGISTER.md`. It is organized by stage, not by ID. Final statuses (Released, Parked, Rejected, Cancelled) do not appear here.

**This file is a summary view only. The source of truth is `REQUEST_REGISTER.md`.**

Update both files whenever a request changes status.

---

## New / Reference Pending

> Requests just received, awaiting references or initial classification.

*No active requests in this stage.*

---

## Under Classification

> Requests being classified by module, type and priority.

*No active requests in this stage.*

---

## Under Grilling

> Requests being questioned for clarity, feasibility and completeness before evaluation begins.

*No active requests in this stage.*

---

## Under Evaluation

> Requests with an active EVAL document being scored for effort, impact and strategic fit.

*No active requests in this stage.*

---

## Under Impact Assessment

> Approved requests being assessed for cross-module impact before PRD is written.

*No active requests in this stage.*

---

## Approved for PRD

> Requests approved and waiting for a PRD to be written.

*No active requests in this stage.*

---

## PRD Created

> PRD written, waiting for user stories to be created.

*No active requests in this stage.*

---

## Stories Created

> User stories written, waiting for development planning.

*No active requests in this stage.*

---

## Development Planned

> Development plan written, waiting for build to start.

*No active requests in this stage.*

---

## Build Prompt Created

> Coding prompt written, ready for a developer to execute.

| REQ ID | PRD ID | DEVPLAN ID | Title | Next Action |
|---|---|---|---|---|
| REQ-0007 | PRD-0004 | DEVPLAN-0006 | Customer Profile QR Code for Store Identification | Execute DEVPLAN-0006-coding-prompt.md |
| REQ-0008 | — | DEVPLAN-0007 | Category Icons on Product Listing Filter Pills | Run QA per DEVPLAN-0007 checklist |

---

## In Development

> Actively being built.

*No active requests in this stage.*

---

## QA / UAT / Release Pending

> Build complete, in testing or release pipeline.

| REQ ID | PRD ID | Dev Plan | Title | Next Action |
|---|---|---|---|---|
| REQ-0001 | PRD-0001 | DEVPLAN-0001 | Delivery Module — MVP | Run `npx convex deploy` → QA per DEVPLAN-0001 checklist |
| REQ-0002 | PRD-0002 | DEVPLAN-0002 | Image Carousel at Top of Product Listing Page | RELEASE-0001 created — deploy per RELEASE-0001.md, confirm when live |
| REQ-0003 | — | DEVPLAN-0003 | Product Card Price Alignment | QA per DEVPLAN-0003 checklist |
| REQ-0004 | — | — | Favourite Icon Repositioned as Product Image Overlay | ✅ QA-0002 Passed — run UAT-0002 for business sign-off |
| REQ-0005 | PRD-0003 | DEVPLAN-0005 | Allergen and Ingredient Details for Each Product | Run QA per DEVPLAN-0005 checklist |

---

## Blocked Requests

> Requests stalled due to a blocker. Blocker must be documented in `REQUEST_REGISTER.md`.

*No blocked requests.*

---

*Last updated: 2026-06-21*
