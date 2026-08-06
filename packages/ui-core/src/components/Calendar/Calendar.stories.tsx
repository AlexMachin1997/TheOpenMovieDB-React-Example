import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from '~/components/Calendar/Calendar';

const meta: Meta<typeof Calendar> = {
	title: 'UI Core/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		mode: {
			control: 'select',
			options: ['single', 'range']
		},
		captionLayout: {
			control: 'select',
			options: ['label', 'dropdown']
		},
		buttonVariant: {
			control: 'select',
			options: ['ghost', 'outline', 'secondary', 'destructive', 'link']
		},
		showOutsideDays: {
			control: 'boolean'
		}
	}
};

export default meta;
// Calendar's props are a union discriminated by `mode`, and a union collapses
// `StoryObj<typeof meta>`'s args to `never` — the same trap Label and Select hit. Bare `StoryObj`,
// as Slider.stories.tsx already uses.
type Story = StoryObj;

// Basic single date selection
const BasicExample = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' />
	);
};

// Range selection
const RangeSelectionExample = () => {
	const [range, setRange] = useState<DateRange | undefined>();

	return (
		<Calendar mode='range' selected={range} onSelect={setRange} className='rounded-md border' />
	);
};

// With month and year dropdowns
const WithDropdownsExample = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode='single'
			selected={date}
			onSelect={setDate}
			captionLayout='dropdown'
			className='rounded-md border'
		/>
	);
};

// With custom button variant
const WithCustomButtonVariantExample = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode='single'
			selected={date}
			onSelect={setDate}
			buttonVariant='outline'
			className='rounded-md border'
		/>
	);
};

// Without outside days
const WithoutOutsideDaysExample = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode='single'
			selected={date}
			onSelect={setDate}
			showOutsideDays={false}
			className='rounded-md border'
		/>
	);
};

// With week numbers
const WithWeekNumbersExample = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode='single'
			selected={date}
			onSelect={setDate}
			showWeekNumber
			className='rounded-md border'
		/>
	);
};

// Multiple months view
const MultipleMonthsExample = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode='single'
			selected={date}
			onSelect={setDate}
			numberOfMonths={2}
			className='rounded-md border'
		/>
	);
};

// Interactive example with date display
const InteractiveExample = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className='space-y-4'>
			<Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' />
			<div className='text-center'>
				<p className='text-sm text-muted-foreground'>Selected date:</p>
				<p className='font-medium'>{date ? date.toLocaleDateString() : 'No date selected'}</p>
			</div>
		</div>
	);
};

// Range selection with date display
const InteractiveRangeExample = () => {
	const [range, setRange] = useState<DateRange | undefined>();

	return (
		<div className='space-y-4'>
			<Calendar mode='range' selected={range} onSelect={setRange} className='rounded-md border' />
			<div className='text-center'>
				<p className='text-sm text-muted-foreground'>Selected range:</p>
				<p className='font-medium'>
					{range?.from ? (
						<>
							{range.from.toLocaleDateString()}
							{range.to && ` - ${range.to.toLocaleDateString()}`}
						</>
					) : (
						'No range selected'
					)}
				</p>
			</div>
		</div>
	);
};

export const Basic: Story = {
	render: () => <BasicExample />,
	// Calendar had no interaction coverage at all, because every export in this file was a CSF1 bare
	// function — Storybook treats those as the story itself rather than as a render function, so
	// there is nowhere for `play` to attach. Converting the file to CSF3 is what made this possible.
	play: async ({ canvasElement, step }) => {
		// Selection is expressed as `data-selected-single` on the day *button*, not as
		// `aria-selected` on the gridcell — see CalendarDayButton. Asserting the latter passes
		// vacuously against `null`, which is how the first version of this test failed.
		const dayButton = (label: string) =>
			Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('button[data-day]')).find(
				(button) => button.textContent?.trim() === label
			);

		await step('A day can be selected, and reports itself as selected', async () => {
			// The 15th rather than today: today is already selected on mount, so clicking it would
			// assert nothing about the selection actually changing.
			const fifteenth = dayButton('15');
			await expect(fifteenth).toBeDefined();
			await expect(fifteenth).not.toHaveAttribute('data-selected-single', 'true');

			await userEvent.click(fifteenth as HTMLButtonElement);

			await expect(dayButton('15')).toHaveAttribute('data-selected-single', 'true');
		});
	}
};

export const RangeSelection: Story = {
	render: () => <RangeSelectionExample />
};

export const WithDropdowns: Story = {
	render: () => <WithDropdownsExample />
};

export const WithCustomButtonVariant: Story = {
	render: () => <WithCustomButtonVariantExample />
};

export const WithoutOutsideDays: Story = {
	render: () => <WithoutOutsideDaysExample />
};

export const WithWeekNumbers: Story = {
	render: () => <WithWeekNumbersExample />
};

export const MultipleMonths: Story = {
	render: () => <MultipleMonthsExample />
};

export const Interactive: Story = {
	render: () => <InteractiveExample />
};

export const InteractiveRange: Story = {
	render: () => <InteractiveRangeExample />
};
