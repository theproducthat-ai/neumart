---
id: ""                               # e.g. KNO-COM-PLP-001
object_type: Knowledge
title: ""
status: ""                           # active | draft | archived
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
# Knowledge

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Knowledge object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/knowledges/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Knowledge Object Template

**Object type**: `knowledge`
**ID format**: `KNW-[TOPIC]-NNNN` (e.g., `KNW-GROCERY-0001`, `KNW-ONBOARDING-0001`)
**Folder**: `product/objects/knowledge/`
**Note**: Use for domain knowledge, onboarding content, and lessons learned that do not fit another object type. Decisions → use `decisions/`. Process rules → use `rules/` or `os/policies/`. Research → use `ux-research/`.

---

```yaml
---
id: KNW-[TOPIC]-NNNN
object_type: knowledge
category: domain | onboarding | lessons-learned | competitive | technical | regulatory | other
title: [Knowledge article title]
status: current | outdated | archived
owner: [Product Manager]
audience: [product-team | engineering | design | all]
source: [Where this knowledge came from — experience, research, incident, external]
last_updated: YYYY-MM-DD
created_date: YYYY-MM-DD
---
```

# KNW-[ID] — [Title]

## Summary

One paragraph summary of what this knowledge article covers and why it matters to the team.

---

## Category

**Category:** [domain / onboarding / lessons-learned / competitive / technical / regulatory]
**Audience:** [Who should read this]
**Relevance:** [Which modules, features, or decisions this applies to]

---

## Content

[The knowledge itself — explain clearly. Use sub-headings if the article is long. Aim to be specific and actionable, not generic. Include examples where helpful.]

---

## Key Takeaways

- [Takeaway 1]
- [Takeaway 2]
- [Takeaway 3]

---

## What This Is NOT

_(Optional: clarify boundaries if there's risk of confusion)_

- Not a product decision → see `decisions/`
- Not a process rule → see `rules/` or `os/policies/`
- Not research findings → see `ux-research/`

---

## Source and References

| Source | Type | Notes |
|---|---|---|
| [Source 1] | Document / Experience / Incident | [Context] |

---

## Linked Objects

| Type | ID | Relationship |
|---|---|---|
| Decision | DEC-XXXX | This knowledge informed this decision |
| Feature | FEATURE-XXX | Applies to this feature |

---

## Review Notes

| Date | Reviewed By | Outcome |
|---|---|---|
| YYYY-MM-DD | | Still current / Updated / Archived |

---

## Audit
```
created:      YYYY-MM-DD
created_by:   [Name / AI]
last_updated: YYYY-MM-DD
```
