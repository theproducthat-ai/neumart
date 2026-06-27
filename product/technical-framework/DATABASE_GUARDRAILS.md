# Database Guardrails — Nuemart

Rules for the Convex database schema, migrations, and data access patterns.

---

## Schema Ownership

- `convex/schema.ts` is the single source of truth. All table definitions live there.
- No undocumented schema changes. Every change must be traceable to a REQ or FEA object.
- Schema changes that break existing data require a migration plan. See `product/objects/data-migrations/`.

## Approval Required For

- Adding a new table.
- Adding or removing a field from an existing table.
- Changing a field's type.
- Adding or removing an index.
- Any change that could fail if old documents exist without the new field.

Document the change in a `data-migrations` object even if no migration script is needed.

## Index Rules

- Every field used in `.withIndex()` must have an index defined in the schema.
- Every field used frequently in `.filter()` should have an index.
- Index names: `by_fieldName` (single field) or `by_field1_field2` (composite).
- Do not add speculative indexes for future queries. Add them when the query exists.

## Field Naming

- All field names: `camelCase`.
- IDs that reference other tables: `tableNameId` (e.g., `userId`, `productId`, `orderId`).
- Timestamps: `createdAt`, `updatedAt` (Unix ms, as Convex stores `_creationTime` automatically).
- Boolean flags: `is` prefix (`isActive`, `isDeleted`, `isVerified`).
- Soft deletes: Use `isDeleted: boolean` + `deletedAt: number | null`. Never hard-delete user or order data.

## Data Safety

- Never store payment card numbers, CVVs, or raw bank account details.
- Store only payment gateway references (Razorpay order IDs, payment IDs).
- PII (names, phone, address) stored in Convex must not appear in client-side error logs.
- Bulk deletes require explicit confirmation flow. No single-query wipe of production data.

## Query Performance

- Avoid full-table scans. Every production list query uses an index.
- Use pagination for all lists. Never return more than 100 documents in one call without pagination.
- Avoid N+1 patterns. Batch reads where possible using `ctx.db.get()` in parallel or denormalized fields.

## Migration Approach

1. Write new fields as optional (`optional(v.string())`).
2. Backfill existing documents in a Convex action or scheduled migration.
3. Once all documents are updated, tighten the validator to required if appropriate.
4. Log migration progress; do not run unbounded migrations in a single mutation.

---

## Related
- `BACKEND_GUARDRAILS.md`
- `product/objects/data-migrations/_README.md`
