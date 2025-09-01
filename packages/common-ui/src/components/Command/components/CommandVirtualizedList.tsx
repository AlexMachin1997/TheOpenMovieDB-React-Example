import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CommandList } from '~/components/Command/components/CommandList';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { ICommandVirtualizedListProps } from '~/components/Command/types';
import { cn } from '~/utils/className';

export const CommandVirtualizedList = React.memo(
	({
		className,
		children,
		estimateSize = 36,
		overscan = 5,
		maxHeight = '300px'
	}: ICommandVirtualizedListProps) => {
		const { filteredOptions } = useCommandContext();
		const parentRef = React.useRef<HTMLDivElement>(null);

		const virtualizer = useVirtualizer({
			count: filteredOptions.length,
			getScrollElement: () => parentRef.current,
			estimateSize: React.useCallback(() => estimateSize, [estimateSize]),
			overscan
		});

		return (
			<CommandList
				className={cn(className, 'overflow-y-auto')}
				ref={parentRef}
				style={{ maxHeight }}
			>
				<div
					style={{
						height: `${virtualizer.getTotalSize()}px`,
						width: '100%',
						position: 'relative'
					}}
				>
					{virtualizer.getVirtualItems().map((virtualRow) => {
						const item = filteredOptions[virtualRow.index];

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
								{children({
									item,
									index: virtualRow.index
								})}
							</div>
						);
					})}
				</div>
			</CommandList>
		);
	}
);

CommandVirtualizedList.displayName = 'CommandVirtualizedList';
