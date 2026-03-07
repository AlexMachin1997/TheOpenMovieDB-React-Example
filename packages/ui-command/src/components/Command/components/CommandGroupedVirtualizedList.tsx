import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CommandList } from '~/components/Command/components/CommandList';
import { getVirtualizedItems, getEstimatedItemHeight } from '~/components/Command/utils/grouping';
import { ICommandGroupedVirtualizedList } from '~/components/Command/types';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { CommandGroupedListItem } from './CommandGroupedListItem';

export const CommandGroupedVirtualizedList = React.memo(
	({
		children,
		estimateSize = 36,
		overscan = 5,
		className,
		groupOrder,
		ungroupedPosition = 'top'
	}: ICommandGroupedVirtualizedList) => {
		const { filteredOptions } = useCommandContext();
		const parentRef = React.useRef<HTMLDivElement>(null);

		const virtualizedItems = React.useMemo(
			() =>
				getVirtualizedItems({
					options: filteredOptions,
					groupOrder,
					ungroupedPosition
				}),
			[filteredOptions, groupOrder, ungroupedPosition]
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
								className='absolute top-0 left-0 w-full min-w-0'
								style={{
									transform: `translateY(${virtualRow.start}px)`
								}}
							>
								<CommandGroupedListItem item={item}>{children}</CommandGroupedListItem>
							</div>
						);
					})}
				</div>
			</CommandList>
		);
	}
);

CommandGroupedVirtualizedList.displayName = 'CommandGroupedVirtualizedList';
