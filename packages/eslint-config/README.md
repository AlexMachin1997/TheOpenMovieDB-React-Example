# ESLint Config

This package contains shared ESLint configurations for the monorepo.

## Configurations

### Base Config (`@repo/eslint-config/base`)

A base configuration that includes:

- JavaScript recommended rules
- TypeScript recommended rules
- Prettier integration
- Turbo plugin for monorepo best practices
- Common ignore patterns

### React Config (`@repo/eslint-config/react`)

A comprehensive React configuration that extends the base config and includes:

- React recommended rules
- React Hooks rules
- React Refresh plugin
- JSX A11y accessibility rules
- Import plugin
- Storybook plugin
- React 17+ JSX transform optimizations

### Next.js Config (`@repo/eslint-config/next`)

Configuration specifically for Next.js applications.

### React Internal Config (`@repo/eslint-config/react-internal`)

A lighter React configuration for internal libraries.

## Usage

In your package's `eslint.config.js`:

```javascript
import { config as baseConfig } from '@repo/eslint-config/base';
import { config as reactConfig } from '@repo/eslint-config/react';

export default [
	...baseConfig,
	...reactConfig
	// Your package-specific overrides
];
```

## Dependencies

This package includes all necessary ESLint plugins and configurations as devDependencies.
