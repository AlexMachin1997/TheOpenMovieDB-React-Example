# Feature: Icon component

## Problem

See [`discovery.md`](./discovery.md). In
short: there is no shared `Icon` component. Every package that renders an
icon imports a specific `lucide-react` component directly and hand-rolls its
own sizing and `aria-hidden` handling, producing inconsistent sizes across
the library. Button's enhancement spec depends on a predecessor `Icon`
component for its `startIcon`/`endIcon`/loading-spinner rendering rather than
re-implementing this itself.

## Goals

1. Provide one component for rendering an icon by name, consistently sized
   and always marked decorative, so callers stop hand-rolling this.
2. Preserve the current visual style (stroke/outline icons) so migrating
   existing usages is a like-for-like swap, not a redesign.
3. Migrate every existing raw `lucide-react` usage across the component
   library onto Icon, and retire `lucide-react` as a direct dependency.
4. Unblock Button's enhancement spec, which consumes Icon for its
   `startIcon`/`endIcon` props and loading spinner.
5. Ship Storybook coverage for Icon consistent with how Button is documented.

## Scope

- **Included**: an `Icon` component in `ui-core` accepting a bare icon name
  string (compile-time checked) and a named size, adoption of `@iconify/react`
  using its default (CDN-backed) icon resolution, migration of all existing
  raw `lucide-react` usages in `ui-core`, `ui-forms`, `ui-overlays`, and
  `ui-command` (including their Storybook stories) onto Icon, removal of
  `lucide-react` as a direct dependency from those four packages, an update
  to Button's enhancement spec reflecting `startIcon`/`endIcon` as icon name
  strings, an icon dictionary mapping every migrated old name to its new
  name (see Icon Dictionary below), and Storybook stories for Icon itself
  (see UI/UX requirements).
- **Not included**: implementing Button's `startIcon`/`endIcon`/`loading`
  props themselves (that's Button's own deliverable, once unblocked), a
  visual redesign of any existing icon usage, offline/bundled icon data (see
  Non-Goals). One deliberate exception to "no new icons": a spinner icon
  (`loader-circle`, see Icon Dictionary) is added even though nothing in the
  codebase uses it today, because Button's already-spec'd `loading` state
  needs one and would otherwise be blocked on a name that doesn't exist yet.
- **Can be delivered independently**: yes, as a predecessor to Button's
  enhancements — this deliverable does not require Button's spec to be
  implemented first. Independent of the barrel/export conventions work (`13`)
  elsewhere in the repo.

## Non-Goals

- A component/icon-registry that maps arbitrary user-facing labels or
  categories to icons — Icon resolves a specific, known icon name to a
  rendered icon, nothing more.
- Supporting `ReactNode`/raw markup children as an alternative input — Icon
  only accepts a name string.
- A non-decorative (accessible-name-carrying) mode — every current use case
  pairs an icon with visible/accessible text elsewhere; if a genuinely
  standalone meaningful icon shows up later, that's a new deliverable.
- Adding icons beyond what's already used somewhere in the codebase today —
  except for one spinner icon (see Scope), added specifically because
  Button's spec already depends on it existing.
- **Offline/bundled icon data** — deferred to a follow-up enhancement.
  `@iconify/react`'s default CDN-backed resolution (fetching from
  `api.iconify.design` at runtime) is acceptable for this deliverable. When
  taken up later, that follow-up would cover choosing/curating exactly which
  icons are bundled and the build mechanism used to bundle them.

## Requirements

### Functional

