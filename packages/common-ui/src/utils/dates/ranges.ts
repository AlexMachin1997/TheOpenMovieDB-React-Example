import { formatDate, formatDateCustom } from './formatters';
import type { FormatDateRangeOptions, FormatDateRangeCompactOptions } from './types';

/**
 * Formats a date range with intelligent optimization and customizable display options.
 *
 * This function provides smart formatting that automatically optimizes the display
 * based on the relationship between the start and end dates:
 * - Same month: "Apr 15 - 20, 2024" (removes redundant month from start)
 * - Same year: "Apr 15 - May 20, 2024" (removes redundant year from start)
 * - Different years: "Dec 15, 2024 - Jan 20, 2025" (shows full dates)
 *
 * @param options - Configuration object for date range formatting
 * @param options.startDate - The start date of the range (optional)
 * @param options.endDate - The end date of the range (optional)
 * @param options.formatKey - The predefined format to use (defaults to 'medium')
 * @param options.locale - Optional locale for internationalization
 * @param options.separator - String to separate start and end dates (defaults to ' - ')
 * @param options.singleDatePrefix - Prefix when only start date is provided (defaults to 'From ')
 * @param options.showFromPrefix - Whether to show prefix for single dates (defaults to true)
 *
 * @returns Formatted date range string, or empty string if no dates provided
 *
 * @example
 * ```tsx
 * // Basic date range
 * formatDateRange({
 *   startDate: new Date('2024-04-15'),
 *   endDate: new Date('2024-04-20')
 * });
 * // Result: "Apr 15 - 20, 2024" (same month optimization)
 *
 * // Different months, same year
 * formatDateRange({
 *   startDate: new Date('2024-04-15'),
 *   endDate: new Date('2024-05-20')
 * });
 * // Result: "Apr 15 - May 20, 2024" (same year optimization)
 *
 * // Custom separator and locale
 * import { fr } from 'date-fns/locale';
 * formatDateRange({
 *   startDate: new Date('2024-04-15'),
 *   endDate: new Date('2024-04-20'),
 *   separator: ' → ',
 *   locale: fr
 * });
 * // Result: "15 avr. → 20, 2024"
 *
 * // Single date (start only)
 * formatDateRange({
 *   startDate: new Date('2024-04-15'),
 *   singleDatePrefix: 'Starting ',
 *   showFromPrefix: true
 * });
 * // Result: "Starting Apr 15, 2024"
 *
 * // No prefix for single date
 * formatDateRange({
 *   startDate: new Date('2024-04-15'),
 *   showFromPrefix: false
 * });
 * // Result: "Apr 15, 2024"
 * ```
 *
 * @see {@link formatDate} for single date formatting
 * @see {@link formatDateRangeCompact} for compact range formatting
 */
export const formatDateRange = (options: FormatDateRangeOptions = {}): string => {
	const {
		startDate,
		endDate,
		formatKey = 'medium',
		locale,
		separator = ' - ',
		singleDatePrefix = 'From ',
		showFromPrefix = true
	} = options;

	if (startDate && endDate) {
		const start = formatDate({ date: startDate, formatKey, locale });
		const end = formatDate({ date: endDate, formatKey, locale });

		// Smart formatting: if both dates are in the same month/year, show abbreviated start
		if (formatKey === 'medium' || formatKey === 'long') {
			const startYear = startDate.getFullYear();
			const endYear = endDate.getFullYear();
			const startMonth = startDate.getMonth();
			const endMonth = endDate.getMonth();

			if (startYear === endYear && startMonth === endMonth) {
				// Same month: "Apr 4 - 8, 2022"
				const startDay = startDate.getDate();
				const monthShort = formatDate({ date: startDate, formatKey: 'monthShort', locale });
				return `${monthShort} ${startDay}${separator}${end}`;
			} else if (startYear === endYear) {
				// Same year: "Apr 4 - May 8, 2022"
				const startWithoutYear = formatDateCustom({
					date: startDate,
					formatString: 'MMM d',
					locale
				});
				return `${startWithoutYear}${separator}${end}`;
			}
		}

		return `${start}${separator}${end}`;
	}

	if (startDate) {
		const prefix = showFromPrefix ? singleDatePrefix : '';
		return `${prefix}${formatDate({ date: startDate, formatKey, locale })}`;
	}

	return '';
};

/**
 * Formats a date range using a compact display format optimized for buttons and small spaces.
 *
 * This is a convenience function that applies sensible defaults for compact display:
 * - Uses 'short' format key (e.g., "4/15/2024")
 * - Uses arrow separator (' → ') instead of dash
 * - No prefix for single dates
 * - Maintains locale support
 *
 * @param options - Configuration object for compact date range formatting
 * @param options.startDate - The start date of the range (optional)
 * @param options.endDate - The end date of the range (optional)
 * @param options.locale - Optional locale for internationalization
 *
 * @returns Compact formatted date range string, or empty string if no dates provided
 *
 * @example
 * ```tsx
 * // Basic compact range
 * formatDateRangeCompact({
 *   startDate: new Date('2024-04-15'),
 *   endDate: new Date('2024-04-20')
 * });
 * // Result: "4/15/2024 → 4/20/2024"
 *
 * // With locale (European format)
 * import { de } from 'date-fns/locale';
 * formatDateRangeCompact({
 *   startDate: new Date('2024-04-15'),
 *   endDate: new Date('2024-04-20'),
 *   locale: de
 * });
 * // Result: "15.4.2024 → 20.4.2024" (based on locale formatting)
 *
 * // Single date (no prefix)
 * formatDateRangeCompact({
 *   startDate: new Date('2024-04-15')
 * });
 * // Result: "4/15/2024"
 *
 * // Usage in button components
 * <Button>
 *   {formatDateRangeCompact({ startDate: trip.departure, endDate: trip.return })}
 * </Button>
 * ```
 *
 * @see {@link formatDateRange} for full range formatting with all options
 */
export const formatDateRangeCompact = (options: FormatDateRangeCompactOptions = {}): string => {
	const { startDate, endDate, locale } = options;

	return formatDateRange({
		startDate,
		endDate,
		formatKey: 'short',
		locale,
		separator: ' → ',
		singleDatePrefix: '',
		showFromPrefix: false
	});
};
