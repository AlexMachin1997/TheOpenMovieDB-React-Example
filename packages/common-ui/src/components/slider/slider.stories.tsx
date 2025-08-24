import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '~/components/slider';
import { Label } from '~/components/label/label';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '~/components/tooltip/tooltip';

const meta: Meta = {
	title: 'Components/Slider',
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Individual slider components that can be composed together for maximum customization. Use these when you need full control over styling and behavior.'
			}
		}
	}
};

export default meta;
type Story = StoryObj;

// Basic single slider example
const BasicSingleSlider = () => {
	const [value, setValue] = React.useState([50]);

	return (
		<div className='space-y-4 w-full max-w-md'>
			<Label htmlFor='basic-slider'>Basic Slider</Label>
			<SliderRoot value={value} onValueChange={setValue} min={0} max={100} step={1} className='h-6'>
				<SliderTrack>
					<SliderRange />
				</SliderTrack>
				<SliderThumb />
			</SliderRoot>
			<p className='text-sm text-gray-600'>Value: {value[0]}</p>
		</div>
	);
};

export const Basic: Story = {
	render: () => <BasicSingleSlider />
};

// Dual slider example
const DualSlider = () => {
	const [value, setValue] = React.useState([25, 75]);

	return (
		<div className='space-y-4 w-full max-w-md'>
			<Label htmlFor='dual-slider'>Range Slider</Label>
			<SliderRoot value={value} onValueChange={setValue} min={0} max={100} step={1} className='h-6'>
				<SliderTrack>
					<SliderRange />
				</SliderTrack>
				<SliderThumb />
				<SliderThumb />
			</SliderRoot>
			<p className='text-sm text-gray-600'>
				Range: {value[0]} - {value[1]}
			</p>
		</div>
	);
};

export const Dual: Story = {
	render: () => <DualSlider />
};

// Custom styling examples
const CustomStylingExample = () => {
	const [value, setValue] = React.useState([60]);

	return (
		<div className='space-y-8 w-full max-w-md'>
			<h3 className='text-lg font-semibold'>Custom Styling Examples</h3>

			<div className='space-y-4'>
				<Label htmlFor='custom-track'>Custom Track & Range</Label>
				<SliderRoot
					value={value}
					onValueChange={setValue}
					min={0}
					max={100}
					step={1}
					className='h-8'
				>
					<SliderTrack className='bg-gray-300 h-3 rounded-full'>
						<SliderRange className='bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full' />
					</SliderTrack>
					<SliderThumb />
				</SliderRoot>
			</div>

			<div className='space-y-4'>
				<Label htmlFor='custom-thumb'>Custom Thumb</Label>
				<SliderRoot
					value={value}
					onValueChange={setValue}
					min={0}
					max={100}
					step={1}
					className='h-6'
				>
					<SliderTrack>
						<SliderRange />
					</SliderTrack>
					<SliderThumb className='w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white shadow-lg hover:scale-110 transition-transform' />
				</SliderRoot>
			</div>

			<div className='space-y-4'>
				<Label htmlFor='custom-all'>Custom Everything</Label>
				<SliderRoot
					value={value}
					onValueChange={setValue}
					min={0}
					max={100}
					step={1}
					className='h-10'
				>
					<SliderTrack className='bg-gray-100 h-4 rounded-full border border-gray-200 shadow-inner'>
						<SliderRange className='bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full rounded-full shadow-lg' />
					</SliderTrack>
					<SliderThumb className='w-8 h-8 bg-white border-4 border-emerald-500 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 focus:ring-4 focus:ring-emerald-200' />
				</SliderRoot>
			</div>
		</div>
	);
};

export const CustomStyling: Story = {
	render: () => <CustomStylingExample />
};

