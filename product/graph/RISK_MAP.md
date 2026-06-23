# Nuemart Product OS — Risk Map

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Introduction

This file is the central registry for all product and technical risks in Nuemart. Risks are tracked with semantic IDs, categorized, and linked to the objects they affect. Update this map when risks are identified, change status, or are closed.

---

## Risk Summary Table

| Risk ID | Name | Module | Level | Category | Status | Linked Object |
|---|---|---|---|---|---|---|
| RISK-PAY-CORE-MERCHANT-001 | Razorpay merchant account not approved | MODULE-PAY | High | External Dependency | Accepted — monitoring | MODULE-PAY, Phase 11 |
| RISK-DEL-SCHEMA-CHANGE-001 | deliveryTasks schema migration required | MODULE-DEL | High | Technical | Identified — mitigated in plan | FEATURE-DEL-CORE-DELIVERY-MVP, ENTITY-DEL-DELIVERYTASKS |
| RISK-DEL-MUTATION-CHANGE-001 | placeOrder mutation modification required | MODULE-DEL | Medium | Technical | Identified — mitigated in plan | FEATURE-DEL-CORE-DELIVERY-MVP, ENTITY-COM-ORDERS |
| RISK-PAY-STOCK-TIMING-001 | Stock reduced at placement, not at payment | MODULE-INV | Medium | Business Logic | Accepted — temporary, mitigated in Phase 11 | DEC-007, MODULE-INV |
| RISK-COM-PLP-CAROUSEL-PERF-001 | External image URLs causing slow load on poor connections | FEATURE-COM-PLP-CAROUSEL | Low | Performance | Identified — accepted | FEATURE-COM-PLP-CAROUSEL |
| RISK-COM-PLP-CAROUSEL-MOBILE-001 | Swipe gesture conflict with page scroll on mobile | FEATURE-COM-PLP-CAROUSEL | Low | UX | Mitigated — tested in QA | FEATURE-COM-PLP-CAROUSEL, QA-COM-PLP-CAROUSEL-RUN-001 |
| RISK-COM-PLP-CAROUSEL-HARDCODE-001 | Hardcoded banners require code deploy to change | FEATURE-COM-PLP-CAROUSEL | Low | Operational | Accepted — known limitation V1 | FEATURE-COM-PLP-CAROUSEL |
| RISK-DEL-SEQUENCE-001 | Delivery dev blocked by Phase 11 sequencing preference | MODULE-DEL | Medium | Schedule | Accepted — sequencing preference not technical blocker | FEATURE-DEL-CORE-DELIVERY-MVP |
| RISK-UAT-CAROUSEL-SIGNOFF-001 | UAT sign-off pending — Carousel not released yet | FEATURE-COM-PLP-CAROUSEL | Low | Process | Active — awaiting sign-off | UAT-COM-PLP-CAROUSEL-RUN-001 |
| RISK-PRD-CAROUSEL-APPROVAL-001 | PRD-COM-PLP-CAROUSEL-V1 shows Draft status despite completed dev | FEATURE-COM-PLP-CAROUSEL | Low | Process | Identified — needs clarification | PRD-COM-PLP-CAROUSEL-V1 |

---

## Risk Detail

---

### RISK-PAY-CORE-MERCHANT-001

**Name:** Razorpay merchant account not yet approved
**Module:** MODULE-PAY
**Risk Level:** High
**Category:** External Dependency / Business
**Status:** Accepted — monitoring
**Description:** Phase 11 (Razorpay integration) is fully designed, planned, and code-ready, but cannot be activated until Razorpay approves the merchant account. No ETA provided by Razorpay. All customer transactions are currently on Pay Later (no real payment collected).
**Impact if unresolved:** Nuemart cannot collect online payments indefinitely. Revenue at risk if Pay Later abuse occurs.
**Mitigation:** Business team to follow up with Razorpay; Pay Later serves as fallback. Phase 11 code is ready to activate as soon as credentials are available.
**Owner:** Business / Founder
**Date Identified:** Phase 5
**Linked objects:** MODULE-PAY, DEC-005

---

### RISK-DEL-SCHEMA-CHANGE-001

