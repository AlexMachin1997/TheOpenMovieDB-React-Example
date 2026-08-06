import { describe, it, expect, expectTypeOf } from 'vitest';
import type { AnyFieldApi } from '@tanstack/react-form';
import { toFieldProps } from '~/adapters/toFieldProps';
import type { ITanStackFieldLike } from '~/adapters/toFieldProps.types';

/**
 * Builds a field-shaped object. A plain literal is enough because `toFieldProps` is typed against
 * the structural `ITanStackFieldLike` rather than TanStack's class — which is what lets these run
 * under `ui-forms`' node preset with no DOM and no form instance.
 *
 * The risk of a fixture is that it lies about the real shape, so `assignability` below pins
 * `AnyFieldApi` against the same interface at compile time, and `toFieldProps.stories.tsx` drives a
 * genuine `useForm` in a browser.
 */
const field = (
	meta: Partial<ITanStackFieldLike['state']['meta']> = {}
): ITanStackFieldLike => ({
	state: {
		meta: {
			isTouched: false,
			isBlurred: false,
			errors: [],
			errorMap: {},
			...meta
		}
	}
});

describe('toFieldProps', () => {
	describe('when the error becomes visible', () => {
		it('says nothing about an untouched field, however invalid it is', () => {
			expect(toFieldProps(field({ errors: ['Required'] }))).toEqual({ error: undefined });
		});

		it('shows the error once the field has been touched', () => {
			expect(toFieldProps(field({ isTouched: true, errors: ['Required'] }))).toEqual({
				error: 'Required'
			});
		});

		it('stays quiet under `blurred` while the field is merely touched', () => {
			const state = field({ isTouched: true, errors: ['Required'] });

			expect(toFieldProps(state, { showErrorsWhen: 'blurred' })).toEqual({ error: undefined });
		});

		it('shows the error under `blurred` once the field has been left', () => {
			const state = field({ isTouched: true, isBlurred: true, errors: ['Required'] });

			expect(toFieldProps(state, { showErrorsWhen: 'blurred' })).toEqual({ error: 'Required' });
		});

		// The case that makes `blurred` safe to offer. `FormApi.handleSubmit` marks every mounted
		// field touched but blurs none, so a bare `isBlurred` gate would hide errors on exactly the
		// fields a user skipped — the ones most likely to be wrong.
		it('shows a submit-sourced error under `blurred` even on a field never visited', () => {
			const state = field({
				isTouched: true,
				isBlurred: false,
				errors: ['Required'],
				errorMap: { onSubmit: 'Required' }
			});

			expect(toFieldProps(state, { showErrorsWhen: 'blurred' })).toEqual({ error: 'Required' });
		});

		it('shows a server-sourced error under `blurred` on the same grounds', () => {
			const state = field({
				errors: ['That email is already registered'],
				errorMap: { onServer: 'That email is already registered' }
			});

			expect(toFieldProps(state, { showErrorsWhen: 'blurred' })).toEqual({
				error: 'That email is already registered'
			});
		});

		it('shows the error immediately under `always`', () => {
			expect(toFieldProps(field({ errors: ['Required'] }), { showErrorsWhen: 'always' })).toEqual({
				error: 'Required'
			});
		});

		it('reports nothing when the field is valid', () => {
			expect(toFieldProps(field({ isTouched: true, isBlurred: true }))).toEqual({
				error: undefined
			});
		});
	});

	describe('normalising what the validators produced', () => {
		it('takes a plain string, as a function validator returns', () => {
			expect(toFieldProps(field({ isTouched: true, errors: ['Too short'] }))).toEqual({
				error: 'Too short'
			});
		});

		it('takes `message` off a Standard Schema issue, as zod returns', () => {
			const state = field({
				isTouched: true,
				errors: [{ message: 'Invalid email', path: ['email'] }]
			});

			expect(toFieldProps(state)).toEqual({ error: 'Invalid email' });
		});

		it('shows only the first error, never a joined list', () => {
			const state = field({
				isTouched: true,
				errors: ['Too short', 'No uppercase letter', 'No symbol']
			});

			expect(toFieldProps(state)).toEqual({ error: 'Too short' });
		});

		it('skips blank and whitespace-only entries to find a real message', () => {
			const state = field({ isTouched: true, errors: ['', '   ', 'The real one'] });

			expect(toFieldProps(state)).toEqual({ error: 'The real one' });
		});

		// A validator that produced something unrenderable must not leave the field permanently
		// invalid-but-silent. `Field` derives its invalid state from the error's presence, so
		// returning undefined keeps the two in step.
		it.each([[{}], [null], [42], [undefined], [{ message: 7 }], [{ message: '  ' }]])(
			'returns undefined for an unrenderable error: %s',
			(candidate) => {
				expect(toFieldProps(field({ isTouched: true, errors: [candidate] }))).toEqual({
					error: undefined
				});
			}
		);
	});

	// Only `check-types` catches this — `vitest run` does not typecheck, as 04 recorded. It is here
	// so that if TanStack changes `FieldApi`'s shape, the build fails rather than the fixtures
	// quietly testing a shape that no longer exists.
	it('accepts a real AnyFieldApi', () => {
		expectTypeOf<AnyFieldApi>().toExtend<ITanStackFieldLike>();
	});
});
