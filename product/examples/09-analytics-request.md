# Example 09 — Analytics Request: Daily Orders Export Report

**Lane**: Standard Feature  
**Source**: Operations  
**Outcome**: Admin dashboard report with CSV export

---

## 1. Intake

**What arrived**: Operations Lead requests a report in the admin console showing daily orders with key fields (order ID, customer name, items, total, delivery status). They currently export this manually from the database. They need it filterable by date range and downloadable as CSV.

**Source**: Operations Lead

---

## 2. Classification

- **Request type**: New Feature (no admin export report exists yet)
- **Module**: RPT (Reporting) + ADM (Admin Console)
- **Secondary modules**: COM (order data), DEL (delivery status), PAY (payment status)
- **Work type lane**: Standard Feature (new screen, multi-module data, design required)
- **Blocking flags**: None (read-only report, no schema change)
- **Lane rationale**: New admin screen, 3+ user stories, involves multiple data sources

---

## 3. Important Note: Reporting Features Read Data, Not Create It

A common mistake with analytics/reporting features is over-engineering the data model. The correct approach:
- Reporting features should read from existing tables, not duplicate data
- If the data doesn't exist yet, the correct request is to instrument it first (see EVENT_TAXONOMY.md)
- Performance matters: large report queries should be paginated and/or run async

Engineering Lead confirmed all required data (orders, delivery status, payment status) is available in existing tables — no schema change needed.

---

## 4. Required Artifacts

| Artifact | Status |
|---|---|
| Request object (REQ-0012) | Required |
| PRD (PRD-0006) | Required — defines report fields and filters |
| User stories (US-0040 to US-0042) | Required |
| Tech design | Required — query design, pagination, CSV generation |
| Design brief (UI) | Required — admin screen design |
| Code review | Required |
| QA sign-off | Required |
| Support handover | Required (new admin capability) |
| Measurement plan | Recommended — track adoption by Operations |

---

## 5. User Stories

**US-0040**: As an Operations Lead, I want to view a daily orders table in the admin console filtered by date range, so I can monitor order volume without accessing the database directly.

**US-0041**: As an Operations Lead, I want to export the orders table as a CSV, so I can process it in spreadsheet tools.

**US-0042**: As an Operations Lead, I want to filter the orders table by delivery status (pending / in-progress / delivered / failed), so I can focus on problem orders.

---

## 6. Tech Design Considerations

Key questions for the tech design (TD-XXXX):
1. **Pagination**: How many rows per page? (Recommended: 50 per page with load-more)
2. **CSV export**: Generated server-side (Convex action) and streamed to browser, or generated client-side?
3. **Date range limits**: Should there be a max date range to protect query performance? (Recommended: 90 days)
4. **Column selection**: Fixed columns or configurable? (Start with fixed)

---

## 7. Key Learnings from This Example

- Analytics/reporting features must have a clearly scoped PRD because "a report" is vague — what fields, what filters, what date ranges, what export format?
- Engineering Lead should assess query performance before committing to a timeline — a poorly designed report query can cause production performance issues
- The tech design for reports is mostly about query design and pagination — it doesn't need to be long, but it needs to exist
- Operations users are the primary audience, not customers — the design bar is lower (WCAG Level A vs. AA), but usability still matters
