# Template Registry

**Version:** 2.0
**Schema version:** 2.0
**Last updated:** 2026-06-24
**Owner:** Product Lead

> Canonical map of every active object folder to its template(s), ID pattern, and status.
> Run `node product/tools/validate-templates.js` to validate all mappings.

---

## How to Use

1. Find the object folder you are working in under `product/objects/`
2. Locate the corresponding template name in the **Template File** column
3. Copy the template, fill in the frontmatter, and save to the source-of-truth folder
4. When creating a new object type, add a row here before creating the object

---

## Primary Workflow Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/requests/` | Request | `REQUEST_OBJECT_TEMPLATE.md` | REQ-NNNN | Product Owner | Required |
| `product/objects/features/` | Feature | `FEATURE_OBJECT_TEMPLATE.md` | FEATURE-{MOD}-{AREA}-{NAME} | Product Owner | Required |
| `product/objects/prds/` | PRD | `PRD_OBJECT_TEMPLATE.md` | PRD-{MOD}-{AREA}-{NAME}-NNN | Product Owner | Required for Lane 3+ |
| `product/objects/epics/` | Epic | `EPIC_OBJECT_TEMPLATE.md` | EPIC-XXXX | Engineering Lead | Required |
| `product/objects/user-stories/` | UserStory | `USER_STORY_OBJECT_TEMPLATE.md` | US-NNNN | Product Owner | Required |
| `product/objects/stories/` | Story (generic) | `STORY_OBJECT_TEMPLATE.md` | STORY-{MOD}-{AREA}-{NAME}-NNN | Engineering Lead | Optional |
| `product/objects/tasks/` | Task | `TASK_OBJECT_TEMPLATE.md` | TASK-XXXX | Engineering Lead | Required |
| `product/objects/bugs/` | Bug | `BUG_OBJECT_TEMPLATE.md` | BUG-{MOD}-{AREA}-NNNN | Engineering Lead | Required |
| `product/objects/releases/` | Release | `RELEASE_OBJECT_TEMPLATE.md` | RELEASE-{MOD}-{AREA}-{NAME}-NNNN | Product Owner | Required |
| `product/objects/qa-runs/` | QARun | `QA_RUN_OBJECT_TEMPLATE.md` | QA-{MOD}-{AREA}-{NAME}-RUN-NNN | QA Lead | Required |
| `product/objects/qa-tests/` | TestCase | `TEST_CASE_OBJECT_TEMPLATE.md` | TC-{MOD}-{AREA}-{NAME}-NNN | QA Lead | Required |
| `product/objects/uat-runs/` | UATRun | `UAT_RUN_OBJECT_TEMPLATE.md` | UAT-{MOD}-{AREA}-{NAME}-RUN-NNN | Product Owner | Required |
| `product/objects/risks/` | Risk | `RISK_OBJECT_TEMPLATE.md` | RISK-{MOD}-{SLUG}-NNN | Product Owner | Required if risk identified |
| `product/objects/decisions/` | Decision | `DECISION_OBJECT_TEMPLATE.md` | DECISION-{MOD}-{SLUG}-NNN | Product Owner | Required for key decisions |

---

