# Feature Edge Case View

All edge case checklists across active features. Use this to see which features have open, blocking, or unresolved edge cases.

---

## Blocking Development Now

Features with unresolved `must-answer-before-development` critical/high edge cases:

| ECC ID | Feature | ECQ Count Blocking | Oldest Unresolved | Owner |
|--------|---------|-------------------|-------------------|-------|
| | | | | |

---

## Blocking PRD Finalisation

Features with unresolved `must-answer-before-prd` questions:

| ECC ID | Feature | PRD | Unresolved Count | Owner |
|--------|---------|-----|-----------------|-------|
| | | | | |

---

## Blocking Release

Features with unresolved `must-answer-before-release` questions:

| ECC ID | Feature | Release | Unresolved Count | Owner |
|--------|---------|---------|-----------------|-------|
| | | | | |

---

## All Active Checklists

| ECC ID | Feature | Status | Total Qs | Unanswered | Critical Open | PRD |
|--------|---------|--------|----------|------------|---------------|-----|
| | | | | | | |

---

## Recently Resolved

| ECC ID | Feature | Resolved Date | Total Questions | Deferred |
|--------|---------|---------------|-----------------|---------|
| | | | | |

---

## Edge Cases Converted to Artifacts (Last 30 Days)

| ECQ ID | Feature | Converted To | Object ID | Date |
|--------|---------|--------------|-----------|------|
| | | PRD requirement / AC / QA test | | |

---

## Edge Cases Deferred to Backlog

| ECQ ID | Feature | Scenario | BLI ID | Target Quarter |
|--------|---------|----------|--------|----------------|
| | | | | |

---

## Filters
- By feature: `feature_id=FEA-NNN`
- By status: `status=[unanswered | answered | deferred]`
- By classification: `classification=[must-answer-before-prd | must-answer-before-development | must-answer-before-release]`
- By severity: `severity=[critical | high | medium | low]`

---

## Supported Commands
```
Which edge cases are still unanswered?
Which edge cases are blocking development?
Which edge cases are blocking the PRD?
Which edge cases can be moved to backlog?
Convert answered edge cases into acceptance criteria.
Convert edge cases into QA test cases.
Show me edge cases for [ECC-NNN].
Generate edge case checklist for [feature name].
```

---

## Related
- Checklists: `product/objects/edge-case-checklists/`
- Index: `product/indexes/EDGE_CASE_INDEX.md`
- Policy: `product/os/policies/FEATURE_EDGE_CASE_DISCOVERY_RULES.md`
