# Implementation plan: Build & dependency tooling

Status: **shipped.** This is the as-built record for
[`spec.md`](spec.md). It unblocks [`15-storybook-lint-tests`](../15-storybook-lint-tests/spec.md).

## Decisions

### D1 — Externalization is driven by each package's own `package.json`

The spec's open question was whether to externalize from a package's declared `dependencies` or
from an allow-list in the shared config. **Declared dependencies won.**

An allow-list is a second copy of the dependency list, and a second copy drifts — which is the
exact failure this deliverable exists to fix. `createExternalMatcher` in
[`shared.ts`](../../packages/vite-config/shared.ts) reads `dependencies` + `peerDependencies` from
the building package's `package.json` at config time, so adding a dependency externalizes it and
removing one stops externalizing it, with no second edit and nothing to forget.

`process.cwd()` is the package root when Vite runs, which is the same assumption the `~` alias in
both presets already makes — no new coupling.

Precedence, in order:

1. **React and the JSX runtimes** — always external, and `bundle` cannot override them. This is the
   rule that already existed, kept verbatim along with its comment; two React copies in one tree
   produce `Cannot read properties of null (reading 'useState')`.
2. **`@repo/*`** — always external, also not overridable.
3. **`bundle: []`** — the spec's required escape hatch for a dependency that genuinely has to be
   inlined. It only overrides rule 4, never 1 or 2, because those are external for correctness
   rather than for output size.
4. **Declared dependencies + the `externals: []` argument** — external.

`externals` survives for anything a package needs external but does not declare. Nothing passes it
today.

### D2 — `check-types` now depends on `^build`, not `^check-types`

The spec asked whether `check-types` ordering resolves `@repo/*` types from a clean state. It did
not, and the failure was total: with `dist/` deleted, `pnpm type-check` produced ~100
`TS2307: Cannot find module '@repo/tailwind-config'` errors across every UI package. Packages
resolve each other through built `dist/*.d.ts`, and `^check-types` runs `tsc --noEmit`, which by
definition emits nothing — so no dependency's types ever existed when its dependents were checked.

`dependsOn: ["^build"]` in [`turbo.json`](../../turbo.json) fixes it: a package's types are its
`dist/*.d.ts`, and only `build` produces those. No cycle is introduced — `build` already depends on
`^build`, and a package's `check-types` never depends on its own `build`.

The cost is that a cold `pnpm check-types` now builds dependencies first (19 tasks rather than 10).
That is the correct price for the gate being real.

### D3 — `@vitest/coverage-v8` joined the catalog, though the spec did not name it

Converging `vitest` to a single version forced it. `apps/the-open-movie-database` pinned both
`vitest` and `@vitest/coverage-v8` at `^3.2.4`; moving one to 4 without the other leaves a coverage
provider that cannot load. It is a vitest-family package that must move in lockstep, so it belongs
in the same single declaration. `^4.0.18` was already present in `apps/storybook`, so this still
converges on a version the repo had.

### D4 — `type-check` is an alias for `check-types`, not a second gate

The root already had `check-types`. Rather than invent a task named `ts-validate` for one script to
call, `type-check` now runs the task that exists. Two names for one real gate is not a lie; a name
for a gate that does not exist is.

## What shipped

- [x] **Third-party code is no longer bundled.** `reactLibrary` and `typescriptLibrary` both
      externalize via `createExternalMatcher` (D1).
      [`react-library.ts`](../../packages/vite-config/react-library.ts) ·
      [`typescript-library.ts`](../../packages/vite-config/typescript-library.ts) ·
      [`shared.ts`](../../packages/vite-config/shared.ts)
- [x] **The redundant `externals` arguments are gone**, from `core` as well as the three the spec
      named — `date-fns` is a declared dependency of `core`, so its argument became redundant under
      the same rule. All five `vite.config.ts` files are now a bare preset call.
- [x] **`vitest`, `eslint`, `tsup` and `@vitest/coverage-v8` resolve from `catalog:`**, and the two
      apps' literal `typescript` pins moved there too — the catalog already covered `typescript`,
      so those were literal versions the catalog was meant to own.
      [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml)
