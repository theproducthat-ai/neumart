# Nuemart Product OS — Migration from Legacy System

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

This file documents the migration from the legacy folder/registry/document-based Product OS (in `product/00-product-foundation/` through `product/99-operating-system/`) to the new enterprise object-centric Product OS (in `product/os/`, `product/objects/`, `product/graph/`, `product/views/`).

---

## 1. What Changed

### Old System
- Organized around numbered folders (00 through 99)
- Registries (`MASTER_REGISTRY.md`, `REQUEST_REGISTER.md`, `SCREEN_REGISTRY.md`) as source of truth
- Documents as primary artifacts (`PRD-0001.md`, `REQ-0001.md`)
- Generic numeric IDs (`REQ-0001`, `PRD-0001`, `US-0001`)
- Governance rules in `product/99-operating-system/governance/`
- Skills in `product/99-operating-system/skills/`
- Slash commands in `product/99-operating-system/slash-commands/`

### New System
- Organized around **Product Objects** (in `product/objects/`)
- Object files as source of truth; registries become views or graph indexes
- Objects with YAML frontmatter, typed relationships, lifecycle metadata, and AI reasoning fields
- **Semantic IDs** (`REQUEST-COM-PLP-CAROUSEL-001`, `FEATURE-COM-PLP-CAROUSEL`)
- Ontology in `product/os/ontology/`
- Intelligence in `product/os/intelligence/`
- Policies in `product/os/policies/`
- Interfaces in `product/os/interfaces/`
- Templates in `product/os/templates/`
- Graph indexes in `product/graph/`
- Derived views in `product/views/`

---

## 2. What Stayed the Same

- **All existing content is preserved in original locations — NO FILES WERE DELETED**
- All existing IDs remain valid (referenced as `legacy_id` in new objects)
- Slash commands continue to work (upgraded to operate on objects)
- Governance rules and approval gates are preserved (now in `product/os/policies/`)
- All request files, PRD files, story files, QA files, and UAT files remain in original folders
- `MASTER_REGISTRY.md` continues to track numeric next IDs for backward compatibility

---

## 3. Old Folder → New System Mapping

| Old Path | New System Equivalent | Notes |
|---|---|---|
| `product/00-product-foundation/MASTER_REGISTRY.md` | `product/graph/OBJECT_INDEX.md` + `legacy_id` fields in objects | MASTER_REGISTRY.md preserved for legacy ID tracking |
| `product/00-product-foundation/DECISION_LOG.md` | `product/graph/DECISION_MAP.md` + `product/objects/decisions/` | DECISION_LOG.md preserved |
| `product/00-product-foundation/PRODUCT_VISION.md` | `product/objects/strategy/` (to be created) | PRODUCT_VISION.md preserved |
| `product/01-product-architecture/SCREEN_REGISTRY.md` | `product/graph/SCREEN_MAP.md` | SCREEN_REGISTRY.md preserved |
| `product/01-product-architecture/DATA_ENTITY_MAP.md` | `product/graph/DATA_ENTITY_MAP.md` | Original preserved |
| `product/02-roadmap/PRODUCT_ROADMAP.md` | `product/views/ROADMAP_VIEW.md` | Original preserved |
| `product/03-module-catalogue/` | `product/objects/modules/` + `product/graph/MODULE_MAP.md` | Module catalogues preserved |
| `product/04-request-management/REQUEST_REGISTER.md` | `product/views/REQUEST_VIEW.md` | Register preserved |
| `product/04-request-management/requests/*.md` | `product/objects/requests/` (migration needed) | Original files preserved |
| `product/05-discovery-and-grilling/` | `product/objects/discovery/` + `product/objects/questions/` | Original files preserved |
| `product/06-assessment-and-impact/` | `product/objects/risks/` + `product/graph/IMPACT_MAP.md` | Original files preserved |
| `product/07-prd/` | `product/objects/prds/` (migration needed) | Original files preserved |
| `product/08-user-stories/` | `product/objects/stories/` (migration needed) | Original files preserved |
| `product/09-development-planning/` | `product/objects/tasks/` + `product/objects/prompts/` | Original files preserved |
| `product/10-development-tracking/` | `product/views/ACTIVE_WORK_VIEW.md` + `product/views/INCOMPLETE_WORK_VIEW.md` | Original files preserved |
| `product/11-qa-testing/` | `product/objects/qa-runs/` + `product/objects/test-cases/` + `product/objects/bugs/` | Original files preserved |
| `product/12-uat/` | `product/objects/uat-runs/` | Original files preserved |
| `product/13-release-management/` | `product/objects/releases/` | Original files preserved |
| `product/14-post-release/` | `product/objects/incidents/` + `product/objects/enhancements/` | Original files preserved |
| `product/99-operating-system/governance/` | `product/os/policies/` | Superseded; originals preserved |
| `product/99-operating-system/skills/` | `product/os/interfaces/` | Superseded; originals preserved |
| `product/99-operating-system/slash-commands/` | `product/os/interfaces/` | Updated conceptually; originals preserved |

