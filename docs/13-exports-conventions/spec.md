# Feature: Exports & conventions

## Problem

The library's value proposition is consistency, and neither its export surface nor its conventions
are consistent — because nothing states them and nothing enforces them.

**Two barrel strategies coexist.** Some components have a per-component `index.ts`; others are
imported straight from their implementation file by the package root. There are 49 per-component
`index.ts` files, and **eight are byte-identical duplicates** of the component file beside them:
`ui-command/Command`, `ui-core/Accordion`, `ui-core/Checkbox`, `ui-core/Radio`, `ui-core/Slider`,
`ui-overlays/Dialog`, `ui-overlays/Popover`, `ui-overlays/Sheet`. A duplicate file is two places to
edit with nothing keeping them in sync.

**A name a caller cannot guess.** The folder is `DatePickers/RangeDatePicker`; the export is
`DateRangePicker`.

**Nothing states the rules, and nothing enforces them.** A contributor infers them by reading around
— which is precisely how the above accumulated. Two conventions the codebase genuinely follows are
enforced by nothing at all:

- **The `I` prefix on a component's prop interface**, which exists so the type can be named after the
  component without colliding with its export. Nothing stops a new type skipping it, and `16` left
  the tree already split: `ITextarea` is an interface while `ICheckboxField` and `ISwitchField` are
  `type` aliases. See [`16-type-hygiene`](../16-type-hygiene/plan.md#found-not-adopted).
- **`displayName`**, present on all 37 component directories, while
  `packages/eslint-config/react.js` sets `react/display-name` to `off`.

**The enforcement that exists is switched off.** `packages/eslint-config/react.js:74-86` holds a
fully-written `project-structure/folder-structure` rule block, commented out with a note explaining
why: the `projectStructureParser` was applied as the parser for _every_ file, clobbering the
TypeScript parser and silently disabling real code linting. Plugin and rule config are both still
installed — only the wiring is disabled. That failure was silent, which is what makes it dangerous.

**Two gates report success without checking anything.** Both surfaced while shipping `16`:

- **Warnings do not fail lint.** The package scripts are `eslint --cache` with no `--max-warnings`.
  Verified: a stale `eslint-disable` reports as a warning and exits **0**. That is the same hole `16`
  existed to close — "a `warn` gates nothing and the count can only grow" — reachable through a
  different door. The tree is at 0 warnings today, so this costs nothing to adopt now and more later.
- **The CI Prettier job cannot fail.** `.github/workflows/linting-action.yml` runs `pnpm prettier`,
  which is `prettier --write`. It rewrites its own checkout and always exits 0, so formatting is
  unenforced in CI.

Much of the original scope is **already done** and not repeated here: `displayName` is present on all
37 component directories (it was ~5 when first written), and types are exported from every package
root. The `CheckboxGroup` export item is obsolete — it moved to `ui-core` during
[`04-ui-forms-primitive-migration`](../04-ui-forms-primitive-migration/plan.md).

## Goals

1. One barrel strategy, so a contributor adding a component has no choice to make.
2. No file exists solely to duplicate another.
3. A convention is enforced by a rule wherever it can be, and documented in the owning package's
   README where it cannot. **Not a `CONVENTIONS.md`** — see Non-Goals.
4. Enabling structural linting does not disable code linting.
5. A gate that passes means it checked. No gate reports success without running.

## Scope

- **Included**: choosing one barrel strategy and applying it across all four UI packages; deleting
  the byte-identical duplicates; resolving the `RangeDatePicker`/`DateRangePicker` mismatch;
  re-enabling the folder-structure rule in an isolated config; extending `folderStructure.mjs` to
  match; and the four guardrail gaps above — `--max-warnings 0`, CI Prettier as `--check`,
  `@typescript-eslint/naming-convention` for the `I` prefix, and `react/display-name`.
- **Not included**: changing which package a component lives in, or any component's public props.
  Changing component code to satisfy the rule — if it finds violations, record and raise them.
  Re-enabling `eslint-plugin-storybook`, which is
  [`15-storybook-lint-tests`](../15-storybook-lint-tests/spec.md). Type-aware linting
  (`recommendedTypeChecked`) — assessed during `16` and deliberately deferred: there are **zero**
  async handlers passed as props and 11 async functions in non-story source, so `no-floating-promises`
  and `no-misused-promises` would have almost nothing to find against a real cost in lint time.
  Revisit when the async surface grows.
- **Ordering**: the barrel decision must come before the rule and the README, or this gets written
  twice. The two CI/script gates (`--max-warnings 0`, Prettier `--check`) are independent of the
  barrel work and can land first — they are small and unblock nothing else. That sequencing is
  internal to this deliverable.

## Non-Goals

- Introducing conventions the codebase does not already broadly follow. This records decisions, it
  does not redesign.
- **A `docs/CONVENTIONS.md`.** Earlier drafts of this spec required one; that was dropped
  deliberately. A rule cannot drift and binds everyone; a doc binds whoever reads it. Where prose is
  genuinely needed it goes in the owning package's README — `packages/eslint-config/README.md`
  already holds the ESLint rule rationale — not in a fourth place for the truth to live.
  A `.claude/skills` file is not a substitute either: it only reaches agents, not someone typing by
  hand.
- Explanatory comments in config files. Same reason: the config states what, the README states why.
- Reducing the public export surface.

## Requirements

1. Exactly one barrel strategy is in use across the four UI packages afterwards.
2. Every symbol exported from a package root before the change is still exported after it. This is a
   restructure, not a reduction.
3. A component's folder name and exported name agree, or the disagreement is deliberate and
   documented.
4. Every convention this deliverable settles is either enforced by a named rule, or written in the
   owning package's README. No convention is left stated in neither place.
5. The folder-structure rule must run without changing the parser used for any other file — proven,
   not assumed, because the previous attempt failed in exactly this way and went unnoticed.
6. Enabling the rule must not reduce the code-lint finding count. Capture it before and after.
7. `pnpm lint` must exit non-zero on a warning, demonstrated with a deliberate one.
8. The CI Prettier job must fail on unformatted input, demonstrated the same way. `--check` in CI;
   `--write` stays the local script.

## Edge Cases & Error Handling

- **Deleting a barrel changes deep-import paths.** Anything importing through a removed barrel must
  be updated in the same change; the app and Storybook both consume these packages.
- **Renaming an export is breaking.** Inside this monorepo the consumers are the app and Storybook —
  verify that is still true before renaming.
- **A folder may look redundant but carry a `types/` or `__fixtures__/` sibling** that must survive.
- **The parser-clobbering failure is silent** — code linting appears to run and reports nothing.
  Verify by introducing a deliberate TypeScript lint error and confirming it is still caught.
- **The rule will likely flag existing violations.** Decide up front whether it lands as `warn` and
  is promoted later, or `error` with violations fixed first — and say which in the doc.

## Acceptance Criteria

- [ ] One barrel strategy applied across `ui-core`, `ui-overlays`, `ui-command` and `ui-forms`.
- [ ] The eight byte-identical duplicate barrels are gone.
- [ ] The `RangeDatePicker` folder and `DateRangePicker` export agree.
- [ ] Every symbol exported from a package root before the change is still exported, demonstrated
      rather than asserted.
- [ ] Each settled convention is enforced by a named rule, or documented in the owning package's
      README — covering file layout, barrels, variants naming, `displayName`, the `I` prefix and the
      control-value contract, and matching the barrel strategy actually implemented.
- [ ] `@typescript-eslint/naming-convention` enforces the `I` prefix, and the `ITextarea` /
      `ICheckboxField` interface-vs-alias split is resolved either way.
- [ ] `react/display-name` is enabled, or its staying `off` is recorded with a reason.
- [ ] `pnpm lint` exits non-zero on a warning — `--max-warnings 0`, proven with a deliberate warning.
- [ ] The CI Prettier job fails on unformatted input, proven the same way.
- [ ] The folder-structure rule is enabled and running.
- [ ] A deliberately introduced TypeScript lint error is still caught with the rule enabled, and the
      code-lint finding count is no lower than before.
- [ ] `pnpm build`, `lint`, `check-types` and the Storybook suite are no worse than before.

## Open Questions

- Which strategy: aggregate through per-component folder barrels, or delete the barrels and export
  from the package root? The original recommendation was the latter — fewer files, single source —
  but it should be settled explicitly rather than inherited.
- **Interface or type alias for a pass-through prop type?** Both lint clean since `16`, so nothing
  decides it. `ITextarea` is `interface … extends`; `ICheckboxField` and `ISwitchField` are `type`
  aliases of the same shape. Pick one and let `naming-convention` (and, if it fits,
  `consistent-type-definitions`) hold it — or record that the mix is acceptable.
