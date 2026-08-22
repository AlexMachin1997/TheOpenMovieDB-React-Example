# 13 — Exports & conventions

Implementation plan for [`spec.md`](spec.md). Ticked as each phase lands.

## Decisions taken before implementation

The spec left two questions open and the roadmap left two more implied. All four are settled:

1. **Barrel strategy — per-component barrels, completed.** Every direct child of `src/components/`
   has an `index.ts`, and the package root imports only through those. This is what
   [`.agent/golden-rules.md`](../../.agent/golden-rules.md) and `folderStructure.mjs` already
   mandate; the tree had drifted from it, not the other way round.
2. **The `I` prefix is enforceable** — on interfaces, via `selector: 'interface'`. The type-alias
   half is not, and that gap is documented rather than papered over.
3. **`I*` prop types standardise on `interface`**, with one genuine union as a stated exception.
4. **Husky is in scope.** It is a third dead gate and Goal 5 covers it.

### Why per-component barrels rather than root-only

Root-only was the spec's inherited recommendation and was reversed deliberately. The deciding
argument was not the file count but what a barrel is _for_: it is the import surface a contributor
reaches for inside the package. Root-only would have deleted ~50 files and repointed ~60 import
sites to gain a rule that is easier to state and worse to use.

The counts that made root-only look attractive are real but misleading — 21 of ui-core's 26 component
barrels have zero importers, and four component folders (`Search`, `Calendar`, `Overlay`,
`Radio/components`) have no barrel at all. That is drift from a stated convention, not evidence the
convention is wrong. Completing the set costs less than abandoning it.

### What made this safe to do at all

Every UI package declares only `"exports": { ".": … }`. `apps/the-open-movie-database` depends on no
UI package, and `apps/storybook` holds zero source imports — it globs stories and resolves `~/*`
per-package. **No barrel has an importer outside its own package**, so nothing here is a breaking
change.

## Corrections to the spec

Recorded here rather than by editing `spec.md`, which describes the world as it was.

- **`displayName` is not "present on all 37 component directories".** It is on ~21 of 38 — roughly 45
  assignments across ~101 component functions. `ui-overlays/DropdownMenu` has 15 components and none.
  This does **not** invalidate the `react/display-name` acceptance criterion: that rule only fires
  where React cannot infer a name, which is why `16` measured 0 violations against 45% coverage. The
  spec conflates the convention with the rule that partially enforces it.
- **The interface/alias split is 142 to 9**, not the two aliases the spec names. `ICalendar`
  (`Calendar/components/Calendar.tsx:9`) is a ninth, local and unexported.
- **`Checkbox` is a byte-identical _triple_**, not a pair — `Checkbox/index.ts`,
  `Checkbox/Checkbox.tsx` and `Checkbox/components/index.ts` are all the same 150 bytes.
- **`Calendar` is a near-ninth duplicate.** `Calendar/Calendar.tsx` is a one-line re-export shim; it
  escaped the count only because it has no `index.ts` twin.
- **The spec's `naming-convention` pessimism was overstated.** It predicted "~20+ interfaces that
  deliberately do not carry" the prefix. Counting only what `selector: 'interface'` can see, and
  scoping to `src/components/**`, the real number is **5** — and all five are genuine misses.

## Phases

- [x] **1 — The gates that don't gate.** `--max-warnings 0`, CI Prettier as `--check`,
      `react/display-name`, husky made durable.
- [ ] **2 — Export parity baseline.** Capture every exported symbol before touching a barrel.
- [x] **3 — One barrel strategy, applied.** Delete the duplicate halves, write the missing barrels,
      route every package root through them.
- [x] **4 — `RangeDatePicker` / `DateRangePicker`.** Fix the folder, file and interface; keep the
      export.
- [x] **5 — The `I` prefix, enforced.** New `@repo/eslint-config/ui`, 5 renames, 8 alias conversions.
- [ ] **6 — Folder structure, running and isolated.** Extend the schema, enable the rule, prove the
      parser is untouched.
- [ ] **7 — Write the conventions down.** Package READMEs, golden rules, roadmap, this file.

Detail for each phase lives in the approved plan; this file records what actually happened as it
happens.

## As-built notes

### Phase 1 — the gates that don't gate

Three gates were switched from reporting success to actually checking, and one rule turned on.

| Gate                                 | Before                                        | After                  |
| ------------------------------------ | --------------------------------------------- | ---------------------- |
| A warning in `pnpm lint`             | exit **0**                                    | exit **1**             |
| CI Prettier on unformatted input     | exit **0**, having rewritten its own checkout | exit **1**             |
| `.husky/pre-commit` on a fresh clone | never ran                                     | installed by `prepare` |
| `react/display-name`                 | `off`                                         | `error`, 0 violations  |

