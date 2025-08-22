import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioLabel } from './radio';

const meta: Meta<typeof Radio> = {
	title: 'Components/Radio',
	component: Radio,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='radio-group'>
			<div className='flex items-center space-x-2'>
				<Radio id='option1' value='option1' />
				<RadioLabel htmlFor='option1'>Option 1</RadioLabel>
			</div>
		</RadioGroupPrimitive.Root>
	)
};

export const Selected: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='radio-group' defaultValue='option2'>
			<div className='flex items-center space-x-2'>
				<Radio id='option2' value='option2' />
				<RadioLabel htmlFor='option2'>Option 2 (Default checked)</RadioLabel>
			</div>
		</RadioGroupPrimitive.Root>
	)
};

export const Disabled: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='radio-group'>
			<div className='flex items-center space-x-2'>
				<Radio id='disabled' value='disabled' disabled />
				<RadioLabel htmlFor='disabled' disabled>
					This option is disabled
				</RadioLabel>
			</div>
		</RadioGroupPrimitive.Root>
	)
};

export const DisabledAndChecked: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='radio-group' defaultValue='disabled-checked'>
			<div className='flex items-center space-x-2'>
				<Radio id='disabled-checked' value='disabled-checked' disabled />
				<RadioLabel htmlFor='disabled-checked' disabled>
					This option is disabled and checked
				</RadioLabel>
			</div>
		</RadioGroupPrimitive.Root>
	)
};

export const RadioGroup: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='radio-group' defaultValue='option2'>
			<div className='space-y-3'>
				<div className='flex items-center space-x-2'>
					<Radio id='option1' value='option1' />
					<RadioLabel htmlFor='option1'>Option 1</RadioLabel>
				</div>
				<div className='flex items-center space-x-2'>
					<Radio id='option2' value='option2' />
					<RadioLabel htmlFor='option2'>Option 2</RadioLabel>
				</div>
				<div className='flex items-center space-x-2'>
					<Radio id='option3' value='option3' />
					<RadioLabel htmlFor='option3'>Option 3</RadioLabel>
				</div>
			</div>
		</RadioGroupPrimitive.Root>
	)
};

export const CustomStyling: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='radio-group'>
			<div className='flex items-center space-x-2'>
				<Radio
					id='custom'
					value='custom'
					className='border-2 border-blue-500 data-[state=checked]:bg-blue-500'
				/>
				<RadioLabel htmlFor='custom' className='text-blue-600 font-semibold'>
					Custom styled radio
				</RadioLabel>
			</div>
		</RadioGroupPrimitive.Root>
	)
};

export const CustomIconColor: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='radio-group' defaultValue='custom-icon'>
			<div className='space-y-3'>
				<div className='flex items-center space-x-2'>
					<Radio id='custom-icon' value='custom-icon' iconClassName='fill-red-500' />
					<RadioLabel htmlFor='custom-icon'>Red icon</RadioLabel>
				</div>
				<div className='flex items-center space-x-2'>
					<Radio id='custom-icon-2' value='custom-icon-2' iconClassName='fill-green-500' />
					<RadioLabel htmlFor='custom-icon-2'>Green icon</RadioLabel>
				</div>
				<div className='flex items-center space-x-2'>
					<Radio id='custom-icon-3' value='custom-icon-3' iconClassName='fill-purple-500' />
					<RadioLabel htmlFor='custom-icon-3'>Purple icon</RadioLabel>
				</div>
			</div>
		</RadioGroupPrimitive.Root>
	)
};

const ControlledRadio = () => {
	const [value, setValue] = React.useState('option1');

	const handleValueChange = (newValue: string) => {
		setValue(newValue);
	};

	return (
		<RadioGroupPrimitive.Root
			name='controlled-group'
			value={value}
			onValueChange={handleValueChange}
		>
			<div className='space-y-3'>
				<div className='flex items-center space-x-2'>
					<Radio id='controlled1' value='option1' />
					<RadioLabel htmlFor='controlled1'>Option 1</RadioLabel>
				</div>
				<div className='flex items-center space-x-2'>
					<Radio id='controlled2' value='option2' />
					<RadioLabel htmlFor='controlled2'>Option 2</RadioLabel>
				</div>
				<div className='flex items-center space-x-2'>
					<Radio id='controlled3' value='option3' />
					<RadioLabel htmlFor='controlled3'>Option 3</RadioLabel>
				</div>
			</div>
			<p className='text-sm text-muted-foreground'>Selected value: {value}</p>
		</RadioGroupPrimitive.Root>
	);
};

export const Controlled: Story = {
	render: () => <ControlledRadio />
};
