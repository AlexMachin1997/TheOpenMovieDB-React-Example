---
name: Tailwind CSS Monorepo Setup
description: Best practices for setting up Tailwind CSS v4 in a TypeScript monorepo with shared configuration and Storybook integration.
---

# Tailwind CSS Monorepo Setup Guide

This skill documents the standard approach for configuring Tailwind CSS v4 in a monorepo environment, ensuring consistent styling across multiple UI packages and applications (like Storybook).

## 1. Shared Configuration Package (`@repo/tailwind-config`)

Create a dedicated package to export your shared CSS, theme, and utility functions.

### File Structure

```
packages/tailwind-config/
├── package.json
├── tsconfig.json
└── src/
    ├── globals.css  # Shared Tailwind theme & styles
    ├── utils.ts     # Class merging utility (cn)
    └── index.ts     # Exports
```

### `package.json`

Crucially, you must build this package so `dist` files exist for consumers. Use `tsup` for bundling.

```json
{
	"name": "@repo/tailwind-config",
	"version": "0.0.0",
	"private": true,
	"exports": {
		".": {
			"types": "./dist/index.d.ts",
			"import": "./dist/index.js"
		},
		"./globals.css": "./src/globals.css"
	},
	"scripts": {
		"build": "tsup src/index.ts --format esm,cjs --dts",
		"dev": "tsup src/index.ts --format esm,cjs --dts --watch"
	},
	"dependencies": {
		"clsx": "^2.1.1",
		"tailwind-merge": "^2.3.0"
	},
	"devDependencies": {
		"tsup": "^8.0.2",
		"typescript": "^5.0.0"
	}
}
```

### `src/globals.css` (Tailwind v4)

Use `@source` directives to tell Tailwind where to look for class names in your monorepo.

```css
@import 'tailwindcss';

/* Point to your UI packages so Tailwind scans them */
@source "../../ui-core/src";
@source "../../ui-command/src";
@source "../../ui-overlays/src";
@source "../../ui-forms/src";

@theme inline {
	--color-primary: var(--primary);
	/* ... your theme variables ... */
}

/* ... custom utilities and base styles ... */
```

### `src/utils.ts`

Export a standard `cn` utility for merging classes.

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
```

## 2. Consuming in UI Packages

Each UI package should import the shared configuration.

### `package.json`

```json
"devDependencies": {
  "@repo/tailwind-config": "workspace:*",
  "@tailwindcss/vite": "^4.0.0",
  "tailwindcss": "^4.0.0",
  "vite": "^6.0.0"
}
```

### `src/styles.css`

Create a local CSS file that imports the shared globals.

```css
@import '@repo/tailwind-config/globals.css';
@import 'tailwindcss';
```

### `vite.config.ts`

Include the Tailwind Vite plugin.

```ts
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss()
		// ... other plugins
	]
});
```

## 3. Storybook Integration

Ensure Storybook can process Tailwind styles and resolve the shared config.

### `apps/storybook/package.json`

```json
"devDependencies": {
  "@repo/tailwind-config": "workspace:*",
  "@tailwindcss/vite": "^4.0.0",
  "vite": "^6.0.0"
}
```

### `.storybook/main.ts`

Add the `@tailwindcss/vite` plugin to the Vite configuration within Storybook.

```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	// ...
	viteFinal: async (config) => {
		const { mergeConfig } = await import('vite');
		const tailwindcss = (await import('@tailwindcss/vite')).default;

		return mergeConfig(config, {
			plugins: [tailwindcss()]
		});
	}
};
export default config;
```

### `.storybook/preview.ts`

Import the shared CSS to apply global styles to all stories.

```ts
import '@repo/tailwind-config/globals.css';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
	// ...
};
export default preview;
```

## Troubleshooting

- **"Failed to resolve entry"**: Ensure you have run `pnpm build` in `@repo/tailwind-config` to generate the `dist` folder.
- **Styles not applying**: Verify `@source` directives in `globals.css` point to the correct relative paths of your packages.
- **Restart Server**: Always restart the Vite/Storybook server after modifying `globals.css` `@source` paths.
