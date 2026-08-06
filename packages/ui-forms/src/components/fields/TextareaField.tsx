import type { DeepKeys } from '@tanstack/react-form';
import { Textarea } from '@repo/ui-core';
import { FormField } from '~/components/FormField/FormField';
import type { ITextareaField } from '~/components/fields/fields.types';

/**
 * A `Textarea` bound to a form field by name.
 *
 * @example
 * ```tsx
 * <TextareaField form={form} name='bio' label='Short bio' rows={4} />
 * ```
 */
export const TextareaField = <TFormData, TName extends DeepKeys<TFormData>>({
	placeholder,
	rows,
	disabled = false,
	...fieldProps
}: ITextareaField<TFormData, TName>) => (
	<FormField {...fieldProps}>
		{(control) => (
			<Textarea
				{...control}
				placeholder={placeholder}
				rows={rows}
				disabled={disabled}
				value={(control.value ?? '') as string}
			/>
		)}
	</FormField>
);

TextareaField.displayName = 'TextareaField';
