import type * as React from 'react';
import type { AnyFieldApi } from '@tanstack/react-form';
import type { IField, IFieldControlProps } from '@repo/ui-core';
import type { ShowErrorsWhen } from '~/adapters/toFieldProps.types';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The bindings `FormField` hands to its children.
 *
 * Extends `Field`'s accessibility bag with the data wiring, so a native input needs nothing beyond
 * the spread. Controls with their own change vocabulary rename two props at the call site —
 * `checked={control.value}` for a `Checkbox`, `onValueChange={control.onChange}` for a `Select`.
 */
export interface IFormFieldControlProps<TValue> extends IFieldControlProps {
	/** The field's name, as given to `FormField`. */
	name: string;

	/** The field's current value, resolved by name from the form. */
	value: TValue;

	/**
	 * Accepts either a DOM change event or a raw value, so the same handler serves an `Input`
	 * (`event.target.value`) and a `Checkbox` (a boolean).
	 */
	onChange: (next: unknown) => void;

	/** Marks the field blurred, which is what drives on-blur validation. */
	onBlur: () => void;
}

/**
 * Properties for the FormField component.
 *
 * **There is no `form` prop.** The form comes from the surrounding `Form`, so naming a field is the
 * only thing a call site writes. Rendering this without a `Form` ancestor throws.
 *
 * The cost of that, stated plainly because it is a real trade: React context is not generic, so the
 * form's data type cannot travel with it, and `name` is a plain `string` rather than a checked key
 * of the form's shape. Every alternative that preserves the check is a factory — the components
 * would come from `createForm<IAccount>()` rather than from the package barrel. Keeping them
 * importable from the barrel was judged worth more. A misspelled name produces a field that renders,
 * accepts input, and silently never submits; nothing detects it.
 *
 * `TValue` is the way back for a call site that wants its value typed.
 *
 * @example
 * ```tsx
 * // `control.value` is `unknown` here — fine, because `Input` is given a string another way.
 * <FormField name='email' label='Email address' required>
 *   {(control) => <Input {...control} type='email' />}
 * </FormField>
 *
 * // Opt in when the value is actually read.
 * <FormField<string> name='email' label='Email address'>
 *   {(control) => <Input {...control} value={control.value} />}
 * </FormField>
 * ```
 */
export interface IFormField<TValue = unknown> extends Omit<IField, 'children' | 'error'> {
	/**
	 * The field's name, resolved against the surrounding form's data.
	 *
	 * Not checked at compile time or at runtime — see the note above.
	 */
	name: string;

	/**
	 * Render function receiving the bindings to spread onto the control, and the underlying form
	 * field for anything the bindings don't cover.
	 */
	children: (control: IFormFieldControlProps<TValue>, field: AnyFieldApi) => React.ReactNode;

	/**
	 * Validators for this field, passed straight through to the form library's own field component.
	 *
	 * @default undefined
	 */
	validators?: any;

	/**
	 * When the field's error becomes visible.
	 *
	 * @default 'touched'
	 */
	showErrorsWhen?: ShowErrorsWhen;
}
