import * as React from 'react';
import { CommandList } from '~/components/command/command';
import { Option } from '~/types/Option';
import { SelectSeparator } from '~/components/selects/core/components/select-seperator';
import { SelectGroup } from '~/components/selects/core/components/select-group';
import { useGroupedOptions } from '~/components/selects/core/hooks/useGroupedOptions';
import { SelectItemsRenderer } from '~/components/selects/core/components/select-items-renderer';

export interface SelectGroupedListItemsProps<T extends Option = Option> {
	children: (props: { item: T }) => React.ReactNode;
	className?: string;
	/** Order of groups to display. If not provided, groups will be sorted alphabetically */
	groupOrder?: string[];
	/** Whether to show ungrouped items at the top or bottom. Default: 'top' */
	ungroupedPosition?: 'top' | 'bottom';
}

export const SelectGroupedListItems = React.memo(
	<T extends Option>({
		children,
		className,
		groupOrder,
		ungroupedPosition = 'top'
	}: SelectGroupedListItemsProps<T>) => {
		const { groups, sortedGroups } = useGroupedOptions<T>({
			groupOrder,
			ungroupedPosition
		});

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
								{index > 0 && <SelectSeparator />}
								<SelectItemsRenderer items={groupItems}>
									{({ item }) => children({ item: item as T })}
								</SelectItemsRenderer>
							</React.Fragment>
						);
					}

					// Render grouped items
					return (
						<React.Fragment key={groupName}>
							{index > 0 && <SelectSeparator />}
							<SelectGroup heading={groupName}>
								<SelectItemsRenderer items={groupItems}>
									{({ item }) => children({ item: item as T })}
								</SelectItemsRenderer>
							</SelectGroup>
						</React.Fragment>
					);
				})}
			</CommandList>
		);
	}
);

SelectGroupedListItems.displayName = 'SelectGroupedListItems';
