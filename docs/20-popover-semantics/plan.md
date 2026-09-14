# 20 — Popover semantics — plan

Status: **shipped.** As-built record for [`spec.md`](spec.md). Requirements and AC1–AC18 are there;
ADR-1–ADR-17 and facts 1–14 are in [`CONTEXT.md`](CONTEXT.md).

## Outcome

No popover claims to be a dialog any more. A named popover is a `group`, an unnamed one has no role,
and `title` / `description` name and describe it. `Popover` is now a native `popover="auto"` element
placed with CSS anchor positioning: `@radix-ui/react-popover` is gone, it flips instead of
overflowing, fades in and out, and closes on Escape, a click outside, focus moving away, its trigger
and an optional X — each reported once through `onOpenChange`.

## Gates

| Gate                                   | Baseline (`c8cba19`) | After Phase 1         | After Phase 2         | After review follow-up |
| -------------------------------------- | -------------------- | --------------------- | --------------------- | ---------------------- |
| `pnpm turbo run build --force`         | 11/11                | 11/11, 0 cached       | 11/11, 0 cached       | 11/11, 0 cached        |
| `pnpm lint`                            | —                    | 11/11                 | 11/11                 | 11/11                  |
| `cd packages/ui-overlays && pnpm test` | no spec files        | no spec files         | 1 file, 6 passed      | 1 file, 6 passed       |
| `cd apps/storybook && npx vitest run`  | 41 files, 395 passed | 42 files, 398 passed  | 42 files, 404 passed  | 42 files, 407 passed   |
| `pnpm prettier:check`                  | —                    | 4 failures, none ours | 4 failures, none ours | 4 failures, none ours  |

The Prettier failures predate this work: `docs/18-overlay-api/CONTEXT.md`,
`docs/20-popover-semantics/CONTEXT.md` and `spec.md` are unformatted at `c8cba19`, and
`.claude/settings.local.json` is untracked.

## Acceptance criteria

- [x] **AC1** — `Popover`'s `WithoutAName` asserts no `role`, `aria-label` or `aria-labelledby`.
- [x] **AC2** — `Default`: `role="group"`, accessible name "Dimensions", no heading inside.
- AC3 — removed by ADR-7.
- [x] **AC4** — both `aria-dialog-name` suppressions deleted; `Command` and `Select` pass at
      `a11y: { test: 'error' }` in the 404.
- [x] **AC5** — `openSelect` waits for the trigger's `aria-controls` to equal the listbox's id, in
      every `Select` story that opens one.
- [x] **AC6** — `SingleDatePicker` `Default` and `DateRangePicker` `CustomPlaceholder`: no
      `aria-haspopup` on the trigger, no `dialog` in the document once the calendar is open.
- [x] **AC7** — `NamingPrecedence`: `aria-label` beats `title` (which still renders), and
      `aria-labelledby` beats both.
- [x] **AC8** — `FocusOnOpen`: the first field takes focus; an `autoFocus` field wins over it.
- [x] **AC9** — `CloseRoutes` closes by Escape, text click outside, programmatic focus outside and
      the X, asserting `onOpenChange` once with `false` each time. A real click outside, in the dev
      server, logged one `beforetoggle: closed`. A real Escape could not be tried: the browser tool's
      key presses are untrusted.
- [x] **AC10** — `Popover.stories.tsx` covers AC1, AC2, AC7, AC8, AC9 and AC18, plus AC16 and AC17.
- [x] **AC11** — `toAnchorName.spec.ts`, 6 tests. Met one level down from the spec's wording; see
      below.
- [x] **AC12** — the four `InsideASheet` stories keep their containment assertion and add two: the
      surface sits within 8px of its trigger, and `elementFromPoint` at the option or day's centre
      returns it.
- [x] **AC13** — `NearTheBottomEdge` in both date pickers: surface bottom ≤ trigger top, top ≥ 0.
      Checked that it can fail: with `position-try-fallbacks: none` the calendar's bottom was 593
      against a trigger top of 541.
- [x] **AC14** — `Select` `SingleDefault`: surface width ≥ trigger width. Without `anchor-size()` the
      popover falls back to its own `w-72`, 288px.
