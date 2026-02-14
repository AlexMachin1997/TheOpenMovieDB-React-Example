import { format } from 'date-fns';

import { DATE_FORMATS } from './formats';
import type { FormatDateOptions, FormatDateCustomOptions } from './types';

/**
 * Formats a date using a predefined format key with optional locale support.
 *
 * @param options - Configuration object for date formatting
 * @returns Formatted date string, or empty string if date is null/undefined
 *
 * @example
 * ```tsx
 * formatDate({ date: new Date() }); // "Apr 15, 2024"
 * formatDate({ date: new Date(), formatKey: 'long' }); // "April 15, 2024"
 * ```
 */
export const formatDate = (options: FormatDateOptions = {}): string => {
	const { date, formatKey = 'medium', locale } = options;

	if (!date) return '';

	try {
		return format(date, DATE_FORMATS[formatKey], { locale });
	} catch (error) {
		console.warn('Date formatting error:', error);
		return '';
	}
};

/**
 * Formats a date using a custom date-fns format string with optional locale support.
 *
 * @param options - Configuration object for custom date formatting
 * @returns Formatted date string, or empty string if date is null/undefined
 *
 * @example
 * ```tsx
 * formatDateCustom({ date: new Date(), formatString: 'HH:mm:ss' }); // "14:30:25"
 * ```
 */
export const formatDateCustom = (options: FormatDateCustomOptions): string => {
	const { date, formatString, locale } = options;

	if (!date) return '';

	try {
		return format(date, formatString, { locale });
	} catch (error) {
		console.warn('Date formatting error:', error);
		return '';
	}
};
