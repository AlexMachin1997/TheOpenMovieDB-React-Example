import * as React from 'react';
import * as OverlayPrimitive from '@radix-ui/react-dialog';

import { OverlayCloseButton } from '~/components/Overlay/OverlayCloseButton';
import { overlayBackdropVariants } from '~/components/Overlay/Overlay.variants';

export interface IOverlaySurface extends React.ComponentProps<typeof OverlayPrimitive.Content> {
	/** The owning overlay's slot prefix, e.g. `'dialog'` or `'sheet'`. */
	slot: string;

	/** Whether to show the close (X) button. Defaults to `true`. */
	showCloseButton?: boolean;

	/** Custom icon to replace the default X icon. */
	icon?: React.ReactNode;
}

/**
 * Internal. Portal, backdrop, surface and close button — the assembly every modal overlay repeats.
 *
 * The caller supplies the fully-composed `className` for the surface itself, because that is the
 * one part that genuinely differs: Dialog centres a panel, Sheet pins one to an edge. Everything
 * around it is the same for both, and lives here so a fix reaches both at once.
 */
export const OverlaySurface = ({
	slot,
	className,
	children,
	showCloseButton = true,
	icon,
	...props
}: IOverlaySurface) => {
	return (
		<OverlayPrimitive.Portal data-slot={`${slot}-portal`}>
			<OverlayPrimitive.Overlay
				data-slot={`${slot}-overlay`}
				className={overlayBackdropVariants()}
			/>
			<OverlayPrimitive.Content data-slot={`${slot}-content`} className={className} {...props}>
				{children}
				{showCloseButton && <OverlayCloseButton slot={slot} icon={icon} />}
			</OverlayPrimitive.Content>
		</OverlayPrimitive.Portal>
	);
};

OverlaySurface.displayName = 'OverlaySurface';
