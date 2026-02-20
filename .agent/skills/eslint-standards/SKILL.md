---
name: ESLint Standards
description: Centralized guide for ESLint v9 (Flat Config) setup, migration, and strict monorepo path resolution.
---

# ESLint Configuration Standards

This repository uses ESLint v9 with the modern Flat Config (`eslint.config.js`).

## 1. Centralized Configuration

Configs are hosted in `@repo/eslint-config`.

### Base Config (`base.js`)

Contains Javascript rules, Typescript (`typescript-eslint`), and global ignores (`dist/**`, `node_modules/**`).

### React Config (`react.js`)

Extends `base.js` and includes React and Import plugins.
**CRITICAL:** It configures the `eslint-import-resolver-typescript` to properly resolve `~/*` path aliases.

**Required Dependencies in config package:**

- `eslint`, `globals`, `@eslint/js`, `typescript-eslint`
- `eslint-plugin-react`, `eslint-plugin-react-hooks`
- `eslint-plugin-import`, `eslint-import-resolver-typescript`

**packages/eslint-config/react.js Example:**

```javascript
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
// ... import base config

export const config = [
	// ... base configs
	pluginReact.configs.flat.recommended,
	{
		plugins: { import: importPlugin },
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json']
				}
			}
		}
	}
];
```

## 2. Monorepo Path Resolution (The Factory Pattern)

In a monorepo, resolving path aliases (like `~/components/Button`) can break depending on where the `eslint` command is executed (from the root vs. the package folder) because the import resolver needs to find the correct `tsconfig.json`.

### The Solution

The shared config package exports a `createConfig` utility that locks the configuration to the consumer package's specific directory.

**packages/eslint-config/utils.js**

```javascript
export function createConfig(packageDir, ...baseConfigs) {
	return [
		...baseConfigs.flat(),
		{
			settings: {
				'import/resolver': {
					typescript: {
						alwaysTryTypes: true,
						project: './tsconfig.json',
						tsconfigRootDir: packageDir // Locks resolution to the package
					}
				}
			}
		}
	];
}
```

### Consumer Setup

Every package must have its own `eslint.config.js` utilizing the factory:

```javascript
import { config } from '@repo/eslint-config/react';
import { createConfig } from '@repo/eslint-config/utils';

export default createConfig(import.meta.dirname, config);
```

## 3. Flat Config Migration Rules

When migrating or adding new packages:

- Delete all legacy `.eslintrc`, `.eslintrc.js`, and `.eslintignore` files.
- Configuration ignores must be contained in the `ignores` array of the flat config.
- Do NOT use `process.cwd()` for path resolution inside the shared config; always rely on `import.meta.dirname` injection via the factory pattern.

If you encounter `import/extensions` linting errors for aliased paths, it usually means the import resolver is misconfigured, not that file extensions should be added.
