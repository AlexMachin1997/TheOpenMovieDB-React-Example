# Discovery: Button component enhancements

## Problem Statement
`Button` (`packages/ui-core/src/components/Button/Button.tsx`) is currently a thin
shadcn/ui-style wrapper — `variant`, `size`, `asChild`, and native prop passthrough via
CVA's `buttonVariants`. It has no first-class support for icons, loading/pending state,
or keyboard-accessible activation when rendered as something other than a native
`<button>` — callers hand-roll these individually and inconsistently today.

## Context
- **Users**: internal consumers of `@repo/ui-core` — the `apps/the-open-movie-database`
  app and Storybook stories. Solo maintainer (Alex) is effectively also "the user" for
  future sessions.
- **Current behavior**:
  - Icons work today only informally, as plain children (see the `WithIcons` story) —
    no dedicated icon props.
  - `asChild` (Radix `Slot`) already supports rendering as an arbitrary child element/
    component (anchor, custom component) — this already satisfies "override the
    rendered element."
  - No loading/pending state exists anywhere in the codebase (no `Spinner`/`Loader`
    component, no `Loader2` usage). `lucide-react` (^0.541.0) is already a dependency
    of `ui-core` and used elsewhere (`Search.tsx`), so a spinner icon is available.
  - No default `type` — inside a `<form>`, `<Button>` silently becomes `type="submit"`
    (native HTML default) unless the caller remembers to override it. The older,
    separate `apps/the-open-movie-database/.../Core/Button/Button.tsx` does set
    `type='button'` explicitly.
  - `ui-forms`, `ui-overlays`, and `ui-command` all already depend on `@repo/ui-core`
    as a workspace package, so anything exported from `ui-core`'s `~/hooks` is
    immediately reusable by all three without new plumbing.

## Constraints
- Keep `ui-core` and the app's separate `Core/Button` as-is — no package merging
  (existing decision).
- No public prop signature should silently break existing usage — this is additive.
- Component tests are Storybook `play()` interactions, not `.spec.tsx` files.
- Don't wire up other components (Command, Popover) to a new keyboard hook as part of
  this deliverable, even though the hook should be written generically enough to allow it
  later — they don't need it yet.
- Don't build a full Icon-registry/mapping component as part of this deliverable — bigger
  scope than a Button enhancement warrants; defer to its own discovery if wanted later.

## Assumptions
- A native `<button>` (i.e. `asChild` not used) needs no manual keyboard-activation
  logic — the browser already fires `click` on Enter/Space for real buttons. Any new
  keyboard-activation hook only matters when `asChild` renders something that isn't
  natively interactive.
- `startIcon`/`endIcon` should accept an icon **component reference**
  (`React.ComponentType<{ className?: string }>`, matching lucide-react's icon shape)
  rather than raw `ReactNode`, so Button can apply consistent sizing internally.

## Open Questions (carried into the spec's Open Questions section)
- Loading spinner placement: replace the end icon specifically, or the whole content?
  Is an optional `loadingText` in scope?
- Disabled semantics: keep native `disabled` (current, simplest) or move to
  `aria-disabled` + manually blocked clicks (stays focusable/announced)?
- Does the "keyboard active" glow/outline apply only to the `asChild`-to-non-native-
  element case, or also as a visual enhancement on native buttons?
- Is enforcing/documenting an accessible name for icon-only (`size='icon'`) buttons in
  scope for this deliverable?

## Success Criteria
- `Button` supports `startIcon`/`endIcon`, a `loading` state, and defaults to
  `type="button"`, without breaking any existing usage.
- `asChild`-rendered non-native elements get correct keyboard activation (Enter/Space)
  and `role="button"` semantics, via a hook colocated in `ui-core` and reusable later by
  other packages.
- `pnpm build` / `pnpm lint` / `pnpm test` stay green.
