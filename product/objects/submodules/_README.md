# Submodules

**Object type**: `submodule`  
**Owner**: Product Manager  
**Note**: Submodule objects — used when a module is large enough to have sub-areas that need independent tracking. For example, the `customer-commerce` module might have `cart`, `checkout`, and `product-browsing` as submodules.

## When to Use

- A module has 10+ features and needs sub-area organisation
- Different team members own different parts of a module
- A submodule has its own release cycle

## Relationship to Modules

`modules/` → top-level module registry  
`submodules/` → subdivision of a module  

The module catalogue in `03-module-catalogue/` already organises by module. Use this folder for V2 submodule objects when tighter tracking is needed.

## Format

`SUBMOD-[MODULE]-[NAME].md` with fields:
`id`, `name`, `parent_module`, `features_count`, `lead`, `status`, `owner`