- [x] **AC15** — `grep -rn "@radix-ui/react-popover" packages` outside `dist/` and
      `node_modules/`: nothing.
- [x] **AC16** — `InsideADialog`: Escape, then a click inside the dialog, each close the popover
      with the dialog still `open`; the popover's field is the hit target at its own centre.
- [x] **AC17** — `CloseRoutes`' last step, plus real clicks in the dev server on both a `Popover` and
      a `Select` trigger: `open, closed`, and still closed afterwards. The `play()` alone was not
      enough — see the first section below.
- [x] **AC18** — `TabMovesOut`: Tab from the last field focuses the next button and closes the
      popover; Shift+Tab from the first focuses the trigger and closes it.

## Still open

- [ ] **A look at it** — the measurable half is split out as its own task: stray scrollbars in
      `Select` and the date pickers, the header's layout against the close button, and the fade's
      `getAnimations()` values. Whether it _looks_ right still needs Alex at `localhost:6006`.
      `play()` cannot assert appearance and this repo has no visual regression by decision;
      `@chromatic-com/storybook` is installed with no project token or CI behind it.
- [ ] **`Popover.mdx`** — not done. ADR-10 deferred it; the `styles.css` import is now a caller
      obligation that needs a home, and it is split out as its own task.
- [ ] **A minimum size before a popover gives up on its own side** — left as it is, 2026-09-14. A
      popover with no room either side fills its own side however little space that is. Measured with
      a 12rem minimum, a 64px space was skipped for the 600px one opposite.
- [ ] **Split out as separate tasks, from the third review round** — string-only `title` /
      `description` across Popover, Dialog and Sheet; the suite in Firefox and WebKit; Radix menus and
      hover cards inside a popover (suspected to close it, unproven); a test that a popover follows
      scrolling; an imperative ref like Dialog's; the measurable appearance assertions above. And one
      for Alex: Select's combobox trigger with `popovertarget`, under a screen reader — axe is a
      static scan and has no rule for what Chromium adds there.

Flagged, not chased:

- **`Sheet` › `Confirmation` is flaky.** It failed 2 runs in 4 at the Phase 1 commit, with no Phase
  2 code present, on `toBeVisible()` for the refusal alert while the sheet is still arriving.
- **`Dialog` probably drops a React `autoFocus`**, for the reason given below. Read from the code,
  not measured.
- **Nothing needs Chrome 137 any more.** The floor stays there by decision.

## Phases

- [x] **1 — Semantics and naming, on Radix.** The role follows the name, `title` / `description`,
      `PopoverAnchor` removed, triggers stop claiming a dialog, `SelectTrigger`'s `aria-controls`
      resolves to the listbox, both suppressions removed, the `Select` helpers rewritten around the
      listbox, and `Popover` stories. `23db444`.
- [x] **2 — The primitive.** `popover="auto"` with anchor positioning replaces Radix; focus, closing,
      fade and flipping as below; the root README's browser-support section rewritten. `ed29083`.
- [x] **Review follow-up.** Stories for every `side` and for flipping, and a last resort for a popover
      with no room on either side. Detail below. `78e92e8`.
- [x] **Third review round.** A fixed header, story helpers in a fixture, a non-scrolling `Sides`
      canvas, focus-return assertions, a warning for a non-button trigger, `popoverPosition.spec.ts`,
      dependency linting for `useIsomorphicLayoutEffect`, and the CSS convention documented. Detail
      below.

## Third review round

Alex raised eight points; the small ones were done here and the rest split into their own tasks
(listed under Still open).

- **The header no longer scrolls.** When a shrunk popover has a `title` or `description`, only a body
  wrapper (`data-slot="popover-body"`) scrolls, as `Dialog`'s content area does. A popover without a
  header — every `Select` and date picker — renders exactly as before, with no wrapper. The body's
  `-m-1 p-1` gives a focus ring on its edge room before the scroll container clips it.
  `NoRoomOnEitherSide` scrolls the body to its end and asserts the title has not moved.
