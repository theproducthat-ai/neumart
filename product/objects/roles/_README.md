# Roles

**Object type**: `role`  
**Owner**: Product Manager / Engineering Lead  
**Note**: User role registry — the roles within the product system and their permissions. Used for RACI mapping, feature scoping, and permission design.

## Neumart Roles

- `customer` — end user placing orders
- `admin` — store manager with full backend access
- `delivery-agent` — fulfils deliveries
- `super-admin` — platform administrator
- `operations-manager` — ops oversight
- `business-owner` — read-only analytics and reporting access

## When to Create/Update

- A new user role is introduced
- An existing role's permissions change significantly
- A feature scopes to specific roles

## Format

`ROLE-[NAME].md` with fields:
`id`, `name`, `description`, `permissions`, `screens_accessible`, `features_accessible`, `owner`

Full role/permission map: `01-product-architecture/ROLE_PERMISSION_MAP.md`
