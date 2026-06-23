# Nuemart Product OS — Approval Gates

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-06-22 |
| Status | Active |
| Owner | Product Owner |
| Enforced by | Product OS AI Agents + Human Product Manager |

---

## Migration Note

This file supersedes and consolidates `product/99-operating-system/governance/APPROVAL_GATES.md`, which defined gates G1–G8 in the legacy operating system. All legacy gates (G1–G8) are preserved below with full backward compatibility. References to legacy gate numbers in existing objects remain valid.

New objects should reference gates by name (e.g., "G4 — PRD Approval Gate") for clarity.

---

## Purpose

Approval Gates are mandatory checkpoints in the Nuemart product workflow. No product object may advance past a gate without satisfying all gate criteria. Gates protect the team from building the wrong thing, shipping untested features, or losing traceability.

**Gates are not bureaucracy.** They are the team's shared contract for what "ready" means at each stage of the product lifecycle.

---

## G1 — Request Classification Gate

**Triggered after:** Request intake (after `/product-request` completes)

**Approver:** Product OS (automated); escalates to human Product Owner if confidence < Medium

**Purpose:** Ensure every incoming ask is properly understood and classified before any downstream work begins.

**What is checked:**
- [ ] `request_type` field is assigned and valid (New Feature / Enhancement / Bug Fix / Configuration / Documentation)
- [ ] `domain` field is assigned (Customer Commerce / Admin Console / Delivery / Payment / etc.)
- [ ] `module_code` field is assigned (PLP / PDP / CART / CHK / etc.)
- [ ] `product_area_code` field is assigned (COM / ADM / DEL / PAY / etc.)
- [ ] `confidence` is High or Medium (Low requires human review before gate passes)
- [ ] Duplicate detection check has been run and result is documented
- [ ] If duplicate found: resolution Decision Object exists

**Blocks:** Nothing may proceed until this gate passes. No grilling, no impact assessment, no PRD, no stories.

**On failure:** Return to Intake Agent for more information from the requestor. Flag specific missing fields.

**Downstream of this gate:** G2 (Grilling Complete Gate)

**Policy reference:** GOVERNANCE_POLICIES.md P001, P002, P003

---

## G2 — Grilling Complete Gate

**Triggered after:** `/product-grill` session completes

**Approver:** Product Owner

**Purpose:** Ensure the feature is well-understood before committing to scope, design, or engineering investment. Grilling surfaces ambiguity, constraints, assumptions, and out-of-scope items early.

**What is checked:**
- [ ] All blocking questions have been answered (no open QUESTION objects with `blocking: true`)
- [ ] MVP scope is explicitly defined — what is IN and what is OUT for this request
- [ ] Out-of-scope items are documented (not just skipped — explicitly noted as out of scope)
- [ ] Assumptions are listed and acknowledged by Product Owner
- [ ] Future candidates are noted for later
- [ ] Key constraints (technical, regulatory, timeline) are surfaced
- [ ] The request type has been confirmed or updated based on grilling findings

**Blocks:** Impact Assessment and PRD cannot start until this gate passes.

**On failure:** Return to discovery with a list of unanswered questions flagged. Provide a specific list of what needs to be resolved before gate can re-open.

**Downstream of this gate:** G3 (Impact Assessment Gate, if applicable) or G4 (PRD Approval Gate)

**Policy reference:** GOVERNANCE_POLICIES.md P002, P004, P010

---

## G3 — Impact Assessment Gate

**Triggered after:** `/product-impact` completes (for high-risk changes only)

**Approver:** Product Owner (all changes); Product Owner + Engineering Lead (for schema changes and payment changes)

**Purpose:** Ensure that high-risk changes are fully understood before engineering commits to implementation. Impact Assessment surfaces hidden dependencies, affected objects, and risks that grilling may not have uncovered.

**Required for (see RISK_RULES.md for full trigger list):**
- Convex schema changes (adding, removing, or renaming fields or tables)
- Razorpay payment integration changes
- Clerk authentication changes
- Role or permission model changes
- Breaking API contract changes (changes to responses consumed by multiple clients)
- Data migration changes
- Security-relevant changes

**Not required for:** Low-risk changes (UI copy, styling, documentation, configuration without behavior change)

