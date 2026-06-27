# Features

**Object type**: `feature`  
**ID prefix**: `FEAT-`  
**ID format**: `FEAT-[MODULE]-[SCREEN]-[NNN]` (e.g., FEAT-COM-PLP-001)  
**Owner**: Product Manager  
**Template**: `product/os/templates/FEATURE_OBJECT_TEMPLATE.md`

## What Belongs Here

A feature is a discrete, user-visible capability. It represents something the product can do that provides value to a role (customer, admin, delivery agent, etc.). Features are the primary unit of product delivery.

## When to Create

- A request has been approved and classified as a new feature or feature enhancement
- The team has decided to build something new or meaningfully change existing behavior
- A PRD is being written — the feature object should exist before the PRD

## Required Relationships

- **Parent**: `requests/` (the originating request)
- **Children**: `subfeatures/`, `user-stories/`, `epics/`
- **Specifies**: `prds/` (one PRD per complex feature)
- **Belongs to**: module (referenced by module code in the ID)

## Lifecycle / Statuses

`draft` → `approved` → `in-design` → `in-development` → `in-qa` → `in-uat` → `released` → `post-release` | `deprecated`

## Required Fields

`id`, `title`, `status`, `module`, `owner`, `request_ref`, `created_date`, `priority`

## Example IDs

- `FEAT-COM-PLP-001` — Customer Commerce / Product Listing Page feature #1
- `FEAT-ADM-INV-001` — Admin Console / Inventory feature #1
- `FEAT-DEL-ASN-001` — Delivery Management / Assignment feature #1

## Owner Roles

| Action | Role |
|---|---|
| Creates | Product Manager |
| Approves | Product Lead |
| Designs | Designer |
| Estimates | Engineering Lead |
| Releases | Engineering Lead + Product Manager |
