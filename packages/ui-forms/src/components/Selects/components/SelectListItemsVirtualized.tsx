import * as React from 'react';
import { CommandVirtualizedList, ICommandVirtualizedList } from '@repo/ui-command';

export const SelectListItemsVirtualized = React.memo(({ ...props }: ICommandVirtualizedList) => {
	return <CommandVirtualizedList {...props} />;
});

SelectListItemsVirtualized.displayName = 'SelectListItemsVirtualized';
