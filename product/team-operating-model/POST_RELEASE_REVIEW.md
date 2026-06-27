# Post-Release Review

**Version**: 2.0  
**Owner**: Product Lead  
**Cadence**: Per Standard Feature or Strategic Initiative, at end of hypercare period, 60 minutes

---

## Purpose

The post-release review closes the loop on a feature delivery. It compares what was planned vs. what was delivered, reviews the early metric signal, and captures learnings for the next cycle.

---

## When a Post-Release Review Is Required

| Release Type | Post-Release Review? |
|---|---|
| Strategic Initiative | Yes — mandatory |
| Standard Feature | Yes — mandatory |
| Small Enhancement (metric-impacting) | Recommended |
| Small Enhancement (minor) | No |
| Bug fix / Fast Fix | No |

Held at the end of hypercare (5-10 business days post-release).

---

## Attendees

| Role | Attendance |
|---|---|
| Product Lead | Mandatory |
| Engineering Lead | Mandatory |
| Designer | Recommended |
| Support Lead | Recommended |
| Operations Lead | Recommended |

---

## Pre-Work

**Product Lead (before meeting)**:
- Pull metrics from measurement plan: baseline vs. post-release actuals
- Collect support ticket volume data from Support Lead
- Summarise what was planned vs. what was delivered (scope delta if any)
- Note any incidents or issues during hypercare

---

## Agenda

| Time | Topic | Owner |
|---|---|---|
| 0-10 min | What we shipped: planned vs. actual scope | Product Lead |
| 10-25 min | Metrics review: are success metrics moving? | Product Lead |
| 25-35 min | Incidents and support: hypercare health summary | Support Lead |
| 35-45 min | Learnings: what went well, what to do differently | All |
| 45-55 min | Next steps: follow-up features, optimisations | Product Lead |
| 55-60 min | Actions and owners | Product Lead |

---

## Metrics Review

For each success metric in the measurement plan:
1. What was the baseline?
2. What is the current value?
3. Is it moving in the right direction?
4. Verdict: Success / Inconclusive / Failure

Note: a 5-10 day window is early — mark as Inconclusive if too early to call. Schedule a 30-day follow-up if needed.

---

## Learning Categories

Structure learnings as:

**What went well (keep doing)**
- Example: "Feature flag rollout went smoothly — gradual rollout gave us confidence"

**What to do differently (change)**
- Example: "Support handover was late — handover should be 3 days before release, not 1"

**What we didn't expect (surprised us)**
- Example: "Users tried to access the feature in a context we hadn't designed for"

---

## Outputs

Every post-release review must produce:
- [ ] Metrics verdict for each success metric
- [ ] Support impact summary (was contact rate higher/lower than expected?)
- [ ] Learning document attached to the feature object
- [ ] Any follow-on work items logged as requests or bugs
- [ ] 30-day metric check scheduled if too early to call

---

## Feature Object Update

After the post-release review:
- Update the feature object status to `post-release`
- Link the measurement results
- Document the learnings in the feature object
- Confirm hypercare is closed

---

## Related Documents

- [PRODUCT_CADENCE.md](PRODUCT_CADENCE.md)
- [HYPERCARE_RULES.md](../support-ops/HYPERCARE_RULES.md)
- `product/analytics/FEATURE_MEASUREMENT_RULES.md`
- `product/objects/features/`
