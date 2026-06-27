---
id: ""                               # e.g. ECC-COM-PLP-CAROUSEL-001
object_type: FeatureEdgeCaseChecklist
title: ""
status: ""                           # draft | reviewed | complete
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
# FeatureEdgeCaseChecklist

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Feature Edge Case Checklist object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/feature-edge-case-checklists/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Feature Edge Case Checklist: [ECC-NNN]

## Header
```
checklist_id:        ECC-NNN
feature_id:          FEA-NNN
feature_name:        [Feature name]
feature_type:        [carousel | cart-enhancement | payment | profile | order-management | admin-tooling | search-filter | notification | delivery | wallet | onboarding | analytics | integration | other]
linked_prd:          PRD-NNN
linked_request:      REQ-NNN
generated_by:        [AI | Human]
generated_date:      YYYY-MM-DD
status:              [generated | in-review | resolved | deferred]
```

## Summary Stats
```
total_questions:         [N]
must_answer_before_prd:  [N]
must_answer_before_dev:  [N]
must_answer_before_rel:  [N]
critical_unanswered:     [N]
high_unanswered:         [N]
deferred_to_backlog:     [N]
```

---

## How to Use This Checklist

1. Review each section below.
2. For each question, either answer it or accept the recommended default.
3. Mark `status` as `answered`, `defaulted`, or `deferred`.
4. Critical questions marked `must-answer-before-prd` must be resolved before the PRD is finalised.
5. Answered questions are converted to PRD requirements, acceptance criteria, or QA test cases.
6. Deferred questions become backlog items.

---

## Section 1 — User Experience Edge Cases

### ECQ-001
```
edge_case_id:            ECQ-NNN
dimension:               user-experience
scenario:                [Describe the UX edge case scenario]
question_to_user:        [The specific question to ask]
recommended_default:     [What to do if not answered]
impact_if_not_answered:  [What breaks or is unclear]
severity:                [critical | high | medium | low]
classification:          [must-answer-before-prd | must-answer-before-design | must-answer-before-development | must-answer-before-release | can-assume-for-mvp | can-defer-to-backlog]
decision_required:       [yes | no]
owner:                   [product | design | engineering | business]
status:                  [unanswered | answered | defaulted | deferred | N/A]
answer:                  [Fill in after discussion]
resulting_action:        [add-to-prd | acceptance-criterion | qa-test-case | backlog-item | open-question | none]
resulting_object:        [Object ID]
```

### ECQ-002
```
edge_case_id:            ECQ-NNN
dimension:               user-experience
scenario:                
question_to_user:        
recommended_default:     
impact_if_not_answered:  
severity:                
classification:          
decision_required:       
owner:                   
status:                  unanswered
answer:                  
resulting_action:        
resulting_object:        
```

---

## Section 2 — Empty State Edge Cases

### ECQ-NNN
```
edge_case_id:            ECQ-NNN
dimension:               empty-state
scenario:                No [data type] exists yet
question_to_user:        What should the user see when there is no [data]?
recommended_default:     Show an empty state illustration with a clear CTA
impact_if_not_answered:  Blank screen; user confusion; no guidance
severity:                high
classification:          must-answer-before-design
decision_required:       no
owner:                   design
status:                  unanswered
answer:                  
resulting_action:        
resulting_object:        
```

---

## Section 3 — Error State Edge Cases

### ECQ-NNN
```
edge_case_id:            ECQ-NNN
dimension:               error-state
scenario:                API call fails while loading [feature]
question_to_user:        What should the user see if [feature] fails to load?
recommended_default:     Show an error message with a retry button
impact_if_not_answered:  Silent failure; spinner stuck; no feedback to user
severity:                critical
classification:          must-answer-before-development
decision_required:       no
owner:                   engineering
status:                  unanswered
answer:                  
resulting_action:        
resulting_object:        
```

---

## Section 4 — Loading State Edge Cases

*(Add ECQ entries)*

---

## Section 5 — Mobile / Responsive Edge Cases

*(Add ECQ entries)*

---

## Section 6 — Permission and Role Edge Cases

*(Add ECQ entries)*

---

## Section 7 — Data Availability Edge Cases

*(Add ECQ entries)*

---

## Section 8 — Admin / Configuration Edge Cases

*(Add ECQ entries)*

---

## Section 9 — Business Rule Edge Cases

*(Add ECQ entries)*

---

## Section 10 — Operational Edge Cases

*(Add ECQ entries)*

---

## Section 11 — Support Edge Cases

*(Add ECQ entries)*

---

## Section 12 — Analytics / Tracking Edge Cases

*(Add ECQ entries)*

---

## Section 13 — Performance Edge Cases

*(Add ECQ entries)*

---

## Section 14 — Security / Privacy Edge Cases

*(Add ECQ entries)*

---

## Section 15 — Integration Edge Cases

*(Add ECQ entries — only if feature has third-party dependencies)*

---

## Section 16 — Failure / Retry Edge Cases

*(Add ECQ entries)*

---

## Section 17 — Dependency Edge Cases

*(Add ECQ entries)*

---

## Section 18 — Rollback Edge Cases

*(Add ECQ entries)*

---

## Section 19 — Future Scalability Edge Cases

*(Add ECQ entries)*

---

## Section 20 — Abuse / Misuse Edge Cases

*(Add ECQ entries — only if feature has potential for exploitation)*

---

## Resolution Summary

### Converted to PRD Requirements
| ECQ ID | Scenario | Requirement Added |
|--------|----------|------------------|
| | | |

### Converted to Acceptance Criteria
| ECQ ID | Scenario | Acceptance Criterion |
|--------|----------|---------------------|
| | | |

### Converted to QA Test Cases
| ECQ ID | Scenario | QA Test Case |
|--------|----------|--------------|
| | | |

### Deferred to Backlog
| ECQ ID | Scenario | BLI ID |
|--------|----------|--------|
| | | |

### Remaining Open Questions
| ECQ ID | Scenario | OPQ ID | Owner | Due |
|--------|----------|--------|-------|-----|
| | | | | |

---

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
resolved_date:   YYYY-MM-DD
```
