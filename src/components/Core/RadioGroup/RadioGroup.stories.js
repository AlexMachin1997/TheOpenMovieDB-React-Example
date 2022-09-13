import * as React from 'react';

import RadioGroups from './RadioGroup';

const ControlledStoryTemplate = (args) => {
	const { defaultValue = {}, ...reset } = args;

	const [value, setValue] = React.useState(defaultValue);

	return (
		<RadioGroups
			{...reset}
			value={value}
			onChange={({ value: newValue }) => {
				setValue(newValue);
			}}
		/>
	);
};

const UncontrolledStoryTemplate = (args) => {
	const { name = '', defaultValue = {}, ...rest } = args;

	return (
		<form>
			<RadioGroups {...rest} defaultValue={defaultValue} name={name} />
		</form>
	);
};

const DefaultStoryArgs = {
	options: [],
	value: [],
	onChange: null,
	displayName: 'name',
	noOptionsAvailableMessage: 'No options currently available.',
	disabled: false,
	showRadioButtonOnTheLeft: true,
	addSpaceBetweenLabelAndRadioButton: false,
	name: 'name',
	defaultValue: {}
};

export const DefaultRadioGroups = UncontrolledStoryTemplate.bind({});
DefaultRadioGroups.args = {
	...DefaultStoryArgs
};

export const ValueUpdating = ControlledStoryTemplate.bind({});
ValueUpdating.args = {
	...DefaultStoryArgs,
	defaultValue: {
		name: 'Radio option 2',
		id: 2
	},
	options: [
		{
			name: 'Radio option 1',
			id: 1
		},
		{
			name: 'Radio option 2',
			id: 2
		},
		{
			name: 'Radio option 3',
			id: 3
		}
	]
};

export const CustomDisplayName = UncontrolledStoryTemplate.bind({});
CustomDisplayName.args = {
	...DefaultStoryArgs,
	displayName: 'label',
	options: [
		{
			label: 'Radio option 1',
			id: 1
		},
		{
			label: 'Radio option 2',
			id: 2
		},
		{
			label: 'Radio option 3',
			id: 3
		}
	]
};

export const CustomNoOptionsAvailableMessage = ControlledStoryTemplate.bind({});
CustomNoOptionsAvailableMessage.args = {
	...DefaultStoryArgs,
	noOptionsAvailableMessage: 'My custom no options message'
};

export const Disabled = UncontrolledStoryTemplate.bind({});
Disabled.args = {
	...DefaultStoryArgs,
	disabled: true,
	options: [
		{
			name: 'Radio option 1',
			id: 1
		},
		{
			name: 'Radio option 2',
			id: 2
		},
		{
			name: 'Radio option 3',
			id: 3
		}
	]
};

export const ShowRadioButtonOnTheRight = UncontrolledStoryTemplate.bind({});
ShowRadioButtonOnTheRight.args = {
	...DefaultStoryArgs,
	options: [
		{
			name: 'Radio option 1',
			id: 1
		},
		{
			name: 'Radio option 2',
			id: 2
		},
		{
			name: 'Radio option 3',
			id: 3
		}
	],
	showRadioButtonOnTheLeft: false
};

export const AddSpaceBetweenLabelAndRadioButtonOnTheRight = UncontrolledStoryTemplate.bind({});
AddSpaceBetweenLabelAndRadioButtonOnTheRight.args = {
	...DefaultStoryArgs,
	options: [
		{
			name: 'Radio option 1',
			id: 1
		},
		{
			name: 'Radio option 2',
			id: 2
		},
		{
			name: 'Radio option 3',
			id: 3
		}
	],
	addSpaceBetweenLabelAndRadioButton: true
};

export default { component: RadioGroups, title: 'Design System/Core/RadioGroups' };
