import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import type { Locale } from 'date-fns';

import { cn } from '~/utils/className';
import { formatDateRange, type DateFormatKey } from '~/utils/dates';
import { Button } from '~/components/button/button';
import { Calendar } from '~/components/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/popover/popover';

export interface DateRangePickerProps {
	dateRange?: DateRange;
	onDateRangeChange?: (dateRange: DateRange | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	fromYear?: number;
	toYear?: number;
	locale?: Locale;
	dateFormat?: DateFormatKey;
}

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
	const getFormattedRange = () => {
		const formattedRange = formatDateRange({
			startDate: dateRange?.from,
			endDate: dateRange?.to,
			formatKey: dateFormat,
			locale,
			separator: ' - ',
			singleDatePrefix: 'From ',
			showFromPrefix: true
		});

		return formattedRange || placeholder;
	};

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
						<span>{getFormattedRange()}</span>
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
