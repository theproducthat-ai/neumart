---
id: ""                               # e.g. DEP-COM-PLP-CAROUSEL-001
object_type: Dependency
title: ""
status: ""                           # Pending | Resolved | Accepted | Blocked
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
# Dependency

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Dependency object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/dependencys/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Nuemart Product OS — Dependency Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Dependency Objects. Dependencies represent a relationship where one object cannot be started, completed, or released until another object reaches a specific state. Dependencies are surfaced during `/product-impact` and tracked until resolved. File location: `product/objects/dependencies/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. DEP-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: Dependency

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Carousel depends on Banner Entity schema being ready"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# DEPENDENCY SPECIFIC FIELDS
# ─────────────────────────────────────────────
dependency_type: ""                  # Technical | Feature | External | Process | Data

# ─────────────────────────────────────────────
# SOURCE AND TARGET
# ─────────────────────────────────────────────
source_object: ""                    # Object ID of the dependent (the one that needs something)
source_object_type: ""               # Object type of source
source_object_name: ""               # Display name of source

target_object: ""                    # Object ID of the dependency (the one that must be ready)
target_object_type: ""               # Object type of target
target_object_name: ""               # Display name of target

# ─────────────────────────────────────────────
# DEPENDENCY DETAILS
# ─────────────────────────────────────────────
dependency_direction: ""             # "{source_object} depends on {target_object}"
required_state: ""                   # What state must target reach before source can proceed
                                     # e.g. "Complete", "Deployed", "Approved", "Available"

# ─────────────────────────────────────────────
# BLOCKER STATUS
# ─────────────────────────────────────────────
blocker: false                       # true if this dependency blocks all further work on source
blocks_phase: ""                     # Which phase or step is blocked (if not the entire source)
                                     # e.g. "Development", "QA", "Release"

# ─────────────────────────────────────────────
# RESOLUTION
# ─────────────────────────────────────────────
resolution_status: ""                # Unresolved | In Progress | Resolved | Waived
resolution_date: ""                  # YYYY-MM-DD (when resolved)
resolution_notes: ""                 # How the dependency was resolved
waiver_reason: ""                    # If waived: why and who approved

# ─────────────────────────────────────────────
# TIMELINE
# ─────────────────────────────────────────────
expected_resolution_date: ""         # When is the dependency expected to be resolved?
risk_if_unresolved: ""               # What happens if this dependency is not resolved in time?

# ─────────────────────────────────────────────
# OWNERSHIP
# ─────────────────────────────────────────────
dependency_owner: ""                 # Who is responsible for resolving or tracking this dependency
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

## 1. Dependency Summary

**Dependency ID:** `{object_id}`
**Type:** {dependency_type}
**Blocker:** {YES/NO}
**Resolution Status:** {resolution_status}
**Dependency Owner:** {dependency_owner}

---

## 2. Dependency Statement

> Clear statement of the dependency relationship.

**{source_object_name}** (`{source_object}`) depends on **{target_object_name}** (`{target_object}`) reaching state `{required_state}` before `{blocks_phase}` can proceed.

---

## 3. Dependency Type Details

| Type | Applies Because |
|---|---|
| Technical | {technical reason for dependency, or N/A} |
| Feature | {feature prerequisite reason, or N/A} |
| External | {external service or system dependency, or N/A} |
| Process | {process or approval dependency, or N/A} |
| Data | {data availability or schema dependency, or N/A} |

---

## 4. What Is Blocked

| Blocked Object | Blocked Phase | Impact of Delay |
|---|---|---|
| {source_object} | {phase} | {what is delayed and by how much} |

**Is this a complete blocker?** {YES — work cannot continue at all | NO — only phase X is blocked}

---

## 5. Target Object Status

| Field | Value |
|---|---|
| Target Object | {target_object} |
| Target Type | {target_object_type} |
| Current State | {current state of target object} |
| Required State | {required_state} |
| Gap | {what needs to change for dependency to be resolved} |
| Expected Ready By | {expected_resolution_date} |

---

## 6. Resolution Plan

> What is the plan to resolve this dependency?

**Plan:** {description of resolution plan}

**Resolution steps:**
- [ ] {step 1}
- [ ] {step 2}

**Owner:** {who is driving resolution}

**Risk if not resolved by {expected_resolution_date}:** {risk_if_unresolved}

---

## 7. Resolution History

| Date | Status | Updated By | Notes |
|---|---|---|---|
| {YYYY-MM-DD} | Unresolved | {who} | Identified via {command} |
| {YYYY-MM-DD} | In Progress | {who} | {progress note} |
| {YYYY-MM-DD} | Resolved | {who} | {how resolved} |

---

## 8. Waiver

> _(Complete only if dependency was waived rather than resolved.)_

**Waiver Reason:** {waiver_reason}
**Waived By:** {who approved the waiver}
**Waiver Risk Accepted:** {what risk is accepted by proceeding without resolving this dependency}

---

## 9. AI Reasoning Notes

**Identified by:** {command — e.g. /product-impact}
**Why flagged as blocker (or not):** {AI reasoning}

---

## 10. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Dependency identified |
| 1.1 | {YYYY-MM-DD} | {who} | Resolution status updated |
