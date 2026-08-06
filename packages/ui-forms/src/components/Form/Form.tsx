import * as React from 'react';
import { normaliseError } from '~/adapters/normaliseError';
import { FormContext } from '~/components/Form/contexts/form-context';
import { focusFirstInvalid } from '~/components/Form/utils/focusFirstInvalid';
import type { IForm } from '~/components/Form/Form.types';

/**
 * Shown when a submission fails without producing a message of its own — a dropped connection, a
 * gateway timeout, a bug in the handler. Never used to paraphrase a message the server did send.
 */
const GENERIC_SUBMIT_FAILURE = 'Something went wrong. Please try again.';

/**
 * Owns the `<form>` element, `noValidate`, and the form instance every field below it binds to.
 *
 * Three things that were previously the caller's job to remember, and failed silently when
 * forgotten, are structural here: `noValidate` cannot be turned off, submission always runs the
 * form library rather than the browser, and a failure that belongs to no field has somewhere to go.
 *
 * It renders **no layout of its own** — deliberately. A form filling a `Dialog` sits between
 * `DialogContent` (`max-h-[90vh] flex flex-col`) and `DialogContentArea` (`flex-1 overflow-y-auto`),
 * and unless it is itself a flex container the body stops scrolling and the footer carrying the
 * submit button is pushed out of view. Shipping no default keeps that an ordinary class-name
 * decision rather than an override of something invisible.
 *
 * @example
 * ```tsx
 * const form = useForm({
 *   defaultValues: { email: '' },
 *   onSubmit: async ({ value, formApi }) => {
 *     const response = await save(value);
 *     if (response.ok) return;
 *
 *     // Belongs to a field -> bind it to the field.
 *     formApi.setErrorMap({ onSubmit: { fields: response.fieldErrors } });
 *     // Belongs to nobody -> throw, and <FormError /> renders it.
 *     if (response.formError) throw new Error(response.formError);
 *   }
 * });
 *
 * <Form form={form} className='grid gap-6'>
 *   <TextField name='email' label='Email address' required />
 *   <FormError />
 *   <SubmitButton>Save</SubmitButton>
 * </Form>
 * ```
 */
const Form = ({ form, children, ...props }: IForm) => {
	const [formError, setFormError] = React.useState<string>();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// Both must happen before the first `await`: once the event has finished dispatching they
		// are no-ops, and React resets `currentTarget` to null. `stopPropagation` is not about
		// nested `<form>` elements — HTML forbids those — but about a `Form` inside a portalled
		// Dialog or Sheet authored inside another `Form`'s JSX. React events propagate through the
		// React tree rather than the DOM tree, so without this the outer form submits too, and the
		// two elements are nowhere near each other in the DOM so nothing about it looks wrong.
		event.preventDefault();
		event.stopPropagation();
		const formElement = event.currentTarget;

		setFormError(undefined);

		// Field-bound server errors are not cleared here, and do not need to be: `FieldApi`'s
		// validation resets the submit-cause error on any non-submit pass that did not itself
		// error, and blurring or editing a field always triggers one. So they clear themselves as
		// the user fixes each field — which is also what lets the submit button re-enable.
		try {
			await form.handleSubmit();
		} catch (error) {
			// The form library re-throws after recording the failure, so this is a real catch. An
			// `Error` satisfies the same `message` branch a validation issue does, so the server's
			// own wording survives when it sent any.
			setFormError(normaliseError(error) ?? GENERIC_SUBMIT_FAILURE);
			console.error(error);
		}

		// `isSubmitted` is set false at the top of every attempt and true only once the caller's
		// handler has resolved, so it rules out every early return the form library can take.
		// `isSubmitSuccessful` is deliberately not used: it is set true even when the handler
		// recorded a server failure, because from the library's point of view the handler resolved.
		if (!form.state.isSubmitted) {
			focusFirstInvalid(form, formElement);
		}
	};

	const context = React.useMemo(() => ({ form, formError }), [form, formError]);

	return (
		<FormContext.Provider value={context}>
			{/*
			 * `noValidate` and `onSubmit` come after the spread on purpose. The props type omits
			 * both, so this is belt and braces rather than the only guard — but it means neither can
			 * be removed even by a caller casting their way past the type.
			 */}
			<form {...props} noValidate onSubmit={handleSubmit}>
				{children}
			</form>
		</FormContext.Provider>
	);
};

Form.displayName = 'Form';

export { Form };
