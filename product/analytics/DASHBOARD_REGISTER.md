# Dashboard Register

**Version**: 2.0  
**Owner**: Product Lead

---

## Purpose

A register of all official dashboards for Neumart product, business, and technical metrics. Use this to find the right dashboard before creating a new one. Every dashboard referenced in an OKR, report, or review must be registered here.

---

## Dashboard Register

| ID | Dashboard Name | Audience | Tool | Owner | Key Metrics | Refresh |
|---|---|---|---|---|---|---|
| DASH-001 | Product Health | Product Lead, Engineering | TBD | Product Lead | MET-0001, MET-0003, MET-0010, MET-0040 | Daily |
| DASH-002 | Business Overview | Leadership, Operations | TBD | Operations Lead | MET-0010, MET-0011, MET-0012, MET-0013 | Daily |
| DASH-003 | Customer Metrics | Product Lead, Marketing | TBD | Product Lead | MET-0014, MET-0015, MET-0003 | Weekly |
| DASH-004 | Operational Performance | Operations Lead | TBD | Operations Lead | MET-0020, MET-0021, MET-0022 | Daily |
| DASH-005 | Support Overview | Support Lead | TBD | Support Lead | MET-0030, MET-0031 | Daily |
| DASH-006 | Engineering Health | Engineering Lead | TBD | Engineering Lead | MET-0040, MET-0041, MET-0042 | Real-time |

_Tool column: fill in the actual dashboard tool (e.g., Metabase, Grafana, Looker) when configured._

---

## Dashboard Entry Format

When adding a new dashboard:

```
| DASH-XXX | [Name] | [Target Audience] | [Tool] | [Owner] | [MET-XXXX list] | [Refresh rate] |
```

---

## Dashboard Ownership Rules

1. Every dashboard must have exactly one owner
2. The owner is responsible for keeping the dashboard accurate and up-to-date
3. If a metric definition changes (in METRIC_DICTIONARY.md), the dashboard owner must update the dashboard within 5 business days
4. Stale dashboards (not updated in > 3 months with no data) must be reviewed — archived or updated

---

## Before Creating a New Dashboard

1. Check this register — does the dashboard already exist?
2. If yes, request access or ask the owner to add the metric you need
3. If no, define the dashboard, assign an owner, and add it here
4. Do not duplicate existing dashboards — redundant dashboards cause metric inconsistencies

---

## Dashboard vs. Report

| Dashboard | Report |
|---|---|
| Always live, auto-refreshing | Produced for a specific period (week, month, quarter) |
| Self-serve — anyone can view | May be distributed on a schedule |
| Monitored during hypercare | Used in reviews and retrospectives |
| Linked from DASH- objects | Linked from release / review objects |

---

## Related Documents

- [METRIC_DICTIONARY.md](METRIC_DICTIONARY.md)
- [PRODUCT_HEALTH_METRICS.md](PRODUCT_HEALTH_METRICS.md)
- `product/objects/metrics/`
