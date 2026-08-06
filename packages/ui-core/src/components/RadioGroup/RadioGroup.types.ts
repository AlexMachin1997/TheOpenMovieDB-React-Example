import * as React from 'react';
import { type Option } from '@repo/core';
import { Radio } from '~/components/Radio/components/Radio';

/**
 * Properties for the RadioGroup component.
 *
 * Mirrors `ICheckboxGroup` deliberately — the two group components differ only where
 * single-selection forces it (`value` is a `string`, not a `string[]`).
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="plan"
 *   options={[{ id: '1', label: 'Monthly', value: 'monthly' }]}
 *   value={selected}
 *   onChange={({ value }) => setSelected(value)}
 * />
 * ```
 */
export interface IRadioGroup
	extends Pick<
		React.AriaAttributes,
		'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-required'
	> {
	/**
	 * Applied to the group container, along with the ARIA attributes above.
	 *
	 * These exist so `Field` can name and describe the group as a whole: a single native `<label>`
	 * cannot name several controls, so `Field` renders its label as a `<span>` and the container
	 * points back at it with `aria-labelledby`. Each option keeps its own per-item `RadioLabel`
	 * independently.
	 *
	 * Note there is no `role` among these. The container is Radix's `RadioGroupPrimitive.Root`,
	 * which already reports `role="radiogroup"` — a more specific role than `group`, and the one
	 * that makes assistive technology announce set position ("2 of 4"). It is deliberately left
	 * alone. See docs/05-ui-forms-field-pattern/plan.md, D2.
	 */
	id?: string;

	/** The list of radio options to render. */
	options?: Option[];

	/** The currently selected value. RadioGroup is controlled-only. */
	value: string;

	/** Callback fired when the selection changes. */
	onChange: (data: { value: string; name: string }) => void;

	/** Message to display when no options are available. */
	noOptionsAvailableMessage?: string;

	/** When true, disables every radio in the group. */
	disabled?: boolean;

	/** The form field name for the group. */
	name: string;

	/** Custom class name for the grid layout. */
	className?: string;
}

/** Properties for an individual RadioGroupItem sub-component. */
export interface IRadioGroupItem extends React.ComponentProps<typeof Radio> {
	/** The display label for this radio option. */
	label: string;
}
