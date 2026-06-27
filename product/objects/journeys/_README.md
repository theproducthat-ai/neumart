# Journeys

**Object type**: `journey`  
**ID prefix**: `JRN-`  
**Owner**: Product Manager / Designer  
**Template**: `product/os/templates/JOURNEY_OBJECT_TEMPLATE.md`

## What Belongs Here

Customer or user journey maps — end-to-end flows showing how a user (customer, admin, delivery agent) moves through the product to accomplish a goal. Journeys reveal friction points, gaps, and opportunities.

## When to Create

- During discovery for a major feature
- When onboarding a new designer or product manager
- When a cross-module flow needs to be mapped
- When a support issue reveals a broken journey

## Required Relationships

- **Involves**: `features/`, `screens/`
- **Informs**: `prds/`, `designs/`

## Lifecycle / Statuses

`draft` → `validated` → `active` → `outdated` → `archived`

## Standard Journeys to Document

- Customer: browse → search → product detail → cart → checkout → order tracking
- Admin: product management → inventory → order management → reporting
- Delivery agent: accept order → collect → deliver → proof of delivery

## Format

`JRN-[ROLE]-[GOAL].md` with sections:
`id`, `role`, `goal`, `steps`, `touchpoints`, `pain_points`, `opportunities`, `owner`
