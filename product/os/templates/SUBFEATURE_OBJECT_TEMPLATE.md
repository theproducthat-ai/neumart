# Nuemart Product OS — Sub-feature Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Sub-feature Objects. A sub-feature is a scoped, discrete behavior that belongs to a parent Feature. Sub-features share the parent feature's lifecycle but have their own scope, rules, and delivery tracking. File location: `product/objects/features/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. SUBFEATURE-COM-PLP-CAROUSEL-AUTOPLAY
legacy_id: ""
object_type: SubFeature

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""                     # e.g. carousel-autoplay
sequence: ""
version: "1.0"
canonical_name: ""
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# SUB-FEATURE SPECIFIC FIELDS
# ─────────────────────────────────────────────
sub_feature_type: ""                 # Behavioral | Visual | Configurational | Rule-driven | Integration | Edge Case
parent_feature_id: ""                # FEATURE-... ID of the parent feature
parent_feature_name: ""              # Display name of the parent feature

# ─────────────────────────────────────────────
# MATURITY (inherited from parent, tracked independently)
# ─────────────────────────────────────────────
maturity: Candidate                  # Candidate | Planned | In Development | Shipped | Deprecated | Deferred

# ─────────────────────────────────────────────
# SCOPE
# ─────────────────────────────────────────────
included_in_parent_mvp: false        # Is this sub-feature in the parent feature's MVP scope?
deferred_reason: ""                  # If not in MVP: why deferred

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  child_of: ""                       # Parent FEATURE-... ID
  sourced_from: ""                   # REQUEST-... ID (if sub-feature has its own request)
  has_requirements: []               # REQ-... IDs (if sub-feature has own requirements)
  has_stories: []                    # US-XXXX IDs specific to this sub-feature
  has_risks: []                      # RISK-... IDs
  depends_on: []                     # Other sub-features or features this depends on

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

## 1. Sub-feature Summary

**Sub-feature ID:** `{object_id}`
**Type:** {sub_feature_type}
**Maturity:** {maturity}
**Parent Feature:** `{parent_feature_id}` — {parent_feature_name}
**Module:** {product_area_code} → {module_code} → {submodule_code}
**Included in Parent MVP:** {YES/NO}

---

## 2. What This Sub-feature Does

> A precise description of the discrete behavior this sub-feature delivers. This should be scoped tightly — a sub-feature does one thing well.

{description — 2–4 sentences}

---

## 3. Relationship to Parent Feature

> How does this sub-feature fit within the parent feature? Is it required for the parent to function, optional, or an enhancement?

**Role within parent:** {Required / Optional / Enhancement / Edge Case Handler}

**Parent feature depends on this sub-feature:** {YES/NO}

**This sub-feature can function without parent completion:** {YES/NO}

---

## 4. Functional Scope

### In-Scope
> What this sub-feature specifically delivers.

- {in-scope behavior}
- {in-scope behavior}

### Out-of-Scope
> What is explicitly excluded (even though it might seem related).

- {out-of-scope item} — Reason: {rationale}
- {out-of-scope item} — Reason: {rationale}

---

## 5. UX Rules

> User experience rules scoped to this sub-feature.

| Rule ID | Rule Statement | Trigger | Screen |
|---|---|---|---|
| UX-{SUBFEATURE}-001 | {rule} | {when triggered} | {screen} |

---

## 6. Business Rules

> Business logic specifically governing this sub-feature.

| Rule ID | Rule Statement | Priority |
|---|---|---|
| BR-{SUBFEATURE}-001 | {rule} | {Must Have/Should Have} |

---

## 7. Configuration Rules

> Any configurable parameters specific to this sub-feature.

| Config Key | Type | Default | Parent or Own? | Description |
|---|---|---|---|---|
| {key} | {type} | {default} | {Parent/Own} | {description} |

---

## 8. Data Dependencies

> Data entities specific to this sub-feature (if different from parent feature).

| Entity | Operation | Fields | Inherited from Parent? |
|---|---|---|---|
| {entity} | {CRUD} | {fields} | {YES/NO} |

---

## 9. Screen / Component Mapping

| Screen | Component | Change Type | Shared with Parent? |
|---|---|---|---|
| {screen} | {component} | {New/Updated} | {YES/NO} |

---

## 10. Story Mapping

| Story ID | Title | Status |
|---|---|---|
| {US-XXXX} | {title} | {status} |

---

## 11. Risks

| Risk ID | Description | Probability | Impact |
|---|---|---|---|
| {RISK-...} | {description} | {H/M/L} | {Critical/High/Medium/Low} |

---

## 12. Dependencies

| Dependency | Type | Blocker |
|---|---|---|
| {what this depends on} | {Technical/Feature/Data} | {YES/NO} |

---

## 13. Deferred Status

> If `maturity: Deferred` — complete this section.

**Deferred reason:** {why this was not included in the current MVP}

**Deferred to:** {next release / future backlog / TBD}

**Resolution options:**
- Include in next release cycle
- Create new Request Object when ready
- Drop from roadmap (with rationale)

---

## 14. AI Reasoning Notes

**Created by:** {command or operation}
**Key reasoning:**
- {why this was created as a sub-feature rather than part of the parent}
- {scope decisions made}

---

## 15. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Initial creation |

---

## Definition of Done

- [ ] Sub-feature linked to parent Feature Object
- [ ] `included_in_parent_mvp` field set (true/false)
- [ ] If deferred: deferred reason stated
- [ ] Functional scope documented (In-Scope and Out-of-Scope)
- [ ] UX and Business Rules documented
- [ ] Stories linked (if this sub-feature has specific stories)
- [ ] Maturity status accurate and up to date
- [ ] Parent Feature Object updated to reference this sub-feature
