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
- `Field` wraps exactly one *control*, where a group (`CheckboxGroup`/`RadioGroup`) counts as one —
  it holds one value and takes one label, description and error. `Field` is **not** extended to sit
  over two independent controls under a single label; that remains deferred. See Decisions.
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
- `Label` gains a way to render as a non-native element (a styled `<span>`) instead of a native
  `<label htmlFor>`, plus an optional bold/emphasised weight and a required indicator, all via props
  on the existing component rather than a new one.
- `CheckboxGroup` and `RadioGroup` (both moved/added in `04`) accept the accessibility props `Field`
  hands their container (`id`, `aria-labelledby`, `aria-describedby`, `aria-invalid`,
  `aria-required`), which is how they receive a group heading. Each individual option inside the
  group continues to use `CheckboxLabel`/`RadioLabel` — the existing native, per-item label
  pairing — unchanged.
- `Select`, `SingleDatePicker` and `DateRangePicker` accept the same props on their trigger button,
  so `Field` can associate a label and error with them. Their prop types are closed today, and
  `SelectTrigger`'s hardcoded `aria-label` currently overrides any label pointed at it.
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
- **Group headings** (the non-native `Label` a `Field` renders around a group) are **not** a native
  `<fieldset>`/`<legend>` pairing (see Decisions), so they don't get automatic group-accessible-name
  behaviour for free. The group container must carry `aria-labelledby` pointing at the heading's
  `id`, so assistive technology still announces the heading as the group's accessible name. It must
  also expose a grouping role: `CheckboxGroup` needs `role="group"` added explicitly, while
  `RadioGroup` already has Radix's more specific `role="radiogroup"` and must keep it (see
  Decisions). This is the specific accessibility cost of the non-native-fieldset choice, and it must
  be implemented explicitly rather than assumed to work like a real `<legend>` would.
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
- Given `CheckboxGroup` or `RadioGroup` composed inside a `Field`, when inspected with an
  accessibility tree tool, then the group container reports the heading text as its accessible name,
  and each individual option still reports its own per-item label separately. The mechanism differs
  per component by design (see Decisions): `CheckboxGroup` gets `role="group"` + `aria-labelledby`;
  `RadioGroup` keeps Radix's `role="radiogroup"` and gets `aria-labelledby` only.
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

- **~~`Field` is strictly single-control.~~ Amended during planning — `Field` wraps groups too.**
  The original decision kept `Field` to one control and gave groups a `label` prop of their own.
  Planning `05` found the cost: a required `CheckboxGroup` then has **nowhere to display a
  validation error**, because the error slot lives on `Field` and groups were excluded from it.
  `Field` in non-native label mode already produces exactly the wiring a group needs — heading
  rendered as a `<span>`, `aria-labelledby` on the group container — and brings the description and
  error slots with it at no extra cost. So `CheckboxGroup`/`RadioGroup` do **not** gain a `label`
  prop; they gain accessibility prop passthrough and are composed inside `Field` like every other
  control. One way to label a control, which is the point of the deliverable. A genuinely
  multi-control field (two inputs under one label) remains deferred.