Each was demonstrated rather than asserted:

- **`--max-warnings 0`** — a stale `eslint-disable` directive reports as
  `Unused eslint-disable directive`. With the flag, `eslint` exits 1 and `pnpm lint` fails on
  `@repo/ui-core#lint`. **The same probe, with the flag removed, exits 0** — that counterfactual is
  the whole point, and it is the identical hole `16` closed from the other direction.
- **`react/display-name`** — `export const ProbeMemo = React.memo(() => <div />)` reports
  `Component definition is missing display name`, exit 1. A green run alone would not have
  distinguished "rule on and clean" from "rule silently inert".
- **`prettier:check`** — appending unformatted code to `ui-core/src/index.ts` makes it exit 1.

Applied to **7** lint scripts, not 8. `apps/the-open-movie-database` is deliberately excluded because
it is due to be reworked; `pnpm lint` still runs it without the flag, so a warning there will not fail
CI. The gate is closed for the library and open for the app.

#### Prettier moved to the root, and why delegation was abandoned

The plan called for a `prettier:check` in each workspace with the root delegating through turbo,
mirroring `prettier`. That was built, and then reversed on evidence.

**Prettier searches upward for `.prettierrc` but not for `.prettierignore`.** `--ignore-path` defaults
to the current working directory and never walks up. So a workspace-local `prettier --check .` cannot
see the root ignore list and checks its own build output:

| Workspace     | Files flagged by a bare `prettier --check .` |
| ------------- | -------------------------------------------- |
| `ui-core`     | 116, **all** `dist/`                         |
| `ui-overlays` | 76                                           |
| `ui-forms`    | 64                                           |
| `ui-command`  | 51                                           |

Verified directly: `prettier --find-config-path src/index.ts` from `packages/ui-core` returns
`../../.prettierrc`, while `dist/index.js` is flagged from that same directory and clean only when
explicitly given `--ignore-path ../../.prettierignore`.

Delegation therefore costs an `--ignore-path` argument on every workspace script, plus a mechanism to
cover `docs/`, `README.md`, `turbo.json` and `.github/`, which belong to no workspace and would be
checked by nothing. Turbo's root-task form (`//#task`) was tried for that and **ran zero tasks**.

Running it once from the root needs no arguments at all and covers everything, so the per-workspace
`prettier` scripts and the turbo `prettier` task were removed in favour of root `prettier` /
`prettier:check`.

This also fixes a **pre-existing defect**: `prettier --write .` in each workspace had been silently
reformatting that package's `dist/` on every run, for the same ignore-path reason.

#### Husky

`husky@9.1.7` added to root `devDependencies` with `"prepare": "husky"`. `.husky/pre-commit` also lost
its v8 preamble (`#!/usr/bin/env sh` and the `_/husky.sh` source line), which husky 9 deprecates and
v10 will reject.

One local-environment note, not a repo issue: this worktree carries a per-worktree
`core.hooksPath` override in `.git/worktrees/<name>/config.worktree` pointing at the **main**
checkout's `.husky`. `prepare` correctly set `core.hooksPath=.husky/_` in the shared `.git/config`,
so the fix is real; it simply does not take effect in this worktree until merged.

### Phase 2 — export parity baseline

Captured from a forced build (11/11 successful, 0 cached, 1m9s) before any barrel was touched, using
the TypeScript compiler API so that `export * from` is expanded rather than recorded verbatim — the
naive `.d.ts` scan undercounted `ui-command` at 19 and `ui-forms` at 22.

| Package       | Runtime value exports | Declared surface (values + types) |
| ------------- | --------------------- | --------------------------------- |
| `ui-core`     | 51                    | 73                                |
| `ui-overlays` | 44                    | 45                                |
| `ui-command`  | 18                    | 35                                |
| `ui-forms`    | 27                    | 52                                |

### Phase 3 — one barrel strategy, applied

The rule now holds: **every direct child of `src/components/` has an `index.ts`, and the package root
imports only through those barrels.**

- **The eight byte-identical duplicates are gone**, plus `Calendar/Calendar.tsx`, a one-line
  re-export shim that was a ninth in everything but name. In each case the `index.ts` survived and its
  twin was deleted. `Command/Command.tsx` was unreachable from anywhere, as was
  `Command/index.ts` — both halves of that pair were dead.
