# Edge Case Handling Rules

Defines how the AI detects and handles edge cases in requests and roadmap items. For each edge case, this policy defines the detection signal, required action, object to create, and whether to proceed, ask, park, reject, or escalate.

---

## Request Edge Cases

### 1. Duplicate Request
- **Signal:** Submitted request closely matches an existing open REQ in title, description, or affected feature.
- **Action:** Flag the match. Show the existing REQ. Ask whether to merge, link, or treat as separate.
- **Object:** Update existing REQ or create a linked REQ.
- **Decision:** Ask before proceeding.

### 2. Conflicting Request
- **Signal:** Two open requests have contradictory outcomes (e.g., REQ-A asks to remove a feature that REQ-B is asking to expand).
- **Action:** Flag conflict. Identify the owner of each. Ask which takes precedence or whether a decision is needed.
- **Object:** Create an OPQ linking both requests.
- **Decision:** Ask for resolution before proceeding.

### 3. Vague Request
- **Signal:** Intent cannot be clearly stated in one `extracted_request` sentence.
- **Action:** Ask one targeted clarification question. Proceed with a stated assumption if the question is minor.
- **Object:** Create REQ with `assumptions_made` field populated.
- **Decision:** Ask if ambiguity is significant; assume if minor.

### 4. Multiple Requests in One Input
- **Signal:** Input contains 2+ distinct asks.
- **Action:** Create an intake batch. Decompose into child REQs.
- **Object:** INTAKE_BATCH + child REQs.
- **Decision:** Proceed. See `MULTI_REQUEST_DECOMPOSITION_RULES.md`.

### 5. Request with Missing Owner
- **Signal:** No product owner, engineering owner, or team can be inferred.
- **Action:** Create the REQ. Set `owner: unassigned`. Flag for triage.
- **Object:** REQ with `owner: unassigned`.
- **Decision:** Proceed with creation; flag for assignment.

### 6. Request with Missing Business Value
- **Signal:** No business goal, user benefit, or expected outcome can be identified.
- **Action:** Ask for business value before progressing to PRD or feature. Create REQ but do not advance.
- **Object:** REQ with `business_value: TBD`.
- **Decision:** Ask. Do not proceed to PRD until value is defined.

### 7. Request with No Clear User
- **Signal:** The target user or persona cannot be inferred.
- **Action:** Ask who the user is. Create REQ with `target_user: TBD`.
- **Decision:** Ask if user stories are needed; assume for simple operational tasks.

### 8. Request That Is Actually a Bug
- **Signal:** The request describes existing behaviour that is broken, incorrect, or crashing.
- **Action:** Create a BUG object instead of a REQ. Link to the affected feature and screen.
- **Object:** BUG-NNN.
- **Decision:** Proceed. Route to bug lane.

### 9. Request That Is Actually an Incident
- **Signal:** Describes a live production failure or service disruption.
- **Action:** Create an INCIDENT object. Flag as P1. Alert product/engineering owner.
- **Object:** INC-NNN.
- **Decision:** Proceed immediately.

### 10. Request That Is Actually Tech Debt
- **Signal:** Describes internal code quality, performance, or architectural improvements with no direct user-facing change.
- **Action:** Create REQ with `classification: tech-debt`, `lane: engineering`.
- **Object:** REQ-NNN.
- **Decision:** Proceed to backlog unless it has a direct user impact.

### 11. Request That Belongs on the Roadmap
- **Signal:** Strategic idea, future capability, or initiative not ready for sprint delivery.
- **Action:** Create a ROADMAP_ITEM instead of or in addition to a REQ.
- **Object:** RMI-NNN.
- **Decision:** Proceed. Do not block.

### 12. Request That Is Too Large and Needs Decomposition
- **Signal:** Single request describes work estimated at XL or more, or spans multiple modules/teams.
- **Action:** Flag scope. Propose decomposition into an initiative with child features/requests.
- **Object:** INITIATIVE-NNN + child REQs or FEAs.
- **Decision:** Ask for decomposition approval before creating PRD.