- Icon accepts a `name` prop that is a **bare icon name** (e.g. `"search"`,
  not Iconify's full `"lucide:search"` identifier) — Icon resolves the
  collection prefix internally so callers never write it.
- `name` is typed as a union of known valid icon names (not a plain
  `string`). An unknown/misspelled name is a **TypeScript compile error**,
  not a runtime concern — there is no runtime "invalid name" fallback to
  design for. The exact set of valid names starts from the Icon Dictionary
  below (every icon migrated as part of this deliverable, plus one net-new
  spinner icon — see Non-Goals); the mechanism for keeping that union in
  sync going forward is an implementation-planning decision.
- Icon accepts a named `size` (default provided when omitted) plus a
  `className` for one-off overrides/additional treatment (e.g. Radio's
  filled dot, which needs `fill-current` and a smaller-than-default size).
  Exact token names/values are an implementation-planning decision.
- Icon resolves icon data via `@iconify/react`'s default (CDN-backed)
  resolution — offline/bundled data is deferred (see Non-Goals). See Edge
  Cases for the resulting first-render behavior.
- The icon set used preserves the current stroke/outline visual style
  (i.e. sourced from the same icon data as the `lucide-react` icons it
  replaces), so migrated usages look identical to today.

### UI/UX

- Icon sizing is visually consistent wherever it's used at a given size
  token — no more ad-hoc arbitrary size classes chosen per call site.
- Migrated usages (Search, Checkbox, Radio, Calendar, DropdownMenu, Dialog,
  Sheet, Select, Accordion, HoverCard, Command, Avatar, Alert, and their
  stories) render visually unchanged from their current appearance.
- Icon has its own Storybook stories (`Icon.stories.tsx`, co-located per this
  repo's convention), covering at minimum: a default rendering, the full
  size scale side-by-side, and a showcase of the icon set migrated as part of
  this deliverable — consistent with how `Button.stories.tsx` documents
  Button (`title`, `argTypes` for each prop, one story per notable
  variant/state). No separate `.mdx` docs page is required — Button doesn't
  have one either.

### Accessibility

- Icon always renders with `aria-hidden="true"` — there is no prop to change
  this (see Non-Goals). It must never be the sole source of an accessible
  name; callers are responsible for providing one via surrounding text or
  `aria-label` on a parent element (e.g. Button's existing icon-only
  `aria-label` requirement).

### Integration

- `@iconify/react` becomes a new dependency of `ui-core` (and any other
  package that renders icons directly, per the current per-package
  dependency pattern — there is no shared dependency catalog entry for icon
  libraries today).
- `lucide-react` is removed as a direct dependency from `ui-core`,
  `ui-forms`, `ui-overlays`, and `ui-command` once their usages are migrated.
  `apps/storybook`'s `package.json` also lists `lucide-react` directly, but
  no source file in that app actually imports it (confirmed — it only
  renders stories from the four packages), so this isn't a functional issue
  either way. Removing it there too is just tidiness, so the dependency
  doesn't linger unused once nothing else in the workspace needs it.
- Icon data resolves via `@iconify/react`'s default CDN-backed mechanism —
  `api.iconify.design` is a real runtime dependency for this deliverable.
  Making this fully offline is deferred (see Non-Goals).
- `ui-forms`, `ui-overlays`, and `ui-command` already depend on
  `@repo/ui-core` as a workspace package, so Icon is immediately usable by
  all three without new plumbing.

## Edge Cases & Error Handling

- An unknown/misspelled icon `name` is passed: not possible to reach —
  TypeScript rejects it at compile time (see Functional requirements). No
  runtime fallback/diagnostic is needed for this case.
- **First render of an icon whose data isn't yet cached** (e.g. the very
  first time a given icon name is used on a page — plausibly Button's
  loading spinner, which needs to appear immediately): `@iconify/react`'s
  default CDN-backed resolution fetches over the network before it can
  render, so there is a brief gap where nothing (or a fallback) renders.
  This is accepted for this deliverable (see Non-Goals — offline bundling
  deferred), but is a known rough edge worth surfacing, since it directly
  affects the "renders immediately" expectation Button's spinner has.
- A consumer needs a visual treatment Icon's size scale doesn't cover (e.g.
  Radio's filled dot, or a render-prop context that forwards its own
  conflicting prop names, as `react-day-picker`'s `Chevron` slot does in
  Calendar): the `className` escape hatch must allow this without requiring
  new size tokens for every one-off case.
- A package that already depends on `ui-core` renders an icon: it must be
  able to use Icon without adding its own `@iconify/react`/`lucide-react`
  dependency.
- The Iconify CDN is unreachable (offline dev, network blip, CDN outage):
  icons fail to render until connectivity returns. No offline fallback exists
  for this deliverable — flagged here, not solved, per the deferred Non-Goal.

## Success Criteria

Deliberately short — the detailed, testable conditions live in Acceptance
Criteria below.

- [ ] All Acceptance Criteria below pass.
- [ ] No migrated usage's rendered output changes visually as a side effect.
- [ ] `lucide-react` no longer appears as a direct dependency in any of
      `ui-core`, `ui-forms`, `ui-overlays`, `ui-command`, or
      `apps/storybook`'s `package.json`.
- [ ] `pnpm build` / `pnpm lint` / `pnpm test` stay green.
- [ ] Button's enhancement spec is updated to reference Icon's name-string
      API.
- [ ] Icon has its own Storybook stories, consistent with Button's.

## Acceptance Criteria

This list is meant to be the direct basis for Storybook `play()` tests where
applicable — each item should map to one test or one verifiable repo state.

**Rendering**

- Given an `Icon` with a valid `name`, when rendered, then the corresponding
  icon appears (once its data resolves — see the first-render Edge Case)
  with `aria-hidden="true"`.
- Given an `Icon` with no `size` specified, when rendered, then it renders at
  its default size.
- Given an `Icon` with an explicit `size`, when rendered, then it renders at
  that size instead of the default.
- Given an `Icon` with a `className`, when rendered, then the className is
  applied in addition to (or override of, per normal `cn()` merge order) its
  size-driven classes.
- Given an `Icon` with a `name` that isn't a recognized icon, when the code is
  type-checked, then it fails to compile — not a Storybook `play()` test,
  verified instead by a `// @ts-expect-error` fixture or equivalent
  compile-time check.

**Migration**

- Given the codebase after migration, when searching `ui-core`, `ui-forms`,
  `ui-overlays`, and `ui-command`'s source for direct `lucide-react` imports,
  then none are found outside Icon's own implementation (or `lucide-react` is
  no longer a dependency at all, if none of the icon data is sourced from it
  directly).
