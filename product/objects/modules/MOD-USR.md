---
id: MOD-USR
name: User Management
domain_code: USR
object_type: module
status: active
owner: product_lead
version: "2.0"
---

# MOD-USR — User Management

## Purpose

The User Management module handles identity, authentication, authorisation, and user profiles across all Neumart user types — customers, admins, and delivery partners.

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-USR-AUTH | Authentication | Sign in, sign up, session management (Clerk) |
| MA-USR-PROFILE | Profile | Customer profile, preferences, notification settings |
| MA-USR-ADDRESS | Address Book | Saved delivery addresses, set default |
| MA-USR-ROLES | Role Management | Role assignment, permission scoping (admin, delivery, customer) |

---

## User Groups

- All user types (customers, admins, delivery partners)

---

## Key Capabilities

- Register and authenticate users
- Manage user sessions
- Store and retrieve user profiles
- Manage delivery address book
- Assign and enforce roles and permissions

---

## Integration

Authentication is powered by **Clerk**. User identity changes must be tested against Clerk's API.

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| All modules | Every module requires user identity and auth checks |

---

## Security Notes

- Role changes require engineering lead review (blocking flag: `role_change`)
- Auth changes require security review (blocking flag: `security_change`)
