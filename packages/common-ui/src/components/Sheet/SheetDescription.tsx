import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/utils/className';

type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>;

export const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => {
	return (
		<SheetPrimitive.Description
			data-slot='sheet-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};
