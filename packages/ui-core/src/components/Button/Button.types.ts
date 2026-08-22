import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '~/components/Button/Button.variants';
import type { IconName } from '~/components/Icon/Icon.constants';

type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Properties for the Button component.
 *
 * @example
 * ```tsx
 * <Button variant="destructive" size="lg" startIcon="x" loading={isDeleting}>Delete</Button>
 * ```
 */
export interface IButton extends React.ComponentPropsWithRef<'button'> {
	/** The visual style of the button. */
	variant?: ButtonVariants['variant'];

	/** The size preset for the button. */
	size?: ButtonVariants['size'];

	/**
	 * When true, renders as a Radix Slot, merging props onto the child element.
	 *
	 * @default false
	 */
	asChild?: boolean;

	/**
	 * An icon rendered before the children, at `Icon`'s default size.
	 *
	 * Decorative — it is `aria-hidden` and never contributes to the accessible name.
	 */
	startIcon?: IconName;

	/**
	 * An icon rendered after the children, at `Icon`'s default size.
	 *
	 * Replaced by the spinner while {@link IButton.loading} is true.
	 */
	endIcon?: IconName;

	/**
	 * Shows a spinner in the end-icon position and makes the button non-interactive
	 * (`disabled` + `aria-disabled`) while reporting itself as `aria-busy`.
	 *
	 * The visible text and the accessible name are deliberately unchanged, so the button does not
	 * rename itself out from under a screen reader mid-action.
	 *
	 * @default false
	 */
	loading?: boolean;
}
