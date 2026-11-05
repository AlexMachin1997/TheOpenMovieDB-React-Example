# Documentation

Planning and design documentation for this repo: what's been built, what's specified, and what's
outstanding. Each deliverable is one folder holding its own `discovery.md` / `spec.md` / `plan.md`.

How that layout works and why — naming, the lifecycle roles, what to do when one file per role
isn't enough — is a convention rather than a fact about this project, so it lives in
[`.claude/skills/documentation-structure`](../.claude/skills/documentation-structure/SKILL.md) and
the `deliverable-documentation` skill it points to. Read those before adding a document. This file
is just the roadmap.

[`component-inventory.md`](component-inventory.md) is a separate survey of what the clone still
needs — 41 candidate components, each with a decision already taken on whether it belongs in the
library, in the app, or nowhere. Nothing in it is scheduled; items become deliverables, with their
own folder and a row below, only when they're picked up. Its `C<n>` IDs are unrelated to the
deliverable numbers here.

## Roadmap

Outstanding work only. Everything shipped is under [Shipped](#shipped) below.

| ID  | Deliverable      | Area          | Status   | Depends on | Docs                                               |
| --- | ---------------- | ------------- | -------- | ---------- | -------------------------------------------------- |
| 03  | Focus indicators | design system | 📝 draft | —          | [03-focus-indicators](03-focus-indicators/spec.md) |
| 21  | `Image`          | components    | 🟢 ready | —          | [21-image](21-image/spec.md)                       |

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

`21` is the first item lifted out of [`component-inventory.md`](component-inventory.md) (C02), and
the first of the two that are `ready`. Its open questions were closed in a grilling pass on
18 September 2026; the API shape, the fallback mechanism and the failure semantics are all settled in
[Decisions](21-image/spec.md#decisions). It has no dependencies, so it can be planned now.

`19` and `22` were a single deliverable until 4 November 2026. It was scoped as the thin preset
[`18`'s discovery](18-overlay-api/discovery.md) described, grew a second half — a declared dismissal
policy and an awaitable action on the shared overlay — and then stalled, because all three of its
blocking open questions belonged to that second half and none belonged to the component.

Splitting it dissolved most of it. An audit of
[`OverlaySurface`](../packages/ui-overlays/src/components/Overlay/OverlaySurface.tsx) and
[`useDialogElement`](../packages/ui-overlays/src/components/Overlay/hooks/useDialogElement.ts) found
the component needs no shared change at all: `role="alertdialog"`, the required description, the
missing close button, focus on cancel and the refused backdrop click are each expressible against the
API `18` already shipped. Both shared behaviours then turned out to replace a couple of lines of
ordinary React with a contract that needed its own edge cases, so both were dropped —
[`19`'s Decisions](19-alert-dialog/spec.md#decisions) records why, and the dismissal policy is kept
under **Planned** rather than discarded.

That left two independent deliverables, neither blocking the other, and both have now shipped. `19`
was the component — four required props, no close button, nothing for slow work — and landed on
5 November 2026 with `AC9` dropped along the way. `22` was the removal of four dead exports: its one
open question, whether that needed a deprecation cycle, was answered no, because nothing imported
them.

`19` also settled **what a content component lets a caller override at all**, which it had raised as
an open question and then answered rather than deferring. `IDialogContent` used to accept `onClick`,
`onKeyDown`, `ref`, `slot`, `popover` and `aria-modal` — all either discarded by the shared surface
or capable of breaking it — and `role` wide enough to strip the element's semantics. All three
overlay surfaces now remove the first set, and `role` is narrowed to `'dialog' | 'alertdialog'`
because a preset has to be able to pin it. No call site changed; see
[`19`'s plan](19-alert-dialog/plan.md#the-restriction-reached-dialog-and-sheet-too).

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
| 19  | Alert dialog                  | [19-alert-dialog](19-alert-dialog/plan.md)                                 |
| 20  | Popover semantics             | [20-popover-semantics](20-popover-semantics/plan.md)                       |
| 22  | Overlay export cleanup        | [22-overlay-export-cleanup](22-overlay-export-cleanup/plan.md)             |
