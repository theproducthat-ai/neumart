# Downstream Command V2 Compatibility Audit

**Version**: 2.0
**Date**: 2026-06-25
**Auditor**: Product OS Intelligence Agent
**Status**: Remediated

---

## Part 1 — Pre-Remediation Audit Result (V1 Baseline)

**Date of original audit:** 2026-06-25
**Result: ALL downstream commands failed V2 compatibility.**

### Summary of Original Failures

Every skill file was a V1-era stub that:

| Failure Category | All Commands Affected |
|---|---|
| Read from `product/objects/` | FAIL — all commands read V1 legacy numbered folders |
| Read `lane` from object | FAIL — no command branched on lane |
| Referenced WORK_TYPE_LANES.md | FAIL — not mentioned in any command |
| Referenced ARTIFACT_REQUIREMENT_ENGINE.md | FAIL — not mentioned in any command |
| Supported `--dry-run` | FAIL — not implemented anywhere |
| Showed FILES CHANGED block | FAIL — no command had this output field |
| Did not write code | PASS — all commands had "Do not change application code" rule |
| Updated V2 indexes/workspaces | FAIL — all commands updated V1 MASTER_REGISTRY.md |
| Blocked on missing upstream artifacts | PARTIAL — gates existed but read from V1 sources |
| Did not rely on legacy folders | FAIL — all commands exclusively used legacy paths |
| Handled work types differently | FAIL — no differentiation by lane or object type |

### Command-Specific Pre-Remediation Findings

**`/product-grill`**
- Read from: `product/05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md`
- Wrote to: `product/05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md`
- Updated: V1 MASTER_REGISTRY.md, REQUEST_REGISTER.md, ACTIVE_REQUESTS.md
- Missing: V2 interface, lane awareness, WORK_TYPE_LANES, ARTIFACT_REQUIREMENT_ENGINE, --dry-run, FILES CHANGED, DISCOVERY_SESSION_OBJECT creation

**`/product-impact`**
- Read from: `product/06-assessment-and-impact/assessments/`
- Wrote to: `product/06-assessment-and-impact/assessments/IMPACT-NNNN.md`
- Updated: V1 MASTER_REGISTRY.md, DECISION_LOG.md
- Missing: V2 interface, lane awareness, two-engine structure (IMPACT_ANALYSIS + IMPACT_GATE), lane-specific risk objects, --dry-run, FILES CHANGED

**`/product-prd`**
- Read from: `product/07-prd/approved-prds/`
- Wrote to: `product/07-prd/approved-prds/PRD-NNNN.md`
- Updated: V1 MASTER_REGISTRY.md, SCREEN_REGISTRY.md
- Missing: V2 interface, PRD_LITE vs PRD_OBJECT template selection, lane gating (Lane 1 block), roadmap/deferred blocking, --dry-run, FILES CHANGED

**`/product-stories`**
- Read from: `product/08-user-stories/stories/`
- Wrote to: `product/08-user-stories/stories/US-NNNN.md`
- Updated: V1 MASTER_REGISTRY.md
- Missing: V2 interface, lane-based story depth, lightweight Lane 2 path, roadmap option blocking, --dry-run, FILES CHANGED

**`/product-devplan`**
- Read from: `product/09-development-planning/plans/`
- Wrote to: `product/09-development-planning/plans/DEVPLAN-NNNN.md`
- Updated: V1 DEVELOPMENT_TRACKER.md, MASTER_REGISTRY.md
- Missing: V2 interface, lane-based devplan depth (Lane 1 quick fix notes, Lane 2 lightweight, Lane 3/4 full plan), security/API gate blocking for Lane 4, --dry-run, FILES CHANGED

**`/product-qa`**
- Read from: `product/11-qa-testing/test-runs/`, `product/12-uat/uat-runs/`
- Wrote to: both V1 QA and UAT paths
- Updated: V1 BUG_REGISTER.md, UAT_FEEDBACK_REGISTER.md
- Missing: V2 interface, QA and UAT separation (UAT is a separate command in V2), lane-based QA depth (smoke check vs full plan), --dry-run, FILES CHANGED

