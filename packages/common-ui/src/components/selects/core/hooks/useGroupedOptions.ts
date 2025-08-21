import * as React from 'react';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';
import { Option } from '~/types/Option';

export const useGroupedOptions = <T extends Option = Option>({
	groupOrder = [],
	ungroupedPosition = 'top'
}: {
	groupOrder?: string[];
	ungroupedPosition?: 'top' | 'bottom' | undefined;
}) => {
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
