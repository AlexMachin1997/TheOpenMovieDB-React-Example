import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useReducer } from 'react';
import type { DateRange } from 'react-day-picker';
import type { Locale } from 'date-fns';
import { fr, es, de } from 'date-fns/locale';
import { DateRangePicker } from '~/components/DatePickers/DateRangePicker/DateRangePicker';
import { Button, Field } from '@repo/ui-core';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetInnerContent,
	SheetTitle,
	SheetTrigger
} from '@repo/ui-overlays';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { type DateFormatKey } from '@repo/core';

type DateRangePickerStorybookTypes = {
	dateRange?: DateRange;
	onDateRangeChange: (dateRange: DateRange | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	fromYear?: number;
	toYear?: number;
	locale?: Locale;
	dateFormat?: DateFormatKey;
};

const meta: Meta<typeof DateRangePicker> = {
	title: 'UI Forms/Date pickers/Range date picker',
	component: DateRangePicker,
	parameters: {
		layout: 'fullscreen',
		viewport: {
			defaultViewport: 'desktop'
		}
	}
};

export default meta;
type Story = StoryObj<DateRangePickerStorybookTypes>;

const BasicDateRangePickerTemplate = (args: DateRangePickerStorybookTypes) => {
	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(args?.dateRange);

	const handleRangeChange = (range: DateRange | undefined) => {
		setSelectedRange(range);
	};

	return (
		<div className='p-8'>
			<DateRangePicker {...args} dateRange={selectedRange} onDateRangeChange={handleRangeChange} />
		</div>
	);
};

export const WithSelectedRange: Story = {
	render: (args) => <BasicDateRangePickerTemplate {...args} />,
	args: {
		dateRange: {
			from: new Date('2024-01-15'),
			to: new Date('2024-01-20')
		}
	}
};

export const Disabled: Story = {
	render: (args) => <BasicDateRangePickerTemplate {...args} />,
	args: {
		disabled: true
	}
};

export const CustomPlaceholder: Story = {
	render: (args) => <BasicDateRangePickerTemplate {...args} />,
	args: {
		placeholder: 'Select check-in and check-out dates'
	}
};

const InteractiveTemplate = (args: DateRangePickerStorybookTypes) => {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(args?.dateRange);

	const handleRangeChange = (range: DateRange | undefined) => {
		setDateRange(range);
	};

	return (
		<div className='p-8 space-y-4'>
			<DateRangePicker {...args} dateRange={dateRange} onDateRangeChange={handleRangeChange} />
			{(dateRange?.from || dateRange?.to) && (
				<div className='text-sm text-muted-foreground'>
					{dateRange?.from && !dateRange?.to && (
						<p>Start date selected: {dateRange.from.toLocaleDateString()}</p>
					)}
					{dateRange?.from && dateRange?.to && (
						<p>
							Range: {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()} (
							{Math.ceil(
								(dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
							) + 1}{' '}
							days)
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export const Interactive: Story = {
	render: (args) => <InteractiveTemplate {...args} />,
	args: {}
};

const TravelBookingTemplate = () => {
	const [travelDates, setTravelDates] = useState<DateRange>();

	const calculateNights = () => {
		if (travelDates?.from && travelDates?.to) {
			return Math.ceil(
				(travelDates.to.getTime() - travelDates.from.getTime()) / (1000 * 60 * 60 * 24)
			);
		}
		return 0;
	};

	return (
		<div className='p-8 space-y-4 max-w-md'>
			<div>
				<h3 className='font-medium mb-2'>Book Your Stay</h3>
				<DateRangePicker
					dateRange={travelDates}
					onDateRangeChange={setTravelDates}
					placeholder='Select check-in and check-out dates'
					fromYear={new Date().getFullYear()}
				/>
			</div>

			{travelDates?.from && travelDates?.to && (
				<div className='p-3 bg-secondary rounded-md text-sm space-y-1'>
					<div className='flex justify-between'>
						<span>Check-in:</span>
						<span className='font-medium'>{travelDates.from.toLocaleDateString()}</span>
					</div>
					<div className='flex justify-between'>
						<span>Check-out:</span>
						<span className='font-medium'>{travelDates.to.toLocaleDateString()}</span>
					</div>
					<div className='flex justify-between border-t pt-1'>
						<span>Total nights:</span>
						<span className='font-medium'>{calculateNights()}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export const TravelBooking: Story = {
	render: () => <TravelBookingTemplate />,
	args: {}
};

const WithCustomRangeTemplate = () => {
	const [currentYearRange, setCurrentYearRange] = useState<DateRange>();
	const [projectTimelineRange, setProjectTimelineRange] = useState<DateRange>();

	return (
		<div className='p-8 space-y-4'>
			<div>
				<h3 className='font-medium mb-2'>Custom Date Range</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					Optionally restrict the date range using fromYear and toYear props.
				</p>
				<div className='space-y-3'>
					<div>
						<p className='text-sm font-medium mb-1'>Current year only:</p>
						<DateRangePicker
							dateRange={currentYearRange}
							onDateRangeChange={setCurrentYearRange}
							placeholder='Select dates this year'
							fromYear={new Date().getFullYear()}
							toYear={new Date().getFullYear()}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>Project timeline (2024-2026):</p>
						<DateRangePicker
							dateRange={projectTimelineRange}
							onDateRangeChange={setProjectTimelineRange}
							placeholder='Select project dates'
							fromYear={2024}
							toYear={2026}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export const WithCustomRange: Story = {
	render: () => <WithCustomRangeTemplate />,
	args: {}
};

const WithLocalesTemplate = () => {
	const [ranges, dispatch] = useReducer(
		(
			state: Record<string, DateRange | undefined>,
			action: { locale: string; range: DateRange | undefined }
		) => ({
			...state,
			[action.locale]: action.range
		}),
		{}
	);

	return (
		<div className='p-8 space-y-4'>
			<div>
				<h3 className='font-medium mb-2'>Localization Support</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					The DateRangePicker supports different locales for date formatting and calendar display.
				</p>
				<div className='space-y-3'>
					<div>
						<p className='text-sm font-medium mb-1'>English (default):</p>
						<DateRangePicker
							dateRange={ranges.english}
							onDateRangeChange={(range) => dispatch({ locale: 'english', range })}
							placeholder='Select date range'
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>French:</p>
						<DateRangePicker
							dateRange={ranges.french}
							onDateRangeChange={(range) => dispatch({ locale: 'french', range })}
							placeholder='Sélectionner une plage de dates'
							locale={fr}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>Spanish:</p>
						<DateRangePicker
							dateRange={ranges.spanish}
							onDateRangeChange={(range) => dispatch({ locale: 'spanish', range })}
							placeholder='Seleccionar rango de fechas'
							locale={es}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>German:</p>
						<DateRangePicker
							dateRange={ranges.german}
							onDateRangeChange={(range) => dispatch({ locale: 'german', range })}
							placeholder='Datumsbereich auswählen'
							locale={de}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export const WithLocales: Story = {
	render: () => <WithLocalesTemplate />,
	args: {}
};

const WithDateFormatsTemplate = () => {
	const [selectedRange, setSelectedRange] = useState<DateRange>({
		from: new Date('2024-04-15'),
		to: new Date('2024-04-20')
	});

	const formatOptions: { key: DateFormatKey; label: string }[] = [
		{ key: 'medium', label: 'Medium (Apr 15 - Apr 20, 2024)' },
		{ key: 'long', label: 'Long (April 15 - April 20, 2024)' },
		{ key: 'short', label: 'Short (4/15 - 4/20/2024)' },
		{ key: 'compact', label: 'Compact (4/15/24 - 4/20/24)' },
		{ key: 'iso', label: 'ISO (2024-04-15 - 2024-04-20)' },
		{ key: 'dayDate', label: 'Day Date (Monday, Apr 15 - Saturday, Apr 20)' }
	];

	return (
		<div className='p-8 space-y-4'>
			<div>
				<h3 className='font-medium mb-2'>Date Range Format Options</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					Different format options for displaying date ranges with smart formatting.
				</p>

				<div className='space-y-3'>
					{formatOptions.map(({ key, label }) => (
						<div key={key} className='flex items-center gap-3 p-3 bg-secondary/30 rounded'>
							<div className='flex-1'>
								<DateRangePicker
									dateRange={selectedRange}
									onDateRangeChange={(range) => range && setSelectedRange(range)}
									dateFormat={key}
									placeholder={`Select range (${key} format)`}
								/>
							</div>
							<span className='text-sm text-muted-foreground min-w-0'>{label}</span>
						</div>
					))}
				</div>

				<div className='mt-6 p-4 bg-blue-50 rounded-md'>
					<h4 className='font-medium mb-2'>Smart Range Formatting</h4>
					<p className='text-sm text-muted-foreground mb-3'>
						The range formatter automatically optimizes display based on the selected dates:
					</p>
					<div className='space-y-2 text-sm'>
						<div>
							<strong>Same month:</strong> &quot;Apr 15 - 20, 2024&quot; (removes redundant month)
						</div>
						<div>
							<strong>Same year:</strong> &quot;Apr 15 - May 20, 2024&quot; (removes redundant year
							from start)
						</div>
						<div>
							<strong>Different years:</strong> &quot;Dec 15, 2024 - Jan 20, 2025&quot; (shows full
							dates)
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const WithDateFormats: Story = {
	render: () => <WithDateFormatsTemplate />,
	args: {}
};

const RangePickerWithField = () => {
	const [range, setRange] = useState<DateRange | undefined>(undefined);

	return (
		<div className='w-96'>
			<Field label='Stay dates' id='stay' description='Check-in and check-out.'>
				{(control) => (
					<DateRangePicker {...control} dateRange={range} onDateRangeChange={setRange} />
				)}
			</Field>
		</div>
	);
};

export const WithField: StoryObj = {
	render: () => <RangePickerWithField />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Field } from '@repo/ui-core';
import { DateRangePicker } from '@repo/ui-forms';

<Field label='Stay dates' id='stay'>
  {(control) => (
    <DateRangePicker {...control} dateRange={range} onDateRangeChange={setRange} />
  )}
</Field>`
			}
		}
	},
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);

		const trigger = canvas.getByRole('button', { name: /Stay dates/ });
		await expect(trigger).toHaveAttribute('id', 'stay');
		await expect(trigger).toHaveAttribute('aria-describedby', 'stay-message');
	}
};

const RangePickerInsideSheet = () => {
	const [range, setRange] = useState<DateRange | undefined>();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Sheet</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Book a stay</SheetTitle>
				</SheetHeader>
				<SheetInnerContent>
					<DateRangePicker
						dateRange={range}
						onDateRangeChange={setRange}
						placeholder='Select dates'
					/>
				</SheetInnerContent>
			</SheetContent>
		</Sheet>
	);
};

/**
 * The `DateRangePicker` half of the same acceptance test as `SingleDatePicker`'s `InsideASheet`. A
 * modal `<dialog>` paints in the top layer and makes everything outside it inert, so a calendar
 * portalled to `document.body` would be invisible and unclickable rather than merely misplaced.
 */
export const InsideASheet: StoryObj = {
	render: () => <RangePickerInsideSheet />,
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('button', { name: /open sheet/i }));
		const sheet = await within(document.body).findByRole('dialog');

		const trigger = within(sheet).getByRole('button', { name: /select dates/i });
		await userEvent.click(trigger);

		// Days are matched on `data-day` and their text: `CalendarDayButton` expresses selection
		// through `data-selected-single` rather than `aria-selected`, and a day's accessible name
		// carries the full date rather than the number.
		const day = await waitFor(() => {
			const found = Array.from(
				document.querySelectorAll<HTMLButtonElement>('button[data-day]')
			).find((button) => button.textContent?.trim() === '15');

			expect(found).toBeDefined();
			return found!;
		});

		await expect(sheet.contains(day)).toBe(true);

		await userEvent.click(day);
		await waitFor(async () => {
			await expect(trigger).toHaveTextContent('15');
		});
	}
};
