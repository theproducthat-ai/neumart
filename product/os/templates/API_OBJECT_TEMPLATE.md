---
id: ""                               # e.g. API-COM-PLP-CAROUSEL-001
object_type: API
title: ""
status: ""                           # draft | review | active | deprecated
priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# API

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Api object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/apis/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# API Object Template

**Object type**: `api`
**ID format**: `API-[MODULE]-[RESOURCE]` (e.g., `API-COM-PRODUCTS`)
**Folder**: `product/objects/apis/`
**Note**: For detailed request/response schemas, use `api-contracts/` with `API_CONTRACT_OBJECT_TEMPLATE.md`.

---

```yaml
---
id: API-[MODULE]-[RESOURCE]
object_type: api
module: COM | ADM | DEL | INV | PAY | USR | RPT
resource: [resource name, e.g., products, orders, cart]
method: GET | POST | PUT | PATCH | DELETE | ALL
route: /api/[path]
version: v1
auth_required: true | false
auth_type: clerk-jwt | api-key | none
status: active | deprecated | planned
contract_ref: API-CONTRACT-[ID] (link to full contract object if exists)
owner: Engineering Lead
created_date: YYYY-MM-DD
updated_date: YYYY-MM-DD
---
```

# API-[ID] — [Resource Name]

## Summary

One sentence describing what this API endpoint does.

---

## Endpoint Details

| Field | Value |
|---|---|
| Route | `/api/[path]` |
| Method | GET / POST / etc. |
| Authentication | Required / Not required |
| Auth mechanism | Clerk JWT / API key / none |
| Module | COM / ADM / DEL / etc. |
| Version | v1 |

---

## Purpose

What this endpoint is for and which features or user flows depend on it.

---

## Request

**Path parameters:**
- `[param]` — [description]

**Query parameters:**
- `[param]` — [description, type, required/optional]

**Request body (if applicable):**
```json
{
  "field": "type"
}
```

---

## Response

**Success (200 / 201):**
```json
{
  "field": "type"
}
```

**Error responses:**
| Status | Reason |
|---|---|
| 400 | Invalid request body |
| 401 | Unauthorized |
| 403 | Forbidden — insufficient role |
| 404 | Resource not found |
| 500 | Internal server error |

---

## Authorization

Which user roles can call this endpoint:
- `customer` — [yes / no / read-only]
- `admin` — [yes / no]
- `delivery_agent` — [yes / no]
- `unauthenticated` — [yes / no]

---

## Dependencies

| Depends On | Reason |
|---|---|
| [Convex function] | [what it calls] |
| [External service] | [e.g., Clerk for identity] |

---

## Contract Reference

Full request/response schema: [API-CONTRACT-XXX](../../api-contracts/API-CONTRACT-XXX.md)

---

## Linked Features

| FEAT ID | Feature Name |
|---|---|
| | |

---

## Change History

| Version | Date | Changed By | Summary |
|---|---|---|---|
| v1 | YYYY-MM-DD | | Initial |
