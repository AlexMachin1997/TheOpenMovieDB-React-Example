# Specs status

Tracks feature specs and the order they must land in. A deliverable marked
**blocked** must not move into `implementation-planning` (let alone actual code) until
everything in its "Depends on" column is done and merged — not just spec'd.

| Deliverable         | Status | Depends on     | Spec                                             | Discovery                                                     |
| ------------------- | ------ | -------------- | ------------------------------------------------ | ------------------------------------------------------------- |
| Icon component      | done   | —              | [icon-component.md](icon-component.md)           | [icon-component.md](../discovery/icon-component.md)           |
| Button enhancements | done   | Icon component | [button-enhancements.md](button-enhancements.md) | [button-enhancements.md](../discovery/button-enhancements.md) |
| Focus indicators    | draft  | —              | [focus-indicators.md](focus-indicators.md)       | [focus-indicators.md](../discovery/focus-indicators.md)       |

## Why this file exists

Discovery/spec work can happen for a blocked deliverable ahead of time (as we did for
Button), but implementation cannot start until its dependency row says "done." Update
this table whenever a deliverable's status changes.

## Statuses

- **draft** — spec written but still has Open Questions that must be settled before
  `implementation-planning` starts.
- **ready** — no blocking dependencies and no open questions; safe to plan and build.
- **blocked** — waiting on everything in its "Depends on" column to be done and merged.
- **done** — shipped, with an as-built record in `docs/plans/`.
