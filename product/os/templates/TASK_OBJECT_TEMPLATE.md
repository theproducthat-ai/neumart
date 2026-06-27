---
id: TASK-XXXX
object_type: task
title: ""
status: todo
# Status: todo | in-progress | in-review | done | blocked

parent_story: "US-XXXX"
parent_bug: ""
# Use parent_bug if this task is for a bug fix

assignee: ""
type: engineering
# Type: engineering | design | qa | infrastructure | documentation | research

estimated_hours: 0
actual_hours: 0

sprint: ""
due_date: ""

owner: ""
created_date: ""
updated_date: ""

blocked_by: ""
blocking: ""

notes: ""
acceptance_criteria: ""                      # How do you know this task is done?
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file
test_cases: []                  # TEST-CASE-... IDs
qa_notes: ""
definition_of_done:
  status: ""                        # not-done | done
  checklist: []

---
# task

**Template status:** Active
**Schema version:** 2.0
**Use this when:** A discrete engineering, design, QA, or infrastructure task assigned to one person, completable in 1–2 days.
**Do not use this when:** User stories (use USER_STORY_OBJECT_TEMPLATE.md). Epics or features (use their respective templates).
**Source-of-truth folder:** `product/objects/tasks/`
**Related templates:** USER_STORY_OBJECT_TEMPLATE.md, PULL_REQUEST_OBJECT_TEMPLATE.md

---


# TASK-XXXX: [Task Title]

## What Needs to Be Done

[Specific, actionable description of the task. A task should be completable by one person in 1-2 days.]

## Acceptance

[How do you know this task is done?]

## Technical Notes

[Any relevant technical context, approach hints, or constraints]
