# Cost Guardrails — Nuemart

Rules to keep infrastructure costs predictable and proportional to business value.

---

## Convex Costs

Convex bills on: function calls, database reads/writes, storage, bandwidth.

| Rule | Why |
|------|-----|
| Paginate all list queries (max 50/page) | Unbounded queries consume reads linearly |
| Do not subscribe to queries returning >500 documents | Subscription costs scale with document count |
| Avoid `collect()` on large tables in production | Full table scan = expensive |
| Use indexes — unindexed queries are slower AND more expensive | Index reads are cheaper |
| Scheduled functions should process in batches, not one-at-a-time loops | Per-call billing |
| Clean up storage files when their linked objects are deleted | Storage costs accumulate |

## Vercel Costs

- Avoid serverless function invocations for non-webhook, non-SSR work. Use Convex instead.
- Use Vercel Image Optimisation judiciously. Each unique image transformation is billed.
- ISR (Incremental Static Regeneration) reduces function invocations for product/catalogue pages.

## Third-Party API Costs

| Service | Cost Driver | Rule |
|---------|-------------|------|
| Razorpay | Per transaction fee | No test-mode transactions in production |
| Clerk | Monthly active users | Don't create test users in production |
| Vercel Analytics | Page views | Enabled in production only |

## Cost-Per-Order Awareness

Before shipping a feature, estimate its cost per 1,000 orders:
- Additional Convex function calls.
- Additional external API calls.
- Additional storage.

If cost per order increases by more than 10%, flag for review.

## Cost Monitoring

- Review Convex usage dashboard monthly.
- Review Vercel billing monthly.
- Spike in function calls or storage without corresponding user growth = investigate.

## Prohibited Cost Patterns

- Polling from the frontend (use Convex subscriptions instead).
- Storing large blobs (PDFs, images) in Convex DB fields (use file storage or external CDN).
- Running unlimited background jobs without concurrency limits.
- Calling external APIs per user action without debouncing or rate limiting.

---

## Related
- `PERFORMANCE_GUARDRAILS.md`
- `BACKEND_GUARDRAILS.md`
- `OBSERVABILITY_GUARDRAILS.md`
