# Nuemart Product OS — Impact Engine

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## Purpose

The Impact Engine systematically identifies every object, system, user, and process that will be affected by a proposed change. It converts a high-level feature or request into a precise, severity-rated impact map. This map drives: governance gate triggering, risk object creation, dependency identification, rollback planning, and regression test scope.

No feature may proceed to PRD without a completed Impact Assessment.

---

## Inputs

| Input | Source | Required |
|---|---|---|
| Request Object (classified) | `product/objects/requests/` | Yes |
| Feature Object | `product/objects/features/` | Yes |
| Discovery Session Object | `product/objects/discovery/` | Strongly Preferred |
| PRD Object | `product/objects/prds/` | If available |
| PRODUCT_HIERARCHY.md | `product/architecture/` | Yes |
| MODULE_MASTER.md | `product/architecture/` | Yes |
| Convex schema (`convex/schema.ts`) | Codebase | For schema impact |
| Existing screens inventory | `product/architecture/SCREEN_INVENTORY.md` | For screen impact |

---

## Impact Categories

The Impact Engine evaluates 12 categories. Every category must be assessed — even if the result is `None`. A `None` rating must be explicitly assigned, not implied by absence.

---

### Category 1 — Module Impact

**Question:** Which modules are directly changed? Which are indirectly affected?

**Direct impact**: The module contains code, screens, or data that will be modified.
**Indirect impact**: The module depends on data or behavior that is changing, but the module's own code is not modified.

**Severity rules:**
- Critical: Core module functionality disabled or replaced
- High: Core module behavior changes; significant new functionality added
- Medium: Module receives new optional feature; existing behavior unchanged
- Low: Module receives UI-only change with no logic impact
- None: Module has no relationship to this change

**Output fields:**
```yaml
module_impact:
  severity: None | Low | Medium | High | Critical
  directly_affected_modules: []
  indirectly_affected_modules: []
  notes: ""
```

---

### Category 2 — Screen Impact

**Question:** Which existing screens need changes? Are new screens needed?

**Assessment checklist:**
- Which screens display data touched by this feature?
- Which screens have navigation flows affected by this feature?
- Does this feature require a new screen to be created?
- Does this feature remove or merge existing screens?

**Severity rules:**
- Critical: Core customer journey screen replaced or removed
- High: Significant layout or flow change to a high-traffic screen
- Medium: New UI elements on an existing screen; existing flow preserved
- Low: Text/copy change or minor visual adjustment
- None: No screen changes required

**Output fields:**
```yaml
screen_impact:
  severity: None | Low | Medium | High | Critical
  modified_screens: []
  new_screens: []
  removed_screens: []
  notes: ""
```

---

### Category 3 — Component Impact

**Question:** Which UI components (ShadCN, custom) are created, modified, or deprecated?

**Assessment checklist:**
- Does this feature require a new ShadCN component to be configured or extended?
- Does this feature require a new custom React component?
- Does this feature modify the behavior, props, or visual state of an existing component?
- Are any components made obsolete by this change?

**Severity rules:**
- High: Shared component modified (affects all screens using it)
- Medium: New custom component created; existing components unchanged
- Low: Existing component used as-is, minor prop changes
- None: No component changes

**Output fields:**
```yaml
component_impact:
  severity: None | Low | Medium | High
  modified_components: []
  new_components: []
  deprecated_components: []
  notes: ""
```

---

### Category 4 — Data Entity Impact

**Question:** Which Convex data entities (tables) are created, modified, or deprecated?

**Assessment checklist:**
- Does this feature store new data? → New table or new fields on existing table
- Does this feature change what data is stored? → Modified table
- Does this feature make existing data obsolete? → Field or table deprecation
- Does this feature change how data is related? → New relationship between tables

**Nuemart principle:** Convex is the source of truth. All data decisions are permanent until explicitly migrated.

**Severity rules:**
- Critical: Core transaction table (e.g., orders, payments) modified
- High: New table created; or existing table gets new required field
- Medium: Existing table gets new optional field; no migration required
- Low: Read-only query change; no table modification
- None: No data entity changes

