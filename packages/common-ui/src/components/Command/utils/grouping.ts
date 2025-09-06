import { Option } from '~/types/Option';
import { IGroupedOptions, IGroupOptionsParams } from '~/components/Command/types';
import { VirtualizedItem } from '~/components/Command/types';

/**
 * Groups options by their group property and sorts them according to the specified order
 *
 * @param params - Parameters for grouping options
 * @returns Object containing grouped options and sorted group names
 */
export const groupOptions = ({
	options,
	groupOrder = [],
	ungroupedPosition = 'top'
}: IGroupOptionsParams): IGroupedOptions => {
	// Group options by their group property
	const groups = new Map<string | undefined, Option[]>();

	// Safety check
	if (!options || !Array.isArray(options)) {
		return { groups, sortedGroups: [] };
	}

	options.forEach((option) => {
		const group = option.group;
		if (!groups.has(group)) {
			groups.set(group, []);
		}
		groups.get(group)!.push(option);
	});

	// Get sorted group names
	const groupNames = Array.from(groups.keys());
	const definedGroups = groupNames.filter(Boolean);
	const hasUngrouped = groupNames.includes(undefined);

	// Sort defined groups
	const sortedGroups = groupOrder
		? [
				...groupOrder.filter((name) => definedGroups.includes(name)),
				...definedGroups.filter((name) => !groupOrder.includes(name)).sort()
			]
		: definedGroups.sort();

	// Add ungrouped items based on position preference
	const sortedGroupNames = hasUngrouped
		? ungroupedPosition === 'top'
			? [undefined, ...sortedGroups]
			: [...sortedGroups, undefined]
		: sortedGroups;

	return { groups, sortedGroups: sortedGroupNames };
};

/**
 * Creates a flat array of virtualized items from grouped options
 * Includes separators, group headers, and options in the correct order
 */
export const getVirtualizedItems = (params: IGroupOptionsParams): VirtualizedItem[] => {
	const items: VirtualizedItem[] = [];
	const { groups, sortedGroups } = groupOptions(params);

	// Build flat item list for virtualization
	sortedGroups.forEach((groupName: string | undefined, groupIndex: number) => {
		const groupItems = groups.get(groupName) || [];
		if (groupItems.length === 0) return;

		// Add separator before group (except first)
		if (groupIndex > 0) {
			items.push({
				type: 'separator',
				id: `separator-${groupName || 'ungrouped'}`
			});
		}

		// Add group header (only for named groups)
		if (groupName !== undefined) {
			items.push({
				type: 'group-header',
				id: `header-${groupName}`,
				groupName
			});
		}

		// Add group items
		groupItems.forEach((option) => {
			items.push({
				type: 'option',
				id: option.id,
				option
			});
		});
	});

	return items;
};

/**
 * Estimates the size of a virtualized item based on its type
 */
export const getEstimatedItemHeight = (
	item: VirtualizedItem | undefined,
	defaultOptionSize: number
): number => {
	switch (item?.type) {
		case 'separator':
			return 1; // Thin separator
		case 'group-header':
			return 32; // Group header height
		case 'option':
		default:
			return defaultOptionSize; // Option item height
	}
};
