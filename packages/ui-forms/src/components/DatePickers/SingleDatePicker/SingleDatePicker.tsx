import React from 'react';
import { cn } from '@repo/tailwind-config';
import { formatDate } from '@repo/core';
import { Button, Calendar, Icon } from '@repo/ui-core';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui-overlays';
import { IDatePicker } from '~/components/DatePickers/types';

interface ISingleDatePicker extends IDatePicker {
	date?: Date;
	onDateChange?: (date: Date | undefined) => void;
}

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
}: ISingleDatePicker) => {
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
						'max-w-md w-full justify-start text-left font-normal',
						!date && 'text-muted-foreground',
						className
					)}
				>
					<Icon name='calendar' className='mr-2' />
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
				/>
			</PopoverContent>
		</Popover>
	);
};
