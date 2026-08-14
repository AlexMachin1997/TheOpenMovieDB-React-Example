import { cn } from '@repo/tailwind-config';
import { OverlaySurface } from '~/components/Overlay/OverlaySurface';
import { overlaySurfaceVariants } from '~/components/Overlay/Overlay.variants';

import type { ISheetContent } from '~/components/Sheet/Sheet.types';

export const SheetContent = ({
	className,
	children,
	side = 'right',
	showCloseButton = true,
	icon,
	...props
}: ISheetContent) => {
	return (
		<OverlaySurface
			slot='sheet'
			className={cn(overlaySurfaceVariants({ side }), className)}
			showCloseButton={showCloseButton}
			icon={icon}
			{...props}
		>
			{children}
		</OverlaySurface>
	);
};

SheetContent.displayName = 'SheetContent';
