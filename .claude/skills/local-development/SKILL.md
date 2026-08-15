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
  replayed logs give it away by printing a _different_ worktree's path (e.g.
  `.claude/worktrees/button-enhancements-556c34`). A real build here takes ~1m36s–2m40s.

The tell for "not set up": a suspiciously fast green `pnpm build` next to a catastrophically red
test suite.

**Deleting things does not defeat the cache.** The cache lives outside the worktree, so wiping
`node_modules`, every `dist/`, every `.turbo/` and every `*.tsbuildinfo`, then reinstalling from
scratch, still replayed `11/11 successful, FULL TURBO` in 995ms. `--force` is the only lever. Never
report a build time or a "clean build is green" without it.

## The gates

| Gate            | Command                                             | Notes                                                                                                                                 |
| --------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Build           | `pnpm build`                                        | `pnpm turbo run build --force` when baselining                                                                                        |
| Lint            | `pnpm lint`                                         | Errors DO fail it. Healthy today: **0 errors, 0 warnings** — any output is a regression                                               |
| Prettier        | `pnpm prettier`                                     | ⚠️ **`--write`, not `--check`. It cannot fail and it rewrites your tree** — see below                                                 |
| Types           | `pnpm check-types` (or `pnpm type-check`, an alias) | Builds dependencies first: 19 tasks, green from a fully clean tree                                                                    |
| Component tests | `cd apps/storybook && npx vitest run`               | Storybook `play()` interactions, Playwright/Chromium. ~60–120s. Green: 385 passed, 27 skipped. **Local only, on purpose** — see below |
| Hook/util tests | `pnpm test` in the owning package                   | `.spec.ts` only — pure logic, never components                                                                                        |

### `eslint-plugin-only-warn` is NOT wired up — lint errors are real

It is declared in `packages/eslint-config/package.json` and imported by **no config**; in flat
config a plugin only patches severity if it is loaded. Grep it before believing otherwise.

**Every rule is `error`, and the tree is warning-free as of `16`.** The two downgrades that used to
sit in `base.js` (`no-empty-object-type`, `no-explicit-any`) are gone. `pnpm lint` gates both
`.husky/pre-commit` and the CI `ESLint` job, so any output at all is now a regression rather than
background noise.

Verified 2026-08-15 by introducing a conditional `useState` into a story file: reported as an
`error`, exit 1.

### `no-empty-object-type` allows one specific shape, on purpose

`base.js` sets `allowInterfaces: 'with-single-extends'`, so
`interface IFoo extends React.ComponentProps<'div'> {}` lints clean. That is the pass-through idiom
for a component's prop interface — the `I` prefix exists so the type can be named after the component
without colliding with it. **Do not "fix" one of these into a type alias**; ~33 of them are load-
bearing convention. See `docs/16-type-hygiene/plan.md`.

Still `error`: `interface X {}` (no extends), `type X = {}`, and a bare `{}` annotation — which means
"anything except null/undefined", and is the footgun the rule actually exists for.

Note the rule **never** reports an interface with 2+ supertypes, at any setting
(`no-empty-object-type.js:71`). That is why `ui-command` reported zero warnings while holding five
empty interfaces. If you are reconciling a violation count and the arithmetic will not close, this is
usually why.

### `pnpm prettier` writes — it is not a check

The root script is `turbo run prettier`, and each package's is `prettier --write`. Writing is the
intent. What it is _not_ is a verification step: it always exits 0, so it can never tell you whether
something was already formatted.

