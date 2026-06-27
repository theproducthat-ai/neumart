# Roadmap Governance

**Version**: 2.0  
**Owner**: Product Lead

---

## Purpose

Defines how the product roadmap is managed — who can change it, when, and how. A governed roadmap builds trust with stakeholders and prevents constant re-prioritisation that disrupts the team.

---

## Roadmap Levels

### Level 1 — Strategic Roadmap (Annual)
- Horizon: 12-18 months
- Granularity: Initiatives and themes
- Audience: Leadership, investors, board
- Update frequency: Quarterly review
- Owner: Product Lead + CEO

### Level 2 — Quarterly Roadmap
- Horizon: 3 months
- Granularity: Features and epics
- Audience: All stakeholders
- Update frequency: Quarterly, minor updates monthly
- Owner: Product Lead

### Level 3 — Sprint Roadmap
- Horizon: 2-4 weeks
- Granularity: Stories and tasks
- Audience: Product + Engineering team
- Update frequency: Per sprint planning
- Owner: Engineering Lead + Product Manager

---

## Who Can Change the Roadmap

### Immediate (no process needed)
- Engineering Lead can move stories within a sprint for dependency/blocker reasons
- Product Manager can swap equivalent-effort stories within a sprint (Engineering Lead informed)

### Weekly Cadence (weekly product review)
- Minor re-ordering of backlog items
- New small enhancement requests added to backlog
- Owner: Product Lead (decides at weekly review)

### Quarterly Review (formal roadmap change)
- Adding or removing features from the quarterly plan
- Changing initiative scope
- Owner: Product Lead + CEO alignment
- Required input: Updated capacity plan, updated priority scores, stakeholder communication plan

### Unplanned / Emergency
- P0 incidents or compliance emergencies can displace roadmap items
- Product Lead decides what is displaced
- Affected stakeholders must be notified within 24 hours

---

## Roadmap Change Request Process

If a stakeholder wants to change the roadmap:

1. Submit a `request` or `sales-request` / `client-request` as appropriate
2. Product Manager adds a priority score
3. Reviewed at next weekly product review (minor) or roadmap review (major)
4. Product Lead decides with visibility to Engineering Lead and CEO
5. Decision communicated back to stakeholder within agreed SLA

**No roadmap changes are accepted by direct message to engineers.**

---

## Roadmap Lock Rules

- Sprint scope is locked when the sprint starts (only emergency changes allowed)
- Quarterly roadmap is locked for the first 2 weeks of each quarter
- Unplanned work displacing roadmap items requires Product Lead sign-off

---

## Communicating Roadmap Changes

When a roadmap change is made:
- Update `views/ROADMAP_VIEW.md`
- Update the relevant `features/` objects with new release targets
- Notify affected stakeholders within 24 hours
- If a client commitment is impacted → immediate escalation to Product Lead + CEO

---

## Governance Cadences

| Cadence | Purpose | Participants | Frequency |
|---|---|---|---|
| Weekly product review | Intake and minor prioritisation | PM + Eng Lead | Weekly |
| Roadmap review | Quarterly planning | PM + Eng Lead + CEO | Quarterly |
| Sprint planning | Sprint commitment | PM + Eng team | Per sprint |
| Stakeholder review | Roadmap communication | PM + stakeholders | Monthly |

*Full cadence details: `team-operating-model/`*
