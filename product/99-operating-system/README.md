# Nuemart Product OS — Operating System

The Product OS is the governance layer that controls how all product requests flow from idea to release. It defines the rules, templates, and processes that ensure Nuemart is built in a controlled, traceable, and high-quality way.

---

## How to Use the Product OS

The Product OS is activated by typing:

```
/product-request
```

Claude handles everything from that point. The user only needs to describe what they want in natural language. Claude classifies the request, runs grilling, writes the PRD, plans development, and guides the request through every stage.

---

## Directory Structure

```
product/
├── 00-product-foundation/      ← Vision, scope, master registry
├── 01-product-architecture/    ← Hierarchy, screen registry, routes, data map
├── 02-roadmap/                 ← Roadmap, evaluations, decisions
├── 03-module-catalogue/        ← Module definitions and sub-module specs
├── 04-request-management/      ← Request templates and status rules
├── 05-discovery-and-grilling/  ← Grilling questions and grilling session records
├── 06-assessment-and-impact/   ← Impact assessments
├── 07-prd/                     ← Product requirement documents
├── 08-user-stories/            ← User stories
├── 09-development-planning/    ← Dev plans and AI coding prompts
├── 11-qa-testing/              ← QA test plans, bug register, regression checklist
├── 12-uat/                     ← UAT plans, feedback, sign-offs
├── 13-release-management/      ← Release plans, release notes, rollback plans
├── 14-post-release/            ← Post-release reviews, incident log, backlog
└── 99-operating-system/        ← This directory: governance, rules, commands, skills
    ├── README.md               ← This file
    ├── governance/             ← Classification, ID rules, screen ID rules, gates
    └── slash-commands/         ← /product-request command definition
    └── skills/                 ← Claude skills (intake, grilling, evaluation, impact, PRD, stories, dev plan, coding prompt, QA/UAT, release)
```

---

## Key Rules (Summary)

1. **The user never specifies classification, module, or ID.** Claude does this.
2. **Every request gets a REQ ID.** No exceptions.
3. **No feature is built without a PRD.** No exceptions.
4. **No feature is released without QA.** No exceptions.
5. **Schema changes require impact assessment.** Always.
6. **Payment and inventory changes require impact assessment.** Always.
7. **UAT sign-off is required before release.** No exceptions (except hotfixes with product owner verbal approval).

---

## Lifecycle (Summary)

```
/product-request → Classification → Grilling → Evaluation (if complex) →
Impact Assessment (if high risk) → PRD → User Stories → Dev Plan →
AI Coding Prompt → Development → QA → UAT → Release → Post-release
```

Full details: see `governance/SESSION_FLOW_RULES.md` and `slash-commands/product-request.md`.

---

## Governance Files

| File | Purpose |
|---|---|
| `governance/ID_GENERATION_RULES.md` | How to generate IDs for every artifact type |
| `governance/SCREEN_ID_RULES.md` | How to assign Screen IDs |
| `governance/CLASSIFICATION_RULES.md` | How Claude classifies requests |
| `governance/REQUEST_CLASSIFICATION_MATRIX.md` | 16 classification types with examples |
| `governance/REQUEST_SCENARIO_PLAYBOOK.md` | 20 scenarios with expected Claude behaviour |
| `governance/APPROVAL_GATES.md` | Which approval gates exist and who approves |
| `governance/REFERENCE_MATERIAL_RULES.md` | How reference material is handled |
| `governance/SESSION_FLOW_RULES.md` | Step-by-step lifecycle rules |
| `governance/INCOMPLETE_REQUEST_RULES.md` | How to handle vague or incomplete requests |

---

## Skills (Workflow Definitions)

| File | Skill |
|---|---|
| `skills/01-request-intake-skill.md` | Request Intake |
| `skills/02-requirement-grilling-skill.md` | Requirement Grilling |
| `skills/03-module-mapping-skill.md` | Module Mapping and Evaluation |
| `skills/04-impact-assessment-skill.md` | Impact Assessment |
| `skills/05-prd-writing-skill.md` | PRD Writing |
| `skills/06-user-story-skill.md` | User Story Writing |
| `skills/07-development-plan-skill.md` | Development Plan |
| `skills/08-ai-coding-prompt-skill.md` | AI Coding Prompt |
| `skills/09-qa-uat-skill.md` | QA and UAT |
| `skills/10-release-management-skill.md` | Release Management |

