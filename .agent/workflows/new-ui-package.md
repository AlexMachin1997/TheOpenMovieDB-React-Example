---
description: How to scaffold a new standard React UI package in the monorepo.
---

# Create a New UI Package

Follow these steps to create a new UI package (e.g., `@repo/ui-charts`) that correctly wires up our strict standards.

1. **Scaffold the directory and `package.json`**

   ```bash
   mkdir -p packages/ui-charts/src
   cd packages/ui-charts
   pnpm init
   ```

   Add exactly these `devDependencies` to inherit our system:

   ```json
   "devDependencies": {
     "@repo/eslint-config": "workspace:*",
     "@repo/tailwind-config": "workspace:*",
     "@repo/typescript-config": "workspace:*",
     "@tailwindcss/vite": "^4.0.0",
     "tailwindcss": "^4.0.0",
     "typescript": "^5.0.0"
   }
   ```

   _Note: Only depend on other UI packages (e.g. `ui-core`) in `dependencies` if required. Do not create cyclic dependencies in `devDependencies`._

2. **Configure TypeScript (`tsconfig.json`)**
   Create a `tsconfig.json` at the package root to inherit the React setup and explicitly outline `rootDir` to avoid module resolution Ambiguous Root errors:

   ```json
   {
   	"extends": "@repo/typescript-config/react.json",
   	"compilerOptions": {
   		"rootDir": "./src",
   		"baseUrl": ".",
   		"paths": {
   			"~/*": ["./src/*"]
   		},
   		"declaration": true,
   		"outDir": "dist"
   	},
   	"include": ["src"],
   	"exclude": ["dist", "node_modules"]
   }
   ```

3. **Configure ESLint (`eslint.config.js`)**
   Create the flat config factory file at the package root:

   ```javascript
   import { config } from '@repo/eslint-config/react';
   import { createConfig } from '@repo/eslint-config/utils';

   export default createConfig(import.meta.dirname, config);
   ```

4. **Wire up Tailwind CSS**
   To ensure Tailwind scans your new package, open `packages/tailwind-config/src/globals.css` and add your package to the top-level sources:

   ```css
   @source "../../ui-charts/src"; // <-- Add this
   ```

   Then trigger a build inside the config to re-export the `dist`:
   // turbo

   ```bash
   cd packages/tailwind-config && pnpm run build
   ```

5. **Restart Tooling**
   Restart your IDE's ESLint/TypeScript servers, and restart the Storybook development server so the new path map `@repo/ui-charts` is registered across the workspace.
