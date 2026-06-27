---
id: ""                               # e.g. DSS-COM-PLP-CAROUSEL-001
object_type: DiscoverySession
title: ""
status: ""                           # planned | in-progress | complete | cancelled
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
# DiscoverySession

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Discovery Session object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/discovery-sessions/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Discovery Session Object Template

**Object type**: `discovery`
**ID format**: `DISC-[REQ-ID]-[slug]` (e.g., `DISC-REQ-0003-checkout-flow`)
**Folder**: `product/objects/discovery/`

---

```yaml
---
id: DISC-[REQ-ID]-[slug]
object_type: discovery
session_type: grilling | discovery-workshop | stakeholder-interview | user-research | engineering-deep-dive | other
status: draft | complete | archived
request_ref: REQ-XXXX
feature_ref: FEATURE-XXX (if linked to a feature)
session_date: YYYY-MM-DD
duration_minutes: 60
owner: [Product Manager]
participants:
  - name: [Name]
    role: [Role]
created_date: YYYY-MM-DD
---
```

# DISC-[ID] — [Session Title]

## Session Summary

One paragraph describing what this session was, who participated, and what it was trying to accomplish.

---

## Context

**Request / Feature being explored:** [REQ-XXXX / FEATURE-XXX]
**Why this session was needed:** [What was unclear or unknown before this session]

---

## Questions Explored

List the key questions this session set out to answer:

1.
2.
3.

---

## Key Findings

| # | Finding | Confidence | Impact |
|---|---------|------------|--------|
| 1 | | High / Medium / Low | |
| 2 | | | |
| 3 | | | |

### Finding Detail

**Finding 1 — [Title]**

[Detailed explanation]

**Finding 2 — [Title]**

[Detailed explanation]

---

## Constraints Identified

Any technical, business, or resource constraints surfaced during the session:

- [Constraint 1]
- [Constraint 2]

---

## Decisions Made

| # | Decision | Made By | Rationale |
|---|----------|---------|-----------|
| 1 | | | |
| 2 | | | |

---

## Assumptions Validated or Invalidated

| Assumption | Outcome | Notes |
|------------|---------|-------|
| | Validated / Invalidated / Partial | |

---

## Open Questions After Session

Questions that remain unresolved and need follow-up:

| # | Question | Owner | Due By |
|---|----------|-------|--------|
| 1 | | | |

---

## Next Steps

| # | Action | Owner | Due By |
|---|--------|-------|--------|
| 1 | | | |
| 2 | | | |

---

## Objects Updated or Created as Result

| Object Type | ID | Action |
|---|---|---|
| Request | REQ-XXXX | Updated — grilling_notes populated |
| PRD | PRD-XXXX | Created / Updated |
| Open Question | | Created |

---

## Audit
```
created:      YYYY-MM-DD
created_by:   [Name / AI]
last_updated: YYYY-MM-DD
```
