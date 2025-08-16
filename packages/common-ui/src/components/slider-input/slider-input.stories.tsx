import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SliderInput, SliderValue } from '~/components/slider-input/slider-input';

const meta: Meta = {
	title: 'Components/SliderInput',
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible slider component that supports both single and dual handle modes, built with TanStack Ranger.'
			}
		}
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

const SingleHandleExample = () => {
	const [value, setValue] = React.useState<number>(25);

	const handleChange = React.useCallback((data: SliderValue) => {
		setValue(data.value);
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput mode='single' min={0} max={100} step={1} value={value} onChange={handleChange} />
			<p className='text-sm text-gray-600'>Current value: {value}</p>
		</div>
	);
};

export const SingleHandle: Story = {
	render: () => <SingleHandleExample />
};

const DualHandleExample = () => {
	const [values, setValues] = React.useState<[number, number]>([25, 75]);

	const handleChange = React.useCallback((data: [SliderValue, SliderValue]) => {
		setValues([data[0].value, data[1].value]);
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput mode='dual' min={0} max={100} step={1} value={values} onChange={handleChange} />
			<p className='text-sm text-gray-600'>
				Current range: {values[0]} - {values[1]}
			</p>
		</div>
	);
};

export const DualHandle: Story = {
	render: () => <DualHandleExample />
};

const PriceRangeExample = () => {
	const [values, setValues] = React.useState<[number, number]>([100, 500]);

	const handleChange = React.useCallback((data: [SliderValue, SliderValue]) => {
		setValues([data[0].value, data[1].value]);
	}, []);

	const formatLabel = React.useCallback((value: number, index?: number) => {
		if (index === 0) return `Min: $${value}`;
		if (index === 1) return `Max: $${value}`;
		return `$${value}`;
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput
				mode='dual'
				min={0}
				max={1000}
				step={10}
				value={values}
				onChange={handleChange}
				formatLabel={formatLabel}
			/>
			<p className='text-sm text-gray-600'>
				Price range: ${values[0]} - ${values[1]}
			</p>
		</div>
	);
};

export const PriceRange: Story = {
	render: () => <PriceRangeExample />
};

const AgeRangeExample = () => {
	const [values, setValues] = React.useState<[number, number]>([25, 45]);

	const handleChange = React.useCallback((data: [SliderValue, SliderValue]) => {
		setValues([data[0].value, data[1].value]);
	}, []);

	const formatLabel = React.useCallback((value: number, index?: number) => {
		if (index === 0) return `Min Age: ${value}`;
		if (index === 1) return `Max Age: ${value}`;
		return `${value} years`;
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput
				mode='dual'
				min={18}
				max={65}
				step={1}
				value={values}
				onChange={handleChange}
				formatLabel={formatLabel}
			/>
			<p className='text-sm text-gray-600'>
				Age range: {values[0]} - {values[1]} years
			</p>
		</div>
	);
};

export const AgeRange: Story = {
	render: () => <AgeRangeExample />
};

const VolumeControlExample = () => {
	const [value, setValue] = React.useState<number>(50);

	const handleChange = React.useCallback((data: SliderValue) => {
		setValue(data.value);
	}, []);

	const formatLabel = React.useCallback((value: number) => `Volume: ${value}%`, []);

	return (
		<div className='space-y-4'>
			<SliderInput
				mode='single'
				min={0}
				max={100}
				step={5}
				value={value}
				onChange={handleChange}
				formatLabel={formatLabel}
			/>
			<p className='text-sm text-gray-600'>Volume: {value}%</p>
		</div>
	);
};

export const VolumeControl: Story = {
	render: () => <VolumeControlExample />
};

const DisabledExample = () => {
	const [values, setValues] = React.useState<[number, number]>([30, 70]);

	const handleChange = React.useCallback((data: [SliderValue, SliderValue]) => {
		setValues([data[0].value, data[1].value]);
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput
				mode='dual'
				min={0}
				max={100}
				step={1}
				value={values}
				onChange={handleChange}
				disabled={true}
			/>
			<p className='text-sm text-gray-600'>
				Disabled slider - Current range: {values[0]} - {values[1]}
			</p>
		</div>
	);
};

export const Disabled: Story = {
	render: () => <DisabledExample />
};

const TemperatureRangeExample = () => {
	const [values, setValues] = React.useState<[number, number]>([15, 25]);

	const handleChange = React.useCallback((data: [SliderValue, SliderValue]) => {
		setValues([data[0].value, data[1].value]);
	}, []);

	const formatLabel = React.useCallback((value: number, index?: number) => {
		if (index === 0) return `Min: ${value}°C`;
		if (index === 1) return `Max: ${value}°C`;
		return `${value}°C`;
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput
				mode='dual'
				min={-20}
				max={50}
				step={1}
				value={values}
				onChange={handleChange}
				formatLabel={formatLabel}
			/>
			<p className='text-sm text-gray-600'>
				Temperature range: {values[0]}°C - {values[1]}°C
			</p>
		</div>
	);
};

export const TemperatureRange: Story = {
	render: () => <TemperatureRangeExample />
};

const ControlledExample = () => {
	const [singleValue, setSingleValue] = React.useState<number>(30);
	const [rangeValues, setRangeValues] = React.useState<[number, number]>([20, 80]);

	const handleSingleChange = React.useCallback((data: SliderValue) => {
		setSingleValue(data.value);
	}, []);

	const handleRangeChange = React.useCallback((data: [SliderValue, SliderValue]) => {
		setRangeValues([data[0].value, data[1].value]);
	}, []);

	const formatLabel = React.useCallback((value: number, index?: number) => {
		if (index === 0) return `Min: ${value}`;
		if (index === 1) return `Max: ${value}`;
		return `${value}`;
	}, []);

	return (
		<div className='space-y-8 w-full max-w-2xl'>
			<div>
				<h3 className='text-lg font-semibold mb-4'>Controlled Single Handle</h3>
				<SliderInput
					mode='single'
					min={0}
					max={100}
					step={1}
					value={singleValue}
					onChange={handleSingleChange}
					formatLabel={formatLabel}
				/>
				<p className='mt-2 text-sm text-gray-600'>Current value: {singleValue}</p>
			</div>

			<div>
				<h3 className='text-lg font-semibold mb-4'>Controlled Dual Handle</h3>
				<SliderInput
					mode='dual'
					min={0}
					max={100}
					step={1}
					value={rangeValues}
					onChange={handleRangeChange}
					formatLabel={formatLabel}
				/>
				<p className='mt-2 text-sm text-gray-600'>
					Current range: {rangeValues[0]} - {rangeValues[1]}
				</p>
			</div>
		</div>
	);
};

export const Controlled: Story = {
	render: () => <ControlledExample />
};

// Form integration example - proper React component for hooks
const FormIntegrationExample = () => {
	const [formData, setFormData] = React.useState<{
		budget: number;
		ageRange: [number, number];
	}>({
		budget: 500,
		ageRange: [25, 40] as [number, number]
	});

	const handleBudgetChange = React.useCallback((data: SliderValue) => {
		setFormData((prev) => ({ ...prev, budget: data.value }));
	}, []);

	const handleAgeRangeChange = React.useCallback((data: [SliderValue, SliderValue]) => {
		setFormData((prev) => ({ ...prev, ageRange: [data[0].value, data[1].value] }));
	}, []);

	const formatLabel = React.useCallback((value: number, index?: number) => {
		if (index === 0) return `Min: ${value}`;
		if (index === 1) return `Max: ${value}`;
		return `${value}`;
	}, []);

	return (
		<div className='space-y-6 w-full max-w-lg'>
			<h3 className='text-lg font-semibold'>Form Example</h3>

			<div>
				<label htmlFor='budget-slider' className='block text-sm font-medium mb-2'>
					Budget
				</label>
				<SliderInput
					id='budget-slider'
					mode='single'
					min={0}
					max={2000}
					step={50}
					value={formData.budget}
					onChange={handleBudgetChange}
					formatLabel={(value) => `$${value}`}
					name='budget'
				/>
			</div>

			<div>
				<label htmlFor='age-range-slider' className='block text-sm font-medium mb-2'>
					Age Range
				</label>
				<SliderInput
					id='age-range-slider'
					mode='dual'
					min={18}
					max={70}
					step={1}
					value={formData.ageRange}
					onChange={handleAgeRangeChange}
					formatLabel={formatLabel}
					name='ageRange'
				/>
			</div>

			<div className='p-4 bg-gray-100 rounded-md'>
				<h4 className='font-medium mb-2'>Form Data:</h4>
				<pre className='text-sm'>{JSON.stringify(formData, null, 2)}</pre>
			</div>
		</div>
	);
};

export const FormIntegration: Story = {
	render: () => <FormIntegrationExample />
};
