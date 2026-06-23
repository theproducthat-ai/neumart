# Nuemart Product OS — Lifecycle Models

**Version:** 1.0.0
**Last Updated:** 2026-06-22
**Status:** Active
**Owner:** Product OS / Platform Team
**Location:** `product/os/ontology/LIFECYCLE_MODELS.md`

---

## Overview

Every Product Object has a lifecycle. A lifecycle is a finite state machine: a set of allowed statuses, a set of valid transitions between them, and rules governing what must happen at each transition (gates, required fields, approvals).

This document defines the lifecycle model for every object type in the Nuemart Product OS. The lifecycle engine enforces these models at runtime; invalid transitions are rejected with a governance error.

### Lifecycle Conventions

- **States** are named with Title Case.
- **Terminal states** are marked with a dagger symbol (†). Once in a terminal state, an object cannot transition without an explicit governance override.
- **Blocked states** are states where the object is active but cannot proceed without action.
- Transitions always flow in one direction unless explicitly marked as reversible.
- Every transition must be recorded in the object's `audit_log`.
- Transitions from `In Development` or later states require the assigned owner to confirm.

---

## Model 1: Generic Product Object

Applies to: VISION, PRINCIPLE, GOAL, KPI, MKTCTX, BET, THEME, CONFIG, PERMISSION, ROLE, PERSONA, COMPONENT, ENTITY, FIELD, MONITOR, PLAYBOOK, and any object type that does not have a more specific model.

### States

| Status | Description |
|---|---|
| Draft | Object has been created but is incomplete. May be missing required fields. |
| Active | Object is complete, valid, and in use. |
| Deprecated | Object is no longer the recommended version but may still be in use. |
| Archived † | Object is no longer active. Kept for historical record. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Draft | Active | All required fields present; owner assigned | Owner or PM |
| Active | Deprecated | Replacement object identified; deprecation note written | PM or Governance |
| Deprecated | Archived | No active dependencies remain; 30-day notice given | PM or Governance |
| Draft | Archived | Object abandoned before activation | PM |

### Terminal States

- **Archived** — Object is read-only. No further transitions permitted.

### Blocked States

- **Draft** without an owner assigned after 7 days generates a `GAP` alert.

---

## Model 2: Request

Applies to: REQUEST

Requests are the entry point into the Product OS. They receive the most elaborate lifecycle because they gate whether work enters the backlog at all.

### States

| Status | Description |
|---|---|
| Submitted | Request received; not yet reviewed. |
| Classified | Request has been typed and routed to the correct module/area. |
| Grilling | PM is asking clarifying questions to harden the request. |
| Impact Assessment | Impact and effort are being evaluated before approval. |
| Approved | Request approved; ready to be converted to a PRD or Feature. |
| In Progress | PRD or Feature has been created from this request; work underway. |
| Done | The feature or requirement from this request has been released. |
| Parked | Request is valid but deferred due to capacity or priority. May be revisited. |
| Rejected † | Request will not be actioned. Rejection reason recorded. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Submitted | Classified | object_type, module_code, feature_slug assigned | PM or AI Agent |
| Classified | Grilling | Open questions identified | PM |
| Classified | Impact Assessment | No open questions; request is clear | PM |
| Grilling | Impact Assessment | All open questions resolved | PM |
| Grilling | Parked | Requester unresponsive or decision deferred | PM |
| Impact Assessment | Approved | Impact scored; P1–P3 approval given | PM + stakeholder |
| Impact Assessment | Parked | Low priority; deferred to next cycle | PM |
| Impact Assessment | Rejected | Request does not meet bar; rejection recorded | PM |
| Approved | In Progress | Linked PRD or Feature created | PM |
| In Progress | Done | Linked Feature reaches Released status | Automated |
| Parked | Classified | Request resurfaced for re-evaluation | PM |
| Parked | Rejected | Decision made not to pursue | PM |

### Terminal States

- **Rejected** — Request closed with reason. May be re-opened only via new REQUEST.
- **Done** — Request fully satisfied by a shipped feature.

### Blocked States

- **Grilling** — Blocked on requester's response. Auto-escalates after 5 business days.
- **Impact Assessment** — Blocked on impact scoring.

### State Diagram (Mermaid-compatible text)

