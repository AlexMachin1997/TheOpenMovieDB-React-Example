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

**Nothing is written down.** There is no `CONVENTIONS.md`, so a contributor infers the rules by
reading around — which is precisely how the above accumulated.

**The enforcement that exists is switched off.** `packages/eslint-config/react.js:74-86` holds a
fully-written `project-structure/folder-structure` rule block, commented out with a note explaining
why: the `projectStructureParser` was applied as the parser for _every_ file, clobbering the
TypeScript parser and silently disabling real code linting. Plugin and rule config are both still
installed — only the wiring is disabled. That failure was silent, which is what makes it dangerous.

Much of the original scope is **already done** and not repeated here: `displayName` is present on all
37 component directories (it was ~5 when first written), and types are exported from every package
root. The `CheckboxGroup` export item is obsolete — it moved to `ui-core` during
[`04-ui-forms-primitive-migration`](../04-ui-forms-primitive-migration/plan.md).

## Goals

1. One barrel strategy, so a contributor adding a component has no choice to make.
2. No file exists solely to duplicate another.
3. The conventions are written down, and the ones that can be checked cheaply are enforced.
4. Enabling structural linting does not disable code linting.

## Scope

- **Included**: choosing one barrel strategy and applying it across all four UI packages; deleting
  the byte-identical duplicates; resolving the `RangeDatePicker`/`DateRangePicker` mismatch; writing
  `docs/CONVENTIONS.md`; re-enabling the folder-structure rule in an isolated config; extending
  `folderStructure.mjs` to match what was documented.
- **Not included**: changing which package a component lives in, or any component's public props.
  Changing component code to satisfy the rule — if it finds violations, record and raise them.
  Re-enabling `eslint-plugin-storybook`, which is
  [`15-storybook-lint-tests`](../15-storybook-lint-tests/spec.md).
- **Ordering**: the barrel decision must come before the documentation and the rule, or this gets
  written twice. That sequencing is internal to this deliverable.

## Non-Goals

- Introducing conventions the codebase does not already broadly follow. This records decisions, it
  does not redesign.
- Enforcing everything. A convention that cannot be checked cheaply can stay prose-only.
- Reducing the public export surface.

## Requirements

1. Exactly one barrel strategy is in use across the four UI packages afterwards.
2. Every symbol exported from a package root before the change is still exported after it. This is a
   restructure, not a reduction.
3. A component's folder name and exported name agree, or the disagreement is deliberate and
   documented.
4. `CONVENTIONS.md` states each convention and, where enforced, names the rule enforcing it.
5. The folder-structure rule must run without changing the parser used for any other file — proven,
   not assumed, because the previous attempt failed in exactly this way and went unnoticed.
6. Enabling the rule must not reduce the code-lint finding count. Capture it before and after.

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
- [ ] `docs/CONVENTIONS.md` exists, covering file layout, barrels, variants naming, `displayName`
      and the control-value contract — and matches the barrel strategy actually implemented.
- [ ] The folder-structure rule is enabled and running.
- [ ] A deliberately introduced TypeScript lint error is still caught with the rule enabled, and the
      code-lint finding count is no lower than before.
- [ ] `pnpm build`, `lint`, `check-types` and the Storybook suite are no worse than before.

## Open Questions

- Which strategy: aggregate through per-component folder barrels, or delete the barrels and export
  from the package root? The original recommendation was the latter — fewer files, single source —
  but it should be settled explicitly rather than inherited.
