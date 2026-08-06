import { FormField } from '~/components/FormField/FormField';
import { Select } from '~/components/Selects/Select';
import type { ISelectField } from '~/components/fields/fields.types';

/**
 * A `Select` bound to a form field by name.
 *
 * `nativeLabel` stays at its default of `true`: the trigger is a `<button>`, which is a labelable
 * element, so a native `<label htmlFor>` names it.
 *
 * @example
 * ```tsx
 * <SelectField name='country' label='Country' options={countries} />
 * ```
 */
export const SelectField = ({
	options,
	type = 'single',
	placeholder,
	disabled = false,
	...fieldProps
}: ISelectField) => (
	<FormField {...fieldProps}>
		{({ value, onChange, ...control }) =>
			// The two modes are separate JSX rather than a spread, because `SelectProps` is a
			// discriminated union — `value` is a string for one and a string[] for the other, and
			// TypeScript narrows it only when `type` is a literal at the call site.
			type === 'multiple' ? (
				<Select
					{...control}
					type='multiple'
					options={options}
					placeholder={placeholder}
					value={(value ?? []) as string[]}
					onValueChange={onChange}
					triggerClassName={disabled ? 'pointer-events-none opacity-50' : undefined}
				/>
			) : (
				<Select
					{...control}
					type='single'
					options={options}
					placeholder={placeholder}
					value={(value ?? '') as string}
					onValueChange={onChange}
					triggerClassName={disabled ? 'pointer-events-none opacity-50' : undefined}
				/>
			)
		}
	</FormField>
);

SelectField.displayName = 'SelectField';
