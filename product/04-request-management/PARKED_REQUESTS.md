# Nuemart — Parked Requests

Requests parked intentionally for later consideration. Parked requests are not rejected — they may be reopened when the conditions to do so are met. A request stays here until it is reopened (moved back to Active) or formally Rejected.

---

## Rules

- A request is parked when it is valid but not the right time to pursue it.
- A reason for parking and conditions to reopen must always be documented.
- Review Date is the earliest date to reconsider. It is a reminder, not a hard commitment.
- Parking is not a soft rejection. If the intent is "never", use `REJECTED_REQUESTS.md`.

---

## Parked Register

| Request ID | Title | Reason Parked | Parked Date | Review Date | Conditions to Reopen | Notes |
|---|---|---|---|---|---|---|
| REQ-0006 | Allergen and Dietary Tag Filtering on Product Listing | Depends on REQ-0005 — schema fields and catalogue data must exist first | 2026-06-23 | On REQ-0005 release | REQ-0005 Released AND meaningful portion of product catalogue has allergen/dietary data populated | Scoped out of REQ-0005 grilling. Array schema from REQ-0005 is already filter-ready. |

---

## How to Reopen a Parked Request

1. Conditions to reopen must be met.
2. Update `REQUEST_REGISTER.md`: change status from `Parked` to `New`, update Last Updated and Next Action.
3. Move the request out of this file (remove from Parked table).
4. Add the request back to `ACTIVE_REQUESTS.md` in the appropriate stage.

---

*Last updated: 2026-06-21*
