import * as React from 'react';
import { CommandList } from '~/components/Command/components/CommandList';
import { CommandSeparator } from '~/components/Command/components/CommandSeparator';
import { CommandGroup } from '~/components/Command/components/CommandGroup';
import { Option } from '~/types/Option';

export interface CommandGroupedListProps<T extends Option = Option> {
	options: T[];
	children: (props: { item: T }) => React.ReactNode;
	className?: string;
	/** Order of groups to display. If not provided, groups will be sorted alphabetically */
	groupOrder?: string[];
	/** Whether to show ungrouped items at the top or bottom. Default: 'top' */
	ungroupedPosition?: 'top' | 'bottom';
}

export const CommandGroupedList = React.memo(
	<T extends Option>({
		options,
		children,
		className,
		groupOrder,
		ungroupedPosition = 'top'
	}: CommandGroupedListProps<T>) => {
		const groups = React.useMemo(() => {
			const groups = new Map<string | undefined, T[]>();

			options.forEach((option) => {
				const group = option.group;
				if (!groups.has(group)) {
					groups.set(group, []);
				}

				groups.get(group)!.push(option);
			});

			return groups;
		}, [options]);

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

		if (groups.size === 0) return <CommandList className={className} />;

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
	}
);

CommandGroupedList.displayName = 'CommandGroupedList';
