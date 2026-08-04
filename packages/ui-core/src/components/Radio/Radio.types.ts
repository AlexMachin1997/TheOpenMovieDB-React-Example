import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Label } from '@repo/ui-core';

/**
 * Properties for the Radio component.
 *
 * @example
 * ```tsx
 * <Radio value="option-1" />
 * ```
 */
export interface IRadio extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
	/** Custom class name for the circle indicator icon. */
	iconClassName?: string;
}

/** Properties for RadioLabel. */
export interface IRadioLabel extends React.ComponentProps<typeof Label> {
	/** When true, applies disabled cursor styling. */
	disabled?: boolean;
}
