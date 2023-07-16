import * as React from 'react';

import { useCheckboxGroup } from './CheckboxGroupContext';

type Props = {
	label: string;
	disabled: boolean;
	id: string;
	value: string;
};

const CheckboxGroupOption = ({ label, disabled, id, value }: Props) => {
	// Get the options provided by CheckboxGroup component (React Context provider)
	const {
		value: checkedItems = [],
		onChange = null,
		disabled: isCheckboxGroupDisabled = false,
		name = '',
		isControlled = false,
		defaultValue = []
	} = useCheckboxGroup();

	const handleCheckboxInputChange = React.useCallback(() => {
		// Is the current checkbox value included in the checkedItems array.
		const wasPreviouslyChecked = checkedItems.includes(value);

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

		// After modifying the checkboxes make sure that they are returned so they can be used.
		return existingCheckboxes;
	}, [checkedItems, value]);

	// The base checkbox properties
	let checkboxProps: React.ComponentPropsWithoutRef<'input'> = {
		id,
		type: 'checkbox',
		name,
		disabled: isCheckboxGroupDisabled === true || disabled === true,
		onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				// Generates the new checkbox values
				const newCheckboxValues = handleCheckboxInputChange();

				// If there is an onChange make sure to pass back the new checkboxes and the event object just incase you need to do additional logic like prevent bubbling etc
				if (onChange) {
					onChange(newCheckboxValues, event, id);
				}
			}
		},
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
			// Generates the new checkbox values
			const newCheckboxValues = handleCheckboxInputChange();

			// If there is an onChange make sure to pass back the new checkboxes and the event object just incase you need to do additional logic like prevent bubbling etc
			if (onChange) {
				onChange(newCheckboxValues, event, id);
			}
		}
	};

	// In 'controlled' mode you need the checked property and not defaultChecked, however, in uncontrolled you need defaultChecked and not checked
	// NOTE: You will get a warning or error in the console specify you can't have an uncontrolled and controlled value
	if (isControlled) {
		checkboxProps = {
			...checkboxProps,
			checked: checkedItems.includes(value)
		};
	} else {
		checkboxProps = {
			...checkboxProps,
			defaultChecked: defaultValue.includes(value)
		};
	}

	return (
		<div className='flex items-center'>
			<input
				{...checkboxProps}
				className='h-4 w-4 cursor-pointer rounded-2xl border-gray-300 bg-gray-100 text-blue-600 disabled:cursor-not-allowed'
			/>
			<label htmlFor={id} className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
				{label}
			</label>
		</div>
	);
};

export default CheckboxGroupOption;
