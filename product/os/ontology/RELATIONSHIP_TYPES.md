# Nuemart Product OS — Relationship Types Registry

**Version:** 1.0.0
**Last Updated:** 2026-06-22
**Status:** Active
**Owner:** Product OS / Platform Team
**Location:** `product/os/ontology/RELATIONSHIP_TYPES.md`

---

## Overview

Relationships are the edges of the Nuemart Product Object Graph. Every meaningful connection between two Product Objects is expressed as a **typed, directed relationship**. Relationships enable:

- **Traceability** — follow the chain from Strategy → Requirement → Feature → Story → Test → Release
- **Impact analysis** — understand what breaks or changes when one object changes
- **Dependency management** — surface blockers and cross-team handoffs
- **Governance** — ensure every object is properly approved, tested, and released

### Relationship Format

In a Product Object file (YAML frontmatter):

```yaml
relationships:
  - type: created_from
    target: REQUEST-COM-PLP-CAROUSEL-001
    note: "Feature created from this approved and grilled request"
  - type: implemented_by
    target: STORY-COM-PLP-CAROUSEL-001
    note: ""
```

In the graph index (`product/graph/`), relationships are stored as directed edges:

```
FEATURE-COM-PLP-CAROUSEL-001 --[created_from]--> REQUEST-COM-PLP-CAROUSEL-001
REQUEST-COM-PLP-CAROUSEL-001 --[created_feature]--> FEATURE-COM-PLP-CAROUSEL-001
```

The inverse relationship is auto-derived by the graph engine. When you write `A created_from B`, the graph automatically adds `B created_feature A` as the reverse edge.

### Relationship Validation

The linter enforces:
- Source and target types must match the `Valid Source Types` and `Valid Target Types` for the relationship
- No self-referential relationships (an object cannot relate to itself)
- No duplicate relationships of the same type to the same target
- Dangling references (target does not exist) generate a lint warning

---

## Group 1: Structural Relationships

Structural relationships define the **containment and composition hierarchy** of the product. They model "what is part of what."

### contains

| | |
|---|---|
| **Direction** | A → B (A contains B) |
| **Description** | A is the parent container of B. B lives within A. Use for module/feature hierarchy. |
| **Valid Source Types** | PRODUCT, MODULE, SUBMODULE, CAPABILITY, FEATURE, EPIC, INIT, JOURNEY, SCREEN |
| **Valid Target Types** | MODULE, SUBMODULE, CAPABILITY, FEATURE, SUBFEATURE, CONFIG, RULE, PERMISSION, SCREEN, COMPONENT, ACTION, STATE |
| **Inverse** | belongs_to |
| **Example** | `MODULE-COM-PLP-001 --[contains]--> FEATURE-COM-PLP-CAROUSEL-001` |

---

### belongs_to

| | |
|---|---|
| **Direction** | A → B (A belongs to B) |
| **Description** | A is a child of B. B is the parent container. Inverse of `contains`. |
| **Valid Source Types** | MODULE, SUBMODULE, CAPABILITY, FEATURE, SUBFEATURE, CONFIG, RULE, PERMISSION, SCREEN, COMPONENT, ACTION, STATE |
| **Valid Target Types** | PRODUCT, MODULE, SUBMODULE, CAPABILITY, FEATURE, EPIC, INIT, JOURNEY, SCREEN |
| **Inverse** | contains |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[belongs_to]--> MODULE-COM-PLP-001` |

---

### has_capability

| | |
|---|---|
| **Direction** | A → B (A has capability B) |
| **Description** | A product or module has a platform capability. Capabilities are cross-cutting; a module may have multiple. |
| **Valid Source Types** | PRODUCT, MODULE, SUBMODULE |
| **Valid Target Types** | CAPABILITY |
| **Inverse** | is_part_of |
| **Example** | `MODULE-COM-PLP-001 --[has_capability]--> CAPABILITY-COM-SEARCH-001` |

---

### has_feature

| | |
|---|---|
| **Direction** | A → B (A has feature B) |
| **Description** | A module, sub-module, or capability exposes a feature. |
| **Valid Source Types** | MODULE, SUBMODULE, CAPABILITY, EPIC |
| **Valid Target Types** | FEATURE |
| **Inverse** | belongs_to |
| **Example** | `SUBMODULE-COM-PLP-BANNER-001 --[has_feature]--> FEATURE-COM-PLP-CAROUSEL-001` |

---

### has_subfeature

| | |
|---|---|
| **Direction** | A → B (A has sub-feature B) |
| **Description** | A feature has a sub-feature that can be scoped or built independently. |
| **Valid Source Types** | FEATURE |
| **Valid Target Types** | SUBFEATURE |
| **Inverse** | belongs_to |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[has_subfeature]--> SUBFEATURE-COM-PLP-CAROUSEL-AUTOSCROLL-001` |

---

### has_screen

| | |
|---|---|
| **Direction** | A → B (A has screen B) |
| **Description** | A module or feature is expressed on a specific screen. |
| **Valid Source Types** | MODULE, SUBMODULE, FEATURE, JOURNEY |
| **Valid Target Types** | SCREEN |
| **Inverse** | belongs_to |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[has_screen]--> SCREEN-COM-PLP-001` |

---

### has_component

| | |
|---|---|
| **Direction** | A → B (A has component B) |
| **Description** | A screen or feature is implemented by a UI component. |
| **Valid Source Types** | SCREEN, FEATURE, SUBFEATURE |
| **Valid Target Types** | COMPONENT |
| **Inverse** | is_part_of |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[has_component]--> COMPONENT-COM-CAROUSELSTRIP-001` |

