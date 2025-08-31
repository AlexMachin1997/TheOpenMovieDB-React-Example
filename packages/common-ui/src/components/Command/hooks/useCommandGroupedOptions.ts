import * as React from 'react';
import { Option } from '~/types/Option';
import { IBaseGroupedCommand, GroupedOptions } from '~/components/Command/types';

/**
 * Hook to organize command options into groups with configurable ordering
 *
 * This hook processes options and organizes them into groups based on their group property.
 * It provides flexible configuration for group ordering and positioning of ungrouped items.
 *
 * Features:
 * - Automatic grouping of options based on their group property
 * - Configurable group ordering through groupOrder array
 * - Flexible positioning of ungrouped items (top/bottom)
 * - Efficient memoization of grouped and sorted results
 * - Generic support for Option and extended types
 *
 * Grouping behavior:
 * - Options with the same group value are collected together
 * - Options without a group property are considered "ungrouped"
 * - Groups can be ordered using the groupOrder array
 * - Ungrouped items can be positioned at the top or bottom
 * - Groups not in groupOrder are sorted alphabetically
 *
 * The hook returns:
 * - sortedGroups: Array of group names in the desired order
 * - groups: Map of group names to arrays of options
 *
 * @template T - Type extending Option with optional group property
 * @param options - Array of options to group
 * @param config - Configuration for grouping behavior
 * @returns Object containing sortedGroups and groups
 *
 * @example
 * ```tsx
 * const { sortedGroups, groups } = useCommandGroupedOptions(options, {
 *   groupOrder: ['Frameworks', 'Libraries', 'Tools'],
 *   ungroupedPosition: 'bottom'
 * });
 *
 * // Render grouped options
 * sortedGroups.forEach(groupName => {
 *   const groupOptions = groups.get(groupName) || [];
 *   return (
 *     <CommandGroup key={groupName} heading={groupName}>
 *       {groupOptions.map(option => (
 *         <CommandItem key={option.value} value={option.value} />
 *       ))}
 *     </CommandGroup>
 *   );
 * });
 * ```
 */
export const useCommandGroupedOptions = (
	options: Option[],
	{ groupOrder = [], ungroupedPosition = 'top' }: IBaseGroupedCommand = {}
): GroupedOptions => {
	const { sortedGroupNames, groups } = React.useMemo(() => {
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

		return { sortedGroupNames: finalSortedGroups, groups };
	}, [options, groupOrder, ungroupedPosition]);

	return { sortedGroupNames, groups };
};
