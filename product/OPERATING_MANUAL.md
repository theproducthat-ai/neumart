# Neumart Product OS — Operating Manual

**Version**: 2.0  
**Audience**: Product, Engineering, Design, QA, Support, Operations, Business, Leadership  
**Keep this practical. Skip the theory.**

---

## 1. What Is This Product OS?

The Neumart Product OS is an operating system for the product organization. It defines:
- Where product work lives (structured objects with IDs)
- How work is classified and prioritized
- What artifacts are required for each type of work
- Who approves what
- How teams communicate rhythm and status
- How AI agents assist with documentation and planning

It is not a project management tool. It is not a JIRA replacement. It is the documentation layer that gives every request, feature, bug, release, and decision a permanent, traceable home.

---

## 2. Who Uses It?

| Role | Primary Use |
|---|---|
| Product Manager | Requests, PRDs, features, prioritization, roadmap |
| Engineering Lead | Tech designs, DoR/DoD, branching, builds |
| Designer | Design briefs, Figma handoff, UX reviews |
| QA Lead | Test plans, bug reports, UAT signoffs |
| Support Lead | Incidents, escalations, known issues, handovers |
| Operations | SOPs, ops issues, training, hypercare |
| Business Stakeholder | Business cases, client commitments, views |
| Leadership | Portfolio view, OKR tree, roadmap governance |
| Analytics | Metrics, events, experiments, dashboards |
| AI Agents (Claude) | Classification, drafting, linking, indexing |

---

## 3. How Does a New Request Enter?

**Option A — via AI (recommended)**
Use `/product-request` and describe the request in plain English. The AI will:
1. Capture the raw request
2. Identify the source type
3. Classify the work type
4. Choose a work lane
5. Draft a request object

**Option B — manually**
1. Copy `os/templates/REQUEST_OBJECT_TEMPLATE.md`
2. Create `objects/requests/REQ-XXXX.md` (next sequential ID)
3. Fill required fields
4. Tag it with source type, classification, and urgency

**Required fields at intake:**
- `id`, `title`, `status: intake`, `source_type`, `source_owner`, `urgency`, `business_impact`, `created_date`, `owner`

---

## 4. How Does AI Classify the Request?

The AI classification engine (see `os/intelligence/CLASSIFICATION_ENGINE.md`) follows this logic:

1. **Source type** — who/what originated the request (customer, ops, engineering, leadership, etc.)
2. **Work type** — what kind of work is it (new feature, bug fix, enhancement, incident, compliance, etc.)
3. **Lane** — which process lane it follows (Fast Fix, Small Enhancement, Standard Feature, Strategic Initiative, Incident, etc.)
4. **Impact scope** — which modules, screens, components, roles, data entities are affected
5. **Required artifacts** — based on lane, what documentation is mandatory vs optional
6. **Confidence** — the AI reports its classification confidence and asks for confirmation when uncertain

See `os/intelligence/LANE_SELECTION_ENGINE.md` for lane selection logic.

---

## 5. What Is an Object?

An object is a structured Markdown file stored in `product/objects/[type]/`. Every object has:

- A unique ID (e.g., `REQ-0009`, `FEAT-COM-001`, `BUG-0001`)
- A YAML frontmatter block with standard fields
- A body section with details, context, and decisions
- Links to related objects (parent, children, dependencies)

Objects are the atomic unit of the Product OS. Everything is an object.

---

## 6. What Is the Difference Between Key Object Types?

| Object | What It Is | When Created |
|---|---|---|
| **Request** | Raw intake of a need, idea, problem, or ask | At first contact with any input |
| **Feature** | A user-visible capability to be built | When a request is approved for development |
| **PRD** | Detailed specification of a feature | When feature complexity requires it (see Rule 7) |
| **Epic** | A grouping of related stories | When a feature has 6+ stories or cross-team scope |
| **User Story** | Testable unit of value from a user's perspective | During story breakdown |
| **Task** | A technical work item (engineering/design/QA) | During sprint planning |
| **Bug** | A defect in existing behaviour | When QA, production, or user reports a failure |
| **Incident** | A production outage or critical failure | When production is affected |
| **Release** | A deployable unit of changes | When stories are ready for production |
| **Metric** | A measurable indicator of product health or feature success | At feature definition, updated post-release |

---

## 7. When Is a PRD Required?

**Required:**
- Standard Feature or Strategic Initiative work lanes
- Any feature that touches 2+ modules
- Any feature requiring API contract or data schema change
- Any feature with a client commitment
- Any feature with regulatory/compliance implications
- Any feature requiring design/UX approval

