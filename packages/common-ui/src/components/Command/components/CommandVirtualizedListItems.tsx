import * as React from 'react';
import { CommandVirtualizedList } from '~/components/Command/components/CommandVirtualizedList';
import { ICommandVirtualizedListProps } from '~/components/Command/types';

export const CommandVirtualizedListItems = React.memo(
	({ children, ...props }: ICommandVirtualizedListProps) => {
		return (
			<CommandVirtualizedList {...props}>
				{({ item, index }) => children({ item, index })}
			</CommandVirtualizedList>
		);
	}
);

CommandVirtualizedListItems.displayName = 'CommandVirtualizedListItems';
