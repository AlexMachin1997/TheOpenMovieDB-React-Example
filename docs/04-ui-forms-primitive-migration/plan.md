# Implementation plan: ui-forms primitive migration

Spec: [`spec.md`](./spec.md) · Discovery: [`discovery.md`](./discovery.md)

Status: **shipped.** This is the as-built record — what was built, what was rejected, and what bit
us on the way. Consumer-facing usage documentation lives in Storybook (`Input.mdx`,
`DebouncableInput.mdx`, `RadioGroup.mdx`).

## Outcome

| Gate                   | Baseline              | After                               |
| ---------------------- | --------------------- | ----------------------------------- |
| `pnpm build`           | 11/11                 | 11/11 ✅                            |
| `pnpm lint`            | 0 errors, 40 warnings | 0 errors, 40 warnings ✅ (none new) |
| Storybook interactions | 311 passed            | **326 passed**, 0 failed ✅         |
| `ui-core` unit tests   | 22                    | **60** (+38: 21 utils, 17 hook) ✅  |

Shipped across five commits:

| Commit    | Scope                                                                    |
| --------- | ------------------------------------------------------------------------ |
| `fad7e20` | The stories-glob prerequisite — not part of 04                           |
| `b8085f8` | Phases 1–2: the move, barrels, dependencies, `RadioGroup`                |
| `3622cad` | Phase 3: `DebouncableInput` composes `Input`                             |
| `6b3d604` | Phase 4: `useRovingTabIndex` + CheckboxGroup nav + `play()` coverage     |
| `ec3e721` | Phases 6–7: first MDX pass, roadmap, as-built record                     |
| `f926718` | Phase 6.7: MDX for all ten touched components (scope extended — see 6.7) |

**Documentation coverage after 6.7:** every component this deliverable touched has an `.mdx`
covering description, API, examples, accessibility, and composition where relevant — `Input`,
`Textarea`, `Checkbox`, `CheckboxGroup`, `Radio`, `RadioGroup`, `Slider`, `Calendar`,
`DebouncableInput`, `Search`. Verified in the browser: 14 docs pages render, every `<Canvas of>`
resolves, `<Controls />` populates on each.

Every acceptance criterion in [`spec.md`](./spec.md) was walked individually and passes. Two worth
recording because the first check was wrong rather than the code:

- The `ui-core` export check initially reported all 14 components missing. The regex in the
  throwaway `node -e` one-liner was broken by shell escaping, not the barrel —
  `dist/index.d.ts:15-29` exports all of them. **A hand-rolled verification script needs its own
  sanity check before its output is believed.**
- The "no moved primitive under `packages/ui-forms/src`" grep matched four files. All four are
  legitimate: `DatePickers` importing `Calendar` _from `@repo/ui-core`_, a prose mention of
  "Radio Buttons" in `Select.mdx`, and the comment in `index.ts` naming what moved. Re-run scoped
  to definitions and re-exports, it returns nothing.

---

## Baseline

Measured on a clean tree at `f88172e`, before any change.

### First: this worktree was never installed

The first two baseline attempts were both worthless, in ways that each looked like a real finding:

- `pnpm build` reported 11/11 green — but every task was a **Turbo cache replay from a different
  worktree**. The replayed logs print `.claude/worktrees/button-enhancements-556c34` as their cwd.
  Nothing compiled.
- The Storybook suite failed 149/192 tests with
  `Failed to fetch dynamically imported module: …sb-vitest/deps/react-18-*.js` — which is exactly the
  signature of this repo's known stale-cache trap, so it read as pre-existing breakage. It wasn't:
  `pnpm install` was missing 13 packages. Clearing the Storybook cache alone made it _worse_
  (192 failed), because a cold optimiser cache plus missing deps is worse than a warm one.

**So: `pnpm install` then `pnpm turbo run build --force` before believing any number in a fresh
worktree.** A fast green build plus a catastrophically red test suite is the signature of "not
installed", not "the repo is broken".

### Actual baseline, after install + forced build

| Gate                           | Result                                                             |
| ------------------------------ | ------------------------------------------------------------------ |
| `pnpm install`                 | ✅ 13 packages added — the worktree was incomplete                 |
| `pnpm turbo run build --force` | ✅ 11/11 tasks, **0 cached**, 1m36s — a genuine compile            |
| `pnpm lint`                    | ✅ 0 errors, **40 pre-existing warnings** (below)                  |
| Storybook interaction suite    | ✅ **311 passed / 0 failed**, 27 files — after a one-character fix |

### Getting to that number took a one-character fix, and three wrong diagnoses first

The suite initially reported **475 passed / 25 failed across 166 "story files"** — for a library
with about thirty components. Every failure was in
`packages/ui-core/src/components/Button/Button.stories.tsx`, and every one read

```
expect(received).toHaveNoViolations(expected)
Expected the HTML found at $('vite-error-overlay,.stack') to have no violations
```

