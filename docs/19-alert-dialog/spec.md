# Feature: Alert dialog

## Problem

**The library ships an alert dialog that is not one.**
[`Dialog.stories.tsx:331`](../../packages/ui-overlays/src/components/Dialog/Dialog.stories.tsx) is
named `AlertDialog` and is a plain `Dialog` with a warning emoji in its title. It carries
`role="dialog"`, shows the `X`, dismisses on Escape and on a backdrop click, and its "Delete
Permanently" button is not wrapped in `DialogClose`, so pressing it does nothing. It looks like a
confirmation and behaves like a notice. `role="alertdialog"` is set nowhere in the repo.

**The same assembly is written out five times.** `Dialog`'s `ConfirmationDialog` (`:144`) and
`AlertDialog` (`:331`); `Sheet`'s `Confirmation` (`Sheet.stories.tsx:645`),
`WithConfirmationDialog` (`:1060`) and `WithConfirmationDialogRef` (`:1156`). The last two open a
second, nested `Dialog` as the confirmation, each with three handlers and a latch. A browser modal
is still in there too — `Sheet.stories.tsx:1035` calls `window.confirm()` inside a `SheetClose`
handler.

**Nothing declares how an overlay may be dismissed.** [`18`](../18-overlay-api/spec.md) shipped
`onRequestClose`, which is a veto callback rather than a policy. Refusing a backdrop click means
writing the same source filter by hand at every call site, and `Sheet`'s `Confirmation` needs four
pieces of state, a reset-on-open and a route-to-label map to express a rule that is the same every
time.

**Three destructive actions have no confirmation at all.** `DropdownMenuItem variant='destructive'`
renders "Delete Project" at `DropdownMenu.stories.tsx:256`, `:687` and `:752`, and none of them asks
first.

## What the platform and the guidelines already settle

Three of the decisions below rest on this rather than on preference, so it is recorded here.

- A native `<dialog>` opened with `showModal()` **defaults to `closedby="closerequest"`** — Escape
  closes it, a backdrop click does not. `18` added backdrop dismissal by hand
  (`useDialogElement.ts:139`), so the library opted into light dismiss on top of a platform that
  omits it deliberately.
- `closedby` has three values, not two: `any` (backdrop and Escape), `closerequest` (Escape only),
  `none` (neither).
- The [APG modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) lists
  "Escape: Closes the dialog" as a required keyboard interaction, and says nothing at all about
  backdrop clicks.
- The [APG alertdialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) requires
  `aria-describedby` referring to the element holding the message.
