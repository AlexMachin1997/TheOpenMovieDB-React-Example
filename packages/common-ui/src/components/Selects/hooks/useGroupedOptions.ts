import * as React from 'react';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';
import { Option } from '~/types/Option';

/**
 * Configuration options for grouping behavior
 *
 * @interface GroupedOptionsConfig
 */
interface GroupedOptionsConfig {
	/** Array of group names defining the order in which groups should appear */
	groupOrder?: string[];
	/** Position for ungrouped items relative to grouped items */
	ungroupedPosition?: 'top' | 'bottom' | undefined;
}

/**
 * Hook to organize select options into groups with configurable ordering
 *
 * This hook processes the filtered options from the select context and
 * organizes them into groups based on their group property. It provides
 * flexible configuration for group ordering and positioning of ungrouped items.
 *
 * Features:
 * - Automatic grouping of options based on their group property
 * - Configurable group ordering through groupOrder array
 * - Flexible positioning of ungrouped items (top/bottom)
 * - Efficient memoization of grouped and sorted results
 * - Integration with select context for filtered options
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
 * @param config - Configuration for grouping behavior
 * @returns Object containing sortedGroups and groups
 *
 * @example
 * ```tsx
 * const { sortedGroups, groups } = useGroupedOptions({
 *   groupOrder: ['Frameworks', 'Libraries', 'Tools'],
 *   ungroupedPosition: 'bottom'
 * });
 *
 * // Render grouped options
 * sortedGroups.forEach(groupName => {
 *   const groupOptions = groups.get(groupName) || [];
 *   return (
 *     <SelectGroup key={groupName} heading={groupName}>
 *       {groupOptions.map(option => (
 *         <SelectListItem key={option.value} value={option.value} />
 *       ))}
 *     </SelectGroup>
 *   );
 * });
 * ```
 */
export const useGroupedOptions = <T extends Option = Option>({
	groupOrder = [],
	ungroupedPosition = 'top'
}: GroupedOptionsConfig) => {
	const { filteredOptions } = useSelectContext();

	const groups = React.useMemo(() => {
		const groups = new Map<string | undefined, T[]>();

		filteredOptions.forEach((option) => {
			const group = (option as T).group;
			if (!groups.has(group)) {
				groups.set(group, []);
			}

			groups.get(group)!.push(option as T);
		});

		return groups;
	}, [filteredOptions]);

	const sortedGroups = React.useMemo(() => {
		const groupNames = Array.from(groups.keys());
		const definedGroups = groupNames.filter((name) => name !== undefined) as string[];
		const hasUngrouped = groupNames.includes(undefined);

		const sortedGroups = groupOrder
			? [
					...groupOrder.filter((name) => definedGroups.includes(name)),
					...definedGroups.filter((name) => !groupOrder.includes(name)).sort()
				]
			: definedGroups.sort();

		if (hasUngrouped) {
			return ungroupedPosition === 'top'
				? [undefined, ...sortedGroups]
				: [...sortedGroups, undefined];
		}

		return sortedGroups;
	}, [groups, groupOrder, ungroupedPosition]);

	return {
		sortedGroups,
		groups
	};
};
