import { Textarea } from '@repo/ui-core';
import { FormField } from '~/components/FormField/FormField';
import type { ITextareaField } from '~/components/fields/fields.types';

/**
 * A `Textarea` bound to a form field by name.
 *
 * @example
 * ```tsx
 * <TextareaField name='bio' label='Short bio' rows={4} />
 * ```
 */
export const TextareaField = ({
	placeholder,
	rows,
	disabled = false,
	...fieldProps
}: ITextareaField) => (
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
