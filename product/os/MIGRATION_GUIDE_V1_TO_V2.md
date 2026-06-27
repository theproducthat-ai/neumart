# Migration Guide: Product OS V1 → V2

**Version**: 2.0  
**Status**: Active  
**Date**: 2026-06-24

---

## Why V2?

The V1 Product OS used a numbered lifecycle folder structure (`00-` through `14-` and `99-`). This worked well as a documentation hierarchy but had limitations:
- Hard to discover objects by type across features
- Relationships between objects required manual cross-folder linking
- Stakeholders had no unified view of in-flight work
- AI agents had to scan multiple folders to build context
- No standard schema across object types

V2 introduces `product/objects/` as a **single source of truth** where all product work lives as typed, linked objects with consistent frontmatter. The numbered folders are preserved as historical reference.

---

## Current (V1) Structure Summary

```
product/
  00-product-foundation/         ← vision, principles, MVP scope
  01-product-architecture/       ← data model, screen registry, routes
  02-roadmap/                    ← roadmap, module evaluations
  03-module-catalogue/           ← per-module feature specs
  04-request-management/         ← request intake + active/parked/rejected
  05-discovery-and-grilling/     ← grilling sessions
  06-assessment-and-impact/      ← impact assessments
  07-prd/                        ← approved PRDs
  08-user-stories/               ← user stories
  09-development-planning/       ← dev plans + AI coding prompts
  10-development-tracking/       ← blockers, changelog, open issues
  11-qa-testing/                 ← QA test plans and runs
  12-uat/                        ← UAT plans, runs, signoffs
  13-release-management/         ← release plans and notes
  14-post-release/               ← post-release reviews, incident log
  99-operating-system/           ← governance, skills, slash commands
  objects/                       ← (partially populated, V2 in progress)
  os/                            ← (V2 structure, partially populated)
  graph/                         ← relationship maps
  views/                         ← stakeholder views
  archive/                       ← legacy OS reference
```

---

## New (V2) Recommended Structure

```
product/
  objects/              ← SOURCE OF TRUTH (all product work)
  os/                   ← rules, templates, intelligence, policies
  views/                ← stakeholder views
  indexes/              ← object indexes and traceability matrix
  graph/                ← semantic relationship maps (retained)
  portfolio/            ← OKRs, themes, prioritization, roadmap governance
  design/               ← design operating model, handoff rules
  engineering/          ← engineering operating model, DoR/DoD
  support-ops/          ← support, incident, escalation, ops
  analytics/            ← metrics, events, experiments
  team-operating-model/ ← cadences, RACI, approvals, stakeholder register
  examples/             ← worked examples by work type
  ── LEGACY (retained, read-only for new work) ──
  00-product-foundation/
  01-product-architecture/
  02-roadmap/
  03-module-catalogue/
  04-request-management/
  05-discovery-and-grilling/
  06-assessment-and-impact/
  07-prd/
  08-user-stories/
  09-development-planning/
  10-development-tracking/
  11-qa-testing/
  12-uat/
  13-release-management/
  14-post-release/
  99-operating-system/
  archive/
```

---

## Source of Truth Declaration

| Artifact Type | V1 Location | V2 Source of Truth |
|---|---|---|
| All product work | Various numbered folders | `product/objects/[type]/` |
| Templates | `99-operating-system/` + `07-prd/` etc. | `product/os/templates/` |
| Policies & governance | `99-operating-system/governance/` | `product/os/policies/` |
| AI skills | `99-operating-system/skills/` | `product/os/interfaces/` |
| Slash commands | `99-operating-system/slash-commands/` | `product/os/interfaces/` |
| Stakeholder views | `views/` | `product/views/` (same folder, V2 extended) |
| Relationship maps | `graph/` | `product/graph/` + `product/indexes/` |

---

## Path Mapping Table

