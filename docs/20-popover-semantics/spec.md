# Feature: Popover semantics

## Problem

**Every popover in the library claims to be a dialog.** Radix's `PopoverContent` sets
`role="dialog"`, and a dialog contains its tab sequence — ours does not. The role promises a keyboard
behaviour no popover here implements.

**Nine `aria-dialog-name` failures ship today, silenced in two files.**
`Command.stories.tsx:46-67` and `Select.stories.tsx:46-61` both disable the rule with a comment
pointing at deliverable `18`, which then excluded `Popover` from its scope. Nobody owned them until
now.

**`Select` contradicts itself.** `SelectTrigger` renders `aria-haspopup='listbox'`
(`SelectTrigger.tsx:46`) while the surface it opens is a `role="dialog"` (`SelectInterface.tsx:12`).

**`Popover` is the only overlay with no stories.** It has no `.stories.tsx`, does not appear in
Storybook, and is exercised only indirectly through `Select` and the date pickers.

## What the platform and the guidelines already settle

Three decisions below rest on this rather than on preference, so it is recorded here.

- The [APG dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) defines a dialog
  as "a window overlaid on either the primary window or another dialog window", and states that
  **both** modal and non-modal dialogs contain their tab sequence.
- Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using), showing a popover
  places its contents next in the tab order **after the invoker** — focus moves through and out.
  Native popovers will never contain a tab sequence.
- `popover` is a **global attribute**, not an element. It grants top layer and light dismiss and
  **no role**; the choice of role is therefore ours either way.
- `role="group"` is a document-structure role supporting a name from the author, with no behavioural
  contract attached — unlike `dialog`.
- `@position-try` accepts only `position-anchor`, `position-area`, inset, margin, sizing and
  `align-self` / `justify-self`. `transform` and `transform-origin` are not permitted, and nothing
  exposes which fallback is applied.

