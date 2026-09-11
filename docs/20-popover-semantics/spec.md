# Feature: Popover semantics

What is built and how it must behave. Why each decision was made, and the facts it rests on, are in
[`CONTEXT.md`](CONTEXT.md) — cited below as ADR-n and fact n.

## Problem

**Every popover in the library claims to be a dialog.** Radix's `PopoverContent` sets
`role="dialog"` and its `PopoverTrigger` sets `aria-haspopup="dialog"` (fact 8). A popover here is
not meant to be a window: it is not modal, and once it moves to the platform primitive, Tab moves
straight out of it. The role promises a boundary the component does not intend to keep.

**Nine `aria-dialog-name` failures ship today, silenced in two files.**
`Command.stories.tsx:46-67` and `Select.stories.tsx:46-61` both disable the rule with a comment
pointing at deliverable `18`, which then excluded `Popover` from its scope.

**`Select` contradicts itself.** `SelectTrigger` renders `aria-haspopup='listbox'`
(`SelectTrigger.tsx:46`) while the surface it opens is a `role="dialog"` (`SelectInterface.tsx:12`).

**Tab behaves inconsistently.** Radix loops Tab inside every popover, so the keyboard alone cannot
leave one, and in an open `Select` — whose only tabbable element is the search input — Tab does
nothing (fact 4, read from the code).

**`Popover` is the only overlay with no stories.** It is exercised only through `Select` and the
date pickers.

## What the platform and the guidelines settle

- The [APG dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) says **both**
  modal and non-modal dialogs contain their tab sequence, and a dialog must have a name.
- The APG grades a name on `group` _discretionary_ and on a bare `<div>` _prohibited_ (fact 5).
- `popover` is a global attribute that grants no role. Chrome, Edge and Firefox expose a role-less
  popover as an unnamed group, which screen readers skip; Safari does not (fact 6).
- A native `popover="auto"` closes on Escape and a click outside, lets Tab move out, and does not
  close when focus leaves (facts 4, 14).
- Its close cannot be refused, and synthetic input — what `play()` dispatches — reaches neither
  Escape nor light dismiss (fact 14, measured).
- A click on an open popover's trigger is exempt from light dismiss only when the browser knows the
  trigger (fact 13).
- `@position-try` accepts only `position-anchor`, `position-area`, inset, margin, sizing and
  `align-self` / `justify-self`, and nothing exposes which fallback applied.