**Output fields:**
```yaml
data_entity_impact:
  severity: None | Low | Medium | High | Critical
  new_entities: []
  modified_entities: []
  deprecated_entities: []
  migration_required: true | false
  notes: ""
```

---

### Category 5 — Schema Impact

**Question:** Does this require a change to `convex/schema.ts`?

This is the highest-risk single category in the Nuemart tech stack. Schema changes in Convex affect:
- All existing queries and mutations that reference the modified table
- Any TypeScript types auto-generated from the schema
- Data integrity of existing records

**Severity is always at minimum High when `schema_change: true`.**

**Assessment checklist:**
- Are new tables being added to `convex/schema.ts`?
- Are new fields being added to existing tables?
- Are existing fields being renamed, retyped, or removed?
- Are index definitions being changed?
- Are validator rules being tightened or loosened?

**Nuemart-specific rule:** Any schema change → triggers G4 (Schema Review governance gate). No exceptions.

**Output fields:**
```yaml
schema_impact:
  severity: None | High | Critical
  schema_change_required: true | false
  affected_tables: []
  change_type: add_table | add_field | modify_field | remove_field | remove_table | add_index | modify_index
  migration_plan: "<text or null>"
  triggers_gate: G4
  notes: ""
```

---

### Category 6 — API Impact

**Question:** Which Convex functions (queries, mutations, actions) are created or modified?

**Assessment checklist:**
- Are new Convex queries needed to fetch data for this feature?
- Are new Convex mutations needed to write data for this feature?
- Are new Convex actions needed for async or external operations?
- Do existing Convex functions need to change their arguments or return shapes?
- Do existing Convex functions need internal logic changes?

**Nuemart principle:** `userId` must never be passed from the frontend. Identity is always resolved server-side via `ctx.auth.getUserIdentity()`. Any API change that adds a `userId` argument is a security violation.

**Severity rules:**
- Critical: Breaking change to a Convex function used by multiple modules
- High: New mutation that writes to a core table; or existing function signature changes
- Medium: New query; or non-breaking logic change to existing function
- Low: Minor logic optimization with identical interface
- None: No Convex function changes

**Output fields:**
```yaml
api_impact:
  severity: None | Low | Medium | High | Critical
  new_functions: []
  modified_functions: []
  deprecated_functions: []
  breaking_changes: true | false
  notes: ""
```

---

### Category 7 — Integration Impact

**Question:** Does this change touch Clerk, Razorpay, or any other external service?

**Nuemart integrations:**
- **Clerk**: Authentication and user identity. Changes here affect all authenticated flows.
- **Razorpay**: Payment processing. Changes here require G4 + G6 gates.
- **SMS/notification provider** (if configured)
- **Delivery logistics APIs** (if integrated)

**Severity rules:**
- Critical: Razorpay payment flow changes; Clerk auth flow changes
- High: New external API integration added; existing integration configuration changes
- Medium: New Clerk metadata field used; or new Razorpay webhook handled
- Low: External service called with existing integration, no new configuration
- None: No external service involvement

**Nuemart-specific rule:** Razorpay → always Critical severity, triggers G4 + G6. Payment changes require webhook verification in all mutation handlers; frontend must never be trusted for payment state.

**Output fields:**
```yaml
integration_impact:
  severity: None | Low | Medium | High | Critical
  affected_integrations: []
  new_integrations: []
  webhook_changes: true | false
  triggers_gates: []
  notes: ""
```

---

### Category 8 — Role and Permission Impact

**Question:** Are user roles or permissions added, changed, or removed?

**Nuemart roles:** Customer, Admin, Delivery Agent, Warehouse Staff, Super Admin

**Assessment checklist:**
- Does this feature introduce a new user role?
- Does this feature change what an existing role can see or do?
- Does this feature require new permission checks in Convex functions?
- Does this feature expose data to a role that should not see it?

**Nuemart-specific rule:** Role changes → triggers G4 gate. Role changes must be reviewed for security implications before implementation.

