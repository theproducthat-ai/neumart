# Screens

**Object type**: `screen`  
**ID prefix**: `SCR-`  
**Owner**: Product Manager / Designer  
**Note**: Screen registry — a list of all product screens with their IDs, ownership, and status. Use for impact analysis ("which screens are affected by this feature?") and design handoff.

## Relationship to Screen Registry

The full screen registry is maintained in `01-product-architecture/SCREEN_REGISTRY.md`. This folder is for V2 screen objects that need individual tracking (e.g., a screen undergoing major redesign).

## When to Create a Screen Object Here

- A screen is being significantly redesigned
- A new screen is being added
- A screen needs its own design review history

## Screen ID Format

`SCR-[MODULE]-[SCREEN-NAME]` (e.g., `SCR-COM-PLP` for Customer Product Listing Page)

## Format

`SCR-[ID].md` with fields:
`id`, `name`, `module`, `route`, `user_roles`, `status`, `figma_url`, `components_used`, `owner`
