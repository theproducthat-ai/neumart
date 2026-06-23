# Nuemart Product OS — Executive View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

High-level product status for stakeholder review. Updated after significant milestones. Full detail lives in the feature-level views.

---

## Product Health Summary (as of 2026-06-22)

| Area | Status | Notes |
|---|---|---|
| MVP Build | Complete (Phases 1–10) | All core shopping, admin, and inventory features live |
| Current Active Development | Carousel in UAT | 1 gate remaining before release |
| Payment Integration | Blocked — external | Razorpay merchant account approval pending |
| Next Major Feature | Delivery Management MVP | Planned, not started; sequenced after Razorpay |

---

## Feature Pipeline

| Feature | Status | ETA |
|---|---|---|
| Promotional Banner Carousel | In UAT — 1 gate remaining (Product Owner sign-off) | Near-term — after sign-off |
| Razorpay Payment Integration | Blocked (external — merchant account) | TBD — depends on Razorpay approval timeline |
| Delivery Management MVP | Planned — PRD approved, not started | After Razorpay Phase 11 |
| Coupon System | Under Evaluation — no formal scope yet | TBD |
| Subscription / Membership | Under Evaluation — no formal scope yet | TBD |
| Notification System | Candidate | TBD |

---

## Product Metrics Targets

These are the North Star metrics for Nuemart. All features should be evaluated for their impact on these metrics.

| Metric | Type | Notes |
|---|---|---|
| Orders placed per month | Primary — North Star | Core revenue driver; tracks whether the product is delivering value |
| Active users (MAU/DAU) | Secondary | Growth indicator; feeds order metric |
| Cart conversion rate | Secondary | Quality of checkout and discovery experience |

---

## Risks to Track

| Risk | Level | Impact | Mitigation |
|---|---|---|---|
| Razorpay merchant account delay | High | Blocks payment integration and Delivery Module sequencing; directly impacts revenue | Monitor Razorpay application; identify fallback payment timeline if delay exceeds 4 weeks |
| Delivery Module schema complexity | Medium | New Convex tables and mutations; risk of regression in order flow | Ensure comprehensive QA run before release; test order-to-delivery handoff end-to-end |
| PRD-COM-PLP-CAROUSEL-V1 formal approval gap | Low | Compliance gap in governance record | Product Owner to confirm approval formally before release |

---

## Next Decisions Needed

| Decision | Owner | Priority | Notes |
|---|---|---|---|
| UAT sign-off on Carousel | Product Owner | High — blocks release | Run `/product-uat` to formally record sign-off |
| Razorpay Phase 11 timeline | Product Owner + Razorpay | High — blocks payment & delivery | Dependent on merchant account approval |
| Coupon system evaluation priority | Product Owner | Medium | Should a formal Request be raised now, or wait until after Delivery Module? |
| Retroactive Feature Object creation for MVP features | Engineering / Product | Low | Non-blocking; improves product knowledge base |
