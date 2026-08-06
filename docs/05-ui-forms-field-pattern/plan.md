# Implementation plan: ui-forms Field pattern

Spec: [`docs/05-ui-forms-field-pattern/spec.md`](./spec.md) ·
Depends on: [`04-ui-forms-primitive-migration`](../04-ui-forms-primitive-migration/plan.md) (✅ done)

Status: **in progress.** This is the approved pre-flight plan; it gets rewritten as an as-built
record once shipped, per [`.agent/golden-rules.md`](../../.agent/golden-rules.md).

---

## Context

There is no `Field`-shaped way to pair a label, control, description and error anywhere in the
library, so every story hand-rolls it — **205 occurrences of `grid gap-3` / `space-y-2` / `htmlFor=`
across 26 files**. That duplication has already produced three real defects, all of which this
deliverable fixes as a side effect of existing:

- [`Input.stories.tsx:425-432`](../../packages/ui-core/src/components/Input/Input.stories.tsx#L425) —
  `ContactForm` hand-writes a raw `<textarea>` with its own copy of the border/ring classes, inside
  the package that exports `Textarea`.
- [`Input.stories.tsx:195`](../../packages/ui-core/src/components/Input/Input.stories.tsx#L195) —
  `WithError` renders `<p className='text-sm text-red-500'>` with `aria-invalid` but **no
  `aria-describedby`**. The error is visible and invisible to assistive technology.
- [`Slider.stories.tsx:30`](../../packages/ui-core/src/components/Slider/Slider.stories.tsx#L30) —
  `<Label htmlFor='basic-slider'>` points at an `id` **nothing carries**. A label associated with
  nothing at all. Worse than the `Textarea` drift the spec cites, and not yet recorded anywhere.

Deliverable 04 moved the primitives into `ui-core` and deliberately left the composition layer, the
documentation standard and the `play()` bar to this one.

---

## Baseline

Measured after `pnpm install` + `pnpm turbo run build --force` + Storybook cache clear. The worktree
was **not installed** beforehand, exactly as
[`local-development`](../../.claude/skills/local-development/SKILL.md) warns — every gate would have
lied until it was.

| Gate | Baseline |
| ---- | -------- |
| `pnpm turbo run build --force` | 11/11 successful, **0 cached**, 1m26.8s — a real compile, not a replayed one |
| Lint (`npx eslint --no-cache` per package) | 0 errors, **40 warnings** — 20 in `ui-core`, 20 in `ui-overlays`, 0 elsewhere |
| Storybook interactions (`npx vitest run`) | **326 passed, 0 failed**, 28 files, 79.6s |
| `ui-core` unit tests | 60 |

Both items `04` handed over were checked rather than assumed:

- **Closed already.** `CheckboxGroup.stories.tsx:11` does have `component: CheckboxGroup` — `04`'s
  task 6.7 fixed it after its own "Flagged, not fixed" list was written. Nothing to do here.
- **Still open.** `Radio.stories.tsx:2` imports `@radix-ui/react-radio-group` directly. Picked up in
  Phase 7.4.

---

## Traps found during implementation

Recorded as they were hit, while the detail was fresh.

### A union props type breaks Storybook's story typing, twice

Making `ILabel` a union to keep `htmlFor` out of non-native mode has a cost the plan did not
anticipate, and it lands in the stories rather than the component:

- **`StoryObj<typeof meta>` collapses `args` to `never`.** Every story then fails to compile
  demanding an `args` property it cannot possibly satisfy (`TS2322 … Property 'args' is missing …
  but required in type '{ args: never; }'`).
- **The `play` context loses its inference too**, so `({ canvasElement, step })` becomes
  `TS7031 … implicitly has an 'any' type`.

Neither is a new problem. `Select`'s props are also a discriminated union, and
[`Select.stories.tsx:33`](../../packages/ui-forms/src/components/Selects/Select.stories.tsx#L33)
already solved it: type the meta and each story against **the props type directly**
(`Meta<SelectProps>` / `StoryObj<SelectProps>`) rather than against `typeof meta`, and annotate the
`play` context by hand. `Label` follows the same shape, with one `PlayContext` alias instead of
repeating the annotation per story.

One detail worth stating because it costs a compile cycle to discover: `step` returns
`void | Promise<void>`, not `Promise<void>`. Annotating it as the latter type-errors.

### Verifying AC12 needs a grep that has been checked itself

`FieldMessage` must not appear in `ui-core`'s public surface. The obvious check —
`grep "FieldMessage" packages/ui-core/dist/index.d.ts` — returned **0**, which looks like a pass.
Its control did too: `grep "declare const Label"` also returned 0, on a component that is
unambiguously exported.

The reason is that `dist/index.d.ts` is a **40-line re-export barrel**
(`export { Label } from './components/Label/Label';`), not flattened declarations, so no `declare`
statement appears in it at all. A grep phrased around declarations can never match, and would
report every export as absent.

With a control that does match (`grep -c "Label"` → 7, proving the file is greppable and that a
public component shows up), `FieldMessage` → 0 is meaningful. The package exposes a single `"."`
entrypoint, so absence from that barrel is absence from the API, even though
`dist/components/FieldMessage/` exists on disk.

*04 recorded a broken verification one-liner too. Check the check.*

### `Label.types.ts` was itself one of the lint warnings

`export interface ILabel extends React.ComponentProps<typeof LabelPrimitive.Root> {}` was an empty
interface, and one of `ui-core`'s 20 `no-empty-object-type` warnings. Turning it into a union
cleared it, so `ui-core` is at **19** after Phase 1. The plan predicted the deliverable would end
one warning down, from `ITextarea` alone; it will actually end **two** down, at 38 total.

---

## Decisions taken during planning

Three amend the spec. The spec is the source of truth, so tasks 0.7-0.8 amend it rather than
leaving `plan.md` quietly contradicting it.

- **D1 — `Field` wraps groups too, amending spec Decision
  ([`spec.md:194-198`](./spec.md#L194)).** The spec made `Field`
  strictly single-control and gave groups a `label` prop instead. That leaves a required
  `CheckboxGroup` with nowhere to show a validation error. `Field` in `nativeLabel={false}` mode
  already produces exactly the wiring a group needs — heading as a `<span>`, `aria-labelledby` on the
  container — and brings description and error with it. So groups do **not** get a `label` prop;
  they get accessibility prop passthrough and are composed inside `Field` like everything else. One
  way to label a control, which is the point of the deliverable.
- **D2 — `RadioGroup` keeps `role='radiogroup'`, deviating from AC8's literal wording.**
  [`spec.md:180-182`](./spec.md#L180) prescribes `role="group"` on both
  group wrappers. `RadioGroupPrimitive.Root` already emits `role="radiogroup"`, which is stronger —
  screen readers announce "radio group, N of M" from it. Overwriting it to satisfy the letter of the
  AC would be a regression. The *outcome* the AC asks for (container reports the heading as its
  accessible name) is met either way. `CheckboxGroup` does get `role='group'`; Radix ships no
  checkbox-group primitive.
- **D3 — ~~`FieldMessage` is standalone and invents `info`.~~ Revised during implementation:
  `FieldMessage` composes `Alert`, and `Alert` gains a real `info` variant.** Both the spec and the
  first cut of this plan had `FieldMessage` as a new ~20-line component borrowing only `Alert`'s
  colour *strings*, on the grounds that a bordered banner is too heavy under a single input. The
  user reversed that: one component, so field-level and page-level messaging cannot drift into two
  palettes — which is the same failure this deliverable exists to prevent one layer down. The
  visual weight is the accepted cost and is visible in Storybook.

  Two things fell out of it that the standalone version would not have had:

  - **`Alert` had no `info` variant at all**, so the "four-state reuse" both documents described was
    only ever three states plus `default`. `info` is now added to `Alert.variants.ts` in the blue
    family, matching the shape of its `success`/`warning`/`error` entries.
  - **`Alert` sets `role='alert'`, an assertive live region**, which `FieldMessage` must clear.
    Assertive is right for a page-level banner and wrong under a text input, where it interrupts a
    screen reader mid-keystroke. `Field` already provides one polite region (D7), and an assertive
    region nested inside a polite one overrides it for that subtree. `Alert` sets `role` before
    spreading props, so `role={undefined}` genuinely clears it — verified by a `play()` assertion
    rather than assumed.
- **D4 — `Label`'s `emphasis` defaults to `true` (`font-semibold`).** Field labels and group headings
  get heavier; `CheckboxLabel`/`RadioLabel` pass `emphasis={false}` to keep today's `font-medium`.
  A deliberate, visible change across ~30 stories.
- **D5 — `Label` owns the required indicator.** Not `Field`. Groups need it too, and `Label` is
  already the one component that knows it is naming a control.
- **D6 — the adapter is one plain function, resolving spec Open Question 1.** Verified against the
  installed `@tanstack/react-form` 1.23.8: `form.Field`'s children is `functionalUpdate(children,
  fieldApi)` and `useField()` returns that same `FieldApi`. One function covers both. It must **not**
  be a hook — `useField` already calls `useStore(fieldApi.store)` with no selector, so the consuming
  component re-renders on any meta change; a hook wrapper would subscribe a second time for nothing.
- **D8 — `ui-forms` also ships a `FormField` component, partially amending spec Decision
  ([`spec.md:213-223`](./spec.md#L213)).** The spec said `ui-forms`
  would export the translation and nothing else. In practice a caller should be able to name a field
  and have its value and metadata already resolved, rather than opening a `form.Field` render prop
  by hand every time. `FormField` calls TanStack's `form.Field` internally and composes `ui-core`'s
  `Field` with `toFieldProps`. What the spec actually argued against — **a registry of pre-wired
  field components** — is still rejected: `FormField` is one generic component that hands the
  control bag and the resolved field to its children, and never maps a control name to a component
  or knows how any control reports a change. `toFieldProps` remains separately exported and stays
  free of every `ui-core` reference, so AC4 is unaffected.
- **D7 — the message region is never `display: none`.** See Architecture.

---

## Architecture

| File | Role |
| ---- | ---- |
| `ui-core/src/components/Label/Label.variants.ts` | **new** — base string + `emphasis` |
| `ui-core/src/components/Label/Label.types.ts` | `ILabelNative` \| `ILabelNonNative` union |
| `ui-core/src/components/Label/Label.{stories.tsx,mdx}` | **new** — `Label` has neither today |
| `ui-core/src/components/FieldMessage/` | full component folder, deliberately **not** barrel-exported |
| `ui-core/src/components/Field/` | `Field.tsx`, `.types.ts`, `.stories.tsx`, `.mdx`, `index.ts` |
| `ui-forms/src/adapters/toFieldProps.{ts,types.ts,spec.ts,stories.tsx}` | the state-to-props translation |
| `ui-forms/src/components/FormField/` | `FormField.tsx`, `.types.ts`, `.stories.tsx`, `.mdx`, `index.ts` |

`FieldMessage` gets a **top-level folder**, not `Field/components/`, even though it stays private.
Success Criteria requires it to have its own stories and `.mdx`; a stories file nested under another
component's folder looks misfiled. `useRovingTabIndex` is the precedent — fully typed, fully
tested, absent from the barrel. Note `react-refresh/only-export-components` is an **error** in
[`packages/eslint-config/react.js:47`](../../packages/eslint-config/react.js#L47), so every cva must stay
in its own `.variants.ts`.

### `Field` — render-prop children

```tsx
<Field label='Email address' description='We never share it.' error={error} required>
	{(control) => <Input {...control} type='email' value={value} onChange={onChange} />}
</Field>
```

`control` is the **accessibility bag only** — no `value`, no `onChange`. `Field` generates the ids,
and the control is the only thing that can carry them.

```ts
export interface IFieldControlProps {
	id: string;
	'aria-describedby': string;
	'aria-invalid': true | undefined;
	'aria-labelledby'?: string;   // nativeLabel={false} only
	required?: boolean;            // nativeLabel={true}
	'aria-required'?: true;        // nativeLabel={false}
}

export interface IField {
	label: React.ReactNode;
	children: (control: IFieldControlProps) => React.ReactNode;
	description?: string;
	error?: string;
	required?: boolean;      // default false
	nativeLabel?: boolean;   // default true
	id?: string;             // default undefined → React.useId()
	className?: string;
}
```

`IFieldControlProps` is exported from `src/index.ts` so a future schema renderer can type its own
control factory against it, and so `ui-forms`' `IFormFieldControlProps` can extend it with the data
wiring (`name`/`value`/`onChange`/`onBlur`) rather than redeclaring it. There is no separate `invalid` prop — it is `error !== undefined`, and
two sources of truth for one fact is exactly the double-firing the spec's Edge Cases warn about.

**Why a render prop, and not `cloneElement`.** The decisive case is in scope and demonstrable today:
`Slider` is compound, and the element carrying `role='slider'` is `SliderThumb`, three levels down
from `SliderRoot`. `cloneElement` can only reach the outermost child — it would put
`aria-describedby` on the positioning wrapper, where it does nothing, with no way to say "put these
on the third element down". Only a render prop can target a nested element. Compound slots
(`<FieldLabel/>`/`<FieldError/>`, shadcn's shape) were rejected against the spec's Integration
requirement: a schema renderer can pass four plain values straight through, but not four
conditionally-rendered JSX elements.

### The message region — always present, never hidden

```tsx
<div data-slot='field' className={cn('grid gap-2', className)}>
	<Label htmlFor={id} required={required} emphasis>{label}</Label>
	{children(control)}
	<div id={messagesId} aria-live='polite' className='grid gap-1 not-empty:mt-2'>
		{description && <FieldMessage variant='info'>{description}</FieldMessage>}
		{error && <FieldMessage variant='error'>{error}</FieldMessage>}
	</div>
</div>
```

Description and error render **together**, description first.

The region is always in the DOM and `aria-describedby` always points at it. `aria-describedby` is
read on focus, so an on-blur error must land in a region that already existed — a live region
inserted at the same moment as its content is unreliably announced.

> **`empty:hidden` would defeat this and was the bug in the first draft.** It compiles to
> `display: none`, and an element with `display: none` is **not in the accessibility tree at all** —
> flipping it visible in the same commit as inserting the text reproduces the exact failure the
> design exists to avoid. `not-empty:mt-2` instead: an empty block-level div with no children and no
> margin contributes 0px, so the layout is unchanged and the region is continuously present. The
> spacing must **not** move to a `gap` on the `Field` root, which would apply to the empty child and
> reintroduce the phantom row.

No `role='alert'` — that is assertive and interrupts typing. `aria-live='polite'` with the default
`aria-atomic='false'` announces only the inserted node.

**`messageId` is not decoration — it is what `aria-describedby` points at.** Without an id on the
region there is no programmatic link between the control and its error, which is AC2 and AC9 and the
reason `Field` owns ids at all.

**A caller-supplied `id` wins; `useId()` is only the fallback.** Ids should read as `email`,
`email-message` in the DOM, not as machine noise:

```ts
const fallbackId = React.useId();
const controlId = id ?? fallbackId;
const messageId = `${controlId}-message`;   // always derived, never independently generated
```

> **When the fallback does fire, React 19 ids contain `«` and `»`** (U+00AB/U+00BB — verified in
> `react-dom-client`: `"«" + identifierPrefix + "r" + treeId.toString(32) + "»"`). Valid in `id` and
> `aria-describedby`; **invalid in a bare CSS selector**, and Storybook's root sets no
> `identifierPrefix`. Any `play()` doing `querySelector('#' + id)` throws a `SyntaxError`. Assert by
> comparing `getAttribute('aria-describedby')` against the element's `id`. Passing an explicit `id`
> in stories avoids it entirely, which is another reason to make that the documented default.

### `Label` — your naming, plus `required`

| Prop | Default | Effect |
| ---- | ------- | ------ |
| `nativeLabel` | `true` | `true` → `LabelPrimitive.Root` (`<label htmlFor>`); `false` → plain `<span>` |
| `emphasis` | `true` | `true` → `font-semibold`; `false` → `font-medium` (today's weight) |
| `required` | `false` | renders `<span aria-hidden='true'>*</span>` + an `sr-only` `(required)` |

`as='span'` must render a plain `<span>`, never `LabelPrimitive.Root` — Radix's Root adds a
`mousedown` double-click-selection guard that is meaningless on a heading. `data-slot='label'` stays
on both modes; it *is* a Label, and a second slot name would make every existing
`[data-slot=label]` rule need auditing.

The asterisk is `aria-hidden` so nobody hears "Email star" — the control's own
`required`/`aria-required` is what assistive technology announces. Symbol **plus** text, not colour
alone (AC10).

> **The union breaks two interfaces and this is not optional cleanup.**
> [`ICheckboxLabel`](../../packages/ui-core/src/components/Checkbox/Checkbox.types.ts#L23) and
> [`IRadioLabel`](../../packages/ui-core/src/components/Radio/Radio.types.ts#L19) both do
> `interface X extends React.ComponentProps<typeof Label>`. Once that resolves to a union, both fail
> with **TS2312** — an interface cannot extend a union. Fix: export `ILabelNative` and have both
> extend it, which is also semantically correct since both are native per-item labels. `vitest` will
> not catch this; only `pnpm build`'s `check-types` will. `ILabel` is not in `src/index.ts`, so
> there is no public type break. `SelectProps = ISingleSelectProps | IMultiSelectProps`
> ([`Select.types.ts:83`](../../packages/ui-forms/src/components/Selects/Select.types.ts#L83)) is the
> precedent for the union shape.

### `FieldMessage` — four states, four icons

Standalone, ~20 lines: `<p data-slot='field-message'>` = `Icon` (`size='sm'`) + text. No border, no
background.

| Variant | Icon | Colour |
| ------- | ---- | ------ |
| `error` | `x-circle` | `text-red-600 dark:text-red-400` |
| `warning` | `alert-triangle` | `text-amber-600 dark:text-amber-400` |
| `success` | `check-circle` | `text-green-600 dark:text-green-400` |
| `info` (default) | `info` | `text-muted-foreground` — see D3 |

All four icon names already exist in `ICON_NAMES`. Absent from `src/index.ts` (AC12).

### Which controls `Field` supports, and how each is wired

This is the matrix the plan was missing.

| Control | Label mode | Where `{...control}` lands | Work needed |
| ------- | ---------- | -------------------------- | ----------- |
| `Input` | native | the `<input>` | none — spreads props, has `aria-invalid:*` classes |
| `Textarea` | native | the `<textarea>` | none |
| `Checkbox` (boolean) | native | Radix `Root` | none |
| `Switch` (boolean) | native | Radix `Root` | none — composition story only |
| `Radio` (standalone) | native | Radix `Item` | none |
| **`CheckboxGroup`** | **non-native** | the options container, + `role='group'` | **passthrough (Phase 4)** |
| **`RadioGroup`** | **non-native** | `RadioGroupPrimitive.Root`, keeping `role='radiogroup'` | **passthrough (Phase 4)** |
| **`Slider`** | **non-native** | **`SliderThumb`**, not `SliderRoot` | none — but the story must target the thumb |
| **`Select`** (single + multiple) | native | the trigger `<button>` | **passthrough + `aria-label` fix (Phase 4)** |
| **`SingleDatePicker`** | native | the trigger `<button>` | **passthrough (Phase 4)** |
| **`DateRangePicker`** | native | the trigger `<button>` | **passthrough (Phase 4)** |

**`Calendar`, `DebouncableInput` and `Search` are deliberately absent.** `Calendar` is a standalone
date-display component — the thing a user fills in is the date picker, and `Calendar` is what that
picker renders inside its popover. `DebouncableInput` and `Search` are search/filter affordances,
not form fields. None of the three gets `Field` wiring or a composition story. `Calendar` still
needs the Goal 3 story and `play()` coverage below, because 04 moved it; `DebouncableInput` (4
`play()`) and `Search` (2) already clear the bar and are untouched.

`<button>` is a labelable element, so native `htmlFor` genuinely associates with the `Select` and
date-picker triggers — **once** [`SelectTrigger.tsx:31`](../../packages/ui-forms/src/components/Selects/components/SelectTrigger.tsx#L31)
stops hardcoding `aria-label='Select Trigger'` after `{...props}`. `aria-label` beats
`<label for>`, so today a `Field`-wrapped `Select` would announce "Select Trigger", not "Country".

### `ui-forms` — two exports, one built on the other

`Field` itself lives in `ui-core` and is usable with plain `useState`, or with no form library at
all. `ui-forms` never gets a copy of it — it adds the TanStack layer on top.

**`FormField`** is what you reach for in a real form. You name the field; its value and metadata are
already resolved, because `FormField` renders TanStack's own `form.Field` internally and that is
where the reactivity comes from. **It forwards the data wiring too** — `value`, `onChange`, `onBlur`
and `name`, on top of the accessibility bag:

```tsx
// Native inputs need nothing beyond the spread.
<FormField form={form} name='email' label='Email address' required>
	{(control) => <Input {...control} type='email' />}
</FormField>

// Controls with their own change vocabulary rename two props. Still one line.
<FormField form={form} name='terms' label='Accept the terms' required>
	{(control) => <Checkbox {...control} checked={control.value} onCheckedChange={control.onChange} />}
</FormField>

<FormField form={form} name='country' label='Country'>
	{(control) => <Select {...control} type='single' options={countries} onValueChange={control.onChange} />}
</FormField>
```

`onChange` is normalised: it accepts either a DOM change event or a raw value, so the same handler
serves `Input`'s `e.target.value` and `Checkbox`'s boolean. The full field API is still available as
a second argument (`(control, field) => …`) for anything that needs `handleBlur` timing or
`meta` directly.

What it deliberately does **not** do is map a control *name* to a component —
`<FormField control='input' />` with no children. That is the pre-wired registry
[`spec.md:213-223`](./spec.md#L213) rejected, and it means every
control added later needs a new entry. As written, `FormField` works with any control, including
ones that don't exist yet.

**Array fields need no special handling.** TanStack array fields are just more fields:
`people[0].name` reads through `toFieldProps` identically, and a parent array field's own errors
("add at least one") are that field's errors, so first-error-only still applies at every level.
Documented in `FormField.mdx`; no story in this deliverable.

**`toFieldProps`** is the translation underneath, exported separately for anyone driving
`form.Field` or `useField` directly. It reads what TanStack already hands you and returns what
`Field` already accepts. Nothing is wrapped, nothing is re-implemented.

```ts
// ui-forms/src/adapters/toFieldProps.types.ts — declares only what it reads, so a plain
// object fixture satisfies it and AnyFieldApi is structurally assignable.
export interface ITanStackFieldLike {
	state: {
		meta: {
			isTouched: boolean;
			isBlurred: boolean;
			errors: ReadonlyArray<unknown>;
			errorMap: { onSubmit?: unknown; onServer?: unknown };
		};
	};
}

toFieldProps(field, { showErrorsWhen: 'touched' | 'blurred' | 'always' })  // → { error: string | undefined }
```

Named `toFieldProps` rather than `getFieldProps`: AC4 requires an inspector to see at a glance that
it returns `Field`'s props, not the control's, and `to…` reads as a translation where `get…` reads
as an accessor.

**Timing defaults to `isTouched`, and that is provable rather than preferred.** From the installed
1.24.4 source: `FormApi.setFieldValue` sets `isTouched` on the first change; `FieldApi.handleBlur`
sets both `isTouched` and `isBlurred`; and **`FormApi.handleSubmit` walks every mounted field
setting `isTouched` but never `isBlurred`**. So a bare `isBlurred` gate silently hides submit-time
errors on every field the user never visited — the single most important case a form has. That is
why `showErrorsWhen: 'blurred'` is implemented as
`isBlurred || errorMap.onSubmit !== undefined || errorMap.onServer !== undefined`, never bare
`isBlurred`.

**Error normalisation: first renderable error only, never joined.** `meta.errors` element type
depends on the validator — a `string` for plain functions, a `{ message: string }` Standard Schema
issue for zod, `unknown` otherwise. Take the first entry that normalises to a non-empty string; if
none does, return `undefined` rather than leaving the field permanently invalid-but-blank. Joining
three zod issues into one line produces something nobody reads in a live region.

---

## Tests, mapped to the spec's Acceptance Criteria

The AC list is the baseline. Every row below is a real assertion, not a story that merely renders.

| AC | Assertion | Where |
| -- | --------- | ----- |
| 1 | No error/description → only label + control render; the message region is present but empty | `Field.stories.tsx` |
| 2, 9 | Error → text visible; `aria-invalid='true'`; `getAttribute('aria-describedby')` equals the message element's `id` (compared by attribute, never by selector) | `Field.stories.tsx` |
| 3 | Live `useForm` + `FormField name='email'`: type invalid, blur, error appears and associates; correct it, error clears — no hand-translation at the call site | `FormField.stories.tsx` |
| 3 (2nd) | Submit an untouched invalid form → the error still appears (the `isBlurred` trap) | `FormField.stories.tsx` |
| 3 (3rd) | The same form written with `form.Field` + `toFieldProps` by hand, and with `useField`, behaves identically — proving `FormField` is convenience, not a fork | `toFieldProps.stories.tsx` |
| 4 | grep `toFieldProps.ts` for `Field`/`Input`/`@repo/ui-core` → no matches. `FormField.tsx` is not the adapter and may reference `Field` (D8) | Phase 8 check |
| 5, 6 | Every component in scope has ≥1 standalone, ≥1 composition, ≥1 common-pattern story and ≥1 `play()` | Phase 7 inventory |
| 7 | `ContactForm` renders a `Textarea`, and no raw `<textarea>` remains in the file | `Input.stories.tsx` |
| 8 | `getByRole('group', { name: 'Notify me about' })` and `getByRole('radiogroup', { name: 'Billing plan' })` both resolve; each option still resolves by its own per-item label; the radio group's role is still `radiogroup` (D2) | `CheckboxGroup`/`RadioGroup` stories |
| 10 | Required → the indicator is text/symbol not colour alone, and the control is `toBeRequired()` (or carries `aria-required` in non-native mode) | `Field.stories.tsx` |
| 11 | All four `FieldMessage` states render, each with a distinct icon; no two states share one | `FieldMessage.stories.tsx` |
| 12 | grep the **built** `dist/index.d.ts` → `FieldMessage` absent | Phase 8 check |
| — | The live region exists in the DOM **before** any error appears (D7) | `Field.stories.tsx` |
| — | Native `Label` click moves focus to its `htmlFor` target; `nativeLabel={false}` does not | `Label.stories.tsx` |
| — | `emphasis={false}` preserves `font-medium` on `CheckboxLabel`/`RadioLabel` (D4 regression guard) | `Label.stories.tsx` |
| — | A `Field`-wrapped `Select`'s accessible name is the label, not "Select Trigger" | `Select.stories.tsx` |
| — | `Slider` keyboard: Arrow/Home/End on the thumb | `Slider.stories.tsx` |
| — | `Calendar`: click a day, assert `aria-selected` | `Calendar.stories.tsx` |
| — | Tabbing into a **part-selected** `CheckboxGroup` lands on the first checked item (04's recorded gap — unit-tested only today) | `CheckboxGroup.stories.tsx` |
| — | `Radio` disabled treatment now that `peer` matches (Phase 5) | `Radio.stories.tsx` |
| — | Adapter unit cases: untouched-with-errors, string error, `{message}` error, multiple errors, `['', ' ', 'real']`, `[{}]`/`[null]`/`[42]`, each `showErrorsWhen` mode, and a compile-time assertion that `AnyFieldApi` is assignable to `ITanStackFieldLike` | `toFieldProps.spec.ts` |

`Field.stories.tsx` sets `parameters: { a11y: { test: 'error' } }` on its **meta** —
[`Button.stories.tsx:46-51`](../../packages/ui-core/src/components/Button/Button.stories.tsx#L46) is the
precedent, and a component whose entire purpose is correct labelling should be the second file in
the repo that fails on an axe violation.

**`FieldMessage`'s `play()` is assertion-only, not an interaction.** AC6 asks for "primary user
interaction"; `FieldMessage` is a static line of text and has none. Substituting an
icon-and-colour assertion is the honest reading of AC11 — stated openly rather than dressed up as
an interaction test.

---

## Storybook inventory

Measured, not estimated.

| Component | Today | Gap |
| --------- | ----- | --- |
| `Label` | **0 stories, 0 play, no `.mdx`** | whole file, both artefacts — extending it puts it in scope |
| `Field` / `FieldMessage` | — | everything: ~13 stories, 4 `play()` |
| `Input` | 14 / **0 play** | ~21 hand-rolled wrappers → `Field`; `ContactForm` fix; 2 `play()`; **every `docs.source.code` override rewritten** or the docs show code that no longer matches the canvas |
| `Textarea` | 12 / **0 play** | ~18 wrappers → `Field`; 2 `play()` |
| `Checkbox` | 9 / 1 | the existing `play()` tests prop passthrough, not toggling; +composition, +error, +1 `play()` |
| `CheckboxGroup` | 19 / 4 | `Field` composition; part-selected tab-stop gap |
| `Radio` | 9 / 1 | **imports `@radix-ui/react-radio-group` directly** ([`Radio.stories.tsx:2`](../../packages/ui-core/src/components/Radio/Radio.stories.tsx#L2)) — rewrite onto `RadioGroup` |
| `RadioGroup` | 12 / 5 | `Field` composition |
| `Slider` | 9 / **0 play** | fix the broken `htmlFor`; `Field` + `nativeLabel={false}` onto `SliderThumb`; keyboard `play()` |
| `Calendar` | 9 / **0 play** | **CSF1 bare-function exports — `play` cannot attach.** Convert all 9 to CSF3 `StoryObj`, then cross-check every `<Canvas of>` in `Calendar.mdx` **both ways**. No `Field` composition — not a form control |
| `Switch` | 8 / **0 play** | `Field` composition story only (the boolean control; not a 04 component, no full retrofit) |
| `Select`, `SingleDatePicker`, `DateRangePicker` | 19+10+8 | one `Field`-composition story each with an accessible-name `play()` |
| `FormField` / `toFieldProps` | — | ~5 stories, 3 `play()`, plus `FormField.mdx` as the primary form-authoring guide |

Baseline is **326 passing**; expect roughly **380-400** after.

`DebouncableInput` (5 / 4 `play()`) and `Search` (4 / 2) are excluded — neither is a form field, and
both already clear the `play()` bar. `ui-overlays` stories are excluded even though `Sheet` (19
hits) and `HoverCard` (14) hand-roll the same wrappers.

**The two guides split by audience, and neither is an API dump.**

- **`Field.mdx` (`ui-core`)** — using `Field` with no form library: plain `useState`, one worked
  example per control family (`Input`, `Textarea`, boolean via `Checkbox`/`Switch`,
  `CheckboxGroup`/`RadioGroup`, `Slider` and why the bag goes on the thumb, `Select`, date pickers),
  the `nativeLabel` switch and when to flip it, and the "a control must not render its own error
  alongside `Field`'s" rule from the spec's Edge Cases.
- **`FormField.mdx` (`ui-forms`)** — the same control families driven by TanStack: naming a field,
  the `(control, field)` contract, validation timing, and `toFieldProps` as the escape hatch for
  driving `form.Field`/`useField` yourself.

---

## Tasks

### Phase 0 — Baseline and spec amendments

- [x] 0.1 `pnpm install` — **there is no `node_modules` at any level in this worktree**, verified.
      Every gate currently lies. (Depends on: —)
- [x] 0.2 `pnpm turbo run build --force`. `--force` is not optional: Turbo's cache is shared across
      worktrees and an untouched one reports `11/11 FULL TURBO` having compiled nothing in ~2s. A
      real build is ~1m36s. (0.1)
- [x] 0.3 `rm -rf apps/storybook/node_modules/.cache apps/storybook/node_modules/.vite`. (0.2)
- [x] 0.4 `cd apps/storybook && npx vitest run > baseline.txt 2>&1` — expect **326 passed / 0
      failed**. Redirect to a file; never pipe through `tail`, and `--reporter=basic` was removed in
      Vitest 4. (0.3)
- [x] 0.5 Lint baseline via `npx eslint --no-cache` **inside each package** (turbo's output
      scrolls). Expect 0 errors / 40 warnings. (0.1)
- [x] 0.6 Confirm 04's two inherited items: `CheckboxGroup.stories.tsx:11` already has `component:`
      (that one is closed); `Radio.stories.tsx:2` still imports Radix directly (open). (0.4)
- [x] 0.7 Amend `spec.md`: record D1 (Field wraps groups), D2 (`radiogroup` role), D3 (`info` is
      invented) and D8 (`FormField` exists, but no control registry) in Decisions, and update AC8 to
      describe the outcome rather than prescribe `role="group"` for both. (—)
- [x] 0.8 Fix the stale Design Reference in `spec.md` (`ui-forms/…/Input.stories.tsx#L427-434` →
      `ui-core/…/Input.stories.tsx#L425-432`) and add the `Slider.stories.tsx:30` broken-`htmlFor`
      case alongside it. (0.7)

Estimated: 0.5 day.

### Phase 1 — `Label`

- [x] 1.1 `Label.variants.ts` — `labelVariants`, base = today's exact class string from
      `Label.tsx:9-12` minus `font-medium`, `emphasis: { true: 'font-semibold', false:
      'font-medium' }`, default `true` (D4). (Depends on: 0.4)
- [x] 1.2 `Label.types.ts` — `ILabelNative` (`nativeLabel?: true`) | `ILabelNonNative`
      (`nativeLabel: false`, `htmlFor?: never`), `ILabel` as the union; `emphasis?`, `required?`
      on both. (1.1)
- [x] 1.3 Repoint `Checkbox.types.ts:23` and `Radio.types.ts:19` from
      `React.ComponentProps<typeof Label>` to `ILabelNative`. **Without this `check-types` fails
      with TS2312 and `vitest` will not tell you.** (1.2)
- [x] 1.4 `Label.tsx` — `nativeLabel = true`, `emphasis = true`, `required = false` explicit in the
      destructure; `nativeLabel === false` renders a plain `<span>`, never `LabelPrimitive.Root`;
      `required` renders the `aria-hidden` asterisk + `sr-only` `(required)`. (1.2)
- [x] 1.5 Pass `emphasis={false}` from `CheckboxLabel` and `RadioLabel` to preserve `font-medium`.
      (1.4)
- [x] 1.6 Export `labelVariants`, `ILabel`, `ILabelNative`, `ILabelNonNative` from
      `packages/ui-core/src/index.ts` under the existing Variants block. (1.4)
- [x] 1.7 `Label.stories.tsx` — **the component has none today.** Meta needs `component: Label` or
      `<Controls />` renders empty. Stories: native, native + `htmlFor` focus, `nativeLabel={false}`,
      both emphasis weights, `required`. `play()` per the test table. (1.5)
- [x] 1.8 `Label.mdx` — must state that `nativeLabel={false}` outside a group needs no
      `aria-labelledby` wiring (spec Edge Cases). (1.7)
- [x] 1.9 `pnpm turbo run build --filter=@repo/ui-core && rm -rf apps/storybook/node_modules/.cache
      apps/storybook/node_modules/.vite`, run the suite. Checkbox/Radio label rendering must be
      unchanged. (1.8)

Estimated: 1 day.

### Phase 2 — `FieldMessage`

- [x] 2.1 `FieldMessage.variants.ts` with the four colours, and a comment recording D3 — that `info`
      has no `Alert` counterpart and comes from `AlertDescription`. (Depends on: 0.4)
- [x] 2.2 `FieldMessage.tsx` + `.types.ts` + `index.ts`. `data-slot='field-message'`,
      `variant = 'info'` explicit in the destructure. (2.1)
- [x] 2.3 `FieldMessage.stories.tsx` + `.mdx`. `Icon` resolves over the Iconify CDN so first paint
      is the placeholder `<svg>` — query `getByRole('img', { hidden: true })`, never wait on a
      glyph. (2.2)
- [x] 2.4 Verify `FieldMessage` is absent from `src/index.ts` **and from the built
      `dist/index.d.ts`** (AC12). Sanity-check the grep itself before believing it — 04 recorded a
      broken one-liner that reported 14 false negatives. (2.3)

Estimated: 0.5 day.

### Phase 3 — `Field`

- [x] 3.1 `Field.types.ts` — `IField` and the exported `IFieldControlProps`, every prop JSDoc'd with
      `@default`. (Depends on: 1.6, 2.2)
- [x] 3.2 `Field.tsx` — `useId`; the persistent `aria-live='polite'` region with `not-empty:mt-2`
      and **no `display:none`** (D7); `aria-describedby` unconditional; `nativeLabel` switching both
      the `Label` mode and the shape of the control bag. (3.1)
- [x] 3.3 Export `Field`, `IField`, `IFieldControlProps` from `packages/ui-core/src/index.ts`. (3.2)
- [x] 3.4 `Field.stories.tsx` with `a11y: { test: 'error' }` on the meta, and the `play()`s from the
      test table. Add a comment explaining the `«r0»` id trap next to the `aria-describedby`
      assertion. (3.3)
- [x] 3.5 `Field.mdx` as the usage guide described above — one worked example per control family.
      (3.4)
- [x] 3.6 Rebuild `ui-core`, clear caches, run the suite. (3.5)

Estimated: 1.5 days.

### Phase 4 — Accessibility passthrough for the controls that can't take it today

Per D1, groups are composed inside `Field`, so they need to accept the control bag rather than grow
a `label` prop.

- [ ] 4.1 `CheckboxGroup`: accept `id`, `aria-labelledby`, `aria-describedby`, `aria-invalid`,
      `aria-required` and put them on the options container together with `role='group'`.
      (Depends on: 3.6)
- [ ] 4.2 `RadioGroup`: same passthrough onto `RadioGroupPrimitive.Root`. **Do not set
      `role='group'`** — Radix already emits `role='radiogroup'` (D2). (4.1)
- [ ] 4.3 Verify `Slider` accepts the bag — it must reach `SliderThumb`, which already spreads
      `...props`; widen only if it doesn't. `Calendar` is **not** in this list: it is not a form
      control. (3.6)
- [ ] 4.4 `ISelectCommonProps` gains `id?`, `required?`, `aria-describedby?`, `aria-invalid?`;
      thread through `Select.tsx` → `SelectTrigger` → `Button`. (3.6)
- [ ] 4.5 **Fix `SelectTrigger`'s hardcoded `aria-label='Select Trigger'`** — make it a fallback a
      caller-supplied `aria-label`/`aria-labelledby` overrides. Expect
      `Selects/__fixtures__/interactions.ts` and some of `Select`'s 18 `play()` tests to need
      updating, since they query the trigger by that label. (4.4)
- [ ] 4.6 `IDatePicker` gains the same props; thread through `SingleDatePicker` and
      `RangeDatePicker` to their `Button` triggers. (4.4)
- [ ] 4.7 Rebuild `ui-core` **and** `ui-forms`, clear caches, run the suite. (4.6)

Estimated: 1 day.

### Phase 5 — The two defects 04 handed to 05

- [ ] 5.1 Add `peer` to `Radio`'s class string
      ([`Radio.tsx:11`](../../packages/ui-core/src/components/Radio/components/Radio.tsx#L11)) so
      `RadioLabel`'s `peer-disabled:*` rules match. Changes rendered output — cover with a `play()`.
      (Depends on: 4.7)
- [ ] 5.2 Wire `Textarea.tsx` onto the `ITextarea` it already exports and delete the local
      `TextareaProps`. `pnpm lint` should drop by one warning. (—)

Estimated: 0.5 day.

### Phase 6 — The adapter

- [ ] 6.1 `ui-forms/src/adapters/toFieldProps.types.ts` — `ITanStackFieldLike` declaring only what it
      reads, plus the options and result types. **No reference to `Field`, `IField` or any
      `ui-core` type** (AC4). (Depends on: 5.2)
- [ ] 6.2 `toFieldProps.ts` — `normalise` helper, first-renderable-error policy,
      `showErrorsWhen = 'touched'` default, `'blurred'` ORed with `errorMap.onSubmit`/`onServer`.
      Write this and 6.3 before the story: most likely to be wrong, cheapest to test. (6.1)
- [ ] 6.3 `toFieldProps.spec.ts` — `ui-forms`' first `.spec.ts` (node preset, no DOM), the cases from
      the test table, plus the compile-time `AnyFieldApi` assignability assertion. That last one is
      caught only by `check-types`, never by `vitest run`. (6.2)
- [ ] 6.4 `ui-forms/src/components/FormField/FormField.{tsx,types.ts,index.ts}` — renders TanStack's
      `form.Field` internally and composes `ui-core`'s `Field` via `toFieldProps`. Its control bag is
      `IFormFieldControlProps extends IFieldControlProps` adding `name`, `value`, `onBlur` and a
      **normalised `onChange`** that accepts either a DOM change event or a raw value; children
      receive `(control, field)`. **No control registry** (D8). Generic over the form's data type so
      `name` is autocompleted and typo-checked, matching `form.Field`'s own `DeepKeys` typing. (6.2)
- [ ] 6.5 Export `FormField`, `toFieldProps` and their types from `packages/ui-forms/src/index.ts`.
      (6.3, 6.4)
- [ ] 6.6 `FormField.stories.tsx` — a live `useForm` form with the two `play()`s from the test table.
      **Must live in `ui-forms`**; `ui-core` never gains a `@tanstack/react-form` dependency. (6.5)
- [ ] 6.7 `toFieldProps.stories.tsx` — the same form written by hand with `form.Field`, and again
      with `useField`, asserting identical behaviour (test table, AC3 3rd). (6.5)
- [ ] 6.8 `FormField.mdx` — the primary usage guide: naming a field, the `(control, field)` contract,
      one worked example per control family, why `value`/`onChange` stay yours, and the timing and
      error-normalisation policies. Covers `toFieldProps` as the escape hatch, and why it is a plain
      function rather than a hook (D6). (6.7)
- [ ] 6.9 Rebuild `ui-forms`, clear caches, run the suite. (6.8)

Estimated: 1.5 days.

### Phase 7 — Storybook coverage sweep

- [ ] 7.1 `Input.stories.tsx`: wrappers → `Field`; `ContactForm`'s raw `<textarea>` → `Textarea`
      (AC7); rewrite every `docs.source.code` override; 2 `play()`. (Depends on: 3.6)
- [ ] 7.2 `Textarea.stories.tsx`: same. (3.6)
- [ ] 7.3 `Checkbox` + `Switch`: `Field` composition and error stories, real toggle `play()`. (3.6)
- [ ] 7.4 `Radio.stories.tsx`: rewrite off the direct Radix import onto `RadioGroup`; closes 04's
      open item. (4.7)
- [ ] 7.5 `CheckboxGroup` + `RadioGroup`: `Field`-composition stories with the AC8 accessible-name
      `play()`s, plus 04's part-selected tab-stop gap. (4.7)
- [ ] 7.6 `Slider.stories.tsx`: fix the broken `htmlFor` by composing `Field` with
      `nativeLabel={false}` and spreading the bag onto `SliderThumb`; keyboard `play()`. (3.6)
- [ ] 7.7 `Calendar.stories.tsx`: convert all 9 exports from CSF1 bare functions to CSF3 `StoryObj`
      — `play` cannot attach otherwise — then add one. Cross-check every `<Canvas of>` in
      `Calendar.mdx` in **both** directions. (3.6)
- [ ] 7.8 `Select`, `SingleDatePicker`, `RangeDatePicker`: one `Field`-composition story each with an
      accessible-name `play()` proving 4.5. (4.7)
- [ ] 7.9 MDX refresh across every touched component — usage examples especially, since they
      currently show hand-rolled wrappers and must stay copy-pasteable. (7.1-7.8)
- [ ] 7.10 Rebuild, clear caches, run the suite. (7.9)

Estimated: 2.5 days.

### Phase 8 — Verify and ship

- [ ] 8.1 Full gates: `pnpm build` 11/11, per-package `npx eslint --no-cache` (one fewer warning than
      baseline), `pnpm test` in both packages, rebuild + cache-clear + Storybook suite. Compare
      against Phase 0. (Depends on: 7.10, 6.9)
- [ ] 8.2 Walk every AC individually, including the two greps (AC4, AC12). (8.1)
- [ ] 8.3 Open the docs pages on the dev server (`preview_start` name `storybook`, port 6006) and
      confirm every new `<Canvas of>` resolves and every `<Controls />` populates — the failure mode
      is a silent "No Preview" panel when a meta lacks `component:`. (8.1)
- [ ] 8.4 Accessibility-tree spot check in the browser: group accessible names, `aria-describedby`
      resolution, required announcement, and an on-blur error announced without re-focusing. AC8 says
      "inspected with an accessibility tree tool" — do it, don't infer it from the DOM. (8.3)
- [ ] 8.5 `docs/README.md` row 05 → `✅ done`, Docs link repointed to `plan.md`; rewrite `plan.md` as
      the as-built record; raise the follow-ups. (8.4)

Estimated: 0.5 day.

**Total: ~9.5 days.** One commit per phase:
`feat(ui-core): add nativeLabel, emphasis and required to Label` ·
`feat(ui-core): add FieldMessage` · `feat(ui-core): add Field` ·
`feat(ui-core,ui-forms): accept accessibility props on group and trigger controls` ·
`fix(ui-core): restore RadioLabel peer rules and wire up ITextarea` ·
`feat(ui-forms): add FormField and the TanStack state-to-props adapter` ·
`docs(ui-core,ui-forms): Field-based stories and play() coverage` · `docs: as-built plan for 05`.

---

## Verification

**Order matters.** `ui-core` → `ui-forms` → Storybook resolve through built `dist/`, not source, and
`check-types` depends on `^check-types` rather than `^build`. After every `ui-core` edit:

```bash
pnpm turbo run build --filter=@repo/ui-core && rm -rf apps/storybook/node_modules/.cache apps/storybook/node_modules/.vite
```

| Gate | Command | Expected |
| ---- | ------- | -------- |
| Build | `pnpm build` | 11/11 |
| Lint | `npx eslint --no-cache` per package | 0 errors; **two fewer warnings** than baseline — 38 (Label in 1.2, ITextarea in 5.2) |
| Hook/util tests | `pnpm test` | `ui-core` 60 unchanged; `ui-forms` gains `toFieldProps.spec.ts` |
| Component tests | `cd apps/storybook && npx vitest run` | ~380-400, 0 failures |

`vitest` does **not** typecheck — a spec file passes green while containing a type error. Only
`pnpm build` catches it. Run both. Other traps carried from 04: a tapped
`userEvent.keyboard('{ArrowDown}')` fires before Radix's deferred focus lands, so any "focus moved
*and* something followed" assertion needs the key **held** (`{ArrowDown>}` … `{/ArrowDown}`); and
`noUncheckedIndexedAccess` makes `getAllByRole(...)[n]` an `HTMLElement | undefined`, which
`expect()` tolerates and `userEvent.click()` rejects.

---

## Risks

| Risk | Impact | Likelihood | Mitigation |
| ---- | ------ | ---------- | ---------- |
| Gates run against the uninstalled worktree | Every number meaningless | **Certain if skipped** | Phase 0.1-0.4; a fast green build next to a red suite is the tell |
| `ICheckboxLabel`/`IRadioLabel` break on the `Label` union (TS2312) | Build red, `vitest` silent | **Certain** | Task 1.3, same commit as 1.2 |
| The live region ends up `display: none` | The one a11y requirement the design exists for fails, silently | High if the first shape ships | `not-empty:mt-2`, never `empty:hidden`; a `play()` asserts the region pre-exists its content; 8.4 checks it live |
| React 19's `«r0»` ids break selector-based assertions | Opaque `SyntaxError` | Medium — the obvious way to write it is the broken one | Compare `getAttribute` against `id`; comment in `Field.stories.tsx` |
| `emphasis` defaulting to bold shifts every existing label | Unintended visual churn | Medium | 1.5 opts the two per-item labels out; 1.9 confirms unchanged rendering before anything depends on it |
| Fixing `SelectTrigger`'s `aria-label` breaks its 18 `play()` tests | Suite red | **High** | Explicit in 4.5; expect `__fixtures__/interactions.ts` to change alongside |
| `Calendar`'s CSF1→CSF3 conversion desyncs `Calendar.mdx` | Docs page dies with `of={undefined}` | Medium | 7.7 requires a two-way cross-check; 8.3 confirms in the browser |
| `Input`/`Textarea` rewrites leave `docs.source.code` showing the old code | The exact drift class this deliverable exists to stop | Medium | Explicit in 7.1/7.2; 8.3 reads every page |
| Stale `dist`/Vite cache masks a change | False greens **and** false reds | High across 8 phases | The rebuild + cache-clear is a numbered task at the end of every phase |
| Fixture-based adapter spec passes while the real `FieldApi` differs | False green | Medium | 6.6 is a live `useForm` story; the fixture spec alone is not sufficient evidence |
| `FormField`'s generics don't thread through, so `name` loses autocomplete or `field` types as `any` | The main ergonomic reason it exists evaporates | Medium — `form.Field`'s `DeepKeys` generic chain is long | Type it against `form.Field`'s own signature rather than re-deriving; 6.6's story is written with a typed schema so a widened `any` shows up as a lost error at build |
| `a11y: { test: 'error' }` on `Field` fails on an inherited violation | New strict gate blocks the deliverable | Low-medium | Turned on at 3.4, not at 8.1, so it surfaces early |

---

## Explicitly out of scope

- The JSON/schema-driven renderer (spec Non-Goal — its own discovery once this ships).
- `Alert`'s redundant `destructive`/`error` variants. (An `info` variant *was* added — see D3.)
- `play()` retrofits for components predating 04 — `Alert`, `Avatar`, `Tabs`, `Tooltip`, `Skeleton`
  all have zero. `Switch` gets a composition story only.
- `Search` and `DebouncableInput` — search/filter affordances rather than form fields, and both
  already clear the `play()` bar.
- `Calendar` as a `Field` control — it is what the date pickers render inside, not a field itself.
- Array-field stories. The adapter needs no change for them (see Architecture); documenting that is
  enough for this deliverable.
- The hand-rolled wrappers in `ui-overlays` stories (`Sheet` 19, `HoverCard` 14).
- `ui-forms`' unused `react-use`/`zod` dependencies and the dead
  `packages/ui-forms/src/components/Form/index.ts` — both offered and declined.
- The four-package split and RTL, both pinned in [`docs/README.md`](../README.md).
