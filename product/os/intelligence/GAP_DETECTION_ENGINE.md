# Nuemart Product OS — Gap Detection Engine

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## Purpose

The Gap Detection Engine continuously scans all Product Objects, relationship indexes, and traceability chains to identify:
- Missing objects that should exist but don't
- Broken relationship links between objects that should be connected
- Empty or incomplete required metadata fields
- Traceability chain breaks that make releases unauditable
- Coverage gaps where requirements have no tests and features have no criteria
- Stale objects stuck in states longer than the expected lifecycle duration
- Consistency conflicts between objects that contradict each other
- Knowledge gaps where decisions were made without a Decision Object

The engine runs automatically as part of `/product-resume` (Intelligence Agent) and can be invoked standalone at any time.

---

## Gap Types

---

### Gap Type 1 — Missing Object

**Definition:** A required Product Object does not exist, but the lifecycle or relationship rules require it.

**Common triggers:**
- A Request Object exists with status `Classified` but no Feature Object exists (Product Architect Agent should have created one)
- A PRD Object exists but no Requirement Objects are linked to it
- A User Story Object exists but no Test Case covers any of its acceptance criteria
- A QA Run Object exists but the linked Test Plan Object does not exist
- A Release Object exists but no UAT Run Object is linked

**Detection method:**
1. For each object in OBJECT_INDEX.md, look up its required downstream objects per LIFECYCLE_MODELS.md
2. For each required downstream object: check whether it exists via OBJECT_INDEX.md and the `product/objects/` directory
3. If the object is absent: flag as `MISSING_OBJECT` gap

**Severity:**
- Blocking: Missing object prevents lifecycle advancement (e.g., no PRD → cannot create stories)
- Warning: Missing object represents incomplete documentation (e.g., no Evaluation Object)
- Advisory: Missing object is best-practice but not lifecycle-blocking

**Required metadata:**
```yaml
gap_id: GAP-MISSING-OBJ-{SEQ}
gap_type: MISSING_OBJECT
severity: Blocking | Warning | Advisory
parent_object_id: <ID of the object that should have spawned the missing one>
missing_object_type: <type of the object that should exist>
expected_object_id: <semantic ID that the object should have, if predictable>
resolution_action: "Run /product-{command} to create the missing object"
detected_at: <ISO datetime>
```

---

### Gap Type 2 — Missing Relationship

**Definition:** An object exists but lacks one or more required relationship links to other objects.

**Common triggers:**
- User Story Object exists but has no `feature_id` link (orphaned story)
- Test Case Object exists but has no link to any Acceptance Criterion
- Bug Object exists but has no link to the Test Case that found it
- Release Object exists but has no link to a UAT Run or waiver Decision Object
- Requirement Object exists but has no link to any screen or data entity

**Detection method:**
1. For each object in OBJECT_INDEX.md: load the object's `relationships` block
2. Compare present relationships to required relationships per TRACEABILITY_RULES.md
3. Any required relationship that is absent → flag as `MISSING_RELATIONSHIP` gap

**Severity:**
- Blocking: Missing link breaks the traceability chain required for release (e.g., Story without Feature link)
- Warning: Missing link reduces audit quality (e.g., Requirement without Screen link)
- Advisory: Missing link is informational (e.g., Feature without Evaluation link)

**Required metadata:**
```yaml
gap_id: GAP-MISSING-REL-{SEQ}
gap_type: MISSING_RELATIONSHIP
severity: Blocking | Warning | Advisory
object_id: <ID of the object with the missing link>
missing_relationship_type: <type of relationship that should exist>
expected_target_type: <type of object that should be linked>
resolution_action: "Add {relationship_type} link to {object_id} pointing to {expected_target_type}"
detected_at: <ISO datetime>
```

---

### Gap Type 3 — Missing Metadata

**Definition:** A required field on an existing object is empty or null when it must have a value.

**Common triggers:**
- Request Object has no `owner` assigned
- Feature Object has no `priority_tier` set
- User Story Object has no `size` estimate
- Impact Assessment Object has a category with no severity rating assigned
- PRD Object has `status: Draft` but no review date or reviewer

**Detection method:**
1. For each object in OBJECT_INDEX.md: load the object file
2. For each required field per the object's schema (defined in OBJECT_TYPES.md): check for null, empty string, or missing key
3. Flag each missing required field as a separate `MISSING_METADATA` gap

**Severity:**
- Blocking: Missing field prevents governance gate clearance (e.g., no `required_gates` on Impact Assessment)
- Warning: Missing field reduces traceability or planning quality (e.g., no size estimate on stories)
- Advisory: Missing field is informational best practice (e.g., no version history on PRD)

