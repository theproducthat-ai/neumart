# Nuemart Product OS — Release View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## 1. Active Releases (Pending)

Releases that are in progress and waiting for a gate to clear before shipping.

| Release ID | Feature(s) | Status | Blocking Gate | Next Action |
|---|---|---|---|---|
| RELEASE-COM-PLP-CAROUSEL-2026-06 | FEATURE-COM-PLP-CAROUSEL | ✅ G7 Cleared — Ready to release | G8 — Final release sign-off | Run `/product-release REQ-0002` |

---

## 2. Completed Releases

None formally released through the Product OS.

> **Note:** The codebase is fully deployed and committed in git. Phases 1–10 represent product releases, but they predate the Product OS and were not tracked as formal Release Objects. Their history is captured in git commit history. These phases should be retroactively documented as Release Objects as part of the ongoing migration — see `product/os/MIGRATION_FROM_LEGACY_PRODUCT_OS.md`.

---

## 3. Upcoming Planned Releases

| Release ID | Feature / Phase | Status | Dependency |
|---|---|---|---|
| RELEASE-PAY-CORE-RAZORPAY-2026 | Phase 11 — Razorpay integration | Not planned yet — blocked externally | Razorpay merchant account approval |
| RELEASE-DEL-CORE-MVP-2026 | FEATURE-DEL-CORE-DELIVERY-MVP | Not planned yet | Sequenced after Razorpay Phase 11; development not started |

---

## 4. Release Gates Status

### RELEASE-COM-PLP-CAROUSEL-2026-06

| Gate | Gate Name | Status | Notes |
|---|---|---|---|
| G5 | Stories Approved | Done | 6 user stories (US-0009–US-0014) approved |
| G6 | Development Complete | Done | All carousel stories implemented |
| G7 | QA Passed | QA Done — UAT In Progress | QA: 20/20 passed. UAT: sign-off pending |
| G8 | Release Gate | Pending | Awaiting G7 UAT sign-off to proceed |
| G9 | Post-Release Monitoring | Not Started | After release |

---

## 5. How to Maintain This View

- Update **Section 1** after any `/product-uat` sign-off or `/product-release` run
- Move releases from Section 1 to Section 2 once formally shipped
- Add entries to Section 3 when new releases are planned (after PRD approval)
- Update Section 4 gate tables after each `/product-qa`, `/product-uat`, and `/product-release` run

The authoritative release record lives in `product/objects/releases/`. This view is a derived summary.
