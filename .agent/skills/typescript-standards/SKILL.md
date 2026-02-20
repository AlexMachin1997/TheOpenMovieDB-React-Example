---
name: TypeScript Standards
description: Centralized guide for Monorepo TypeScript configurations, including rootDir ambiguity fixes.
---

# TypeScript Standards

Within the monorepo, standardizing TypeScript properties allows aliases, types, and compiler steps to work seamlessly out of the box.

## TypeScript Ambiguous RootDir Error

When building a package (especially when configuring `baseUrl`, `paths` (aliases), and `outDir`), the compiler might throw a **"project root is ambiguous"** error while resolving package exports.

This occurs because TypeScript infers the longest common path of all input files. In a monorepo, files outside local `src` can sometimes cause the inference to grab an incorrect higher-level folder.

### The Fix

Always explicitly set the `rootDir` in the `compilerOptions` of the `tsconfig.json`.

```json
{
	"compilerOptions": {
		"rootDir": "./src", // Prevents ambiguity and hard-links output mapping
		"baseUrl": ".",
		"paths": {
			"~/*": ["./src/*"]
		},
		"declaration": true,
		"outDir": "dist"
	}
}
```

Enforcing `"rootDir": "./src"` guarantees that the output structure inside `dist` reliably mirrors the internal `src` directory structure.

## Interface Naming Conventions

- Always prefix exported React component interfaces with `I`.
- Example: `IButton`, `IInput`, `ICheckbox`.
- **Why?** Differentiating between the Javascript implementation `Button` and the Typings `IButton` reduces naming collisions and clearly communicates intent when importing types across package boundaries.

## JSDoc for IntelliSense

- Interfaces defining component props or configuration objects **must** contain JSDoc blocks formatting descriptions, defaults, and usage hints.
- This creates instant IDE feedback (IntelliSense) when another engineer consumes your package.

Example:

```typescript
/**
 * Core text area properties.
 * @param {boolean} [autoResize=false] - Automatically adjust the height of the textarea based on content
 */
export interface ITextarea extends React.ComponentProps<'textarea'> {
	autoResize?: boolean;
}
```

## Configuration Inheritance

The monorepo enforces DRY (Don't Repeat Yourself) through the `@repo/typescript-config` package.
Packages must **never** define raw `compilerOptions` (unless overriding a specific edge-case). Packages must inherit from the shared configurations.

- If the package is pure TypeScript/Node: Inherit from `base.json` (or the equivalent pure TS export).
- If the package is React/UI: Inherit from `react.json` (or the equivalent React-enabled export from `@repo/typescript-config`).

This twin configuration strategy ensures JSX is only parsed where necessary, optimizing the build pipeline while keeping a single source of truth.
