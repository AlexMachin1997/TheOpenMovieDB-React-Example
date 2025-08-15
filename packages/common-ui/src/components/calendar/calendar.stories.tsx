import type { Meta } from '@storybook/react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
	title: 'Components/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
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

// Basic single date selection
export const Basic = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' />
	);
};

// Range selection
export const RangeSelection = () => {
	const [range, setRange] = useState<DateRange | undefined>();

	return (
		<Calendar mode='range' selected={range} onSelect={setRange} className='rounded-md border' />
	);
};

// With month and year dropdowns
export const WithDropdowns = () => {
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
export const WithCustomButtonVariant = () => {
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
export const WithoutOutsideDays = () => {
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
export const WithWeekNumbers = () => {
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
export const MultipleMonths = () => {
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
export const Interactive = () => {
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
export const InteractiveRange = () => {
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
