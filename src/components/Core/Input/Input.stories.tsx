import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';

import Input from './Input';

const meta: Meta<typeof Input> = {
	component: Input,
	title: 'Design System/Core/Input'
};

export default meta;

type Story = StoryObj<typeof Input>;

const ControlledTemplate = (args: Story['args'] = {}) => {
	const { defaultValue = '', ...reset } = args;

	const [value, setValue] = React.useState(defaultValue);

	return (
		<Input
			label={args?.label ?? 'Default label'}
			type={args?.type ?? 'text'}
			onChange={(event) => {
				setValue(event?.target?.value);
			}}
			value={value}
			{...reset}
		/>
	);
};

const UncontrolledTemplate = (args: Story['args'] = {}) => (
	<Input
		label={args?.label ?? 'Default label'}
		type={args?.type ?? 'text'}
		defaultValue={args?.defaultValue}
		{...args}
	/>
);

export const ControlledTextInput: Story = {
	render: ControlledTemplate,

	args: {
		label: 'From',
		id: 'From',
		name: 'From',
		defaultValue: 'AlexMachin'
	}
};

export const UncontrolledTextInput: Story = {
	render: UncontrolledTemplate,

	args: {
		label: 'From',
		id: 'From',
		name: 'From',
		defaultValue: 'AlexMachin'
	}
};

export const ControlledNumberInput: Story = {
	render: ControlledTemplate,

	args: {
		type: 'number',
		min: 0,
		max: 100,
		step: 5,
		inputMode: 'numeric',
		name: 'number',
		defaultValue: 100,
		label: 'User Score',
		id: 'number'
	}
};

export const UncontrolledNumberInput: Story = {
	render: UncontrolledTemplate,

	args: {
		type: 'number',
		min: 0,
		max: 100,
		step: 5,
		inputMode: 'numeric',
		name: 'number',
		defaultValue: 100,
		label: 'User Score',
		id: 'number'
	}
};

export const ControlledDateInput: Story = {
	render: ControlledTemplate,

	args: {
		type: 'date',
		label: 'Date range',
		id: 'date',
		containerClassName: 'flex items-center',
		labelClassName: 'w-[100px] text-black',
		name: 'date',
		defaultValue: '2022-10-20' // Must only be the date in this specific format, it can't include the time as well otherwise the defaultValue won't be used by the input
	}
};

export const UncontrolledDateInput: Story = {
	render: UncontrolledTemplate,

	args: {
		type: 'date',
		label: 'Date range',
		id: 'date',
		containerClassName: 'flex items-center',
		labelClassName: 'w-[100px] text-black',
		name: 'date',
		defaultValue: '2022-10-20' // Must only be the date in this specific format, it can't include the time as well otherwise the defaultValue won't be used by the input
	}
};
