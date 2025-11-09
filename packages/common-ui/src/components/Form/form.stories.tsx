import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from '@tanstack/react-form';
import type { DateRange } from 'react-day-picker';
import * as z from 'zod';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { Input } from '~/components/Input/Input';
import { Textarea } from '~/components/Textarea/Textarea';
import { Switch } from '~/components/Switch/Switch';
import { Button } from '~/components/Button/Button';
import { Checkbox } from '~/components/Checkbox/Checkbox';
import { Radio, RadioLabel } from '~/components/Radio/Radio';
import { CheckboxGroup } from '~/components/CheckboxGroup/CheckboxGroup';
import { RadioGroup } from '~/components/RadioGroup/RadioGroup';
import {
	SelectProvider,
	SelectTrigger,
	SingleSelectValue,
	SelectInterface,
	SelectListItems,
	SelectListItem,
	MultiSelectValue
} from '~/components/Selects/index';
import { SingleSlider } from '~/components/Sliders/SingleSlider/SingleSlider';
import { RangeSlider } from '~/components/Sliders/RangeSlider/RangeSlider';
import { SingleDatePicker } from '~/components/DatePickers/SingleDatePicker/SingleDatePicker';
import { DateRangePicker } from '~/components/DatePickers/RangeDatePicker/RangeDatePicker';
import { Option } from '~/types/Option';

const dateRangeSchema = z
	.object({
		from: z.date().optional(),
		to: z.date().optional()
	})
	.transform(
		(range): DateRange => ({
			from: range.from ?? undefined,
			to: range.to ?? undefined
		})
	);

const formSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters.'),
	email: z.string().email('Please enter a valid email.'),
	description: z.string().min(10, 'Description must be at least 10 characters.'),
	notifications: z.boolean(),
	framework: z.string().min(1, 'Please select a framework.'),
	gender: z.string().min(1, 'Please select your gender.'),
	experience: z.string().min(1, 'Please select your experience level.'),
	skills: z.array(z.string()).min(1, 'Select at least one skill.'),
	interests: z.array(z.string()).min(1, 'Select at least one interest.'),
	rating: z.tuple([z.number()]),
	priceRange: z.tuple([z.number(), z.number()]),
	birthDate: z.date().optional(),
	availability: dateRangeSchema.optional()
});

const frameworks: Array<Option> = [
	{ id: 'react', value: 'react', label: 'React' },
	{ id: 'vue', value: 'vue', label: 'Vue.js' },
	{ id: 'angular', value: 'angular', label: 'Angular' },
	{ id: 'svelte', value: 'svelte', label: 'Svelte' },
	{ id: 'next', value: 'next', label: 'Next.js' }
];

const skills: Array<Option> = [
	{ id: 'javascript', value: 'javascript', label: 'JavaScript' },
	{ id: 'typescript', value: 'typescript', label: 'TypeScript' },
	{ id: 'python', value: 'python', label: 'Python' },
	{ id: 'java', value: 'java', label: 'Java' },
	{ id: 'csharp', value: 'csharp', label: 'C#' },
	{ id: 'go', value: 'go', label: 'Go' },
	{ id: 'rust', value: 'rust', label: 'Rust' }
];

const interests: Array<Option> = [
	{ id: 'frontend', value: 'frontend', label: 'Frontend Development' },
	{ id: 'backend', value: 'backend', label: 'Backend Development' },
	{ id: 'mobile', value: 'mobile', label: 'Mobile Development' },
	{ id: 'devops', value: 'devops', label: 'DevOps' },
	{ id: 'ai', value: 'ai', label: 'Artificial Intelligence' },
	{ id: 'blockchain', value: 'blockchain', label: 'Blockchain' }
];

const experienceLevels: Array<Option> = [
	{ id: 'beginner', value: 'beginner', label: 'Beginner (0-2 years)' },
	{ id: 'intermediate', value: 'intermediate', label: 'Intermediate (3-5 years)' },
	{ id: 'advanced', value: 'advanced', label: 'Advanced (6-10 years)' },
	{ id: 'expert', value: 'expert', label: 'Expert (10+ years)' }
];

