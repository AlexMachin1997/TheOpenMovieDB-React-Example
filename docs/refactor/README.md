# Component Library Refactor — Roadmap

This folder breaks the component-library review findings into **small, independently
mergeable deliverables**. Each one is sized for a single focused session, has its own
spec file, and can ship on its own without waiting for the others.

Source of truth for the findings is the code review that produced this plan. Each spec
links back to the exact `file:line` it addresses so you never have to re-derive context.

## How to use this

- Pick the next `todo` deliverable, open its spec, work only what's in **Scope**.
- Every deliverable has **Acceptance criteria** — treat them as the definition of done.
- **Open decisions** are called out where a deliverable needs a choice from you before it
  can be fully specced. Nothing in Phase 1 is blocked on one.
- Update the **Status** column below as things move (`todo` → `in progress` → `done`).

## Decisions made

- **Package structure: keep the UI packages separate — no merge.** `ui-core`, `ui-forms`,
  and `ui-overlays` stay as independent domain packages so they can be extended or extracted
  later. `ui-command` also stays its own package (an internal primitive `Selects` builds on).
  Consequence: instead of consolidating, we reduce the per-package tax (shared versions via a
  pnpm `catalog:`, deduped devDeps, fixing undeclared deps) — see **P0** and **D5**.

## Sequencing at a glance

```
Phase 0  Repo health & guardrails   P0                    (unblocks everything)
Phase 1  Foundation & correctness   D0 → D1, D2, D3, D4   (D1–D4 depend on D0)
Phase 2  Tooling & build            D5                    (independent)
Phase 3  Consistency                D6 → D7
Phase 4  Structural simplification  D8, D9                (D8 depends on D0/D1)
Phase 5  Forms feature layer        D10                   (largest; design-heavy)
```

`P0` comes first because the repo currently doesn't build (`tsc` is undeclared in the UI
packages) and lint isn't enforced, so no test or type gate can run until it's fixed.
`D0` (test harness) is then the keystone: it lets every bug fix and logic extraction ship
with a regression test, which is the whole point of splitting the work this way.

## Deliverables

| ID  | Deliverable                        | Phase | Size | Depends on | Status  | Spec                                             |
| --- | ---------------------------------- | ----- | ---- | ---------- | ------- | ------------------------------------------------ |
| P0  | Repo health & guardrails           | 0     | M    | —          | ✅ done | [00-repo-health.md](00-repo-health.md)           |
| D0  | Vitest test harness                | 1     | S    | P0         | ✅ done | [01-test-harness.md](01-test-harness.md)         |
| D1  | Consolidate & test grouping logic  | 1     | S    | D0         | ✅ done | [02-grouping-logic.md](02-grouping-logic.md)     |
| D2  | Test & fix date formatting         | 1     | S    | D0         | ✅ done | [03-date-logic.md](03-date-logic.md)             |
| D3  | Extract `useDebouncedValue` hook   | 1     | M    | D0         | ✅ done | [04-debounce-hook.md](04-debounce-hook.md)       |
| D4  | Correctness bug fixes              | 1     | M    | D0         | todo    | [05-correctness-bugs.md](05-correctness-bugs.md) |
| D5  | Build & tooling config fixes       | 2     | S    | —          | todo    | _scoped below_                                   |
| D6  | Exports & barrel conventions       | 3     | M    | —          | todo    | _scoped below_                                   |
| D7  | Conventions doc + lint enforcement | 3     | S    | D6         | todo    | _scoped below_                                   |
| D8  | Selects simplification             | 4     | M    | D0, D1     | todo    | _scoped below_                                   |
| D9  | Dialog/Sheet consolidation         | 4     | M    | —          | todo    | _scoped below_                                   |
| D10 | Forms integration layer            | 5     | L    | D6         | todo    | _scoped below_                                   |

Size key: **S** ≈ under an hour, **M** ≈ half a session, **L** ≈ needs its own planning pass.

---

## Phase 2–5 scope (expand into full specs when picked up)

