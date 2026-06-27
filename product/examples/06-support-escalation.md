# Example 06 — Support Escalation: Customer Cannot Complete Checkout

**Lane**: Support → Bug (High severity)  
**Source**: Support  
**Outcome**: Bug identified and fixed within 1 sprint

---

## 1. Support Receives the Issue

**What arrived**: A customer contacts support saying they get an error "Something went wrong" every time they try to place an order. They have tried 3 times. The Support agent tries to reproduce using a test account but cannot replicate.

**Support triage**:
- Support agent checks: Is payment method valid? Yes. Is address complete? Yes. Is the item in stock? Yes.
- Support agent cannot reproduce — escalates to Support Lead.

**Support Lead triage**:
- Checks support tickets for similar reports — finds 4 other customers with the same error in the past 48 hours
- All 4 have the same common factor: all have a delivery address in a PIN code starting with 4
- Support Lead escalates to Engineering with specific pattern identified

---

## 2. Engineering Investigation

Engineering Lead investigates and finds: a validation function in the checkout flow was recently updated to check delivery coverage zones. A bug in the new validation logic incorrectly blocks all PIN codes starting with 4, even though they are in the coverage zone.

**Bug classification**:
- Severity: High (checkout broken for a subset of customers with no workaround)
- Lane: Fast Fix initially assessed, upgraded to Small Enhancement (code fix requires careful testing)
- Module: COM-CHK (Commerce, Checkout)

---

## 3. Objects Created

```yaml
# product/objects/bugs/BUG-0043.md
---
id: BUG-0043
title: Checkout fails for customers with PIN codes starting with 4
severity: high
status: in-progress
module: COM-CHK
affected_customers: 5 confirmed, likely more
workaround: None
owner: engineering_lead
date_found: 2026-06-12
source: support
---
```

**BUG-0043 is added to KNOWN_ISSUES_REGISTER.md** so Support can acknowledge customers with this specific PIN code pattern.

---

## 4. Support Handover (Interim)

While the fix is in progress, Support Lead publishes a known issue response:

> "We are aware of a checkout issue affecting some customers. Our team is actively working on a fix. If you are experiencing this, please try again tomorrow or contact us for a manual order. Expected fix: [date]."

---

## 5. How the Intake Flow Works for Support Escalations

```
Customer contact
  → Support agent triages (cannot resolve)
  → Support Lead identifies pattern
  → Engineering Lead engaged
  → Bug object created with pattern documented
  → Added to Known Issues register
  → Fix scheduled in sprint
  → Support Lead notified when fix deployed
  → Known Issues register updated (resolved)
```

---

## 6. Key Learnings from This Example

- Support is most valuable when they look for *patterns* not just individual cases — the 4 tickets with the same PIN code pattern is what made this actionable
- A bug with no customer workaround is automatically "High" severity — it doesn't need more than 5 affected customers
- The known issues register has immediate operational value — Support can proactively acknowledge the issue rather than re-investigating every contact
- Support agents should not need to reproduce bugs themselves for High severity issues — the pattern evidence is sufficient to escalate