**Not required:**
- Fast Fix lane (bug with clear root cause)
- Small Enhancement lane (1-3 story change to existing UI)
- Incident response (use Incident object instead)
- Internal tech debt with no user-visible change

---

## 8. When Is Technical Design Required?

**Required:**
- Any new API endpoint or change to existing API
- Any database schema change or data migration
- Any third-party integration
- Any feature involving payments, authentication, or permissions
- Any feature flagged as high engineering complexity
- Any multi-service or cross-module change

**Recommended but not required:**
- Standard features with moderate complexity
- Features with performance implications

**Not required:**
- UI-only changes with no backend impact
- Copy/text changes
- Fast Fix bugs

---

## 9. When Is UAT Required?

**Required:**
- Any Standard Feature or Strategic Initiative
- Any change to payments, checkout, or order flow
- Any change to role/permission model
- Any client-visible feature
- Client commitment deliveries
- Compliance/regulatory changes

**Not required:**
- Fast Fix bugs with automated test coverage
- Internal admin-only changes with low risk
- Tech debt with no user-visible change

---

## 10. When Is Support Handover Required?

**Required:**
- Any new feature visible to customers
- Any change to existing support-impacting flows (orders, refunds, delivery)
- Any new error message or user-facing failure mode
- Any client commitment delivery
- Any high or critical severity release

**Output:** complete `support-ops/SUPPORT_HANDOVER_RULES.md` checklist + update `objects/known-issues/` if applicable.

---

## 11. How Does Prioritization Work?

Prioritization uses a multi-factor scoring model (see `portfolio/PRIORITIZATION_MODEL.md`):

| Factor | Weight |
|---|---|
| Business value | High |
| Customer value | High |
| Revenue impact | High |
| Strategic alignment (OKR fit) | High |
| Client commitment / deadline | Very High |
| Regulatory / compliance requirement | Very High |
| Risk reduction | Medium |
| Engineering effort (inverse) | Medium |
| Operational impact | Medium |
| Confidence level | Low–Medium |
| Urgency | Situational |

The score is used to sort the backlog and inform roadmap governance decisions. AI can assist with scoring but the Product Lead makes the final call.

---

## 12. How Does Roadmap Governance Work?

1. **OKR tree** defines strategic bets (`portfolio/OKR_TREE.md`)
2. **Investment themes** group related features into themes (`portfolio/INVESTMENT_THEMES.md`)
3. **Prioritization model** scores and ranks features (`portfolio/PRIORITIZATION_MODEL.md`)
4. **Capacity model** maps velocity to what fits (`portfolio/CAPACITY_MODEL.md`)
5. **Roadmap governance** defines who can change the roadmap and when (`portfolio/ROADMAP_GOVERNANCE.md`)
6. **Roadmap view** is the output stakeholders consume (`views/ROADMAP_VIEW.md`)

Roadmap changes require Product Lead + Engineering Lead agreement. Major re-prioritizations require leadership review cadence (see `team-operating-model/ROADMAP_REVIEW.md`).

---

## 13. How Does Release Readiness Work?

A release is ready when:
- [ ] All stories in scope have status: `done`
- [ ] QA has signed off (QA object status: `passed`)
- [ ] UAT has signed off (UAT object status: `approved`) — if required
- [ ] Rollback plan is documented
- [ ] Feature flags are configured (if applicable)
- [ ] Support has been briefed (support_ready: true)
- [ ] Operations has confirmed readiness (ops_ready: true)
- [ ] Release notes are drafted
- [ ] Approvals received per `team-operating-model/APPROVAL_AUTHORITY_MATRIX.md`

See `objects/releases/` template for the full checklist.

---

## 14. How Does Post-Release Measurement Work?

Every major feature should define measurement before release:

1. **Success metric** — the primary indicator (e.g., add-to-cart rate)
2. **Guardrail metric** — the indicator that must not degrade (e.g., checkout completion rate)
3. **Analytics events** — the tracking events that power measurement
4. **Dashboard** — where to see the data live
5. **Measurement window** — how long before we evaluate success
6. **Baseline value** — what the metric was before the feature

Post-release review cadence: `team-operating-model/POST_RELEASE_REVIEW.md`

---

## 15. How Do Stakeholders Consume Views?

