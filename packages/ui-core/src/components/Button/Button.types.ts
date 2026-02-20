import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '~/components/Button/variants';

type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Properties for the Button component.
 *
 * @example
 * ```tsx
 * <Button variant="destructive" size="lg">Delete</Button>
 * ```
 */
export interface IButton extends React.ComponentPropsWithRef<'button'> {
	/** The visual style of the button. */
	variant?: ButtonVariants['variant'];

	/** The size preset for the button. */
	size?: ButtonVariants['size'];

	/** When true, renders as a Radix Slot, merging props onto the child element. */
	asChild?: boolean;
}
