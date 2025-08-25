import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { cn } from '~/utils/className';
import { formatDateRange } from '~/utils/dates';
import { Button } from '~/components/Button/Button';
import { Calendar } from '~/components/Calendar/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Popover/Popover';
import type { DateRangePickerProps } from '~/components/DatePickers/RangeDatePicker/RangeDatePicker-Types';

export const DateRangePicker = ({
	dateRange,
	onDateRangeChange,
	placeholder = 'Pick a date range',
	disabled = false,
	className,
	fromYear = 1900,
	toYear = 2100,
	locale,
	dateFormat = 'medium'
}: DateRangePickerProps) => {
	const startMonth = new Date(fromYear, 0);
	const endMonth = new Date(toYear, 11);

	const formattedRange = React.useMemo(() => {
		return formatDateRange({
			startDate: dateRange?.from,
			endDate: dateRange?.to,
			formatKey: dateFormat,
			locale,
			separator: ' - ',
			singleDatePrefix: 'From ',
			showFromPrefix: true
		});
	}, [dateRange, dateFormat, locale]);

	return (
		<div className={cn(className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						disabled={disabled}
						className={cn(
							'w-[300px] justify-start text-left font-normal',
							!dateRange?.from && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{dateRange?.from && dateRange?.to ? (
							<span>{formattedRange}</span>
						) : (
							<span>{placeholder}</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto p-0'
					align='start'
					side='bottom'
					sideOffset={8}
					collisionPadding={50}
					avoidCollisions={false}
				>
					<Calendar
						mode='range'
						selected={dateRange}
						onSelect={onDateRangeChange}
						numberOfMonths={2}
						captionLayout='dropdown'
						startMonth={startMonth}
						endMonth={endMonth}
						locale={locale}
						autoFocus
						className='max-w-none'
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};
