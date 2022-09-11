import * as React from 'react';

import RadioGroups from './RadioGroup';

const ControlledStoryTemplate = (args) => {
	const [value, setValue] = React.useState({});

	return (
		<RadioGroups
			{...args}
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
	serverSideLabel: 'Server-side label',
	displayName: 'name'
};

export const DefaultRadioGroups = UncontrolledStoryTemplate.bind({});
DefaultRadioGroups.args = {
	...DefaultStoryArgs
};

export const ValueUpdating = ControlledStoryTemplate.bind({});
ValueUpdating.args = {
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

export default { component: RadioGroups, title: 'Design System/Core/RadioGroups' };
