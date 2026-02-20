---
name: Monorepo Standards
description: Centralized best practices for monorepo configuration, dependency cycles, internal imports, and styling setup.
---

# Monorepo Engineering Standards

This document consolidates all core standards for developing packages within this Turborepo workspace.

## 1. Avoid Dependency Cycles

Dependency cycles (e.g., `ui-overlays` -> `ui-command` -> `ui-forms` -> `ui-overlays`) cause blocked builds and hanging scripts.

**Resolution Strategies:**

- **Extract Shared Logic:** Move shared logic or tools into an independent foundation package (e.g., `@repo/core` or `@repo/tailwind-config`) rather than creating sibling dependencies.
- **Remove Unnecessary DevDependencies:** Be cautious of adding sibling packages into `devDependencies` for Storybook or testing if it creates a cycle.
- **Strict Hierarchy:** Enforce a one-way dependency flow: `core` -> `ui-core` -> `ui-overlays` -> `ui-forms`.

## 2. Internal Imports & Shared Utilities

When developing within a package, maintain strict import rules.

### ❌ The Self-Referencing Anti-Pattern

**DO NOT** import from the package's own public export package name within its internal files.
`import { cn } from '@repo/ui-core';` inside `@repo/ui-core` throws missing export errors during build.

**✅ Correct:** Use relative/alias paths `import { cn } from '~/utils/cn';`

### Centralizing Shared Utilities

Instead of duplicating utilities like `cn` across siblings (`ui-core`, `ui-forms`), extract them to `@repo/tailwind-config` or `@repo/core` and consume the centralized package.

## 3. Shared Configuration Strategy (Pre-Compilation)

When sharing config packages (Vite, Tailwind), do not consume raw TypeScript files. Compile them to JS/Type definitions in the config package first.

### Config Package Setup (`@repo/vite-config`)

1. Create a `build` script: `"build": "tsc"`
2. Add `tsconfig.json` with `"outDir": "dist"`, `"declaration": true`.
3. Export from `package.json` pointing to the `dist` files.

This prevents `ERR_UNKNOWN_FILE_EXTENSION` and removes the need for `tsx` runners in consumer packages.

## 4. Tailwind CSS v4 Monorepo Setup

Tailwind is configured via a shared `@repo/tailwind-config` package.

### Configuration Package (`@repo/tailwind-config`)

Ensure `src/globals.css` only contains global variables and rules. **Do not put specific `@source` tags for UI packages in the shared library.**

```css
@import 'tailwindcss';
@import 'tw-animate-css';
/* variables ... */
```

Also export your shared `cn` (clsx + tailwind-merge) utility from this package. Build the package using `tsup`.

**package.json Example:**

```json
{
	"exports": {
		".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
		"./globals.css": "./src/globals.css"
	},
	"scripts": { "build": "tsup src/index.ts --format esm,cjs --dts" }
}
```

### Consumers (UI Packages & Storybook)

In consumer packages (like Next.js or Storybook apps), import the global CSS and then explicitly register the UI packages as `@source` targets:

```css
/* apps/storybook/.storybook/tailwind.css */
@import '@repo/tailwind-config/globals.css';

@source "../../../packages/ui-core/src";
@source "../../../packages/ui-command/src";
@source "../../../packages/ui-overlays/src";
@source "../../../packages/ui-forms/src";
```

In `vite.config.ts`, apply the `@tailwindcss/vite` plugin.
For **Storybook** (`.storybook/main.ts`), inject the Vite plugin in `viteFinal`:

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	viteFinal: async (config) => {
		const { mergeConfig } = await import('vite');
		const tailwindcss = (await import('@tailwindcss/vite')).default;
		return mergeConfig(config, { plugins: [tailwindcss()] });
	}
};
export default config;
```
