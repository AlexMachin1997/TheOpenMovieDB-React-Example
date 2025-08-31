import * as React from 'react';
import { CommandGroupedList } from '~/components/Command/components/CommandGroupedList';
import { IGroupedListProps } from '~/components/Command/types';

export const CommandGroupedListItems = React.memo(({ children, ...props }: IGroupedListProps) => {
	return <CommandGroupedList {...props}>{({ item }) => children({ item })}</CommandGroupedList>;
});

CommandGroupedListItems.displayName = 'CommandGroupedListItems';
