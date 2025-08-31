import * as React from 'react';
import { CommandVirtualizedList } from '~/components/Command/components/CommandVirtualizedList';
import { ICommandVirtualizedListProps } from '~/components/Command/types';

export const SelectListItemsVirtualized = React.memo(
	({ ...props }: ICommandVirtualizedListProps) => {
		return <CommandVirtualizedList {...props} />;
	}
);

SelectListItemsVirtualized.displayName = 'SelectListItemsVirtualized';
