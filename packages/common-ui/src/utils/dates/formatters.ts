import { format } from 'date-fns';

import { DATE_FORMATS } from './formats';
import type { FormatDateOptions, FormatDateCustomOptions } from './types';

/**
 * Formats a date using a predefined format key with optional locale support.
 *
 * This is the primary function for date formatting in the application. It provides
 * consistent date formatting across components with built-in error handling and
 * locale support.
 *
 * @param options - Configuration object for date formatting
 * @param options.date - The date to format (returns empty string if null/undefined)
 * @param options.formatKey - The predefined format to use (defaults to 'medium')
 * @param options.locale - Optional locale for internationalization
 *
 * @returns Formatted date string, or empty string if date is null/undefined
 *
 * @example
 * ```tsx
 * // Basic usage with default medium format
 * formatDate({ date: new Date() });
 * // Result: "Apr 15, 2024"
 *
 * // With specific format
 * formatDate({ date: new Date(), formatKey: 'long' });
 * // Result: "April 15, 2024"
 *
 * // With locale support
 * import { fr } from 'date-fns/locale';
 * formatDate({ date: new Date(), formatKey: 'long', locale: fr });
 * // Result: "15 avril 2024"
 *
 * // Handling null dates safely
 * formatDate({ date: null }); // Result: ""
 * ```
 *
 * @see {@link DATE_FORMATS} for available format keys
 * @see {@link https://date-fns.org/docs/Locale} for locale documentation
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
 * Use this function when you need a format that isn't available in the predefined
 * DATE_FORMATS. Accepts any valid date-fns format string.
 *
 * @param options - Configuration object for custom date formatting
 * @param options.date - The date to format (returns empty string if null/undefined)
 * @param options.formatString - Custom date-fns format string (required)
 * @param options.locale - Optional locale for internationalization
 *
 * @returns Formatted date string, or empty string if date is null/undefined
 *
 * @example
 * ```tsx
 * // Custom format for time display
 * formatDateCustom({
 *   date: new Date(),
 *   formatString: 'HH:mm:ss'
 * });
 * // Result: "14:30:25"
 *
 * // Complex custom format
 * formatDateCustom({
 *   date: new Date(),
 *   formatString: "EEEE 'the' do 'of' MMMM yyyy"
 * });
 * // Result: "Monday the 15th of April 2024"
 *
 * // With locale
 * import { de } from 'date-fns/locale';
 * formatDateCustom({
 *   date: new Date(),
 *   formatString: 'PPPP',
 *   locale: de
 * });
 * // Result: "Montag, 15. April 2024"
 * ```
 *
 * @see {@link https://date-fns.org/docs/format} for format string documentation
 * @see {@link https://date-fns.org/docs/Locale} for locale documentation
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