- [eBay's confirm-dialog guidance](https://opensource.ebay.com/evo-web/components/confirm-dialog/accessibility):
  pressing Escape must close a confirm dialog, acting as a cancel.

`closedby` itself ships in Chrome and Edge 134 and Firefox 141, and is not yet stable in Safari —
below the library's [support floor](../../README.md#-browser-support). This spec borrows the
vocabulary and backs it with the veto `18` already shipped; the real attribute replaces that
implementation later without changing the API.

## Goals

1. An alert dialog carries the semantics it looks like it has.
2. A confirmation is three elements with props, not seven with a hand-written filter.
3. How an overlay may be dismissed is declared, not reconstructed at each call site.
4. An action that takes time holds its overlay open without the caller wiring state for it.

## Scope

The work has two parts. Both are in scope; sequencing them is the implementation plan's job.

- **The component** — `AlertDialog`, `AlertDialogTrigger` and `AlertDialogContent` in
  `ui-overlays`, following [ADR-1](../18-overlay-api/CONTEXT.md)'s three-element shape. Plus the two
  shared behaviours it depends on, a declared dismissal policy and an awaitable action, which
  `Dialog` and `Sheet` inherit because both live where `requestClose` already does.
- **The footer, and the clean-up** — a typed two-action footer on `DialogContent` and `SheetContent`
  alongside the existing `footer` node, and the removal of four deprecated parts that are still
  exported: `DialogPortal`, `DialogOverlay`, `SheetPortal`, `SheetOverlay`.

## Non-Goals

- A `Sheet` equivalent of the alert dialog. A confirmation is centred and small; a sheet is neither.
- Wiring confirmations onto the three destructive `DropdownMenu` stories. They are evidence that the
  component is wanted, not call sites this deliverable owns.
- Changing what `Dialog` or `Sheet` do today. Every addition here is opt-in, and the defaults are
  chosen so that nothing already built changes behaviour.
- Reworking `onRequestClose`. It stays as the escape hatch underneath the declared policy.
- Adopting the real `closedby` attribute, which is below the support floor.

## Requirements

1. `AlertDialogContent` has `role="alertdialog"` always. It is not caller-supplied and cannot be
   overridden.
2. A title and a description are both required. This departs from
   [ADR-3](../18-overlay-api/CONTEXT.md), which makes a description optional — correct for
   `role="dialog"`, wrong for `role="alertdialog"`, which the APG pattern requires be described.
3. An alert dialog has no close button, and no prop adds one.
4. Every content component accepts a dismissal policy taking the three `closedby` values.
   `AlertDialog` is fixed at `closerequest`: a backdrop click is refused, and Escape closes the
   dialog exactly as pressing cancel does. `Dialog` and `Sheet` default to `any`, which is what they
   do today.
5. An alert dialog has exactly two actions. A caller controls their labels, the confirming action's
   visual variant, whether it is disabled, and whether it is pending. A caller does not supply
   arbitrary footer markup — a third button means a `Dialog` was wanted.
6. Either action may return a promise. While it is unsettled the overlay stays open, the acting
   control reports itself busy, and neither action can be triggered again.
7. Focus lands on the cancelling action when an alert dialog opens, so that a reflexive Enter
   cancels rather than destroys.
8. `DialogContent` and `SheetContent` accept the same two-action footer shape as an alternative to
   the `footer` node. Supplying neither renders no footer, unchanged from today.
9. The four deprecated parts are no longer exported from the package.

## Departures from decisions already recorded

Each of these contradicts something already written down. The reason is stated here so that a reader
finding the conflict does not have to reconstruct it.

- **Escape closes an alert dialog.** The planned entry that became this deliverable asked for "an
  explicit choice before it can be dismissed". Escape is deliberate, has a visible cancel behind it,
  and is the route the APG mandates. A backdrop click is the accidental one worth refusing.
- **A required description**, against ADR-3, because the APG `alertdialog` pattern requires one.
- **A declared dismissal policy**, against the `dismissible` boolean the planned entry sketched.
  Three states occur in practice and a boolean collapses them, and it hides which route it governs —
  an objection that entry raised against its own proposal.
- **A typed footer**, against [ADR-7](../18-overlay-api/CONTEXT.md), which made `footer` a plain node
  and rejected an object form. Rendering nothing by default is what makes the addition safe.

One consequence worth naming: because only the backdrop is refused, this deliverable leans on
[ADR-8](../18-overlay-api/CONTEXT.md)'s veto more narrowly than the planned entry assumed. The veto
is still what makes the behaviour possible, but it governs one route rather than all of them.

## Edge Cases & Error Handling

- **A required description can still be defeated.** `description={null}` or an empty string satisfies
  a required prop and produces an `aria-describedby` pointing at nothing, which ADR-3 argues is worse
  than absent.
- **An alert dialog opened from inside a Sheet.** The `WithConfirmationDialog` flows at
  `Sheet.stories.tsx:1060` and `:1156` are the shape, and nested `<dialog>` elements already need
  care — `18` found that React collects `onCancel` and `onClose` from every ancestor even though the
  DOM events do not bubble.
- **A confirming action gated behind a type-to-confirm input**, as `Sheet.stories.tsx:561` does. The
  action is disabled until the phrase matches, and the dialog must stay usable throughout.
- **A close request arriving while an action is pending.** Escape during an unsettled promise must
  not close the overlay out from under the action, and must not queue a close for when it settles.
- **A pending action when the overlay is closed programmatically.** `ref.close()` and setting
  `open={false}` bypass `onRequestClose` entirely, so a caller can close an overlay mid-action.
- **A dismissal policy of `none` with no visible control** traps the user. Nothing prevents it, and
  the documentation has to say so.

## Acceptance Criteria

A Storybook `play()` verifies each one, which is how components are tested here.

- **AC1** — An open alert dialog is reported as `alertdialog` in the accessibility tree, with both an
  accessible name and an accessible description, asserted against the tree rather than the markup.
- **AC2** — An alert dialog renders no close button, and there is no prop that produces one.
- **AC3** — Escape closes an alert dialog and has the same effect as pressing cancel; a backdrop
  click does not close it. The refusal asserts the DOM `dialog.open` property as well as
  `data-state`, because visually open but internally closed is the failure that assertion exists to
  catch.
- **AC4** — Each of the three dismissal-policy values behaves as specified on a plain `Dialog`.
- **AC5** — A `Dialog` and a `Sheet` given no dismissal policy dismiss on both Escape and a backdrop
  click, as they do today.
- **AC6** — Focus is on the cancelling action immediately after an alert dialog opens.
- **AC7** — While a confirming action's promise is unsettled, the overlay stays open, the control
  reports itself busy, and neither action can be triggered again. Covered for a resolving promise
  and for one that settles after a close is attempted.
- **AC8** — `DialogContent` and `SheetContent` accept the two-action footer and produce the same
  structure the `footer` node produces today.
- **AC9** — A `Dialog` and a `Sheet` with neither footer prop render no footer element.
- **AC10** — The four deprecated parts are absent from the package's exports, and the build passes
  without them.
- **AC11** — The story at `Dialog.stories.tsx:331` is gone, and `ConfirmationDialog` (`:144`) and
  `Sheet`'s `Confirmation` (`:645`) have moved into the alert dialog's own stories. `Sheet`'s veto
  stays covered by `Dialog`'s `GuardedClose`, so the move leaves nothing untested.
- **AC12** — Every new story runs under `a11y: { test: 'error' }` and opens its overlay inside
  `play()`. A closed `<dialog>` is `display: none` and axe skips what it cannot see, which is how 25
  of 27 overlay story gates came to be decorative before `18`.
- **AC13** — A caller-supplied `onClick` or `onKeyDown` on a content component reaches the element
  rather than being silently replaced.

## Open Questions

- **What a rejected action promise does.** Stay open and surface the error, or close and leave it to
  the caller. Neither is obviously right, and the answer decides whether the component needs an error
  slot.
- **Whether the awaitable contract reaches `onRequestClose` or only the two actions.**
  `preventDefault()` is synchronous, so a handler that both vetoes and returns a promise has no
  settled meaning. That contradiction is the cost of putting the behaviour in the shared path rather
  than in the component, and it has to be answered before the shared version is built.
- **Whether removing the four deprecated exports needs a deprecation cycle.** There is one consuming
  app and it imports none of them, so a clean break is available — but the packages are structured as
  though they might be published.
- **Whether `Dialog` and `Sheet` should eventually default to `closerequest`** and match the
  platform. Recorded because the research raised it, not proposed here: it would change behaviour at
  every existing call site.
