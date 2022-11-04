import * as React from 'react';
import PropTypes from 'prop-types';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { usePopper } from 'react-popper';

import { Combobox, Transition } from '@headlessui/react';

import Icon from '../Icon/Icon';

const VirtualizedList = React.memo(
	({
		options,
		query,
		noOptionsAvailableMessage,
		canAddCustomItems,
		noOptionsForSearchTermMessage,
		isMulti,
		displayName
	}) => {
		// This will store the reference to the options list (Wrapper for the options)
		const optionsRef = React.useRef();

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
					<Combobox.Option
						disabled
						aria-disabled
						className='relative cursor-default select-none py-2 pl-3 text-gray-700'
					>
						{noOptionsAvailableMessage}
					</Combobox.Option>
				)}

				{/* When there are no options and the query isn't empty */}
				{rowVirtualizer.getVirtualItems().length === 0 &&
					query !== '' &&
					canAddCustomItems === false && (
						<Combobox.Option
							disabled
							aria-disabled
							className='relative cursor-default select-none py-2 pl-3 text-gray-700'
						>
							{noOptionsForSearchTermMessage}
						</Combobox.Option>
					)}

				{rowVirtualizer.getVirtualItems().length === 0 &&
					query !== '' &&
					canAddCustomItems === true && (
						<Combobox.Option
							className='relative cursor-default select-none bg-teal-600 py-2 pl-10 pr-4 text-gray-900'
							value={query}
						>
							<span className='block truncate font-medium'>
								Click to add <strong>{query}</strong> as an option.
							</span>
						</Combobox.Option>
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
							const option = options[virtualRow.index];

							return (
								<Combobox.Option
									key={option.id}
									className={({ active }) =>
										classNames('relative cursor-default select-none py-2 pr-4', {
											'bg-teal-600 text-white': active === true,
											'text-gray-900': active === false,
											'pl-10': isMulti === true,
											'pl-3': isMulti === false
										})
									}
									value={option.value}
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
												{option[displayName]}
											</span>
											{selected === true && isMulti === true && (
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
								</Combobox.Option>
							);
						})}
					</div>
				)}
			</div>
		);
	}
);

VirtualizedList.propTypes = {
	options: PropTypes.array.isRequired,
	query: PropTypes.string.isRequired,
	noOptionsAvailableMessage: PropTypes.string.isRequired,
	canAddCustomItems: PropTypes.bool.isRequired,
	noOptionsForSearchTermMessage: PropTypes.string.isRequired,
	isMulti: PropTypes.bool.isRequired,
	displayName: PropTypes.string.isRequired
};

const CustomCombobox = ({
	options,
	value,
	onChange,
	isMulti,
	defaultQuery,
	displayName,
	canAddCustomItems,
	name,
	defaultValue,
	disabled,
	noOptionsForSearchTermMessage,
	noOptionsAvailableMessage
}) => {
	// Stores the current search term applied to the Combobox
	const [query, setQuery] = React.useState(defaultQuery);

	const [referenceElement, setReferenceElement] = React.useState();
	const [popperElement, setPopperElement] = React.useState();
	const containerRef = React.useRef();

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
		return [skidding, distance];
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
		return options.filter((person) =>
			person[displayName]
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(query.toLowerCase().replace(/\s+/g, ''))
		);
	}, [options, query, displayName]);

	return (
		<Combobox
			// Used when using the "uncontrolled" component ie using your own form management solution with state ()
			value={value}
			onChange={(dropdownValue) => {
				let existingOptions = [...options];

				// When you can ad more options perform the code below
				if (canAddCustomItems === true) {
					// Is this item a single dropdown ?
					if (isMulti === false) {
						// Attempt to find the current value in the options list, if it's not in the options array add item
						if (options.find((el) => el[displayName] === dropdownValue) === undefined) {
							// Spread the existing options and append the value from the Combobox to the options list
							existingOptions = [
								...existingOptions,
								{
									// The display value should be whatever you typed in the input e.g. "Custom option"
									[displayName]: dropdownValue,

									// Hardcoded values as they are required for the options
									id: dropdownValue,
									value: dropdownValue
								}
							];
						}
					}

					// Is this a multi-select dropdown ?
					if (isMulti === true) {
						// Loop through all the values in the current Combobox
						dropdownValue.forEach((comboboxValue) => {
							// Attempt to find the current value in the options list, if it's not in the options array add item
							if (options.find((option) => option[displayName] === comboboxValue) === undefined) {
								// Spread the existing options and append the value from the Combobox to the options list
								existingOptions = [
									...existingOptions,
									{
										// The display value should be whatever you typed in the input e.g. "Custom option"
										[displayName]: comboboxValue,

										// Hardcoded values as they are required for the options
										id: comboboxValue,
										value: comboboxValue
									}
								];
							}
						});
					}
				}

				// If an onChange functions is available then pass the current value and the new or existing options
				if (onChange) {
					onChange({
						options: [...existingOptions],
						value: dropdownValue
					});
				}

				// Once the user has selected an option clear the current query (When you select or de-select an option the query doesn't get by itself.)
				setQuery('');
			}}
			// Used when using the "controlled" component ie using the native html form formData object
			name={name}
			defaultValue={defaultValue}
			// Other general properties made available to the component
			multiple={isMulti}
			disabled={disabled}
		>
			<div className='relative mt-1' ref={containerRef}>
				<div className='relative flex w-full cursor-default content-between items-center rounded-lg border border-solid border-gray-400 bg-gray-200 p-3 text-left shadow-lg transition-all duration-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
					<Combobox.Input
						className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
						onChange={(event) => {
							setQuery(event.target.value);
						}}
					/>
					<Combobox.Button className='p-2' aria-hidden='true' ref={setReferenceElement}>
						<Icon className='fa-solid fa-arrows-up-down w-5 text-gray-400' />
					</Combobox.Button>
				</div>
				<Transition
					as={React.Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Combobox.Options
						aria-label={`A ${isMulti === true ? 'multiple' : 'single'} dropdown for ${name}`}
						className='absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'
						ref={setPopperElement}
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
							isMulti={isMulti}
							displayName={displayName}
						/>
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
};

CustomCombobox.propTypes = {
	// These are our controlled properties, these values are used to control the value manually via some state
	value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
	onChange: PropTypes.func,

	// These are our uncontrolled properties, these values are used when there is no state or onChange, instead the component controls it's own state
	defaultValue: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.object,
		PropTypes.string
	]),

	// General properties to provide additional functionality like chips, custom messages, displayLimit etc
	options: PropTypes.array,
	name: PropTypes.string,
	isMulti: PropTypes.bool,
	defaultQuery: PropTypes.string,
	displayName: PropTypes.string,
	canAddCustomItems: PropTypes.bool,
	disabled: PropTypes.bool,
	noOptionsForSearchTermMessage: PropTypes.string,
	noOptionsAvailableMessage: PropTypes.string
};

CustomCombobox.defaultProps = {
	// These are our controlled properties, these values are used to control the value manually via some state
	value: undefined,
	onChange: null,

	// These are our uncontrolled properties, these values are used when there is no state or onChange, instead the component controls it's own state
	defaultValue: undefined,

	// General properties to provide additional functionality like chips, custom messages, displayLimit etc
	name: 'name',
	options: [],
	isMulti: false,
	defaultQuery: '',
	displayName: 'name',
	canAddCustomItems: false,
	disabled: false,
	noOptionsForSearchTermMessage: 'No options available for your current search term.',
	noOptionsAvailableMessage: 'No options currently available.'
};

export default CustomCombobox;
