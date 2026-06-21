# Skill 01 — Request Intake

## Skill Name
Request Intake

## Purpose
Handle the initial intake of any product request: classify it, assign a REQ ID, create the request document, and update all registers. This is step 1 of the Nuemart Product OS lifecycle.

## When to Use
- When the user invokes `/product-request`
- When the user describes a new business need, feature request, or change in natural language
- Before grilling, evaluation, impact assessment, PRD or any downstream activity

## Inputs Expected
- User's natural language description of what they want to build or change
- Optional: reference material (Figma, screenshots, URLs, competitor examples)

## Files to Read First
1. `product/99-operating-system/governance/REQUEST_CLASSIFICATION_MATRIX.md`
2. `product/99-operating-system/governance/REQUEST_SCENARIO_PLAYBOOK.md`
3. `product/99-operating-system/governance/CLASSIFICATION_RULES.md`
4. `product/99-operating-system/governance/INCOMPLETE_REQUEST_RULES.md`
5. `product/99-operating-system/governance/REFERENCE_MATERIAL_RULES.md`
6. `product/03-module-catalogue/MODULE_MASTER.md`
7. `product/01-product-architecture/PRODUCT_HIERARCHY.md`
8. `product/01-product-architecture/SCREEN_REGISTRY.md`
9. `product/00-product-foundation/MASTER_REGISTRY.md`
10. `product/04-request-management/REQUEST_REGISTER.md`
11. `product/04-request-management/ACTIVE_REQUESTS.md`

## Auto-ID Rules
- Read `MASTER_REGISTRY.md` to find the last REQ ID used
- Increment by 1: last used REQ-0004 → next is REQ-0005
- Format: `REQ-NNNN` (4-digit zero-padded)
- Do not assign ID until Step 5 (after deciding the request is valid and non-duplicate)
- Do not create a second REQ for what is clearly one request

## Reference Material Handling
- Ask once: "Do you have any reference material? (Figma, screenshots, competitor examples, existing specs)"
- If provided: read it and note key insights in the REQ file under Reference Material section
- If not provided: proceed without it
- Do not ask again if the user already shared references in the same message
- Follow `REFERENCE_MATERIAL_RULES.md` for full handling rules

## Natural-Language Classification Rules
- Do not ask the user to classify their own request
- Read the description and select from 16 classification types in `REQUEST_CLASSIFICATION_MATRIX.md`
- Provide confidence level: High / Medium / Low
- If confidence is Low, ask one clarifying question before assigning ID
- Explain the reasoning: "I am classifying this as [Type] because [reason]"
- List alternate classifications if ambiguity exists
- Follow all 20 scenario patterns in `REQUEST_SCENARIO_PLAYBOOK.md`

## Module Hierarchy Mapping
- Read `MODULE_MASTER.md` and `PRODUCT_HIERARCHY.md`
- Identify: Primary Module → Sub-module → Feature
- Identify secondary/cross-cutting modules if applicable
- Do not ask the user to name modules — derive from context
- If no existing module matches: flag as New Module Candidate

## Screen ID Handling
- Read `SCREEN_REGISTRY.md` to identify existing screens that may be affected
- List impacted screen IDs (if determinable) in the REQ file
- Do not assign new Screen IDs at intake — that happens at PRD or user story stage
- Follow `SCREEN_ID_RULES.md` for Screen ID rules

## Request Status Handling
- Set initial status to `Under Classification`
- Update to `Classification Complete` once intake is done
- Follow `REQUEST_STATUS_RULES.md` for allowed status transitions
- Do not set to `Grilling`, `PRD`, or any later status during intake

## Incomplete Request Tracking
- If request is vague, contradictory, or references non-existent features: apply `INCOMPLETE_REQUEST_RULES.md`
- Ask the minimum number of clarifying questions needed
- If request cannot proceed: create REQ with status `Incomplete — Awaiting Clarification`
- Add to `INCOMPLETE_WORK_TRACKER.md` if intake cannot complete in session
- Never silently abandon a request — it must be tracked