CSS anchor positioning is Chrome 125 / Firefox 147 / Safari 26 — above the library's current
[support floor](../../README.md#-browser-support). Raising that floor is a decision taken in
[`discovery.md`](discovery.md) (DD-5) and is what gates Phase 2.

## Goals

1. `Popover` carries semantics it actually honours.
2. A popover that has a name is announced with it; one that has none claims nothing.
3. Naming a popover works the same way as naming a `Dialog`, learned once.
4. `Popover` is testable and documented in its own right, not as a side effect of `Select`.
5. The library owns its anchored positioning instead of renting it.

## Scope

Two phases. Both are in scope; the split exists because only the second needs the floor raised.

- **Phase 1 — semantics and structure, on Radix.** The role change, the `title` / `description` /
  compound-part API, `Popover` stories, and the fixture rewrite that follows from dropping
  `role="dialog"`. Ships without anchor positioning.
- **Phase 2 — the primitive.** `popover="auto"` plus CSS anchor positioning replaces
  `@radix-ui/react-popover`. The Phase 1 API is unchanged by it.

## Non-Goals

- **`DropdownMenu` and `HoverCard`.** They share `Popover`'s wrapper shape and will eventually want
  the same treatment, but they are separate component sets with their own semantics. Pulling them in
  repeats the mistake `18` avoided when it pushed `Popover` out.
- **Removing `useOverlayContainer`.** It stays for the two components above, which are still Radix.
- **Replicating `shift()`.** Decided against in DD-6; flipping replaces sliding.
- **A modal popover.** `Popover` is non-modal today and stays that way. `popover="auto"` matches.
- **Rewriting the root README's browser-support section.** That lands with Phase 2's build, not with
  this spec.

## Requirements

### Semantics

1. `PopoverContent` emits **no `role`** unless it has an accessible name or the caller supplied one.
2. A popover with a name emits `role="group"` and `aria-labelledby` pointing at that name.
3. A caller-supplied `role` always wins over both of the above.
4. `SelectInterface` renders no role; `SelectTrigger`'s `aria-haspopup='listbox'` resolves to a real
   listbox referenced by `aria-controls`.
5. Both date pickers' calendar surfaces are named, and take `role="group"` — **not** `role="dialog"`,
   and no focus trap. See DD-2 for why the APG's date-picker example is not followed.

### Structure

6. `PopoverContent` accepts `title` and `description` props.
7. `PopoverTitle`, `PopoverDescription` and `PopoverClose` exist as compound parts, mirroring
   `DialogTitle` / `DialogDescription` / `DialogClose`.
8. Four naming routes are ranked, highest first: caller `aria-labelledby`, caller `aria-label`, the
   `title` prop, a compound `PopoverTitle`. This is `useOverlayLabelling`'s existing ranking,
   unchanged.
9. `showCloseButton` defaults to **`false`**. All four current call sites therefore need no change to
   avoid it.
10. The "no accessible name" warning fires **only** when the popover has a role. A role-less popover
    has nothing to name.
11. `PopoverAnchor` carries `anchor-name` when the anchor is not the trigger.

### Behaviour

12. Opening a popover moves focus to an explicit `[autofocus]` descendant, or failing that the first
    tabbable one. Native popover does not do this; the library does.
13. Every close route — Escape, light dismiss, `PopoverClose`, a controlled `open` change — passes
    through `onRequestClose` before the popover closes.
14. Calling `preventDefault()` on that event leaves the popover genuinely open, not visually open and
    internally closed.
15. `OverlayCloseSource` gains `'light-dismiss'`.

### Positioning (Phase 2)

16. `side`, `align` and `sideOffset` survive as props and resolve to `position-area` and margins.
17. `avoidCollisions={false}` resolves to `position-try-fallbacks: none`.
18. A popover sizes to its anchor via `anchor-size(width)` where `--radix-popover-trigger-width` is
    used today.
19. Positioning updates on scroll and resize without a JavaScript observer.
20. The entry and exit animation is an opacity fade with no directional component.

## Edge Cases & Error Handling

- **Two popovers given the same explicit anchor name.** Warns. Both anchor to whichever element the
  CSS resolves first, which fails silently and reads as a positioning bug.
- **A generated anchor name.** `React.useId()` returns `«r0»`, not a valid `<dashed-ident>`. It is
  sanitised before use.
- **A popover opened while already open.** `showPopover()` throws `InvalidStateError`; guarded on
  `:popover-open`, mirroring `useDialogElement`'s `!dialogNode.open` guard.
- **A popover closed by something other than React** — devtools, a light dismiss, a nested popover
  stealing the top layer. The `toggle` event pushes that back into state so the DOM and React cannot
  disagree.
- **Reopening during the exit animation.** Children stay mounted until the exit finishes; the
  `present` flag is separate from `open`.
- **A popover inside a modal `<dialog>`.** Must paint above it and light-dismiss without closing the
  dialog. This replaces `18`'s six containment assertions, which no longer describe the right thing.
- **A popover with no visible title.** Named by `aria-label` or a visually-hidden `PopoverTitle`, the
  same two routes `CommandDialog` already uses.

## Acceptance Criteria

A Storybook `play()` verifies each one unless noted, which is how components are tested here.

- **AC1** — A `Popover` given no name renders no `role` attribute.
- **AC2** — A `Popover` given a `title` renders `role="group"` and is announced with that title.
- **AC3** — A `Popover` given an explicit `role` renders that role, whatever else names it.
- **AC4** — `Command.stories.tsx` and `Select.stories.tsx` no longer disable `aria-dialog-name`, and
  both still pass with `a11y: { test: 'error' }`.
- **AC5** — Opening a `Select` exposes a listbox reachable from the trigger's `aria-controls`.
- **AC6** — Both date pickers' calendars are named and expose `role="group"`.
- **AC7** — Caller `aria-labelledby` beats `aria-label`, which beats `title`, which beats a compound
  `PopoverTitle`.
- **AC8** — Opening a popover containing a form focuses its first input; one containing an
  `[autofocus]` element focuses that instead.
- **AC9** — Escape, an outside click and `PopoverClose` each fire `onRequestClose` exactly once with
  the matching source; `preventDefault()` on any of them leaves the popover open.
- **AC10** — `Popover` has stories covering AC1, AC2, AC7, AC8 and AC9. It has none today.
- **AC11** — _(unit, `.spec.ts`)_ Anchor-name generation is stable across re-renders, sanitised to a
  valid `<dashed-ident>`, and warns on a duplicate explicit name.
- **AC12** — _(Phase 2)_ A `Select` inside a modal opens, positions and responds to input; the same
  for `MultiSelect` and both date pickers.
- **AC13** — _(Phase 2)_ A popover anchored near a viewport edge flips rather than overflowing,
  asserted geometrically against `getBoundingClientRect()` — there is no `data-side` to read.
- **AC14** — _(Phase 2)_ A `Select`'s surface is at least as wide as its trigger.
- **AC15** — _(Phase 2, grep)_ No `@radix-ui/react-popover` import remains anywhere in `packages/`
  outside `dist/`.

## Open Questions

- **Which element hosts the `popover` attribute** — always a neutral `<div>`, or polymorphic so
  `Select`'s listbox carries it directly and the wrapper disappears. The second is tidier;
  it depends on whether `cmdk`'s virtualisation tolerates the positioned box also being the scroll
  container.
- **Whether `beforetoggle` fires for synthetic events.** `18` found Chromium's `CloseWatcher` ignores
  untrusted input, which made Escape untestable on `<dialog>` and needed a second `onKeyDown` path.
  If `beforetoggle` behaves the same way, AC9 needs the same workaround. Must be verified in the test
  environment before AC9 is believed provable.
- **Whether `collisionPadding` survives.** It has no clean anchor-positioning equivalent, and
  `DateRangePicker` is the only caller.
- **Whether `Popover.mdx` is written here or waits.** `18` deferred consumer-facing `.mdx` to a
  library-wide session so the pattern would not be set from the narrowest case. Owning the primitive
  raises the cost of waiting, since the anchor-name contract is a caller obligation with nowhere else
  to live.
