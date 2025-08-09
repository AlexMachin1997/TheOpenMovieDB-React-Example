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

### TypeScript Reset Integration

This package automatically includes `@total-typescript/ts-reset` for enhanced TypeScript types. No additional setup is required!

Projects extending from these configurations automatically get improved type safety for:

- `Array.includes()` and `Array.indexOf()`
- `Object.keys()` and `Object.entries()`
- `JSON.parse()`
- And many other built-in JavaScript methods

The reset types are automatically included when you extend from any of our configurations.

### Global Type Definitions

This package provides centralized global TypeScript declaration files that are available across all projects in the monorepo without requiring individual package installations.

#### How It Works

Global types are exported from the `types/` directory and automatically included in all TypeScript projects that extend from our configurations. This eliminates the need to install type packages in every project.

#### Built-in Global Types

The package includes several utility types available globally:

```typescript
// Utility type to make specific keys required
type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Utility type to make specific keys optional
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Deep partial - makes all properties optional recursively
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Extract value type from arrays
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Create union of object values
type ValueOf<T> = T[keyof T];

// Branded/nominal types
type Brand<T, U> = T & { __brand: U };
```

#### Environment Variables

Global environment variable types are also included:

```typescript
// Available in all projects
process.env.NODE_ENV; // 'development' | 'production' | 'test'
process.env.VITE_API_BASE_URL; // string | undefined
process.env.VITE_TMDB_API_KEY; // string | undefined
```

#### Adding Custom Global Types

To add new global types that should be available across all projects:

1. Create a new `.d.ts` file in the `types/` directory
2. Add a triple-slash reference in `types/index.d.ts`:

```typescript
/// <reference path="./your-new-types.d.ts" />
```

Example custom global types file:

```typescript
// types/api.d.ts
declare global {
	interface ApiResponse<T = unknown> {
		data: T;
		success: boolean;
		message?: string;
	}

	type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export {};
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

### Setting Up Global Types in Projects

To ensure projects can access the global TypeScript declarations, configure your project's `tsconfig.json`:

```json
{
	"extends": "@repo/typescript-config/react.json",
	"compilerOptions": {
		"baseUrl": ".",
		"typeRoots": ["../../packages/typescript-config/types", "./node_modules/@types"]
	},
	"include": ["src/**/*.ts", "src/**/*.tsx", "../../packages/typescript-config/types/**/*.d.ts"]
}
```

**Key Configuration Options:**

- `typeRoots`: Tells TypeScript where to look for type definitions
- `include`: Explicitly includes the global type files in compilation
- Path should be relative to your project's location in the monorepo structure

**Turbo.js Integration:**

If using environment variables in your global types, ensure they're declared in your `turbo.json`:

```json
{
	"globalEnv": ["NODE_ENV", "VITE_API_BASE_URL", "VITE_TMDB_API_KEY"]
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

## Architecture

### Global Types System

The global types system is designed around these principles:

1. **Centralization**: All shared types live in one location (`packages/typescript-config/types/`)
2. **Zero Installation**: Projects don't need to install type packages individually
3. **Automatic Distribution**: Types are distributed through workspace references and `typeRoots`
4. **Modularity**: New global types can be added without breaking existing projects

### File Structure

```
packages/typescript-config/
├── types/
│   ├── index.d.ts          # Entry point, references all other type files
│   ├── reset.d.ts          # TypeScript reset integration
│   └── global.d.ts         # Global utility types and environment variables
├── base.json               # Base TypeScript configuration
├── react.json              # React-specific configuration
├── node.json               # Node.js configuration
└── package.json            # Package exports and type definitions
```

### Distribution Mechanism

1. **Package Exports**: The `package.json` includes proper `exports` and `types` fields
2. **TypeScript Configuration**: Projects include the types directory in `typeRoots` and `include`
3. **Workspace References**: Leverages pnpm/npm workspace features for seamless integration
4. **Build-time Resolution**: Types are resolved at TypeScript compilation time, not runtime

## Troubleshooting

### Common Issues

1. **Module resolution errors**: Check if `moduleResolution` is set correctly for your bundler
2. **JSX errors**: Ensure the correct JSX transform is configured
3. **Import errors**: Verify `esModuleInterop` and `allowSyntheticDefaultImports` settings
4. **Path mapping**: Use `baseUrl` and `paths` for custom module resolution
5. **Global types not found**: Ensure `typeRoots` includes the correct path to `packages/typescript-config/types`
6. **Environment variable errors**: Add missing env vars to `globalEnv` in `turbo.json`

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
