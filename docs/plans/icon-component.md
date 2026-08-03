# Implementation plan: Icon component

Spec: [`docs/specs/icon-component.md`](../specs/icon-component.md) ·
Discovery: [`docs/discovery/icon-component.md`](../discovery/icon-component.md)

Status: **shipped**. This document is the as-built record — it covers the engineering
decisions, the non-obvious rendering traps, and the contributor workflow. User-facing usage
documentation lives in `packages/ui-core/src/components/Icon/Icon.mdx` (Storybook).

---

## Context

There was no shared `Icon` component. 18 files across `ui-core`, `ui-forms`, `ui-overlays` and
`ui-command` imported a specific `lucide-react` component directly and hand-rolled their own
sizing and `aria-hidden`, producing inconsistent icon sizes across the library. Button's
enhancement spec was blocked on a predecessor `Icon` rather than re-implementing icon rendering
itself.

### `lucide` vs `lucide-react`

`lucide-react` (the npm package) is fully removed. `lucide` is separately the name of the
_Iconify collection_ mirroring the same upstream icon data, so `icon="lucide:search"` is a CDN
lookup against `api.iconify.design`. The spec picks that collection deliberately so migrated
icons stay pixel-identical instead of becoming an app-wide icon re-pick. Callers never write the
prefix — `Icon` builds it from `ICON_COLLECTION` internally.

---

## Architecture

`packages/ui-core/src/components/Icon/`

| File                | Role                                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| `Icon.constants.ts` | `ICON_COLLECTION` + the 29-name `ICON_NAMES` tuple and derived `IconName` union |
| `Icon.variants.ts`  | `iconVariants` cva — the size scale                                             |
| `Icon.types.ts`     | `IIcon`                                                                         |
| `Icon.tsx`          | The component; wraps `@iconify/react`'s `Icon`                                  |
| `Icon.stories.tsx`  | Storybook stories + `play()` tests                                              |
| `Icon.mdx`          | User-facing documentation                                                       |
| `index.ts`          | Per-component barrel                                                            |

`ICON_NAMES` is declared `as const` so it serves as both the runtime list (Storybook controls,
the showcase story) and the source of the compile-time `IconName` union — one edit updates both.
An unrecognised name is a TypeScript error at the call site; there is deliberately no runtime
fallback for an invalid name, so no diagnostic to design.

### Size scale

Defined independently of Button's scale: `Button/variants.ts` forces
`[&_svg:not([class*='size-'])]:size-4` at _every_ button size, so there is no per-button-size
icon scale to mirror.

| Token            | Class      | px  | Consumers                  |
| ---------------- | ---------- | --- | -------------------------- |
| `xs`             | `size-3`   | 12  | Search clear, Select clear |
| `sm`             | `size-3.5` | 14  | Checkbox check             |
| `md` _(default)_ | `size-4`   | 16  | ~90% of call sites         |
| `lg`             | `size-5`   | 20  | — (completes the ladder)   |
| `xl`             | `size-6`   | 24  | Dialog close               |

The 8px filled indicator dot (Radio, DropdownMenu radio items) is deliberately **not** a token —
it's a one-off treatment, handled through `className`, which `cn()` merges last so a `size-*`
utility there wins.

### The `aria-hidden` guarantee

Three independent layers, so removing it requires editing `Icon.tsx`:

1. `IIcon` omits `'aria-hidden'` from `ComponentPropsWithRef<'svg'>` — passing it is a compile error.
2. `{...props}` is spread **before** the literal in JSX, so a loosely-typed spread cannot win.
3. `aria-hidden='true'` is passed explicitly rather than relying on Iconify's default, so the
   guarantee survives an upstream change. The loading placeholder carries it too, so _both_
   render states are hidden.

### Prop omissions in `IIcon`

`IIcon` extends `Omit<React.ComponentPropsWithRef<'svg'>, …>`. Each omission earns its place:

- `aria-hidden`, `children`, `dangerouslySetInnerHTML` — Icon's contract. (`children` is also how
  Iconify overrides its own loading placeholder, so leaving it open would defeat the fallback.)
- `width`, `height` — force the size scale rather than reopening ad-hoc per-call-site sizing.
- `color`, `rotate`, `mode`, `onLoad` — **required**, not stylistic: React's `SVGAttributes`
  declares all four, and each collides with a same-named `@iconify/react` prop of an incompatible
  type. Without these omissions `tsc` rejects the `{...props}` spread outright
  (`Type 'string | number' is not assignable to type 'IconifyRenderMode'`).

