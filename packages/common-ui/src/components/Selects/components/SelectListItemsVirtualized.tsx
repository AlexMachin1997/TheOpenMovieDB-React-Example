import * as React from 'react';
import { CommandVirtualizedList } from '~/components/Command/components/CommandVirtualizedList';
import { ICommandVirtualizedList } from '~/components/Command/types';

export const SelectListItemsVirtualized = React.memo(({ ...props }: ICommandVirtualizedList) => {
	return <CommandVirtualizedList {...props} />;
});

SelectListItemsVirtualized.displayName = 'SelectListItemsVirtualized';
