# Example 03 — Standard Feature: Customer Order History Screen

**Lane**: Standard Feature  
**Source**: Business Stakeholder (Operations)  
**Estimated effort**: 2 sprints

---

## 1. Intake

**What arrived**: Operations Lead raises a request: customers are calling support to ask about their past orders because there is no order history in the app. Operations wants customers to self-serve order history so support contact rate drops.

**Source**: Operations Lead, validated by support ticket data (top 3 contact reason)

---

## 2. Classification

- **Request type**: New Feature (no order history screen exists)
- **Module**: COM-ORDHIS (Commerce, Order History)
- **Secondary modules**: COM-PDP (product info in orders), PAY (order total, payment status)
- **Work type lane**: Standard Feature
- **Blocking flags**: None (reads existing data, no schema change)
- **Lane rationale**: New customer-facing screen, 4-6 user stories, design required, measurement plan required

---

## 3. Object Chain

```
REQ-0009 (approved, standard feature)
  └── PRD-0003 (Order History PRD)
        └── FEAT-COM-ORDHIS-001 (Order History feature)
              ├── EPIC-0004 (Order History MVP)
              │     ├── US-0024 (view list of past orders)
              │     ├── US-0025 (view order details)
              │     ├── US-0026 (reorder from history)
              │     └── US-0027 (search/filter order history)
              └── REL-0011 (sprint 14 release)
```

---

## 4. Required Artifacts

| Artifact | Status |
|---|---|
| Request object (REQ-0009) | Required — created |
| PRD (PRD-0003) | Required — authored |
| User stories (US-0024 to US-0027) | Required — created |
| Tech design | Required — reviewed by Eng Lead |
| Design brief + Figma handoff | Required — 5 screens designed |
| Code review (Eng Lead + 1) | Required |
| QA test plan + execution | Required |
| UAT sign-off (Product Lead) | Required |
| Measurement plan | Required |
| Support handover | Required |
| Release object (REL-0011) | Required |
| Operations readiness checklist | Required |

---

## 5. PRD Summary (PRD-0003)

**Problem**: Customers cannot view their order history in the app. They call support, increasing contact rate. Support Contact Rate is 8% of orders — target is < 5%.

**User goal**: As a returning customer, I want to view my past orders so I can track what I've bought, reorder easily, and resolve questions without calling support.

**Success metrics**:
- Support Contact Rate drops from 8% to < 5% within 60 days of release (MET-0030)
- Order History screen used by > 30% of customers who complete an order within 30 days

**Out of scope**: Returns/refunds flow (separate feature); real-time delivery tracking (separate feature)

---

## 6. Measurement Plan

**Success metrics**:
- Support Contact Rate: 8% → < 5% within 60 days
- Order History adoption: > 30% of customers view order history within 30 days

**Guardrail metrics**:
- API error rate must not increase (MET-0040)
- Checkout completion rate must not decrease (core funnel)

**Tracking events added**:
- `order_history_viewed`
- `order_detail_viewed`
- `reorder_initiated`

---

## 7. Key Learnings from This Example

- Standard features require a PRD because alignment across Product, Engineering, Design, and Support matters more than for small changes
- A measurement plan is mandatory — you cannot know if this feature worked without measuring it
- "Support Contact Rate dropping" is a valid success metric — not every metric is a usage metric
- Tech design is required even when there are no schema changes — the API design, query patterns, and pagination approach all need to be agreed before implementation
