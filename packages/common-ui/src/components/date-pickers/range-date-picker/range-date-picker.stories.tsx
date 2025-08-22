import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { fr, es, de } from 'date-fns/locale';
import { DateRangePicker } from '~/components/date-pickers/range-date-picker/range-date-picker';
import { type DateFormatKey } from '~/utils/dates';

const meta = {
	title: 'Components/Date pickers/Range date picker',
	component: DateRangePicker,
	parameters: {
		layout: 'fullscreen',
		viewport: {
			defaultViewport: 'desktop'
		}
	}
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className='p-8'>
			<DateRangePicker />
		</div>
	)
};

export const WithSelectedRange: Story = {
	render: () => (
		<div className='p-8'>
			<DateRangePicker
				dateRange={{
					from: new Date('2024-01-15'),
					to: new Date('2024-01-20')
				}}
			/>
		</div>
	)
};

export const Disabled: Story = {
	render: () => (
		<div className='p-8'>
			<DateRangePicker disabled />
		</div>
	)
};

export const CustomPlaceholder: Story = {
	render: () => (
		<div className='p-8'>
			<DateRangePicker placeholder='Select check-in and check-out dates' />
		</div>
	)
};

const InteractiveComponent = () => {
	const [dateRange, setDateRange] = useState<DateRange>();

	return (
		<div className='p-8 space-y-4'>
			<DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
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
	render: () => <InteractiveComponent />
};

const TravelBookingComponent = () => {
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
	render: () => <TravelBookingComponent />
};

const WithCustomRangeComponent = () => {
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
	render: () => <WithCustomRangeComponent />
};

const WithLocalesComponent = () => {
	const [englishRange, setEnglishRange] = useState<DateRange>();
	const [frenchRange, setFrenchRange] = useState<DateRange>();
	const [spanishRange, setSpanishRange] = useState<DateRange>();
	const [germanRange, setGermanRange] = useState<DateRange>();

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
							dateRange={englishRange}
							onDateRangeChange={setEnglishRange}
							placeholder='Select date range'
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>French:</p>
						<DateRangePicker
							dateRange={frenchRange}
							onDateRangeChange={setFrenchRange}
							placeholder='Sélectionner une plage de dates'
							locale={fr}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>Spanish:</p>
						<DateRangePicker
							dateRange={spanishRange}
							onDateRangeChange={setSpanishRange}
							placeholder='Seleccionar rango de fechas'
							locale={es}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>German:</p>
						<DateRangePicker
							dateRange={germanRange}
							onDateRangeChange={setGermanRange}
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
	render: () => <WithLocalesComponent />
};

const WithDateFormatsComponent = () => {
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
	render: () => <WithDateFormatsComponent />
};
