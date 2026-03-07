import { memo } from 'react';
import { RenderFunction, VirtualizedItem } from '../types';
import { CommandGroup } from './CommandGroup';
import { CommandSeparator } from './CommandSeparator';

export const CommandGroupedListItem = memo(
	({ item, children }: { item: VirtualizedItem; children: RenderFunction }) => {
		switch (item.type) {
			case 'separator':
				return <CommandSeparator />;
			case 'group-header':
				return <CommandGroup heading={item.groupName} />;
			case 'option':
				return children({ item: item.option });
			default:
				return null;
		}
	}
);

CommandGroupedListItem.displayName = 'CommandGroupedListItem';
