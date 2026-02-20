---
description: React Engineering Standards - Component Architecture, Naming, and Documentation
---

# React Engineering Standards

This repository follows strict engineering standards for all React packages within the monorepo to ensure consistency, high developer experience, and maintainability.

## 1. Package Separation

UI packages are split by feature responsibility (e.g., `@repo/ui-forms`, `@repo/ui-overlays`, `@repo/ui-core`).

- **Do not** consolidate everything into a massive monolithic package.
- **Why?** Fine-grained packages allow consumers to pick and choose dependencies. It mitigates bottlenecking where multiple engineers step on each other's toes editing a single massive library.
- Logical domains own their specific primitives (e.g., all inputs, selects, and checkboxes live in `ui-forms`).

## 2. Component Structure

All new or refactored components **MUST** adhere to the following file-by-file separation of concerns paradigm.

Within `src/components/[ComponentName]/`:

### A. `{ComponentName}.tsx`

The primary React implementation containing the hooks and JSX.

- Avoid stuffing types, variants or styles directly into this file.

### B. `{ComponentName}.types.ts`

All TypeScript definitions for the component.

- The primary exported interface should be prefixed with `I`, e.g., `IInput`, `IDialog`.
- Include **JSDocs** on properties. While Storybook MDX handles broader documentation, JSDoc gives consumers critical inline IDE IntelliSense.

### C. `{ComponentName}.variants.ts` (Optional)

If the component utilizes Tailwind styling variations (using `cva` - Class Variance Authority), they **must** live here. Keep `.tsx` files clean.

### D. `{ComponentName}.stories.tsx`

Standard Storybook CSF (Component Story Format). Showcases component states.

- **Must** include `tags: ['autodocs']` in the meta to enable automatic docs generation.
- Use `parameters.docs.source.code` on key stories to provide clean, importable copy-paste snippets.

### E. `{ComponentName}.mdx` (Optional)

Narrative-focused documentation file. **Not required for simple components** — autodocs handles props tables and story embedding automatically.

Reserve MDX for components that need:

- Usage guidelines (when to use, when not to)
- Feature highlights
- Accessibility notes
- Architectural context (e.g. provider patterns for compound components)

**Rules for MDX:**

- Use `<ArgTypes />` for props — never duplicate the props table manually.
- Use `<Stories />` to auto-embed all stories with their `source.code` — never manually register each story with `<Canvas of={...} />`.
- Focus on **human-written narrative value** that can't be auto-generated.

### F. `index.ts`

A simple barrel file explicitly exporting the component and its types using path aliases (`~`).

## 2.1 Compound Components (Sub-component Pattern)

Compound components (e.g., `Dialog`, `Sheet`, `Accordion`, `Selects`) are components that expose multiple related sub-components. They follow **Pattern B: Centralised Types**.

### Structure

```
ComponentName/
├── ComponentName.types.ts    ← ALL interfaces live here (IDialog, IDialogContent, etc.)
├── ComponentName.tsx         ← barrel re-export from components/
├── ComponentName.stories.tsx
├── ComponentName.mdx
├── index.ts                  ← barrel export (component + types)
└── components/
    ├── index.ts              ← barrel export for sub-components only
    ├── ComponentNameClose.tsx
    ├── ComponentNameContent.tsx
    └── ComponentNameTrigger.tsx
```

### Rules

- **Types are ALWAYS centralised** in `{ComponentName}.types.ts` at the component root — never scattered across sub-component files.
- Sub-component `.tsx` files import their interface from `../{ComponentName}.types`.
- The root `index.ts` exports both components _and_ types.
- The `components/index.ts` barrel only exports implementations (for internal use by the parent `.tsx`).
- Additional sub-folders (e.g. `hooks/`, `contexts/`, `types/`) are permitted for complex components like Selects.

## 3. Accessibility (A11y)

- Our Storybook setup is pre-configured with `@storybook/addon-a11y`.
- Ensure all stories pass the Accessibility panel checks in Storybook (e.g., color contrast, ARIA roles).
