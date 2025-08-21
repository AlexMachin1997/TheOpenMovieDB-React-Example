import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CommandList } from '~/components/command/command';
import { Option } from '~/types/Option';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';

export interface SelectVirtualizedListProps<T extends Option = Option> {
	estimateSize?: number;
	overscan?: number;
	children: (props: { item: T; style: React.CSSProperties }) => React.ReactNode;
	className?: string;
}

export const SelectVirtualizedList = React.memo(
	<T extends Option>({
		estimateSize = 36,
		overscan = 5,
		children,
		className
	}: SelectVirtualizedListProps<T>) => {
		const { filteredOptions } = useSelectContext();
		const items = filteredOptions as T[];
		const parentRef = React.useRef<HTMLDivElement>(null);

		const virtualizer = useVirtualizer({
			count: items.length,
			getScrollElement: () => parentRef.current,
			estimateSize: React.useCallback(() => estimateSize, [estimateSize]),
			overscan
		});

		return (
			<CommandList className={className}>
				<div ref={parentRef} className='max-h-[300px] overflow-y-auto'>
					<div
						style={{
							height: `${virtualizer.getTotalSize()}px`,
							width: '100%',
							position: 'relative'
						}}
					>
						{virtualizer.getVirtualItems().map((virtualRow) => (
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
								{children({
									item: items.at(virtualRow.index)!,
									style: {
										minHeight: virtualRow.size,
										width: '100%'
									}
								})}
							</div>
						))}
					</div>
				</div>
			</CommandList>
		);
	}
);

SelectVirtualizedList.displayName = 'SelectVirtualizedList';