Phase 2 raises the [support floor](../../README.md#-browser-support) to **Chrome 137 / Firefox 147 /
Safari 26** — DD-5 in [`discovery.md`](discovery.md), with Chrome revised by ADR-16.

## Goals

1. `Popover` carries semantics it actually honours.
2. A popover that has a name is announced with it; one that has none claims nothing.
3. A popover is named with the same props as a `Dialog` — `title`, `description`, `aria-label`,
   `aria-labelledby`.
4. The public surface is only what the call sites need.
5. `Popover` is testable in its own right, not as a side effect of `Select`.
6. The library owns its anchored positioning instead of renting it.

## Scope

Two phases, both in scope (ADR-6).

- **Phase 1 — semantics and naming, on Radix.** The role rule, `title` / `description`, triggers
  that stop claiming a dialog, `Select`'s trigger pointing at its listbox, the two suppressions
  removed, the `Select` test helpers rewritten, and `Popover` stories. Nothing changes on screen.
- **Phase 2 — the primitive.** `popover="auto"` plus CSS anchor positioning replaces
  `@radix-ui/react-popover`, bringing the closing, focus and positioning behaviour below. Phase 1's
  naming API is unchanged; the Radix-only props are removed.

## Non-Goals

- **`DropdownMenu` and `HoverCard`.** Separate component sets with their own semantics, still Radix.
- **Removing `useOverlayContainer`.** It stays for the two components above.
- **Replicating `shift()`** (DD-6). Flipping replaces sliding.
- **A modal popover, or one that contains Tab** (ADR-14). Revisit if a caller asks.
- **Refusing a close** (ADR-17). `Dialog` and `Sheet` keep their veto; `Popover` has none.
- **Compound parts** — `PopoverTitle`, `PopoverDescription`, `PopoverClose` — and `PopoverAnchor`
  (ADR-1 to ADR-3).
- **A `role` prop** (ADR-7), or a heading level for `title` (ADR-9).
- **`Popover.mdx`** (ADR-10). Recorded in [`planned.md`](../planned.md#storybook-docs-pages-for-ui-overlays).
- **Naming a date picker used outside a `Field`.** A follow-up in `CONTEXT.md`.
- **Rewriting the root README's browser-support section.** Lands with Phase 2's build.

## Requirements

Numbers are stable IDs. A removed requirement keeps its number and says which decision removed it.

### Semantics

1. _(Phase 1)_ `PopoverContent` emits **no `role`** unless it has an accessible name.
2. _(Phase 1)_ A popover with a name emits `role="group"`, named by `aria-labelledby` or `aria-label`.
3. _Removed — ADR-7. Callers cannot set a popover's role._
4. _(Phase 1)_ `SelectInterface` renders no role; `SelectTrigger`'s `aria-haspopup='listbox'`
   resolves to a real listbox referenced by `aria-controls`.
5. _(Phase 1, revised — ADR-5)_ No popover claims a dialog: no `role="dialog"` on any popover, and no
   `aria-haspopup="dialog"` on any trigger. The date pickers get no special case.

### Structure

6. _(Phase 1)_ `PopoverContent` accepts `title` and `description`, both `ReactNode`. `title`
   renders as text, not as a heading (ADR-9).
7. _(Phase 1, revised — ADR-1 to ADR-3)_ The public parts are `Popover`, `PopoverTrigger` and
   `PopoverContent`. `PopoverAnchor` is removed; no title, description or close parts are added.
8. _(Phase 1)_ Three naming routes are ranked, highest first: caller `aria-labelledby`, caller
   `aria-label`, the `title` prop.
9. _(Phase 2)_ `showCloseButton` defaults to **`false`**. When true, an X button closes the popover.
10. _Removed — ADR-4, ADR-7. No accessible-name warning: a name is optional, and a role only exists
    alongside one._
11. _Removed — ADR-2. A popover always anchors to its trigger._

### Behaviour (Phase 2)

12. Opening a popover moves focus to an explicit `[autofocus]` descendant, or failing that the first
    tabbable one.
13. _(Revised — ADR-13, ADR-17)_ A popover closes on Escape, a click outside it, focus moving outside
    it, and its X button. Each calls `onOpenChange(false)` once.
14. _Removed — ADR-17. A popover close cannot be refused._
15. _Removed — ADR-17. There are no close sources for popovers._
21. Tab past the last focusable element, or Shift+Tab past the first, moves focus out of the popover
    and closes it. Tab never loops inside a popover (ADR-14).
22. Clicking the trigger of an open popover closes it, and it stays closed (ADR-16).

### Positioning (Phase 2)

16. `side` and `align` survive as props. `sideOffset` is removed; every popover sits the same
    distance from its trigger (ADR-15).
17. _Removed — ADR-11. `avoidCollisions` and `collisionPadding` are removed; every popover flips._
18. A `Select`'s popup is at least as wide as its trigger.
19. Positioning follows scroll and resize without JavaScript measurement.
20. The entry and exit animation is an opacity fade with no directional component.

## Edge Cases & Error Handling

- **A generated anchor name.** `React.useId()` returns `«r0»`, not a valid `<dashed-ident>`, so it
  is sanitised. Callers never supply one (ADR-8), so two popovers cannot share a name.
- **A popover opened while already open.** `showPopover()` throws `InvalidStateError`; guarded on
  `:popover-open`, as `useDialogElement` guards `showModal()`.
- **A popover closed by something other than React** — devtools, light dismiss, a nested popover
  taking the top layer. The `toggle` event pushes that back into state.
- **Reopening during the exit animation.** Children stay mounted until the exit finishes.
- **A popover inside a modal `Dialog`.** Paints above it. Escape, or a click inside the dialog but
  outside the popover, closes the popover and not the dialog.
- **A popover with no visible title.** Named by `aria-label`, or left unnamed (ADR-4).
- **Both `title` and `aria-label`.** `aria-label` names the popover; the title still renders.
- **Between Phase 1 and Phase 2.** Radix still loops Tab while popovers are announced as a group or
  nothing. Accepted as temporary (ADR-14).

## Acceptance Criteria

A Storybook `play()` verifies each one unless noted. Synthetic input reaches neither native Escape
nor light dismiss (fact 14), so AC9, AC16 and AC17 need input the popover responds to; the mechanism
belongs to the implementation plan. Numbers are stable IDs.

- **AC1** — _(Phase 1)_ A `Popover` given no name renders no `role` attribute.
- **AC2** — _(Phase 1)_ A `Popover` given a `title` renders `role="group"`, is announced with that
  title, and the title is not a heading.
- **AC3** — _Removed — ADR-7._
- **AC4** — _(Phase 1)_ `Command.stories.tsx` and `Select.stories.tsx` no longer disable
  `aria-dialog-name`, and both still pass with `a11y: { test: 'error' }`.
- **AC5** — _(Phase 1)_ Opening a `Select` exposes a listbox reachable from the trigger's
  `aria-controls`.
- **AC6** — _(Phase 1, revised — ADR-5)_ Neither date picker's popup has `role="dialog"`, and
  neither trigger has `aria-haspopup="dialog"`.
- **AC7** — _(Phase 1)_ Caller `aria-labelledby` beats `aria-label`, which beats `title`.
- **AC8** — _(Phase 2)_ Opening a popover containing a form focuses its first input; one containing
  an `[autofocus]` element focuses that instead.
- **AC9** — _(Phase 2)_ Escape, a click outside, focus moving outside and the X button each close
  the popover and call `onOpenChange(false)` exactly once.
- **AC10** — `Popover` has stories covering AC1, AC2 and AC7 in Phase 1, and AC8, AC9 and AC18 in
  Phase 2.
- **AC11** — _(Phase 2, unit, `.spec.ts`)_ Generated anchor names are stable across re-renders and
  valid `<dashed-ident>`s.
- **AC12** — _(Phase 2)_ A `Select` inside a modal opens, positions and responds to input; the same
  for `MultiSelect` and both date pickers.
- **AC13** — _(Phase 2)_ A popover anchored near a viewport edge flips rather than overflowing, for
  both date pickers, asserted geometrically against `getBoundingClientRect()`.
- **AC14** — _(Phase 2)_ A `Select`'s surface is at least as wide as its trigger.
- **AC15** — _(Phase 2, grep)_ No `@radix-ui/react-popover` import remains anywhere in `packages/`
  outside `dist/`.
- **AC16** — _(Phase 2)_ In a popover inside a modal `Dialog`, Escape closes the popover and leaves
  the dialog open; so does a click inside the dialog but outside the popover.
- **AC17** — _(Phase 2)_ Clicking the trigger of an open popover closes it, and it does not reopen.
- **AC18** — _(Phase 2)_ Tab from a popover's last focusable element moves focus outside the popover
  and the popover closes.

## Open Questions

None. The spec's original four, and the checks raised while grilling, are answered in
[`CONTEXT.md`](CONTEXT.md#open-questions).
