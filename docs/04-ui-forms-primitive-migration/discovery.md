# Discovery: ui-forms architecture

## Problem Statement

`ui-forms` was meant to be where form UI comes from. In practice it is a second, parallel set of
leaf UI primitives — `Input`, `Textarea`, `Checkbox`, `Radio`, the `Slider` parts — that duplicate
what `ui-core` already does for every other primitive (`Button`, `Switch`, `Tabs`, `Label`,
`DebouncableInput`), styled by hand rather than composed. The one piece that should standardise form
_construction_ — `useForm` — is a bare one-line re-export of `@tanstack/react-form` with no
opinion of its own, so nothing in the package actually standardises how a label, a control and an
error message go together. Every consumer, including the package's own Storybook stories, hand-rolls
that pairing from scratch, and at least one story drifts from the component it's meant to be
documenting because of it.

This investigation covers the whole `ui-forms`/`ui-core` boundary and feeds two follow-on
deliverables: [`04-ui-forms-primitive-migration`](./spec.md) (this folder) and
[`05-ui-forms-field-pattern`](../05-ui-forms-field-pattern/spec.md).

## Context

### Users

Consumers of `@repo/ui-forms` — currently the app in this repo, and any future app in the monorepo
that needs form controls. They import either individual controls (`Input`, `Checkbox`, `Select`) or
`useForm` and assemble a form by hand in JSX today; there is no schema/JSON-driven path.

### Current package boundary (as shipped)

`ui-forms` exports, per [`packages/ui-forms/src/index.ts`](../../packages/ui-forms/src/index.ts):

| Export | What it actually is | Depends on |
| --- | --- | --- |
| `useForm` | Re-export of `@tanstack/react-form`'s `useForm`, [`Form/form.ts:1`](../../packages/ui-forms/src/components/Form/form.ts) | `@tanstack/react-form` only |
| `Input` | Styled native `<input>`, no form-specific behaviour | `@repo/tailwind-config` only |
| `Textarea` | Styled native `<textarea>`, no form-specific behaviour | `@repo/tailwind-config` only |
| `Checkbox`, `CheckboxLabel` | Styled `@radix-ui/react-checkbox` wrapper + label | `@repo/ui-core` (`Icon`, `Label`) |
| `Radio`, `RadioLabel` | Styled `@radix-ui/react-radio-group` **item** wrapper + label — no group root exported | `@repo/ui-core` (`Icon`) |
| `SliderRoot/Track/Range/Thumb` | Styled `@radix-ui/react-slider` compound parts, no assembled `Slider` | `@repo/tailwind-config` only |
| `Calendar`, `CalendarDayButton` | Styled `react-day-picker` adapter | `@repo/tailwind-config` |
| `SingleDatePicker`, `DateRangePicker` | Composition: `Button`/`Icon` (ui-core) + `Popover*` (ui-overlays) + `Calendar` | `ui-core`, `ui-overlays` |
| `Select`, `SingleSelect`, `MultiSelect` | Composition: own `SelectProvider` context + `CommandInterface` (ui-command) + `PopoverContent` (ui-overlays) | `ui-core`, `ui-overlays`, `ui-command` |
| `CheckboxGroup` (not re-exported from the package root — imported from its own path) | Composition: `Checkbox` + `CheckboxLabel` + array-selection logic | `Checkbox`/`CheckboxLabel` (ui-forms), `@repo/core` (`Option` type) |

Two clearly different kinds of thing are in this one package: **leaf primitives with zero
form-specific logic** (`Input`, `Textarea`, `Checkbox`, `Radio`, `Slider` parts), and **genuine
compositions** (`CheckboxGroup`, `SingleDatePicker`/`DateRangePicker`, `Select`). The second group is
exactly the shape the redesign is asking for; the first group is the duplication problem.

### `ui-core` already owns this category for everything else

`ui-core` is the styled-Radix-primitive package for the rest of the library:
[`Button`](../../packages/ui-core/src/components/Button/Button.tsx),
[`Switch`](../../packages/ui-core/src/components/Switch/Switch.tsx),
[`Tabs`](../../packages/ui-core/src/components/Tabs/Tabs.tsx),
[`Accordion`](../../packages/ui-core/src/components/Accordion/Accordion.tsx),
[`Label`](../../packages/ui-core/src/components/Label/Label.tsx), and — critically —
[`DebouncableInput`](../../packages/ui-core/src/components/DebouncableInput/DebouncableInput.tsx),
which is a styled native `<input>` with a debounce hook layered on. `ui-forms`'s `Input`
([`Input.tsx:10-24`](../../packages/ui-forms/src/components/Input/Input.tsx)) is the same element
with near-identical Tailwind classes, styled independently, in a different package. There are now
two "the input" primitives in the library, and which one a consumer reaches for depends on which
package they happen to think of first.

