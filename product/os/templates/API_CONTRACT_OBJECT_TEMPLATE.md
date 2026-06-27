---
id: API-XXXX
object_type: api-contract
title: ""
status: draft
# Status: draft | agreed | implemented | deprecated | versioned

endpoint: ""
method: GET
# Method: GET | POST | PUT | PATCH | DELETE

version: "v1"
auth_required: true
feature_ref: ""
tech_design_ref: ""

owner: ""
created_date: ""
updated_date: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# api-contract

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Api Contract object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/api-contracts/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# API-XXXX: [HTTP Method] [Endpoint Path]

## Summary

[What does this API endpoint do?]

## Request

**Method**: [GET | POST | PUT | PATCH | DELETE]  
**Path**: `/api/[path]`  
**Auth**: [required — bearer token | API key | none]

### Path Parameters

| Param | Type | Required | Description |
|---|---|---|---|
| | string | yes | |

### Query Parameters

| Param | Type | Required | Default | Description |
|---|---|---|---|---|
| | string | no | | |

### Request Body (if applicable)

```json
{
  "field": "type — description"
}
```

## Response

### Success Response (200 / 201)

```json
{
  "field": "type — description"
}
```

### Error Responses

| Status | Code | Message |
|---|---|---|
| 400 | INVALID_INPUT | [description] |
| 401 | UNAUTHORIZED | [description] |
| 404 | NOT_FOUND | [description] |
| 500 | INTERNAL_ERROR | [description] |

## Rate Limiting

[Rate limit if applicable]

## Notes

[Any edge cases, versioning notes, deprecation plans]
