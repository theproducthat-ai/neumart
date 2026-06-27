# Artifact Requirement Engine

**Version**: 2.0  
**Owner**: Product Lead  
**Status**: Active

---

## Purpose

Given a confirmed work type lane and request context, the Artifact Requirement Engine determines exactly which Product OS artifacts are required, which are recommended, and which are not needed. It outputs a checklist that the team uses to ensure they have everything before starting work.

This engine prevents the two failure modes:
1. **Over-governance**: Requiring a full PRD for a 2-hour bug fix
2. **Under-governance**: Shipping a payment change without a tech design

---

## Inputs

| Input | Source |
|---|---|
| `lane_selection.confirmed_lane` | Output of LANE_SELECTION_ENGINE.md |
| `classification.blocking_flags` | Output of CLASSIFICATION_ENGINE.md Step 8 |
| `classification.request_type` | Output of CLASSIFICATION_ENGINE.md Step 3 |
| Request scope (stories, modules affected) | From request object |

---

## Artifact Requirement Matrix

### Fast Fix

| Artifact | Required? |
|---|---|
| Bug object (`objects/bugs/`) | Required |
| Single-sentence acceptance criteria | Required |
| Reproduction steps | Required |
| Code review (1 engineer) | Required |
| Quick fix notes (inline in `/product-devplan`) | Required |
| QA smoke check | Required |
| PRD | Not needed |
| Tech design | Not needed |
| Design brief | Not needed |
| Full QA test plan | Not needed — smoke test only |
| UAT run | Not needed |
| UAT sign-off | Not needed |
| Measurement plan | Not needed |
| Support handover | Not needed |
| Release object | Not needed — unless bundled into a release |

**Exception**: If fast fix touches auth, payments, or schema → upgrade to Small Enhancement minimum.

**QA Status Transition Gate (Lane 1 — Bug Fast Fix):**

Before `/product-qa` can mark a Lane 1 bug as Resolved, the following gate must be cleared:

| Source Bug fix_status | Action |
|---|---|
| `Fixed` | Gate cleared — proceed. Allow status transition to Resolved if all smoke check test cases pass. |
| `Merged` | Gate cleared — proceed. |
| `Ready for QA` | Gate cleared — proceed. |
| `Open`, `In Progress`, or any other value | Gate NOT cleared. In dry-run: output STATUS UPDATE DEFERRED block; do not preview status transition. In live: warn and ask for confirmation. |

This gate applies in both live and dry-run mode. Skipping this check is a protocol violation.

---

### Small Enhancement

| Artifact | Required? |
|---|---|
| Request object (`objects/requests/`) | Required |
| User story with acceptance criteria | Required |
| Design review (if UX change) | Required |
| Code review (1 engineer) | Required |
| QA sign-off | Required |
| PRD | Not needed |
| Tech design | Recommended if non-trivial |
| Measurement plan | Recommended if metric-impacting |
| Support handover | Required if customer-facing UX change |
| Feature flag | Not needed (unless high risk) |

---

### Standard Feature

| Artifact | Required? |
|---|---|
| Request object | Required |
| PRD | Required |
| User stories (all) | Required |
| Tech design | Required if schema/API changes; Recommended otherwise |
| Design brief + Figma handoff | Required (if customer-facing) |
| Code review (Engineering Lead + 1) | Required |
| QA test plan + execution | Required |
| UAT sign-off (Product Lead) | Required |
| Measurement plan | Required |
| Support handover | Required |
| Release object | Required |
| Feature flag | Recommended |
| Operations readiness checklist | Required if ops or delivery staff are involved; Not needed for pure frontend/backend features with no ops workflow |
| Business case | Recommended if engineering investment exceeds 1 sprint or requires budget sign-off; Not needed for internal product improvements with no stakeholder approval step |

---

### Strategic Initiative

Everything from Standard Feature, plus:

| Artifact | Required? |
|---|---|
| OKR linkage (`objects/okrs/`) | Required |
| Epic breakdown | Required |
| Capacity plan | Required |
| Stakeholder communication plan | Required |
| Post-release review | Required |
| Business Owner sign-off | Required |
| Discovery session (`objects/discovery/`) | Required if input contains discovery framing ("for discovery", "evaluate", "start discovery") — created during `/product-prd`, not at intake |

---

### Incident

| Artifact | Required? |
|---|---|
| Incident object (`objects/incidents/`) | Required |
| Timeline (chronological events) | Required |
| RCA (`objects/rcas/`) | Required (P1/P2) |
| Customer communication | Required (P1/P2 with wide impact) |
| Prevention action items | Required |
| Detection improvement items | Required |

---

### Experiment

| Artifact | Required? |
|---|---|
| Experiment object (`objects/experiments/`) | Required |
| Hypothesis statement | Required |
| Feature flag (`objects/feature-flags/`) | Required |
| Measurement plan | Required |
| Statistical significance threshold | Required |
| Minimum run duration defined | Required |

---

### Tech Debt

| Artifact | Required? |
|---|---|
| Request object (type: tech_debt) | Required |
| Tech design (why this approach) | Required |
| Test coverage delta | Required |
| Code review (Engineering Lead) | Required |
| PRD | Not needed |
| Support handover | Not needed |
| Measurement plan | Not needed |

