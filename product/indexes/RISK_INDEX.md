# Risk Index

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Review monthly; update when risks are identified, mitigated, or materialise

---

## Active Risks

| ID | Risk Title | Category | Likelihood | Impact | Risk Score | Owner | Mitigation |
|---|---|---|---|---|---|---|---|
| RSK-COM-CART-COUPON-001 | placeOrder mutation regression — coupon extension breaks core order placement | technical | 3 | 5 | 15 — Critical | Engineering Lead | Separate helper function; non-coupon path regression tests |
| RSK-COM-CART-COUPON-002 | Race condition — concurrent orders exhaust usage-limited coupon | technical | 3 | 3 | 9 — High | Engineering Lead | Convex OCC transaction scope; tech design confirmation |
| RSK-COM-CART-COUPON-003 | Discount amount exceeds cart subtotal — negative total possible | technical | 2 | 4 | 8 — Medium | Engineering Lead | Discount clamped to subtotal; total floor = deliveryFee |
| RSK-COM-CART-COUPON-004 | Client/server cart discount divergence at order placement | technical | 3 | 4 | 12 — High | Engineering Lead | Structured error codes; server always authoritative |
| RSK-PAY-COUPON-RAZORPAY-001 | Coupon not reflected in Razorpay payment amount when Phase 11 ships | technical | 2 | 5 | 10 — High | Engineering Lead | Reusable computeCouponDiscount helper; use order.total for Razorpay |

---

## Risk Scoring

**Likelihood**
- 1 = Very unlikely
- 2 = Unlikely
- 3 = Possible
- 4 = Likely
- 5 = Very likely

**Impact**
- 1 = Negligible
- 2 = Minor
- 3 = Moderate
- 4 = Significant
- 5 = Severe

**Risk Score** = Likelihood × Impact

| Score | Level | Action |
|---|---|---|
| 15-25 | Critical | Immediate mitigation required |
| 9-14 | High | Mitigation plan required |
| 4-8 | Medium | Monitor and mitigate |
| 1-3 | Low | Accept or monitor |

---

## Risk Categories

| Category | Examples |
|---|---|
| `technical` | Integration failures, performance issues, security vulnerabilities |
| `delivery` | Scope creep, dependency delays, capacity shortfall |
| `commercial` | Client commitment at risk, revenue dependency |
| `operational` | Third-party dependency, team key-person risk |
| `compliance` | Regulatory, legal, or policy risk |

---

## Risk Status

| Status | Meaning |
|---|---|
| `identified` | Risk logged, not yet assessed |
| `active` | Under active monitoring or mitigation |
| `mitigated` | Mitigation in place, risk reduced |
| `accepted` | Risk accepted without mitigation |
| `materialised` | Risk became an actual issue — linked to incident or bug |
| `closed` | Risk no longer relevant |

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- `product/objects/risks/`
