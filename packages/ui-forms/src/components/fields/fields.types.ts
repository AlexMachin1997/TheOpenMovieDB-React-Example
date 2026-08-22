import type * as React from 'react';
import type { Option } from '@repo/core';
import type { IField } from '@repo/ui-core';
import type { ShowErrorsWhen } from '~/adapters/toFieldProps.types';
import type { FieldValidatorsLike } from '~/components/FormField/FormField.types';

/**
 * What every bound field component accepts.
 *
 * These are `Field`'s presentational props minus the two the binding supplies: `children`, because
 * the component renders its own control, and `error`, which comes from form state rather than from
 * the caller. `nativeLabel` is also absent — each field component knows whether its control can be
 * named by a native `<label>` and sets it accordingly, which is one of the things they exist to
 * stop callers getting wrong.
 *
 * **There is no `form` prop.** It comes from the surrounding `Form`, and rendering any of these
 * without one throws. See `IFormField` for the trade that makes.
 */
export interface IBoundField extends Omit<IField, 'children' | 'error' | 'nativeLabel'> {
	/**
	 * The field's name, resolved against the surrounding form's data.
	 *
	 * A plain string: nothing checks it at compile time or at runtime, because the form travels by
	 * context and React context cannot carry the form's data type.
	 */
	name: string;

	/**
	 * Validators for this field, passed straight through to TanStack's `form.Field`.
	 *
	 * @default undefined
	 */
	validators?: FieldValidatorsLike;

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
export interface ITextField extends IBoundField {
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
export interface ITextareaField extends IBoundField {
	/** Placeholder text. Never a substitute for the label. */
	placeholder?: string;

	/** Visible rows before scrolling. */
	rows?: number;
}

/** Properties for CheckboxField — a single boolean. */
export interface ICheckboxField extends IBoundField {}

/** Properties for SwitchField — a single boolean, presented as a toggle. */
export interface ISwitchField extends IBoundField {}

/** Properties for SelectField. */
export interface ISelectField extends IBoundField {
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
export interface IRadioGroupField extends IBoundField {
	/** The options to choose from. */
	options: Option[];

	/** Message shown when `options` is empty. */
	noOptionsAvailableMessage?: string;
}