- Given each migrated component's existing Storybook stories, when compared
  before and after migration, then the rendered icon's appearance
  (shape/size/style) is unchanged.

**Accessibility**

- Given any `Icon` instance, when inspected, then `aria-hidden="true"` is
  always present and there is no prop capable of removing it.

**Storybook**

- Given `Icon.stories.tsx`, when opened in Storybook, then it has a `Default`
  story, a `Sizes` (or equivalent) story showing the full size scale
  side-by-side, and a story showcasing the icon names migrated as part of
  this deliverable — matching the level of coverage Button's stories provide
  (`Variants`/`Sizes`/`WithIcons`/etc. pattern).

## Decisions (previously Open Questions)

- **Icon input API**: a name string (Iconify-style, e.g. `icon="search"`),
  not a component reference. Reverses Button's originally-assumed
  `React.ComponentType` prop typing — Button's spec is updated alongside this
  one (see below). The name is a **bare** name (no `lucide:` prefix) — Icon
  resolves the collection internally, and TypeScript (not a runtime check)
  rejects unrecognized names.
- **Icon source**: `@iconify/react`, replacing `lucide-react`, using its
  default CDN-backed resolution (`api.iconify.design`) for this deliverable.
  Offline/bundled icon data is explicitly deferred to a follow-up
  enhancement — not required for this deliverable to ship. See the
  first-render Edge Case above for the resulting trade-off, most visible on
  Button's loading spinner.
- **Icon collection**: sourced from lucide's own icon data (via Iconify's
  mirror of it) to preserve the current stroke/outline visual style exactly,
  avoiding an app-wide re-pick of icons during migration. See Icon Dictionary
  below for the concrete old-name → new-name mapping.
- **Sizing**: a named size scale with sensible defaults, plus a `className`
  escape hatch for one-off overrides — not pure `className`-only passthrough
  (which wouldn't actually reduce the ad-hoc sizing this component exists to
  fix), and not a rigid scale with no override (which the existing Radio/
  Calendar/DropdownMenu edge cases need).
- **Accessibility mode**: always decorative (`aria-hidden="true"`), no
  exceptions. No current consumer needs a standalone meaningful icon.
- **Migration scope**: in scope. All existing raw `lucide-react` usages
  across `ui-core`, `ui-forms`, `ui-overlays`, and `ui-command` (and their
  stories) are migrated as part of this deliverable, and `lucide-react` is
  removed as a direct dependency from all four.
- **Button spec update**: `docs/02-button-enhancements/spec.md`'s
  `startIcon`/`endIcon` requirements and acceptance criteria are updated to
  reflect icon name strings instead of component references, once this spec
  is final (tracked as part of this deliverable).
