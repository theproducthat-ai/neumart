# Example 04 — Strategic Initiative: Loyalty/Rewards Programme

**Lane**: Strategic Initiative  
**Source**: Business Owner  
**Estimated effort**: 5+ sprints (multi-quarter)

---

## 1. Intake

**What arrived**: Business Owner proposes a customer loyalty programme — customers earn points on every order and can redeem them for discounts. Goal is to improve 30-day customer retention from 35% to 50%.

**Source**: Business Owner, strategic planning meeting

---

## 2. Classification

- **Request type**: New Feature (no loyalty system exists)
- **Primary module**: COM + USR (Commerce, User Management)
- **Secondary modules**: PAY (discount application at checkout), ADM (programme management), RPT (reporting)
- **Work type lane**: Strategic Initiative
- **Blocking flags**: schema_change (new tables: loyalty_accounts, points_transactions, redemption_codes)
- **Lane rationale**: Multi-quarter, multi-module, requires business sign-off, architectural change, OKR link required

---

## 3. Object Chain

```
REQ-0010 (approved, strategic initiative)
  └── OKR-FY26-Q3-01 (Customer Retention OKR — 30-day retention 35% → 50%)
  └── PRD-0004 (Loyalty Programme PRD)
        └── FEAT-COM-LOYALTY-001 (Loyalty Programme feature)
              ├── EPIC-0005 (Points Earning — Sprint 15-16)
              │     ├── US-0030 (earn points on order)
              │     └── US-0031 (view points balance)
              ├── EPIC-0006 (Points Redemption — Sprint 17-18)
              │     ├── US-0032 (apply points at checkout)
              │     └── US-0033 (redemption confirmation)
              ├── EPIC-0007 (Admin Management — Sprint 19)
              │     └── US-0034 (admin loyalty programme config)
              └── TD-0005 (Tech Design — Loyalty Points System)
```

---

## 4. Approval Required Before Starting

Strategic Initiatives require Business Owner sign-off before entering the roadmap:

| Approval | Person | Date |
|---|---|---|
| Business case approved | Business Owner | Sprint 13 planning |
| OKR linked and accepted | Business Owner + Product Lead | Sprint 13 planning |
| Tech design approved | Engineering Lead | Sprint 14 |
| Capacity confirmed | Engineering Lead | Sprint 14 |

---

## 5. Required Artifacts

| Artifact | Status |
|---|---|
| Request object (REQ-0010) | Required |
| OKR object (OKR-FY26-Q3-01) | Required |
| PRD (PRD-0004) | Required |
| Epic breakdown (EPIC-0005/6/7) | Required |
| Tech design (TD-0005) | Required |
| Capacity plan | Required |
| User stories (all) | Required |
| Design brief + Figma for all screens | Required |
| Data migration objects (new tables) | Required |
| Code reviews | Required |
| QA test plans | Required (per epic) |
| UAT sign-off | Required |
| Measurement plan | Required |
| Support handover | Required |
| Release objects (per phase) | Required |
| Hypercare plan | Required |
| Stakeholder communication plan | Required |
| Post-release review | Required |

---

## 6. Investment Theme Allocation

This initiative is classified under **Customer Retention** investment theme (target: 20% of capacity). Before scheduling, Product Lead confirmed this initiative fits within the Customer Retention allocation for Q3.

---

## 7. Key Learnings from This Example

- Strategic Initiatives need OKR linkage before work starts — "improve retention" is not a target; "35% → 50% 30-day retention" is
- Phasing across epics is essential — trying to ship the whole programme in one sprint is a recipe for failure
- The tech design must cover the loyalty points data model before any epic starts — all epics depend on the same foundation
- Hypercare for a loyalty programme should be at least 2 weeks — points accuracy issues would cause major customer trust damage
