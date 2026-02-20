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
export interface ICheckboxGroup {
	/** The list of checkbox options to render. */
	options?: Option[];

	/** The currently selected values (controlled mode). */
	value?: string[];

	/** The default selected values (uncontrolled mode). */
	defaultValue?: string[];

	/** Callback fired when the selection changes. */
	onChange?: ((data: { value: string[]; name: string }) => void) | null;

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
