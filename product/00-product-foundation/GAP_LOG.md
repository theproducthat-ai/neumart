# Nuemart — Gap Log

This file documents gaps that existed in the product management and engineering process before the Product OS was set up. Gaps are recorded for transparency, not blame. Each gap entry identifies the missing capability, its downstream risk, and the remedy introduced.

---

## GAP-001 — No request register existed

**Gap:** There was no formal intake register for incoming feature requests, bug reports, operational changes or external references. Requests were handled ad-hoc in conversation.  
**Risk:** Requests could be forgotten, duplicated or executed without evaluation. No traceability to link code changes back to a request.  
**Remedy:** `04-request-management/REQUEST_REGISTER.md` — the master register for all requests with lifecycle status tracking.

---

## GAP-002 — No incomplete request tracker existed

**Gap:** There was no mechanism to track requests that were started but not completed (e.g. partially designed, partially built, blocked). Incomplete work could silently remain invisible.  
**Risk:** Rework, lost context, shipped features without full QA or UAT.  
**Remedy:** `10-development-tracking/INCOMPLETE_WORK_TRACKER.md` — tracks all in-flight execution work across evaluation, PRD, stories, dev, QA, UAT and release stages.

---

## GAP-003 — No module hierarchy existed

**Gap:** There was no defined module or sub-module taxonomy for the product. Features were described in free text without a consistent naming structure.  
**Risk:** Requests for the same module area are named inconsistently. Cross-module impact assessment is impossible without a defined hierarchy.  
**Remedy:** Module taxonomy defined in `REQUEST_STATUS_RULES.md` and enforced in `REQUEST_REGISTER.md`.

---

## GAP-004 — No roadmap evaluation structure existed

**Gap:** New feature ideas and requests had no formal evaluation stage. Features were built or not built based on in-the-moment decisions with no documented rationale.  
**Risk:** Scope creep, under-evaluated features, no record of why something was accepted or rejected.  
**Remedy:** `EVAL` document type tracked in `MASTER_REGISTRY.md`. Evaluation stage added to the request lifecycle in `REQUEST_STATUS_RULES.md`.

---

## GAP-005 — No auto-ID system existed

**Gap:** There was no ID sequence for tracked objects. Features, stories, bugs and releases had no unique identifiers.  
**Risk:** Duplicate references, inability to link related artefacts, no searchable audit trail.  
**Remedy:** `MASTER_REGISTRY.md` — a sequential ID registry for all tracked object types (REQ, EVAL, PRD, US, DEVPLAN, QA, UAT, REL, SCR-*).

---

## GAP-006 — No screen registry existed

**Gap:** There was no catalogue of screens in the application. Screens were described by file path or route only, with no unique ID or status.  
**Risk:** Screens could be modified or removed without linking the change to a request or test record.  
**Remedy:** Screen ID types (`SCR-CUS`, `SCR-ADM`, `SCR-INV`, `SCR-ORD`, `SCR-PAY`, `SCR-DEL`, `SCR-AUTH`) defined in `MASTER_REGISTRY.md`. Screen registry population is a recommended next step.

---

## GAP-007 — No reference capture process existed

**Gap:** There was no defined process for capturing external references (API docs, regulatory guidance, competitor analysis, Razorpay documentation) before making technical decisions.  
**Risk:** Decisions were made without documented external context. Future contributors cannot retrace the reasoning behind architecture choices.  
**Remedy:** `REQUEST_STATUS_RULES.md` defines "Reference Pending" as the first status stage, requiring external references to be captured before classification.

---

## GAP-008 — No formal PRD lifecycle existed

**Gap:** There were no Product Requirement Documents. Features were described in the `BUILD_PLAN.md` at a high level and implemented directly.  
**Risk:** Requirements were not explicitly signed off before development. Scope could shift mid-build with no record of what changed.  
**Remedy:** `PRD` document type added to the lifecycle. `MASTER_REGISTRY.md` tracks PRD IDs. PRD creation becomes a mandatory gate before stories and development.

---

## GAP-009 — No user story lifecycle existed

**Gap:** There were no user stories. Work was described as phases and bullet points rather than acceptance-criteria-backed stories.  
**Risk:** Acceptance criteria were implicit or missing. QA had no explicit criteria to test against.  
**Remedy:** `US` document type added. Stories are linked from PRDs and tracked through development, QA and UAT.

---

## GAP-010 — No development plan lifecycle existed

**Gap:** Development was planned in `BUILD_PLAN.md` at phase level. There were no per-feature development plans with file-level task breakdowns, dependency maps or build prompts.  
**Risk:** Build sessions started without a clear task list. Work was ad-hoc and hard to resume after interruptions.  
**Remedy:** `DEVPLAN` document type added. `10-development-tracking/DEVELOPMENT_TRACKER.md` tracks active development plans.

---

## GAP-011 — No QA / UAT / release evidence structure existed

**Gap:** There was no formal QA stage, UAT stage or release record. Testing was done inline during build sessions with no documented outcomes.  
**Risk:** Bugs could slip to production without a record of what was tested. Releases had no sign-off trail.  
**Remedy:** `QA`, `UAT` and `REL` document types added. `REQUEST_STATUS_RULES.md` defines QA and UAT as required gates before release.

---

## GAP-012 — No slash-command workflow existed

**Gap:** There was no defined vocabulary of commands for interacting with the Product OS (e.g. how to raise a request, how to move a request through stages, how to generate a PRD).  
**Risk:** Inconsistent usage. Different sessions would interact with the OS in different ways, producing inconsistent artefacts.  
**Remedy:** Slash-command workflow is a recommended next step. Commands such as `/new-request`, `/evaluate`, `/approve-prd`, `/create-stories` will be defined and documented.

---

## GAP-013 — No approval gates existed

**Gap:** There were no explicit approval gates between product stages. A feature could go from idea to code without any recorded approval.  
**Risk:** Unapproved features get built. Approved features get built incorrectly because expectations were not documented.  
**Remedy:** `REQUEST_STATUS_RULES.md` defines required documents and owner sign-off at each status transition. Status cannot move forward without the prerequisite document existing.

---

## Summary

| Gap ID | Gap Area | Remedy File |
|---|---|---|
| GAP-001 | No request register | REQUEST_REGISTER.md |
| GAP-002 | No incomplete work tracker | INCOMPLETE_WORK_TRACKER.md |
| GAP-003 | No module hierarchy | REQUEST_STATUS_RULES.md |
| GAP-004 | No evaluation structure | REQUEST_STATUS_RULES.md + MASTER_REGISTRY.md |
| GAP-005 | No auto-ID system | MASTER_REGISTRY.md |
| GAP-006 | No screen registry | MASTER_REGISTRY.md (SCR-* types) |
| GAP-007 | No reference capture process | REQUEST_STATUS_RULES.md |
| GAP-008 | No PRD lifecycle | MASTER_REGISTRY.md + REQUEST_STATUS_RULES.md |
| GAP-009 | No user story lifecycle | MASTER_REGISTRY.md + REQUEST_STATUS_RULES.md |
| GAP-010 | No development plan lifecycle | DEVELOPMENT_TRACKER.md |
| GAP-011 | No QA/UAT/release evidence | REQUEST_STATUS_RULES.md |
| GAP-012 | No slash-command workflow | Recommended next step |
| GAP-013 | No approval gates | REQUEST_STATUS_RULES.md |

---

*Last updated: 2026-06-21 — Initial gap capture at Product OS setup.*
