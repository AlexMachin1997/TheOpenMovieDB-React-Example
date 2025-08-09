import { Meta, StoryObj } from '@storybook/react-vite';

import * as React from 'react';

import RadioGroup from '~/components/Core/RadioGroup/RadioGroup';
import Settings from '~/settings';

const meta: Meta<typeof RadioGroup> = {
	component: RadioGroup,
	title: 'Core/Radio Group'
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const ControlledStoryTemplate = (args: Story['args'] = {}) => {
	const [value, setValue] = React.useState(args?.defaultValue ?? '');

	return (
		<RadioGroup
			options={args?.options ?? []}
			name={args?.name ?? 'name'}
			disabled={args?.disabled ?? false}
			labelPosition={args?.labelPosition ?? 'left'}
			noOptionsAvailableMessage={args?.noOptionsAvailableMessage ?? undefined}
			onChange={(a) => {
				setValue(a.value);
			}}
			defaultValue={undefined}
			value={value}
		/>
	);
};

const UncontrolledStoryTemplate = (args: Story['args'] = {}) => (
	<form>
		<RadioGroup
			options={args?.options ?? []}
			name={args?.name ?? 'name'}
			disabled={args?.disabled ?? false}
			labelPosition={args?.labelPosition ?? 'left'}
			noOptionsAvailableMessage={args?.noOptionsAvailableMessage ?? undefined}
			defaultValue={args?.defaultValue}
			value={undefined}
		/>
	</form>
);

export const DefaultRadioGroups: Story = {
	render: UncontrolledStoryTemplate,
	args: {}
};

export const CountriesExample: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		options: Settings.COUNTRY_OPTIONS.slice(0, 10),
		defaultValue: Settings.COUNTRY_OPTIONS.at(0)?.value ?? ''
	}
};

export const UncontrolledRadioGroup: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		defaultValue: '1',
		options: [
			{
				label: 'Radio option 1',
				id: '1',
				value: '1'
			},
			{
				label: 'Radio option 2',
				id: '2',
				value: '2'
			},
			{
				label: 'Radio option 3',
				id: '3',
				value: '3'
			}
		]
	}
};

export const ControlledRadioGroup: Story = {
	render: ControlledStoryTemplate,
	args: {
		defaultValue: '2',
		options: [
			{
				label: 'Radio option 1',
				id: '1',
				value: '1'
			},
			{
				label: 'Radio option 2',
				id: '2',
				value: '2'
			},
			{
				label: 'Radio option 3',
				id: '3',
				value: '3'
			}
		]
	}
};

export const CustomNoOptionsAvailableMessage: Story = {
	render: ControlledStoryTemplate,
	args: {
		options: [],
		noOptionsAvailableMessage: 'My custom no options message'
	}
};

export const DisabledGroup: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		disabled: true,
		options: [
			{
				label: 'Radio option 1',
				id: '1',
				value: '1'
			},
			{
				label: 'Radio option 2',
				id: '2',
				value: '2'
			},
			{
				label: 'Radio option 3',
				id: '3',
				value: '3'
			}
		]
	}
};

export const ShowRadioButtonOnTheRight: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		defaultValue: '3',
		options: [
			{
				label: 'Radio option 1',
				id: '1',
				value: '1'
			},
			{
				label: 'Radio option 2',
				id: '2',
				value: '2'
			},
			{
				label: 'Radio option 3',
				id: '3',
				value: '3'
			}
		],
		labelPosition: 'right'
	}
};
