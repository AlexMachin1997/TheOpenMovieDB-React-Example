import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Radio, RadioLabel } from '~/components/Radio/Radio';

const meta: Meta<typeof Radio> = {
	title: 'UI Core/Radio',
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

export const LabelPassthroughProps: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='radio-group'>
			<div className='flex items-center space-x-2'>
				<Radio id='passthrough' value='passthrough' />
				<RadioLabel htmlFor='passthrough' data-testid='passthrough-label' title='extra prop'>
					Label with passthrough props
				</RadioLabel>
			</div>
		</RadioGroupPrimitive.Root>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const label = canvas.getByTestId('passthrough-label');

		// RadioLabel must forward unrecognised props (id/title/data-*/etc.) onto the
		// underlying Label element instead of silently dropping them.
		expect(label).toHaveAttribute('title', 'extra prop');
	}
};

export const DisabledLabelDimsWithItsRadio: Story = {
	render: () => (
		<RadioGroupPrimitive.Root name='peer-check'>
			<div className='flex items-center space-x-2'>
				<Radio id='peer-disabled' value='peer-disabled' disabled />
				<RadioLabel htmlFor='peer-disabled' data-testid='disabled-label'>
					Disabled option
				</RadioLabel>
			</div>
			<div className='flex items-center space-x-2'>
				<Radio id='peer-enabled' value='peer-enabled' />
				<RadioLabel htmlFor='peer-enabled' data-testid='enabled-label'>
					Enabled option
				</RadioLabel>
			</div>
		</RadioGroupPrimitive.Root>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// RadioLabel has always carried `peer-disabled:opacity-70`, but Radio's class string was
		// missing `peer`, and Tailwind's `peer-*` only matches a `.peer` preceding it as a sibling —
		// so the rule silently matched nothing. Flagged in 04, fixed in 05. Asserting the computed
		// style rather than the class, because the class was present all along; it was the selector
		// that never fired.
		const disabledLabel = canvas.getByTestId('disabled-label');
		const enabledLabel = canvas.getByTestId('enabled-label');

		expect(canvas.getByTestId('disabled-label').previousElementSibling).toHaveClass('peer');
		expect(getComputedStyle(disabledLabel).opacity).toBe('0.7');
		expect(getComputedStyle(enabledLabel).opacity).toBe('1');
		expect(getComputedStyle(disabledLabel).cursor).toBe('not-allowed');
	}
};
