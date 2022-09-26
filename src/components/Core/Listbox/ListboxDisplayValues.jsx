import * as React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

const ListboxDisplayValues = ({
	value,
	isMulti,
	onChange,
	displayLimit,
	showMultiDeleteButton,
	options,
	displayName
}) => {
	const onDeleteItem = (event, el) => {
		if (onChange) {
			// Prevent event from bubbling up to the Button's onClick which actually opens the dropdown menu which we don't want.
			event.stopPropagation();

			// Since the delete button has been clicked make sure to pass back every item expect for the one we clicked
			onChange({ value: value.filter((el2) => el !== el2) });
		}
	};

	const getDisplayValue = (currentValue) => {
		const foundOption = options?.find((option) => option.value === currentValue);

		if (foundOption !== undefined) {
			return foundOption[displayName];
		}

		return '';
	};

	// When it's a single select Listbox just output the value provided e.g. "Popularly (A-Z)"
	if (isMulti === false && value !== undefined && Object.keys(value).length > 0) {
		return <p className='text-black'>{getDisplayValue(value)}</p>;
	}

	// When it's a multi-select Listbox provide additional functionality via the Chips's
	if (isMulti === true && (value?.length ?? 0) > 0) {
		// Store the number of items currently available
		const valuesToDisplay = [...value];

		// This will store the number of options we aren't going to display, only ever set when the displayLimit is exceeded
		let numberOfItemsWereNotDisplay = 0;

		// If the current amount of values is more than the displayLimit then update the numberOfItemsWereNotDisplay (No need for an effect, this can be derived from the value)
		if (valuesToDisplay.length > displayLimit) {
			numberOfItemsWereNotDisplay = valuesToDisplay?.splice(displayLimit)?.length;
		}

		return (
			<div className='flex flex-wrap items-center'>
				{valuesToDisplay.map((el) => (
					<div className='mr-2 py-1' key={el}>
						<span className='align-center ease flex w-max items-center rounded-full bg-secondary py-2 px-2 text-sm font-semibold transition duration-300 active:bg-gray-300'>
							<p className='text-md text-white'>{getDisplayValue(el)}</p>

							{/* NOTE: You can't have buttons inside of buttons that's now allowed, hence the reason it's a div with a role attached for accessability */}
							{showMultiDeleteButton === true && (
								<div
									role='button'
									tabIndex='0'
									className='mx-2 bg-transparent text-black'
									onClick={(event) => onDeleteItem(event, el)}
									onKeyDown={(event) => {
										// When the user clicks the enter button
										if (event.key === 'Enter') onDeleteItem(event, el);
									}}
									aria-label={`${el} deletetion button`}
								>
									<Icon className='fa-sharp fa-solid fa-xmark' />
								</div>
							)}
						</span>
					</div>
				))}

				{/* Display the number of items that exceed the display limit e.g. +5 */}
				{numberOfItemsWereNotDisplay > 0 && <p>+{numberOfItemsWereNotDisplay}</p>}
			</div>
		);
	}
};

ListboxDisplayValues.propTypes = {
	// When no value is provided to the Listbox it provides an empty string, though most of the time it's going to be an array of strings or just a string
	value: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string,
		PropTypes.object
	]),
	isMulti: PropTypes.bool,
	onChange: PropTypes.func,
	displayLimit: PropTypes.number,
	showMultiDeleteButton: PropTypes.bool,
	options: PropTypes.array,
	displayName: PropTypes.string
};

ListboxDisplayValues.defaultProps = {
	value: null,
	isMulti: false,
	onChange: null,
	displayLimit: 5,
	showMultiDeleteButton: true,
	options: [],
	displayName: 'name'
};

export default ListboxDisplayValues;