---

## Blocking Flag Artifact Modifiers

These flags add additional required artifacts regardless of lane:

| Blocking Flag | Additional Required Artifact |
|---|---|
| `schema_change` | Tech design (Required) + Data migration object (`objects/data-migrations/`) |
| `payment_change` | Tech design (Required) + Engineering Lead mandatory code review + Security review (Required) |
| `security_change` | Security review sign-off (Required) |
| `breaking_api_change` | API contract object (`objects/api-contracts/`) (Required) |
| `integration_change` | API contract object (Required) + Tech design (Required) |
| `role_change` | Security review (Required) |
| `data_migration` | Data migration object + rollback plan (both Required) |

---

## Lane 4 Risk Object Planning

When `confirmed_lane == Lane 4` AND any of the following blocking flags are present, plan risk objects to be created during `/product-impact` or `/product-prd`. These are NOT created at intake — listing them at intake is for planning awareness only.

| Blocking Flag | Planned Risk Objects |
|---|---|
| `payment_change` | Webhook verification failure, Payment failure / retry gap, Refund / reconciliation mismatch, API key / secret exposure |
| `integration_change` | Third-party API availability (checkout blocked on outage), SDK version drift (breaking changes on upgrade) |
| `security_change` | Auth bypass via payment flow, Session fixation on payment redirect, Sensitive data exposure |
| `schema_change` (at Lane 4) | Data migration failure, Rollback plan gap |

Surface these in the intake output under `PLANNED RISK OBJECTS` as planning guidance.
Actual risk objects (`RSK-{AREA}-{MODULE}-{SLUG}-{SEQ}.md`) are created during impact assessment.
Path: `product/objects/risks/RSK-{AREA}-{MODULE}-{SLUG}-{SEQ}.md`

---

## Known Module State Architecture

Before applying blocking flag modifiers, check these known architecture facts. They prevent incorrect `schema_change` flags from being set for frontend-only behavior.

| Module / Area | State Management | Notes |
|---|---|---|
| MA-COM-CART (Cart) | Zustand / localStorage | `cart (Convex)` in MOD-COM workspace is "Future Candidate — not yet created". Do NOT set `schema_change` for cart quantity behavior. |
| MA-COM-PLP, MA-COM-PDP | Convex (products table) | Stock quantity reads from products table. `stockQuantity` or equivalent field. |
| MA-COM-CHK (Checkout) | Convex (orders table) | Schema exists. Changes to checkout flow may touch orders table — check DATA_ENTITY_MAP. |
| MA-COM-PROFILE | Convex (users table via Clerk) | Auth-linked. `role_change` may apply for permission-level changes. |

**Rule:** If the affected module uses Zustand/localStorage (not Convex), do not set `schema_change` for frontend behavior bugs or enhancements. Only set `schema_change` if a new Convex table or field is explicitly required.

---

## Artifact Category Consistency Rule

Every artifact in any output block must appear in **exactly one** of these three categories:

- **Required** — work cannot ship without this artifact
- **Recommended** — strongly advised but not a blocker
- **Not needed** — explicitly excluded for this lane/context

**An artifact that appears in more than one category is a classification error.** Resolve conflicts using the decision tables below before producing output.

### Business Case

| Condition | Category |
|---|---|
| Lane 4 (Strategic Initiative) — always | Required |
| Lane 3 + explicit stakeholder/budget approval needed | Required |
| Lane 3 + internal improvement, no formal approval step | Recommended |
| Lane 1 or Lane 2 — any reason | Not needed |

Pick exactly one. Do not list business case as both Recommended and Not needed.

### Security Review

| Condition | Category |
|---|---|
| `payment_change` flag set | Required |
| `security_change` flag set | Required |
| `role_change` flag set | Required |
| Integration with external auth or payment system | Required |
| No security-related flags | Not needed |

### Technical Design

| Condition | Category |
|---|---|
| `schema_change`, `breaking_api_change`, `integration_change`, or `payment_change` flag | Required |
| Complex implementation with no flags | Recommended |
| Lane 1 or Lane 2, no flags | Not needed |

### Operations Readiness Checklist

| Condition | Category |
|---|---|
| Feature involves delivery staff, warehouse ops, or customer support workflow change | Required |
| Admin-only feature with no ops workflow impact | Not needed |

---

## Output

```yaml
artifact_requirements:
  required:
    - artifact: "PRD"
      object_type: "objects/prds/"
      template: "product/os/templates/PRD_OBJECT_TEMPLATE.md"
      status: "not_started | in_progress | complete"
    # ... additional required artifacts
  recommended:
    - artifact: "Tech Design"
      reason: "Complex implementation with database changes"
  not_needed:
    - artifact: "OKR linkage"
      reason: "Lane is Small Enhancement — OKR linkage not required"
  flag_additions:
    - artifact: "Data Migration Object"
      reason: "schema_change flag is set"
```

---

## Related Files

- `LANE_SELECTION_ENGINE.md` — Provides confirmed lane
- `CLASSIFICATION_ENGINE.md` — Provides blocking flags
- `product/os/policies/WORK_TYPE_LANES.md` — Full artifact requirements table
- `product/os/templates/` — Templates for all artifact types
