---
id: ""                               # e.g. AC-COM-PLP-CAROUSEL-001
object_type: AcceptanceCriteria
title: ""
status: ""                           # draft | approved | verified | failed

priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
schema_version: "2.0"
template_version: "1.0"
---

# Acceptance Criteria Object

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Capturing a standalone, reusable set of acceptance criteria that applies to a feature, epic, or user story. Use when criteria need to be referenced by multiple objects or tracked independently of any single story.
**Do not use this when:** Criteria are simple and belong directly on the story or task object — put them inline on the USER_STORY or TASK instead. Only create a standalone AC object for feature-level criteria or shared criteria blocks.
**Source-of-truth folder:** `product/objects/acceptance-criteria/`
**Related templates:** USER_STORY_OBJECT_TEMPLATE.md, EPIC_OBJECT_TEMPLATE.md, FEATURE_OBJECT_TEMPLATE.md, TEST_CASE_OBJECT_TEMPLATE.md

---

## Core Fields

| Field | Value |
|---|---|
| AC ID | AC-NNN |
| Title | [Short label — e.g. "Carousel render acceptance criteria"] |
| Scope | feature \| epic \| story \| release |
| Format | gherkin \| checklist \| table |
| Status | draft \| approved \| verified \| failed |
| Verified By | [QA Lead / Product Owner] |
| Verified Date | YYYY-MM-DD |

## Criteria

### Happy Path

- [ ] Given [context], when [action], then [expected result]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

### Edge Cases

- [ ] [Edge case criterion 1]
- [ ] [Edge case criterion 2]

### Out of Scope

- [What this feature / story deliberately does NOT do]

## Gherkin Format (optional)

```gherkin
Feature: [Feature name]

  Scenario: [Happy path scenario title]
    Given [initial context]
    When [action is taken]
    Then [expected outcome]
    And [secondary outcome]

  Scenario: [Edge case title]
    Given [context]
    When [edge action]
    Then [expected safe handling]
```

## Verification Evidence

```
test_run:       QA-RUN-... or UAT-RUN-...
test_cases:     []           # TEST-CASE-... IDs that cover these criteria
verified_by:    [Name]
verified_date:  YYYY-MM-DD
result:         passed | failed | partial
notes:          ""
```

## Linked Objects

```
linked_feature:     FEATURE-...
linked_epic:        EPIC-...
linked_story:       US-...
linked_test_cases:  []
```

## Audit

```
created_by:    [Human | AI]
created_date:  YYYY-MM-DD
updated_date:  YYYY-MM-DD
```