**Severity rules:**
- Critical: Super Admin permissions modified; or customer data exposed to non-customer role
- High: New role created; or existing role gains access to previously restricted data
- Medium: Existing role loses access to a non-critical feature
- Low: Minor permission reorganization with equivalent access
- None: No role or permission changes

**Output fields:**
```yaml
role_impact:
  severity: None | Low | Medium | High | Critical
  affected_roles: []
  new_roles: []
  permission_changes: []
  triggers_gate: G4
  notes: ""
```

---

### Category 9 — Configuration Impact

**Question:** Are system-level configuration values affected?

**Configuration surfaces in Nuemart:**
- Environment variables (`.env.local`, Vercel config)
- Feature flags (if implemented)
- Convex environment variables
- `next.config.ts` settings
- Clerk configuration (JWT templates, social login providers)
- Razorpay configuration (webhook endpoints, allowed payment methods)

**Severity rules:**
- High: Production environment variable must change; or Convex environment config changes
- Medium: Feature flag added or changed
- Low: Local development config change only
- None: No configuration changes

**Output fields:**
```yaml
configuration_impact:
  severity: None | Low | Medium | High
  affected_configs: []
  new_configs: []
  environment: dev | staging | production | all
  notes: ""
```

---

### Category 10 — Regression Risk

**Question:** Which existing features could be broken by this change?

**Assessment method:**
1. For each modified Convex function: identify all callers (screens, other functions)
2. For each modified component: identify all screens where it is used
3. For each schema change: identify all functions that query or write to the affected table
4. For any navigation or routing change: identify all entry points to the affected flows

**Severity rules:**
- Critical: Core commerce flow (add-to-cart, checkout, payment) at risk
- High: Feature used by >50% of users daily; or multiple modules depend on changed code
- Medium: Feature used regularly but by a subset of users; or isolated module at risk
- Low: Edge case or low-traffic feature at risk
- None: No regression risk identified

**Output fields:**
```yaml
regression_risk:
  severity: None | Low | Medium | High | Critical
  features_at_risk: []
  regression_test_scope: []
  notes: ""
```

---

### Category 11 — Performance Impact

**Question:** Does this change affect page load time, Convex query performance, or real-time subscription load?

**Assessment checklist:**
- Does this feature add new real-time subscriptions (`useQuery` calls on PLP or high-traffic pages)?
- Does this feature increase the number of Convex queries per page load?
- Does this feature add significant client-side JavaScript (large components, animations)?
- Does this feature add new images or media that affect page weight?
- Does this feature add a Convex action that runs on every request?

**Nuemart context:** The PLP (Product Listing Page) is the highest-traffic page. Carousel/image-heavy features have measurable performance impact on mobile connections in India.

**Severity rules:**
- Critical: Core page load time increases by >2 seconds on 4G connection
- High: Meaningful performance degradation; or new subscription on every PLP load
- Medium: Slight performance impact; mitigatable with lazy loading or pagination
- Low: Negligible performance impact
- None: No performance impact

**Output fields:**
```yaml
performance_impact:
  severity: None | Low | Medium | High | Critical
  affected_pages: []
  new_subscriptions: []
  estimated_bundle_size_increase: "<KB or null>"
  mitigation_plan: "<text or null>"
  notes: ""
```

---

### Category 12 — Security Impact

**Question:** Does this change affect authentication, authorization, or data privacy?

**Assessment checklist:**
- Does this feature expose new data to the client that was previously server-only?
- Does this feature pass user-provided data to a Convex function without validation?
- Does this feature create a new unauthenticated endpoint?
- Does this feature store personally identifiable information (PII)?
- Does this feature create a new external-facing surface (webhook, API endpoint)?
- Does this feature change how sessions or tokens are managed?

**Nuemart principles:**
- `no userId from frontend` — user identity must always be resolved server-side
- `webhook-verified trust` — all Razorpay webhooks must be signature-verified before updating order state
- Any mutation that changes financial state must verify the payment event on the server, never trust client signals

