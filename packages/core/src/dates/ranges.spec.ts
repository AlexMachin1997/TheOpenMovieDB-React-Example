import { formatDateRange, formatDateRangeCompact } from './ranges';

describe('formatDateRange', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('same month', () => {
		it.each(['medium', 'long'] as const)(
			'formats an abbreviated range for the %s key',
			(formatKey) => {
				const startDate = new Date(2022, 3, 4); // Apr 4, 2022
				const endDate = new Date(2022, 3, 8); // Apr 8, 2022

				expect(formatDateRange({ startDate, endDate, formatKey })).toBe('Apr 4 - 8, 2022');
			}
		);

		it('matches the documented example from the JSDoc header', () => {
			const startDate = new Date(2024, 3, 15); // Apr 15, 2024
			const endDate = new Date(2024, 3, 20); // Apr 20, 2024

			expect(formatDateRange({ startDate, endDate })).toBe('Apr 15 - 20, 2024');
		});

		it('handles a same-month range spanning a leap day', () => {
			const startDate = new Date(2024, 1, 1); // Feb 1, 2024
			const endDate = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)

			expect(formatDateRange({ startDate, endDate })).toBe('Feb 1 - 29, 2024');
		});

		it('handles identical start and end dates', () => {
			const date = new Date(2022, 3, 4); // Apr 4, 2022

			expect(formatDateRange({ startDate: date, endDate: date })).toBe('Apr 4 - 4, 2022');
		});

		it('does not reorder a reversed range', () => {
			const startDate = new Date(2022, 3, 8); // Apr 8, 2022
			const endDate = new Date(2022, 3, 4); // Apr 4, 2022 (before startDate)

			expect(formatDateRange({ startDate, endDate })).toBe('Apr 8 - 4, 2022');
		});
	});

	describe('same year, different month', () => {
		it('formats the start date without a year for the medium key', () => {
			const startDate = new Date(2022, 3, 4); // Apr 4, 2022
			const endDate = new Date(2022, 4, 8); // May 8, 2022

			expect(formatDateRange({ startDate, endDate, formatKey: 'medium' })).toBe(
				'Apr 4 - May 8, 2022'
			);
		});

		it('always abbreviates the start month, even for the long key', () => {
			// Existing, pre-fix behaviour: the start fragment uses a hardcoded 'MMM d' format
			// regardless of formatKey, so it stays abbreviated ("Apr") while the end fragment
			// respects formatKey ("June" in full). Locked in here, not something this fix changes.
			const startDate = new Date(2022, 3, 4); // Apr 4, 2022
			const endDate = new Date(2022, 5, 8); // Jun 8, 2022

			expect(formatDateRange({ startDate, endDate, formatKey: 'long' })).toBe(
				'Apr 4 - June 8, 2022'
			);
		});
	});

	describe('cross year', () => {
		it('formats both dates in full for the medium key', () => {
			const startDate = new Date(2022, 11, 28); // Dec 28, 2022
			const endDate = new Date(2023, 0, 3); // Jan 3, 2023

			expect(formatDateRange({ startDate, endDate, formatKey: 'medium' })).toBe(
				'Dec 28, 2022 - Jan 3, 2023'
			);
		});

		it('formats both dates in full for the long key', () => {
			const startDate = new Date(2022, 11, 28); // Dec 28, 2022
			const endDate = new Date(2023, 0, 3); // Jan 3, 2023

			expect(formatDateRange({ startDate, endDate, formatKey: 'long' })).toBe(
				'December 28, 2022 - January 3, 2023'
			);
		});
	});

	describe('non-smart format keys', () => {
		it('formats both dates independently, ignoring same-month optimisation', () => {
			const startDate = new Date(2022, 3, 4); // Apr 4, 2022
			const endDate = new Date(2022, 3, 8); // Apr 8, 2022

			expect(formatDateRange({ startDate, endDate, formatKey: 'short' })).toBe(
				'4/4/2022 - 4/8/2022'
			);
		});
	});

	describe('single date only', () => {
		it('prefixes with the default "From " when showFromPrefix is true', () => {
			const startDate = new Date(2022, 3, 4); // Apr 4, 2022

			expect(formatDateRange({ startDate })).toBe('From Apr 4, 2022');
		});

		it('omits the prefix when showFromPrefix is false', () => {
			const startDate = new Date(2022, 3, 4); // Apr 4, 2022

			expect(formatDateRange({ startDate, showFromPrefix: false })).toBe('Apr 4, 2022');
		});

		it('uses a custom singleDatePrefix', () => {
			const startDate = new Date(2022, 3, 4); // Apr 4, 2022

			expect(formatDateRange({ startDate, singleDatePrefix: 'Starting ' })).toBe(
				'Starting Apr 4, 2022'
			);
		});

		it('ignores a custom singleDatePrefix when showFromPrefix is false', () => {
			const startDate = new Date(2022, 3, 4); // Apr 4, 2022

			expect(
				formatDateRange({ startDate, singleDatePrefix: 'Starting ', showFromPrefix: false })
			).toBe('Apr 4, 2022');
		});
	});

	describe('no dates', () => {
		it('returns an empty string when no options are given', () => {
			expect(formatDateRange()).toBe('');
		});

		it('returns an empty string when both dates are undefined', () => {
			expect(formatDateRange({ startDate: undefined, endDate: undefined })).toBe('');
		});

		it('returns an empty string when both dates are null', () => {
			expect(formatDateRange({ startDate: null, endDate: null })).toBe('');
		});

		it('returns an empty string when only endDate is provided', () => {
			expect(formatDateRange({ startDate: undefined, endDate: new Date(2022, 3, 8) })).toBe('');
		});

		it('returns an empty string when startDate is explicitly null and endDate is provided', () => {
			expect(formatDateRange({ startDate: null, endDate: new Date(2022, 3, 8) })).toBe('');
		});
	});

	describe('custom separator', () => {
		it('applies a custom separator on the same-month branch', () => {
			const startDate = new Date(2022, 3, 4); // Apr 4, 2022
			const endDate = new Date(2022, 3, 8); // Apr 8, 2022

			expect(formatDateRange({ startDate, endDate, separator: ' to ' })).toBe('Apr 4 to 8, 2022');
		});

		it('applies a custom separator on the fallback branch', () => {
			const startDate = new Date(2022, 11, 28); // Dec 28, 2022
			const endDate = new Date(2023, 0, 3); // Jan 3, 2023

			expect(formatDateRange({ startDate, endDate, separator: ' | ' })).toBe(
				'Dec 28, 2022 | Jan 3, 2023'
			);
		});
	});

	describe('invalid dates', () => {
		it('does not throw when endDate is an invalid Date', () => {
			vi.spyOn(console, 'warn').mockImplementation(() => {});

			const startDate = new Date(2022, 3, 4); // Apr 4, 2022
			const endDate = new Date('invalid');

			expect(formatDateRange({ startDate, endDate })).toBe('Apr 4, 2022 - ');
		});
	});
});

describe('formatDateRangeCompact', () => {
	it('formats both dates using the short key with an arrow separator', () => {
		const startDate = new Date(2024, 3, 15); // Apr 15, 2024
		const endDate = new Date(2024, 3, 20); // Apr 20, 2024

		expect(formatDateRangeCompact({ startDate, endDate })).toBe('4/15/2024 → 4/20/2024');
	});

	it('does not apply same-month optimisation, since formatKey is forced to short', () => {
		const startDate = new Date(2022, 3, 4); // Apr 4, 2022
		const endDate = new Date(2022, 3, 8); // Apr 8, 2022

		expect(formatDateRangeCompact({ startDate, endDate })).toBe('4/4/2022 → 4/8/2022');
	});

	it('formats a single start date with no prefix', () => {
		const startDate = new Date(2024, 3, 15); // Apr 15, 2024

		expect(formatDateRangeCompact({ startDate })).toBe('4/15/2024');
	});

	it('returns an empty string when only endDate is provided', () => {
		expect(formatDateRangeCompact({ endDate: new Date(2024, 3, 20) })).toBe('');
	});

	it('returns an empty string when no options are given', () => {
		expect(formatDateRangeCompact()).toBe('');
	});
});
