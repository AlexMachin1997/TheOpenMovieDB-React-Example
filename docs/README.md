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

| ID  | Deliverable          | Area          | Status   | Depends on | Docs                                               |
| --- | -------------------- | ------------- | -------- | ---------- | -------------------------------------------------- |
| 03  | Focus indicators     | design system | 📝 draft | —          | [03-focus-indicators](03-focus-indicators/spec.md) |
| 18  | A common overlay API | component     | 🟢 ready | — (14 ✅)  | [18-overlay-api](18-overlay-api/spec.md)           |

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

`18` grew during grilling and is now two phases in one deliverable: `Dialog` and `Sheet` move to the
native `<dialog>` element, then gain the `title` / `description` / `footer` props. It absorbed the
native-`<dialog>` question that sat under **Planned**, briefly as its own deliverable, because three
of its API decisions turn out to be unbuildable on Radix — see
[why](18-overlay-api/discovery.md#why-this-is-one-deliverable). Its design is settled: eight ADRs in
[CONTEXT.md](18-overlay-api/CONTEXT.md), eight discovery decisions in
[discovery.md](18-overlay-api/discovery.md), and no open API questions.

`18` still inherits two things `14` deliberately left it: giving every overlay story a `play()` so
the a11y guard reaches more than the two stories it currently does, and removing the caller's
ability to forget an accessible name at all. `17` has since made the second of those concrete —
turning axe to `error` on the `Command` and `Select` suites surfaced nine `aria-dialog-name` failures
on Radix's `PopoverContent`, which `17` disabled with a pointer here rather than fix. See
[`17`'s plan](17-command-list-nesting/plan.md#the-a11y-gate-and-what-it-surfaced). **Those failures
are real** — `PopoverContent` does render `role="dialog"`, verified — but `Popover` was moved out of
`18` and they are now [Popover semantics](planned.md#popover-semantics)' to fix, not `18`'s.

An **alert dialog** follows `18` — see [`planned.md`](planned.md#alert-dialog).

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
