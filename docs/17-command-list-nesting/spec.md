# Feature: One list per Command

## Problem

`Command` renders two nested lists on every path. A plain `Select` produces this today:

```
div[data-slot=command]              overflow-hidden, h-full        ← clips, never scrolls
  input[role=combobox]
  div[data-slot=command-list]       role=listbox, max-h-300, overflow-y-auto   ← CommandInterface
    div[data-slot=command-list]     role=listbox, max-h-300, overflow-y-auto   ← the list variant
      div[role=option] × n
```

`CommandList` itself is not wrong. It is the scroll container and always was, and `Command`'s own
`overflow-hidden` clips rather than scrolls. The defect is that `CommandList` gets rendered **twice**
— once by `CommandInterface`, once by whichever list variant is nested inside it — and nothing tells
the inner one it is already inside an outer one. Five variants do this: `CommandListItems`,
`CommandGroupedList`, `CommandVirtualizedList`, `CommandGroupedVirtualizedList`, and `ui-forms`'
`SelectListItems`.

Two consequences follow, and only the first is observable today.

**A `listbox` nested inside a `listbox`.** `cmdk` emits `role="listbox"` on `Command.List` (verified
in `cmdk@1.1.1`, alongside `combobox`, `option`, `group` and `separator`). The combobox's
`aria-activedescendant` therefore points into the inner list, and the outer list owns a child that is
not an option. That is an `aria-required-children` violation, live on every `Command` story and every
`Select` story.

**Two scroll parents.** Latent rather than broken, because both carry the same `max-h-[300px]`, so
the inner list never overflows the outer one and the outer never actually scrolls. It bites as soon
as the two differ — which callers can already cause: `Command.stories.tsx:659` passes
`className='max-h-[300px]'` to an inner list, and `CommandVirtualizedList` takes a `maxHeight` prop.
For the virtualized variants this matters most: `getScrollElement` returns the **inner** node, so if
the outer ever scrolls the virtualizer measures against the wrong element and renders the wrong
window of rows.

This is why the defect has gone unnoticed. The two containers mask each other.

## Goals

1. One scroll container per list, so scrolling behaves predictably.
2. One `listbox` per combobox, so assistive technology sees a valid structure.
3. A virtualized list measures against the element that actually scrolls.

## Scope

- **Included**: giving whoever composes the palette sole ownership of the single `CommandList`;
  making the five list variants render items only; pointing both virtualizers at the owning scroll
  element; enforcing the result with accessibility assertions on the `Command` and `Select` story
  suites.
- **Not included**: `Command`'s public surface, its filtering, its keyboard model, or its visual
  design. `Select`'s public API. Removing `CommandList` from the public exports — standalone
  composition must keep working.

## Non-Goals

- Replacing `cmdk` or `@tanstack/react-virtual`.
- Changing the default `max-h-[300px]`, or any list's visual dimensions.
- Consolidating `SelectListItems` with `CommandListItems`, which is near-duplicate but a separate
  question.

## Requirements

1. Exactly one scroll container wraps a list, verified for the plain, grouped, virtualized and
   grouped-virtualized variants of both `Command` and `Select`.
2. Exactly one element with `role="listbox"` exists per open `Command`.
3. Virtualized lists measure against the element that scrolls, and the height of that element is
   controlled by the `className` on the `CommandList` its owner renders.
4. A list variant can still be composed **without** `CommandInterface`, directly under `Command`,
   by writing the `CommandList` around it.
5. `@repo/ui-command`'s public surface is unchanged.

## Edge Cases & Error Handling

- **Publishing a DOM node down the tree fails silently if done with a ref.** A ref mutation is not a
  state change, so nothing re-renders when the node attaches. This works today only because the ref
  and the virtualizer live in the _same_ component, where the virtualizer's effect runs after the ref
  is populated in the same commit. Once the node is created by a parent and read by a child, the
  child must re-render when the node arrives — otherwise `getScrollElement()` returns `null`
  forever and the virtualizer never measures. The symptom is an empty list, not an error.
- **Removing a scroll container changes scroll position and keyboard scroll-into-view.** `cmdk`
  scrolls the active option into view against whichever ancestor scrolls; verify keyboard navigation
  through a long list, not just rendering.
- **`cmdk` sets `--cmdk-list-height` on `Command.List`.** With two lists, the outer value is derived
  from a child that is itself constrained. Check nothing depends on the current (wrong) value.
- **Turning axe to `error` will surface unrelated pre-existing violations**, because a11y is `todo`
  globally in `preview.ts`. Those are real defects: fix or record them, do not weaken the guard.
- **Verify behaviour, not structure.** Counting elements by computed `overflow-y` couples the tests
  to internals that are expected to change. Assert what assistive technology sees.

## Acceptance Criteria

> **Amended during implementation.** AC1, AC5, AC6 and AC7 below reflect three decisions taken once
> the code was in front of us; the originals are recorded in
> [`plan.md`](plan.md#decisions-taken-during-implementation). In short: list variants drop their
> `CommandList` **unconditionally** rather than detecting nesting, which removes any way for a future
> variant to reintroduce the defect; `maxHeight` is deleted rather than rewired, leaving one way to
> size the list; and AC2 is enforced by the axe gate rather than a bespoke assertion, because
> `aria-required-children` already fails on a nested `listbox` across every story.

- **AC1** — Exactly one `CommandList` wraps a list. `CommandInterface` renders it for you; no list
  variant renders one at all.
- **AC2** — An open `Command` and an open `Select` each expose exactly one `role="listbox"`, asserted
  in the interaction suite.
- **AC3** — `a11y: { test: 'error' }` is enabled on the `Command` and `Select` story metas and the
  suite is green, with any unrelated violations found along the way either fixed or recorded.
- **AC4** — Both virtualizers scroll and measure against the owning list; the 5 000-item stories
  still select an item near the end of the list.
- **AC5** — The `className` on the owning `CommandList` sets the height of the scrolling element.
  Covered by the same story as AC6.
- **AC6** — A list variant composed directly under `Command`, with the caller writing the
  `CommandList`, scrolls and selects — covered by a story.
- **AC7** — No component export is added or removed from `@repo/ui-command`. The only type changes
  are the removal of `maxHeight` from `IVirtualizationProps` and of `className` from
  `ICommandGroupedList` and `ICommandListItems`, verified by diffing the built `dist/**/*.d.ts`
  against a build of the unmodified tree.
- **AC8** — Keyboard navigation scrolls the active option into view in every variant.

## Open Questions

- ~~Should `SelectListItems` simply become `CommandListItems`?~~ **Resolved: it delegates.** The file,
  the export, the `displayName` and `ISelectListItemsProps` all stay, so `ui-forms`' surface is
  unchanged, but the body is now `<CommandListItems>{children}</CommandListItems>`. Delegation rather
  than deletion because deleting it would drop `ISelectListItemsProps` from `ui-forms`' exports and
  `ICommandListItems` is not exported from `ui-command` to replace it. The `className` pass-through
  and the prop spread both went — with no list of its own to render, neither had anywhere to land.