### D5 — Build & tooling config fixes (S, independent)

Mechanical, high-value, no API impact.

- Fix the Vite externalization bug: `pkgDependencies` is computed and logged
  ("Auto-externalizing N…") but the `external` predicate never uses it, so React/Radix/
  date-fns get bundled into every package. [`react-library.ts:38-45,72`](../../packages/vite-config/react-library.ts)
- Move `@vitejs/plugin-react-swc`, `@tailwindcss/vite`, `vite-plugin-dts` into
  `vite-config`'s `dependencies`; delete them from every UI package's devDeps.
- Remove the redundant `externals: ['@repo/…']` from
  [`ui-forms/vite.config.ts:4`](../../packages/ui-forms/vite.config.ts) (`@repo/*` is already externalized).
- Delete broken `./next` / `./react-internal` exports from `eslint-config` (+ README).
- Fix root `type-check` script (`turbo run ts-validate` → no package defines `ts-validate`).
- Single-source `typescript` / `vitest` / `tsup` versions via a pnpm `catalog:`.
- **Open decision:** provide or delete the ambient global `isTruthy`
  ([`global.d.ts:47`](../../packages/typescript-config/types/global.d.ts)).

### D6 — Exports & barrel conventions (M)

The library's value is consistency; this makes exports uniform.

- Pick one barrel strategy and apply everywhere (dead per-component `index.ts` barrels vs.
  root importing straight from impl files — currently both exist).
- Export **types** from every package root (currently `IButton`/`ISearch`/etc. are
  unreachable — only the orphaned barrels re-export them).
- Delete byte-identical dead barrels (`ui-command/Command.tsx` == `index.ts`; the two
  Accordion barrels; the `Component.tsx == index.ts` duplicates in overlays).
- Naming: `Button/variants.ts` → `Button.variants.ts`; add missing `Search/index.ts`;
  flatten Accordion's nested `components/` folder.
- Add `displayName` to all ~40 components (currently ~5 have it).
- Export `CheckboxGroup` from `ui-forms` root; reconcile `RangeDatePicker` folder vs
  `DateRangePicker` export name.
- **Open decision:** aggregate-through-folder-barrels **or** delete-barrels-export-from-root
  (recommend the latter — fewer files, single source).

### D7 — Conventions doc + lint enforcement (S, after D6)

- Write `docs/CONVENTIONS.md` (file layout, barrel rule, variants naming, `displayName`,
  one control-value contract).
- Extend the existing custom rule
  [`folderStructure.mjs`](../../packages/eslint-config/folderStructure.mjs) to enforce it.

### D8 — Selects simplification (M, after D0/D1)

- Delete the ~5 pure pass-through wrappers (`SelectGroup`, `SelectSeparator`,
  `SelectListItemsVirtualized`, `SelectGroupedListItems`, `SelectGroupedItemsVirtualized`)
  in favour of alias re-exports from `@repo/ui-command`.
- Fix nested scroll containers: `SelectListItems` renders a second `CommandList` inside
  `CommandInterface`'s existing one.
  [`SelectListItems.tsx:11`](../../packages/ui-forms/src/components/Selects/components/SelectListItems.tsx) / [`CommandList.tsx:10`](../../packages/ui-command/src/components/Command/components/CommandList.tsx)
- Memoize `SelectProvider`'s context value (fresh `Set` every render today).
  [`SelectProvider.tsx:64-70`](../../packages/ui-forms/src/components/Selects/components/SelectProvider.tsx)
- Delete dead types (`IBaseSelectProviderProps`, etc.).
- **Open decision:** collapse the two overlapping contexts (`CommandProvider` +
  `SelectProvider`) into one `selection` slice, or keep them layered.

### D9 — Dialog/Sheet consolidation (M)

- Make Sheet a `side`-driven variant of a shared Dialog base — ~60-70% of the two trees
  is copy-paste (3 files byte-identical, 4 differ by one class). Deletes ~15 files.
