# Feature: Overlay dismissal & actions

## Problem

**Nothing declares how an overlay may be dismissed.**
[`18`](../18-overlay-api/spec.md) shipped `onRequestClose`, which is a veto callback rather than a
policy. Refusing a backdrop click means writing the same source filter by hand at every call site:

```tsx
onRequestClose={(event) => {
  if (event.source === 'backdrop') event.preventDefault();
}}
```

`ConfirmationSheet` at
[`Sheet.stories.tsx:561`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L561)
shows the cost at full size. It holds four pieces of `useState` — `open`, `confirmation`,
`refusedRoute`, `deleted` — plus a reset-on-open and a route-to-label map, to express a rule that is
the same every time: ambient routes are refused, routes with a visible control behind them are let
through.

**A long-running action has nowhere to live.** An overlay whose confirm button starts a request has
to hold itself open until that request settles, keep the control busy, and refuse a second press.
Today every caller wires that by hand, and the two nested-dialog flows in `Sheet.stories.tsx`
([`:1149`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L1149) and
[`:1231`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L1231)) each carry three
handlers and a latch to do it.

**Four deprecated parts are still exported.** `DialogPortal`, `DialogOverlay`, `SheetPortal` and
`SheetOverlay` survive the `<dialog>` swap as no-op compatibility shims. They appear in
`packages/ui-overlays` and in docs, and in no file under `apps/` _(verified 2026-11-04)_.

## Scope

**This is the shared half of what was originally one deliverable.**
[`19`](../19-alert-dialog/spec.md) is the `AlertDialog` component, and it ships first — it is the only
component that _requires_ these behaviours, and it builds them for itself against the API `18`
already shipped. This deliverable generalises them so `Dialog` and `Sheet` _gain_ them.

**Included** — a declared dismissal policy, an awaitable action in the shared path, a typed
two-action footer on `DialogContent` and `SheetContent` alongside the existing `footer` node, and the
removal of the four deprecated exports.

**Where the shared code is.**
[`OverlaySurface`](../../packages/ui-overlays/src/components/Overlay/OverlaySurface.tsx) and
[`useDialogElement`](../../packages/ui-overlays/src/components/Overlay/hooks/useDialogElement.ts),
which `Dialog` and `Sheet` both reach through `OverlaySurface:65`.

**`Popover` is not in scope, and does not inherit any of this.** It has its own
[`usePopoverElement`](../../packages/ui-overlays/src/components/Popover/hooks/usePopoverElement.ts)
from [`20`](../20-popover-semantics/plan.md) and does not go through `useDialogElement`. Per
[ADR-8](../18-overlay-api/CONTEXT.md) it cannot veto a close at all, so a dismissal policy has
nothing to attach to there. Requirement 1 below says "every modal content component" for that reason.

**Independently deliverable** — yes, once `19` has shipped.

## What the platform already settles

