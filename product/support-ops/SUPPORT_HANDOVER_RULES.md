# Support Handover Rules

**Version**: 2.0  
**Owner**: Product Lead / Support Lead

---

## Purpose

Before any feature reaches production, Support and Operations must be prepared to handle customer contacts about it. A support handover is how Product transfers knowledge to Support.

---

## When a Support Handover Is Required

A support handover document is **mandatory** for:
- Any new customer-facing feature
- Any significant change to existing customer-facing behaviour
- Any change that affects order flow, payment, or delivery
- Any change that alters pricing, promotions, or eligibility logic
- High-risk releases (Engineering Lead or Product Lead designation)

A support handover is **not required** for:
- Bug fixes with no visible customer behaviour change
- Backend-only or admin-only changes
- Performance improvements with no UX change
- Internal tooling

---

## Support Handover Contents

Every handover document must cover:

### 1. What Changed
Plain-language summary of what is new or different. Written for a non-technical audience.

### 2. What Customers Will See
Screenshots or description of the new UI/flow.

### 3. Expected Customer Questions
Top 3-5 questions customers are likely to ask. Written as Q&A.

### 4. Known Limitations or Edge Cases
Anything that doesn't work in certain conditions, with workaround if available.

### 5. Error Messages and What They Mean
If the feature introduces new error states, explain what each means and what the customer should do.

### 6. What Support Can Action
Steps Support can take to resolve common issues without escalation.

### 7. What Requires Engineering Escalation
Scenarios that cannot be resolved without a code fix or data fix.

### 8. Rollback or Kill Switch
If a feature flag is in use: confirm that Support Lead knows who can flip it and how to request it.

---

## When to Deliver the Handover

| When | Requirement |
|---|---|
| Standard Feature | 3 business days before go-live |
| Small Enhancement | 1 business day before go-live |
| Strategic Initiative | 5 business days before go-live |
| Hotfix / Fast Fix | Before or simultaneously with deployment |

---

## Handover Process

1. Product Lead or PM author the support handover using `os/templates/SUPPORT_HANDOVER_TEMPLATE.md`
2. Engineering Lead reviews for technical accuracy
3. Support Lead signs off that they have sufficient information to handle customer contacts
4. Handover document linked from the release object (`objects/releases/REL-XXXX.md`)
5. Support Lead confirms receipt and readiness before release sign-off

**Release cannot proceed without Support Lead sign-off** on the support handover (for features that require one).

---

## Support Handover Quality Bar

A handover is sufficient if:
- A support agent who has never seen the feature can answer the top expected questions
- A support agent knows exactly when to escalate vs. resolve themselves
- A support agent knows the exact steps for common troubleshooting

If Support Lead deems the handover insufficient, they return it to Product Lead with specific gaps identified. Product Lead must fill those gaps before release proceeds.

---

## Hypercare Coordination

For Standard Features and above, the support handover is supplemented by a hypercare period:
- Support Lead and Product Lead agree on hypercare duration (minimum 5 business days)
- Daily syncs during hypercare
- Escalation path is shortened during hypercare
- See [HYPERCARE_RULES.md](HYPERCARE_RULES.md)

---

## Related Documents

- [HYPERCARE_RULES.md](HYPERCARE_RULES.md)
- [OPERATIONS_READINESS_CHECKLIST.md](OPERATIONS_READINESS_CHECKLIST.md)
- `product/os/templates/SUPPORT_HANDOVER_TEMPLATE.md`
