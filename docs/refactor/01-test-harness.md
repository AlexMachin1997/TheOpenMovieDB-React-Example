# D0 — Vitest test harness

**Phase:** 1 · **Size:** S · **Depends on:** none · **Status:** ✅ done

> **Implementation note.** Landed as a **node-environment** harness: Vitest covers pure
> logic only, while component behaviour is tested via Storybook `play()` tests. Consequences:
> jsdom + React Testing Library are **deferred to D3** (first real need is `renderHook` for
> `useDebouncedValue`); the existing Storybook interaction tests are tracked under **F6**
> (blocked by the D5 React-externalization bug). This deliverable ships **plumbing only** —
> every library package is wired (config + `test`/`test:watch` scripts) but carries **no test
> files yet**, staying green via `passWithNoTests: true`. Real coverage lands on top of this
> harness in **D1** (grouping), **D2** (dates), and **D3** (debounce). The shared preset lives
> in `@repo/vite-config/vitest-base`; the DTS `exclude` and Vitest `include` are single-sourced
> in `packages/vite-config/shared.ts`.

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

- [x] Decide config style: a root `vitest.workspace.ts` referencing per-package configs,
      **or** a small shared preset in `@repo/vite-config` (e.g. `vitest-base.ts`) that each
      package extends. Prefer the shared preset — matches the existing `reactLibrary` pattern.
- [~] Add `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` as devDeps where
      needed (UI packages only; `core` stays node env). — deferred to D3 as noted above; added
      for `ui-core` there (no `jest-dom` needed — no DOM matchers used).
- [x] Add `test` / `test:watch` scripts to the five library packages.
- [ ] Add one smoke test per package. — not added; shipped plumbing-only (`passWithNoTests: true`)
      as noted above, with real coverage landing via D1/D2/D3 instead.
- [~] Confirm `turbo run test` runs all packages green; confirm `test` task `inputs` in
      `turbo.json` still make sense (currently `$TURBO_DEFAULT$` + `.env*`). — `turbo run test`
      is green; the `inputs` review was not revisited.

## Acceptance criteria

- [x] `pnpm test` from the repo root runs Vitest in every library package and passes.
- [x] `turbo run test` shows each package executing (not "no tasks").
- [~] A deliberately failing assertion in any smoke test makes `turbo run test` fail
      (proves the harness is actually wired, not silently skipped). — no dedicated smoke test
      exists to deliberately break; proven instead by D1/D2/D3's real tests actually gating.
- [x] No changes to any component/library runtime code.

## Notes

Keep the DTS/build config untouched — the Vite `dts` plugin already excludes
`*.test.tsx` ([`react-library.ts:53`](../../packages/vite-config/react-library.ts)); make
sure the Vitest glob and the DTS exclude agree so tests never land in `dist`.
