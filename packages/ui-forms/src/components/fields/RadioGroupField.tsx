import { RadioGroup } from '@repo/ui-core';
import { FormField } from '~/components/FormField/FormField';
import type { IRadioGroupField } from '~/components/fields/fields.types';

/**
 * A `RadioGroup` bound to a form field by name.
 *
 * Sets `nativeLabel={false}` for you: a single native `<label>` cannot name several controls, so
 * the field's label renders as a `<span>` and the group points back at it with `aria-labelledby`.
 * Getting that wrong is one of the things this component exists to prevent.
 *
 * @example
 * ```tsx
 * <RadioGroupField name='plan' label='Billing plan' options={plans} />
 * ```
 */
export const RadioGroupField = ({
	options,
	noOptionsAvailableMessage,
	disabled = false,
	...fieldProps
}: IRadioGroupField) => (
	<FormField {...fieldProps} nativeLabel={false}>
		{({ value, onChange, name, ...control }) => (
			<RadioGroup
				{...control}
				name={name}
				options={options}
				noOptionsAvailableMessage={noOptionsAvailableMessage}
				disabled={disabled}
				value={(value ?? '') as string}
				onChange={(data) => onChange(data.value)}
			/>
		)}
	</FormField>
);

RadioGroupField.displayName = 'RadioGroupField';
