# Documentation

Planning and design documentation for this repo: what's been built, what's specified, and what's
outstanding. Each deliverable is one folder holding its own `discovery.md` / `spec.md` / `plan.md`.

How that layout works and why — naming, the lifecycle roles, what to do when one file per role
isn't enough — is a convention rather than a fact about this project, so it lives in
[`.claude/skills/documentation-structure`](../.claude/skills/documentation-structure/SKILL.md) and
the `deliverable-documentation` skill it points to. Read those before adding a document. This file
is just the roadmap.

## Roadmap

Outstanding work only. Everything shipped is under [Shipped](#shipped) below.

| ID  | Deliverable       | Area          | Status   | Depends on | Docs                                                 |
| --- | ----------------- | ------------- | -------- | ---------- | ---------------------------------------------------- |
| 03  | Focus indicators  | design system | 📝 draft | —          | [03-focus-indicators](03-focus-indicators/spec.md)   |
| 19  | Alert dialog      | components    | 📝 draft | 18 ✅      | [19-alert-dialog](19-alert-dialog/spec.md)           |
| 20  | Popover semantics | components    | 🟢 ready | 18 ✅      | [20-popover-semantics](20-popover-semantics/spec.md) |

`draft` — open questions remain before planning · `ready` — safe to plan and build · `blocked` —
waiting on its dependencies · `in progress` · `done` — shipped, with an as-built `plan.md`.

**Area is a label, not a location.** Nothing about a deliverable's folder depends on it.

**Numbers are allocation order, not chronology.** `06`–`11` shipped _before_ `01`–`05`; they carry
higher numbers because they were migrated into this layout later. An ID is an identifier, nothing
more. Once work has **shipped** under an ID that ID is fixed forever; unstarted specs can still be
merged or renumbered, as `12`–`16` were when the first cut of them was split too finely.

### Suggested order

`03` has no dependencies — it is `draft` because three
[open questions](03-focus-indicators/spec.md#open-questions) need answering before planning can
start, and all three are calls to make rather than work to do: whether WCAG 2.2 SC 2.4.11 is the
target (the library committed to 2.1 AA under `02`), how far "all interactive elements" reaches, and
whether `--ring`'s own values change. The design-system audit under **Planned** is downstream of
`03`, not a blocker for it.

`19` is the alert dialog `18` was the gate on. It grew past the thin preset it was scoped as: the
`role="alertdialog"` component is only half of it, and the other half is a declared dismissal policy
and an awaitable action on the shared overlay, both of which `Dialog` and `Sheet` inherit. Its
[open questions](19-alert-dialog/spec.md#open-questions) are what keep it `draft`, and one of them —
whether an awaitable close reaches `onRequestClose` — has to be answered before the shared half can
be planned.

`20` is `ready` rather than `draft` because the three questions that kept it in `planned.md` have
been answered: the support floor rises to reach CSS anchor positioning, `role="dialog"` goes, and the
role fix turned out not to need the primitive swap at all — Radix sets the role as a default a caller
can override, not as a fixture. It owns the nine `aria-dialog-name` failures that `17` disabled with
a pointer rather than fix; they were never `18`'s, since `Popover` was moved out of it. Its two
phases are independent, and only the second waits on the floor.

## Planned

Agreed or open, but with no folder yet. The reasoning behind each — what it would cost, why it isn't
decided — is in [`planned.md`](planned.md).

## Shipped

Kept for reference; each links to its as-built record. These rows do not change.

| ID  | Deliverable                   | Docs                                                                       |
| --- | ----------------------------- | -------------------------------------------------------------------------- |
| 01  | Icon component                | [01-icon](01-icon/plan.md)                                                 |
| 02  | Button enhancements           | [02-button-enhancements](02-button-enhancements/plan.md)                   |
| 04  | ui-forms: primitive migration | [04-ui-forms-primitive-migration](04-ui-forms-primitive-migration/plan.md) |
| 05  | ui-forms: Field pattern       | [05-ui-forms-field-pattern](05-ui-forms-field-pattern/plan.md)             |
| 06  | Repo health & guardrails      | [06-repo-health](06-repo-health/plan.md)                                   |
| 07  | Vitest test harness           | [07-test-harness](07-test-harness/plan.md)                                 |
| 08  | Consolidate grouping logic    | [08-grouping-logic](08-grouping-logic/plan.md)                             |
| 09  | Test & fix date formatting    | [09-date-logic](09-date-logic/plan.md)                                     |
| 10  | Extract `useDebouncedValue`   | [10-debounce-hook](10-debounce-hook/plan.md)                               |
| 11  | Correctness bug fixes         | [11-correctness-bugs](11-correctness-bugs/plan.md)                         |
| 12  | Build & dependency tooling    | [12-build-dependency-tooling](12-build-dependency-tooling/plan.md)         |
| 13  | Exports & conventions         | [13-exports-conventions](13-exports-conventions/plan.md)                   |
| 14  | Component consolidation       | [14-component-consolidation](14-component-consolidation/plan.md)           |
| 15  | Storybook lint + tests        | [15-storybook-lint-tests](15-storybook-lint-tests/plan.md)                 |
| 16  | Type-hygiene cleanup          | [16-type-hygiene](16-type-hygiene/plan.md)                                 |
| 17  | One list per Command          | [17-command-list-nesting](17-command-list-nesting/plan.md)                 |
| 18  | A common overlay API          | [18-overlay-api](18-overlay-api/plan.md)                                   |
