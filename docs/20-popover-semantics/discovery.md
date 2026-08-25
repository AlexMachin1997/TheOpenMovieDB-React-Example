# Discovery: Popover semantics

## Problem Statement

**`Popover` advertises a keyboard contract it does not honour.** Radix's `PopoverContent` renders
`role="dialog"` on every popover in the library. A dialog — modal or not — contains its tab
sequence. Ours does not, and the native primitive it is moving to never will.

**Nine axe failures are suppressed rather than fixed.** `aria-dialog-name` fires on every unnamed
`role="dialog"`, and [`17`](../17-command-list-nesting/plan.md#the-a11y-gate-and-what-it-surfaced)
turned the rule off in two story files with a pointer at `18`. `18` then moved `Popover` out of its
scope entirely ([DD-2](../18-overlay-api/discovery.md)), so the pointer led nowhere. This deliverable
is where it lands.

**The contradiction is visible at a single call site.** `SelectTrigger` tells assistive technology
one thing and `SelectInterface` renders another:

```tsx
// packages/ui-forms/src/components/Selects/components/SelectTrigger.tsx:37-46
<PopoverTrigger asChild>
  <Button role={role} aria-expanded={ariaExpanded ?? open} aria-haspopup='listbox' …>
```

```tsx
// packages/ui-forms/src/components/Selects/components/SelectInterface.tsx:12
<PopoverContent className='min-w-[var(--radix-popover-trigger-width)] p-0'>
```

`aria-haspopup='listbox'` pointing at a `role="dialog"`. Silencing the axe rule hid this; it did not
resolve it.

**`Popover` has no stories.** It is the only overlay in `ui-overlays` without a `.stories.tsx`, so it
does not appear in Storybook at all and nothing exercises it directly. It is tested only as a side
effect of `Select` and the date pickers.

## Context

`Popover` lives in `@repo/ui-overlays` as four thin Radix wrappers — `Popover`, `PopoverTrigger`,
`PopoverContent`, `PopoverAnchor`. `Close` and `Arrow` are not wrapped or exported. Every type
derives from Radix:

```ts
// packages/ui-overlays/src/components/Popover/Popover.types.ts:5-16
export interface IPopover extends React.ComponentProps<typeof PopoverPrimitive.Root> {}
export interface IPopoverContent extends React.ComponentProps<typeof PopoverPrimitive.Content> {
	className?: string;
}
```

Four call sites, all inside `packages/`: `CommandProvider` (root only, controlled open),
`SelectTrigger` + `SelectInterface`, `SingleDatePicker`, `DateRangePicker`. Nothing in `apps/` uses
it directly. `PopoverAnchor` has zero call sites.

### Fact-check: what Radix actually renders

`planned.md` recorded the role as set "unconditionally", and
[`18`'s ADR-2](../18-overlay-api/CONTEXT.md) repeated it. **Both are wrong, and the correction is
what makes this deliverable shippable in two independent halves.** Verified against
`@radix-ui/react-popover@1.1.15` as installed, not from memory:

```js
jsx(PopperPrimitive.Content, {
  "data-state": getState(context.open),
  role: "dialog",          // set BEFORE the spread
  id: context.contentId,
  ...popperScope,
  ...contentProps,         // so a caller-supplied `role` wins
```

It is a default, not a fixture. `PopoverContent` can pass `role` through and change it today, on
Radix, with no anchor positioning involved.

## Decisions taken during discovery

### DD-1 — `role="dialog"` is wrong because the tab sequence is not contained

**Decided**: `PopoverContent` stops carrying `role="dialog"`.

**Rationale**: this rests on the guidelines, not on the axe result. The
[APG dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) defines a dialog as "a
window overlaid on either the primary window or another dialog window", and says that **both** modal
and non-modal dialogs contain their tab sequence — a non-modal one allows focus to move outside
without closing, but still contains the sequence.

A popover does not. Per
[MDN's Popover API guide](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using),
showing a popover places its contents next in the tab order _after the invoker_: Tab moves through
and straight out. The role therefore promises behaviour the component neither implements nor wants.

**Consequence**: the nine `aria-dialog-name` failures disappear because the rule no longer applies,
not because a name was added. Both suppressions come out of `Command.stories.tsx` and
`Select.stories.tsx`.

**Consequence**: every `Select` query breaks. The shared fixture funnels through the role:

```ts
// packages/ui-forms/src/components/Selects/__fixtures__/interactions.ts:17-19
export const getDialog = () => within(document.body).getByRole('dialog');
```

`getOption`, `getSearchInput` and `expectNoOption` all call it, and `Form.stories.tsx:431` queries
`role="dialog"` directly. The rewrite is mechanical — target the listbox — but it is the whole
`Select` suite, and it is the largest single cost in the deliverable.

### DD-2 — a named popover is `role="group"`; an unnamed one carries no role

**Decided**: the role follows the name. A popover given a title or an `aria-label` renders
`role="group"` with `aria-labelledby`; one given neither renders no role at all. An explicit `role`
prop always wins.

**Rationale**: a bare `<div>` with `aria-labelledby` announces nothing — a name on a generic
container is discarded. `group` is a document-structure role that supports a name from the author and
carries no behavioural contract, which is exactly the difference from `dialog`. It is the only option
that gets a title announced without claiming to be a window.

**Consequence**: `aria-dialog-name` becomes structurally unfailable rather than merely fixed. The
role and the name arrive together or not at all.

**Sharp edge — the date pickers.** The
[APG date picker dialog example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)
does use `role="dialog"` on a calendar popup. It also implements a focus trap, because the role
obliges it. **Decided: the date pickers take `role="group"` and no trap.** A calendar anchored to a
field is not a window, and adding a trap to earn a role is the wrong way round. This is recorded
explicitly because a future reader will find that APG example and "correct" it back.

**Consequence for `Select`**: it takes no role from `Popover` at all. The content _is_ the listbox,
which is what `aria-haspopup='listbox'` on the trigger already claims, and `aria-controls` is wired
to point at it.

### DD-3 — the structure mirrors `Dialog`

**Decided**: `Popover` gains the same shape `18` gave `Dialog` and `Sheet` — `title` and
`description` props, compound `PopoverTitle` / `PopoverDescription` / `PopoverClose` parts, and an
optional close button.

**Rationale**: two overlay families with different labelling APIs is a worse outcome than one API
used at two levels of ceremony. `useOverlayLabelling` already ranks the four naming routes (caller
`aria-labelledby`, caller `aria-label`, `title` prop, compound title) and the ranking is
role-agnostic, so it transfers nearly whole.

**Consequence**: `showCloseButton` defaults to **`false`**, unlike `Dialog`. An X in the corner of a
`Select` dropdown or a calendar would be wrong, and all four current call sites would opt out on day
one. Content popovers opt in.

**Consequence**: `useOverlayLabelling`'s "this overlay has no accessible name" warning becomes
conditional on the popover having a role. Warning about an unnamed role-less popover would be noise —
there is nothing to name.

**Consequence**: a popover with no visible title names itself the way `CommandDialog` already does —
an `aria-label`, or a `<PopoverTitle className='sr-only'>`. Both routes work through the existing
ranking; no new API.

### DD-4 — Phase 1 does not wait for Phase 2

**Decided**: the semantics and structure ship on Radix. The primitive swap is separate work behind
the support floor.

**Rationale**: the fact-check above. The role is a Radix default, not a fixture, so nothing about
DD-1, DD-2 or DD-3 needs anchor positioning.

**Consequence**: this answers `planned.md`'s warning not to build the labelling twice. It is built
once, in Phase 1, on primitive-agnostic hooks that `18` already owns, and Phase 2 changes what is
underneath it without touching the API.

### DD-5 — the support floor rises to Chrome 125 / Firefox 147 / Safari 26

**Decided**: adopt CSS anchor positioning, and raise the floor to reach it. Roughly 90.7% → 84.1% of
global usage; Safari 17.5–25 is dropped.

**Rationale**: this was a product call, not a technical one, and it has been made. Anchor positioning
is Baseline Newly Available — all three engines have shipped it — and it is the only thing standing
between `Popover` and the platform.

**Correction this forces.** The root [README](../../README.md#-browser-support) currently says:

> The floor was set by `@starting-style` … **Nothing uses either any more.** … The floor is therefore
> currently more conservative than the code requires

That stopped being true when `18` built. `@starting-style` is in use via Tailwind's `starting:`
variant:

```ts
// packages/ui-overlays/src/components/Overlay/Overlay.variants.ts:49
`${overlayBackdropVariants()} transition-opacity duration-150 ease-out starting:opacity-0 …`;
```

`transition-behavior: allow-discrete` genuinely is unused. So the floor is exactly what the code
requires, and raising it is a straight trade rather than a correction of over-caution. The README
paragraph is rewritten when Phase 2 builds, not before — claiming a floor the code does not yet need
would be fiction.

### DD-6 — `shift()` is not replicated

**Decided**: accept the loss. `@position-try` candidates cover the real cases; no JS shim.

**Rationale**: floating-ui's `shift()` slides the surface continuously along the cross-axis to keep
it on screen. `position-try-fallbacks` flips between discrete candidates instead — it does not slide.
Reintroducing a measurement loop to recover the last few pixels would cancel the reason for leaving
Radix.

**Consequence**: a wide popover near a viewport edge flips rather than nudges. Enough named
`@position-try` candidates make that acceptable, and keeping popover widths sane is the discipline
that stops it mattering. **This is a real behavioural regression and is recorded as one.**

### DD-7 — the entry animation is a plain opacity fade

**Decided**: fade in and out. No directional slide, no computed transform origin.

**Rationale**: today's animation depends on Radix reporting where it landed — `data-side` and
`--radix-popover-content-transform-origin`. CSS anchor positioning exposes neither. Per
[MDN's `@position-try` reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@position-try),
the allowed descriptors are `position-anchor`, `position-area`, inset, margin, sizing and
`align-self` / `justify-self` only — `transform` and `transform-origin` are not permitted — and no
selector exposes which fallback is currently applied.

**Alternative considered**: read the resolved position in JS on `toggle` and set `data-side`
ourselves. Rejected for the same reason as DD-6 — it rebuilds the measurement loop the swap deletes.

**Consequence**: the whole `data-[side=…]:slide-in-from-…` class string at `PopoverContent.tsx:26`
goes. Simple first; it can get cleverer later if anyone misses it.

### DD-8 — anchoring is an explicit `anchor-name`, generated per instance

**Decided**: `anchor-name` on the trigger, `position-anchor` on the content. A caller may supply the
name; otherwise it is generated.

**Rationale**: `popovertarget` gives an implicit anchor for free, but it also makes the trigger the
thing that owns opening. `Select` does not work that way — its open state lives in Command's context:

```tsx
// packages/ui-command/src/components/Command/components/CommandProvider.tsx:76
<Popover open={open} onOpenChange={setOpen}>
```

**Consequence**: generation mirrors what the library already does for ids — caller value wins,
`React.useId()` is the fallback, as in `useRegisteredOverlayId` and `Field`. `useId()` returns
`«r0»`, which is not a valid `<dashed-ident>`, so it is sanitised to `--popover-r0` and injected as
an inline style on both nodes.

**Consequence**: a duplicate _explicit_ name warns, in the same `console.warn` style as
`useOverlayLabelling`. Multiple popovers on a page is the normal case; two sharing an ident anchor to
whichever element the CSS resolves first, which fails silently and looks like a positioning bug.

**Consequence**: `PopoverAnchor` — today a no-op wrapper with no call sites — becomes the part that
carries `anchor-name` when the anchor is not the trigger, and finally earns its place.

### DD-9 — `useOverlayContainer` survives, and `18`'s containment tests are replaced

**Decided**: the DD-6 container plumbing from `18` stays in the codebase, and the six containment
tests are rewritten rather than deleted.

**Rationale**: `DropdownMenu` and `HoverCard` are still Radix and still portal to `document.body`, so
they still need the dialog node handed to them. Only `Popover` stops needing it — a native popover is
already in the top layer.

**Consequence**: `18`'s tests assert the popover is a DOM _descendant_ of the `<dialog>`
([DD-6](../18-overlay-api/discovery.md)). A native popover is a top-layer sibling, so containment
stops being the correct assertion. What replaces it — paint order and hit-testing — is the spec's to
define, and it must not simply be dropped: the failure it guards against renders and reads correctly
while being unclickable.

## What the platform gives us

`popover` is a **global attribute**, not an element. There is no `<popover>` tag; the `<popup>`
element was proposed in 2021 and withdrawn precisely because an element would have implied a role.
`18`'s DD-2 already records this, and it is the same reasoning behind DD-1 and DD-2 above.

| Behaviour                                             | Native mechanism                                      | What it replaces                             |
| ----------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------- |
| Top layer; escapes `overflow` and ancestor transforms | `popover="auto"`                                      | Radix `Portal`, `z-50`, and DD-6's container |
| Light dismiss on outside click                        | `popover="auto"`                                      | `DismissableLayer`                           |
| Escape to close                                       | `popover="auto"`                                      | `onEscapeKeyDown`                            |
| One popover at a time, nesting exempted               | `popover="auto"`                                      | Radix's layer stack                          |
| Focus returns to the invoker on hide                  | native                                                | `FocusGuards`                                |
| Cancellable close                                     | `beforetoggle` + `preventDefault()`                   | the `onRequestClose` veto                    |
| Open/close notification carrying its source           | `toggle` event                                        | `onOpenChange`                               |
| Imperative control                                    | `showPopover()` / `hidePopover()` / `togglePopover()` | Radix internals                              |
| Styling hooks                                         | `:popover-open`, `::backdrop`                         | `data-[state=open]`                          |

**Every close still routes through `requestClose`.** The browser closing a popover on light dismiss
is the same class of event as the browser closing a `<dialog>` on Escape, and `18` established that
both the veto and the exit animation depend on intercepting it rather than letting it through.

**Focus on open is ours to place.** Native popover updates the tab order but does not move focus, so
`focusInitialElement` is still wanted — it honours an explicit `[autofocus]`, otherwise focuses the
first tabbable descendant, with `preventScroll: true`. A popover containing a form focuses its first
input.

### Radix's middleware, mapped

From `@radix-ui/react-popper@1.2.8`, the stack actually in use:

| Radix / floating-ui                          | Anchor-positioning equivalent                                   | Verdict                               |
| -------------------------------------------- | --------------------------------------------------------------- | ------------------------------------- |
| `flip()`                                     | `position-try-fallbacks: flip-block, flip-inline`               | direct                                |
| `offset({ mainAxis: sideOffset })`           | `margin-*`                                                      | direct                                |
| `size()` → `--radix-popper-anchor-width`     | `anchor-size(width)`                                            | direct                                |
| `size()` → `--radix-popper-anchor-height`    | `anchor-size(height)`                                           | direct                                |
| `size()` → `--radix-popper-available-height` | `position-area` bounds the containing block; `max-height: 100%` | near-direct                           |
| `hide({ strategy: 'referenceHidden' })`      | `position-visibility: anchors-visible`                          | direct; no call site uses it          |
| `avoidCollisions={false}`                    | `position-try-fallbacks: none`                                  | direct                                |
| `autoUpdate()` on scroll and resize          | free — CSS re-resolves live                                     | **a win**: deletes a JS observer loop |
| `collisionPadding={50}`                      | `position-area` plus margins, approximately                     | partial                               |
| `shift({ limiter: limitShift() })`           | none                                                            | DD-6 — accepted loss                  |
| `transformOrigin` middleware                 | none                                                            | DD-7 — designed out                   |
| `arrow()`                                    | n/a                                                             | not exported                          |

## What we take on by owning this

The honest counterweight to "one less dependency". Each of these was Radix's problem and becomes
ours:

- **Collision handling**, minus `shift()` (DD-6). Getting the `@position-try` candidate list right is
  now a design task with no library to fall back on.
- **The anchor lifecycle** — generating idents, keeping them unique, and failing loudly rather than
  silently when they collide (DD-8).
- **A raised support floor** (DD-5), which is a cost paid by the whole library, not just `Popover`.
- **The positioning tests.** Nothing upstream covers flipping any more; it has to be asserted
  geometrically here.

`@radix-ui/react-popover` leaves `ui-overlays`. `@radix-ui/react-dropdown-menu` and
`@radix-ui/react-hover-card` stay, so this is not "Radix out" the way `18` was.

## Constraints

- **Dropping Radix deletes the public prop surface.** Every interface in `Popover.types.ts` derives
  from `React.ComponentProps<typeof PopoverPrimitive.*>`. The props have to be hand-written.
- **Two call sites consume Radix CSS variables**: `--radix-popover-trigger-width` at
  `SelectInterface.tsx:12`, and `--radix-popover-content-transform-origin` at
  `PopoverContent.tsx:26`.
- **`DateRangePicker` is the only call site touching positioning props** —
  `align='start' side='bottom' sideOffset={8} collisionPadding={50} avoidCollisions={false}`.
  `collisionPadding` has no clean equivalent.
- **`ui-overlays` has zero `.spec.ts` files.** Unit-testing the popover state machine establishes
  that pattern in the package rather than following one.
- **Consumer-facing docs go to Storybook, not here.** Per the repo's documentation conventions, a
  `Popover.mdx` covers what callers must know — the anchor-name contract, the `side` / `align`
  mapping, the role table. Implementation reasoning and rejected alternatives stay in this
  deliverable.

## Open Questions

- **Which element carries the `popover` attribute.** `popover` is global, so the host is a choice:
  always a neutral `<div>`, or polymorphic so `Select`'s listbox hosts the attribute directly and the
  wrapper disappears. The tidier answer is the second — `aria-controls` would then point at the same
  node that light-dismisses. Blocked on checking that `cmdk`'s virtualisation does not assume a
  scroll container in that position, and that the positioned box can also be the scroll container.
- **Whether `beforetoggle` is dispatched for synthetic events.** `18` found that Chromium's
  `CloseWatcher` ignores untrusted input, so no `cancel` event fires and Escape was untestable
  without a second `onKeyDown` path (`useDialogElement.ts:124-133`). If `beforetoggle` behaves the
  same way, the same workaround is needed. **This must be verified in the test environment before the
  spec's close-routing criteria are believed.**
- **Whether `collisionPadding` survives as a prop** or is dropped with `DateRangePicker` adjusted.

## Success Criteria

1. No popover in the library carries `role="dialog"`, and no story disables `aria-dialog-name`.
2. A popover with a title is announced with that title; one without is announced as its contents.
3. `Select`'s trigger and its popup agree — `aria-haspopup='listbox'` resolves to a real listbox
   reached by `aria-controls`.
4. `Popover` appears in Storybook, with stories covering title, description, close routing and focus
   placement.
5. Opening a popover places focus on its first tabbable descendant, or an explicit `[autofocus]`.
6. Every close route passes through `onRequestClose`, and refusing one leaves the popover genuinely
   open rather than visually open and internally closed.
7. Phase 2: `Select` still sizes to its trigger, both date pickers still flip near a viewport edge,
   and all four call sites still work inside a modal — the DD-9 replacement for `18`'s containment
   tests.
8. Phase 2: no `@radix-ui/react-popover` import remains in `packages/`.

## Related

- [`spec.md`](spec.md) — requirements and acceptance criteria.
- [`18-overlay-api`](../18-overlay-api/discovery.md) — the native `<dialog>` swap this follows, and
  the hooks it reuses.
- [`17-command-list-nesting`](../17-command-list-nesting/plan.md#the-a11y-gate-and-what-it-surfaced)
  — where the nine failures were suppressed.