```
stateDiagram-v2
    [*] --> Submitted
    Submitted --> Classified : PM classifies
    Classified --> Grilling : Open questions exist
    Classified --> ImpactAssessment : Clear and complete
    Grilling --> ImpactAssessment : Questions resolved
    Grilling --> Parked : Deferred
    ImpactAssessment --> Approved : Approved P1-P3
    ImpactAssessment --> Parked : Low priority
    ImpactAssessment --> Rejected : Does not meet bar
    Approved --> InProgress : PRD or Feature created
    InProgress --> Done : Feature released
    Parked --> Classified : Re-surfaced
    Parked --> Rejected : Abandoned
    Rejected --> [*]
    Done --> [*]
```

---

## Model 3: Feature

Applies to: FEATURE

Features are the primary unit of product delivery. Their lifecycle spans discovery through operations.

### States

| Status | Description |
|---|---|
| Candidate | Feature idea or request; not yet committed to the roadmap. |
| Planned | Feature is committed for a sprint or cycle; PRD approved; stories being written. |
| In Development | Engineering is actively building. Code is being written. |
| QA | Engineering complete; QA testing underway. |
| UAT | QA passed; PM/stakeholder UAT underway. |
| Released | Feature is live in production. |
| Deprecated | Feature has been superseded or retired. Still live but being phased out. |
| Archived † | Feature no longer exists in the product. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Candidate | Planned | REQUEST approved; PRD approved; stories written; owner assigned | PM |
| Planned | In Development | Sprint started; engineering assigned | PM / Engineering Lead |
| In Development | QA | All stories Done; DEVPLAN complete; build created | Engineering Lead |
| In Development | Planned | Sprint scope reduced; feature deferred | PM |
| QA | UAT | All test cases passed; QA sign-off obtained | QA Engineer |
| QA | In Development | Critical bugs found; sent back for fixes | QA Engineer |
| UAT | Released | UAT sign-off; release gate passed; deployment done | PM / Release Manager |
| UAT | QA | PM-identified issues; sent back to QA | PM |
| Released | Deprecated | Replacement feature released; deprecation announced | PM |
| Deprecated | Archived | No users depending on feature; removal complete | PM + Engineering |
| Candidate | Archived | Feature abandoned at candidate stage | PM |

### Terminal States

- **Archived** — Feature is removed from the product and the graph.
- Note: **Released** is not terminal; features can be deprecated post-release.

### Blocked States

- **In Development** with a BLOCKER object linked and `status: Open` generates a P1 alert if the feature is P1 priority.
- **QA** with critical bugs open blocks transition to UAT.

### State Diagram (Mermaid-compatible text)

```
stateDiagram-v2
    [*] --> Candidate
    Candidate --> Planned : PRD approved, stories ready
    Candidate --> Archived : Abandoned
    Planned --> InDevelopment : Sprint started
    InDevelopment --> QA : All stories done
    InDevelopment --> Planned : Deferred
    QA --> UAT : All tests pass
    QA --> InDevelopment : Critical bugs found
    UAT --> Released : Sign-off; gate passed
    UAT --> QA : PM finds issues
    Released --> Deprecated : Superseded
    Deprecated --> Archived : Removal complete
    Archived --> [*]
```

---

## Model 4: Sub-feature

Applies to: SUBFEATURE

Sub-features follow a simplified version of the Feature lifecycle.

### States

| Status | Description |
|---|---|
| Candidate | Sub-feature identified; not yet committed. |
| Scoped | Sub-feature is in scope for the parent feature's delivery cycle. |
| In Development | Engineering is building the sub-feature. |
| Released | Sub-feature is live. |
| Deprecated † | Sub-feature has been retired or merged into the parent feature. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Candidate | Scoped | Parent feature moves to Planned | PM |
| Scoped | In Development | Parent feature enters In Development | Engineering |
| In Development | Released | Sub-feature complete; included in Feature release | Engineering |
| Released | Deprecated | Parent feature deprecated or sub-feature removed | PM |
| Candidate | Deprecated | Sub-feature not pursued | PM |

---

## Model 5: Requirement

Applies to: REQUIREMENT

### States

