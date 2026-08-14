# Feature: Dependency version single-sourcing

## Problem

`pnpm-workspace.yaml` defines a `catalog:` intended as the single source of truth for shared
tool versions. It was started and never finished: `typescript` and `vite` route through it in eight
packages each, but `vitest`, `eslint` and `tsup` do not. The versions have since drifted.

The most serious case is **`vitest`**: `^4.0.18` in seven places (`core`, the four UI packages,
`vite-config`, `apps/storybook`), `catalog:` in `typescript-config`, and **`^3.2.4` in
`apps/the-open-movie-database`** — a major version apart, so the consuming app runs a different test
runner than the library it consumes. Also drifted: `eslint` (`^9.39.1` vs `^9.34.0`), `tsup`
(`^8.3.5` vs `^8.0.2`), and `typescript`, which has `~5.9.3` and `^5.0.2` hardcoded in places
despite the catalog existing.

Separately, three Vite plugins — `@vitejs/plugin-react-swc`, `@tailwindcss/vite` and
`vite-plugin-dts` — are declared as devDependencies of all four UI packages, even though only
`packages/vite-config` imports them. That is four places to bump instead of one, and it is why they
can drift in the first place.

This is the per-package tax that the original decision to keep four separate UI packages explicitly
accepted paying. It has not been paid, so the repo currently carries the cost of the split without
the maintenance discipline that was supposed to offset it.

## Goals

1. A shared tool version is stated once and changed once.
2. No package can silently run a different major version of a shared tool than its siblings.
3. A dependency is declared by the package that actually imports it.

## Scope

- **Included**: extending `catalog:` to cover the remaining shared tool versions; resolving the
  existing drift; relocating the three build plugins to the package that imports them; removing the
  now-stale "Expand this in D5" comment in `pnpm-workspace.yaml`.
- **Not included**: upgrading any dependency to a newer version than the repo already uses —
  resolving drift means converging on a version already present, not chasing latest. Adding or
  removing dependencies. Externalization of dependencies at build time (see
  [`12-build-externalization`](../12-build-externalization/spec.md)).
- **Can be delivered independently**: yes, though it pairs naturally with `12`.

## Non-Goals

- Auditing whether each dependency is needed.
- Changing the package boundaries themselves.
- Introducing a version-policy tool (Renovate, syncpack, etc.).

## Requirements

1. Shared tool versions must resolve from a single declaration.
2. The `vitest` major-version split must be resolved, and the resolution justified — converging the
   outlier onto the majority version is the expected outcome, but the outlier must be checked for a
   reason it was pinned before it is moved.
3. Dependencies used only by `vite-config` must be declared by `vite-config`.
4. All existing gates (`build`, `lint`, `check-types`, the test suites) must be green afterwards on
   a clean install.

## Edge Cases & Error Handling

- **The outlier `vitest` pin may be deliberate.** Check git history before converging it. If it was
  pinned to work around something, record that rather than silently overriding it.
- **A package may import a build plugin indirectly.** Confirm nothing outside `vite-config` imports
  the three plugins before removing them from the UI packages' devDeps.
- **`catalog:` only applies within the workspace protocol.** Confirm every consumer resolves after
  the change with a clean `pnpm install`, not an incremental one.

## Acceptance Criteria

- [ ] `vitest`, `eslint` and `tsup` resolve from `catalog:` in every package that uses them.
- [ ] No package declares a literal version for a dependency the catalog covers.
- [ ] `vitest` is a single version across the workspace; if the outlier's pin was intentional, the
      reason is recorded rather than discarded.
- [ ] `@vitejs/plugin-react-swc`, `@tailwindcss/vite` and `vite-plugin-dts` are declared by
      `vite-config` and absent from all four UI packages.
- [ ] The stale `Expand this in D5` comment is gone from `pnpm-workspace.yaml`.
- [ ] A clean `pnpm install && pnpm build` is green, and lint / check-types / tests are no worse
      than before.