**What is checked:**
- [ ] All impact categories have been assessed (schema, data, UI, integration, performance, security, compliance)
- [ ] Risk level is assigned (Critical / High / Medium / Low / None) per RISK_RULES.md
- [ ] All blocking risk flags are addressed (either mitigated or accepted with documentation)
- [ ] All affected Feature Objects, screens, and data entities are identified
- [ ] Dependencies on other in-flight work are documented
- [ ] For Critical/High risk: mitigation plan is documented
- [ ] Engineering Lead has reviewed and signed off (schema/payment changes only)

**Blocks:** PRD cannot receive approval (G4) until this gate passes for high-risk changes.

**On failure:** Return Impact Assessment to requester with specific gaps identified. Engineering Lead must review unresolved risks before gate re-opens.

**Downstream of this gate:** G4 (PRD Approval Gate)

**Policy reference:** GOVERNANCE_POLICIES.md P005, RISK_RULES.md

---

## G4 — PRD Approval Gate

**Triggered after:** PRD draft is complete and submitted for review

**Approver:** Product Owner

**Purpose:** Ensure the PRD is complete, unambiguous, and ready to hand off to engineering. A PRD that passes G4 is a commitment — engineering will build exactly what the PRD describes.

**What is checked:**
- [ ] All requirements are written with complete acceptance criteria
- [ ] All screens affected by this feature are identified by Screen ID
- [ ] All data entities and Convex schema changes are mapped
- [ ] Out-of-scope items are explicitly documented (not left to inference)
- [ ] PRD links to a Feature Object or Sub-feature Object
- [ ] PRD links to the originating Request Object
- [ ] If high-risk: Impact Assessment Object is linked and status is Complete
- [ ] Open questions from grilling are resolved or explicitly deferred with a Decision Object
- [ ] Assumptions are documented
- [ ] Non-functional requirements (performance, security, accessibility, India-specific) are addressed
- [ ] PRD status is set to Approved after gate passes

**Blocks:** No development starts without Approved PRD. Engineering will not receive a Dev Plan (from `/product-devplan`) without a PRD at status Approved.

**On failure:** Return PRD to Product Owner with specific review comments for each failed check. Do not leave the PRD in limbo — either approve or return with clear feedback.

**Downstream of this gate:** G5 (Stories Ready Gate)

**Policy reference:** GOVERNANCE_POLICIES.md P004, P013

---

## G5 — Stories Ready Gate

**Triggered after:** User stories are created (via `/product-stories`)

**Approver:** Product Owner + Engineering

**Purpose:** Ensure stories are implementation-ready before development planning begins. A story that passes G5 can be picked up by an engineer without ambiguity.

**What is checked:**
- [ ] Every requirement in the Approved PRD maps to at least one User Story
- [ ] Every User Story has complete acceptance criteria (written in Given/When/Then or equivalent)
- [ ] Every User Story links to its parent Requirement ID in the PRD
- [ ] Story sequence is logical (dependencies are explicit and ordered)
- [ ] No story has a blocking dependency that isn't resolved
- [ ] Story scope is implementation-sized (not too large to be completed in a sprint)
- [ ] Engineering has reviewed stories and confirmed technical feasibility
- [ ] Test cases or acceptance criteria are clear enough to verify

**Blocks:** Development planning (via `/product-devplan`) cannot begin until stories are ready.

**On failure:** Return stories to Product Owner with specific gaps. Engineering should flag technically infeasible stories before gate closes.

**Downstream of this gate:** G6 (Development Complete Gate)

**Policy reference:** GOVERNANCE_POLICIES.md P009, TRACEABILITY_RULES.md

---

## G6 — Development Complete Gate

**Triggered before:** QA begins

**Approver:** Engineering (self-certification, reviewed by Engineering Lead)

**Purpose:** Ensure development is genuinely complete before QA begins. QA is not a debugging phase — it is a verification phase. Code must be stable before QA starts.

**What is checked:**
- [ ] All stories in the Dev Plan are implemented (status: Done in Dev Plan)
- [ ] No critical open bugs from development
- [ ] No stories are in In Progress state — all are complete or explicitly deferred
- [ ] Deferred stories are documented as Incomplete Work Objects with a Decision Object
- [ ] Code review is complete for all story implementations
- [ ] CI/CD build is passing (no failing tests in automated suite)
- [ ] Dev environment is deployed and accessible for QA
- [ ] Engineering Lead has signed off

**Blocks:** QA cannot start until this gate passes. QA Agent will not create a QA Run until G6 is met.