**Required metadata:**
```yaml
gap_id: GAP-MISSING-META-{SEQ}
gap_type: MISSING_METADATA
severity: Blocking | Warning | Advisory
object_id: <ID of the object with missing field>
missing_field: <exact field name>
resolution_action: "Update {object_id}: set field '{missing_field}' to a valid value"
detected_at: <ISO datetime>
```

---

### Gap Type 4 — Broken Traceability

**Definition:** The full traceability chain from a terminal object (Release) back to a root object (Request or Initiative) has one or more breaks.

**The required chain:**
```
Request → Feature → PRD → Requirement → User Story → Test Case → QA Run → UAT Run → Release
```

**Common breaks:**
- Release exists but cannot be traced back to a Feature (missing Feature → PRD link or Feature → Request link)
- UAT Run exists but the QA Run it should link to doesn't exist or isn't linked
- User Story exists but traces to a PRD that is not linked to any Request

**Detection method:**
1. Start from each Release Object in OBJECT_INDEX.md
2. Walk backwards through the chain: Release → UAT Run → QA Run → Test Plan → User Story → PRD → Requirement → Feature → Request
3. At each link: verify the linked object exists AND the reverse link exists on the linked object
4. Any break in the chain → flag as `BROKEN_TRACEABILITY` gap with the specific break point

**Severity:**
- Blocking: Release without traceable QA or UAT evidence (audit failure)
- Warning: Feature without traceable Request (orphaned feature)
- Advisory: Minor chain gaps (e.g., User Story not linked to a Requirement but linked to PRD directly)

**Required metadata:**
```yaml
gap_id: GAP-BROKEN-TRACE-{SEQ}
gap_type: BROKEN_TRACEABILITY
severity: Blocking | Warning | Advisory
chain_start: <Release Object ID or terminal object>
chain_break_at: <Object ID where the chain breaks>
break_description: "<what link is missing>"
resolution_action: "Add missing relationship from {object_id} to {expected_target}"
detected_at: <ISO datetime>
```

---

### Gap Type 5 — Coverage Gap

**Definition:** A requirement or feature has no test coverage, or a feature has no acceptance criteria.

**Coverage gaps:**

| Source Object | Missing Coverage | Gap |
|---|---|---|
| Acceptance Criterion | No Test Case references this criterion | Test coverage gap |
| User Story | No Test Cases cover any of its acceptance criteria | Story coverage gap |
| Requirement | No User Stories implement this requirement | Implementation gap |
| Feature | No acceptance criteria defined in PRD | Criteria gap |
| PRD | Coverage <90% (acceptance criteria with no test cases) | PRD coverage gap |

**Detection method:**
1. For each Acceptance Criterion Object: check if at least one Test Case links to it
2. For each User Story: check if at least one Test Case covers it (via AC links)
3. For each Requirement: check if at least one User Story implements it
4. For each Feature: check if the linked PRD has acceptance criteria defined
5. Calculate coverage ratio per PRD: (ACs with test cases / total ACs) × 100

**Severity:**
- Blocking: Coverage <70% overall; or any P0 User Story has zero test coverage
- Warning: Coverage 70–89%; or individual P1 story has weak coverage
- Advisory: Coverage ≥90%; minor gaps in edge case coverage

**Required metadata:**
```yaml
gap_id: GAP-COVERAGE-{SEQ}
gap_type: COVERAGE_GAP
severity: Blocking | Warning | Advisory
uncovered_object_id: <ID of the story, requirement, or AC without coverage>
uncovered_object_type: <type>
coverage_percentage: <0–100, for PRD-level gaps>
resolution_action: "Create Test Case(s) covering {uncovered_object_id}"
detected_at: <ISO datetime>
```

---

### Gap Type 6 — Lifecycle Gap (Stale Object)

**Definition:** An object has been in the same lifecycle stage for longer than the expected maximum duration for that stage.

**Expected maximum durations:**

| Stage | Object Type | Max Duration |
|---|---|---|
| `Received` | Request | 2 business days |
| `Classified` | Request | 3 business days |
| `Grilled` | Request | 5 business days |
| `Impact Assessed` | Request | 3 business days |
| `PRD Created` (not Approved) | PRD | 5 business days |
| `Draft` | User Story | 5 business days |
| `In Development` | Feature | 30 calendar days |
| `QA In Progress` | Feature | 7 calendar days |
| `UAT Complete` (not Released) | Feature | 10 calendar days |

**Detection method:**
1. For each active object in OBJECT_INDEX.md: read `status` and `status_updated_at`
2. Calculate days since last status change
3. Compare to maximum duration for the current stage
4. If exceeded → flag as `LIFECYCLE_GAP` (stale object)

**Severity:**
- Blocking: Object has been stale for more than 3× the expected duration
- Warning: Object has been stale for 1.5–3× the expected duration
- Advisory: Object has been stale for 1–1.5× the expected duration

