# Skill 02 — Requirement Grilling

## Skill Name
Requirement Grilling

## Purpose
Conduct deep, structured questioning on an intake-approved request to surface all requirements, rules, validations, edge cases, user flows, data needs, and acceptance criteria before any PRD is written.

## When to Use
- After intake is complete (REQ ID exists, status is `Classification Complete`)
- When invoked via `/product-grill` or automatically as part of `/product-request` workflow
- Before impact assessment and PRD writing
- Whenever a request has unanswered questions that could affect scope

## Inputs Expected
- REQ ID (e.g. `REQ-0003`)
- Existing REQ file with classification and module mapping
- Optional: reference material, user flows, wireframes

## Files to Read First
1. `product/04-request-management/requests/REQ-NNNN.md` — the active request
2. `product/05-discovery-and-grilling/GRILLING_QUESTION_BANK.md` — the question bank
3. `product/05-discovery-and-grilling/GRILLING_TEMPLATE.md` — grilling document template
4. `product/03-module-catalogue/MODULE_MASTER.md` — for module context
5. `product/01-product-architecture/PRODUCT_HIERARCHY.md` — for feature hierarchy
6. `product/01-product-architecture/SCREEN_REGISTRY.md` — to reference existing screens
7. `product/01-product-architecture/ROLE_PERMISSION_MAP.md` — for role/permission context
8. `product/99-operating-system/governance/INCOMPLETE_REQUEST_RULES.md`

## Auto-ID Rules
- Grilling documents use ID: `GRILLING-NNNN`
- Read `MASTER_REGISTRY.md` to get the next GRILLING ID
- Format: `GRILLING-NNNN` (4-digit zero-padded)
- One GRILLING document per REQ ID

## Reference Material Handling
- Read any reference material provided during intake (noted in the REQ file)
- Use references to inform questions — do not use them as the requirements themselves
- If new reference material is provided during grilling, read it and update the GRILLING file

## Natural-Language Classification Rules
Not applicable during grilling. Classification is already done. Do not re-classify.

## Module Hierarchy Mapping
- Use module and sub-module already identified in the REQ file
- If grilling reveals the request spans more modules than initially identified, note the additional modules in the GRILLING file
- Do not change the REQ classification without noting it explicitly

## Screen ID Handling
- During grilling, identify which existing screens are affected
- List Screen IDs for affected screens in the GRILLING file
- Flag if new screens are required (do not assign Screen IDs yet — that happens at PRD stage)

## Request Status Handling
- Update status in `REQUEST_REGISTER.md` to `Grilling In Progress` when grilling begins
- Update to `Grilling Complete` when grilling is done and scope is agreed
- Gate: do not proceed to PRD until the user signs off on the grilling summary (G2 gate per `APPROVAL_GATES.md`)

## Incomplete Request Tracking
- If the user cannot answer critical grilling questions, mark those questions `[UNANSWERED]` in the GRILLING file
- Update `ACTIVE_REQUESTS.md` to note blocked questions
- If unable to complete grilling: update `INCOMPLETE_WORK_TRACKER.md` with reason and missing answers
- Do not silently drop unanswered questions

## Output Files to Create
| File | Path |
|---|---|
| Grilling document | `product/05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | GRILLING row: Last Used ID, Next ID |
| `REQUEST_REGISTER.md` | Update status to `Grilling In Progress` → `Grilling Complete` |
| `ACTIVE_REQUESTS.md` | Update stage and next step |
| `INCOMPLETE_WORK_TRACKER.md` | Add entry if grilling is incomplete or unanswered questions exist |

## Stop Condition
Stop after presenting the grilling summary and asking for user sign-off. Do not proceed to evaluation or PRD until the user confirms the scope summary is correct.

Ask: "Do you want me to proceed to the next step?"

## Guardrails
- Do not write the PRD during grilling
- Do not assign Screen IDs during grilling
- Do not change application code
- Do not skip the grilling gate even if the request seems simple
- Do not present 20 questions one by one — group them into logical batches
- Do not invent answers — only use what the user provides
- Mark unanswered questions explicitly with `[UNANSWERED]`

## Definition of Done
- [ ] All relevant grilling questions selected from `GRILLING_QUESTION_BANK.md`
- [ ] Questions asked and answers recorded
- [ ] Unanswered questions marked `[UNANSWERED]`
- [ ] Affected existing screens identified with Screen IDs
- [ ] New screens needed flagged
- [ ] MVP boundary proposed and agreed with user
- [ ] `GRILLING-NNNN.md` created in `product/05-discovery-and-grilling/grilled-requests/`
- [ ] `MASTER_REGISTRY.md` updated
- [ ] `REQUEST_REGISTER.md` status updated to `Grilling Complete`
- [ ] `ACTIVE_REQUESTS.md` updated
- [ ] User signed off on scope summary (G2 gate)

---

## Grilling Question Domains

Pull questions from `GRILLING_QUESTION_BANK.md` across all relevant domains:

| Domain | Examples |
|---|---|
| Problem | What problem does this solve? Who reported it? |
| Users | Which role? Customer / Admin / Rider? |
| User flows | Step-by-step: what does the user do? |
| Business rules | What are the conditions, limits, triggers? |
| Data | What data is created, read, updated, deleted? |
| Validations | What is valid/invalid? What are error states? |
| Edge cases | What if stock runs out? Payment fails? User is logged out? |
| Reporting | Does this create any reportable event? |
| Permissions | Which roles can access, create, edit, delete? |
| Dependencies | Does this require anything that doesn't exist yet? |
| Screens | Which screens are affected? Any new screens needed? |
| Acceptance | What does "done" look like? How will we test it? |

---

*Last updated: 2026-06-21*
