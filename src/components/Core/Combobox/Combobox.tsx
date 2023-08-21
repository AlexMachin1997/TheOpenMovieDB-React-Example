/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Combobox as HeadlessUICombobox, Transition } from '@headlessui/react';
import classNames from 'classnames';

import Icon from '../Icon/Icon';
import { ComboboxProps, SelectOption } from '../../../types/DropdownElementTypes';
import ComboboxOptions from './ComboboxOptions';
import { useDropdownPlacement } from '../../../hooks';

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

	// Handles the menu placement, it decides if the dropdown needs to be on the top or bottom depending on where it is on the screen
	const {
		containerRef,
		setReferenceElement,
		setPopperElement,
		popper: { styles, attributes }
	} = useDropdownPlacement();

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

	const handleChange = (dropdownValue: SelectOption | SelectOption[] | null) => {
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
	};

	return (
		<HeadlessUICombobox
			// Used when using the "controlled" component ie using your own form management solution with state ()
			value={value}
			onChange={(dropdownValue) => handleChange(dropdownValue)}
			// Used when using the "uncontrolled" component ie using the native html form formData object
			name={name}
			defaultValue={defaultValue}
			// Other general properties made available to the component
			// @ts-ignore
			multiple={isMultiSelect === true}
			disabled={disabled}
			by='value'
		>
			<>
				{/* @ts-ignore */}
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

						<HeadlessUICombobox.Input
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
								left: 0,

								// Add margin 0 to prevent 'Popper: CSS "margin" styles cannot be used to apply padding between the popper and its reference element or boundary. To replicate margin, use the `offset` modifier, as well as the `padding` option in the `preventOverflow` and `flip` modifiers. from showing in the console warning
								margin: 0
							}}
							{...attributes.popper}
						>
							<ComboboxOptions
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
			</>
		</HeadlessUICombobox>
	);
};

export default Combobox;
