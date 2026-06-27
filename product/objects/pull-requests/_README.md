# Pull Requests

**Object type**: `pull-request`  
**ID prefix**: `PR-`  
**ID format**: `PR-NNNN` (maps to GitHub PR number)  
**Owner**: Engineer (author)  
**Template**: `product/os/templates/PULL_REQUEST_OBJECT_TEMPLATE.md`

## What Belongs Here

Pull request objects — records of significant PRs that need product traceability. Not every PR needs an object here; only PRs for Standard Feature and above, or PRs that need cross-functional review tracking.

For most PRs, the GitHub PR is sufficient. Create an object here when:
- A PR is for a Standard Feature or above
- A PR needs product manager review or signoff
- A PR is part of a client commitment delivery

## Required Relationships

- **Implements**: `user-stories/`, `tasks/`
- **Part of**: `releases/`
- **Reviewed by**: Engineering Lead (code review per `engineering/CODE_REVIEW_RULES.md`)

## Lifecycle / Statuses

`draft` → `in-review` → `approved` → `merged` | `closed`

## Required Fields

`id`, `title`, `status`, `github_pr_url`, `story_ref`, `reviewer`, `owner`, `created_date`

## Example IDs

- `PR-0042` — GitHub PR #42
