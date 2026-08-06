import type {
	IFieldPropsFromState,
	ITanStackFieldLike,
	IToFieldPropsOptions
} from '~/adapters/toFieldProps.types';

/**
 * Normalises one entry of `meta.errors` to a displayable string.
 *
 * The element type depends on which validator produced it — a plain function conventionally returns
 * a string, a Standard Schema validator (zod et al.) returns an issue object with a `message`. So
 * this has to be defensive rather than cast.
 *
 * Returns `undefined` for anything it cannot turn into text, including empty and whitespace-only
 * strings: showing a blank error would put the field in a permanently invalid-but-silent state,
 * which is worse than showing nothing.
 */
const normalise = (candidate: unknown): string | undefined => {
	if (typeof candidate === 'string') {
		return candidate.trim() === '' ? undefined : candidate;
	}

	if (typeof candidate === 'object' && candidate !== null && 'message' in candidate) {
		const { message } = candidate as { message: unknown };
		return typeof message === 'string' && message.trim() !== '' ? message : undefined;
	}

	return undefined;
};

/**
 * Translates a TanStack Form field's state into the props `Field` accepts.
 *
 * One plain function, covering both of TanStack's APIs: `form.Field`'s render prop and `useField()`
 * hand back the same `FieldApi` object, so there is nothing for a second entry point to do.
 *
 * It is deliberately **not** a hook. `useField` already calls `useStore(fieldApi.store)` with no
 * selector, so the consuming component re-renders on any change to the field's state; a hook here
 * would subscribe a second time and buy nothing.
 *
 * Contains no reference to `Field`, `Input`, or anything else from `@repo/ui-core` — state in,
 * plain values out.
 *
 * @example
 * ```tsx
 * <form.Field name='email'>
 *   {(field) => (
 *     <Field label='Email address' {...toFieldProps(field)}>
 *       {(control) => <Input {...control} />}
 *     </Field>
 *   )}
 * </form.Field>
 * ```
 */
export const toFieldProps = (
	field: ITanStackFieldLike,
	{ showErrorsWhen = 'touched' }: IToFieldPropsOptions = {}
): IFieldPropsFromState => {
	const { isTouched, isBlurred, errors, errorMap } = field.state.meta;

	// `handleSubmit` marks every mounted field touched but blurs none, so 'blurred' has to let
	// submit- and server-sourced errors through explicitly. Without this, submitting a form without
	// visiting a field would validate it and then say nothing.
	const isSubmitOrServerError = errorMap.onSubmit !== undefined || errorMap.onServer !== undefined;

	const isVisible =
		showErrorsWhen === 'always' ||
		(showErrorsWhen === 'touched' && isTouched) ||
		(showErrorsWhen === 'blurred' && (isBlurred || isSubmitOrServerError));

	if (!isVisible) {
		return { error: undefined };
	}

	// First renderable error only, never joined. `FieldMessage` is one line under a control, and a
	// live region announcing three concatenated validation messages is one nobody follows.
	for (const candidate of errors) {
		const message = normalise(candidate);

		if (message !== undefined) {
			return { error: message };
		}
	}

	return { error: undefined };
};
