# Legacy Product OS — Archive Notice

**Date:** 2026-06-22

---

This folder exists as an archive placeholder for the legacy Product OS structure.

> **IMPORTANT:** The legacy Product OS files have **NOT** been moved here. They remain in their original locations (`product/00-product-foundation/` through `product/99-operating-system/`) to maintain backward compatibility and because they are still the active source of truth for their content.

This folder may be used in the future to archive legacy files that have been fully migrated to the new object-centric system. A file should only be moved here after:

1. Its content has been fully migrated to a Product Object in `product/objects/`
2. All references to the legacy file have been updated to point to the new object
3. The migration has been verified and recorded in `product/os/MIGRATION_FROM_LEGACY_PRODUCT_OS.md`

---

## Migration Status

The migration from the legacy Product OS to the new enterprise object-centric Product OS is **in progress**.

For the complete migration guide, including old-to-new folder mappings, legacy-to-semantic ID mappings, and recommended next steps, see:

`product/os/MIGRATION_FROM_LEGACY_PRODUCT_OS.md`

---

## Legacy File Locations (Still Active)

All of the following folders remain active and should be treated as valid sources of truth until their content is formally migrated.

| Content | Legacy Location |
|---|---|
| Vision, Principles, Master Registry | `product/00-product-foundation/` |
| Architecture, Screen Registry, Data Entity Map | `product/01-product-architecture/` |
| Roadmap, Now/Next/Later | `product/02-roadmap/` |
| Module Catalogue | `product/03-module-catalogue/` |
| Request Register, Request Files | `product/04-request-management/` |
| Discovery Sessions, Grilling Records | `product/05-discovery-and-grilling/` |
| Assessment and Impact Records | `product/06-assessment-and-impact/` |
| PRD Documents | `product/07-prd/` |
| User Stories | `product/08-user-stories/` |
| Development Plans | `product/09-development-planning/` |
| Development Tracking, Incomplete Work | `product/10-development-tracking/` |
| QA Runs, Bug Register, Test Checklists | `product/11-qa-testing/` |
| UAT Runs | `product/12-uat/` |
| Release Management | `product/13-release-management/` |
| Post-Release, Incidents | `product/14-post-release/` |
| OS Governance, Skills, Slash Commands | `product/99-operating-system/` |

**Do not delete these legacy folders** until their content is fully migrated to `product/objects/` and the migration has been verified.
