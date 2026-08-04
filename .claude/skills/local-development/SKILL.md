---
name: local-development
description: How to set up a checkout of THIS repo and run its gates truthfully — install/build order, the Storybook interaction suite, and the traps that make build and test results lie. ALWAYS read before running pnpm build/lint/test or the Storybook suite here, and before concluding that anything is "already broken".
---

# Local development (this repo)

General planning discipline lives in the `implementation-planning` skill; general Storybook rules
live in `storybook-standards`. This file is only what is true of **this** repo.

## 🚨 Set the checkout up before you trust any gate

A fresh `.claude/worktrees/*` worktree is **not** installed. Run this before believing any result:

```bash
pnpm install
pnpm turbo run build --force
rm -rf apps/storybook/node_modules/.cache apps/storybook/node_modules/.vite
```

Both halves matter, and skipping either produces convincing nonsense:

- **`pnpm install`** — a fresh worktree here was missing 13 packages. The symptom was the entire
  Storybook suite failing with `Failed to fetch dynamically imported module`, which looks exactly
  like the stale-cache trap below and is not.
- **`--force`** — Turbo's cache is shared across worktrees and keyed on inputs, not location. An
  untouched worktree reports `11/11 successful, FULL TURBO` in ~2s having compiled nothing; the
  replayed logs give it away by printing a *different* worktree's path (e.g.
  `.claude/worktrees/button-enhancements-556c34`). A real build here takes ~1m36s.

The tell for "not set up": a suspiciously fast green `pnpm build` next to a catastrophically red
test suite.

## The gates

| Gate | Command | Notes |
| ---- | ------- | ----- |
| Build | `pnpm build` | `pnpm turbo run build --force` when baselining |
| Lint | `pnpm lint` | One known warning: `ITextarea` is an empty interface |
| Component tests | `cd apps/storybook && npx vitest run` | Storybook `play()` interactions, Playwright/Chromium. ~60s |
| Hook/util tests | `pnpm test` in the owning package | `.spec.ts` only — pure logic, never components |

Component tests are Storybook `play()` functions, never `.spec.tsx`. Pure logic (hooks, utils) uses
`.spec.ts`. See `storybook-standards`.

## Packages resolve through `dist/`, not source

`ui-core` → `ui-overlays` → `ui-command` → `ui-forms` import each other by `@repo/*` specifier,
which resolves to **built output**. The `~/` alias resolves to source, but only within a package's
own tsconfig.

So after editing a package that another package consumes, changes are invisible until:

```bash
pnpm turbo run build --filter=@repo/<pkg>
rm -rf apps/storybook/node_modules/.cache apps/storybook/node_modules/.vite
```

Skipping this gives both false greens and false reds.

## The stories glob must use `packages/*/src`, never `packages/**/src`

`apps/storybook/.storybook/main.ts` globs `../../../packages/*/src/**/*.stories.*`. The single `*`
is load-bearing and has a comment on it — do not "tidy" it into `**`.

pnpm symlinks every workspace package into its dependents' `node_modules/@repo/`, so `**` also
matches `packages/ui-forms/node_modules/@repo/ui-core/src/...`, plus nested hops like
`ui-forms/node_modules/@repo/ui-command/node_modules/@repo/ui-overlays/node_modules/@repo/ui-core/...`.

Storybook's own indexer ignores those; `@storybook/addon-vitest` does not. With `**` the suite
collected **166 story files for ~30 components**, 97 of them unservable duplicates that each failed
to import and left a Vite error overlay in the shared page — which then failed `Button`'s a11y gate
on the *overlay's* markup. With `*`: 27 files, 311 tests, 0 failures, 155s → 61s.

`test.exclude: ['**/node_modules/**']` in `apps/storybook/vite.config.ts` does **not** fix this;
`storybookTest` builds its `include` from Storybook's file matcher as explicit paths, so there is no
glob left to filter. The stories glob is the only lever.

## Accessibility gates are opt-in, per file

`preview.ts` sets `a11y: { test: 'todo' }` globally — reports only, never fails.
`Button.stories.tsx` sets `a11y: { test: 'error' }` on its own `meta`, deliberately, because the
rest of the library has pre-existing violations (`docs/02-button-enhancements/spec.md`).

Story/meta-level `a11y.test` **overrides** the global, so setting `'off'` in `preview.ts` will not
silence `Button`. If exactly one file fails a11y assertions, that is why.

A failure whose selector is `$('vite-error-overlay,...)` is not an accessibility problem — axe is
scanning Vite's error overlay. Find the import that failed.

## Diagnosing "headless fails, dev server is fine"

There is no separate test config: `apps/storybook/vite.config.ts` points
`storybookTest({ configDir })` at the same `.storybook` directory. Same `main.ts`, same
`preview.ts`.

Fastest check — start the dev server, then in the browser console:

```js
fetch('/index.json').then(r => r.json()).then(j => {
	const paths = [...new Set(Object.values(j.entries).map(e => e.importPath))];
	console.log({ entries: Object.keys(j.entries).length, files: paths.length });
});
```

Healthy today: **318 entries across 34 import paths, none under `node_modules`**. Compare with
`cd apps/storybook && npx vitest list --filesOnly`. If Vitest's count is higher, it is collecting
files Storybook never indexed, and that difference is the bug.

The dev server runs on port 6006 via `.claude/launch.json` (`preview_start` with name `storybook`).

## Vitest 4 CLI

`--reporter=basic` was removed and fails with `Failed to load custom Reporter from basic`, which
reads like a config error rather than a removed flag. Use the default reporter, and capture output
with `> file 2>&1` rather than piping through `tail` — otherwise the summary survives and the
failure list you needed does not.
