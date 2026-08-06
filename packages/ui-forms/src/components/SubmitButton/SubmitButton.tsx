import { useStore } from '@tanstack/react-form';
import { cn } from '@repo/tailwind-config';
import { Button } from '@repo/ui-core';
import { useFormContext } from '~/components/Form/hooks/useFormContext';
import type { ISubmitButton } from '~/components/SubmitButton/SubmitButton.types';

/**
 * A button that submits the surrounding `Form`, and cannot be built without submit semantics.
 *
 * That is the whole reason it exists. `Button` defaults to `type='button'` on purpose, so a plain
 * `<Button>Save</Button>` inside a form renders, looks correct, and does nothing — a silent,
 * complete failure of the same class as a missing `noValidate`.
 *
 * It is unavailable in exactly two situations, and they are the same mechanism:
 *
 * - **While a submission is in flight** — so a second press cannot start a second request. It also
 *   reports `aria-busy` and shows a spinner, both inherited from `Button`'s `loading` prop.
 * - **While the form is invalid, but only after a submission has already been attempted.** Never
 *   before: a button that is dead from the first keystroke gives no reason, is skipped by keyboard
 *   and screen-reader navigation, and leaves someone stuck with nothing to press and nothing to
 *   read. Once the user has actually asked for a result, every error is on screen and focus has
 *   been moved to the first of them, so an unavailable button is no longer unexplained — and it
 *   **re-enables itself** as the last outstanding field clears, which answers "am I done yet?"
 *   better than a pressable button that just fails again would.
 *
 * @example
 * ```tsx
 * <Form form={form}>
 *   <TextField name='email' label='Email address' required />
 *   <SubmitButton>Create account</SubmitButton>
 * </Form>
 * ```
 */
const SubmitButton = ({ disabled = false, className, ...props }: ISubmitButton) => {
	const { form } = useFormContext('SubmitButton');

	// Three narrow selectors rather than one broad one, so a re-render is driven by the single
	// primitive that changed.
	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
	const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);
	const isFieldsValid = useStore(form.store, (state) => state.isFieldsValid);

	// `canSubmit` looks like the obvious source and is the wrong one three separate ways: it goes
	// false on the first bad keystroke, long before any submission; it is also false while
	// submitting and while validating, conflating two states that need different treatment; and
	// `canSubmitWhenInvalid` pins it true for any caller who sets it.
	//
	// `isFieldsValid` rather than `isValid` on purpose too — `isValid` also goes false on a
	// form-level error map entry, and a server failure should not additionally present as a dead
	// button when `FormError` has already announced it.
	const isUnavailableWhileInvalid = submissionAttempts > 0 && !isFieldsValid;

	return (
		<Button
			{...props}
			type='submit'
			loading={isSubmitting}
			disabled={disabled || isUnavailableWhileInvalid}
			// Sized to its label, not to the form. A form is usually a `grid` or a `flex-col`, and a
			// grid item stretches to the column by default — so without this the submit button spans
			// the whole form, which is rarely what anyone wants and never what they asked for.
			// `w-full` from a caller still wins, because `cn` merges width classes last-one-wins.
			className={cn('w-fit', className)}
		/>
	);
};

SubmitButton.displayName = 'SubmitButton';

export { SubmitButton };
