# Session handover — component-library refactor (P0)

_Date: 2026-07-31 · Branch: `claude/component-library-refactor-review-2867ff` → merged into `component-library-with-shadcn`_

## ⚡ The one action you need to take

**Update your _system_ Node install to 24**, then re-verify the build:

```bash
winget install OpenJS.NodeJS.LTS   # or the Node 24 installer from nodejs.org
# new terminal:
node --version                      # expect v24.x
pnpm install && pnpm build          # expect green
```

Why: turbo spawns each package build through the pnpm in `C:\Program Files\nodejs\`, which is
bound to your **system** Node (22.17.0). fnm can't override that for subprocesses. Node 22 has
an ESM-resolver bug that breaks Vite config loading (`#module-sync-enabled`); Node 24 fixes it
— verified by building `@repo/core` directly under 24.18.1.

## What this session did

1. **Full code review** of `packages/*` (5 parallel agents) → findings on simplification,
   maintainability, testability, and bugs.
2. **Built the refactor roadmap** in `docs/refactor/` — 11 deliverables (P0, D0–D10) across 5
   phases, each with its own spec, plus follow-ups F1–F5.
3. **Executed P0 (repo health)** — the repo didn't build and lint was silently doing nothing.

## Current state

| Area | State |
|------|-------|
| ESLint pipeline | ✅ Working & enforcing (was dead 3 ways). `pnpm lint` = 0 errors (39 nits downgraded to `warn`). |
| Pre-commit hook | ✅ Now blocks on lint failure (`&` → `&&`). |
| `tsc` / type-check | ✅ Runs (was `'tsc' not recognized`). |
| Version management | ✅ pnpm `catalog:` for `typescript` + `vite`; pnpm bumped to 9.15.9. |
| Node version | ✅ Pinned to 24 (`.node-version`, `engines`, CI). ⏳ needs your local system-Node update. |
| `pnpm build` | ⏳ Green under Node 24 — blocked only on the local Node update above. |
| The `CommandSearch` bug that started this | ✅ Fixed (conditional hook moved below hooks). |

## Root causes found & fixed in P0

- ESLint crashed at config load via `eslint-plugin-storybook` (Storybook 10 + Node 22).
- `eslint-plugin-project-structure` overrode the TS parser for **all** source files, so every
  code rule ran against an empty AST and passed silently. (This is why the hook bug slipped.)
- Pre-commit `&` backgrounded lint and discarded its exit code.
- `typescript` undeclared in the packages that run `tsc`.
- Vite `#module-sync-enabled` = Node 22 bug → Node 24.

Details: [00-repo-health.md](00-repo-health.md).

## Next up

- **D0** — stand up the Vitest harness (first real deliverable). See [01-test-harness.md](01-test-harness.md).
- Then **D1–D4** (grouping/date/debounce logic + the remaining correctness bugs).
- **Follow-ups F1–F5** (type-hygiene cleanup, re-enable Storybook + folder-structure lint,
  Storybook version align, turbo `check-types` ordering) — see the roadmap README.

## Decisions locked in

- UI packages stay **separate** (`ui-core`/`ui-forms`/`ui-overlays`/`ui-command`) for future
  extraction — no merge.
- Node floor is **24** (Node 22 can't build the library).

Full roadmap: [README.md](README.md).
