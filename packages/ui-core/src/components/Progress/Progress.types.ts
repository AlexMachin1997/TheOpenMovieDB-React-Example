import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

/**
 * Properties for the Progress bar component.
 *
 * @example
 * ```tsx
 * <Progress value={60} showValue />
 * ```
 */
export interface IProgress extends React.ComponentProps<typeof ProgressPrimitive.Root> {
	/** When true, displays an indeterminate sliding animation instead of a fixed value. */
	indeterminate?: boolean;

	/** The current progress value (0–100). */
	value?: number;

	/** Custom class name for the indicator bar. */
	indicatorClassName?: string;

	/** When true, displays the numeric value in the center of the bar. */
	showValue?: boolean;
}
