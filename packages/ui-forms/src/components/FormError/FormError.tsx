import { cn } from '@repo/tailwind-config';
import { Alert, AlertDescription, Icon } from '@repo/ui-core';
import { useFormContext } from '~/components/Form/hooks/useFormContext';
import type { IFormError } from '~/components/FormError/FormError.types';

/**
 * Renders a failure that belongs to the form rather than to any one field — a 500, a 429, an expired
 * session, a dropped connection.
 *
 * **Field errors are the common case and do not come here.** A server response naming a field
 * (`password: 'Not strong enough'`) is bound to that field by the submit handler and rendered under
 * the control it belongs to. This is the place the remainder goes, so every consumer stops
 * hand-rolling a message above the submit button.
 *
 * **Render it unconditionally.** Writing `{error && <FormError />}` defeats the whole design: the
 * live region has to already exist in the DOM before it has anything to say, or assistive technology
 * never saw it become live and the announcement is unreliable. The region below is always present;
 * only its contents come and go.
 *
 * @example
 * ```tsx
 * <Form form={form}>
 *   <TextField name='email' label='Email address' required />
 *   <FormError />
 *   <SubmitButton>Save</SubmitButton>
 * </Form>
 * ```
 */
const FormError = ({ className, ...props }: IFormError) => {
	const { formError } = useFormContext('FormError');

	return (
		<div
			{...props}
			data-slot='form-error'
			// Assertive, unlike the polite per-field regions inside `Field`. Polite is right while
			// someone is typing and wrong once they have pressed submit and stopped to wait for a
			// result. `aria-atomic` so the whole message is read rather than whatever changed.
			aria-live='assertive'
			aria-atomic='true'
			// Spacing only when there is something to space. An empty block-level div with no
			// children and no margin contributes nothing to the layout, which is what lets the region
			// stay permanently mounted without leaving a gap under every form that has not failed.
			className={cn(formError !== undefined && 'mb-4', className)}
		>
			{formError !== undefined && (
				<Alert
					variant='error'
					// Clearing `role` is not cosmetic. `Alert` hardcodes `role='alert'`, which is an
					// assertive live region in its own right — nesting one inside the assertive region
					// above makes the message announce twice. `Alert` sets `role` before spreading
					// props, so passing `undefined` genuinely removes it.
					role={undefined}
				>
					<Icon name='x-circle' />
					<AlertDescription>{formError}</AlertDescription>
				</Alert>
			)}
		</div>
	);
};

FormError.displayName = 'FormError';

export { FormError };
