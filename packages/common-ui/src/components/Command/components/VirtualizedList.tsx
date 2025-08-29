import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '~/utils/className';

export interface VirtualizedListProps<T = unknown> {
	items: T[];
	estimateSize?: number;
	overscan?: number;
	maxHeight?: string;
	className?: string;
	children: (props: { item: T; style: React.CSSProperties; index: number }) => React.ReactNode;
}

const VirtualizedListComponent = <T = unknown,>({
	items,
	estimateSize = 36,
	overscan = 5,
	maxHeight = '300px',
	className,
	children
}: VirtualizedListProps<T>) => {
	const parentRef = React.useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: items.length,
		getScrollElement: () => parentRef.current,
		estimateSize: React.useCallback(() => estimateSize, [estimateSize]),
		overscan
	});

	return (
		<div ref={parentRef} className={cn('overflow-y-auto', className)} style={{ maxHeight }}>
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
							item: items[virtualRow.index]!,
							style: {
								minHeight: virtualRow.size,
								width: '100%'
							},
							index: virtualRow.index
						})}
					</div>
				))}
			</div>
		</div>
	);
};

export const VirtualizedList = React.memo(VirtualizedListComponent) as <T = unknown>(
	props: VirtualizedListProps<T>
) => React.ReactElement;