**Severity rules:**
- Critical: Potential data exposure, authentication bypass, or payment state manipulation possible
- High: New PII stored; or new unauthenticated surface created; or webhook added without verification
- Medium: New data exposed to authenticated users (review required); or new input surface without thorough validation
- Low: Minor security hardening needed (e.g., add input length validation)
- None: No security impact

**Nuemart-specific rule:** Security Impact High or Critical → triggers G6 gate.

**Output fields:**
```yaml
security_impact:
  severity: None | Low | Medium | High | Critical
  pii_involved: true | false
  new_auth_surfaces: []
  webhook_verification_required: true | false
  triggers_gate: G6
  notes: ""
```

---

## Reasoning Steps

1. **Load all available context.** Read Request Object, Feature Object, Discovery Session, and any PRD. Do not assess impact from the raw request text alone — use structured objects.

2. **Assess Category 5 (Schema Impact) first.** Schema changes cascade through almost every other category. Knowing the schema footprint early shapes the rest of the assessment.

3. **Assess Category 7 (Integration Impact) second.** Integration changes (especially Razorpay and Clerk) determine which governance gates are required early in the assessment.

4. **Assess Categories 1–4 and 6 (Module, Screen, Component, Data Entity, API).** These are the core functional impact areas. Work through them systematically using the product hierarchy.

5. **Assess Categories 8–12 (Role, Config, Regression, Performance, Security).** These cross-cutting concerns require reviewing the findings from steps 2–4 as inputs.

6. **Assign severity to each category.** Use the severity rules defined per category. Do not upgrade or downgrade severity without documented reasoning.

7. **Identify triggered governance gates.** Compile all gates triggered by categories 5, 7, 8, and 12.

8. **Create Risk Objects.** For every category with severity High or Critical, create a Risk Object. Risk Objects drive mitigation planning in the Development Plan.

9. **Create Dependency Objects.** For every inter-module dependency identified, create a Dependency Object. Dependencies must be sequenced in the Development Plan.

10. **Create the Impact Assessment Object.** Compile all category outputs into a single Impact Assessment Object. Set severity to the highest severity across all categories.

11. **Update the Request Object.** Set status to `Impact Assessed`. Add `impact_assessment_id` field.

12. **Output governance gate list to user.** Explicitly list every gate that must be cleared before the feature can proceed to PRD.

---

## Output Objects

| Object | Created/Updated | Notes |
|---|---|---|
| Impact Assessment Object | Created | Primary output — links all category findings |
| Risk Objects | Created | One per High/Critical category finding |
| Dependency Objects | Created | One per inter-module or inter-system dependency |
| Request Object | Updated | Status → `Impact Assessed`; `impact_assessment_id` populated |

---

## Required Metadata

```yaml
impact_assessment_id: IMPACT-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
request_id: REQ-XXXX
feature_id: FEATURE-{...}
overall_severity: None | Low | Medium | High | Critical
assessed_at: <ISO datetime>
assessed_by: AI | Human | AI-with-Human-Review

module_impact: { severity, directly_affected_modules, indirectly_affected_modules, notes }
screen_impact: { severity, modified_screens, new_screens, removed_screens, notes }
component_impact: { severity, modified_components, new_components, deprecated_components, notes }
data_entity_impact: { severity, new_entities, modified_entities, deprecated_entities, migration_required, notes }
schema_impact: { severity, schema_change_required, affected_tables, change_type, migration_plan, triggers_gate, notes }
api_impact: { severity, new_functions, modified_functions, deprecated_functions, breaking_changes, notes }
integration_impact: { severity, affected_integrations, new_integrations, webhook_changes, triggers_gates, notes }
role_impact: { severity, affected_roles, new_roles, permission_changes, triggers_gate, notes }
configuration_impact: { severity, affected_configs, new_configs, environment, notes }
regression_risk: { severity, features_at_risk, regression_test_scope, notes }
performance_impact: { severity, affected_pages, new_subscriptions, estimated_bundle_size_increase, mitigation_plan, notes }
security_impact: { severity, pii_involved, new_auth_surfaces, webhook_verification_required, triggers_gate, notes }

required_gates: []
risk_object_ids: []
dependency_object_ids: []
```

