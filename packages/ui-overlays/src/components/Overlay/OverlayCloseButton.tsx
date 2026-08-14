import * as React from 'react';
import * as OverlayPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';
import { Icon } from '@repo/ui-core';

import { overlayCloseButtonVariants } from '~/components/Overlay/Overlay.variants';

export interface IOverlayCloseButton {
	/** The owning overlay's slot prefix, e.g. `'dialog'` or `'sheet'`. */
	slot: string;

	/** Custom icon to replace the default X icon. */
	icon?: React.ReactNode;

	className?: string;
}

/**
 * Internal. The close affordance shared by Dialog and Sheet.
 *
 * Not exported from the package — callers reach it through an overlay's `showCloseButton` and
 * `icon` props, or compose their own with the public `DialogClose` / `SheetClose`.
 */
export const OverlayCloseButton = ({ slot, icon, className }: IOverlayCloseButton) => {
	return (
		<OverlayPrimitive.Close
			data-slot={`${slot}-close`}
			className={cn(overlayCloseButtonVariants(), className)}
		>
			{/*
			 * `size='xl'` (24px) is load-bearing, not a style choice. A consumer-supplied `icon` with
			 * no size class picks up the button's own `[&_svg:not([class*='size-'])]:size-6` rule —
			 * but `Icon` always emits a `size-*` class, which stops that rule matching. Dropping the
			 * explicit size here would silently shrink the close button to `Icon`'s 16px default.
			 */}
			{icon ?? <Icon name='x' size='xl' />}
			<span className='sr-only'>Close</span>
		</OverlayPrimitive.Close>
	);
};

OverlayCloseButton.displayName = 'OverlayCloseButton';