- **`Sides` fills the canvas and never scrolls.** Measured before: in a 445×508 pane its grid was
  796px wide and the canvas scrolled sideways, so narrowing the panel moved the triggers instead of
  flipping the popovers. The middle track is now `minmax(0, …)`, so it shrinks with the panel.
- **Story helpers moved to `Popover/__fixtures__/interactions.ts`**, following
  `Selects/__fixtures__/interactions.ts` — which, like it, departs from the storybook-standards
  skill's "data only" rule for `__fixtures__/`.
- **Focus return is asserted** after Escape and after the close button, in `CloseRoutes`. Measured
  first in the dev server: both returned focus to the trigger.
- **`PopoverTrigger` warns when its element is not a `<button>`**, since `popovertarget` only works on
  one and the failure otherwise looks like a popover bug.
- **`popoverPosition.spec.ts`** covers every side and alignment's area, the gap's edge, and the
  fallback order. Hook tests were not written: the installed `jsdom@26.1.0` implements neither the
  Popover API nor anchor positioning, so they would test mocks of the platform.
- **`exhaustive-deps` now checks `useIsomorphicLayoutEffect`** through `additionalHooks`. Measured
  before enabling: one violation across the four UI packages, `useKeepActiveOptionRendered.ts`, whose
  effect has no dependency list on purpose. It carries a disable with the reason. Proved on a
  throwaway hook linted through stdin, with a `useIsomorphicLayoutEffect` and a `useEffect` each
  missing a dependency: the old rule flagged only the `useEffect`, the new one flagged both, and with
  the dependency added neither was flagged. A severity-only `--rule` override keeps the configured
  options, so the old rule had to be reproduced with its options set to `{}`.

  **An effect with no dependency array is still allowed**, for both hooks alike: the rule only
  objects when such an effect sets state, which is the "infinite chain of updates" message. A
  `no-restricted-syntax` rule to forbid the missing array outright was offered and declined,
  2026-09-14.

- **Gates for this round:** `pnpm turbo run build --force` 11/11, `pnpm lint` 11/11,
  `ui-overlays` unit tests 2 files / 27 passed, Storybook suite 42 files / 407 passed.
- **The per-package CSS convention is in `ui-core`'s README**, under Conventions. The unused
  `src/styles.css` in `ui-command` and `ui-forms`, which imported all of Tailwind, were removed.
- **`CONTEXT.md`'s vocabulary, ADR-16 and fact 13 are corrected** in place, with notes rather than
  rewrites.

## Review follow-up

Alex's review found three things: no story showed `left`, `right`, `top` or `bottom`; flipping looked
absent; and a popover could cover its own trigger.

**Flipping worked, where there was room.** Copying the component's positioning onto a pinned
trigger, all four sides flipped to the opposite side when theirs had none. The new
`FlipsWhenThereIsNoRoom` story proves it for each. What looked like no flipping was the case where
the opposite side had no room either — a centred trigger in a narrow canvas.

**Covering the trigger was CSS doing what it is specified to do.** When no fallback fits, the
browser uses the first position (CSS Anchor Positioning §6.5), then slides a box that overflows its
area back inside the viewport "even if that violates its normal alignment" (§4.1) — over the anchor.
Radix never did this: `@radix-ui/react-popper` shifts along the edge only (`crossAxis: false`) and
lets `flip()` pick the side that overflows least, so its popovers ran off screen instead. The new
`NoRoomOnEitherSide` story failed against the Phase 2 code with the popover 473px over its trigger.

**Alex wanted neither: never off screen, and never over the trigger.** Measured options, in Chrome
148:

| Approach                                          | Result when neither side fits                               |
| ------------------------------------------------- | ----------------------------------------------------------- |
| As shipped in Phase 2                             | covers the trigger                                          |
| `unsafe` alignment toward the trigger             | stays on its side, runs off screen; unreachable if too tall |
| `position-try-order: most-height` / `most-width`  | no change, and it discards the requested side when it fits  |
| Fallback rules that size the popover to the space | stays on its side, fits, scrolls — **chosen**               |

