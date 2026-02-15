---
name: Monorepo ESLint Configuration (Flat Config)
description: Best practices for configuring ESLint v9 (Flat Config) in a TypeScript monorepo, covering shared configurations, path alias resolution, and the factory pattern.
---

# Monorepo ESLint Configuration

Setting up ESLint in a modern monorepo (Turborepo, pnpm workspaces) with Flat Config can be tricky due to how widely file paths and contexts vary. This guide covers the robust "Factory Pattern" approach to ensure shared configuration works reliably across all packages.

## The Problem: Path Resolution in Monorepos

When you run `eslint` (or typical IDE integrations), the "current working directory" (CWD) can vary:

- It might be the **monorepo root**.
- It might be the **package directory** (e.g., `packages/ui-core`).

Plugins like `eslint-import-resolver-typescript`, which define how imports like `~/components/Button` are resolved, rely on finding the correct `tsconfig.json`. If the resolver looks for `tsconfig.json` relative to the wrong directory, it fails, causing errors like:

> "Missing file extension for ~/components/Button" (false positive)

## The Solution: The Factory Pattern

Instead of exporting a static configuration array from your shared config, export a **helper function** (factory) that generates the config relative to a specific directory.

### 1. Create the Shared Factory

In your shared config package (e.g., `@repo/eslint-config`), create a utility that accepts `dirName` and enforces the correct `tsconfigRootDir`.

**packages/eslint-config/utils.js**

```javascript
import { resolve } from 'path';

/**
 * Creates a configuration array with the correct import resolver settings
 * for the provided directory.
 *
 * @param {string} packageDir - The absolute path to the consumer package (e.g. import.meta.dirname)
 * @param {import("eslint").Linter.Config[]} baseConfigs - Base configs to extend
 */
export function createConfig(packageDir, ...baseConfigs) {
	return [
		...baseConfigs.flat(),
		{
			settings: {
				'import/resolver': {
					typescript: {
						alwaysTryTypes: true,
						// Explicitly look for tsconfig.json in the package directory
						project: './tsconfig.json',
						tsconfigRootDir: packageDir
					}
				}
			}
		}
	];
}
```

### 2. Configure Consumer Packages

#### Option A: The Robust Factory Pattern (Recommended)

This ensures the configuration works regardless of where `eslint` is executed (root or package dir).

**packages/ui-core/eslint.config.js**

```javascript
import { config } from '@repo/eslint-config/react';
import { createConfig } from '@repo/eslint-config/utils';

export default createConfig(import.meta.dirname, config);
```

#### Option B: Simple Inheritance (Standard Workflow)

If you strictly run linting via `turbo lint` or from within package directories, you can rely on `project: true` in the shared config.

**packages/ui-core/eslint.config.js**

```javascript
import { config } from '@repo/eslint-config/react';
export default config;
```

## Common Gotchas & Best Practices

### 1. Execution Context Matches (For Option B)

- **Option B** requires `eslint` to be run from the package directory so `project: true` finds the correct `tsconfig.json`.
- **Option A** works everywhere, because it explicitly injects the package path.

## Common Gotchas & Best Practices

### 1. Avoid Manual Configuration in `base.js`

Do **not** try to solve path resolution inside the static `base.js` or `react.js` arrays using `process.cwd()`. This is fragile because `process.cwd()` changes depending on where you run the command. Always rely on the factory injection of `import.meta.dirname`.

### 2. "Missing File Extension" Errors

rules:

- `import/extensions` rule often flags valid imports if the resolver fails.
- If you see this error for aliased paths (like `~/*`), it almost always means **the resolver is broken**, not that you need to add extensions. Fix the resolver (using this factory pattern), don't just disable the rule.

### 3. Shared Dependencies

Ensure your shared config package (e.g., `@repo/eslint-config`) exports the utility (e.g. in `package.json` `exports`).