### 13. Request That Impacts Multiple Modules
- **Signal:** The change requires work in 2+ modules.
- **Action:** Create REQ. Identify impacted modules. Create cross-module impact note. Assign a primary owner per module.
- **Object:** REQ-NNN + IMP-NNN.
- **Decision:** Proceed; flag cross-module coordination needed.

### 14. Request That Impacts Data Model or Schema
- **Signal:** Feature requires adding/modifying tables, fields, or indexes in `convex/schema.ts`.
- **Action:** Flag schema change. Create REQ with `schema_change: yes`. Require engineering review per `DATABASE_GUARDRAILS.md`.
- **Object:** REQ-NNN + data migration object if needed.
- **Decision:** Proceed to PRD; but do not proceed to implementation without engineering review.

### 15. Request That Impacts Payments, Security, or Auth
- **Signal:** Involves Razorpay, Clerk, user data, access control, or financial flow.
- **Action:** Flag high-risk area. Add risk object. Require security review per `SECURITY_GUARDRAILS.md` and `AUTH_GUARDRAILS.md`.
- **Object:** REQ-NNN + RSK-NNN.
- **Decision:** Ask for explicit approval before implementation.

### 16. Request That Needs Design Before PRD
- **Signal:** Feature is complex, user-facing, and visual; intent cannot be defined without seeing the UI.
- **Action:** Mark PRD as `blocked: design`. Create a FIGMA_BUILD_SPEC or DESIGN_BRIEF. Engage design owner.
- **Object:** REQ-NNN + WFR or FIG object.
- **Decision:** Ask. Block PRD until design input is provided.

### 17. Request That Needs Business Approval
- **Signal:** Request involves a policy change, pricing change, partner agreement, or significant commercial decision.
- **Action:** Create APPROVAL object. Identify approver. Do not proceed until approved.
- **Object:** REQ-NNN + APPROVAL-NNN.
- **Decision:** Block. Escalate to business owner.

### 18. Request That Needs Support/Ops Readiness
- **Signal:** Feature will generate new support scenarios, requires training, or changes operational processes.
- **Action:** Add `ops_readiness: required` to the REQ and release plan. Create SOP or training material task.
- **Object:** REQ-NNN with ops readiness flag.
- **Decision:** Proceed to PRD; add ops readiness to release checklist.

### 19. Request That Has a Client Commitment
- **Signal:** Request was promised to a specific client by a specific date.
- **Action:** Create CLIENT_COMMITMENT object. Link to REQ. Elevate priority.
- **Object:** REQ-NNN + CLIENT_COMMITMENT-NNN.
- **Decision:** Proceed with elevated priority. Flag if at risk of missing date.

### 20. Request That Has Regulatory or Compliance Impact
- **Signal:** Feature involves user data handling, privacy, financial regulation, or legal requirement.
- **Action:** Flag regulatory impact. Create RSK object. Require legal/compliance review before implementation.
- **Object:** REQ-NNN + RSK-NNN.
- **Decision:** Block implementation until compliance is confirmed.

### 21. Request That Is Out of Scope
- **Signal:** Request clearly falls outside the product's current domain, user base, or strategy.
- **Action:** Flag as out of scope. Explain why. Offer to park or create a roadmap item for future consideration.
- **Object:** PLT-NNN or RMI-NNN.
- **Decision:** Do not create an active REQ. Park or reject.

### 22. Request That Should Be Rejected
- **Signal:** Request conflicts with a strategic decision, has been explicitly declined before, is technically infeasible, or creates unacceptable risk.
- **Action:** Create REQ with `status: rejected`. Record rejection reason. Inform submitter.
- **Object:** REQ-NNN with rejection note.
- **Decision:** Reject. Explain clearly.

### 23. Request That Should Be Parked
- **Signal:** Valid idea but not actionable now — no owner, no business priority, unclear timing.
- **Action:** Create PLT-NNN. Record verbatim input. Set review date.
- **Object:** PLT-NNN.
- **Decision:** Park. Do not lose the input.

### 24. Request That Should Be Converted to an Experiment
- **Signal:** Request depends on an unvalidated assumption about user behaviour or business outcome.
- **Action:** Create EXPERIMENT object instead of feature. Define hypothesis, metric, and success criteria.
- **Object:** EXPERIMENT-NNN.
- **Decision:** Proceed as experiment. Do not build full feature without validation.