**Required metadata:**
```yaml
gap_id: GAP-LIFECYCLE-{SEQ}
gap_type: LIFECYCLE_GAP
severity: Blocking | Warning | Advisory
stale_object_id: <ID>
current_stage: <stage>
days_in_stage: <N>
expected_max_days: <N>
resolution_action: "<specific next step to unblock this object>"
detected_at: <ISO datetime>
```

---

### Gap Type 7 — Consistency Gap

**Definition:** Two objects make contradictory claims about the same product area, scope, or behavior.

**Common inconsistencies:**
- PRD says feature X is in scope; Impact Assessment says it is out of scope
- User Story says role Y can perform action Z; PRD says only role W can perform action Z
- Release Object says feature A is included; Feature Object status is still `In Development`
- Two Requirement Objects define conflicting business rules for the same scenario
- Discovery Session says design A was chosen; PRD documents design B with no Decision Object explaining the switch

**Detection method:**
1. For each PRD Object: compare scope lists against Impact Assessment out-of-scope lists
2. For each Role mentioned in User Stories: compare against PRD role definitions
3. For each Feature in Release Objects: compare against Feature Object status
4. For each pair of Requirement Objects in the same PRD: check for contradictory rule definitions
5. Flag any contradiction as a `CONSISTENCY_GAP`

**Severity:**
- Blocking: Contradiction affects what will be built or released (engineers will build the wrong thing)
- Warning: Contradiction is in documentation only but creates audit confusion
- Advisory: Minor wording inconsistency with no functional impact

**Required metadata:**
```yaml
gap_id: GAP-CONSISTENCY-{SEQ}
gap_type: CONSISTENCY_GAP
severity: Blocking | Warning | Advisory
object_a_id: <first contradicting object>
object_b_id: <second contradicting object>
contradiction_description: "<what specifically contradicts>"
resolution_action: "Create Decision Object resolving the contradiction; update one or both objects to align"
detected_at: <ISO datetime>
```

---

### Gap Type 8 — Knowledge Gap

**Definition:** A decision was made (scope changed, design chosen, approach adopted, trade-off accepted) but no Decision Object exists to document it.

**Common knowledge gaps:**
- Discovery Session notes mention a decision to exclude a feature from MVP, but no Decision Object records this
- Development Plan includes a technical approach that was chosen over an alternative, but no Decision Object records why
- A governance gate was waived, but no Decision Object exists documenting the waiver and its approver
- A Known Limitation was accepted in UAT, but no Decision Object explains why it was accepted

**Detection method:**
1. Scan Discovery Session Objects for text markers of decisions ("decided to", "agreed to", "will not", "chosen to", "opted for")
2. Scan QA Run and UAT Run Objects for Known Limitation Objects that lack Decision Object links
3. Check all Release Objects for gate waivers — each waiver must have a Decision Object
4. Scan Development Plan Objects for documented alternative approaches without Decision Objects

**Severity:**
- Blocking: Gate waiver without Decision Object (cannot prove the waiver was approved)
- Warning: Scope decision without Decision Object (loss of rationale)
- Advisory: Minor technical choice without Decision Object (lower-stakes knowledge loss)

**Required metadata:**
```yaml
gap_id: GAP-KNOWLEDGE-{SEQ}
gap_type: KNOWLEDGE_GAP
severity: Blocking | Warning | Advisory
source_object_id: <ID of object where the undocumented decision is referenced>
decision_description: "<what decision was apparently made>"
resolution_action: "Create Decision Object documenting the decision at {source_object_id}"
detected_at: <ISO datetime>
```

---

## Inputs

| Input | Source | Notes |
|---|---|---|
| All object files | `product/objects/**/*.md` | Full scan required |
| OBJECT_INDEX.md | `product/indexes/` | Master registry |
| TRACEABILITY_MAP.md | `product/indexes/` | For Gap Type 4 |
| RELATIONSHIP_INDEX.md | `product/indexes/` | For Gap Types 2 and 4 |
| LIFECYCLE_MODELS.md | `product/os/` | For Gap Type 6 |
| OBJECT_TYPES.md | `product/os/` | Required fields schema for Gap Type 3 |

---

## Reasoning Steps

1. **Load OBJECT_INDEX.md.** If not populated, output `GAP-CRITICAL: OBJECT_INDEX.md is empty — gap detection cannot run; index must be rebuilt first`.

2. **Run Gap Type 1 (Missing Object) scan.** For each object in the index, determine its lifecycle stage and check if required downstream objects exist.

3. **Run Gap Type 2 (Missing Relationship) scan.** For each object, load its `relationships` block and compare against required relationships.

4. **Run Gap Type 3 (Missing Metadata) scan.** For each object, check all required fields are populated.

5. **Run Gap Type 4 (Broken Traceability) scan.** Start from all Release Objects and walk the chain backwards. For non-released features, start from the most advanced lifecycle stage.