- **`Checkbox` was a triple.** Deleting `Checkbox.tsx` still left `Checkbox/index.ts` byte-identical to
  `Checkbox/components/index.ts`, so the parent now delegates to the sub-barrel, which is what
  `Accordion`, `Slider`, `Dialog`, `Popover` and `Sheet` already did.
- **Four missing barrels written**: `Search`, `Calendar`, `Overlay` and `Radio/components`. `Search`
  and `Calendar` were publicly exported with no barrel at all; `Radio/components` was the only
  `components/` folder in `ui-core` without one, which is why `Radio/index.ts` reached past it.
- **Two dead barrels deleted**: `Command/utils/index.ts` held one comment and zero exports while the
  root still `export *`d from it, and `Selects/types/index.ts` did `export * from '@repo/ui-command'`
  with no importers — a loaded gun rather than a convenience.
- Barrels were generated mechanically from each component's own exports rather than hand-written, so
  a barrel cannot drift from the files beside it.

Afterwards, **no two files in the four packages are byte-identical.**

#### The parity check gave a false pass, and that is the real finding

The first parity comparison reported "IDENTICAL". It was wrong. A `sed` intended only to rewrite
module specifiers had silently deleted a four-line `export { … } from` block, dropping
`searchWrapperVariants` and `searchClearButtonVariants` from `ui-core`'s public surface — and the
check waved it through.

The cause was staleness, not logic: the capture ran against a `dist/` written **64 seconds before**
the source edit it was supposed to describe. A parity check reading stale build output is not a weaker
check, it is a rubber stamp, and it fails in exactly the direction that matters — silently, and green.

The script now refuses to run when any package's newest `dist/` file is older than its newest `src/`
file. Verified by pointing it at a stale tree: it throws `dist is OLDER than src` instead of
reporting a pass.

One anomaly is recorded rather than explained: `Search/index.ts` was written correctly by the
generator (its log proves the content) and was found truncated afterwards, with an mtime 3.5 minutes
later than every other generated barrel. The cause was not identified. It was caught by re-running
the generator in dry mode and diffing against disk — which found `Search` and nothing else — and it
is the same class of failure the freshness guard now catches.

### `cva` is never exported — an accepted deviation from the spec

Requirement 2 says every symbol exported before the change is still exported after it, and Non-Goals
lists "Reducing the public export surface". **Both are deliberately overridden here**, on the
instruction that variant files are internal implementation detail and should never be exported.

