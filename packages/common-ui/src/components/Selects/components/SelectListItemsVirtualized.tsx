import * as React from 'react';
import { CommandList } from '~/components/Command/Command';
import { VirtualizedList } from '~/components/Command/components/VirtualizedList';
import { Option } from '~/types/Option';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';

export interface SelectVirtualizedListProps<T extends Option = Option> {
	estimateSize?: number;
	overscan?: number;
	children: (props: { item: T; style: React.CSSProperties }) => React.ReactNode;
	className?: string;
}

export const SelectVirtualizedList = React.memo(
	<T extends Option>({
		estimateSize = 36,
		overscan = 5,
		children,
		className
	}: SelectVirtualizedListProps<T>) => {
		const { filteredOptions } = useSelectContext();
		const items = filteredOptions as T[];

		return (
			<CommandList className={className}>
				<VirtualizedList items={items} estimateSize={estimateSize} overscan={overscan}>
					{({ item, style }) => children({ item, style })}
				</VirtualizedList>
			</CommandList>
		);
	}
);

SelectVirtualizedList.displayName = 'SelectVirtualizedList';