---

### has_configuration

| | |
|---|---|
| **Direction** | A → B (A has configuration B) |
| **Description** | A feature or module is governed by a configurable parameter. |
| **Valid Source Types** | FEATURE, MODULE, SUBMODULE, CAPABILITY |
| **Valid Target Types** | CONFIG |
| **Inverse** | is_part_of |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[has_configuration]--> CONFIG-COM-PLP-CAROUSEL-SPEED-001` |

---

### has_rule

| | |
|---|---|
| **Direction** | A → B (A has rule B) |
| **Description** | A feature or module enforces a business rule. |
| **Valid Source Types** | FEATURE, MODULE, CAPABILITY, PRODUCT |
| **Valid Target Types** | RULE |
| **Inverse** | is_part_of |
| **Example** | `FEATURE-PAY-PAYLATER-001 --[has_rule]--> RULE-PAY-PAYLATER-ELIGIBILITY-001` |

---

### has_permission

| | |
|---|---|
| **Direction** | A → B (A has permission B) |
| **Description** | A role or feature has an associated access permission. |
| **Valid Source Types** | ROLE, FEATURE, MODULE |
| **Valid Target Types** | PERMISSION |
| **Inverse** | is_part_of |
| **Example** | `ROLE-ADM-CATALOG-MANAGER-001 --[has_permission]--> PERMISSION-ADM-CATALOG-PRICE-EDIT-001` |

---

### is_part_of

| | |
|---|---|
| **Direction** | A → B (A is part of B) |
| **Description** | Generic structural membership. Use more specific relationships where possible. Fallback when no specific structural relationship applies. |
| **Valid Source Types** | Any structural type |
| **Valid Target Types** | Any structural type |
| **Inverse** | contains |
| **Example** | `COMPONENT-COM-PRODUCTCARD-001 --[is_part_of]--> SCREEN-COM-PLP-001` |

---

## Group 2: Requirement Relationships

Requirement relationships trace the origin and specification of product work.

### requested_by

| | |
|---|---|
| **Direction** | A → B (A was requested by B) |
| **Description** | A feature or capability was originated by an incoming request. |
| **Valid Source Types** | FEATURE, EPIC, STORY, PRD |
| **Valid Target Types** | REQUEST |
| **Inverse** | created_feature / created_epic |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[requested_by]--> REQUEST-COM-PLP-CAROUSEL-001` |

---

### created_from

| | |
|---|---|
| **Direction** | A → B (A was created from B) |
| **Description** | A product object was derived from another object (e.g. a PRD was created from a Request; a Feature was created from a PRD). |
| **Valid Source Types** | FEATURE, EPIC, PRD, STORY, TASK, DEVPLAN |
| **Valid Target Types** | REQUEST, OPP, DISCOVERY, PRD, EPIC |
| **Inverse** | created (source created target) |
| **Example** | `PRD-COM-PLP-CAROUSEL-V1 --[created_from]--> REQUEST-COM-PLP-CAROUSEL-001` |

---

### discovered_in

| | |
|---|---|
| **Direction** | A → B (A was discovered in session B) |
| **Description** | A problem, opportunity, or requirement was surfaced in a discovery session. |
| **Valid Source Types** | PROBLEM, OPP, REQUIREMENT, ASSUMPTION, QUESTION |
| **Valid Target Types** | DISCOVERY |
| **Inverse** | surfaced |
| **Example** | `PROBLEM-COM-PLP-DISCOVERY-001 --[discovered_in]--> DISCOVERY-COM-GROCERY-BROWSING-001` |

---

### specified_by

| | |
|---|---|
| **Direction** | A → B (A is specified by B) |
| **Description** | A feature or story is fully specified by a PRD or requirement document. |
| **Valid Source Types** | FEATURE, EPIC, STORY, SUBFEATURE |
| **Valid Target Types** | PRD, REQUIREMENT |
| **Inverse** | specifies |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[specified_by]--> PRD-COM-PLP-CAROUSEL-V1` |

---

### requires_question

| | |
|---|---|
| **Direction** | A → B (A requires question B to be resolved) |
| **Description** | An object's progress is blocked pending the resolution of an open question. |
| **Valid Source Types** | FEATURE, PRD, STORY, EPIC, REQUIREMENT |
| **Valid Target Types** | QUESTION |
| **Inverse** | blocks |
| **Example** | `PRD-COM-PLP-CAROUSEL-V1 --[requires_question]--> QUESTION-COM-PLP-CAROUSEL-AUTOSCROLL-001` |

---

### has_requirement

| | |
|---|---|
| **Direction** | A → B (A has requirement B) |
| **Description** | A PRD or feature has a specific requirement. |
| **Valid Source Types** | PRD, FEATURE, EPIC |
| **Valid Target Types** | REQUIREMENT |
| **Inverse** | required_by |
| **Example** | `PRD-COM-PLP-CAROUSEL-V1 --[has_requirement]--> REQUIREMENT-COM-PLP-CAROUSEL-AUTOSCROLL-001` |

---

### has_acceptance_criterion

| | |
|---|---|
| **Direction** | A → B (A has acceptance criterion B) |
| **Description** | A feature, story, or PRD has a specific acceptance criterion. |
| **Valid Source Types** | FEATURE, STORY, PRD, EPIC |
| **Valid Target Types** | ACCEPTANCE |
| **Inverse** | acceptance_of |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[has_acceptance_criterion]--> ACCEPTANCE-COM-PLP-CAROUSEL-001` |

