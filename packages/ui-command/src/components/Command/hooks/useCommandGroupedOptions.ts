import { useMemo } from 'react';
import { IGrouping, IGroupedOptions } from '~/components/Command/types';
import { groupOptions } from '~/components/Command/utils/grouping';
import type { Option } from '@repo/core';

/**
 * Hook for grouping command options with memoization
 *
 * Thin memoized wrapper around the canonical {@link groupOptions} utility, so grouping has a
 * single source of truth. The hook only adds memoization — all bucketing/ordering behaviour
 * (keeping ungrouped options under the `undefined` key, `groupOrder` precedence, ungrouped
 * top/bottom placement) comes from `groupOptions`.
 *
 * @param options - Array of options to group
 * @param groupingConfig - Configuration for grouping behavior
 * @returns Memoized grouped options result
 *
 * @example
 * ```tsx
 * const { sortedGroups, groups } = useCommandGroupedOptions(options, {
 *   groupOrder: ['category1', 'category2'],
 *   ungroupedPosition: 'top'
 * });
 * ```
 */
export const useCommandGroupedOptions = (
	options: Option[],
	{ groupOrder, ungroupedPosition }: IGrouping = {}
): IGroupedOptions =>
	// Defaults are left to `groupOptions` so the memo dependencies stay referentially stable:
	// defaulting `groupOrder` to `[]` here would create a new array every render and defeat the memo.
	useMemo(
		() => groupOptions({ options, groupOrder, ungroupedPosition }),
		[options, groupOrder, ungroupedPosition]
	);