## Planning and Roadmap Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/backlog-items/` | BacklogItem | `BACKLOG_ITEM_TEMPLATE.md` | BLI-NNN | Product Owner | Optional |
| `product/objects/roadmap-items/` | RoadmapItem | `ROADMAP_ITEM_TEMPLATE.md` | RMI-NNN | Product Owner | Optional |
| `product/objects/roadmap-options/` | RoadmapOption | `ROADMAP_OPTION_TEMPLATE.md` | RO-NNN | Product Owner | Optional |
| `product/objects/roadmap-decisions/` | RoadmapDecision | `ROADMAP_DECISION_TEMPLATE.md` | RD-NNN | Product Owner | Optional |
| `product/objects/initiatives/` | Initiative | `INITIATIVE_OBJECT_TEMPLATE.md` | INIT-XXXX | Product Owner | Required for Lane 4 |
| `product/objects/epics/` | Epic | `EPIC_OBJECT_TEMPLATE.md` | EPIC-XXXX | Engineering Lead | Required |
| `product/objects/capacity-plans/` | CapacityPlan | `CAPACITY_PLAN_OBJECT_TEMPLATE.md` | CAP-PLAN-NNN | Engineering Lead | Required for Lane 4 |
| `product/objects/business-goals/` | BusinessGoal | `BUSINESS_GOAL_OBJECT_TEMPLATE.md` | BG-NNN | CEO / Product Lead | Required for Lane 4 |
| `product/objects/business-cases/` | BusinessCase | `BUSINESS_CASE_OBJECT_TEMPLATE.md` | BC-NNN | Product Lead | Required for Lane 4 |
| `product/objects/okrs/` | OKR | `OKR_OBJECT_TEMPLATE.md` | OKR-YYYY-QN-NNN | Product Lead | Optional |

---

## Architecture and Engineering Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/modules/` | Module | `MODULE_OBJECT_TEMPLATE.md` | MOD-{CODE} | Engineering Lead | Required |
| `product/objects/module-areas/` | ModuleArea | `MODULE_AREA_OBJECT_TEMPLATE.md` | MA-{MOD}-{CODE} | Engineering Lead | Required |
| `product/objects/submodules/` | Submodule | `SUBMODULE_OBJECT_TEMPLATE.md` | SM-{MOD}-{CODE} | Engineering Lead | Optional |
| `product/objects/capabilities/` | Capability | `CAPABILITY_OBJECT_TEMPLATE.md` | CAP-XXXX | Engineering Lead | Optional |
| `product/objects/components/` | Component | `COMPONENT_OBJECT_TEMPLATE.md` | CMP-{MOD}-XXXX | Engineering Lead | Optional |
| `product/objects/ui-components/` | UIComponent | `UI_COMPONENT_OBJECT_TEMPLATE.md` | UIC-{MOD}-XXXX | Engineering Lead | Optional |
| `product/objects/technical-designs/` | TechDesign | `TECH_DESIGN_OBJECT_TEMPLATE.md` | TECH-{MOD}-{SLUG}-NNN | Engineering Lead | Required for schema/API changes |
| `product/objects/api-contracts/` | APIContract | `API_CONTRACT_OBJECT_TEMPLATE.md` | APIC-{MOD}-{SLUG}-NNN | Engineering Lead | Required for API changes |
| `product/objects/apis/` | API | `API_OBJECT_TEMPLATE.md` | API-{MOD}-{SLUG}-NNN | Engineering Lead | Optional |
| `product/objects/data-entities/` | DataEntity | `DATA_ENTITY_OBJECT_TEMPLATE.md` | DE-{MOD}-{SLUG}-NNN | Engineering Lead | Optional |
| `product/objects/data-migrations/` | DataMigration | `DATA_MIGRATION_OBJECT_TEMPLATE.md` | DM-{MOD}-{SLUG}-NNN | Engineering Lead | Required for schema migrations |
| `product/objects/non-functional-requirements/` | NFR | `NFR_OBJECT_TEMPLATE.md` | NFR-{MOD}-XXXX | Engineering Lead | Optional |
| `product/objects/dependencies/` | Dependency | `DEPENDENCY_OBJECT_TEMPLATE.md` | DEP-{MOD}-XXXX | Engineering Lead | Optional |
| `product/objects/configurations/` | Configuration | `CONFIGURATION_OBJECT_TEMPLATE.md` | CONFIG-{MOD}-{SLUG}-NNN | Engineering Lead | Optional |
| `product/objects/environments/` | Environment | `ENVIRONMENT_OBJECT_TEMPLATE.md` | ENV-{NAME} | Engineering Lead | Optional |
| `product/objects/feature-flags/` | FeatureFlag | `FEATURE_FLAG_OBJECT_TEMPLATE.md` | FF-{MOD}-{SLUG}-NNN | Engineering Lead | Required when flag is used |
| `product/objects/requirements/` | Requirement | `REQUIREMENT_OBJECT_TEMPLATE.md` | REQ-{MOD}-XXXX | Product Owner | Optional |
| `product/objects/subfeatures/` | Subfeature | `SUBFEATURE_OBJECT_TEMPLATE.md` | SUBFEATURE-{MOD}-{AREA}-{NAME} | Product Owner | Optional |

