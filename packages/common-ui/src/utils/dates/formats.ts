import type { DateFormatKey } from './types';

/**
 * Predefined date format strings mapped to their format keys.
 *
 * These formats use date-fns format tokens and are organized by category:
 * - **Standard formats**: Common date display formats
 * - **ISO and compact**: Technical and space-efficient formats
 * - **Day combinations**: Formats including day names
 * - **Month/Year only**: Partial date formats
 * - **International**: Region-specific format styles
 * - **Components**: Individual date components
 *
 * @example
 * ```tsx
 * // Using a predefined format
 * const formatString = DATE_FORMATS.medium; // 'MMM d, yyyy'
 * format(new Date(), formatString); // 'Apr 4, 2022'
 * ```
 *
 * @see {@link https://date-fns.org/docs/format} for format token documentation
 */
export const DATE_FORMATS: Record<DateFormatKey, string> = {
	// Standard formats - most commonly used
	full: 'PPPP', // Monday, April 4th, 2022
	fullShort: 'PPP', // April 4th, 2022
	long: 'MMMM d, yyyy', // April 4, 2022
	medium: 'MMM d, yyyy', // Apr 4, 2022
	short: 'M/d/yyyy', // 4/4/2022

	// ISO and compact
	iso: 'yyyy-MM-dd', // 2022-04-04
	compact: 'M/d/yy', // 4/4/22

	// Day combinations
	dayDate: 'EEEE, MMM d', // Monday, Apr 4
	dayShort: 'EEE, MMM d', // Mon, Apr 4

	// Month/Year only
	monthYear: 'MMMM yyyy', // April 2022
	monthShort: 'MMM yyyy', // Apr 2022

	// International
	european: 'd/M/yyyy', // 4/4/2022 (European style)
	europeanDot: 'd.M.yyyy', // 4.4.2022 (German style)

	// Components
	weekday: 'EEEE', // Monday
	month: 'MMMM', // April
	year: 'yyyy' // 2022
} as const;
