# Documentation

Planning and design documentation for this repo: what's been built, what's specified, and what's
outstanding. Each deliverable is one folder holding its own `discovery.md` / `spec.md` / `plan.md`.

How that layout works and why — naming, the lifecycle roles, what to do when one file per role
isn't enough — is a convention rather than a fact about this project, so it lives in
[`.claude/skills/documentation-structure`](../.claude/skills/documentation-structure/SKILL.md) and
the `deliverable-documentation` skill it points to. Read those before adding a document. This file
is just the roadmap.

## Roadmap

| ID  | Deliverable                   | Area          | Status     | Depends on | Docs                                                                       |
| --- | ----------------------------- | ------------- | ---------- | ---------- | -------------------------------------------------------------------------- |
| 01  | Icon component                | component     | ✅ done    | —          | [01-icon](01-icon/spec.md)                                                 |
| 02  | Button enhancements           | component     | ✅ done    | 01         | [02-button-enhancements](02-button-enhancements/spec.md)                   |
| 03  | Focus indicators              | design system | 📝 draft   | TBD        | [03-focus-indicators](03-focus-indicators/spec.md)                         |
| 04  | ui-forms: primitive migration | architecture  | ✅ done    | —          | [04-ui-forms-primitive-migration](04-ui-forms-primitive-migration/plan.md) |
| 05  | ui-forms: Field pattern       | architecture  | ✅ done    | 04         | [05-ui-forms-field-pattern](05-ui-forms-field-pattern/plan.md)             |
| 06  | Repo health & guardrails      | tooling       | ✅ done    | —          | [06-repo-health](06-repo-health/plan.md)                                   |
| 07  | Vitest test harness           | tooling       | ✅ done    | 06         | [07-test-harness](07-test-harness/plan.md)                                 |
| 08  | Consolidate grouping logic    | correctness   | ✅ done    | 07         | [08-grouping-logic](08-grouping-logic/plan.md)                             |
| 09  | Test & fix date formatting    | correctness   | ✅ done    | 07         | [09-date-logic](09-date-logic/plan.md)                                     |
| 10  | Extract `useDebouncedValue`   | correctness   | ✅ done    | 07         | [10-debounce-hook](10-debounce-hook/plan.md)                               |
| 11  | Correctness bug fixes         | correctness   | ✅ done    | 07         | [11-correctness-bugs](11-correctness-bugs/plan.md)                         |
| 12  | Build externalization         | tooling       | 🟢 ready   | —          | [12-build-externalization](12-build-externalization/spec.md)               |
| 13  | Dependency version sourcing   | tooling       | 🟢 ready   | —          | [13-dependency-versions](13-dependency-versions/spec.md)                   |
| 14  | Config cruft removal          | tooling       | 🟢 ready   | —          | [14-config-cruft](14-config-cruft/spec.md)                                 |
| 15  | Exports & barrel conventions  | architecture  | 🟢 ready   | —          | [15-exports-conventions](15-exports-conventions/spec.md)                   |
| 16  | Conventions doc + lint        | architecture  | ⛔ blocked | 15         | [16-conventions-lint](16-conventions-lint/spec.md)                         |
| 17  | Selects simplification        | component     | 🟢 ready   | —          | [17-selects-simplification](17-selects-simplification/spec.md)             |
| 18  | Dialog/Sheet consolidation    | component     | 🟢 ready   | —          | [18-dialog-sheet-consolidation](18-dialog-sheet-consolidation/spec.md)     |
| 19  | Storybook lint + tests        | tooling       | 🟢 ready   | —          | [19-storybook-lint-tests](19-storybook-lint-tests/spec.md)                 |
| 20  | Type-hygiene cleanup          | tooling       | 🟢 ready   | —          | [20-type-hygiene](20-type-hygiene/spec.md)                                 |

`draft` — open questions remain before planning · `ready` — safe to plan and build · `blocked` —
waiting on its dependencies · `in progress` · `done` — shipped, with an as-built `plan.md`.

**Area is a label, not a location.** Nothing about a deliverable's folder depends on it.

**Numbers are allocation order, not chronology.** `06`–`11` shipped _before_ `01`–`05`; they carry
higher numbers because they were migrated into this layout later. An ID is an identifier, nothing
more.

### Suggested order

`12` is the one to pick up first — it is the dependency-management friction that motivated
consolidating these roadmaps, and `19` may depend on it being done. `13` and `14` pair naturally
with it. `15` unblocks `16`. `17`, `18` and `20` are independent.

### Planned

