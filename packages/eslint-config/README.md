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

The `I`-prefix convention is enforced — see below.

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

#### `naming-convention` enforces the `I` prefix on interfaces

```js
'@typescript-eslint/naming-convention': [
	'error',
	{ selector: 'interface', format: ['PascalCase'], prefix: ['I'] }
]
```

`selector: 'interface'` is the whole design. The rule never inspects a type alias, so the second,
equally deliberate naming family stays out of scope by construction rather than by an exemption list
that would need maintaining: a hook's options and result (`IUseDebouncedValueOptions` is prefixed,
but `ShowErrorsWhen`, `IconName`, `SelectProps`, `RenderFunction` and `FieldValidatorsLike` are
unions or derived aliases and are not).

**The gap this leaves, stated plainly:** a `type` alias named `IFoo` is invisible to the rule, and so
is a prop type written as a `type` when it could have been an `interface`. No `naming-convention`
selector can close that without flagging every legitimate union alias in the repo.

Three `I*` names are type aliases because **a discriminated union cannot be an interface** (TS2312:
_an interface can only extend an object type or intersection of object types with statically known
members_). `IAccordion`, `ICalendar` and `ILabel` each carry the reason in-file. Where the union
members can themselves be interfaces they are — `IAccordion` is `IAccordionSingle | IAccordionMultiple`
— which is as close as the language allows. Do not "fix" one of these by flattening it: the
discrimination is load-bearing, and `collapsible` exists only on Accordion's single variant.

`apps/the-open-movie-database` sets this rule to `off`. It names prop types `*Props` throughout and
reports 25 violations; that is suspended until the app is reworked, and the fix there is renaming,
not weakening this config.

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

### Folder Structure Config (`@repo/eslint-config/folder-structure`)

`project-structure/folder-structure` enforces the UI packages' component layout. Unlike the other
configs it is a **factory**, because the rule needs to know which package it is validating:

```js
import { config } from '@repo/eslint-config/react';
import { folderStructure } from '@repo/eslint-config/folder-structure';
import { createConfig } from '@repo/eslint-config/utils';

export default createConfig(import.meta.dirname, config, folderStructure(import.meta.dirname));
```

Only the four UI packages opt in. Apps do not: their layout is not this one, and because the rule
ships as a separate config rather than inside `react`, they need no opt-out.

#### Why a factory rather than a shared static config

The plugin resolves `projectRoot` against the **repository** root, not against ESLint's working
directory, so a single static object cannot say "validate whichever package is being linted".
`folderStructure()` takes `import.meta.dirname` and walks up to `pnpm-workspace.yaml` to derive the
repo-relative path itself. Passing a literal string would work too and was rejected: a path that
drifts from reality points the rule at a tree that does not exist, and a rule with nothing to check
reports nothing — which is indistinguishable from success.

#### It deliberately sets no parser

The rule only inspects a file's path, so it needs no parser of its own. This matters because the
previous attempt at enabling it set `languageOptions.parser = projectStructureParser` on
`**/*.{ts,tsx,js,jsx}`. In flat config the last matching `parser` wins, so that replaced the
TypeScript parser for every source file and every code rule — `react-hooks/rules-of-hooks`,
`no-debugger`, `exhaustive-deps` — silently passed against an empty AST. Setting no parser at all
makes that failure unreachable rather than merely avoided, and removes any dependence on config
ordering.

#### Three ways this rule can look like it works while doing nothing

All three were live in the version that shipped commented-out, and all three are worth re-checking
after any edit:

1. **A catch-all entry.** `{ name: '*', children: [] }` matches the first folder it meets and leaves
   every descendant unchecked. The old schema had two — one matched `packages/`, the other matched
   `components/` via `{ name: '{camelCase}' }`.
2. **A wrong root.** The old schema began at `src`, but `projectRoot` defaulted to the repo root, so
   `src` was being matched against `packages/`, `apps/` and `docs/`.
3. **A misspelled placeholder.** It is `{FolderName}`, not `{folderName}`. The lowercase form matches
   nothing. Note `{FolderName}` PascalCases the folder name, so a lowercase folder such as `fields/`
   needs its files spelled literally.

#### Verifying it

A green lint run proves nothing on its own here. Check all three:

```bash
# 1. it fires — both should report
mkdir -p packages/ui-core/src/components/badlynamed && echo 'export const x=1;' > packages/ui-core/src/components/badlynamed/wrong.ts
cd packages/ui-core && npx eslint --no-cache
```

```bash
# 2. the parser is untouched — must print typescript-eslint/parser, not projectStructureParser
cd packages/ui-core && npx eslint --print-config src/index.ts
```

```bash
# 3. code linting still works — a conditional hook must still report rules-of-hooks
```

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