**Name:** deliveryTasks schema migration required for Delivery MVP
**Module:** MODULE-DEL
**Risk Level:** High
**Category:** Technical — Schema Change
**Status:** Identified — included in delivery plan
**Description:** The Delivery MVP requires a new `deliveryTasks` table in the Convex schema. Convex schema migrations on a live database require care — type regeneration, backward-compatible changes, and coordinated deployment.
**Impact if mishandled:** Data loss, runtime errors, type mismatch between generated types and actual schema.
**Mitigation:** Schema migration is the first story in DEVPLAN-0001 (STORY-DEL-CORE-DELIVERY-SCHEMA-001). Atomic delivery task creation (DEC-012) ensures no orphaned records.
**Owner:** Engineering
**Date Identified:** 2026-06-21
**Linked objects:** FEATURE-DEL-CORE-DELIVERY-MVP, ENTITY-DEL-DELIVERYTASKS, STORY-DEL-CORE-DELIVERY-SCHEMA-001

---

### RISK-DEL-MUTATION-CHANGE-001

**Name:** placeOrder mutation must be modified for atomic delivery task creation
**Module:** MODULE-DEL
**Risk Level:** Medium
**Category:** Technical — Mutation Change
**Status:** Identified — mitigated in plan
**Description:** The existing `placeOrder` Convex mutation must be modified to atomically create a `deliveryTasks` record alongside the order. This is a change to a core, heavily-used mutation.
**Impact if done incorrectly:** Regression in order placement; delivery tasks not created; partial-failure state.
**Mitigation:** DEC-012 specifies atomic creation. STORY-DEL-CORE-DELIVERY-BACKEND-002 covers this change with test coverage.
**Owner:** Engineering
**Date Identified:** 2026-06-21
**Linked objects:** FEATURE-DEL-CORE-DELIVERY-MVP, ENTITY-COM-ORDERS, DEC-012

---

### RISK-PAY-STOCK-TIMING-001

**Name:** Stock reduced at order placement rather than at payment
**Module:** MODULE-INV
**Risk Level:** Medium
**Category:** Business Logic — MVP Workaround
**Status:** Accepted — temporary; resolved in Phase 11
**Description:** In the current Pay Later flow, stock is deducted when an order is placed, not when payment is confirmed. If a customer places an order but never pays, stock is still reduced, potentially causing false out-of-stock for other customers.
**Impact:** Possible stock over-reduction in high-traffic scenario; low risk for current scale.
**Mitigation:** DEC-007 documents this as a known temporary decision. Phase 11 shifts stock deduction to Razorpay webhook (`payment.captured`) with idempotency guard.
**Owner:** Engineering / Product
**Date Identified:** Phase 5
**Linked objects:** MODULE-INV, DEC-007

---

### RISK-COM-PLP-CAROUSEL-PERF-001

**Name:** External image URLs may cause slow banner load on poor connections
**Module:** FEATURE-COM-PLP-CAROUSEL
**Risk Level:** Low
**Category:** Performance
**Status:** Identified — accepted
**Description:** Carousel banner images are currently hardcoded as external URLs. On slow mobile connections (common in India), images may load slowly or fail. No lazy loading or CDN optimization is in place.
**Impact:** Poor first impression on slow connections. Carousel appears blank briefly.
**Mitigation:** Next.js Image component with lazy loading and proper sizing. Future: serve images via Convex file storage or a CDN.
**Owner:** Engineering
**Date Identified:** 2026-06-22
**Linked objects:** FEATURE-COM-PLP-CAROUSEL

---

### RISK-COM-PLP-CAROUSEL-MOBILE-001

**Name:** Swipe gesture conflict with vertical page scroll on mobile
**Module:** FEATURE-COM-PLP-CAROUSEL
**Risk Level:** Low
**Category:** UX — Mobile
**Status:** Mitigated — tested and confirmed resolved in QA
**Description:** Touch swipe for horizontal carousel navigation can conflict with vertical page scroll, causing unintended carousel advances or scroll interruption.
**Impact:** Poor mobile UX if unaddressed.
**Mitigation:** Implemented touch event handling that distinguishes horizontal vs. vertical intent. Confirmed working in QA-COM-PLP-CAROUSEL-RUN-001 (20/20 tests passed, including mobile swipe tests).
**Owner:** Engineering
**Date Identified:** During dev planning
**Date Mitigated:** Phase 11 (confirmed via QA)
**Linked objects:** FEATURE-COM-PLP-CAROUSEL, QA-COM-PLP-CAROUSEL-RUN-001

---

### RISK-COM-PLP-CAROUSEL-HARDCODE-001

