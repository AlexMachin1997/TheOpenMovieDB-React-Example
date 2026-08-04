import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Label } from '~/components/Label/Label';

/**
 * Properties for the Checkbox component.
 *
 * @example
 * ```tsx
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
 * ```
 */
export interface ICheckbox
	extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, 'onCheckedChange'> {
	/** Simplified change handler that always receives a boolean. */
	onCheckedChange?: (checked: boolean) => void;

	/** Custom class name for the check icon. */
	iconClassName?: string;
}

/** Properties for CheckboxLabel. */
export interface ICheckboxLabel extends React.ComponentProps<typeof Label> {
	/** When true, applies disabled cursor styling. */
	disabled?: boolean;
}