// Theme variants
const ThemeVariantsExample = () => {
	const [value, setValue] = React.useState([75]);

	return (
		<div className='space-y-8 w-full max-w-md'>
			<h3 className='text-lg font-semibold'>Theme Variants</h3>

			<div className='space-y-4'>
				<Label htmlFor='success-slider'>Success Theme</Label>
				<SliderRoot
					value={value}
					onValueChange={setValue}
					min={0}
					max={100}
					step={1}
					className='h-6'
				>
					<SliderTrack className='bg-gray-200 h-2 rounded-full'>
						<SliderRange className='bg-green-500 h-full rounded-full' />
					</SliderTrack>
					<SliderThumb className='w-5 h-5 bg-green-500 border-2 border-white shadow-md hover:bg-green-600' />
				</SliderRoot>
			</div>

			<div className='space-y-4'>
				<Label htmlFor='warning-slider'>Warning Theme</Label>
				<SliderRoot
					value={value}
					onValueChange={setValue}
					min={0}
					max={100}
					step={1}
					className='h-6'
				>
					<SliderTrack className='bg-gray-200 h-2 rounded-full'>
						<SliderRange className='bg-yellow-500 h-full rounded-full' />
					</SliderTrack>
					<SliderThumb className='w-5 h-5 bg-yellow-500 border-2 border-white shadow-md hover:bg-yellow-600' />
				</SliderRoot>
			</div>

			<div className='space-y-4'>
				<Label htmlFor='danger-slider'>Danger Theme</Label>
				<SliderRoot
					value={value}
					onValueChange={setValue}
					min={0}
					max={100}
					step={1}
					className='h-6'
				>
					<SliderTrack className='bg-gray-200 h-2 rounded-full'>
						<SliderRange className='bg-red-500 h-full rounded-full' />
					</SliderTrack>
					<SliderThumb className='w-5 h-5 bg-red-500 border-2 border-white shadow-md hover:bg-red-600' />
				</SliderRoot>
			</div>
		</div>
	);
};

export const ThemeVariants: Story = {
	render: () => <ThemeVariantsExample />
};