**Name:** Hardcoded banners require code deployment to change
**Module:** FEATURE-COM-PLP-CAROUSEL
**Risk Level:** Low
**Category:** Operational
**Status:** Accepted — known limitation of V1
**Description:** Banner images and content are hardcoded in the component. Changing promotional banners requires a code change and deployment, not an admin action.
**Impact:** Operational friction; slow turnaround for promotional changes.
**Mitigation:** Accepted for V1. Admin-managed carousel content is a Future Candidate (requires Convex `banners` table and admin UI).
**Owner:** Product
**Date Identified:** REQ-0002 intake
**Linked objects:** FEATURE-COM-PLP-CAROUSEL

---

### RISK-DEL-SEQUENCE-001

**Name:** Delivery development blocked by Phase 11 sequencing preference
**Module:** MODULE-DEL
**Risk Level:** Medium
**Category:** Schedule
**Status:** Accepted — monitored
**Description:** Delivery Module development is sequenced after Phase 11 (Razorpay). This is a product sequencing choice, not a technical dependency. However, if Phase 11 remains blocked indefinitely (due to Razorpay merchant account), Delivery MVP is also indefinitely delayed.
**Impact:** Delivery tracking capability unavailable to operations team.
**Mitigation:** Product Owner to decide if Delivery development should proceed in parallel while Phase 11 waits. No technical blocker exists.
**Owner:** Product Owner
**Date Identified:** 2026-06-22
**Linked objects:** FEATURE-DEL-CORE-DELIVERY-MVP, RISK-PAY-CORE-MERCHANT-001

---

### RISK-UAT-CAROUSEL-SIGNOFF-001

**Name:** UAT sign-off pending — Carousel cannot be released until signed off
**Module:** FEATURE-COM-PLP-CAROUSEL
**Risk Level:** Low
**Category:** Process
**Status:** Active — awaiting sign-off
**Description:** UAT-COM-PLP-CAROUSEL-RUN-001 is In Progress. Product Owner sign-off is required before the Carousel can be formally released.
**Impact:** Feature is built and QA-passed but not formally released.
**Mitigation:** Requires Product Owner to review UAT-0001 and provide sign-off.
**Owner:** Product Owner
**Date Identified:** 2026-06-22
**Linked objects:** UAT-COM-PLP-CAROUSEL-RUN-001, FEATURE-COM-PLP-CAROUSEL

---

### RISK-PRD-CAROUSEL-APPROVAL-001

**Name:** PRD-COM-PLP-CAROUSEL-V1 shows Draft status despite completed development
**Module:** FEATURE-COM-PLP-CAROUSEL
**Risk Level:** Low
**Category:** Process / Documentation
**Status:** Identified — needs clarification
**Description:** The PRD for the Carousel (PRD-0002 / PRD-COM-PLP-CAROUSEL-V1) shows status "Draft Awaiting Approval" in legacy files, yet all 6 stories are Done, QA has passed 20/20 tests, and UAT is in progress. Either the PRD was informally approved and the status was not updated, or development proceeded without formal PRD approval.
**Impact:** Traceability gap — no formal approval record.
**Mitigation:** Product Owner to confirm PRD approval and update PRD status to Approved.
**Owner:** Product Owner
**Date Identified:** 2026-06-22
**Linked objects:** PRD-COM-PLP-CAROUSEL-V1, FEATURE-COM-PLP-CAROUSEL

---

## Risk Level Definitions

| Level | Meaning | Action Required |
|---|---|---|
| Critical | Could cause data loss, security breach, or production outage | Immediate mitigation required; block release |
| High | Significant impact on functionality, revenue, or schedule | Formal mitigation plan required |
| Medium | Moderate impact; manageable with care | Document and monitor; add to sprint review |
| Low | Minor impact; accepted or easily mitigated | Document and accept or note for future sprint |

---

## Open Risks Count

| Level | Open | Mitigated | Accepted | Closed |
|---|---|---|---|---|
| High | 1 (RISK-PAY-CORE-MERCHANT-001) | 1 (RISK-DEL-SCHEMA-CHANGE-001) | — | — |
| Medium | 1 (RISK-DEL-SEQUENCE-001) | 1 (RISK-DEL-MUTATION-CHANGE-001) | 1 (RISK-PAY-STOCK-TIMING-001) | — |
| Low | 2 (RISK-UAT-*, RISK-PRD-*) | 1 (RISK-COM-PLP-CAROUSEL-MOBILE-001) | 2 (RISK-COM-PLP-CAROUSEL-PERF-001, RISK-COM-PLP-CAROUSEL-HARDCODE-001) | — |

---

*Last updated: 2026-06-22*
