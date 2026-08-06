import * as React from 'react';
import type { AnyFieldApi, DeepKeys, DeepValue, FieldComponent } from '@tanstack/react-form';
import type { IField, IFieldControlProps } from '@repo/ui-core';
import type { ShowErrorsWhen } from '~/adapters/toFieldProps.types';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The part of a TanStack form instance `FormField` actually uses.
 *
 * The validator generics are `any` deliberately. `FieldComponent` takes twelve of them, all
 * describing which validators the form was built with — none of which this component cares about,
 * since it only renders `form.Field` and reads the resulting state. Naming them concretely would
 * make `FormField` accept forms with one validator configuration and reject others.
 *
 * `TFormData` is **not** `any`, because that is the one that matters: it is what makes `name`
 * autocomplete and typo-check against the form's real shape.
 */
export interface IFormApiLike<TFormData> {
	Field: FieldComponent<TFormData, any, any, any, any, any, any, any, any, any, any, any>;
}

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
 * @example
 * ```tsx
 * <FormField form={form} name='email' label='Email address' required>
 *   {(control) => <Input {...control} type='email' />}
 * </FormField>
 * ```
 */
export interface IFormField<TFormData, TName extends DeepKeys<TFormData>>
	extends Omit<IField, 'children' | 'error'> {
	/** The form instance, from `useForm`. */
	form: IFormApiLike<TFormData>;

	/** The field's name. Autocompletes and typo-checks against the form's data shape. */
	name: TName;

	/**
	 * Render function receiving the bindings to spread onto the control, and the underlying TanStack
	 * field for anything the bindings don't cover.
	 */
	children: (
		control: IFormFieldControlProps<DeepValue<TFormData, TName>>,
		field: AnyFieldApi
	) => React.ReactNode;

	/**
	 * Validators for this field, passed straight through to TanStack's `form.Field`.
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
