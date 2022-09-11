import * as React from 'react';
import PropTypes from 'prop-types';

import { Combobox, Transition } from '@headlessui/react';

import classNames from 'classnames';
import { Icon } from '../../Core';

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
	disabled
}) => {
	// Stores the current search term applied to the Combobox
	const [query, setQuery] = React.useState(defaultQuery);

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
						if (options.find((el) => el.name === dropdownValue[displayName]) === undefined) {
							// Spread the existing options and append the value from the Combobox to the options list
							existingOptions = [...existingOptions, dropdownValue];
						}
					}

					// Is this a multi-select dropdown ?
					if (isMulti === true) {
						// Loop through all the values in the current Combobox
						dropdownValue.forEach((comboboxValue) => {
							// Attempt to find the current value in the options list, if it's not in the options array add item
							if (
								options.find((option) => option.name === comboboxValue[displayName]) === undefined
							) {
								// Spread the existing options and append the value from the Combobox to the options list
								existingOptions = [...existingOptions, comboboxValue];
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
			<div className='relative mt-1'>
				<div className='relative flex w-full cursor-default items-center rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
					<Combobox.Input
						className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
						displayValue={(option) => option[displayName]}
						onChange={(event) => {
							setQuery(event.target.value);
						}}
					/>
					<Combobox.Button className='p-2'>
						<Icon className='fa-solid fa-arrows-up-down w-5 text-gray-400' />
					</Combobox.Button>
				</div>
				<Transition
					as={React.Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{/* When there are no options and the query is empty */}
						{(filteredOptions?.length ?? 0) === 0 && query === '' && (
							<p className='relative cursor-default select-none py-2 px-4 text-gray-700'>
								No options available Nothing found.
							</p>
						)}

						{/* When there are no options and the query isn't empty */}
						{(filteredOptions?.length ?? 0) === 0 &&
							query !== '' &&
							canAddCustomItems === false && (
								<p className='relative cursor-default select-none py-2 px-4 text-gray-700'>
									No options available for your current query
								</p>
							)}

						{(filteredOptions?.length ?? 0) === 0 && query !== '' && canAddCustomItems === true && (
							<Combobox.Option
								className='text-gray-900bg-teal-600 relative cursor-default select-none py-2 pl-10 pr-4'
								value={{ id: query, [displayName]: query }}
							>
								<span className='block truncate font-medium'>
									Click to add <strong>{query}</strong>
								</span>
							</Combobox.Option>
						)}

						{/* When there are options render the options */}
						{(filteredOptions?.length ?? 0) !== 0 &&
							filteredOptions.map((person) => (
								<Combobox.Option
									key={person.id}
									className={({ active }) =>
										classNames('relative cursor-default select-none py-2 pl-10 pr-4', {
											'bg-teal-600 text-white': active === true,
											'text-gray-900': active === false
										})
									}
									value={person}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
											>
												{person[displayName]}
											</span>
											{selected ? (
												<span
													className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
														active ? 'text-white' : 'text-teal-600'
													}`}
												>
													<Icon className='fa-solid fa-check' aria-hidden='true' />
												</span>
											) : null}
										</>
									)}
								</Combobox.Option>
							))}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
};

const ValuePropTypes = PropTypes.oneOfType([
	PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	}),
	PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})
	)
]);

CustomCombobox.propTypes = {
	options: PropTypes.array,
	value: ValuePropTypes,
	onChange: PropTypes.func,
	isMulti: PropTypes.bool,
	defaultQuery: PropTypes.string,
	displayName: PropTypes.string,
	canAddCustomItems: PropTypes.bool,
	name: PropTypes.string,
	defaultValue: ValuePropTypes,
	disabled: PropTypes.bool
};

CustomCombobox.defaultProps = {
	options: [],
	value: [],
	defaultValue: [],
	onChange: null,
	isMulti: false,
	defaultQuery: '',
	displayName: 'name',
	canAddCustomItems: false,
	name: 'name',
	disabled: false
};

export default CustomCombobox;
