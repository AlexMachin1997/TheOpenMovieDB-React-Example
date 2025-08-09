# ESLint Config

This package contains shared ESLint configurations for the monorepo.

> 📖 **Back to [Main README](../../README.md)**

## Overview

This package provides standardized ESLint configurations that can be shared across all applications and packages in the monorepo. It ensures consistent code quality and coding standards throughout the project.

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

### Basic Setup

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

### Advanced Setup

For more complex configurations, you can extend and customize:

```javascript
import { config as baseConfig } from '@repo/eslint-config/base';
import { config as reactConfig } from '@repo/eslint-config/react';

export default [
	...baseConfig,
	...reactConfig,
	{
		files: ['**/*.test.{js,ts,jsx,tsx}'],
		rules: {
			// Test-specific rules
		}
	},
	{
		files: ['**/*.stories.{js,ts,jsx,tsx}'],
		rules: {
			// Storybook-specific rules
		}
	}
];
```

## Dependencies

This package includes all necessary ESLint plugins and configurations as devDependencies:

- `eslint` - Core ESLint package
- `@eslint/js` - JavaScript configuration
- `typescript-eslint` - TypeScript support
- `eslint-plugin-react` - React-specific rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `eslint-plugin-jsx-a11y` - Accessibility rules
- `eslint-plugin-import` - Import/export rules
- `eslint-plugin-storybook` - Storybook rules
- `eslint-plugin-turbo` - Turbo monorepo rules
- And more...

## Development

### Adding New Rules

When adding new rules to the shared configurations:

1. Consider if the rule should be in base, react, or a specific config
2. Test the rule across different package types
3. Update this README with any new configurations
4. Consider backward compatibility

### Testing Configurations

You can test configurations locally by running:

```bash
# From the root directory
pnpm lint

# From this package directory
pnpm lint
```

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure the package is properly installed as a workspace dependency
2. **Rule conflicts**: Check if rules are being overridden by local configurations
3. **Performance**: Large files may need specific ignore patterns

### Getting Help

- Check the [ESLint documentation](https://eslint.org/)
- Review the [Turbo ESLint plugin docs](https://turbo.build/repo/docs/core-concepts/monorepos/code-quality)
- Open an issue in the main repository

## Version Compatibility

This package is designed to work with:

- ESLint 9.x
- TypeScript 5.x
- React 18.x
- Node.js 18+