---

## 4. Legacy ID → Semantic ID Mapping Table

| Legacy ID | New Semantic ID | Object Type | Migration Status | Notes |
|---|---|---|---|---|
| REQ-0001 | REQUEST-DEL-CORE-DELIVERY-MVP-001 | Request | Mapped | Delivery MVP request |
| REQ-0002 | REQUEST-COM-PLP-CAROUSEL-001 | Request | Mapped | Carousel request |
| PRD-0001 | PRD-DEL-CORE-DELIVERY-MVP-V1 | PRD | Mapped | Delivery MVP PRD |
| PRD-0002 | PRD-COM-PLP-CAROUSEL-V1 | PRD | Mapped | Carousel PRD — note: shows Draft but development proceeded |
| US-0001 | STORY-DEL-CORE-DELIVERY-SCHEMA-001 | Story | Needs Verification | Schema setup story — verify slug against actual story content |
| US-0002 | STORY-DEL-CORE-DELIVERY-BACKEND-002 | Story | Needs Verification | Backend functions story |
| US-0003 | STORY-DEL-CORE-DELIVERY-ORDER-003 | Story | Needs Verification | Order mutation story |
| US-0004 | STORY-DEL-CORE-DELIVERY-ASSIGN-004 | Story | Needs Verification | Assignment story |
| US-0005 | STORY-DEL-CORE-DELIVERY-STATUS-005 | Story | Needs Verification | Status update story |
| US-0006 | STORY-DEL-CORE-DELIVERY-ADMIN-006 | Story | Needs Verification | Admin delivery view story |
| US-0007 | STORY-DEL-CORE-DELIVERY-CUSTOMER-007 | Story | Needs Verification | Customer delivery status story |
| US-0008 | STORY-DEL-CORE-DELIVERY-INTEGR-008 | Story | Needs Verification | Integration story |
| US-0009 | STORY-COM-PLP-CAROUSEL-RENDER-001 | Story | Mapped | Carousel render story |
| US-0010 | STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002 | Story | Mapped | Auto-scroll story |
| US-0011 | STORY-COM-PLP-CAROUSEL-NAV-003 | Story | Mapped | Navigation story |
| US-0012 | STORY-COM-PLP-CAROUSEL-MOBILE-004 | Story | Mapped | Mobile story |
| US-0013 | STORY-COM-PLP-CAROUSEL-SWIPE-005 | Story | Mapped | Swipe story |
| US-0014 | STORY-COM-PLP-CAROUSEL-CLICK-006 | Story | Mapped | Click-through story |
| QA-0001 | QA-COM-PLP-CAROUSEL-RUN-001 | QA Run | Mapped | Carousel QA run — 20/20 Passed |
| UAT-0001 | UAT-COM-PLP-CAROUSEL-RUN-001 | UAT Run | Mapped | Carousel UAT run — In Progress |
| DEVPLAN-0001 | DEVPLAN-DEL-CORE-DELIVERY-MVP-001 | Dev Plan | Mapped | Delivery dev plan |
| DEVPLAN-0002 | DEVPLAN-COM-PLP-CAROUSEL-001 | Dev Plan | Mapped | Carousel dev plan |
| IMPACT-0001 | IMPACT-DEL-CORE-DELIVERY-MVP-001 | Impact Assessment | Mapped | Delivery impact assessment |
| GRILLING-0001 | DISCOVERY-DEL-CORE-DELIVERY-MVP-001 | Discovery Session | Mapped | Delivery grilling / discovery session |
| EVAL-0001 | EVAL-DEL-CORE-DELIVERY-MODULE-001 | Evaluation | Mapped | Delivery module evaluation — Approved |
| SCR-CUS-0001–0010 | Same — legacy IDs preserved | Screen | Preserved | Screen IDs have no new semantic form |
| SCR-ADM-0001–0011 | Same — legacy IDs preserved | Screen | Preserved | |
| SCR-AUTH-0001–0002 | Same — legacy IDs preserved | Screen | Preserved | |
| DEC-001–DEC-014 | DECISION-* (see `product/graph/DECISION_MAP.md`) | Decision | Needs Mapping | Partial mapping done; complete in next sprint |

