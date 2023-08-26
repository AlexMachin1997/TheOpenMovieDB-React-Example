import * as React from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';
import { Listbox as HeadlessUIListbox } from '@headlessui/react';
import classNames from 'classnames';
import { VirtualizedListProps } from '../../../types/DropdownElementTypes';
import Icon from '../Icon/Icon';

const ListboxOptions = React.memo(
	({ options, noOptionsAvailableMessage, isMultiSelect, truncateText }: VirtualizedListProps) => {
		// This will store the reference to the options list (Wrapper for the options)
		const optionsRef = React.useRef<HTMLDivElement>(null);

		// Virtualize the List, improves the performance for bigger lists e.g. 250 countries being rendered.
		const rowVirtualizer = useVirtualizer({
			count: options?.length ?? 0,
			getScrollElement: () => optionsRef.current,
			estimateSize: React.useCallback(() => 35, []),
			overscan: 5
		});

		return (
			<div ref={optionsRef}>
				{/* When there are no options and the query is empty render the no options available block */}
				{rowVirtualizer.getVirtualItems().length === 0 && (
					<HeadlessUIListbox.Option
						disabled
						aria-disabled
						className='cursor-default select-none py-2 pl-3 text-gray-700'
						value=''
					>
						{noOptionsAvailableMessage}
					</HeadlessUIListbox.Option>
				)}

				{/* When there no options and the query isn't empty render the add item block */}
				{rowVirtualizer.getVirtualItems().length > 0 && (
					<div
						style={{
							height: `${rowVirtualizer.getTotalSize()}px`,
							width: '100%',
							position: 'relative'
						}}
					>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							// Get the current option
							const option = options?.at(virtualRow.index);

							// The unique react key value, a combination of the label and index to prevent duplicate labels from erroring
							const key = `${option?.label}-${virtualRow.index}`;

							return (
								<HeadlessUIListbox.Option
									key={key}
									className={({ active }) =>
										classNames('cursor-default select-none py-2 pr-4', {
											'bg-secondary text-white': active === true,
											'text-gray-900': active === false,
											'pl-10': isMultiSelect === true,
											'pl-3': isMultiSelect === false
										})
									}
									data-index={key}
									ref={rowVirtualizer.measureElement}
									value={option}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										transform: `translateY(${virtualRow.start}px)`
									}}
								>
									{({ selected, active }) => (
										<>
											<span
												className={classNames({
													'font-bold': selected === true,
													'font-normal': selected === false,
													truncate: truncateText === true
												})}
											>
												{option?.label}
											</span>

											{selected === true && isMultiSelect === true && (
												<span
													className={classNames(
														'absolute inset-y-0 left-0 flex items-center pl-3',
														{
															'text-white': active === true,
															'text-teal-600': active === false
														}
													)}
												>
													<Icon className='fa-solid fa-check' aria-hidden='true' />
												</span>
											)}
										</>
									)}
								</HeadlessUIListbox.Option>
							);
						})}
					</div>
				)}
			</div>
		);
	}
);

export default ListboxOptions;
