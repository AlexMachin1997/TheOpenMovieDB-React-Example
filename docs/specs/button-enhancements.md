# Feature: Button component enhancements

## Problem
See [`docs/discovery/button-enhancements.md`](../discovery/button-enhancements.md).
In short: `Button` is currently a thin shadcn/ui wrapper with no first-class icon
support, no loading state, no default `type`, and no keyboard-accessible activation
when rendered via `asChild` as something other than a native `<button>`.

## Goals
1. Let callers add a leading and/or trailing icon without hand-rolling sizing/spacing.
2. Give Button a first-class `loading` state (spinner + busy semantics), replacing
   ad-hoc disabled/spinner logic callers currently write themselves.
3. Make `asChild`-rendered custom elements fully keyboard-accessible (Enter/Space),
   matching what a native `<button>` already gets for free.
4. Default to the safe, unsurprising `type="button"` so Button never accidentally
   submits a form.
5. Make the keyboard-activation behavior reusable by other components later, without
   wiring up any other component to it yet.

## Scope
- **Included**: `startIcon`/`endIcon` props, `loading` prop, default `type="button"`,
  a reusable keyboard-activation mechanism applied when `asChild` renders a non-native
  element, updated `aria-*` attributes, Storybook coverage for all of the above.
  (How the mechanism is structured/named/located is an `implementation-planning`
  decision, not part of this spec.)
- **Not included**: an Icon-registry/mapping component, wiring the keyboard hook into
  Command/Popover/other components, a `ButtonGroup`/segmented-button component,
  changes to the separate app-level `Core/Button`.
- **Can be delivered independently**: no longer fully — this deliverable now depends on
  a predecessor: a shared `Icon` component (own spec, not yet written) that Button's
  `startIcon`/`endIcon`/spinner rendering consumes. See Decisions below. Independent of
  the barrel/export conventions work (D6) elsewhere in the repo.

## Non-Goals
- Building a component that maps icon *names* (strings) to lucide-react/custom icons.
  Callers pass an icon component reference directly.
- Retrofitting existing consumers to use the new props — this is purely additive.
- Any visual restyling of existing variants/sizes.

## Requirements

### Functional
- `startIcon`/`endIcon` accept an icon name string (not raw markup/`ReactNode`, not a
  component reference), rendered internally via the predecessor `Icon` component (see
  Decisions) so sizing/spacing/`aria-hidden` is consistent and not re-implemented inside
  Button. Exact prop typing is an `implementation-planning` decision.
- `loading?: boolean` prop: when `true`, the button is non-interactive — both the native
  `disabled` attribute and an explicit `aria-disabled="true"` are set (native `disabled`
  governs real interactivity/tab order; `aria-disabled` is kept as an explicit, stable
  attribute for automated tests, e.g. Playwright, even though it's redundant for
  screen readers) — plus `aria-busy="true"`. A spinner icon renders in place of the end
  icon; if no `endIcon` was provided, the spinner still renders at the end position. The
  button's accessible name does not change while loading.
- `disabled?: boolean` (existing native prop): same dual `disabled` + `aria-disabled="true"`
  behavior as `loading`, for consistency and the same testability reason.
- `type` defaults to `"button"` when not explicitly provided; callers can still pass
  `type="submit"`/`type="reset"` to opt in.
- When `asChild` is used and the passed child does not natively support keyboard
  activation, pressing Enter or Space triggers the same behavior as a click:
  - Enter fires on `keydown`.
  - Space fires on `keyup`, with `preventDefault()` on `keydown` to stop page scroll.
  - This logic must NOT run for a plain native `<button>` (`asChild` false) — the
    browser already handles it; adding it there would double-fire `onClick`.

### UI/UX
- Icon sizing/spacing is visually consistent across `sm`/`default`/`lg`/`icon` sizes.
- Loading state is visually distinguishable at a glance (spinner replaces the end icon).
- Keyboard-focus visual state (existing `focus-visible` ring) is unaffected.
- A keyboard-"active"/pressed visual treatment (distinct from `focus-visible`) applies
  uniformly whether the underlying element is a native `<button>` or an
  `asChild`-rendered non-native element — interacting with it as a button or a link
  should look/feel the same. Tracking "pressed via keyboard" for this visual state is a
  separate concern from synthesizing `onClick` — the latter still only happens for the
  non-native case (see Functional requirements above), so native buttons/links never
  double-fire.

### Accessibility
- Button must meet **WCAG 2.1 AA** across every variant/size/state introduced by this
  deliverable (loading, icon-only, `asChild`, disabled). Verified via an automated scan
  (the already-installed `@storybook/addon-a11y`, which runs axe-core) across all
  Button stories, not manual judgment alone.
