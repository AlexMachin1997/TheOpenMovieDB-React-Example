# Discovery: the native `<dialog>` element

The primitive half of [`18`](spec.md). Promoted from `planned.md`, which parked the question as "not
yet decided" and asked for exactly this pass, then run on 2026-08-23 while grilling this
deliverable's spec.

**It was briefly a separate deliverable and was merged back in on 2026-08-24.** The reason is
recorded under [Why this is one deliverable](#why-this-is-one-deliverable): three of the API
decisions in [CONTEXT.md](CONTEXT.md) turn out to be unbuildable on Radix, so the two halves are not
independent.

## Problem Statement

`Dialog` and `Sheet` are built on `@radix-ui/react-dialog`, which renders a `div` annotated with
ARIA rather than the `<dialog>` element the platform provides. The library's own convention is to
prefer the semantic element — `accessibility-standards` §1, _"Always reach for the native HTML
element before inventing a custom one with ARIA"_ — and these components do not follow it.

**This is a convention violation, not a defect.** No reported bug, failing assistive-technology
behaviour or user complaint prompted it. That framing matters for how the work is justified and
sized: the payoff is consistency with a stated principle, plus the behaviours listed below — not a
fix for something broken.

## Context

- **Affected components**: `Dialog` and `Sheet` in `@repo/ui-overlays`, plus `CommandDialog` in
  `@repo/ui-command`, which composes them.
- **Who is affected**: the library's own maintainers, primarily. End users see no difference in the
  accessibility tree (see the fact-check below).
- **Current behaviour**: `OverlaySurface` composes Radix's Portal, Overlay and Content —
  [`OverlaySurface.tsx:34`](../../packages/ui-overlays/src/components/Overlay/OverlaySurface.tsx#L34).

### Fact-check: what Radix actually renders

Verified against `@radix-ui/react-dialog@1.1.15` as installed, not from memory.

`Dialog.Content` renders a `div` carrying `role="dialog"`, `id`, `aria-labelledby` and
`aria-describedby`. It does **not** set `aria-modal`; instead it calls `hideOthers()` from
`aria-hidden` to mark every sibling `aria-hidden` while open — a more reliable approach than
`aria-modal`, which has known assistive-technology bugs.

**Consequence: the accessibility tree is already correct.** A screen reader encounters a dialog with
a name, a description and a genuinely inert background. Moving to `<dialog>` + `showModal()`
produces substantially the same tree. The real differences are platform behaviours:

| Gained from native                                                    | Not gained                                                                    |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Top-layer stacking (nesting and z-index fixed structurally)           | An accessible name — still hand-wired. That is this deliverable's other half  |
| `::backdrop`                                                          | Body scroll lock — native leaves the page behind scrollable                   |
| Browser-enforced inertness                                            | Removal of the dependency — `cmdk` keeps `@radix-ui/react-dialog` in the tree |
| Esc-to-close without a library                                        | Backdrop dismissal — see Constraints                                          |
| A **cancelable** `cancel` event, which makes a guarded close possible |                                                                               |
| `<form method="dialog">` integration                                  |                                                                               |

## Decisions taken during discovery

### DD-1 — Animations may differ; they are being rewritten in CSS anyway

Native `<dialog>` has no `data-state` attribute, so the entire animation layer —
`data-[state=open]:animate-in`, all four Sheet slide directions, Dialog's zoom and fade — moves to
`@starting-style`, `transition-behavior: allow-discrete` and `overlay` transitions.

**Decided**: an exact visual match is _not_ required. Hand-rolled CSS is expected and accepted. The
target is "as close as possible" — a fade in and out at minimum — not pixel and timing parity.

**Consequence**: the spec's original AC8, "appearance and animation unchanged including every Sheet
side", cannot survive and is replaced by success criterion 7 below.

### DD-2 — `Popover` is out of this deliverable entirely

**Decided**: `Popover` neither moves to a native primitive nor gains the new props. Both were
considered and both are now deferred to a separate piece of work, listed under
[Planned](../planned.md#popover-semantics). Mixing them in confuses two genuinely different
concepts: a modal content surface and an anchored non-modal one.

**Two corrections to reasoning offered along the way**, kept because they are the reasons the
deferral is right rather than merely convenient:

- The HTML Popover API is an **attribute** (`popover` / `popovertarget`), not an element. It grants
  top layer and light dismiss but **no role**, so it is not more semantic than what exists, and
  anchoring it needs CSS anchor positioning — Chrome 125, Firefox 147, Safari 26, below the support
  floor.
- Radix's `PopoverContent` renders `role="dialog"` unconditionally, verified in
  `@radix-ui/react-popover@1.1.15` — arguably _over_-semantic for a popover, and the source of the
  nine `aria-dialog-name` failures
  [`17`](../17-command-list-nesting/plan.md#the-a11y-gate-and-what-it-surfaced) suppressed.

**DD-6 below is not an exception to this.** It changes where a popover _portals to_ when it happens
to be inside a modal. That is a consequence of the dialog swap, not a change to Popover's API or
semantics, and without it the modal overlays ship broken.

### DD-3 — `CommandDialog` follows `Dialog` automatically; nothing to rebuild

**Decided**: `CommandDialog` moves with `Dialog`. This costs nothing, because it already composes
`Dialog` / `DialogContent` from `@repo/ui-overlays` —
[`CommandDialog.tsx:30`](../../packages/ui-command/src/components/Command/components/CommandDialog.tsx#L30)
— rather than `cmdk`'s `Command.Dialog`. It inherits whatever the primitive becomes.

**Two stale claims in `planned.md` corrected by this.** It stated that _"`cmdk`'s own
`Command.Dialog` and our `CommandDialog` both use it"_; ours has not since
[`14`](../14-component-consolidation/plan.md). And
[`ui-command/package.json:28`](../../packages/ui-command/package.json#L28) still declares
`@radix-ui/react-dialog` as a direct dependency that **nothing in the package imports** — dead
weight, removed as part of this deliverable.

The conclusion that the dependency does not leave still holds, but transitively: `cmdk` depends on
`@radix-ui/react-dialog` itself.

### DD-4 — Stacking is the win worth having, and it is genuinely free

Multiple modal dialogs opened with `showModal()` stack in call order in the top layer, each with its
own `::backdrop`, and Escape closes the topmost. No depth-tracking context, no `z-index` arithmetic.
This is the clearest thing native buys that Radix does not, and it is what makes the guarded-close
flow in [ADR-8](CONTEXT.md) work: a confirmation dialog stacks cleanly on top of the sheet it is
guarding.

**Sharp edge**: `showModal()` on an already-open dialog throws `InvalidStateError`, so the bridge
from a declarative `open` prop must be idempotent — check `dialog.open` before calling.

### DD-5 — The page behind a modal is locked; only the dialog's own content scrolls

**Decided**: whenever a modal is open, the background does not move at all. Native `<dialog>` does
not do this — it makes the background inert to interaction but leaves it scrollable — so the library
owns it.

**This does not have to be written.** Radix gets the behaviour from
[`react-remove-scroll`](https://www.npmjs.com/package/react-remove-scroll) (`^2.6.3`, a declared
dependency of `@radix-ui/react-dialog`), which is a standalone package. Depending on it directly
preserves the current behaviour exactly, including the scrollbar-width compensation that stops the
page shifting sideways when the lock engages — the detail most hand-rolled `overflow: hidden` locks
get wrong.

## The top-layer occlusion problem

**The strongest argument against the swap, and the reason DD-6 is mandatory rather than optional.**

The top layer is not a high `z-index`; it is a separate painting layer above all normal content.
Once `Dialog` and `Sheet` open via `showModal()`, anything portaled to `document.body` renders
_behind_ them, and no `z-index` can fix it.

That is not hypothetical, because four form controls sit on `Popover`, which portals to the body:

- [`SelectTrigger.tsx`](../../packages/ui-forms/src/components/Selects/components/SelectTrigger.tsx) and [`SelectInterface.tsx`](../../packages/ui-forms/src/components/Selects/components/SelectInterface.tsx) — `Select` and `MultiSelect`
- [`SingleDatePicker.tsx`](../../packages/ui-forms/src/components/DatePickers/SingleDatePicker/SingleDatePicker.tsx)
- [`DateRangePicker.tsx`](../../packages/ui-forms/src/components/DatePickers/DateRangePicker/DateRangePicker.tsx)

A form is the canonical contents of a Sheet or Dialog, and these are form controls. "Pick a country,
pick a date, inside an edit sheet" would break.

**Not broken today**: no current story nests a Radix overlay inside a Dialog or Sheet — the closest
is a native `<select>` at
[`Sheet.stories.tsx:481`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L481). It
is a forward risk introduced by the swap, not an existing defect.

**It is worse than occlusion.** `showModal()` makes everything outside the dialog _inert_, so a
popover portaled to `document.body` while a native modal is open is not merely painted behind it —
it is unclickable and unreachable by keyboard. Anchored controls would not work inside a modal at
all, not just look wrong.

### DD-6 — Anchored overlays portal into the dialog element

**Decided**: a `Popover` opened inside a modal receives the `<dialog>` node as its portal
`container`, so its content is a descendant of the dialog, inside the top layer and inside the inert
boundary.

**Rationale**: it neither expands scope nor bets on browser support, and the dialog-element context
it needs is something the rewrite has to build anyway. It is not optional — without it, `Select`,
`MultiSelect` and the date pickers are non-functional inside a modal.

**Consequences**: `PopoverContent` reads a dialog context and falls back to `document.body` when
there is none. Clipping becomes a live concern — a surface with `overflow-hidden` (`CommandDialog`
sets it) will crop a popover that used to escape to the body.

**Alternative considered**: moving anchored overlays onto the `popover` attribute so they enter the
top layer too — rejected, since CSS anchor positioning only reaches Firefox 147 / Safari 26 and it
pulls four more components into scope. `DropdownMenu` and `HoverCard` are excluded from this
analysis entirely; they are separate component sets with their own questions.

### DD-7 — Every `Sheet` is modal

**Decided**: `Sheet` always opens with `showModal()`. There is no non-modal or persistent-panel
mode; a sheet always sits above the page content with a backdrop, on all four sides.

**Consequence**: `Sheet` gets the full benefit of the top layer — stacking, inertness, Escape — and
never needs the `show()` path, which would provide none of them.

### DD-9 — animations stay on `data-state`; the close is delayed instead (2026-08-24, during build)

**Decided while implementing**, and it reverses the mechanism DD-1 assumed rather than its decision.

DD-1 expected the whole animation layer to move to `@starting-style`,
`transition-behavior: allow-discrete` and `overlay`. It does not need to. Because the library owns
the element it keeps emitting `data-state="open"` and `data-state="closed"` itself, so every class
in `Overlay.variants.ts` survives unchanged. On close it sets `data-state="closed"`, waits for the
animation to finish, and only then calls `dialog.close()`.

**Consequence — the `overlay` question below is moot.** The element is genuinely still open for the
whole exit, so it never leaves the top layer, and Firefox and Safari get the same exit as Chrome.
Nothing in the tree uses `@starting-style`, `allow-discrete` or `overlay`.

**Sharp edge found by building it.** A hidden or throttled page freezes CSS animations at
`currentTime: 0`, so `animation.finished` never resolves and a fixed fallback becomes the _normal_
close path rather than the exceptional one. Measured in a background tab: two exit animations of
150ms and 200ms, both still `running` at 800ms. The wait is therefore bounded by the animations'
own `endTime` plus 50ms, not by a flat number.

## Browser support

No support floor existed when this pass started, which was itself a finding — several decisions here
could not be made without one. **Settled during this discovery and recorded in the
[root README](../../README.md#-browser-support)**: Chrome/Edge 117, Firefox 129, Safari 17.5, i.e.
Baseline Newly Available. It lives there rather than here because it governs every package, not this
deliverable.

Baseline _Widely_ Available was rejected: `@starting-style` does not reach that tier until early
2027, so it would block this deliverable for no practical gain.

Measured against caniuse, 2026-08-23:

| Feature                               | Chrome / Edge | Firefox                       | Safari                       | Global    |
| ------------------------------------- | ------------- | ----------------------------- | ---------------------------- | --------- |
| `@starting-style`                     | 117           | 129                           | 17.5                         | 90.7%     |
| `transition-behavior: allow-discrete` | 117           | 129                           | 17.4                         | 90.7%     |
| **`overlay`**                         | 117           | **not supported (as of 157)** | **not supported (as of 27)** | **73.5%** |
| CSS anchor positioning                | 125           | 147                           | 26.0                         | 84.1%     |

**`overlay` is the outlier.** It is the property that keeps a closing dialog in the top layer for the
duration of its exit transition, and it appears in every published `<dialog>` exit-animation recipe.
It is Chromium-only, and is therefore treated as progressive enhancement: applied anyway, with
Chromium getting the cleaner exit.

### DD-8 — No browser spike; verification happens through the built components

**Decided**: the `overlay` question is not settled up front. Dialog and Sheet get built, and
cross-browser behaviour is checked afterwards through Storybook interaction tests.

**Rationale**: DD-1 already accepts that animations may differ, so a degraded exit transition in
Firefox and Safari is a tolerable outcome rather than a blocker.

**Limitation to plan around**: `play()` functions assert state, not appearance. They can prove a
dialog opens, traps focus, stacks and closes in whichever browsers the suite runs in; they cannot
prove a fade looks right. Confirming the animation is a human check, once.

## `alertdialog` — a gap this discovery surfaced

**There is no `AlertDialog` component.** `ui-overlays` exports none, and
`@radix-ui/react-alert-dialog` is not a dependency. What exists is a _story_ named `AlertDialog` —
[`Dialog.stories.tsx:242`](../../packages/ui-overlays/src/components/Dialog/Dialog.stories.tsx#L242)
— which is a plain `Dialog` carrying a warning icon and a destructive button. It renders
`role="dialog"`, not `role="alertdialog"`, and is dismissible by Escape, outside click and the `X`.
It is an alert dialog in appearance only, and the name overstates what it is.

An alert dialog is a dialog with a different role and stricter obligations:

- `role="alertdialog"` must be set explicitly; neither `<dialog>` nor Radix supplies it.
- The APG expects a description — the message _is_ the content. This interacts with
  [ADR-3](CONTEXT.md), which makes descriptions optional.
- It should not be dismissible without the user making a choice.

It became [`19`](../19-alert-dialog/spec.md), sequenced after this one:
structurally it is `Dialog` minus the close button with two footer buttons, so under this
deliverable's props it is a thin preset, and built before them it is another seven-element hand
assembly.

## Constraints

- **Two primitives, not one.** After the swap the library has `<dialog>`-based modal overlays and
  Radix-based anchored ones. The "one overlay idiom" goal has to be restated in terms of the public
  API rather than the underlying primitive.
- **State inverts from declarative to imperative.** A controlled `open` prop and Sheet's imperative
  ref must both be bridged to `showModal()` / `close()` through effects — a well-known desync
  source, and the exact bug class [`11`](../11-correctness-bugs/plan.md) already fixed once.
- **The dependency does not leave.** `cmdk` depends on `@radix-ui/react-dialog` itself, so it stays
  in the lockfile even after both direct dependencies go.
- **Backdrop dismissal is not free, and its absence is a silent behaviour change.** Radix closes a
  dialog on outside pointer-down. A native modal `<dialog>` does **not** close when its `::backdrop`
  is clicked — that has to be wired deliberately. Reimplementing it is required to preserve current
  behaviour, and it must route through the same path as Escape and the `X` so that
  [ADR-8](CONTEXT.md)'s veto covers all three.

## Why this is one deliverable

Merged on 2026-08-24, reversing an earlier decision to sequence the primitive swap ahead of the API
change as two deliverables.

The original argument for splitting was that the API survives either primitive, so building it on
Radix first would only cost rework. That was true of the _props_ and stopped being true of the
_behaviour_ once the grilling in [CONTEXT.md](CONTEXT.md) finished. Three decisions there cannot be
built on Radix at all:

- **ADR-8** — vetoing a close requires native's cancelable `cancel` event. Radix's `onOpenChange`
  reports a close and cannot refuse one.
- **ADR-5** — the "no accessible name" warning works by having the compound parts register into the
  overlay's context, which exists only if we own the primitive.
- **ADR-3** — suppressing `aria-describedby` is a Radix-shaped workaround; on native the attribute is
  simply not emitted.

So the API half is not implementable without the primitive half, and the intermediate state — native
primitive, old seven-element API — is one nobody would ship or review. The isolation that two
deliverables bought is preserved instead by two **phases** in the plan: primitive first, API second.

`Popover` was removed from scope at the same time and for the opposite reason — it is genuinely
independent of both halves, and keeping it in blurred two different concepts.

## Open Questions

Resolved during this pass: `CommandDialog`'s fate (DD-3), Sheet modality (DD-7), scroll-lock
ownership (DD-5), the escape from top-layer occlusion (DD-6), the browser-support floor, and the
sequencing question above.

Closed by building it:

- **Does `overlay` being Chromium-only visibly break exit animations?** Moot. [DD-9](#dd-9--animations-stay-on-data-state-the-close-is-delayed-instead-2026-08-24-during-build)
  does not use `overlay`, so every engine gets the same exit.
- **Clipping under DD-6.** It does not happen. The `<dialog>` element is the backdrop and the panel
  is its child, so a caller's `overflow-hidden` — `CommandDialog`'s, for instance — lands on the
  panel while anchored content parents to the dialog _around_ it.

Still open:

- **`closedby` attribute support** — relevant to light-dismiss control, unverified. Not needed by
  anything built so far.
- **Touch scrolling on iOS Safari.** The scroll lock is hand-written rather than taken from
  `react-remove-scroll`, and `overflow: hidden` on `body` has historically not been enough there.
  Nothing in the test suite can tell us; it needs a phone.

## Success Criteria

These cover the primitive half. The API half's criteria are the acceptance criteria in
[`spec.md`](spec.md).

1. `Dialog` and `Sheet` render a real `<dialog>` element, opened with `showModal()`, with no
   `@radix-ui/react-dialog` import or direct dependency remaining in `@repo/ui-overlays` or
   `@repo/ui-command`.
2. The declarative `open` prop and `Sheet`'s imperative ref both drive `showModal()` / `close()`
   without desync, in controlled and uncontrolled modes, and without throwing `InvalidStateError` on
   a repeat open.
3. Two stacked modals order correctly with no `z-index` involvement, and Escape closes the topmost
   only.
4. A `Select`, `MultiSelect`, `SingleDatePicker` and `DateRangePicker` each open, position and
   respond to input while inside a modal — the DD-6 acceptance test.
5. The page behind an open modal does not scroll and does not shift sideways when the lock engages
   (DD-5).
6. Backdrop click still dismisses, and routes through the same path as Escape and the `X`.
7. Entry and exit animations are present and close to today's, per DD-1 — verified by eye once,
   since `play()` cannot assert appearance.

## Related

- [`spec.md`](spec.md) — the API half, and [`CONTEXT.md`](CONTEXT.md) — the eight ADRs behind it.
- [Alert dialog](../19-alert-dialog/spec.md) — follows this deliverable.
- [Popover semantics](../planned.md#popover-semantics) — deferred out of this deliverable.
