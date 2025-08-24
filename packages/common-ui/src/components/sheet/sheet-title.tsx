import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import { cn } from '~/utils/className';

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

export const SheetTitle = ({ className, ...props }: SheetTitleProps) => {
	return (
		<SheetPrimitive.Title
			data-slot='sheet-title'
			className={cn('text-foreground font-semibold', className)}
			{...props}
		/>
	);
};
