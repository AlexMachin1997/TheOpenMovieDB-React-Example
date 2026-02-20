---
description: How to identify and fix infinite hanging scripts caused by cyclic dependencies.
---

# Diagnose Dependency Cycles

If your scripts (`pnpm run validate`, `pnpm run build`, Storybook starts) are suddenly hanging indefinitely without logging errors, or crashing with an `Exit Code 2: ELIFECYCLE` loop, you have created a cyclic dependency.

## Steps to Fix

1. **Check the Failing Script Target**
   Run the command with Turborepo's dry run or higher verbosity to see where it gets stuck:

   ```bash
   pnpm dlx turbo run build --v
   ```

   _Look for packages stuck in "WAITING" indefinitely._

2. **Verify `devDependencies` in `package.json`**
   The #1 cause for a cycle is a lower-level UI package trying to test itself using a higher-level UI package. Look at the package that won't build (e.g., `ui-overlays`) and open its `package.json`.

   _Did you recently add something like `@repo/ui-forms` into its `devDependencies`?_
   If `ui-forms` relies on `ui-overlays`, you've created a cycle.

3. **Break the Cycle**
   - **Scenario A:** If a storybook file in `ui-overlays` needs a `<Form>` to display an example, _remove the `<Form>`_. Lower-level components must be demonstrable using only lower-level primitives.
   - **Scenario B:** Remove the sibling dependency from `devDependencies` entirely.

   // turbo

   ```bash
   pnpm rm @repo/ui-forms --filter @repo/ui-overlays
   ```

4. **Verify The Build Fix**
   Run the build again from the workspace root to ensure the cycle is broken.
   // turbo
   ```bash
   pnpm run build
   ```
