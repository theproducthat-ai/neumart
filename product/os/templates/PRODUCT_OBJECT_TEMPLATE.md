# Nuemart Product OS — Generic Product Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Use this template when no specialized object template applies. For Request, Feature, PRD, Story, Test Case, QA Run, UAT Run, Release, Decision, Risk, Dependency, Bug, and Incomplete Work — use the dedicated template files instead.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                  # Semantic ID — e.g. REQUEST-COM-PLP-CAROUSEL-001
legacy_id: ""                  # Legacy short ID — e.g. REQ-0001, US-0001
object_type: ""                # Request | Feature | SubFeature | Requirement | PRD | Story | TestCase | QARun | UATRun | Release | Decision | Risk | Dependency | Bug | IncompleteWork

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""          # COM | ADM | DEL | INV | PAY | USR | RPT
module_code: ""                # PLP | PDP | CART | CHK | ADDR | FAV | ORDHIS | etc.
submodule_code: ""             # Optional — e.g. BANNER, FILTER, PAYMENT_FORM
feature_slug: ""               # kebab-case slug — e.g. carousel, express-checkout
sequence: ""                   # Numeric sequence within this namespace — e.g. 001
version: "1.0"                 # Object version — increment on significant changes

# ─────────────────────────────────────────────
# DISPLAY
# ─────────────────────────────────────────────
canonical_name: ""             # Full human-readable name — e.g. "Promotional Banner Carousel"
display_name: ""               # Short display name — e.g. "Banner Carousel"
file_slug: ""                  # File name slug — e.g. carousel-feature

# ─────────────────────────────────────────────
# CLASSIFICATION
# ─────────────────────────────────────────────
status: ""                     # Object-type-specific status (see Lifecycle section)
priority: ""                   # Critical | High | Medium | Low
tags: []                       # Free-form tags for search and filtering

# ─────────────────────────────────────────────
# OWNERSHIP
# ─────────────────────────────────────────────
owner: ""                      # Product owner or responsible role
created_by: ""                 # Who or what created this object
created_at: ""                 # ISO date — YYYY-MM-DD
updated_at: ""                 # ISO date — YYYY-MM-DD
reviewed_by: ""                # Who reviewed or approved this object
reviewed_at: ""                # ISO date

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  upstream: []                 # Objects this object was derived from or specified by
  downstream: []               # Objects this object enables, validates, or ships
  depends_on: []               # Objects that must be complete before this one
  blocks: []                   # Objects blocked by this one

# ─────────────────────────────────────────────
# METADATA
# ─────────────────────────────────────────────
metadata:
  source_system: "Product OS"
  schema_version: "1.0"
  last_reviewed: ""
  confidence: ""               # High | Medium | Low (AI confidence in this object's completeness)
---
```

---

## 1. Identity

**Object ID:** `{object_id}`
**Legacy ID:** `{legacy_id}`
**Type:** `{object_type}`
**Canonical Name:** {canonical_name}
**Display Name:** {display_name}

---

## 2. Classification

**Status:** {status}
**Priority:** {priority}
**Product Area:** {product_area_code}
**Module:** {module_code}
**Sub-module:** {submodule_code}
**Tags:** {tags}

---

## 3. Product Placement

**Module Hierarchy:**
```
{product_area_code} → {module_code} → {submodule_code}
```

**Affected Screens / Components:**
- {screen or component name}

**User Roles Touched:**
- {role name}

---

## 4. Description

### Summary
{1–3 sentence plain-language description of what this object represents.}

### Detail
{Extended description. For Request Objects: problem statement. For Feature Objects: functional scope. For Story Objects: user journey. For Test Case Objects: test scenario. Etc.}

---

## 5. Ownership

| Field | Value |
|---|---|
| Owner | {owner} |
| Created By | {created_by} |
| Created At | {created_at} |
| Updated At | {updated_at} |
| Reviewed By | {reviewed_by} |
| Reviewed At | {reviewed_at} |

---

## 6. Lifecycle

**Current Status:** {status}

**Status History:**
| Date | Status | Changed By | Reason |
|---|---|---|---|
| {YYYY-MM-DD} | {status} | {who} | {reason} |

**Valid Status Transitions:**
> _(See OBJECT_SCHEMA.md for lifecycle rules for this object type.)_

---

## 7. Metadata

| Field | Value |
|---|---|
| Version | {version} |
| Schema Version | 1.0 |
| Confidence | {confidence} |
| Source System | Product OS |
| Last Reviewed | {last_reviewed} |

---

## 8. Relationships

### Upstream (this object was created by / derived from)
| Relationship Type | Object ID | Object Type | Status |
|---|---|---|---|
| {relationship_type} | {object_id} | {object_type} | {status} |

### Downstream (this object enables / validates / ships)
| Relationship Type | Object ID | Object Type | Status |
|---|---|---|---|
| {relationship_type} | {object_id} | {object_type} | {status} |

### Dependencies
| Dependency Type | Object ID | Blocker | Status |
|---|---|---|---|
| {dep_type} | {object_id} | {YES/NO} | {status} |

---

## 9. Evidence

> Links to supporting artifacts: screenshots, Figma frames, Loom recordings, Slack threads, meeting notes, user research.

- {evidence description} — {link or reference}

---

## 10. Decisions

| Decision ID | Decision | Made By | Date | Rationale |
|---|---|---|---|---|
| {DECISION-...} | {decision statement} | {who} | {date} | {rationale} |

---

## 11. Risks

| Risk ID | Risk Description | Probability | Impact | Status |
|---|---|---|---|---|
| {RISK-...} | {description} | {H/M/L} | {Critical/High/Medium/Low} | {status} |

---

## 12. Dependencies

| Dependency ID | What It Depends On | Blocker | Resolution Status |
|---|---|---|---|
| {DEP-...} | {description} | {YES/NO} | {status} |

---

## 13. Acceptance / Validation

> _(Populated by the relevant slash command. For Request Objects: open questions. For Feature Objects: definition of done. For Story Objects: acceptance criteria. For Release Objects: monitoring signals.)_

- [ ] {acceptance criterion or validation check}
- [ ] {acceptance criterion or validation check}

---

## 14. AI Reasoning

> _(Record of AI reasoning steps taken when this object was created or last updated. Useful for auditing and for understanding why fields were populated as they were.)_

**Generated by:** {command used}
**Reasoning notes:**
- {reasoning step 1}
- {reasoning step 2}

---

## 15. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | {who/what} | Initial creation |

---

## 16. Views / Documents

> _(Links to any documents, PRDs, specs, or external views generated from this object.)_

- {document name} — {link or file path}

---

## Definition of Done Checklist

- [ ] All required frontmatter fields populated (no empty strings on required fields)
- [ ] Canonical name and display name set
- [ ] Status set to appropriate value for current lifecycle stage
- [ ] At least one upstream relationship established
- [ ] Description written (Summary at minimum)
- [ ] Ownership fields populated
- [ ] Created_at and updated_at set
- [ ] File written to correct `product/objects/{type}/` subfolder
- [ ] Object ID follows semantic naming convention