const genderOptions: Array<Option> = [
	{ id: 'male', value: 'male', label: 'Male' },
	{ id: 'female', value: 'female', label: 'Female' },
	{ id: 'other', value: 'other', label: 'Other' },
	{ id: 'prefer-not', value: 'prefer-not', label: 'Prefer not to say' }
];

const getErrorMessage = (field: any) => {
	const issue = field.state.meta?.errors?.[0];
	if (!issue) {
		return undefined;
	}

	return typeof issue === 'string' ? issue : issue?.message;
};

type IFormSchema = z.infer<typeof formSchema>;

const comprehensiveDefaultValues: IFormSchema = {
	name: '',
	email: '',
	description: '',
	notifications: false,
	framework: '',
	gender: '',
	experience: '',
	skills: [],
	interests: [],
	rating: [5],
	priceRange: [20, 80],
	birthDate: undefined,
	availability: undefined
};

const ComprehensiveFormStory = () => {
	const form = useForm({
		defaultValues: comprehensiveDefaultValues,
		validators: {
			onSubmit: (formData) => formSchema.safeParse(formData)
		},
		onSubmit: async ({ value }) => {
			console.log('Form submitted:', value);
			alert('Form submitted successfully! Check console for data.');
		}
	});

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				void form.handleSubmit();
			}}
			className='space-y-8 w-full max-w-2xl'
		>
			<section className='space-y-6'>
				<div className='space-y-4'>
					<h3 className='text-lg font-semibold'>Basic Information</h3>

					<form.Field name='name'>
						{(field) => {
							const error = getErrorMessage(field);

							return (
								<div className='space-y-2'>
									<label htmlFor={field.name} className='text-sm font-medium'>
										Full Name
									</label>
									<Input
										id={field.name}
										value={field.state.value ?? ''}
										onBlur={field.handleBlur}
										onChange={(event) => field.handleChange(event.target.value)}
										placeholder='Enter your full name'
										autoComplete='name'
									/>
									<p className='text-muted-foreground text-sm'>
										Please enter your full name as it appears on official documents.
									</p>
									{error ? <p className='text-destructive text-sm'>{error}</p> : null}
								</div>
							);
						}}
					</form.Field>

					<form.Field name='email'>
						{(field) => {
							const error = getErrorMessage(field);

							return (
								<div className='space-y-2'>
									<label htmlFor={field.name} className='text-sm font-medium'>
										Email Address
									</label>
									<Input
										id={field.name}
										type='email'
										value={field.state.value ?? ''}
										onBlur={field.handleBlur}
										onChange={(event) => field.handleChange(event.target.value)}
										placeholder='Enter your email'
										autoComplete='email'
									/>
									<p className='text-muted-foreground text-sm'>
										We&apos;ll use this to send you important updates.
									</p>
									{error ? <p className='text-destructive text-sm'>{error}</p> : null}
								</div>
							);
						}}
					</form.Field>

					<form.Field name='description'>
						{(field) => {
							const error = getErrorMessage(field);

							return (
								<div className='space-y-2'>
									<label htmlFor={field.name} className='text-sm font-medium'>
										Bio/Description
									</label>
									<Textarea
										id={field.name}
										value={field.state.value ?? ''}
										onBlur={field.handleBlur}
										onChange={(event) => field.handleChange(event.target.value)}
										placeholder="Tell us about yourself, your experience, and what you're looking for..."
										className='min-h-[100px]'
									/>
									<p className='text-muted-foreground text-sm'>
										Provide a brief description of your background and goals.
									</p>
									{error ? <p className='text-destructive text-sm'>{error}</p> : null}
								</div>
							);
						}}
					</form.Field>

					<form.Field name='notifications'>
						{(field) => (
							<div className='flex flex-row items-center justify-between rounded-lg border p-4'>
								<div className='space-y-0.5'>
									<p className='text-base font-medium'>Email Notifications</p>
									<p className='text-muted-foreground text-sm'>
										Receive email notifications about new opportunities and updates.
									</p>
								</div>
								<Switch
									id={field.name}
									checked={field.state.value}
									onCheckedChange={(checked) => field.handleChange(checked)}
									onBlur={field.handleBlur}
								/>
							</div>
						)}
					</form.Field>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-semibold'>Single Choice Inputs</h3>

					<form.Field name='framework'>
						{(field) => {
							const error = getErrorMessage(field);
							const values = field.state.value ? [field.state.value] : [];

							return (
								<div className='space-y-2'>
									<label className='text-sm font-medium'>Preferred Framework</label>
									<SelectProvider
										options={frameworks}
										values={values}
										onValuesChange={(nextValues) => field.handleChange(nextValues[0] ?? '')}
										mode='single'
									>
										<SelectTrigger>
											<SingleSelectValue placeholder='Select your preferred framework' />
										</SelectTrigger>
										<SelectInterface>
											<SelectListItems>
												{({ item }) => <SelectListItem value={item.value} />}
											</SelectListItems>
										</SelectInterface>
									</SelectProvider>
									<p className='text-muted-foreground text-sm'>
										Choose the framework you&apos;re most comfortable with.
									</p>
									{error ? <p className='text-destructive text-sm'>{error}</p> : null}
								</div>
							);
						}}
					</form.Field>

					<form.Field name='gender'>
						{(field) => {
							const error = getErrorMessage(field);

							return (
								<div className='space-y-2'>
									<label className='text-sm font-medium'>Gender</label>
									<RadioGroup
										name='gender'
										options={genderOptions}
										value={field.state.value ?? ''}
										onChange={({ value }) => field.handleChange(value)}
									/>
									<p className='text-muted-foreground text-sm'>
										This information helps us provide personalized content.
									</p>
									{error ? <p className='text-destructive text-sm'>{error}</p> : null}
								</div>
							);
						}}
					</form.Field>

					<form.Field name='experience'>
						{(field) => {
							const error = getErrorMessage(field);

							return (
								<div className='space-y-2'>
									<label className='text-sm font-medium'>Experience Level</label>
									<RadioGroup
										name='experience'
										options={experienceLevels}
										value={field.state.value ?? ''}
										onChange={({ value }) => field.handleChange(value)}
									/>
									<p className='text-muted-foreground text-sm'>
										Select the option that best describes your experience level.
									</p>
									{error ? <p className='text-destructive text-sm'>{error}</p> : null}
								</div>
							);
						}}
					</form.Field>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-semibold'>Multiple Choice Inputs</h3>

					<form.Field name='skills'>
						{(field) => {
							const error = getErrorMessage(field);

							return (
								<div className='space-y-2'>
									<label className='text-sm font-medium'>Programming Skills</label>
									<SelectProvider
										options={skills}
										values={field.state.value ?? []}
										onValuesChange={(nextValues) => field.handleChange(nextValues)}
										mode='multiple'
									>
										<SelectTrigger>
											<MultiSelectValue placeholder='Select your programming skills' />
										</SelectTrigger>
										<SelectInterface>
											<SelectListItems>
												{({ item }) => <SelectListItem value={item.value} />}
											</SelectListItems>
										</SelectInterface>
									</SelectProvider>
									<p className='text-muted-foreground text-sm'>
										Select all programming languages you&apos;re proficient in.
									</p>
									{error ? <p className='text-destructive text-sm'>{error}</p> : null}
								</div>
							);
						}}
					</form.Field>

					<form.Field name='interests'>
						{(field) => {
							const error = getErrorMessage(field);

							return (
								<div className='space-y-2'>
									<p className='text-sm font-medium'>Areas of Interest</p>

									<CheckboxGroup
										name='interests'
										options={interests.map((option) => ({
											id: option.id,
											value: option.value,
											label: option.label
										}))}
										value={field.state.value ?? []}
										onChange={({ value }) => field.handleChange(value)}
									/>

									<p className='text-muted-foreground text-sm'>
										Select all areas that interest you professionally.
									</p>
									{error ? <p className='text-destructive text-sm'>{error}</p> : null}
								</div>
							);
						}}
					</form.Field>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-semibold'>Sliders</h3>

					<form.Field name='rating'>
						{(field) => (
							<SingleSlider
								label='Overall Rating'
								id='rating'
								name='rating'
								value={field.state.value ?? [0]}
								min={1}
								max={10}
								step={1}
								onChange={field.handleChange}
								formatThumbTooltip={(value) => `${value}/10`}
								formatSliderTooltip={(value) => `Rating: ${value[0]}/10`}
							/>
						)}
					</form.Field>

					<form.Field name='priceRange'>
						{(field) => (
							<RangeSlider
								label='Expected Salary Range (K USD)'
								id='priceRange'
								name='priceRange'
								value={field.state.value ?? [0, 0]}
								min={0}
								max={200}
								step={5}
								onChange={field.handleChange}
								formatThumbTooltip={(value) => `$${value}K`}
								formatSliderTooltip={(value) => `Range: $${value[0]}K - $${value[1]}K`}
							/>
						)}
					</form.Field>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-semibold'>Date Selection</h3>

					<form.Field name='birthDate'>
						{(field) => (
							<div className='space-y-2'>
								<label className='text-sm font-medium'>Date of Birth</label>
								<SingleDatePicker
									date={field.state.value}
									onDateChange={field.handleChange}
									placeholder='Select your date of birth'
									fromYear={1950}
									toYear={2010}
								/>
								<p className='text-muted-foreground text-sm'>
									Your date of birth for account verification.
								</p>
							</div>
						)}
					</form.Field>

					<form.Field name='availability'>
						{(field) => (
							<div className='space-y-2'>
								<label className='text-sm font-medium'>Availability Period</label>
								<DateRangePicker
									dateRange={field.state.value}
									onDateRangeChange={field.handleChange}
									placeholder='Select your availability period'
									fromYear={2024}
									toYear={2025}
								/>
								<p className='text-muted-foreground text-sm'>
									Select the period when you&apos;ll be available for new opportunities.
								</p>
							</div>
						)}
					</form.Field>
				</div>
			</section>

			<Button type='submit' className='w-full'>
				Submit Application
			</Button>
		</form>
	);
};

