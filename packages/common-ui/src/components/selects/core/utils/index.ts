import { Option } from '~/types/Option';

export interface GroupedOptions<T extends Option = Option> {
	groups: Map<string | undefined, T[]>;
	sortedGroupNames: (string | undefined)[];
}

export interface GroupOptionsParams {
	options: Option[];
	groupOrder?: string[];
	ungroupedPosition?: 'top' | 'bottom';
}

export type VirtualizedItem =
	| { type: 'separator'; id: string }
	| { type: 'group-header'; id: string; groupName: string }
	| { type: 'option'; id: string; option: Option };

/**
 * Groups options by their group property and returns sorted group names
 */
const groupOptions = <T extends Option = Option>({
	options,
	groupOrder,
	ungroupedPosition = 'top'
}: GroupOptionsParams): GroupedOptions<T> => {
	// Group options by their group property
	const groups = new Map<string | undefined, T[]>();

	// Safety check
	if (!options || !Array.isArray(options)) {
		return { groups, sortedGroupNames: [] };
	}

	options.forEach((option) => {
		const group = (option as T).group;
		if (!groups.has(group)) {
			groups.set(group, []);
		}
		groups.get(group)!.push(option as T);
	});

	// Get sorted group names
	const groupNames = Array.from(groups.keys());
	const definedGroups = groupNames.filter((name) => name !== undefined) as string[];
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

	return { groups, sortedGroupNames };
};

/**
 * Creates a flat array of virtualized items from grouped options
 * Includes separators, group headers, and options in the correct order
 */
export const virtualizeGroupedOptions = <T extends Option = Option>(
	params: GroupOptionsParams
): VirtualizedItem[] => {
	const items: VirtualizedItem[] = [];
	const { groups, sortedGroupNames } = groupOptions<T>(params);

	// Build flat item list for virtualization
	sortedGroupNames.forEach((groupName, groupIndex) => {
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
export const estimateVirtualizedItemSize = (
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
