# Feature Flag Rules

**Version**: 2.0  
**Owner**: Engineering Lead

---

## When to Use Feature Flags

Feature flags are required when:
- A feature needs to be deployed but not yet released to users
- A gradual rollout is desired (risk mitigation)
- An A/B experiment is running
- A kill switch is needed for a high-risk feature
- Different users need different feature access

Feature flags are NOT needed for:
- Bug fixes with no risk
- Small enhancements with no rollout risk
- Internal admin-only changes with no customer impact

---

## Flag Creation Process

1. Create `objects/feature-flags/FF-XXXX.md` before implementation
2. Define the flag key (e.g., `ff_com_carousel_v2`)
3. Define the scope (all-users | percentage | segment)
4. Set a `scheduled_removal_date` — always required
5. Engineering implements the flag in code
6. Flag starts at 0% (disabled)

---

## Rollout Plan

Every flag should have a documented rollout plan:

| Phase | Percentage | Duration | Trigger to Proceed |
|---|---|---|---|
| Off | 0% | Until ready | QA signoff |
| Canary | 5-10% | 2-3 days | No increase in errors |
| Partial | 50% | 3-5 days | Metrics look healthy |
| Full | 100% | — | Decision to ship |

---

## Flag Hygiene

**Every flag must have a `scheduled_removal_date`.**

Flags older than their scheduled removal date are tech debt. Engineering Lead reviews flags monthly.

Removal process:
1. Confirm feature is fully rolled out or decided not to ship
2. Remove conditional logic from code
3. Delete flag from flag management system
4. Update feature flag object status to `removed`
5. Archive the feature flag object

---

## Flag Naming Convention

Format: `ff_[module]_[feature_description]`  
Examples:
- `ff_com_carousel_v2`
- `ff_adm_bulk_order_status`
- `ff_del_tracking_map`

All lowercase, underscores, module prefix.

---

## Flag Rollback

If a flag needs to be disabled immediately (incident response):
1. Engineering Lead disables the flag in the flag management system
2. No code deployment required
3. Update incident object and feature flag object
4. Monitor for resolution

This is the primary benefit of a kill switch flag.
