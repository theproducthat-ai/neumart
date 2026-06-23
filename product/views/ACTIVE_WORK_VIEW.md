# Nuemart Product OS — Active Work View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active — Updated daily

---

This view summarizes all currently active product work. It is derived from Object status in `product/objects/` and relationship links in `product/graph/`. If this view contradicts an object file, **the object file is the source of truth**.

---

## 1. Active Feature Work

| Feature ID | Name | Status | Blocking Issue | Next Action |
|---|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | Promotional Banner Carousel | ✅ UAT Conditional Pass — Ready for Release | None — gate G7 cleared 2026-06-23 | `/product-release REQ-0002` |
| FEATURE-DEL-CORE-DELIVERY-MVP | Delivery Management MVP | PRD Approved, Development Not Started | Sequenced after Razorpay Phase 11 | `/product-devplan` when ready to build |

---

## 2. Blocked Work

| Item | Blocked By | Since | Resolution |
|---|---|---|---|
| Phase 11 Razorpay integration | Razorpay merchant account approval (external) | 2026-06-21 | Await approval, then proceed with Phase 11 |
| FEATURE-DEL-CORE-DELIVERY-MVP development | Sequenced after Razorpay (product decision, not technical blocker) | — | Proceed after Phase 11 |

---

## 3. Pending Approvals

| Item | Approval Needed | Gate | Approver |
|---|---|---|---|
| PRD-COM-PLP-CAROUSEL-V1 | Formal PRD approval record | G4 | Product Owner (informal approval given, formal record missing) |
| RELEASE-COM-PLP-CAROUSEL-2026-06 | G8 Release gate sign-off | G8 | Product Owner — run `/product-release` |

---

## 4. Recently Completed Work

- **Phases 1–10:** Full MVP delivered — products, cart, checkout, orders, admin console, inventory management, authentication (Clerk)
- **FEATURE-COM-PLP-CAROUSEL:** Development complete, QA passed (20/20 tests), currently in UAT

---

## 5. Upcoming Work (Next)

1. **RELEASE-COM-PLP-CAROUSEL-2026-06** — After UAT sign-off
2. **Phase 11: Razorpay integration** — Awaiting merchant account approval (external dependency)
3. **FEATURE-DEL-CORE-DELIVERY-MVP development** — After Razorpay Phase 11 completes

---

## 6. How to Maintain This View

Update this view after each of the following slash command runs:

- `/product-request` — New request created or updated
- `/product-qa` — QA run completed or status changed
- `/product-uat` — UAT sign-off given or status changed
- `/product-release` — Release created or shipped
- `/product-resume` — Use to re-derive full active state if this view is stale

The authoritative state of each item lives in its Product Object file in `product/objects/`. This view is a derived summary only.
