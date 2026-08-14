# Feature: Exports & barrel conventions

## Problem

The library's value proposition is consistency, and its export surface is not consistent. Two
barrel strategies coexist: some components have a per-component `index.ts` barrel, others are
imported straight from their implementation file by the package root. There are 49 per-component
`index.ts` files across the UI packages, and **eight of them are byte-identical duplicates** of the
component file they sit next to:

`ui-command/Command`, `ui-core/Accordion`, `ui-core/Checkbox`, `ui-core/Radio`, `ui-core/Slider`,
`ui-overlays/Dialog`, `ui-overlays/Popover`, `ui-overlays/Sheet`.

A duplicate file is not just clutter — it is two places to edit, and nothing enforces that they stay
in sync.

There is also a name mismatch a caller cannot guess: the folder is `DatePickers/RangeDatePicker`,
the export is `DateRangePicker`.

**Much of the original scope is already done** and is not repeated here: `displayName` is present on
all 37 component directories (it was ~5 when this was first written), and types are exported from
every package root. The `CheckboxGroup` export item is obsolete — that component moved to `ui-core`
during [`04-ui-forms-primitive-migration`](../04-ui-forms-primitive-migration/plan.md).

## Goals

1. One barrel strategy, applied everywhere, so a contributor adding a component has no choice to
   make.
2. No file exists solely to duplicate another.
3. A caller can predict the import path and export name of a component from its name.

## Scope

- **Included**: choosing one barrel strategy and applying it across all four UI packages; deleting
  the byte-identical duplicate barrels; resolving the `RangeDatePicker` / `DateRangePicker` naming
  mismatch; flattening any nested component folder structure that the chosen strategy makes
  redundant.
- **Not included**: writing the convention down or enforcing it with lint — that is
  [`16-conventions-lint`](../16-conventions-lint/spec.md), which depends on the decision made here.
  Changing which package a component lives in. Changing any component's public props.
- **Can be delivered independently**: yes, but it should land _before_ `16`, which documents and
  enforces whatever is chosen.

## Non-Goals

- Changing runtime behaviour of any component.
- Re-opening the four-package split.
- Adding new exports or components.

## Requirements

1. Exactly one barrel strategy is in use across all four UI packages after this lands.
2. No two files in the repo are byte-identical barrels of each other.
3. A component's folder name and its exported name agree, or the disagreement is deliberate and
   documented.
4. Every export reachable from a package root before this change is still reachable after it —
   this is a restructure, not a reduction of the public surface.

## Edge Cases & Error Handling

- **Deleting a barrel changes deep-import paths.** Anything importing through a removed barrel must
  be updated in the same change; the app and Storybook both consume these packages.
- **Renaming an export is a breaking change** for consumers. Inside this monorepo the only consumers
  are the app and Storybook, so it is contained — verify that is still true before renaming.
- **A folder may look redundant but carry a `types/` or `__fixtures__/` sibling** that must survive
  the flattening.

## Acceptance Criteria

- [ ] One barrel strategy is applied across `ui-core`, `ui-overlays`, `ui-command` and `ui-forms`,
      with the choice recorded for `16` to enforce.
- [ ] The eight byte-identical duplicate barrels listed above are gone.
- [ ] The `RangeDatePicker` folder and `DateRangePicker` export agree.
- [ ] Every symbol exported from a package root before the change is still exported after it,
      demonstrated rather than asserted.
- [ ] `pnpm build`, `lint`, `check-types` and the Storybook suite are no worse than before.

## Open Questions

- Which strategy: aggregate through per-component folder barrels, or delete the barrels and export
  from the package root? The original recommendation was the latter — fewer files, single source —
  but it is still an open decision and should be settled explicitly rather than inherited.
