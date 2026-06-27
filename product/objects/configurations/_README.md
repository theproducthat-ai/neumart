# Configurations

**Object type**: `configuration`  
**Owner**: Engineering Lead  
**Note**: Product configuration registry — settings, toggles, and configurable parameters that affect product behaviour. Distinct from feature flags (which are for rollout control) — these are persistent configuration values.

## When to Use

- Documenting configurable thresholds (e.g., minimum order value, max cart items)
- Tracking environment-specific configuration
- Documenting admin-controllable settings

## Format

`CONFIG-[NAME].md` or `CONFIG-[MODULE]-[NAME].md` with fields:
`id`, `name`, `description`, `type`, `default_value`, `allowed_values`, `environment`, `editable_by`, `impact`, `owner`
