# Session Flow Rules

Defines the step-by-step lifecycle rules for how a request moves from submission to release. Claude follows these rules automatically when a `/product-request` session is active.

---

## The 20-Step Workflow

Every request follows this workflow. Steps may be fast-tracked or combined for simple requests (see Fast-Track Rules below).

| Step | Action | Who | Output |
|---|---|---|---|
| 1 | User describes what they want in natural language | User | Natural language description |
| 2 | Claude reads the description and classifies the request | Claude | Classification + confidence level |
| 3 | Claude identifies the module and sub-module | Claude | Module mapping |
| 4 | Claude checks for blocking conditions (vague, missing info, prerequisite not met) | Claude | Clear to proceed, or apply INCOMPLETE_REQUEST_RULES.md |
| 5 | Claude gets the next REQ ID from MASTER_REGISTRY.md | Claude | REQ ID assigned |
| 6 | Claude creates the REQ file in `04-request-management/requests/REQ-NNNN.md` | Claude | REQ file created |
| 7 | Claude updates MASTER_REGISTRY.md with new REQ ID | Claude | Registry updated |
| 8 | Claude responds to user with: classification, module, REQ ID, and next step | Claude | User confirmation message |
| 9 | Claude begins grilling — selects relevant questions from GRILLING_QUESTION_BANK.md | Claude | Grilling questions sent to user |
| 10 | User answers grilling questions | User | Grilling answers |
| 11 | Claude creates GRILLING-NNNN.md with completed discovery | Claude | Grilling file created |
| 12 | Claude presents scope summary and MVP boundary. User signs off grilling (G2 gate). | User | G2 approval |
| 13 | If complex: Claude writes EVAL-NNNN.md and presents for evaluation (G3 gate). If simple: skip to step 14. | Claude / User | G3 approval or skip |
| 14 | If high-risk: Claude writes IMPACT-NNNN.md (impact assessment). User reviews Go/No-Go. If low-risk: skip. | Claude / User | Impact Assessment or skip |
| 15 | Claude writes PRD-NNNN.md with full requirements | Claude | PRD created |
| 16 | User reviews and approves PRD (G4 gate). | User | G4 approval |
| 17 | Claude writes user stories (US-NNNN.md files). | Claude | User stories created |
| 18 | Claude writes DEVPLAN-NNNN.md and DEVPLAN-NNNN-coding-prompt.md. User and developer confirm (G5 gate). | Claude / User | Dev plan + coding prompt |
| 19 | Development runs. Completion report submitted (9-item format). | Developer | Completion report |
| 20 | QA → UAT → Release follows standard gates (G6, G7, G8). | All | Release |

---

## Fast-Track Rules

Some request types skip steps:

### Bug (Step 9–11 skipped)

```
Classify → REQ ID → DEVPLAN (reproduce and fix) → QA → Release
```
No grilling. No PRD. No user stories. Direct dev plan.

### Content / Copy Change (Steps 9–17 skipped)

```
Classify → REQ ID → DEVPLAN → Deploy
```
No grilling. No PRD. No user stories. No QA for trivial changes (optional QA for anything visible).

### Roadmap / Evaluation Item (Steps 5–20 skipped)

```
Classify → EVAL ID → Evaluation Document
```
No REQ. No grilling. No PRD. Evaluation only. Revisit when the product owner is ready to build.

### UI/UX Improvement (Steps 13–15 compressed)

```
Classify → REQ ID → Light grilling → DEVPLAN → QA (optional) → Deploy
```
Impact assessment skipped unless it touches multiple screens or requires schema change.

---

## When Claude Must NOT Skip Steps

| Situation | Steps that must NOT be skipped |
|---|---|
| New Module Candidate | Steps 9–16 (grilling, evaluation, impact assessment, PRD are all mandatory) |
| Schema change required | Steps 14–16 (impact assessment and PRD are mandatory) |
| Payment logic affected | Steps 14–16 mandatory |
| Inventory logic affected | Steps 14–16 mandatory |
| Security concern | Steps 14–16 mandatory |

---

## What Claude Must NEVER Ask the User to Do

In any `/product-request` session, Claude must never ask the user to:

| What Claude Must NOT Ask | Reason |
|---|---|
| "What type of request is this?" | Claude classifies, not the user |
| "What module does this belong to?" | Claude derives from classification |
| "What sub-module is this?" | Claude derives from module catalogue |
| "What is the REQ ID?" | Claude reads the registry |
| "What Screen ID should I use?" | Claude reads SCREEN_REGISTRY.md |
| "What is the next PRD number?" | Claude reads MASTER_REGISTRY.md |
| "Which skill should I use?" | Claude decides based on the step |
| "What should the next step be?" | Claude knows the workflow |
| "Which template should I follow?" | Claude knows which template to use |

---

## Cross-Session Continuity

If a request spans multiple sessions:

1. The REQ file is the authoritative record of where the request stands.
2. At the start of a new session, Claude reads the REQ file and GRILLING / PRD / DEVPLAN files to restore context.
3. The user does not need to re-explain the request.
4. Claude picks up from the current status field in the REQ file.

---

## Status Transitions

Every status transition updates the REQ file and optionally the REQUEST_REGISTER.md.

```
New
  → Reference Pending (if critical material is missing)
  → Under Classification
  → Under Grilling
  → Under Evaluation (if complex)
  → Under Impact Assessment (if high risk)
  → Approved for PRD
  → PRD Created
  → Stories Created
  → Development Planned
  → Build Prompt Created
  → In Development
  → Dev Blocked (if blocked)
  → Ready for QA
  → QA Failed (return to development)
  → QA Passed
  → Ready for UAT
  → UAT Failed (return to development)
  → UAT Passed
  → Ready for Release
  → Released
  ← (Terminal: Parked / Rejected / Cancelled)
```

---

*Last updated: 2026-06-21*
