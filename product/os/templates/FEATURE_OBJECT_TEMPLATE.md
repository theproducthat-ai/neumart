---
id: ""                               # e.g. FEATURE-COM-PLP-CAROUSEL
object_type: Feature
title: ""
status: ""                           # Candidate | Planned | In Development | Shipped | Deprecated
priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file
success_metrics: []              # KPI IDs or descriptive metrics
guardrail_metrics: []            # Metrics that must not regress
analytics_events: []             # ANALYTICS_EVENT-... IDs
dashboard_required: false        # Whether a dashboard object is needed
baseline_value: ""               # Current baseline before change
target_value: ""                 # Target value after change
measurement_window: ""           # e.g. "30 days post-release"
metric_owner: ""                 # Who owns tracking this metric

---
# Feature

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting a new user-visible product capability with its own lifecycle (stories, QA, UAT, release).
**Do not use this when:** Small enhancements to existing features (use ENHANCEMENT_OBJECT_TEMPLATE.md). Configuration-only changes. Bug fixes.
**Source-of-truth folder:** `product/objects/features/`
**Related templates:** REQUEST_OBJECT_TEMPLATE.md, PRD_OBJECT_TEMPLATE.md, EPIC_OBJECT_TEMPLATE.md, SUBFEATURE_OBJECT_TEMPLATE.md

---


# Nuemart Product OS — Feature Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Feature Objects. Features are the central product unit — they link Requests to PRDs, Stories, QA, UAT, and Releases. File location: `product/objects/features/{file_slug}.md`. Update `FEATURE_MASTER.md` after creating.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. FEATURE-COM-PLP-CAROUSEL
legacy_id: ""                        # Optional legacy reference
object_type: Feature

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""                # COM | ADM | DEL | INV | PAY | USR | RPT
module_code: ""                      # PLP | PDP | CART | CHK | ADDR | FAV | ORDHIS | etc.
submodule_code: ""                   # Optional
feature_slug: ""                     # e.g. carousel
sequence: ""
version: "1.0"
canonical_name: ""
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# HIERARCHY REFERENCES (V2)
# ─────────────────────────────────────────────
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
module_area_id: ""                   # MA-COM-PLP | MA-COM-CHK | MA-ADM-ORD | etc.
capability_id: ""                    # CAP-XXXX (capability this feature delivers)
subfeature_id: ""                    # SUBFEATURE-XXX (if this feature has known sub-features, list in child_features)
component_ids: []                    # CMP-XXXX IDs for components used or introduced by this feature

# ─────────────────────────────────────────────
# FEATURE-SPECIFIC FIELDS
# ─────────────────────────────────────────────
feature_type: ""                     # New Feature | Feature Enhancement | Configuration Feature | Rule-driven Feature
maturity: Candidate                  # Candidate | Planned | In Development | Shipped | Deprecated

# ─────────────────────────────────────────────
# LINEAGE
# ─────────────────────────────────────────────
source_request: ""                   # REQUEST-... ID that originated this feature
parent_feature: ""                   # FEATURE-... ID if this is a sub-feature (optional)
child_features: []                   # List of FEATURE-... IDs that are sub-features of this

# ─────────────────────────────────────────────
# FORWARD PLANNING
# ─────────────────────────────────────────────
future_candidates: []                # List of feature ideas that could follow this one
known_limitations: []                # List of Known Limitation Object IDs

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  sourced_from: ""                   # REQUEST-... ID
  has_prd: ""                        # PRD-... ID
  has_stories: []                    # US-XXXX IDs
  has_tasks: []                      # DEVPLAN-... ID
  has_qa: []                         # QARUN-... IDs
  has_uat: []                        # UATRUN-... IDs
  shipped_in: ""                     # RELEASE-... ID
  has_risks: []                      # RISK-... IDs
  has_decisions: []                  # DECISION-... IDs
  depends_on: []                     # FEATURE-... or DEP-... IDs

# ─────────────────────────────────────────────
# DELIVERY TRACKING
# ─────────────────────────────────────────────
shipped_date: ""                     # YYYY-MM-DD (populated when shipped)
shipped_version: ""                  # Release version when shipped

# ─────────────────────────────────────────────
# OWNERSHIP
# ─────────────────────────────────────────────
owner: ""
created_by: ""
created_at: ""
updated_at: ""

# ─────────────────────────────────────────────
# METADATA
# ─────────────────────────────────────────────
metadata:
  source_system: "Product OS"
  schema_version: "1.0"
  confidence: ""