- [x] **The three build plugins moved to `vite-config`.** `@vitejs/plugin-react-swc`,
      `@tailwindcss/vite` and `vite-plugin-dts` are gone from the four UI packages, and
      `vite-plugin-dts` from `core` as well — it imports `typescriptLibrary`, not the plugin.
- [x] **`vite-config` no longer declares `tsup`.** Its build script is `tsc`; nothing in the package
      imports tsup. Deleting it also removed the `^8.0.2` half of the tsup drift.
- [x] **The root `type-check` script runs `turbo run check-types`** (D4), and `check-types` ordering
      is fixed (D2).
- [x] **`./next`, `./react-internal` and the ambient `isTruthy` are deleted.** All three were
      provably unused: `next.js` and `react-internal.js` did not exist as files, and `isTruthy` had
      no runtime implementation and no call sites.
      [`eslint-config/package.json`](../../packages/eslint-config/package.json) ·
      [`global.d.ts`](../../packages/typescript-config/types/global.d.ts)
- [x] **Two docs that described the deleted things** were corrected: `eslint-config/README.md` lost
      its Next.js and React Internal sections, and `typescript-config/README.md` stopped telling
      readers to run `pnpm ts-validate`.

## Version convergence

| Tool                  | Before                            | After (catalog) | Resolved |
| --------------------- | --------------------------------- | --------------- | -------- |
| `eslint`              | `^9.34.0` ×8, `^9.39.1` ×1        | `^9.39.1`       | 9.39.2   |
| `vitest`              | `^4.0.18` ×7, `^3.2.4` ×1         | `^4.0.18`       | 4.0.18   |
| `@vitest/coverage-v8` | `^4.0.18` ×1, `^3.2.4` ×1         | `^4.0.18`       | 4.0.18   |
| `tsup`                | `^8.3.5` ×1, `^8.0.2` ×1 (unused) | `^8.3.5`        | 8.5.1    |
| `typescript`          | `catalog:` ×8, `~5.9.3`, `^5.0.2` | `^5.8.2`        | 5.9.3    |

Nothing was upgraded past a version the repo already used. Before this, `eslint` installed two
copies (9.39.2 and 9.34.0) and `typescript` two (5.9.3 and 5.9.2); each is now one.

**The `vitest ^3.2.4` outlier was not deliberate.** `git log -S` shows it arrived in the original
scaffold (`3c7690e`) and was never touched again; the packages moved to 4 in
[`07-test-harness`](../07-test-harness/plan.md), which did not include the app. There was nothing to
work around, so nothing was overridden silently. The app's 80 tests pass unchanged on vitest 4 —
including its `pool: 'vmThreads'` config, which still works.

## Verification

Baseline and post-change measurements were both taken from a real forced build, not a Turbo cache
replay.

| Gate                       | Baseline                        | After                          |
| -------------------------- | ------------------------------- | ------------------------------ |
| `pnpm install` (clean)     | ok                              | ok, `--frozen-lockfile`        |
| `pnpm turbo build --force` | 11/11, 2m22s                    | 11/11, 2m39s                   |
| `pnpm lint`                | 0 errors, 18 + 20 warnings      | 0 errors, 18 + 20 warnings     |
| `pnpm check-types`         | 10/10 (dirty tree only)         | 19/19, green from a clean tree |
| `pnpm type-check`          | exit 1, `ts-validate` not found | exit 0                         |
| `pnpm test`                | all green                       | all green                      |
| Storybook `play()` suite   | 385 passed, 27 skipped          | 385 passed, 27 skipped         |

**Vendored third-party source in `dist/`**, counted as files under `dist/node_modules/`:

| Package       | Files before | Vendored before | Files after | Vendored after |
| ------------- | ------------ | --------------- | ----------- | -------------- |
| `core`        | 13           | 0               | 13          | 0              |
| `ui-core`     | 613          | 462             | 147         | 0              |
| `ui-overlays` | 127          | 52              | 75          | 0              |
| `ui-command`  | 101          | 42              | 59          | 0              |
| `ui-forms`    | 124          | 25              | 92          | 0              |

