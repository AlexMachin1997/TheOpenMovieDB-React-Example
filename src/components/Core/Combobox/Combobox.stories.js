import * as React from 'react';
import settings from '../../../settings';

import Combobox from './Combobox';

const ControlledStoryTemplate = (args) => {
	// Get the arguments (Story prop) provided by the Stories
	const {
		isMulti = false,
		options = [],
		canAddCustomItems = false,
		defaultValue = null,
		...rest
	} = args;

	// Store the current dropdown value
	const [value, setValue] = React.useState(() => {
		if (defaultValue === null) {
			return isMulti === true ? [] : '';
		}

		return defaultValue;
	});

	// Store the current dropdown options in state, this is so we can update them when canAddCustomItems is true
	const [remoteOptions, setRemoteOptions] = React.useState(options);

	return (
		<form>
			<label htmlFor='name'>
				A dropdown label
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
			</label>
		</form>
	);
};

const UncontrolledStoryTemplate = (args) => {
	const { name = '', defaultValue = {}, ...rest } = args;

	return (
		<form>
			<label htmlFor='name'>
				A dropdown label
				<Combobox {...rest} name={name} defaultValue={defaultValue} />
			</label>
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

export const MultipleValueDropdownNativeHTMLForm = UncontrolledStoryTemplate.bind({});
MultipleValueDropdownNativeHTMLForm.args = {
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

export const SingleValueDropdownNativeHTMLForm = UncontrolledStoryTemplate.bind({});
SingleValueDropdownNativeHTMLForm.args = {
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

export const DefaultQuery = UncontrolledStoryTemplate.bind({});
DefaultQuery.args = {
	...DefaultStoryArgs,
	options: [
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
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
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	isMulti: false,
	defaultValue: 'Durward Reynolds'
};

export const MultipleValueDropdown = ControlledStoryTemplate.bind({});
MultipleValueDropdown.args = {
	...DefaultStoryArgs,
	isMulti: true,
	options: [
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	defaultValue: ['Durward Reynolds', 'Kenton Towne']
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

export const SingleDropdownWithAddableOptions = ControlledStoryTemplate.bind({});
SingleDropdownWithAddableOptions.args = {
	...DefaultStoryArgs,
	options: [
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	isMulti: false,
	canAddCustomItems: true
};

export const MultipleDropdownWithAddableOptions = ControlledStoryTemplate.bind({});
MultipleDropdownWithAddableOptions.args = {
	...DefaultStoryArgs,
	options: [
		{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
		{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
		{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
		{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
		{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
	],
	isMulti: true,
	canAddCustomItems: true
};

export const CustomNoOptionsForSearchTermMessage = ControlledStoryTemplate.bind({});
CustomNoOptionsForSearchTermMessage.args = {
	...DefaultStoryArgs,
	noOptionsForSearchTermMessage: 'My custom message for no option when there are no options'
};

export const CustomNoOptionsAvailableMessage = ControlledStoryTemplate.bind({});
CustomNoOptionsAvailableMessage.args = {
	...DefaultStoryArgs,
	noOptionsAvailableMessage: 'My custom no options message'
};

export const MassiveListOfCountriesA = ControlledStoryTemplate.bind({});
MassiveListOfCountriesA.args = {
	...DefaultStoryArgs,
	isMulti: true,
	options: settings.COUNTRY_OPTIONS,
	displayName: 'label'
};

export default {
	component: Combobox,
	title: 'Design System/Core/Combobox'
};