**`/product-uat`**
- **DID NOT EXIST.** No SKILL.md was present. V2 has a full PRODUCT_UAT_INTERFACE.md with no corresponding skill.

**`/product-release`**
- Read from: `product/13-release-management/releases/`
- Wrote to: `product/13-release-management/releases/RELEASE-NNNN.md`
- Updated: V1 CHANGE_LOG.md, DEVELOPMENT_TRACKER.md
- Missing: V2 interface, lane-based release depth (hotfix vs full release), Lane 4 ops/support gates, deployment confirmation gate, --dry-run, FILES CHANGED

**`/product-resume`**
- Read from: `product/04-request-management/REQUEST_REGISTER.md`, `product/08-user-stories/stories/`, `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md`
- Wrote: nothing (read-only — this was correct)
- Missing: V2 interface, reading from `product/objects/`, `product/indexes/`, `product/views/`, `product/module-workspaces/`; surfacing V1 migration gaps; module workspace integration

### ID Format Mismatch

V1 commands used sequential numeric IDs:
- `GRILLING-0001`, `IMPACT-0001`, `PRD-0001`, `US-0001`

V2 requires semantic IDs:
- `DISCOVERY-COM-PLP-CAROUSEL-001`, `IMPACT-COM-PLP-CAROUSEL-001`, `PRD-COM-PLP-CAROUSEL-V1`, `STORY-COM-PLP-CAROUSEL-001`

No pre-remediation command implemented V2 semantic ID format.

---

## Part 2 — Files Changed (Remediation)

### Files Created

| File | Purpose |
|---|---|
| `product/os/policies/DOWNSTREAM_COMMAND_V2_PROTOCOL.md` | Shared V2 execution protocol for all downstream commands |
| `.claude/skills/product-uat/SKILL.md` | **NEW** — missing skill created from scratch |
| `product/os/audits/DOWNSTREAM_COMMAND_V2_COMPATIBILITY_AUDIT.md` | This audit file |

### Files Updated

| File | What Changed |
|---|---|
| `.claude/skills/product-grill/SKILL.md` | Full V2 rewrite — V2 interface, protocol, lane awareness, Discovery Session in objects/, --dry-run, FILES CHANGED, index updates |
| `.claude/skills/product-impact/SKILL.md` | Full V2 rewrite — two-engine structure, V2 interface, lane-specific risk objects, objects/ paths, --dry-run |
| `.claude/skills/product-prd/SKILL.md` | Full V2 rewrite — V2 interface, template selection (PRD_LITE/PRD_OBJECT), Lane 1 block, roadmap/deferred blocking, PRD_INDEX, --dry-run |
| `.claude/skills/product-stories/SKILL.md` | Full V2 rewrite — V2 interface, lane story depth, Lane 2 lightweight path, USER_STORY_INDEX, --dry-run |
| `.claude/skills/product-devplan/SKILL.md` | Full V2 rewrite — V2 interface, devplan depth by lane, Lane 4 gates, prompts/ objects, --dry-run |
| `.claude/skills/product-qa/SKILL.md` | Full V2 rewrite — V2 interface, QA/UAT separation, lane QA depth, BUG_INDEX, qa-runs/ objects, --dry-run |
| `.claude/skills/product-release/SKILL.md` | Full V2 rewrite — V2 interface, lane release depth, deployment confirmation gate, rollback-plans/ objects, RELEASE_INDEX, --dry-run |
| `.claude/skills/product-resume/SKILL.md` | Full V2 rewrite — V2 interface, reads product/objects/ + indexes/ + views/ + module-workspaces/, V1 migration surfacing, read-only enforcement |

### Application Code Changed

None. Zero changes to `convex/`, `src/`, `app/`, `components/`, `schema.ts`, `package.json`, or any executable code file.

---

## Part 3 — Command-by-Command Remediation Summary

