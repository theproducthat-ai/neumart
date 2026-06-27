# Prompts

**Object type**: `prompt`  
**Owner**: Product Manager / Engineering Lead  
**Note**: AI coding prompt objects — prompts used to generate or guide AI-assisted development. These are the prompts stored from the `/product-build-prompt` command and similar AI-assisted development workflows.

## When to Use

- A complex feature needs an AI coding prompt stored for reuse or reference
- A prompt is versioned as the feature evolves
- Prompts need to be audited or reviewed

## Relationship to Development Plans

V1 development plans in `09-development-planning/plans/` had associated `DEVPLAN-XXXX-coding-prompt.md` files. V2 stores prompts here as reusable objects.

## Format

`PROMPT-[DEVPLAN-ID]-[description].md` with fields:
`id`, `feature_ref`, `devplan_ref`, `prompt_version`, `context`, `prompt_content`, `generated_output_summary`, `owner`, `created_date`
