# 15 — Storybook lint + interaction tests

Status: **shipped.** This is the as-built record. The [spec](spec.md) describes the world as it was
believed to be; this describes what was actually found.

## Summary

The spec's first requirement was to establish the real state empirically, because both recorded
diagnoses were suspect. Both turned out to be wrong, in different ways:

- **The lint plugin's blocker was real, and is real today** — but the recorded unblocking condition
  ("once storybook + eslint-plugin-storybook are on a version without the require(esm) cycle") could
  never have unblocked it, because the versions were already aligned when it crashed. The variable
  was **Node**, and the repo moved past it.
- **The interaction suite was never off, and never red as a suite.** It was 384/385 passing. The one
  failure was a date-dependent bug in a story, which had been misdiagnosed as a `Calendar`
  component bug and left unowned.

Both are now closed. Neither was blocked upstream, so the spec's "record it as blocked" branch did
not apply.

## The lint plugin

### Root cause — established, not inherited

The removal comment blamed an `ERR_REQUIRE_CYCLE_MODULE` crash "On Node 22 … via storybook
10.2.16". Reproduced directly, from `packages/eslint-config`, on the **current** lockfile:

```
$ node --input-type=module -e "await import('eslint-plugin-storybook')"
IMPORT OK                                                        # v24.18.1

$ fnm exec --using=22 node --input-type=module -e "await import('eslint-plugin-storybook')"
Error [ERR_REQUIRE_CYCLE_MODULE]: Cannot require() ES Module
  …/storybook/dist/_browser-chunks/chunk-ECQ75MKQ.js in a cycle. A cycle involving
  require(esm) is not allowed to maintain invariants mandated by the ECMAScript
  specification.                                                 # v22.23.2
```

`storybook` is `"type": "module"` and its `./internal/csf` subpath — the plugin's only
Storybook-internal import — exports **only** an ESM `default` with no `require` condition. Node
22.12 shipped `require(esm)` and threw on any cycle crossing that boundary; 24 relaxed it. So:

- **Package versions were never the gate.** `git show 597c3a6^:packages/eslint-config/package.json`
  pins `eslint-plugin-storybook: 10.2.16` — identical to today. The stated condition was already
  satisfied at the moment of the crash.
- **Node was the gate**, and it still is. The crash is one `fnm exec --using=22` away.

### Why the `.node-version` pin alone did not fix it

[`06-repo-health`](../06-repo-health/plan.md) pinned Node 24 via `.node-version` and `engines.node`,
but listed as still outstanding: *"the developer must update their system Node install to 24 (turbo
spawns builds through the Program Files Node, which fnm can't override)"*. That has since happened —
`C:\Program Files\nodejs\node.exe --version` is now `v24.18.1`, matching the shell. That is the
change that actually unblocked this, and it happened as a side effect of unrelated work, which is
why nobody connected it.

**The pin has to hold for the system Node, not just the shell Node.** That is now recorded in the
code comment, because it is the condition that keeps this working.

### What was enabled

`...pluginStorybook.configs['flat/recommended']` in `packages/eslint-config/react.js`, spread
**above** that file's own rules block. The ordering is load-bearing and is commented as such.

The previous wiring (`git show 597c3a6`) registered the plugin under `plugins:` with **no rules
enabled** — it paid the config-load cost, and the crash, for zero coverage.

### Requirement 2: no other rule degraded

`flat/recommended` sets `react-hooks/rules-of-hooks: 'off'` on `**/*.stories.*`. That rule is
`'error'` in this repo, in a block with no `files` key, so it already applied to story files and
already passed. Flat config is last-match-wins per rule, so the spread had to go **above** it.

Proven two independent ways, because a degraded linter is indistinguishable from a clean one.

**1. Resolved-config diff** (`eslint --print-config`, before vs after, compared semantically rather
than textually):

| File | `removed` | `changed` | `added` |
| --- | --- | --- | --- |
| `Calendar.stories.tsx` | `[]` | `[]` | 10 × `storybook/*`, plus `import-x/no-anonymous-default-export: [0]` |
| `Calendar.tsx` (non-story) | `[]` | `[]` | `[]` |
| `apps/storybook/.storybook/main.ts` | `[]` | `[]` | `storybook/no-uninstalled-addons: [2]` |

Total resolved rules on a story file: **480 → 491**. Nothing removed, nothing weakened.
`react-hooks/rules-of-hooks` is `[2]` before and after; so are `exhaustive-deps` and
`react-refresh/only-export-components`.

