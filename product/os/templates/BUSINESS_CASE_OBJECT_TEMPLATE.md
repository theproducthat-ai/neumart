---
id: BC-XXXX
object_type: business-case
title: ""
status: draft
# Status: draft | in-review | approved | rejected | deferred

investment_required: ""
# Rough estimate of engineering + design effort and cost

expected_return: ""
# Revenue, cost saving, or strategic value

strategic_alignment: []
# Which OKRs or business goals does this support

risk: medium
# Risk level: low | medium | high | critical

priority: medium
owner: ""
created_date: ""
updated_date: ""

approved_by: ""
approval_date: ""

related_objects:
  features: []
  okrs: []
  initiatives: []

notes: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# business-case

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Business Case object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/business-cases/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# BC-XXXX: [Business Case Title]

## Problem / Opportunity

[What problem are we solving or opportunity are we capturing? Why now?]

## Proposed Solution

[High-level description of what we would build or do]

## Business Value

**Revenue impact**: [estimate or range]  
**Cost saving**: [estimate or range]  
**Strategic value**: [qualitative description]  
**Customer value**: [how this benefits customers]

## Investment Required

**Engineering effort**: [sprints / story points estimate]  
**Design effort**: [sprints / days estimate]  
**Other costs**: [third-party, licensing, etc.]

## Strategic Alignment

[Which OKRs, business goals, or initiatives does this support?]

## Alternatives Considered

| Option | Pros | Cons |
|---|---|---|
| Build | | |
| Buy/Partner | | |
| Do nothing | | |

## Risk Assessment

[Key risks if we proceed / don't proceed]

## Recommendation

[Clear recommendation: proceed / defer / reject, and why]

## Success Metrics

[How will we measure success if approved?]
