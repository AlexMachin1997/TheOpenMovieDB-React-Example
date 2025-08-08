import { Meta, StoryObj } from '@storybook/react-vite';

import * as React from 'react';

import CheckboxGroup from '~/components/Core/CheckboxGroup/CheckboxGroup';
import settings from '~/settings';

const meta: Meta<typeof CheckboxGroup> = {
	component: CheckboxGroup,
	title: 'Core/Checkbox Group'
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

const ControlledStoryTemplate = (args: Story['args']) => {
	const [value, setValue] = React.useState(args?.defaultValue ?? []);

	return (
		<CheckboxGroup
			options={args?.options ?? []}
			value={value}
			onChange={(a) => {
				setValue(a.value);
			}}
			noOptionsAvailableMessage={args?.noOptionsAvailableMessage ?? undefined}
			disabled={args?.disabled ?? false}
			name={args?.name ?? 'name'}
			defaultValue={undefined}
		/>
	);
};

const UncontrolledStoryTemplate = (args: Story['args']) => (
	<form>
		<CheckboxGroup
			options={args?.options ?? []}
			value={undefined}
			noOptionsAvailableMessage={args?.noOptionsAvailableMessage ?? undefined}
			disabled={args?.disabled ?? false}
			name={args?.name ?? 'name'}
			defaultValue={args?.defaultValue ?? []}
		/>
	</form>
);

export const ControlledCheckboxGroup: Story = {
	render: ControlledStoryTemplate,
	args: {
		defaultValue: settings.AVAILABILITY_OPTIONS.slice(0, 2).map((option) => option.value),
		options: settings.AVAILABILITY_OPTIONS
	}
};

export const UncontrolledCheckboxGroup: Story = {
	render: ControlledStoryTemplate,
	args: {
		defaultValue: settings.AVAILABILITY_OPTIONS.slice(0, 2).map((option) => option.value),
		options: settings.AVAILABILITY_OPTIONS
	}
};

export const CustomNoOptionsAvailableMessage: Story = {
	render: ControlledStoryTemplate,
	args: {
		options: [],
		noOptionsAvailableMessage: 'My custom no options message'
	}
};

export const Disabled: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		disabled: true,
		defaultValue: settings.AVAILABILITY_OPTIONS.slice(0, 2).map((option) => option.value),
		options: settings.AVAILABILITY_OPTIONS
	}
};

export const DisableCertainOptions: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		defaultValue: ['1', '2'],
		options: [
			{
				label: 'Checkbox 1',
				id: '1',
				disabled: false,
				value: '1',
				order: 1,
				name: 'Checkbox 1'
			},
			{
				label: 'Checkbox 2',
				id: '2',
				disabled: true,
				value: '2',
				order: 2,
				name: 'Checkbox 2'
			},
			{
				label: 'Checkbox 3',
				id: '3',
				disabled: true,
				value: '3',
				order: 3,
				name: 'Checkbox 3'
			}
		]
	}
};
