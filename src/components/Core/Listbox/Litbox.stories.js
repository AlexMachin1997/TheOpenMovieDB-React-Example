import * as React from 'react';
import settings from '../../../settings';

import Listbox from './Listbox';

const ControlledStoryTemplate = (args) => {
	// Get the arguments (Story prop) provided by the Stories
	const { isMulti = false, options = [], defaultValue = null, ...rest } = args;

	// Store the current dropdown value
	const [value, setValue] = React.useState(() => {
		if (defaultValue === null) {
			return isMulti === true ? [] : '';
		}

		return defaultValue;
	});

	return (
		<form>
			<label htmlFor='name'>
				A dropdown label
				<Listbox
					{...rest}
					options={options}
					isMulti={isMulti}
					value={value}
					onChange={({ value: newValue }) => {
						// Set the value of the dropdown.
						setValue(newValue);
					}}
				/>
			</label>
		</form>
	);
};

const UncontrolledStoryTemplate = (args) => {
	// Get the "controlled" props, just to demonstrate what properties are required

	const { name = '', defaultValue = undefined, ...rest } = args;

	return (
		<form>
			<Listbox {...rest} name={name} defaultValue={defaultValue} value={undefined} />
		</form>
	);
};

const DefaultStoryArgs = {
	options: [],
	value: undefined,
	defaultValue: undefined,
	onChange: null,
	isMulti: false,
	displayName: 'name',
	name: 'name',
	disabled: false,
	displayLimit: 3,
	noOptionsAvailableMessage: 'No options currently available.'
};

export const DefaultDropdown = UncontrolledStoryTemplate.bind({});
DefaultDropdown.args = {
	...DefaultStoryArgs
};

export const UncontrolledMultipleValues = UncontrolledStoryTemplate.bind({});
UncontrolledMultipleValues.args = {
	name: 'people',
	options: [
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	defaultValue: ['Durward Reynolds'],
	isMulti: true
};

export const UncontrolledSingleValue = UncontrolledStoryTemplate.bind({});
UncontrolledSingleValue.args = {
	name: 'people',
	options: [
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	defaultValue: 'Durward Reynolds',
	isMulti: false
};

export const ControlledSingleValue = ControlledStoryTemplate.bind({});
ControlledSingleValue.args = {
	...DefaultStoryArgs,
	options: [
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	isMulti: false,
	defaultValue: 'Durward Reynolds'
};

export const ControlledMultipleValues = ControlledStoryTemplate.bind({});
ControlledMultipleValues.args = {
	...DefaultStoryArgs,
	isMulti: true,
	options: [
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	defaultValue: ['Benedict Kessler', 'Katelyn Rohan']
};

export const CustomDisplayName = UncontrolledStoryTemplate.bind({});
CustomDisplayName.args = {
	...DefaultStoryArgs,
	isMulti: false,
	options: [
		{ id: 1, label: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, label: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, label: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, label: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, label: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	displayName: 'label'
};

export const CustomNoOptionsAvailableMessage = ControlledStoryTemplate.bind({});
CustomNoOptionsAvailableMessage.args = {
	...DefaultStoryArgs,
	noOptionsAvailableMessage: 'My custom no options message'
};

export const MassiveListOfCountries = ControlledStoryTemplate.bind({});
MassiveListOfCountries.args = {
	...DefaultStoryArgs,
	isMulti: true,
	options: settings.COUNTRY_OPTIONS,
	displayName: 'label'
};

export default {
	component: Listbox,
	title: 'Design System/Core/Listbox'
};
