import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SliderInput } from '~/components/slider-input/slider-input';
import { DualValue, SingleValue } from '~/components/slider-input/types';
import { cn } from '~/utils/className';

const meta: Meta = {
	title: 'Components/SliderInput',
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible slider component that supports both single and dual handle modes, built with Radix UI. Features tooltips for both individual thumbs and drag operations with customizable label formatting.'
			}
		}
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

const SingleHandleExample = () => {
	const [value, setValue] = React.useState<SingleValue>([25]);

	const handleChange = React.useCallback((data: SingleValue) => {
		setValue(data);
	}, []);

	return (
		<SliderInput
			label='Single Handle'
			name='single-handle'
			id='single-handle'
			mode='single'
			min={0}
			max={100}
			step={1}
			value={value}
			onChange={handleChange}
			formatThumbTooltip={(value) => `${value}%`}
			formatSliderTooltip={(value) => `Volume: ${value}%`}
		/>
	);
};

export const SingleHandle: Story = {
	render: () => <SingleHandleExample />
};

const DualHandleExample = () => {
	const [values, setValues] = React.useState<DualValue>([25, 75]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	return (
		<SliderInput
			label='Dual Handle'
			name='dual-handle'
			id='dual-handle'
			mode='dual'
			min={0}
			max={100}
			step={1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={(value) => `${value}%`}
			formatSliderTooltip={(values) => `Range: ${values[0]}% - ${values[1]}%`}
			className={cn('w-80')}
		/>
	);
};

export const DualHandle: Story = {
	render: () => <DualHandleExample />
};

const PriceRangeExample = () => {
	const [values, setValues] = React.useState<DualValue>([100, 500]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	return (
		<SliderInput
			label='Price Range'
			name='price-range'
			id='price-range'
			mode='dual'
			min={0}
			max={1000}
			step={10}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={(value) => `$${value}`}
			formatSliderTooltip={(values) => `Price range: $${values[0]} - $${values[1]}`}
			className={cn('w-80')}
		/>
	);
};

export const PriceRange: Story = {
	render: () => <PriceRangeExample />
};

const AgeRangeExample = () => {
	const [values, setValues] = React.useState<DualValue>([25, 45]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	return (
		<SliderInput
			label='Age Range'
			name='age-range'
			id='age-range'
			mode='dual'
			min={18}
			max={65}
			step={1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={(value) => `${value} years`}
			formatSliderTooltip={(values) => `Age range: ${values[0]} - ${values[1]} years`}
			className={cn('w-80')}
		/>
	);
};

export const AgeRange: Story = {
	render: () => <AgeRangeExample />
};

const VolumeControlExample = () => {
	const [value, setValue] = React.useState<SingleValue>([50]);

	const handleChange = React.useCallback((data: SingleValue) => {
		setValue(data);
	}, []);

	return (
		<SliderInput
			label='Volume Control'
			name='volume-control'
			id='volume-control'
			mode='single'
			min={0}
			max={100}
			step={5}
			value={value}
			onChange={handleChange}
			formatThumbTooltip={(value) => `${value}%`}
			formatSliderTooltip={(value) => `Volume: ${value[0]}%`}
			className={cn('w-80')}
		/>
	);
};

export const VolumeControl: Story = {
	render: () => <VolumeControlExample />
};

const DisabledExample = () => {
	const [values, setValues] = React.useState<DualValue>([30, 70]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	return (
		<SliderInput
			label='Disabled Slider'
			name='disabled-slider'
			id='disabled-slider'
			mode='dual'
			min={0}
			max={100}
			step={1}
			value={values}
			onChange={handleChange}
			disabled={true}
			formatThumbTooltip={(value) => `${value}%`}
			formatSliderTooltip={(values) =>
				`Disabled slider - Current range: ${values[0]}% - ${values[1]}%`
			}
			className={cn('w-80')}
		/>
	);
};

export const Disabled: Story = {
	render: () => <DisabledExample />
};

const TemperatureRangeExample = () => {
	const [values, setValues] = React.useState<DualValue>([15, 25]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	return (
		<SliderInput
			label='Temperature Range'
			name='temperature-range'
			id='temperature-range'
			mode='dual'
			min={-20}
			max={50}
			step={1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={(value) => `${value}°C`}
			formatSliderTooltip={(values) => `Temperature range: ${values[0]}°C - ${values[1]}°C`}
			className={cn('w-80')}
		/>
	);
};

export const TemperatureRange: Story = {
	render: () => <TemperatureRangeExample />
};

const CurrencyFormattingExample = () => {
	const [values, setValues] = React.useState<DualValue>([1000, 5000]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	return (
		<SliderInput
			label='Currency Range'
			name='currency-range'
			id='currency-range'
			mode='dual'
			min={0}
			max={10000}
			step={100}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={(value) =>
				new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				}).format(value)
			}
			formatSliderTooltip={(values) =>
				`Range: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(values[0])} - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(values[1])}`
			}
			className={cn('w-80')}
		/>
	);
};

export const CurrencyFormatting: Story = {
	render: () => <CurrencyFormattingExample />
};

const TimeRangeExample = () => {
	const [values, setValues] = React.useState<DualValue>([9, 17]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	const formatTime = (hour: number) => {
		const period = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
		return `${displayHour}${period}`;
	};

	return (
		<SliderInput
			label='Business Hours'
			name='business-hours'
			id='business-hours'
			mode='dual'
			min={0}
			max={23}
			step={1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={formatTime}
			formatSliderTooltip={(values) =>
				`Business hours: ${formatTime(values[0])} - ${formatTime(values[1])}`
			}
			className={cn('w-80')}
		/>
	);
};

export const TimeRange: Story = {
	render: () => <TimeRangeExample />
};

const DecimalFormattingExample = () => {
	const [values, setValues] = React.useState<DualValue>([1.5, 4.2]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	return (
		<SliderInput
			label='Rating Range'
			name='rating-range'
			id='rating-range'
			mode='dual'
			min={0}
			max={10}
			step={0.1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={(value) => value.toFixed(1)}
			formatSliderTooltip={(values) =>
				`Rating range: ${values[0].toFixed(1)} - ${values[1].toFixed(1)}`
			}
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
		priceRange: DualValue;
		temperature: DualValue;
	}>({
		volume: [50],
		priceRange: [100, 500],
		temperature: [15, 25]
	});

	const [submittedData, setSubmittedData] = React.useState<string>('');

	const handleVolumeChange = React.useCallback((data: SingleValue) => {
		setFormData((prev) => ({ ...prev, volume: data }));
	}, []);

	const handlePriceRangeChange = React.useCallback((data: DualValue) => {
		setFormData((prev) => ({ ...prev, priceRange: data }));
	}, []);

	const handleTemperatureChange = React.useCallback((data: DualValue) => {
		setFormData((prev) => ({ ...prev, temperature: data }));
	}, []);

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
					mode='single'
					min={0}
					max={100}
					step={5}
					value={formData.volume}
					onChange={handleVolumeChange}
					formatThumbTooltip={(value) => `${value}%`}
					formatSliderTooltip={(value) => `Volume: ${value}%`}
					className={cn('w-80')}
				/>

				<SliderInput
					label='Price Range'
					name='price-range'
					id='price-range-slider'
					mode='dual'
					min={0}
					max={1000}
					step={10}
					value={formData.priceRange}
					onChange={handlePriceRangeChange}
					formatThumbTooltip={(value) => `$${value}`}
					formatSliderTooltip={(values) => `Price: $${values[0]} - $${values[1]}`}
					className={cn('w-80')}
				/>

				<SliderInput
					label='Temperature Range'
					name='temperature'
					id='temperature-slider'
					mode='dual'
					min={-20}
					max={50}
					step={1}
					value={formData.temperature}
					onChange={handleTemperatureChange}
					formatThumbTooltip={(value) => `${value}°C`}
					formatSliderTooltip={(values) => `Temperature: ${values[0]}°C - ${values[1]}°C`}
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
						Notice how the dual sliders create separate fields (e.g., temperature-min,
						temperature-max)
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
	const [values, setValues] = React.useState<DualValue>([3, 6]);

	const handleChange = React.useCallback((data: DualValue) => {
		setValues(data);
	}, []);

	const formatSize = (value: number) => {
		const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
		return sizes[value] || 'N/A';
	};

	return (
		<SliderInput
			label='Size Range'
			name='size-range'
			id='size-range'
			mode='dual'
			min={0}
			max={6}
			step={1}
			value={values}
			onChange={handleChange}
			formatSliderTooltip={(values) =>
				`Size range: ${formatSize(values[0])} - ${formatSize(values[1])}`
			}
			formatThumbTooltip={(value) => formatSize(value)}
			className={cn('w-80')}
		/>
	);
};

export const CustomFormatting: Story = {
	render: () => <CustomFormattingExample />
};
