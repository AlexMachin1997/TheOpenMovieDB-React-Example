# Golden Rules

> This file is the single source of truth for how this AI agent should behave in every conversation.
> Run `/update-skills` at any time to regenerate the Skill Index from the latest `.agent/skills/` files.

---

## 1. Start of Every Conversation

At the start of every conversation, the agent MUST:

1. **Read this file first** before doing anything else.
2. **Check for relevant skills** in `.agent/skills/` whose description matches the user's request. Read that `SKILL.md` before writing any code.
3. **Check the KI summaries** for existing knowledge about the topic being asked.
4. **Clarify ambiguities** before starting — ask the user for clarification if the scope, approach, or target is unclear, but batch questions to minimise interruptions.

---

## 2. Mandatory Planning

> [!IMPORTANT]
> The agent MUST always plan before implementing, regardless of how simple the change appears.

- Always create or update `implementation_plan.md` before touching any code.
- Notify the user and request approval for the plan before execution.
- Never skip to implementation just because the change feels small; it is hard to reason about impact without a plan.
- For follow-up work on an existing plan, update the same `implementation_plan.md` rather than creating a new one.

---

## 3. Agent Behaviour Rules

These apply at all times:

- **Do not apologise.** Acknowledge mistakes plainly and correct them.
- **Be concise.** Prefer short, direct answers over long explanations. Use code over prose wherever possible.
- **Wait for confirmation.** Whenever the user asks a question or proposes an action, do not blindly proceed to execute it. Always wait for the user to explicitly say "proceed" or an equivalent confirmation before starting the execution.
- **No placeholders.** Never leave `// TODO`, `...`, or `/* implement me */` in generated code. Generate full, working implementations.
- **Assume context.** The user is an experienced developer. Do not over-explain basics or add unnecessary preamble.
- **Ask, don't assume.** When scope or intent is unclear, ask — but batch questions into one message.
- **Respect the monorepo hierarchy.** Never place app-level code in shared packages, and never import siblings that would create dependency cycles.

---

## 4. Core Architecture Standards

### Monorepo (Turborepo + pnpm)

- Dependency flow is strictly one-way: `core` → `ui-core` → `ui-overlays` → `ui-forms`.
- Never import from a sibling at the same level if it creates a cycle; extract to `@repo/core` instead.
- Always use the `createConfig` factory pattern for ESLint in packages that use the React config (see ESLint section below).
- Config packages (`vite-config`, `tailwind-config`) must compile to `dist/` before consumers can import them.

### ESLint (Flat Config v9)

- **Never use `.eslintignore`** — ignores go in the `ignores` array inside the flat config.
- **Every package using `@repo/eslint-config/react` MUST use the `createConfig` factory**:
  ```js
  import { config } from '@repo/eslint-config/react';
  import { createConfig } from '@repo/eslint-config/utils';
  export default createConfig(import.meta.dirname, config);
  ```
- Packages using `@repo/eslint-config/base` (pure TS/Node, no path aliases) do not need the factory.
- **Never use `files: ['**']`** with `eslint-plugin-project-structure`— scope it to`['**/*.{ts,tsx,js,jsx}']` to avoid hanging the lint process on lockfiles and YAML.

### TypeScript

- Always explicitly set `"rootDir": "./src"` in `tsconfig.json` to avoid the ambiguous root error.
- Prefix React component prop interfaces with `I` (e.g., `IButton`, `IInput`).
- Always add JSDoc blocks to exported interfaces — Storybook and IDE IntelliSense both consume them.
- Packages must inherit from `@repo/typescript-config` (not define raw `compilerOptions` from scratch).

### React / UI Components

- **Every prop a component declares gets an explicit default in the destructure** — `loading = false`, `disabled = false`, `asChild = false` — not an implicit `undefined`. An implicit default is invisible at the call site and at the destructure, so the component's behaviour with the prop omitted has to be inferred from the body. Document it with `@default` in the JSDoc too; Storybook's controls table reads it.
- One component per folder: `Button/Button.tsx`, `Button/Button.types.ts`, `Button/Button.variants.ts`, `Button/index.ts`.
- Types for compound components (e.g., `Dialog`, `Sheet`) always live in the root `{ComponentName}.types.ts`, never scattered across sub-component files.
- Do **not** import React just to use JSX (React 17+ transform is active). Only import React for hooks, `forwardRef`, or types.

---

## 5. Skill Index & Triggers

Read the relevant `SKILL.md` before starting any work in these areas:

| Skill                                                      | Read when...                                                                  |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Monorepo Standards](./skills/monorepo-standards/SKILL.md) | Adding a package, setting up Tailwind, debugging dependency cycles or imports |

---

## 6. Available Workflows

Run these as slash commands in any conversation:

| Command                       | Description                                                             |
| ----------------------------- | ----------------------------------------------------------------------- |
| `/new-ui-package`             | Scaffold a new standard React UI package in the monorepo                |
| `/diagnose-dependency-cycles` | Identify and fix infinite hanging scripts caused by cyclic dependencies |
| `/fix-tailwind-styles`        | Fix styles not appearing due to Tailwind v4 `@source` directives        |
| `/update-storybook`           | Update all Storybook dependencies across the monorepo                   |
