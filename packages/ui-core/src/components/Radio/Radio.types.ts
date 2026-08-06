import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { ILabelNative } from '~/components/Label/Label.types';

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

/**
 * Properties for RadioLabel.
 *
 * Extends `ILabelNative` rather than `React.ComponentProps<typeof Label>`: `Label`'s props are a
 * union of its native and non-native modes, and an interface cannot extend a union. `ILabelNative`
 * is also the correct half — a `RadioLabel` always names one radio via `htmlFor`.
 */
export interface IRadioLabel extends ILabelNative {
	/** When true, applies disabled cursor styling. */
	disabled?: boolean;
}
