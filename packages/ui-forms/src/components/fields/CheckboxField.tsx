import type { DeepKeys } from '@tanstack/react-form';
import { Checkbox } from '@repo/ui-core';
import { FormField } from '~/components/FormField/FormField';
import type { ICheckboxField } from '~/components/fields/fields.types';

/**
 * A `Checkbox` bound to a boolean form field by name.
 *
 * @example
 * ```tsx
 * <CheckboxField form={form} name='terms' label='Accept the terms' required />
 * ```
 */
export const CheckboxField = <TFormData, TName extends DeepKeys<TFormData>>({
	disabled = false,
	...fieldProps
}: ICheckboxField<TFormData, TName>) => (
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
