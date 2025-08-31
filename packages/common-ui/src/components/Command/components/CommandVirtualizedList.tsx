import * as React from 'react';
import { CommandList } from '~/components/Command/components/CommandList';
import { VirtualizedList } from '~/components/Command/components/VirtualizedList';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { ICommandVirtualizedListProps } from '~/components/Command/types';

export const CommandVirtualizedList = React.memo(
	({ estimateSize = 36, overscan = 5, children, className }: ICommandVirtualizedListProps) => {
		const { filteredOptions } = useCommandContext();

		return (
			<CommandList className={className}>
				<VirtualizedList items={filteredOptions} estimateSize={estimateSize} overscan={overscan}>
					{({ item, index }) => children({ item, index })}
				</VirtualizedList>
			</CommandList>
		);
	}
);

CommandVirtualizedList.displayName = 'CommandVirtualizedList';