6. **Run Gap Type 5 (Coverage Gap) scan.** For each PRD, calculate acceptance criterion coverage. For each User Story, verify test coverage exists.

7. **Run Gap Type 6 (Lifecycle Gap) scan.** For each active object, calculate time in current stage and compare to expected maximum duration.

8. **Run Gap Type 7 (Consistency Gap) scan.** Compare scope lists, role definitions, and business rules across related objects.

9. **Run Gap Type 8 (Knowledge Gap) scan.** Scan for decision markers in Discovery, UAT, and Development Plan objects.

10. **Compile all gaps.** Assign IDs, severity, and resolution actions. Output sorted by severity: Blocking first, then Warning, then Advisory.

11. **Update OBJECT_INDEX.md.** Add gap flags to each object that has gaps. Format: `gaps: [GAP-MISSING-OBJ-001, GAP-MISSING-REL-003]`.

12. **Forward Blocking gaps to NEXT_ACTION_ENGINE.** Blocking gaps pre-empt all other next-action recommendations.

---

## Output Objects

| Output | Type | Notes |
|---|---|---|
| GAP objects | Output (not persisted as separate files) | Returned as structured output to Intelligence Agent and user |
| OBJECT_INDEX.md updates | Updated | Gap flags added to each affected object entry |
| NEXT_ACTION_ENGINE input | Forwarded | Blocking gaps become highest-priority recommendations |

---

## Severity Levels

| Level | Definition | Effect |
|---|---|---|
| **Blocking** | The gap prevents lifecycle advancement, release, or valid audit | Surfaces as Priority 1 in NEXT_ACTION_ENGINE; must be resolved before any other action |
| **Warning** | The gap reduces quality, traceability, or audit completeness | Surfaces as Priority 2; should be resolved soon |
| **Advisory** | The gap is a best-practice deviation with no immediate impact | Surfaces as Priority 3; resolve when convenient |

---

## Required Metadata (All Gap Objects)

```yaml
gap_id: GAP-{TYPE_CODE}-{SEQ}
gap_type: MISSING_OBJECT | MISSING_RELATIONSHIP | MISSING_METADATA | BROKEN_TRACEABILITY | COVERAGE_GAP | LIFECYCLE_GAP | CONSISTENCY_GAP | KNOWLEDGE_GAP
severity: Blocking | Warning | Advisory
affected_object_id: <primary object with the gap>
missing_element: <what specifically is absent>
resolution_action: "<specific, actionable step to resolve this gap>"
detected_at: <ISO datetime>
resolved_at: <ISO datetime or null>
resolved_by: <user or null>
```

---

## Failure Conditions

| Failure | Handling |
|---|---|
| OBJECT_INDEX.md not populated | Output critical error; gap scan cannot proceed; output instruction to rebuild index |
| Object files not readable | Flag unreadable object as a potential gap; include in output with `gap_type: UNREADABLE_OBJECT` |
| LIFECYCLE_MODELS.md not available | Gap Type 6 (stale detection) cannot run; flag as advisory; continue other gap types |
| Circular relationship detected | Flag as `gap_type: CIRCULAR_DEPENDENCY`; surface for human review |

---

## Example

**Object:** STORY-COM-PLP-CAROUSEL-NAVIGATION-001 (User Story: Navigate between carousel slides)

**Gap detected:**
- Gap Type 5 (Coverage Gap): STORY-COM-PLP-CAROUSEL-NAVIGATION-001 has three acceptance criteria. Zero Test Case Objects link to any of them.

**Gap output:**
```yaml
gap_id: GAP-COVERAGE-001
gap_type: COVERAGE_GAP
severity: Warning
uncovered_object_id: STORY-COM-PLP-CAROUSEL-NAVIGATION-001
uncovered_object_type: UserStory
coverage_percentage: 0
resolution_action: "Run /product-qa REQUEST-COM-PLP-CAROUSEL-001 — QA Agent will generate Test Cases for STORY-COM-PLP-CAROUSEL-NAVIGATION-001 acceptance criteria"
detected_at: 2026-06-22T10:00:00Z
```

**OBJECT_INDEX.md update:**
```
| STORY-COM-PLP-CAROUSEL-NAVIGATION-001 | User Story | In Progress | ... | gaps: [GAP-COVERAGE-001] |
```

---

## Related Files

- `AI_REASONING_MODEL.md` — Gap detection informs Steps 9 (missing information) and post-Step 15 validation
- `AI_AGENTS.md` — Intelligence Agent (Agent 15) runs this engine
- `TRACEABILITY_ENGINE.md` — Source of traceability chain for Gap Type 4
- `NEXT_ACTION_ENGINE.md` — Receives Blocking gaps as highest-priority inputs
- `OBJECT_TYPES.md` — Defines required fields used in Gap Type 3
- `LIFECYCLE_MODELS.md` — Defines expected durations used in Gap Type 6
