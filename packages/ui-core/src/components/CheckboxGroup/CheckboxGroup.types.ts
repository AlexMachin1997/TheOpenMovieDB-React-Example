import * as React from 'react';
import { type Option } from '@repo/core';
import { Checkbox } from '~/components/Checkbox/components/Checkbox';

/**
 * Properties for the CheckboxGroup component.
 *
 * @example
 * ```tsx
 * <CheckboxGroup
 *   name="interests"
 *   options={[{ id: '1', label: 'Movies', value: 'movies' }]}
 *   value={['movies']}
 *   onChange={({ value }) => setSelected(value)}
 * />
 * ```
 */
export interface ICheckboxGroup
	extends Pick<
		React.AriaAttributes,
		'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-required'
	> {
	/**
	 * Applied to the group container, along with the ARIA attributes above.
	 *
	 * These exist so `Field` can name and describe the group as a whole: a single native `<label>`
	 * cannot name several controls, so `Field` renders its label as a `<span>` and the container
	 * points back at it with `aria-labelledby`. Each option keeps its own per-item `CheckboxLabel`
	 * independently.
	 */
	id?: string;

	/** The list of checkbox options to render. */
	options?: Option[];

	/** The currently selected values. CheckboxGroup is controlled-only. */
	value: string[];

	/** Callback fired when the selection changes. */
	onChange: (data: { value: string[]; name: string }) => void;

	/** Message to display when no options are available. */
	noOptionsAvailableMessage?: string;

	/** When true, disables all checkboxes in the group. */
	disabled?: boolean;

	/** The form field name for the group. */
	name: string;

	/** Custom class name for the grid layout. */
	className?: string;
}

/** Properties for an individual CheckboxGroupItem sub-component. */
export interface ICheckboxGroupItem extends React.ComponentProps<typeof Checkbox> {
	/** The display label for this checkbox option. */
	label: string;
}
