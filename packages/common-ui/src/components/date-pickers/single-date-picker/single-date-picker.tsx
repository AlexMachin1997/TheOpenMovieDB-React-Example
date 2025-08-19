import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { cn } from '~/utils/className';
import { formatDate } from '~/utils/dates';
import { Button } from '~/components/button/button';
import { Calendar } from '~/components/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/popover/popover';
import type { SingleDatePickerProps } from '~/components/date-pickers/single-date-picker/single-date-picker-types';

export const SingleDatePicker = ({
	date,
	onDateChange,
	placeholder = 'Pick a date',
	disabled = false,
	className,
	fromYear = 1900,
	toYear = 2100,
	locale,
	dateFormat = 'fullShort'
}: SingleDatePickerProps) => {
	const startMonth = new Date(fromYear, 0);
	const endMonth = new Date(toYear, 11);

	const formattedDate = React.useMemo(() => {
		return formatDate({ date, formatKey: dateFormat, locale });
	}, [date, dateFormat, locale]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					disabled={disabled}
					className={cn(
						'w-[280px] justify-start text-left font-normal',
						!date && 'text-muted-foreground',
						className
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? <span>{formattedDate}</span> : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={onDateChange}
					captionLayout='dropdown'
					startMonth={startMonth}
					endMonth={endMonth}
					locale={locale}
					autoFocus
				/>
			</PopoverContent>
		</Popover>
	);
};
