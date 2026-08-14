# Feature: Build externalization

## Problem

Every library package bundles a private copy of its third-party dependencies into its own `dist/`.
`packages/vite-config/react-library.ts` externalizes `@repo/*` (line 63) and React (line 64), but
nothing else — so Radix, `date-fns`, `cmdk`, `motion` and `react-day-picker` are inlined into each
package that uses them. `ui-core` and `ui-forms` both depend on `react-day-picker`, and each ships
its own copy.

This is the same class of defect that already caused a production-visible failure. The React case
was fixed under [`11-correctness-bugs`](../11-correctness-bugs/plan.md) after two live React
instances produced `Cannot read properties of null (reading 'useState')` — but the fix was applied
only to React, so every other stateful dependency remains exposed to the same duplicate-instance
problem.

Three of the four UI packages also pass a redundant `externals: ['@repo/…']` list to
`reactLibrary()`. Line 63 already externalizes everything starting with `@repo/`, so those lists do
nothing while reading as load-bearing configuration.

## Goals

1. A package's `dist/` contains that package's own source and nothing else.
2. Any dependency that keeps internal state exists once in a consumer's tree, not once per package
   that imports it.
3. The shared Vite config expresses the externalization rule in one place, so a new package gets it
   by default rather than by remembering to opt in.

## Scope

- **Included**: externalizing third-party runtime dependencies from all four UI package builds;
  removing the redundant `externals: ['@repo/…']` arguments; confirming the built output no longer
  contains vendored dependency code.
- **Not included**: changing which packages exist or what they depend on (that is the four-package
  split question, deliberately pinned — see the roadmap); dependency _version_ alignment (see
  [`13-dependency-versions`](../13-dependency-versions/spec.md)); bundling strategy for the
  consuming app.
- **Can be delivered independently**: yes. No dependency on any other outstanding deliverable.

## Non-Goals

- Reducing the number of dependencies, or auditing whether each is justified.
- Changing `preserveModules`, CSS code-splitting, or any other output shaping already in place.
- Publishing configuration. These packages are consumed from source inside the monorepo today.

## Requirements

1. A package's build must treat its declared runtime dependencies as external rather than inlining
   them.
2. React and `@repo/*` externalization must keep working exactly as it does now — this deliverable
   generalizes that rule, it does not replace it.
3. The rule must apply to all four UI packages without per-package configuration.
4. Removing the redundant `externals` arguments must not change build output.

## Edge Cases & Error Handling

- **A dependency that must be bundled.** If any dependency genuinely needs inlining, the config must
  still allow a package to opt out explicitly; the default is external.
- **Type-only dependencies** contribute no runtime code and must not appear in output either way.
- **CSS imported from a dependency** is not JavaScript and needs checking separately — confirm
  styles still resolve after the change.

## Acceptance Criteria

- [ ] No `dist/` output for `ui-core`, `ui-overlays`, `ui-command` or `ui-forms` contains vendored
      third-party dependency source.
- [ ] `react`, `react-dom` and the JSX runtimes remain external (no regression of the
      `11-correctness-bugs` fix).
- [ ] The redundant `externals: ['@repo/…']` argument is gone from `ui-overlays`, `ui-command` and
      `ui-forms` vite configs, with byte-identical build output before and after that removal.
- [ ] `pnpm build` is green from a clean state.
- [ ] The Storybook interaction suite is no worse than before this change (see
      [`19-storybook-lint-tests`](../19-storybook-lint-tests/spec.md) for its known-red status —
      this deliverable must not be blamed for, or blocked by, that).

## Open Questions

- Should externalization be driven by each package's declared `dependencies`, or by an explicit
  allow-list in the shared config? The former cannot drift from `package.json`; the latter is
  visible in one file. This is an `implementation-planning` decision.
