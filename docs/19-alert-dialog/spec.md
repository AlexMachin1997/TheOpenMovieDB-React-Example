# Feature: Alert dialog

## Problem

**The library ships an alert dialog that is not one.**
[`Dialog.stories.tsx:331`](../../packages/ui-overlays/src/components/Dialog/Dialog.stories.tsx#L331)
is named `AlertDialog` and is a plain `Dialog` with a warning emoji in its title. It carries
`role="dialog"`, shows the `X`, dismisses on Escape and on a backdrop click, and its "Delete
Permanently" button is not wrapped in `DialogClose`, so pressing it does nothing. It looks like a
confirmation and behaves like a notice. `role="alertdialog"` is set nowhere in the repo.

**The same assembly is written out five times.** `Dialog`'s `ConfirmationDialog`
([`:144`](../../packages/ui-overlays/src/components/Dialog/Dialog.stories.tsx#L144)) and `AlertDialog`
(`:331`); `Sheet`'s `Confirmation`
([`Sheet.stories.tsx:645`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L645)),
`WithConfirmationDialog` ([`:1149`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L1149))
and `WithConfirmationDialogRef` ([`:1231`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L1231)).
The last two open a second, nested `Dialog` as the confirmation, each with three handlers and a
latch. A browser modal is still in there too —
[`Sheet.stories.tsx:1035`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L1035)
calls `confirm()` inside a `SheetClose` handler.

**Three destructive actions have no confirmation at all.** `DropdownMenuItem variant='destructive'`
renders "Delete Project" at
[`DropdownMenu.stories.tsx:256`](../../packages/ui-overlays/src/components/DropdownMenu/DropdownMenu.stories.tsx#L256),
`:687` and `:752`, and none of them asks first.

## Scope

**This deliverable is the component, and nothing shared.** It was originally specified with two
halves — the component, plus a declared dismissal policy and an awaitable action lifted into the
shared overlay surface that `Dialog` and `Sheet` both use. The shared half is now
[`22`](../22-overlay-dismissal-and-actions/spec.md), and it depends on this one rather than the
other way round.

That direction is deliberate. An audit of
[`OverlaySurface`](../../packages/ui-overlays/src/components/Overlay/OverlaySurface.tsx) and
[`useDialogElement`](../../packages/ui-overlays/src/components/Overlay/hooks/useDialogElement.ts)
found that every semantic requirement below is already expressible against the API
[`18`](../18-overlay-api/plan.md) shipped, with no change to shared code:

| Requirement                      | Existing mechanism                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `role="alertdialog"`             | `IOverlaySurface extends ComponentProps<'dialog'>` and spreads `...props` onto the element, so `role` passes through |
| Required title and description   | `titleId` / `descriptionId` and `useOverlayLabelling` already do the wiring                                          |
| No close button                  | `showCloseButton?: boolean` already exists on `OverlaySurface`                                                       |
| Focus on cancel                  | `focusInitialElement` honours `[autofocus]` before first-tabbable                                                    |
| Backdrop refused, Escape allowed | `OverlayCloseSource` already discriminates `'backdrop'` from `'escape'`, and ADR-8's veto already refuses a route    |

[`18`'s discovery](../18-overlay-api/discovery.md) reached the same conclusion: "structurally it is
`Dialog` minus the close button with two footer buttons, so under this deliverable's props it is a
thin preset."

**Included** — `AlertDialog`, `AlertDialogTrigger` and `AlertDialogContent` in `ui-overlays`,
following [ADR-1](../18-overlay-api/CONTEXT.md)'s three-element shape, with a two-action footer of
their own. Storybook stories and consumer documentation, as every other overlay has.

**Independently deliverable** — yes.

## What the platform and the guidelines already settle

Two requirements below rest on this rather than on preference, so it is recorded here.

- The [APG alertdialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) requires
  `aria-describedby` referring to the element holding the message. The message _is_ the content.
- [eBay's confirm-dialog guidance](https://opensource.ebay.com/evo-web/components/confirm-dialog/accessibility):
  pressing Escape must close a confirm dialog, acting as a cancel.
- A native `<dialog>` opened with `showModal()` closes on Escape and **not** on a backdrop click.
  `18` added backdrop dismissal by hand
  ([`useDialogElement.ts:139`](../../packages/ui-overlays/src/components/Overlay/hooks/useDialogElement.ts#L139)),
  so the library opted into light dismiss on top of a platform that omits it deliberately. This
  component opts back out. The vocabulary for saying so declaratively is `22`'s job; here the
  behaviour is fixed and needs no prop.

## Non-Goals

- **A `Sheet` equivalent.** A confirmation is centred and small; a sheet is neither.
- **A dismissal policy prop.** This component has one behaviour and does not accept an alternative.
  Giving `Dialog` and `Sheet` the choice is [`22`](../22-overlay-dismissal-and-actions/spec.md).
- **A two-action footer on `DialogContent` or `SheetContent`.** Also `22`. The footer built here is
  the one `22` generalises, which is why it ships first.
- **Wiring confirmations onto the three destructive `DropdownMenu` stories.** They are evidence that
  the component is wanted, not call sites this deliverable owns.
- **Changing what `Dialog` or `Sheet` do today.** Nothing here touches either.
- **Reworking `onRequestClose`.** It stays as shipped, and is the mechanism this component uses.
- **Adopting the real `closedby` attribute**, which is below the
  [support floor](../../README.md#-browser-support).

## Requirements

1. `AlertDialogContent` has `role="alertdialog"` always. It is not caller-supplied and cannot be
   overridden.
2. A title and a description are both required. This departs from
   [ADR-3](../18-overlay-api/CONTEXT.md), which makes a description optional — correct for
   `role="dialog"`, wrong for `role="alertdialog"`, which the APG pattern requires be described.
3. An alert dialog has no close button, and no prop adds one.
4. A backdrop click does not close an alert dialog. Escape does, and has the same effect as pressing
   cancel.
5. An alert dialog has exactly two actions. A caller controls their labels, the confirming action's
   visual variant, whether it is disabled, and whether it is pending. A caller does not supply
   arbitrary footer markup — a third button means a `Dialog` was wanted.
6. Either action may return a promise. While it is unsettled the overlay stays open, the acting
   control reports itself busy, and neither action can be triggered again.
7. Focus lands on the cancelling action when an alert dialog opens, so that a reflexive Enter
   cancels rather than destroys.
8. When an action's promise rejects, the overlay stays open and both actions become usable again.
   The component renders nothing about the failure and has no error slot. Reporting it is the
   caller's job, and the documentation shows how for the common cases.

## Departures from decisions already recorded

- **Escape closes an alert dialog.** The planned entry that became this deliverable asked for "an
  explicit choice before it can be dismissed". Escape is deliberate, has a visible cancel behind it,
  and is the route the APG mandates. A backdrop click is the accidental one worth refusing.
- **A required description**, against ADR-3, because the APG `alertdialog` pattern requires one.
- **A typed two-action footer**, against [ADR-7](../18-overlay-api/CONTEXT.md), which made `footer` a
  plain node and rejected an object form. ADR-7 governs `DialogContent` and `SheetContent`, which
  this deliverable does not touch; a component whose defining constraint is "exactly two actions"
  cannot express that through an opaque node.

One consequence worth naming: this deliverable leans on [ADR-8](../18-overlay-api/CONTEXT.md)'s veto
more narrowly than the planned entry assumed. The veto governs one route — the backdrop — rather
than all of them.

## Edge Cases & Error Handling

- **A required description can still be defeated.** `description={null}` or an empty string satisfies
  a required prop and produces an `aria-describedby` pointing at nothing, which ADR-3 argues is worse
  than absent.
- **An alert dialog opened from inside a Sheet.** The `WithConfirmationDialog` flows at
  `Sheet.stories.tsx:1149` and `:1231` are the shape, and nested `<dialog>` elements already need
  care — `18` found that React collects `onCancel` and `onClose` from every ancestor even though the
  DOM events do not bubble. `useDialogElement` guards this with
  `event.target !== event.currentTarget`; an alert dialog nested in a sheet must not close the sheet.
- **A confirming action gated behind a type-to-confirm input.** `ConfirmationSheet` at
  [`Sheet.stories.tsx:561`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L561)
  is the existing shape. The action is disabled until the phrase matches, and the dialog must stay
  usable throughout.
- **A close request arriving while an action is pending.** Escape during an unsettled promise must
  not close the overlay out from under the action, and must not queue a close for when it settles.
- **A pending action when the overlay is closed programmatically.** `ref.close()` and setting
  `open={false}` bypass `onRequestClose` entirely, so a caller can close an overlay mid-action.

## Acceptance Criteria

A Storybook `play()` verifies each one, which is how components are tested here.

- **AC1** — An open alert dialog is reported as `alertdialog` in the accessibility tree, with both an
  accessible name and an accessible description, asserted against the tree rather than the markup.
- **AC2** — An alert dialog renders no close button, and there is no prop that produces one.
- **AC3** — A backdrop click does not close an alert dialog. The refusal asserts the DOM
  `dialog.open` property as well as `data-state`, because visually open but internally closed is the
  failure that assertion exists to catch.
- **AC4** — Escape closes an alert dialog and has the same effect as pressing cancel.
- **AC5** — Focus is on the cancelling action immediately after an alert dialog opens.
- **AC6** — While a confirming action's promise is unsettled, the overlay stays open, the control
  reports itself busy, and neither action can be triggered again. Covered for a resolving promise and
  for one that settles after a close is attempted.
- **AC7** — An alert dialog opened from inside a `Sheet` closes only itself.
- **AC8** — A caller-supplied `onClick` or `onKeyDown` on `AlertDialogContent` reaches the element
  rather than being silently replaced. The backdrop refusal is implemented through `onRequestClose`,
  so it must not consume the element's own handlers.
- **AC9** — The story at `Dialog.stories.tsx:331` is gone, and `ConfirmationDialog` (`:144`) and
  `Sheet`'s `Confirmation` (`:645`) have moved into the alert dialog's own stories. `Sheet`'s veto
  stays covered by `Dialog`'s `GuardedClose`, so the move leaves nothing untested.
- **AC10** — Every new story runs under `a11y: { test: 'error' }` and opens its overlay inside
  `play()`. A closed `<dialog>` is `display: none` and axe skips what it cannot see, which is how 25
  of 27 overlay story gates came to be decorative before `18`.
- **AC11** — When a confirming action's promise rejects, the overlay is still open, both actions are
  usable again, and the component has rendered nothing about the failure. A story demonstrates a
  caller reporting it.

## Decisions

- **A rejected action leaves the overlay open and the component silent** _(2026-11-04)_. Three
  options were weighed: close anyway, stay open and show the error in a region the component owns, or
  stay open and show nothing.

  Closing was rejected outright — the user confirmed a destructive action, it failed, and the dialog
  vanishing reads as success.

  A built-in error region was rejected because the component's boundary matters more than the
  convenience. An alert dialog asks a question and carries two answers; where a failure gets reported
  is an application decision, and a toast, a banner or an inline message are all legitimate and none
  of them belong to this component. Requirement 5 already refuses arbitrary footer markup for the
  same reason, and a third content slot would reopen it.

  What the component owes instead is **guidance, not machinery**: the documentation must show how to
  report a failure for the cases that actually occur, so a caller is not left to invent it. Note for
  whoever writes it — there is no `Toast` component in the library and no toast dependency
  _(verified 2026-11-04)_, and swapping the dialog's description text is not a working answer because
  `aria-describedby` is resolved when focus arrives rather than on mutation, so a screen-reader user
  would never hear it. Expect to document a caller-owned live region.

## Open Questions

None.
