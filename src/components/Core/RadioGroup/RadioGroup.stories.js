import classNames from 'classnames';
import * as React from 'react';

import RadioGroups from './RadioGroup';

const ControlledStoryTemplate = (args) => {
	const { defaultValue = '', ...reset } = args;

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
	const { name = '', defaultValue = [], ...rest } = args;

	return (
		<form>
			<RadioGroups {...rest} defaultValue={defaultValue} name={name} value={undefined} />
		</form>
	);
};

const DefaultStoryArgs = {
	options: [],
	value: undefined,
	onChange: null,
	displayName: 'name',
	noOptionsAvailableMessage: 'No options currently available.',
	disabled: false,
	showRadioButtonOnTheLeft: true,
	addSpaceBetweenLabelAndRadioButton: false,
	name: 'name',
	defaultValue: ''
};

export const DefaultRadioGroups = UncontrolledStoryTemplate.bind({});
DefaultRadioGroups.args = {
	...DefaultStoryArgs
};

export const UncontrolledRadioGroup = UncontrolledStoryTemplate.bind({});
UncontrolledRadioGroup.args = {
	...DefaultStoryArgs,
	defaultValue: '1',
	options: [
		{
			name: 'Radio option 1',
			id: 1,
			value: '1'
		},
		{
			name: 'Radio option 2',
			id: 2,
			value: '2'
		},
		{
			name: 'Radio option 3',
			id: 3,
			value: '3'
		}
	]
};

export const ControlledRadioGroup = ControlledStoryTemplate.bind({});
ControlledRadioGroup.args = {
	...DefaultStoryArgs,
	defaultValue: '2',
	options: [
		{
			name: 'Radio option 1',
			id: 1,
			value: '1'
		},
		{
			name: 'Radio option 2',
			id: 2,
			value: '2'
		},
		{
			name: 'Radio option 3',
			id: 3,
			value: '3'
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

export const CustomNoOptionsAvailableMessage = ControlledStoryTemplate.bind({});
CustomNoOptionsAvailableMessage.args = {
	...DefaultStoryArgs,
	noOptionsAvailableMessage: 'My custom no options message'
};

export const DisabledGroup = UncontrolledStoryTemplate.bind({});
DisabledGroup.args = {
	...DefaultStoryArgs,
	disabled: true,
	options: [
		{
			name: 'Radio option 1',
			id: 1,
			value: '1'
		},
		{
			name: 'Radio option 2',
			id: 2,
			value: '2'
		},
		{
			name: 'Radio option 3',
			id: 3,
			value: '3'
		}
	]
};

export const ShowRadioButtonOnTheRight = UncontrolledStoryTemplate.bind({});
ShowRadioButtonOnTheRight.args = {
	...DefaultStoryArgs,
	options: [
		{
			name: 'Radio option 1',
			id: 1,
			value: '1'
		},
		{
			name: 'Radio option 2',
			id: 2,
			value: '2'
		},
		{
			name: 'Radio option 3',
			id: 3,
			value: '3'
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
			id: 1,
			value: '1'
		},
		{
			name: 'Radio option 2',
			id: 2,
			value: '2'
		},
		{
			name: 'Radio option 3',
			id: 3,
			value: '3'
		}
	],
	addSpaceBetweenLabelAndRadioButton: true
};

export const FullyCustomStyledRadioGroup = ControlledStoryTemplate.bind({});

FullyCustomStyledRadioGroup.args = {
	...DefaultStoryArgs,
	defaultValue: '2',
	options: [
		{
			name: 'Radio option 1',
			id: 1,
			value: '1'
		},
		{
			name: 'Radio option 2',
			id: 2,
			value: '2'
		},
		{
			name: 'Radio option 3',
			id: 3,
			value: '3'
		}
	],
	getRadioOptionClassName: () =>
		'cursor-pointer rounded-lg focus:outline-none bg-white relative flex',
	getRadioLabelClassName: () => 'text-black',
	getIconColour: ({ isChecked }) =>
		classNames({
			'text-black': isChecked === true,
			'text-gray-300': isChecked === false
		})
};

export default { component: RadioGroups, title: 'Design System/Core/RadioGroup' };
