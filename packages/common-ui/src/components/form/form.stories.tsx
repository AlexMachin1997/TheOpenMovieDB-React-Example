import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
	FormProvider,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '~/components/form';
import { Input } from '~/components/input/input';
import { Textarea } from '~/components/textarea/textarea';
import { Switch } from '~/components/switch/switch';
import { Button } from '~/components/button/button';
import { Checkbox } from '~/components/checkbox/checkbox';
import { Radio, RadioLabel } from '~/components/radio/radio';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CheckboxGroup } from '~/components/checkbox-group/checkbox-group';
import { RadioGroup } from '~/components/radio-group/radio-group';
import {
	SingleSelectListItem,
	SingleSelectValue,
	SelectProvider,
	SelectTrigger,
	SelectList,
	MultiSelectValue,
	SelectListItems,
	SelectListItem
} from '~/components/selects';

import { SliderInput as SingleSlider } from '~/components/sliders/single-slider/single-slider';
import { RangeSlider } from '~/components/sliders/range-slider/range-slider';
import { SingleDatePicker } from '~/components/date-pickers/single-date-picker/single-date-picker';
import { DateRangePicker } from '~/components/date-pickers/range-date-picker/range-date-picker';
import { Option } from '~/types/Option';

const meta: Meta<typeof FormProvider> = {
	title: 'Components/Form',
	component: FormProvider,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Form validation schema
const formSchema = z.object({
	// Basic inputs
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.email('Please enter a valid email'),
	description: z.string().min(10, 'Description must be at least 10 characters'),
	notifications: z.boolean(),

	// Single choice inputs
	framework: z.string().min(1, 'Please select a framework'),
	gender: z.string().min(1, 'Please select your gender'),
	experience: z.string().min(1, 'Please select your experience level'),

	// Multiple choice inputs
	skills: z.array(z.string()).min(1, 'Please select at least one skill'),
	interests: z.array(z.string()).min(1, 'Please select at least one interest'),

	// Sliders
	rating: z.tuple([z.number()]),
	priceRange: z.tuple([z.number(), z.number()]),

	// Dates
	birthDate: z.date().optional(),
	availability: z
		.object({
			from: z.date(),
			to: z.date()
		})
		.optional()
});

type FormData = z.infer<typeof formSchema>;

// Sample data for selects
const frameworks: Option[] = [
	{ id: 'react', value: 'react', label: 'React' },
	{ id: 'vue', value: 'vue', label: 'Vue.js' },
	{ id: 'angular', value: 'angular', label: 'Angular' },
	{ id: 'svelte', value: 'svelte', label: 'Svelte' },
	{ id: 'next', value: 'next', label: 'Next.js' }
];

const skills: Option[] = [
	{ id: 'javascript', value: 'javascript', label: 'JavaScript' },
	{ id: 'typescript', value: 'typescript', label: 'TypeScript' },
	{ id: 'python', value: 'python', label: 'Python' },
	{ id: 'java', value: 'java', label: 'Java' },
	{ id: 'csharp', value: 'csharp', label: 'C#' },
	{ id: 'go', value: 'go', label: 'Go' },
	{ id: 'rust', value: 'rust', label: 'Rust' }
];

const interests: Option[] = [
	{ id: 'frontend', value: 'frontend', label: 'Frontend Development' },
	{ id: 'backend', value: 'backend', label: 'Backend Development' },
	{ id: 'mobile', value: 'mobile', label: 'Mobile Development' },
	{ id: 'devops', value: 'devops', label: 'DevOps' },
	{ id: 'ai', value: 'ai', label: 'Artificial Intelligence' },
	{ id: 'blockchain', value: 'blockchain', label: 'Blockchain' }
];

const experienceLevels: Option[] = [
	{ id: 'beginner', value: 'beginner', label: 'Beginner (0-2 years)' },
	{ id: 'intermediate', value: 'intermediate', label: 'Intermediate (3-5 years)' },
	{ id: 'advanced', value: 'advanced', label: 'Advanced (6-10 years)' },
	{ id: 'expert', value: 'expert', label: 'Expert (10+ years)' }
];

const genderOptions: Option[] = [
	{ id: 'male', value: 'male', label: 'Male' },
	{ id: 'female', value: 'female', label: 'Female' },
	{ id: 'other', value: 'other', label: 'Other' },
	{ id: 'prefer-not', value: 'prefer-not', label: 'Prefer not to say' }
];

// Form component with all inputs
const ComprehensiveForm = () => {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			description: '',
			notifications: false,
			framework: undefined,
			gender: undefined,
			experience: undefined,
			skills: [],
			interests: [],
			rating: [5],
			priceRange: [20, 80],
			birthDate: undefined,
			availability: {
				from: undefined,
				to: undefined
			}
		}
	});

	const onSubmit = (data: FormData) => {
		console.log('Form submitted:', data);
		alert('Form submitted successfully! Check console for data.');
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full max-w-2xl'>
				<div className='space-y-6'>
					{/* Basic Inputs Section */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Basic Information</h3>

						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter your full name' {...field} />
									</FormControl>
									<FormDescription>
										Please enter your full name as it appears on official documents.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input type='email' placeholder='Enter your email' {...field} />
									</FormControl>
									<FormDescription>
										We&apos;ll use this to send you important updates.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio/Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us about yourself, your experience, and what you're looking for..."
											className='min-h-[100px]'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Provide a brief description of your background and goals.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='notifications'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base'>Email Notifications</FormLabel>
										<FormDescription>
											Receive email notifications about new opportunities and updates.
										</FormDescription>
									</div>
									<FormControl>
										<Switch checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					{/* Single Choice Inputs Section */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Single Choice Inputs</h3>

						<FormField
							control={form.control}
							name='framework'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Preferred Framework</FormLabel>
									<FormControl>
										<SelectProvider
											options={frameworks}
											values={field.value ? [field.value] : []}
											onValuesChange={(values) => {
												field.onChange(values);
											}}
											mode='single'
										>
											<SelectTrigger>
												<SingleSelectValue placeholder='Select your preferred framework' />
											</SelectTrigger>
											<SelectList>
												<SelectListItems>
													{({ item }) => <SingleSelectListItem value={item.value} />}
												</SelectListItems>
											</SelectList>
										</SelectProvider>
									</FormControl>
									<FormDescription>
										Choose the framework you&apos;re most comfortable with.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='gender'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<RadioGroup
											name='gender'
											options={genderOptions}
											value={field.value}
											onChange={({ value }) => field.onChange(value)}
										/>
									</FormControl>
									<FormDescription>
										This information helps us provide personalized content.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='experience'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Experience Level</FormLabel>
									<FormControl>
										<RadioGroup
											name='experience'
											options={experienceLevels}
											value={field.value}
											onChange={({ value }) => field.onChange(value)}
										/>
									</FormControl>
									<FormDescription>
										Select the option that best describes your experience level.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Multiple Choice Inputs Section */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Multiple Choice Inputs</h3>

						<FormField
							control={form.control}
							name='skills'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Programming Skills</FormLabel>
									<FormControl>
										<SelectProvider
											options={skills}
											values={field.value}
											onValuesChange={(values) => {
												field.onChange(values);
											}}
											mode='multiple'
										>
											<SelectTrigger>
												<MultiSelectValue placeholder='Select your programming skills' />
											</SelectTrigger>
											<SelectList>
												<SelectListItems>
													{({ item }) => <SingleSelectListItem value={item.value} />}
												</SelectListItems>
											</SelectList>
										</SelectProvider>
									</FormControl>
									<FormDescription>
										Select all programming languages you&apos;re proficient in.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='interests'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Areas of Interest</FormLabel>
									<FormControl>
										<CheckboxGroup
											name='interests'
											options={interests.map((option) => ({
												id: option.id,
												value: option.value,
												label: option.label,
												disabled: option.disabled
											}))}
											value={field.value}
											onChange={({ value }) => field.onChange(value)}
										/>
									</FormControl>
									<FormDescription>
										Select all areas that interest you professionally.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Sliders Section */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Sliders</h3>

						<FormField
							control={form.control}
							name='rating'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Overall Rating</FormLabel>
									<FormControl>
										<SingleSlider
											id='rating'
											name='rating'
											label=''
											value={field.value}
											min={1}
											max={10}
											step={1}
											onChange={field.onChange}
											formatThumbTooltip={(value) => `${value}/10`}
											formatSliderTooltip={(value) => `Rating: ${value[0]}/10`}
										/>
									</FormControl>
									<FormDescription>
										Rate your overall satisfaction with our platform.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='priceRange'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Expected Salary Range (K USD)</FormLabel>
									<FormControl>
										<RangeSlider
											id='priceRange'
											name='priceRange'
											label=''
											value={field.value}
											min={0}
											max={200}
											step={5}
											onChange={field.onChange}
											formatThumbTooltip={(value) => `$${value}K`}
											formatSliderTooltip={(value) => `Range: $${value[0]}K - $${value[1]}K`}
										/>
									</FormControl>
									<FormDescription>
										Select your expected salary range in thousands of USD.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Date Pickers Section */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Date Selection</h3>

						<FormField
							control={form.control}
							name='birthDate'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date of Birth</FormLabel>
									<FormControl>
										<SingleDatePicker
											date={field.value}
											onDateChange={field.onChange}
											placeholder='Select your date of birth'
											fromYear={1950}
											toYear={2010}
										/>
									</FormControl>
									<FormDescription>Your date of birth for account verification.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='availability'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Availability Period</FormLabel>
									<FormControl>
										<DateRangePicker
											dateRange={field.value}
											onDateRangeChange={field.onChange}
											placeholder='Select your availability period'
											fromYear={2024}
											toYear={2025}
										/>
									</FormControl>
									<FormDescription>
										Select the period when you&apos;ll be available for new opportunities.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button type='submit' className='w-full'>
					Submit Application
				</Button>
			</form>
		</FormProvider>
	);
};

// Individual component examples
const BasicInputsExample = () => {
	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			description: '',
			notifications: false
		}
	});

	return (
		<FormProvider {...form}>
			<form className='space-y-6 w-full max-w-md'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder='Enter your name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' placeholder='Enter your email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder='Enter description' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='notifications'
					render={({ field }) => (
						<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
							<div className='space-y-0.5'>
								<FormLabel className='text-base'>Notifications</FormLabel>
								<FormDescription>Receive email notifications</FormDescription>
							</div>
							<FormControl>
								<Switch checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</FormProvider>
	);
};

const SelectsExample = () => {
	const form = useForm({
		defaultValues: {
			framework: undefined,
			skills: []
		}
	});

	return (
		<FormProvider {...form}>
			<form className='space-y-6 w-full max-w-md'>
				<FormField
					control={form.control}
					name='framework'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Framework</FormLabel>
							<FormControl>
								<SelectProvider
									options={frameworks}
									values={field.value ? [field.value] : []}
									onValuesChange={(values) => {
										field.onChange(values);
									}}
									mode='single'
								>
									<SelectTrigger>
										<SingleSelectValue placeholder='Select a framework' />
									</SelectTrigger>
									<SelectList>
										<SelectListItems>
											{({ item }) => <SingleSelectListItem value={item.value} />}
										</SelectListItems>
									</SelectList>
								</SelectProvider>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='skills'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Skills</FormLabel>
							<FormControl>
								<SelectProvider
									options={skills}
									values={field.value}
									onValuesChange={(values) => {
										field.onChange(values);
									}}
									mode='multiple'
								>
									<SelectTrigger>
										<MultiSelectValue placeholder='Select skills' />
									</SelectTrigger>
									<SelectList>
										<SelectListItems>
											{({ item }) => <SelectListItem value={item.value} />}
										</SelectListItems>
									</SelectList>
								</SelectProvider>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</FormProvider>
	);
};

// Form validation schema
const slidersForm = z.object({
	// Sliders
	rating: z.tuple([z.number()]),
	priceRange: z.tuple([z.number(), z.number()])
});

type SlidersFormData = z.infer<typeof slidersForm>;

const SlidersExample = () => {
	const form = useForm<SlidersFormData>({
		defaultValues: {
			rating: [50],
			priceRange: [20, 80]
		}
	});

	return (
		<FormProvider {...form}>
			<form className='space-y-6 w-full max-w-md'>
				<FormField
					control={form.control}
					name='rating'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Single Slider</FormLabel>
							<FormControl>
								<SingleSlider
									id='single'
									name='single'
									label=''
									value={field.value}
									min={0}
									max={100}
									step={1}
									onChange={field.onChange}
									formatThumbTooltip={(value) => `${value}%`}
									formatSliderTooltip={(value) => `Value: ${value[0]}%`}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='priceRange'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Range Slider</FormLabel>
							<FormControl>
								<RangeSlider
									id='range'
									name='range'
									label=''
									value={field.value}
									min={0}
									max={100}
									step={5}
									onChange={field.onChange}
									formatThumbTooltip={(value) => `${value}`}
									formatSliderTooltip={(value) => `Range: ${value[0]} - ${value[1]}`}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</FormProvider>
	);
};

const DatePickersExample = () => {
	const form = useForm({
		defaultValues: {
			singleDate: undefined,
			dateRange: undefined
		}
	});

	return (
		<FormProvider {...form}>
			<form className='space-y-6 w-full max-w-md'>
				<FormField
					control={form.control}
					name='singleDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Single Date Picker</FormLabel>
							<FormControl>
								<SingleDatePicker
									date={field.value}
									onDateChange={field.onChange}
									placeholder='Pick a date'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='dateRange'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date Range Picker</FormLabel>
							<FormControl>
								<DateRangePicker
									dateRange={field.value}
									onDateRangeChange={field.onChange}
									placeholder='Pick a date range'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</FormProvider>
	);
};

const IndividualCheckboxExample = () => {
	const form = useForm({
		defaultValues: {
			terms: false,
			newsletter: false,
			marketing: false
		}
	});

	return (
		<FormProvider {...form}>
			<form className='space-y-6 w-full max-w-md'>
				<FormField
					control={form.control}
					name='terms'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>I agree to the terms and conditions</FormLabel>
								<FormDescription>
									You must agree to our terms and conditions to continue.
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='newsletter'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Subscribe to newsletter</FormLabel>
								<FormDescription>
									Receive updates about new features and announcements.
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='marketing'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Allow marketing communications</FormLabel>
								<FormDescription>
									Receive promotional emails and offers from our partners.
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>
			</form>
		</FormProvider>
	);
};

const IndividualRadioExample = () => {
	const form = useForm({
		defaultValues: {
			preference: undefined,
			priority: undefined
		}
	});

	return (
		<FormProvider {...form}>
			<form className='space-y-6 w-full max-w-md'>
				<FormField
					control={form.control}
					name='preference'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Communication Preference</FormLabel>
							<FormControl>
								<RadioGroupPrimitive.Root
									value={field.value}
									onValueChange={field.onChange}
									className='space-y-2'
								>
									<div className='flex items-center space-x-2'>
										<Radio value='email' id='email' />
										<RadioLabel htmlFor='email'>Email</RadioLabel>
									</div>
									<div className='flex items-center space-x-2'>
										<Radio value='phone' id='phone' />
										<RadioLabel htmlFor='phone'>Phone</RadioLabel>
									</div>
									<div className='flex items-center space-x-2'>
										<Radio value='sms' id='sms' />
										<RadioLabel htmlFor='sms'>SMS</RadioLabel>
									</div>
								</RadioGroupPrimitive.Root>
							</FormControl>
							<FormDescription>Choose your preferred method of communication.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='priority'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Support Priority</FormLabel>
							<FormControl>
								<RadioGroupPrimitive.Root
									value={field.value}
									onValueChange={field.onChange}
									className='space-y-2'
								>
									<div className='flex items-center space-x-2'>
										<Radio value='low' id='low' />
										<RadioLabel htmlFor='low'>Low Priority</RadioLabel>
									</div>
									<div className='flex items-center space-x-2'>
										<Radio value='medium' id='medium' />
										<RadioLabel htmlFor='medium'>Medium Priority</RadioLabel>
									</div>
									<div className='flex items-center space-x-2'>
										<Radio value='high' id='high' />
										<RadioLabel htmlFor='high'>High Priority</RadioLabel>
									</div>
								</RadioGroupPrimitive.Root>
							</FormControl>
							<FormDescription>Select the priority level for your support request.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</FormProvider>
	);
};

// Stories
export const ComprehensiveFormExample: Story = {
	render: () => <ComprehensiveForm />
};

export const BasicInputs: Story = {
	render: () => <BasicInputsExample />
};

export const Selects: Story = {
	render: () => <SelectsExample />
};

export const Sliders: Story = {
	render: () => <SlidersExample />
};

export const DatePickers: Story = {
	render: () => <DatePickersExample />
};

export const IndividualCheckboxes: Story = {
	render: () => <IndividualCheckboxExample />
};

export const IndividualRadios: Story = {
	render: () => <IndividualRadioExample />
};
