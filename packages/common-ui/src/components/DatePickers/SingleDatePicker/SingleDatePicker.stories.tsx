import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fr, es, de, ja } from 'date-fns/locale';

import { SingleDatePicker } from '~/components/DatePickers/SingleDatePicker/SingleDatePicker';
import { getDateFormatExamples, type DateFormatKey } from '~/utils/dates';

const meta: Meta<typeof SingleDatePicker> = {
	title: 'Components/Date pickers/Single date picker',
	component: SingleDatePicker
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <SingleDatePicker placeholder='Pick a date' />
};

const WithSelectedDateComponent = () => {
	const [date, setDate] = useState<Date | undefined>(new Date('2024-01-15'));
	return <SingleDatePicker date={date} onDateChange={setDate} placeholder='Pick a date' />;
};

export const WithSelectedDate: Story = {
	render: () => <WithSelectedDateComponent />
};

const DisabledComponent = () => {
	const [date, setDate] = useState<Date>();
	return <SingleDatePicker date={date} onDateChange={setDate} disabled placeholder='Pick a date' />;
};

export const Disabled: Story = {
	render: () => <DisabledComponent />
};

const CustomPlaceholderComponent = () => {
	const [date, setDate] = useState<Date>();
	return <SingleDatePicker date={date} onDateChange={setDate} placeholder='Select your birthday' />;
};

export const CustomPlaceholder: Story = {
	render: () => <CustomPlaceholderComponent />
};

// Interactive example with state management
const InteractiveComponent = () => {
	const [date, setDate] = useState<Date>();

	return (
		<div className='space-y-4'>
			<SingleDatePicker date={date} onDateChange={setDate} placeholder='Select a date' />
			{date && (
				<p className='text-sm text-muted-foreground'>Selected date: {date.toLocaleDateString()}</p>
			)}
		</div>
	);
};

export const Interactive: Story = {
	render: () => <InteractiveComponent />
};

// Multiple date pickers example
const MultipleComponent = () => {
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();

	return (
		<div className='space-y-4'>
			<div className='flex gap-4'>
				<SingleDatePicker date={startDate} onDateChange={setStartDate} placeholder='Start date' />
				<SingleDatePicker date={endDate} onDateChange={setEndDate} placeholder='End date' />
			</div>
			{(startDate || endDate) && (
				<p className='text-sm text-muted-foreground'>
					{startDate && `Start: ${startDate.toLocaleDateString()}`}
					{startDate && endDate && ' - '}
					{endDate && `End: ${endDate.toLocaleDateString()}`}
				</p>
			)}
		</div>
	);
};

export const Multiple: Story = {
	render: () => <MultipleComponent />
};

const WithDropdownNavigationComponent = () => {
	const [date, setDate] = useState<Date>();
	return (
		<div className='space-y-4'>
			<div>
				<h3 className='font-medium mb-2'>Quick Month/Year Navigation</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					Click the month or year in the calendar header to jump to a specific month/year. By
					default, supports years 1900-2100.
				</p>
				<SingleDatePicker
					date={date}
					onDateChange={setDate}
					placeholder='Pick a date with dropdown navigation'
				/>
			</div>
		</div>
	);
};

export const WithDropdownNavigation: Story = {
	render: () => <WithDropdownNavigationComponent />
};