| View | Audience | Purpose |
|---|---|---|
| `views/LEADERSHIP_VIEW.md` | CEO, investors, board | Strategic progress, OKR status |
| `views/BUSINESS_STAKEHOLDER_VIEW.md` | Business owners, ops, finance | Feature pipeline, commercial requests |
| `views/PORTFOLIO_VIEW.md` | Product Lead, leadership | Investment allocation, theme balance |
| `views/ROADMAP_VIEW.md` | All stakeholders | What's coming and when |
| `views/ACTIVE_WORK_VIEW.md` | Product + Engineering | What's in flight right now |
| `views/QA_VIEW.md` | QA, engineering | Test status across releases |
| `views/RELEASE_VIEW.md` | Product, engineering, support | Release readiness |
| `views/REQUEST_VIEW.md` | Product, stakeholders | All requests and their status |

Views are updated manually or by AI during cadence reviews. They are **not** the source of truth — they summarize `product/objects/`.

---

## 16. How Should Claude/AI Use This System?

When an AI agent (Claude) receives a product request:

1. Read the request in natural language
2. Check `os/intelligence/CLASSIFICATION_ENGINE.md` for classification rules
3. Select the work lane per `os/intelligence/LANE_SELECTION_ENGINE.md`
4. Determine required artifacts per `os/intelligence/ARTIFACT_REQUIREMENT_ENGINE.md`
5. Analyse impact per `os/intelligence/IMPACT_ANALYSIS_ENGINE.md`
6. Create objects in `product/objects/[type]/` using templates from `product/os/templates/`
7. Determine next action per `os/intelligence/NEXT_ACTION_ENGINE.md`
8. Ask only necessary grilling questions (per `os/interfaces/PRODUCT_GRILL_INTERFACE.md`)
9. Update `product/indexes/MASTER_OBJECT_INDEX.md`
10. Report: what was created, confidence level, next step

**The AI must NOT:**
- Create product work in numbered (V1) folders
- Skip the classification step
- Over-document small requests
- Under-document strategic or client-facing requests
- Invent IDs without following `os/policies/ID_RULES.md`

---

## 17. What Should Never Be Done?

- **Never delete objects** — archive them by updating status and adding `archived: true`
- **Never create work in V1 numbered folders** — they are legacy/read-only
- **Never leave an object without an owner** — every object must have `owner:` set
- **Never skip measurement for major features** — every Standard Feature+ needs a metric
- **Never release without QA signoff** — no exceptions for Standard Feature and above
- **Never create a client commitment without tracking it** in `objects/client-commitments/`
- **Never treat a template as documentation** — always fill in real data
- **Never merge two IDs into one object** — create one object per entity

---

## 18. Recommended Daily and Weekly Workflow

### Daily
- Check `views/ACTIVE_WORK_VIEW.md` for blockers
- Update object statuses as work moves
- Log any new bugs or incidents as objects
- Respond to escalations (check `objects/escalations/`)

### Weekly
- **Product cadence review** → `team-operating-model/WEEKLY_PRODUCT_REVIEW.md`
- Update `views/ACTIVE_WORK_VIEW.md`
- Groom top 5 unclassified requests
- Review any open `objects/risks/` items

### Sprint Planning
- Follow `team-operating-model/SPRINT_PLANNING_RULES.md`
- Confirm DoR for each story
- Assign tasks to individuals
- Update story estimates and sprint target

### Release Week
- Complete release checklist in `objects/releases/`
- Brief support via `support-ops/SUPPORT_HANDOVER_RULES.md`
- Confirm ops readiness
- Prepare release notes

### Post-Release
- Run `team-operating-model/POST_RELEASE_REVIEW.md`
- Update success metrics in `objects/metrics/`
- Log any post-release incidents
- Update `objects/known-issues/` with any discovered issues
- File enhancement requests from post-release feedback

---

## Quick Reference: Artifact Requirements by Lane

| Lane | PRD | Tech Design | Stories | QA | UAT | Support Handover |
|---|---|---|---|---|---|---|
| Fast Fix | ✗ | ✗ | Optional | ✗ | ✗ | ✗ |
| Small Enhancement | ✗ | ✗ | Required | Required | ✗ | Optional |
| Standard Feature | Required | Required | Required | Required | Required | Required |
| Strategic Initiative | Required | Required | Required | Required | Required | Required |
| Incident | ✗ (RCA instead) | ✗ | ✗ | ✗ | ✗ | Required |
| Compliance/Security | Required | Required | Required | Required | Required | Required |
| Tech Debt | Optional | Required | Required | Required | ✗ | Optional |
| Operational Change | Optional | Optional | Optional | Optional | Optional | Required |
| Business/Commercial | Required | Optional | Required | Required | Optional | Required |
| Experiment | Required | Optional | Required | Optional | ✗ | Optional |

Full details: `os/policies/WORK_TYPE_LANES.md`
