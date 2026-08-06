import { use } from 'react';
import { FormContext } from '~/components/Form/contexts/form-context';
import type { IFormContext } from '~/components/Form/Form.types';

/**
 * Reads the surrounding `Form`.
 *
 * A `Form` ancestor is a hard requirement rather than a convenience: without one there is no form
 * instance to bind to, and a field that renders anyway would accept input, never validate, and
 * contribute nothing on submit — the silent failure this layer exists to remove.
 *
 * So it throws, and deliberately is not wrapped in an error boundary. A missing provider is a
 * structural mistake: if the tree renders once, it is correct forever. A boundary would turn a
 * development-time crash into a caught state, making the mistake *more* likely to ship.
 *
 * @param componentName The component asking, so the message names it rather than naming this hook.
 * @throws When rendered outside a `Form`.
 */
export const useFormContext = (componentName: string): IFormContext => {
	const context = use(FormContext);

	if (context == null) {
		throw new Error(
			`[@repo/ui-forms] <${componentName}> must be rendered inside a <Form>. ` +
				'The form instance travels by context, not by prop — wrap this in ' +
				'<Form form={form}>…</Form>.'
		);
	}

	return context;
};
