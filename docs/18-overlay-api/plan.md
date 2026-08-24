# A common overlay API — plan

Status: **in progress.** Phase 1 (the native `<dialog>` primitive) is being built now. Phase 2 (the
`title` / `description` / `footer` props) starts on a separate go-ahead.

The design is settled elsewhere and is not repeated here: [`spec.md`](spec.md) for requirements and
AC1–AC10, [`discovery.md`](discovery.md) for DD-1–DD-8, [`CONTEXT.md`](CONTEXT.md) for ADR-1–ADR-8.
This file records what was actually built and what it cost.

## Dialog and Sheet are one component

There is one modal implementation. Dialog and Sheet share the state bridge, the ref API, the veto,
the close button, the scroll lock and the animation mechanism. The only difference is where the panel
sits, which is already a `side` variant in
[`Overlay.variants.ts`](../../packages/ui-overlays/src/components/Overlay/Overlay.variants.ts):
`center` is Dialog, the four edges are Sheet.

They stay two exported names because callers reason about them differently. But nothing behavioural
may live in one and not the other.

## Phase 1 — the native `<dialog>` primitive

- [x] **1. Dependencies.** `@radix-ui/react-slot` in, dead `@radix-ui/react-dialog` out of
      `ui-command`.
- [x] **2. State primitives.** `useControllableOpen`, `OverlayRef`, the root context.
- [x] **3. The DOM bridge.** `useDialogElement`, `waitForExit`, the container context.
- [x] **4. The shared surface.** `OverlaySurface` and `OverlayCloseButton` rewritten;
      `overlayDialogVariants` added.
- [x] **5. Dialog** rebuilt on it.
- [x] **6. Sheet** rebuilt on it.
- [ ] **7. DD-6.** `Popover`, `DropdownMenu` and `HoverCard` portal into the dialog — wired; the
      tests are outstanding.
- [x] **8. Radix out** of `ui-overlays`. Done alongside 5 and 6 rather than after them: nothing
      imported it once both were rewritten, so holding the dependency back would have been fiction.
- [ ] **9. A `play()` on every overlay story.**
- [ ] **10. Documentation.** This file as an as-built record, DD-9, closed open questions.

## Phase 2 — the API

Not started. See the approved plan for the breakdown.

## Decisions

### DD-9 — animation stays on `data-state`; `close()` is delayed instead

