---
name: Monorepo Shared Configuration
description: Best practices for sharing TypeScript configuration and build logic across packages in a monorepo.
---

# Monorepo Shared Configuration Strategy

When sharing configuration packages (like Vite, Tailwind, or complex utility libraries) in a TypeScript monorepo, avoid consuming raw TypeScript files directly from `node_modules`. Instead, compile them to JavaScript and Type Definitions.

## The Problem

Consuming raw `.ts` files from `node_modules` often leads to:

- `ERR_UNKNOWN_FILE_EXTENSION` errors in Node.js tools (like Vite or Tailwind CLI).
- Requirement for complex runners like `tsx` or `ts-node` in every consumer package.
- Slow builds due to repeated on-the-fly compilation.

## The Solution: Pre-Compilation

### 1. Configure the Shared Package

Ensure your shared config package (e.g., `@repo/vite-config`) has a `build` script.

**package.json:**

```json
{
	"name": "@repo/vite-config",
	"type": "module",
	"exports": {
		"./react-library": {
			"types": "./dist/react-library.d.ts",
			"import": "./dist/react-library.js"
		}
	},
	"scripts": {
		"build": "tsc"
	},
	"devDependencies": {
		"typescript": "^5.0.0"
	}
}
```

**tsconfig.json:**

```json
{
	"compilerOptions": {
		"outDir": "dist",
		"declaration": true,
		"module": "ESNext",
		"target": "ES2022",
		"moduleResolution": "bundler",
		"skipLibCheck": true,
		"noEmit": false
	},
	"include": ["."],
	"exclude": ["dist", "node_modules"]
}
```

### 2. Consume in Other Packages

In your consumer packages (e.g., `packages/ui-library`), you can now use standard tools without `tsx`.

**package.json:**

```json
{
	"scripts": {
		"build": "vite build"
		// No need for "tsx vite build" or "node --loader tsx"
	}
}
```

**vite.config.ts:**

```ts
import { reactLibrary } from '@repo/vite-config/react-library'; // Imports JS + types!

export default reactLibrary({ ... });
```

## When to Use This

- **Vite Configs**: Always compile. Vite runs in Node.js.
- **Tailwind Configs**: Compile if you use TS. Tailwind CLI runs in Node.js.
- **Utility Libraries**: Compile if used by build tools (PostCSS, etc.).