- Standardize on single-file-per-overlay (follow `DropdownMenu`); delete duplicate
  `Component.tsx`/`index.ts` barrels.
- Fix the Sheet controlled-mode imperative-ref no-op.
  [`SheetProvider.tsx:9-24`](../../packages/ui-overlays/src/components/Sheet/components/SheetProvider.tsx)
- Unify the close-button API (Dialog is configurable, Sheet hardcodes it); rename the
  misnamed "Provider" files that contain no provider; add `displayName`; guard the
  required a11y `Title`.
- **Open decision:** how far to push the shared base (shared primitives vs Sheet
  re-exporting Dialog's parts).

### D10 — Forms integration layer (L, design-heavy, after D6)

- Decide one control-value contract across all form controls (today each invents its own).
- Build `Field` adapters over `@tanstack/react-form` with error / `aria-invalid` wiring;
  put `zod` (already a dep) to use.
- Add a `RadioGroup` to match `CheckboxGroup`.
- This one needs its own planning pass before implementation.

---

## Follow-ups discovered during P0

Small, tracked deliverables that came out of getting the pipeline green. None block D0.

| ID  | Deliverable                         | Size | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | ----------------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1  | Type-hygiene cleanup                | S    | Fix the ~39 `no-empty-object-type` / `no-explicit-any` violations the now-working linter surfaced, then restore both rules from `warn` back to `error` in `packages/eslint-config/base.js`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| F2  | Re-enable Storybook ESLint          | S    | `eslint-plugin-storybook` was removed (Storybook-10/Node-22 `require(esm)` crash). Re-add once `storybook` + `eslint-plugin-storybook` are on a compatible version. Ties into F3.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| F3  | Align Storybook versions            | S    | `@storybook/test`/`@storybook/instrumenter` are `8.6.15` vs `storybook@10.2.16` (peer warning). Unify on 10.x (also unblocks F2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| F4  | Restore folder-structure lint       | S    | The `eslint-plugin-project-structure` rule was disabled (its parser clobbered the TS parser for all files). Re-add in an ISOLATED config/run so it can't disable code linting. Pairs with D7.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| F5  | `check-types` build ordering        | XS   | Add `dependsOn: ["^build"]` to the `check-types` task in `turbo.json` so standalone `pnpm check-types` resolves internal `@repo/*` `.d.ts` without a prior build.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| F6  | Unblock Storybook interaction tests | S    | `apps/storybook` already runs `play()` tests via `@storybook/addon-vitest` + Playwright, but `pnpm test` there is **red**: the library `dist` bundles its own React (the **D5** externalization bug), so browser stories hit duplicate-React "hooks are null" errors. Fixing **D5** (externalize `react`/`react-dom`/Radix) should turn these green. Also **depends on F3** (align `@storybook/test` `8.6.15` → `10.x`) and pairs with F2. This is where component-behaviour coverage lives — the D0 node harness deliberately doesn't duplicate it. **Found during D3:** the identical "Invalid hook call" / duplicate-React crash also happens live in the Storybook **dev server** for every `UI Command/Command` story (crashes inside `<Popover>` on mount) — confirmed pre-existing via `git stash` (reproduces on unmodified `main`, unrelated to D3). Notable because dev-server stories load package `src` directly, not `dist` — so the dist-bundling theory alone may not fully explain it; worth re-checking root cause when picking this up. |

Also note: **D3 now also owns the `CommandSearch` stale-effect fix** — it's currently suppressed with a scoped `eslint-disable` + a pointer to D3, since the real fix is the `useDebouncedValue` extraction.

## Open decisions log

Tracked here so they don't get lost; none block Phase 1.

1. **Barrel strategy** (D6) — recommend delete-barrels, export-from-root.
2. **Single vs multi-file components** (D6/D9) — recommend single-file for thin wrappers.
3. **Selects: merge or layer the two contexts** (D8).
4. **Dialog/Sheet: depth of shared base** (D9).
5. **Forms: the control-value contract** (D10) — the biggest design call.
