import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './radio-group';
import type { Option } from './radio-group';

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/RadioGroup',
	component: RadioGroup,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const sampleOptions: Option[] = [
	{ id: 'option-1', value: 'option-one', label: 'Option One' },
	{ id: 'option-2', value: 'option-two', label: 'Option Two' },
	{ id: 'option-3', value: 'option-three', label: 'Option Three' }
];

const sampleOptionsWithLongLabels: Option[] = [
	{
		id: 'option-1',
		value: 'option-one',
		label: 'This is a very long option label that should demonstrate the alignment'
	},
	{ id: 'option-2', value: 'option-two', label: 'Short option' },
	{ id: 'option-3', value: 'option-three', label: 'Another option with medium length text' }
];

const sampleOptionsWithDisabled: Option[] = [
	{ id: 'option-1', value: 'option-one', label: 'Option One' },
	{ id: 'option-2', value: 'option-two', label: 'Option Two (Disabled)', disabled: true },
	{ id: 'option-3', value: 'option-three', label: 'Option Three' }
];

const sampleOptionsWithOrder: Option[] = [
	{ id: 'option-3', value: 'option-three', label: 'Option Three', order: 3 },
	{ id: 'option-1', value: 'option-one', label: 'Option One', order: 1 },
	{ id: 'option-2', value: 'option-two', label: 'Option Two', order: 2 }
];

export const Default: Story = {
	render: () => (
		<RadioGroup options={sampleOptions} name='default-group' defaultValue='option-one' />
	)
};

export const WithDisabledOption: Story = {
	render: () => (
		<RadioGroup
			options={sampleOptionsWithDisabled}
			name='disabled-group'
			defaultValue='option-one'
		/>
	)
};

export const WithDisabledGroup: Story = {
	render: () => (
		<RadioGroup
			options={sampleOptions}
			name='disabled-group'
			defaultValue='option-one'
			disabled={true}
		/>
	)
};

export const LabelPositionRight: Story = {
	render: () => (
		<RadioGroup
			options={sampleOptions}
			name='right-label-group'
			defaultValue='option-one'
			labelPosition='right'
		/>
	)
};

export const LabelPositionRightWithLongLabels: Story = {
	render: () => (
		<RadioGroup
			options={sampleOptionsWithLongLabels}
			name='right-label-long-group'
			defaultValue='option-one'
			labelPosition='right'
		/>
	)
};

export const LabelPositionRightConstrainedWidth: Story = {
	render: () => (
		<div className='max-w-xs'>
			<RadioGroup
				options={sampleOptionsWithLongLabels}
				name='right-label-constrained-group'
				defaultValue='option-one'
				labelPosition='right'
			/>
		</div>
	)
};

export const LabelPositionRightWithFlexContainer: Story = {
	render: () => (
		<div className='max-w-md'>
			<RadioGroup
				options={sampleOptionsWithLongLabels}
				name='right-label-flex-group'
				defaultValue='option-one'
				labelPosition='right'
				className='space-y-2'
			/>
		</div>
	)
};

export const NoOptionsAvailable: Story = {
	render: () => (
		<RadioGroup
			options={[]}
			name='empty-group'
			noOptionsAvailableMessage='No options are currently available for selection.'
		/>
	)
};

export const CustomNoOptionsMessage: Story = {
	render: () => (
		<RadioGroup
			options={[]}
			name='custom-message-group'
			noOptionsAvailableMessage='Please check back later for available options.'
		/>
	)
};

const ControlledComponent = () => {
	const [value, setValue] = React.useState('option-one');

	return (
		<div className='space-y-4'>
			<RadioGroup
				options={sampleOptions}
				name='controlled-group'
				value={value}
				onChange={(data) => {
					console.log(`Selected ${data.value} from group ${data.name}`);
					setValue(data.value);
				}}
			/>
			<p className='text-sm text-muted-foreground'>Selected value: {value}</p>
		</div>
	);
};

export const Controlled: Story = {
	render: () => <ControlledComponent />
};

export const FormExample: Story = {
	render: () => {
		const notificationOptions: Option[] = [
			{ id: 'all', value: 'all', label: 'All notifications' },
			{ id: 'mentions', value: 'mentions', label: 'Mentions only' },
			{ id: 'none', value: 'none', label: 'No notifications' }
		];

		return (
			<div className='w-[350px] space-y-6'>
				<div className='space-y-2'>
					<h4 className='text-sm font-medium leading-none'>Notifications</h4>
					<p className='text-sm text-muted-foreground'>
						Choose what notifications you want to receive.
					</p>
				</div>
				<RadioGroup
					options={notificationOptions}
					name='notifications'
					defaultValue='all'
					onChange={(data) => {
						console.log(`Notification preference changed to ${data.value} for group ${data.name}`);
					}}
				/>
			</div>
		);
	}
};

export const HorizontalLayout: Story = {
	render: () => (
		<RadioGroup
			options={sampleOptions}
			name='horizontal-group'
			defaultValue='option-one'
			className='flex space-x-4'
		/>
	)
};

export const WithOrderedOptions: Story = {
	render: () => (
		<RadioGroup options={sampleOptionsWithOrder} name='ordered-group' defaultValue='option-one' />
	)
};
