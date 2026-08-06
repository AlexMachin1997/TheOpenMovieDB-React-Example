import type * as React from 'react';
import type { Locale } from 'date-fns';
import type { DateFormatKey } from '@repo/core';

export interface IDatePicker
	extends Pick<
		React.AriaAttributes,
		'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-required'
	> {
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	fromYear?: number;
	toYear?: number;
	locale?: Locale;
	dateFormat?: DateFormatKey;

	/**
	 * Applied to the trigger button, along with the ARIA attributes above and `required`.
	 *
	 * These exist so `Field` can label and describe a date picker. The trigger is a `<button>`,
	 * which **is** a labelable element, so a native `<label htmlFor>` associates with it normally.
	 */
	id?: string;

	/** Marks the trigger required. Mirrors the native attribute on a plain input. */
	required?: boolean;
}
