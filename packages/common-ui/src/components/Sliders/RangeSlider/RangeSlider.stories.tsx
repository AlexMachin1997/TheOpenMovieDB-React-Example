import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { RangeSlider } from '~/components/Sliders/RangeSlider/RangeSlider';
import { RangeValue } from '~/components/Sliders/RangeSlider/RangeSlider-Types';
import { cn } from '~/utils/className';

const meta: Meta = {
	title: 'Components/Sliders/Range Slider',
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

const DualHandleExample = () => {
	const [values, setValues] = React.useState<RangeValue>([25, 75]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value}%`, []);
	const formatSliderTooltip = React.useCallback(
		(values: RangeValue) => `Range: ${values[0]}% - ${values[1]}%`,
		[]
	);

	return (
		<RangeSlider
			label='Dual Handle'
			name='dual-handle'
			id='dual-handle'
			min={0}
			max={100}
			step={1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const DualHandle: Story = {
	render: () => <DualHandleExample />
};

const PriceRangeExample = () => {
	const [values, setValues] = React.useState<RangeValue>([100, 500]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `$${value}`, []);
	const formatSliderTooltip = React.useCallback(
		(values: RangeValue) => `Price range: $${values[0]} - $${values[1]}`,
		[]
	);

	return (
		<RangeSlider
			label='Price Range'
			name='price-range'
			id='price-range'
			min={0}
			max={1000}
			step={10}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const PriceRange: Story = {
	render: () => <PriceRangeExample />
};

const AgeRangeExample = () => {
	const [values, setValues] = React.useState<RangeValue>([25, 45]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value} years`, []);
	const formatSliderTooltip = React.useCallback(
		(values: RangeValue) => `Age range: ${values[0]} - ${values[1]} years`,
		[]
	);

	return (
		<RangeSlider
			label='Age Range'
			name='age-range'
			id='age-range'
			min={18}
			max={65}
			step={1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const AgeRange: Story = {
	render: () => <AgeRangeExample />
};

const DisabledExample = () => {
	const [values, setValues] = React.useState<RangeValue>([30, 70]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value}%`, []);

	const formatSliderTooltip = React.useCallback(
		(values: RangeValue) => `Disabled slider - Current range: ${values[0]}% - ${values[1]}%`,
		[]
	);

	return (
		<RangeSlider
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

const TemperatureRangeExample = () => {
	const [values, setValues] = React.useState<RangeValue>([15, 25]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => `${value}°C`, []);
	const formatSliderTooltip = React.useCallback(
		(values: RangeValue) => `Temperature range: ${values[0]}°C - ${values[1]}°C`,
		[]
	);

	return (
		<RangeSlider
			label='Temperature Range'
			name='temperature-range'
			id='temperature-range'
			min={-20}
			max={50}
			step={1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const TemperatureRange: Story = {
	render: () => <TemperatureRangeExample />
};

const CurrencyFormattingExample = () => {
	const [values, setValues] = React.useState<RangeValue>([1000, 5000]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value);
	}, []);

	const formatSliderTooltip = React.useCallback((values: RangeValue) => {
		return `Range: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(values[0])} - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(values[1])}`;
	}, []);

	return (
		<RangeSlider
			label='Currency Range'
			name='currency-range'
			id='currency-range'
			min={0}
			max={10000}
			step={100}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const CurrencyFormatting: Story = {
	render: () => <CurrencyFormattingExample />
};

const TimeRangeExample = () => {
	const [values, setValues] = React.useState<RangeValue>([9, 17]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatSliderTooltip = React.useCallback((values: RangeValue) => {
		const formattedValues = values.map((value) => {
			const period = value >= 12 ? 'PM' : 'AM';
			const displayHour = value === 0 ? 12 : value > 12 ? value - 12 : value;
			return `${displayHour}${period}`;
		});

		return `Business hours: ${formattedValues[0]} - ${formattedValues[1]}`;
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => {
		const period = value >= 12 ? 'PM' : 'AM';
		const displayHour = value === 0 ? 12 : value > 12 ? value - 12 : value;
		return `${displayHour}${period}`;
	}, []);

	return (
		<RangeSlider
			label='Business Hours'
			name='business-hours'
			id='business-hours'
			min={0}
			max={23}
			step={1}
			value={values}
			onChange={handleChange}
			formatThumbTooltip={formatThumbTooltip}
			formatSliderTooltip={formatSliderTooltip}
			className={cn('w-80')}
		/>
	);
};

export const TimeRange: Story = {
	render: () => <TimeRangeExample />
};

const DecimalFormattingExample = () => {
	const [values, setValues] = React.useState<RangeValue>([1.5, 4.2]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatThumbTooltip = React.useCallback((value: number) => {
		return value.toFixed(1);
	}, []);

	const formatSliderTooltip = React.useCallback((values: RangeValue) => {
		return `Rating range: ${values[0].toFixed(1)} - ${values[1].toFixed(1)}`;
	}, []);

	return (
		<RangeSlider
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
		priceRange: RangeValue;
		temperature: RangeValue;
	}>({
		priceRange: [100, 500],
		temperature: [15, 25]
	});

	const [submittedData, setSubmittedData] = React.useState<string>('');

	const handlePriceRangeChange = React.useCallback((data: RangeValue) => {
		setFormData((prev) => ({ ...prev, priceRange: data }));
	}, []);

	const handleTemperatureChange = React.useCallback((data: RangeValue) => {
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

	const formatPriceRangeThumbTooltip = React.useCallback((value: number) => {
		return `$${value}`;
	}, []);

	const formatPriceRangeSliderTooltip = React.useCallback((values: RangeValue) => {
		return `Price: $${values[0]} - $${values[1]}`;
	}, []);

	const formatTemperatureRangeThumbTooltip = React.useCallback((value: number) => {
		return `${value}°C`;
	}, []);

	const formatTemperatureRangeSliderTooltip = React.useCallback((values: RangeValue) => {
		return `Temperature: ${values[0]}°C - ${values[1]}°C`;
	}, []);

	return (
		<div className='space-y-6 w-full max-w-lg'>
			<h3 className='text-lg font-semibold'>Form Data API Example</h3>
			<p className='text-sm text-gray-600'>
				This example demonstrates how the slider integrates with native form data API. The hidden
				inputs allow the form to be submitted normally.
			</p>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<RangeSlider
					label='Price Range'
					name='price-range'
					id='price-range-slider'
					min={0}
					max={1000}
					step={10}
					value={formData.priceRange}
					onChange={handlePriceRangeChange}
					formatThumbTooltip={formatPriceRangeThumbTooltip}
					formatSliderTooltip={formatPriceRangeSliderTooltip}
					className={cn('w-80')}
				/>

				<RangeSlider
					label='Temperature Range'
					name='temperature'
					id='temperature-slider'
					min={-20}
					max={50}
					step={1}
					value={formData.temperature}
					onChange={handleTemperatureChange}
					formatThumbTooltip={formatTemperatureRangeThumbTooltip}
					formatSliderTooltip={formatTemperatureRangeSliderTooltip}
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

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const CustomFormattingExample = () => {
	const [values, setValues] = React.useState<RangeValue>([3, 6]);

	const handleChange = React.useCallback((data: RangeValue) => {
		setValues(data);
	}, []);

	const formatSizeRangeThumbTooltip = React.useCallback((value: number) => {
		return sizes[value] || 'N/A';
	}, []);

	const formatSizeRangeSliderTooltip = React.useCallback((values: RangeValue) => {
		const formattedValues = values.map((value) => {
			return sizes[value] || 'N/A';
		});

		return `Size range: ${formattedValues[0]} - ${formattedValues[1]}`;
	}, []);

	return (
		<RangeSlider
			label='Size Range'
			name='size-range'
			id='size-range'
			min={0}
			max={6}
			step={1}
			value={values}
			onChange={handleChange}
			formatSliderTooltip={formatSizeRangeSliderTooltip}
			formatThumbTooltip={formatSizeRangeThumbTooltip}
			className={cn('w-80')}
		/>
	);
};

export const CustomFormatting: Story = {
	render: () => <CustomFormattingExample />
};
