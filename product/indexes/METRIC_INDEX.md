# Metric Index

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when metrics are added or deprecated

---

## Metric Register

| ID | Metric Name | Category | Formula | Owner | Dashboard | Status |
|---|---|---|---|---|---|---|
| MET-0001 | Feature Adoption Rate | product | (Users who triggered event / Active users) × 100 | Product Lead | DASH-001 | active |
| MET-0002 | Feature Retention Rate | product | (Users who used feature in N and N+1 / Users in N) × 100 | Product Lead | DASH-001 | active |
| MET-0003 | Search-to-Order Rate | product | (Sessions with search AND order / Sessions with search) × 100 | Product Lead | DASH-001 | active |
| MET-0010 | Gross Merchandise Value | business | Sum of order_total in period | Operations Lead | DASH-002 | active |
| MET-0011 | Net Revenue | business | GMV − refunds − cancellations − fees | Operations Lead | DASH-002 | active |
| MET-0012 | Order Count | business | COUNT of completed orders in period | Operations Lead | DASH-002 | active |
| MET-0013 | Average Order Value | business | GMV / Order Count | Operations Lead | DASH-002 | active |
| MET-0014 | Customer Acquisition | business | New customers with first order in period | Product Lead | DASH-003 | active |
| MET-0015 | Customer Retention (30-day) | business | (Customers ordering in N and N+1 / Customers in N) × 100 | Product Lead | DASH-003 | active |
| MET-0020 | Order Fulfilment Rate | operational | (Delivered / Placed) × 100 | Operations Lead | DASH-004 | active |
| MET-0021 | On-Time Delivery Rate | operational | (On-time deliveries / Total delivered) × 100 | Operations Lead | DASH-004 | active |
| MET-0022 | Delivery Partner Utilisation | operational | (Assigned deliveries / Capacity) × 100 | Operations Lead | DASH-004 | active |
| MET-0030 | Support Contact Rate | support | (Orders with support ticket / Total orders) × 100 | Support Lead | DASH-005 | active |
| MET-0031 | First Contact Resolution Rate | support | (FCR tickets / Total tickets) × 100 | Support Lead | DASH-005 | active |
| MET-0040 | API Error Rate | technical | (5xx responses / Total requests) × 100 | Engineering Lead | DASH-006 | active |
| MET-0041 | p95 API Response Time | technical | p95 of response_time_ms | Engineering Lead | DASH-006 | active |
| MET-0042 | Payment Success Rate | technical | (Successful payments / Initiated) × 100 | Engineering Lead | DASH-006 | active |

---

## Metric Status

| Status | Meaning |
|---|---|
| `active` | In use, being tracked |
| `proposed` | Defined but not yet instrumented |
| `deprecated` | No longer tracked |

---

## Adding New Metrics

1. Define in `product/analytics/METRIC_DICTIONARY.md` first
2. Assign next available MET-XXXX ID
3. Add row to this index
4. Create `objects/metrics/MET-XXXX.md` object

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- `product/analytics/METRIC_DICTIONARY.md`
- `product/analytics/DASHBOARD_REGISTER.md`
