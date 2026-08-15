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

#### `no-empty-object-type` allows one specific shape

The base config sets `allowInterfaces: 'with-single-extends'`, so this lints clean:

```ts
export interface ITabs extends React.ComponentProps<typeof TabsPrimitive.Root> {}
```

That is the pass-through idiom for a component's prop interface, used by ~33 types across the UI
packages. The `I` prefix is deliberate — it lets the prop interface be named after the component
without colliding with the component's own export. **Do not "fix" one of these into a type alias.**

Everything the rule actually exists to catch still errors: `interface X {}` with no supertype,
`type X = {}`, and a bare `{}` annotation, which means "any value except `null`/`undefined`" rather
than "an empty object".

Note the rule **never** reports an interface with two or more supertypes, at any setting
(`no-empty-object-type.js:71`). That is not something this config chose. It is worth knowing when
reconciling a violation count that will not add up — it is why `@repo/ui-command` reported zero
warnings while holding five empty interfaces.

The `I`-prefix convention itself is not currently enforced by any rule, so nothing stops a new type
being written without it. See `docs/13-exports-conventions/spec.md`.

#### `no-explicit-any` is `error`, with one sanctioned exception

Both this and `no-empty-object-type` sat at `warn` from `06` until `16`, so a linter that had never
run could be switched on without blocking on a backlog. That backlog is cleared and the tree is
warning-free; any lint output is now a regression.

One `eslint-disable` for `no-explicit-any` remains, in
`packages/ui-forms/src/components/Form/Form.types.ts`, and it carries its reasoning in-file. Prefer
deriving a real type over adding another — `FieldValidatorsLike` in
`packages/ui-forms/src/components/FormField/FormField.types.ts` shows the pattern for a third-party
type too generic to name.

Full rationale for both: `docs/16-type-hygiene/plan.md`.

### React Config (`@repo/eslint-config/react`)

A comprehensive React configuration that extends the base config and includes:

- React recommended rules
- React Hooks rules
- React Refresh plugin
- JSX A11y accessibility rules
- Import plugin
- Storybook plugin (`flat/recommended`, scoped by the plugin itself to `*.stories.*` and
  `.storybook/main.*`)
- React 17+ JSX transform optimizations

#### The Storybook spread must stay above the rules block

`flat/recommended` sets `react-hooks/rules-of-hooks` to `off` on `**/*.stories.*`. This config's own
rules block has no `files` key, so it matches every file, and flat config resolves last-match-wins
per rule. With the spread **above** it, the repo's `error` is restored for story files and only the
`storybook/*` rules are added. Move the spread below and that rule silently switches off across every
story file — the same invisible degradation the `project-structure` parser caused, and the rule that
caught a real conditional-hook bug in `CommandSearch`.

Storybook's own documentation does not mention this. Its example happens to place your rules after
the spread, but says nothing about why the order matters.

Verify with `eslint --print-config <a story file>` after any change here: `react-hooks/rules-of-hooks`
must resolve to `2`, and no rule should disappear or drop severity relative to before.

`flat/recommended` also disables `import-x/no-anonymous-default-export`. That plugin is not installed
here, which is harmless — ESLint skips plugin resolution entirely for a rule set to `off`.

#### It requires Node 24, not just a Storybook version

The plugin was removed from this config for a while because it crashed ESLint at config load with
`ERR_REQUIRE_CYCLE_MODULE`, and the recorded fix was to wait for aligned Storybook versions. That was
never the cause — the versions were already aligned. `storybook` is ESM-only and its
`./internal/csf` subpath (the plugin's only Storybook-internal import) has no `require` condition, so
loading it through `require()` hits Node 22's rule that a cycle crossing the `require(esm)` boundary
is fatal. Node 24 relaxed that.

On the current lockfile it still crashes under Node 22.23.2 and imports cleanly under 24.18.1, so the
`.node-version` pin is load-bearing. Note it has to hold for the **system** Node as well, since turbo
spawns tasks through that rather than through fnm's shim.

One known gap: `storybook/await-interactions` cannot fire in this repo. It gates on the import source
and recognises only `@storybook/testing-library`, `@storybook/test` and `@storybook/jest`, while
every story here imports from `storybook/test`. The rule is enabled and structurally unable to report
anything.

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
