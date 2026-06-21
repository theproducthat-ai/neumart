# Module: User Management

## Purpose

Manages customer and admin identity across the Nuemart platform. Handles authentication via Clerk, stores user-specific data (addresses) in Convex, and controls role-based access.

---

## Status

**Built** — Clerk authentication and address management are live. Role-based admin access is enforced.

---

## Sub-modules

| Sub-module | File | Status |
|---|---|---|
| Authentication | `authentication.md` | Built |
| Addresses | `addresses.md` | Built |
| Roles | `roles.md` | Built (Customer + Admin) — Future Candidate roles documented |

---

## Built Features (Summary)

- Clerk sign-in and sign-up (catch-all routes)
- Clerk session management and middleware
- ConvexProviderWithClerk for authenticated Convex queries
- Customer address CRUD (add, edit, delete, set default)
- Admin role via Clerk `publicMetadata.role === "admin"`
- Server-side admin guard on all `/admin/*` routes

---

## Pending Features

None. User Management is complete for the MVP.

---

## Future Candidates

- Customer profile management (name, phone, preferences)
- Additional roles: Inventory Manager, Delivery Manager, Delivery Person, Support User
- In-app role management (currently roles are set manually via Clerk Dashboard)
- Multi-user admin management (who has admin access, when it was granted)

---

## Related Modules

| Module | Relationship |
|---|---|
| Customer Commerce | Authentication gates all customer routes; addresses gate checkout |
| Admin Console | Admin role gates all `/admin/*` routes |
| Payment Management | User identity linked to payments and orders |
| Delivery Management | Future: delivery persons may need their own user accounts / roles |

---

## Risks and Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Admin role manually assigned via Clerk Dashboard | First admin must be set up externally, not via the app | Document the Clerk Dashboard role assignment process |
| Clerk dependency | Outage in Clerk would prevent all authentication | Standard cloud provider risk; acceptable for MVP |

---

*Last updated: 2026-06-21*
