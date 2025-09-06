import { useMemo } from 'react';
import { IGrouping, IGroupedOptions } from '~/components/Command/types';
import { Option } from '~/types/Option';

/**
 * Hook for grouping command options with memoization
 *
 * This hook provides a memoized way to group options by their group property,
 * ensuring that the grouping operation only runs when the options or grouping
 * configuration changes.
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
	{ groupOrder = [], ungroupedPosition = 'top' }: IGrouping = {}
): IGroupedOptions => {
	const { sortedGroups, groups } = useMemo(() => {
		const groups = new Map<string | undefined, Option[]>();

		options.forEach((option) => {
			if (!option.group) return;

			if (!groups.has(option.group)) {
				groups.set(option.group, []);
			}

			groups.get(option.group)!.push(option);
		});

		const groupNames = Array.from(groups.keys());
		const definedGroups = groupNames.filter(Boolean);
		const hasUngrouped = groupNames.includes(undefined);

		const sortedGroups = groupOrder
			? [
					...groupOrder.filter((name) => definedGroups.includes(name)),
					...definedGroups.filter((name) => !groupOrder.includes(name)).sort()
				]
			: definedGroups.sort();

		const finalSortedGroups = hasUngrouped
			? ungroupedPosition === 'top'
				? [undefined, ...sortedGroups]
				: [...sortedGroups, undefined]
			: sortedGroups;

		return { sortedGroups: finalSortedGroups, groups };
	}, [options, groupOrder, ungroupedPosition]);

	return { sortedGroups, groups };
};
