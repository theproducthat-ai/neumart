# Example 07 — Operations Issue: Delivery Zone Configuration Change

**Lane**: Operational Change  
**Source**: Operations Lead  
**Outcome**: Configuration applied within 24 hours

---

## 1. Intake

**What arrived**: Operations Lead requests that the delivery coverage zone be expanded to include 3 new PIN codes (411057, 411058, 411059). A new delivery partner has been onboarded to cover these areas starting Monday.

**Source**: Operations Lead, confirmed by delivery partner agreement

---

## 2. Classification

- **Request type**: Configuration Change (no code changes; data configuration change only)
- **Module**: DEL (Delivery)
- **Work type lane**: Operational Change
- **Lane rationale**: No code changes, no new features, no user-visible UX change — purely operational data configuration

---

## 3. Is This a Product OS Object?

Operational Configuration Changes that are:
- Data-only (no code)
- Reversible within 1 hour
- Admin-initiated

...do NOT require a full Product OS request object. They are documented in an **Operational Change Log**.

However, if the change:
- Requires a new code path
- Has customer-visible impact
- Could cause incidents if wrong

...it should be escalated to a Small Enhancement at minimum.

**In this case**: PIN code additions are a data configuration change in the admin console. An engineer applies the data change, it goes through staging → production. No request object required, but the change is logged.

---

## 4. Operational Change Log Entry

```
Date: 2026-06-16
Change: Added delivery coverage PIN codes 411057, 411058, 411059
Reason: New delivery partner onboarding
Applied by: Engineering Lead
Approved by: Operations Lead
Staging verified: Yes — test order to 411057 succeeded
Production applied: 2026-06-16 18:00
Rollback: Remove the 3 PIN codes from the coverage table
```

---

## 5. When an Operational Change Escalates

This example stayed Operational Change because it was purely data. If Operations had said:
> "We need a new delivery pricing tier for these zones"

That would require a Standard Feature (code change, new pricing logic). Operations Lead should flag this distinction in their intake.

---

## 6. Key Learnings from This Example

- Not every request needs a full Product OS object lifecycle — operational data changes are tracked in an ops log, not a feature pipeline
- Staging verification is non-negotiable even for "simple" configuration changes — the bug in Example 06 started with a "simple" validation update
- The test: "does this require a code change?" is the gateway between Operational Change and Feature lane
- Operations Lead is the approver for operational configuration changes, not Product Lead — this is within operations authority (see APPROVAL_AUTHORITY_MATRIX.md)
