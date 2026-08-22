# @repo/ui-forms

The form layer: everything that needs a form library, a popover or a command list.

> 📖 **Back to [Main README](../../README.md)**

## At a glance

- **7 component folders**, 27 runtime exports, 13 direct dependencies.
- Built on `@tanstack/react-form`. `useForm` is re-exported **untouched** — nothing here wraps it.
- Sits at the end of the chain, so it may use every other UI package.
- Single entry point: `import { Form, TextField } from '@repo/ui-forms'`.
- Conventions are documented once in
  [`@repo/ui-core`](../ui-core/README.md#conventions); the rules enforcing them live in
  [`@repo/eslint-config`](../eslint-config/README.md).

## What is in here

| Piece                                                                                          | Purpose                                                                     |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `Form`, `useForm`, `useFormContext`                                                            | The `<form>` element, `noValidate`, and the context fields bind to          |
| `FormField`                                                                                    | Binds `ui-core`'s `Field` to a form field **by name**                       |
| `TextField`, `TextareaField`, `CheckboxField`, `SwitchField`, `SelectField`, `RadioGroupField` | One control each, already bound                                             |
| `SubmitButton`, `FormError`                                                                    | Submit semantics, and errors belonging to the form rather than a field      |
| `Select`                                                                                       | Single and multi select, built on `Popover` + `Command`                     |
| `SingleDatePicker`, `DateRangePicker`                                                          | Built on `Popover` + `Calendar`                                             |
| `toFieldProps`                                                                                 | The translation under `FormField`, for anyone driving `form.Field` directly |

## Worth knowing

- **The leaf primitives are not here.** `Input`, `Textarea`, `Checkbox`, `CheckboxGroup`, `Radio`,
  `Slider` and `Calendar` live in [`@repo/ui-core`](../ui-core/README.md). The boundary is drawn by
  **dependency footprint**, not category: those need nothing from `ui-overlays` or `ui-command`, so
  they sit lower where anything can reach them.
- **`FormField` is the escape hatch.** The bound `*Field` components each compose it with one
  control, so the per-control wiring lives here once instead of at every call site. Use `FormField`
  directly for a control that has no wrapper.
- **`Select` re-exports five `@repo/ui-command` components under Select-facing names**
  (`SelectGroup`, `SelectSeparator`, and three list variants), so composing a `Select` never means
  reaching for `Command*` names.
- **`DateRangePicker`'s folder, file, interface and export all agree**, as `SingleDatePicker`'s
  always did. `onDateChange` is optional while `onDateRangeChange` is required — an asymmetry worth
  knowing before you swap one for the other.

> **Three grouping folders deviate from the component layout** and are named individually in the
> folder-structure rule's schema. They are a known deviation, not a pattern to copy.
>
> | Folder         | Holds                                              |
> | -------------- | -------------------------------------------------- |
> | `Selects/`     | `Select.*` plus `SingleSelect/` and `MultiSelect/` |
> | `DatePickers/` | `SingleDatePicker/` and `DateRangePicker/`         |
> | `fields/`      | the six bound `*Field` components as flat files    |

## Dependency direction

`core → ui-core → ui-overlays → ui-command → ui-forms`. One way only; this package is at the end.