---
```

---

## 1. Feature Summary

**Feature ID:** `{object_id}`
**Type:** {feature_type}
**Maturity:** {maturity}
**Module:** {product_area_code} → {module_code} → {submodule_code}
**Source Request:** {source_request}
**Parent Feature:** {parent_feature} (or: N/A — top-level feature)

---

## 2. Functional Scope

### In-Scope
> What this feature includes and delivers.

- {in-scope item}
- {in-scope item}

### Out-of-Scope
> What was explicitly discussed and excluded from this feature.

- {out-of-scope item} — Reason: {rationale}
- {out-of-scope item} — Reason: {rationale}

---

## 3. UX Rules

> Rules governing the user experience behavior of this feature.

| Rule ID | Rule Statement | Screen | Condition |
|---|---|---|---|
| UX-{FEATURE}-001 | {rule} | {screen} | {when this applies} |
| UX-{FEATURE}-002 | {rule} | {screen} | {when this applies} |

---

## 4. Business Rules

> Business logic that governs how this feature behaves.

| Rule ID | Rule Statement | Priority | Exception |
|---|---|---|---|
| BR-{FEATURE}-001 | {rule} | Must Have | {exception if any} |
| BR-{FEATURE}-002 | {rule} | Should Have | {exception if any} |

---

## 5. Configuration Rules

> Settings, flags, or configurable values that control this feature's behavior.

| Config Key | Type | Default | Description |
|---|---|---|---|
| {config_key} | {boolean/string/number} | {default} | {what it controls} |

---

## 6. Data Dependencies

> Data entities created, read, updated, or deleted by this feature.

| Entity | Operation | Field(s) | Schema Change? |
|---|---|---|---|
| {entity name} | {CRUD} | {fields} | {YES/NO} |

---

## 7. Screen / Component Mapping

> Screens and components where this feature is visible or active.

| Screen | Component | Change Type | Priority |
|---|---|---|---|
| {PLP/PDP/CART/etc.} | {component name} | {New/Updated/Removed} | {Must Have/etc.} |

---

## 8. Requirement / PRD Mapping

| PRD ID | Version | Status | Approval Date |
|---|---|---|---|
| {PRD-...} | {version} | {Draft/Approved} | {date} |

---

## 9. Story / Task Mapping

| Story ID | Title | Status | Dev Phase |
|---|---|---|---|
| {US-XXXX} | {story title} | {status} | {phase} |

---

## 10. QA / UAT Mapping

| Object ID | Type | Date | Result |
|---|---|---|---|
| {QARUN-...} | QA Run | {date} | {Passed/Failed/Conditional} |
| {UATRUN-...} | UAT Run | {date} | {Signed Off/Not Signed Off} |

---

## 11. Release Mapping

| Release ID | Version | Release Date | Type |
|---|---|---|---|
| {RELEASE-...} | {version} | {date} | {Feature/Hotfix/Patch} |

---

## 12. Future Candidates

> Ideas and enhancements that could logically extend this feature in a future release.

- {future candidate description} — Source: {where this idea came from}
- {future candidate description} — Source: {where this idea came from}

---

## 13. Known Limitations

> Behaviors that are suboptimal or incomplete but accepted for this release.

| Limitation ID | Description | Accepted By | Release |
|---|---|---|---|
| {LIM-...} | {description} | {product owner} | {release version} |

---

## 14. Risks and Assumptions

| Type | ID | Description | Status |
|---|---|---|---|
| Risk | {RISK-...} | {description} | {status} |
| Assumption | {ASSUMP-...} | {assumption} | {Verified/Unverified} |

---

## 15. AI Reasoning Notes

**Created by:** `/product-request` (initial) and updated by subsequent commands
**Key decisions reflected in this object:**
- {reasoning or decision note}
- {reasoning or decision note}

---

## 16. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Initial creation |

---

## Definition of Done

- [ ] Feature linked to at least one Request Object
- [ ] Feature linked to PRD Object
- [ ] Feature linked to all User Story Objects
- [ ] Feature linked to QA Run Object
- [ ] Feature linked to UAT Run Object
- [ ] Feature linked to Release Object (when shipped)
- [ ] Feature maturity updated to `Shipped` when released
- [ ] Functional scope documented (In-Scope and Out-of-Scope)
- [ ] UX Rules and Business Rules documented
- [ ] Future candidates listed (or "None at this time")
- [ ] Known limitations documented (or "None")
- [ ] `FEATURE_MASTER.md` updated with this feature
