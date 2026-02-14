import type { Locale } from 'date-fns';
import type { DateFormatKey } from '@repo/core';

export interface IDatePicker {
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	fromYear?: number;
	toYear?: number;
	locale?: Locale;
	dateFormat?: DateFormatKey;
}