| Status | Description |
|---|---|
| Draft | Requirement written but not yet reviewed. |
| Under Review | PM and stakeholders reviewing for completeness and accuracy. |
| Approved | Requirement accepted as part of the PRD. |
| Implemented | Requirement has been built and verified in production. |
| Deprecated † | Requirement superseded or no longer applicable. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Draft | Under Review | Requirement is complete enough for review | PM |
| Under Review | Approved | Stakeholders agree; no open questions | PM + Stakeholders |
| Under Review | Draft | Significant gaps found; returned for revision | Reviewer |
| Approved | Implemented | Feature implementing this requirement is Released | Automated |
| Approved | Deprecated | Requirement superseded by a newer requirement | PM |
| Implemented | Deprecated | Feature implementing this requirement is deprecated | Automated |

---

## Model 6: PRD

Applies to: PRD

### States

| Status | Description |
|---|---|
| Draft | PRD in progress. Incomplete. |
| In Review | PRD complete and under stakeholder review. |
| Approved | PRD approved; development can begin. |
| Superseded † | PRD replaced by a newer version. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Draft | In Review | All required sections complete; author self-review done | PM |
| In Review | Approved | Stakeholder sign-off; gate passed | PM + Stakeholders |
| In Review | Draft | Major revisions required | Reviewer |
| Approved | Superseded | PRD-V2 created and approved | PM |

### Gates Required

- `GATE-PRD-APPROVAL-001` must be passed before transitioning from In Review → Approved.

---

## Model 7: User Story

Applies to: STORY

### States

| Status | Description |
|---|---|
| Backlog | Story created but not yet scheduled. |
| Ready | Story is groomed, estimated, and ready for sprint. |
| In Development | Engineering is working on the story. |
| In Review | Code written; awaiting code review (PR open). |
| QA | PR merged; awaiting QA testing. |
| Done | Story complete and tested. Acceptance criteria verified. |
| Blocked | Story cannot progress due to a BLOCKER. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Backlog | Ready | Story has acceptance criteria, estimate, and owner | PM + Engineering |
| Ready | In Development | Sprint started; engineer picks up story | Engineer |
| In Development | In Review | Code complete; PR opened | Engineer |
| In Development | Blocked | Blocker identified | Engineer |
| In Review | QA | PR approved and merged | Reviewer |
| In Review | In Development | Review comments require code changes | Reviewer |
| QA | Done | All acceptance criteria verified | QA |
| QA | In Development | QA failure; bugs raised | QA |
| Blocked | In Development | Blocker resolved | Engineer |
| Blocked | Backlog | Story cannot proceed this cycle | PM |
| Done | Backlog | Edge case: story regression; re-opened | PM or QA |

### Terminal States

- **Done** is the expected end state. Stories that are Done and part of a released feature are archived with the feature.

---

## Model 8: QA Run

Applies to: QA

### States

| Status | Description |
|---|---|
| Planned | QA run scoped and scheduled. |
| In Progress | QA execution underway. |
| Passed | All test cases passed. Sign-off given. |
| Failed | One or more critical test cases failed. |
| Conditionally Passed | Non-critical failures; PM accepted known limitations. |
| Closed † | QA run archived after release or next cycle begins. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Planned | In Progress | Build available; test cases ready | QA Engineer |
| In Progress | Passed | All cases passed | QA Engineer |
| In Progress | Failed | Any critical case failed | QA Engineer |
| In Progress | Conditionally Passed | Non-critical failures; PM signs off | PM + QA Engineer |
| Failed | In Progress | Bugs fixed; re-test initiated | QA Engineer |
| Passed | Closed | Release completed or cycle ended | Automated |
| Conditionally Passed | Closed | Release completed | PM |
| Failed | Closed | Release cancelled or scope reduced | PM |

---

## Model 9: UAT Run

Applies to: UAT

### States

| Status | Description |
|---|---|
| Planned | UAT session scoped and scheduled. |
| In Progress | UAT session underway. |
| Sign-off Pending | UAT complete; waiting for formal sign-off from stakeholder. |
| Signed Off | Formal stakeholder sign-off obtained. |
| Failed | UAT identified blocking issues. |
| Closed † | UAT archived. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Planned | In Progress | QA Passed/Conditionally Passed; UAT slot confirmed | PM |
| In Progress | Sign-off Pending | All UAT scenarios complete | PM |
| In Progress | Failed | Blocking issue found | PM |
| Sign-off Pending | Signed Off | Stakeholder formally approves | Stakeholder |
| Sign-off Pending | Failed | Stakeholder raises objection | Stakeholder |
| Failed | In Progress | Issues fixed; UAT re-run | QA + PM |
| Signed Off | Closed | Release completed | Automated |
| Failed | Closed | Release cancelled | PM |

