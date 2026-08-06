import { Input } from '@repo/ui-core';
import { FormField } from '~/components/FormField/FormField';
import type { ITextField } from '~/components/fields/fields.types';

/**
 * A text `Input` bound to a form field by name.
 *
 * @example
 * ```tsx
 * <TextField name='email' label='Email address' type='email' required />
 * ```
 */
export const TextField = ({
	type = 'text',
	placeholder,
	disabled = false,
	...fieldProps
}: ITextField) => (
	<FormField {...fieldProps}>
		{(control) => (
			<Input
				{...control}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				// Coerced because `DeepValue` resolves to whatever the form declares, and a text input
				// can only render a string. A field wired to a non-string value wants a different
				// component, not a cast — but rendering `[object Object]` is the worse failure.
				value={(control.value ?? '') as string}
			/>
		)}
	</FormField>
);

TextField.displayName = 'TextField';
