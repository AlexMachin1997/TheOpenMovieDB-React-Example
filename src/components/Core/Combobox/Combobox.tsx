/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { usePopper } from 'react-popper';

import { Combobox as HeadlessUICombobox, Transition } from '@headlessui/react';

import Icon from '../Icon/Icon';
import { ComboboxProps, ComboboxVirtualizedProps } from '../../../types/DropdownElementTypes';

const VirtualizedList = React.memo(
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
				{/* When there are no options and the query is empty */}
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

				{/* When there are no options and the query isn't empty */}
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

				{/* When there are options render the options */}
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

							return (
								<HeadlessUICombobox.Option
									key={`${option?.label}-${virtualRow.index}`}
									className={({ active }) =>
										classNames('relative cursor-default select-none py-2 pr-4', {
											'bg-teal-600 text-white': active === true,
											'text-gray-900': active === false,
											'pl-10': isMultiSelect === true,
											'pl-3': isMultiSelect === false
										})
									}
									value={option}
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

const Combobox = ({
	options = [],
	value = undefined,
	onChange = null,
	isMultiSelect = false,
	defaultQuery = '',
	canAddCustomItems = false,
	name,
	defaultValue = undefined,
	disabled = false,
	noOptionsForSearchTermMessage = 'No options available for your current search term.',
	noOptionsAvailableMessage = 'No options currently available.',
	flipIconPosition = false,
	containerClassName = ''
}: ComboboxProps) => {
	// Stores the current search term applied to the Combobox
	const [query, setQuery] = React.useState(defaultQuery);

	const [referenceElement, setReferenceElement] = React.useState<HTMLElement>();
	const [popperElement, setPopperElement] = React.useState<HTMLDivElement>();
	const containerRef = React.useRef<HTMLDivElement | null>(null);

	// Used to calculate the offset for the usePopper hook which provides the menu placement functionality, used to switch between top or bottom for the menu
	const offset = React.useCallback(() => {
		// Get the height of the dropdown container (Used to determine how much distance should be applied to the offset)
		const dropdownContainerHeight = containerRef?.current?.getBoundingClientRect()?.height ?? 0;

		// Skidding reference: https://popper.js.org/docs/v2/modifiers/offset/#skidding-1
		const skidding = 0;

		// Distance reference: https://popper.js.org/docs/v2/modifiers/offset/#distance-1
		// When using multiple make sure to use slightly increased distance to account for the custom output otherwise default to 25 distance
		const distance = dropdownContainerHeight / 2;

		// When the placement is anything else ie top set the distance to 25
		// NOTE: Force typescript to read these as numbers, when you use a static value is reads it as the literal value which is undesired
		return [skidding, distance] as [number, number];
	}, []);

	// Used to place the menu either on the top or bottom of the Listbox button
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers: [
			{
				name: 'flip',
				options: {
					// Switch between top and bottom for the position of the element
					fallbackPlacements: ['top', 'bottom']
				}
			},
			{
				name: 'offset',
				options: {
					// Calculate the offset for the popper, comes down to current placement and if the dropdown is multi-select or not
					offset
				}
			},
			{
				name: 'computeStyles',
				options: {
					// By setting gpuAcceleration to false Popper will use top/left properties with the position: absolute and not transform translate3d
					gpuAcceleration: false // true by default
				}
			}
		]
	});

	// Filter the options based on the current search term.
	const filteredOptions = React.useMemo(() => {
		// When there is no query available ie when the component loads just return the options
		if (query === '') {
			return options;
		}

		// Attempt to filter the options down to the selected value
		return options.filter((option) =>
			option.label
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(query.toLowerCase().replace(/\s+/g, ''))
		);
	}, [options, query]);

	return (
		<HeadlessUICombobox
			value={value}
			onChange={(dropdownValue) => {
				const existingOptions = [...options];

				// When you can ad more options perform the code below
				if (canAddCustomItems === true) {
					// Is this item a single dropdown ?
					if (isMultiSelect === false && !Array.isArray(dropdownValue) && dropdownValue !== null) {
						// Attempt to find the current value in the options list, if it's not in the options array add item
						if (options.find((el) => el.label === dropdownValue?.label) === undefined) {
							existingOptions.push(dropdownValue);
						}
					}

					// Is this a multi-select dropdown ?
					if (isMultiSelect === true && Array.isArray(dropdownValue)) {
						// Loop through all the values in the current Combobox
						dropdownValue.forEach((comboboxValue) => {
							// Attempt to find the current value in the options list, if it's not in the options array add item
							if (options.find((option) => option.label === comboboxValue.label) === undefined) {
								existingOptions.push(comboboxValue);
							}
						});
					}
				}

				// If an onChange functions is available then pass the current value and the new or existing options
				if (onChange) {
					onChange({
						options: existingOptions,
						value: dropdownValue
					});
				}

				// Once the user has selected an option clear the current query (When you select or de-select an option the query doesn't get by itself.)
				setQuery('');
			}}
			name={name}
			defaultValue={defaultValue}
			multiple={isMultiSelect}
			disabled={disabled}
			by='value'
		>
			{({ value: listboxInternalValue }) => (
				<div className='relative' ref={containerRef}>
					<div
						className={classNames(
							'relative flex w-full cursor-default content-between items-center rounded-lg border border-solid border-gray-400 bg-gray-200 p-2 text-left shadow-lg transition-all duration-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm',
							containerClassName
						)}
					>
						{flipIconPosition === true && (
							<HeadlessUICombobox.Button
								className='p-2'
								aria-hidden='true'
								// @ts-ignore
								ref={setReferenceElement}
							>
								<Icon className='fa-solid fa-arrows-up-down w-5 text-gray-400' />
							</HeadlessUICombobox.Button>
						)}

						<input
							type='text'
							className='w-full border-none p-4 text-sm leading-5 text-gray-900 focus:ring-0'
							onChange={(event) => {
								setQuery(event.target.value);
							}}
							value={query}
						/>

						{flipIconPosition === false && (
							<HeadlessUICombobox.Button
								className='p-2 pr-0'
								aria-hidden='true'
								// @ts-ignore
								ref={setReferenceElement}
							>
								<Icon className='fa-solid fa-arrows-up-down w-5 text-gray-400' />
							</HeadlessUICombobox.Button>
						)}
					</div>
					<Transition
						as={React.Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<HeadlessUICombobox.Options
							// Forces the dropdown list to re-render whenever the value changes, forces popper to adjust it's calculations to get the menu in the right position.
							key={JSON.stringify(
								Array.isArray(listboxInternalValue)
									? listboxInternalValue?.length ?? 0
									: listboxInternalValue
							)}
							// @ts-ignore
							ref={setPopperElement}
							aria-label={`A ${
								isMultiSelect === true ? 'multiple' : 'single'
							} dropdown for ${name}`}
							className='absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'
							style={{
								// Apply the pre-generated styling from popper.js usePopper hook
								...styles.popper,

								// A hack to make the tooltip not too far to the right,
								// TODO: Figure out the Popper way to do this, there must be a way to achieve this without this hack.
								left: 0,

								// Add margin 0 to prevent 'Popper: CSS "margin" styles cannot be used to apply padding between the popper and its reference element or boundary. To replicate margin, use the `offset` modifier, as well as the `padding` option in the `preventOverflow` and `flip` modifiers. from showing in the console warning
								margin: 0
							}}
							{...attributes.popper}
						>
							<VirtualizedList
								options={filteredOptions}
								query={query}
								noOptionsAvailableMessage={noOptionsAvailableMessage}
								canAddCustomItems={canAddCustomItems}
								noOptionsForSearchTermMessage={noOptionsForSearchTermMessage}
								isMultiSelect={isMultiSelect}
							/>
						</HeadlessUICombobox.Options>
					</Transition>
				</div>
			)}
		</HeadlessUICombobox>
	);
};

export default Combobox;
