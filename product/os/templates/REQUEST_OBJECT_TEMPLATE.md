# Nuemart Product OS — Request Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Request Objects created by `/product-request`. File location: `product/objects/requests/{file_slug}.md`

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. REQUEST-COM-PLP-CAROUSEL-001
legacy_id: ""                        # e.g. REQ-0003
object_type: Request

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""                # COM | ADM | DEL | INV | PAY | USR | RPT
module_code: ""                      # PLP | PDP | CART | CHK | ADDR | FAV | ORDHIS | etc.
submodule_code: ""                   # Optional
feature_slug: ""                     # kebab-case — e.g. carousel
sequence: ""                         # 001, 002, 003...
version: "1.0"
canonical_name: ""
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# REQUEST-SPECIFIC FIELDS
# ─────────────────────────────────────────────
request_type: ""                     # New Feature | Enhancement | Bug Fix | Config | Technical Debt | Documentation | Emergency
submitted_by: ""                     # Name or role of the person who requested this
submission_date: ""                  # YYYY-MM-DD

# ─────────────────────────────────────────────
# CLASSIFICATION
# ─────────────────────────────────────────────
status: Submitted                    # Submitted | Classified | Grilled | Evaluated | PRD In Progress | PRD Approved | In Development | QA | UAT | Released | Rejected | Deferred
classification_confidence: ""        # High | Medium | Low
priority: ""                         # Critical | High | Medium | Low

# ─────────────────────────────────────────────
# BLOCKING FLAGS
# ─────────────────────────────────────────────
blocking_flags:
  schema_change: false
  payment: false
  auth: false
  security: false
  integration: false
  release: false

# ─────────────────────────────────────────────
# FEATURE IMPACT
# ─────────────────────────────────────────────
feature_impact:
  creates: []                        # List of FEATURE-... IDs this request creates
  changes: []                        # List of FEATURE-... IDs this request modifies
  extends: []                        # List of FEATURE-... IDs this request extends
  deprecates: []                     # List of FEATURE-... IDs this request deprecates

# ─────────────────────────────────────────────
# LIFECYCLE TRACKING
# ─────────────────────────────────────────────
grilling_status: ""                  # Not Started | In Progress | Complete | Blocked
impact_assessment_status: ""         # Not Required | Not Started | Complete
evaluation_status: ""                # Not Required | Not Started | Complete
priority_recommendation: ""          # Approve | Defer | Reject | Needs More Info (from /product-evaluate)

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  has_feature: []                    # Linked Feature Object IDs
  has_risk: []                       # Linked Risk Object IDs
  requires_question: []              # Linked Open Question Object IDs
  has_discovery: ""                  # Discovery Session Object ID
  has_evaluation: ""                 # Evaluation Object ID
  has_impact_assessment: ""          # Impact Assessment Object ID
  has_prd: ""                        # PRD Object ID

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

## 1. Request Summary

**Request ID:** `{object_id}` | **Legacy ID:** `{legacy_id}`
**Type:** {request_type}
**Module:** {product_area_code} → {module_code} → {submodule_code}
**Submitted by:** {submitted_by} | **Date:** {submission_date}
**Status:** {status}

---

## 2. Business Context

> Why does this request exist? What business situation or pressure is driving it?

{business context description}

---

## 3. Problem Statement

> What is the specific user or business problem this request addresses?

{problem statement — written from the user's or business's perspective, not as a solution}

---

## 4. Desired Outcome

> If this request were fully satisfied, what would be different? What would users be able to do that they cannot do now?

{desired outcome description}

---

## 5. Classification

| Field | Value |
|---|---|
| Request Type | {request_type} |
| Classification Confidence | {classification_confidence} |
| Product Area | {product_area_code} |
| Module | {module_code} |
| Sub-module | {submodule_code} |
| Priority | {priority} |

**Classification Rationale:**
{Brief explanation of why the AI classified this request as it did.}

---

## 6. Blocking Flags

| Flag | Detected | Notes |
|---|---|---|
| Schema Change | {YES/NO} | {details if YES} |
| Payment Flow | {YES/NO} | {details if YES} |
| Auth / Role | {YES/NO} | {details if YES} |
| Security | {YES/NO} | {details if YES} |
| Integration | {YES/NO} | {details if YES} |
| Release Dependency | {YES/NO} | {details if YES} |

---

## 7. Feature Impact

**Creates new features:**
- {FEATURE-...} — {description}

**Changes existing features:**
- {FEATURE-...} — {what changes}

**Extends existing features:**
- {FEATURE-...} — {how extended}

**Deprecates:**
- {FEATURE-...} — {why deprecated}
- (or: None)

---

## 8. Open Questions

> _(Created as Open Question Objects and linked here. Resolved in /product-grill.)_

| Question ID | Question | Status | Answer |
|---|---|---|---|
| {QUESTION-...} | {question text} | {Open/Resolved} | {answer or "Pending"} |

---

## 9. Risks

> _(Created as Risk Objects and linked here.)_

| Risk ID | Risk Description | Probability | Impact | Status |
|---|---|---|---|---|
| {RISK-...} | {description} | {H/M/L} | {Critical/High/Medium/Low} | {Identified} |

---

## 10. Lifecycle Tracking

| Phase | Status | Date | Notes |
|---|---|---|---|
| Classification | {Complete/Pending} | {date} | |
| Grilling | {grilling_status} | {date} | |
| Evaluation | {evaluation_status} | {date} | {priority_recommendation} |
| Impact Assessment | {impact_assessment_status} | {date} | |
| PRD | {Complete/In Progress/Not Started} | {date} | |
| Development | {status} | {date} | |
| QA | {status} | {date} | |
| UAT | {status} | {date} | |
| Release | {status} | {date} | |

---

## 11. Next Action

**Current recommended next action:**
→ {next action with command if applicable}

**Reason:** {why this is the next step}

---

## 12. AI Reasoning

**Generated by:** `/product-request`
**Reasoning notes:**
- {reasoning step}
- {reasoning step}

---

## 13. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Initial creation via /product-request |

---

## Definition of Done

- [ ] Request classified with type and confidence noted
- [ ] Module and sub-module mapped
- [ ] Problem statement written
- [ ] Desired outcome written
- [ ] Blocking flags assessed (all 6 flags with YES/NO)
- [ ] Feature impact mapped (creates/changes/extends/deprecates)
- [ ] At least one Feature Object linked or created
- [ ] All open questions surfaced as linked Question Objects
- [ ] Risk Objects created for any identified high-risk elements
- [ ] Next action stated
- [ ] File written to `product/objects/requests/`
