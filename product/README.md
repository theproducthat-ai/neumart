# Neumart Product OS

The Neumart Product Operating System (Product OS) is the single source of truth for how product work is conceived, planned, built, tested, released, and measured. It is designed to be used by product, engineering, design, QA, support, operations, business stakeholders, and AI agents.

**Version**: 2.0  
**Start here**: [OPERATING_MANUAL.md](./OPERATING_MANUAL.md)  
**Architecture**: [os/PRODUCT_OS_V2_ARCHITECTURE.md](./os/PRODUCT_OS_V2_ARCHITECTURE.md)

---

## How to Navigate by Role

### Product Manager
1. New request → create object in `objects/requests/` using `os/templates/REQUEST_OBJECT_TEMPLATE.md`
2. Classify work type → check `os/policies/WORK_TYPE_LANES.md`
3. Write PRD → create object in `objects/prds/` using `os/templates/PRD_OBJECT_TEMPLATE.md`
4. Prioritize → use `portfolio/PRIORITIZATION_MODEL.md`
5. Track progress → read `views/ACTIVE_WORK_VIEW.md`
6. Check roadmap → read `views/ROADMAP_VIEW.md` or `portfolio/`

### Engineering Lead
1. Check definition of ready → `engineering/DEFINITION_OF_READY.md`
2. Review tech design rules → `engineering/TECH_DESIGN_RULES.md`
3. Create tech design object → `objects/technical-designs/`
4. Review feature flags → `engineering/FEATURE_FLAG_RULES.md`
5. Check branching rules → `engineering/BRANCHING_AND_RELEASE_RULES.md`
6. Definition of done → `engineering/DEFINITION_OF_DONE.md`

### Designer
1. Design operating model → `design/DESIGN_OPERATING_MODEL.md`
2. When Figma is required → `design/FIGMA_HANDOFF_RULES.md`
3. Required screen states → `design/SCREEN_STATE_RULES.md`
4. Accessibility checklist → `design/ACCESSIBILITY_CHECKLIST.md`
5. UX review process → `design/UX_REVIEW_CHECKLIST.md`
6. Create design object → `objects/designs/`

### QA Lead
1. QA model and rules → `os/policies/`
2. Create QA test object → `objects/qa-tests/`
3. Run UAT → `objects/uat-runs/`
4. View QA status → `views/QA_VIEW.md`
5. Bug reporting → `objects/bugs/`

### Support Lead
1. Support operating model → `support-ops/SUPPORT_OPERATING_MODEL.md`
2. Incident severity → `support-ops/INCIDENT_SEVERITY_MATRIX.md`
3. Escalation matrix → `support-ops/ESCALATION_MATRIX.md`
4. Raise a support ticket → `objects/support-tickets/`
5. File an incident → `objects/incidents/`
6. Track known issues → `objects/known-issues/`
7. Support handover checklist → `support-ops/SUPPORT_HANDOVER_RULES.md`

### Operations Lead
1. Operations readiness → `support-ops/OPERATIONS_READINESS_CHECKLIST.md`
2. SOP library → `objects/sops/`
3. Training materials → `objects/training-materials/`
4. Ops issues → `objects/ops-issues/`
5. Hypercare rules → `support-ops/HYPERCARE_RULES.md`

### Business Stakeholder / Leadership
1. Leadership view → `views/LEADERSHIP_VIEW.md`
2. Business stakeholder view → `views/BUSINESS_STAKEHOLDER_VIEW.md`
3. Portfolio and OKR view → `views/PORTFOLIO_VIEW.md`
4. Submit a business request → `objects/business-cases/` or `objects/sales-requests/`
5. Client commitments → `objects/client-commitments/`

### Analytics / Data
1. Metric dictionary → `analytics/METRIC_DICTIONARY.md`
2. Event taxonomy → `analytics/EVENT_TAXONOMY.md`
3. Dashboard register → `analytics/DASHBOARD_REGISTER.md`
4. Experiment log → `analytics/EXPERIMENT_LOG.md`
5. Create metric object → `objects/metrics/`
6. Create experiment → `objects/experiments/`

### Finance / Legal
1. Approval authority → `team-operating-model/APPROVAL_AUTHORITY_MATRIX.md`
2. Business cases → `objects/business-cases/`
3. Compliance requests → use work lane "Compliance/Security" in `os/policies/WORK_TYPE_LANES.md`

---

## Quick Start: Submit a New Request

1. Use `/product-request` or start from `os/templates/REQUEST_OBJECT_TEMPLATE.md`
2. Fill in the required frontmatter fields
3. Save to `objects/requests/REQ-XXXX.md`
4. The system (or AI) will classify the work type and recommend next artifacts

---

## Directory Structure at a Glance

```
product/
  objects/              ← ALL PRODUCT WORK (source of truth)
  os/                   ← rules, templates, intelligence, policies
  views/                ← stakeholder-friendly summaries
  indexes/              ← object indexes and traceability
  graph/                ← relationship and dependency maps
  portfolio/            ← OKRs, investment themes, prioritization
  design/               ← design governance and standards
  engineering/          ← engineering standards and readiness
  support-ops/          ← support, incidents, escalation, ops
  analytics/            ← metrics, events, experiments
  team-operating-model/ ← cadences, RACI, approvals
  examples/             ← worked examples by work type
  OPERATING_MANUAL.md   ← comprehensive how-to guide

  ── LEGACY (reference only) ──
  00-product-foundation/ through 14-post-release/
  99-operating-system/
  archive/
```

---

## Using AI Slash Commands

| Command | Purpose |
|---|---|
| `/product-request` | Submit and classify a new product request |
| `/product-grill` | Run discovery questions on a request |
| `/product-evaluate` | Assess impact, risk, and prioritization |
| `/product-prd` | Draft a PRD from an approved request |
| `/product-stories` | Generate user stories from a PRD |
| `/product-devplan` | Create a development plan |
| `/product-build-prompt` | Generate AI coding prompt |
| `/product-qa` | Create QA test plan |
| `/product-release` | Prepare release artifacts |
| `/product-resume` | Resume work on an in-progress object |

---

## Principles

1. **Objects first** — everything is a typed, linked object with an ID
2. **Right artifact for the job** — small fixes need minimal docs; strategic initiatives need full coverage
3. **Cross-functional by default** — every object captures product, engineering, design, QA, support, ops, and analytics impact
4. **AI-native** — the OS is designed to work with AI agents, not just humans
5. **Traceable** — every delivery can be traced back to a business goal
