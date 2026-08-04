import * as React from 'react';

/**
 * Properties for the Input component.
 *
 * Extends the native HTML `<input>` element props so all standard attributes
 * (e.g. `placeholder`, `disabled`, `aria-invalid`) are supported.
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="Enter your email" />
 * ```
 */
export interface IInput extends React.ComponentProps<'input'> {
	/** The visual style class name to merge with the default input styles. */
	className?: string;

	/** The HTML input type (e.g. `'text'`, `'email'`, `'password'`, `'number'`). */
	type?: React.HTMLInputTypeAttribute;
}
