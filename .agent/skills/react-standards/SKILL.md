---
name: React Engineering Standards
description: Centralized standards for component architecture, type definitions, compound components, and modern JSX transforms.
---

# React Engineering Standards

This repository follows strict standards for React packages within the monorepo to ensure consistency, high developer experience, and code maintainability.

## 1. Package Separation

UI packages are split logically by feature (e.g., `ui-forms`, `ui-overlays`, `ui-core`).
**Do not** consolidate everything into a massive monolithic package. Fine-grained packages mitigate bottlenecking and allow clean dependency usage.

## 2. Component Architecture

Components MUST adhere to a file-by-file separation of concerns paradigm.
Within `src/components/[ComponentName]/`:

### `{ComponentName}.tsx`

The primary React implementation. Avoid stuffing types, variants or large styling blocks directly here.

### `{ComponentName}.types.ts`

All TypeScript definitions for the component.

- The primary exported interface should be prefixed with `I`, e.g., `IButton`.
- Include **JSDocs** on properties. Storybook uses autodocs, but JSDocs give consumers inline IDE IntelliSense.

### `{ComponentName}.variants.ts` (Optional)

If utilizing Tailwind variations with `cva` (Class Variance Authority), keep them here.

### `{ComponentName}.stories.tsx`

Standard Storybook CSF. Showcases states. MUST include `tags: ['autodocs']`.

### `{ComponentName}.mdx` (Optional)

Narrative docs. Not required for simple components. Reserve for features needing usage guidelines, architectural context, etc.

### `index.ts`

Barrel file exporting the component (`export { Button } from '~/...'`) and its types (`export type { IButton } from '~/...'`).

## 3. Compound Components (Sub-component Pattern)

Components like `Dialog` or `Sheet` that expose sub-components MUST use **Centralised Types**.

- **Types are ALWAYS centralised** in the root `{ComponentName}.types.ts`. Never scatter them across sub-component files.
- The root `index.ts` exports both all components and all types.
- The `components/index.ts` barrel only exports implementations internally.

## 4. React 17+ JSX Transform Imports

Since React 17 handles JSX compilation natively, **DO NOT** include `import * as React from 'react';` at the top of a file merely to use JSX.

**Exceptions:**

- Specifically importing hooks (`React.useState`).
- Using top-level APIs (`React.forwardRef`).
- Accessing React types (`React.ReactNode`).

Otherwise, delete unused `import * as React` lines to reduce file noise and parse time.

## 5. Accessibility (A11y)

Always ensure your stories pass the `@storybook/addon-a11y` accessibility panel checks (color contrast, ARIA).
