# Route → Screen Map

Maps every application route to its screen object, file path, and access rules.

---

## Customer Routes

| Route Path | Screen ID | Screen Name | File Path | Auth | Roles |
|-----------|-----------|------------|-----------|------|-------|
| / | | | | no | all |
| /products | | | | no | all |
| /products/[id] | | | | no | all |
| /cart | | | | yes | customer |
| /checkout | | | | yes | customer |
| /orders | | | | yes | customer |
| /orders/[id] | | | | yes | customer |
| /profile | | | | yes | customer |

---

## Admin Routes

| Route Path | Screen ID | Screen Name | File Path | Auth | Roles |
|-----------|-----------|------------|-----------|------|-------|
| /admin | | | | yes | admin |
| /admin/products | | | | yes | admin |
| /admin/orders | | | | yes | admin |
| /admin/users | | | | yes | admin |

---

## Auth Routes

| Route Path | Screen ID | Screen Name | Managed By |
|-----------|-----------|------------|------------|
| /sign-in | | | Clerk |
| /sign-up | | | Clerk |

---

## API Routes (Webhooks Only)

| Route Path | Handler File | Purpose |
|-----------|-------------|---------|
| /api/webhooks/clerk | | Clerk user sync |
| /api/webhooks/razorpay | | Payment events |

---

## Related
- Screen index: `product/indexes/SCREEN_INDEX.md`
- Policy: `product/os/policies/SCREEN_REFERENCE_RULES.md`
