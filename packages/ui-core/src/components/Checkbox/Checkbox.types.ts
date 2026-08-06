import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { ILabelNative } from '~/components/Label/Label.types';

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

/**
 * Properties for CheckboxLabel.
 *
 * Extends `ILabelNative` rather than `React.ComponentProps<typeof Label>`: `Label`'s props are a
 * union of its native and non-native modes, and an interface cannot extend a union. `ILabelNative`
 * is also the correct half — a `CheckboxLabel` always names one checkbox via `htmlFor`.
 */
export interface ICheckboxLabel extends ILabelNative {
	/** When true, applies disabled cursor styling. */
	disabled?: boolean;
}