// With tooltips
const WithTooltipsExample = () => {
	const [value, setValue] = React.useState([60]);

	return (
		<div className='space-y-8 w-full max-w-md'>
			<h3 className='text-lg font-semibold'>With Tooltips</h3>

			<div className='space-y-4'>
				<Label htmlFor='tooltip-slider'>Slider with Tooltip</Label>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className='relative'>
								<SliderRoot
									value={value}
									onValueChange={setValue}
									min={0}
									max={100}
									step={1}
									className='h-6'
								>
									<SliderTrack>
										<SliderRange />
									</SliderTrack>
									<SliderThumb />
								</SliderRoot>
							</div>
						</TooltipTrigger>
						<TooltipContent
							side='top'
							sideOffset={8}
							className='bg-blue-600 text-white border-0 text-sm font-medium px-3 py-1 rounded-lg shadow-lg'
							arrowClassName='bg-blue-600 fill-blue-600'
						>
							{value[0]}%
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className='space-y-4'>
				<Label htmlFor='thumb-tooltip-slider'>Thumb Tooltip</Label>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className='relative'>
								<SliderRoot
									value={value}
									onValueChange={setValue}
									min={0}
									max={100}
									step={1}
									className='h-6'
								>
									<SliderTrack>
										<SliderRange />
									</SliderTrack>
									<Tooltip>
										<TooltipTrigger asChild>
											<SliderThumb />
										</TooltipTrigger>
										<TooltipContent
											side='top'
											sideOffset={8}
											className='bg-green-600 text-white border-0 text-xs'
											arrowClassName='bg-green-600 fill-green-600'
										>
											{value[0]}%
										</TooltipContent>
									</Tooltip>
								</SliderRoot>
							</div>
						</TooltipTrigger>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
};

export const WithTooltips: Story = {
	render: () => <WithTooltipsExample />
};

// Responsive design
const ResponsiveDesignExample = () => {
	const [value, setValue] = React.useState([50]);

	return (
		<div className='space-y-8 w-full max-w-md'>
			<h3 className='text-lg font-semibold'>Responsive Design</h3>
			<p className='text-sm text-gray-600'>Resize the browser to see the responsive behavior</p>

			<div className='space-y-4'>
				<Label htmlFor='responsive-slider'>Responsive Slider</Label>
				<SliderRoot
					value={value}
					onValueChange={setValue}
					min={0}
					max={100}
					step={1}
					className='h-6 md:h-8 lg:h-10'
				>
					<SliderTrack className='bg-gray-200 h-1 md:h-2 lg:h-3 rounded-full'>
						<SliderRange className='bg-blue-500 h-full rounded-full' />
					</SliderTrack>
					<SliderThumb className='w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-blue-500 border-2 border-white shadow-md hover:bg-blue-600 transition-colors' />
				</SliderRoot>
			</div>
		</div>
	);
};

export const ResponsiveDesign: Story = {
	render: () => <ResponsiveDesignExample />
};

// Disabled state
const DisabledStateExample = () => {
	const [value, setValue] = React.useState([30]);

	return (
		<div className='space-y-8 w-full max-w-md'>
			<h3 className='text-lg font-semibold'>Disabled State</h3>

			<div className='space-y-4'>
				<Label htmlFor='disabled-slider'>Disabled Slider</Label>
				<SliderRoot
					value={value}
					onValueChange={setValue}
					min={0}
					max={100}
					step={1}
					disabled
					className='h-6'
					aria-label='Disabled slider'
				>
					<SliderTrack className='bg-gray-200 h-2 rounded-full'>
						<SliderRange className='bg-gray-400 h-full rounded-full' />
					</SliderTrack>
					<SliderThumb
						className='w-5 h-5 bg-gray-400 border-2 border-white shadow-md cursor-not-allowed'
						aria-label='Disabled slider thumb'
						aria-valuetext={`${value[0]}%`}
					/>
				</SliderRoot>
			</div>
		</div>
	);
};

export const Disabled: Story = {
	render: () => <DisabledStateExample />
};

// Step variations
const StepVariationsExample = () => {
	const [value1, setValue1] = React.useState([50]);
	const [value2, setValue2] = React.useState([50]);
	const [value3, setValue3] = React.useState([50]);

	return (
		<div className='space-y-8 w-full max-w-md'>
			<h3 className='text-lg font-semibold'>Step Variations</h3>

			<div className='space-y-4'>
				<Label htmlFor='step-1-slider'>Step: 1 (Default)</Label>
				<SliderRoot
					value={value1}
					onValueChange={setValue1}
					min={0}
					max={100}
					step={1}
					className='h-6'
					aria-label='Step 1 slider'
				>
					<SliderTrack>
						<SliderRange />
					</SliderTrack>
					<SliderThumb aria-label='Step 1 slider thumb' aria-valuetext={`${value1[0]}%`} />
				</SliderRoot>
				<p className='text-sm text-gray-600'>Value: {value1[0]}</p>
			</div>

			<div className='space-y-4'>
				<Label htmlFor='step-5-slider'>Step: 5</Label>
				<SliderRoot
					value={value2}
					onValueChange={setValue2}
					min={0}
					max={100}
					step={5}
					className='h-6'
					aria-label='Step 5 slider'
				>
					<SliderTrack>
						<SliderRange />
					</SliderTrack>
					<SliderThumb aria-label='Step 5 slider thumb' aria-valuetext={`${value2[0]}%`} />
				</SliderRoot>
				<p className='text-sm text-gray-600'>Value: {value2[0]}</p>
			</div>

			<div className='space-y-4'>
				<Label htmlFor='step-10-slider'>Step: 10</Label>
				<SliderRoot
					value={value3}
					onValueChange={setValue3}
					min={0}
					max={100}
					step={10}
					className='h-6'
					aria-label='Step 10 slider'
				>
					<SliderTrack>
						<SliderRange />
					</SliderTrack>
					<SliderThumb aria-label='Step 10 slider thumb' aria-valuetext={`${value3[0]}%`} />
				</SliderRoot>
				<p className='text-sm text-gray-600'>Value: {value3[0]}</p>
			</div>
		</div>
	);
};

export const StepVariations: Story = {
	render: () => <StepVariationsExample />
};

// Individual components showcase
const IndividualComponentsExample = () => {
	const [value, setValue] = React.useState([50]);

	return (
		<div className='space-y-8 w-full max-w-lg'>
			<h3 className='text-lg font-semibold'>Individual Slider Components</h3>
			<p className='text-sm text-gray-600'>
				Use individual slider components for maximum customization control, following the shadcn/ui
				pattern.
			</p>

			<div className='space-y-4'>
				<h4 className='font-medium text-gray-700'>Custom Slider with Individual Components</h4>
				<div className='flex flex-col gap-4'>
					<Label htmlFor='custom-slider'>Custom Slider</Label>
					<input type='hidden' name='custom-slider' value={value[0]} readOnly aria-hidden='true' />

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className='relative'>
									<SliderRoot
										className='h-8'
										value={value}
										min={0}
										max={100}
										step={1}
										onValueChange={setValue}
										aria-label='Custom slider'
									>
										<SliderTrack className='bg-gray-100 h-3 rounded-full border border-gray-200'>
											<SliderRange className='bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full' />
										</SliderTrack>

										{value?.map((thumbValue, i) => (
											<Tooltip key={i}>
												<TooltipTrigger asChild>
													<SliderThumb
														className='w-6 h-6 bg-white border-3 border-emerald-500 shadow-lg hover:shadow-xl transition-shadow focus:ring-4 focus:ring-emerald-200'
														aria-label='Custom slider thumb'
														aria-valuetext={`${thumbValue}%`}
													/>
												</TooltipTrigger>
												<TooltipContent
													side='top'
													sideOffset={8}
													className='bg-emerald-600 text-white border-0 text-sm font-medium px-3 py-1 rounded-lg shadow-lg'
													arrowClassName='bg-emerald-600 fill-emerald-600'
												>
													{thumbValue}%
												</TooltipContent>
											</Tooltip>
										)) ?? null}
									</SliderRoot>
								</div>
							</TooltipTrigger>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>

			<div className='space-y-4'>
				<h4 className='font-medium text-gray-700'>Minimal Slider</h4>
				<div className='flex flex-col gap-4'>
					<Label htmlFor='minimal-slider'>Minimal Slider</Label>
					<input type='hidden' name='minimal-slider' value={value[0]} readOnly aria-hidden='true' />

					<SliderRoot
						className='h-6'
						value={value}
						min={0}
						max={100}
						step={1}
						onValueChange={setValue}
						aria-label='Minimal slider'
					>
						<SliderTrack className='bg-gray-200 h-1 rounded-full'>
							<SliderRange className='bg-gray-800 h-full rounded-full' />
						</SliderTrack>

						{value?.map((thumbValue, i) => (
							<SliderThumb
								key={i}
								className='w-3 h-3 bg-gray-800 border-0 shadow-sm'
								aria-label='Minimal slider thumb'
								aria-valuetext={`${thumbValue}%`}
							/>
						)) ?? null}
					</SliderRoot>
				</div>
			</div>

			<div className='space-y-4'>
				<h4 className='font-medium text-gray-700'>Premium Slider</h4>
				<div className='flex flex-col gap-4'>
					<Label htmlFor='premium-slider'>Premium Slider</Label>
					<input type='hidden' name='premium-slider' value={value[0]} readOnly aria-hidden='true' />

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className='relative'>
									<SliderRoot
										className='h-10'
										value={value}
										min={0}
										max={100}
										step={1}
										onValueChange={setValue}
										aria-label='Premium slider'
									>
										<SliderTrack className='bg-slate-100 h-4 rounded-full border border-slate-200 shadow-inner'>
											<SliderRange className='bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 h-full rounded-full shadow-lg' />
										</SliderTrack>

										{value?.map((thumbValue, i) => (
											<Tooltip key={i}>
												<TooltipTrigger asChild>
													<SliderThumb
														className='w-8 h-8 bg-white border-4 border-purple-500 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 focus:ring-4 focus:ring-purple-200'
														aria-label='Premium slider thumb'
														aria-valuetext={`${thumbValue}%`}
													/>
												</TooltipTrigger>
												<TooltipContent
													side='top'
													sideOffset={8}
													className='bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0 text-sm font-bold px-4 py-2 rounded-xl shadow-2xl'
													arrowClassName='bg-violet-500 fill-violet-500'
												>
													{thumbValue}%
												</TooltipContent>
											</Tooltip>
										)) ?? null}
									</SliderRoot>
								</div>
							</TooltipTrigger>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
};

export const IndividualComponents: Story = {
	render: () => <IndividualComponentsExample />
};
