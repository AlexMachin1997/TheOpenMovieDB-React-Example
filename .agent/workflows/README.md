# Monorepo Workflows

This directory contains actionable, step-by-step workflows for recurring tasks and debugging processes in the monorepo.

## Available Workflows

### Setup & Scaffolding

- [**Create a New UI Package**](./new-ui-package.md)
  Step-by-step instructions on scaffolding a new package (like `ui-forms` or `ui-core`), correctly wiring up ESLint flat configs, TypeScript rootDir, and Tailwind inputs to prevent build failures.
- [**Create a New UI Component**](./new-ui-component.md)
  Instructions for scaffolding a new React component strict to our architectural standards (`.tsx`, `.types.ts`, `.stories.tsx`, etc.).

### Debugging & Maintenance

- [**Diagnose Dependency Cycles**](./diagnose-dependency-cycles.md)
  How to track down and fix infinite hanging script issues caused by devDependency loops between sibling monorepo packages.
- [**Fix Missing Tailwind Styles**](./fix-tailwind-styles.md)
  What to do when styles aren't appearing in Storybook or the UI due to the new Tailwind v4 `@source` directives.