- **Spinner icon**: `loader-circle` is added to the Icon Dictionary and the
  compile-time name union even though nothing in the codebase uses it today
  — a deliberate, narrow exception to "migration-only, no new icons" (see
  Non-Goals), because Button's already-written spec depends on a spinner
  existing and would otherwise be unable to start implementation-planning.
  The exact current lucide/Iconify name for this icon needs confirming
  during implementation (see Icon Dictionary note).

## Open Questions

- Whether Icon's size tokens numerically match Button's own size scale, or
  are defined independently (implementation-planning).
- How `Calendar.tsx`'s `react-day-picker`-forwarded `size` prop (via the
  `Chevron` render-prop slot) is reconciled with Icon's own `size` prop
  during that specific migration (implementation-planning, flagged here so
  it isn't missed).
- Whether the CDN-dependent first render (see Edge Cases) needs any UX
  treatment for Button's spinner specifically (e.g. pre-warming that one
  icon), or is accepted as-is until the offline follow-up lands — worth
  revisiting once Button's own implementation-planning starts.

## Icon Dictionary (old → new)

Every icon currently imported from `lucide-react` across the four packages,
mapped to the bare name it becomes under `Icon`. Iconify reference links
follow the pattern `https://icon-sets.iconify.design/lucide/<name>/` — spot
check these during implementation, they weren't verified via automated fetch
(the site blocks it).

