# Impact Assessment Template — Field Definitions

Reference guide explaining the purpose of every field in the IMPACT-template. Use this to understand how to fill in an impact assessment correctly.

---

## Business Impact

What is the business value of this request? Does it open a revenue stream, reduce costs, prevent churn, or satisfy a compliance requirement? Rate: High / Medium / Low.

## Customer Impact

How does this change the customer's experience? Positive (new capability, faster flow), neutral (invisible change), or negative (disrupted existing flow)? Who is affected?

## Admin Impact

Does the admin's workflow change? Does the admin get new tools, lose existing tools, or need to adapt existing processes?

## Operational Impact

Does this change how the store is operated day-to-day? Does it require new training, new SOPs, or new monitoring?

## Technical Impact

How complex is the engineering change? Number of files, new Convex functions, new queries, new schema, new external integrations. Rate: High / Medium / Low.

## Data / Schema Impact

Does this require changes to `schema.ts`? New tables, new fields, new indexes, or removal of existing fields? Schema changes are irreversible in most cases and must be assessed carefully.

## Backend Impact

Which Convex functions (queries, mutations, actions, HTTP actions) are created, modified, or deleted?

## Frontend Impact

Which Next.js pages, components, layouts, or hooks are created, modified, or deleted?

## Screen Impact

Which screens (from SCREEN_REGISTRY.md) are added, modified, or deprecated? Do new screens require new Screen IDs?

## Role / Permission Impact

Does this change what roles can do? Does it add a new role? Does it restrict or expand existing permissions? Reference ROLE_PERMISSION_MAP.md.

## Payment Impact

Does this touch payment amounts, totals, fee calculations, Razorpay API calls, webhook handling, or the `payments` table? Payment changes are high risk.

## Inventory Impact

Does this change when or how stock is reduced? Does it affect the `stockMovements` audit trail? Does it reserve stock?

## Reporting Impact

Does this add, change, or remove data that feeds into existing reports or dashboard stats?

## Integration Impact

Does this depend on or modify an external integration? (Razorpay, Clerk, Convex Cloud, Vercel, SMS gateway, etc.)

## Security / Compliance Impact

Does this expose sensitive data? Does it change authentication or authorization? Does it have implications for Indian payment regulation (RBI) or data privacy?

## QA Impact

How many test scenarios are required? Are any existing regression tests affected? Is automated testing feasible?

## UAT Impact

What does the business owner need to verify in UAT? How long will UAT take?

## Release Impact

Is a deployment window needed? Are environment variables required? Is a schema migration required?

## Rollback Complexity

If this goes wrong in production, how hard is it to roll back?

| Rating | Meaning |
|---|---|
| Simple | Revert the code deploy; no data change |
| Moderate | Code revert + reverse a schema field or migration |
| Complex | Code revert + data migration + Razorpay API calls to reverse |
| Very Complex | Irreversible — must plan carefully; consider a feature flag |

---

*Last updated: 2026-06-21*