- Any AA violation the scan surfaces that is **not** caused by this deliverable's own
  changes (i.e. pre-existing on the current Button) is flagged and tracked separately —
  fixing pre-existing, unrelated violations is out of scope here.
- Scope of the automated check is Button's own stories only. This does **not** turn
  `@storybook/addon-a11y` into a blocking CI gate across the rest of the component
  library — the existing packages likely have their own pre-existing violations, and
  flipping that on globally in one go isn't realistic. Rolling the check out more
  broadly (and deciding whether/how it gates CI) is a separate, gradual effort outside
  this deliverable.
- `role="button"` is applied only in the `asChild`-to-non-native-element case (redundant
  and unnecessary on a real `<button>`).
- `aria-busy="true"` while `loading`.
- `startIcon`, `endIcon`, and the loading spinner render with `aria-hidden="true"` —
  they're decorative; they must never be the sole source of the button's accessible
  name.
- Icon-only buttons (`size="icon"` with no text children) must have an accessible name
  via `aria-label` or `aria-labelledby`. When one isn't present, Button emits a
  non-throwing development-time diagnostic (e.g. a console warning) so the omission is
  caught during development rather than shipped silently.

### Integration
- No new runtime dependency — `lucide-react` is already present in `ui-core`.
- The keyboard-activation mechanism must be reusable by `ui-forms`/`ui-overlays`/
  `ui-command` later without new cross-package plumbing — they already depend on
  `@repo/ui-core`. Where the code actually lives is an `implementation-planning`
  decision.

## Edge Cases & Error Handling
- `loading` + `startIcon`/`endIcon` both provided: end icon is replaced by the spinner;
  start icon remains visible.
- `loading` with `asChild`: spinner/disabled semantics still apply even though the
  rendered element isn't a native `<button>`.
- `disabled` and `loading` both `true`: behaves as disabled (loading doesn't need to add
  anything disabled doesn't already cover), but `aria-busy` still reflects `loading`
  specifically so assistive tech can distinguish "disabled" from "busy."
- `asChild` with a child that already handles its own keyboard activation (e.g. a real
  `<a href>`): the hook must not double-fire — Enter already works natively on anchors;
  only Space needs synthesizing there since anchors don't natively respond to it.
- Consumer passes both `onClick` and `loading=true`: `onClick` must not fire while
  loading.
- User is actively pressing the button (keyboard or pointer — the "active"/pressed
  visual state is engaged) and it becomes `disabled` or `loading` mid-press (e.g. an
  async state update disables it before keyup/pointerup): the pressed/active visual
  state must clear immediately, not remain visually "stuck." A disabled element can stop
  receiving further pointer/keyboard events, so the pressed state cannot rely solely on
  a keyup/pointerup handler to unset itself — it must also clear as a direct
  consequence of `disabled`/`loading` becoming true.

## Success Criteria
Deliberately short — the detailed, testable conditions live in Acceptance Criteria
below; this is only the non-behavioral "is it actually done" checklist that AC doesn't
cover on its own.
- [ ] All Acceptance Criteria below pass.
- [ ] No existing Button story's rendered output changes as a side effect (purely
      additive — nothing here should require touching current consumers).
- [ ] `pnpm build` / `pnpm lint` / `pnpm test` stay green.

## Acceptance Criteria
This list is meant to be the direct basis for Storybook `play()` tests — each item
should map to one test.

**`type` default**
- Given a `Button` with no `type` prop, when rendered inside a `<form>`, then it has
  `type="button"` and does not submit the form when clicked.
- Given a `Button` with `type="submit"` explicitly set, when rendered inside a `<form>`,
  then clicking it does submit the form (the default does not override an explicit
  value).

**Icons**
- Given a `Button` with `startIcon="plus"` and text children, when rendered, then
  the icon appears before the text, sized consistently with existing icon usage
  (`size-4`), and carries `aria-hidden="true"`.
- Given a `Button` with `endIcon="arrow-right"` and text children, when rendered,
  then the icon appears after the text with `aria-hidden="true"`.
- Given a `Button` with both `startIcon` and `endIcon`, when rendered, then both appear
  in their respective positions simultaneously.

**Loading**
- Given a `Button` with `loading={true}` and an `endIcon`, when rendered, then the
  spinner appears at the end position instead of the icon, and `aria-busy="true"` is
  set.
- Given a `Button` with `loading={true}` and no `endIcon`, when rendered, then the
  spinner still renders at the end position.
- Given a `Button` with `loading={true}`, when rendered, then both `disabled` and
  `aria-disabled="true"` are present, and the visible text/accessible name is unchanged
  from the non-loading state.