---

## Design and UX Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/designs/` | Design | `DESIGN_OBJECT_TEMPLATE.md` | DESIGN-{MOD}-{AREA}-{NAME}-NNN | Designer | Required for Lane 3+ |
| `product/objects/design-decisions/` | DesignDecision | `DESIGN_DECISION_OBJECT_TEMPLATE.md` | DD-{MOD}-{SLUG}-NNN | Designer | Optional |
| `product/objects/screens/` | Screen | `SCREEN_OBJECT_TEMPLATE.md` | SCR-{USR\|CUS\|ADM}-NNNN | Designer | Required for new screens |
| `product/objects/routes/` | Route | `ROUTE_OBJECT_TEMPLATE.md` | ROUTE-{APP}-{SLUG} | Engineering Lead | Optional |
| `product/objects/wireframes/` | Wireframe | `WIREFRAME_REFERENCE_TEMPLATE.md` | WF-{MOD}-{SLUG}-NNN | Designer | Optional |
| `product/objects/prototypes/` | Prototype | `PROTOTYPE_OBJECT_TEMPLATE.md` | PROTO-{MOD}-{SLUG}-NNN | Designer | Optional |
| `product/objects/figma-links/` | FigmaLink | `FIGMA_LINK_TEMPLATE.md` | FIGMA-{MOD}-{SLUG}-NNN | Designer | Optional |
| `product/objects/flow-diagrams/` | FlowDiagram | `FLOW_DIAGRAM_REFERENCE_TEMPLATE.md` | FD-{MOD}-{SLUG}-NNN | Designer | Optional |
| `product/objects/journeys/` | Journey | `JOURNEY_OBJECT_TEMPLATE.md` | JRN-{MOD}-{SLUG} | Designer | Optional |

---

## Discovery and Research Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/discovery/` | DiscoverySession | `DISCOVERY_SESSION_OBJECT_TEMPLATE.md` | DS-{MOD}-NNNN | Product Owner | Optional |
| `product/objects/discovery-notes/` | DiscoveryNote | `DISCOVERY_NOTE_TEMPLATE.md` | DN-{MOD}-NNNN | Product Owner | Optional |
| `product/objects/discovery-evidence/` | DiscoveryEvidence | `DISCOVERY_EVIDENCE_TEMPLATE.md` | DE-EV-{MOD}-NNNN | Product Owner | Optional |
| `product/objects/research-notes/` | ResearchNote | `RESEARCH_NOTE_TEMPLATE.md` | RN-{MOD}-NNNN | Product Owner | Optional |
| `product/objects/feedback/` | Feedback | `FEEDBACK_OBJECT_TEMPLATE.md` | FB-NNNN | Product Owner | Optional |
| `product/objects/assumptions/` | Assumption | `ASSUMPTION_OBJECT_TEMPLATE.md` | ASSM-{MOD}-NNNN | Product Owner | Optional |
| `product/objects/experiments/` | Experiment | `EXPERIMENT_OBJECT_TEMPLATE.md` | EXP-{MOD}-{SLUG}-NNN | Product Owner | Required for A/B tests |

---

