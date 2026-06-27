---
id: PR-XXXX
object_type: pull-request
title: ""
status: draft
# Status: draft | in-review | approved | merged | closed

github_pr_url: ""
github_pr_number: 0

story_ref: ""
task_ref: ""
feature_ref: ""
release_ref: ""

reviewer: ""
assignee: ""

owner: ""
created_date: ""
merged_date: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# pull-request

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Pull Request object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/pull-requests/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# PR-XXXX: [PR Title]

## Summary

[What does this PR do? Why?]

## Story / Task

**Story**: [US-XXXX]  
**Task**: [TASK-XXXX]  
**GitHub PR**: [link]

## Changes

[High-level summary of what changed]

## Review Checklist

Per `engineering/CODE_REVIEW_RULES.md`:

- [ ] Code is correct and solves the problem
- [ ] No obvious security issues
- [ ] Tests added or updated
- [ ] No unnecessary complexity
- [ ] Database changes are safe
- [ ] Error handling is appropriate
- [ ] Logging is appropriate

## QA Notes

[Anything the reviewer or QA should pay special attention to]