A ``[key: `data-${string}`]: unknown`` index signature keeps data attributes available — used by
Calendar's chevron for `data-orientation`.

### The loading placeholder

`@iconify/react`'s `fallback` prop is public API (declared in its own `dist/iconify.d.ts`). Icon
passes an `<svg>` carrying the _same_ computed class string, `data-slot` and `aria-hidden`.

This is not cosmetic. Without it Iconify renders `createElement('span', {})` — a bare, classless
`<span>` — while fetching, which breaks every parent rule keyed on a direct `svg` child, on
**every first paint**:

| Selector                                       | Where                  | Breakage with a bare `<span>`                                                   |
| ---------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| `has-[>svg]:grid-cols-…`, `has-[>svg]:gap-x-3` | `Alert.variants.ts`    | Alert grid collapses, then snaps — title/description reflow                     |
| `has-[>svg]:px-3` / `px-2.5` / `px-4`          | `Button/variants.ts`   | Horizontal padding jumps on both DatePickers, SelectTrigger, every menu trigger |
| `[&>svg]:size-4`, `[&>svg]:translate-y-0.5`    | `Alert.variants.ts`    | Icon box 0×0, then pops to 16px                                                 |
| `[&>svg]:size-3.5`                             | `Calendar.tsx`         | Caption-dropdown chevron unsized                                                |
| `rtl:**:[.rdp-button\_next>svg]:rotate-180`    | `Calendar.tsx`         | RTL nav chevrons unrotated until load                                           |
| `[&[data-state=open]>svg]:rotate-180`          | `AccordionTrigger.tsx` | Open accordion chevron points the wrong way until load                          |
| `[&_svg:not([class*='size-'])]:size-6`         | `DialogContent.tsx`    | Close button visibly collapses                                                  |

With the placeholder, all of these match from the first paint and only the glyph appears late.
**When offline icon data lands, the `fallback` prop becomes unnecessary and should be removed.**

---

## Rendering traps found during migration

Three sites where the mechanical swap would have silently changed rendering. All three are
commented in place so they survive future edits.

**1. `DialogContent.tsx` — 24px → 16px.** `{icon ?? <XIcon />}` had no class, so the Close
button's `[&_svg:not([class*='size-'])]:size-6` guard matched and rendered 24px. Every `Icon`
emits a `size-*` class, which stops that guard matching. Fixed with an explicit `size='xl'`.
A consumer-supplied `icon` still gets 24px via the guard, unchanged.

**2. Filled dots render hollow — `Radio.tsx`, `DropdownMenu.tsx`.** `lucide-react` put
`fill="none"` on the root `<svg>`, so a CSS `fill-*` on that element inherited down and filled
the shape. Iconify puts `fill="none"` **on the shape itself** (`<circle … fill="none">`), and a
presentation attribute on an element beats a value inherited from an ancestor. A plain
`fill-primary` therefore leaves the dot hollow. Fixed with Tailwind v4's universal-descendant
variant, `**:fill-primary` / `**:fill-current`, which lands the declaration on the shape.
(`stroke="currentColor"` is unaffected, so `text-*` colouring works exactly as before.)

**3. `Avatar.stories.tsx` — Radix `Slot` merge.** `<AvatarFallback asChild>` merges its own
`size-full` with the child's className before handing it to `Icon`. Because `Icon` runs the
result through `cn()`, twMerge resolves the collision deterministically (last `size-*` wins), so
size must be passed via `className='size-4'` rather than the `size` prop. Verified rendering at
16×16.

**Non-trap, listed so the diff isn't alarming:** ~40 story sites move from `h-4 w-4` to `size-4`.
`h-4 w-4` doesn't match `[class*='size-']`, so parent guards currently apply `size-4`; afterwards
the guard skips but Icon carries its own `size-4`. 16px either way.

### Calendar's `Chevron` slot

`react-day-picker` passes `size` and `disabled` into the slot; neither is forwarded now.
Dropping them is a visual no-op: `size` only ever arrives from the caption dropdown (`size: 18`),
which `Calendar.tsx`'s `[&>svg]:size-3.5` already overrides to 14px, and nothing styles a
`disabled` svg. `data-orientation` is emitted instead, so the resolved direction is visible in
the DOM. Verified: nav chevrons 16px, caption chevrons 14px.

---

## Dependencies

`lucide-react` removed from `ui-core`, `ui-forms`, `ui-overlays`, `ui-command` and
`apps/storybook`. `@iconify/react` stays a dependency of **`ui-core` only**.

