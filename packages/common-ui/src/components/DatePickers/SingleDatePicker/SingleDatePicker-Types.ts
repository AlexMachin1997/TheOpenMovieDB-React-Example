import type { DatePickerProps } from '~/components/DatePickers/types';

export interface SingleDatePickerProps extends DatePickerProps {
	date?: Date;
	onDateChange?: (date: Date | undefined) => void;
}
