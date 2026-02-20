---
description: Update all Storybook dependencies across the monorepo
---

This workflow automates updating all Storybook dependencies across all packages (e.g., `apps/storybook`, `ui-core`, `ui-forms`, `ui-command`, `ui-overlays`, etc.) without needing to hardcode their individual paths.

// turbo-all

1. Recursively update any dependency containing "storybook" in its name across the entire monorepo

```cmd
pnpm up "*storybook*" "@storybook/*" "storybook" --latest -r
```

2. Re-install all dependencies to stabilize the lockfile and fix any hoisted mismatched versions

```cmd
pnpm install
```

> [!TIP]
> This workflow relies on `pnpm up -r`. It's the most scalable method because it dynamically targets any package using Storybook, so you don't need to manually update this workflow every time you create a new UI package.

> [!NOTE]
> For **major** Storybook version jumps (e.g., v8 -> v9 or v9 -> v10), you might also need to run configuration codemods. In those rare scenarios, you would temporarily use `pushd apps\storybook & pnpm dlx storybook@latest upgrade & popd` for each specific package. For day-to-day updates, this workflow is all you need.
