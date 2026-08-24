---
name: local-development
description: How to set up a checkout of THIS repo and run its gates truthfully — install/build order, the gates and what each one does not cover, and the traps that make build and test results lie. ALWAYS read before running pnpm build/lint/test or the Storybook suite here, and before concluding that anything is "already broken".
---

# Local development (this repo)

General planning discipline lives in the `implementation-planning` skill; general Storybook rules
live in `storybook-standards`. This file is only what is true of **this** repo.

Two companion files, read on demand rather than up front:

| Read                                                 | When                                                                                                                                           |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [`storybook-suite.md`](storybook-suite.md)           | The interaction suite is red, you are adding a story, the a11y gate is involved, or headless and the dev server disagree                       |
| [`build-and-resolution.md`](build-and-resolution.md) | A change in one package is not visible in another, something unexpected is in `dist/`, or you are about to touch `turbo.json` or `vite-config` |

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
  like a stale cache and is not.
- **`--force`** — Turbo's cache is shared across worktrees and keyed on inputs, not location. An
  untouched worktree reports `11/11 successful, FULL TURBO` in ~2s having compiled nothing; the
  replayed logs give it away by printing a _different_ worktree's path (e.g.
  `.claude/worktrees/button-enhancements-556c34`). A real build here takes minutes.

The tell for "not set up": a suspiciously fast green `pnpm build` next to a catastrophically red
test suite.

**Deleting things does not defeat the cache.** It lives outside the worktree, so wiping
`node_modules`, every `dist/`, every `.turbo/` and every `*.tsbuildinfo`, then reinstalling from
scratch, still replayed `11/11 successful, FULL TURBO` in under a second. `--force` is the only
lever. Never report a build time, or that a clean build is green, without it.

## The gates

| Gate            | Command                                      | Notes                                                                                                                             |
| --------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Build           | `pnpm build`                                 | `pnpm turbo run build --force` when baselining                                                                                    |
| Lint            | `pnpm lint`                                  | Errors **and** warnings fail it (`--max-warnings 0`)                                                                              |
| Prettier        | `pnpm prettier:check`                        | The gate. `pnpm prettier` rewrites — see below                                                                                    |
| Types           | `pnpm check-types` (alias `pnpm type-check`) | Builds dependencies first                                                                                                         |
| Component tests | `cd apps/storybook && npx vitest run`        | Storybook `play()` in Playwright/Chromium, ~60–120s. **Local only, deliberately.** See [`storybook-suite.md`](storybook-suite.md) |
| Hook/util tests | `pnpm test` in the owning package            | `.spec.ts` only — pure logic, never components                                                                                    |

**Do not write current pass counts, entry counts or version numbers into these files.** They rot,
and a stale figure is worse than none: it gets trusted. Every one of them has a command above or in
the companion files that recomputes it in seconds. Capture your own baseline at the start of a
change and compare against that.

### Neither test gate type-checks — a green suite can sit on a type error

`vitest run` transpiles and discards types; only `pnpm build` (which runs `check-types`) sees them.
So both test rows above prove behaviour and nothing else.

Observed under `04`: `useRovingTabIndex.spec.ts` passed **17/17 while containing a type error** —
`elements.indexOf(document.activeElement as HTMLElement)` against an `HTMLButtonElement[]`. Only the
build caught it.

`noUncheckedIndexedAccess` makes this more likely than it sounds in story and spec files, because
`getAllByRole(...)[n]` is `HTMLElement | undefined`: fine inside `expect()`, rejected by
`userEvent.click()`. Run the build before believing a test-only change is clean.

### Lint errors are real — `eslint-plugin-only-warn` is NOT wired up

It is declared in `packages/eslint-config/package.json` and imported by **no config**; in flat config
a plugin only patches severity if it is loaded. Grep it before believing otherwise.

Every rule is `error`, and a warning fails too — seven lint scripts carry `--max-warnings 0`. Any
output at all is a regression rather than background noise. `apps/the-open-movie-database` is
deliberately excluded until it is reworked, so a warning there still passes.

**Rule rationale is not documented here.** [`packages/eslint-config/README.md`](../../../packages/eslint-config/README.md)
is its home — read it before touching `folderStructure`, which has three separate ways of looking
like it works while checking nothing, and before "fixing" an `interface IFoo extends Bar {}`, which
`no-empty-object-type` allows deliberately.

### `pnpm prettier` writes; `pnpm prettier:check` is the gate

Both are **root-level** as of `13`. The per-package `prettier` scripts and the turbo `prettier` task
were removed, because **Prettier searches upward for `.prettierrc` but not for `.prettierignore`**:
`--ignore-path` resolves against the working directory and never walks up, so a workspace-local
`prettier --check .` cannot see the root ignore list and checks that package's own `dist/`. Running
once from the root needs no arguments and also covers `docs/`, `README.md`, `turbo.json` and
`.github/`, which belong to no workspace.

`.prettierignore` excludes `pnpm-lock.yaml` and `*.tsbuildinfo`. Do not remove those — a reformatted
lockfile is churn at best.

**If `pnpm prettier` produces a large diff, the tree has drifted.** Commit that separately, never
folded into feature work — `git add -A` sweeps it up silently otherwise. Use
`npx prettier --check .` when you want to _know_ whether it is clean.
