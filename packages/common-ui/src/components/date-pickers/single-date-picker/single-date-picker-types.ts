import type { DatePickerProps } from '~/components/date-pickers/types';

export interface SingleDatePickerProps extends DatePickerProps {
	date?: Date;
	onDateChange?: (date: Date | undefined) => void;
}
