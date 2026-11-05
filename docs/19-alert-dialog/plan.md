# 19 — Alert dialog

Status: **shipped.** As-built record for [`spec.md`](spec.md).

## Decisions taken during implementation

The spec left prop naming to the implementation and settled everything else. Four calls were made:

1. **The prop names are the spec's illustrative ones** — `title`, `description`, `cancel`,
   `confirm`. Nothing turned up to improve on them, and the spec's example is now literally the API.
2. **`AlertDialogContent` delegates to `DialogContent`** rather than rendering `OverlaySurface`
   itself. The spec describes it as "`DialogContent` minus the close button plus two required action
   slots", so delegation makes that true by construction instead of by being kept in sync. The
   consequence is that an alert dialog carries `Dialog`'s `data-slot` names — `dialog-overlay`,
   `dialog-content`, `dialog-header`, `dialog-footer` — because it is `Dialog`'s surface. Only the
   trigger and the close part get their own.
3. **`AlertDialog`, `AlertDialogTrigger` and `AlertDialogClose` are thin wrappers**, not copies.
   Nothing reads the root context's `slot`, so the root is `Dialog` under a second name.
4. **The content surface is restricted, and AC9 dropped with it.** See
   [below](#ac9s-premise-was-false) and [`spec.md`'s Decisions](spec.md#decisions).

## Corrections to the spec

Recorded here rather than by editing the acceptance criteria, which describe what was asked for.

- **The Scope table's claim is one short.** It lists five requirements and shows each expressible
  against the API `18` shipped, and that holds for all five. AC9 was never in the table and is not
  expressible — see below. "Nothing in the shared code changes" survived; "every requirement below
  already expressible" did not.
- **AC7 is not verifiable by a `play()`**, though the Acceptance Criteria preamble says every
  criterion is. A story that omitted a required prop would not compile, and one that supplied it
  proves nothing. It is pinned in `AlertDialog.types.spec.ts` instead, which is the repo's existing
  mechanism for a type-level criterion (`Form.types.spec.ts` is the precedent) and runs under
  `check-types`.
- **`Sheet.stories.tsx:1035`'s `confirm()` browser modal is still there.** The spec names it as
  evidence the component was wanted; no acceptance criterion asks for its removal, and AC10 names
  only three stories. Left alone.

## Phases

- [x] **1 — The component.** `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`,
      `AlertDialogClose`, the prop types, both barrels and the package entry point. Commit `e25b3e6`.
- [x] **2 — Stories and the AC10 move.** Seven stories under `a11y: { test: 'error' }`, each opening
      its overlay inside `play()`. Commit `fc749b3`.
- [x] **3 — Consumer documentation.** The package README's row and two entries. Commit `f262c2f`.
- [x] **4 — The restriction, and AC9.** Commit `55444e9`.

## As-built notes

### React's `autoFocus` never reaches the DOM

AC5 wants focus on the cancelling action, and `focusInitialElement` already honours `[autofocus]`
before falling back to the first tabbable element — so the spec's audit was right that no shared
change was needed. What it could not know is that the obvious way to supply the attribute does not
work.

`react-dom` skips `autoFocus` while setting attributes (`case "autoFocus": break;`) and calls
`.focus()` imperatively at mount instead. At that point the element is inside a `<dialog>` that is
still `display: none`, so it focuses nothing, and `showModal()` runs afterwards. Writing lowercase
`autofocus` in JSX would set the attribute and log an "Invalid DOM property" warning on every
render.

So `CancelAction` writes the attribute by hand in a layout effect. A child's effects flush before
its parent's in the same commit, which is what puts it in place before the surface calls
`showModal()`.

Relying on DOM order instead was rejected: the panel is header → body → footer, so with no body and
no close button the cancel action _is_ the first tabbable element — but a body with anything
focusable in it, or a `DialogContentArea` that becomes a tab stop once it scrolls, silently takes
the focus first.

### `toBeVisible()` fails against a just-opened overlay

Two first-draft assertions failed for a reason that had nothing to do with the component.
`jest-dom`'s visibility check walks ancestors and fails on a computed `opacity` of exactly `0`. The
dialog fades in over 150ms and the panel over 200ms, both starting at `0`, so an assertion landing
in the first frame sees an invisible element inside a genuinely open dialog.

`InsideASheet` now asserts `dialog.open` and `data-state`, which is the real claim. `FailedAction`
keeps `toBeVisible` but inside a `waitFor` — it waits for the transition rather than for the
assertion, so it cannot pass vacuously.

### AC9's premise was false

[`OverlaySurface`](../../packages/ui-overlays/src/components/Overlay/OverlaySurface.tsx) renders
`<dialog {...props} … {...dialogHandlers}>`. `dialogHandlers` is
`{ onCancel, onKeyDown, onClick, onClose }` and it is spread **last**, so those four — plus `ref`,
`data-slot` and `data-state` — are overwritten with nothing to notice it. Measured rather than read:
a spy passed as `onClick` to `AlertDialogContent` received zero calls.

That is true of `Dialog` and `Sheet` as shipped, and nothing to do with the alert dialog, which
reaches for neither handler. AC9's own wording gives the reason it existed — the backdrop refusal
must not consume the element's handlers — and that constraint is met, because the refusal lives in
`onRequestClose`.

Composing the handlers would have been four lines, and no call site passes any of them, so nothing
observable would have changed. It was rejected for the opposite answer: `IAlertDialogContent` omits
`onClick`, `onKeyDown`, `ref`, `slot`, `popover` and `aria-modal` as well as `role`,
`showCloseButton`, `icon` and `footer`. `slot` was the sharpest of them — `DialogContent` passes
`slot='dialog'` _before_ `{...props}`, so a caller could rename every `data-slot` in the tree.

### The restriction reached `Dialog` and `Sheet` too

Done the same day, after the above shipped, rather than left as a deliverable of its own.
`IDialogContent`, `ISheetContent` and `IOverlaySurface` now remove `onClick`, `onKeyDown`, `ref`,
`popover` and `aria-modal`; the two content types also remove `slot`, which `IOverlaySurface` keeps
because there it is the component's own required prop rather than a pass-through.

**`role` is narrowed, not removed** — to `'dialog' | 'alertdialog'`. Removing it outright breaks
`AlertDialogContent`, which pins `role='alertdialog'` _through_ `DialogContent`, and that delegation
is decision 2 above. Both values are legitimate on a `<dialog>`; `presentation` or `alert` would take
the semantics off the element. So the value is restricted where the key cannot be.

`Dialog.types.spec.ts` and `Sheet.types.spec.ts` pin it, matching this deliverable's own type spec.
Nothing in `packages/` or `apps/` passed any removed prop, so no call site changed — the only thing
that changed is what the types advertise. Gates after: build 11/11, lint 11/11, 411 tests passed.

This is the one place the deliverable crossed its own non-goal, and
[`spec.md`'s Open Questions](spec.md#open-questions) records why.

### What AC10 moved

| Was                                                                       | Now                                        |
| ------------------------------------------------------------------------- | ------------------------------------------ |
| `Dialog.stories.tsx:331`, `AlertDialog` — a `Dialog` with a warning emoji | deleted                                    |
| `Dialog.stories.tsx:144`, `ConfirmationDialog`                            | `AlertDialog.stories.tsx`, `Default`       |
| `Sheet.stories.tsx:645`, `Confirmation`                                   | `AlertDialog.stories.tsx`, `TypeToConfirm` |

`Sheet`'s version guarded Escape and the backdrop through `onRequestClose` until its phrase matched.
The backdrop guard is now the component's, unconditionally; the Escape guard went, because an alert
dialog that refuses both is one with no obvious way out. `Sheet`'s veto coverage is unaffected —
`Dialog`'s `GuardedClose` exercises all three routes, and `Sheet`'s own `WithConfirmationDialog`
still vetoes.

Removing those stories left five imports unused across the two files (`fireEvent`, `Alert`,
`AlertTitle`, `AlertDescription`, `OverlayCloseSource` in `Sheet`), all removed.

### How each criterion was verified

Gates run against the final tree: `pnpm build` 11/11, `pnpm lint` 11/11 at `--max-warnings 0`, and
the Storybook interaction suite 411 passed / 0 failed.

| AC  | Verified by                                                                                            |
| --- | ------------------------------------------------------------------------------------------------------ |
| 1   | `Default` — `findByRole('alertdialog')`, `toHaveAccessibleName`, `toHaveAccessibleDescription`         |
| 2   | `Default` — no button named Close, and exactly two buttons in the dialog                               |
| 3   | `BackdropIsRefused` — `data-state="open"` and `dialog.open === true`                                   |
| 4   | `EscapeCancels` — Escape closes, the confirm spy never fires, and the readout matches the cancel route |
| 5   | `Default` — `toHaveFocus()` on the cancelling action                                                   |
| 6   | `Default` — the `cancel` slot is a bare `Button`, unwrapped, and dismisses                             |
| 7   | `AlertDialog.types.spec.ts`, under `check-types`                                                       |
| 8   | `InsideASheet` — Escape and cancel each close only the alert dialog                                    |
| 9   | dropped — see above                                                                                    |
| 10  | the table above; `Dialog` 13/13 and `Sheet` 15/15 still pass                                           |
| 11  | `SlowConfirmingAction`, `TypeToConfirm`, `FailedAction`                                                |
| 12  | `a11y: { test: 'error' }` on the meta; all seven stories open inside `play()`                          |

`role="alertdialog"` on a `<dialog>` element passes axe — worth recording, since the gate is what
would have caught it if `aria-allowed-role` disallowed the pairing.
