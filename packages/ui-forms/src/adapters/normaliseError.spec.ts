import { describe, it, expect } from 'vitest';
import { normaliseError } from '~/adapters/normaliseError';

describe('normaliseError', () => {
	describe('strings', () => {
		it('returns a plain message unchanged', () => {
			expect(normaliseError('Required')).toBe('Required');
		});

		it('rejects an empty string rather than rendering a blank message', () => {
			expect(normaliseError('')).toBeUndefined();
		});

		it('rejects a whitespace-only string for the same reason', () => {
			expect(normaliseError('   ')).toBeUndefined();
		});
	});

	describe('objects carrying a message', () => {
		it('reads a Standard Schema issue', () => {
			expect(normaliseError({ message: 'Invalid email' })).toBe('Invalid email');
		});

		it('reads an Error instance, which is how a failed submission arrives', () => {
			expect(normaliseError(new Error('We could not reach the server'))).toBe(
				'We could not reach the server'
			);
		});

		it('reads a subclass of Error just as readily', () => {
			class HttpError extends Error {}
			expect(normaliseError(new HttpError('Service unavailable'))).toBe('Service unavailable');
		});

		it('rejects a message that is present but not a string', () => {
			expect(normaliseError({ message: 500 })).toBeUndefined();
		});

		it('rejects a blank message, so the caller can fall back to generic wording', () => {
			expect(normaliseError(new Error(''))).toBeUndefined();
		});
	});

	describe('anything else', () => {
		it.each([
			['undefined', undefined],
			['null', null],
			['a number', 42],
			['a boolean', true],
			['an empty object', {}],
			['an array', ['Required']]
		])('returns undefined for %s', (_label, candidate) => {
			expect(normaliseError(candidate)).toBeUndefined();
		});
	});
});
