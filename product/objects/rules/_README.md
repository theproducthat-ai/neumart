# Rules

**Object type**: `rule`  
**Owner**: Product Manager / Engineering Lead  
**Note**: Business rule objects — explicit rules that govern product behaviour (e.g., pricing rules, eligibility rules, validation rules). Documenting rules separately makes them discoverable and prevents implicit logic from being lost.

## When to Create

- A business rule affects multiple features or screens
- A rule has exceptions that need to be documented
- A rule change requires cross-team communication
- Compliance requires documented business rules

## Format

`RULE-[DOMAIN]-NNNN.md` with fields:
`id`, `rule`, `domain`, `applies_to`, `exceptions`, `source`, `last_reviewed`, `owner`

## Examples

- `RULE-ORDER-0001` — Minimum order value is £10
- `RULE-COUPON-0001` — Coupons cannot be combined
- `RULE-DELIVERY-0001` — Free delivery on orders > £30
