import { Switch } from '@repo/ui-core';
import { FormField } from '~/components/FormField/FormField';
import type { ISwitchField } from '~/components/fields/fields.types';

/**
 * A `Switch` bound to a boolean form field by name.
 *
 * Same data shape as `CheckboxField`; reach for this when the setting takes effect immediately
 * rather than on submit.
 *
 * @example
 * ```tsx
 * <SwitchField name='marketing' label='Email me offers' />
 * ```
 */
export const SwitchField = ({
	disabled = false,
	...fieldProps
}: ISwitchField) => (
	<FormField {...fieldProps}>
		{/* `value` destructured out for the same reason as CheckboxField — Radix's Switch also has
		its own string `value` prop. */}
		{({ value, onChange, ...control }) => (
			<Switch
				{...control}
				disabled={disabled}
				checked={Boolean(value)}
				onCheckedChange={onChange}
			/>
		)}
	</FormField>
);

SwitchField.displayName = 'SwitchField';