## Measurement and Analytics Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/kpis/` | KPI | `KPI_OBJECT_TEMPLATE.md` | KPI-{MOD}-{SLUG} | Product Owner | Required for Lane 3+ |
| `product/objects/metrics/` | Metric | `METRIC_OBJECT_TEMPLATE.md` | MET-{MOD}-{SLUG} | Product Owner | Optional |
| `product/objects/measurement-plans/` | MeasurementPlan | `MEASUREMENT_PLAN_TEMPLATE.md` | MP-{MOD}-{SLUG}-NNN | Product Owner | Required for Lane 3+ |
| `product/objects/analytics-events/` | AnalyticsEvent | `ANALYTICS_EVENT_TEMPLATE.md` | AE-{MOD}-{SLUG} | Engineering Lead | Required when tracked |
| `product/objects/dashboards/` | Dashboard | `DASHBOARD_OBJECT_TEMPLATE.md` | DASH-{MOD}-{SLUG} | Product Owner | Optional |
| `product/objects/priority-scores/` | PriorityScore | `PRIORITY_SCORE_OBJECT_TEMPLATE.md` | PS-{MOD}-NNNN | Product Owner | Optional |

---

## Operational Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/incidents/` | Incident | `INCIDENT_OBJECT_TEMPLATE.md` | INC-NNNN | Engineering Lead | Required for incidents |
| `product/objects/rcas/` | RCA | `RCA_TEMPLATE.md` | RCA-NNNN | Engineering Lead | Required post-incident |
| `product/objects/known-issues/` | KnownIssue | `KNOWN_ISSUE_TEMPLATE.md` | KI-{MOD}-NNNN | Engineering Lead | Optional |
| `product/objects/escalations/` | Escalation | `ESCALATION_OBJECT_TEMPLATE.md` | ESC-NNNN | Product Owner | Required for escalations |
| `product/objects/change-notes/` | ChangeNote | `CHANGE_NOTE_TEMPLATE.md` | CN-{MOD}-{AREA}-NNN | Product Owner | Optional |
| `product/objects/scope-changes/` | ScopeChange | `SCOPE_CHANGE_TEMPLATE.md` | SC-{MOD}-{SLUG}-NNN | Product Owner | Required for scope changes |
| `product/objects/impact-checks/` | ImpactCheck | `IMPACT_CHECK_TEMPLATE.md` | IC-{MOD}-{SLUG}-NNN | Product Owner | Required for breaking changes |
| `product/objects/builds/` | Build | `BUILD_OBJECT_TEMPLATE.md` | BUILD-{MOD}-{SLUG}-NNN | Engineering Lead | Optional |
| `product/objects/ops-issues/` | OpsIssue | `OPS_ISSUE_OBJECT_TEMPLATE.md` | OPS-{MOD}-NNNN | Engineering Lead | Optional |
| `product/objects/hypercare-plans/` | HypercarePlan | `HYPERCARE_PLAN_TEMPLATE.md` | HC-{MOD}-{SLUG}-NNN | Product Owner | Required for Lane 4 |
| `product/objects/enhancements/` | Enhancement | `ENHANCEMENT_OBJECT_TEMPLATE.md` | ENH-{MOD}-{AREA}-NNN | Product Owner | Required for tracked enhancements |

---