### 25. Request That Should Be Split into Phase 1 / Phase 2
- **Signal:** Request contains a core deliverable and a future enhancement that can be separated.
- **Action:** Split into two REQs. Mark Phase 1 as active, Phase 2 as deferred.
- **Object:** REQ-NNN (Phase 1) + DEF-NNN (Phase 2).
- **Decision:** Proceed with Phase 1. Defer Phase 2 explicitly.

---

## Roadmap Edge Cases

### 26. Roadmap Item with No Priority
- **Signal:** RMI has no `priority_score`.
- **Action:** Flag in ROADMAP_DISCUSSION_VIEW. Request scoring at next roadmap review.
- **Decision:** Proceed with creation. Do not block.

### 27. Roadmap Item with No Target Quarter
- **Signal:** RMI has `target_quarter: TBD`.
- **Action:** Accept as valid. Flag for roadmap planning session.
- **Decision:** Proceed. TBD is acceptable at intake.

### 28. Roadmap Item with No Business Owner
- **Signal:** No business owner can be identified for the RMI.
- **Action:** Flag in ROADMAP_DISCUSSION_VIEW. Create OPQ for ownership assignment.
- **Decision:** Proceed with creation; block conversion to feature until owner is assigned.

### 29. Roadmap Item with a Dependency
- **Signal:** RMI cannot be started or completed without another item, project, or external event.
- **Action:** Record dependency in RMI. Flag if dependency is unresolved.
- **Object:** RMI with `dependencies` populated + DEPENDENCY object if the dependency is complex.
- **Decision:** Proceed. Flag dependency risk.

### 30. Roadmap Item That Needs Discovery First
- **Signal:** Business value or technical feasibility is unknown or contested.
- **Action:** Set `status: under-discussion`. Create discovery or research task before proceeding.
- **Object:** RMI + RSN or EVD object.
- **Decision:** Park in roadmap discussion. Do not convert to feature without discovery results.

### 31. Roadmap Item That Conflicts with Current Architecture
- **Signal:** Proposed capability contradicts a fundamental architectural principle (e.g., requires replacing Convex, building a separate auth system).
- **Action:** Flag architectural conflict. Create RSK object. Require engineering architecture review.
- **Object:** RMI + RSK-NNN.
- **Decision:** Escalate to engineering owner. Do not proceed without explicit architectural decision.

### 32. Roadmap Item That Needs Commercial Validation
- **Signal:** Business case depends on pricing, partner agreement, or revenue model that has not been confirmed.
- **Action:** Flag commercial dependency. Create open question for business owner.
- **Object:** RMI + OPQ-NNN.
- **Decision:** Park until commercial validation is complete.

### 33. Roadmap Item That Needs Technical Feasibility Check
- **Signal:** It is unclear whether the proposed capability is technically possible with the current stack and team.
- **Action:** Create a technical spike or feasibility task. Do not convert to PRD until feasibility is confirmed.
- **Object:** RMI + DISCOVERY or EXPERIMENT object.
- **Decision:** Block conversion. Complete feasibility check first.

---

## Cross-Cutting Rules

1. **Never silently drop a request or roadmap item.** Every input must result in an object — even if that object is a PLT (parked) or rejected REQ.
2. **Never block classification.** An incomplete request is still a request. Create it with `TBD` fields.
3. **Never proceed to implementation for high-risk changes** (security, payments, schema, compliance) without explicit approval.
4. **Ask one question at a time.** If multiple clarifications are needed, prioritise the most blocking one.
5. **Proceed with stated assumptions** for low-risk ambiguities. Document the assumption in the object.

---

## Related
- Policy: `product/os/policies/MULTI_REQUEST_DECOMPOSITION_RULES.md`
- Policy: `product/os/policies/ROADMAP_INTAKE_RULES.md`
- Policy: `product/os/policies/MIDSTREAM_CHANGE_RULES.md`
- Policy: `product/os/policies/REQUEST_CLASSIFICATION_RULES.md`
- Policy: `product/technical-framework/AI_CODING_GUARDRAILS.md`