---

### out_of_scope_for

| | |
|---|---|
| **Direction** | A → B (A is explicitly out of scope for B) |
| **Description** | An item or capability is explicitly excluded from a feature or PRD. |
| **Valid Source Types** | OUTOFSCOPE |
| **Valid Target Types** | FEATURE, PRD, EPIC |
| **Inverse** | has_out_of_scope |
| **Example** | `OUTOFSCOPE-COM-PLP-CAROUSEL-VIDEO-001 --[out_of_scope_for]--> FEATURE-COM-PLP-CAROUSEL-001` |

---

### resolves

| | |
|---|---|
| **Direction** | A → B (A resolves B) |
| **Description** | An object resolves a problem, question, or open issue. |
| **Valid Source Types** | FEATURE, DECISION, BUG, STORY |
| **Valid Target Types** | PROBLEM, QUESTION, BUG, INCIDENT |
| **Inverse** | resolved_by |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[resolves]--> PROBLEM-COM-PLP-DISCOVERY-001` |

---

### supersedes_requirement

| | |
|---|---|
| **Direction** | A → B (A supersedes requirement B) |
| **Description** | A new requirement or PRD supersedes an older one. The older one is deprecated. |
| **Valid Source Types** | REQUIREMENT, PRD |
| **Valid Target Types** | REQUIREMENT, PRD |
| **Inverse** | superseded_by |
| **Example** | `PRD-COM-PLP-CAROUSEL-V2 --[supersedes_requirement]--> PRD-COM-PLP-CAROUSEL-V1` |

---

## Group 3: Delivery Relationships

Delivery relationships trace the implementation of product requirements into code and builds.

### implemented_by

| | |
|---|---|
| **Direction** | A → B (A is implemented by B) |
| **Description** | A feature or requirement is implemented by a story, task, or prompt. |
| **Valid Source Types** | FEATURE, SUBFEATURE, REQUIREMENT, EPIC |
| **Valid Target Types** | STORY, TASK, PROMPT, DEVPLAN |
| **Inverse** | implements |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[implemented_by]--> STORY-COM-PLP-CAROUSEL-001` |

---

### planned_by

| | |
|---|---|
| **Direction** | A → B (A is planned by B) |
| **Description** | A feature or epic is planned by an implementation plan. |
| **Valid Source Types** | FEATURE, EPIC, INIT |
| **Valid Target Types** | DEVPLAN |
| **Inverse** | plans |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[planned_by]--> DEVPLAN-COM-PLP-CAROUSEL-001` |

---

### coded_by_prompt

| | |
|---|---|
| **Direction** | A → B (A was coded by AI prompt B) |
| **Description** | A story or task was implemented using a specific AI coding prompt. Enables traceability of AI-generated code. |
| **Valid Source Types** | STORY, TASK |
| **Valid Target Types** | PROMPT |
| **Inverse** | generated |
| **Example** | `STORY-COM-PLP-CAROUSEL-001 --[coded_by_prompt]--> PROMPT-COM-PLP-CAROUSEL-COMPONENT-001` |

---

### blocked_by

| | |
|---|---|
| **Direction** | A → B (A is blocked by B) |
| **Description** | A story, task, or feature cannot progress because B is unresolved. |
| **Valid Source Types** | STORY, TASK, FEATURE, EPIC |
| **Valid Target Types** | BLOCKER, QUESTION, DEPENDENCY, BUG, INCOMPLETE |
| **Inverse** | blocks |
| **Example** | `STORY-COM-PLP-CAROUSEL-001 --[blocked_by]--> BLOCKER-COM-PLP-CAROUSEL-001` |

---

### depends_on

| | |
|---|---|
| **Direction** | A → B (A depends on B) |
| **Description** | A cannot be delivered or function correctly without B being in place. Softer than `blocked_by`; B may not yet be blocking but will be needed. |
| **Valid Source Types** | FEATURE, STORY, TASK, EPIC, INTEGRATION |
| **Valid Target Types** | FEATURE, STORY, TASK, INTEGRATION, API, ENTITY, DEPENDENCY |
| **Inverse** | required_for |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[depends_on]--> INTEGRATION-CMS-BANNER-001` |

---

### duplicates

| | |
|---|---|
| **Direction** | A → B (A duplicates B) |
| **Description** | A is a duplicate of B. A should be closed; B is the canonical object. |
| **Valid Source Types** | STORY, TASK, BUG, REQUEST, FEATURE |
| **Valid Target Types** | STORY, TASK, BUG, REQUEST, FEATURE |
| **Inverse** | duplicated_by |
| **Example** | `BUG-COM-PLP-002 --[duplicates]--> BUG-COM-PLP-001` |

---

### supersedes

| | |
|---|---|
| **Direction** | A → B (A supersedes B) |
| **Description** | A replaces B in the delivery plan. B is deprecated or archived. |
| **Valid Source Types** | STORY, TASK, DEVPLAN, PROMPT |
| **Valid Target Types** | STORY, TASK, DEVPLAN, PROMPT |
| **Inverse** | superseded_by |
| **Example** | `DEVPLAN-COM-PLP-CAROUSEL-002 --[supersedes]--> DEVPLAN-COM-PLP-CAROUSEL-001` |