**The tree is fully prettier-clean as of 2026-08-15** (`npx prettier --check .` → "All matched files
use Prettier code style"), so a stray `pnpm prettier` should now be a no-op. Before that it rewrote
22 files it had no business touching, which is trivially easy to sweep into an unrelated commit with
`git add -A`. If you ever see it produce a large diff again, the tree has drifted — commit that
separately, never folded into feature work.

Use `npx prettier --check` when you want to _know_.

Two coverage facts that keep it from drifting, worth not undoing:

- Every package's script is now `prettier --write` with no `./src` argument, so files outside `src/`
  are covered too. `apps/storybook` had **no prettier script at all** until `15`, which is why
  `.storybook/*.ts` sat unformatted.
- `.prettierignore` excludes `pnpm-lock.yaml` and `*.tsbuildinfo`. Do not remove those — a
  reformatted lockfile is churn at best.

Still open: the CI **Prettier** job (`.github/workflows/linting-action.yml`, `run: pnpm prettier`)
rewrites its own checkout and passes unconditionally, so it reports success without checking
anything. Switching it to `--check` is the obvious fix and has not been decided.

### The suite is green — 385 passed, 27 skipped

Re-baselined 2026-08-15 after `15`: **41 passed | 27 skipped (68 files)**, **385 passed (385
tests)**, ~62s warm / ~120s cold. The 27 skipped are the `.mdx` docs pages, which carry no tests.

The one failure that used to sit here was **date-dependent, not a `Calendar` bug**: `Basic` seeds
`useState(new Date())` so today is selected on mount, while its `play()` asserted the 15th was _not_
selected. It failed on the 15th of every month and passed the other ~29 days. `15` fixed it by
freezing the clock for the whole suite in `apps/storybook/.storybook/vitest.setup.ts`
(`vi.useFakeTimers({ toFake: ['Date'] })` — `Date` only, because blanket fake timers stall
`userEvent`).

**CI runs no tests, deliberately.** `.github/workflows/linting-action.yml` has three jobs — ESLint,
Prettier, TypeCheck — and no test job. Running Playwright/Chromium on every push costs money, and the
components are not stable enough yet to justify it. Do not "fix" this by adding a CI test job; it is
a decision, to be revisited when the component library settles. It does mean the suite is only ever
as green as the last person who ran it locally.

Two traps that cost real time here, worth keeping:

- **A stack-trace line number is not a source line number.** That failure reported
  `Calendar.stories.tsx:233` in a 229-line file — the trace points into Storybook's instrumented
  copy. Open the source and find the assertion by text, not by line.
- **Compare failure _lists_ against a baseline you captured yourself**, never a bare pass/fail. A
  suite that is green on the 14th and red on the 15th looks like "someone broke it today".

`turbo.json` gives `check-types` `dependsOn: ["^build"]`, not `^check-types`. That is load-bearing:
packages resolve each other through built `dist/*.d.ts`, and `tsc --noEmit` emits nothing, so
`^check-types` left every `@repo/*` import unresolvable from a clean tree (~100 `TS2307`s). Do not
"optimise" it back.

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

## Dependencies are external, and `package.json` is what decides

`packages/vite-config/shared.ts` reads the building package's own `dependencies` +
`peerDependencies` and externalizes every one, on top of React and `@repo/*`. A package's `dist/`
therefore contains that package's source and nothing else — no `dist/node_modules/` tree.

Two consequences:

- **Declaring a dependency is how you externalize it.** There is no allow-list to update. A package
  that imports something it does not declare will have it silently inlined instead, so a sudden
  `dist/node_modules/` directory means a missing `package.json` entry.
- **The two presets take `bundle: []` for the rare dependency that must be inlined.** It cannot
  override React or `@repo/*` — those are external for correctness (two React copies in one tree
  crash with `Cannot read properties of null (reading 'useState')`), not for output size.

Build plugins (`@vitejs/plugin-react-swc`, `@tailwindcss/vite`, `vite-plugin-dts`) are declared by
`vite-config` alone. Do not re-add them to a UI package; nothing there imports them.

**Two React versions are installed** (verified 2026-08-14): both apps resolve `react@19.1.1`, all
four UI packages resolve `react@19.2.4`. The root `pnpm.overrides` entry is a _range_
(`"react": "^19.1.1"`), and 19.2.4 satisfies it, so the override does not collapse the tree to one
copy — note the same block pins `@types/react` exactly, so the range looks unintentional. Nothing
breaks today: the packages externalize React and Storybook's Vite config dedupes it at the consuming
end. But the protection is bundler config, not declaration. If a `useState`-of-null crash ever
reappears, check `ls node_modules/.pnpm | grep '^react@'` before assuming the build config
regressed.

## The stories glob must use `packages/*/src`, never `packages/**/src`

`apps/storybook/.storybook/main.ts` globs `../../../packages/*/src/**/*.stories.*`. The single `*`
is load-bearing and has a comment on it — do not "tidy" it into `**`.

pnpm symlinks every workspace package into its dependents' `node_modules/@repo/`, so `**` also
matches `packages/ui-forms/node_modules/@repo/ui-core/src/...`, plus nested hops like
`ui-forms/node_modules/@repo/ui-command/node_modules/@repo/ui-overlays/node_modules/@repo/ui-core/...`.

Storybook's own indexer ignores those; `@storybook/addon-vitest` does not. With `**` the suite
collected **166 story files for ~30 components**, 97 of them unservable duplicates that each failed
to import and left a Vite error overlay in the shared page — which then failed `Button`'s a11y gate
on the _overlay's_ markup. With `*`: 27 files, 311 tests, 0 failures, 155s → 61s. (Those are the
figures as measured when the glob was fixed; the suite has grown to 68 files / 385 tests since. The
point is the ratio, not the absolute numbers.)

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
fetch('/index.json')
	.then((r) => r.json())
	.then((j) => {
		const paths = [...new Set(Object.values(j.entries).map((e) => e.importPath))];
		console.log({ entries: Object.keys(j.entries).length, files: paths.length });
	});
```

Healthy today: **412 entries across 68 import paths, none under `node_modules`**, matching a suite
of 68 files and 385 tests. Compare with
`cd apps/storybook && npx vitest list --filesOnly`. If Vitest's count is higher, it is collecting
files Storybook never indexed, and that difference is the bug.

The dev server runs on port 6006 via `.claude/launch.json` (`preview_start` with name `storybook`).

## Vitest 4 CLI

`--reporter=basic` was removed and fails with `Failed to load custom Reporter from basic`, which
reads like a config error rather than a removed flag. Use the default reporter, and capture output
with `> file 2>&1` rather than piping through `tail` — otherwise the summary survives and the
failure list you needed does not.
