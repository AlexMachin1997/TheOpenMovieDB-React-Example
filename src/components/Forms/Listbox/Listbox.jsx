import * as React from 'react';
import PropTypes from 'prop-types';

import { Listbox, Transition } from '@headlessui/react';

import classNames from 'classnames';
import { Icon } from '../../Core';

const CustomCombobox = ({
	options,
	value,
	onChange,
	isMulti,
	displayName,
	name,
	defaultValue,
	disabled,
	displayLimit
}) => {
	// Copy the current values, these are the values we want to display
	const valuesToDisplay = isMulti === true ? [...value] : [];

	// This will store the options we aren't going to display
	let numberOfItemsWereNotDisplay = [];

	// If the current amount of values is more than the displayLimit then update the numberOfItemsWereNotDisplay (No need for an effect, this can be derived from the value)
	if (valuesToDisplay.length > displayLimit) {
		numberOfItemsWereNotDisplay = valuesToDisplay.splice(displayLimit).length;
	}

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
			<div className='relative mt-1'>
				<Listbox.Button
					className={classNames(
						'relative mt-2 mr-2 mb-2 flex w-full cursor-default content-between items-center rounded-lg bg-white py-4 pl-1 pr-1 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'
					)}
				>
					<span className='mt-2 w-full'>
						{isMulti === false && `${value[displayName] !== undefined ? value[displayName] : ''}`}

						{isMulti === true && (
							<div className='flex flex-wrap items-center'>
								{valuesToDisplay.map((el) => (
									<div className='mt-2 mr-2 mb-2' key={el.id}>
										<span className='align-center ease flex w-max cursor-pointer items-center rounded-full bg-gray-200 p-2 text-sm font-semibold text-gray-500 transition duration-300 active:bg-gray-300'>
											{el[displayName]}
											<div
												role='button'
												tabIndex='0'
												className='hover bg-transparent pl-2'
												onClick={() => {
													if (onChange) {
														onChange({ value: value.filter((el2) => el.id !== el2.id) });
													}
												}}
												onKeyDown={(event) => {
													// When the user clicks the enter button
													if (event.key === 'Enter') {
														if (onChange) {
															// Prevent event from bubbling up to the Button's onClick which actually opens the dropdown menu which we don't want.
															event.stopPropagation();

															// SInce the delete button has been clicked make sure to pass back every item expect for the one we clicked
															onChange({ value: value.filter((el2) => el.id !== el2.id) });
														}
													}
												}}
											>
												<Icon className='fa-sharp fa-solid fa-xmark' />
											</div>
										</span>
									</div>
								))}
								{numberOfItemsWereNotDisplay > 0 && <p>+{numberOfItemsWereNotDisplay}</p>}
							</div>
						)}
					</span>
					<Icon className='fa-solid fa-arrows-up-down w-5 text-gray-400' />
				</Listbox.Button>
				<Transition
					as={React.Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{/* When there are no options and the query is empty */}
						{(options?.length ?? 0) === 0 && (
							<p className='relative cursor-default select-none py-2 px-4 text-gray-700'>
								No options available Nothing found.
							</p>
						)}

						{/* When there are options render the options */}
						{(options?.length ?? 0) !== 0 &&
							options.map((option) => (
								<Listbox.Option
									key={option.id}
									className={({ active }) =>
										classNames('relative cursor-default select-none py-2 pl-10 pr-4', {
											'bg-teal-600 text-white': active === true,
											'text-gray-900': active === false
										})
									}
									value={option}
								>
									{({ selected, active }) => (
										<>
											<span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
												{option[displayName]}
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
								</Listbox.Option>
							))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
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
	displayName: PropTypes.string,
	name: PropTypes.string,
	defaultValue: ValuePropTypes,
	disabled: PropTypes.bool,
	displayLimit: PropTypes.number
};

CustomCombobox.defaultProps = {
	options: [],
	value: [],
	defaultValue: [],
	onChange: null,
	isMulti: false,
	displayName: 'name',
	name: 'name',
	disabled: false,
	displayLimit: 3
};

export default CustomCombobox;
