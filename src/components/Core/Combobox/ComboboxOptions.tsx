import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Combobox as HeadlessUICombobox } from '@headlessui/react';

import classNames from 'classnames';
import { ComboboxVirtualizedProps } from '../../../types/DropdownElementTypes';
import Icon from '../Icon/Icon';

const ComboboxOptions = React.memo(
	({
		options,
		query,
		noOptionsAvailableMessage,
		canAddCustomItems,
		noOptionsForSearchTermMessage,
		isMultiSelect
	}: ComboboxVirtualizedProps) => {
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
				{rowVirtualizer.getVirtualItems().length === 0 && query === '' && (
					<HeadlessUICombobox.Option
						disabled
						aria-disabled
						className='relative cursor-default select-none py-2 pl-3 text-gray-700'
						value={null}
					>
						{noOptionsAvailableMessage}
					</HeadlessUICombobox.Option>
				)}

				{/* When there are no options and the query isn't empty render the empty search result block  */}
				{rowVirtualizer.getVirtualItems().length === 0 &&
					query !== '' &&
					canAddCustomItems === false && (
						<HeadlessUICombobox.Option
							disabled
							aria-disabled
							className='relative cursor-default select-none py-2 pl-3 text-gray-700'
							value={null}
						>
							{noOptionsForSearchTermMessage}
						</HeadlessUICombobox.Option>
					)}

				{/* When there no options and the query isn't empty render the add item block */}
				{rowVirtualizer.getVirtualItems().length === 0 &&
					query !== '' &&
					canAddCustomItems === true && (
						<HeadlessUICombobox.Option
							className='relative cursor-default select-none bg-teal-600 py-2 pl-10 pr-4 text-gray-900'
							value={{ label: query, value: query }}
						>
							<span className='block truncate font-medium'>
								Click to add <strong>{query}</strong> as an option.
							</span>
						</HeadlessUICombobox.Option>
					)}

				{/* When there are options render the options render the list of options */}
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
								<HeadlessUICombobox.Option
									key={key}
									className={({ active }) =>
										classNames('relative cursor-default select-none py-2 pr-4', {
											'bg-teal-600 text-white': active === true,
											'text-gray-900': active === false,
											'pl-10': isMultiSelect === true,
											'pl-3': isMultiSelect === false
										})
									}
									value={option}
									data-index={key}
									ref={rowVirtualizer.measureElement}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: `${virtualRow.size}px`,
										transform: `translateY(${virtualRow.start}px)`
									}}
								>
									{({ selected, active }) => (
										<div>
											<span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
												{option?.label}
											</span>

											{selected === true && isMultiSelect === true && (
												<span
													className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
														active ? 'text-white' : 'text-teal-600'
													}`}
												>
													<Icon className='fa-solid fa-check' aria-hidden='true' />
												</span>
											)}
										</div>
									)}
								</HeadlessUICombobox.Option>
							);
						})}
					</div>
				)}
			</div>
		);
	}
);

export default ComboboxOptions;