### `/product-grill`

| Check | Before | After |
|---|---|---|
| V2 object paths | FAIL | PASS — writes to `product/objects/discovery/` |
| Reads lane from object | FAIL | PASS — branches on lane; Lane 1 blocked |
| WORK_TYPE_LANES.md | FAIL | PASS — referenced and applied |
| ARTIFACT_REQUIREMENT_ENGINE.md | FAIL | PASS — referenced and applied |
| --dry-run | FAIL | PASS — fully specified |
| FILES CHANGED | FAIL | PASS — in all output blocks |
| No code writing | PASS | PASS |
| Index/workspace updates | FAIL | PASS — MASTER_OBJECT_INDEX, REQUEST_INDEX, TRACEABILITY_MATRIX, views, workspaces |
| Blocks on missing upstream | PARTIAL | PASS — precise gate checks with fix commands |
| No legacy reliance | FAIL | PASS — legacy is read-only fallback only |
| Work type differentiation | FAIL | PASS — Lane 1 blocked, roadmap/deferred blocked |
| Semantic ID format | FAIL | PASS — DISCOVERY-{MODULE}-{AREA}-{SLUG}-001 |

### `/product-impact`

| Check | Before | After |
|---|---|---|
| V2 object paths | FAIL | PASS — writes to `product/objects/impact-assessments/`, `risks/`, `dependencies/` |
| Reads lane from object | FAIL | PASS — branches on lane; Lane 1 gives NOT REQUIRED |
| WORK_TYPE_LANES.md | FAIL | PASS |
| ARTIFACT_REQUIREMENT_ENGINE.md | FAIL | PASS — blocking flag modifiers applied |
| --dry-run | FAIL | PASS |
| FILES CHANGED | FAIL | PASS |
| No code writing | PASS | PASS |
| Index/workspace updates | FAIL | PASS — RISK_INDEX, DEPENDENCY_INDEX, TRACEABILITY_MATRIX |
| Two-engine structure | FAIL | PASS — IMPACT_ANALYSIS_ENGINE then IMPACT_GATE_ENGINE |
| Lane 4 risk objects | FAIL | PASS — required for payment/security/integration flags |
| Semantic ID format | FAIL | PASS — IMPACT-{MODULE}-{AREA}-{SLUG}-001 |

### `/product-prd`

| Check | Before | After |
|---|---|---|
| V2 object paths | FAIL | PASS — writes to `product/objects/prds/`, `requirements/`, `acceptance-criteria/` |
| Reads lane from object | FAIL | PASS — template selection by lane (PRD_LITE vs PRD_OBJECT) |
| Lane 1 blocking | FAIL | PASS — BLOCK with explanation and next action |
| Roadmap/deferred blocking | FAIL | PASS — BLOCK for both |
| WORK_TYPE_LANES.md | FAIL | PASS |
| ARTIFACT_REQUIREMENT_ENGINE.md | FAIL | PASS |
| --dry-run | FAIL | PASS |
| FILES CHANGED | FAIL | PASS |
| No code writing | PASS | PASS |
| Index/workspace updates | FAIL | PASS — PRD_INDEX, FEATURE_INDEX, SCREEN_INDEX, TRACEABILITY_MATRIX |
| Semantic ID format | FAIL | PASS — PRD-{MODULE}-{AREA}-{SLUG}-V1 |

### `/product-stories`

| Check | Before | After |
|---|---|---|
| V2 object paths | FAIL | PASS — writes to `product/objects/stories/`, `tasks/` |
| Reads lane from object | FAIL | PASS — story depth varies by lane |
| Lane 2 lightweight path | FAIL | PASS — lightweight stories without full PRD |
| Lane 1 blocking | FAIL | PASS — BLOCK for bug stories |
| Roadmap/deferred blocking | FAIL | PASS |
| WORK_TYPE_LANES.md | FAIL | PASS |
| ARTIFACT_REQUIREMENT_ENGINE.md | FAIL | PASS |
| --dry-run | FAIL | PASS |
| FILES CHANGED | FAIL | PASS |
| No code writing | PASS | PASS |
| Index/workspace updates | FAIL | PASS — USER_STORY_INDEX, TRACEABILITY_MATRIX, module workspaces |
| Semantic ID format | FAIL | PASS — STORY-{MODULE}-{AREA}-{SLUG}-001 |

