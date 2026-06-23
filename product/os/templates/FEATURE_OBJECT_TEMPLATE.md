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
