# Metric Dictionary

**Version**: 2.0  
**Owner**: Product Lead / Analytics

---

## Purpose

The single source of truth for how every product and business metric is defined. A metric in a dashboard, OKR, or report must match the definition here. If a metric is not here, it must be added before use.

---

## Metric Definition Format

Each metric entry follows this structure:

```
**Metric Name**
- ID: MET-XXXX
- Category: product | business | operational | support | technical
- Definition: Plain-language description of exactly what this measures
- Formula: How it is calculated
- Numerator: What is counted in the numerator
- Denominator: What is counted in the denominator (if applicable)
- Data Source: Where the data comes from
- Refresh Rate: How often the metric is updated
- Owner: Who is responsible for this metric's accuracy
- Notes: Edge cases, exclusions, or known data issues
```

---

## Product Metrics

**Feature Adoption Rate**
- ID: MET-0001
- Category: product
- Definition: Percentage of active users who used a feature at least once in the period
- Formula: (Users who triggered feature event / Total active users) × 100
- Data Source: Analytics event log
- Refresh Rate: Weekly
- Owner: Product Lead

**Feature Retention Rate**
- ID: MET-0002
- Category: product
- Definition: Percentage of users who used a feature in period N who also used it in period N+1
- Formula: (Users who used feature in both periods / Users who used feature in period N) × 100
- Data Source: Analytics event log
- Refresh Rate: Weekly
- Owner: Product Lead

**Search-to-Order Rate**
- ID: MET-0003
- Category: product
- Definition: Percentage of sessions containing a search that resulted in an order
- Formula: (Sessions with search AND order / Sessions with search) × 100
- Data Source: Analytics event log
- Refresh Rate: Daily
- Owner: Product Lead

---

## Business Metrics

**Gross Merchandise Value (GMV)**
- ID: MET-0010
- Category: business
- Definition: Total value of all orders placed, before deductions. Includes cancelled orders in the calculation period.
- Formula: Sum of order_total for all orders placed in the period
- Data Source: Orders table
- Refresh Rate: Daily
- Owner: Operations Lead
- Notes: Excludes test orders. Includes failed/cancelled orders until reversed.

**Net Revenue**
- ID: MET-0011
- Category: business
- Definition: GMV minus refunds, cancellations, and platform fees
- Formula: GMV − refunds − cancellations − platform_fees
- Data Source: Orders + payments tables
- Refresh Rate: Daily
- Owner: Operations Lead

**Order Count**
- ID: MET-0012
- Category: business
- Definition: Total number of orders placed in the period
- Formula: COUNT of orders with status ≠ test
- Data Source: Orders table
- Refresh Rate: Daily
- Owner: Operations Lead

**Average Order Value (AOV)**
- ID: MET-0013
- Category: business
- Definition: Average value of a completed order
- Formula: GMV / Order Count (completed orders only)
- Data Source: Orders table
- Refresh Rate: Daily
- Owner: Operations Lead

**Customer Acquisition**
- ID: MET-0014
- Category: business
- Definition: Number of new customers who placed their first order in the period
- Formula: COUNT of customers where first_order_date is within period
- Data Source: Orders + users tables
- Refresh Rate: Weekly
- Owner: Product Lead

**Customer Retention (30-day)**
- ID: MET-0015
- Category: business
- Definition: Percentage of customers who ordered in period N who also ordered in period N+1 (30-day windows)
- Formula: (Customers active in both periods / Customers active in period N) × 100
- Data Source: Orders table
- Refresh Rate: Monthly
- Owner: Product Lead

---

## Operational Metrics

**Order Fulfilment Rate**
- ID: MET-0020
- Category: operational
- Definition: Percentage of placed orders successfully delivered
- Formula: (Delivered orders / Total placed orders) × 100
- Data Source: Orders + delivery tables
- Refresh Rate: Daily
- Owner: Operations Lead

**On-Time Delivery Rate**
- ID: MET-0021
- Category: operational
- Definition: Percentage of delivered orders delivered within the promised delivery window
- Formula: (Orders delivered on-time / Total delivered orders) × 100
- Data Source: Delivery table
- Refresh Rate: Daily
- Owner: Operations Lead

**Delivery Partner Utilisation**
- ID: MET-0022
- Category: operational
- Definition: Percentage of available delivery partner capacity used in the period
- Formula: (Assigned deliveries / Total delivery capacity) × 100
- Data Source: Delivery partner assignment table
- Refresh Rate: Daily
- Owner: Operations Lead

---

## Support Metrics

**Support Contact Rate**
- ID: MET-0030
- Category: support
- Definition: Percentage of orders generating at least one support contact
- Formula: (Orders with at least 1 support contact / Total orders) × 100
- Data Source: Support ticket system + orders table
- Refresh Rate: Weekly
- Owner: Support Lead

**First Contact Resolution Rate**
- ID: MET-0031
- Category: support
- Definition: Percentage of support tickets resolved in a single contact without re-contact within 7 days
- Formula: (Tickets resolved first contact / Total tickets) × 100
- Data Source: Support ticket system
- Refresh Rate: Weekly
- Owner: Support Lead

---

## Technical Metrics

**API Error Rate**
- ID: MET-0040
- Category: technical
- Definition: Percentage of API requests returning 5xx errors
- Formula: (5xx responses / Total requests) × 100
- Data Source: Server logs / observability platform
- Refresh Rate: Real-time
- Owner: Engineering Lead

**p95 API Response Time**
- ID: MET-0041
- Category: technical
- Definition: The response time at the 95th percentile — 95% of requests are faster than this value
- Formula: p95 of response_time_ms across all API requests
- Data Source: Server logs / observability platform
- Refresh Rate: Real-time
- Owner: Engineering Lead

**Payment Success Rate**
- ID: MET-0042
- Category: technical
- Definition: Percentage of initiated payment transactions that complete successfully
- Formula: (Successful payments / Initiated payments) × 100
- Data Source: Payment gateway + orders table
- Refresh Rate: Real-time
- Owner: Engineering Lead

---

## Adding New Metrics

Before using a new metric in any report, dashboard, or OKR:
1. Define it in this dictionary using the format above
2. Assign it a MET-XXXX ID
3. Create a corresponding `objects/metrics/MET-XXXX.md` object
4. Notify the team so everyone uses the same definition

---

## Related Documents

- [EVENT_TAXONOMY.md](EVENT_TAXONOMY.md)
- [DASHBOARD_REGISTER.md](DASHBOARD_REGISTER.md)
- [PRODUCT_HEALTH_METRICS.md](PRODUCT_HEALTH_METRICS.md)
- `product/objects/metrics/`
