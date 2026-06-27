# Master Object Index

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Keep current — update when objects are created, completed, or archived

---

## Purpose

The single entry point for finding any Product OS object. Use this to locate any request, feature, epic, story, bug, release, or other object without knowing which subfolder it lives in.

For detailed per-type indexes, see the linked files below.

---

## Object Type Index

| Type | ID Prefix | Count | Index File | Folder |
|---|---|---|---|---|
| Requests | REQ- | See index | [REQUEST_INDEX.md](REQUEST_INDEX.md) | `objects/requests/` |
| Features | FEAT- | See index | [FEATURE_INDEX.md](FEATURE_INDEX.md) | `objects/features/` |
| PRDs | PRD- | See index | [PRD_INDEX.md](PRD_INDEX.md) | `objects/prds/` |
| Epics | EPIC- | See index | — | `objects/epics/` |
| User Stories (V2) | US-0024+ | See index | [USER_STORY_INDEX.md](USER_STORY_INDEX.md) | `objects/user-stories/` |
| Stories (V1 legacy) | US-0001–0023 | 23 | — | `objects/stories/` |
| Bugs | BUG- | See index | [BUG_INDEX.md](BUG_INDEX.md) | `objects/bugs/` |
| Releases | REL- | See index | [RELEASE_INDEX.md](RELEASE_INDEX.md) | `objects/releases/` |
| Incidents | INC- | See index | — | `objects/incidents/` |
| RCAs | RCA- | See index | — | `objects/rcas/` |
| Decisions | DEC- | See index | [DECISION_INDEX.md](DECISION_INDEX.md) | `objects/decisions/` |
| Risks | RISK- | See index | [RISK_INDEX.md](RISK_INDEX.md) | `objects/risks/` |
| Metrics | MET- | See index | [METRIC_INDEX.md](METRIC_INDEX.md) | `objects/metrics/` |
| Experiments | EXP- | See index | — | `objects/experiments/` |
| Feature Flags | FF- | See index | — | `objects/feature-flags/` |
| OKRs | OKR- | See index | — | `objects/okrs/` |
| Stakeholders | STK- | See index | [STAKEHOLDER_INDEX.md](STAKEHOLDER_INDEX.md) | `objects/stakeholders/` |
| API Contracts | API- | See index | — | `objects/api-contracts/` |
| Data Migrations | DM- | See index | — | `objects/data-migrations/` |
| Tech Designs | TD- | See index | — | `objects/tech-designs/` |
| Capacity Plans | CAP- | See index | — | `objects/capacity-plans/` |
| **Modules** | **MOD-** | **7** | **[MODULE_INDEX.md](MODULE_INDEX.md)** | `objects/modules/` |
| **Module Areas** | **MA-** | **27** | **[MODULE_INDEX.md](MODULE_INDEX.md)** | `objects/module-areas/` |
| **Capabilities** | **CAP-** | See index | — | `objects/capabilities/` |
| **Components** | **CMP-** | See index | — | `objects/components/` |
| Sub-features | SUBFEATURE- | See index | [FEATURE_SUBFEATURE_MAP.md](FEATURE_SUBFEATURE_MAP.md) | `objects/features/` |

---

## Cross-Reference Indexes

| Index | Purpose |
|---|---|
| [DEPENDENCY_INDEX.md](DEPENDENCY_INDEX.md) | Objects blocked by or blocking other objects |
| [CLIENT_COMMITMENT_INDEX.md](CLIENT_COMMITMENT_INDEX.md) | Requests or features with external client commitments |
| [TRACEABILITY_MATRIX.md](TRACEABILITY_MATRIX.md) | Requirement → Feature → Story → Release traceability |
| [ORPHAN_OBJECTS.md](ORPHAN_OBJECTS.md) | Objects with no parent link or no owning stakeholder |
| **[MODULE_INDEX.md](MODULE_INDEX.md)** | **Module and module area registry** |
| **[MODULE_FEATURE_MAP.md](MODULE_FEATURE_MAP.md)** | **Module → Feature mapping** |
| **[FEATURE_SUBFEATURE_MAP.md](FEATURE_SUBFEATURE_MAP.md)** | **Feature → Sub-feature mapping** |
| **[MODULE_ROADMAP_MAP.md](MODULE_ROADMAP_MAP.md)** | **Module → Roadmap items** |
| **[MODULE_DEPENDENCY_MAP.md](MODULE_DEPENDENCY_MAP.md)** | **Cross-module dependencies** |

---

## Relationship Graph

For semantic relationship maps between objects, see `product/graph/`.

---

## ID Lookup

If you have an object ID and need to find it:

| Starts with | Go to |
|---|---|
| REQ- | `objects/requests/REQ-XXXX.md` |
| FEAT- | `objects/features/[MODULE]/FEAT-[MODULE]-[SCREEN]-XXXX.md` |
| PRD- | `objects/prds/PRD-XXXX.md` |
| EPIC- | `objects/epics/EPIC-XXXX.md` |
| US- (0024+) | `objects/user-stories/US-XXXX.md` |
| US- (0001-0023) | `objects/stories/US-XXXX.md` |
| BUG- | `objects/bugs/BUG-XXXX.md` |
| REL- | `objects/releases/REL-XXXX.md` |
| INC- | `objects/incidents/INC-XXXX.md` |
| RCA- | `objects/rcas/RCA-XXXX.md` |
| DEC- | `objects/decisions/DEC-XXXX.md` |
| RISK- | `objects/risks/RISK-XXXX.md` |
| MET- | `objects/metrics/MET-XXXX.md` |
| EXP- | `objects/experiments/EXP-XXXX.md` |
| FF- | `objects/feature-flags/FF-XXXX.md` |
| OKR- | `objects/okrs/OKR-XXXX.md` |
| API- | `objects/api-contracts/API-XXXX.md` |
| DM- | `objects/data-migrations/DM-XXXX.md` |
| TD- | `objects/tech-designs/TD-XXXX.md` |
| MOD- | `objects/modules/MOD-[CODE].md` |
| MA- | `objects/module-areas/MA-[MOD]-[AREA].md` |
| CAP- | `objects/capabilities/CAP-XXXX.md` |
| CMP- | `objects/components/CMP-XXXX.md` |
| SUBFEATURE- | `objects/features/SUBFEATURE-[...].md` |

---

## Related Documents

- `product/os/PRODUCT_OS_V2_ARCHITECTURE.md`
- `product/os/MIGRATION_GUIDE_V1_TO_V2.md`
- `product/os/PRODUCT_HIERARCHY.md` — Full hierarchy definition (Part 19)