---

## Slash Commands

| Command | Purpose |
|---|---|
| `/product-request` | Start a new request intake |
| `/product-resume` | Resume an existing request by ID or title |
| `/product-grill` | Run deep grilling on an intake-approved request |
| `/product-evaluate` | Run module/roadmap evaluation |
| `/product-impact` | Run impact assessment |
| `/product-prd` | Write PRD |
| `/product-stories` | Write user stories from approved PRD |
| `/product-devplan` | Write development plan |
| `/product-build-prompt` | Create AI coding prompt |
| `/product-qa` | Create QA and UAT plans |
| `/product-release` | Create release plan and release notes |

---

## Claude Code Skills (.claude/skills/)

Claude Code SKILL.md files are located in `.claude/skills/` at the repository root. Each skill maps to a slash command and contains the exact instructions Claude follows when the command is invoked.

| Skill folder | Command |
|---|---|
| `.claude/skills/product-request/` | `/product-request` |
| `.claude/skills/product-resume/` | `/product-resume` |
| `.claude/skills/product-grill/` | `/product-grill` |
| `.claude/skills/product-evaluate/` | `/product-evaluate` |
| `.claude/skills/product-impact/` | `/product-impact` |
| `.claude/skills/product-prd/` | `/product-prd` |
| `.claude/skills/product-stories/` | `/product-stories` |
| `.claude/skills/product-devplan/` | `/product-devplan` |
| `.claude/skills/product-build-prompt/` | `/product-build-prompt` |
| `.claude/skills/product-qa/` | `/product-qa` |
| `.claude/skills/product-release/` | `/product-release` |

---

## Claude Code Command Activation

### How the three layers work together

| Layer | Location | Purpose |
|---|---|---|
| Documentation | `product/99-operating-system/slash-commands/` | Full specification for each command — what it does, all steps, all registers updated |
| Skill definitions | `product/99-operating-system/skills/` | Detailed workflow rules for each stage |
| Active commands | `.claude/commands/` | The files Claude Code reads to activate slash commands in the "/" menu |

The `.claude/commands/*.md` files are the activation layer. Each one is a concise wrapper that instructs Claude to load the full documentation from `product/99-operating-system/` and execute the workflow.

### Verifying commands are active

1. Open Claude Code in this repository
2. Type `/` in the message input
3. Search for `product`
4. You should see all 11 Product OS commands listed

If commands do not appear:
- Restart Claude Code completely (close and reopen)
- Or open a new Claude Code session in this repository
- Commands in `.claude/commands/` are picked up automatically on session start — no configuration required

### Command file locations

| Command | File |
|---|---|
| `/product-request` | `.claude/commands/product-request.md` |
| `/product-resume` | `.claude/commands/product-resume.md` |
| `/product-grill` | `.claude/commands/product-grill.md` |
| `/product-evaluate` | `.claude/commands/product-evaluate.md` |
| `/product-impact` | `.claude/commands/product-impact.md` |
| `/product-prd` | `.claude/commands/product-prd.md` |
| `/product-stories` | `.claude/commands/product-stories.md` |
| `/product-devplan` | `.claude/commands/product-devplan.md` |
| `/product-build-prompt` | `.claude/commands/product-build-prompt.md` |
| `/product-qa` | `.claude/commands/product-qa.md` |
| `/product-release` | `.claude/commands/product-release.md` |

### Using $ARGUMENTS

Each command file uses `$ARGUMENTS` to capture whatever the user types after the command name. For example:

- `/product-request Build a loyalty points programme` → Claude receives the full description
- `/product-resume REQ-0002` → Claude receives `REQ-0002` as the argument
- `/product-grill` → Claude receives an empty argument and reads ACTIVE_REQUESTS.md to find the current request

---

*Last updated: 2026-06-21*