Every bare specifier left in the built output is a real external: the Radix packages, `cmdk`,
`motion/react`, `react-day-picker`, `@tanstack/react-form`, `@tanstack/react-virtual`,
`@iconify/react`, `class-variance-authority`, `@repo/*`, `react` and `react/jsx-runtime`. `ui-core`
and `ui-forms` no longer ship a copy of `react-day-picker` each.

Checks that specifically answer the spec's edge cases:

- **Byte-identical across the `externals` removal.** `sha256` over every file in all five `dist/`
  trees, taken with the arguments present and again with them removed under the new matcher:
  identical in all five packages. Declaration output (`*.d.ts`) is also byte-identical to the
  pre-change baseline, and `core`'s entire `dist/` is unchanged from baseline.
- **CSS still resolves.** No package emits CSS from `dist/` — not before this change either.
  Styling comes from `@repo/tailwind-config/globals.css`, which the consuming app imports directly,
  so there was no dependency CSS to lose. No source file in any package imports a `.css` from a
  dependency.
- **`catalog:` verified from a clean install**, not an incremental one: `node_modules` wiped
  workspace-wide, then `pnpm install --frozen-lockfile`.
- **The type gate fails when a type is broken.** A deliberate
  `export const __typeCheckProbe: number = 'not a number'` in `ui-overlays/src/index.ts` produced
  `TS2322` and exit code 2; reverted after.
- **Cross-package React still shares one instance.** Externalizing every dependency is exactly the
  change that could reintroduce the two-React-instances crash. `RangeDatePicker` — `ui-forms`
  composing `ui-overlays`' `Popover` around `ui-core`'s `Calendar` around `react-day-picker` —
  renders, opens and paints 154 day cells in the dev server with zero console errors.

## Not done, deliberately

The spec put these out of scope and they stayed out.

- **No dependency audit.** Whether each package needs all 19 of its dependencies is a separate
  question. Note in passing that `clsx`, `tailwind-merge`, `react-use`, `zod` and `date-fns` are
  declared by UI packages but appear in no built output — they may be reached only through
  `@repo/tailwind-config`, or be unused. Not investigated.
- **No `isTruthy` implementation.** The declaration was the bug.
- **No new gates or CI steps.**
- **Nothing upgraded** beyond a version already present in the repo.

## Follow-ups

Raised, not built. Each needs its own go-ahead.

- **`prettier` (`^3.6.2`, eight places) and `@eslint/js` (`^9.34.0` vs `^9.39.1`) are still literal
  versions.** Neither is named in the spec and prettier has no drift, but both are shared tools that
  the catalog would otherwise own. `@eslint/js` is a genuine two-version split.
- **`@repo/ui-command` is declared in both `dependencies` and `devDependencies` of `ui-forms`**, and
  `@repo/ui-core` likewise in `ui-overlays`. Harmless today, and pre-existing.
- **`apps/storybook` defines no `check-types` script**, so `turbo run check-types` skips it. Its
  `build` is `tsc -b`, which does type-check, so nothing goes unchecked — but the gate's coverage is
  not what its name implies.
- **`apps/the-open-movie-database` uses `@vitejs/plugin-react-swc ^3.0.0` against Vite 7.** Untouched
  because it is outside this deliverable and currently builds.
- **The `local-development` skill's recorded Storybook figures are stale** — it says 27 story files
  and 311 tests; the suite is now 68 files and 385 tests. Corrected in the skill.

## Turbo cache warning

A `pnpm build` immediately after wiping `node_modules` and every `dist/` still reported
`11/11 successful, FULL TURBO` in 995ms — Turbo's cache lives outside the worktree and is keyed on
inputs, so a genuinely clean tree can still replay. The measurements above come from
`pnpm turbo run build --force`. This is the trap the
[`local-development` skill](../../.claude/skills/local-development/SKILL.md) warns about, and
wiping `node_modules` does **not** defeat it.
