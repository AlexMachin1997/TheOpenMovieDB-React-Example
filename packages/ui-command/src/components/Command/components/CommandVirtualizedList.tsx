import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { useCommandScrollElement } from '~/components/Command/hooks/useCommandScrollElement';
import { useResetScrollOnSearch } from '~/components/Command/hooks/useResetScrollOnSearch';
import { ICommandVirtualizedList } from '~/components/Command/types';

export const CommandVirtualizedList = React.memo(
	({ className, children, estimateSize = 36, overscan = 5 }: ICommandVirtualizedList) => {
		const { filteredOptions, searchValue } = useCommandContext();
		const sizerRef = React.useRef<HTMLDivElement>(null);

		// Must be declared before useVirtualizer — see the hook's JSDoc
		const getScrollElement = useCommandScrollElement(sizerRef);

		const virtualizer = useVirtualizer({
			count: filteredOptions.length,
			getScrollElement,
			estimateSize: React.useCallback(() => estimateSize, [estimateSize]),
			overscan
		});

		useResetScrollOnSearch(virtualizer, searchValue);

		return (
			<div
				ref={sizerRef}
				className={className}
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
		);
	}
);

CommandVirtualizedList.displayName = 'CommandVirtualizedList';
