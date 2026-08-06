import type * as React from 'react';
import type { Option } from '@repo/core';
import type { DeepKeys } from '@tanstack/react-form';
import type { IField } from '@repo/ui-core';
import type { ShowErrorsWhen } from '~/adapters/toFieldProps.types';
import type { IFormApiLike } from '~/components/FormField/FormField.types';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * What every bound field component accepts.
 *
 * These are `Field`'s presentational props minus the two the binding supplies: `children`, because
 * the component renders its own control, and `error`, which comes from form state rather than from
 * the caller. `nativeLabel` is also absent — each field component knows whether its control can be
 * named by a native `<label>` and sets it accordingly, which is one of the things they exist to
 * stop callers getting wrong.
 */
export interface IBoundField<TFormData, TName extends DeepKeys<TFormData>>
	extends Omit<IField, 'children' | 'error' | 'nativeLabel'> {
	/** The form instance, from `useForm`. */
	form: IFormApiLike<TFormData>;

	/** The field's name. Autocompletes and typo-checks against the form's data shape. */
	name: TName;

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

	/**
	 * Disables the control.
	 *
	 * @default false
	 */
	disabled?: boolean;
}

/** Properties for TextField. */
export interface ITextField<TFormData, TName extends DeepKeys<TFormData>>
	extends IBoundField<TFormData, TName> {
	/**
	 * The input type.
	 *
	 * @default 'text'
	 */
	type?: React.HTMLInputTypeAttribute;

	/** Placeholder text. Never a substitute for the label. */
	placeholder?: string;
}

/** Properties for TextareaField. */
export interface ITextareaField<TFormData, TName extends DeepKeys<TFormData>>
	extends IBoundField<TFormData, TName> {
	/** Placeholder text. Never a substitute for the label. */
	placeholder?: string;

	/** Visible rows before scrolling. */
	rows?: number;
}

// Aliases rather than empty `interface … extends`: neither adds a member, so the interface form
// buys nothing and costs a `no-empty-object-type` warning apiece.

/** Properties for CheckboxField — a single boolean. */
export type ICheckboxField<TFormData, TName extends DeepKeys<TFormData>> = IBoundField<
	TFormData,
	TName
>;

/** Properties for SwitchField — a single boolean, presented as a toggle. */
export type ISwitchField<TFormData, TName extends DeepKeys<TFormData>> = IBoundField<
	TFormData,
	TName
>;

/** Properties for SelectField. */
export interface ISelectField<TFormData, TName extends DeepKeys<TFormData>>
	extends IBoundField<TFormData, TName> {
	/** The options to choose from. */
	options: Option[];

	/**
	 * Whether more than one option can be selected. The field's value should be a `string` for
	 * `'single'` and a `string[]` for `'multiple'`.
	 *
	 * @default 'single'
	 */
	type?: 'single' | 'multiple';

	/** Placeholder shown on the trigger when nothing is selected. */
	placeholder?: string;
}

/** Properties for RadioGroupField. */
export interface IRadioGroupField<TFormData, TName extends DeepKeys<TFormData>>
	extends IBoundField<TFormData, TName> {
	/** The options to choose from. */
	options: Option[];

	/** Message shown when `options` is empty. */
	noOptionsAvailableMessage?: string;
}
