---
id: ""                               # e.g. DECISION-COM-PLP-CAROUSEL-001
object_type: Decision
title: ""
status: ""                           # Draft | Final | Superseded
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
# Decision

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Recording a significant product, design, or technical decision — what was decided, why, who decided, and what alternatives were rejected.
**Do not use this when:** Minor implementation choices that are self-evident from the code. Design-specific decisions (use DESIGN_DECISION_OBJECT_TEMPLATE.md for those).
**Source-of-truth folder:** `product/objects/decisions/`
**Related templates:** RISK_OBJECT_TEMPLATE.md, DESIGN_DECISION_OBJECT_TEMPLATE.md, ASSUMPTION_OBJECT_TEMPLATE.md

---


# Nuemart Product OS — Decision Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Decision Objects. Decisions are recorded whenever a significant product, technical, process, risk, or policy choice is made that affects product direction. This creates an audit trail of "why" that outlasts the conversation that produced it. File location: `product/objects/decisions/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. DECISION-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: Decision

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Carousel auto-advance speed: 5 seconds"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# DECISION SPECIFIC FIELDS
# ─────────────────────────────────────────────
decision_type: ""                    # Scope | Technical | Process | Risk | Policy Waiver
decision_statement: ""               # The decision in one clear sentence
decision_date: ""                    # YYYY-MM-DD
decision_made_by: ""                 # Name or role

# ─────────────────────────────────────────────
# CONTEXT
# ─────────────────────────────────────────────
context: ""                          # What situation prompted this decision
trigger: ""                          # What specifically required a decision (question, conflict, blocker, risk)

# ─────────────────────────────────────────────
# ALTERNATIVES
# ─────────────────────────────────────────────
alternatives_considered: []          # List of other options that were evaluated

# ─────────────────────────────────────────────
# RATIONALE AND IMPLICATIONS
# ─────────────────────────────────────────────
rationale: ""                        # Why this option was chosen over alternatives
implications: ""                     # What changes as a result of this decision
trade_offs: ""                       # What is given up or accepted by making this choice

# ─────────────────────────────────────────────
# LINKED OBJECTS
# ─────────────────────────────────────────────
linked_object: ""                    # Primary object this decision relates to (REQUEST/FEATURE/PRD/etc.)
linked_objects_secondary: []         # Other related objects

# ─────────────────────────────────────────────
# REVISIT
# ─────────────────────────────────────────────
revisit_date: ""                     # YYYY-MM-DD (optional — if decision should be reviewed)
revisit_trigger: ""                  # What event or condition should prompt revisiting
is_reversible: true                  # Can this decision be undone without significant cost?

# ─────────────────────────────────────────────
# STATUS
# ─────────────────────────────────────────────
status: ""                           # Pending | Decided | Implemented | Revisited | Reversed

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

## 1. Decision Summary

**Decision ID:** `{object_id}`
**Type:** {decision_type}
**Status:** {status}
**Date:** {decision_date}
**Made By:** {decision_made_by}
**Linked Object:** {linked_object}

---

## 2. The Decision

> State the decision clearly and unambiguously in one sentence. Use past tense — this is a record of what was decided.

**Decision:** {decision_statement}

---

## 3. Context

> What situation, problem, or question prompted this decision?

{context — 2–4 sentences}

**Trigger:** {specific thing that required a decision}

---

## 4. Alternatives Considered

> What other options were evaluated before reaching this decision?

| Option | Description | Why Not Chosen |
|---|---|---|
| {option A} | {description} | {reason not chosen} |
| {option B} | {description} | {reason not chosen} |
| {option C — the chosen option} | {description} | Chosen (see rationale) |

---

## 5. Rationale

> Why was this option chosen? What factors were most important in the decision?

{rationale — 3–5 sentences. Be specific. Future readers need to understand the "why" even if the context has changed.}

---

## 6. Implications

> What changes as a result of this decision? What does this decision enable or foreclose?

**What this enables:**
- {implication 1}
- {implication 2}

**What this forecloses or makes harder:**
- {trade-off 1}
- {trade-off 2}

---

## 7. Trade-offs Accepted

> What is being given up or accepted in order to make this decision?

{trade-offs description — honest about costs, not just benefits}

---

## 8. Reversibility

**Is this decision reversible?** {YES — low cost | YES — moderate cost | NO — high cost}

**Reversal cost:** {description of what reversal would require}

---

## 9. Revisit

**Revisit date:** {date or "Not scheduled"}

**Revisit trigger:** {event or condition that should prompt reviewing this decision}

*Example triggers: "If auto-advance speed generates negative user feedback in post-release review", "When carousel content volume exceeds 10 items", "At next major version planning session"*

---

## 10. Impact on Other Objects

| Object ID | Object Type | How This Decision Affects It |
|---|---|---|
| {object_id} | {type} | {impact description} |

---

## 11. AI Reasoning Notes

**Generated in:** {command or context — e.g. "Surfaced during /product-grill as a Decision Candidate"}
**AI reasoning:** {why AI surfaced this as a decision needing documentation}

---

## 12. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Decision created |
| 1.1 | {YYYY-MM-DD} | {who} | Status updated to Implemented |
