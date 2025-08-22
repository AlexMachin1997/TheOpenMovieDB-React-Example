import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { SliderInput } from '~/components/sliders/single-slider/single-slider';
import { SingleValue } from '~/components/sliders/single-slider/single-slider-types';
import { cn } from '~/utils/className';

const meta: Meta = {
	title: 'Components/Sliders/Single Slider',
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible slider component that supports both single and dual handle modes, built with Radix UI. Features tooltips for both individual thumbs and drag operations with customizable label formatting.'
			}
		}
	}
};

export default meta;
type Story = StoryObj;

const SingleHandleExample = () => {
	const [value, setValue] = React.useState<SingleValue>([25]);

	const handleChange = React.useCallback((data: SingleValue) => {
		setValue(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value}%`, []);
	const formatSliderTooltip = React.useCallback((value: SingleValue) => `Volume: ${value[0]}%`, []);

	return (
		<SliderInput
			label='Single Handle'
			name='single-handle'
			id='single-handle'
			min={0}
			max={100}
			step={1}
			value={value}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
		/>
	);
};

export const SingleHandle: Story = {
	render: () => <SingleHandleExample />
};

const VolumeControlExample = () => {
	const [value, setValue] = React.useState<SingleValue>([50]);

	const handleChange = React.useCallback((data: SingleValue) => {
		setValue(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value}%`, []);
	const formatSliderTooltip = React.useCallback((value: SingleValue) => `Volume: ${value[0]}%`, []);

	return (
		<SliderInput
			label='Volume Control'
			name='volume-control'
			id='volume-control'
			min={0}
			max={100}
			step={5}
			value={value}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const VolumeControl: Story = {
	render: () => <VolumeControlExample />
};

const DisabledExample = () => {
	const [values, setValues] = React.useState<SingleValue>([30]);

	const handleChange = React.useCallback((data: SingleValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value}%`, []);
	const formatSliderTooltip = React.useCallback((value: SingleValue) => `Volume: ${value[0]}%`, []);

	return (
		<SliderInput
			label='Disabled Slider'
			name='disabled-slider'
			id='disabled-slider'
			min={0}
			max={100}
			step={1}
			value={values}
			onChange={handleChange}
			disabled={true}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const Disabled: Story = {
	render: () => <DisabledExample />
};

const DecimalFormattingExample = () => {
	const [values, setValues] = React.useState<SingleValue>([1.5]);

	const handleChange = React.useCallback((data: SingleValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value}%`, []);
	const formatSliderTooltip = React.useCallback(
		(value: SingleValue) => `Rating: ${value[0].toFixed(1)}`,
		[]
	);

	return (
		<SliderInput
			label='Rating Range'
			name='rating-range'
			id='rating-range'
			min={0}
			max={10}
			step={0.1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const DecimalFormatting: Story = {
	render: () => <DecimalFormattingExample />
};

const FormDataAPIExample = () => {
	const [formData, setFormData] = React.useState<{
		volume: SingleValue;
	}>({
		volume: [50]
	});

	const [submittedData, setSubmittedData] = React.useState<string>('');

	const handleVolumeChange = React.useCallback((data: SingleValue) => {
		setFormData((prev) => ({ ...prev, volume: data }));
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value}%`, []);
	const formatSliderTooltip = React.useCallback((value: SingleValue) => `Volume: ${value[0]}%`, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		// Convert FormData to object
		const data: Record<string, string> = {};
		for (const [key, value] of formData.entries()) {
			data[key] = value as string;
		}

		setSubmittedData(JSON.stringify(data, null, 2));
	};

	return (
		<div className='space-y-6 w-full max-w-lg'>
			<h3 className='text-lg font-semibold'>Form Data API Example</h3>
			<p className='text-sm text-gray-600'>
				This example demonstrates how the slider integrates with native form data API. The hidden
				inputs allow the form to be submitted normally.
			</p>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<SliderInput
					label='Volume Control'
					name='volume'
					id='volume-slider'
					min={0}
					max={100}
					step={5}
					value={formData.volume}
					onChange={handleVolumeChange}
					formatThumbTooltip={formatThumbTooltip}
					formatSliderTooltip={formatSliderTooltip}
					className={cn('w-80')}
				/>

				<button
					type='submit'
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
				>
					Submit Form
				</button>
			</form>

			{submittedData && (
				<div className='p-4 bg-gray-100 rounded-md'>
					<h4 className='font-medium mb-2'>Submitted Form Data:</h4>
					<pre className='text-sm bg-white p-2 rounded border'>{submittedData}</pre>
					<p className='text-xs text-gray-500 mt-2'>
						Notice how the single slider creates a single hidden input with the slider value
					</p>
				</div>
			)}

			<div className='p-4 bg-blue-50 rounded-md'>
				<h4 className='font-medium mb-2 text-blue-800'>How it works:</h4>
				<ul className='text-sm text-blue-700 space-y-1'>
					<li>• Single sliders create one hidden input with the slider value</li>
					<li>
						• Dual sliders create two hidden inputs: {`{name}-min`} and {`{name}-max`}
					</li>
					<li>• Form submission works with any form library (React Hook Form, Formik, etc.)</li>
					<li>• Hidden inputs are accessible to screen readers but visually hidden</li>
				</ul>
			</div>
		</div>
	);
};

export const FormDataAPI: Story = {
	render: () => <FormDataAPIExample />
};

const CustomFormattingExample = () => {
	const [values, setValues] = React.useState<SingleValue>([3]);

	const handleChange = React.useCallback((data: SingleValue) => {
		setValues(data);
	}, []);

	const formatSize = React.useCallback((value: number) => {
		const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
		return sizes[value] || 'N/A';
	}, []);

	const formatSliderTooltip = React.useCallback(
		(value: SingleValue) => `Size: ${formatSize(value[0])}`,
		[formatSize]
	);
	const formatThumbTooltip = React.useCallback((value: number) => formatSize(value), [formatSize]);

	return (
		<SliderInput
			label='Size'
			name='size'
			id='size'
			min={0}
			max={6}
			step={1}
			value={values}
			onChange={handleChange}
			formatSliderTooltip={formatSliderTooltip}
			formatThumbTooltip={formatThumbTooltip}
			className={cn('w-80')}
		/>
	);
};

export const CustomFormatting: Story = {
	render: () => <CustomFormattingExample />
};
