---
name: ESLint Flat Config Migration
description: Strategy for migrating a monorepo to ESLint v9's flat configuration format.
---

# ESLint Flat Config Migration Strategy

ESLint v9 requires `eslint.config.js` (flat config) and deprecates `.eslintrc`. Migrating a monorepo requires a systematic approach.

## 1. Create a Shared Config Package

Centralize your linting rules in a package like `@repo/eslint-config`.

**packages/eslint-config/base.js:**

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export const config = [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ['dist/**', 'node_modules/**']
	}
];
```

**packages/eslint-config/react.js:**

```js
import { config as baseConfig } from './base.js';
import pluginReact from 'eslint-plugin-react';

export const config = [
	...baseConfig,
	pluginReact.configs.flat.recommended
	// ... other react plugins
];
```

## 2. Add Config to Each Package

Every package in the monorepo **MUST** have its own `eslint.config.js` file at its root. This file imports and exports the shared configuration.

**packages/core/eslint.config.js (Pure TS):**

```js
import { config } from '@repo/eslint-config/base';
export default config;
```

**packages/ui-library/eslint.config.js (React):**

```js
import { config } from '@repo/eslint-config/react';
export default config;
```

## 3. Remove Old Configs

- Delete all `.eslintrc`, `.eslintrc.js`, `.eslintrc.json`, and `.eslintignore` files.
- Configuration excludes should now be in the `ignores` array within `eslint.config.js`.

## 4. Run Lint

Use `pnpm lint` or `turbo lint` to verify. The presence of `eslint.config.js` automatically triggers ESLint's flat config mode.