[DD-1](discovery.md#dd-1--animations-may-differ-they-are-being-rewritten-in-css-anyway) assumed the
animation layer moves to `@starting-style` and `transition-behavior: allow-discrete`, with the
Chromium-only `overlay` property as progressive enhancement.

It does not need to. Because we own the element we keep emitting `data-state="open"` and
`data-state="closed"` ourselves, so every class in `Overlay.variants.ts` survives unchanged. On close
we set `data-state="closed"`, wait for the animation to finish, and only then call `dialog.close()`.

The element is genuinely still open for the whole exit, so it never leaves the top layer. That makes
`overlay` unnecessary rather than merely tolerable, and Firefox and Safari get the same exit as
Chrome. Discovery's largest open question — "does `overlay` being Chromium-only visibly break exit
animations?" — is answered by not applying.

### The `<dialog>` element is the dim layer; the panel is its child

Not "`<dialog>` is the panel". Before, Radix rendered a portal holding two siblings:

```html
<div data-slot="dialog-overlay" class="fixed inset-0 bg-black/50"></div>
<div data-slot="dialog-content" role="dialog">…</div>
```

After, there is no portal:

```html
<dialog data-slot="dialog-overlay" data-state="open" class="fixed inset-0 bg-black/50">
	<div data-slot="dialog-content" data-state="open">…</div>
</dialog>
```

Four things follow, and all of them are the reason for the choice:

- The dim is a real element, so `overlayBackdropVariants()`' fade classes keep working. Tailwind
  cannot reach `::backdrop` with those utilities.
- Backdrop clicks are `event.target === dialogEl`, because a click outside the panel lands on the
  dialog itself.
- `getByRole('dialog')` resolves to the element carrying `aria-labelledby` and `data-state`.
- [DD-6](discovery.md#dd-6--anchored-overlays-portal-into-the-dialog-element)'s portal container is
  the `<dialog>`, and `CommandDialog`'s `overflow-hidden` sits on the panel inside it. So a popover
  portaled into the dialog is not clipped. That closes discovery's clipping question.

### The exit deadline comes from the animations, not a flat number

DD-9 holds the dialog open until its exit animation finishes, which means something has to decide
when to give up. The first cut used a flat 800ms fallback. That was wrong in a way worth recording:
**a hidden or throttled page freezes CSS animations at `currentTime: 0`**, so `animation.finished`
never resolves and every close took the full fallback. Measured in a background tab: two exit
animations of 150ms and 200ms, both still `running` with `currentTime: 0` after 800ms, then
cancelled when the fallback finally closed the element.

That is not only a background-tab curiosity. It made `Command`'s Dialog story fail, because
testing-library's `waitFor` gives up at 1000ms and the close needed 800ms plus a React commit.

The deadline is now derived from the animations' own `endTime` plus 50ms, capped at a second. A
200ms fade waits 250ms. Where animations do run, `finished` still settles it first and the deadline
is never reached.

### Initial focus is ours to place, not the browser's

`showModal()` focuses the first _focusable_ descendant. Radix focused the first _tabbable_ one. The
difference is `tabindex="-1"`, and it is not academic.

`CommandDialog` nests two `cmdk` roots, both `tabindex="-1"`, and the outer one owns no list. Native
focus landed there, so `Enter` reached a root whose `M()` lookup returns nothing, and keyboard
selection silently did nothing. Under Radix, focus went to the search input. The caret not being in
the search box when a command palette opens is a real regression, not a test artefact — the failing
assertion just happened to be what found it.

`focusInitialElement` restores the old behaviour: an explicit `autofocus` wins, otherwise the first
tabbable element in the panel, otherwise the dialog itself, which is what the browser would have
done anyway.

### Labelling moved into Phase 1

The plan put `aria-labelledby` wiring in Phase 2 with the props. It cannot wait. A native `<dialog>`
carries `role="dialog"` from the moment it exists, and Radix's labelling went out with Radix, so
between the two phases every overlay would ship unnamed and fail the `aria-dialog-name` gate both
story files already run at `error`.

So `DialogTitle` and `DialogDescription` register their ids from the start, and the surface reads
them. Phase 2 adds the props, the precedence rules and the warnings on top of that. What moved is
correctness, not the feature.

### The scroll lock is written here, not depended on

[DD-5](discovery.md#dd-5--the-page-behind-a-modal-is-locked-only-the-dialogs-own-content-scrolls)
suggested taking `react-remove-scroll` directly. The part we need is about 25 lines: hide body
overflow, pad by the scrollbar width so the page does not jump sideways, and reference-count so
nested overlays release correctly.

What that gives up: `react-remove-scroll` also blocks touch scrolling on iOS Safari, where
`overflow: hidden` on `body` has historically not been enough. If it matters the fix is
`position: fixed` plus a saved scroll offset in the same two functions. Nothing in the test suite can
tell us either way; it needs a phone.

### DD-6 extends to `DropdownMenu` and `HoverCard`

Discovery scoped DD-6 to `Popover`. Both of the others portal to `document.body` too, so inside a
modal they would be painted behind it and made inert. The fix is the same three lines and changes no
public API. The failure it prevents is invisible: the control renders and looks correct while being
unclickable.

### `CommandDialog.description` is removed

`title` becomes `aria-label` per [ADR-5](CONTEXT.md). The description named nothing visible, and
pointing `aria-describedby` at hidden text is what AC8 forbids. Nothing in the repo passes it.

### Portal and Overlay parts stay, as deprecated shims

`DialogPortal` and `SheetPortal` render a fragment; `DialogOverlay` and `SheetOverlay` keep rendering
the dim div. They have zero consumers anywhere in the repo, but reducing the public export surface is
an explicit non-goal.
