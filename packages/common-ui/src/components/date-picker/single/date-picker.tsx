import { CalendarIcon } from 'lucide-react';
import type { Locale } from 'date-fns';

import { cn } from '~/utils/className';
import { formatDate, type DateFormatKey } from '~/utils/dates';
import { Button } from '~/components/button/button';
import { Calendar } from '~/components/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/popover/popover';

export interface DatePickerProps {
	date?: Date;
	onDateChange?: (date: Date | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	fromYear?: number;
	toYear?: number;
	locale?: Locale;
	dateFormat?: DateFormatKey;
}

export const DatePicker = ({
	date,
	onDateChange,
	placeholder = 'Pick a date',
	disabled = false,
	className,
	fromYear = 1900,
	toYear = 2100,
	locale,
	dateFormat = 'fullShort'
}: DatePickerProps) => {
	const startMonth = new Date(fromYear, 0);
	const endMonth = new Date(toYear, 11);
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
					{date ? formatDate({ date, formatKey: dateFormat, locale }) : <span>{placeholder}</span>}
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
