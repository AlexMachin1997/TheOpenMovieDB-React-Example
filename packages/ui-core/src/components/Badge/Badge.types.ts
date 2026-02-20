import * as React from 'react';

import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '~/components/Badge/Badge.variants';

/**
 * Properties for the Badge component.
 *
 * @example
 * ```tsx
 * <Badge variant="secondary">New</Badge>
 * ```
 */
export interface IBadge extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
	/** When true, renders as a Radix Slot, merging props onto the child element. */
	asChild?: boolean;
}
