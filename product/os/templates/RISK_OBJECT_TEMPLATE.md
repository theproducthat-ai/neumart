---
id: ""                               # e.g. RISK-COM-PLP-CAROUSEL-001
object_type: Risk
title: ""
status: ""                           # Identified | Assessed | Mitigated | Accepted | Resolved | Closed
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

---
# Risk

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting an identified risk to product delivery, quality, or business outcome — with likelihood, impact, and mitigation.
**Do not use this when:** Incidents that have already occurred (use INCIDENT_OBJECT_TEMPLATE.md). Assumptions that may never materialise as risk (use ASSUMPTION_OBJECT_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/risks/`
**Related templates:** DECISION_OBJECT_TEMPLATE.md, ASSUMPTION_OBJECT_TEMPLATE.md, INCIDENT_OBJECT_TEMPLATE.md

---


# Nuemart Product OS — Risk Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Risk Objects. Risks are created whenever a threat to product quality, delivery timeline, user safety, or business outcome is identified. Risks are assessed, mitigated where possible, and tracked through resolution. File location: `product/objects/risks/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. RISK-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: Risk

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Carousel schema migration during live traffic"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# HIERARCHY REFERENCES (V2)
# ─────────────────────────────────────────────
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
module_area_id: ""                   # MA-COM-PLP | MA-COM-CHK | MA-ADM-ORD | etc.
feature_id: ""                       # FEAT-XXX (which feature this risk belongs to)

# ─────────────────────────────────────────────
# RISK CLASSIFICATION
# ─────────────────────────────────────────────
risk_category: ""                    # SCHEMA | PAYMENT | AUTH | DATA | INTEGRATION | PERFORMANCE | SECURITY | REGRESSION | SCOPE | COMPLIANCE
risk_title: ""                       # Short descriptive title

# ─────────────────────────────────────────────
# RISK ASSESSMENT
# ─────────────────────────────────────────────
probability: ""                      # High | Medium | Low
impact: ""                           # Critical | High | Medium | Low
risk_score: ""                       # Calculated: P × I matrix → Critical/High/Medium/Low
# Risk Score Matrix:
#   High Probability + Critical Impact  = Critical
#   High Probability + High Impact      = Critical
#   High Probability + Medium Impact    = High
#   High Probability + Low Impact       = Medium
#   Medium Probability + Critical Impact = High
#   Medium Probability + High Impact     = High
#   Medium Probability + Medium Impact   = Medium
#   Medium Probability + Low Impact      = Low
#   Low Probability + Critical Impact    = High
#   Low Probability + High Impact        = Medium
#   Low Probability + Medium Impact      = Low
#   Low Probability + Low Impact         = Low

# ─────────────────────────────────────────────
# RISK MANAGEMENT
# ─────────────────────────────────────────────
mitigation: ""                       # Action taken or planned to reduce probability or impact
contingency: ""                      # What to do if the risk materializes despite mitigation
risk_owner: ""                       # Who is responsible for managing this risk

# ─────────────────────────────────────────────
# STATUS
# ─────────────────────────────────────────────
status: Identified                   # Identified | Assessed | Mitigated | Accepted | Closed | Materialized

# ─────────────────────────────────────────────
# IF MATERIALIZED
# ─────────────────────────────────────────────
linked_incident: ""                  # Reference to incident or bug if risk materialized
materialized_date: ""                # YYYY-MM-DD
materialized_impact: ""              # Description of actual impact when risk occurred

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  identified_in: ""                  # Object where this risk was first identified (REQUEST/IMPACT/etc.)
  affects: []                        # FEATURE-... or REQUEST-... IDs this risk affects
  mitigated_by: []                   # DECISION-... IDs for mitigation decisions

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

## 1. Risk Summary

**Risk ID:** `{object_id}`
**Category:** {risk_category}
**Status:** {status}
**Risk Owner:** {risk_owner}

---

## 2. Risk Statement

> Describe the risk in one clear statement. Format: "There is a risk that [event] will occur, resulting in [consequence]."

**Risk:** There is a risk that {event}, resulting in {consequence}.

---

## 3. Risk Assessment

| Dimension | Rating | Rationale |
|---|---|---|
| Probability | {High/Medium/Low} | {why this probability was assigned} |
| Impact | {Critical/High/Medium/Low} | {what the impact would be if this risk materializes} |
| **Risk Score** | **{Critical/High/Medium/Low}** | {P × I matrix result} |

---

## 4. Risk Category Details

**Category:** {risk_category}

| Category | Applies Because |
|---|---|
| SCHEMA | {how schema changes create this risk, or N/A} |
| PAYMENT | {how payment flows are at risk, or N/A} |
| AUTH | {how auth/role behavior is at risk, or N/A} |
| DATA | {how data integrity is at risk, or N/A} |
| INTEGRATION | {how integrations are at risk, or N/A} |
| PERFORMANCE | {performance concern, or N/A} |
| SECURITY | {security exposure, or N/A} |
| REGRESSION | {regression risk surface, or N/A} |
| SCOPE | {scope creep or scope ambiguity risk, or N/A} |
| COMPLIANCE | {regulatory or policy compliance risk, or N/A} |

---

## 5. Mitigation Plan

> What action is being taken to reduce the probability or impact of this risk?

**Mitigation:** {mitigation description}

**Mitigation actions:**
- [ ] {action 1}
- [ ] {action 2}

**Mitigation status:** {Not Started / In Progress / Complete}

**Residual risk after mitigation:** {remaining probability and impact after mitigation is applied}

---

## 6. Contingency Plan

> If the risk materializes despite mitigation — what do we do?

**Contingency:** {contingency description}

**Trigger:** {what signal indicates the risk has materialized or is about to}

**Response steps:**
1. {response step 1}
2. {response step 2}
3. {response step 3}

**Recovery time estimate:** {estimated time to recover from this risk materializing}

---

## 7. Status History

| Date | Status | Updated By | Notes |
|---|---|---|---|
| {YYYY-MM-DD} | Identified | {who} | Initial identification via {command} |
| {YYYY-MM-DD} | Assessed | {who} | Assessment complete |
| {YYYY-MM-DD} | Mitigated | {who} | Mitigation applied |

---

## 8. If Risk Materialized

> _(Complete only if status = Materialized)_

**Materialized Date:** {materialized_date}
**Actual Impact:** {materialized_impact}
**Linked Incident / Bug:** {linked_incident}
**Post-mortem:** {brief description of what happened and what was learned}

---

## 9. AI Reasoning Notes

**Identified by:** {command — e.g. /product-request, /product-impact}
**Why flagged:** {AI reasoning for why this was classified as a risk and at this severity}

---

## 10. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Risk identified |
| 1.1 | {YYYY-MM-DD} | {who} | Assessment updated |
