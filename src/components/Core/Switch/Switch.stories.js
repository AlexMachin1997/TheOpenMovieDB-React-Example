import * as React from 'react';

import Switch from './Switch';

const ControlledStoryTemplate = (args) => {
	const { defaultValue = false, ...reset } = args;

	const [value, setValue] = React.useState(defaultValue);

	return (
		<Switch
			{...reset}
			value={value}
			onChange={({ value: newValue }) => {
				setValue(newValue);
			}}
		/>
	);
};

const UncontrolledStoryTemplate = (args) => {
	const { name = '', defaultValue = '', ...rest } = args;

	return (
		<form>
			<Switch {...rest} defaultValue={defaultValue} name={name} value={undefined} />
		</form>
	);
};

const DefaultStoryArgs = {
	value: undefined,
	onChange: null,
	defaultValue: undefined,
	name: 'name',
	disabled: false,
	label: 'Example label'
};

export const DefaultControlledExample = ControlledStoryTemplate.bind({});
DefaultControlledExample.args = { ...DefaultStoryArgs, defaultValue: true };

export const DefaultUncontrolledExample = UncontrolledStoryTemplate.bind({});
DefaultUncontrolledExample.args = { ...DefaultStoryArgs, defaultValue: true };

export const DisabledSwitch = ControlledStoryTemplate.bind({});
DisabledSwitch.args = { ...DefaultStoryArgs, disabled: true };

export default { component: Switch, title: 'Design System/Core/Switch' };