- A native `<dialog>` opened with `showModal()` **defaults to `closedby="closerequest"`** — Escape
  closes it, a backdrop click does not. `18` added backdrop dismissal by hand
  ([`useDialogElement.ts:139`](../../packages/ui-overlays/src/components/Overlay/hooks/useDialogElement.ts#L139)),
  so the library opted into light dismiss on top of a platform that omits it deliberately.
- `closedby` has three values, not two: `any` (backdrop and Escape), `closerequest` (Escape only),
  `none` (neither).
- The [APG modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) lists
  "Escape: Closes the dialog" as a required keyboard interaction, and says nothing at all about
  backdrop clicks.

`closedby` itself ships in Chrome and Edge 134 and Firefox 141, and is not yet stable in Safari —
below the library's [support floor](../../README.md#-browser-support). This spec borrows the
vocabulary and backs it with the veto `18` already shipped; the real attribute replaces that
implementation later without changing the API.

## Non-Goals

- **The `AlertDialog` component.** That is [`19`](../19-alert-dialog/spec.md).
- **Changing what `Dialog` or `Sheet` do today.** Every addition here is opt-in, and the defaults are
  chosen so that nothing already built changes behaviour.
- **Reworking `onRequestClose`.** It stays as the escape hatch underneath the declared policy.
- **Extending any of this to `Popover`.** See Scope.
- **Adopting the real `closedby` attribute**, which is below the support floor.
- **Migrating the existing hand-written vetoes.** `Dialog`'s `GuardedClose` and `Sheet`'s
  `ConfirmationSheet` demonstrate `onRequestClose` deliberately and keep doing so; they are the
  escape hatch's documentation.

## Requirements

1. Every modal content component — `DialogContent` and `SheetContent` — accepts a dismissal policy
   taking the three `closedby` values. Both default to `any`, which is what they do today.
2. A policy of `closerequest` refuses a backdrop click and allows Escape. A policy of `none` refuses
   both. Neither affects a close button, a close part, or a programmatic close through the ref.
3. `onRequestClose` still runs for every route the policy allows, and can still veto it. The policy
   is the declaration; the veto is the escape hatch underneath.
4. `DialogContent` and `SheetContent` accept the same two-action footer shape `19` built, as an
   alternative to the `footer` node. Supplying neither renders no footer, unchanged from today.
   Supplying both is not expressible.
5. Either action may return a promise. While it is unsettled the overlay stays open, the acting
   control reports itself busy, and neither action can be triggered again.
6. A rejected promise behaves as `19` settled it, and the two components do not diverge.
7. The four deprecated parts are no longer exported from the package.

## Departures from decisions already recorded

- **A declared dismissal policy**, against the `dismissible` boolean the planned entry sketched.
  Three states occur in practice and a boolean collapses them, and it hides which route it governs —
  an objection that entry raised against its own proposal.
- **A typed footer**, against [ADR-7](../18-overlay-api/CONTEXT.md), which made `footer` a plain node
  and rejected an object form. Rendering nothing by default is what makes the addition safe, and
  requirement 4 keeps the plain node rather than replacing it.

## Edge Cases & Error Handling

- **A dismissal policy of `none` with no visible control** traps the user. Nothing prevents it, and
  the documentation has to say so.
- **A policy change while the overlay is open.** A caller flipping from `any` to `none` mid-flow must
  take effect on the next close request, not be captured when the overlay opened.
- **A close request arriving while an action is pending.** Escape during an unsettled promise must
  not close the overlay out from under the action, and must not queue a close for when it settles.
- **A pending action when the overlay is closed programmatically.** `ref.close()` and setting
  `open={false}` bypass `onRequestClose` entirely, so a caller can close an overlay mid-action.
- **A nested overlay with a different policy from its parent.** `cancel` and `close` do not bubble,
  but React collects handlers from every ancestor; `useDialogElement` guards this with
  `event.target !== event.currentTarget`, and the policy must be read from the overlay the event
  belongs to.
- **Both footer forms supplied.** Made unrepresentable by requirement 4 rather than resolved at
  runtime — CSS cannot arbitrate two footers and a silent winner leaves the other dead.

## Acceptance Criteria

A Storybook `play()` verifies each one, which is how components are tested here.

- **AC1** — Each of the three dismissal-policy values behaves as specified on a plain `Dialog`. The
  refusals assert the DOM `dialog.open` property as well as `data-state`, because visually open but
  internally closed is the failure that assertion exists to catch.
- **AC2** — Each of the three values behaves the same way on a `Sheet`.
- **AC3** — A `Dialog` and a `Sheet` given no dismissal policy dismiss on both Escape and a backdrop
  click, as they do today.
- **AC4** — A policy of `closerequest` or `none` does not affect the close button, a close part, or
  `ref.close()`.
- **AC5** — `onRequestClose` still fires, and can still veto, for every route the policy allows.
- **AC6** — `DialogContent` and `SheetContent` accept the two-action footer and produce the same
  structure the `footer` node produces today.
- **AC7** — A `Dialog` and a `Sheet` with neither footer prop render no footer element.
- **AC8** — Supplying both `footer` and the two-action form fails to compile.
- **AC9** — While an action's promise is unsettled on a `Dialog` and on a `Sheet`, the overlay stays
  open, the control reports itself busy, and neither action can be triggered again. Covered for a
  resolving promise and for one that settles after a close is attempted.
- **AC10** — A rejected promise behaves identically on `AlertDialog`, `Dialog` and `Sheet`.
- **AC11** — The four deprecated parts are absent from the package's exports, and the build passes
  without them.
- **AC12** — Every new story runs under `a11y: { test: 'error' }` and opens its overlay inside
  `play()`. A closed `<dialog>` is `display: none` and axe skips what it cannot see, which is how 25
  of 27 overlay story gates came to be decorative before `18`.

## Open Questions

- **Whether the awaitable contract reaches `onRequestClose` or only the two footer actions.**
  `preventDefault()` is synchronous, so a handler that both vetoes and returns a promise has no
  settled meaning —
  [`useDialogElement.ts:101-107`](../../packages/ui-overlays/src/components/Overlay/hooks/useDialogElement.ts#L101-L107)
  reads `prevented` on the line after the call. The stronger objection is that an awaitable close
  needs somewhere to show busy, and two of the four `OverlayCloseSource` values — `'escape'` and
  `'backdrop'` — have no control behind them. An overlay held open for an indeterminate time with no
  feedback is worse than not offering it.
- **Whether removing the four deprecated exports needs a deprecation cycle.** There is one consuming
  app and it imports none of them, so a clean break is available — but the packages are structured as
  though they might be published.
- **Whether `Dialog` and `Sheet` should eventually default to `closerequest`** and match the
  platform. Recorded because the research raised it, not proposed here: it would change behaviour at
  every existing call site. Requirement 1 keeps `any` precisely so this deliverable does not decide
  it.
