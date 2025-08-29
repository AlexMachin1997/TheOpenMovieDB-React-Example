import * as React from 'react';
import { CommandList } from '~/components/Command/components/CommandList';
import { VirtualizedList } from '~/components/Command/components/VirtualizedList';
import { Option } from '~/types/Option';

export interface CommandVirtualizedListProps<T extends Option = Option> {
	options: T[];
	estimateSize?: number;
	overscan?: number;
	children: (props: { item: T; style: React.CSSProperties }) => React.ReactNode;
	className?: string;
}

export const CommandVirtualizedList = React.memo(
	<T extends Option>({
		options,
		estimateSize = 36,
		overscan = 5,
		children,
		className
	}: CommandVirtualizedListProps<T>) => {
		return (
			<CommandList className={className}>
				<VirtualizedList items={options} estimateSize={estimateSize} overscan={overscan}>
					{({ item, style }) => children({ item, style })}
				</VirtualizedList>
			</CommandList>
		);
	}
);

CommandVirtualizedList.displayName = 'CommandVirtualizedList';