const WithCustomRangeComponent = () => {
	const [currentYearDate, setCurrentYearDate] = useState<Date>();
	const [futureDate, setFutureDate] = useState<Date>();
	const [birthDate, setBirthDate] = useState<Date>();

	return (
		<div className='space-y-4'>
			<div>
				<h3 className='font-medium mb-2'>Custom Date Range</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					Optionally restrict the date range using fromYear and toYear props.
				</p>
				<div className='space-y-3'>
					<div>
						<p className='text-sm font-medium mb-1'>Current year only:</p>
						<SingleDatePicker
							date={currentYearDate}
							onDateChange={setCurrentYearDate}
							placeholder='Select date this year'
							fromYear={new Date().getFullYear()}
							toYear={new Date().getFullYear()}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>Next 5 years only:</p>
						<SingleDatePicker
							date={futureDate}
							onDateChange={setFutureDate}
							placeholder='Select future date'
							fromYear={new Date().getFullYear()}
							toYear={new Date().getFullYear() + 5}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>Birth year picker (1940-2010):</p>
						<SingleDatePicker
							date={birthDate}
							onDateChange={setBirthDate}
							placeholder='Select birth year'
							fromYear={1940}
							toYear={2010}
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
	const [englishDate, setEnglishDate] = useState<Date>();
	const [frenchDate, setFrenchDate] = useState<Date>();
	const [spanishDate, setSpanishDate] = useState<Date>();
	const [germanDate, setGermanDate] = useState<Date>();
	const [japaneseDate, setJapaneseDate] = useState<Date>();

	return (
		<div className='space-y-4'>
			<div>
				<h3 className='font-medium mb-2'>Localization Support</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					The DatePicker supports different locales for date formatting and calendar display.
				</p>
				<div className='space-y-3'>
					<div>
						<p className='text-sm font-medium mb-1'>English (default):</p>
						<SingleDatePicker
							date={englishDate}
							onDateChange={setEnglishDate}
							placeholder='Select a date'
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>French:</p>
						<SingleDatePicker
							date={frenchDate}
							onDateChange={setFrenchDate}
							placeholder='Sélectionner une date'
							locale={fr}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>Spanish:</p>
						<SingleDatePicker
							date={spanishDate}
							onDateChange={setSpanishDate}
							placeholder='Seleccionar una fecha'
							locale={es}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>German:</p>
						<SingleDatePicker
							date={germanDate}
							onDateChange={setGermanDate}
							placeholder='Datum auswählen'
							locale={de}
						/>
					</div>
					<div>
						<p className='text-sm font-medium mb-1'>Japanese:</p>
						<SingleDatePicker
							date={japaneseDate}
							onDateChange={setJapaneseDate}
							placeholder='日付を選択'
							locale={ja}
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
	const [selectedDate, setSelectedDate] = useState<Date>(new Date('2024-04-15'));
	const [selectedFormat, setSelectedFormat] = useState<DateFormatKey>('fullShort');

	const formatExamples = getDateFormatExamples();
	const popularFormats: DateFormatKey[] = [
		'fullShort',
		'long',
		'medium',
		'short',
		'iso',
		'dayDate',
		'compact'
	];

	return (
		<div className='space-y-4'>
			<div>
				<h3 className='font-medium mb-2'>Date Format Options</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					Choose from various predefined date formats to customize how dates are displayed.
				</p>

				{/* Format selector */}
				<div className='mb-4 p-3 bg-secondary rounded-md'>
					<label htmlFor='format-select' className='text-sm font-medium mb-2 block'>
						Select Format:
					</label>
					<select
						value={selectedFormat}
						onChange={(e) => setSelectedFormat(e.target.value as DateFormatKey)}
						id='format-select'
						className='px-3 py-2 border rounded-md text-sm'
					>
						{formatExamples.map(({ key, example, description }) => (
							<option key={key} value={key}>
								{key}: {example} ({description})
							</option>
						))}
					</select>
				</div>

				{/* Date picker with selected format */}
				<div className='mb-4'>
					<SingleDatePicker
						date={selectedDate}
						onDateChange={(date) => date && setSelectedDate(date)}
						dateFormat={selectedFormat}
						placeholder='Select a date'
					/>
				</div>

				{/* Popular formats showcase */}
				<div>
					<h4 className='font-medium mb-2'>Popular Formats:</h4>
					<div className='grid grid-cols-1 gap-2'>
						{popularFormats.map((formatKey) => {
							const example = formatExamples.find((f) => f.key === formatKey);
							return (
								<div
									key={formatKey}
									className='flex items-center gap-3 p-2 bg-secondary/50 rounded'
								>
									<SingleDatePicker
										date={selectedDate}
										onDateChange={(date) => date && setSelectedDate(date)}
										dateFormat={formatKey}
										className='flex-1'
									/>
									<span className='text-xs text-muted-foreground min-w-0 flex-shrink'>
										{formatKey}: {example?.description}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export const WithDateFormats: Story = {
	render: () => <WithDateFormatsComponent />
};
