import * as React from 'react';

/**
 * The accessibility bindings `Field` generates and hands to its control.
 *
 * This is **only** the wiring — there is no `value` and no `onChange` here. `Field` is
 * presentational and knows nothing about form state; connecting data is the caller's job (or
 * `@repo/ui-forms`' `FormField`, which extends this bag with the data bindings).
 *
 * Exported so a future schema-driven renderer can type its own control factory against it.
 *
 * @example
 * ```tsx
 * <Field label='Email address' error={error}>
 *   {(control) => <Input {...control} type='email' />}
 * </Field>
 * ```
 */
export interface IFieldControlProps {
	/** The control's `id`, which the label's `htmlFor` points at. */
	id: string;

	/** Points at the region holding the description and error. Always set, even when both are absent. */
	'aria-describedby': string;

	/** `true` while an error is present, otherwise omitted entirely. */
	'aria-invalid': true | undefined;

	/**
	 * Set only when `nativeLabel` is `false`, naming the `<span>` that stands in for the label.
	 *
	 * A native `<label htmlFor>` already names the control, so this would be redundant there — and
	 * `aria-labelledby` overrides a native label rather than adding to it.
	 */
	'aria-labelledby'?: string;

	/** The native attribute, used when the control is a real form element. */
	required?: true;

	/** The ARIA equivalent, used when it is not — a group container, or a `<span role='slider'>`. */
	'aria-required'?: true;
}

/**
 * Properties for the Field component.
 *
 * @example
 * ```tsx
 * <Field label='Email address' description='We never share it.' error={error} required>
 *   {(control) => (
 *     <Input {...control} type='email' value={value} onChange={onChange} />
 *   )}
 * </Field>
 * ```
 */
export interface IField extends Omit<React.ComponentProps<'div'>, 'children' | 'id'> {
	/** The field's name, rendered through `Label`. */
	label: React.ReactNode;

	/**
	 * Render function receiving the accessibility bindings to spread onto the control.
	 *
	 * A render function rather than a plain child because the bindings often belong on an element
	 * *inside* what you render — a `Slider`'s thumb rather than its root — and cloning a child can
	 * only ever reach the outermost element.
	 */
	children: (control: IFieldControlProps) => React.ReactNode;

	/**
	 * Guidance about the field, shown whether or not there is an error.
	 *
	 * @default undefined
	 */
	description?: string;

	/**
	 * The validation message. Its presence is what puts the field into an invalid state — there is
	 * no separate `invalid` flag, because two sources of truth for one fact is how a control and its
	 * field end up disagreeing.
	 *
	 * @default undefined
	 */
	error?: string;

	/**
	 * Marks the field required, rendering the indicator on the label and setting
	 * `required`/`aria-required` on the control.
	 *
	 * @default false
	 */
	required?: boolean;

	/**
	 * Whether the label is a native `<label htmlFor>`.
	 *
	 * Set to `false` when the control cannot be named by `htmlFor`: a group of controls
	 * (`CheckboxGroup`, `RadioGroup`), or an element that is not a labelable one (`Slider`'s thumb
	 * is a `<span role='slider'>`). The label then renders as a `<span>` and the control is given
	 * `aria-labelledby` instead.
	 *
	 * @default true
	 */
	nativeLabel?: boolean;

	/**
	 * The control's `id`. Supply one — `email`, `billing-postcode` — and the message region derives
	 * from it (`email-message`), which keeps the rendered DOM readable.
	 *
	 * Falls back to `React.useId()` when omitted, which is correct but produces machine ids.
	 *
	 * @default undefined
	 */
	id?: string;
}