---

### extends

| | |
|---|---|
| **Direction** | A → B (A extends B) |
| **Description** | A adds to or builds on top of B without replacing it. Both remain active. |
| **Valid Source Types** | FEATURE, STORY, EPIC |
| **Valid Target Types** | FEATURE, STORY, EPIC |
| **Inverse** | extended_by |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-ANALYTICS-001 --[extends]--> FEATURE-COM-PLP-CAROUSEL-001` |

---

### changes

| | |
|---|---|
| **Direction** | A → B (A changes B) |
| **Description** | A delivery object makes a modification to an existing product object or behaviour. |
| **Valid Source Types** | STORY, TASK, EPIC, ENHANCEMENT |
| **Valid Target Types** | FEATURE, SUBFEATURE, CONFIG, RULE, API |
| **Inverse** | changed_by |
| **Example** | `STORY-COM-PLP-CAROUSEL-002 --[changes]--> CONFIG-COM-PLP-CAROUSEL-SPEED-001` |

---

### replaces

| | |
|---|---|
| **Direction** | A → B (A replaces B) |
| **Description** | A completely replaces B. B is decommissioned. Stronger than supersedes — used when B must be removed. |
| **Valid Source Types** | FEATURE, INTEGRATION, API, COMPONENT |
| **Valid Target Types** | FEATURE, INTEGRATION, API, COMPONENT |
| **Inverse** | replaced_by |
| **Example** | `INTEGRATION-PAY-RAZORPAY-V2-001 --[replaces]--> INTEGRATION-PAY-RAZORPAY-001` |

---

## Group 4: Quality Relationships

Quality relationships trace the validation and verification of delivered work.

### tested_by

| | |
|---|---|
| **Direction** | A → B (A is tested by B) |
| **Description** | A feature, story, or requirement is validated by a test plan or test case. |
| **Valid Source Types** | FEATURE, STORY, REQUIREMENT, ACCEPTANCE, SUBFEATURE |
| **Valid Target Types** | TESTPLAN, TEST, QA, UAT |
| **Inverse** | tests |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[tested_by]--> TESTPLAN-COM-PLP-CAROUSEL-001` |

---

### validated_by

| | |
|---|---|
| **Direction** | A → B (A is validated by B) |
| **Description** | A feature or release is validated by a UAT run or sign-off. Distinct from `tested_by` which covers QA; `validated_by` covers business/user acceptance. |
| **Valid Source Types** | FEATURE, RELEASE, EPIC |
| **Valid Target Types** | UAT, SIGNOFF |
| **Inverse** | validates |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[validated_by]--> UAT-COM-PLP-CAROUSEL-001` |

---

### failed_by

| | |
|---|---|
| **Direction** | A → B (A was failed by test run B) |
| **Description** | A feature or story failed a QA or UAT run. |
| **Valid Source Types** | FEATURE, STORY, ACCEPTANCE |
| **Valid Target Types** | QA, UAT, TEST |
| **Inverse** | failed |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[failed_by]--> QA-COM-PLP-CAROUSEL-001` |

---

### regresses

| | |
|---|---|
| **Direction** | A → B (A regresses B) |
| **Description** | A change or delivery object introduces regression risk to B. |
| **Valid Source Types** | STORY, TASK, EPIC, FEATURE |
| **Valid Target Types** | FEATURE, SUBFEATURE, API, COMPONENT |
| **Inverse** | at_risk_from |
| **Example** | `STORY-COM-PLP-CAROUSEL-002 --[regresses]--> FEATURE-COM-PLP-GRID-001` |

---

### approved_by

| | |
|---|---|
| **Direction** | A → B (A was approved by gate/sign-off B) |
| **Description** | A product object passed a formal approval gate. |
| **Valid Source Types** | PRD, FEATURE, RELEASE, DEVPLAN |
| **Valid Target Types** | GATE, SIGNOFF |
| **Inverse** | approves |
| **Example** | `PRD-COM-PLP-CAROUSEL-V1 --[approved_by]--> GATE-PRD-APPROVAL-001` |

---

### verified_against

| | |
|---|---|
| **Direction** | A → B (A was verified against B) |
| **Description** | A test result or QA run was verified against specific acceptance criteria. |
| **Valid Source Types** | TEST, QA, UAT |
| **Valid Target Types** | ACCEPTANCE, REQUIREMENT |
| **Inverse** | verified_by |
| **Example** | `TEST-COM-PLP-CAROUSEL-001 --[verified_against]--> ACCEPTANCE-COM-PLP-CAROUSEL-001` |

---

### covered_by

| | |
|---|---|
| **Direction** | A → B (A is covered by B) |
| **Description** | An acceptance criterion is covered by a test case. |
| **Valid Source Types** | ACCEPTANCE, REQUIREMENT |
| **Valid Target Types** | TEST, TESTPLAN |
| **Inverse** | covers |
| **Example** | `ACCEPTANCE-COM-PLP-CAROUSEL-001 --[covered_by]--> TEST-COM-PLP-CAROUSEL-001` |

---

### fails_acceptance_criterion

