import { DATE_FORMATS } from '~/utils/dates/formats';
import type { DateFormatKey, GetDateFormatExamplesOptions } from '~/utils/dates/types';
import { formatDate } from '~/utils/dates/formatters';

/**
 * Get a description for each format key
 * @param key - The format key to get a description for
 * @returns The description for the format key
 */
export const getFormatDescription = (key: DateFormatKey): string => {
	const descriptions: Record<DateFormatKey, string> = {
		full: 'Full date with day name',
		fullShort: 'Full date without day name',
		long: 'Long format with full month',
		medium: 'Medium format with abbreviated month',
		short: 'Short numeric format',
		iso: 'ISO standard format',
		compact: 'Very short format',
		dayDate: 'Day name and date',
		dayShort: 'Abbreviated day and date',
		monthYear: 'Month and year only',
		monthShort: 'Abbreviated month and year',
		european: 'European date format',
		europeanDot: 'European with dots',
		weekday: 'Day name only',
		month: 'Month name only',
		year: 'Year only'
	};

	return descriptions[key] || 'Custom format';
};

/**
 * Get examples of all available date formats
 * @param options - The options for getting the date format examples
 * @returns The date format examples
 */
export const getDateFormatExamples = (options: GetDateFormatExamplesOptions = {}) => {
	const { sampleDate = new Date('2022-04-04'), locale } = options;

	return Object.entries(DATE_FORMATS).map(([key, formatString]) => ({
		key: key as DateFormatKey,
		format: formatString,
		example: formatDate({ date: sampleDate, formatKey: key as DateFormatKey, locale }),
		description: getFormatDescription(key as DateFormatKey)
	}));
};
