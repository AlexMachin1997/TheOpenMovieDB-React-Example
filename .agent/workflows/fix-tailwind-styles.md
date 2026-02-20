---
description: What to do when styles aren't appearing in Storybook or the UI due to the new Tailwind v4 `@source` directives.
---

# Fix Missing Tailwind Styles

In our monorepo architecture, Tailwind v4 relies on `@repo/tailwind-config` to generate utilities. If you are developing a UI component and noticing your classes (e.g. `bg-red-500`) aren't applying correctly, follow these steps:

1. **Verify the `@source` Directive in the Consumer App**
   Tailwind only scans directories it is told to scan. In our updated configuration, these directives live inside the specific application consuming the packages (e.g., `apps/storybook/.storybook/tailwind.css`), _not_ inside the shared config.

   Verify that your package's `src` folder is listed as a source inside the consumer app:

   ```css
   @import '@repo/tailwind-config/globals.css';

   @source "../../../packages/ui-core/src";
   @source "../../../packages/ui-forms/src";
   @source "../../../packages/ui-overlays/src";
   /* Ensure your new package is here! */
   /* @source "../../../packages/ui-[new_package]/src"; */
   ```

2. **Re-build the Configuration Package**
   Because we use a pre-compiled configuration strategy to avoid `ERR_UNKNOWN_FILE_EXTENSION` locally, the change in `src/globals.css` won't propagate outwards until the `tailwind-config` package is rebuilt.

   // turbo

   ```bash
   pnpm run build --filter @repo/tailwind-config
   ```

3. **Restart the Dev Server**
   Vite/Storybook caches the CSS output aggressively. Even after generating the new `dist/` configuration, your running Vite process might not immediately pick it up.
   - Kill your running Storybook or internal application process (Ctrl+C).
   - Start it back up to flush the cache.

   ```bash
   pnpm run dev
   ```

4. **Verify Internal Class Utility Imports**
   Are the styles failing on dynamic variants (via Class Variance Authority)? Ensure that your `cn()` helper function is imported from `@repo/tailwind-config`. If it is imported from the wrong location, or from the package's own index, it will fail silently or throw module resolution errors.

   ```tsx
   /* ❌ Incorrect */
   import { cn } from '@repo/ui-core';

   /* ✅ Correct */
   import { cn } from '@repo/tailwind-config';
   ```
