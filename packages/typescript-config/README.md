# TypeScript Config

This package contains shared TypeScript configurations for the monorepo.

## Configurations

### Base Config (`base.json`)

A base configuration with:

- ES2022 target
- Strict type checking
- Modern module resolution
- Common compiler options

### React Config (`react.json`)

Extends base config with:

- React JSX support
- Testing library types
- Source file includes

### React Library Config (`react-library.json`)

Lightweight React config for libraries.

### Next.js Config (`nextjs.json`)

Configuration for Next.js applications.

### Node Config (`node.json`)

Configuration for Node.js build tools and scripts.

## Usage

In your package's `tsconfig.json`:

```json
{
	"extends": "@repo/typescript-config/react.json",
	"compilerOptions": {
		// Your package-specific options
	}
}
```
