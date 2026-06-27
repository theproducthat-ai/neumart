# Edge Case Checklists

Stores a feature-specific edge case checklist for every non-trivial feature. Each checklist is generated at intake time, before the PRD is finalised, and is progressively answered as the feature moves through discovery, design, development, QA, and release.

## ID Format
`ECC-NNN` (checklist), `ECQ-NNN` (individual question within a checklist)

## When Created
When a feature request is received and classified as non-trivial (not a micro-fix or copy change), an edge case checklist is generated automatically.

## Lifecycle
`generated` → `in-review` → `resolved` | `deferred`

Each question within a checklist has its own status.

## Linked Objects
- feature: `product/objects/features/`
- PRD: `product/objects/prds/`
- user stories: `product/objects/user-stories/`
- QA tests: `product/objects/qa-tests/`
- acceptance criteria: `product/objects/acceptance-criteria/`
- open questions: `product/objects/open-questions/`

## Template
`product/os/templates/FEATURE_EDGE_CASE_CHECKLIST_TEMPLATE.md`

## Policy
`product/os/policies/FEATURE_EDGE_CASE_DISCOVERY_RULES.md`

## Index
`product/indexes/EDGE_CASE_INDEX.md`

## View
`product/views/FEATURE_EDGE_CASE_VIEW.md`
