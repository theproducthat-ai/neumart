# Product Hierarchy

**Version**: 2.0  
**Owner**: Product Lead  
**Status**: Source of truth — do not modify without Product Lead approval

---

## Purpose

This document defines the complete product hierarchy — the layers of the product from the highest strategic level down to individual tasks and code. Every Product OS object lives at exactly one level in this hierarchy.

---

## Full Hierarchy

```
Product (Neumart)
  └── Domain  (e.g., Commerce, Operations, Platform)
        └── Module  (MOD-XXX)
              └── Module Area  (MA-XXX-YYY)
                    └── Capability  (CAP-XXXX)
                          └── Feature  (FEAT-[MOD]-[AREA]-NNN)
                                └── Sub-feature  (SUBFEATURE-...)
                                      └── Epic  (EPIC-XXXX)
                                            └── User Story  (US-XXXX)
                                                  └── Task  (TASK-XXXX)
                                                        └── Code / PR
                                                              └── QA
                                                                    └── Release  (REL-XXXX)
                                                                          └── Metric  (MET-XXXX)
```

---

## Layer Definitions

| Layer | ID Format | What It Defines | Lifecycle |
|---|---|---|---|
| **Product** | N/A | The Neumart platform as a whole | Permanent |
| **Domain** | N/A | Broad business domain (Commerce, Operations, Platform) | Rarely changes |
| **Module** | `MOD-[CODE]` | Major business/product area with its own user group and logic | Long-lived |
| **Module Area** | `MA-[MOD]-[AREA]` | Functional section within a module | Changes with major product expansion |
| **Capability** | `CAP-XXXX` | What the system can do — named ability | Grows as features ship |
| **Feature** | `FEAT-[MOD]-[AREA]-NNN` | Deliverable product outcome | Sprint-level |
| **Sub-feature** | `SUBFEATURE-[MOD]-[AREA]-[SLUG]-[NAME]` | Discrete behaviour within a feature | Sprint-level |
| **Epic** | `EPIC-XXXX` | Group of related stories (6+ stories) | Sprint-group level |
| **User Story** | `US-XXXX` | User-facing requirement with acceptance criteria | Sprint-level |
| **Task** | `TASK-XXXX` | Engineering implementation task (optional) | Sprint-level |
| **Code / PR** | N/A | Pull request | Hours-days |
| **QA** | `QARUN-XXXX` | QA test run | Per story/feature |
| **Release** | `REL-XXXX` | Production deployment | Per sprint or hotfix |
| **Metric** | `MET-XXXX` | Measurement of outcomes | Ongoing |

---

## Object Type Cross-Reference

Other object types that live alongside this hierarchy (not in the hierarchy, but linked to it):

| Object | ID Format | Links To |
|---|---|---|
| Request | `REQ-XXXX` | Module, Module Area, Feature |
| PRD | `PRD-XXXX` | Feature, Module |
| Tech Design | `TD-XXXX` | Feature, Module, Module Area |
| Bug | `BUG-XXXX` | Module, Module Area, Feature |
| Incident | `INC-XXXX` | Module, Module Area |
| RCA | `RCA-XXXX` | Incident |
| Risk | `RISK-XXXX` | Feature, Module |
| Decision | `DEC-XXXX` | Feature, Module, Capability |
| Experiment | `EXP-XXXX` | Feature, Sub-feature |
| Feature Flag | `FF-XXXX` | Feature, Sub-feature |
| Component | `CMP-XXXX` | Feature, Module Area |
| OKR | `OKR-XXXX` | Module, Capability |

---

## How the Hierarchy Is Used

### For classification (AI and human)

When a new request arrives, the Classification Engine maps it to the hierarchy:
- Which **module** does this touch? (COM, ADM, etc.)
- Which **module area**? (PLP, CHK, etc.)
- Which existing **capability** does it extend or create?
- Is this a new **feature** or a **sub-feature** of an existing one?

### For traceability

Every user story can be traced up to its feature, module area, module, and down to its PR and release.

### For module-level visibility

The hierarchy enables queries like:
- "Show me everything under Customer Commerce" → filter all objects by `module_id: MOD-COM`
- "Show me all open requests for Checkout" → filter by `module_area_id: MA-COM-CHK`
- "Show me all roadmap items for Admin Console" → see `MODULE_ROADMAP_MAP.md` → ADM section

---

## Required Fields on All Product OS Objects

Every object must include at minimum:

```yaml
module_id: MOD-[CODE]              # Which module
module_area_id: MA-[CODE]-[AREA]   # Which module area (if applicable)
```

Objects at the feature level and below should additionally include:

```yaml
feature_id: FEAT-[MOD]-[AREA]-NNN     # Which feature
subfeature_id: SUBFEATURE-...         # If applicable
capability_id: CAP-XXXX               # Which capability this delivers
component_id: CMP-XXXX                # If component-specific (optional)
```

---

## Neumart Domains

| Domain | Modules | Description |
|---|---|---|
| Commerce | MOD-COM, MOD-PAY | Customer-facing shopping and payment |
| Operations | MOD-DEL, MOD-INV, MOD-ADM | Fulfilment, stock, and back-office |
| Platform | MOD-USR, MOD-RPT | Identity, access, and reporting |

---

## Related Documents

- `product/objects/modules/` — Module definitions
- `product/objects/module-areas/` — Module area definitions
- `product/objects/capabilities/` — Capability registry
- `product/indexes/MODULE_INDEX.md` — Module quick reference
- `product/indexes/MODULE_FEATURE_MAP.md` — Module → Feature mapping
- `product/os/PRODUCT_OS_V2_ARCHITECTURE.md` — Five-layer OS architecture
