import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './radio-group';
import type { Option } from '~/types/Option';

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/Radio group',
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

export const WithCustomIconColor: Story = {
	render: () => (
		<RadioGroup
			options={sampleOptions}
			name='custom-icon-group'
			defaultValue='option-one'
			iconClassName='fill-blue-500'
		/>
	)
};
