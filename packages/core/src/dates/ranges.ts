import { formatDate, formatDateCustom } from './formatters';
import type { FormatDateRangeOptions, FormatDateRangeCompactOptions } from './types';

/**
 * Formats a date range with intelligent optimization and customizable display options.
 *
 * @param options - Configuration object for date range formatting
 * @returns Formatted date range string, or empty string if no dates provided
 *
 * @example
 * ```tsx
 * formatDateRange({
 *   startDate: new Date('2024-04-15'),
 *   endDate: new Date('2024-04-20')
 * }); // "Apr 15 - 20, 2024"
 * ```
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
				const startWithoutYear = formatDateCustom({
					date: startDate,
					formatString: 'MMM d',
					locale
				});
				const endDayYear = formatDateCustom({
					date: endDate,
					formatString: 'd, yyyy',
					locale
				});
				return `${startWithoutYear}${separator}${endDayYear}`;
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
 * @param options - Configuration object for compact date range formatting
 * @returns Compact formatted date range string, or empty string if no dates provided
 *
 * @example
 * ```tsx
 * formatDateRangeCompact({
 *   startDate: new Date('2024-04-15'),
 *   endDate: new Date('2024-04-20')
 * }); // "4/15/2024 → 4/20/2024"
 * ```
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
