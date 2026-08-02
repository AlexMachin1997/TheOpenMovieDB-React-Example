import type { DateFormatKey } from './types';
import { formatDate, formatDateCustom } from './formatters';

const SAMPLE_DATE = new Date(2022, 3, 4); // Monday, April 4, 2022 — matches the comments in formats.ts

const FORMAT_KEY_CASES: [DateFormatKey, string][] = [
	['full', 'Monday, April 4th, 2022'],
	['fullShort', 'April 4th, 2022'],
	['long', 'April 4, 2022'],
	['medium', 'Apr 4, 2022'],
	['short', '4/4/2022'],
	['iso', '2022-04-04'],
	['compact', '4/4/22'],
	['dayDate', 'Monday, Apr 4'],
	['dayShort', 'Mon, Apr 4'],
	['monthYear', 'April 2022'],
	['monthShort', 'Apr 2022'],
	['european', '4/4/2022'],
	['europeanDot', '4.4.2022'],
	['weekday', 'Monday'],
	['month', 'April'],
	['year', '2022']
];

describe('formatDate', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it.each(FORMAT_KEY_CASES)('formats the %s key as "%s"', (formatKey, expected) => {
		expect(formatDate({ date: SAMPLE_DATE, formatKey })).toBe(expected);
	});

	it('defaults to the medium format when no formatKey is given', () => {
		expect(formatDate({ date: SAMPLE_DATE })).toBe('Apr 4, 2022');
	});

	it('returns an empty string when no options are given', () => {
		expect(formatDate()).toBe('');
	});

	it('returns an empty string when date is undefined', () => {
		expect(formatDate({ date: undefined })).toBe('');
	});

	it('returns an empty string when date is null', () => {
		expect(formatDate({ date: null })).toBe('');
	});

	it('returns an empty string when the date is invalid', () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});

		expect(formatDate({ date: new Date('invalid') })).toBe('');
	});

	it('warns when the date is invalid', () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

		formatDate({ date: new Date('invalid') });

		expect(warnSpy).toHaveBeenCalledTimes(1);
	});
});

describe('formatDateCustom', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('formats using an arbitrary date-fns format string', () => {
		expect(formatDateCustom({ date: SAMPLE_DATE, formatString: 'yyyy/MM/dd' })).toBe('2022/04/04');
	});

	it('formats using a format string with literal text', () => {
		expect(formatDateCustom({ date: SAMPLE_DATE, formatString: "'Week of' MMM d" })).toBe('Week of Apr 4');
	});

	it('returns an empty string when date is undefined', () => {
		expect(formatDateCustom({ date: undefined, formatString: 'yyyy' })).toBe('');
	});

	it('returns an empty string when date is null', () => {
		expect(formatDateCustom({ date: null, formatString: 'yyyy' })).toBe('');
	});

	it('returns an empty string when the date is invalid', () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});

		expect(formatDateCustom({ date: new Date('invalid'), formatString: 'yyyy' })).toBe('');
	});

	it('returns an empty string when the format string uses a rejected legacy token', () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});

		// date-fns throws for ambiguous moment.js-style tokens like 'YYYY' (week-numbering year)
		expect(formatDateCustom({ date: SAMPLE_DATE, formatString: 'YYYY' })).toBe('');
	});
});
