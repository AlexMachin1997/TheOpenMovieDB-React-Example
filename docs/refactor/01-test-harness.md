# D0 — Vitest test harness

**Phase:** 1 · **Size:** S · **Depends on:** none · **Status:** todo

## Goal

Wire Vitest into every library package so `pnpm test` / `turbo run test` actually runs
something. Today `vitest` is a devDependency everywhere but there is **no config, no test
script, and zero test files**, so `turbo run test` silently no-ops. This deliverable adds
the plumbing and one smoke test per package — no product logic changes.

## Why

- No `*.test.*` / `*.spec.*` files exist anywhere in `packages/`.
- `core`, `ui-core`, `ui-forms`, `ui-command` have **no `test` script**; the three config
  packages have `"test": "echo …"` no-ops.
- `turbo.json` already declares a `test` task, so the graph is ready — only the per-package
  wiring is missing.

This is the keystone: D1–D4 all ship with regression tests, which requires this first.

## Scope

- Add a shared Vitest config (jsdom + React Testing Library for UI packages, node
  environment for `core`).
- Add `"test": "vitest run"` and `"test:watch": "vitest"` to `core`, `ui-core`,
  `ui-forms`, `ui-command`, `ui-overlays`.
- Add one trivial smoke test per package (e.g. render `Button`, import a `core` helper) to
  prove the harness runs green in CI/Turbo.
- Pin `vitest` to one version across packages (`core` is on v3, others v4) — or defer the
  version unification to D5 and just match `core` up to v4 here if low-effort.

## Out of scope

- Any real unit tests for grouping / dates / debounce (those are D1, D2, D3).
- Any component or config bug fixes (D4, D5).
- Coverage thresholds and CI gating (follow-up once tests exist).

## Approach

- [ ] Decide config style: a root `vitest.workspace.ts` referencing per-package configs,
      **or** a small shared preset in `@repo/vite-config` (e.g. `vitest-base.ts`) that each
      package extends. Prefer the shared preset — matches the existing `reactLibrary` pattern.
- [ ] Add `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` as devDeps where
      needed (UI packages only; `core` stays node env).
- [ ] Add `test` / `test:watch` scripts to the five library packages.
- [ ] Add one smoke test per package.
- [ ] Confirm `turbo run test` runs all packages green; confirm `test` task `inputs` in
      `turbo.json` still make sense (currently `$TURBO_DEFAULT$` + `.env*`).

## Acceptance criteria

- [ ] `pnpm test` from the repo root runs Vitest in every library package and passes.
- [ ] `turbo run test` shows each package executing (not "no tasks").
- [ ] A deliberately failing assertion in any smoke test makes `turbo run test` fail
      (proves the harness is actually wired, not silently skipped).
- [ ] No changes to any component/library runtime code.

## Notes

Keep the DTS/build config untouched — the Vite `dts` plugin already excludes
`*.test.tsx` ([`react-library.ts:53`](../../packages/vite-config/react-library.ts)); make
sure the Vitest glob and the DTS exclude agree so tests never land in `dist`.