The stray `import-x/no-anonymous-default-export: [0]` is harmless — that plugin is not installed,
and ESLint skips plugin resolution entirely for a rule set to `off`.

**2. Deliberate errors** (acceptance criterion 3). Two at once in
`packages/ui-core/src/components/Calendar/Calendar.stories.tsx` — one Storybook rule, one
pre-existing rule, on the same file:

```
   1:1  error  Do not import renderer package "@storybook/react" directly. Use a framework
               package instead (…)                                storybook/no-renderer-packages
  41:3  error  React Hook "useState" is called conditionally. React Hooks must be called in
               the exact same order in every component render      react-hooks/rules-of-hooks

✖ 2 problems (2 errors, 0 warnings)
exit=1
```

Reverted with `git checkout --`; `git diff --exit-code` clean, re-lint `exit=0`.

This also disproves a third thing: the `local-development` skill claimed
`eslint-plugin-only-warn` "downgrades everything". It is declared in
`packages/eslint-config/package.json` and **imported by no config**, so it patches nothing. Lint
errors are real and do fail `pnpm lint`, which gates `.husky/pre-commit` and CI.

### Violations found and fixed

Three, all `storybook/no-redundant-story-name` (warn), all in
`packages/ui-forms/src/components/Selects/Select.stories.tsx`: `FormIntegration`, `CustomStyling`
and `EmptyState` each carried a `name:` identical to the one Storybook generates from the export
name. Removed; nothing users see changes.

Everything else was already compliant across all **76** story files (the lint surface is larger than
the test surface — `apps/the-open-movie-database` holds 35 stories that Storybook never indexes but
ESLint does lint).

### Known gap: `storybook/await-interactions` cannot fire here

The rule gates on the import source and recognises only `@storybook/testing-library`,
`@storybook/test` and `@storybook/jest`. Every story in this repo imports from **`storybook/test`**,
which is not on that list — so the rule is loaded, enabled at `error`, and structurally unable to
report anything. Its sibling `use-storybook-expect` *does* list `storybook/test`, so this is an
upstream inconsistency rather than a misconfiguration here.

Not worked around. Recorded so nobody counts un-awaited interactions as covered.

## The interaction suite

### It was never off

Baseline captured on this worktree after `pnpm install` + `pnpm turbo run build --force`
(`0 cached, 11 total`, 1m29s — a real build, not a cache replay):

```
Test Files  1 failed | 40 passed | 27 skipped (68)
     Tests  1 failed | 384 passed (385)
  Duration  117.65s
```

The spec's "component behaviour is effectively untested" was wrong: 385 tests across 41 story files
were running and 384 were passing. The duplicate-React / `dist`-bundling diagnosis was moot — that
was fixed in `11`, and the surviving failure had nothing to do with React instances, which is why
the dev-server contradiction the spec flagged never resolved.

### Root cause of the one failure

`packages/ui-core/src/components/Calendar/Calendar.stories.tsx > Basic`. `BasicExample` seeds
`useState<Date | undefined>(new Date())`, so **today is selected on mount**. The `play()` picks the
15th and asserts it is *not* already selected before clicking it.

On the 15th of any month, the target **is** today, and the precondition fails. It passed on the
other ~29 days. The baseline above was captured on 2026-08-15.

Two things had made this hard to see:

- The recorded diagnosis — *"clicks a selected day expecting it to deselect, and it stays
  selected"* — describes a toggle test the file does not contain.
- The stack trace says `Calendar.stories.tsx:233` in a **229-line** file. It points into Storybook's
  instrumented copy, not the source. The real assertion is at `:189`.

### Fix: freeze the clock, not the story

Patching `Calendar` alone would have left the trap armed for the next date-seeded story, and
hardcoding a fixed date into a docs story makes it render a stale month for anyone browsing
Storybook. Instead, `apps/storybook/.storybook/vitest.setup.ts` now freezes the clock for the whole
suite:

```ts
vi.useFakeTimers({ toFake: ['Date'] });
vi.setSystemTime(new Date(2026, 0, 10, 12, 0, 0));
```

`Date` only — blanket fake timers stall `userEvent`, which uses real timers for its inter-keystroke
delays, so faking them would destabilise 385 tests to stabilise one. Built from local-time
components so no timezone can shift the day.

`Calendar` keeps rendering "today", which is what the docs story is for.