---

## Model 10: Bug

Applies to: BUG

### States

| Status | Description |
|---|---|
| Open | Bug reported; not yet triaged. |
| Triaged | Bug reviewed; severity and priority assigned; owner assigned. |
| In Fix | Engineer is working on the fix. |
| Fixed | Fix implemented; awaiting verification. |
| Verified | Fix confirmed by QA. Bug resolved. |
| Closed † | Bug closed. No further action. |
| Won't Fix † | Bug acknowledged but decision made not to fix. Reason documented. |
| Deferred | Bug will be fixed in a future cycle. Tracked but not active. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Open | Triaged | Severity, priority, component, and owner assigned | QA or PM |
| Triaged | In Fix | Engineer assigned; sprint scheduled | Engineering Lead |
| Triaged | Won't Fix | PM decision: out of scope, by design, or risk accepted | PM |
| Triaged | Deferred | Low priority; scheduled for future cycle | PM |
| In Fix | Fixed | PR raised; fix code complete | Engineer |
| Fixed | Verified | QA confirms fix in test environment | QA |
| Fixed | In Fix | Verification failed; fix incomplete | QA |
| Verified | Closed | Fix shipped to production | Automated |
| Won't Fix | Closed | Documented and filed | PM |
| Deferred | Triaged | Bug resurfaced for next cycle | PM |
| Deferred | Won't Fix | Decision to permanently close | PM |

### Terminal States

- **Closed** — Bug is resolved and deployed.
- **Won't Fix** — Bug is acknowledged and permanently closed without a fix.

### Blocked States

- **Open** bugs older than 48 hours without triage generate an alert.
- **In Fix** bugs older than 5 business days without a Fixed status generate an alert.

### State Diagram (Mermaid-compatible text)

```
stateDiagram-v2
    [*] --> Open
    Open --> Triaged : Severity/priority assigned
    Triaged --> InFix : Engineer assigned
    Triaged --> WontFix : Decision not to fix
    Triaged --> Deferred : Low priority
    InFix --> Fixed : Fix code complete
    Fixed --> Verified : QA confirms fix
    Fixed --> InFix : Verification failed
    Verified --> Closed : Shipped to production
    WontFix --> Closed : Documented
    Deferred --> Triaged : Resurfaced
    Deferred --> WontFix : Permanently closed
    Closed --> [*]
    WontFix --> [*]
```

---

## Model 11: Release

Applies to: RELEASE

### States

| Status | Description |
|---|---|
| Planned | Release scoped and dated. Features and stories assigned to it. |
| Staging | Release deployed to staging environment. |
| QA Complete | All QA runs passed for this release. |
| UAT Complete | All UAT runs signed off for this release. |
| Released | Deployed to production. |
| Post-Release Review | Post-release review period. Monitoring active. |
| Closed † | Release lifecycle complete. All post-release actions done. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Planned | Staging | All stories Done; build created; release notes drafted | Release Manager |
| Staging | QA Complete | All QA runs Passed or Conditionally Passed | QA Lead |
| Staging | Planned | QA failures require fixes and re-deploy | QA Lead |
| QA Complete | UAT Complete | UAT Signed Off | PM |
| QA Complete | Staging | UAT failed; bugs fixed; re-deploy needed | PM |
| UAT Complete | Released | Release gate approved; deployment executed | Release Manager |
| Released | Post-Release Review | Deployment confirmed; monitoring started | Automated |
| Post-Release Review | Closed | Review complete; KPIs checked; actions logged | PM |

### Gates Required

- `GATE-RELEASE-APPROVAL-001` must be passed before transitioning UAT Complete → Released.
- A ROLLBACK plan must exist before staging deployment.

---

## Model 12: Decision

Applies to: DECISION

### States