**On failure:** Engineering team must resolve open items and re-certify. A list of open items must be documented.

**Downstream of this gate:** G7 (QA / UAT Gate)

**Policy reference:** GOVERNANCE_POLICIES.md P006, P009

---

## G7 — QA / UAT Gate

**Triggered after:** QA Run completes

**Approver:** QA (for QA pass); Product Owner (for UAT sign-off)

**Purpose:** Ensure the feature works correctly (QA) and that it meets real-world user needs as verified by the Product Owner or designated testers (UAT). This gate is the last line of defence before production.

**What is checked — QA portion:**
- [ ] QA Run Object exists and is linked to the release
- [ ] QA Run status is Passed or Conditionally Passed
- [ ] All User Stories have corresponding test case coverage in the QA Run
- [ ] All Critical and High severity bugs are resolved (or explicitly accepted with Decision Object)
- [ ] Known Limitations are documented in the QA Run Object

**What is checked — UAT portion:**
- [ ] UAT Run Object exists (or UAT Waiver Decision Object exists)
- [ ] UAT Run links to the completed QA Run
- [ ] UAT was performed on the same build that QA tested
- [ ] Product Owner has reviewed UAT results and signed off
- [ ] If UAT Waiver: Decision Object is complete with rationale and risk acceptance

**Blocks:** Release cannot happen. G8 gate will not open until G7 passes.

**On failure (QA):** QA Run status is Failed. Engineering must fix critical bugs and re-run QA. A new QA Run Object is created.

**On failure (UAT):** Product Owner must document UAT failures and decide: fix and re-test, or accept as Known Limitation with risk acceptance Decision Object.

**Downstream of this gate:** G8 (Release Gate)

**Policy reference:** GOVERNANCE_POLICIES.md P006, P007

---

## G8 — Release Gate

**Triggered before:** Production deployment

**Approver:** Product Owner (final sign-off)

**Purpose:** Final checkpoint before the feature ships to real users. The Product Owner confirms everything is ready, risks are known, and the team can roll back safely if needed.

**What is checked:**
- [ ] G7 gate has passed (QA passed, UAT passed or waived)
- [ ] Release Object exists and is linked to all Feature Objects being shipped
- [ ] Release Notes are written (what changed, what was fixed, what is new)
- [ ] Rollback Plan is written (specific steps, who executes, time estimate)
- [ ] Known Limitations are documented in the Release Object
- [ ] Monitoring signals are defined (what metrics or alerts indicate the release is healthy)
- [ ] Support team has been briefed on changes and known limitations
- [ ] Deployment timing is confirmed (no high-traffic periods, no conflict with other releases)
- [ ] Product Owner has given explicit final sign-off

**Blocks:** No deployment to production without Product Owner sign-off at this gate. Automated deployment pipelines must check Release Object status before proceeding.

**On failure:** Deployment is blocked. Product Owner must document why the gate failed and what must be resolved. A new release date must be set.

**Policy reference:** GOVERNANCE_POLICIES.md P006, P007, P008

---

## Gate Status Reference — Active Work in Nuemart

This table reflects the current gate status for active feature work as of 2026-06-22.

| Feature / Request | G1 | G2 | G3 | G4 | G5 | G6 | G7 | G8 |
|---|---|---|---|---|---|---|---|---|
| REQ-0001 / Delivery MVP | Passed | Passed | N/A | Passed | Passed | Passed | Passed | Passed |
| REQ-0002 / PLP Carousel | Passed | Passed | N/A | Passed | Passed | Passed | Passed | Passed |
| Future requests | — | — | — | — | — | — | — | — |

**Status key:** Passed / Open / Blocked / N/A (not required for this change type)

---

## Cross-References

| Document | Location | Relationship |
|---|---|---|
| GOVERNANCE_POLICIES.md | `product/os/policies/` | Defines the policies these gates enforce |
| RISK_RULES.md | `product/os/policies/` | Defines what triggers G3 (Impact Assessment) |
| STATUS_TRANSITION_RULES.md | `product/os/policies/` | Gates map to allowed state transitions |
| TRACEABILITY_RULES.md | `product/os/policies/` | Gates enforce traceability requirements |
| CLASSIFICATION_RULES.md | `product/99-operating-system/governance/` | Used during G1 classification |
| FEATURE_TRACKING_RULES.md | `product/os/policies/` | Governs Feature Object requirements checked at G4 |
