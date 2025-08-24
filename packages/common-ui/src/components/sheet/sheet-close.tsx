import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/utils/className';

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

export const SheetClose = ({ ...props }: SheetCloseProps) => {
	return (
		<SheetPrimitive.Close
			data-slot='sheet-close'
			className={cn('cursor-pointer', props.className)}
			{...props}
		/>
	);
};
