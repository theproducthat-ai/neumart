---
id: EPIC-XXXX
object_type: epic
title: ""
status: draft
# Status: draft | active | in-progress | completed | deferred

parent_feature: "FEAT-XXX-XXX-XXX"
sprint_target: ""
release_target: ""

# ─────────────────────────────────────────────
# HIERARCHY REFERENCES (V2)
# ─────────────────────────────────────────────
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
module_area_id: ""                   # MA-COM-PLP | MA-COM-CHK | MA-ADM-ORD | etc.
capability_id: ""                    # CAP-XXXX (which capability this epic delivers)
feature_id: ""                       # FEAT-XXX (derived from parent_feature — duplicate for quick filtering)
sub
feature_id: ""                    # SUBFEATURE-XXX (if epic is for a specific sub-feature)

owner: ""
created_date: ""
updated_date: ""
priority: medium
# Priority: critical | high | medium | low

related_objects:
  - id: ""
    type: ""
    relationship: ""

stories: []
# List of US-XXXX IDs in this epic

estimated_story_points: 0
completed_story_points: 0

notes: ""
acceptance_criteria: []                       # Criteria that must be met for this epic to be complete
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file
success_metrics: []              # KPI IDs or descriptive metrics
guardrail_metrics: []            # Metrics that must not regress
analytics_events: []             # ANALYTICS_EVENT-... IDs
dashboard_required: false        # Whether a dashboard object is needed
baseline_value: ""               # Current baseline before change
target_value: ""                 # Target value after change
measurement_window: ""           # e.g. "30 days post-release"
metric_owner: ""                 # Who owns tracking this metric
test_cases: []                  # TEST-CASE-... IDs
qa_notes: ""
definition_of_ready:
  status: ""                       # not-ready | ready
  checklist: []
definition_of_done:
  status: ""                        # not-done | done
  checklist: []

---
# epic

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Grouping related user stories under a feature into a deliverable work unit spanning one or more sprints.
**Do not use this when:** Features themselves (use FEATURE_OBJECT_TEMPLATE.md). Individual stories (use USER_STORY_OBJECT_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/epics/`
**Related templates:** FEATURE_OBJECT_TEMPLATE.md, USER_STORY_OBJECT_TEMPLATE.md, STORY_OBJECT_TEMPLATE.md

---


# EPIC-XXXX: [Epic Title]

## Purpose

[Why does this epic exist? What outcome will it deliver?]

## Scope

[What is included in this epic? What is explicitly NOT included?]

## User Stories

| Story ID | Title | Status | Points |
|---|---|---|---|
| US-XXXX | | draft | |
| US-XXXX | | draft | |

## Success Criteria

[How do we know this epic is done? What does "done" look like from a user or business perspective?]

## Dependencies

[What must be complete before this epic can start or complete?]

## Progress

**Status**: [draft | active | in-progress | completed]  
**Stories completed**: [X / Y]  
**Points completed**: [X / Y]
