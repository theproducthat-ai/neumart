# Product OS V2 Architecture

**Version**: 2.0  
**Status**: Active  
**Owner**: Product Lead

---

## What This Document Is

This document defines the canonical structure, layer responsibilities, and governance model for the Neumart Product Operating System V2. Every team member, AI agent, and stakeholder should read this before creating, updating, or referencing product artifacts.

---

## The Five-Layer Model

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1 — SOURCE OF TRUTH                                  │
│  product/objects/                                           │
│  All product work lives here as structured objects.        │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2 — RULES, POLICIES, INTELLIGENCE                    │
│  product/os/                                                │
│  Templates, policies, ontology, AI interfaces.             │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3 — STAKEHOLDER VIEWS                                │
│  product/views/                                             │
│  Curated, role-specific summaries of object state.         │
├─────────────────────────────────────────────────────────────┤
│  LAYER 4 — INDEXES AND RELATIONSHIPS                        │
│  product/indexes/   product/graph/                          │
│  indexes/ = operational lookup tables and status lists.    │
│  graph/   = relationship maps and dependency networks.     │
├─────────────────────────────────────────────────────────────┤
│  LAYER 5 — LEGACY / REFERENCE                               │
│  product/00-xx/  through  product/14-xx/                    │
│  Historical records. Do not create new work here.          │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer 1 — Source of Truth: `product/objects/`

Every unit of product work is stored as a **product object** — a structured Markdown file with YAML frontmatter.

**Object types live in named subfolders:**
```
product/objects/
  requests/          features/          subfeatures/
  epics/             user-stories/      tasks/
  prds/              bugs/              incidents/
  risks/             decisions/         releases/
  qa-tests/          uat-runs/          stakeholders/
  teams/             approvals/         business-cases/
  client-commitments/ escalations/     feedback/
  support-tickets/   ops-issues/        sales-requests/
  client-requests/   internal-ideas/    designs/
  prototypes/        design-decisions/  ux-research/
  journeys/          technical-designs/ api-contracts/
  data-migrations/   non-functional-requirements/
  environments/      feature-flags/     pull-requests/
  builds/            support-playbooks/ sops/
  training-materials/ known-issues/     rcas/
  hypercare-plans/   metrics/           analytics-events/
  dashboards/        experiments/       measurement-plans/
  okrs/              kpis/              business-goals/
  initiatives/       priority-scores/   capacity-plans/
```

**Rules:**
- Every object has a unique ID following the convention in `product/os/policies/ID_RULES.md`
- Every object has required frontmatter fields
- Objects link to parent/child/related objects by ID
- AI agents always create new work here, never in numbered folders

---

## Layer 2 — Rules, Policies, Intelligence: `product/os/`

```
product/os/
  templates/         ← Standard object templates (YAML + structure)
  policies/          ← Classification, lane, approval, intake rules
  ontology/          ← Domain model, object types, lifecycle models
  intelligence/      ← AI classification, impact analysis, next-action logic
  interfaces/        ← AI slash-command implementations
```

**Rules:**
- Templates are the canonical starting point for new objects
- Policies define when, what, and by whom — not how to build
- Intelligence files tell AI how to reason about product work
- Interfaces define how slash commands behave

---

## Layer 3 — Stakeholder Views: `product/views/`

Views are **curated summaries** that aggregate state from `product/objects/` for specific audiences. They are **never the source of truth** — they reference objects.

```
product/views/
  ACTIVE_WORK_VIEW.md          ROADMAP_VIEW.md
  EXECUTIVE_VIEW.md            PORTFOLIO_VIEW.md
  LEADERSHIP_VIEW.md           BUSINESS_STAKEHOLDER_VIEW.md
  FEATURE_VIEW.md              MODULE_VIEW.md
  QA_VIEW.md                   RELEASE_VIEW.md
  REQUEST_VIEW.md              INCOMPLETE_WORK_VIEW.md
```

---

## Layer 4 — Indexes and Relationships: `product/indexes/` + `product/graph/`

| Folder | Purpose | Write Here When… |
|---|---|---|
| `product/indexes/` | Operational lookup tables, object registries, status lists, traceability matrices | You need a flat, queryable list of objects (e.g. all bugs, all features by module, request-to-release trace) |
| `product/graph/` | Relationship maps, dependency networks, knowledge maps, system relationship views | You need to show *how things connect* — module dependency trees, entity relationships, impact maps, knowledge graphs |

**Distinction rules:**
- `indexes/` answers: *"Where is everything?"* — object ID → file path, status, owner
- `graph/` answers: *"How does everything relate?"* — edges, dependency chains, relationship networks
- Do not move or merge them. Both serve a purpose.

**V1 graph files marked superseded:** Three files in `graph/` have V2 equivalents in `indexes/`. They are read-only and marked superseded in their headers. Use the V2 index files for all new work:

