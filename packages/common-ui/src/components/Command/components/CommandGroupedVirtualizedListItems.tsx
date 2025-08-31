import * as React from 'react';
import { CommandGroupedVirtualizedList } from '~/components/Command/components/CommandGroupedVirtualizedList';
import { IGroupedVirtualizedListProps } from '~/components/Command/types';

export const CommandGroupedVirtualizedListItems = React.memo(
	({ children, ...props }: IGroupedVirtualizedListProps) => {
		return (
			<CommandGroupedVirtualizedList {...props}>
				{({ item }) => children({ item })}
			</CommandGroupedVirtualizedList>
		);
	}
);

CommandGroupedVirtualizedListItems.displayName = 'CommandGroupedVirtualizedListItems';
