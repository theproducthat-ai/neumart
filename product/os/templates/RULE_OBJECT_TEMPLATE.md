---
id: ""                               # e.g. RULE-COM-PLP-001
object_type: Rule
title: ""
status: ""                           # active | draft | deprecated
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
# Rule

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Rule object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/rules/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Rule Object Template

**Object type**: `rule`
**ID format**: `RULE-[DOMAIN]-NNNN` (e.g., `RULE-ORDER-0001`, `RULE-DELIVERY-0001`)
**Folder**: `product/objects/rules/`
**Note**: Use for business rules that govern product behaviour across multiple features. Operational process rules go in `product/os/policies/`.

---

```yaml
---
id: RULE-[DOMAIN]-NNNN
object_type: rule
domain: ORDER | DELIVERY | PAYMENT | COUPON | INVENTORY | USER | PRODUCT | OTHER
status: active | deprecated | under-review
applies_to:
  - [feature or module it applies to]
source: [Where this rule originated — business decision, legal, compliance, operations]
owner: [Product Manager / Operations Lead]
last_reviewed: YYYY-MM-DD
created_date: YYYY-MM-DD
---
```

# RULE-[ID] — [Rule Name]

## The Rule

**One clear, unambiguous statement of the rule:**

> [State the rule here in plain language. E.g., "Minimum order value is ₹200. Orders below ₹200 cannot be placed."]

---

## Domain

**Domain:** [ORDER / DELIVERY / PAYMENT / etc.]
**Applies to modules:** [COM, ADM, etc.]
**Applies to features:** [FEATURE-XXX, FEATURE-YYY]

---

## Rationale

Why this rule exists:

[Explanation — business reason, legal requirement, operational constraint, or product decision]

---

## Exceptions

| Exception | Condition | Authorized By |
|-----------|-----------|---------------|
| [Exception 1] | [When does it apply] | [Who authorised it] |
| _(none)_ if no exceptions | | |

---

## Implementation Notes

Where and how this rule is enforced in the product:
- **Frontend**: [What validation or UI enforcement exists]
- **Backend (Convex)**: [Which mutation or function enforces this rule]
- **Edge case**: [Any non-obvious edge case handling]

---

## Linked Objects

| Type | ID | Relationship |
|---|---|---|
| Feature | FEATURE-XXX | Rule applied in this feature |
| Policy | product/os/policies/XXX | Related process policy |

---

## Change History

| Date | Changed By | Change | Reason |
|---|---|---|---|
| YYYY-MM-DD | | Initial definition | |
