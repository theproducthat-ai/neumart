# Data Entities

**Object type**: `data-entity`  
**Owner**: Engineering Lead  
**Note**: Data entity registry — the key domain objects and their relationships. Used for product understanding, onboarding, and impact analysis. This is a product-level view of the data model, not a technical schema.

## When to Use

- Documenting core domain entities for team reference
- Onboarding new product or engineering team members
- Impact analysis — understanding what data is affected by a feature change

## Relationship to Technical Schema

The full technical schema lives in `schema.ts`. The objects here are product-level descriptions for non-technical stakeholders.

## Standard Entities to Document

- User / Customer
- Product
- Category
- Order
- OrderItem
- Cart
- DeliverySlot
- Address
- Payment
- Coupon

## Format

`ENT-[NAME].md` with fields:
`id`, `name`, `description`, `key_fields`, `relationships`, `owned_by_module`, `owner`