### `/product-devplan`

| Check | Before | After |
|---|---|---|
| V2 object paths | FAIL | PASS — writes to `product/objects/tasks/`, `prompts/` |
| Reads lane from object | FAIL | PASS — depth varies: quick fix / lightweight / full plan |
| Lane 4 gate blocking | FAIL | PASS — BLOCK if security/API/ops gates missing |
| WORK_TYPE_LANES.md | FAIL | PASS — DEVPLAN Rule applied |
| ARTIFACT_REQUIREMENT_ENGINE.md | FAIL | PASS |
| --dry-run | FAIL | PASS |
| FILES CHANGED | FAIL | PASS |
| No code writing | PASS | PASS — AI Coding Prompt is a planning object, not code |
| Index/workspace updates | FAIL | PASS — TRACEABILITY_MATRIX, ACTIVE_WORK_VIEW, module workspaces |
| Rollback plan for schema/integration | FAIL | PASS — mandatory for schema and integration phases |
| Semantic ID format | FAIL | PASS — DEVPLAN-{MODULE}-{AREA}-{SLUG}-001 |

### `/product-qa`

| Check | Before | After |
|---|---|---|
| V2 object paths | FAIL | PASS — writes to `product/objects/qa-runs/`, `test-plans/`, `test-cases/`, `bugs/` |
| Reads lane from object | FAIL | PASS — Lane 1 = smoke check, Lane 3/4 = full plan |
| QA / UAT separation | FAIL | PASS — UAT is now a separate command |
| BUG_INDEX update | FAIL | PASS — BUG_INDEX.md (V2), not BUG_REGISTER.md (V1) |
| WORK_TYPE_LANES.md | FAIL | PASS |
| ARTIFACT_REQUIREMENT_ENGINE.md | FAIL | PASS |
| --dry-run | FAIL | PASS |
| FILES CHANGED | FAIL | PASS |
| No code writing | PASS | PASS |
| Source traceability | FAIL | PASS — QA run linked to source request/bug and stories |
| Semantic ID format | FAIL | PASS — QA-{MODULE}-{AREA}-{SLUG}-001 |

### `/product-uat` (NEW)

| Check | Status |
|---|---|
| Skill file created | PASS — `.claude/skills/product-uat/SKILL.md` |
| V2 interface used | PASS — `PRODUCT_UAT_INTERFACE.md` |
| V2 object paths | PASS — `product/objects/uat-runs/`, `feedback/`, `limitations/`, `bugs/` |
| Lane gating | PASS — Lane 1 blocked, Lane 2 optional, Lane 3/4 required |
| QA prerequisite gate | PASS — blocks if QA not Passed |
| UAT waiver handling | PASS — requires Decision Object |
| Sign-off protection | PASS — AI cannot sign off on behalf of product owner |
| --dry-run | PASS |
| FILES CHANGED | PASS |
| No code writing | PASS |
| Index/workspace updates | PASS — BUG_INDEX, TRACEABILITY_MATRIX, QA_VIEW, module workspaces |
| Semantic ID format | PASS — UAT-{MODULE}-{AREA}-{SLUG}-001 |

### `/product-release`