## Governance and Process Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/approvals/` | Approval | `APPROVAL_OBJECT_TEMPLATE.md` | APR-{MOD}-{SLUG}-NNN | Product Owner | Required for approval gates |
| `product/objects/acceptance-criteria/` | AcceptanceCriteria | `ACCEPTANCE_CRITERIA_OBJECT_TEMPLATE.md` | AC-{MOD}-{AREA}-NNN | Product Owner | Optional |
| `product/objects/sops/` | SOP | `SOP_TEMPLATE.md` | SOP-{AREA}-NNN | Operations Lead | Required for ops processes |
| `product/objects/training-materials/` | TrainingPlan | `TRAINING_PLAN_TEMPLATE.md` | TP-NNN | Operations Lead | Optional |
| `product/objects/support-playbooks/` | SupportPlaybook | `SUPPORT_PLAYBOOK_TEMPLATE.md` | SP-{MOD}-{SLUG}-NNN | Support Lead | Required for support-facing features |
| `product/objects/support-tickets/` | SupportTicket | `SUPPORT_TICKET_OBJECT_TEMPLATE.md` | ST-NNNN | Support Lead | Optional |
| `product/objects/client-requests/` | ClientRequest | `CLIENT_REQUEST_OBJECT_TEMPLATE.md` | CR-NNNN | Product Owner | Required for client work |
| `product/objects/client-commitments/` | ClientCommitment | `CLIENT_COMMITMENT_OBJECT_TEMPLATE.md` | CC-NNNN | Product Owner | Required for commitments |
| `product/objects/sales-requests/` | SalesRequest | `SALES_REQUEST_OBJECT_TEMPLATE.md` | SR-NNNN | Product Owner | Optional |

---

## Team and Org Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/stakeholders/` | Stakeholder | `STAKEHOLDER_OBJECT_TEMPLATE.md` | STK-NNNN | Product Owner | Optional |
| `product/objects/teams/` | Team | `TEAM_OBJECT_TEMPLATE.md` | TEAM-{CODE} | Engineering Lead | Optional |
| `product/objects/raci/` | _(folder not found)_ | `RACI_OBJECT_TEMPLATE.md` | RACI-{MOD}-{SLUG} | Product Owner | Optional |

---

## Reference Objects

| Object Folder | Object Type | Template File | ID Pattern | Owner | Required |
|---|---|---|---|---|---|
| `product/objects/attachments/` | Attachment | `ATTACHMENT_REFERENCE_TEMPLATE.md` | ATT-NNNN | Product Owner | Optional |
| `product/objects/screen-shots/` | Screenshot | `SCREENSHOT_REFERENCE_TEMPLATE.md` | SS-NNNN | Product Owner | Optional |
| `product/objects/reference-materials/` | ReferenceMaterial | `REFERENCE_MATERIAL_TEMPLATE.md` | REF-NNNN | Product Owner | Optional |

---

## Lightweight / Variant Templates

| Template File | Full Equivalent | When to Use Lite Variant |
|---|---|---|
| `REQUEST_QUICK_TEMPLATE.md` | `REQUEST_OBJECT_TEMPLATE.md` | ≤3 stories, no schema change, single-sentence request |
| `PRD_LITE_TEMPLATE.md` | `PRD_OBJECT_TEMPLATE.md` | Small enhancement, no UAT required, Lane 2 |
| `BUG_MINOR_TEMPLATE.md` | `BUG_OBJECT_TEMPLATE.md` | Cosmetic / copy / layout defects only |
| `RELEASE_HOTFIX_TEMPLATE.md` | `RELEASE_OBJECT_TEMPLATE.md` | Emergency hotfix outside normal release cycle |
| `CHANGE_NOTE_LITE_TEMPLATE.md` | `CHANGE_NOTE_TEMPLATE.md` | Small midstream note, no re-approval needed |
| `QA_SMOKE_TEST_TEMPLATE.md` | `QA_RUN_OBJECT_TEMPLATE.md` | Post-hotfix or post-small-release sanity check |

---

## Active Object Folders Without Dedicated Templates

The following folders exist in `product/objects/` but do not have a dedicated template. Use the closest equivalent or create the template if the object type becomes a regular use case.