const BasicInputsStory = () => {
	interface IBasicInputsForm {
		name: string;
		email: string;
		description: string;
		notifications: boolean;
	}

	const basicInputsDefaultValues: IBasicInputsForm = {
		name: '',
		email: '',
		description: '',
		notifications: false
	};

	const form = useForm({
		defaultValues: basicInputsDefaultValues
	});

	return (
		<form className='space-y-6 w-full max-w-md'>
			<form.Field name='name'>
				{(field) => (
					<div className='space-y-2'>
						<label htmlFor={field.name} className='text-sm font-medium'>
							Name
						</label>
						<Input
							id={field.name}
							value={field.state.value ?? ''}
							onBlur={field.handleBlur}
							onChange={(event) => field.handleChange(event.target.value)}
							placeholder='Enter your name'
						/>
					</div>
				)}
			</form.Field>

			<form.Field name='email'>
				{(field) => (
					<div className='space-y-2'>
						<label htmlFor={field.name} className='text-sm font-medium'>
							Email
						</label>
						<Input
							id={field.name}
							type='email'
							value={field.state.value ?? ''}
							onBlur={field.handleBlur}
							onChange={(event) => field.handleChange(event.target.value)}
							placeholder='Enter your email'
						/>
					</div>
				)}
			</form.Field>

			<form.Field name='description'>
				{(field) => (
					<div className='space-y-2'>
						<label htmlFor={field.name} className='text-sm font-medium'>
							Description
						</label>
						<Textarea
							id={field.name}
							value={field.state.value ?? ''}
							onBlur={field.handleBlur}
							onChange={(event) => field.handleChange(event.target.value)}
							placeholder='Enter description'
						/>
					</div>
				)}
			</form.Field>

			<form.Field name='notifications'>
				{(field) => (
					<div className='flex flex-row items-center justify-between rounded-lg border p-4'>
						<div className='space-y-0.5'>
							<p className='text-base font-medium'>Notifications</p>
							<p className='text-muted-foreground text-sm'>Receive email notifications</p>
						</div>
						<Switch
							id={field.name}
							checked={Boolean(field.state.value)}
							onCheckedChange={(checked) => field.handleChange(checked)}
							onBlur={field.handleBlur}
						/>
					</div>
				)}
			</form.Field>
		</form>
	);
};