The chosen fallbacks are four `@position-try` rules, one per side, tried after both flips. Each
centres the popover on that side and sizes it to the space there. Alex chose one rule per side over
one per side and alignment: a start-aligned rule can still overflow sideways, and then nothing fits
and the trigger is covered again.

**`max-height` does not work there; a fixed `height` does.** An option that only caps the size was
never chosen for a popover whose own height is `auto` — `max-height`, `max-block-size`, and
`max-height` with `height: fit-content` all left it covering the trigger, and `fit-content()` was
dropped as invalid. `height: calc(100% - 0.25rem)` was chosen and fitted. It is equivalent here,
because the rules only apply to a popover already too big for the space.

**The rules ship as `@repo/ui-overlays/styles.css`.** `@position-try` cannot be written inline, so
they need a stylesheet. Alex chose one import per package over one per component, over
`tailwind-config/globals.css`, and over a `<style>` rendered by the component. The package's unused
`src/styles.css`, which only imported Tailwind, now imports `Popover.css` and nothing else. It is
exported from source, as `tailwind-config` exports `globals.css`, so no build step copies it. Storybook
imports it in `.storybook/tailwind.css`; an app without it still flips, but covers the trigger when
nothing fits. Every popover is now `overflow-auto`, which the fallback needs in order to scroll.

## Decisions taken before implementation

The spec deferred four mechanisms to this plan. Each was put to Alex as a choice, 2026-09-11.

1. **`CommandList` reports its listbox id into `CommandContext`.** `cmdk` generates the id and
   overwrites any passed in (fact 12), so `SelectTrigger` reads it from a new `listboxId` field and
   sets `aria-controls` only while the listbox exists. Rejected: `SelectTrigger` querying the
   popover's DOM for `[role=listbox]`, which reaches into another component's markup.
2. **A document `pointerdown` listener closes the popover on a press outside it and its trigger.**
   Synthetic clicks never reach native light dismiss (fact 14), so without it no `play()` can
   exercise a click outside. Native light dismiss stays as the backstop. Rejected: tests clicking a
   focusable element, which proves the focus-out route and calls it a click.
3. **The exit fade is a native CSS discrete transition** on `:popover-open`, not `Dialog`'s
   hold-open-then-close. Alex asked why not `Dialog`'s pattern; the answer was measured, below.
4. **"Focus moving outside" means a `focusin` on another element**, as Radix does. Switching
   browser tabs or clicking empty space does not close a popover through this route.

### Why `Dialog`'s exit pattern does not transfer

`useDialogElement` keeps the element open while the exit animation runs and closes it afterwards.
That works for `<dialog>` because nothing native closes it on a click: the backdrop click is our own
`onClick`. A `popover="auto"` has native light dismiss, and it acts inside the click itself. On a
bare popover with a real click outside, Chrome 148 logged `pointerdown` at 12305ms and both
`beforetoggle: closed` and `pointerup` at 12306ms. `Dialog`'s pattern would start a 150ms fade on
`pointerdown` and have the browser hide the element partway through it — on every real click outside,
and invisibly to `play()`.

The fade as built, measured closing a popover: 150ms transitions on `display`, `opacity` and
`overlay`, opacity 0.03 and `display: block` at 120ms, `display: none` with children unmounted
afterwards, `transform: none` throughout.

## How it fits together

`Popover` holds open state (`useControllableOpen`, shared with `Dialog`), one `useId` and the trigger
node. `PopoverTrigger` publishes `anchor-name`, carries `popovertarget`, and toggles. `PopoverContent`
is always rendered as a `popover="auto"` element; `usePopoverElement` shows it with the trigger as
`source`, mounts children a commit later, places focus, and lets the CSS fade it out.

Every close ends the same way: the element is hidden, and one native `beforetoggle` listener calls
`setOpen(false)`. Escape (a `keydown` handler), a press outside (a document `pointerdown` listener),
focus arriving outside (a document `focusin` listener) and the X all just call `hidePopover()`. The
browser's own Escape and light dismiss land on the same listener. Hiding a hidden popover dispatches
nothing, so `onOpenChange(false)` fires once whichever route got there first. A close React started —
the trigger, a controlled `open={false}`, `Select` choosing an option — sets a flag around its own
`hidePopover()` so the listener does not report it back.

