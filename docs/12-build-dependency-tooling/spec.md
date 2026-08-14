# Feature: Build & dependency tooling

## Problem

The four-package split was kept on the explicit understanding that the per-package tax would be
paid down instead. It never was, so the repo carries the cost of four packages without the
discipline meant to offset it. Three related symptoms:

**Third-party code is bundled into every package.** `packages/vite-config/react-library.ts`
externalizes `@repo/*` (line 63) and React (line 64), and nothing else — so Radix, `date-fns`,
`cmdk`, `motion` and `react-day-picker` are inlined into each package's `dist/`. `ui-core` and
`ui-forms` each ship their own copy of `react-day-picker`. The React case was only fixed after two
live React instances produced `Cannot read properties of null (reading 'useState')`; every other
stateful dependency is still exposed to that same failure. Three of the four packages also pass a
redundant `externals: ['@repo/…']` argument that line 63 already covers.

**Versions have drifted despite a catalog existing.** `typescript` and `vite` route through
`catalog:` in eight packages each; `vitest`, `eslint` and `tsup` do not. `vitest` is `^4.0.18` in
seven places but **`^3.2.4` in `apps/the-open-movie-database`** — a major apart, so the consuming app
runs a different test runner than the library it consumes. `eslint` is `^9.39.1` vs `^9.34.0`, `tsup`
`^8.3.5` vs `^8.0.2`. Three Vite plugins (`@vitejs/plugin-react-swc`, `@tailwindcss/vite`,
`vite-plugin-dts`) are declared by all four UI packages though only `vite-config` imports them —
four places to bump, which is how drift starts.

**Some config is dead or lying.** The root `type-check` script runs `turbo run ts-validate`, a task
no package defines: it exits successfully having checked nothing. `eslint-config` advertises `./next`
and `./react-internal` exports that are not usable. `isTruthy` is declared as an ambient global
(`packages/typescript-config/types/global.d.ts:47`) with a JSDoc example, **no runtime implementation
anywhere**, and no real call sites — anything taking its suggestion compiles and throws.

## Goals

1. A package's `dist/` contains that package's own source and nothing else.
2. A shared tool version is stated once and changed once.
3. Every gate either does what its name says, or does not exist.

## Scope

- **Included**: externalizing third-party runtime dependencies and removing the redundant
  `externals` arguments; extending `catalog:` to the remaining shared tools and resolving the drift;
  relocating the three build plugins to `vite-config`; fixing the root `type-check` script; deleting
  the dead `eslint-config` exports and the ambient `isTruthy`; verifying `check-types` task ordering
  in `turbo.json` resolves internal `@repo/*` types from a clean state.
- **Not included**: upgrading anything to a newer version than the repo already uses — resolving
  drift means converging on a version already present. Fixing type errors the now-working
  `type-check` surfaces; record them and raise separately rather than absorbing an unbounded fix.
  Changing which packages exist (the four-package split is pinned).
- **Can be delivered independently**: yes. Sequence it before
  [`15-storybook-lint-tests`](../15-storybook-lint-tests/spec.md), which may be affected by it.

## Non-Goals

- Auditing whether each dependency is justified, or reducing their number.
- Providing a working `isTruthy`. It has no call sites; the declaration is the bug.
- Adding new gates, new CI steps, or a version-policy tool.
- Publishing configuration — these packages are consumed from source inside the monorepo.

## Requirements

1. A package's build must treat its declared runtime dependencies as external. React and `@repo/*`
   externalization must keep working exactly as now — this generalizes that rule, it does not
   replace it.
2. Removing the redundant `externals` arguments must not change build output.
3. Shared tool versions must resolve from a single declaration, and dependencies must be declared by
   the package that imports them.
4. The root type-check script must invoke a task packages actually define, and must fail when a type
   is broken.
5. Anything deleted must be provably unused first.

## Edge Cases & Error Handling

- **A dependency that must be bundled.** The config must still allow explicit opt-out; external is
  the default, not the only option.
- **CSS imported from a dependency** is not JavaScript — confirm styles still resolve separately.
- **The outlier `vitest` pin may be deliberate.** Check git history before converging it; if it was
  pinned to work around something, record that rather than silently overriding it.
- **Turning on a gate that never ran will surface failures.** That is the point. Capture them; fix
  what is in scope and raise the rest.
- **`catalog:` resolution needs a clean install** to verify, not an incremental one.

## Acceptance Criteria

- [ ] No `dist/` output for the four UI packages contains vendored third-party source, and React
      plus the JSX runtimes remain external.
- [ ] The redundant `externals: ['@repo/…']` argument is gone from `ui-overlays`, `ui-command` and
      `ui-forms`, with byte-identical build output across that removal.
- [ ] `vitest`, `eslint` and `tsup` resolve from `catalog:`; no package declares a literal version
      the catalog covers; `vitest` is a single version workspace-wide.
- [ ] The three build plugins are declared by `vite-config` and absent from all four UI packages.
- [ ] `pnpm type-check` runs a real task and fails when a type is broken — verified by breaking one
      and observing a non-zero exit.
- [ ] `./next`, `./react-internal` and the ambient `isTruthy` are gone, with no remaining importers
      and `grep -rn isTruthy` returning nothing.
- [ ] A clean `pnpm install && pnpm build` is green; lint and check-types are no worse than before.

## Open Questions

- Should externalization be driven by each package's declared `dependencies`, or by an explicit
  allow-list in the shared config? The former cannot drift from `package.json`; the latter is
  visible in one file. An `implementation-planning` decision.
