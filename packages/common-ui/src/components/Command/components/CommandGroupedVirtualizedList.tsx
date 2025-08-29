import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CommandList } from '~/components/Command/components/CommandList';
import { CommandGroup } from '~/components/Command/components/CommandGroup';
import { CommandSeparator } from '~/components/Command/components/CommandSeparator';
import { Option } from '~/types/Option';
import { VirtualizedItem } from '~/components/Command/types/virtualized-item';
import { getVirtualizedItems, getEstimatedItemHeight } from '~/components/Command/utils/grouping';

export interface CommandGroupedVirtualizedListProps<T extends Option = Option> {
	options: T[];
	children: (props: { item: T }) => React.ReactNode;
	estimateSize?: number;
	overscan?: number;
	className?: string;
	groupOrder?: string[];
	ungroupedPosition?: 'top' | 'bottom';
}

export const CommandGroupedVirtualizedList = React.memo(
	<T extends Option>({
		options,
		children,
		estimateSize = 36,
		overscan = 5,
		className,
		groupOrder,
		ungroupedPosition = 'top'
	}: CommandGroupedVirtualizedListProps<T>) => {
		const parentRef = React.useRef<HTMLDivElement>(null);

		const virtualizedItems = React.useMemo(
			() =>
				getVirtualizedItems<T>({
					options,
					groupOrder,
					ungroupedPosition
				}),
			[options, groupOrder, ungroupedPosition]
		);

		const virtualizer = useVirtualizer({
			count: virtualizedItems.length,
			getScrollElement: () => parentRef.current,
			estimateSize: React.useCallback(
				(index: number) => getEstimatedItemHeight(virtualizedItems[index], estimateSize),
				[virtualizedItems, estimateSize]
			),
			overscan
		});

		const renderGroupedListItem = React.useCallback(
			(virtualItem: VirtualizedItem<T>) => {
				switch (virtualItem.type) {
					case 'separator':
						return <CommandSeparator />;

					case 'group-header':
						return <CommandGroup heading={virtualItem.groupName} />;

					case 'option':
						return children({
							item: virtualItem.option
						});

					default:
						return null;
				}
			},
			[children]
		);

		return (
			<CommandList className={className} ref={parentRef}>
				<div
					style={{
						height: `${virtualizer.getTotalSize()}px`,
						width: '100%',
						position: 'relative'
					}}
				>
					{virtualizer.getVirtualItems().map((virtualRow) => {
						const item = virtualizedItems.at(virtualRow.index);

						if (!item) return null;

						return (
							<div
								key={virtualRow.key}
								ref={virtualizer.measureElement}
								data-index={virtualRow.index}
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									minWidth: 0,
									transform: `translateY(${virtualRow.start}px)`
								}}
							>
								{renderGroupedListItem(item)}
							</div>
						);
					})}
				</div>
			</CommandList>
		);
	}
);

CommandGroupedVirtualizedList.displayName = 'CommandGroupedVirtualizedList';
