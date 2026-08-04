# Components — roadmap

Work on individual components: building a new one, or extending an existing one's API.
Cross-component consistency belongs in [`design-system/`](../design-system/README.md); code health
belongs in [`refactor/`](../refactor/README.md).

A deliverable marked **blocked** must not move into implementation planning — let alone code —
until everything in its "Depends on" column is done and merged, not merely spec'd. Discovery and
spec work can happen ahead of that, and did for Button.

| ID  | Deliverable         | Status  | Depends on | Docs                                                     |
| --- | ------------------- | ------- | ---------- | -------------------------------------------------------- |
| 01  | Icon component      | ✅ done | —          | [01-icon](01-icon/spec.md)                               |
| 02  | Button enhancements | ✅ done | 01         | [02-button-enhancements](02-button-enhancements/spec.md) |

Numbers are stable IDs assigned at creation, not build order — see [`docs/README.md`](../README.md).

## Statuses

- **draft** — spec written, but Open Questions remain that must be settled before planning starts.
- **ready** — no blocking dependencies and no open questions; safe to plan and build.
- **blocked** — waiting on its "Depends on" column.
- **in progress** — being built.
- **done** — shipped, with an as-built `plan.md`.

Update the table whenever a status changes. A stale status is worse than none: the `refactor/`
roadmap listed a shipped deliverable as `todo` for several sessions before anyone noticed.
