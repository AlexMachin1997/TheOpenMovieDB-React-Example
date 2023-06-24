/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePopper } from 'react-popper';

import { useVirtualizer } from '@tanstack/react-virtual';
import { Listbox, Transition } from '@headlessui/react';

import Icon from '../Icon/Icon';
import ListboxDisplayValues from './ListboxDisplayValues';

const VirtualizedList = React.memo(
	({ options, noOptionsAvailableMessage, isMulti, displayName }) => {
		// This will store the reference to the options list (Wrapper for the options)
		const optionsRef = React.useRef();

		// Virtualize the List, improves the performance for bigger lists e.g. 250 countries being rendered.
		const rowVirtualizer = useVirtualizer({
			count: options?.length,
			getScrollElement: () => optionsRef.current,
			estimateSize: React.useCallback(() => 35, []),
			overscan: 5
		});

		return (
			<div ref={optionsRef}>
				{/* When there are no options and the query is empty */}
				{rowVirtualizer.getVirtualItems().length === 0 && (
					<Listbox.Option
						disabled
						aria-disabled
						className='relative cursor-default select-none py-2 pl-3 text-gray-700'
					>
						{noOptionsAvailableMessage}
					</Listbox.Option>
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
								<Listbox.Option
									key={option.id}
									className={({ active }) =>
										classNames('relative cursor-default select-none py-2 pr-4', {
											'bg-secondary text-white': active === true,
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
										<>
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
										</>
									)}
								</Listbox.Option>
							);
						})}
					</div>
				)}
			</div>
		);
	}
);

VirtualizedList.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	options: PropTypes.array.isRequired,
	noOptionsAvailableMessage: PropTypes.string.isRequired,
	isMulti: PropTypes.bool.isRequired,
	displayName: PropTypes.string.isRequired
};

const CustomListbox = ({
	options,
	value,
	onChange,
	isMulti,
	displayName,
	name,
	defaultValue,
	disabled,
	displayLimit,
	noOptionsAvailableMessage
}) => {
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

	return (
		<Listbox
			// Used when using the "uncontrolled" component ie using your own form management solution with state ()
			value={value}
			onChange={(dropdownValue) => {
				// If an onChange functions is available then pass the current value and the new or existing options
				if (onChange) {
					onChange({ value: dropdownValue });
				}
			}}
			// Used when using the "controlled" component ie using the native html form formData object
			name={name}
			defaultValue={defaultValue}
			// Other general properties made available to the component
			multiple={isMulti}
			disabled={disabled}
		>
			{({ value: listboxInternalValue }) => (
				<div className='relative' ref={containerRef}>
					{/* NOTE: Don't move the display value inside of the Button YOU CAN'T HAVE NESTED CONTROLS IT'S UNACCESSIBLE AND BAD PRACTICE */}
					<div className='relative flex w-full cursor-default content-between items-center rounded-lg border border-solid border-gray-400 bg-gray-200 p-3 text-left shadow-lg transition-all duration-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
						<span className='w-full'>
							<ListboxDisplayValues
								value={listboxInternalValue}
								isMulti={isMulti}
								onChange={({ value: newListboxValue }) => {
									//  If the onChange for the Listbox component is provided then update the current value
									if (onChange) {
										onChange({ value: newListboxValue });
									}
								}}
								displayLimit={displayLimit}
								showMultiDeleteButton={isMulti === true && value !== undefined} // Don't show the delete button if the value is not undefined ie were in control mode (We control the state)
								options={options}
								displayName={displayName}
							/>
						</span>

						{/* Separate button toggler must not contain the values, it can be accessed via keyboard actions e.g. tabbing */}
						<Listbox.Button aria-label='Listbox dropdown button' ref={setReferenceElement}>
							<Icon className='fa-solid fa-arrows-up-down w-5 text-black' />
						</Listbox.Button>
					</div>

					<Transition
						as={React.Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options
							aria-label={`A ${isMulti === true ? 'multiple' : 'single'} dropdown for ${name}`}
							className='absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'
							ref={setPopperElement}
							onKeyDown={(event) => {
								// When you type to find an option stop other event's fro occurring e.g. In Storybook certain keys trigger page actions, we don't want this.
								event.stopPropagation();
							}}
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
								options={options}
								noOptionsAvailableMessage={noOptionsAvailableMessage}
								isMulti={isMulti}
								displayName={displayName}
							/>
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
};

CustomListbox.propTypes = {
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
	name: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	options: PropTypes.array,
	isMulti: PropTypes.bool,
	displayName: PropTypes.string,
	disabled: PropTypes.bool,
	displayLimit: PropTypes.number,
	noOptionsAvailableMessage: PropTypes.string
};

CustomListbox.defaultProps = {
	// These are our controlled properties, these values are used to control the value manually via some state
	value: undefined,
	onChange: null,

	// These are our uncontrolled properties, these values are used when there is no state or onChange, instead the component controls it's own state
	defaultValue: undefined,

	// General properties to provide additional functionality like chips, custom messages, displayLimit etc
	name: 'name',
	options: [],
	isMulti: false,
	displayName: 'name',
	disabled: false,
	displayLimit: 3,
	noOptionsAvailableMessage: 'No options currently available.'
};

export default CustomListbox;
