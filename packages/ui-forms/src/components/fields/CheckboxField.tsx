import { Checkbox } from '@repo/ui-core';
import { FormField } from '~/components/FormField/FormField';
import type { ICheckboxField } from '~/components/fields/fields.types';

/**
 * A `Checkbox` bound to a boolean form field by name.
 *
 * @example
 * ```tsx
 * <CheckboxField name='terms' label='Accept the terms' required />
 * ```
 */
export const CheckboxField = ({ disabled = false, ...fieldProps }: ICheckboxField) => (
	<FormField {...fieldProps}>
		{/*
		 * `value` is destructured out rather than spread: Radix's Checkbox has its own `value` prop
		 * — a string, for form submission — and the two collide. Absorbing that here is the entire
		 * point of this component existing.
		 */}
		{({ value, onChange, ...control }) => (
			<Checkbox
				{...control}
				disabled={disabled}
				checked={Boolean(value)}
				onCheckedChange={onChange}
			/>
		)}
	</FormField>
);

CheckboxField.displayName = 'CheckboxField';
