/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Listbox as HeadlessUIListbox, Transition } from '@headlessui/react';

import Icon from '../Icon/Icon';
import ListboxDisplayValues from './ListboxDisplayValues';
import { ListboxProps, SelectOption } from '../../../types/DropdownElementTypes';
import VirtualizedList from './ListboxOptions';
import { useDropdownPlacement } from '../../../hooks';

const Listbox = ({
	options = [],
	value = undefined,
	onChange = null,
	isMultiSelect = false,
	name,
	defaultValue = undefined,
	disabled = false,
	displayLimit = 3,
	noOptionsAvailableMessage = 'No options available',
	placeholder = undefined
}: ListboxProps) => {
	// Handles the menu placement, it decides if the dropdown needs to be on the top or bottom depending on where it is on the screen
	const {
		containerRef,
		setReferenceElement,
		setPopperElement,
		popper: { styles, attributes }
	} = useDropdownPlacement();

	const handleChange = (dropdownValue: SelectOption | SelectOption[] | null) => {
		// If an onChange functions is available then pass the current value and the new or existing options
		if (onChange) {
			onChange({ value: dropdownValue });
		}
	};

	return (
		<HeadlessUIListbox
			// Used when using the "uncontrolled" component ie using your own form management solution with state ()
			value={value}
			onChange={(dropdownValue) => handleChange(dropdownValue)}
			// Used when using the "controlled" component ie using the native html form formData object
			name={name}
			defaultValue={defaultValue}
			// Other general properties made available to the component
			multiple={isMultiSelect}
			disabled={disabled}
			by='value'
		>
			{({ value: listboxInternalValue }) => (
				<div className='relative' ref={containerRef}>
					{/* NOTE: Don't move the display value inside of the Button YOU CAN'T HAVE NESTED CONTROLS IT'S UNACCESSIBLE AND BAD PRACTICE */}
					<div className='relative flex w-full cursor-default content-between items-center rounded-lg border border-solid border-gray-400 bg-gray-200 p-3 text-left shadow-lg transition-all duration-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
						<span className='w-full'>
							<ListboxDisplayValues
								value={listboxInternalValue}
								isMultiSelect={isMultiSelect}
								onChange={({ value: newListboxValue }) => {
									//  If the onChange for the Listbox component is provided then update the current value
									if (onChange) {
										onChange({ value: newListboxValue });
									}
								}}
								displayLimit={displayLimit}
								showMultiDeleteButton={isMultiSelect === true && value !== undefined} // Don't show the delete button if the value is not undefined ie were in control mode (We control the state)
								placeholder={placeholder}
							/>
						</span>

						{/* Separate button toggler must not contain the values, it can be accessed via keyboard actions e.g. tabbing */}
						<HeadlessUIListbox.Button
							aria-label='Listbox dropdown button'
							// @ts-ignore
							ref={setReferenceElement}
						>
							<Icon className='fa-solid fa-arrows-up-down w-5 text-black' />
						</HeadlessUIListbox.Button>
					</div>

					<Transition
						as={React.Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<HeadlessUIListbox.Options
							// Forces the dropdown list to re-render whenever the value changes, forces popper to adjust it's calculations to get the menu in the right position.
							// Every time you select an option in multi-select mode it will reset the scroll position, that's just how the DOM work's sadly https://github.com/facebook/react/issues/21675
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
							onKeyDown={(event) => {
								// When you type to find an option stop other event's fro occurring e.g. In Storybook certain keys trigger page actions, we don't want this.
								event.stopPropagation();
							}}
							style={{
								// Apply the pre-generated styling from popper.js usePopper hook
								...styles.popper,

								// A hack to make the tooltip not too far to the right,
								left: 0,

								// Add margin 0 to prevent 'Popper: CSS "margin" styles cannot be used to apply padding between the popper and its reference element or boundary. To replicate margin, use the `offset` modifier, as well as the `padding` option in the `preventOverflow` and `flip` modifiers. from showing in the console warning
								margin: 0
							}}
							{...attributes.popper}
						>
							<VirtualizedList
								options={options}
								noOptionsAvailableMessage={noOptionsAvailableMessage}
								isMultiSelect={isMultiSelect}
							/>
						</HeadlessUIListbox.Options>
					</Transition>
				</div>
			)}
		</HeadlessUIListbox>
	);
};

export default Listbox;