### The package's own documentation doesn't compose its own components

[`Input.stories.tsx:427-434`](../../packages/ui-forms/src/components/Input/Input.stories.tsx#L427-L434)
(the `ContactForm` story) hand-writes a raw `<textarea>` with its own copy of the border/ring/disabled
classes, inside the same package that already exports a `Textarea` component
([`Textarea.tsx`](../../packages/ui-forms/src/components/Textarea/Textarea.tsx)) that does the same
job. Every other story in the file (`Default`, `Email`, `SignUpForm`, `ContactForm`, …) hand-assembles
`<Label htmlFor>` + `<Input id>` inside a manually-written `<div className="grid gap-3">` /
`<div className="space-y-2">` wrapper — there is no `Field`-shaped component anywhere in the codebase
to reach for instead. A grep for `Field` across `packages/*/src` finds nothing but incidental matches
in unrelated fixture/story files — the concept does not exist yet.

### `Radio` cannot be used without importing Radix directly

`Radio` is a styled `RadioGroupPrimitive.Item`
([`Radio.tsx:8`](../../packages/ui-forms/src/components/Radio/components/Radio.tsx#L8)) — it only
works inside a `RadioGroupPrimitive.Root`. `ui-forms` never exports that root or a composed
`RadioGroup`. A consumer who wants a working radio group has to `import * as RadioGroupPrimitive from
'@radix-ui/react-radio-group'` directly, reaching straight past the package. `CheckboxGroup`
([`CheckboxGroup.tsx`](../../packages/ui-forms/src/components/CheckboxGroup/CheckboxGroup.tsx)) solves
exactly this problem for `Checkbox` — there is no equivalent for `Radio`.

### Test and documentation coverage is uneven and thin

- **No `.spec`/`.test` files exist anywhere in `ui-forms`.** [`ui-core` has two](../../packages/ui-core/src/hooks),
  both for hooks (`useDebouncedValue`, `useKeyboardActivation`), not components. Component behaviour in
  this repo is expected to be covered by Storybook `play()` functions rather than separate spec files.
- Measured against that convention, coverage is still uneven: `Checkbox`, `CheckboxGroup`, `Radio`,
  `Select`/`MultiSelect` have `play()`/`userEvent` interactions in their stories or a shared
  `__fixtures__/interactions.ts`. `Input`, `Textarea`, `Slider`, `Calendar`, `SingleDatePicker`,
  `RangeDatePicker` have **none** — their stories render static examples only.
- Only two components have `.mdx` docs: [`Input.mdx`](../../packages/ui-forms/src/components/Input/Input.mdx)
  and [`Select.mdx`](../../packages/ui-forms/src/components/Selects/Select.mdx). Nothing documents
  composition patterns (how a `Checkbox` + `CheckboxLabel` + validation error should fit together;
  how a manual form should be laid out) — each story file invents its own layout ad hoc, which is how
  the `Textarea` drift above happened unnoticed.
- The `CheckboxGroup` story file is named
  [`CheckboxGroup/Checkbox.stories.tsx`](../../packages/ui-forms/src/components/CheckboxGroup/Checkbox.stories.tsx) —
  same filename as the unrelated `Checkbox/Checkbox.stories.tsx`, in a different folder. Minor, but
  worth a rename while the package is being touched.

### Package dependency graph is one-directional and constrains where things can move

Confirmed from each package's `package.json` (already documented for a different reason in
[`03-focus-indicators/discovery.md`](../03-focus-indicators/discovery.md#constraints)):

```
@repo/core → ui-core → ui-overlays → ui-command → ui-forms
```

- `ui-core` depends on nothing above it in this chain — no `ui-overlays`, no `ui-command`.
- `ui-command` depends on `ui-core` and `ui-overlays`.
- `ui-forms` depends on `ui-core`, `ui-overlays`, and `ui-command`.

This is a hard constraint, not a style preference: **`Select` and the `DatePickers` cannot move into
`ui-core`** as they stand, because they need `PopoverContent` (`ui-overlays`) and, for `Select`,
`CommandInterface` (`ui-command`). Moving them would require either flattening the package graph
(rejected — see [package-structure-decision](#) memory: the packages stay separate) or duplicating
overlay/positioning logic inside `ui-core`, which recreates the exact duplication problem this
deliverable exists to remove. "Everything form-related moves to `ui-core`" is not achievable as
stated; the boundary has to be dependency-driven, not category-driven.

Conversely, nothing observed stops **`CheckboxGroup` moving to `ui-core` alongside `Checkbox`** —
it only depends on `Checkbox`/`CheckboxLabel` (which would themselves be in `ui-core`) and a type
from `@repo/core`. The instinct to sort components by "is this a form control" undersells how much of
the package's actual content has no dependency on `ui-overlays`/`ui-command` at all.

### The JSON/schema-driven rendering half of the ask has no existing implementation

Nothing in `ui-forms`, `ui-command`, or `ui-overlays` reads a schema or config object and renders
fields from it. `useForm` is the only form-orchestration surface, and it is untouched
`@tanstack/react-form`. Building this is new feature work, not a refactor of something that exists —
it needs its own design (schema shape, validation-library integration, extensibility for custom field
types) independent of where the primitives end up living.

## Constraints

- **The package graph does not change.** `ui-core`, `ui-overlays`, `ui-command`, `ui-forms` stay
  separate packages (prior decision — packages are not being merged). Any redesign has to work
  within the existing one-directional dependency chain.
- **`ui-forms` keeps depending on `ui-overlays` and `ui-command`.** Compound controls that need
  positioning/overlay or command-list machinery (`Select`, `SingleDatePicker`, `DateRangePicker`)
  stay compositions at this layer.
- **TanStack Form (`@tanstack/react-form`) is the form library already in use** and is not being
  swapped out as part of this — the ask is to standardise composition and documentation, not to
  change the underlying form-state library.
- **Tests are Storybook `play()` interactions**, per this repo's established convention, not a
  separate `.spec.ts` suite per component.

## Assumptions

- "Comprehensive Storybook documentation" means: a standalone-usage story, at least one
  composition-with-other-components story, and common-pattern stories (validation/error state,
  disabled, controlled) for every exported component — matching the shape `Input.stories.tsx`
  already attempts but inconsistently, and that most other components don't attempt at all.
- "Tests focused on user behaviour" means Storybook `play()` interactions driving the component the
  way a user would (typing, clicking, keyboard nav) and asserting on rendered output/DOM state —
  not asserting on internal props, class names, or implementation details. This is the existing
  convention in the `Checkbox`/`Select` stories that already have `play()` functions; it needs to
  extend to the components that currently have none.
- Moving a component to `ui-core` is a breaking import-path change for any existing consumer, but
  since `ui-forms` currently re-exports everything from its own root, a transitional re-export from
  `ui-forms` (pointing at the moved `ui-core` component) could avoid a hard break if that matters to
  the consuming app — flagged as an open question rather than assumed.

## Open Questions (carried into the spec)

1. Where does the new `Field` component live — `ui-core` (pure presentational shell: label,
   description, error slot, required indicator, no form-library awareness) or `ui-forms` (aware of a
   TanStack Form field's validation state)? See discovery finding on the dependency-driven boundary.
2. Does `CheckboxGroup` move to `ui-core` along with `Checkbox`, given it has no
   `ui-overlays`/`ui-command` dependency? Does a `RadioGroup` get built at the same time, to close the
   gap where `Radio` currently requires importing Radix directly?
3. Should moved components keep a re-export from `ui-forms` for import-path stability, or is a clean
   breaking move acceptable given the number of current consumers?
4. Is the JSON/schema-driven renderer in scope for this deliverable at all, or is it large and
   undecided enough (schema format, validation integration, extensibility) that it needs its own
   `problem-discovery` pass as a follow-on deliverable once the composition primitives exist?
5. Does `Calendar` (the `react-day-picker` adapter) move anywhere, or does it stay as an
   implementation detail of the `DatePickers`? It has no `ui-overlays`/`ui-command` dependency itself,
   but it's also not used standalone anywhere today.

All five are resolved in the specs — see
[`04-ui-forms-primitive-migration/spec.md`](./spec.md) and
[`05-ui-forms-field-pattern/spec.md`](../05-ui-forms-field-pattern/spec.md) for the Decisions each
one records.

## Success Looks Like

- One primitive per concept in the library — no second, independently-styled `Input` living
  alongside `DebouncableInput`.
- A documented, reusable way to pair a label, a control, a description and an error message that
  every manual-composition story and every real form in the app actually uses — so the drift seen in
  `Input.stories.tsx`'s `ContactForm` story can't happen silently again.
- `ui-forms` contains only: form-library integration (`useForm` and whatever wraps it), compound
  controls that genuinely need `ui-overlays`/`ui-command`, and (later, as its own deliverable) a
  schema-driven renderer — not leaf primitives that have no dependency on either.
- Every exported component, in whichever package it ends up, has standalone, composition, and
  common-pattern Storybook coverage, and `play()`-driven behavioural tests.