---

## Severity Ratings

| Severity | Definition | Examples in Nuemart Context |
|---|---|---|
| **Critical** | Production risk; data loss, security breach, or complete feature failure possible; blocks release | Razorpay payment flow changes; Clerk auth flow changes; orders table schema modification; customer data exposed to wrong role |
| **High** | Significant risk requiring careful implementation and review; mandatory risk mitigation plan | New Convex table added; existing shared component modified; new external integration added; role permissions changed |
| **Medium** | Moderate impact; manageable with standard engineering practices | New optional field on existing table; new screen added; moderate regression risk on secondary flow |
| **Low** | Minor impact; standard QA coverage sufficient | Text changes; minor UI adjustments; non-breaking logic optimization |
| **None** | No impact in this category | Confirmed after assessment — must be explicitly assigned |

**Overall severity** = highest severity across all 12 categories.

---

## Nuemart-Specific Rules

| Rule | Condition | Action |
|---|---|---|
| Schema-always-high | Any `convex/schema.ts` change | `schema_impact.severity` = minimum High; triggers G4 |
| Payment-critical | Any Razorpay flow change | `integration_impact.severity` = Critical; triggers G4 + G6 |
| Role-high | Any role or permission change | `role_impact.severity` = minimum High; triggers G4 |
| No-userId-from-frontend | Any new Convex function | Security review: confirm no userId argument from client; flag if found |
| Webhook-verified | Any new Razorpay webhook | `security_impact.webhook_verification_required` = true; blocks release if unverified |
| India-first-performance | Any PLP or high-traffic page change | `performance_impact` must be assessed against 4G mobile benchmark |
| Convex-source-of-truth | Any data migration | `data_entity_impact.migration_required` must have a documented migration plan |

---

## Failure Conditions

| Failure | Handling |
|---|---|
| No Feature Object or Discovery Session | Block impact assessment; output explicit list of what is needed |
| Cannot determine schema impact without codebase access | Flag as `schema_impact: UNKNOWN`; require human verification before proceeding |
| Cannot enumerate regression risk without SCREEN_INVENTORY.md | Flag regression risk as `UNKNOWN`; require human review of regression scope |
| Overall severity is Critical and no mitigation plan exists | Block PRD creation; require Risk Object with mitigation plan before proceeding |

---

## Example — IMPACT-0001: Delivery Module

**Request:** REQ-0001 — Delivery Module MVP

**Impact findings:**
- **Schema impact:** High — new `deliveryTasks` table added to `convex/schema.ts`; new `deliveryAgents` table added. Triggers G4.
- **Module impact:** High — DEL module new; indirect impact on COM-ORDHIS (order history shows delivery status)
- **API impact:** High — new Convex mutations: `assignDeliveryTask`, `updateDeliveryStatus`, `completeDeliveryTask`
- **Role impact:** High — new `deliveryAgent` role added to Clerk and enforced in Convex. Triggers G4.
- **Regression risk:** Medium — `COM-ORDHIS` order history screens may need updates to show delivery status fields
- **Security impact:** Medium — delivery agent must only see their own tasks; server-side filtering required
- **Performance impact:** Low — DEL module admin-facing; not on high-traffic customer pages

**Overall severity:** High
**Required gates:** G4 (schema change), G4 (role change)
**Risk Objects created:** RISK-DEL-SCHEMA-001, RISK-DEL-ROLE-001

---

## Related Files

- `AI_REASONING_MODEL.md` — Impact assessment is Step 7 of the reasoning model
- `AI_AGENTS.md` — Impact Agent (Agent 6)
- `RISK_RULES.md` — Severity thresholds and risk categorization rules
- `APPROVAL_GATES.md` — Gate definitions triggered by impact categories
- `TRACEABILITY_ENGINE.md` — Impact Assessment links into the traceability chain
- `GAP_DETECTION_ENGINE.md` — Flags missing impact assessments
