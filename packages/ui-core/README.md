# @repo/ui-core

The base UI package: presentational components, the form primitives, and the shared hooks.

> 📖 **Back to [Main README](../../README.md)**

## At a glance

- **24 components**, 44 runtime exports, 19 direct dependencies.
- **Depends on nothing else in the library.** It sits at the bottom of the chain, so every other UI
  package can use it.
- **This is where the library's conventions are written down** — see
  [Conventions](#conventions). `ui-overlays`, `ui-command` and `ui-forms` link here rather than
  restating them.
- Single entry point: `import { Button } from '@repo/ui-core'`. There are no subpath exports.

## What is in here

| Group           | Components                                                                               |
| --------------- | ---------------------------------------------------------------------------------------- |
| Presentational  | `Button`, `Alert`, `Badge`, `Avatar`, `Icon`, `Skeleton`, `Progress`, `Accordion`        |
| Disclosure      | `Tabs`, `Tooltip`                                                                        |
| Form primitives | `Input`, `Textarea`, `Checkbox`, `CheckboxGroup`, `Radio`, `RadioGroup`, `Slider`        |
| Dates & search  | `Calendar`, `Search`, `DebouncableInput`                                                 |
| Labelling       | `Label`, `Field`                                                                         |
| Hooks           | `useKeyboardActivation` (public), `useDebouncedValue` and `useRovingTabIndex` (internal) |

**Why the form primitives are here and not in `@repo/ui-forms`.** The package boundary is drawn by
**dependency footprint**, not by category: nothing above needs `ui-overlays` or `ui-command`, so it
sits at the bottom where anything can reach it. `@repo/ui-forms` holds what genuinely needs a form
library, a popover or a command list.

## Conventions

These apply to all four UI packages. Most are enforced by a lint rule — where they are, the rule is
named and the rationale lives in
[`@repo/eslint-config`'s README](../eslint-config/README.md) rather than being repeated.

### File layout and barrels

- One component per folder, named after the component.
- Every file inside is named after the folder: `Button.tsx`, `Button.types.ts`, `Button.variants.ts`.
- **Every direct child of `src/components/` has an `index.ts`.**
- **`src/index.ts` imports only through those barrels** — never past one to an implementation file.
- A compound component keeps its parts in `components/` with its own barrel, and the parent
  delegates to it (`Dialog`, `Sheet`, `Popover`, `Accordion`, `Slider`, `Checkbox`).
- A component folder may also hold `contexts/`, `hooks/`, `types/`, `utils/`, `__fixtures__/`.

```
Button/
├── index.ts              the folder's only public face
├── Button.tsx
├── Button.types.ts
├── Button.variants.ts
├── Button.stories.tsx
└── Button.mdx
```

Enforced by `project-structure/folder-structure`.

> **Known deviations, not a second pattern to copy.** Four folders group several components rather
> than describing one — `Selects/`, `DatePickers/` and `fields/` in `@repo/ui-forms`, and `Overlay/`
> in `@repo/ui-overlays`. Each is named individually in the rule's schema.

### Variants

- CVA definitions live in `<Component>.variants.ts` (filename enforced).
- Exported names are `camelCase` ending `Variants`: `buttonVariants`, `alertVariants`.
- **A `cva` file is never exported** — not from a barrel, not from `src/index.ts`. Variants are an
  implementation detail of the component that owns them.
- A component elsewhere that needs one imports the file directly, as `Calendar` does with
  `buttonVariants`.

### Prop types carry an `I` prefix

- `IButton`, `IInput`, `ITabs` — so a prop type can be named after its component without colliding
  with the component's own export.
- Enforced by `@typescript-eslint/naming-convention` on **interfaces**.

Two deliberate exceptions:

- **Hook options and results are named for what they are.** `IUseDebouncedValueOptions` is prefixed;
  `ShowErrorsWhen`, `IconName` and `SelectProps` are unions or derived aliases and are not.
- **A discriminated union cannot be an interface** (TS2312). `IAccordion`, `ICalendar` and `ILabel`
  are type aliases, each stating why in-file. Where the union's members can be interfaces they are —
  `IAccordion` is `IAccordionSingle | IAccordionMultiple`.

### `displayName`

- `react/display-name` is `error`, so anything React cannot infer a name for — an anonymous
  `React.memo` or `forwardRef` — must set one.
- **It is not on every component, and the rule does not require that.** Coverage is roughly 45%;
  `DropdownMenu`'s fifteen components have none. Set it where it helps devtools and Storybook.

### Controlled-only form groups

- `CheckboxGroup` and `RadioGroup` take `value` and `onChange` and hold **no internal state**.
- There is no uncontrolled mode and no `defaultValue`. The caller owns the value.
- Both behave identically on purpose — see
  [`docs/04-ui-forms-primitive-migration`](../../docs/04-ui-forms-primitive-migration/spec.md).
- Nothing enforces this, which is why it is stated here.

`Field` composes a label, a control, a description and an error, and wires them together for
assistive technology. It has no form-library dependency; `@repo/ui-forms`' `FormField` is the
TanStack layer on top.

## Development

See [Local Development](../../.claude/skills/local-development/SKILL.md) for build, lint and test
commands — and the traps that make their results lie.
