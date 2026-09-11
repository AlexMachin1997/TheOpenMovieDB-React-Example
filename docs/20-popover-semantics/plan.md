# 20 — Popover semantics — plan

Status: **in progress.** Phase 1 is being verified; Phase 2 has not started.

The design is settled elsewhere and is not repeated here: [`spec.md`](spec.md) for requirements and
AC1–AC18, [`CONTEXT.md`](CONTEXT.md) for ADR-1–ADR-17 and facts 1–14. This file records the
mechanisms the spec left to the plan, and what building them cost.

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
`onClick`. A `popover="auto"` has native light dismiss, and it acts inside the click itself.

Measured 2026-09-11 in the desktop app's Chromium, a bare `popover="auto"` opened with
`showPopover({ source })` and a real click outside it:

| Event                 | ms after the page's clock started |
| --------------------- | --------------------------------- |
| `pointerdown`         | 12305                             |
| `beforetoggle closed` | 12306                             |
| `pointerup`           | 12306                             |

The browser closes the popover within the click, and fact 14 established it cannot be refused. So
`Dialog`'s pattern would start a 150ms fade on `pointerdown` and have the browser hide the element
partway through it — on every real click outside, and invisibly to `play()`.

Not established: whether a `keydown` handler can stop a real Escape closing the popover natively.
The browser tool's Escape did not close even an unguarded popover, so its key presses are not
trusted input — the same dead end fact 14 recorded.

## Phases

- [x] **1 — Semantics and naming, on Radix.** The role follows the name, `title` / `description` on
      `PopoverContent`, `PopoverAnchor` removed, triggers stop claiming a dialog, `SelectTrigger`'s
      `aria-controls` resolves to the listbox, both `aria-dialog-name` suppressions removed, the
      `Select` helpers rewritten around the listbox, and `Popover` stories.
- [ ] **2 — The primitive.**

### Phase 1 gates

| Gate                              | Baseline             | After Phase 1         |
| --------------------------------- | -------------------- | --------------------- |
| `pnpm turbo run build --force`    | 11/11                | 11/11, 0 cached       |
| `pnpm lint`                       | —                    | 0                     |
| `cd apps/storybook && vitest run` | 41 files, 395 passed | 42 files, 398 passed  |
| `pnpm prettier:check`             | —                    | 4 failures, none ours |

The Prettier failures predate this work: `docs/18-overlay-api/CONTEXT.md`,
`docs/20-popover-semantics/CONTEXT.md` and `spec.md` are unformatted at `c8cba19`, and
`.claude/settings.local.json` is untracked. Left alone.

### Found while rewriting the `Select` helpers

`SingleWithoutSearch` asserted the popover contained no `combobox` to prove the search input was
absent. The search input is a `textbox`, so the assertion could never fail. It now queries for the
textbox.
