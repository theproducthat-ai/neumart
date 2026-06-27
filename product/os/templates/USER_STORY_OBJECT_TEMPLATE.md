---
id: US-XXXX
object_type: user-story
title: ""
status: draft
# Status: draft | ready | in-progress | in-review | in-qa | done | deferred

parent_feature: "FEAT-XXX-XXX-XXX"
parent_epic: ""

# ─────────────────────────────────────────────
# HIERARCHY REFERENCES (V2)
# ─────────────────────────────────────────────
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
module_area_id: ""                   # MA-COM-PLP | MA-COM-CHK | MA-ADM-ORD | etc.
feature_id: ""                       # FEAT-XXX (derived from parent_feature)
sub
feature_id: ""                    # SUBFEATURE-XXX (if this story is for a sub-feature)
capability_id: ""                    # CAP-XXXX (which capability this story contributes to)
component_id: ""                     # CMP-XXXX (if story is component-specific, optional)

role: ""
goal: ""
outcome: ""
# As a [role], I want [goal], so that [outcome]

acceptance_criteria:
  - ""
  - ""
  - ""

story_points: 0
priority: medium
# Priority: critical | high | medium | low

sprint: ""
release_target: ""

owner: ""
assignee: ""
created_date: ""
updated_date: ""

design_ref: ""
figma_url: ""
design_required: false

related_objects:
  - id: ""
    type: ""
    relationship: ""

tasks: []
# List of TASK-XXXX IDs

dependencies: []
risks: []

notes: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file
test_cases: []                  # TEST-CASE-... IDs
qa_notes: ""
definition_of_ready:
  status: ""                       # not-ready | ready
  checklist: []

---
# user-story

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Writing user stories in "As a [role], I want [goal], so that [outcome]" format with acceptance criteria, linked to an epic or feature.
**Do not use this when:** Technical implementation tasks (use TASK_OBJECT_TEMPLATE.md). Stories not yet in format (use BACKLOG_ITEM_TEMPLATE.md or STORY_OBJECT_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/user-stories/`
**Related templates:** STORY_OBJECT_TEMPLATE.md, TASK_OBJECT_TEMPLATE.md, EPIC_OBJECT_TEMPLATE.md, ACCEPTANCE_CRITERIA_OBJECT_TEMPLATE.md

---


# US-XXXX: [Story Title]

## User Story

> As a **[role]**, I want **[goal]**, so that **[outcome]**.

## Acceptance Criteria

1. Given [context], when [action], then [expected result]
2. Given [context], when [action], then [expected result]
3. Given [context], when [action], then [expected result]

## Definition of Ready Checklist

- [ ] Story is clearly worded
- [ ] Acceptance criteria are testable
- [ ] Story is estimated
- [ ] Design is ready (if required)
- [ ] Dependencies are resolved or accepted
- [ ] Technical approach is understood

## Design Notes

[Figma link or design notes if applicable]

## Technical Notes

[Implementation notes, constraints, edge cases to consider]

## Out of Scope

[What is explicitly NOT covered by this story]
