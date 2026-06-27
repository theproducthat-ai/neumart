# Subfeatures

**Object type**: `subfeature`  
**ID prefix**: `SUBFEAT-`  
**ID format**: `SUBFEAT-[PARENT-FEAT-ID]-[NNN]`  
**Owner**: Product Manager  
**Template**: `product/os/templates/SUBFEATURE_OBJECT_TEMPLATE.md`

## What Belongs Here

A subfeature is a meaningful subdivision of a feature. Use when a feature is large enough to require separate design, separate engineering tracks, or independent delivery.

## When to Create

- A feature has 2+ independently deliverable components
- A feature spans multiple screens with meaningfully different logic
- A feature has components that may be delivered in different releases

## Required Relationships

- **Parent**: `features/` (required — a subfeature must belong to a feature)
- **Children**: `user-stories/`
- **May have**: separate `designs/`, `technical-designs/`

## Lifecycle / Statuses

`draft` → `approved` → `in-development` → `in-qa` → `released` | `deferred`

## Required Fields

`id`, `title`, `status`, `parent_feature`, `owner`, `created_date`

## Example IDs

- `SUBFEAT-FEAT-COM-PLP-001-001` — First subfeature of FEAT-COM-PLP-001
- `SUBFEAT-FEAT-ADM-INV-001-002` — Second subfeature of FEAT-ADM-INV-001

## Owner Roles

| Action | Role |
|---|---|
| Creates | Product Manager |
| Owns delivery | Engineering Lead |
