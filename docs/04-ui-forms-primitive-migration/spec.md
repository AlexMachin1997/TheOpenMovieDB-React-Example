# Feature: ui-forms primitive migration

## Problem

See [`discovery.md`](./discovery.md).

In short: `ui-forms` duplicates `ui-core`'s job for its leaf controls. `Input`, `Textarea`,
`Checkbox`, `Radio`, and the `Slider` parts are independently-styled near-duplicates of primitives
that belong in `ui-core` — one of which, `Input` vs `DebouncableInput`, already has a sibling in the
right package. `Radio` also can't be used at all without a consumer importing Radix directly, since
no `RadioGroup` exists to pair with it, unlike `Checkbox`'s `CheckboxGroup`.

## Relationship to other deliverables

This is the first of two specified deliverables from the same architectural review (see
`discovery.md`). It has no dependency on the other and can ship on its own.
[`05-ui-forms-field-pattern`](../05-ui-forms-field-pattern/spec.md) — the `Field` composition
pattern and the documentation/testing standard — depends on this one, since it needs the moved
components' final locations settled first. A third, deferred piece (JSON/schema-driven rendering) is
out of scope for both and gets its own future discovery once `05` ships.

## Goals

1. One primitive per concept in the library. No leaf control is independently styled in more than
   one package.
2. The library boundary between `ui-core` and `ui-forms` is drawn by actual dependency footprint, not
   by "is this form-related" — so `ui-forms` only keeps what genuinely needs `ui-overlays`/
   `ui-command`.

## Scope

- **Included**: reclassifying every current `ui-forms` export as primitive-to-move or
  genuine-composition-to-keep; moving the primitives to `ui-core`; refactoring `DebouncableInput` to
  compose the moved `Input`; adding the missing `RadioGroup`; adding roving-tabindex keyboard
  navigation to `CheckboxGroup`.
- **Not included**: see Non-Goals.
- **Can be delivered independently**: yes — no dependency on any other pending deliverable.

## Non-Goals

- **The `Field` composition pattern, `FieldMessage`, and the TanStack Form adapter.** That's
  [`05-ui-forms-field-pattern`](../05-ui-forms-field-pattern/spec.md) in full.
- **Comprehensive Storybook rewrite and `play()` test authoring for the moved components.** Existing
  stories move with their components (the build must still pass), but bringing every component up to
  the standalone/composition/pattern + `play()` bar is `05`'s job, not this one's — it's where the
  documentation/testing standard is actually defined.
- **Designing the JSON/schema-driven renderer.** New feature work with its own undecided questions
  (schema format, validation-library integration, extensibility). Needs its own `problem-discovery`
  pass once `05` ships.
- **Replacing TanStack Form.** `useForm` continues to come from `@tanstack/react-form`, untouched.
- **Redesigning visual style.** Existing Tailwind classes/tokens for each primitive move with the
  component; this is a structural and API change, not a restyle. (`SliderThumb`'s hardcoded
  off-token colours are already tracked in
  [`03-focus-indicators`](../03-focus-indicators/discovery.md#one-component-is-entirely-off-token)
  and are fixed there, not here.)
- **The package graph itself.** `ui-core`, `ui-overlays`, `ui-command`, `ui-forms` stay four
  packages.

## Requirements

### Functional

- `Input`, `Textarea`, the `Checkbox`/`CheckboxLabel` pair, `Radio`/`RadioLabel`, the
  `SliderRoot`/`SliderTrack`/`SliderRange`/`SliderThumb` parts, and `Calendar`/`CalendarDayButton`
  move to `ui-core`, preserving their current rendered output, props, and Tailwind classes exactly
  (structural move, not a restyle).
- `DebouncableInput` is refactored to render `Input` internally and layer its debounce hook on top,
  rather than independently duplicating `Input`'s Tailwind classes as it does today — see Decisions.
  `Input` is the one native-input styling primitive; `DebouncableInput` is a composition on top of
  it, not a competing sibling.
- A `RadioGroup` composition is added, mirroring `CheckboxGroup`'s API as closely as possible
  (options in, selected value out, controlled-only — see Decisions) so `Radio` is usable without a
  consumer reaching for `@radix-ui/react-radio-group` directly.
- `CheckboxGroup` gains arrow-key navigation between its options via a new shared roving-tabindex
  hook — it currently has none, unlike `RadioGroup`, which gets equivalent behaviour for free from
  `RadioGroupPrimitive.Root`. `ui-core`'s existing `useKeyboardActivation` hook solves a different
  problem (synthesising Enter/Space on a single non-native element) and isn't reusable here; this is
  new. Whether `RadioGroup` also adopts the new hook internally (for one shared implementation) or
  keeps relying on Radix's built-in behaviour is an implementation-planning decision — either way the
  two groups' navigation must feel identical to a keyboard user.
- `CheckboxGroup` moves to `ui-core` alongside `Checkbox`, and the new `RadioGroup` is added there
  directly — both are dependency-eligible per the dependency-driven boundary in Decisions.
- `ui-core`'s `package.json` gains a new dependency on `@repo/core`, for the `Option` type
  `CheckboxGroup` already imports. Confirmed safe: `@repo/core` has no dependency back on `ui-core`
  (only `date-fns`), so this doesn't introduce a cycle — it's a new one-directional edge, not
  currently declared even though the package chain in `discovery.md` implies it.
- `Select`, `MultiSelect`, `SingleSelect`, `SingleDatePicker`, `DateRangePicker` are **not** moved —
  they stay in `ui-forms` because they depend on `ui-overlays`/`ui-command`, which `ui-core` cannot
  depend on. `DatePickers` import `Calendar` from its new `ui-core` location instead of a local path.
- `ui-forms`'s public API (`packages/ui-forms/src/index.ts`) is updated to reflect the new locations.
  This is a **clean breaking change** — no transitional re-export from `ui-forms` for the moved
  components. The library isn't published yet, so there's no external consumer to cushion.

### Accessibility

- `CheckboxGroup` gains arrow-key roving navigation it doesn't have today, specifically to match
  `RadioGroup`'s interaction model (see Decisions for why this goes beyond the WAI-ARIA minimum for
  a checkbox group).
