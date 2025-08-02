# TypeScript Config

This package contains shared TypeScript configurations for the monorepo.

> 📖 **Back to [Main README](../../README.md)**

## Overview

This package provides standardized TypeScript configurations that can be shared across all applications and packages in the monorepo. It ensures consistent type checking and compilation settings throughout the project.

## Configurations

### Base Config (`base.json`)

A base configuration with:

- ES2022 target
- Strict type checking
- Modern module resolution
- Common compiler options

### React Config (`react.json`)

Configuration for React applications with:

- React JSX support
- Testing library types (vitest, jest-dom)
- Source file includes for tests and Storybook
- No output (uses noEmit from base)

### Next.js Config (`nextjs.json`)

Configuration for Next.js applications with:

- Next.js TypeScript plugin
- JavaScript file support
- Preserved JSX for Next.js processing

### Node Config (`node.json`)

Configuration for Node.js build tools and scripts with:

- Composite project support
- Synthetic default imports
- Node.js types
- ES2022 library (no DOM)

## Usage

### Basic Setup

In your package's `tsconfig.json`:

```json
{
	"extends": "@repo/typescript-config/react.json",
	"compilerOptions": {
		// Your package-specific options
	}
}
```

### Advanced Setup

For more complex configurations, you can extend and customize:

```json
{
	"extends": "@repo/typescript-config/react.json",
	"compilerOptions": {
		"outDir": "./dist",
		"rootDir": "./src",
		"declaration": true,
		"declarationMap": true,
		"sourceMap": true
	},
	"include": ["src/**/*", "types/**/*"],
	"exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.stories.ts"]
}
```

### Configuration Inheritance

The configurations follow this inheritance pattern:

```
base.json
├── react.json
├── nextjs.json
└── node.json
```

## Configuration Details

### Base Configuration Features

- **Target**: ES2022 for modern JavaScript features
- **Module**: ESNext for latest module syntax
- **Strict**: Enabled for comprehensive type checking
- **ESModuleInterop**: Enabled for better module compatibility
- **SkipLibCheck**: Enabled for faster compilation
- **ForceConsistentCasingInFileNames**: Enabled for cross-platform compatibility

### React-Specific Features

- **JSX**: React-jsx for modern JSX transform
- **Lib**: Includes DOM and DOM.Iterable for browser APIs
- **ModuleResolution**: Bundler for modern bundler compatibility
- **AllowImportingTsExtensions**: Enabled for .ts/.tsx imports
- **ResolveJsonModule**: Enabled for JSON imports

## Development

### Adding New Configurations

When adding new TypeScript configurations:

1. Consider if it should extend base, react, or be standalone
2. Test the configuration across different package types
3. Update this README with any new configurations
4. Consider backward compatibility

### Testing Configurations

You can test configurations locally by running:

```bash
# From the root directory
pnpm check-types

# From this package directory
pnpm ts-validate
```

## Troubleshooting

### Common Issues

1. **Module resolution errors**: Check if `moduleResolution` is set correctly for your bundler
2. **JSX errors**: Ensure the correct JSX transform is configured
3. **Import errors**: Verify `esModuleInterop` and `allowSyntheticDefaultImports` settings
4. **Path mapping**: Use `baseUrl` and `paths` for custom module resolution

### Getting Help

- Check the [TypeScript documentation](https://www.typescriptlang.org/docs/)
- Review the [TypeScript compiler options](https://www.typescriptlang.org/tsconfig)
- Open an issue in the main repository

## Version Compatibility

This package is designed to work with:

- TypeScript 5.x
- React 18.x
- Node.js 18+
- Modern bundlers (Vite, Webpack, etc.)

## Best Practices

### When to Use Each Configuration

- **base.json**: For utility packages or Node.js tools
- **react.json**: For React applications and components
- **nextjs.json**: For Next.js applications
- **node.json**: For Node.js build tools and scripts

### Performance Considerations

- Use `skipLibCheck: true` for faster compilation
- Consider `incremental: true` for large projects
- Use `tsBuildInfoFile` for build info caching