## Output Files to Create
| File | Path |
|---|---|
| Request document | `product/04-request-management/requests/REQ-NNNN.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | REQ row: Last Used ID, Next ID |
| `REQUEST_REGISTER.md` | Add new row with REQ ID, title, status, classification, date |
| `ACTIVE_REQUESTS.md` | Add new row with REQ ID, title, current stage, next step |

## Stop Condition
Stop after updating registers and presenting the user with the intake confirmation. Do not proceed to grilling in the same response unless grilling is invoked explicitly.

If using `/product-request` which runs the full 20-step workflow, the intake is steps 1–8 and grilling starts at step 9 — in that case, continue automatically to Skill 02.

## Guardrails
- Do not change application code
- Do not create PRD, user stories, dev plan or coding prompt during intake
- Do not build product features
- Do not assume classification without explanation
- Do not duplicate an existing REQ — check `REQUEST_REGISTER.md` first
- Do not mark a proposed screen as Built
- Do not mark a candidate module as Built
- Do not accept reference material as the scope definition — classify the request independently

## Definition of Done
- [ ] User's request has been read and understood
- [ ] Duplicate check performed against `REQUEST_REGISTER.md`
- [ ] Request classified with confidence level and explanation
- [ ] Primary module and sub-module identified
- [ ] REQ ID assigned (format: REQ-NNNN)
- [ ] `REQ-NNNN.md` file created in `product/04-request-management/requests/`
- [ ] `MASTER_REGISTRY.md` updated
- [ ] `REQUEST_REGISTER.md` updated
- [ ] `ACTIVE_REQUESTS.md` updated
- [ ] User presented with: REQ ID, classification, module, next recommended step

---

## Step-by-Step Execution

### Step 1 — Read and understand the request
Read the user's description. Identify: core ask, who is affected, whether this is new/change/bug.

### Step 2 — Check for completeness
Apply `INCOMPLETE_REQUEST_RULES.md`. If confidence is Low: ask one question. Do not assign ID yet.

### Step 3 — Check for duplicates
Read `REQUEST_REGISTER.md`. If a matching request exists, surface it. Do not create a duplicate. Update the existing REQ if new info has been provided.

### Step 4 — Classify
Select classification type, secondary flags and confidence. Explain reasoning.

### Step 5 — Identify module and sub-module
Read `MODULE_MASTER.md`. Identify primary module, sub-module, feature level, and any secondary modules.

### Step 6 — Assign REQ ID
Read `MASTER_REGISTRY.md`. Get next REQ ID. Do not create the file yet.

### Step 7 — Ask for reference material (if not already provided)
One question only. Log reference material summary in the REQ file.

### Step 8 — Create REQ file and update registers
Create `REQ-NNNN.md`. Update `MASTER_REGISTRY.md`, `REQUEST_REGISTER.md`, `ACTIVE_REQUESTS.md`.

### Step 9 — Respond to user
```
**Request logged:** REQ-NNNN
**Classification:** [Type] ([Confidence])
**Module:** [Module] / [Sub-module]
**Impacted screens:** [Screen IDs or "To be determined at PRD stage"]
**Next step:** [Grilling / Evaluation / Direct Dev Plan]
```

Then ask: "Do you want me to proceed to the next step?"

---

## Edge Cases

| Situation | Action |
|---|---|
| Two requests in one message | Create two REQ IDs. Process sequentially. Tell user both have been logged. |
| Re-submission of existing request | Find existing REQ. Do not duplicate. Update if new info provided. |
| User asks a question instead of a request | Answer the question. Do not create a REQ. |
| `/product-request` with no description | Ask for the description before proceeding. |
| Request contradicts existing roadmap decision | Flag it, explain the conflict, ask if user wants to override. |

---

*Last updated: 2026-06-21*
