import * as React from 'react';
import { CommandGroupedVirtualizedList, ICommandGroupedVirtualizedList } from '@repo/ui-command';

export const SelectGroupedItemsVirtualized = React.memo(
	({ children, ...props }: ICommandGroupedVirtualizedList) => {
		return (
			<CommandGroupedVirtualizedList {...props}>
				{({ item }) => children({ item: item })}
			</CommandGroupedVirtualizedList>
		);
	}
);

SelectGroupedItemsVirtualized.displayName = 'SelectGroupedItemsVirtualized';
