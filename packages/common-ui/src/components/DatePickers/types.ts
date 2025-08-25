import type { Locale } from 'date-fns';
import type { DateFormatKey } from '~/utils/dates';

export interface DatePickerProps {
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	fromYear?: number;
	toYear?: number;
	locale?: Locale;
	dateFormat?: DateFormatKey;
}
