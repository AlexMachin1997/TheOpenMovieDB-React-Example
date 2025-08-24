import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CommandList } from '~/components/command/command';
import { Option } from '~/types/Option';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';
import { SelectGroup } from '~/components/selects/core/components/select-group';
import { SelectSeparator } from '~/components/selects/core/components/select-seperator';
import { getVirtualizedItems, getEstimatedItemHeight } from '~/components/selects/core/utils/index';
import { VirtualizedItem } from '~/components/selects/core/types/virtualized-item';

export interface SelectVirtualizedGroupedListProps<T extends Option = Option> {
	children: (props: { item: T }) => React.ReactNode;
	estimateSize?: number;
	overscan?: number;
	className?: string;
	groupOrder?: string[];
	ungroupedPosition?: 'top' | 'bottom';
}

export const SelectVirtualizedGroupedList = React.memo(
	<T extends Option>({
		children,
		estimateSize = 36,
		overscan = 5,
		className,
		groupOrder,
		ungroupedPosition = 'top'
	}: SelectVirtualizedGroupedListProps<T>) => {
		const { filteredOptions } = useSelectContext();
		const parentRef = React.useRef<HTMLDivElement>(null);

		const virtualizedItems = React.useMemo(
			() =>
				getVirtualizedItems<T>({
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

		const renderGroupedListItem = React.useCallback(
			(virtualItem: VirtualizedItem) => {
				switch (virtualItem.type) {
					case 'separator':
						return <SelectSeparator />;

					case 'group-header':
						return <SelectGroup heading={virtualItem.groupName} />;

					case 'option':
						return children({
							item: virtualItem.option as T
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

SelectVirtualizedGroupedList.displayName = 'SelectVirtualizedGroupedList';
