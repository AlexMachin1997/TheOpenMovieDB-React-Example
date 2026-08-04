# Feature: ui-forms Field pattern

## Problem

See [`04-ui-forms-primitive-migration/discovery.md`](../04-ui-forms-primitive-migration/discovery.md)
for the full investigation this deliverable and its sibling share.

In short: there is no `Field`-shaped way to pair a label, control, description and error message
anywhere in the library, so every story and every real form hand-rolls that layout — and at least
one story (`Input.stories.tsx`'s `ContactForm`) has already drifted from the component it should be
demonstrating as a result. `ui-forms`'s one form-orchestration export (`useForm`) is an untouched
re-export that standardises nothing beyond what `@tanstack/react-form` already does on its own.
Meanwhile the package's genuine compositions — `Select`, `SingleDatePicker`/`DateRangePicker`,
`CheckboxGroup` — are exactly the shape this deliverable wants more of.

## Relationship to other deliverables

This deliverable **depends on**
[`04-ui-forms-primitive-migration`](../04-ui-forms-primitive-migration/spec.md) — it needs the moved
primitives' final `ui-core` locations settled before building `Field` and its Storybook coverage on
top of them. A third, deferred piece (JSON/schema-driven rendering) is out of scope here too — see
Non-Goals — and gets its own future discovery once this ships.

## Goals

1. A standard, documented way to compose a label + control + description + error message, used
   consistently across every manual-composition example in Storybook and available to real forms in
   the app.
2. `ui-forms`'s job is form-library integration, not hosting UI primitives — the `Field`↔TanStack
   Form glue lives here, the presentational pieces live in `ui-core`.
3. Every exported component touched by this or the prior deliverable has standalone, composition, and
   common-pattern Storybook coverage, and behaviour-driven `play()` tests.
4. A credible, sequenced path to schema/JSON-driven form rendering, without committing this
   deliverable to designing it before the composition layer it would sit on top of exists.

## Scope

- **Included**: designing and building the `Field` composition pattern; `FieldMessage`; extending
  `Label` with a non-native rendering mode for group headings; the TanStack Form state-to-props
  adapter; rewriting Storybook coverage to the Goal 3 standard for every component touched by this
  and the prior deliverable; establishing the behaviour-testing convention.
- **Not included**: see Non-Goals.
- **Can be delivered independently**: no — depends on
  [`04-ui-forms-primitive-migration`](../04-ui-forms-primitive-migration/spec.md).

## Non-Goals

- **Designing the JSON/schema-driven renderer.** This is new feature work with its own undecided
  questions (schema format, validation-library integration, extensibility for custom field types).
  It needs its own `problem-discovery` pass once this deliverable's composition layer exists to sit
  on top of. Referenced here only to make sure `Field` is designed so a future renderer can drive it
  (see Requirements → Integration).
- **Replacing TanStack Form.** `useForm` continues to come from `@tanstack/react-form`, untouched.
- **Retrofitting `play()` coverage onto every existing `ui-core` component** that predates this work.
  Only components touched by this redesign (the primitives moved in `04`, plus `Field`/`FieldMessage`
  here) are required to meet the new bar; the rest is out of scope.
- **Fixing `Alert`'s redundant `destructive`/`error` variants.** Noted during review as pre-existing
  duplication (see Decisions), but `Alert` itself isn't touched by this deliverable.

## Requirements

### Functional

- A `Field` component exists that composes a label, the control itself (passed as a child or slot),
  an optional description, and an optional error message, with consistent spacing/layout — replacing
  the hand-rolled `<div className="grid gap-3">` / `<div className="space-y-2">` wrappers currently
  duplicated across every story.
- `Field` has no dependency on `@tanstack/react-form` or any specific form-state library — it accepts
  plain values (label text, error text/boolean, description text, required flag) so it's usable in a
  form built with `useForm`, a form built with plain `useState`, or no form library at all.
- `ui-forms` provides a thin adapter that reads a TanStack Form field's state (touched/error/value)
  and returns `Field`'s plain props — nothing more. TanStack Form itself is not wrapped or extended;
  it continues to do exactly what it does today (store field values, validation state, meta), and
  `useForm` stays the untouched re-export it already is. The adapter is a one-way translation from
  "shape TanStack Form happens to expose" to "shape `Field` happens to accept," not a component
  registry or a customised form hook — see Decisions.
- `Field` wraps exactly one control. It is not extended to cover grouped controls — see the separate
  requirement for `CheckboxGroup`/`RadioGroup` group labelling below.
- A new, small `ui-core` component (working name `FieldMessage`) renders `Field`'s description and
  error content as a single line of icon + text, colour- and icon-coded by state:
  `error`/`warning`/`info`/`success` — reusing `Alert`'s existing colour vocabulary
  (`Alert.variants.ts`) rather than inventing a second palette, but not `Alert` itself, which is a
  bordered/background banner and the wrong visual weight for text under a single field. `success` is
  included for completeness even though it isn't a near-term priority; `info` is the default/neutral
  state a plain (non-validation) description uses. See Decisions for the icon-per-state mapping.
- `FieldMessage` is scoped to `Field`'s internal use for this deliverable — it is not exported from
  `ui-core`'s public API. It can be promoted to a standalone export later if a second use case for an
  icon+text status line appears elsewhere in the app; none has yet.
- `Label` gains a way to render as a non-native element (e.g. a styled `<span>`) instead of a native
  `<label htmlFor>`, plus an optional bold/emphasised weight, both via props on the existing
  component rather than a new one.
- `CheckboxGroup` and `RadioGroup` (both moved/added in `04`) use `Label` in its non-native mode for
  their group-level heading. Each individual option inside the group continues to use
  `CheckboxLabel`/`RadioLabel` — the existing native, per-item label pairing — unchanged.
- Every component moved in `04`, plus `Field` itself, ships standalone, composition (paired with
  `Field`, paired with other controls), and common-pattern (error state, disabled, controlled)
  Storybook stories.
- Every component in scope has `play()`-driven interaction tests covering its primary user
  interaction (typing, checking, selecting, keyboard navigation) and asserting on rendered
  output/DOM state, not internal implementation.

### Accessibility

- **Single-control `Field`**: the label associates with its control natively (`htmlFor`/`id`, or the
  control nested inside the `<label>`) rather than via `aria-labelledby` where a native association
  is possible.
- **`Field`'s error message** is programmatically associated with its control via
  `aria-describedby`, and the control carries `aria-invalid="true"` while the error is present.
- **Required fields** are indicated by more than colour alone (text, symbol, or both), consistent
  with WCAG 1.4.1 (Use of Color), and the control itself carries `required`/`aria-required` in
  addition to any visual indicator.
- **`FieldMessage` differentiates state by icon shape as well as colour**, for the same WCAG 1.4.1
  reason as the required-field indicator above — a colourblind user distinguishes `error` from
  `success` by the icon, not only the colour.
- **Group headings** (`CheckboxGroup`/`RadioGroup`'s non-native `Label`) are **not** a native
  `<fieldset>`/`<legend>` pairing (see Decisions), so they don't get automatic group-accessible-name
  behaviour for free. The group wrapper must carry `role="group"` with `aria-labelledby` pointing at
  the heading's `id`, so assistive technology still announces the heading as the group's accessible
  name. This is the specific accessibility cost of the non-native-fieldset choice, and it must be
  implemented explicitly rather than assumed to work like a real `<legend>` would.
- **Error timing**: an error that appears after interaction (e.g. on blur) must be perceivable to
  screen reader users without requiring the control to be re-focused — `aria-describedby` is read on
  focus, so either the error must exist by the time focus lands there, or the error region uses
  `aria-live="polite"` so it's announced when it appears while focus is already on the control.

### Integration

- `Field`'s prop shape is plain enough that a future schema-driven renderer could generate the
  label/description/error/required values from a schema and pass them straight through — this
  deliverable doesn't build that renderer, but shouldn't design `Field` in a way that would need
  reworking to support it.
- No new cross-package dependency is introduced. `ui-core` does not gain a dependency on
  `ui-overlays` or `ui-command` as a side effect of this work.

## Edge Cases & Error Handling

- **`Field` wraps a control that manages its own error display** (if one exists later) — `Field`'s
  error slot and the control's own error rendering must not both fire for the same validation state.
  Not a case today, but worth a documented rule so it doesn't silently double up later.
- **`Label`'s non-native mode is mistaken for a normal label.** Rendered as a `<span>`, it carries no
  `htmlFor` and must not be wired up as if it labels one specific control — it labels the group as a
  whole via `aria-labelledby`/`role="group"` on the wrapper (see Accessibility). A consumer using the
  non-native mode outside a group context (as a plain styled heading) is a valid, unrelated use and
  needs no `aria-labelledby` wiring at all — the association is only required when it's standing in
  for a group's accessible name.
- **A story demonstrates composition incorrectly** (the exact failure mode that produced the
  `Textarea` drift) — mitigated structurally by this deliverable requiring every manual-composition
  example to use `Field`, so there's one place the pattern is defined rather than N hand-rolled
  copies to drift independently.

## Success Criteria

- [ ] All Acceptance Criteria below pass.
- [ ] `pnpm build` / `pnpm lint` / `pnpm test` stay green across `ui-core` and `ui-forms`.
- [ ] Every component in scope (moved in `04`, plus `Field`/`FieldMessage`) has the Storybook and
      `play()` coverage required by Goal 3.

## Acceptance Criteria

- Given `Field` wrapping a control with no error and no description, when rendered, then it shows
  only the label and the control.
- Given `Field` wrapping a control with an error message, when rendered, then the error is visible,
  associated with the control for assistive technology (e.g. `aria-describedby`), and the control
  reflects an invalid state.
- Given a manually-composed TanStack form using `Field` and the provided adapter, when a field's
  validation state changes (touched, error, valid), then `Field`'s displayed state updates without
  the form author hand-translating TanStack Form's field API themselves.
- Given the adapter, when its implementation is inspected, then it contains no reference to any
  specific `ui-core` component (`Field`, `Input`, …) beyond the plain prop shape it returns — it
  reads TanStack Form field state in, and returns plain values out, nothing else.
- Given every component in scope, when its Storybook file is inspected, then it has at least one
  standalone story, one composition story (with `Field` and/or another control), and one
  common-pattern story (error/disabled/controlled as applicable).
- Given every component in scope, when its Storybook file is inspected, then it has at least one
  `play()` interaction test exercising its primary user interaction.
- Given the `ContactForm`-style hand-rolled `<textarea>` currently in `Input.stories.tsx`, when this
  deliverable ships, then that story (or its replacement) uses `Field` + `Textarea` instead of a
  duplicated raw element.
- Given `CheckboxGroup` or `RadioGroup` rendered with a group heading, when inspected with an
  accessibility tree tool, then the group container reports the heading text as its accessible name
  (via `role="group"` + `aria-labelledby`), and each individual option still reports its own
  per-item label separately.
- Given a `Field` in an invalid state, when inspected, then its control carries `aria-invalid="true"`
  and an `aria-describedby` pointing at the visible error text.
- Given a required `Field`, when inspected, then the required indicator is conveyed through text or
  a symbol (not colour alone) and the control carries `required`/`aria-required`.
- Given `FieldMessage` in each of its four states (`error`, `warning`, `success`, `info`), when
  rendered, then it shows the icon+colour pairing from Decisions, and no two states share the same
  icon.
- Given `ui-core`'s public exports, when inspected, then `FieldMessage` is not among them — it is
  used internally by `Field` only.

## Decisions

- **`Field` is strictly single-control.** It never wraps more than one control under one
  label/description/error, and it is never extended to cover grouped controls (checkbox/radio
  groups). This keeps `Field` and this deliverable small; a multi-control field is explicitly
  deferred until real usage demonstrates the need.
- **Groups get their own label handling via an extended `Label`, not `Field`, and not a native
  `<fieldset>`/`<legend>`.** `CheckboxGroup`/`RadioGroup` render a group-level heading using `Label`
  in a new non-native (`<span>`) mode, with an optional bold weight; each option inside keeps its
  existing native, per-item `CheckboxLabel`/`RadioLabel`. `shadcn`'s `Field` family (referenced during
  review — [ui.shadcn.com/docs/components/radix/field](https://ui.shadcn.com/docs/components/radix/field))
  solves this with a native `FieldSet`/`FieldLegend` pair instead, which gets group-accessible-name
  behaviour from the browser for free — that alternative was considered and deliberately not taken,
  in favour of keeping one `Label` component doing this job everywhere rather than introducing a
  second, fieldset-specific component. The accessibility cost of that choice (no automatic
  `<legend>` association) is made up for explicitly — see Accessibility.
- **`Field` is a plain presentational component with no form-library dependency**, and the
  TanStack-Form-aware glue that feeds it lives in `ui-forms`. This keeps `Field` usable outside any
  form-library context (matches Goal 2: `ui-forms`'s job is integration, not hosting primitives) and
  keeps `ui-core` free of a `@tanstack/react-form` dependency it would otherwise pick up.
- **The glue is a thin, one-way state-to-props adapter — not TanStack Form's own form-composition
  APIs (`createFormHookContexts`/`createFormHook`).** Those APIs exist to pre-bind UI components to
  the form hook itself, which was the first direction considered here — rejected on review.
  TanStack Form's job stays exactly what it already does: hold field values, validation state, and
  meta. It has no opinion about UI and gains none. `ui-forms` does not define a custom form hook or
  a registry of pre-wired field components; it defines a small function/hook that takes the plain
  state TanStack Form already exposes for a field (value, error, touched) and returns the plain props
  `Field` already accepts. The consumer still calls TanStack Form's own `form.Field` (or
  `useField`) directly and passes its state through the adapter — the two libraries stay decoupled,
  and `Field` (already decided to have no form-library dependency) is proof the same boundary applies
  one level up: the form-state library shouldn't own the components either.
- **`useForm` remains an untouched re-export of `@tanstack/react-form`'s `useForm`.** No custom
  form hook is introduced — there's nothing for one to do once the glue is a plain adapter rather
  than a component registry.
- **`FieldMessage` reuses `Alert`'s colour vocabulary but is a new, smaller component, not `Alert`
  reused directly.** `Alert` (`rounded-lg border px-4 py-3`, plus `AlertTitle`/`AlertDescription`) is
  sized for a page/section-level notice; a compact single line under a field needs a lighter
  component, not a bordered box repeated under every input. The state→icon mapping is: `error` →
  `x-circle`, `warning` → `alert-triangle`, `success` → `check-circle`, `info` → `info` — one
  distinct icon shape per state, all already available in `Icon`'s existing set. `FieldMessage`
  uses `error`/`warning`/`success`/`info` as its variant names, not `Alert`'s `destructive`/`error`
  pair — `Alert` having two near-identical red variants is pre-existing and out of scope to fix here
  (see Non-Goals); the new component isn't built to inherit that duplication.
- **The JSON/schema-driven renderer is deliberately deferred**, per Non-Goals — it's a large,
  under-specified feature that deserves its own discovery rather than being designed as a rider on an
  architectural cleanup.

## Open Questions

1. **Does the state-to-props adapter work against `form.Field`'s render-prop API, `useField`, or
   both** — and is it a hook, a plain function, or both? Implementation planning, not this spec, but
   worth surfacing now since it's the concrete shape this deliverable has to design.

## Design References

- The pattern to generalise: `SingleDatePicker`
  ([`SingleDatePicker.tsx`](../../packages/ui-forms/src/components/DatePickers/SingleDatePicker/SingleDatePicker.tsx))
  already composes `Button`/`Icon` (`ui-core`) + `Popover*` (`ui-overlays`) + `Calendar` cleanly —
  this is what "ui-forms standardises composition" looks like when it's working. `CheckboxGroup` is
  the same story one layer down (`Checkbox` + `CheckboxLabel` composed into a selection list).
- The drift this deliverable exists to prevent:
  [`Input.stories.tsx:427-434`](../../packages/ui-forms/src/components/Input/Input.stories.tsx#L427-L434).