Result, run on 2026-08-15 — the day that previously failed:

```
Test Files  41 passed | 27 skipped (68)
     Tests  385 passed (385)
  Duration  62.01s
```

Only three story files call `new Date()` at all (`Calendar` ×7, `RangeDatePicker` ×3,
`SingleDatePicker` ×4), and the two date pickers only use it as `new Date().getFullYear()` for
year-dropdown ranges. So the change fixes one live failure and is preventative for the rest.

**Not covered, deliberately:** the Storybook dev server and Chromatic still run on a live clock,
since neither loads `vitest.setup.ts`. Moving the freeze into `preview.ts` would cover them but
would show a frozen date to anyone browsing Storybook. That is a separate call.

### The suite could not be run from the root

`apps/storybook` and `apps/the-open-movie-database` both had `"test": "vitest"` — **watch mode** —
while `turbo.json`'s `test` task is neither `persistent` nor `cache: false`. Root `pnpm test` is an
unfiltered `turbo run test`, so it hung on two watchers under a task that does not expect them.

Both now match the five library packages: `"test": "vitest run"` plus `"test:watch": "vitest"`.

This matters for reading the older records: `docs/12-build-dependency-tooling/plan.md` notes
`pnpm test: all green`, which cannot have been a completed full run.

## Acceptance criteria

| Criterion | Outcome |
| --- | --- |
| Current state of both established empirically, replacing the stale diagnoses | ✅ Both recorded diagnoses were wrong. Measurements above; corrections listed below |
| `eslint-plugin-storybook` loaded and its rules run — or blocker linked | ✅ Loaded and running. Not blocked upstream, so that branch did not apply |
| A deliberately introduced lint error is still caught | ✅ Two, both `error`, `exit=1`, reverted and re-verified clean |
| Suite runs, result explained | ✅ Green: 385 passed / 27 skipped / 0 failed. The former failure is root-caused and fixed |
| The stale "version alignment unblocks it" claim corrected wherever it appears | ✅ See below |

## Corrections made

| File | Was | Now |
| --- | --- | --- |
| `packages/eslint-config/react.js` | A `NOTE:` saying to re-add "once … on a version without the require(esm) cycle" | Comment deleted with the plugin's re-enablement; replaced by the ordering constraint and the real Node condition |
| `packages/eslint-config/README.md` | Claimed the Storybook plugin was part of the react config while it was not loaded | True now, plus the ordering constraint |
| `.claude/skills/local-development/SKILL.md` | `only-warn` downgrades everything; suite has one pre-existing failure; wrong Calendar diagnosis; stale 27/311 figure | All corrected; added the `pnpm prettier` trap below |
| `docs/README.md` | `15` listed as outstanding | Moved to Shipped |

Left alone on purpose: `docs/06-repo-health/plan.md`, `docs/07-test-harness/plan.md` and
`docs/11-correctness-bugs/plan.md` are as-built records that were accurate when written, and
`spec.md` describes the world as it was. Rewriting them would make them less accurate, not more.

## Found, not adopted

- **The CI Prettier job cannot fail.** `.github/workflows/linting-action.yml` runs `pnpm prettier`,
  which is `turbo run prettier` → `prettier --write ./src`. Formatting on write is the intent and is
  fine; the consequence is that the CI step rewrites its own checkout and exits 0 unconditionally, so
  it reports "formatted" rather than checking anything. **22 files in the repo are currently not
  prettier-clean** (`npx prettier --check`). Either run `--write` and commit the result, or switch
  the CI step to `--check` — today it does neither.
- **The interaction suite is deliberately out of CI**, not overlooked: running Playwright/Chromium on
  every push costs money, and the components are not stable enough yet to be worth it. Revisit when
  they are. Until then the suite is trustworthy but locally-run, which is a decision rather than a
  gap.
- **`storybook/await-interactions` is inert here** (see above).
- **`apps/the-open-movie-database`'s 35 stories are linted but never interaction-tested** —
  `main.ts` globs `packages/*/src` only, and the app has no `@storybook/addon-vitest`.
- **`packages/eslint-config/react.js:10-11`** still imports `projectStructureParser`,
  `projectStructurePlugin` and `folderStructureConfig` for the disabled folder-structure block. That
  block is [`13-exports-conventions`](../13-exports-conventions/spec.md)'s work, and this
  deliverable's precedent for requirement 2 — left untouched.