- **Groups are labelled via `Label`'s non-native mode, not a native `<fieldset>`/`<legend>`.**
  `Field` renders the group-level heading using `Label` in its non-native (`<span>`) mode; each
  option inside keeps its existing native, per-item `CheckboxLabel`/`RadioLabel`. `shadcn`'s `Field`
  family (referenced during review —
  [ui.shadcn.com/docs/components/radix/field](https://ui.shadcn.com/docs/components/radix/field))
  solves this with a native `FieldSet`/`FieldLegend` pair instead, which gets group-accessible-name
  behaviour from the browser for free — that alternative was considered and deliberately not taken,
  in favour of keeping one `Label` component doing this job everywhere rather than introducing a
  second, fieldset-specific component. The accessibility cost of that choice (no automatic
  `<legend>` association) is made up for explicitly — see Accessibility.
- **`RadioGroup` keeps `role="radiogroup"`; only `CheckboxGroup` gets `role="group"`.** Amended
  during planning. `RadioGroupPrimitive.Root` already emits `role="radiogroup"`, which is the more
  specific role — assistive technology announces set position ("2 of 4") from it. Overwriting it
  with `group` to match the Accessibility requirement's literal wording would be a regression, so
  `RadioGroup` receives `aria-labelledby` alone. Radix ships no checkbox-group primitive, so
  `CheckboxGroup` does need `role="group"` added explicitly. The outcome both requirements ask for —
  the container reports the heading as its accessible name — is met either way.
- **`Label`'s two new props are `nativeLabel` and `emphasis`, and `Label` owns the required
  indicator.** `nativeLabel={false}` renders a `<span>` instead of a native `<label htmlFor>`.
  `emphasis` defaults to `true` (bold); `CheckboxLabel`/`RadioLabel` opt out to keep their current
  weight. `required` renders the non-colour indicator itself rather than `Field` doing it, because
  groups need the same indicator and `Label` is the one component that knows it is naming a control.
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
- **Amended during planning: `ui-forms` also ships a `FormField` component built on that adapter.**
  The decision above said `ui-forms` would export the translation and nothing else. In practice a
  caller should be able to name a field and have its value and metadata already resolved, rather
  than opening a `form.Field` render prop by hand at every call site. `FormField` renders TanStack's
  own `form.Field` internally — which is where the reactivity comes from, unchanged — and composes
  `Field` with the adapter. What the decision above actually argued against, **a registry of
  pre-wired field components**, is still rejected: `FormField` is one generic component that hands
  the accessibility and data bindings to its children, and never maps a control name to a component
  or knows how any given control reports a change. Connecting `value`/`onChange` stays a one-line
  job at the call site, which is what keeps it working with controls that don't exist yet. The
  adapter remains separately exported and free of every `ui-core` reference, so the acceptance
  criterion about its contents is unaffected.
- **Amended again during implementation: `ui-forms` also ships six bound field components** —
  `TextField`, `TextareaField`, `CheckboxField`, `SwitchField`, `SelectField`, `RadioGroupField`.
  `FormField` alone left real friction at every call site, and the friction was not cosmetic: the
  control bag's `value` **collides with Radix's own `value` prop** on `Checkbox` and `Switch`, so
  those controls need `{({ value, onChange, ...control })` destructuring rather than a plain spread —
  a type error the first time, and a paper cut every time after. `RadioGroupField` also has to
  remember `nativeLabel={false}`, which a caller silently gets wrong.

  Each component is an ordinary composition over `FormField` that knows one control's change shape.
  That knowledge has to live somewhere; the alternative was copy-pasting it at every call site. What
  the Decision above rejected — a `control='input'` style registry mapping a *name* to a component,
  requiring a new entry per control — is still rejected, and `FormField` stays exported as the
  escape hatch for controls with no wrapper.

  `CheckboxGroupField`, `SliderField` and date-picker fields were deliberately left out: they are
  the rarely-used four, and `FormField` covers them.
- **Found during implementation, and it belongs in the spec because it is a caller obligation:
  a form using these components must set `noValidate`.** `required` renders a *native* `required`
  attribute — which is correct, and is what assistive technology announces. But it also enables the
  browser's own constraint validation, and when that fails the browser **blocks the `submit` event
  outright**. The React `onSubmit` handler never runs, so `form.handleSubmit()` never runs, so
  nothing validates and no message appears. Found by a test that submitted an empty required field
  and got back nothing at all.
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
- **~~`FieldMessage` is a new, smaller component, not `Alert` reused directly.~~ Reversed during
  implementation, on the user's call: `FieldMessage` composes `Alert`.** The decision above worried
  about visual weight — `Alert` is a bordered, padded banner, and one per field is heavier than a
  line of helper text. That trade was made deliberately in the other direction: sharing one
  component means field-level and page-level messaging cannot drift into two palettes or two sets
  of state semantics, which is the failure this deliverable exists to prevent one layer down.

  `FieldMessage` therefore renders an `Alert` and changes exactly three things: it narrows the
  variants to the four that mean something under a control (dropping `default`, and `destructive`
  which is a second near-identical red beside `error`); it owns the state→icon mapping, so `error`
  cannot be paired with a tick; and it clears `role='alert'`.

  **That last one is not cosmetic.** `role="alert"` is an *assertive* live region — right for a
  page-level banner, wrong under a text input, where it interrupts a screen reader mid-keystroke
  every time a message renders or changes. `Field` wraps its messages in a single polite live
  region instead (see Accessibility → Error timing), and an assertive region nested inside a polite
  one overrides it for that subtree. `Alert` sets `role` before spreading props, so passing
  `undefined` genuinely clears it.
- **`Alert` gains an `info` variant, which this deliverable adds.** The Decision above described a
  four-state palette drawn from `Alert`, but `Alert` had only
  `default`/`destructive`/`success`/`warning`/`error` — there was no neutral informational state to
  reuse, so the "four-state reuse" was only ever three. `info` is added to `Alert.variants.ts` in
  the blue family, following the same shape as its `success`/`warning`/`error` entries, so both
  components share all four.
- **The JSON/schema-driven renderer is deliberately deferred**, per Non-Goals — it's a large,
  under-specified feature that deserves its own discovery rather than being designed as a rider on an
  architectural cleanup.

## Open Questions

1. ~~**Does the state-to-props adapter work against `form.Field`'s render-prop API, `useField`, or
   both** — and is it a hook, a plain function, or both?~~ **Resolved during planning: one plain
   function, covering both.** Verified against the installed `@tanstack/react-form` 1.23.8 —
   `form.Field`'s `children` is `functionalUpdate(children, fieldApi)` and `useField()` returns that
   same `FieldApi`, so both hand the caller the identical object and one function serves both. It
   must **not** be a hook: `useField` already calls `useStore(fieldApi.store)` with no selector, so
   the consuming component re-renders on any meta change already; a hook wrapper would subscribe a
   second time for nothing.

## Design References

- The pattern to generalise: `SingleDatePicker`
  ([`SingleDatePicker.tsx`](../../packages/ui-forms/src/components/DatePickers/SingleDatePicker/SingleDatePicker.tsx))
  already composes `Button`/`Icon` (`ui-core`) + `Popover*` (`ui-overlays`) + `Calendar` cleanly —
  this is what "ui-forms standardises composition" looks like when it's working. `CheckboxGroup` is
  the same story one layer down (`Checkbox` + `CheckboxLabel` composed into a selection list).
- The drift this deliverable exists to prevent, two instances:
  - [`Input.stories.tsx:425-432`](../../packages/ui-core/src/components/Input/Input.stories.tsx#L425-L432)
    — `ContactForm` hand-writes a raw `<textarea>` with its own copy of the border/ring classes,
    inside the package that exports `Textarea`. (This file moved to `ui-core` in `04`; the citation
    above was corrected during `05`'s planning, having previously pointed at its old `ui-forms`
    path and line numbers.)
  - [`Slider.stories.tsx:30`](../../packages/ui-core/src/components/Slider/Slider.stories.tsx#L30)
    — `<Label htmlFor='basic-slider'>` points at an `id` **nothing carries**. Found while planning
    `05`. Worse than the `Textarea` case: a label associated with nothing at all, rather than a
    duplicated element. It is also the concrete case that forces `Field`'s non-native label mode,
    since `Slider`'s control is a `<span role='slider'>` that `htmlFor` cannot name.

---

## Second pass — the form layer

**Status: specified, not built.** Everything above this line shipped (see [`plan.md`](./plan.md)).
Everything below was raised after seeing the result, then interrogated into requirements in a
follow-up session. It replaces the five loose proposals that previously sat here — the open
questions those carried are settled below except where Open Questions says otherwise.

`05` built the *pieces*. Assembling a form out of them is still manual, and three of the manual
steps fail **silently**:

- **`noValidate` is a caller obligation** that blocks the `submit` event outright when forgotten —
  React's `onSubmit` never fires, `form.handleSubmit()` never runs, nothing validates and no message
  appears. See Decisions above; `05` could only mitigate it by documenting it in three places.
- **A submit button that isn't one.** `Button` defaults `type='button'` deliberately, so
  `<Button>Save</Button>` inside a form renders, looks correct, and does nothing at all.
- **Server errors that belong to no field have nowhere to go.** A field-attributed server error
  already flows through `toFieldProps` via `errorMap.onServer`. A 500, a 429, an expired session or
  a network failure does not, so every consumer hand-rolls a message above the submit button — the
  same duplication this deliverable exists to prevent, one layer up.

Alongside that, every field takes a `form` prop carrying the same value as every other field in the
form.

### Goals

1. Make the silent caller obligations impossible rather than documented — a form cannot be built
   without `noValidate`, and a submit button cannot be built without submit semantics.
2. A field locates its form without being handed it, so naming a field is the only thing a caller
   writes.
3. Submission becomes a first-class surface: submitting state, validity state, and a place for
   errors that belong to the form rather than to any field.
4. One Storybook story proves the whole flow end to end.

### Scope

- **Included**: a `Form` component owning the `<form>` element, `noValidate` and the form context; a
  submit button reflecting submitting and validity state; a form-level error surface; removing the
  `form` prop from the six bound field components and `FormField`; defaulting each field's control
  `id` to its `name`; stories and MDX for everything touched, including splitting the shared
  `fields` stories into one page per field component.
- **Not included**: restoring compile-time checking of `name`; a runtime check that a `name` exists;
  new field components — the roster stays at the six that shipped, with `CheckboxGroupField`,
  `SliderField` and the date-picker fields still pointed at `FormField`; any field-definition helper
  or declarative field list, which is the deferred dynamic-form work; cross-linking every control's
  documentation from the worked examples; `asChild`, headless rendering or nested forms.

### Requirements

#### Functional

- A `Form` component renders a native `<form>` and makes the form instance available to every
  descendant without a prop.
- **`noValidate` is always set and cannot be overridden.** It is not a default; there is no prop
  that turns it off.
- Submitting prevents the browser default, stops the event propagating further, and runs the form's
  own submit handling.
- `Form` accepts a callback that fires **only after a submission that succeeded**, receiving the
  submitted values. It is for consequences belonging to the page rather than to the mutation —
  closing a dialog, a toast, navigation. The mutation itself, and any server errors it returns, stay
  with the form instance.
- `Form` applies **no layout of its own**. It accepts a class name and forwards everything else to
  the element.
- The six bound field components and `FormField` **no longer accept a `form` prop**. A `Form`
  ancestor is a hard requirement, and rendering any of them without one **throws**, naming the
  component and the missing provider.
- A field's `name` is a plain string. Nothing validates it at compile time or at runtime.
- Each bound field defaults its control's `id` to its `name`; a caller-supplied `id` still wins.
- A **submit button** component exists that cannot be built without submit semantics, reflects
  whether a submission is in flight, and reflects validity per the disable rule in Decisions.
- A **form-level error surface** renders a message belonging to the form rather than to any field.
  The message comes from the form's own state — set by the submit handler — rather than from
  caller-held React state, so it clears itself on the next submission and cannot go stale.
- Messages are never invented. Neither surface substitutes generic wording for what the server
  actually said; the generic case is reserved for a failure that produced no message at all.
- Every component added or changed meets Goal 3's Storybook and `play()` bar.

#### Accessibility

- The form-level error message is announced when it appears without the user having to move focus to
  find it, and the region carrying it **exists in the DOM before it has any content** — a live
  region inserted at the same moment as its content is unreliably announced, which is the trap
  already hit and solved for `Field`.
- That region is **assertive**, unlike `Field`'s polite per-field regions. Polite is right while the
  user is typing and wrong once they have pressed submit and stopped to wait for a result.
- A submit button rendered unavailable **because the form is invalid** must remain reachable by
  keyboard and screen reader, and pressing it must still re-run validation — so the user can always
  ask "am I done yet?" and get an answer. A control that is both dead and unexplained is not an
  acceptable outcome of the disable rule.
- A submit button unavailable **because a submission is in flight** reports a busy state.
- Removing the browser's constraint validation removed its focus behaviour too. What replaces it, if
  anything, is unresolved — see Open Questions.

### Edge Cases & Error Handling

- **A form inside a portalled overlay, authored inside another form.** React events propagate
  through the React tree rather than the DOM tree, so a `Form` rendered inside a `Dialog` or `Sheet`
  written inside another `Form`'s JSX submits **both** unless propagation is stopped. The two
  `<form>` elements are nowhere near each other in the DOM, so this is invisible on inspection.
- **A form filling a dialog.**
  [`DialogContent`](../../packages/ui-overlays/src/components/Dialog/components/DialogContent.tsx#L24)
  is `max-h-[90vh] flex flex-col` and
  [`DialogContentArea`](../../packages/ui-overlays/src/components/Dialog/components/DialogContentArea.tsx)
  is `flex-1 overflow-y-auto`; the scroll depends on their being directly related. Wrapping header,
  body and footer in a `Form` inserts an element between them, and if that element is not itself a
  flex container the body stops scrolling, content overflows the clipped height, and the footer —
  carrying the submit button — is pushed out of view. A long form in a dialog becomes unsubmittable.
  `Form` shipping no layout is what keeps this an ordinary class-name decision rather than an
  override of an invisible default.
- **A misspelled field name** binds to a field that is not part of the form's data: it renders,
  accepts input, never validates, and contributes nothing on submit. Nothing detects this.
- **A field rendered without a `Form` ancestor** throws immediately rather than rendering degraded.
- **The same field name rendered twice in one document** produces duplicate element ids, since ids
  default to names. Unusual, and not defended against.
- **A submit handler returning field errors for names that don't exist** sets them on fields nothing
  renders, so they are invisible. Same class as a misspelled name, same treatment.

### Acceptance Criteria

- Given a form built with `Form`, when the DOM is inspected, then the `<form>` carries `noValidate`,
  and no combination of caller-supplied props removes it.
- Given a required field left empty, when the form is submitted, then validation runs and the error
  appears — the browser did not silently block the submission.
- Given a field component rendered with no `Form` ancestor, when it renders, then it throws an error
  naming the component and the missing provider.
- Given a field bound by name, when the DOM is inspected, then its control's `id` is that name and
  its `aria-describedby` resolves to its own message region.
- Given a submit button inside a `Form`, when it is pressed, then the form submits — without the
  caller having specified submit semantics.
- Given a submission in flight, when the submit button is inspected, then it reports a busy state
  and a second press does not start a second submission.
- Given a form never yet submitted and invalid, when the submit button is inspected, then it is
  available, and pressing it runs validation and reveals every outstanding error.
- Given a form submitted at least once and still invalid, when the submit button is inspected, then
  it presents as unavailable, remains reachable by keyboard, and pressing it still re-runs
  validation.
- Given a submit handler returning errors keyed by field name, when submission completes, then each
  named field displays its own message, with no translation written by the caller.
- Given a submit handler reporting a failure belonging to no field, when submission completes, then
  the message it produced is displayed once at form level, is announced without focus being moved to
  it, and is gone on the next submission.
- Given a successful submission, when it completes, then `Form`'s success callback fires exactly
  once with the submitted values, and does not fire on a submission that failed validation or failed
  at the server.
- Given a `Form` inside a portalled overlay that is itself authored inside another `Form`, when the
  inner form is submitted, then the outer form's submit handling does not run.
- Given the Storybook documentation, when it is inspected, then each of the six field components has
  its own stories file and MDX page, documenting only what is specific to that field and linking to
  the components it composes rather than restating them.
- Given the Storybook documentation, when it is inspected, then one story drives a realistic
  multi-field form end to end — validation failure, a server error bound to a field, a form-level
  failure, and a successful submission — with `play()` coverage of the whole sequence.

### Decisions

- **The form travels by context, and `name` becomes `string`.** React context is not generic, so a
  context-supplied form loses the `TFormData` inference that makes `name` autocomplete and
  typo-check. Every alternative preserving that inference is a factory — TanStack's own
  [`createFormHook`](https://tanstack.com/form/v1/docs/framework/react/guides/form-composition),
  Mantine's [`createFormContext<T>()`](https://mantine.dev/form/create-form-context/), or a
  hand-rolled equivalent — and a factory means the field components come from `createForm<IAccount>()`
  rather than from the package barrel. **Keeping them importable from the barrel was judged worth
  more than the compile-time check.** The trade, stated as a trilemma so it stays on the record: a
  call site with no `form` prop, a typed `name`, and barrel-imported components — any two, never all
  three.
- **The earlier rejection of `createFormHook` was already two-thirds reversed, and is not the reason
  for rejecting it now.** That decision rested on "no pre-bound UI components" and "no registry",
  both of which fell when this deliverable shipped six bound field components. The reason that
  stands on its own is different: `createFormHook` puts TanStack's own API shape (`form.AppField`)
  at every call site, and the point of these components is that a caller writes a field name and
  nothing else.
- **`form` is removed rather than made optional.** An optional `form` that restores inference is
  only a mitigation if someone passes it, and the stated 99% case never would. Dead API surface
  presented as a safety net is worse than an honest absence.
- **A missing `Form` throws, and is not wrapped in an error boundary.** A missing provider is a
  developer error and a structural one — if the tree renders once, it is correct forever. A boundary
  would convert a crash in development into a caught state, making the mistake *more* likely to
  ship, and boundaries do not catch errors outside render anyway. An error boundary for consumer
  code throwing inside a field is a separate proposal with a separate justification.
- **The throw is documented, not asserted in a test.** A one-time authoring mistake with an
  unambiguous message.
- **Nothing checks that a `name` exists.** A dev-time warning comparing each field's `name` against
  the form's default values was considered and rejected: naming a field is a one-time authoring act,
  the check would have to tolerate array paths, and documentation was judged proportionate. **This
  is an accepted risk, recorded rather than mitigated** — a misspelled name produces a field that
  renders, accepts input, and silently never submits.
- **`Form` ships no layout.** A default vertical rhythm was considered and dropped after the dialog
  case above, where the correct layout is structurally different from any sensible default and a
  caller overriding it would have to know a default existed, what it was, which parts survive a
  class-name merge, and one non-obvious extra rule to make scrolling work. No default means no
  invisible knowledge, and it avoids setting the repo's first above-component spacing scale by
  accident, ahead of the design-system audit planned in [`docs/README.md`](../README.md).
- **Propagation is stopped on submit.** Not for nested `<form>` elements, which HTML forbids, but
  for portalled overlays — see Edge Cases.
- **The mutation stays with the form instance; `Form`'s callback fires only on success.** The
  deciding factor is that submitting state is true for exactly as long as the form library is
  awaiting the handler. Moving the mutation onto `Form` would mean the form reports itself finished
  while the request is still in flight, so the submit button would stop loading and re-enable
  mid-save — and fixing that would need `Form` to keep its own submitting state, giving two answers
  to one question. Keeping the mutation with the form instance also preserves the return-value
  contract that binds server errors to fields.
- **The callback is named for what it does.** It fires on success, so it is named for success.
  Calling it `onSubmit` would be a lie — it does not fire on every submission — and it would sit
  beside the form instance's own `onSubmit` with different timing and different arguments.
- **Server errors bind to fields by default; the form-level surface is the fallback.** Mapping an
  API response to field names is application-specific and stays in the caller's submit handler. What
  this provides is the place the unbindable remainder renders. Field binding itself needs no new
  code — `toFieldProps` already reads `errorMap.onServer`.
- **The form-level message is read from form state, not held by the caller.** Caller-held state has
  to be cleared at the start of every submission or a stale failure sits above a form that has since
  succeeded.
- **A submit button exists as a component, and the reason is `type`.**
  [`Button.tsx:88`](../../packages/ui-core/src/components/Button/Button.tsx#L88) defaults
  `type='button'` on purpose, so a plain `Button` inside a form renders correctly and does nothing —
  a silent, complete failure of the same class as the missing `noValidate`. The component exists to
  make that unforgettable, and to own the accessibility decisions above in one place rather than
  having them re-derived per application.
- **The disable rule: never before the first submission; unavailable while invalid after it.**
  Disable-until-valid as a *starting* state was rejected — it gives no reason, is skipped by
  keyboard and screen-reader navigation, and leaves someone stuck. The chosen rule keeps the button
  live until the user has actually asked for a result. The trade is that a user part-way through
  fixing errors sees an unavailable button, which is why the accessibility requirement insists it
  stay reachable and still re-validate on press. The state derives from the form's own
  submission-attempt count, so it is observable and can be driven in a story.
- **Unavailable-for-validity and unavailable-for-submitting are not the same mechanism.** In flight,
  the control is genuinely disabled — a brief state where a second press must not start a second
  request. For validity it must stay focusable and still re-run validation on press. *Proposed
  during the requirements session and not contested; flag it if native disabled is wanted in both
  cases, at the cost of the button leaving the tab order.*
- **Field ids default to field names.** React 19's fallback ids contain characters invalid in a CSS
  selector, already documented as a trap in [`plan.md`](./plan.md). Defaulting to the name gives
  readable DOM ids, makes a field's element reachable from its name, and removes the trap from every
  story.
- **Per-field stories and MDX are part of this work, not a later documentation pass.** Not as a
  documentation project: removing the `form` prop means the existing shared stories file will not
  compile, so those stories are being rewritten either way. Splitting them at the same time avoids
  writing them twice.
- **The end-to-end story is an acceptance criterion, not a nice-to-have.** It is the only artefact
  exercising validation, field-bound server errors, form-level failure and success together — the
  class of bug it would catch is exactly the one this deliverable shipped and had to find by
  accident.

### Open Questions

1. **Does a failed submission move focus, and where?** Turning off native constraint validation also
   removed the browser's own behaviour of focusing the first invalid control, and nothing replaced
   it. Field ids defaulting to names makes it implementable for the first time. For: with errors
   bound to fields, a form-level message tells a screen reader user that *something* failed without
   telling them *where*, and focusing the first error is the default behaviour of comparable
   libraries rather than an unusual one. Against: it was felt to be aggressive. **Unresolved** —
   options are to focus the first invalid field, to focus the form-level message, or to do nothing
   and record it as a known gap.
2. **Is unavailable-for-validity implemented so the control stays focusable?** Recorded as a
   Decision above because it was proposed and not contested, but never explicitly confirmed — and it
   is the difference between a disabled state that can be interrogated and one that cannot.