const SelectsStory = () => {
	interface ISelectsForm {
		framework: string;
		skills: string[];
	}

	const selectsDefaultValues: ISelectsForm = {
		framework: '',
		skills: []
	};

	const form = useForm({
		defaultValues: selectsDefaultValues
	});

	return (
		<form className='space-y-6 w-full max-w-md'>
			<form.Field name='framework'>
				{(field) => {
					const error = getErrorMessage(field);

					return (
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Framework</label>
							<SelectProvider
								options={frameworks}
								values={field.state.value ? [field.state.value] : []}
								onValuesChange={(nextValues) => field.handleChange(nextValues)}
								mode='single'
							>
								<SelectTrigger>
									<SingleSelectValue placeholder='Select a framework' />
								</SelectTrigger>
								<SelectInterface>
									<SelectListItems>
										{({ item }) => <SelectListItem value={item.value} />}
									</SelectListItems>
								</SelectInterface>
							</SelectProvider>
							{error ? <p className='text-destructive text-sm'>{error}</p> : null}
						</div>
					);
				}}
			</form.Field>

			<form.Field name='skills'>
				{(field) => {
					const error = getErrorMessage(field);

					return (
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Skills</label>
							<SelectProvider
								options={skills}
								values={field.state.value ?? []}
								onValuesChange={(nextValues) => field.handleChange(nextValues)}
								mode='multiple'
							>
								<SelectTrigger>
									<MultiSelectValue placeholder='Select skills' />
								</SelectTrigger>
								<SelectInterface>
									<SelectListItems>
										{({ item }) => <SelectListItem value={item.value} />}
									</SelectListItems>
								</SelectInterface>
							</SelectProvider>
							{error ? <p className='text-destructive text-sm'>{error}</p> : null}
						</div>
					);
				}}
			</form.Field>
		</form>
	);
};