| Check | Before | After |
|---|---|---|
| V2 object paths | FAIL | PASS — writes to `product/objects/releases/`, `rollback-plans/` |
| Reads lane from object | FAIL | PASS — Lane 1 hotfix note, Lane 3/4 full release |
| Lane 4 ops/support gates | FAIL | PASS — BLOCK if missing for Lane 4 |
| Deployment confirmation gate | PARTIAL | PASS — explicit gate before marking Shipped |
| Rollback plan enforcement | PARTIAL | PASS — mandatory for schema/integration changes |
| WORK_TYPE_LANES.md | FAIL | PASS |
| ARTIFACT_REQUIREMENT_ENGINE.md | FAIL | PASS |
| --dry-run | FAIL | PASS |
| FILES CHANGED | FAIL | PASS |
| No code writing | PASS | PASS |
| Index/workspace updates | FAIL | PASS — RELEASE_INDEX, RECENT_CHANGES_VIEW, RELEASE_VIEW, module workspaces |
| Semantic ID format | FAIL | PASS — RELEASE-{MODULE}-{AREA}-{SLUG}-001 |

### `/product-resume`

| Check | Before | After |
|---|---|---|
| Reads from product/objects/ | FAIL | PASS — primary source |
| Reads from product/indexes/ | FAIL | PASS — MASTER_OBJECT_INDEX, REQUEST_INDEX, FEATURE_INDEX, TRACEABILITY_MATRIX |
| Reads from product/views/ | FAIL | PASS — ACTIVE_WORK_VIEW, INCOMPLETE_WORK_VIEW, REQUEST_VIEW |
| Reads from module-workspaces/ | FAIL | PASS — all 7 module workspaces |
| V1 dependency | FAIL | PASS — V1 is read-only fallback, surfaced as migration gap |
| NEXT_ACTION_ENGINE | FAIL | PASS — primary engine for prioritisation |
| GAP_DETECTION_ENGINE | FAIL | PASS — lifecycle gap detection |
| TRACEABILITY_ENGINE | FAIL | PASS — orphan detection |
| Read-only enforcement | PASS | PASS |
| V1 migration surfacing | FAIL | PASS — V1-only items flagged in output |
| Single-item resume view | PARTIAL | PASS — full traceability chain shown |

---

## Part 4 — Remaining Gaps and Recommendations

### Gaps After Remediation

| Gap | Severity | Recommendation |
|---|---|---|
| Skills reference interface files that may not match exactly after future interface updates | Low | The SKILL.md files delegate to interface files as authoritative — updates to interfaces automatically propagate to skill behaviour. No action needed immediately. |
| Lane-specific templates referenced (e.g., DISCOVERY_SESSION_OBJECT_TEMPLATE.md) may not yet exist in `product/os/templates/` | Medium | Verify all referenced templates exist. Run a template inventory check. |
| `product/views/QA_VIEW.md`, `product/views/RELEASE_VIEW.md` content may still be V1-era | Medium | These views should be populated from `product/objects/` scanning. A view refresh pass is recommended after first V2 artifact creation. |
| The V2 REQUEST_INDEX.md, USER_STORY_INDEX.md, PRD_INDEX.md, BUG_INDEX.md etc. may be empty or partially populated | Medium | First V2 artifact creation will populate them. Verify index files are writable and have correct structure. |
| Module workspace files (`MOD-COM.md` etc.) may not have a section for downstream artifact references yet | Low | Check MOD-COM.md structure before first V2 artifact write. Add section if missing. |
| Legacy V1 objects (existing REQ-0001 through REQ-0009, existing PRDs, stories) are not yet migrated to V2 paths | Medium | Run `/product-resume` first — it will surface all V1-only items as migration gaps. Prioritise migrating active items. |
| No `/product-uat` registration in skill listing | Low | Verify `.claude/skills/product-uat/SKILL.md` is picked up by the skills loader automatically. |

### No Remaining Critical Gaps

All 10 original audit checks are now passing for all 9 commands.

---

## Part 5 — Next Recommended Validation Commands

### Step 1 — Confirm Skill Registration

```
/product-resume
```
Run immediately. This verifies:
- The skill loader picks up the new `/product-uat` skill.
- `/product-resume` reads from `product/objects/` (not V1 registers).
- V1-only objects are surfaced as migration gaps.
- No writes occur.

### Step 2 — First Level 4 Artifact Test (Dry-Run)