- No other component's keyboard operability or focus order changes. This is a structural relocation
  of existing components (Non-Goals), not a UX change — every moved primitive keeps the ARIA
  roles/states Radix already provides it (`Checkbox`, `Radio`, `Slider`) exactly as they are today.

### Integration

- No new cross-package dependency is introduced. `ui-core` does not gain a dependency on
  `ui-overlays` or `ui-command` as a side effect of this work.

## Edge Cases & Error Handling

- **A component moved to `ui-core` is still imported from its old `ui-forms` path somewhere in the
  app.** This is a clean breaking change (see Decisions) — every such import site is updated as part
  of this deliverable, in the same change that moves the component, not left to fail at build time.
- **`RadioGroup` and `CheckboxGroup` disagree in shape** (e.g. one supports `defaultValue`
  uncontrolled and the other doesn't) — `CheckboxGroup` is documented as controlled-only
  ([`CheckboxGroup.tsx:16-19`](../../packages/ui-forms/src/components/CheckboxGroup/CheckboxGroup.tsx#L16-L19));
  `RadioGroup` mirrors that decision deliberately (see Decisions).

## Success Criteria

- [ ] All Acceptance Criteria below pass.
- [ ] `pnpm build` / `pnpm lint` / `pnpm test` stay green across `ui-core` and `ui-forms`.
- [ ] A grep for the moved primitives' component names under `packages/ui-forms/src` returns nothing
      — no definitions and no re-export shims.
- [ ] No two packages independently style the same native element or Radix primitive.

## Acceptance Criteria

- Given `Input`, `Textarea`, `Checkbox`, `CheckboxLabel`, `Radio`, `RadioLabel`, the `Slider` parts,
  and `Calendar`/`CalendarDayButton`, when their new location is checked, then all are exported from
  `@repo/ui-core` and none are independently defined in `@repo/ui-forms`.
- Given `DebouncableInput` after the refactor, when its implementation is inspected, then it renders
  `Input` internally and adds only debounce behaviour on top — it no longer carries its own copy of
  `Input`'s Tailwind classes.
- Given `Radio`, when used without any additional Radix import, then a `RadioGroup` composition from
  the library makes it function correctly (selection, keyboard nav, single-selection enforcement).
- Given `CheckboxGroup`, when navigated with arrow keys, then focus moves between its options the
  same way it does in `RadioGroup` — Home/End and wraparound behave identically between the two.
- Given `CheckboxGroup` or `RadioGroup` with an item disabled, when arrow-key navigation passes over
  it, then the disabled item is skipped rather than receiving focus.
- Given `Select`, `MultiSelect`, `SingleSelect`, `SingleDatePicker`, and `DateRangePicker`, when
  their location is checked after this deliverable, then all remain in `ui-forms`, and
  `DatePickers` imports `Calendar` from `@repo/ui-core`.
- Given any import of a moved component from its old `@repo/ui-forms` path anywhere in the repo, when
  the migration is complete, then no such import remains — there is no re-export shim.
- Given the full test/build/lint suite, when run after the migration, then it passes with no new
  failures attributable to the move.
- Given `ui-core`'s `package.json`, when inspected, then it declares `@repo/core` as a dependency.

## Decisions

- **The library boundary is dependency-driven, not category-driven.** "Form UI" is not a coherent
  package boundary on its own — `Select` and `Input` are both "form UI" but have entirely different
  dependency footprints. The rule going forward: a component lives in `ui-core` if it depends on
  nothing above `ui-core` in the package chain (`core → ui-core → ui-overlays → ui-command →
  ui-forms`); it lives in `ui-forms` if it genuinely needs `ui-overlays` and/or `ui-command`. This is
  a refinement of the original ask ("all core form UI components should live in `ui-core`"), not a
  rejection of it — it produces the same outcome for every component in this audit except that it
  also pulls `CheckboxGroup` (and the new `RadioGroup`) down into `ui-core`, since neither depends on
  `ui-overlays`/`ui-command` once `Checkbox`/`Radio` themselves move.
- **`Input` and `DebouncableInput` do not stay as two separate "the input" components.**
  `Input` (moved from `ui-forms`) is the one native-input styling primitive in `ui-core`.
  `DebouncableInput` is refactored to render `Input` internally and add only the debounce hook on
  top — the only real difference between them today is the debouncing logic itself, so
  `DebouncableInput` becomes a composition rather than a second independently-styled input. This is
  the pattern the rest of the redesign wants: a primitive in `ui-core`, and anything with extra
  behaviour composes it instead of restyling it from scratch.
- **No transitional re-exports from `ui-forms` for moved components.** The library isn't published,
  so a clean breaking import-path change is cheaper than maintaining a shim. Every import site
  updates in the same change that moves the component. Confirmed low-risk: `apps/the-open-movie-database`
  (the one consuming app in this monorepo) does not depend on `@repo/ui-forms` or `@repo/ui-core` at
  all today — the only consumer is `apps/storybook`, which exists to render the packages' own story
  files and moves with them.
- **`Calendar` moves to `ui-core`, not just `DatePickers`' internals.** It has no
  `ui-overlays`/`ui-command` dependency and is usable standalone (a calendar/date-selection UI has
  value outside a popover-triggered date picker), so it belongs with the other primitives rather than
  staying private to `DatePickers`. `DatePickers` (which does stay in `ui-forms`) imports it from its
  new location.
- **`RadioGroup` mirrors `CheckboxGroup`'s API as closely as possible, including staying
  controlled-only.** Consistency between the two group components wins over exploring an
  uncontrolled mode for `RadioGroup` alone.
- **`CheckboxGroup` gets arrow-key roving navigation, deliberately beyond the WAI-ARIA minimum.**
  Per the WAI-ARIA Authoring Practices, a checkbox group's items are conventionally independent Tab
  stops — each checkbox already has working native keyboard support (Space to toggle, Tab to reach
  it) via Radix, which is not itself broken. What's missing, and what this decision adds, is
  arrow-key navigation *between* items in the group, which `RadioGroup` gets for free from
  `RadioGroupPrimitive.Root` because a radio group is inherently a single-selection roving-tabindex
  widget. Giving `CheckboxGroup` the same navigation model is a deliberate consistency/efficiency
  choice, not an accessibility-conformance fix — worth being explicit about so it isn't miscited
  later as "checkboxes were broken."

## Open Questions

1. **Does the new roving-tabindex hook live in `ui-core` as a general-purpose hook** (alongside
   `useKeyboardActivation`), or is it specific to `CheckboxGroup`/`RadioGroup` and live with them?
   Settle during this deliverable's implementation planning.

## Design References

- The pattern to generalise: `SingleDatePicker`
  ([`SingleDatePicker.tsx`](../../packages/ui-forms/src/components/DatePickers/SingleDatePicker/SingleDatePicker.tsx))
  already composes `Button`/`Icon` (`ui-core`) + `Popover*` (`ui-overlays`) + `Calendar` cleanly —
  this is what "ui-forms standardises composition" looks like when it's working. `CheckboxGroup` is
  the same story one layer down (`Checkbox` + `CheckboxLabel` composed into a selection list).
- Existing style to preserve verbatim when moving primitives: each component's current Tailwind
  class string (e.g. [`Input.tsx:16-19`](../../packages/ui-forms/src/components/Input/Input.tsx#L16-L19),
  [`Checkbox.tsx:26`](../../packages/ui-forms/src/components/Checkbox/components/Checkbox.tsx#L26)).
