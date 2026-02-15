---
name: Modern ESLint Configuration
description: comprehensive guide to configuring ESLint v9 (Flat Config) in a TypeScript monorepo, including import resolution.
---

# Modern ESLint Configuration Strategy

This guide details how to set up ESLint v9 (Flat Config) in a TypeScript monorepo, ensuring correct linting, import resolution, and performance.

## 1. Centralized Configuration

Create a shared package (e.g., `@repo/eslint-config`) to host your configurations.

### Dependencies

Install these in your config package:

- `eslint` (v9+)
- `globals`
- `@eslint/js`
- `typescript-eslint`
- `eslint-plugin-react`, `eslint-plugin-react-hooks` (for React)
- **CRITICAL**: `eslint-import-resolver-typescript` (for path aliases like `~/*`)
- `eslint-plugin-import`

### Base Config (Pure TypeScript)

**packages/eslint-config/base.js:**

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export const config = [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ['dist/**', 'node_modules/**', 'build/**']
	}
];
```

### React Config (UI Libraries)

**packages/eslint-config/react.js:**

```js
import { config as baseConfig } from './base.js';
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export const config = [
	...baseConfig,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			import: importPlugin
			// ... other plugins
		},
		settings: {
			// CRITICAL: Configure TypeScript resolver for import aliases
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json']
				},
				node: true
			}
		}
	}
];
```

## 2. Per-Package Configuration

Every package **MUST** have an `eslint.config.js` file.

**packages/ui-lib/eslint.config.js:**

```js
import { config } from '@repo/eslint-config/react';
export default config;
```

## 3. TypeScript Path Aliases

To avoid `import/extensions` or missing module errors when using path aliases (e.g., `~/components/Button`):

1.  Ensure `eslint-import-resolver-typescript` is installed.
2.  Ensure `tsconfig.json` in the package defines `baseUrl` and `paths`.
    ```json
    {
    	"compilerOptions": {
    		"baseUrl": ".",
    		"paths": { "~/*": ["./src/*"] }
    	}
    }
    ```
3.  Ensure the `import/resolver` setting in strict ESLint config points to these `tsconfig.json` files.

## 4. Verification

Run `pnpm lint` in a package. If you see `import/extensions` errors for aliased imports, check step 3.