- Given a `Button` with `loading={true}` and an `onClick` handler, when the button is
  clicked (or activated via keyboard), then `onClick` does not fire.

**Disabled**
- Given a `Button` with `disabled={true}` (and `loading` not set), when rendered, then
  both `disabled` and `aria-disabled="true"` are present.
- Given a `Button` whose keyboard-activation mechanism tracks a pressed/"active" state
  internally, and that state is currently engaged (Space or Enter held), when
  `disabled` or `loading` transitions from `false` to `true` before keyup, then the
  tracked pressed state resets to unengaged in that same update — not just eventually,
  and not only in response to a later keyup that may never arrive on a now-disabled
  element. (Tests this via a Storybook `play()` interaction per this repo's convention,
  asserting the pressed indicator is gone immediately after the transition.)

**Keyboard activation**
- Given a `Button` with `asChild` wrapping a non-native element (e.g. a `<div>`-backed
  custom component), when the element is focused and Enter or Space is pressed, then
  the `onClick` handler fires exactly once per press.
- Given a plain `Button` (no `asChild`), when Enter or Space is pressed while focused,
  then `onClick` fires exactly once (proving no double-fire from the new mechanism).
- Given a `Button` with `asChild` wrapping a real `<a href>`, when Enter is pressed,
  then `onClick`/navigation fires exactly once (native behavior, not double-fired by the
  new mechanism); when Space is pressed, then it also fires exactly once (synthesized,
  since anchors don't natively respond to Space).
- Given any `Button` variant (native or `asChild` non-native), when Enter or Space is
  held down, then the keyboard-"active" visual treatment engages consistently in both
  cases, and clears on release.

**Icon-only accessibility**
- Given a `Button` with `size="icon"` and an `aria-label`, when rendered, then no
  development-time diagnostic is emitted.
- Given a `Button` with `size="icon"` and no `aria-label`/`aria-labelledby`/text
  children, when rendered in development mode, then a diagnostic (e.g. console warning)
  is emitted, and the button still renders (non-throwing).

**WCAG AA**
- Given every story added/modified for this deliverable, when scanned with
  `@storybook/addon-a11y`, then zero new AA violations are reported.

## Decisions (previously Open Questions)
- **Spinner placement**: replaces the end icon specifically (not all content); button
  text stays visible. `loadingText` is **not** in scope for this deliverable — the
  accessible name must not change while loading (see Accessibility).
- **Disabled semantics**: both native `disabled` and explicit `aria-disabled="true"` are
  set together, for `disabled` and `loading` alike — native attribute for real
  behavior, `aria-disabled` as a stable, explicit hook for automated tests.
- **Keyboard "active" glow scope**: applies uniformly to native buttons and
  `asChild`-rendered non-native elements. Onclick-synthesis remains native-only-exempt
  (unchanged from Functional requirements) — only the visual pressed-state is universal.
- **Icon-only accessible name enforcement**: in scope. Enforced via a development-time
  diagnostic (not a thrown error, not a TypeScript-level constraint), per Accessibility
  above.
- **Dedicated `Icon` component**: reversed from the earlier proposal — this is now a
  **predecessor** deliverable, not a follow-up. Button's `startIcon`/`endIcon` and
  internal spinner consume it rather than reimplementing sizing/`aria-hidden` handling
  themselves, avoiding rework once the shared component lands. Its spec is now written —
  see [`icon-component.md`](icon-component.md) — but implementation is not yet done, so
  this deliverable remains blocked per `docs/specs/README.md`.
- **`startIcon`/`endIcon` typing reversed to a name string**: originally assumed to be an
  icon component reference (`React.ComponentType<{ className?: string }>`); superseded by
  Icon's own spec decision to accept a bare icon name string (Iconify-style API backed by
  `@iconify/react`, replacing `lucide-react`), TypeScript-checked against a union of known
  names. `startIcon`/`endIcon` now forward a name string into Icon rather than a component
  reference. Note: Icon's spec defers offline/bundled icon data to a follow-up — for now
  icon data resolves via `@iconify/react`'s default CDN-backed mechanism, which has a
  first-render network-fetch gap worth re-checking once this deliverable's own
  implementation-planning starts, given Button's spinner needs to render immediately (see
  Icon's spec, Edge Cases). Existing raw-icon usages elsewhere (e.g. `Search.tsx`'s manual
  `SearchIcon`/`XIcon` handling) are migrated onto `Icon` as part of the predecessor
  deliverable itself (see its spec's Scope) — no longer optional/separate.

## Open Questions
None remaining — see Decisions above.

## Design References
- Existing stories: `Variants`, `Sizes`, `WithIcons`, `Disabled`, `AsChild` in
  `packages/ui-core/src/components/Button/Button.stories.tsx`.
