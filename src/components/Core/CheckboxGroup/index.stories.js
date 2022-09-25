import * as React from 'react';

import CheckboxGroup from './index';

const ControlledStoryTemplate = (args) => {
	const { defaultValue = [], ...reset } = args;

	const [value, setValue] = React.useState(defaultValue);

	return (
		<CheckboxGroup
			{...reset}
			value={value}
			onChange={({ value: newValue }) => {
				setValue(newValue);
			}}
		/>
	);
};

const UncontrolledStoryTemplate = (args) => {
	const { name = '', defaultValue = [], ...rest } = args;

	return (
		<form>
			<CheckboxGroup {...rest} defaultValue={defaultValue} name={name} value={undefined} />
		</form>
	);
};

const DefaultStoryArgs = {
	options: [],
	value: undefined,
	onChange: null,
	displayName: 'label',
	noOptionsAvailableMessage: 'No options currently available.',
	disabled: false,
	defaultValue: [],
	name: 'options'
};

export const DefaultCheckboxGroup = UncontrolledStoryTemplate.bind({});
DefaultCheckboxGroup.args = {
	...DefaultStoryArgs
};

export const ControlledCheckboxGroup = ControlledStoryTemplate.bind({});
ControlledCheckboxGroup.args = {
	...DefaultStoryArgs,
	defaultValue: ['checkbox1', 'checkbox2'],
	options: [
		{
			label: 'Checkbox 1',
			id: '1',
			value: 'checkbox1'
		},
		{
			label: 'Checkbox 2',
			id: '2',
			value: 'checkbox2'
		},
		{
			label: 'Checkbox 3',
			id: '3',
			value: 'checkbox3'
		}
	]
};

export const UncontrolledCheckboxGroup = ControlledStoryTemplate.bind({});
UncontrolledCheckboxGroup.args = {
	...DefaultStoryArgs,
	defaultValue: ['checkbox1', 'checkbox2'],
	options: [
		{
			label: 'Checkbox 1',
			id: '1',
			value: 'checkbox1'
		},
		{
			label: 'Checkbox 2',
			id: '2',
			value: 'checkbox2'
		},
		{
			label: 'Checkbox 3',
			id: '3',
			value: 'checkbox3'
		}
	]
};

export const CustomDisplayName = UncontrolledStoryTemplate.bind({});
CustomDisplayName.args = {
	...DefaultStoryArgs,
	displayName: 'customLabelProperty',
	options: [
		{
			customLabelProperty: 'Checkbox 10',
			id: '1',
			value: 'checkbox10'
		},
		{
			customLabelProperty: 'Checkbox 20',
			id: '2'
		},
		{
			customLabelProperty: 'Checkbox 30',
			id: '3'
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
			label: 'Radio option 1',
			id: 1,
			value: '1'
		},
		{
			label: 'Radio option 2',
			id: 2,
			value: '2'
		},
		{
			label: 'Radio option 3',
			id: 3,
			value: '3'
		}
	]
};

export const DisableCertainOptions = UncontrolledStoryTemplate.bind({});
DisableCertainOptions.args = {
	...DefaultStoryArgs,
	options: [
		{
			label: 'Checkbox 1',
			id: '1',
			disabled: false,
			value: '1'
		},
		{
			label: 'Checkbox 2',
			id: '2',
			disabled: true,
			value: '2'
		},
		{
			label: 'Checkbox 3',
			id: '3',
			disabled: true,
			value: '3'
		}
	]
};

export default { component: CheckboxGroup, title: 'Design System/Core/CheckboxGroup' };
