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
`WithConfirmationDialog`
([`:1149`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L1149)) and
`WithConfirmationDialogRef`
([`:1231`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L1231)). The last two
open a second, nested `Dialog` as the confirmation, each with three handlers and a latch. A browser
modal is still in there too —
[`Sheet.stories.tsx:1035`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L1035)
calls `confirm()` inside a `SheetClose` handler.

**Three destructive actions have no confirmation at all.** `DropdownMenuItem variant='destructive'`
renders "Delete Project" at
[`DropdownMenu.stories.tsx:256`](../../packages/ui-overlays/src/components/DropdownMenu/DropdownMenu.stories.tsx#L256),
`:687` and `:752`, and none of them asks first.

## Scope

**The component, and nothing shared.** It was originally specified with two halves — the component,
plus a declared dismissal policy and an awaitable action lifted into the shared overlay surface.
Neither shared behaviour survived review; see [Decisions](#decisions). What is left of the shared half
is [`22`](../22-overlay-export-cleanup/spec.md), which no longer blocks or is blocked by this.

**Nothing in the shared code changes.** An audit of
[`OverlaySurface`](../../packages/ui-overlays/src/components/Overlay/OverlaySurface.tsx) and
[`useDialogElement`](../../packages/ui-overlays/src/components/Overlay/hooks/useDialogElement.ts)
found every requirement below already expressible against the API
[`18`](../18-overlay-api/plan.md) shipped:

| Requirement                      | Existing mechanism                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `role="alertdialog"`             | `IOverlaySurface extends ComponentProps<'dialog'>` and spreads `...props` onto the element, so `role` passes through |
| Required title and description   | `titleId` / `descriptionId` and `useOverlayLabelling` already do the wiring                                          |
| No close button                  | `showCloseButton?: boolean` already exists on `OverlaySurface`                                                       |
| Focus on cancel                  | `focusInitialElement` honours `[autofocus]` before first-tabbable                                                    |
| Backdrop refused, Escape allowed | `OverlayCloseSource` already discriminates `'backdrop'` from `'escape'`, and ADR-8's veto refuses one route          |

[`18`'s discovery](../18-overlay-api/discovery.md) reached the same conclusion: "structurally it is
`Dialog` minus the close button with two footer buttons, so under this deliverable's props it is a
thin preset."

**Included** — `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent` and `AlertDialogClose` in
`ui-overlays`, following [ADR-1](../18-overlay-api/CONTEXT.md)'s shape. Storybook stories and
consumer documentation, as every other overlay has.

**Independently deliverable** — yes.

## The shape

`AlertDialogContent` is `DialogContent` with four required props and no close button. A caller passes
real `Button`s, so variants, `disabled` and a spinner are things they already know how to do.

```tsx
<AlertDialog>
	<AlertDialogTrigger asChild>
		<Button variant='destructive'>Delete project</Button>
	</AlertDialogTrigger>
	<AlertDialogContent
		title='Delete this project?'
		description='Everything in it goes too. This cannot be undone.'
		cancel={<Button variant='outline'>Keep it</Button>}
		confirm={
			<Button variant='destructive' onClick={() => deleteProject(id)}>
				Delete
			</Button>
		}
	/>
</AlertDialog>
```

That is the whole API. Prop names are illustrative; the implementation plan settles them.

## What the platform and the guidelines already settle

- The [APG alertdialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) requires
  `aria-describedby` referring to the element holding the message. The message _is_ the content.
- [eBay's confirm-dialog guidance](https://opensource.ebay.com/evo-web/components/confirm-dialog/accessibility):
  pressing Escape must close a confirm dialog, acting as a cancel.
- A native `<dialog>` opened with `showModal()` closes on Escape and **not** on a backdrop click.
  `18` added backdrop dismissal by hand
  ([`useDialogElement.ts:139`](../../packages/ui-overlays/src/components/Overlay/hooks/useDialogElement.ts#L139)),
  so the library opted into light dismiss on top of a platform that omits it deliberately. This
  component opts back out, for one route, with no prop to configure it.

## Non-Goals

- **A `Sheet` equivalent.** A confirmation is centred and small; a sheet is neither.
- **Anything for slow work** — see requirement 7 and [Decisions](#decisions).
- **Changing what `Dialog` or `Sheet` do today.** Nothing here touches either.
- **Reworking `onRequestClose`.** It stays as shipped, and is the mechanism this component uses.
- **Wiring confirmations onto the three destructive `DropdownMenu` stories.** They are evidence the
  component is wanted, not call sites this deliverable owns.

## Requirements

1. `AlertDialogContent` has `role="alertdialog"` always. It is not caller-supplied and cannot be
   overridden.
2. A title and a description are both required. This departs from
   [ADR-3](../18-overlay-api/CONTEXT.md), which makes a description optional — correct for
   `role="dialog"`, wrong for `role="alertdialog"`, which the APG pattern requires be described.
3. An alert dialog has no close button, and no prop adds one.
4. A cancelling action and a confirming action are both required, each supplied by the caller as a
   node rather than described by an object. There is no `footer` prop and no third action slot.
5. The component knows which action is which, and two things follow from that without the caller
   arranging them: focus lands on the cancelling action when the dialog opens, so a reflexive Enter
   cancels rather than destroys; and the cancelling action dismisses the dialog without being wrapped
   in `AlertDialogClose`.
6. A backdrop click does not close an alert dialog. Escape does, and has the same effect as pressing
   cancel.
7. The component contributes nothing to an action that takes time. It has no prop that reports an
   action busy, no promise contract, and no region for a failure. A caller holds the dialog open with
   the `onRequestClose` veto `18` already ships, and disables their own `Button`.

## Departures from decisions already recorded

- **Escape closes an alert dialog.** The planned entry that became this deliverable asked for "an
  explicit choice before it can be dismissed". Escape is deliberate, has a visible cancel behind it,
  and is the route the APG mandates. A backdrop click is the accidental one worth refusing.
- **A required description**, against ADR-3, because the APG `alertdialog` pattern requires one.
- **Two named action slots instead of `footer`**, against [ADR-7](../18-overlay-api/CONTEXT.md). ADR-7
  made `footer` a plain `ReactNode` and rejected an object form; both slots here stay plain nodes, so
  what changes is their number and their names, not their type. ADR-7 also governs `DialogContent`
  and `SheetContent`, which this deliverable does not touch.

This deliverable leans on [ADR-8](../18-overlay-api/CONTEXT.md)'s veto more narrowly than the planned
entry assumed. The veto governs one route — the backdrop — rather than all of them.

## Edge Cases & Error Handling

- **A required description can still be defeated.** `description={null}` or an empty string satisfies
  a required prop and produces an `aria-describedby` pointing at nothing, which ADR-3 argues is worse
  than absent.
- **A slow confirming action.** The caller disables their own `Button` and refuses the close while
  the request is in flight. Both halves are ordinary React:

  ```tsx
  <AlertDialogContent
  	onRequestClose={(event) => {
  		if (isDeleting) event.preventDefault();
  	}}
  	confirm={
  		<Button disabled={isDeleting} onClick={handleDelete}>
  			Delete
  		</Button>
  	}
  />
  ```

  Documentation has to show this, because requirement 5 makes cancel dismiss automatically — a caller
  who forgets the veto can cancel out from under their own request.

- **`ref.close()` or `open={false}` during a slow action.** Both bypass `onRequestClose` entirely, so
  the veto above does not protect against a caller closing their own overlay.
- **Something other than a `Button` in `cancel` or `confirm`.** The type cannot stop a `<div>`. The
  slots exist so the component can place and wire them, not to validate them; the documentation
  states the obligation.
- **An alert dialog opened from inside a Sheet.** The `WithConfirmationDialog` flows at
  `Sheet.stories.tsx:1149` and `:1231` are the shape. `useDialogElement` guards nesting with
  `event.target !== event.currentTarget`, because `18` found React collects `onCancel` and `onClose`
  from every ancestor even though the DOM events do not bubble.
- **A confirming action gated behind a type-to-confirm input.** `ConfirmationSheet` at
  [`Sheet.stories.tsx:561`](../../packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx#L561)
  is the existing shape. The action is disabled until the phrase matches, and the dialog stays usable
  throughout.

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
- **AC6** — The cancelling action dismisses the dialog without the caller wrapping it in
  `AlertDialogClose`.
- **AC7** — Omitting the title, the description, the cancelling action or the confirming action fails
  to compile.
- **AC8** — An alert dialog opened from inside a `Sheet` closes only itself.
- **AC9** — A caller-supplied `onClick` or `onKeyDown` on `AlertDialogContent` reaches the element
  rather than being silently replaced. The backdrop refusal is implemented through `onRequestClose`,
  so it must not consume the element's own handlers.
- **AC10** — The story at `Dialog.stories.tsx:331` is gone, and `ConfirmationDialog` (`:144`) and
  `Sheet`'s `Confirmation` (`:645`) have moved into the alert dialog's own stories. `Sheet`'s veto
  stays covered by `Dialog`'s `GuardedClose`, so the move leaves nothing untested.
- **AC11** — Three stories cover the cases a caller actually hits: a slow confirming action that
  holds the dialog open, a confirming action gated behind a type-to-confirm input, and a failed
  action reported by the caller. These replace the component features this spec declines to build, so
  they are acceptance criteria rather than documentation extras.
- **AC12** — Every story runs under `a11y: { test: 'error' }` and opens its overlay inside `play()`. A
  closed `<dialog>` is `display: none` and axe skips what it cannot see, which is how 25 of 27
  overlay story gates came to be decorative before `18`.

## Decisions

All three were settled on 4 November 2026, in one review pass that asked whether the deliverable was
doing too much. They are recorded together because they share one answer: the component guarantees
what a caller cannot get right by hand, and documents everything else.

- **A rejected action leaves the overlay open and the component silent.** Closing was rejected
  outright — the user confirmed a destructive action, it failed, and the dialog vanishing reads as
  success. A built-in error region was rejected because where a failure gets reported is an
  application decision: a toast, a banner and an inline message are all legitimate and none belongs
  to a component whose job is to ask a question and carry two answers.

  Two notes for whoever writes the documentation: there is no `Toast` component in the library and no
  toast dependency _(verified 2026-11-04)_, and swapping the dialog's description text is not a
  working answer, because `aria-describedby` is resolved when focus arrives rather than on mutation —
  a screen-reader user would never hear it. Expect to document a caller-owned live region, modelled
  on [`FormError`](../../packages/ui-forms/src/components/FormError/FormError.tsx), whose docstring
  covers exactly this class of failure and carries the trap that the region must be mounted before it
  has anything to say.

- **No promise contract and no `pending` prop.** The original requirement had either action return a
  promise, with the overlay holding itself open and the control reporting itself busy. It was dropped
  because the capability already exists: `onRequestClose` refuses a close synchronously, so
  `if (isSaving) event.preventDefault()` holds the dialog open today, and a caller's own `Button`
  already takes `disabled`. The component version would have replaced about three lines of ordinary
  React with a contract that then needed its own answer for rejection, for a close arriving
  mid-flight, and for a programmatic close. Requirement 7 states the absence so it is not
  reintroduced as an obvious convenience.

- **Two named action slots, not a `footer` node and not action objects.** Three shapes were weighed.
  A plain required `footer` was rejected because it only guarantees that _something_ is there — three
  buttons, zero buttons or a form all satisfy it — and an alert dialog always has exactly a cancel and
  a confirm. Objects such as `confirm={{ label, variant, onAction }}` were rejected because they
  re-describe `Button`'s API in new vocabulary that then has to keep up with it. Nodes keep `Button`
  as the thing a caller already knows, while naming the two slots gives the component the one fact it
  needs: which action is the cancel. Requirement 5 is what that fact buys.

  `footer` stays optional on `DialogContent`, which has an `X` and dismisses on a backdrop click. It
  is required here in spirit — as two slots — because an alert dialog has neither, so its actions are
  the only visible way out.

## Open Questions

None.
