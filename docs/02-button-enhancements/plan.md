# Implementation plan: Button enhancements

Spec: [`spec.md`](./spec.md) · Discovery: [`discovery.md`](./discovery.md)

Status: **shipped**. This document is the as-built record — the reasoning behind the shape of the
code, the alternatives that were rejected, and the traps found on the way. User-facing usage
documentation lives in `packages/ui-core/src/components/Button/Button.mdx` and
`packages/ui-core/src/hooks/useKeyboardActivation.mdx` (Storybook).

---

## Context

`Button` was a thin shadcn wrapper: `variant`, `size`, `asChild`, and a props spread. Everything
else callers hand-rolled — inline `<svg>` markup, ad-hoc spinner and disabled logic, and in
`SelectItemClear.tsx` a bespoke keydown handler to make an `asChild` `<div>` reachable from a
keyboard at all. It also inherited HTML's `type="submit"` default, so an unmarked Button inside a
form submitted it.

This deliverable folds those four things into the component. It landed directly after the `Icon`
component (`50c8b14`), which it depends on: `startIcon`/`endIcon` and the spinner all render through
`Icon` rather than reimplementing sizing and `aria-hidden` handling.

---

## Architecture

| File                                   | Role                                                   |
| -------------------------------------- | ------------------------------------------------------ |
| `hooks/useKeyboardActivation.types.ts` | Options/result interfaces — the public contract        |
| `hooks/useKeyboardActivation.ts`       | The hook                                               |
| `hooks/useKeyboardActivation.spec.ts`  | 15 unit tests, one per behavioural AC                  |
| `hooks/useKeyboardActivation.mdx`      | Consumer docs — it's exported from the package         |
| `components/Button/Button.tsx`         | Element resolution, icon composition, the diagnostic   |
| `components/Button/Button.types.ts`    | `startIcon` / `endIcon` / `loading` added to `IButton` |
| `components/Button/variants.ts`        | `aria-disabled:*` rules, pressed glow                  |
| `components/Button/Button.stories.tsx` | 26 stories, every AC covered by a `play()`             |
| `components/Button/Button.mdx`         | Consumer docs                                          |

`useKeyboardActivation` is exported from `src/index.ts`; `useDebouncedValue` deliberately is not.
The spec requires the mechanism to be adoptable by `ui-forms`/`ui-overlays`/`ui-command` later
without new plumbing, and they already depend on `@repo/ui-core` — so a barrel export is the whole
of the "plumbing". Nothing else was wired to it in this deliverable.

### Element resolution

Everything Button varies depends on what it actually renders, which it works out from the child:

```ts
const child = asChild && React.isValidElement(children) ? children : null;
const rendersButton = !asChild || child?.type === 'button';
const rendersAnchor = child?.type === 'a' && childProps?.href !== undefined;
const rendersNonNative = !rendersButton && !rendersAnchor;
```

| Rendered element          | `role`   | `tabIndex` | `nativeActivation` | `type` default | `disabled` attr |
| ------------------------- | -------- | ---------- | ------------------ | -------------- | --------------- |
| `<button>` (no `asChild`) | —        | —          | `both`             | ✅             | ✅              |
| `asChild` + `<button>`    | —        | —          | `both`             | ✅             | ✅              |
| `asChild` + `<a href>`    | —        | —          | `enter-only`       | ✗              | ✗               |
| `asChild` + anything else | `button` | `0`        | `none`             | ✗              | ✗               |

Three decisions are encoded there:

- **`type` is only defaulted where it's valid.** `<a type="button">` is wrong HTML — `type` on an
  anchor is a hint about the linked resource's MIME type, not a button behaviour. An explicit
  `type="submit"` always wins over the default.
- **`disabled` is only set where it's valid.** A `<div disabled>` means nothing. Non-native children
  get `aria-disabled` instead, which the variants back with
  `aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:cursor-not-allowed` —
  that `pointer-events-none` is what actually makes a disabled `<div>` unclickable.
- **`tabIndex={0}` goes wherever `role="button"` goes, and nowhere else.** `role="button"` on a
  non-focusable div is a lie. Native buttons and links are already tab stops and are left alone.

Radix `Slot` gives _child_ props precedence for everything except event handlers, so a child
supplying its own `role`, `tabIndex` or `type` still overrides these defaults.

### Why activation dispatches a real DOM click

`useKeyboardActivation` calls `event.currentTarget.click()`. It has no `onClick` option, and the
first draft's version — capture `onClick`, call it on Enter — is wrong in a way that only shows up
under `Slot`.

Radix's `mergeProps` chains handlers rather than overriding them (`@radix-ui/react-slot@1.2.3`,
`dist/index.mjs:67-76`): the child's handler runs, then the slot's, unconditionally. So for
`<Button asChild onClick={a}><div onClick={b} /></Button>` a real click runs `b` then `a`, while a
synthesised call to a captured `onClick` would run only `a`. A DOM click runs the whole chain, once,
which is exactly what "Enter behaves like a click" is supposed to mean.