**Root cause: `**`in the Storybook stories glob.**`apps/storybook/.storybook/main.ts`globbed`../../../packages/**/src/**/\*.stories.tsx`. pnpm symlinks every workspace package into its
dependents' `node_modules/@repo/`, so `\*\*`also matched`packages/ui-forms/node_modules/@repo/ui-core/src/...`and the nested hops beyond it. Storybook's own
indexer tolerates that;`@storybook/addon-vitest`does not — it turns each match into a test file, so
every`ui-core` story was collected five times. The duplicates cannot be served through those paths,
each failed to import, and Vite painted an error overlay in the shared browser page. Axe then scanned
the overlay — which is why the only file that failed was the only one with a strict a11y gate
([`Button.stories.tsx:46-51`](../../packages/ui-core/src/components/Button/Button.stories.tsx#L46)
sets `a11y: { test: 'error' }`, deliberately, per `02-button-enhancements`).

The fix is `packages/*/src` instead of `packages/**/src` — a single `*` cannot descend into
`node_modules`. Result: 166 files → 27, 25 failures → 0, runtime 155s → 61s, with Button's strict
a11y gate still on and `preview.ts` untouched at `test: 'todo'`.

**Three things this cost, all avoidable:**

1. **Assuming a stale cache.** The first symptom matched this repo's known cache trap exactly, so I
   cleared the cache instead of checking the environment. The worktree had simply never been
   installed — `pnpm install` added 13 missing packages, and `pnpm build`'s green was a Turbo cache
   replay from a _different worktree_ (`button-enhancements-556c34` appears in the replayed logs).
   **Set the checkout up before believing any gate.**
2. **Blaming the wrong layer.** I recorded the glob as a Storybook indexer bug. It is not — the dev
   server's `/index.json` reports **34 import paths, none under `node_modules`**. Only the Vitest
   side duplicates. One `fetch('/index.json')` in the browser would have settled it in seconds.
3. **Trying to fix it in the wrong file.** `test.exclude: ['**/node_modules/**']` on the Vitest
   project does nothing: `storybookTest` builds `include` from Storybook's own file matcher as a
   list of explicit paths, leaving no glob for `exclude` to filter. The glob is the only lever.

The reusable versions of all three are now in the `storybook-standards` skill (§13a) and the
`implementation-planning` skill's baseline section.

**Scope note:** the `main.ts` glob fix is not part of deliverable 04. It is a one-line prerequisite
that had to land for the deliverable's test gate to mean anything, and it should be reviewed and
committed as its own change.

**Lint: 40 warnings, 0 errors — all pre-existing.** 20 in `ui-overlays` (`Dialog`, `DropdownMenu`,
`HoverCard`, `Popover` types — empty interfaces), untouched by this work. 19 already in `ui-core`
(`Alert.types.ts`, `Avatar.types.ts`, `Label.types.ts`, `Skeleton.types.ts`, `Tabs.types.ts`,
`Tooltip.types.ts` — empty interfaces; `DebouncableInput.stories.tsx`, `Search.stories.tsx` —
`no-explicit-any` on `play` signatures). The last is `Textarea/Textarea.types.ts:13`, which moves
with its file from `ui-forms` to `ui-core`.

The empty-interface warning is a systemic convention problem across three packages, not a
`Textarea` problem — see [Flagged, not fixed](#flagged-not-fixed).

> **This figure was recorded wrong first time round.** The initial baseline said "1 warning",
> because `pnpm lint` was piped through `tail -30` and the `ui-core` task's output scrolled off. The
> corrected count came from `npx eslint --no-cache` inside each package, which prints a total. After
> Phases 1–2 the total is still 20 and `ui-forms` is clean — so nothing new was introduced, but that
> could only be _claimed_ once the baseline was right. Same lesson as the build cache: pipe gate
> output to a file, never to `tail`.

### Accessibility checks: left exactly as they were

Per the user's instruction, this deliverable does not do accessibility work. No change was needed to
enforce that: `preview.ts` keeps its committed `a11y: { test: 'todo' }`, which only reports and never
fails a test. (I briefly set it to `'off'` while diagnosing, then reverted — it was never the cause.)

`Button.stories.tsx` keeps its deliberate meta-level `a11y: { test: 'error' }` from
`02-button-enhancements`. That is the one strict a11y gate in the repo, and it passes. Note the
precedence rule for later: **story/meta-level `a11y.test` beats the global in `preview.ts`**, so a
global `'off'` will not silence a file that opts into `'error'`.

The scope rule for this deliverable: the moved components must not _lose_ any ARIA role or state they
have today (spec, Accessibility), but no new a11y gate is turned on for them.

---

## Spec assumptions, verified against installed source

The spec rests on several claims about Radix and the package graph. Each was checked against
`node_modules`, not documentation.

| #   | Claim                                                                             | Verdict                                                                                                                                                                        |
| --- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `@repo/core` has no dependency back on `ui-core`, so the new edge is not a cycle  | ✅ `packages/core/package.json` declares `date-fns` and nothing else                                                                                                           |
| 2   | `RadioGroup` "gets equivalent behaviour for free from `RadioGroupPrimitive.Root`" | ✅ — with specifics that constrain the CheckboxGroup implementation, below                                                                                                     |
| 3   | `Calendar` has no `ui-overlays`/`ui-command` dependency                           | ✅ `react-day-picker` + `@repo/tailwind-config` + `Icon`/`Button`/`buttonVariants` only                                                                                        |
| 4   | Only `apps/storybook` consumes `@repo/ui-forms`                                   | ✅ grep across the repo finds it in `apps/storybook/package.json` and nowhere in `apps/the-open-movie-database`                                                                |
| 5   | `CheckboxGroup` is not re-exported from the `ui-forms` root                       | ✅ absent from `packages/ui-forms/src/index.ts`                                                                                                                                |
| 6   | Tailwind will still see the moved files                                           | ✅ `apps/storybook/.storybook/tailwind.css` already `@source`s **both** `packages/ui-core/src` and `packages/ui-forms/src`; moving between them is invisible to class scanning |
| 7   | `DebouncableInput` "independently duplicat[es] `Input`'s Tailwind classes"        | ⚠️ **overstated — see correction below**                                                                                                                                       |

### What Radix actually does (constrains the CheckboxGroup work)

From `@radix-ui/react-radio-group@1.3.8` and `@radix-ui/react-roving-focus@1.1.11`:

- **Wraparound is on.** `RovingFocusGroup`'s own default is `loop = false`; `RadioGroup.Root`
  overrides it to `loop = true` (`react-radio-group/dist/index.mjs:177`).
- **The key map is wider than the spec's "Home/End".** `MAP_KEY_TO_FOCUS_INTENT`
  (`react-roving-focus/dist/index.mjs:191`) is `ArrowLeft`/`ArrowUp` → prev, `ArrowRight`/`ArrowDown`
  → next, `Home` **and `PageUp`** → first, `End` **and `PageDown`** → last. Parity means matching all
  eight, not four.
- **All four arrows navigate.** `orientation` is undefined by default and `getFocusIntent` only
  filters arrows when it is set.
- **Disabled items are skipped**, as the AC requires: items get `focusable: !isDisabled` and the
  navigation candidate list is `getItems().filter((item) => item.focusable)`.
- **The initial tab stop is the _checked_ item**, not the first (`active: checked` on
  `RovingFocusGroup.Item`). If nothing is checked, the first focusable item owns it.
- **`dir="rtl"` swaps ArrowLeft/ArrowRight** via `getDirectionAwareKey`.
- **Arrowing in a radio group also _selects_.** `RadioGroupItem`'s `onFocus` calls
  `ref.current?.click()` while an arrow key is held. A checkbox group must **not** copy this —
  toggling every checkbox you arrow past is wrong. See [D2](#d2--what-parity-does-and-does-not-mean).

### Correction: `DebouncableInput` does not carry a copy of `Input`'s classes

The spec's Requirements and Acceptance Criterion 2 say `DebouncableInput` "independently
duplicat[es] `Input`'s Tailwind classes". It does not. The two class strings are materially
different:

|             | `Input`                                                                         | `debouncableInputVariants`  |
| ----------- | ------------------------------------------------------------------------------- | --------------------------- |
| height      | `h-9`                                                                           | `h-10`                      |
| padding     | `px-3 py-1`                                                                     | `px-3 py-2`                 |
| text        | `text-base md:text-sm`                                                          | `text-sm`                   |
| border      | `border border-input`                                                           | — none —                    |
| shadow      | `shadow-xs`                                                                     | — none —                    |
| focus ring  | `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]` | — none (`outline-hidden`) — |
| error state | `aria-invalid:*`                                                                | — none —                    |

So the refactor is not "delete a duplicate" — it is "**adopt `Input`'s appearance**", which is a
visible change to `DebouncableInput` and to its only consumer, `Search`. The spec's intent still
holds (one native-input styling primitive, `DebouncableInput` composes it); only the justification
in the prose is wrong, and this plan is the correction.

Supporting evidence that `Input`'s appearance was always the intent:
`packages/ui-core/src/components/Search/Search.variants.ts` already carries

```ts
export const searchDebouncableInputVariants = cva(
	'border-none px-0 py-3 shadow-none focus-visible:ring-0'
);
```

— four overrides for classes `DebouncableInput` does not currently have. They are dead today and
only start doing anything once this refactor lands. Handled in [D4](#d4--debouncableinput-composition-shape).

---

## Decisions

### D1 — CheckboxGroup gets a hand-rolled `useRovingTabIndex` (resolves spec Open Question 1)

**Decided: build the hook, as the spec words it. Do not add `@radix-ui/react-roving-focus`.**

The alternative considered was composing Radix's own `RovingFocusGroup` — the standalone package
its `RadioGroup`, `Tabs` and `Toolbar` all use internally — which would have made the two groups
share a code path. Rejected on the user's call: the behaviour is small enough to own, and taking the
dependency pulls in modules this library has no use for. `ui-core`'s dependency list is worth
keeping honest.

**Scope: this is CheckboxGroup-only.** `RadioGroup` needs nothing — `RadioGroupPrimitive.Root`
already gives it roving focus, and it could not be made to use ours in any case. Radix simply ships
no checkbox-group primitive, which is the entire gap being filled.

**Where it lives:** `packages/ui-core/src/hooks/useRovingTabIndex.ts`, with `.types.ts` and
`.spec.ts`, alongside `useKeyboardActivation`. **Internal** — exported from `~/hooks/index.ts` but
_not_ from `src/index.ts` — following the `useDebouncedValue` precedent recorded in
`src/index.ts:28-30` ("stays internal until something outside this package actually needs it").
Nothing outside `ui-core` needs it; promoting it later is a one-line barrel export.

**What it must reproduce**, taken from the Radix behaviour verified above so the two groups match:

| Behaviour          | Detail                                              |
| ------------------ | --------------------------------------------------- |
| Next item          | `ArrowDown`, `ArrowRight`                           |
| Previous item      | `ArrowUp`, `ArrowLeft`                              |
| First item         | `Home`, `PageUp`                                    |
| Last item          | `End`, `PageDown`                                   |
| Wraparound         | on (Radix's `RadioGroup` sets `loop = true`)        |
| Disabled items     | skipped, never focused                              |
| Initial tab stop   | first _checked_ item, else first enabled item       |
| All items disabled | group is not tabbable at all                        |
| RTL                | **not handled — LTR only, deliberately.** See below |

**RTL is deliberately not handled here, and adding it would be a bug.**

I first proposed reading direction off the DOM at keydown
(`getComputedStyle(event.currentTarget).direction === 'rtl'`) — one line, no dependency. That is
wrong for this deliverable, and checking the installed source is what showed it.

`@radix-ui/react-direction`'s `useDirection` is `localDir || globalDir || 'ltr'`, and a grep of
`packages/*/src`, `apps/*/src` and `.storybook` finds **no `DirectionProvider` and no `dir` prop
anywhere in the repo**. So every Radix component in this library — `RadioGroup` included — is hard
LTR today, regardless of any `dir` attribute in the DOM.

Giving `CheckboxGroup` DOM-based RTL detection would therefore make it honour `dir` while
`RadioGroup` ignored it: a direct violation of the acceptance criterion this hook exists to satisfy,
introduced in the name of doing something nice. **The hook mirrors Radix: `ArrowLeft` is always
"previous", `ArrowRight` always "next".**

RTL across the library is a real gap — `Calendar` already carries
`rtl:**:[.rdp-button\_next>svg]:rotate-180` classes, so parts of the codebase half-assume it works —
but it is a cross-cutting concern spanning every Radix component, the Tailwind logical-property
story, and whether a `DirectionProvider` gets mounted at all. It needs its own discovery and spec,
not a corner of this one. Raised in [Follow-ups](#follow-ups).

**Accepted cost:** this is a parallel implementation of behaviour Radix also implements, so the two
groups can drift. Mitigated by writing the keyboard `play()` scripts _identically_ in both story
files (see Testing strategy), so divergence fails a test rather than reaching a user.

### D2 — What parity does and does not mean

**Confirmed with the user during planning: `CheckboxGroup` becomes a single Tab stop.** Tab enters
the group, arrows move within it, Tab leaves. This changes today's behaviour, where every checkbox is
its own Tab stop, and it is the single largest user-visible behaviour change in the deliverable —
recorded here so it is not rediscovered as a bug later.

Justified by `spec.md:80` ("the two groups' navigation must feel identical to a keyboard user") and
by the mechanism being named roving-_tabindex_. It reads against `spec.md:184` ("Tab to reach it …
is not itself broken"), which describes today's state in the course of explaining why this is a
consistency choice rather than a conformance fix; the user resolved the tension in favour of parity.

**One difference is deliberate and must survive:** arrowing in a `RadioGroup` also selects (radio
semantics, and Radix's behaviour); arrowing in a `CheckboxGroup` only moves focus. The AC constrains
_focus movement_, which does match. A `play()` test will assert that arrowing a checkbox group
changes focus and leaves every checked state alone.

### D3 — `RadioGroup` API

Mirrors `CheckboxGroup` exactly, differing only where single-selection forces it — `value: string`
rather than `string[]`:

```ts
type RadioGroupProps = {
	options?: Option[];
	value: string;
	onChange: (data: { value: string; name: string }) => void;
	noOptionsAvailableMessage?: string;
	disabled?: boolean;
	name: string;
	className?: string;
};
```

Controlled-only, per the spec's Decision. Same `noOptionsAvailableMessage` empty state, same
`grid gap-3` layout, same internal `RadioGroupItem` sub-component shape, and the same
control-before-label DOM ordering rule that `CheckboxGroup.tsx` documents in a comment (Tailwind's
`peer-disabled:*` only matches a `.peer` that precedes it as a sibling).

### D4 — `DebouncableInput` composition shape

```tsx
<Input
	{...props}
	ref={ref}
	data-slot='debouncable-input'
	className={className}
	value={value}
	onChange={handleChange}
/>
```

- `data-slot='debouncable-input'` is preserved. `Input` sets `data-slot='input'` _before_ its
  `{...props}` spread, so a caller-supplied `data-slot` wins.
- **`DebouncableInput.variants.ts` is deleted**, including its `debouncableInputVariants` export from
  `packages/ui-core/src/index.ts`. A breaking public-API removal, which the spec's
  "clean breaking change" decision permits; grep confirms the only references are its own barrel
  files.
- **`Search` must render identically before and after.** `cn`/tailwind-merge resolves border,
  padding, shadow and ring in `searchDebouncableInputVariants`' favour automatically, but `h-9`
  (was `h-10`) and `text-base md:text-sm` (was `text-sm`) would still change the rendered box. So
  `searchDebouncableInputVariants` gains `h-10 text-sm`. That is _preservation_ of existing
  appearance, not a restyle — consistent with the spec's "Redesigning visual style" non-goal.

### D5 — Incidental renames taken because the files are moving anyway

- `Textarea/Texarea.stories.tsx` → `Textarea.stories.tsx` (misspelled filename).
- `CheckboxGroup/Checkbox.stories.tsx` → `CheckboxGroup/CheckboxGroup.stories.tsx` — flagged in
  `discovery.md:100-103` as "worth a rename while the package is being touched".
- Story `title:` values `UI Forms/*` → `UI Core/*` for the seven moved components, so the Storybook
  sidebar keeps matching the package layout. Non-negotiable rather than incidental: leaving them
  would file `ui-core` components under a `UI Forms` heading.

All three are `git mv`/one-line edits on files this deliverable already rewrites. Nothing else in
either package is touched opportunistically.

---

## Architecture — final layout

### `ui-core` gains

| Path (under `packages/ui-core/src/`)            | Change                                                                                                      |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `components/Input/`                             | moved verbatim; `@repo/ui-forms` → `@repo/ui-core` in `Input.mdx` and the story `docs.source.code` snippets |
| `components/Textarea/`                          | moved; story filename typo fixed                                                                            |
| `components/Checkbox/`                          | moved; `Icon`/`Label` imports become `~/components/…`                                                       |
| `components/CheckboxGroup/`                     | moved; **gains roving focus**; story renamed                                                                |
| `components/Radio/`                             | moved; `Icon`/`Label` imports become `~/components/…`                                                       |
| `components/RadioGroup/`                        | **new** — `RadioGroup.tsx`, `RadioGroup.types.ts`, `index.ts`, `RadioGroup.stories.tsx`                     |
| `components/Slider/`                            | moved verbatim                                                                                              |
| `components/Calendar/`                          | moved; `Icon`/`IconName`/`Button`/`buttonVariants` imports become `~/components/…`                          |
| `hooks/useRovingTabIndex.{ts,types.ts,spec.ts}` | **new** — internal, CheckboxGroup only (D1)                                                                 |
| `hooks/useRovingTabIndex.utils.{ts,spec.ts}`    | **new** — the pure index arithmetic, extracted so it can be tested directly                                 |

### `ui-core` loses

- `components/DebouncableInput/DebouncableInput.variants.ts` and its two barrel exports.

### `ui-forms` keeps

`Form/`, `Selects/`, `DatePickers/` — and nothing else. `DatePickers` swaps
`import { Calendar } from '~/components/Calendar/components/Calendar'` for
`import { Calendar } from '@repo/ui-core'` in both `SingleDatePicker.tsx` and `RangeDatePicker.tsx`.

### Dependency bookkeeping

| Package         | Add                                                                                                                               | Remove |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `@repo/ui-core` | `@repo/core@workspace:*`, `@radix-ui/react-checkbox`, `@radix-ui/react-radio-group`, `@radix-ui/react-slider`, `react-day-picker` | —      |

No `@radix-ui/react-roving-focus` — see [D1](#d1--checkboxgroup-gets-a-hand-rolled-userovingtabindex-resolves-spec-open-question-1).
| `@repo/ui-forms` | — | `@radix-ui/react-checkbox`, `@radix-ui/react-radio-group`, `@radix-ui/react-slider` |

`ui-forms` **keeps** `react-day-picker` (`DateRange` type in `RangeDatePicker`), `date-fns` and
`@repo/core`.

**No config changes are needed.** `reactLibrary()` already externalises every `@repo/*` id
(`packages/vite-config/react-library.ts`), so `ui-core`'s new `@repo/core` import needs no
`externals` entry. Storybook's `main.ts` and `apps/storybook/vite.config.ts` already list
`packages/ui-core/tsconfig.json` among their `tsconfigPaths` projects, and both packages define the
same `~/*` alias, so moved files resolve unchanged.

---

## Phases

All shipped, across the commits listed above. Detail for each task lives in the approved plan; this
records what actually happened.

- [x] **0 — Baseline.** `pnpm install` + `turbo run build --force` + cache clear, then build 11/11,
      lint 0 errors (1 known warning), tests 311/311. Also fixed the `stories` glob in
      `apps/storybook/.storybook/main.ts` (`**` → `*`), which was matching through `node_modules`
      symlinks — a prerequisite, committed separately.
- [x] **1 — The move.** Seven component folders `git mv`'d into `ui-core`, cross-package imports
      rewritten to `~/components/…`, story titles `UI Forms/*` → `UI Core/*`, the two D5 renames,
      `DatePickers` repointed at `@repo/ui-core` for `Calendar`.
- [x] **2 — Barrels and dependencies.** Both package roots rewritten with no transitional
      re-exports; dependencies moved between the two `package.json`s per the table above.
- [x] **3 — `DebouncableInput` composes `Input`.** `DebouncableInput.variants.ts` and its barrel
      exports deleted; `h-10 text-sm` added to `searchDebouncableInputVariants` so `Search` shows no
      visual change (D4), confirmed against pre-change screenshots.
- [x] **4 — `RadioGroup` and roving focus.** `useRovingTabIndex` built utils-first — the pure index
      arithmetic was the part most likely to be wrong and the cheapest to test — then wired into
      `CheckboxGroup`, with identical `play()` scripts in both story files so divergence fails a test.
- [x] **5 — Verification.** Gates re-run against the Phase 0 figures; every acceptance criterion
      walked individually. Both greps had to be re-run before their output meant anything — see
      [Outcome](#outcome).
- [x] **6 — MDX pass.** Scope extended mid-flight from the four documents the migration made wrong
      to all ten touched components; the table-of-contents work turned out not to be scopable at all.
      Both below.
- [x] **7 — Ship.** Roadmap row 04 → ✅ done, and this file rewritten as the as-built record.

### Phase 6, in detail — the scope extension and the ToC constraint

The pass was a read-through of the `.mdx` for every component this deliverable changed, against
`storybook-standards` §9 (page structure) and §10 (Canvas blocks and callouts), deliberately run
after verification so it documented what was actually built.

Four documents were in scope because the migration made them wrong: `Input.mdx` (import path, and at
37 lines the thinnest doc in the repo — structural gap recorded for `05` rather than fixed here),
`DebouncableInput.mdx` (Phase 3 changed what the component _is_), `Search.mdx` (checked against D4),
and `RadioGroup`, which had no `.mdx` at all.

**Tables of contents — use the built-in, not hand-written anchor lists.**
`@storybook/addon-docs@10.2.16` supports `parameters.docs.toc`
(`true | { contentsSelector, headingSelector, ignoreSelector, title, disable }`), which builds the
list from the rendered headings. A hand-maintained list of `- [Section](#section)` links goes stale
the moment a heading is renamed, and nothing catches it.

- [x] 6.5 Table of contents enabled — **globally in `preview.ts`, because per-page is not possible
      here.** Two findings, both from reading `addon-docs@10.2.16`'s build after the first attempt
      rendered nothing:

      - `parameters.docs.toc` **in a story meta is silently ignored for `.mdx` pages.**
        `DocsContainer` reads `resolveOf('meta', ['meta']).preparedMeta.parameters.docs.toc` and
        falls back to project-level parameters only *when that throws* — which it does for every
        `.mdx` attached via `<Meta of={...} />` (`dist/blocks.js:6769-6772`). The per-file entries
        I added first were dead config and have been removed rather than left looking functional.
      - The default `headingSelector` is **`h3` alone**, so the first working version listed
        `Basic` / `Disabling options` / `Empty state` while skipping every `##` above them. Set to
        `'h2, h3'`.

      **Consequence, worth a decision later:** because per-page control is unavailable for MDX,
      every docs page now gets a ToC, including short ones — `Input.mdx` at 39 lines is the only
      page this deliverable touches where it is arguably noise. `disable: true` per page does not
      work either, for the same reason. The alternative is no ToC anywhere.

      The threshold I had written also needed a length floor: "over ~100 lines, or more than four
      `##` headings" alone flagged `Input.mdx`, whose five short sections all fit on one screen.
      Revised to *over ~100 lines, or more than four `##` headings on a page of at least ~60
      lines* — moot for now given the all-or-nothing constraint, but corrected in the
      `storybook-standards` skill for elsewhere.

- [x] 6.7 **Scope extended after review: MDX for every component touched, not just the ones whose
      docs the migration made wrong.** Six of the ten had no `.mdx` at all — `Textarea`, `Checkbox`,
      `CheckboxGroup`, `Radio`, `Slider`, `Calendar` — and `Input`/`DebouncableInput` had no
      Accessibility section, so both failed the documentation checklist agreed during this session.

      This goes beyond `spec.md`'s non-goals, which assign the documentation standard to `05`.
      Taken deliberately on the user's call: the components had just changed package, the standard
      now exists, and leaving eight documents wrong-by-absence to be written later was the worse
      trade. `05` still owns the `Field` pattern and the `play()` coverage bar.

      Also fixed `component:` on the `CheckboxGroup` and `Slider` story metas — without it their
      `<Controls />` tables render empty, the same failure `RadioGroup` hit in 6.6.

- [x] 6.6 Added `component: RadioGroup` to the `RadioGroup` story meta. Without it the docs page
      rendered "No Preview" with an error panel, because `<Controls />` and the primary block both
      resolve their args from the meta's `component`. `CheckboxGroup`'s meta has the same gap but
      no `.mdx`, so it never surfaced — worth fixing in `05` when that file gets its docs page.

> **Not in this deliverable, but worth raising:** the two docs that most need a ToC are
> `Selects/Select.mdx` (360 lines, 7 `##` sections) and `Button.mdx` (219 lines) — neither is
> touched by 04. Same question for whether `toc` should just be switched on globally in
> `preview.ts` rather than per file. Both are one-line changes; flagged, not taken.

---

## Testing strategy

### Automated — Storybook `play()` (the repo's component-test convention)

The moved components' **existing** stories are the regression gate for Phase 1: they move unchanged
apart from imports and titles, so if the move broke something, they fail.

New coverage, written against the spec's Acceptance Criteria:

| Story                                 | Asserts                                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `CheckboxGroup` — arrow navigation    | `ArrowDown`/`ArrowRight` advance, `ArrowUp`/`ArrowLeft` retreat                                         |
| `CheckboxGroup` — Home/End            | jump to first/last enabled option                                                                       |
| `CheckboxGroup` — wraparound          | last → `ArrowDown` → first, and first → `ArrowUp` → last                                                |
| `CheckboxGroup` — disabled skipped    | arrowing over a disabled option lands past it (spec AC 5)                                               |
| `CheckboxGroup` — single Tab stop     | Tab from a preceding control lands on the group's tab stop; a second Tab leaves the group entirely (D2) |
| `CheckboxGroup` — arrows don't toggle | focus moves; every `aria-checked` is unchanged (D2)                                                     |
| `RadioGroup` — selection              | click and keyboard both select; single-selection enforced (spec AC 3)                                   |
| `RadioGroup` — disabled skipped       | same script as the CheckboxGroup case                                                                   |
| `RadioGroup` — controlled             | `onChange` fires with `{ value, name }`; value round-trips                                              |
| `RadioGroup` — empty / disabled       | `noOptionsAvailableMessage` renders; group-level `disabled` disables every item                         |

**The disabled-skip and Home/End/wraparound scripts are deliberately written identically in both
files**, so any future divergence between the two groups surfaces as a test failure rather than as a
bug report.

#### What those stories actually look like

Written per `storybook-standards` §7, which defers the query and assertion patterns to
`playwright-testing-conventions`: query by role, assert on ARIA rather than class names, import from
`storybook/test` (not `@storybook/test` — this repo is on Storybook 10, skill §14).

The parity script, written **character-identical** in `CheckboxGroup.stories.tsx` and
`RadioGroup.stories.tsx` apart from the role queried:

```tsx
import { expect, userEvent, within } from 'storybook/test';

// options: Apples, Bananas (disabled), Cherries, Dates
export const KeyboardNavigationSkipsDisabled: Story = {
	args: { options: OPTIONS_WITH_DISABLED, value: [], name: 'fruit' },
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const items = canvas.getAllByRole('checkbox'); // 'radio' in RadioGroup.stories.tsx

		await step('Tab enters the group on its single tab stop', async () => {
			await userEvent.tab();
			await expect(items[0]).toHaveFocus();
			await expect(items[0]).toHaveAttribute('tabindex', '0');
			await expect(items[2]).toHaveAttribute('tabindex', '-1');
		});

		await step('ArrowDown skips the disabled option entirely', async () => {
			await userEvent.keyboard('{ArrowDown}');
			await expect(items[2]).toHaveFocus(); // Cherries, not Bananas
			await expect(items[1]).not.toHaveFocus();
		});

		await step('End jumps to the last enabled option, Home back to the first', async () => {
			await userEvent.keyboard('{End}');
			await expect(items[3]).toHaveFocus();
			await userEvent.keyboard('{Home}');
			await expect(items[0]).toHaveFocus();
		});

		await step('ArrowUp from the first option wraps to the last', async () => {
			await userEvent.keyboard('{ArrowUp}');
			await expect(items[3]).toHaveFocus();
		});
	}
};
```

The one script that must **not** be shared, because it encodes the deliberate difference in D2 —
arrowing selects in a radio group, and must never toggle in a checkbox group:

```tsx
export const ArrowKeysDoNotToggle: Story = {
	args: { options: OPTIONS, value: [], name: 'fruit' },
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const items = canvas.getAllByRole('checkbox');

		await step('Arrow through every option', async () => {
			await userEvent.tab();
			await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}');
		});

		await step('Focus moved but nothing became checked', async () => {
			await expect(items[1]).toHaveFocus();
			for (const item of items) {
				await expect(item).toHaveAttribute('aria-checked', 'false');
			}
			await expect(args.onChange).not.toHaveBeenCalled();
		});
	}
};
```

And the single-Tab-stop assertion from D2, which is the behaviour change most likely to be
questioned later, so it is pinned explicitly rather than implied:

```tsx
export const GroupIsASingleTabStop: Story = {
	render: (args) => (
		<>
			<button type='button'>before</button>
			<CheckboxGroup {...args} />
			<button type='button'>after</button>
		</>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Tab reaches the group once, then leaves it entirely', async () => {
			await userEvent.tab(); // 'before'
			await userEvent.tab(); // the group's tab stop
			await expect(canvas.getAllByRole('checkbox')[0]).toHaveFocus();
			await userEvent.tab(); // straight out to 'after' — not the second checkbox
			await expect(canvas.getByRole('button', { name: 'after' })).toHaveFocus();
		});
	}
};
```

### Automated — `.spec.ts` for everything that isn't a component

Rolling our own roving focus means this deliverable ships real logic, not just moved files. All of
it gets unit tests, at the level it lives at:

| File                                    | Covers                                                                                                                                   |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `hooks/useRovingTabIndex.spec.ts`       | The hook end to end via `renderHook` — one test per row of the D1 behaviour table, matching the shape of `useKeyboardActivation.spec.ts` |
| `hooks/useRovingTabIndex.utils.spec.ts` | The pure helpers the hook is built from, tested directly                                                                                 |

The index arithmetic is the part most likely to be wrong, and it is pure, so it is extracted rather
than buried in the hook — a plain function is far cheaper to test exhaustively than a rendered
group:

```ts
findNextEnabledIndex({ from, step, count, isDisabled, loop }): number
findEdgeEnabledIndex({ edge: 'first' | 'last', count, isDisabled }): number
resolveInitialTabStop({ count, isDisabled, isChecked }): number
```

Cases each must cover: empty group; single option; **every** option disabled (group must not be
tabbable at all); disabled option at each edge; two adjacent disabled options; wrapping from either
end with `loop` on and off; and `resolveInitialTabStop` preferring the first _checked_ option over
the first enabled one.

This split matches the line the repo already draws — pure logic gets `.spec.ts`
(`useDebouncedValue`, `useKeyboardActivation`), rendered components get `play()` — and it means a
wraparound bug fails a fast unit test rather than only a browser test.

### Manual

- **Visual:** `Search` and `DebouncableInput` in Storybook, before/after screenshots (D4 is the only
  intended visual change in the deliverable, and `Search` must show none).
- **Keyboard:** tab into and out of both groups; confirm they feel the same.
- **Storybook sidebar:** the seven moved components appear under `UI Core`, and `UI Forms` is left
  with `Select`, the date pickers and nothing else.

### Build ordering — do not skip

`ui-*` packages import each other through built `dist/`, not source. After any Phase 1–4 change,
verification requires:

```bash
pnpm turbo run build --filter=@repo/ui-core && rm -rf apps/storybook/node_modules/.cache apps/storybook/node_modules/.vite
```

Skipping this produces both false greens and false reds — it is what made the Phase 0 baseline
unusable.

---

## Review outcome

Reviewed against the spec's acceptance criteria after shipping. Approved — nothing blocking. Two
findings fixed on the spot (`009a517`), two recorded, one retracted.

**Fixed — `useRovingTabIndex` re-created every item's `ref` callback each render.** `getItemProps`
returned a fresh arrow function as `ref`, and it is called during render for every item. React
compares ref callbacks by identity, so it detached and re-attached every ref on every render of the
group — every keystroke, in practice. Never a correctness bug (focus moves happen in event handlers,
never during commit), but avoidable churn in a hook meant to be reused. Now one stable callback per
index, pinned by a test that was **verified to fail against the previous implementation** before
being kept.

**Fixed — dead `{...props}` spread** on both group components. Neither `ICheckboxGroup` nor
`IRadioGroup` has an index signature, so every prop is destructured by name and the rest was always
`{}`.

**Retracted — `option.disabled || disabled` is not redundant.** The review flagged it, since Radix
ORs its context `disabled` into the `Radio` itself. Reading `RadioGroupItem` properly: that value
also drives the wrapper's cursor classes and `RadioLabel`'s disabled styling, neither of which the
Radix context reaches. Dropping it would leave labels un-greyed when the whole group is disabled.
Left as-is. _A review finding that survives only until someone reads the surrounding component is
not a finding._

**Recorded — `Calendar`'s move made `ui-core` materially heavier.** `react-day-picker` (216K) and
`date-fns` (129K) now sit in `ui-core`'s `dist`, and are gone from `ui-forms`' — the move was clean,
with no duplication. But `ui-core` now _declares_ `react-day-picker`, so every consumer installs it.
This is the same dependency-weight concern raised about `cmdk`, and it shows the limit of the
boundary rule this deliverable adopted: it sorts by **graph position, not weight**, and `Calendar`
satisfies "depends on nothing above `ui-core`" while being one of the heaviest things in it.

Two mitigations: `preserveModules` means `Button.js` carries no reference to it, so an app that
never imports `Calendar` bundles none of it; and `ui-core` already bundled `framer-motion` at 405K,
so it was never lightweight. Feeds the pinned package-split question in
[`docs/planned.md`](../planned.md#the-four-package-split) rather than being reversed here.

**Recorded — test gap.** "The tab stop starts on the checked item" is unit-tested only. Every
browser test starts from an empty selection, so the case a user meets most often — tabbing into a
part-selected group — has no `play()` coverage. Natural addition in `05`.

## Traps found during implementation

### A tapped arrow key cannot observe Radix's arrow-selects behaviour

`RadioGroup`'s `ArrowKeysAlsoSelect` story failed on first write, asserting something true of the
component but unobservable the way the test pressed the key.

Radix moves focus with `setTimeout(() => focusFirst(candidateNodes))`
(`react-roving-focus/dist/index.mjs:180`), while the flag that turns "focused" into "selected" is
set on a **document** `keydown` and cleared on `keyup` (`react-radio-group/dist/index.mjs:237-247`).
`userEvent.keyboard('{ArrowDown}')` dispatches press and release back to back, both landing before
the deferred callback runs — so by the time focus arrives the flag is already `false` and nothing is
selected. A human holds the key for ~100ms and never sees this.

Fix: hold the key, `{ArrowDown>}` … `{/ArrowDown}`. The failure was an artefact of synthetic input
speed, not a bug, and the diagnosis came from reading Radix's build output rather than its docs.

Worth knowing for `05`: any assertion about "focus moved _and_ something followed" in a Radix
roving-focus widget needs the key held.

### `vitest` does not typecheck, so a green spec run proves less than it looks

`useRovingTabIndex.spec.ts` passed 17/17 while containing a type error
(`elements.indexOf(document.activeElement as HTMLElement)` against an `HTMLButtonElement[]`). Only
`pnpm build` caught it, because `check-types` runs there and not in `vitest run`. Same for
`noUncheckedIndexedAccess` making `getAllByRole(...)[n]` an `HTMLElement | undefined` — fine inside
`expect()`, rejected by `userEvent.click()`. Run the build, not just the specs, before believing a
change is clean.

## Risks that fired

Two of the eight risks identified while planning actually materialised, and both were about
verification rather than about the code:

- **Verification against a not-fully-set-up worktree.** Certain if skipped, and it was — the first
  two baselines were worthless. `pnpm install` + `turbo run build --force` before trusting any
  number, with `--force` because Turbo's cache is shared across worktrees. See
  [Baseline](#first-this-worktree-was-never-installed).
- **Stale Storybook cache masking the move**, producing a false green _and_ a false red. Run the
  rebuild-and-clear command above before every verification.

The rest did not: Tailwind scanning was already covered (both `src` trees are `@source`d), the
`@repo/core` edge introduced no cycle (it depends only on `date-fns`), and `Search` showed no visual
change thanks to D4's compensating classes.

Shipped from a single branch onto the integration branch rather than `main`. Nothing outside
`apps/storybook` consumes either package, so the blast radius was the Storybook build; rollback would
have been `git revert` of the merge.

---

## Flagged, not fixed

Found while planning; none is in this deliverable's scope. Listed so they are not silently
inherited as "things the migration broke".

- **`ITextarea` is dead and triggers a lint warning.** `Textarea.tsx` declares its own local
  `type TextareaProps = React.ComponentProps<'textarea'>` and never uses the `ITextarea` interface
  that `Textarea.types.ts` exports — which is also the empty interface the baseline lint warning
  points at. Both move as-is.
- **`@repo/ui-forms` declares `react-use` and `zod` as dependencies with zero uses** anywhere in
  `packages/ui-forms/src`. Unrelated to this migration; removing them is its own small change.
- **`Radio.stories.tsx` imports `@radix-ui/react-radio-group` directly** — exactly the gap this
  deliverable closes. Rewriting it to use the new `RadioGroup` is Storybook-documentation work, which
  `spec.md`'s non-goals assign to `05-ui-forms-field-pattern`.
- **`Radio` has no `peer` class, so `RadioLabel`'s `peer-disabled:*` rules never match.**
  `Checkbox`'s class string starts with `peer`; `Radio`'s does not. `RadioLabel` carries
  `peer-disabled:cursor-not-allowed peer-disabled:opacity-70` that consequently do nothing — the
  visible disabled treatment comes only from its own `disabled` prop. Not fixed here: the spec
  requires the moved primitives keep their current Tailwind classes exactly, and adding `peer`
  changes rendered output. Worth picking up in `05` or a focus/state pass.
- **`CheckboxGroup`'s story meta has no `component`**, the same gap that made `RadioGroup`'s docs
  page render "No Preview". Harmless today because `CheckboxGroup` has no `.mdx`; it will bite the
  moment `05` gives it one.
- **`Input.stories.tsx`'s `ContactForm` story hand-writes a raw `<textarea>`** with its own copy of
  the border/ring classes (`discovery.md:66-72`). Also `05`.

---

## Follow-ups

### The four-package split — needs its own discovery

`Select` and the date pickers stay in `ui-forms` (spec AC6) because they need `Popover`
(`ui-overlays`) and `Command` (`ui-command`), which sit _above_ `ui-core`. Raised in review: should
they be in `ui-core` anyway?

They cannot be, as the graph stands. `ui-core` would need `ui-overlays` for `Popover`, while
`ui-overlays` needs `ui-core` for `Icon` — each requiring the other built first, and turbo's
`dependsOn: ["^build"]` is a topological sort, so there is no valid order.

But the graph is held together by very little: **the whole `ui-overlays` → `ui-core` edge is `Icon`,
in three files**, and `ui-command` → `ui-core` is `Search`, in one. `ui-command` is a single
component in its own package.

**One option raised in review deserves recording, because it is subtler than it looks:** consuming
sibling packages from **source** rather than built `dist/` — a path alias to `../ui-core/src`
instead of a `@repo/ui-core` dependency. It does dissolve the _build-ordering_ problem, because that
ordering only exists between separately-built artefacts. What it does not dissolve is the cycle
itself, which becomes a module-level circular import (fragile initialisation order), and it changes
what ships: `reactLibrary()` currently externalises every `@repo/*` id, so `ui-overlays`' `dist`
_references_ `Icon` rather than containing it. Aliased to source, `Icon` would be **inlined into
every package that uses it**, so an app importing two of them ships two copies — with two module
scopes for anything stateful. In effect it merges the packages while keeping the appearance of a
split: the coupling of a merge, without the clarity.

Full weighing of the options is in [`docs/planned.md`](../planned.md#the-four-package-split). Nothing here is broken;
the cost is ergonomic, and the decision is explicitly open.

### RTL / reading direction — needs its own discovery and spec

Surfaced while deciding D1, and deliberately left alone here. The current state, as measured:

- **No `DirectionProvider` is mounted anywhere**, and no component takes a `dir` prop. Radix's
  `useDirection` falls back to `'ltr'`, so every Radix component in the library — `RadioGroup`,
  `Tabs`, `Accordion`, `Slider`, the overlays — behaves as LTR no matter what the DOM says.
- **Parts of the codebase already assume otherwise.** `Calendar` ships
  `rtl:**:[.rdp-button\_next>svg]:rotate-180` and a matching `button_previous` rule, which only do
  anything if a `dir="rtl"` exists to trigger them. So the library is inconsistent with itself
  today.
- **It is not just keyboard direction.** It spans arrow-key semantics, Tailwind logical properties
  vs physical ones (`ml-*`/`pl-*` are used widely), icon mirroring, `Slider` orientation, and
  overlay/popover placement.
- **Nothing tests it.** No story sets `dir`, and the Storybook toolbar has no direction global.

That is a design-system-wide question — where direction comes from, which layer owns the provider,
what the component contract is — and it wants a `problem-discovery` pass before any spec. It sits
naturally alongside the design-system audit already noted as planned in
[`docs/planned.md`](../planned.md#design-system-audit).

## Open questions — both settled

1. **D1: `RovingFocusGroup` or a hand-rolled hook?** Hand-rolled `useRovingTabIndex`, no new
   dependency. See [D1](#d1--checkboxgroup-gets-a-hand-rolled-userovingtabindex-resolves-spec-open-question-1).
2. **Does deleting the `debouncableInputVariants` public export need calling out anywhere beyond
   this plan?** No. Nothing consumed it, the spec sanctions clean breaks, and it shipped without a
   separate note.
