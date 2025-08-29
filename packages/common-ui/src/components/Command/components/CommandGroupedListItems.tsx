import * as React from 'react';
import { CommandGroupedList } from '~/components/Command/components/CommandGroupedList';
import { Option } from '~/types/Option';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

export interface CommandGroupedListItemsProps<T extends Option = Option> {
	children: (props: { item: T }) => React.ReactNode;
	className?: string;
	groupOrder?: string[];
	ungroupedPosition?: 'top' | 'bottom';
}

export const CommandGroupedListItems = React.memo(
	<T extends Option>({
		children,
		className,
		groupOrder,
		ungroupedPosition = 'top'
	}: CommandGroupedListItemsProps<T>) => {
		const { filteredOptions } = useCommandContext();

		return (
			<CommandGroupedList
				options={filteredOptions}
				className={className}
				groupOrder={groupOrder}
				ungroupedPosition={ungroupedPosition}
			>
				{({ item }) => children({ item: item as T })}
			</CommandGroupedList>
		);
	}
);

CommandGroupedListItems.displayName = 'CommandGroupedListItems';
