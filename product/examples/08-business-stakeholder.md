# Example 08 — Business Stakeholder Request: B2B Client Onboarding

**Lane**: Business/Commercial → Standard Feature  
**Source**: Business Owner / Sales  
**Outcome**: Custom B2B catalogue feature

---

## 1. Intake

**What arrived**: Business Owner presents a new B2B client opportunity. A corporate catering company wants to use Neumart for bulk grocery ordering. They need: a custom product catalogue visible only to them, bulk ordering (min 10 units per item), a monthly invoice instead of pay-per-order.

**Source**: Business Owner, supported by Sales Lead  
**Client**: Corporate Client (name withheld)  
**Commitment date required by client**: 3 months from today

---

## 2. Classification

Initial assessment:
- **Request type**: New Feature
- **Lane**: Business/Commercial (commercial negotiation required first)
- **Note**: The feature itself is Standard Feature or Strategic Initiative, but the intake must go through Business/Commercial gate first

---

## 3. Business/Commercial Gate

Before any Product OS object is created for the feature, the following questions are answered by Business Owner and Product Lead:

| Question | Answer |
|---|---|
| Is this a one-client customisation or a platform feature? | Platform feature — could serve all B2B clients |
| What is the commercial value? | Contract worth ₹15L/year |
| What is the build complexity? | Estimated 3-4 sprints (Engineering Lead estimate) |
| Does the build-vs-buy analysis support building? | Yes — no third-party B2B solution fits |
| Can we commit to the timeline? | Tight but feasible if prioritised |
| Is this approved for roadmap? | Yes — Business Owner approved |

**Gate outcome**: Approved as a Standard Feature, elevated to Strategic Initiative due to multi-sprint scope and client commitment.

---

## 4. Object Chain

```
REQ-0011 (business stakeholder, approved — client commitment flag)
  └── CLIENT COMMITMENT: CC-0001 (delivery by [date])
  └── PRD-0005 (B2B Bulk Ordering PRD)
        └── FEAT-ADM-B2B-001 (B2B client management)
        └── FEAT-COM-B2BCAT-001 (custom B2B catalogue)
        └── FEAT-COM-B2BORD-001 (bulk ordering flow)
```

---

## 5. Client Commitment Handling

REQ-0011 is flagged as a client commitment. This means:
- It is added to CLIENT_COMMITMENT_INDEX.md
- It cannot be deprioritised without Operations Lead and client consent
- Status updates are required fortnightly to Business Owner
- If at risk of missing the date: escalate immediately to Business Owner — do NOT wait until the deadline

---

## 6. Key Differences from Standard Feature Intake

| Standard Feature | Business/Commercial |
|---|---|
| Comes from product observation or stakeholder feedback | Comes from a commercial agreement or sales opportunity |
| Prioritised by scoring model | May override scoring model if commercial value is sufficient |
| Missing date = process improvement needed | Missing date = contractual issue — must be escalated immediately |
| No external commitment | External commitment to a named client |

---

## 7. Key Learnings from This Example

- B2B features often seem like customisations but should be built as platform features if there's reuse potential — this protects engineering investment
- Client commitment intake requires a commercial gate that standard features do not — Business Owner must approve before Product Lead commits
- The timeline "3 months from today" is a real constraint, not an aspiration — capacity planning must confirm feasibility before the commitment is made to the client
- Account Manager and Operations Lead own the client relationship; Product Lead owns the feature delivery. These are distinct responsibilities.