Seven symbols were removed from `@repo/ui-core`'s public API — `alertVariants`, `badgeVariants`,
`buttonVariants`, `iconVariants`, `labelVariants`, `searchClearButtonVariants`,
`searchWrapperVariants` — along with the comment that had justified them ("for consumers who need to
extend"). No component barrel re-exports a `*.variants.ts` file, and the barrel generator excludes
them by construction.

Nothing in the repo depended on them: no app imports a variant symbol. Internal cross-component uses
(`Calendar` → `buttonVariants`, `Dialog`/`Sheet` → `overlay*Variants`) import the file directly and
are unaffected. `Icon.constants.ts` is not a `cva` file and continues to be exported.

The parity diff after this change is exactly those seven removals, nothing else, and nothing added.

#### Gates

| Gate            | Result                                           |
| --------------- | ------------------------------------------------ |
| Build           | 11/11 successful, 0 cached, forced               |
| Lint            | 11/11, 0 errors, 0 warnings                      |
| Types           | 19/19 successful                                 |
| Prettier        | clean                                            |
| Component tests | 41 passed, 27 skipped (68 files), **385 passed** |
| Export parity   | 7 deliberate removals, 0 accidental, 0 added     |

### Phase 4 — `RangeDatePicker` / `DateRangePicker`

Four names described one component and three of them disagreed with the public one:

|            | Before                         | After                             |
| ---------- | ------------------------------ | --------------------------------- |
| Folder     | `DatePickers/RangeDatePicker/` | `DatePickers/DateRangePicker/`    |
| File       | `RangeDatePicker.tsx`          | `DateRangePicker.tsx`             |
| Stories    | `RangeDatePicker.stories.tsx`  | `DateRangePicker.stories.tsx`     |
| Interface  | `IRangeDatePicker`             | `IDateRangePicker`                |
| **Export** | **`DateRangePicker`**          | **`DateRangePicker`** (unchanged) |

The export was kept and the other three moved to it. `DateRangePicker` reads correctly — it is a
date-range picker, not a range date-picker — and it is the only one of the four that is public;
renaming it instead would have touched ~30 story call sites and two `.mdx` files to arrive at a worse
name. `SingleDatePicker` already agreed on all four, so this brings the pair into line with each other.

The stories file also moved off the only relative import in the folder
(`from './RangeDatePicker'`) onto the `~/` alias its sibling already used.

Export surface unchanged by the rename, confirmed by the parity check. Gates: build 11/11, lint
11/11 (0 warnings), types 19/19, prettier clean, 385 tests passed / 27 skipped.

### Phase 5 — the `I` prefix, enforced

The spec asked whether this convention could be enforced at all, and allowed "recorded as
unenforceable" as a valid answer. **It is enforceable**, and the rule is now `error`:

```js
'@typescript-eslint/naming-convention': [
	'error',
	{ selector: 'interface', format: ['PascalCase'], prefix: ['I'] }
]
```

`selector: 'interface'` is what makes it work. It never inspects a type alias, so the legitimate
second family — `ShowErrorsWhen`, `IconName`, `SelectProps`, `RenderFunction`, `VirtualizedItem`,
`FieldValidatorsLike` — is out of scope by construction rather than by exemption list.

The rule lives in `react.js`'s own rules block. An earlier draft put it in a separate `ui.js` entry
point to keep it away from `apps/the-open-movie-database`, which names prop types `*Props` and
reports 25 violations. That was rejected in review: a one-off file is not the answer when the rule
fits beside the existing config. The app disables the rule locally instead, with a comment saying it
is suspended until that app is reworked, sitting alongside the `react/display-name` disable already
there.

Proven to fire rather than assumed: an unprefixed interface under `src/components` reports and exits

1. A green run alone would not distinguish "on and clean" from "silently inert" — the same trap
   `16` documented for `no-empty-object-type`.

#### 16 renames

11 in `ui-core/src/hooks` (`UseDebouncedValueOptions`, `UseKeyboardActivationResult`,
`FindNextEnabledIndexOptions`, …) and 5 in `ui-forms`' `Selects/components`
(`SelectListItemProps`, `SelectTriggerProps`, and three `*ProviderProps`). The `Selects` ones were
genuine drift — `ISelectListItemsProps` already sat in that same folder one letter away from
`SelectListItemProps`, which is how it went unseen.

Five are public. The parity check confirms exactly those five renames and no other movement.

#### Interface or alias: 6 convert, 3 cannot

Of the 9 `I*` type aliases, **6** became `interface … extends`: `ISheet`, `IFormError`,
`ISubmitButton`, `ICheckboxField`, `ISwitchField`, `ISelectItemClear`.

**Three cannot, and this is a TypeScript limitation rather than a style choice.** `IAccordion`,
`ICalendar` and `ILabel` are discriminated unions, and TS2312 states that _an interface can only
extend an object type or intersection of object types with statically known members_. Verified by
probe, including the `(A | B) & { … }` shape Radix uses — both forms error.

The union is load-bearing, not incidental: `Accordion.Root` is
`AccordionSingleProps | AccordionMultipleProps` and `collapsible` exists only on the single variant,
so flattening it to an interface silently removes a real check. `DayPickerProps` discriminates seven
ways on `mode`.

The workaround, as far as the language allows, is to make every _member_ of the union an interface
and let the exported name be a one-line join. `ILabel` already did this. `IAccordion` now does too
(`IAccordionSingle | IAccordionMultiple`). `ICalendar` deliberately does not: it is local to one
file, never exported, and mirroring react-day-picker's seven variants would couple our types to that
library's internal union shape for no reader benefit. Each of the three carries the reason in-file.

#### One documented exemption

`SheetRef` keeps its name behind an inline `eslint-disable-next-line` with a stated reason: it is an
imperative handle (`open`/`close`/`toggle`/`isOpen`), not a prop interface, and the `I` prefix exists
to stop a prop type colliding with the component it describes — which does not apply. The disable is
self-policing, because `reportUnusedDisableDirectives` plus `--max-warnings 0` fails lint the moment
it stops being needed.

#### Corrections to earlier claims in this document

- The plan said **8 of 9** aliases would convert cleanly. The real number is **6**; the claim was made
  from the shape of the right-hand side without checking whether the supertypes were unions.
- The rule flags **5** interfaces, not the 6 first reported. `SelectProviderProps` is a type alias, so
  the rule never saw it; it was renamed anyway, since it unions two now-`I` interfaces.

#### Gates

Build 11/11 (forced), lint 11/11 with 0 warnings, types 19/19, prettier clean, 385 tests passed /
27 skipped. Parity: the 5 approved renames, nothing else.