| Old Path (V1) | New Recommended Path (V2) | Notes |
|---|---|---|
| `04-request-management/requests/REQ-XXXX.md` | `objects/requests/REQ-XXXX.md` | New requests go to objects/ |
| `07-prd/approved-prds/PRD-XXXX.md` | `objects/prds/PRD-XXXX.md` | New PRDs go to objects/ |
| `08-user-stories/stories/US-XXXX.md` | `objects/user-stories/US-XXXX.md` | New stories go to objects/ |
| `11-qa-testing/test-runs/QA-XXXX.md` | `objects/qa-tests/QA-XXXX.md` | New QA runs go to objects/ |
| `12-uat/uat-runs/UAT-XXXX.md` | `objects/uat-runs/UAT-XXXX.md` | New UAT runs go to objects/ |
| `13-release-management/releases/RELEASE-XXXX.md` | `objects/releases/REL-XXXX.md` | New releases go to objects/ |
| `14-post-release/INCIDENT_LOG.md` | `objects/incidents/INC-XXXX.md` | Incidents become individual objects |
| `06-assessment-and-impact/assessments/` | `objects/decisions/ + objects/risks/` | Split into typed objects |
| `05-discovery-and-grilling/grilled-requests/` | `objects/requests/ (grilling_notes field)` | Grilling embedded in request object |
| `09-development-planning/plans/` | `objects/technical-designs/` | Dev plans become tech design objects |
| `99-operating-system/governance/` | `product/os/policies/` | Policies live in os/policies/ |
| `99-operating-system/skills/` | `product/os/interfaces/` | Skills become AI interfaces |
| `02-roadmap/PRODUCT_ROADMAP.md` | `product/portfolio/` | Roadmap governed in portfolio/ |

---

## Rules for New Work

### RULE 1: All new product work goes into `product/objects/`
Never create a new REQ, PRD, story, bug, release, or any other product artifact inside a numbered folder. These are legacy/read-only.

### RULE 2: Use the correct object type folder
```
New request?         → product/objects/requests/
New feature?         → product/objects/features/
New user story?      → product/objects/user-stories/
New bug?             → product/objects/bugs/
New incident?        → product/objects/incidents/
New PRD?             → product/objects/prds/
New release?         → product/objects/releases/
New risk?            → product/objects/risks/
New decision?        → product/objects/decisions/
New OKR?             → product/objects/okrs/
```

### RULE 3: Always use the template from `product/os/templates/`
Start from the canonical template for the object type.

### RULE 4: Assign an ID at creation time
Follow `product/os/policies/ID_RULES.md`. Never create an object without an ID.

### RULE 5: Link related objects at creation time
Every object should reference its parent, children, and key dependencies at creation.

### RULE 6: Update the relevant index after creating an object
Update or note the change in `product/indexes/MASTER_OBJECT_INDEX.md`.

### RULE 7: Numbered folders are read-only
Do not modify historical records in numbered folders. If a historical artifact needs to be updated, copy it to `product/objects/` and update from there.

---

## What Remains Legacy (V1)

The following content stays in numbered folders and is **not migrated** — it remains as historical context:

- All existing REQ-0001 through REQ-0008 objects in `04-request-management/requests/`
- All existing PRD-0001 through PRD-0004 in `07-prd/approved-prds/`
- All existing US-0001 through US-0023 in `08-user-stories/stories/`
- All existing QA and UAT runs in `11-qa-testing/` and `12-uat/`
- All existing dev plans in `09-development-planning/plans/`
- The `03-module-catalogue/` module specs (these inform new objects but are not replaced)

---

## Migration Checklist

When migrating an existing V1 object to V2:

- [ ] Create the new object file in `product/objects/[type]/`
- [ ] Use the V2 template with YAML frontmatter
- [ ] Preserve the original ID or note the mapping
- [ ] Add `legacy_ref:` field pointing to the old file path
- [ ] Add a migration note at the top of the old file (do not delete it)
- [ ] Update `product/indexes/MASTER_OBJECT_INDEX.md`
- [ ] Link related objects using V2 IDs

---

## What AI Agents Must Do in V2

1. Always create new objects in `product/objects/[type]/`
2. Always use templates from `product/os/templates/`
3. Follow classification rules from `product/os/policies/`
4. Follow work type lanes from `product/os/policies/WORK_TYPE_LANES.md`
5. Update indexes after creating objects
6. Never modify V1 numbered folders unless explicitly asked
7. When in doubt about placement, check `product/os/PRODUCT_OS_V2_ARCHITECTURE.md`
