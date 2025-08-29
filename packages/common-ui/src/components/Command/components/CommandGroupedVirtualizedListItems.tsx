import * as React from 'react';
import { CommandGroupedVirtualizedList } from '~/components/Command/components/CommandGroupedVirtualizedList';
import { Option } from '~/types/Option';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

export interface CommandGroupedVirtualizedListItemsProps<T extends Option = Option> {
	children: (props: { item: T }) => React.ReactNode;
	estimateSize?: number;
	overscan?: number;
	className?: string;
	groupOrder?: string[];
	ungroupedPosition?: 'top' | 'bottom';
}

export const CommandGroupedVirtualizedListItems = React.memo(
	<T extends Option>({
		children,
		estimateSize = 36,
		overscan = 5,
		className,
		groupOrder,
		ungroupedPosition = 'top'
	}: CommandGroupedVirtualizedListItemsProps<T>) => {
		const { filteredOptions } = useCommandContext();

		return (
			<CommandGroupedVirtualizedList
				options={filteredOptions}
				estimateSize={estimateSize}
				overscan={overscan}
				className={className}
				groupOrder={groupOrder}
				ungroupedPosition={ungroupedPosition}
			>
				{({ item }) => children({ item: item as T })}
			</CommandGroupedVirtualizedList>
		);
	}
);

CommandGroupedVirtualizedListItems.displayName = 'CommandGroupedVirtualizedListItems';
