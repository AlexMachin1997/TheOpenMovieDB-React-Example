import * as React from 'react';
import { CommandGroupedVirtualizedList } from '~/components/Command/components/CommandGroupedVirtualizedList';
import { ICommandGroupedVirtualizedList } from '~/components/Command/types';

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
