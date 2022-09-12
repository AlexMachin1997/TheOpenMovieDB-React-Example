import * as React from 'react';

import Listbox from './Listbox';

const ControlledStoryTemplate = (args) => {
	// Get the arguments (Story prop) provided by the Stories
	const { isMulti = false, options = [], defaultValue = null, ...rest } = args;

	// Store the current dropdown value
	const [value, setValue] = React.useState(() => {
		if (defaultValue === null) {
			return isMulti === true ? [] : {};
		}

		return defaultValue;
	});

	return (
		<form>
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
		</form>
	);
};

const UncontrolledStoryTemplate = (args) => {
	const { name = '', defaultValue = {}, ...rest } = args;

	return (
		<form>
			<Listbox {...rest} name={name} defaultValue={defaultValue} />
		</form>
	);
};

const DefaultStoryArgs = {
	options: [],
	value: {},
	defaultValue: null,
	onChange: null,
	isMulti: false,
	displayName: 'name',
	name: 'name',
	disabled: false
};

// export const NativeHTMLForm = UncontrolledStoryTemplate.bind({});
// NativeHTMLForm.args = {
// 	name: 'people',
// 	options: [
// 		{ id: 1, name: 'Durward Reynolds' },
// 		{ id: 2, name: 'Kenton Towne' },
// 		{ id: 3, name: 'Therese Wunsch' },
// 		{ id: 4, name: 'Benedict Kessler' },
// 		{ id: 5, name: 'Katelyn Rohan' }
// 	],
// 	defaultValue: { id: 1, name: 'Durward Reynolds' },
// 	isMulti: false
// };

export const DefaultDropdown = UncontrolledStoryTemplate.bind({});
DefaultDropdown.args = {
	...DefaultStoryArgs
};

export const SingleValueDropdown = ControlledStoryTemplate.bind({});
SingleValueDropdown.args = {
	...DefaultStoryArgs,
	options: [
		{ id: 1, name: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan' }
	],
	isMulti: false,
	defaultValue: { id: 1, name: 'Durward Reynolds' }
};

export const MultipleValueDropdown = ControlledStoryTemplate.bind({});
MultipleValueDropdown.args = {
	...DefaultStoryArgs,
	isMulti: true,
	options: [
		{ id: 1, name: 'Durward Reynolds Durward ReynoldsDurward Reynolds Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan' },
		{ id: 6, name: 'Durward Reynolds Durward ReynoldsDurward Reynolds Durward Reynolds' },
		{ id: 7, name: 'Kenton Towne' },
		{ id: 8, name: 'Therese Wunsch' },
		{ id: 9, name: 'Benedict Kessler' },
		{ id: 10, name: 'Katelyn Rohan' }
	],
	defaultValue: [
		{ id: 9, name: 'Benedict Kessler' },
		{ id: 10, name: 'Katelyn Rohan' }
	]
};

export const CustomDisplayName = UncontrolledStoryTemplate.bind({});
CustomDisplayName.args = {
	...DefaultStoryArgs,
	isMulti: false,
	options: [
		{ id: 1, label: 'Durward Reynolds' },
		{ id: 2, label: 'Kenton Towne' },
		{ id: 3, label: 'Therese Wunsch' },
		{ id: 4, label: 'Benedict Kessler' },
		{ id: 5, label: 'Katelyn Rohan' }
	],
	displayName: 'label'
};

export const CustomNoOptionsAvailableMessage = ControlledStoryTemplate.bind({});
CustomNoOptionsAvailableMessage.args = {
	...DefaultStoryArgs,
	noOptionsAvailableMessage: 'My custom no options message'
};

export default {
	component: Listbox,
	title: 'Design System/Core/Listbox'
};
