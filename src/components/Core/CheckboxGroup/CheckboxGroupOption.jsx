import * as React from 'react';
import PropTypes from 'prop-types';

import useCheckboxGroup from './useCheckboxGroup';

const CheckboxGroupOption = ({ label, disabled, id, value }) => {
	// Used to access the DOM element markup or properties e.g. getting the checked value
	const optionRef = React.useRef();

	// Get the options provided by CheckboxGroup component (React Context provider)
	const {
		value: checkedItems = [],
		onChange = null,
		disabled: isCheckboxGroupDisabled = false,
		name = '',
		isControlled = false,
		defaultValue = []
	} = useCheckboxGroup();

	const checkboxProps = React.useMemo(() => {
		// The base checkbox properties
		let baseCheckboxProps = {
			id, // A unique id for the checkbox
			type: 'checkbox', // The type of input this is, this is a checkbox
			name, // Stores the checkbox name e.g. "availabilities"
			disabled: isCheckboxGroupDisabled === true || disabled === true, // Is the checkbox disabled, it will be if either the group is disabled or the individual item is.
			value // This is just static value e.g. "ads"
		};

		if (isControlled) {
			// If the checkbox is controlled ie we set state some where then provide the checked property and the onChange to cause the value to update
			baseCheckboxProps = {
				// Spread the existing properties e.g. id, value, name etc
				...baseCheckboxProps,

				// Since the component is controlled then we have to manually controlled the checked value of the checkbox
				checked: checkedItems.includes(value),

				// Expose the onChange event, useful callback for manually updating values or using the Event object.
				onChange: (event) => {
					// Since onChange returns the new value inverse the value to get the previous value e.g. when it's unchecked we get true so the previous value was false
					const wasPreviouslyChecked = !optionRef.current.checked;

					// Take a copy of the current checkboxes
					const existingCheckboxes = [...checkedItems];

					// Get the index of the current checkbox, each checkbox requires an id as a unique identifier (string or number)
					const index = existingCheckboxes.findIndex((checkbox) => checkbox === value);

					// Either add the item or remove the item from the checkbox (Removing an item requires an index)
					if (wasPreviouslyChecked === false) {
						existingCheckboxes.push(value);
					} else if (wasPreviouslyChecked === true && index !== -1) {
						existingCheckboxes.splice(index, 1);
					}

					// If there is an onChange make sure to pass back the new checkboxes and the event object just incase you need to do additional logic like prevent bubbling etc
					if (onChange) {
						onChange(existingCheckboxes, event);
					}
				}
			};
		} else {
			// When the component isn't controlled then provide a default value
			baseCheckboxProps = {
				// Spread the existing properties e.g. id, value, name etc
				...baseCheckboxProps,

				// Check the defaultValue includes the value passed in by the checkbox option
				defaultChecked: defaultValue.includes(value)
			};
		}

		return baseCheckboxProps;
	}, [
		name,
		checkedItems,
		disabled,
		id,
		isCheckboxGroupDisabled,
		isControlled,
		onChange,
		value,
		defaultValue
	]);

	return (
		<div className='mb-4 flex items-center'>
			<input
				{...checkboxProps}
				ref={optionRef}
				className='h-4 w-4 cursor-pointer rounded-2xl border-gray-300 bg-gray-100 text-blue-600 disabled:cursor-not-allowed'
			/>
			<label htmlFor={id} className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
				{label}
			</label>
		</div>
	);
};

CheckboxGroupOption.defaultProps = {
	label: 'Default label',
	disabled: false,
	value: undefined
};

CheckboxGroupOption.propTypes = {
	label: PropTypes.string,
	disabled: PropTypes.bool,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	value: PropTypes.string
};

export default CheckboxGroupOption;