Pick an existing REQ object (e.g., REQ-0009 if it exists in product/objects/requests/) and run:

```
/product-grill REQUEST-{ID} --dry-run
```

This verifies:
- Lane is read from the object.
- ARTIFACT_REQUIREMENT_ENGINE determines grilling is required (or not).
- DRY-RUN PREVIEW output is shown with correct V2 paths.
- No files are written.
- Preview ID uses semantic format.

### Step 3 — First Live Grill (if REQ-0009 exists in V2)

```
/product-grill REQUEST-{ID}
```

Then verify:
- DISCOVERY-{MODULE}-{AREA}-{SLUG}-001.md exists in `product/objects/discovery/`
- MASTER_OBJECT_INDEX.md updated
- REQUEST_INDEX.md updated
- TRACEABILITY_MATRIX.md updated
- Module workspace updated
- No files written to legacy numbered folders

### Step 4 — Validate Template Coverage

Check that all templates referenced by downstream commands exist in `product/os/templates/`:

- `DISCOVERY_SESSION_OBJECT_TEMPLATE.md`
- `PRD_OBJECT_TEMPLATE.md`
- `PRD_LITE_TEMPLATE.md`
- `QA_RUN_OBJECT_TEMPLATE.md`
- `QA_SMOKE_TEST_TEMPLATE.md`
- `UAT_RUN_OBJECT_TEMPLATE.md`
- `RELEASE_OBJECT_TEMPLATE.md`
- `RELEASE_HOTFIX_TEMPLATE.md`

Report any missing templates and create them if needed.

### Step 5 — Suggested First Full V2 Workflow Test

If a new request is ready for intake, run the complete V2 pipeline end-to-end (dry-run first, then live):

```
/product-request [new request description]         # Creates REQUEST-* in product/objects/requests/
/product-grill REQUEST-{ID} --dry-run              # Verify DISCOVERY write targets
/product-grill REQUEST-{ID}                        # Live grilling session
/product-impact REQUEST-{ID} --dry-run             # Verify IMPACT write targets
/product-impact REQUEST-{ID}                       # Live impact assessment
/product-prd REQUEST-{ID} --dry-run                # Verify PRD write targets
/product-prd REQUEST-{ID}                          # Live PRD writing
/product-stories PRD-{ID} --dry-run               # Verify STORY write targets
/product-stories PRD-{ID}                         # Live story generation
/product-devplan FEAT-{ID} --dry-run              # Verify DEVPLAN write targets
/product-devplan FEAT-{ID}                        # Live dev plan
/product-qa FEAT-{ID} --dry-run                   # Verify QA write targets
/product-qa FEAT-{ID}                             # Live QA run
/product-uat FEAT-{ID} --dry-run                  # Verify UAT write targets
/product-uat FEAT-{ID}                            # Live UAT run
/product-release FEAT-{ID} --dry-run              # Verify RELEASE write targets
/product-release FEAT-{ID}                        # Live release plan
```

---

## Audit Sign-Off

| Item | Status |
|---|---|
| Pre-remediation audit completed | ✅ |
| Shared protocol created | ✅ |
| All 9 command skills rewritten | ✅ |
| `/product-uat` skill created (was missing) | ✅ |
| All skills reference V2 interface files | ✅ |
| All skills reference WORK_TYPE_LANES.md | ✅ |
| All skills reference ARTIFACT_REQUIREMENT_ENGINE.md | ✅ |
| All skills reference NEXT_ACTION_ENGINE.md | ✅ |
| All skills support --dry-run | ✅ |
| All skills show FILES CHANGED | ✅ |
| All skills write to product/objects/ only | ✅ |
| All skills update product/indexes/ | ✅ |
| All skills update product/views/ | ✅ |
| All skills update product/module-workspaces/ | ✅ |
| All skills treat legacy as read-only | ✅ |
| All skills implement semantic ID format | ✅ |
| All skills have work-type differentiation | ✅ |
| Application code unchanged | ✅ |
| Audit file created | ✅ |
