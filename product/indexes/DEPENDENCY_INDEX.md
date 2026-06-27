# Dependency Index

**Version**: 2.0  
**Owner**: Product Lead / Engineering Lead  
**Updated**: Update when dependencies are identified or resolved

---

## Purpose

Tracks cross-object dependencies — where one object's progress is blocked by or contingent on another. Used in sprint planning to identify sequencing risks.

---

## Active Dependencies

| Blocked Object | Blocked By | Dependency Type | Status | Notes |
|---|---|---|---|---|
| Phase 11 Razorpay Integration | DEP-COM-CART-COUPON-RAZORPAY-001 — FEATURE-COM-CART-COUPON coupon calculation reusability | upstream-feature | active | Phase 11 must use order.total (post-discount) as Razorpay payment amount. Does NOT block coupon MVP. |

---

## Dependency Types

| Type | Meaning |
|---|---|
| `upstream-feature` | This feature must ship before the blocked one can proceed |
| `upstream-design` | Design must be completed first |
| `external-api` | Waiting on a third-party API or integration |
| `third-party` | Waiting on a vendor, partner, or external team |
| `data-migration` | Requires a data migration to run first |
| `client-decision` | Waiting on a client decision or approval |

---

## Dependency Status

| Status | Meaning |
|---|---|
| `active` | Dependency is blocking progress |
| `resolved` | Dependency fulfilled, work can proceed |
| `accepted-risk` | Dependency is proceeding in parallel (known risk) |

---

## How to Use This Index

Before sprint planning:
1. Review this index for any dependencies affecting stories in the upcoming sprint
2. If a dependency is unresolved, escalate to the owner before planning
3. Never plan a blocked story into a sprint without an explicit plan to unblock

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- [RISK_INDEX.md](RISK_INDEX.md)
