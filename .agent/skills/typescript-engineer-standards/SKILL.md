---
description: TypeScript Engineering Standards - Naming, Configuration, and Inheritance
---

# TypeScript Engineering Standards

This repository enforces strict TypeScript standards to manage the monorepo efficiently without duplicating complex configurations.

## 1. Interface Naming Conventions

- Always prefix exported React component interfaces with `I`.
- Example: `IButton`, `IInput`, `ICheckbox`.
- **Why?** Differentiating between the Javascript implementation `Button` and the Typings `IButton` reduces naming collisions and clearly communicates intent when importing types across package boundaries.

## 2. JSDoc for IntelliSense

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

## 3. Configuration Inheritance

The monorepo enforces DRY (Don't Repeat Yourself) through the `@repo/typescript-config` package.

Packages must **never** define raw `compilerOptions` (unless overriding a specific edge-case). Packages must inherit from the shared configurations.

- If the package is pure TypeScript/Node: Inherit from `base.json` (or the equivalent pure TS export).
- If the package is React/UI: Inherit from `react.json` (or the equivalent React-enabled export from `@repo/typescript-config`).

This twin configuration strategy ensures JSX is only parsed where necessary, optimizing the build pipeline while keeping a single source of truth.
