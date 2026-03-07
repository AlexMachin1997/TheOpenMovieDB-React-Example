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
**CRITICAL:** It does NOT configure node-level TypeScript path resolution. That is the consumer's responsibility via the Factory Pattern (see §2).

**Required Dependencies in config package:**

- `eslint`, `globals`, `@eslint/js`, `typescript-eslint`
- `eslint-plugin-react`, `eslint-plugin-react-hooks`
- `eslint-plugin-import`, `eslint-import-resolver-typescript`

## 2. Monorepo Path Resolution (The Factory Pattern)

In a monorepo, resolving path aliases (like `~/components/Button`) breaks when running from the root because ESLint's TypeScript resolver defaults to `process.cwd()`. In a Turborepo, this means every package lints against the monorepo root's `tsconfig.json`, NOT its own — causing it to spin up huge, redundant TypeScript Program instances that hang or crash.

### The Fix: `utils.js` Factory

The shared config package exports a `createConfig` utility that **locks** the resolver to the consumer package's specific directory by receiving `import.meta.dirname` from the caller.

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
						tsconfigRootDir: packageDir
					}
				}
			}
		}
	];
}
```

### Consumer Setup

Every package using the `react` config MUST use the factory:

```javascript
import { config } from '@repo/eslint-config/react';
import { createConfig } from '@repo/eslint-config/utils';

export default createConfig(import.meta.dirname, config);
```

**Do NOT** export `config` directly — this bypasses path resolution and causes the resolver to fall back to `process.cwd()`.

## 3. Project Structure Plugin Scope

> [!WARNING]
> `eslint-plugin-project-structure` with `files: ['**']` is a known performance trap.

When using `files: ['**']`, ESLint v9 attempts to run the custom AST parser over **every text file** it can find — including `.json`, `.md`, `.yml`, and gigantic `.lock` files. This causes massive memory usage and can hang the linting process.

**Always scope it tightly:**

```javascript
{
  files: ['**/*.{ts,tsx,js,jsx}'], // NOT files: ['**']
  languageOptions: { parser: projectStructureParser },
  plugins: { 'project-structure': projectStructurePlugin },
  rules: { 'project-structure/folder-structure': ['error', folderStructureConfig] }
}
```

## 4. Flat Config Migration Rules

When migrating or adding new packages:

- Delete all legacy `.eslintrc`, `.eslintrc.js`, and `.eslintignore` files.
- Configuration ignores must be contained in the `ignores` array of the flat config.
- Do NOT use `process.cwd()` for path resolution inside the shared config; always rely on `import.meta.dirname` injection via the factory pattern.

If you encounter `import/extensions` linting errors for aliased paths, it usually means the import resolver is misconfigured, not that file extensions should be added.