The other three packages must **not** add it. They consume `Icon` through `@repo/ui-core`, which
bundles Iconify into its dist (`react-library.ts` externalises only `@repo/*` and React —
confirmed: `dist/components/Icon/Icon.js` imports the bundled copy). A second copy would create a
second module-scope icon cache and duplicate CDN fetches.

---

## Testing strategy

**Storybook `play()` — structural assertions only.** They check that an `<svg data-slot="icon">`
renders, carries `aria-hidden="true"`, applies the default size class, that an explicit `size`
swaps it, and that `className` overrides it.

No test asserts the glyph itself resolved. That would require `api.iconify.design` to be
reachable inside the headless Playwright browser, putting `pnpm test` at the mercy of the
network. Because the loading placeholder carries the same `data-slot`, classes and `aria-hidden`,
every acceptance criterion holds without it. **Once offline icon data lands, glyph-level
assertions become worth adding.**

The compile-time check the spec asks for needs no fixture: `IconName` is a string-literal union,
so `tsc --noEmit` rejects an unknown name at every call site.

### Results at time of shipping

| Check                      | Result                   |
| -------------------------- | ------------------------ |
| Package builds             | 10/10 pass               |
| `pnpm lint`                | 11/11 tasks, 0 errors    |
| Unit tests (vitest, jsdom) | 33 pass                  |
| Storybook `play()` tests   | 288 pass across 27 files |

Note: run the Storybook project with explicit real paths — the glob otherwise matches pnpm's
symlinked copies under `packages/*/node_modules/@repo/…`, which cannot resolve the `~` alias.
This is a pre-existing repo issue, tracked separately.

```bash
cd apps/storybook && VITEST_BROWSER_HEADLESS=true npx vitest run --project storybook "packages/ui-core/src" "packages/ui-forms/src" "packages/ui-overlays/src" "packages/ui-command/src"
```

### Build ordering

`turbo.json`'s `check-types` depends on `^check-types`, **not** `^build`. Dependent packages
typecheck against `packages/ui-core/dist/index.d.ts`, so ui-core must be rebuilt before anything
downstream compiles against a new export. Migration order followed the dependency graph
`ui-core ← ui-overlays ← ui-command ← ui-forms`, rebuilding between each. If Storybook serves
stale output after a rebuild, clear `apps/storybook/node_modules/.vite`.

---

## Contributor workflow: adding an icon

1. Confirm the name exists in the collection: `https://icon-sets.iconify.design/lucide/<name>/`.
   To check several at once, the API answers directly and reports aliases and misses:
   ```bash
   curl -s "https://api.iconify.design/lucide.json?icons=name-one,name-two"
   ```
2. Add the bare name to `ICON_NAMES` in `Icon.constants.ts`, keeping the list alphabetical.

The `IconName` union, the Storybook control options and the showcase story all derive from that
array, so nothing else needs touching.

**Five of the current names are Iconify aliases**, kept because they match the `lucide-react`
exports they replaced and read more naturally at the call site. Iconify resolves them
transparently — do not "correct" them:

| Name used         | Canonical Iconify name |
| ----------------- | ---------------------- |
| `alert-triangle`  | `triangle-alert`       |
| `check-circle`    | `circle-check-big`     |
| `home`            | `house`                |
| `more-horizontal` | `ellipsis`             |
| `x-circle`        | `circle-x`             |

`loader-circle` is in the dictionary but unused today — added deliberately for Button's spec'd
loading state, per the spec's narrow exception to "migration-only, no new icons".

---

## Known limitation: CDN-dependent first render

Icon data is fetched from Iconify's CDN at runtime. The first time a given icon appears there is
a brief gap before its glyph can be drawn; the placeholder above keeps layout stable through it.
Offline or with the CDN unreachable, layout stays correct but glyphs never draw.

This is an accepted trade-off for this deliverable, explicitly deferred by the spec's Non-Goals.

## Follow-ups

- **Offline/bundled icon data** (the deferred Non-Goal). Would cover curating which icons are
  bundled and the build mechanism. When it lands: remove `Icon.tsx`'s `fallback` prop, add
  glyph-level `play()` assertions, and drop the limitation section from `Icon.mdx`.
- **`Icon.constants.ts` is not registered in `packages/eslint-config/folderStructure.mjs`.** That
  rule is currently disabled; when D6/D7 re-enables it, add a `{ name: '{folderName}.constants.ts' }`
  entry or the file will fail lint.
- **Root barrel now exports a type** (`IconName`) where it previously exported values only — an
  additive deviation for D6's export-conventions work to normalise.
