# Movie Database Monorepo

This is a monorepo built with [Turborepo](https://turbo.build/repo) containing a React-based movie database application.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps

- `movie-app`: A React application built with Vite, featuring a comprehensive movie database interface with Storybook for component development.

### Packages

- `@repo/eslint-config`: ESLint configurations (base, React, Next.js)
- `@repo/typescript-config`: TypeScript configurations (base, React, Next.js, Node)
- `ui`: A React component library shared by applications and packages

### Utilities

This turborepo has some additional tools already set up for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Storybook](https://storybook.js.org/) for component development

## Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

### Remote Caching

Turborepo can use a remote cache to share build cache across machines, enabling you to share build cache with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview#personal-accounts).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Commands

- `pnpm build` - Build all apps and packages
- `pnpm dev` - Develop all apps and packages
- `pnpm lint` - Lint all apps and packages
- `pnpm check-types` - Type check all apps and packages
- `pnpm test` - Run tests for all apps and packages
- `pnpm storybook` - Start Storybook for component development
- `pnpm clean` - Clean all build outputs and node_modules

## Learn More

Read the [docs](https://turbo.build/repo/docs) to learn more about using Turborepo.
