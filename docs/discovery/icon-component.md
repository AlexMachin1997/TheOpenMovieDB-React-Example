# Discovery: Icon component

## Problem Statement
There is no shared `Icon` component. Every package that needs an icon
(`ui-core`, `ui-forms`, `ui-overlays`, `ui-command`) imports a specific icon
component directly from `lucide-react` and hand-rolls its own sizing,
`aria-hidden` handling, and visual treatment inline — resulting in
inconsistent sizes (`size-2` through `size-6` observed) and no shared
accessibility convention. Button's own enhancement spec
([`button-enhancements.md`](../specs/button-enhancements.md)) needs a
predecessor `Icon` component for its `startIcon`/`endIcon`/spinner rendering
rather than re-implementing this itself.

## Context
- **Users**: internal consumers of the component library packages
  (`@repo/ui-core`, `@repo/ui-forms`, `@repo/ui-overlays`, `@repo/ui-command`)
  — the `apps/the-open-movie-database` app and Storybook stories. Solo
  maintainer (Alex) is effectively also "the user" for future sessions.
- **Current behavior** (as of this discovery):
  - `lucide-react` (`^0.541.0`) is a direct dependency of `ui-core`,
    `ui-forms`, `ui-overlays`, and `ui-command` individually — no shared
    catalog entry, each package pins its own version.
  - Icons are imported and rendered inline with ad-hoc sizing/treatment, e.g.:
    - `Search.tsx`: `<SearchIcon className='size-4 shrink-0 opacity-50' aria-hidden='true' />`
    - `Radio.tsx`: `<CircleIcon className='fill-primary ... size-2 ...' />` — a
      **filled** dot, not lucide's default stroke/outline style.
    - `Checkbox.tsx`: `<CheckIcon className={cn('size-3.5', iconClassName)} />`
    - `DropdownMenu.tsx`: `size-3.5`/`size-4` mixed, plus a `[&_svg:not([class*='size-'])]:size-4`
      fallback pattern.
    - `Calendar.tsx`: chevron icons are rendered via a `components.Chevron`
      render-prop supplied to `react-day-picker`, which forwards its own
      `className`, `orientation`, and other props (including a `size` field)
      onto whatever is rendered.
    - `Dialog`/`Sheet`/`Select`/`Accordion` and others each pick their own
      size (`size-3`, `size-4`, `size-6`) with no shared scale.
  - 18 real source/story files import from `lucide-react` directly (excluding
    `pnpm-lock.yaml` and `package.json` manifests).
  - `lucide-react@0.541.0` ships a `DynamicIcon`/`dynamicIconImports`
    mechanism (name-string → lazy `import()`), confirmed present in
    `node_modules`, but it resolves asynchronously (renders `null`/fallback
    until the chunk loads) — not a drop-in replacement for the synchronous
    rendering Button needs for e.g. its loading spinner.
  - `@iconify/react` was evaluated as an alternative name-string API. By
    default it fetches icon SVG data at runtime from the public
    `api.iconify.design` CDN unless icon data is bundled locally ahead of
    time (`addIcon`/`addCollection`, or a local `@iconify-json/*` collection
    package). Offline/bundled resolution is deferred — see Decisions in the
    spec — so this deliverable uses the default CDN-backed resolution.

## Constraints
- Keep the existing package boundaries as-is — no package merging (existing
  decision).
- Component tests are Storybook `play()` interactions, not `.spec.tsx` files.
- Icon must render synchronously (no loading flash) so Button can use it for
  content that must appear immediately (e.g. its loading spinner). This is
  about the render being synchronous once icon data is available — it does
  not rule out `@iconify/react`'s default CDN-backed data resolution (see
  Decisions in the spec: offline bundling is deferred, not required for this
  deliverable).

## Assumptions
- Adopting `@iconify/react` means retiring `lucide-react` as a direct
  dependency across all four packages, migrating every existing raw
  `lucide-react` import onto the new `Icon` component (confirmed in scope —
  see the spec's Decisions).
- Using the `@iconify-json/lucide` collection (Iconify's mirror of lucide's
  own icon data) preserves the current stroke/outline visual style 1:1, so
  migration is a name-for-name swap rather than re-picking icons across the
  app.
- Icon is decorative-only (`aria-hidden="true"` always) — no consumer today
  needs a standalone icon to carry its own accessible name; text/labels
  elsewhere already provide it.
- Icon's public `name` prop takes a bare icon name (e.g. `"search"`), not
  Iconify's full `prefix:name` identifier (e.g. `"lucide:search"`) — Icon
  only ever resolves against one collection, so the prefix is an internal
  implementation detail, not something callers write.
- Misspelled/unknown icon names are caught at compile time via TypeScript (a
  typed union of known names), not a runtime diagnostic — there is no
  "invalid name" runtime case to design for.

## Open Questions (carried into the spec)
- Whether Icon's named size tokens should numerically match Button's own size
  scale, or be defined independently to cover the smaller sizes already seen
  in the wild (e.g. Radio's `size-2` dot).
- `Calendar.tsx`'s `react-day-picker` `Chevron` render-prop forwards its own
  `size` field alongside `className` — a possible naming collision with
  Icon's own `size` prop that needs resolving during that specific migration.

## Success Criteria
- A shared `Icon` component exists in `ui-core`, accepting a bare icon name
  string (typo-checked at compile time via TypeScript), rendering via
  `@iconify/react`'s default (CDN-backed) resolution, always
  `aria-hidden="true"`.
- Every existing raw `lucide-react` usage across `ui-core`, `ui-forms`,
  `ui-overlays`, and `ui-command` is migrated onto it, and `lucide-react` is
  removed as a direct dependency from all four packages.
- Button's enhancement spec is updated to reflect `startIcon`/`endIcon` as
  icon name strings, unblocking its implementation-planning.
- `pnpm build` / `pnpm lint` / `pnpm test` stay green.
