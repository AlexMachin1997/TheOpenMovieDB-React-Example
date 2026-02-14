import * as React from 'react';
import { CommandList } from '~/components/Command/components/CommandList';
import { CommandSeparator } from '~/components/Command/components/CommandSeparator';
import { CommandGroup } from '~/components/Command/components/CommandGroup';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { ICommandGroupedList } from '~/components/Command/types';
import type { Option } from '@repo/core';

export const CommandGroupedList = React.memo(function CommandGroupedList({
	children,
	className,
	groupOrder,
	ungroupedPosition = 'top'
}: ICommandGroupedList) {
	const { filteredOptions } = useCommandContext();

	// Group and sort options in a single pass
	const { groups, sortedGroups } = React.useMemo(() => {
		const groups = new Map<string | undefined, Option[]>();

		filteredOptions.forEach((option) => {
			const group = option.group;
			if (!groups.has(group)) {
				groups.set(group, []);
			}
			groups.get(group)!.push(option);
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

		return { groups, sortedGroups: finalSortedGroups };
	}, [filteredOptions, groupOrder, ungroupedPosition]);

	return (
		<CommandList className={className}>
			{sortedGroups.map((groupName, index) => {
				const groupItems = groups.get(groupName) || [];

				if (groupItems.length === 0) return null;

				// Render ungrouped items without a group wrapper
				if (groupName === undefined) {
					return (
						<React.Fragment key='ungrouped'>
							{index > 0 && <CommandSeparator />}
							{groupItems.map((item) => (
								<React.Fragment key={item.id}>{children({ item })}</React.Fragment>
							))}
						</React.Fragment>
					);
				}

				// Render grouped items
				return (
					<React.Fragment key={groupName}>
						{index > 0 && <CommandSeparator />}
						<CommandGroup heading={groupName}>
							{groupItems.map((item) => (
								<React.Fragment key={item.id}>{children({ item })}</React.Fragment>
							))}
						</CommandGroup>
					</React.Fragment>
				);
			})}
		</CommandList>
	);
});

CommandGroupedList.displayName = 'CommandGroupedList';
