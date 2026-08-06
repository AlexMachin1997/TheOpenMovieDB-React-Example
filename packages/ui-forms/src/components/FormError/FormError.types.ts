import type * as React from 'react';

/**
 * Properties for the FormError component.
 *
 * There is deliberately no prop for the message. It comes from the surrounding `Form`, which sets it
 * when a submission throws and clears it at the start of the next one — so it cannot go stale, and a
 * caller cannot forget to clear it.
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
export type IFormError = React.ComponentProps<'div'>;