| Folder | Recommended Template | Notes |
|---|---|---|
| `integrations/` | `TECH_DESIGN_OBJECT_TEMPLATE.md` or free-form | Integration documentation varies greatly |
| `personas/` | _(no template yet)_ | Create PERSONA_OBJECT_TEMPLATE.md if personas become a regular artifact |
| `prompts/` | _(no template yet)_ | AI prompt management — create template if used regularly |
| `roles/` | _(no template yet)_ | Use RACI or STAKEHOLDER for role context |
| `rollback-plans/` | `RELEASE_HOTFIX_TEMPLATE.md` rollback section | Rollback is embedded in the release template |
| `strategy/` | _(no template yet)_ | Use INITIATIVE or BUSINESS_GOAL for strategy documents |
| `test-plans/` | `QA_RUN_OBJECT_TEMPLATE.md` | Test plans are embedded in QA run objects |
| `questions/` | `OPEN_QUESTION_TEMPLATE.md` | Open questions template covers both folders |
| `references/` | `REFERENCE_MATERIAL_TEMPLATE.md` | Same template applies to both reference folders |
| `release-notes/` | `CHANGE_NOTE_TEMPLATE.md` | Change notes serve as release notes |

---

## Supplementary and Workflow-Support Templates

These templates support the delivery workflow but do not map 1:1 to a primary object folder.

| Template File | Purpose | Associated Folder / Use |
|---|---|---|
| `DESIGN_BRIEF_TEMPLATE.md` | Design kick-off brief capturing goals, constraints, and initial direction | `product/objects/designs/` (pre-design phase) |
| `FIGMA_HANDOFF_TEMPLATE.md` | Designer-to-engineer handoff package | `product/objects/designs/` (handoff phase) |
| `FIGMA_BUILD_SPEC_TEMPLATE.md` | Build specification tied to a Figma frame | `product/objects/designs/` or `product/objects/figma-links/` |
| `FEATURE_EDGE_CASE_CHECKLIST_TEMPLATE.md` | Edge case checklist for a specific feature | `product/objects/edge-case-checklists/` |
| `EDGE_CASE_QUESTION_SET_TEMPLATE.md` | General edge case question set for discovery | `product/objects/edge-case-checklists/` |
| `DEFERRED_ITEM_TEMPLATE.md` | An item explicitly deferred for future consideration | `product/objects/deferred-items/` |
| `PARKING_LOT_ITEM_TEMPLATE.md` | A temporary holding item during workshops or planning | `product/objects/parking-lot/` |
| `INCOMPLETE_WORK_OBJECT_TEMPLATE.md` | Work that is partially done and needs to be handed off or resumed | Workflow support — attach to current epic or sprint |
| `INTAKE_BATCH_OBJECT_TEMPLATE.md` | A batch of incoming requests grouped for triage | `product/objects/intake-batches/` |
| `INTERNAL_IDEA_OBJECT_TEMPLATE.md` | An early-stage internal idea not yet ready for triage as a request | `product/objects/internal-ideas/` |
| `KNOWLEDGE_OBJECT_TEMPLATE.md` | A knowledge base article or how-to document | `product/objects/knowledge/` |
| `PRODUCT_OBJECT_TEMPLATE.md` | Top-level product definition | `product/objects/products/` |
| `PULL_REQUEST_OBJECT_TEMPLATE.md` | A tracked pull request linked to stories or features | `product/objects/pull-requests/` |
| `RULE_OBJECT_TEMPLATE.md` | A product or system rule that must be enforced | `product/objects/rules/` |
| `SUPPORT_HANDOVER_TEMPLATE.md` | Handover document from product/engineering to support team | `product/objects/` (release artifact) |
| `UX_REVIEW_TEMPLATE.md` | UX expert review of a design or flow | `product/objects/ux-research/` |
| `VERSION_HISTORY_TEMPLATE.md` | Object-level version history log | `product/versions/` |

---

## Related

- Full object map: `product/indexes/TEMPLATE_OBJECT_MAP.md`
- Validation: `node product/tools/validate-templates.js`
- Work type lanes: `product/os/policies/WORK_TYPE_LANES.md`
- ID rules: `product/os/policies/ID_RULES.md`
- Boundary rules: `product/os/policies/TEMPLATE_BOUNDARY_RULES.md`
