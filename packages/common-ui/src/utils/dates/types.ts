import type { Locale } from 'date-fns';

/**
 * Available predefined date format keys
 */
export type DateFormatKey =
	| 'full' // Monday, April 4th, 2022
	| 'fullShort' // April 4th, 2022
	| 'long' // April 4, 2022
	| 'medium' // Apr 4, 2022
	| 'short' // 4/4/2022
	| 'iso' // 2022-04-04
	| 'compact' // 4/4/22
	| 'dayDate' // Monday, Apr 4
	| 'dayShort' // Mon, Apr 4
	| 'monthYear' // April 2022
	| 'monthShort' // Apr 2022
	| 'european' // 4/4/2022 (European style)
	| 'europeanDot' // 4.4.2022 (German style)
	| 'weekday' // Monday
	| 'month' // April
	| 'year'; // 2022

/**
 * Options for formatting a single date
 */
export interface FormatDateOptions {
	/** The date to format */
	date?: Date | null;
	/** The format key to use (defaults to 'medium') */
	formatKey?: DateFormatKey;
	/** The locale to use for formatting */
	locale?: Locale;
}

/**
 * Options for formatting a date with a custom format string
 */
export interface FormatDateCustomOptions {
	/** The date to format */
	date?: Date | null;
	/** Custom date-fns format string */
	formatString: string;
	/** The locale to use for formatting */
	locale?: Locale;
}

/**
 * Options for formatting a date range
 */
export interface FormatDateRangeOptions {
	/** The start date of the range */
	startDate?: Date | null;
	/** The end date of the range */
	endDate?: Date | null;
	/** The format key to use (defaults to 'medium') */
	formatKey?: DateFormatKey;
	/** The locale to use for formatting */
	locale?: Locale;
	/** Separator between start and end dates (defaults to ' - ') */
	separator?: string;
	/** Prefix for single date display (defaults to 'From ') */
	singleDatePrefix?: string;
	/** Whether to show the prefix for single dates (defaults to true) */
	showFromPrefix?: boolean;
}

/**
 * Options for compact date range formatting
 */
export interface FormatDateRangeCompactOptions {
	/** The start date of the range */
	startDate?: Date | null;
	/** The end date of the range */
	endDate?: Date | null;
	/** The locale to use for formatting */
	locale?: Locale;
}

/**
 * Options for getting date format examples
 */
export interface GetDateFormatExamplesOptions {
	/** Sample date to use for examples (defaults to 2022-04-04) */
	sampleDate?: Date;
	/** The locale to use for examples */
	locale?: Locale;
}

/**
 * Result object for date format examples
 */
export interface DateFormatExample {
	/** The format key */
	key: DateFormatKey;
	/** The date-fns format string */
	format: string;
	/** Example output using the sample date */
	example: string;
	/** Human-readable description of the format */
	description: string;
}