---

## 5. How Commands Behave After Migration

- All slash commands work as before, but they now create **Product Objects** (with YAML frontmatter) rather than plain markdown documents
- New objects go in `product/objects/` subdirectories with semantic IDs
- New objects must also be registered in `product/graph/OBJECT_INDEX.md`
- Legacy files in numbered folders remain valid and can be referenced by `legacy_id`
- Use `/product-resume` to understand the full active object state at any time

---

## 6. How Feature-Level Tracking Changed

**Old approach:** Feature details lived only in request files and PRDs. Once a request was processed, its state existed only implicitly across multiple documents.

**New approach:** Feature details must live in a **Feature Object** file (`product/objects/features/`). The Feature Object is the permanent product knowledge record that persists beyond the delivery cycle and accumulates history over multiple releases and enhancements.

`FEATURE-COM-PLP-CAROUSEL.md` was created as the first Feature Object and demonstrates the pattern. All new features must have a Feature Object created before or during PRD stage.

---

## 7. What Still Needs Manual Verification

1. **US-0001–US-0008 semantic ID mappings** — Slugs were proposed but need verification against actual story file content in `product/08-user-stories/`
2. **DEC-001–DEC-014 semantic ID assignments** — Partial mapping done in `product/graph/DECISION_MAP.md`; remaining decisions need semantic IDs
3. **PRD-0002 formal approval status** — File shows "Draft" status but development proceeded; Product Owner needs to formally confirm approval
4. **Feature Objects for Phases 1–10 MVP features** — Not yet created; represents a gap in the product knowledge base
5. **MASTER_REGISTRY.md next IDs** — Must be kept in sync for legacy ID generation; current next ID is REQ-0003

---

## 8. Recommended Next Steps

1. Get Product Owner UAT sign-off for FEATURE-COM-PLP-CAROUSEL (`/product-uat`)
2. Create RELEASE-COM-PLP-CAROUSEL-2026-06 (`/product-release`)
3. Create Request Objects for REQ-0001 and REQ-0002 in new object format (`product/objects/requests/`)
4. Migrate PRD-0001 and PRD-0002 to PRD Object files (`product/objects/prds/`)
5. Create FEATURE-DEL-CORE-DELIVERY-MVP Feature Object before development starts
6. Verify and correct US-0001–US-0008 semantic ID slug assignments
7. Complete DEC-001–DEC-014 semantic ID mapping in `product/graph/DECISION_MAP.md`
8. Gradually create Feature Objects for Phase 1–10 MVP features (non-blocking, low priority)
9. Continue using **legacy IDs** for any remaining work on existing items
10. Use **semantic IDs** for all new requests and features going forward