const slidersSchema = z.object({
	rating: z.tuple([z.number()]),
	priceRange: z.tuple([z.number(), z.number()])
});

type ISlidersFormData = z.infer<typeof slidersSchema>;

const slidersDefaultValues: ISlidersFormData = {
	rating: [50],
	priceRange: [20, 80]
};

const SlidersStory = () => {
	const form = useForm({
		defaultValues: slidersDefaultValues,
		validators: {
			onSubmit: slidersSchema
		},
		onSubmit: async ({ value }) => {
			console.log('Slider values:', value);
		}
	});

	return (
		<form
			className='space-y-6 w-full max-w-md'
			onSubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name='rating'>
				{(field) => (
					<div className='space-y-2'>
						<SingleSlider
							id='single'
							name='single'
							label='Single Slider'
							value={field.state.value ?? [0]}
							min={0}
							max={100}
							step={1}
							onChange={field.handleChange}
							formatThumbTooltip={(value) => `${value}%`}
							formatSliderTooltip={(value) => `Value: ${value[0]}%`}
						/>
					</div>
				)}
			</form.Field>

			<form.Field name='priceRange'>
				{(field) => (
					<div className='space-y-2'>
						<RangeSlider
							id='range'
							name='range'
							label='Range Slider'
							value={field.state.value ?? [0, 0]}
							min={0}
							max={100}
							step={5}
							onChange={field.handleChange}
							formatThumbTooltip={(value) => `${value}`}
							formatSliderTooltip={(value) => `Range: ${value[0]} - ${value[1]}`}
						/>
					</div>
				)}
			</form.Field>

			<Button type='submit' variant='outline'>
				Log slider values
			</Button>
		</form>
	);
};

const DatePickersStory = () => {
	interface IDatePickersForm {
		singleDate?: Date;
		dateRange?: DateRange;
	}

	const datePickersDefaultValues: IDatePickersForm = {
		singleDate: undefined,
		dateRange: undefined
	};

	const form = useForm({
		defaultValues: datePickersDefaultValues
	});

	return (
		<form className='space-y-6 w-full max-w-md'>
			<form.Field name='singleDate'>
				{(field) => (
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Single Date Picker</label>
						<SingleDatePicker
							date={field.state.value}
							onDateChange={field.handleChange}
							placeholder='Pick a date'
						/>
					</div>
				)}
			</form.Field>

			<form.Field name='dateRange'>
				{(field) => (
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Date Range Picker</label>
						<DateRangePicker
							dateRange={field.state.value}
							onDateRangeChange={field.handleChange}
							placeholder='Pick a date range'
						/>
					</div>
				)}
			</form.Field>
		</form>
	);
};

