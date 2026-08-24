import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { Icon } from '@repo/ui-core';

import { overlayCloseButtonVariants } from '~/components/Overlay/Overlay.variants';
import { useOverlayContentContext } from '~/components/Overlay/hooks/useOverlayContentContext';

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
	const content = useOverlayContentContext();

	return (
		<button
			type='button'
			data-slot={`${slot}-close`}
			className={cn(overlayCloseButtonVariants(), className)}
			// Through the same handler as Escape and the backdrop, so one `onRequestClose` covers
			// every way out rather than two of the three.
			onClick={(event) => content?.requestClose('close-button', event.nativeEvent)}
		>
			{/*
			 * `size='xl'` (24px) is load-bearing, not a style choice. A consumer-supplied `icon` with
			 * no size class picks up the button's own `[&_svg:not([class*='size-'])]:size-6` rule —
			 * but `Icon` always emits a `size-*` class, which stops that rule matching. Dropping the
			 * explicit size here would silently shrink the close button to `Icon`'s 16px default.
			 */}
			{icon ?? <Icon name='x' size='xl' />}
			<span className='sr-only'>Close</span>
		</button>
	);
};

OverlayCloseButton.displayName = 'OverlayCloseButton';
