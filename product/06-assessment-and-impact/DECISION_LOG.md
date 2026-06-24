# Nuemart — Impact Assessment Decision Log

Records all Go / No-Go / Split / Park / Reject decisions made at the Impact Assessment gate (G3). One entry per completed IMPACT document.

---

## Log

| IMPACT ID | REQ ID | Title | Decision | Date | Decided By | Rationale Summary |
|---|---|---|---|---|---|---|
| IMPACT-0001 | REQ-0001 | Delivery Module — MVP | Go | 2026-06-21 | Product Owner | Risk score 1.7/10. New table only, no payment/inventory/auth impact. Clean rollback. |
| IMPACT-0002 | REQ-0005 | Allergen and Ingredient Details for Each Product | Go | 2026-06-23 | Product Owner | Risk score 1.7/10. Additive optional fields on existing products table. No payment, inventory, or auth changes. Clear scope, clean rollback. |
| IMPACT-0003 | REQ-0007 | Customer Profile QR Code for Store Identification | Go | 2026-06-23 | Product Owner | Risk score 2.1/10. Additive optional fields on users table + 1 index. 2 new screens. Public query must use explicit field allow-list (name, customerCode, qrEnabled only) — mandatory PRD condition. PRD-0004 created. |

---

*Last updated: 2026-06-23*
