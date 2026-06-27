# Intake Batches

Stores parent objects created when a user submits a single message containing multiple requests. Each intake batch groups its child requests and tracks decomposition status.

## ID Format
`BATCH-YYYYMMDD-NNN`

## Lifecycle
`open` → `decomposed` → `closed`

## Linked Objects
- child requests in `product/objects/requests/`
- policy: `product/os/policies/MULTI_REQUEST_DECOMPOSITION_RULES.md`
- template: `product/os/templates/INTAKE_BATCH_OBJECT_TEMPLATE.md`
