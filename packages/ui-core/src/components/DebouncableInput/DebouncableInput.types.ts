import type * as React from 'react';

export interface IDebouncableInput
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	/**
	 * Callback fired when the debounced value changes.
	 *
	 * @param value The debounced input value
	 */
	onValueChange: (value: string) => void;
	/**
	 * The amount of time in milliseconds to wait before triggering the `onValueChange` callback.
	 * Default is 300ms.
	 *
	 * @default 300
	 */
	debounceMs?: number;
	/**
	 * A ref to the underlying HTML input element.
	 */
	ref?: React.Ref<HTMLInputElement>;
}
