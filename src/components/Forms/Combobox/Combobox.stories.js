import * as React from 'react';

import Combobox from './Combobox';

const ControlledStoryTemplate = (args) => {
	// Get the arguments (Story prop) provided by the Stories
	const { isMulti = false, options = [], canAddCustomItems = false, ...rest } = args;

	// Store the current dropdown value
	const [value, setValue] = React.useState(isMulti === true ? [] : {});

	// Store the current dropdown options in state, this is so we can update them when canAddCustomItems is true
	const [remoteOptions, setRemoteOptions] = React.useState(options);

	return (
		<form>
			<Combobox
				{...rest}
				options={remoteOptions}
				isMulti={isMulti}
				value={value}
				canAddCustomItems={canAddCustomItems}
				onChange={({ options: newOptions, value: newValue }) => {
					if (canAddCustomItems === true) {
						setRemoteOptions(newOptions);
					}

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
			<Combobox {...rest} name={name} defaultValue={defaultValue} />
		</form>
	);
};

const DefaultStoryArgs = {
	options: [],
	value: {},
	defaultValue: {},
	onChange: null,
	isMulti: false,
	defaultQuery: '',
	displayName: 'name',
	canAddCustomItems: false,
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

export const DefaultQuery = UncontrolledStoryTemplate.bind({});
DefaultQuery.args = {
	...DefaultStoryArgs,
	options: [
		{ id: 1, name: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan' }
	],
	defaultQuery: 'Durward Reynolds'
};

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
	isMulti: false
};

export const MultipleValueDropdown = ControlledStoryTemplate.bind({});
MultipleValueDropdown.args = {
	...DefaultStoryArgs,
	isMulti: true,
	options: [
		{ id: 1, name: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan' }
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

export const SingleDropdownWithAddableOptions = ControlledStoryTemplate.bind({});
SingleDropdownWithAddableOptions.args = {
	...DefaultStoryArgs,
	options: [
		{ id: 1, name: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan' }
	],
	isMulti: false,
	canAddCustomItems: true
};

export const MultipleDropdownWithAddableOptions = ControlledStoryTemplate.bind({});
MultipleDropdownWithAddableOptions.args = {
	...DefaultStoryArgs,
	options: [
		{ id: 1, name: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan' }
	],
	isMulti: true,
	canAddCustomItems: true
};

export default {
	component: Combobox,
	title: 'Design System/Forms/Combobox'
};