Positioning is inline CSS from `popoverPosition.ts`: `position-area` per side and alignment, a 0.25rem
margin facing the trigger, and `position-try-fallbacks` that try the opposite side first. Nothing in
`Popover/` measures layout in script.

## What building it hit

### `source` does not exempt the trigger from light dismiss — `popovertarget` does

ADR-16 raised the Chrome floor to 137 so the popover could be shown with `showPopover({ source })`,
on fact 13's reading that this exempts a press on the trigger from light dismiss. It does not. The
`play()` for AC17 passed, because synthetic clicks never reach light dismiss; a real click in the dev
server closed the popover at `pointerup` and the click reopened it (`beforetoggle` logged
`open, closed, open`). Measured in Chrome 148 on a bare page, with real clicks:

| Trigger, and a real click on it while its popover is open                       | Popover afterwards |
| ------------------------------------------------------------------------------- | ------------------ |
| Registered with `showPopover({ source })`                                       | closed             |
| `popovertarget`                                                                 | open               |
| `popovertarget`, `click` `preventDefault()`ed, popover shown by `showPopover()` | open               |
| `popovertarget`, `click` `preventDefault()`ed, popover closed                   | stays closed       |

Alex chose `popovertarget` with the click cancelled, over tracking by hand whether the popover was
open when the trigger was pressed. The attribute buys the exemption; cancelling the click stops it
toggling the element, so React state still decides. Two costs, both accepted: only a `<button>`
trigger is exempt, so an `asChild` child of another element brings the reopen back; and Chromium now
also exposes the popover relationship on the trigger itself, unmeasured on `Select`'s combobox.
`source` stays, for nesting.

### A `display` utility on the popover beats the browser's hiding

`[popover]:not(:popover-open) { display: none }` is a user-agent rule, and any author `display`
beats it. A titled popover laid out its header with `flex`, so once closed it still painted as an
empty box under its trigger — measured at `display: flex`, `:popover-open` false, 33px tall. It is
`open:flex` now. A caller passing a display utility in `className` would bring the bug back.

### React's `autoFocus` never reaches `[autofocus]`

React does not render the attribute. It calls `focus()` as the element mounts
(`react-dom-client.development.js`: `case "autoFocus": break;`), and an element inside a hidden
popover cannot take focus. So children mount in the commit _after_ `showPopover()` — both commits in
layout effects, before paint — and focus placement leaves focus alone when a child already took it.

`useDialogElement` mounts children in the same commit as `showModal()`, so `Dialog` very likely drops
a React `autoFocus` the same way.

### AC11 is tested one level down

`toAnchorName.spec.ts` proves the sanitiser turns every React id format into a valid
`<dashed-ident>`, deterministically. Stability across re-renders is `useId`'s guarantee; testing it at
the hook would need jsdom and Testing Library, which `ui-overlays` does not have. The geometric
stories prove anchoring end to end.

### Smaller things

- **`showPopover({ source })` is not in TypeScript's DOM lib.** Declared by global augmentation in
  `usePopoverElement.ts`, with a `naming-convention` disable: `HTMLElement` is not ours to prefix.
- **The close-route stories isolate each route.** A click on text moves focus nowhere, so only the
  pointer route acts; programmatic `focus()` involves no pointer, so only the focus route acts.
- **A dev server serves stale `dist/` modules after a rebuild.** The Storybook dev server kept
  returning the pre-change `PopoverTrigger.js` until it was restarted with `node_modules/.vite`
  cleared.
- **The browser-support figure changed method.** The old 90.7% was caniuse's figure for one feature.
  Measured the same way on 2026-09-11 with browsersl.ist (caniuse-lite 1.0.30001810), the old floor
  covers 88.0% and the new one 81.6%.
- **`SingleWithoutSearch` could never fail.** It asserted no `combobox` inside the popover to prove
  the search input was absent; the input is a `textbox`. Found in Phase 1 and fixed while rewriting
  the helpers.