| Status | Description |
|---|---|
| Open | Decision needed; options being gathered. |
| Under Discussion | Options documented; stakeholders deliberating. |
| Made | Decision has been made; rationale documented. |
| Implemented | The decision has been acted upon in the product. |
| Superseded † | Decision overturned or replaced by a newer decision. |
| Archived † | Decision documented and archived for historical reference. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Open | Under Discussion | Options documented | Decision Owner |
| Under Discussion | Made | Consensus or authority decision reached | Decision Owner |
| Under Discussion | Open | New options emerge; back to gathering | Decision Owner |
| Made | Implemented | The decision is enacted in the product or process | PM or Engineering |
| Made | Superseded | A new decision overrules this one | PM |
| Implemented | Superseded | A newer decision changes this | PM |
| Implemented | Archived | Decision is complete and no longer active | PM |
| Superseded | Archived | Old decision filed for history | PM |

---

## Model 13: Risk

Applies to: RISK (informal; typically tracked inside object files under `risk_refs`)

### States

| Status | Description |
|---|---|
| Identified | Risk surfaced; not yet assessed. |
| Assessed | Risk has been evaluated for likelihood, impact, and risk level. |
| Mitigated | Mitigation actions taken; risk level reduced. |
| Accepted | Risk accepted without full mitigation; documented decision. |
| Closed † | Risk no longer applicable or has passed. |
| Materialized | Risk event occurred; now an incident. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Identified | Assessed | Likelihood and impact scored | PM or QA |
| Assessed | Mitigated | Mitigation actions completed | Owner |
| Assessed | Accepted | PM accepts risk; waiver documented | PM |
| Mitigated | Closed | Risk no longer present | PM |
| Accepted | Closed | Risk passed without materialising | PM |
| Assessed | Materialized | Risk event occurs | Incident system |
| Mitigated | Materialized | Partial mitigation insufficient | Incident system |
| Materialized | Closed | Incident resolved; post-mortem done | PM |

---

## Model 14: Incomplete Work Item

Applies to: INCOMPLETE

Incomplete work items arise at end-of-cycle retrospectives. They are a formal record of work that was committed but not delivered.

### States

| Status | Description |
|---|---|
| Identified | Incomplete item surfaced in retrospective or sprint review. |
| Tracked | Item acknowledged and added to next cycle's backlog. |
| In Progress | Item being actively worked in the new cycle. |
| Resolved | Item completed and delivered. |
| Deferred | Item deliberately deferred to a later cycle with new target date. |
| Dropped † | Item no longer relevant; removed from backlog. |

### Transition Table

| From | To | Condition | Who |
|---|---|---|---|
| Identified | Tracked | PM acknowledges and assigns to a future cycle | PM |
| Identified | Dropped | Item no longer needed | PM |
| Tracked | In Progress | Cycle starts; engineer picks up item | Engineer |
| In Progress | Resolved | Item complete | Engineer |
| In Progress | Deferred | Item again not completed; cycle ended | PM |
| Deferred | Tracked | Next cycle begins | PM |
| Deferred | Dropped | Decision made to abandon | PM |

---

## Lifecycle Cross-Reference

| Object Type | Lifecycle Model | Terminal States |
|---|---|---|
| VISION, PRINCIPLE, GOAL, KPI, etc. | Generic Product Object | Archived |
| REQUEST | Request | Rejected, Done |
| FEATURE | Feature | Archived |
| SUBFEATURE | Sub-feature | Deprecated |
| REQUIREMENT | Requirement | Deprecated |
| PRD | PRD | Superseded |
| STORY | User Story | Done (Archived with feature) |
| QA | QA Run | Closed |
| UAT | UAT Run | Closed |
| BUG | Bug | Closed, Won't Fix |
| RELEASE | Release | Closed |
| DECISION | Decision | Superseded, Archived |
| RISK | Risk | Closed, Materialized |
| INCOMPLETE | Incomplete Work Item | Dropped |

---

## Governance Notes

1. **Lifecycle model assignment:** Every object's lifecycle model is derived from its `object_type`. The mapping is fixed in this document and enforced by the lifecycle engine.
2. **Override protocol:** Any lifecycle rule override (e.g. skipping a required state) must be documented as a `DECISION` object and linked via `waived_by`.
3. **Automated transitions:** Some transitions (e.g. REQUEST → Done when Feature reaches Released) are triggered automatically by the lifecycle engine. These are recorded in the audit log with `changed_by: lifecycle-engine`.
4. **Blocked state alerts:** All blocked state timeouts generate `GAP` objects in the Intelligence domain, surfaced in the daily PM digest.
