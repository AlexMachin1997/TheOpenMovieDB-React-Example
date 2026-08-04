# Documentation

Planning and design documentation for this repo: what's been built, what's specified, and what's
outstanding. Each deliverable is one folder holding its own `discovery.md` / `spec.md` / `plan.md`.

How that layout works and why — naming, the lifecycle roles, what to do when one file per role
isn't enough — is a convention rather than a fact about this project, so it lives in
[`.claude/skills/documentation-structure`](../.claude/skills/documentation-structure/SKILL.md) and
the `deliverable-documentation` skill it points to. Read those before adding a document. This file
is just the roadmap.

## Roadmap

| ID  | Deliverable         | Area          | Status   | Depends on | Docs                                                     |
| --- | ------------------- | ------------- | -------- | ---------- | -------------------------------------------------------- |
| 01  | Icon component      | component     | ✅ done  | —          | [01-icon](01-icon/spec.md)                               |
| 02  | Button enhancements | component     | ✅ done  | 01         | [02-button-enhancements](02-button-enhancements/spec.md) |
| 03  | Focus indicators    | design system | 📝 draft | TBD        | [03-focus-indicators](03-focus-indicators/spec.md)       |
| 04  | ui-forms: primitive migration | architecture | ready | —   | [04-ui-forms-primitive-migration](04-ui-forms-primitive-migration/spec.md) |
| 05  | ui-forms: Field pattern | architecture | ready | 04     | [05-ui-forms-field-pattern](05-ui-forms-field-pattern/spec.md) |

`draft` — open questions remain before planning · `ready` — safe to plan and build · `blocked` —
waiting on its dependencies · `in progress` · `done` — shipped, with an as-built `plan.md`.

**Area is a label, not a location.** Nothing about a deliverable's folder depends on it.

### Legacy

[`refactor/`](refactor/README.md) predates this layout: flat files, its own status table,
deliverable IDs `P0` and `D0`–`D10`. Left alone deliberately, and **closed to new work** — anything
new goes in the table above. It keeps its own roadmap rather than having its rows duplicated here,
which would give the same statuses two sources of truth.

### Planned

A **design-system audit** across six axes — tokens, interaction states, size scales, variant
taxonomy, dark mode coverage, motion — would add deliverables to the table above. Not started.

`03-focus-indicators` is what surfaced the need for it. Measuring the focus ring turned up three
unrelated focus idioms, a component hardcoding raw palette colours, and a WCAG 2.2 SC 2.4.11 failure
in both themes. None of that is really about focus — it's what a library assembled from copied
component code looks like when nobody has defined the system it should obey.

**JSON/schema-driven form rendering** would add a deliverable once `05-ui-forms-field-pattern` ships.
Deliberately not specified yet — schema format, validation-library integration, and extensibility for
custom field types are all open, and it needs its own `problem-discovery` pass once the `Field`
composition layer it would render onto actually exists.