### Clearing the pressed state mid-press

The spec's hardest edge case: the button becomes `disabled`/`loading` while a key is still held. The
element stops receiving events at that point, so the keyup that would release the pressed state
never arrives, and a handler-only reset leaves the glow visually stuck.

Solved by adjusting state during render rather than in an effect:

```ts
if (pressed && disabled) setPressed(false);
const isPressed = pressed && !disabled;
```

React discards the render and immediately re-runs it, so nothing is ever committed showing the stale
value — no flash, and no effect ordering to reason about. The derived `isPressed` is belt-and-braces:
the first line resets the _tracked_ state, the second guarantees the value returned from this very
render is already correct.

An effect (`useEffect(() => { if (disabled) setPressed(false) }, [disabled])`) would also work but
commits one frame with the pressed treatment still applied, which is the exact artefact being fixed.

### Icon composition

`Slottable` (from the same Radix package) is what makes icons work with `asChild`. Without it, Slot
demands a single child and the icons would replace the slotted element:

```tsx
<Comp ...>
	{startIcon ? <Icon name={startIcon} /> : null}
	<Slottable>{children}</Slottable>
	{loading ? <Icon name='loader-circle' className='animate-spin' /> : endIcon ? <Icon name={endIcon} /> : null}
</Comp>
```

Icons land as direct children of whatever is rendered, which keeps the existing
`has-[>svg]:px-*` padding rules and `[&_svg:not([class*='size-'])]:size-4` sizing working unchanged
— both target a **direct** `svg` child. (That is also why `Icon`'s loading placeholder had to be a
real `<svg>`; see the Icon plan.)

The spinner replaces the end icon only. A leading icon and the text stay put, so the accessible name
is identical loading or not — a button must not rename itself halfway through an action.

### The pressed treatment

Base classes carry the _shape_ (`active:scale-[0.97] active:shadow-sm`, plus the same pair under
`data-[pressed=true]:`); each variant carries the _hue_ (`active:shadow-primary/60`,
`shadow-destructive/60`, and so on). Two triggers for one look: `:active` is CSS and works on any
element for pointer presses, `data-pressed` is set by Button from the hook for keyboard presses.
`transition-all` was already on the base class, so it animates for free.

**Revised after review.** The first version was `shadow-md` alone with no transform, on the reasoning
that a transform would "compete with `focus-visible`'s ring." That was wrong twice over: a ring is
colour and a scale is geometry, so they occupy different visual channels and read fine together, and
Tailwind v4's `scale-*` sets the standalone `scale` property rather than `transform`, so nothing
reflows — the `link` variant included.

The real defect was subtler and only visible in a browser. **A drop shadow that grows on press reads
as the button lifting off the page** — the elevation metaphor — which is the opposite of what a press
should convey. The treatment was fighting the interaction it described, which is why it was hard to
notice even once the colour was right. Shrinking the button and pulling the shadow in tight
(`shadow-sm`, one step from the resting `shadow-xs`) reads as sinking instead. Shadow alphas went up
a notch (`/50` → `/60` and equivalents) to compensate: `shadow-sm` spreads over far fewer pixels than
`shadow-md`, so the same alpha reads as less colour.

Verified in the browser across all six variants in both themes, resting against pressed.

### The icon-only diagnostic

Fires when `size === 'icon'` and there is no `aria-label`, no `aria-labelledby`, and no _text_ child
— "text child" meaning a string or number in `React.Children.toArray(children)`, so an
`<Icon>`-only button warns while `<Button size='icon'>🔍</Button>` does not.

**The warning is not dev-gated, by decision.** The obvious guard, `import.meta.env.DEV`, is baked to
`false` when Vite builds `ui-core` to `dist/`, so it would be dead for the app — which imports the
built package, and is exactly where you'd want the warning. `process.env.NODE_ENV` has the same
problem unless `packages/vite-config/react-library.ts` adds a passthrough `define`, which was
considered and rejected as too much blast radius for this deliverable. Warning unconditionally is
the trade-off: the diagnostic always works, at the cost of also appearing in production builds.
**If a dev-only guard is wanted later, the passthrough `define` is the fix — not `import.meta.env`.**

---

## Traps found during implementation

### Storybook `userEvent` resets keyboard state between calls

`userEvent.keyboard('[Space>]')` followed by `userEvent.keyboard('[/Space]')` does **not** release
the key: the one-shot API starts from a fresh keyboard state each call, so the release refers to a
key it doesn't believe is down, and the pressed state never clears. Any story that holds a key across
assertions has to use a session — `const user = userEvent.setup()` — and call `user.keyboard(...)`
throughout.

### A navigating anchor kills the Vitest browser runner

`AsChildAnchor` presses Enter on a real `<a href>`. The resulting navigation tears down the page the
browser-mode runner is driving, which surfaces as `Browser connection was closed while running
tests` and takes every _subsequent_ story in the file down with it — the failure looks like a runner
bug rather than a test problem. Fixed by giving the story's `onClick` spy an implementation that
calls `preventDefault()`, which still records the call while suppressing the navigation.

