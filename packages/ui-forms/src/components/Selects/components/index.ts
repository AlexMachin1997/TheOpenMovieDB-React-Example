/**
 * Five of the names below are `@repo/ui-command` components re-exported under Select-facing names.
 *
 * Each was its own file wrapping the Command equivalent and returning it unchanged. Between them
 * they added a `displayName` and two `React.memo` calls — and both of those components already
 * memoize themselves, so the wrappers bought nothing a caller could observe while costing a reader
 * a file to open before discovering that. `SelectGroupedItemsVirtualized` also wrapped the render
 * prop in `({ item }) => children({ item })`, an identity function that allocated a new closure on
 * every render and defeated the memo it sat in front of.
 *
 * The Select-facing names are kept deliberately: `Select` and `Command` are separate components,
 * and a caller composing a `Select` should not have to reach for `Command*` names to do it.
 */

/**
 * Select grouped components
 */
export { CommandGroup as SelectGroup } from '@repo/ui-command';
export { CommandGroupedVirtualizedList as SelectGroupedItemsVirtualized } from '@repo/ui-command';
export { CommandGroupedList as SelectGroupedListItems } from '@repo/ui-command';

/**
 * Select list components
 */
export * from '~/components/Selects/components/SelectListItem';
export * from '~/components/Selects/components/SelectInterface';
export * from '~/components/Selects/components/SelectListItems';
export { CommandVirtualizedList as SelectListItemsVirtualized } from '@repo/ui-command';

/**
 * Select infrastructure components
 */
export * from '~/components/Selects/components/SelectProvider';
export * from '~/components/Selects/components/SelectTrigger';
export * from '~/components/Selects/components/SelectItemClear';
export { CommandSeparator as SelectSeparator } from '@repo/ui-command';