| | |
|---|---|
| **Direction** | A → B (A failed acceptance criterion B) |
| **Description** | A test run identified that a specific acceptance criterion is not met. Creates a direct link from the failure to the unmet criterion. |
| **Valid Source Types** | BUG, QA, TEST |
| **Valid Target Types** | ACCEPTANCE |
| **Inverse** | failed_in |
| **Example** | `BUG-COM-PLP-CAROUSEL-001 --[fails_acceptance_criterion]--> ACCEPTANCE-COM-PLP-CAROUSEL-002` |

---

## Group 5: Impact Relationships

Impact relationships model the **side-effects and consequences** of product decisions.

### impacts

| | |
|---|---|
| **Direction** | A → B (A impacts B) |
| **Description** | A change to A has a measurable or notable effect on B. Used for cross-module impact analysis. |
| **Valid Source Types** | FEATURE, EPIC, STORY, BUG, INCIDENT, ENHANCEMENT |
| **Valid Target Types** | FEATURE, MODULE, KPI, ENTITY, API, RULE, PERSONA |
| **Inverse** | impacted_by |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-001 --[impacts]--> KPI-COM-BANNER-CTR-001` |

---

### creates (impact sense)

| | |
|---|---|
| **Direction** | A → B (A creates B as a consequence) |
| **Description** | A product change or event creates a new object as a downstream consequence — e.g. a feature creates an audit record, a release creates release notes. |
| **Valid Source Types** | FEATURE, RELEASE, INCIDENT |
| **Valid Target Types** | AUDIT, RELNOTE, ENHANCEMENT, INCIDENT, MONITOR |
| **Inverse** | created_by |
| **Example** | `RELEASE-2026-02-14-V1 --[creates]--> RELNOTE-2026-02-14-001` |

---

### deprecates

| | |
|---|---|
| **Direction** | A → B (A deprecates B) |
| **Description** | A makes B obsolete. B should be archived after A is released. |
| **Valid Source Types** | FEATURE, RELEASE, DECISION |
| **Valid Target Types** | FEATURE, API, RULE, CONFIG, COMPONENT |
| **Inverse** | deprecated_by |
| **Example** | `FEATURE-COM-PLP-CAROUSEL-V2-001 --[deprecates]--> FEATURE-COM-PLP-STATICBANNER-001` |

---

### conflicts_with

| | |
|---|---|
| **Direction** | A ↔ B (bidirectional conflict) |
| **Description** | A and B are in conflict — overlapping scope, contradictory requirements, or incompatible technical approaches. Conflicts must be resolved before both can proceed. |
| **Valid Source Types** | FEATURE, REQUIREMENT, RULE, DECISION |
| **Valid Target Types** | FEATURE, REQUIREMENT, RULE, DECISION |
| **Inverse** | conflicts_with (symmetric) |
| **Example** | `RULE-PAY-PAYLATER-001 --[conflicts_with]--> RULE-PAY-PAYLATER-002` |

---

### enables

| | |
|---|---|
| **Direction** | A → B (A enables B) |
| **Description** | A unlocks or unblocks B. Once A is released, B becomes feasible. |
| **Valid Source Types** | FEATURE, CAPABILITY, INTEGRATION, API |
| **Valid Target Types** | FEATURE, CAPABILITY, EPIC |
| **Inverse** | enabled_by |
| **Example** | `INTEGRATION-PAY-RAZORPAY-001 --[enables]--> FEATURE-PAY-PAYLATER-001` |

---

### reduces_risk_for

| | |
|---|---|
| **Direction** | A → B (A reduces risk for B) |
| **Description** | A mitigation object reduces the risk level of B. |
| **Valid Source Types** | FEATURE, DECISION, TESTPLAN, ROLLBACK |
| **Valid Target Types** | FEATURE, RELEASE, INTEGRATION |
| **Inverse** | risk_reduced_by |
| **Example** | `ROLLBACK-2026-02-14-V1 --[reduces_risk_for]--> RELEASE-2026-02-14-V1` |

---

## Group 6: Governance Relationships

Governance relationships enforce **process, compliance, and decision accountability**.

### governed_by

| | |
|---|---|
| **Direction** | A → B (A is governed by B) |
| **Description** | A product object is subject to a policy, rule, or lifecycle rule. |
| **Valid Source Types** | FEATURE, MODULE, API, ENTITY, RELEASE |
| **Valid Target Types** | POLICY, RULE, LCRULE, COMPRULE |
| **Inverse** | governs |
| **Example** | `ENTITY-COM-USER-001 --[governed_by]--> COMPRULE-INDIA-DATA-LOCALISATION-001` |

---

### requires_gate

| | |
|---|---|
| **Direction** | A → B (A requires gate B to proceed) |
| **Description** | A lifecycle transition for A requires passing through gate B. |
| **Valid Source Types** | FEATURE, PRD, RELEASE, EPIC |
| **Valid Target Types** | GATE |
| **Inverse** | gates |
| **Example** | `PRD-COM-PLP-CAROUSEL-V1 --[requires_gate]--> GATE-PRD-APPROVAL-001` |

---

### requires_impact_assessment

| | |
|---|---|
| **Direction** | A → B (A requires an impact assessment B) |
| **Description** | A change object requires a formal impact assessment before proceeding. |
| **Valid Source Types** | FEATURE, EPIC, REQUEST |
| **Valid Target Types** | EVAL, SCORE |
| **Inverse** | assesses |
| **Example** | `REQUEST-COM-PLP-CAROUSEL-001 --[requires_impact_assessment]--> EVAL-COM-PLP-CAROUSEL-001` |

---

### requires_compliance_review

| | |
|---|---|
| **Direction** | A → B (A requires a compliance review against rule B) |
| **Description** | A product object requires review against a compliance or regulatory rule. |
| **Valid Source Types** | FEATURE, ENTITY, INTEGRATION, RELEASE |
| **Valid Target Types** | COMPRULE, POLICY |
| **Inverse** | reviewed_by |
| **Example** | `FEATURE-PAY-PAYLATER-001 --[requires_compliance_review]--> COMPRULE-INDIA-LENDING-001` |

---

### violates

| | |
|---|---|
| **Direction** | A → B (A violates B) |
| **Description** | A product object or behaviour violates a policy or rule. Generates a critical governance alert. |
| **Valid Source Types** | FEATURE, STORY, API, ENTITY |
| **Valid Target Types** | POLICY, RULE, COMPRULE |
| **Inverse** | violated_by |
| **Example** | `FEATURE-COM-USER-LOCATION-001 --[violates]--> COMPRULE-INDIA-DATA-LOCALISATION-001` |

---

### waived_by

| | |
|---|---|
| **Direction** | A → B (A was waived by decision B) |
| **Description** | A governance requirement or gate was formally waived by a governance decision. Requires explicit approval. |
| **Valid Source Types** | GATE, LCRULE, COMPRULE |
| **Valid Target Types** | DECISION |
| **Inverse** | waives |
| **Example** | `GATE-PRD-APPROVAL-001 --[waived_by]--> DECISION-COM-PLP-CAROUSEL-EXPEDITE-001` |

---

### escalated_to

| | |
|---|---|
| **Direction** | A → B (A was escalated to B) |
| **Description** | A blocked or conflicted object was escalated to a governance decision owner. |
| **Valid Source Types** | BLOCKER, CONFLICT, QUESTION, INCIDENT |
| **Valid Target Types** | DECISION, GATE |
| **Inverse** | handles_escalation |
| **Example** | `CONFLICT-COM-PLP-CAROUSEL-001 --[escalated_to]--> DECISION-COM-PLP-CAROUSEL-001` |

---

### approved_at_gate

| | |
|---|---|
| **Direction** | A → B (A was approved at gate B) |
| **Description** | A object passed a formal approval gate. Links the approval event to the gate definition. |
| **Valid Source Types** | PRD, FEATURE, RELEASE, DEVPLAN |
| **Valid Target Types** | GATE |
| **Inverse** | gate_passed_by |
| **Example** | `RELEASE-2026-02-14-V1 --[approved_at_gate]--> GATE-RELEASE-APPROVAL-001` |

---

## Group 7: Knowledge Relationships

Knowledge relationships model **learning, evidence, and information flow** in the Product OS.

### derived_from

| | |
|---|---|
| **Direction** | A → B (A was derived from B) |
| **Description** | A is a logical derivation or transformation of B. Used for AI-generated objects, distilled insights, and summarised views. |
| **Valid Source Types** | RECOMMEND, TRACE, OPP, PROBLEM, ASSUMPTION |
| **Valid Target Types** | DISCOVERY, EVIDENCE, MONITOR, QA, UAT |
| **Inverse** | derives |
| **Example** | `RECOMMEND-COM-PLP-001 --[derived_from]--> MONITOR-COM-PLP-CAROUSEL-CTR-001` |

---

### references

| | |
|---|---|
| **Direction** | A → B (A references B) |
| **Description** | A mentions or links to B for context, without being causally dependent on it. Lightweight relationship used for cross-references. |
| **Valid Source Types** | Any |
| **Valid Target Types** | Any |
| **Inverse** | referenced_by |
| **Example** | `PRD-COM-PLP-CAROUSEL-V1 --[references]--> MKTCTX-INDIA-QUICKCOMMERCE-2026` |

---

### explains

| | |
|---|---|
| **Direction** | A → B (A explains B) |
| **Description** | A provides the rationale, explanation, or documentation for B. |
| **Valid Source Types** | DECISION, TRACE, PLAYBOOK, AIPROMPT |
| **Valid Target Types** | FEATURE, RULE, POLICY, CONFLICT |
| **Inverse** | explained_by |
| **Example** | `DECISION-COM-PLP-CAROUSEL-001 --[explains]--> FEATURE-COM-PLP-CAROUSEL-001` |

---

### evidenced_by

| | |
|---|---|
| **Direction** | A → B (A is evidenced by B) |
| **Description** | A claim, assumption, or requirement is supported by evidence. |
| **Valid Source Types** | ASSUMPTION, REQUIREMENT, GOAL, BET, OPP |
| **Valid Target Types** | EVIDENCE, DISCOVERY, MONITOR |
| **Inverse** | supports |
| **Example** | `BET-COM-PLP-PROMOTIONALDISCOVERY-001 --[evidenced_by]--> EVIDENCE-COM-PLP-CAROUSEL-001` |

---

### learned_from

| | |
|---|---|
| **Direction** | A → B (A was a learning from B) |
| **Description** | A recommendation, policy, or improvement was learned from a retrospective, incident, or review. |
| **Valid Source Types** | RECOMMEND, POLICY, ENHANCEMENT, PRINCIPLE |
| **Valid Target Types** | REVIEW, INCIDENT, QA, UAT |
| **Inverse** | produced_learning |
| **Example** | `POLICY-DATA-SANITISATION-001 --[learned_from]--> INCIDENT-COM-2026-02-20-001` |

---

### contradicts

| | |
|---|---|
| **Direction** | A → B (A contradicts B) |
| **Description** | A and B represent conflicting information, requirements, or evidence. Contradictions should be resolved or acknowledged. |
| **Valid Source Types** | ASSUMPTION, EVIDENCE, REQUIREMENT |
| **Valid Target Types** | ASSUMPTION, EVIDENCE, REQUIREMENT |
| **Inverse** | contradicted_by |
| **Example** | `ASSUMPTION-COM-PLP-CAROUSEL-001 --[contradicts]--> EVIDENCE-COM-PLP-CAROUSEL-001` |

---

### refines

| | |
|---|---|
| **Direction** | A → B (A refines B) |
| **Description** | A is a more detailed or precise version of B. B remains active but A is preferred for accuracy. |
| **Valid Source Types** | REQUIREMENT, ASSUMPTION, RECOMMENDATION |
| **Valid Target Types** | REQUIREMENT, ASSUMPTION, OPP |
| **Inverse** | refined_by |
| **Example** | `REQUIREMENT-COM-PLP-CAROUSEL-002 --[refines]--> REQUIREMENT-COM-PLP-CAROUSEL-001` |

---

### informs

| | |
|---|---|
| **Direction** | A → B (A informs B) |
| **Description** | A provides relevant context or input to B. Softer than `evidenced_by`; A influences but does not prove B. |
| **Valid Source Types** | MKTCTX, DISCOVERY, KPI, MONITOR, INCIDENT |
| **Valid Target Types** | GOAL, BET, THEME, PRD, DECISION |
| **Inverse** | informed_by |
| **Example** | `MKTCTX-INDIA-QUICKCOMMERCE-2026 --[informs]--> BET-COM-PLP-PROMOTIONALDISCOVERY-001` |

---

## Full Relationship Summary Table

| Relationship | Direction | Source Types (Examples) | Target Types (Examples) | Description | Example |
|---|---|---|---|---|---|
| contains | A→B | MODULE, FEATURE | FEATURE, SUBFEATURE | A contains B structurally | MODULE contains FEATURE |
| belongs_to | A→B | FEATURE, SUBFEATURE | MODULE, FEATURE | A is a child of B | FEATURE belongs_to MODULE |
| has_capability | A→B | MODULE | CAPABILITY | Module exposes capability | MODULE has_capability CAPABILITY |
| has_feature | A→B | MODULE, EPIC | FEATURE | Module/epic delivers feature | MODULE has_feature FEATURE |
| has_subfeature | A→B | FEATURE | SUBFEATURE | Feature has sub-feature | FEATURE has_subfeature SUBFEATURE |
| has_screen | A→B | MODULE, FEATURE | SCREEN | Feature appears on screen | FEATURE has_screen SCREEN |
| has_component | A→B | SCREEN, FEATURE | COMPONENT | Screen/feature uses component | FEATURE has_component COMPONENT |
| has_configuration | A→B | FEATURE, MODULE | CONFIG | Feature has configurable param | FEATURE has_configuration CONFIG |
| has_rule | A→B | FEATURE, MODULE | RULE | Feature enforces rule | FEATURE has_rule RULE |
| has_permission | A→B | ROLE, FEATURE | PERMISSION | Role/feature has permission | ROLE has_permission PERMISSION |
| is_part_of | A→B | COMPONENT | SCREEN | Generic structural member | COMPONENT is_part_of SCREEN |
| requested_by | A→B | FEATURE, PRD | REQUEST | Feature came from request | FEATURE requested_by REQUEST |
| created_from | A→B | PRD, FEATURE | REQUEST, PRD | Object derived from another | PRD created_from REQUEST |
| discovered_in | A→B | PROBLEM, OPP | DISCOVERY | Problem found in discovery | PROBLEM discovered_in DISCOVERY |
| specified_by | A→B | FEATURE, STORY | PRD | Feature specified by PRD | FEATURE specified_by PRD |
| requires_question | A→B | FEATURE, PRD | QUESTION | Object blocked by question | FEATURE requires_question QUESTION |
| has_requirement | A→B | PRD, FEATURE | REQUIREMENT | PRD/feature has requirement | PRD has_requirement REQUIREMENT |
| has_acceptance_criterion | A→B | FEATURE, STORY | ACCEPTANCE | Feature has AC | FEATURE has_acceptance_criterion ACCEPTANCE |
| out_of_scope_for | A→B | OUTOFSCOPE | FEATURE, PRD | Item explicitly excluded | OUTOFSCOPE out_of_scope_for FEATURE |
| resolves | A→B | FEATURE, DECISION | PROBLEM, QUESTION | Object resolves problem | FEATURE resolves PROBLEM |
| supersedes_requirement | A→B | PRD, REQUIREMENT | PRD, REQUIREMENT | New version replaces old | PRD-V2 supersedes_requirement PRD-V1 |
| implemented_by | A→B | FEATURE | STORY, TASK | Feature implemented by story | FEATURE implemented_by STORY |
| planned_by | A→B | FEATURE, EPIC | DEVPLAN | Feature planned by devplan | FEATURE planned_by DEVPLAN |
| coded_by_prompt | A→B | STORY, TASK | PROMPT | Story coded by AI prompt | STORY coded_by_prompt PROMPT |
| blocked_by | A→B | STORY, FEATURE | BLOCKER, QUESTION | Object blocked by blocker | STORY blocked_by BLOCKER |
| depends_on | A→B | FEATURE, STORY | FEATURE, INTEGRATION | Object needs another | FEATURE depends_on INTEGRATION |
| duplicates | A→B | BUG, STORY | BUG, STORY | Object is duplicate of another | BUG duplicates BUG |
| supersedes | A→B | DEVPLAN, STORY | DEVPLAN, STORY | Object replaces another | DEVPLAN-002 supersedes DEVPLAN-001 |
| extends | A→B | FEATURE | FEATURE | Object extends another | FEATURE extends FEATURE |
| changes | A→B | STORY, TASK | FEATURE, CONFIG | Delivery changes product | STORY changes CONFIG |
| replaces | A→B | FEATURE, INTEGRATION | FEATURE, INTEGRATION | Object decommissions another | INTEGRATION-V2 replaces INTEGRATION-V1 |
| tested_by | A→B | FEATURE, STORY | TESTPLAN, TEST | Feature tested by plan/test | FEATURE tested_by TESTPLAN |
| validated_by | A→B | FEATURE, RELEASE | UAT, SIGNOFF | Feature validated by UAT | FEATURE validated_by UAT |
| failed_by | A→B | FEATURE, STORY | QA, UAT | Feature failed a QA run | FEATURE failed_by QA |
| regresses | A→B | STORY, TASK | FEATURE, API | Change creates regression risk | STORY regresses FEATURE |
| approved_by | A→B | PRD, RELEASE | GATE, SIGNOFF | Object approved at gate | PRD approved_by GATE |
| verified_against | A→B | TEST, QA | ACCEPTANCE | Test verified against AC | TEST verified_against ACCEPTANCE |
| covered_by | A→B | ACCEPTANCE | TEST | AC covered by test | ACCEPTANCE covered_by TEST |
| fails_acceptance_criterion | A→B | BUG, QA | ACCEPTANCE | Bug fails specific AC | BUG fails_acceptance_criterion ACCEPTANCE |
| impacts | A→B | FEATURE, EPIC | KPI, FEATURE | Change impacts something | FEATURE impacts KPI |
| creates | A→B | FEATURE, RELEASE | AUDIT, RELNOTE | Change creates new object | RELEASE creates RELNOTE |
| deprecates | A→B | FEATURE, RELEASE | FEATURE, API | Object made obsolete | FEATURE-V2 deprecates FEATURE-V1 |
| conflicts_with | A↔B | FEATURE, REQUIREMENT | FEATURE, REQUIREMENT | Objects conflict | RULE conflicts_with RULE |
| enables | A→B | INTEGRATION, CAPABILITY | FEATURE, EPIC | Object unlocks another | INTEGRATION enables FEATURE |
| reduces_risk_for | A→B | ROLLBACK, TESTPLAN | RELEASE, FEATURE | Mitigation reduces risk | ROLLBACK reduces_risk_for RELEASE |
| governed_by | A→B | FEATURE, ENTITY | POLICY, RULE | Object governed by policy | ENTITY governed_by COMPRULE |
| requires_gate | A→B | PRD, FEATURE | GATE | Object needs gate approval | PRD requires_gate GATE |
| requires_impact_assessment | A→B | FEATURE, REQUEST | EVAL | Object needs impact assessment | REQUEST requires_impact_assessment EVAL |
| requires_compliance_review | A→B | FEATURE, INTEGRATION | COMPRULE | Object needs compliance review | FEATURE requires_compliance_review COMPRULE |
| violates | A→B | FEATURE, API | POLICY, RULE | Object breaks a rule | FEATURE violates POLICY |
| waived_by | A→B | GATE, LCRULE | DECISION | Gate waived by decision | GATE waived_by DECISION |
| escalated_to | A→B | BLOCKER, CONFLICT | DECISION | Issue escalated for decision | CONFLICT escalated_to DECISION |
| approved_at_gate | A→B | PRD, RELEASE | GATE | Object passed gate | RELEASE approved_at_gate GATE |
| derived_from | A→B | RECOMMEND, TRACE | DISCOVERY, MONITOR | AI object derived from signal | RECOMMEND derived_from MONITOR |
| references | A→B | Any | Any | Lightweight cross-reference | PRD references MKTCTX |
| explains | A→B | DECISION, TRACE | FEATURE, RULE | A explains B | DECISION explains FEATURE |
| evidenced_by | A→B | ASSUMPTION, GOAL | EVIDENCE, DISCOVERY | Claim supported by evidence | BET evidenced_by EVIDENCE |
| learned_from | A→B | POLICY, ENHANCE | REVIEW, INCIDENT | Learning from past event | POLICY learned_from INCIDENT |
| contradicts | A→B | ASSUMPTION | EVIDENCE | A and B conflict informationally | ASSUMPTION contradicts EVIDENCE |
| refines | A→B | REQUIREMENT | REQUIREMENT | More precise version of B | REQUIREMENT refines REQUIREMENT |
| informs | A→B | MKTCTX, KPI | GOAL, PRD | A provides context to B | MKTCTX informs BET |
