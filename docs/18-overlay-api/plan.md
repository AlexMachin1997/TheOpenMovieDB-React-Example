# A common overlay API — plan

Status: **both phases built and verified.** The native `<dialog>` primitive and the
`title` / `description` / `footer` props are in, against all seven of discovery's success criteria
and all ten of the spec's acceptance criteria. Two follow-ons remain, listed at the end.

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
- [x] **7. DD-6.** `Popover`, `DropdownMenu` and `HoverCard` portal into the dialog, with six
      containment tests and one control.
- [x] **8. Radix out** of `ui-overlays`. Done alongside 5 and 6 rather than after them: nothing
      imported it once both were rewritten, so holding the dependency back would have been fiction.
- [x] **9. A `play()` on every overlay story.** All 27 open their overlay and assert its accessible
      name, so the axe gate inspects an open dialog rather than a `display: none` one.
- [x] **10. Documentation.** DD-9 written into `discovery.md`, the `overlay` and clipping questions
      closed, `ui-overlays/README.md` corrected, the roadmap row moved to in progress, and the root
      README's browser-support claims fixed. Consumer-facing `.mdx` waits for Phase 2, which changes
      the API it would document.

## Phase 1 against discovery's success criteria

[`discovery.md`](discovery.md#success-criteria) numbers these 1 to 7. The spec's AC1–AC10 cover the
API and belong to Phase 2.

| #   | Criterion                                                                                      | Evidence                                                                                                                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | A real `<dialog>` via `showModal()`, no Radix dialog left                                      | `grep -rn "@radix-ui/react-dialog" packages --include=*.ts --include=*.tsx --include=package.json` returns nothing outside `dist/`. Present transitively via `cmdk`, as expected                          |
| 2   | The `open` prop and the ref both drive it, controlled and uncontrolled, no `InvalidStateError` | `Sheet`'s `RefBased`, `RefWithControlled` and `Controlled`; `Dialog`'s `ControlledDialog`. The guard is `if (!dialogNode.open)` on a live DOM property                                                    |
| 3   | Two stacked modals order correctly with no `z-index`; Escape closes the topmost only           | `Dialog`'s `NestedDialogs` play, closing the inner one by button and by Escape and asserting the parent survives both                                                                                     |
| 4   | `Select`, `MultiSelect`, `SingleDatePicker` and `DateRangePicker` work inside a modal          | Four stories, each asserting the anchored content is a DOM descendant of the `<dialog>` and then using it. `DropdownMenu`'s `Basic` is the no-modal control                                               |
| 5   | The page behind a modal does not scroll or shift sideways                                      | `Dialog`'s `Default` play asserts `body` is `overflow: hidden` while open and released once closed. The sideways half is the scrollbar-width padding in `scrollLock.ts`, which is not separately asserted |
| 6   | Backdrop click dismisses, through the same path as Escape and the `X`                          | `Dialog`'s `Default` play dispatches a click on the `<dialog>` itself. The shared path is structural — all four routes call `requestClose` — and Phase 2's AC10 tests the veto on each                    |
| 7   | Animations present and close to today's                                                        | **Not verified.** `play()` cannot assert appearance; this needs a human at `localhost:6006`, on Dialog and all four Sheet sides                                                                           |

Gates, on the run that closed Phase 1: `pnpm build --force` 0, `pnpm lint` 0, `npx vitest run` **391
passed, 41 files, 27 skipped**. The review pass below moved that figure; recapture it rather than
trusting this one.

### Criterion 7, measured

`play()` cannot assert appearance, but it can read `getAnimations()`. Taken from the running
Storybook on 2026-08-24, opening each overlay and closing it via the X:

| Surface        | Entry                                    | Exit              |
| -------------- | ---------------------------------------- | ----------------- |
| Backdrop, both | fade 0 → 1, 150ms                        | fade 1 → 0, 150ms |
| Dialog panel   | fade + `scale3d(0.95)` → none, 200ms     | reverse, 200ms    |
| Sheet `right`  | `translate3d(100%, 0, 0)` → none, 500ms  | reverse, 300ms    |
| Sheet `left`   | `translate3d(-100%, 0, 0)` → none, 500ms | reverse, 300ms    |
| Sheet `top`    | `translate3d(0, -100%, 0)` → none, 500ms | reverse, 300ms    |
| Sheet `bottom` | `translate3d(0, 100%, 0)` → none, 500ms  | reverse, 300ms    |

These are the pre-swap values exactly, including Sheet's asymmetric 500/300 and Dialog's flat 200,
which is what DD-9 set out to preserve. Also confirmed on the same pass: the dim computes to
`oklab(0 0 0 / 0.5)` on the `<dialog>` element and the user-agent `::backdrop` to
`rgba(0, 0, 0, 0)`, so stacked modals do not compound Chromium's default 10% backdrop.

**What this does not prove, and how it misled.** These are the animations the browser _applied_, not
a recording of them playing. That gap was not academic: every value in the table above was correct
while a right or bottom Sheet was visibly arriving in two stages, because the defect was in which
box the panel resolved against, not in the animation applied to it. See the review pass below.

The reasoning that produced this paragraph was also wrong on its own terms. It assumed the
automation pane reports `visibilityState: hidden` and freezes playback, so only static values could
be read. Re-checked on 2026-08-24: it reports `visible`, `setTimeout` is unthrottled at ~30ms, and
sampling an animation as it actually runs works — which is what found the bug. Stepping
`animation.currentTime` by hand, which is what was done here, only ever redraws the ideal curve and
cannot show a stall. `storybook-suite.md` carries the corrected method.

Whether the result feels right is still a human judgement and stays one.

## Phase 2 — the API

- [x] **Labelling.** `useOverlayLabelling` owns the precedence and the two warnings.
- [x] **The props.** `title` / `description` / `footer` on both content components.
- [x] **The veto.** `onRequestClose` public, covered on all three routes.
- [x] **`CommandDialog`.** Collapsed to `aria-label`; `description` removed from its props.
- [x] **Stories migrated**, keeping one compound story per overlay.

### `children` changes meaning with the props

The one design call the spec did not name. Pass any of `title` / `description` / `footer` and
`children` is the body, wrapped in the scrolling container. Pass none and `children` is the whole
assembly, rendered untouched — which is how every existing compound call site keeps working without
being edited.

There is no third reading available. Inferring which one was meant from the shape of `children`
would mean walking the tree, and [ADR-6](CONTEXT.md) already rejected tree-walking for the narrower
question of suppressing a duplicate title.

### The warnings run in an effect, not in render

[ADR-5](CONTEXT.md) and [ADR-6](CONTEXT.md) both say "same shape as `Button.tsx`", and `Button`
warns inline during render. These cannot. A compound title registers its id from its own mount
effect, which lands a commit _after_ the parent renders, so a render-phase check would report every
correctly-labelled overlay as unnamed on its first paint. The message format and the non-throwing
behaviour match `Button`; only the timing differs, and it has to.

## Against the spec's acceptance criteria

| #    | Criterion                                                                        | Evidence                                                                                                                                                                                                            |
| ---- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC1  | `title` / `description` / `footer`, same structure as the compound parts         | The composed path renders the real `DialogHeader` / `DialogContentArea` / `DialogFooter`, so this is true by construction rather than by having been kept in sync                                                   |
| AC2  | An overlay given only a `title` is labelled by it, checked against the a11y tree | Every migrated story asserts `toHaveAccessibleName` after opening — the accessibility tree, not the markup                                                                                                          |
| AC3  | A `description` describes it; none emits no attribute                            | `NoDescription` asserts `not.toHaveAttribute('aria-describedby')`. Absence, not a dangling reference — axe grades a dangling one only as needs-review, so nothing else would catch it                               |
| AC4  | Caller ARIA overrides the generated value                                        | `CallerSuppliedAria`                                                                                                                                                                                                |
| AC5  | The same ref API on both, controlled and uncontrolled                            | `Dialog`'s and `Sheet`'s `RefBased` and `RefWithControlled`. Dialog had no ref story at all until walking these criteria found it                                                                                   |
| AC6  | Compound parts still exported and working, one story each                        | `CustomStyledDialog` and `WithSheetClose`, deliberately left un-migrated                                                                                                                                            |
| AC7  | Stories migrated, suite green with `a11y: { test: 'error' }`                     | 15 migrated; **397 passed, 41 files, 27 skipped**                                                                                                                                                                   |
| AC8  | `CommandDialog` names itself, no `sr-only`                                       | `<DialogContent aria-label={title}>`. Asserted explicitly in `Command`'s Dialog play, because that suite disables `aria-dialog-name` for Radix's `PopoverContent` and axe cannot police it there                    |
| AC9  | No accessible name warns and still renders                                       | `WithoutAnAccessibleName`, using `Button`'s `captureConsoleWarn` pattern and `a11y: { test: 'off' }` — the dialog it renders is by design the case axe is right to reject                                           |
| AC10 | A vetoed close covered per route                                                 | `GuardedClose` refuses Escape, the close button and the backdrop, asserting `dialog.open === true` rather than only `data-state`: visually open but internally closed is the failure that assertion exists to catch |

Gates: `pnpm build --force` 0, `pnpm lint` 0, `npx vitest run` **397 passed, 41 files, 27 skipped**.

## Still outstanding

- [ ] **Consumer-facing `.mdx`** — out of scope here, by decision. `ui-overlays` has none for any
      component, but neither does anything else in the library, so writing it per-deliverable would
      set the pattern from the narrowest possible case. It moves to a dedicated library-wide
      session.
- [ ] **Further example stories** — not done, and not obviously wanted. The stories that exist all
      open their overlay and cover the criteria; more would be for demonstration rather than
      coverage.

## Review pass after Phase 2

A walk through the finished components turned up eight things. Three were defects in the components
themselves, none of which the suite could see, because `play()` asserts state and every one of these
lived in how the overlay looked while moving.

- [x] **A right or bottom Sheet arrived in two stages.** `tw-animate-css` builds every `animate-in` /
      `animate-out` on one pair of keyframes that always animate `translate3d(…)`, so the `<dialog>`
      carried a transform for the 150ms its backdrop faded — and a transformed ancestor is the
      containing block for `position: fixed` descendants. The panel resolved against the dialog for
      the first 150ms of a 500ms slide and against the viewport thereafter. `left` and `top` hid it
      because both boxes agree at the near edge. The backdrop now fades by `transition-opacity` with
      `starting:opacity-0`, so the dialog never takes a transform at all. This is risk R6, which the
      plan predicted and then looked for in the wrong place: the stray transform came from a utility
      class, not from anything written here.
- [x] **The panel must stay `position: fixed`.** Anchoring it to the `<dialog>` with `absolute` was
      tried as belt-and-braces against R6 and reverted: the resting rectangle is identical, but a
      `right` or `bottom` panel then arrives with no visible slide. Both invariants are now asserted
      in `openDialog` and `openSheet`, so every story in both files checks them.
- [x] **The body of every overlay was a tab stop and took focus on open.** A `tabIndex` added for
      `scrollable-region-focusable` was unconditional, and the body precedes the footer, so it also
      took the initial focus. Now conditional on the content genuinely overflowing, measured by
      `useScrollableRegion`.
- [x] **The two footers had drifted.** `DialogFooter` went to a row at the `sm` **viewport**
      breakpoint and `SheetFooter` never went to a row at all. Both now share
      `overlayFooterVariants`, keyed on the panel's own width through `@container`: a Sheet is 24rem
      wide on a phone and on a desktop alike, so a viewport breakpoint was the wrong question to ask.
      `@md` puts a Dialog's 32rem panel in a row and leaves a Sheet's 24rem one stacked, including
      the Dialog on a phone, where it is narrower than its own breakpoint. Verified against risk R9:
      `container-type: inline-size` carries `contain: layout`, which would make the panel a
      containing block for a fixed descendant — measured on all four sides, the panel keeps
      `offsetParent: null` and a continuous slide.

The remaining four were story-level.

- [x] **`Sheet`'s `Confirmation` was a facade,** and is now the worked example for gating. It asked
      the user to type `delete`, but the input was uncontrolled and neither footer button did
      anything, so the gate it appeared to describe did not exist. It now demonstrates the two gates
      a destructive flow actually wants, both driven by the one `confirmed` boolean:

      - the **footer action**, which is ordinary React — `confirmed` drives `disabled`, and the
        overlay is not involved;
      - **ambient dismissal**, which is `onRequestClose` calling `preventDefault()`, so the sheet is
        never closed-and-reopened, it simply never closes.

      `event.source` is what keeps the second from becoming a trap: Escape and the backdrop are
      refused because they are easy to fire by accident, while every route with a visible control
      behind it — Cancel and the X — passes through untouched. Refusing all four is what made the
      first attempt at `GuardedClose` read as broken. Completing the phrase releases both gates at
      once, and the action then runs and closes the sheet. `Dialog`'s `ConfirmationDialog` is the
      deliberate contrast: the same shape with nothing gated.

- [x] **`GuardedClose` started locked and swallowed every close silently**, which read as a broken
      component rather than a demonstration. Rebuilt as an unsaved-changes flow: it closes normally
      until the name is edited, then refuses each route out and names the one it refused, and Save or
      Discard releases it.
- [x] **`WithoutAnAccessibleName` had no content**, so it demonstrated the warning against a dialog
      nobody would ship. It now renders a real shortcuts panel whose heading is a styled `<p>` — the
      omission the diagnostic actually exists to catch.
- [x] **`SuccessDialog` and `LoadingDialog` removed.** Both demonstrated application state rather
      than anything about the overlay. Deleting `LoadingDialog` also removes the only `animate-spin`
      inside an overlay, so nothing now exercises R2 (an `iterations: Infinity` animation must not
      wedge `waitForExit`); the guard for that stays a comment on `waitForExit` itself.

One correction this work surfaced and did **not** make, recorded in
[CONTEXT.md](CONTEXT.md#follow-ups-this-grilling-surfaced): `Dialog.stories.tsx`'s `AlertDialog`
story is not an alert dialog — `role="dialog"`, freely dismissible. Left for the
[alert dialog deliverable](../19-alert-dialog/spec.md), which may replace it outright.

The other, `SheetInnerContent` setting no `data-slot` unlike every sibling, was fixed during the
review pass.

## The browser-support floor is now looser than it needs to be

`@starting-style` and `transition-behavior: allow-discrete` set the floor in the
[root README](../../README.md#-browser-support), and DD-9 means nothing uses either. Neither does
anything use `overlay`. The floor is unchanged here — it governs every package, not this one — but
the justification recorded for it no longer holds, and the README now says so.

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

### The exit animation has to hold its end state, or the close flashes

Reported after the components were otherwise done: closing a dialog pulsed.

`tw-animate-css` defaults `--tw-animation-fill-mode` to `none`. So a finished exit animation drops
the element straight back to its base styles — fully opaque, untranslated — and it stays there for
the grace period and the React commit before `dialog.close()` actually runs. The overlay faded out
and then flashed back to full visibility for perhaps 60ms.

Radix never showed this because it unmounted the node on `animationend`. DD-9 deliberately does the
opposite and holds the element open through its exit, so the end state has to stick:
`data-[state=closed]:fill-mode-forwards` on both the backdrop and the panel.

Worth knowing that the fill mode is scoped to the closed state rather than applied globally. On
entry `none` is correct — the element should release to its own styles once it has arrived.

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

### React fires `onClose` on every ancestor, and that closed nested dialogs' parents

The reported symptom: closing a nested dialog also closed the one it opened from.

`close` and `cancel` do not bubble. React does not care — it collects handlers from every ancestor
fiber carrying the prop and calls them all. A nested `<dialog>` is a DOM descendant of the dialog it
opens from, so the inner one closing ran the outer one's `onClose`, which is the handler whose whole
job is to push `open: false` back into React state.

Both handlers now bail on `event.target !== event.currentTarget`, the same guard the backdrop click
already used. `NestedDialogs` has a `play()` covering close-by-button and close-by-Escape, because
this is not a failure any existing assertion would have caught.

### The close button is a `Button`, and looks slightly different for it

`OverlayCloseButton` renders `@repo/ui-core`'s `Button` (`variant='ghost'`, `size='icon'`) rather
than a bare `<button>`, so the overlay's X gets the same hover, pressed, focus-ring and disabled
treatment as every other button in the library. `overlayCloseButtonVariants` is down to positioning
and icon sizing.

Two visible consequences. The hover treatment moved from `opacity-70` to `hover:bg-accent`, and the
focus ring from `ring-2 ring-offset-2` to Button's `ring-[3px]` — the second deliberate change to
this button after [`14`](../14-component-consolidation/plan.md)'s D5. And its `data-slot` moved from
`dialog-close` to `dialog-close-button`, which it had been sharing with `DialogClose`; nothing in
the repo targeted either.

`DialogTrigger` and `DialogClose` stay unstyled elements. They exist to be composed with `asChild`,
and every call site already writes `<DialogTrigger asChild><Button>` — styling them would style
those twice.

### `useIsomorphicLayoutEffect` lives in `ui-core`

It existed in `ui-command` already and was written a second time here. `ui-overlays` cannot import
from `ui-command` — the dependency runs the other way — so the shared home is `@repo/ui-core`, which
both depend on. Both copies deleted, six importers repointed.

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

### The DD-6 tests assert containment, which is a DOM detail on purpose

Six stories open an anchored surface inside a modal and assert it is a DOM descendant of the
`<dialog>`: a menu and a hover card in `Dialog.stories.tsx`, `Select` and `MultiSelect` in
`Select.stories.tsx`, and one in each date picker's stories. `DropdownMenu`'s `Basic` is the control
— with no modal above it, the menu must still land on the body.

Asserting the tree position rather than the behaviour is deliberate. The failure this guards against
renders correctly and reads correctly; the content is simply painted behind the backdrop and inert,
so every behavioural assertion still passes while the control is unusable. Only its position gives
it away.

### What the a11y gate found once it could see an open dialog

`a11y: { test: 'error' }` has been set on both overlay files since `14`, and it was passing on a
page with no dialog on it. A closed `<dialog>` is `display: none` and axe skips what it cannot see,
so 25 of the 27 stories were giving the gate nothing to inspect. Adding a `play()` to each is what
[`docs/README.md`](../README.md) assigned to this deliverable, and it immediately surfaced two real
things:

- **A long dialog or sheet body could not be scrolled by keyboard** (`scrollable-region-focusable`,
  three stories). `DialogContentArea` and `SheetInnerContent` are `overflow-y-auto` containers with
  nothing focusable in them, and arrow keys scroll the focused element's container. Both now carry
  `tabIndex={0}`. The cost is a tab stop on every dialog with a scrolling body, which is the trade
  the rule asks for. Note this is _not_ the same situation as the suppression in `Command` and
  `Select`, where the listbox is deliberately `tabindex="-1"` because `aria-activedescendant` needs
  focus to stay on the input.
- **`SuccessDialog`'s Continue button failed contrast** at 3.07:1 — `bg-green-600` under white text.
  Story styling rather than a component defect; darkened to `bg-green-700`.

Both predate this deliverable. Neither could have been caught before, which is the argument for the
task rather than an aside to it.

### Flagged, not chased: the suite has load-sensitive flakes

Three full runs while finishing DD-6 produced two failures, in different files each time —
`Form.stories.tsx` (two 15s timeouts) and `Accordion.stories.tsx` (a `waitFor` on a collapse
animation). Both files pass in isolation, Accordion three times in a row, and the third full run was
green at 391.

They are `waitFor` assertions on animation end, and they expire when the machine is busy. The first
run was competing with a Storybook dev server left over from debugging. Pre-existing and unrelated
to the overlays; recorded here so the next person reading a red run does not go looking for a
regression that is not there.

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
