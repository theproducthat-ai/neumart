# Sub-module: Roles

**Module:** User Management  
**Status:** Built (Customer + Admin) — Future Candidate roles documented

---

## Purpose

Controls what each user can see and do in Nuemart. Role assignment and enforcement must be authoritative — a user who claims to be an admin in the frontend cannot bypass server-side checks.

---

## Current Roles (Built)

### Customer

- **Who:** Any authenticated Clerk user without an admin role.
- **How assigned:** Default — any user who signs up via Clerk is a customer.
- **Access:** All customer-facing routes. Cannot access `/admin/*`.

### Admin

- **Who:** A Clerk user with `publicMetadata.role === "admin"`.
- **How assigned:** Manually via Clerk Dashboard → Users → select user → Edit metadata → set `{ "role": "admin" }`.
- **Access:** All `/admin/*` routes in addition to customer routes.
- **Enforcement:** Server-side check in the admin layout — `auth().sessionClaims.publicMetadata.role === "admin"`. Non-admin users are redirected.
- **Convex guard:** All admin Convex mutations call `assertAdmin(ctx)` which validates the `role` from the Convex auth context.

---

## Future Candidate Roles

See `ROLE_PERMISSION_MAP.md` for the full permission matrix and rationale for each future role.

### Inventory Manager *(Future Candidate)*

An operator who can manage stock without access to orders or financial data.

### Delivery Manager *(Candidate — Delivery Module)*

A team member who manages delivery assignment and status. Depends on Delivery Management module.

### Delivery Person *(Candidate — Delivery Module)*

A field operator who updates delivery status and captures proof of delivery. Depends on Delivery Management module.

### Support User *(Future Candidate)*

A read-only operator who can look up customer orders for issue resolution.

---

## Role Implementation Notes

| Concern | Current approach | Future consideration |
|---|---|---|
| Role storage | Clerk `publicMetadata.role` | Could move to Convex `users.role` field for richer role logic |
| Role assignment | Manual via Clerk Dashboard | In-app admin user management UI |
| Role enforcement (routes) | Server-side Clerk `auth()` in admin layout | |
| Role enforcement (Convex) | `assertAdmin(ctx)` helper on all admin mutations | Per-role guards when more roles exist |
| Multiple roles | Not supported today | Clerk Organisations or a custom roles array in Convex |

---

## How to Assign Admin Role (Current Process)

1. Go to Clerk Dashboard → Users.
2. Find the user to promote.
3. Click Edit → Metadata.
4. Set Public Metadata to: `{ "role": "admin" }`.
5. Save.

The change takes effect on the user's next request (session claims are refreshed on next sign-in or token refresh).

---

*Last updated: 2026-06-21*
