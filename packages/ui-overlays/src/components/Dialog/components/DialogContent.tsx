import { cn } from '@repo/tailwind-config';
import { OverlaySurface } from '~/components/Overlay/OverlaySurface';
import { overlaySurfaceVariants } from '~/components/Overlay/Overlay.variants';
import type { IDialogContent } from '~/components/Dialog/Dialog.types';

export const DialogContent = ({
	className,
	children,
	showCloseButton = true,
	icon,
	...props
}: IDialogContent) => {
	return (
		<OverlaySurface
			slot='dialog'
			className={cn(overlaySurfaceVariants({ side: 'center' }), className)}
			showCloseButton={showCloseButton}
			icon={icon}
			{...props}
		>
			{children}
		</OverlaySurface>
	);
};

DialogContent.displayName = 'DialogContent';
