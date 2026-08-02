import * as React from 'react';
import { CommandList } from '~/components/Command/components/CommandList';
import { CommandSeparator } from '~/components/Command/components/CommandSeparator';
import { CommandGroup } from '~/components/Command/components/CommandGroup';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { useCommandGroupedOptions } from '~/components/Command/hooks/useCommandGroupedOptions';
import { ICommandGroupedList } from '~/components/Command/types';

export const CommandGroupedList = React.memo(function CommandGroupedList({
	children,
	className,
	groupOrder,
	ungroupedPosition = 'top'
}: ICommandGroupedList) {
	const { filteredOptions } = useCommandContext();

	// Group and sort options via the shared, memoized grouping logic
	const { groups, sortedGroups } = useCommandGroupedOptions(filteredOptions, {
		groupOrder,
		ungroupedPosition
	});

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