| graph/ file (V1 — read-only) | Superseded by |
|---|---|
| `graph/OBJECT_INDEX.md` | `indexes/MASTER_OBJECT_INDEX.md` |
| `graph/TRACEABILITY_MAP.md` | `indexes/TRACEABILITY_MATRIX.md` |
| `graph/DEPENDENCY_MAP.md` | `indexes/DEPENDENCY_INDEX.md` + `indexes/MODULE_DEPENDENCY_MAP.md` |

---

## Layer 5 — Legacy / Reference: Numbered Folders

```
product/00-product-foundation/
product/01-product-architecture/
...
product/14-post-release/
product/99-operating-system/
```

These folders contain historical records, reference templates, and the original V1 operating model. **Do not create new product work in these folders.** They remain for:
- Historical context and audit trail
- Reference material during transitions
- Templates that have not yet been migrated to `product/os/templates/`

---

## Cross-Functional Domain Layers

In addition to the five core layers, the following domain-specific folders extend the OS:

| Folder | Purpose |
|---|---|
| `product/portfolio/` | OKR trees, investment themes, prioritization models, roadmap governance |
| `product/design/` | Design operating model, Figma handoff rules, accessibility, screen states |
| `product/engineering/` | Engineering *process*: DoR, DoD, branching, code review, release rules, API contract rules, tech design rules, feature flag rules, data migration rules |
| `product/technical-framework/` | Stack *guardrails*: coding standards, security, performance, auth, database, frontend, backend, cost, testing, deployment, observability, Convex/Clerk/API guardrails, tech stack definition, AI coding rules |
| `product/support-ops/` | Support handover, incident severity, escalation, hypercare, RCA rules |
| `product/analytics/` | Metric dictionary, event taxonomy, feature measurement, experiment log |
| `product/team-operating-model/` | Cadences, approvals, stakeholder register, RACI, sprint planning |
| `product/examples/` | Annotated worked examples for each work type lane |

**engineering/ vs technical-framework/ distinction:**
- `product/engineering/` = *how we work*. Process rules that govern engineering delivery: when is a story ready (DoR), when is it done (DoD), how do we branch, how do we review code, how do we release, how do we write API contracts.
- `product/technical-framework/` = *what guardrails apply to the code we write*. Standards and constraints on the stack itself: coding standards, security rules, Convex guardrails, Clerk patterns, auth requirements, database rules, performance budgets, cost controls, testing requirements, deployment gates.

If you are writing a *process* that engineers follow → `product/engineering/`.
If you are writing a *technical constraint* that code must satisfy → `product/technical-framework/`.

---

## Decision Tree: Where Does New Work Go?

```
Something needs to be created/tracked →
  Is it a product artifact (request, feature, bug, story, etc.)? → product/objects/[type]/
  Is it a policy, rule, or process definition?                  → product/os/policies/
  Is it a template for creating objects?                        → product/os/templates/
  Is it a stakeholder-facing summary?                           → product/views/
  Is it an index or relationship map?                           → product/indexes/ or product/graph/
  Is it a historical reference?                                 → stays in numbered folders
  Is it portfolio-level strategy?                               → product/portfolio/
  Is it design governance?                                      → product/design/
  Is it an engineering process, DoR/DoD, branching, or code review rule? → product/engineering/
  Is it a stack guardrail, coding standard, or security/performance rule? → product/technical-framework/
  Is it support/ops process?                                    → product/support-ops/
  Is it analytics/measurement?                                  → product/analytics/
  Is it team rhythm/cadence?                                    → product/team-operating-model/
```

---

## Object ID Convention Summary

| Object Type | Prefix | Example |
|---|---|---|
| Request | REQ- | REQ-0009 |
| Feature | FEAT- | FEAT-COM-PLP-001 |
| Epic | EPIC- | EPIC-0001 |
| User Story | US- | US-0024 |
| Task | TASK- | TASK-0001 |
| PRD | PRD- | PRD-0005 |
| Bug | BUG- | BUG-0001 |
| Incident | INC- | INC-0001 |
| Risk | RISK- | RISK-0001 |
| Decision | DEC- | DEC-0001 |
| Release | REL- | REL-0002 |
| QA Test | QA- | QA-0003 |
| UAT Run | UAT- | UAT-0003 |
| OKR | OKR- | OKR-FY26-Q1 |
| KPI | KPI- | KPI-0001 |
| Metric | MET- | MET-0001 |
| Experiment | EXP- | EXP-0001 |
| Incident RCA | RCA- | RCA-0001 |

Full ID rules: `product/os/policies/ID_RULES.md`

---

## Related Documents

- [Migration Guide V1 → V2](./MIGRATION_GUIDE_V1_TO_V2.md)
- [Product OS Policies](./policies/)
- [Object Templates](./templates/)
- [Operating Manual](../OPERATING_MANUAL.md)
- [Product README](../README.md)