| New `Icon` name    | Old `lucide-react` import(s)     | Used in                                                                                                                                                                                                                                                                                                                                                                                             | Reference                                                                            |
| ------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `alert-triangle`   | `AlertTriangleIcon`              | `Alert.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                                 | [lucide/alert-triangle](https://icon-sets.iconify.design/lucide/alert-triangle/)     |
| `bot`              | `BotIcon`                        | `Avatar.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                                | [lucide/bot](https://icon-sets.iconify.design/lucide/bot/)                           |
| `calendar`         | `CalendarIcon`                   | `SingleDatePicker.tsx`, `RangeDatePicker.tsx`, `HoverCard.stories.tsx`, `Command.stories.tsx`                                                                                                                                                                                                                                                                                                       | [lucide/calendar](https://icon-sets.iconify.design/lucide/calendar/)                 |
| `check`            | `CheckIcon`                      | `DropdownMenu.tsx`, `SelectListItem.tsx`, `Checkbox.tsx`                                                                                                                                                                                                                                                                                                                                            | [lucide/check](https://icon-sets.iconify.design/lucide/check/)                       |
| `check-circle`     | `CheckCircleIcon`                | `Alert.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                                 | [lucide/check-circle](https://icon-sets.iconify.design/lucide/check-circle/)         |
| `chevron-down`     | `ChevronDownIcon`, `ChevronDown` | `AccordionTrigger.tsx`, `Calendar.tsx`, `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                                  | [lucide/chevron-down](https://icon-sets.iconify.design/lucide/chevron-down/)         |
| `chevron-left`     | `ChevronLeftIcon`                | `Calendar.tsx`                                                                                                                                                                                                                                                                                                                                                                                      | [lucide/chevron-left](https://icon-sets.iconify.design/lucide/chevron-left/)         |
| `chevron-right`    | `ChevronRightIcon`               | `DropdownMenu.tsx`, `Calendar.tsx`                                                                                                                                                                                                                                                                                                                                                                  | [lucide/chevron-right](https://icon-sets.iconify.design/lucide/chevron-right/)       |
| `chevrons-up-down` | `ChevronsUpDownIcon`             | `SelectTrigger.tsx`                                                                                                                                                                                                                                                                                                                                                                                 | [lucide/chevrons-up-down](https://icon-sets.iconify.design/lucide/chevrons-up-down/) |
| `circle`           | `CircleIcon`                     | `DropdownMenu.tsx`, `Radio.tsx` (filled variant — needs `className` override, see Edge Cases above)                                                                                                                                                                                                                                                                                                 | [lucide/circle](https://icon-sets.iconify.design/lucide/circle/)                     |
| `credit-card`      | `CreditCard`                     | `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                          | [lucide/credit-card](https://icon-sets.iconify.design/lucide/credit-card/)           |
| `file-text`        | `FileTextIcon`                   | `Command.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                               | [lucide/file-text](https://icon-sets.iconify.design/lucide/file-text/)               |
| `git-fork`         | `GitForkIcon`                    | `HoverCard.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                             | [lucide/git-fork](https://icon-sets.iconify.design/lucide/git-fork/)                 |
| `heart`            | `HeartIcon`                      | `Avatar.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                                | [lucide/heart](https://icon-sets.iconify.design/lucide/heart/)                       |
| `home`             | `HomeIcon`                       | `Command.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                               | [lucide/home](https://icon-sets.iconify.design/lucide/home/)                         |
| `info`             | `InfoIcon`                       | `Alert.stories.tsx`, `HoverCard.stories.tsx`                                                                                                                                                                                                                                                                                                                                                        | [lucide/info](https://icon-sets.iconify.design/lucide/info/)                         |
| `keyboard`         | `Keyboard`                       | `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                          | [lucide/keyboard](https://icon-sets.iconify.design/lucide/keyboard/)                 |
| `loader-circle`    | _(none — new)_                   | Not used today; added for Button's already-spec'd `loading` spinner. Name unverified — lucide-react's `Loader2`/`Loader2Icon` may be the current export alias for this icon; confirm the exact current name during implementation. Spin animation (Tailwind's `animate-spin`) is applied by the consumer via Icon's existing `className` escape hatch — Icon itself has no animation-specific prop. | [lucide/loader-circle](https://icon-sets.iconify.design/lucide/loader-circle/)       |
| `log-out`          | `LogOut`                         | `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                          | [lucide/log-out](https://icon-sets.iconify.design/lucide/log-out/)                   |
| `monitor`          | `Monitor`                        | `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                          | [lucide/monitor](https://icon-sets.iconify.design/lucide/monitor/)                   |
| `moon`             | `Moon`                           | `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                          | [lucide/moon](https://icon-sets.iconify.design/lucide/moon/)                         |
| `more-horizontal`  | `MoreHorizontal`                 | `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                          | [lucide/more-horizontal](https://icon-sets.iconify.design/lucide/more-horizontal/)   |
| `search`           | `SearchIcon`                     | `Search.tsx`, `Command.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                 | [lucide/search](https://icon-sets.iconify.design/lucide/search/)                     |
| `settings`         | `SettingsIcon`, `Settings`       | `Avatar.stories.tsx`, `Command.stories.tsx`, `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                             | [lucide/settings](https://icon-sets.iconify.design/lucide/settings/)                 |
| `star`             | `StarIcon`                       | `HoverCard.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                             | [lucide/star](https://icon-sets.iconify.design/lucide/star/)                         |
| `sun`              | `Sun`                            | `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                          | [lucide/sun](https://icon-sets.iconify.design/lucide/sun/)                           |
| `user`             | `UserIcon`, `User`               | `Avatar.stories.tsx`, `Command.stories.tsx`, `DropdownMenu.stories.tsx`                                                                                                                                                                                                                                                                                                                             | [lucide/user](https://icon-sets.iconify.design/lucide/user/)                         |
| `x`                | `XIcon`                          | `Search.tsx`, `SheetContent.tsx`, `SelectItemClear.tsx`, `DialogContent.tsx`                                                                                                                                                                                                                                                                                                                        | [lucide/x](https://icon-sets.iconify.design/lucide/x/)                               |
| `x-circle`         | `XCircleIcon`                    | `Alert.stories.tsx`                                                                                                                                                                                                                                                                                                                                                                                 | [lucide/x-circle](https://icon-sets.iconify.design/lucide/x-circle/)                 |

29 unique icon names across 18 files (28 migrated + 1 net-new spinner). Note:
`lucide-react` exports both a `FooIcon` and a bare `Foo` alias for the same
icon (seen in `DropdownMenu.stories.tsx`, which uses the bare form) — both
map to the same new `Icon` name; the alias used doesn't change the mapping.

## Design References

- Current ad-hoc icon usages: `Search.tsx`, `Radio.tsx`, `Checkbox.tsx`,
  `DropdownMenu.tsx`, `Calendar.tsx`, `DialogContent.tsx`,
  `SheetContent.tsx`, `SelectTrigger.tsx`, `SelectListItem.tsx`,
  `SelectItemClear.tsx`, `AccordionTrigger.tsx`, `DatePickers/*`, and the
  `Avatar`/`Alert`/`HoverCard`/`Command` stories.
- Predecessor relationship: [`02-button-enhancements`](../02-button-enhancements/spec.md).
- Button's own Storybook file, as the coverage-level reference:
  `packages/ui-core/src/components/Button/Button.stories.tsx`.
