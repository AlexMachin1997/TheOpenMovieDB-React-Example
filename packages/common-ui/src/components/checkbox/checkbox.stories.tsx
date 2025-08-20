import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxLabel } from './checkbox';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className='flex items-center space-x-2'>
			<Checkbox id='terms' />
			<CheckboxLabel htmlFor='terms'>Accept terms and conditions</CheckboxLabel>
		</div>
	)
};

export const Checked: Story = {
	render: () => (
		<div className='flex items-center space-x-2'>
			<Checkbox id='newsletter' defaultChecked />
			<CheckboxLabel htmlFor='newsletter'>Subscribe to newsletter</CheckboxLabel>
		</div>
	)
};

export const Disabled: Story = {
	render: () => (
		<div className='flex items-center space-x-2'>
			<Checkbox id='disabled' disabled />
			<CheckboxLabel htmlFor='disabled' disabled>
				This option is disabled
			</CheckboxLabel>
		</div>
	)
};

export const DisabledChecked: Story = {
	render: () => (
		<div className='flex items-center space-x-2'>
			<Checkbox id='disabled-checked' defaultChecked disabled />
			<CheckboxLabel htmlFor='disabled-checked' disabled>
				This option is disabled and checked
			</CheckboxLabel>
		</div>
	)
};

export const CheckboxGroup: Story = {
	render: () => (
		<div className='space-y-3'>
			<div className='flex items-center space-x-2'>
				<Checkbox id='option1' />
				<CheckboxLabel htmlFor='option1'>Option 1</CheckboxLabel>
			</div>
			<div className='flex items-center space-x-2'>
				<Checkbox id='option2' defaultChecked />
				<CheckboxLabel htmlFor='option2'>Option 2</CheckboxLabel>
			</div>
			<div className='flex items-center space-x-2'>
				<Checkbox id='option3' />
				<CheckboxLabel htmlFor='option3'>Option 3</CheckboxLabel>
			</div>
		</div>
	)
};

export const CustomStyling: Story = {
	render: () => (
		<div className='flex items-center space-x-2'>
			<Checkbox id='custom' className='border-2 border-blue-500 data-[state=checked]:bg-blue-500' />
			<CheckboxLabel htmlFor='custom' className='text-blue-600 font-semibold'>
				Custom styled checkbox
			</CheckboxLabel>
		</div>
	)
};

export const CustomIconColor: Story = {
	render: () => (
		<div className='space-y-3'>
			<div className='flex items-center space-x-2'>
				<Checkbox id='custom-icon-1' defaultChecked iconClassName='text-red-500' />
				<CheckboxLabel htmlFor='custom-icon-1'>Red checkmark</CheckboxLabel>
			</div>
			<div className='flex items-center space-x-2'>
				<Checkbox id='custom-icon-2' defaultChecked iconClassName='text-green-500' />
				<CheckboxLabel htmlFor='custom-icon-2'>Green checkmark</CheckboxLabel>
			</div>
			<div className='flex items-center space-x-2'>
				<Checkbox id='custom-icon-3' defaultChecked iconClassName='text-purple-500' />
				<CheckboxLabel htmlFor='custom-icon-3'>Purple checkmark</CheckboxLabel>
			</div>
		</div>
	)
};

const ControlledCheckbox = () => {
	const [isChecked, setIsChecked] = React.useState(false);

	const handleCheckboxChange = (checked: boolean) => {
		console.log('checked', checked);
		setIsChecked(checked);
	};

	return (
		<div className='flex items-center space-x-2'>
			<Checkbox id='controlled' checked={isChecked} onCheckedChange={handleCheckboxChange} />
			<CheckboxLabel htmlFor='controlled'>
				Controlled checkbox: {isChecked ? 'Checked' : 'Unchecked'}
			</CheckboxLabel>
		</div>
	);
};

export const Controlled: Story = {
	render: () => <ControlledCheckbox />
};