const IndividualCheckboxStory = () => {
	interface ICheckboxForm {
		terms: boolean;
		newsletter: boolean;
		marketing: boolean;
	}

	const checkboxDefaultValues: ICheckboxForm = {
		terms: false,
		newsletter: false,
		marketing: false
	};

	const form = useForm({
		defaultValues: checkboxDefaultValues
	});

	return (
		<form className='space-y-6 w-full max-w-md'>
			{(['terms', 'newsletter', 'marketing'] as const).map((name) => (
				<form.Field key={name} name={name}>
					{(field) => (
						<div className='flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4'>
							<Checkbox
								id={field.name}
								checked={Boolean(field.state.value)}
								onCheckedChange={(checked) => field.handleChange(Boolean(checked))}
								onBlur={field.handleBlur}
							/>
							<div className='space-y-1 leading-none'>
								<p className='font-medium'>
									{name === 'terms'
										? 'I agree to the terms and conditions'
										: name === 'newsletter'
											? 'Subscribe to newsletter'
											: 'Allow marketing communications'}
								</p>
								<p className='text-muted-foreground text-sm'>
									{name === 'terms'
										? 'You must agree to our terms and conditions to continue.'
										: name === 'newsletter'
											? 'Receive updates about new features and announcements.'
											: 'Receive promotional emails and offers from our partners.'}
								</p>
							</div>
						</div>
					)}
				</form.Field>
			))}
		</form>
	);
};

const IndividualRadioStory = () => {
	interface IRadioForm {
		preference: string;
		priority: string;
	}

	const radioDefaultValues: IRadioForm = {
		preference: '',
		priority: ''
	};

	const form = useForm({
		defaultValues: radioDefaultValues
	});

	return (
		<form className='space-y-6 w-full max-w-md'>
			<form.Field name='preference'>
				{(field) => (
					<div className='space-y-3'>
						<p className='font-medium'>Communication Preference</p>
						<RadioGroupPrimitive.Root
							value={field.state.value ?? ''}
							onValueChange={(value) => field.handleChange(value)}
							className='space-y-2'
						>
							{['email', 'phone', 'sms'].map((value) => (
								<div key={value} className='flex items-center space-x-2'>
									<Radio value={value} id={value} />
									<RadioLabel htmlFor={value}>{value.toUpperCase()}</RadioLabel>
								</div>
							))}
						</RadioGroupPrimitive.Root>
					</div>
				)}
			</form.Field>

			<form.Field name='priority'>
				{(field) => (
					<div className='space-y-3'>
						<p className='font-medium'>Support Priority</p>
						<RadioGroupPrimitive.Root
							value={field.state.value ?? ''}
							onValueChange={(value) => field.handleChange(value)}
							className='space-y-2'
						>
							{(
								[
									['low', 'Low Priority'],
									['medium', 'Medium Priority'],
									['high', 'High Priority']
								] as const
							).map(([value, label]) => (
								<div key={value} className='flex items-center space-x-2'>
									<Radio value={value} id={value} />
									<RadioLabel htmlFor={value}>{label}</RadioLabel>
								</div>
							))}
						</RadioGroupPrimitive.Root>
					</div>
				)}
			</form.Field>
		</form>
	);
};

const meta: Meta<typeof ComprehensiveFormStory> = {
	title: 'Components/Form',
	component: ComprehensiveFormStory,
	parameters: {
		layout: 'centered'
	}
};

export default meta;

type Story = StoryObj<typeof ComprehensiveFormStory>;

export const ComprehensiveFormExample: Story = {
	render: () => <ComprehensiveFormStory />
};

export const BasicInputs: Story = {
	render: () => <BasicInputsStory />
};

export const Selects: Story = {
	render: () => <SelectsStory />
};

export const Sliders: Story = {
	render: () => <SlidersStory />
};

export const DatePickers: Story = {
	render: () => <DatePickersStory />
};

export const IndividualCheckboxes: Story = {
	render: () => <IndividualCheckboxStory />
};

export const IndividualRadios: Story = {
	render: () => <IndividualRadioStory />
};
