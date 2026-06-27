# Template Object Map

**Version:** 2.0
**Last updated:** 2026-06-24
**Owner:** Product Lead

> Quick-reference map from object folder → template file → ID pattern.
> Full registry with notes and lane requirements: `product/os/templates/TEMPLATE_REGISTRY.md`
> Validation: `node product/tools/validate-templates.js`

---

| Object Folder | Object Type | Template File | ID Pattern | Required |
|---|---|---|---|---|
| `product/objects/acceptance-criteria/` | AcceptanceCriteria | `ACCEPTANCE_CRITERIA_OBJECT_TEMPLATE.md` | AC-{MOD}-{AREA}-NNN | Optional |
| `product/objects/analytics-events/` | AnalyticsEvent | `ANALYTICS_EVENT_TEMPLATE.md` | AE-{MOD}-{SLUG} | Required when tracked |
| `product/objects/api-contracts/` | APIContract | `API_CONTRACT_OBJECT_TEMPLATE.md` | APIC-{MOD}-{SLUG}-NNN | Required for API changes |
| `product/objects/apis/` | API | `API_OBJECT_TEMPLATE.md` | API-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/approvals/` | Approval | `APPROVAL_OBJECT_TEMPLATE.md` | APR-{MOD}-{SLUG}-NNN | Required for approval gates |
| `product/objects/assumptions/` | Assumption | `ASSUMPTION_OBJECT_TEMPLATE.md` | ASSM-{MOD}-NNNN | Optional |
| `product/objects/attachments/` | Attachment | `ATTACHMENT_REFERENCE_TEMPLATE.md` | ATT-NNNN | Optional |
| `product/objects/backlog-items/` | BacklogItem | `BACKLOG_ITEM_TEMPLATE.md` | BLI-NNN | Optional |
| `product/objects/bugs/` | Bug | `BUG_OBJECT_TEMPLATE.md` | BUG-{MOD}-{AREA}-NNNN | Required |
| `product/objects/builds/` | Build | `BUILD_OBJECT_TEMPLATE.md` | BUILD-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/business-cases/` | BusinessCase | `BUSINESS_CASE_OBJECT_TEMPLATE.md` | BC-NNN | Required for Lane 4 |
| `product/objects/business-goals/` | BusinessGoal | `BUSINESS_GOAL_OBJECT_TEMPLATE.md` | BG-NNN | Required for Lane 4 |
| `product/objects/capabilities/` | Capability | `CAPABILITY_OBJECT_TEMPLATE.md` | CAP-XXXX | Optional |
| `product/objects/capacity-plans/` | CapacityPlan | `CAPACITY_PLAN_OBJECT_TEMPLATE.md` | CAP-PLAN-NNN | Required for Lane 4 |
| `product/objects/change-notes/` | ChangeNote | `CHANGE_NOTE_TEMPLATE.md` | CN-{MOD}-{AREA}-NNN | Optional |
| `product/objects/client-commitments/` | ClientCommitment | `CLIENT_COMMITMENT_OBJECT_TEMPLATE.md` | CC-NNNN | Required for commitments |
| `product/objects/client-requests/` | ClientRequest | `CLIENT_REQUEST_OBJECT_TEMPLATE.md` | CR-NNNN | Required for client work |
| `product/objects/components/` | Component | `COMPONENT_OBJECT_TEMPLATE.md` | CMP-{MOD}-XXXX | Optional |
| `product/objects/configurations/` | Configuration | `CONFIGURATION_OBJECT_TEMPLATE.md` | CONFIG-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/dashboards/` | Dashboard | `DASHBOARD_OBJECT_TEMPLATE.md` | DASH-{MOD}-{SLUG} | Optional |
| `product/objects/data-entities/` | DataEntity | `DATA_ENTITY_OBJECT_TEMPLATE.md` | DE-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/data-migrations/` | DataMigration | `DATA_MIGRATION_OBJECT_TEMPLATE.md` | DM-{MOD}-{SLUG}-NNN | Required for schema migrations |
| `product/objects/decisions/` | Decision | `DECISION_OBJECT_TEMPLATE.md` | DECISION-{MOD}-{SLUG}-NNN | Required for key decisions |
| `product/objects/deferred-items/` | DeferredItem | `DEFERRED_ITEM_TEMPLATE.md` | DEF-{MOD}-NNNN | Optional |
| `product/objects/dependencies/` | Dependency | `DEPENDENCY_OBJECT_TEMPLATE.md` | DEP-{MOD}-XXXX | Optional |
| `product/objects/design-decisions/` | DesignDecision | `DESIGN_DECISION_OBJECT_TEMPLATE.md` | DD-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/designs/` | Design | `DESIGN_OBJECT_TEMPLATE.md` | DESIGN-{MOD}-{AREA}-{NAME}-NNN | Required for Lane 3+ |
| `product/objects/discovery/` | DiscoverySession | `DISCOVERY_SESSION_OBJECT_TEMPLATE.md` | DS-{MOD}-NNNN | Optional |
| `product/objects/discovery-evidence/` | DiscoveryEvidence | `DISCOVERY_EVIDENCE_TEMPLATE.md` | DE-EV-{MOD}-NNNN | Optional |
| `product/objects/discovery-notes/` | DiscoveryNote | `DISCOVERY_NOTE_TEMPLATE.md` | DN-{MOD}-NNNN | Optional |
| `product/objects/edge-case-checklists/` | EdgeCaseChecklist | `FEATURE_EDGE_CASE_CHECKLIST_TEMPLATE.md` | ECC-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/enhancements/` | Enhancement | `ENHANCEMENT_OBJECT_TEMPLATE.md` | ENH-{MOD}-{AREA}-NNN | Required for tracked enhancements |
| `product/objects/environments/` | Environment | `ENVIRONMENT_OBJECT_TEMPLATE.md` | ENV-{NAME} | Optional |
| `product/objects/epics/` | Epic | `EPIC_OBJECT_TEMPLATE.md` | EPIC-XXXX | Required |
| `product/objects/escalations/` | Escalation | `ESCALATION_OBJECT_TEMPLATE.md` | ESC-NNNN | Required for escalations |
| `product/objects/experiments/` | Experiment | `EXPERIMENT_OBJECT_TEMPLATE.md` | EXP-{MOD}-{SLUG}-NNN | Required for A/B tests |
| `product/objects/feature-flags/` | FeatureFlag | `FEATURE_FLAG_OBJECT_TEMPLATE.md` | FF-{MOD}-{SLUG}-NNN | Required when flag is used |
| `product/objects/features/` | Feature | `FEATURE_OBJECT_TEMPLATE.md` | FEATURE-{MOD}-{AREA}-{NAME} | Required |
| `product/objects/feedback/` | Feedback | `FEEDBACK_OBJECT_TEMPLATE.md` | FB-NNNN | Optional |
| `product/objects/figma-links/` | FigmaLink | `FIGMA_LINK_TEMPLATE.md` | FIGMA-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/flow-diagrams/` | FlowDiagram | `FLOW_DIAGRAM_REFERENCE_TEMPLATE.md` | FD-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/hypercare-plans/` | HypercarePlan | `HYPERCARE_PLAN_TEMPLATE.md` | HC-{MOD}-{SLUG}-NNN | Required for Lane 4 |
| `product/objects/impact-checks/` | ImpactCheck | `IMPACT_CHECK_TEMPLATE.md` | IC-{MOD}-{SLUG}-NNN | Required for breaking changes |
| `product/objects/incidents/` | Incident | `INCIDENT_OBJECT_TEMPLATE.md` | INC-NNNN | Required for incidents |
| `product/objects/initiatives/` | Initiative | `INITIATIVE_OBJECT_TEMPLATE.md` | INIT-XXXX | Required for Lane 4 |
| `product/objects/intake-batches/` | IntakeBatch | `INTAKE_BATCH_OBJECT_TEMPLATE.md` | IB-NNNN | Optional |
| `product/objects/internal-ideas/` | InternalIdea | `INTERNAL_IDEA_OBJECT_TEMPLATE.md` | IDEA-NNNN | Optional |
| `product/objects/journeys/` | Journey | `JOURNEY_OBJECT_TEMPLATE.md` | JRN-{MOD}-{SLUG} | Optional |
| `product/objects/knowledge/` | Knowledge | `KNOWLEDGE_OBJECT_TEMPLATE.md` | KB-NNNN | Optional |
| `product/objects/known-issues/` | KnownIssue | `KNOWN_ISSUE_TEMPLATE.md` | KI-{MOD}-NNNN | Optional |
| `product/objects/kpis/` | KPI | `KPI_OBJECT_TEMPLATE.md` | KPI-{MOD}-{SLUG} | Required for Lane 3+ |
| `product/objects/measurement-plans/` | MeasurementPlan | `MEASUREMENT_PLAN_TEMPLATE.md` | MP-{MOD}-{SLUG}-NNN | Required for Lane 3+ |
| `product/objects/metrics/` | Metric | `METRIC_OBJECT_TEMPLATE.md` | MET-{MOD}-{SLUG} | Optional |
| `product/objects/module-areas/` | ModuleArea | `MODULE_AREA_OBJECT_TEMPLATE.md` | MA-{MOD}-{CODE} | Required |
| `product/objects/modules/` | Module | `MODULE_OBJECT_TEMPLATE.md` | MOD-{CODE} | Required |
| `product/objects/non-functional-requirements/` | NFR | `NFR_OBJECT_TEMPLATE.md` | NFR-{MOD}-XXXX | Optional |
| `product/objects/okrs/` | OKR | `OKR_OBJECT_TEMPLATE.md` | OKR-YYYY-QN-NNN | Optional |
| `product/objects/open-questions/` | OpenQuestion | `OPEN_QUESTION_TEMPLATE.md` | OQ-{MOD}-NNNN | Optional |
| `product/objects/ops-issues/` | OpsIssue | `OPS_ISSUE_OBJECT_TEMPLATE.md` | OPS-{MOD}-NNNN | Optional |
| `product/objects/parking-lot/` | ParkingLotItem | `PARKING_LOT_ITEM_TEMPLATE.md` | PLI-{MOD}-NNNN | Optional |
| `product/objects/prds/` | PRD | `PRD_OBJECT_TEMPLATE.md` | PRD-{MOD}-{AREA}-{NAME}-NNN | Required for Lane 3+ |
| `product/objects/priority-scores/` | PriorityScore | `PRIORITY_SCORE_OBJECT_TEMPLATE.md` | PS-{MOD}-NNNN | Optional |
| `product/objects/products/` | Product | `PRODUCT_OBJECT_TEMPLATE.md` | PRODUCT-{SLUG} | Required |
| `product/objects/prototypes/` | Prototype | `PROTOTYPE_OBJECT_TEMPLATE.md` | PROTO-{MOD}-{SLUG}-NNN | Optional |
| `product/objects/pull-requests/` | PullRequest | `PULL_REQUEST_OBJECT_TEMPLATE.md` | PR-NNNN | Optional |
| `product/objects/qa-runs/` | QARun | `QA_RUN_OBJECT_TEMPLATE.md` | QA-{MOD}-{AREA}-{NAME}-RUN-NNN | Required |
| `product/objects/qa-tests/` | TestCase | `TEST_CASE_OBJECT_TEMPLATE.md` | TC-{MOD}-{AREA}-{NAME}-NNN | Required |
| `product/objects/rcas/` | RCA | `RCA_TEMPLATE.md` | RCA-NNNN | Required post-incident |
| `product/objects/reference-materials/` | ReferenceMaterial | `REFERENCE_MATERIAL_TEMPLATE.md` | REF-NNNN | Optional |
| `product/objects/releases/` | Release | `RELEASE_OBJECT_TEMPLATE.md` | RELEASE-{MOD}-{AREA}-{NAME}-NNNN | Required |
| `product/objects/requests/` | Request | `REQUEST_OBJECT_TEMPLATE.md` | REQ-NNNN | Required |
| `product/objects/requirements/` | Requirement | `REQUIREMENT_OBJECT_TEMPLATE.md` | REQ-{MOD}-XXXX | Optional |
| `product/objects/research-notes/` | ResearchNote | `RESEARCH_NOTE_TEMPLATE.md` | RN-{MOD}-NNNN | Optional |
| `product/objects/risks/` | Risk | `RISK_OBJECT_TEMPLATE.md` | RISK-{MOD}-{SLUG}-NNN | Required if risk identified |
| `product/objects/roadmap-decisions/` | RoadmapDecision | `ROADMAP_DECISION_TEMPLATE.md` | RD-NNN | Optional |
| `product/objects/roadmap-items/` | RoadmapItem | `ROADMAP_ITEM_TEMPLATE.md` | RMI-NNN | Optional |
| `product/objects/roadmap-options/` | RoadmapOption | `ROADMAP_OPTION_TEMPLATE.md` | RO-NNN | Optional |
| `product/objects/routes/` | Route | `ROUTE_OBJECT_TEMPLATE.md` | ROUTE-{APP}-{SLUG} | Optional |
| `product/objects/rules/` | Rule | `RULE_OBJECT_TEMPLATE.md` | RULE-{MOD}-{SLUG} | Optional |
| `product/objects/sales-requests/` | SalesRequest | `SALES_REQUEST_OBJECT_TEMPLATE.md` | SR-NNNN | Optional |
| `product/objects/scope-changes/` | ScopeChange | `SCOPE_CHANGE_TEMPLATE.md` | SC-{MOD}-{SLUG}-NNN | Required for scope changes |
| `product/objects/screen-shots/` | Screenshot | `SCREENSHOT_REFERENCE_TEMPLATE.md` | SS-NNNN | Optional |
| `product/objects/screens/` | Screen | `SCREEN_OBJECT_TEMPLATE.md` | SCR-{USR\|CUS\|ADM}-NNNN | Required for new screens |
| `product/objects/sops/` | SOP | `SOP_TEMPLATE.md` | SOP-{AREA}-NNN | Required for ops processes |
| `product/objects/stakeholders/` | Stakeholder | `STAKEHOLDER_OBJECT_TEMPLATE.md` | STK-NNNN | Optional |
| `product/objects/stories/` | Story | `STORY_OBJECT_TEMPLATE.md` | STORY-{MOD}-{AREA}-{NAME}-NNN | Optional |
| `product/objects/subfeatures/` | Subfeature | `SUBFEATURE_OBJECT_TEMPLATE.md` | SUBFEATURE-{MOD}-{AREA}-{NAME} | Optional |
| `product/objects/submodules/` | Submodule | `SUBMODULE_OBJECT_TEMPLATE.md` | SM-{MOD}-{CODE} | Optional |
| `product/objects/support-playbooks/` | SupportPlaybook | `SUPPORT_PLAYBOOK_TEMPLATE.md` | SP-{MOD}-{SLUG}-NNN | Required for support-facing features |
| `product/objects/support-tickets/` | SupportTicket | `SUPPORT_TICKET_OBJECT_TEMPLATE.md` | ST-NNNN | Optional |
| `product/objects/tasks/` | Task | `TASK_OBJECT_TEMPLATE.md` | TASK-XXXX | Required |
| `product/objects/teams/` | Team | `TEAM_OBJECT_TEMPLATE.md` | TEAM-{CODE} | Optional |
| `product/objects/technical-designs/` | TechDesign | `TECH_DESIGN_OBJECT_TEMPLATE.md` | TECH-{MOD}-{SLUG}-NNN | Required for schema/API changes |
| `product/objects/test-cases/` | TestCase | `TEST_CASE_OBJECT_TEMPLATE.md` | TC-{MOD}-{AREA}-{NAME}-NNN | Required |
| `product/objects/training-materials/` | TrainingPlan | `TRAINING_PLAN_TEMPLATE.md` | TP-NNN | Optional |
| `product/objects/uat-runs/` | UATRun | `UAT_RUN_OBJECT_TEMPLATE.md` | UAT-{MOD}-{AREA}-{NAME}-RUN-NNN | Required |
| `product/objects/ui-components/` | UIComponent | `UI_COMPONENT_OBJECT_TEMPLATE.md` | UIC-{MOD}-XXXX | Optional |
| `product/objects/user-stories/` | UserStory | `USER_STORY_OBJECT_TEMPLATE.md` | US-NNNN | Required |
| `product/objects/ux-research/` | ResearchNote | `RESEARCH_NOTE_TEMPLATE.md` | RN-{MOD}-NNNN | Optional |
| `product/objects/wireframes/` | Wireframe | `WIREFRAME_REFERENCE_TEMPLATE.md` | WF-{MOD}-{SLUG}-NNN | Optional |

---

## No-Template Folders

The following folders intentionally have no template — see TEMPLATE_REGISTRY.md for the recommended approach for each.

`integrations/` · `personas/` · `prompts/` · `questions/` · `references/` · `release-notes/` · `roles/` · `rollback-plans/` · `strategy/` · `test-plans/`
