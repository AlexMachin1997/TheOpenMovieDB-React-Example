import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SliderInput } from '~/components/slider-input/slider-input';
import { DualValue, SingleValue } from './types';

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
	const [value, setValue] = React.useState<[number]>([25]);

	const handleChange = React.useCallback((data: [number]) => {
		setValue(data);
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput mode='single' min={0} max={100} step={1} value={value} onChange={handleChange}>
				{value}
			</SliderInput>
			<p className='text-sm text-gray-600'>Current value: {value}</p>
		</div>
	);
};

export const SingleHandle: Story = {
	render: () => <SingleHandleExample />
};

const DualHandleExample = () => {
	const [values, setValues] = React.useState<[number, number]>([25, 75]);

	const handleChange = React.useCallback((data: [number, number]) => {
		setValues(data);
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput mode='dual' min={0} max={100} step={1} value={values} onChange={handleChange}>
				{values[0]} - {values[1]}
			</SliderInput>
		</div>
	);
};

export const DualHandle: Story = {
	render: () => <DualHandleExample />
};

const PriceRangeExample = () => {
	const [values, setValues] = React.useState<[number, number]>([100, 500]);

	const handleChange = React.useCallback((data: [number, number]) => {
		setValues(data);
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput mode='dual' min={0} max={1000} step={10} value={values} onChange={handleChange}>
				Min: ${values[0]} - Max: ${values[1]}
			</SliderInput>
		</div>
	);
};

export const PriceRange: Story = {
	render: () => <PriceRangeExample />
};

const AgeRangeExample = () => {
	const [values, setValues] = React.useState<[number, number]>([25, 45]);

	const handleChange = React.useCallback((data: [number, number]) => {
		setValues(data);
	}, []);

	return (
		<div className='space-y-4'>
			<SliderInput mode='dual' min={18} max={65} step={1} value={values} onChange={handleChange}>
				<p className='text-sm text-white'>
					Age range: {values[0]} - {values[1]} years
				</p>
			</SliderInput>
		</div>
	);
};

export const AgeRange: Story = {
	render: () => <AgeRangeExample />
};

const VolumeControlExample = () => {
	const [value, setValue] = React.useState<[number]>([50]);

	const handleChange = React.useCallback((data: SingleValue) => {
		setValue(data);
	}, []);

	return (
		<SliderInput mode='single' min={0} max={100} step={5} value={value} onChange={handleChange}>
			<p className='text-sm text-white'>Volume: {value}%</p>
		</SliderInput>
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
		<div className='space-y-4'>
			<SliderInput
				mode='dual'
				min={0}
				max={100}
				step={1}
				value={values}
				onChange={handleChange}
				disabled={true}
			>
				<p className='text-sm text-white'>
					Disabled slider - Current range: {values[0]} - {values[1]}
				</p>
			</SliderInput>
		</div>
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
		<div className='space-y-4'>
			<SliderInput mode='dual' min={-20} max={50} step={1} value={values} onChange={handleChange}>
				<p className='text-sm text-white'>
					Temperature range: {values[0]}°C - {values[1]}°C
				</p>
			</SliderInput>
		</div>
	);
};

export const TemperatureRange: Story = {
	render: () => <TemperatureRangeExample />
};

const FormIntegrationExample = () => {
	const [formData, setFormData] = React.useState<{
		budget: SingleValue;
		ageRange: DualValue;
	}>({
		budget: [500],
		ageRange: [25, 40]
	});

	const handleBudgetChange = React.useCallback((data: SingleValue) => {
		setFormData((prev) => ({ ...prev, budget: data }));
	}, []);

	const handleAgeRangeChange = React.useCallback((data: DualValue) => {
		setFormData((prev) => ({ ...prev, ageRange: data }));
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
				>
					<p className='text-sm text-white'>Budget: ${formData.budget}</p>
				</SliderInput>
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
				>
					<p className='text-sm text-white'>
						Age range: {formData.ageRange[0]} - {formData.ageRange[1]} years
					</p>
				</SliderInput>
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
