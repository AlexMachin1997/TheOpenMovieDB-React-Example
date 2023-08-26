import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Switch from './Switch';

const meta: Meta<typeof Switch> = {
	component: Switch,
	title: 'Core/Switch'
};

export default meta;

type Story = StoryObj<typeof Switch>;

const ControlledStoryTemplate = (args: Story['args'] = {}) => {
	const { defaultValue = false, ...reset } = args;

	const [value, setValue] = React.useState(defaultValue);

	return (
		<Switch
			{...reset}
			value={value}
			onChange={({ value: newValue }) => {
				setValue(newValue);
			}}
			label={args?.label ?? ''}
			name={args?.name ?? 'switch-input'}
		/>
	);
};

const UncontrolledStoryTemplate = (args: Story['args'] = {}) => {
	const { name = '', defaultValue = false, label = '', ...rest } = args;

	return (
		<form>
			<Switch {...rest} defaultValue={defaultValue} name={name} value={undefined} label={label} />
		</form>
	);
};

const DefaultStoryArgs: Story['args'] = {
	value: undefined,
	name: 'name',
	label: 'Example label'
};

export const DefaultControlledExample: Story = {
	render: ControlledStoryTemplate,
	args: { ...DefaultStoryArgs, defaultValue: true }
};

export const DefaultUncontrolledExample: Story = {
	render: UncontrolledStoryTemplate,
	args: { ...DefaultStoryArgs, defaultValue: true }
};

export const DisabledSwitch: Story = {
	render: ControlledStoryTemplate,
	args: { ...DefaultStoryArgs, disabled: true }
};

export const LabelOnTheLeft: Story = {
	render: ControlledStoryTemplate,
	args: { ...DefaultStoryArgs, showLabelOnTheRight: false }
};
