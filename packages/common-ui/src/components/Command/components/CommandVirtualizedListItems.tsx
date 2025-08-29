import * as React from 'react';
import { CommandVirtualizedList } from '~/components/Command/components/CommandVirtualizedList';
import { Option } from '~/types/Option';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

export interface CommandVirtualizedListItemsProps<T extends Option = Option> {
	children: (props: { item: T; style: React.CSSProperties }) => React.ReactNode;
	estimateSize?: number;
	overscan?: number;
	className?: string;
}

export const CommandVirtualizedListItems = React.memo(
	<T extends Option>({
		children,
		estimateSize = 36,
		overscan = 5,
		className
	}: CommandVirtualizedListItemsProps<T>) => {
		const { filteredOptions } = useCommandContext();

		return (
			<CommandVirtualizedList
				options={filteredOptions}
				estimateSize={estimateSize}
				overscan={overscan}
				className={className}
			>
				{({ item, style }) => children({ item: item as T, style })}
			</CommandVirtualizedList>
		);
	}
);

CommandVirtualizedListItems.displayName = 'CommandVirtualizedListItems';
