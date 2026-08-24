# How the build resolves things (this repo)

Read this when a change to one package does not show up in another, when something unexpected lands
in `dist/`, or before touching `turbo.json` or `vite-config`. Setup and the gates are in
[`SKILL.md`](SKILL.md).

## Packages resolve through `dist/`, not source

`ui-core` → `ui-overlays` → `ui-command` → `ui-forms` import each other by `@repo/*` specifier,
which resolves to **built output**. The `~/` alias resolves to source, but only within a package's
own tsconfig.

So after editing a package that another package consumes, the change is invisible until:

```bash
pnpm turbo run build --filter=@repo/<pkg>
rm -rf apps/storybook/node_modules/.cache apps/storybook/node_modules/.vite
```

Skipping this gives both false greens and false reds. It is the most common reason a fix "does not
work" when it plainly should.

## `check-types` depends on `^build`, and that is load-bearing

`turbo.json` gives `check-types` `dependsOn: ["^build"]`, not `^check-types`. Packages resolve each
other through built `dist/*.d.ts`, and `tsc --noEmit` emits nothing, so `^check-types` left every
`@repo/*` import unresolvable from a clean tree — around 100 `TS2307`s. Do not "optimise" it back.

## Dependencies are external, and `package.json` is what decides

`packages/vite-config/shared.ts` reads the building package's own `dependencies` +
`peerDependencies` and externalizes every one, on top of React and `@repo/*`. A package's `dist/`
therefore contains that package's source and nothing else — no `dist/node_modules/` tree.

Two consequences:

- **Declaring a dependency is how you externalize it.** There is no allow-list to update. A package
  that imports something it does not declare will have it silently inlined instead, so a sudden
  `dist/node_modules/` directory means a missing `package.json` entry.
- **The two presets take `bundle: []` for the rare dependency that must be inlined.** It cannot
  override React or `@repo/*` — those are external for correctness, not for output size. Two React
  copies in one tree crash with `Cannot read properties of null (reading 'useState')`.

Build plugins (`@vitejs/plugin-react-swc`, `@tailwindcss/vite`, `vite-plugin-dts`) are declared by
`vite-config` alone. Do not re-add them to a UI package; nothing there imports them.

## More than one React can be installed

The root `pnpm.overrides` entry for React is a _range_, so a newer minor satisfies it and the tree is
not collapsed to a single copy. Note that the same block pins `@types/react` exactly, which makes
the range look unintentional.

Nothing breaks today: the packages externalize React and Storybook's Vite config dedupes it at the
consuming end. But the protection is bundler config, not declaration. **If a `useState`-of-null
crash ever reappears, check what is actually installed before assuming the build config regressed:**

```bash
ls node_modules/.pnpm | grep '^react@'
```
