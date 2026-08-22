# @repo/ui-command

A filterable, optionally virtualised command palette, built on `cmdk`.

> 📖 **Back to [Main README](../../README.md)**

## At a glance

- **One component in its own package** — 18 runtime exports, 10 direct dependencies.
- **Depends on `@repo/ui-core` for exactly one component: `Search`.**
- Single entry point: `import { Command } from '@repo/ui-command'`.
- Conventions are documented once in
  [`@repo/ui-core`](../ui-core/README.md#conventions); the rules enforcing them live in
  [`@repo/eslint-config`](../eslint-config/README.md).

## What is in here

| Piece                                                     | Purpose                                         |
| --------------------------------------------------------- | ----------------------------------------------- |
| `Command`, `CommandInput`, `CommandList`, `CommandItem`   | The palette and its parts                       |
| `CommandGroup`, `CommandSeparator`, `CommandShortcut`     | Grouping and affordances                        |
| `CommandEmpty`                                            | Empty state                                     |
| `CommandDialog`                                           | The palette in a modal                          |
| `CommandVirtualizedList`, `CommandGroupedVirtualizedList` | Virtualised variants for long lists             |
| `CommandProvider`, `useCommandContext`                    | Shared state for callers composing their own UI |

## Worth knowing

- **`src/index.ts` re-exports the component folder wholesale** (`export * from '~/components/Command'`)
  rather than naming each symbol, because the package _is_ one component. The other three UI packages
  list their exports explicitly.
- **`CommandInput` is `CommandSearch` renamed at the barrel.** The alias is the public name.
- **One `CommandList` per palette, and the composer owns it.** The list variants —
  `CommandListItems`, `CommandGroupedList` and both virtualised ones — contribute items only.
  `CommandInterface` renders the `CommandList` around them for you; compose by hand and you write it
  yourself:

  ```tsx
  <Command>
  	<CommandInput />
  	<CommandList className='max-h-[160px]'>
  		<CommandListItems>{({ item }) => <CommandItem value={item.value} />}</CommandListItems>
  	</CommandList>
  	<CommandEmpty />
  </Command>
  ```

  That `className` is how you size the list — there is no `maxHeight` prop. Two nested lists means
  two `role="listbox"` elements sharing one id, two scroll containers, and a virtualiser measuring
  the wrong one.

- **A `CommandList` is a `listbox`, so only `option` and `group` may live inside it.** Whatever you
  pass to `CommandInterface` lands there. Content that is not list content — a footer, a banner —
  has to sit outside it, which means composing by hand.
- **Virtualisation is opt-in.** Use the plain list unless the option count is large enough to matter;
  the virtualised variants exist for that case and carry the `@tanstack/react-virtual` cost.
- **Why it is a separate package: dependency weight, not code size.** Folding it into `ui-core` would
  put `cmdk`, `@tanstack/react-virtual` and `@radix-ui/react-dialog` behind every `ui-core` install,
  including consumers who only wanted a `Button`. Tree-shaking drops unused _code_, not a package
  from the dependency tree. Whether that still earns itself is an open question in
  [`docs/planned.md`](../../docs/planned.md#the-four-package-split).

## Dependency direction

`core → ui-core → ui-overlays → ui-command → ui-forms`. One way only; never import a package to your
right.
