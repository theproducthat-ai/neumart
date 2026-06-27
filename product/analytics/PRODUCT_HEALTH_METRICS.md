# Product Health Metrics

**Version**: 2.0  
**Owner**: Product Lead  
**Review Cadence**: Weekly (Product Lead), Monthly (Leadership)

---

## Purpose

Defines the canonical set of metrics that indicate whether Neumart's product is healthy. These are the metrics that matter most — if these are moving in the right direction, the product is in good health.

---

## North Star Metric

**Orders Delivered per Week**

_Rationale_: This single metric captures customer demand (orders placed), fulfilment capability (orders delivered), and operational health. It grows when customers value the product AND operations can deliver.

---

## Core Health Metrics (Weekly Review)

These five metrics are reviewed every week in the product review cadence.

| Metric | ID | Target | Alert Threshold |
|---|---|---|---|
| Orders Delivered per Week | MET-0020 | Growing week-on-week | > 10% week-on-week decline |
| Order Fulfilment Rate | MET-0020 | > 95% | < 90% |
| Payment Success Rate | MET-0042 | > 99% | < 97% |
| API Error Rate | MET-0040 | < 0.1% | > 0.5% |
| Support Contact Rate | MET-0030 | < 5% of orders | > 10% of orders |

---

## Growth Metrics (Monthly Review)

Tracked monthly to assess product and business momentum.

| Metric | ID | Target | Notes |
|---|---|---|---|
| New Customer Acquisition | MET-0014 | Month-on-month growth | Compare to prior month and prior year |
| 30-Day Customer Retention | MET-0015 | > 40% | Customers who ordered again within 30 days |
| Average Order Value | MET-0013 | Growing or stable | Decline may indicate promotion dilution |
| GMV | MET-0010 | Growing | Directional indicator |

---

## Feature Health Metrics

Each major feature has its own success metric(s) defined in its measurement plan. After a feature launches:
- Feature health is tracked during hypercare (daily)
- Feature health is reviewed at 30-day and 90-day post-release checkpoints
- Feature health feeds into investment theme review (is the feature delivering value?)

---

## Metric Thresholds and Alerts

**Red (Action Required)**
- Any core health metric breaches the alert threshold
- Engineering Lead and Product Lead must respond within 1 hour
- May trigger an incident declaration

**Amber (Watch)**
- Any core health metric is trending toward the alert threshold but has not breached it
- Investigate and monitor closely — daily check until resolved

**Green (Healthy)**
- All core metrics within target range

---

## How to Use This Document

In weekly product reviews:
1. Pull the dashboard (DASH-001) for all core health metrics
2. Mark each metric as Red / Amber / Green
3. For any Red or Amber, identify the cause and action
4. Present a one-page health summary to leadership monthly

In OKR planning:
- New OKR targets should be set against current metric baselines
- Metric baselines are documented in OKR objects

---

## Related Documents

- [METRIC_DICTIONARY.md](METRIC_DICTIONARY.md)
- [DASHBOARD_REGISTER.md](DASHBOARD_REGISTER.md)
- `product/portfolio/OKR_TREE.md`
- `product/team-operating-model/WEEKLY_PRODUCT_REVIEW.md`