_(The `ui-forms` form layer that stood here has since shipped — it stayed inside `05` rather than
taking a row of its own, so `05`'s single ✅ covers both passes. See
[`spec.md` → Second pass](05-ui-forms-field-pattern/spec.md#second-pass--the-form-layer) and the
[as-built record](05-ui-forms-field-pattern/plan.md#second-pass--the-form-layer-as-built).)_

A **design-system audit** across six axes — tokens, interaction states, size scales, variant
taxonomy, dark mode coverage, motion — would add deliverables to the table above. Not started.

`03-focus-indicators` is what surfaced the need for it. Measuring the focus ring turned up three
unrelated focus idioms, a component hardcoding raw palette colours, and a WCAG 2.2 SC 2.4.11 failure
in both themes. None of that is really about focus — it's what a library assembled from copied
component code looks like when nobody has defined the system it should obey.

**RTL / reading direction** would add a deliverable. Surfaced while planning `04` and not yet
specified. The library is currently inconsistent with itself: no `DirectionProvider` is mounted and
no component takes a `dir` prop, so every Radix component falls back to LTR — while `Calendar`
already ships `rtl:` classes that only fire if a `dir="rtl"` exists to trigger them. The question
spans arrow-key semantics, logical vs physical Tailwind properties, icon mirroring and overlay
placement, so it needs its own `problem-discovery` pass rather than being settled component by
component. See [`04-ui-forms-primitive-migration/plan.md`](04-ui-forms-primitive-migration/plan.md#follow-ups).

**The four-package split** — whether `ui-core` / `ui-overlays` / `ui-command` / `ui-forms` still earn
their boundaries — would add a deliverable. Raised while reviewing `04` and **not yet decided in
either direction**.

The trigger: `Select` and the date pickers cannot sit alongside `Input` and `Checkbox`, because they
need `Popover` (`ui-overlays`) and `Command` (`ui-command`), which are built _after_ `ui-core`.
Moving them down would make `ui-core` depend on its own dependents, and turbo's `dependsOn: ["^build"]`
is a topological sort — a cycle has no valid build order at all.

What makes it worth asking rather than accepting:

- The entire `ui-overlays` → `ui-core` edge is **one component, `Icon`**, imported in three files
  (Dialog close, DropdownMenu chevron, Sheet close). The `Button`/`Alert`/`Avatar`/`Badge` imports
  are all in stories.
- `ui-command` → `ui-core` is **one component, `Search`**, in one file.
- `ui-command` is a **single component** in its own package (1,617 LOC); `ui-overlays` is five
  (1,100 LOC), against `ui-core`'s 22 (3,587 LOC).
- **Neither `Select` nor the date pickers are form-specific.** They are compound UI components that
  happen to be useful in forms — a `Select` is no more "form UI" than a `DropdownMenu`. On the
  current trajectory `ui-forms` ends up holding only genuinely form-specific things (`useForm`, the
  `Field` pattern from `05`, a future schema renderer), all of which build on `ui-core` anyway.

**The real argument for the split is dependency weight, not code size**, and it is worth stating
precisely because it is the one thing tree-shaking does _not_ solve. Tree-shaking drops unused
_code_ from a bundle; it does not drop a package from the dependency tree. Folding `ui-command`
into `ui-core` would put `cmdk`, `@tanstack/react-virtual`, `@radix-ui/react-dialog` and `react-use`
behind every `ui-core` install — including consumers who only ever wanted a `Button`. `ui-overlays`
brings four more Radix packages. Against `ui-core`'s current 19 direct dependencies, that is a
material change to what "depend on ui-core" costs.

How much that actually matters depends on whether these packages are ever published independently.
Inside this monorepo, with one consuming app and everything built from source, it costs close to
nothing.

**Nothing is broken.** The current layout builds, ships and is tested. The cost is ergonomic — a
consumer has to know that `Input` comes from `ui-core` while `Select` comes from `ui-forms`, and the
rule that decides which is invisible at the call site.

Options to weigh in the discovery: fold `ui-overlays` and `ui-command` into `ui-core` and let
application bundlers handle the unused weight; fold only `ui-overlays` (four Radix packages) and
leave `ui-command` separate, since `cmdk` and `react-virtual` are the heavy part; push `Icon` and
`Search` into a package below `ui-core` to invert the arrows; consume sibling packages from source
rather than built `dist/` (see the note in
[`04-ui-forms-primitive-migration/plan.md`](04-ui-forms-primitive-migration/plan.md#follow-ups));
or keep the split and document the boundary rule properly.

**Status: pinned, deliberately.** Known quirk of the current setup, not a blocker. Revisit when
something forces the question — a second consuming app, a decision to publish, or `ui-forms`
shrinking to the point where the boundary looks obviously wrong. It partially revisits an earlier
decision to keep the packages separate, so it needs a `problem-discovery` pass and an explicit call
rather than being folded into another deliverable.

**JSON/schema-driven form rendering** would add a deliverable. The `Field` composition layer it would
render onto now exists (`05` is done), so the blocker is gone — but it stays deliberately
unspecified: schema format, validation-library integration and extensibility for custom field types
are all open, and it needs its own `problem-discovery` pass. A declarative field-definition helper
was raised while specifying the form-layer second pass and **explicitly kept out of it**, because
either shape it could take — a typed component factory, or a declarative field list — reverses a
decision taken elsewhere. That call belongs here, not as a rider on another deliverable.