### `console.warn` fires during render, not during `play()`

The diagnostic is emitted while Button renders, which is before `play()` runs — a spy installed in
the test body is too late. The icon-only stories install theirs in `beforeEach` and restore it via
the returned cleanup. The assertions filter for messages starting with `[ui-core] Button` so an
unrelated React warning landing on the same spy can't turn the negative case into a false failure.

---

## Dependencies

None added. `@radix-ui/react-slot` (already a dependency) supplies `Slottable`; icons render through
`Icon`, which owns `@iconify/react`. Two names — `download` and `plus` — were added to `ICON_NAMES`
for the rewritten `WithIcons` story.

---

## Testing strategy

Split by what each layer can actually prove:

- **`useKeyboardActivation.spec.ts` (Vitest/jsdom, 15 tests)** — the hook's decision table. Every
  `nativeActivation` value against both keys, the `preventDefault` on Space keydown, and all four
  ways `pressed` clears. Unit tests because the interesting behaviour is combinatorial, and driving
  it through a rendered Button would test the same logic nine times over with more ceremony.
- **`Button.stories.tsx` (Storybook `play()`, 26 stories)** — everything integration-shaped:
  attributes on real DOM, real key events through a real browser, form submission, the Slot merge.
  This is where the spec's Acceptance Criteria map 1:1.

Deliberately **not** tested: that the glow renders at a particular pixel value (asserted via
`data-pressed`, verified visually), and that `Icon` resolves its glyph (the Icon deliverable's job).

`parameters.a11y.test = 'error'` is set on Button's **meta**, making axe blocking for this component
only. Rolling it out further is a separate effort — the rest of the library has its own pre-existing
violations. `IconOnlyWithoutLabel` opts back out with `a11y: { test: 'off' }`: it exists to prove the
diagnostic fires, and the button it renders is by design the unnamed one axe is right to reject.

### Results at time of shipping

| Check                                   | Result                          |
| --------------------------------------- | ------------------------------- |
| `useKeyboardActivation.spec.ts`         | 15 passed                       |
| `useDebouncedValue.spec.ts`             | 7 passed (unchanged)            |
| Button `play()` stories                 | 26 passed                       |
| axe (WCAG 2.1 AA) across Button stories | 0 violations, none pre-existing |
| `turbo run build`                       | all packages green              |

### Build ordering

`check-types` depends on `^check-types`, not `^build`, so downstream packages typecheck against
`packages/ui-core/dist/index.d.ts`. Rebuild `ui-core` before anything downstream compiles against
the new `useKeyboardActivation` export. If Storybook serves stale output, clear
`apps/storybook/node_modules/.vite` **and** `apps/storybook/node_modules/.cache`.

---

## Incidental fix

`apps/storybook`'s `build` script was `tsc -b && vite build`, but the app has no `index.html` — it's
a Storybook host, not a Vite app, and its static site is built by `build-storybook`. The `vite build`
was a leftover from the scaffold and failed every time on the missing entry, breaking the root
`pnpm build`. Reduced to `tsc -b`. Pre-existing and unrelated to this deliverable.

---

## Known limitations

- **A custom-component `asChild` child is treated as non-native.** Button can't see what a function
  component renders, so it applies `role="button"`, `tabIndex={0}` and full key synthesis. A
  component that internally renders a real `<button>` will therefore fire twice per press. Workaround:
  pass the host element directly, or let the component be the button. Documented in `Button.mdx`.
- **The diagnostic warns in production builds** — see above.
- **The diagnostic is not deduplicated**, so it repeats on every render. Acceptable for something
  meant to be noticed, but worth revisiting if a warn-once helper ever lands in the package.

## Follow-ups

- Migrate `packages/ui-forms/src/components/Selects/components/SelectItemClear.tsx` onto
  `useKeyboardActivation`. It hand-rolls the exact behaviour this hook now owns, and fires Space on
  _keydown_ rather than keyup — a real (if minor) deviation from the button pattern. Explicitly out
  of scope here per the spec.
- Rename `components/Button/variants.ts` to `Button.variants.ts`. Every other component in the
  package uses the prefixed form, and the golden rules specify it; Button is the lone holdout.
- Decide whether the dev-guard passthrough `define` in `packages/vite-config/react-library.ts` is
  worth adding, which would let the diagnostic be stripped from production builds.
- Roll `@storybook/addon-a11y`'s blocking mode out beyond Button, component by component.
- Focus indicators are now their own deliverable — [`docs/03-focus-indicators`](../03-focus-indicators/spec.md).
  Button's `focus-visible:ring-ring/50` and `focus-visible:ring-destructive/20` are among the
  styles it replaces; both measure under 1.6:1 against the page, well below the 3:1 bar. Note that
  axe passed every Button story, which is expected — SC 2.4.11 contrast is not automatically
  detectable, so a green a11y scan says nothing about it.
